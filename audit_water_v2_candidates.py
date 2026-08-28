#!/usr/bin/env python3
"""Traten Water Expansion Audit V2.

Candidate discovery only. This script NEVER promotes a candidate into the fixed water cache.
Target scope for V1.5.8: Northern Alps + Central Alps + Southern Alps + Yatsugatake.

Sources:
- OpenStreetMap / Overpass API: high-recall route-corridor discovery.
- Curated public-source seed CSV: public pages with published coordinates (YAMAP,
  Yamareco, official hut/municipal/tourism pages, etc.). No coordinate guessing.

Outputs:
- water-v2-candidates.json  persistent/resumable candidate queue
- WATER_V2_CANDIDATES.csv   review-friendly flat list
- WATER_V2_CANDIDATES.md    summary for humans
"""
from __future__ import annotations

import argparse
import csv
import json
import math
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

import audit_water_300 as legacy

BASE = Path(__file__).resolve().parent
APP_JS = BASE / "app.js"
RESOURCE_JS = BASE / "resource-mountain-data.js"
SEEDS_CSV = BASE / "water-v2-public-seeds.csv"
OUT_JSON = BASE / "water-v2-candidates.json"
OUT_CSV = BASE / "WATER_V2_CANDIDATES.csv"
OUT_MD = BASE / "WATER_V2_CANDIDATES.md"

EXISTING_CACHE_URL = "https://raw.githubusercontent.com/Takapays/OTENKI/water-cache/water-mountain-cache.json"
BOOTSTRAP_CACHE_URL = "https://raw.githubusercontent.com/Takapays/OTENKI/ea3633c/water-mountain-cache.json"
ENDPOINTS = legacy.ENDPOINTS

CORRIDOR_STEP_M = 650
QUERY_RADIUS_M = 750
MAX_CENTERS_PER_MOUNTAIN = 44
MAX_OSM_CANDIDATES_PER_MOUNTAIN = 40
MAX_ROUTE_DISTANCE_M = 1600

CENTRAL_ALPS_300 = {
    "経ヶ岳（長野）", "木曽駒ヶ岳", "空木岳", "南駒ヶ岳", "越百山", "安平路山"
}
YATSUGATAKE_300 = {"蓼科山", "天狗岳", "八ヶ岳（赤岳）"}

WATER_WORDS = re.compile(r"(水場|湧水|清水|水|泉|井戸|沢|water|spring|fountain|tap)", re.I)
BAD_NAME_WORDS = re.compile(r"(温泉|足湯|spa|bath|銭湯|プール)", re.I)


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def load_resource_data() -> dict[str, Any]:
    text = RESOURCE_JS.read_text(encoding="utf-8").strip()
    prefix = "window.TRATEN_RESOURCE_MOUNTAINS = Object.freeze("
    if not text.startswith(prefix) or not text.endswith(");"):
        raise RuntimeError("resource-mountain-data.js format not recognized")
    return json.loads(text[len(prefix):-2])


def load_japan300() -> list[str]:
    text = APP_JS.read_text(encoding="utf-8")
    mm = re.search(r"const JAPAN_300_MOUNTAINS\s*=\s*\[(.*?)\];", text, re.S)
    if not mm:
        raise RuntimeError("JAPAN_300_MOUNTAINS not found")
    return re.findall(r'"([^"]+)"', mm.group(1))


def target_mountains() -> list[str]:
    data = load_resource_data()
    area = data.get("mountainArea") or {}
    japan300 = load_japan300()
    out: list[str] = []
    for m in japan300:
        a = area.get(m)
        if a in {"northern_alps", "southern_alps"} or m in CENTRAL_ALPS_300 or m in YATSUGATAKE_300:
            out.append(m)
    return out


def route_blocks_for_mountain(mountain: str) -> list[list[dict[str, Any]]]:
    text = APP_JS.read_text(encoding="utf-8")
    keys = [mountain]
    alias = legacy.ALIASES.get(mountain)
    if alias:
        keys.append(alias)
    routes: list[list[dict[str, Any]]] = []
    seen: set[tuple[tuple[float, float], ...]] = set()
    for key in keys:
        for block in legacy.array_blocks(text, key):
            pts = legacy.parse_points(block)
            # Representative/fixed route arrays contain a trailhead and >=2 geo points.
            if len(pts) < 2 or not any(p.get("type") == "trailhead" for p in pts):
                continue
            sig = tuple((round(float(p["lat"]), 5), round(float(p["lon"]), 5)) for p in pts)
            if sig in seen:
                continue
            seen.add(sig)
            routes.append(pts)
    return routes


def route_geometry_for_targets(targets: list[str]) -> tuple[dict[str, list[list[dict[str, Any]]]], dict[str, str]]:
    """Prefer intact representative route blocks; fall back to fixed route points without inventing segments."""
    _, legacy_points = legacy.load_mountains_and_points()
    route_map: dict[str, list[list[dict[str, Any]]]] = {}
    modes: dict[str, str] = {}
    for mountain in targets:
        blocks = route_blocks_for_mountain(mountain)
        if blocks:
            route_map[mountain] = blocks
            modes[mountain] = "route-corridor"
            continue
        pts = legacy_points.get(mountain) or []
        # Single-point pseudo-routes deliberately avoid connecting unrelated fixed points.
        route_map[mountain] = [[p] for p in pts]
        modes[mountain] = "fixed-point-buffer"
    return route_map, modes


def lerp_centers(routes: list[list[dict[str, Any]]]) -> list[dict[str, Any]]:
    raw: list[dict[str, Any]] = []
    for route_idx, pts in enumerate(routes):
        for i, p in enumerate(pts):
            raw.append({"lat": p["lat"], "lon": p["lon"], "route": route_idx, "near_point": p.get("name") or "通過地点"})
            if i + 1 >= len(pts):
                continue
            q = pts[i + 1]
            dist = legacy.haversine(p["lat"], p["lon"], q["lat"], q["lon"])
            steps = max(0, int(math.ceil(dist / CORRIDOR_STEP_M)) - 1)
            for s in range(1, steps + 1):
                t = s / (steps + 1)
                raw.append({
                    "lat": p["lat"] + (q["lat"] - p["lat"]) * t,
                    "lon": p["lon"] + (q["lon"] - p["lon"]) * t,
                    "route": route_idx,
                    "near_point": f"{p.get('name','地点')}〜{q.get('name','地点')}",
                })
    dedup: list[dict[str, Any]] = []
    for p in raw:
        if not any(legacy.haversine(p["lat"], p["lon"], q["lat"], q["lon"]) < 350 for q in dedup):
            dedup.append(p)
    if len(dedup) <= MAX_CENTERS_PER_MOUNTAIN:
        return dedup
    idxs = sorted(set(round(i * (len(dedup) - 1) / (MAX_CENTERS_PER_MOUNTAIN - 1)) for i in range(MAX_CENTERS_PER_MOUNTAIN)))
    return [dedup[i] for i in idxs]


def overpass_query(centers: list[dict[str, Any]]) -> str:
    clauses: list[str] = []
    for p in centers:
        a = f"(around:{QUERY_RADIUS_M},{p['lat']:.5f},{p['lon']:.5f})"
        clauses.extend([
            f'nwr["amenity"="drinking_water"]{a};',
            f'nwr["natural"="spring"]{a};',
            f'nwr["man_made"="water_tap"]{a};',
            f'nwr["man_made"="water_well"]{a};',
            f'nwr["amenity"="water_point"]{a};',
            f'nwr["fountain"="drinking"]{a};',
            f'nwr["drinking_water"]{a};',
        ])
    return "[out:json][timeout:22];(" + "".join(clauses) + ");out center tags;"


def point_seg_distance_m(lat: float, lon: float, a: dict[str, Any], b: dict[str, Any]) -> float:
    # Equirectangular local projection; sufficiently accurate for route-corridor distances.
    lat0 = math.radians((lat + a["lat"] + b["lat"]) / 3.0)
    kx = 111320.0 * max(0.2, math.cos(lat0))
    ky = 110540.0
    px, py = lon * kx, lat * ky
    ax, ay = a["lon"] * kx, a["lat"] * ky
    bx, by = b["lon"] * kx, b["lat"] * ky
    vx, vy = bx - ax, by - ay
    wx, wy = px - ax, py - ay
    vv = vx * vx + vy * vy
    if vv <= 1e-9:
        return math.hypot(px - ax, py - ay)
    t = max(0.0, min(1.0, (wx * vx + wy * vy) / vv))
    cx, cy = ax + t * vx, ay + t * vy
    return math.hypot(px - cx, py - cy)


def nearest_route(lat: float, lon: float, routes: list[list[dict[str, Any]]]) -> tuple[float, str]:
    best = float("inf")
    label = "通過地点"
    for pts in routes:
        for p in pts:
            d = legacy.haversine(lat, lon, p["lat"], p["lon"])
            if d < best:
                best, label = d, p.get("name") or label
        for i in range(len(pts) - 1):
            d = point_seg_distance_m(lat, lon, pts[i], pts[i + 1])
            if d < best:
                best = d
                label = f"{pts[i].get('name','地点')}〜{pts[i+1].get('name','地点')}"
    return best, label


def osm_kind(tags: dict[str, Any]) -> tuple[str, str]:
    amenity = str(tags.get("amenity") or "")
    natural = str(tags.get("natural") or "")
    man = str(tags.get("man_made") or "")
    fountain = str(tags.get("fountain") or "")
    drinking = str(tags.get("drinking_water") or "").lower()
    if amenity == "drinking_water" or drinking == "yes" or fountain == "drinking":
        pot = "confirmed"
    elif drinking == "no":
        pot = "not_drinking"
    else:
        pot = "unknown"
    if amenity == "drinking_water": return "飲料水", pot
    if natural == "spring": return "湧水", pot
    if man == "water_tap": return "水栓", pot
    if man == "water_well": return "井戸", pot
    if amenity == "water_point": return "給水地点", pot
    if fountain == "drinking": return "飲料用噴水", pot
    return "給水情報あり", pot


def score_candidate(name: str, tags: dict[str, Any], distance_m: float, potability: str) -> tuple[int, list[str], bool]:
    score = 0
    reasons: list[str] = []
    amenity = str(tags.get("amenity") or "")
    natural = str(tags.get("natural") or "")
    man = str(tags.get("man_made") or "")
    drinking = str(tags.get("drinking_water") or "").lower()

    if distance_m <= 300: score += 4; reasons.append("route<=300m")
    elif distance_m <= 800: score += 3; reasons.append("route<=800m")
    elif distance_m <= 1200: score += 2; reasons.append("route<=1200m")
    else: score += 1; reasons.append("route<=1600m")

    if amenity == "drinking_water": score += 4; reasons.append("amenity=drinking_water")
    if drinking == "yes": score += 3; reasons.append("drinking_water=yes")
    if man == "water_tap": score += 2; reasons.append("water_tap")
    if natural == "spring": score += 2; reasons.append("spring")
    if man == "water_well": score += 1; reasons.append("water_well")
    if WATER_WORDS.search(name or ""): score += 1; reasons.append("water-name")
    if potability == "not_drinking": score -= 4; reasons.append("not_drinking")

    suspicious = bool(BAD_NAME_WORDS.search(name or "")) and not (amenity == "drinking_water" or drinking == "yes")
    if suspicious:
        score -= 5
        reasons.append("suspicious-name")
    return score, reasons, suspicious


def element_latlon(el: dict[str, Any]) -> tuple[float, float] | None:
    lat = el.get("lat", (el.get("center") or {}).get("lat"))
    lon = el.get("lon", (el.get("center") or {}).get("lon"))
    try:
        return float(lat), float(lon)
    except (TypeError, ValueError):
        return None


def parse_osm_candidates(mountain: str, payload: dict[str, Any], routes: list[list[dict[str, Any]]]) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for el in payload.get("elements") or []:
        ll = element_latlon(el)
        if not ll:
            continue
        lat, lon = ll
        dist, near = nearest_route(lat, lon, routes)
        if dist > MAX_ROUTE_DISTANCE_M:
            continue
        tags = el.get("tags") or {}
        raw_name = str(tags.get("name:ja") or tags.get("name") or "").strip()
        kind, pot = osm_kind(tags)
        name = raw_name or f"{near}付近の{kind}"
        score, reasons, suspicious = score_candidate(name, tags, dist, pot)
        rows.append({
            "mountain": mountain,
            "name": name,
            "lat": round(lat, 6),
            "lon": round(lon, 6),
            "kind": kind,
            "potability": pot,
            "near_point": near,
            "route_distance_m": int(round(dist)),
            "source_type": "osm",
            "source_name": "OpenStreetMap / Overpass API",
            "source_url": "https://www.openstreetmap.org/" + str(el.get("type") or "node") + "/" + str(el.get("id") or ""),
            "source_id": f"{el.get('type','node')}/{el.get('id','')}",
            "score": score,
            "review_priority": "high" if score >= 8 else ("medium" if score >= 5 else "low"),
            "suspicious": suspicious,
            "score_reasons": reasons,
            "tags": {k: tags.get(k) for k in ("amenity","natural","man_made","drinking_water","fountain","access","operator","description") if k in tags},
        })
    # Spatial dedupe, keeping the better-scoring candidate.
    dedup: list[dict[str, Any]] = []
    for row in sorted(rows, key=lambda r: (-r["score"], r["route_distance_m"], r["name"])):
        if any(legacy.haversine(row["lat"], row["lon"], q["lat"], q["lon"]) < 70 for q in dedup):
            continue
        dedup.append(row)
    return dedup[:MAX_OSM_CANDIDATES_PER_MOUNTAIN]


def fetch_osm(mountain: str, routes: list[list[dict[str, Any]]], timeout: int, attempts: int) -> tuple[list[dict[str, Any]], str | None]:
    centers = lerp_centers(routes)
    if not centers:
        return [], "fixed route blocks unavailable"
    query = overpass_query(centers)
    last: str | None = None
    for attempt in range(max(1, attempts)):
        endpoint = ENDPOINTS[attempt % len(ENDPOINTS)]
        try:
            data = urllib.parse.urlencode({"data": query}).encode("utf-8")
            req = urllib.request.Request(endpoint, data=data, method="POST", headers={
                "User-Agent": "TratenWaterAuditV2/1.5.8 (+https://otenki.onrender.com/)",
                "Content-Type": "application/x-www-form-urlencoded",
            })
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                payload = json.loads(resp.read().decode("utf-8", "replace"))
            return parse_osm_candidates(mountain, payload, routes), None
        except urllib.error.HTTPError as exc:
            last = f"{endpoint}: HTTP {exc.code}"
        except Exception as exc:
            last = f"{endpoint}: {type(exc).__name__}: {exc}"
        if attempt + 1 < attempts:
            time.sleep(1.0)
    return [], last


def read_public_seeds() -> list[dict[str, Any]]:
    if not SEEDS_CSV.exists():
        return []
    out: list[dict[str, Any]] = []
    with SEEDS_CSV.open(encoding="utf-8-sig", newline="") as fh:
        for i, row in enumerate(csv.DictReader(fh), 2):
            mountain = str(row.get("mountain") or "").strip()
            name = str(row.get("name") or "").strip()
            if not mountain or not name:
                continue
            try:
                lat = float(row.get("lat") or "")
                lon = float(row.get("lon") or "")
            except ValueError:
                raise ValueError(f"{SEEDS_CSV.name}:{i}: lat/lon must be published numeric coordinates")
            if not (-90 <= lat <= 90 and -180 <= lon <= 180):
                raise ValueError(f"{SEEDS_CSV.name}:{i}: invalid lat/lon")
            source_url = str(row.get("source_url") or "").strip()
            source_name = str(row.get("source_name") or "").strip()
            if not source_url.startswith("http") or not source_name:
                raise ValueError(f"{SEEDS_CSV.name}:{i}: source_name and public source_url are required")
            out.append({
                "mountain": mountain,
                "name": name,
                "lat": round(lat, 6),
                "lon": round(lon, 6),
                "kind": str(row.get("kind") or "水場").strip() or "水場",
                "potability": str(row.get("potability") or "unknown").strip() or "unknown",
                "near_point": str(row.get("near_point") or "").strip(),
                "route_distance_m": None,
                "source_type": "public_seed",
                "source_name": source_name,
                "source_url": source_url,
                "source_id": str(row.get("source_id") or "").strip(),
                "source_note": str(row.get("source_note") or "").strip(),
                "score": 9,
                "review_priority": "high",
                "suspicious": False,
                "score_reasons": ["published-coordinate", "curated-public-source"],
            })
    return out


def fetch_json_url(url: str, timeout: int = 8) -> dict[str, Any] | None:
    try:
        req = urllib.request.Request(url, headers={"User-Agent":"TratenWaterAuditV2/1.5.8"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data if isinstance(data, dict) else None
    except Exception:
        return None


def load_existing_fixed() -> dict[str, list[dict[str, Any]]]:
    data = fetch_json_url(EXISTING_CACHE_URL) or fetch_json_url(BOOTSTRAP_CACHE_URL) or {}
    mountains = data.get("mountains") or {}
    out: dict[str, list[dict[str, Any]]] = {}
    for m, row in mountains.items():
        if isinstance(row, dict):
            out[m] = [x for x in (row.get("sources") or []) if isinstance(x, dict)]
    return out


def mark_existing(rows: list[dict[str, Any]], fixed: dict[str, list[dict[str, Any]]]) -> None:
    for row in rows:
        existing = fixed.get(row["mountain"]) or []
        hit = None
        for item in existing:
            try:
                d = legacy.haversine(row["lat"], row["lon"], float(item["lat"]), float(item["lon"]))
            except Exception:
                continue
            if d < 90:
                hit = item
                break
        row["already_fixed"] = bool(hit)
        if hit:
            row["fixed_name"] = str(hit.get("name") or "")


def merge_sources(osm_rows: list[dict[str, Any]], seed_rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    rows = list(seed_rows) + list(osm_rows)
    merged: list[dict[str, Any]] = []
    for row in sorted(rows, key=lambda r: (r["mountain"], -int(r.get("score") or 0), str(r.get("name") or ""))):
        same = next((q for q in merged if q["mountain"] == row["mountain"] and legacy.haversine(row["lat"], row["lon"], q["lat"], q["lon"]) < 80), None)
        if same is None:
            row["supporting_sources"] = [{"source_name":row.get("source_name"),"source_url":row.get("source_url"),"source_type":row.get("source_type")}]
            merged.append(row)
        else:
            same.setdefault("supporting_sources", []).append({"source_name":row.get("source_name"),"source_url":row.get("source_url"),"source_type":row.get("source_type")})
            if int(row.get("score") or 0) > int(same.get("score") or 0):
                keep_sources = same["supporting_sources"]
                same.update(row)
                same["supporting_sources"] = keep_sources
            if len(same["supporting_sources"]) >= 2:
                same["score"] = max(int(same.get("score") or 0), 10)
                same["review_priority"] = "high"
                if "multi-source" not in same.setdefault("score_reasons", []):
                    same["score_reasons"].append("multi-source")
    return merged


def load_previous() -> dict[str, Any]:
    if not OUT_JSON.exists():
        return {"mountains": {}}
    try:
        data = json.loads(OUT_JSON.read_text(encoding="utf-8"))
        return data if isinstance(data, dict) else {"mountains": {}}
    except Exception:
        return {"mountains": {}}


def write_outputs(targets: list[str], state: dict[str, Any], fixed_loaded: bool) -> None:
    state["schema_version"] = 1
    state["app_version"] = "1.5.8"
    state["scope"] = "Northern Alps + Central Alps + Southern Alps + Yatsugatake"
    state["generated_at"] = now_iso()
    state["target_count"] = len(targets)
    state["fixed_cache_comparison"] = "available" if fixed_loaded else "unavailable"
    state["rules"] = {
        "corridor_step_m": CORRIDOR_STEP_M,
        "query_radius_m": QUERY_RADIUS_M,
        "max_route_distance_m": MAX_ROUTE_DISTANCE_M,
        "promotion": "manual review only; never auto-write fixed water cache",
        "coordinates": "published coordinates only; never guessed",
    }
    OUT_JSON.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    flat: list[dict[str, Any]] = []
    for m in targets:
        row = (state.get("mountains") or {}).get(m) or {}
        for c in row.get("candidates") or []:
            flat.append(c)
    fields = ["mountain","name","lat","lon","kind","potability","near_point","route_distance_m","source_type","source_name","source_url","score","review_priority","suspicious","already_fixed","fixed_name","status","score_reasons"]
    with OUT_CSV.open("w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=fields, extrasaction="ignore")
        w.writeheader()
        for c in flat:
            x = dict(c)
            x["status"] = "existing" if c.get("already_fixed") else ("review" if not c.get("suspicious") else "reject_suspected")
            x["score_reasons"] = ";".join(c.get("score_reasons") or [])
            w.writerow(x)

    checked = sum(1 for m in targets if ((state.get("mountains") or {}).get(m) or {}).get("checked") is True)
    unresolved = len(targets) - checked
    new_candidates = [c for c in flat if not c.get("already_fixed") and not c.get("suspicious")]
    high = [c for c in new_candidates if c.get("review_priority") == "high"]
    lines = [
        "# 水場拡張監査 V2 — アルプス＋八ヶ岳",
        "",
        f"- 対象山: {len(targets)}",
        f"- 監査済み: {checked}",
        f"- 未監査/再試行: {unresolved}",
        f"- 候補総数: {len(flat)}",
        f"- 既存固定と重複: {sum(1 for c in flat if c.get('already_fixed'))}",
        f"- 新規レビュー候補: {len(new_candidates)}",
        f"- 高優先度候補: {len(high)}",
        "",
        "## 仕組み",
        "- OSM/Overpassは代表ルートを約650m間隔で補間したルート帯を高感度検索。",
        "- drinking_water / spring / water_tap / water_well / water_point 等を候補化。",
        "- ルートからの距離、飲用タグ、名称、タグ種別で優先度をスコアリング。",
        "- 温泉・足湯等は、明示的な飲用タグがない限り疑義候補として自動降格。",
        "- YAMAP・ヤマレコ・自治体・山小屋等は、公開座標を確認したものだけ seed CSV に取り込み可能。",
        "- 候補は固定水場DBへ自動登録しない。人の確認後に昇格する。",
        "",
        "## 高優先度の新規候補",
    ]
    for c in high[:80]:
        lines.append(f"- {c['mountain']}｜{c['name']}｜{c.get('kind')}｜route {c.get('route_distance_m','-')}m｜{c.get('source_name')}｜score {c.get('score')}")
    if not high:
        lines.append("- まだありません（Actionsで候補監査を実行してください）。")
    OUT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--resume", action="store_true")
    ap.add_argument("--max-mountains", type=int, default=0)
    ap.add_argument("--timeout", type=int, default=12)
    ap.add_argument("--attempts", type=int, default=3)
    ap.add_argument("--sleep", type=float, default=0.5)
    ap.add_argument("--include-low", action="store_true", help="retain low-score candidates; default already retains them in JSON/CSV for review")
    args = ap.parse_args()

    targets = target_mountains()
    route_map, route_modes = route_geometry_for_targets(targets)
    missing = [m for m in targets if not route_map[m]]
    if args.dry_run:
        print(f"V2 target mountains: {len(targets)}")
        corridor_count = sum(1 for m in targets if route_modes[m] == "route-corridor")
        fallback_count = sum(1 for m in targets if route_modes[m] == "fixed-point-buffer")
        print(f"Route geometry available: {len(targets)-len(missing)}/{len(targets)}")
        print(f"Modes: route-corridor={corridor_count} fixed-point-buffer={fallback_count}")
        if missing:
            print("Missing route blocks:", ", ".join(missing))
            return 1
        counts = [len(lerp_centers(route_map[m])) for m in targets]
        print(f"Corridor centers: total={sum(counts)} max/mountain={max(counts) if counts else 0}")
        seeds = read_public_seeds()
        bad_seed_mountains = sorted({r['mountain'] for r in seeds if r['mountain'] not in targets})
        if bad_seed_mountains:
            print("Seed mountains outside scope:", ", ".join(bad_seed_mountains))
            return 1
        print(f"Public-source seeds: {len(seeds)}")
        print("Dry-run OK: no Overpass requests were sent.")
        return 0

    state = load_previous() if args.resume else {"mountains": {}}
    mountains_state = state.setdefault("mountains", {})
    if args.resume:
        unresolved = [m for m in targets if not ((mountains_state.get(m) or {}).get("checked") is True)]
        order = {m: i for i, m in enumerate(targets)}
        def retry_key(m: str):
            row = mountains_state.get(m) or {}
            stamp = str(row.get("checked_at") or "")
            # Never-attempted mountains first, then oldest failed attempts.
            return (0 if not stamp else 1, stamp, order[m])
        pending = sorted(unresolved, key=retry_key)
    else:
        pending = list(targets)
    if args.max_mountains > 0:
        pending = pending[:args.max_mountains]

    seeds = read_public_seeds()
    seeds_by_m: dict[str, list[dict[str, Any]]] = {}
    for r in seeds:
        if r["mountain"] in targets:
            seeds_by_m.setdefault(r["mountain"], []).append(r)

    fixed = load_existing_fixed()
    fixed_loaded = bool(fixed)

    for idx, mountain in enumerate(pending, 1):
        routes = route_map[mountain]
        osm_rows, error = fetch_osm(mountain, routes, timeout=max(4,args.timeout), attempts=max(1,args.attempts))
        seed_rows = seeds_by_m.get(mountain, [])
        # Attach route distance to curated public seeds for review usefulness.
        for row in seed_rows:
            dist, near = nearest_route(row["lat"], row["lon"], routes)
            row["route_distance_m"] = int(round(dist))
            if not row.get("near_point"):
                row["near_point"] = near
            if dist > MAX_ROUTE_DISTANCE_M:
                row["score_reasons"] = list(row.get("score_reasons") or []) + ["outside-route-corridor"]
        merged = merge_sources(osm_rows, seed_rows)
        mark_existing(merged, fixed)
        mountains_state[mountain] = {
            "checked": error is None,
            "checked_at": now_iso(),
            "error": error,
            "route_mode": route_modes[mountain],
            "route_blocks": len(routes),
            "corridor_centers": len(lerp_centers(routes)),
            "candidate_count": len(merged),
            "new_candidate_count": sum(1 for c in merged if not c.get("already_fixed") and not c.get("suspicious")),
            "candidates": merged,
        }
        write_outputs(targets, state, fixed_loaded)
        if error:
            print(f"[{idx}/{len(pending)}] ERR {mountain}: {error}", flush=True)
        else:
            newc = mountains_state[mountain]["new_candidate_count"]
            print(f"[{idx}/{len(pending)}] OK {mountain}: candidates={len(merged)} new={newc}", flush=True)
        if args.sleep:
            time.sleep(args.sleep)

    # Ensure seed-only candidates for already-checked mountains are not silently lost on resume.
    write_outputs(targets, state, fixed_loaded)
    checked = sum(1 for m in targets if ((mountains_state.get(m) or {}).get("checked") is True))
    total_candidates = sum(len(((mountains_state.get(m) or {}).get("candidates") or [])) for m in targets)
    print(f"SUMMARY checked={checked}/{len(targets)} candidates={total_candidates} fixed_compare={'yes' if fixed_loaded else 'no'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
