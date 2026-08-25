#!/usr/bin/env python3
"""Mountain Weather Decision V5.5.1 production web server.

Serves the static frontend and provides same-origin proxy endpoints for the
external weather / geocoding / elevation / Overpass services used by app.js.
Designed to run locally with `python server.py` and in production with Gunicorn.
"""

from __future__ import annotations

import gzip
import hmac
import hashlib
import heapq
import json
import math
import os
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
import tempfile
from datetime import datetime, timezone, timedelta
from collections import OrderedDict
from typing import Any

from flask import Flask, Response, jsonify, request, send_from_directory

BASE = os.path.dirname(os.path.abspath(__file__))
APP_VERSION = "1.4.108"
PORT = int(os.environ.get("PORT", "8000"))
UPSTREAM_TIMEOUT = int(os.environ.get("UPSTREAM_TIMEOUT", "45"))
OVERPASS_TIMEOUT = int(os.environ.get("OVERPASS_TIMEOUT", "70"))
CACHE_TTL = int(os.environ.get("CACHE_TTL", "900"))
OVERPASS_CACHE_TTL = int(os.environ.get("OVERPASS_CACHE_TTL", "86400"))
CACHE_MAX_ITEMS = int(os.environ.get("CACHE_MAX_ITEMS", "256"))
MAX_OVERPASS_BYTES = int(os.environ.get("MAX_OVERPASS_BYTES", str(512 * 1024)))



SUPABASE_URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
USAGE_LOG_STDOUT = os.environ.get("USAGE_LOG_STDOUT", "1").lower() not in {"0", "false", "no"}
USAGE_EVENT_TIMEOUT = int(os.environ.get("USAGE_EVENT_TIMEOUT", "8"))
USAGE_EVENT_MAX_BYTES = int(os.environ.get("USAGE_EVENT_MAX_BYTES", str(32 * 1024)))
USAGE_DASHBOARD_USERNAME = os.environ.get("USAGE_DASHBOARD_USERNAME", "admin")
USAGE_DASHBOARD_PASSWORD = os.environ.get("USAGE_DASHBOARD_PASSWORD", "")
USAGE_DASHBOARD_MAX_EVENTS = int(os.environ.get("USAGE_DASHBOARD_MAX_EVENTS", "50000"))

INDEXNOW_KEY = "5d55ce5ee953aa38b715681f5207ee3d"
INDEXNOW_KEY_FILENAME = f"{INDEXNOW_KEY}.txt"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow"
INDEXNOW_HOST = "otenki.onrender.com"
INDEXNOW_PUBLIC_URLS = [
    "https://otenki.onrender.com/",
    "https://otenki.onrender.com/guide.html",
]

ALLOWED_EVENT_NAMES = {
    "page_view",
    "route_candidates_loaded",
    "route_created",
    "trail_route_calculated",
    "arrival_times_calculated",
    "weather_analysis",
    "mountain_selected",
    "point_selected",
    "route_point_used",
}

ALLOWED_HOSTS = {
    "api.open-meteo.com",
    "air-quality-api.open-meteo.com",
    "geocoding-api.open-meteo.com",
    "nominatim.openstreetmap.org",
    "api.met.no",
}

OVERPASS_ENDPOINTS = [
    x.strip()
    for x in os.environ.get(
        "OVERPASS_ENDPOINTS",
        "https://overpass-api.de/api/interpreter,"
        "https://overpass.kumi.systems/api/interpreter,"
        "https://lz4.overpass-api.de/api/interpreter,"
        "https://overpass.private.coffee/api/interpreter",
    ).split(",")
    if x.strip()
]

UA = os.environ.get(
    "UPSTREAM_USER_AGENT",
    "TraverseWeatherDecision/1.4.21",
)

METNO_USER_AGENT = os.environ.get(
    "METNO_USER_AGENT",
    "TRATEN/1.4.21 https://juusoutenki.onrender.com",
)

NOAA_GFS_FILTER = os.environ.get(
    "NOAA_GFS_FILTER",
    "https://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl",
)
NOAA_GFS_TIMEOUT = int(os.environ.get("NOAA_GFS_TIMEOUT", "35"))
NOAA_GFS_CACHE_TTL = int(os.environ.get("NOAA_GFS_CACHE_TTL", "1800"))

app = Flask(__name__, static_folder=None)
app.config["MAX_CONTENT_LENGTH"] = MAX_OVERPASS_BYTES

_cache: "OrderedDict[str, tuple[float, int, str, bytes]]" = OrderedDict()
_cache_lock = threading.Lock()

# Open-Meteo free endpoints can return HTTP 429 when several model requests
# arrive in a burst. Serialize those calls, keep a small gap between them, and
# retry briefly when the upstream asks us to slow down.
_openmeteo_lock = threading.Lock()
_openmeteo_last_request = 0.0
OPENMETEO_MIN_INTERVAL = float(os.environ.get("OPENMETEO_MIN_INTERVAL", "3.2"))
OPENMETEO_MAX_RETRIES = int(os.environ.get("OPENMETEO_MAX_RETRIES", "4"))
OPENMETEO_PROXY_CACHE_TTL = int(os.environ.get("OPENMETEO_PROXY_CACHE_TTL", "1800"))
NATIONAL_OUTLOOK_CACHE_TTL = int(os.environ.get("NATIONAL_OUTLOOK_CACHE_TTL", "14400"))
NATIONAL_OUTLOOK_STALE_TTL = int(os.environ.get("NATIONAL_OUTLOOK_STALE_TTL", "86400"))
NATIONAL_OUTLOOK_REFRESH_INTERVAL = int(os.environ.get("NATIONAL_OUTLOOK_REFRESH_INTERVAL", "900"))
NATIONAL_OUTLOOK_CHUNK_SIZE = int(os.environ.get("NATIONAL_OUTLOOK_CHUNK_SIZE", "50"))
NATIONAL_OUTLOOK_CACHE_DIR = os.environ.get("NATIONAL_OUTLOOK_CACHE_DIR", os.path.join(tempfile.gettempdir(), "traten-national-outlook"))
os.makedirs(NATIONAL_OUTLOOK_CACHE_DIR, exist_ok=True)
_national_point_cache: dict[str, tuple[float, dict[str, Any]]] = {}
_national_point_cache_lock = threading.Lock()
_national_refresh_thread_started = False
_national_refresh_thread_lock = threading.Lock()

TRAIL_DATA_DIR = os.path.join(BASE, "trail_data")
TRAIL_GRAPH_CACHE_MAX = int(os.environ.get("TRAIL_GRAPH_CACHE_MAX", "2"))
_trail_graph_cache: "OrderedDict[str, dict[str, Any]]" = OrderedDict()
_trail_graph_lock = threading.Lock()


def _load_trail_manifest() -> dict[str, Any]:
    path = os.path.join(TRAIL_DATA_DIR, "manifest.json")
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"schema": 1, "regions": []}


def _haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    r = 6371000.0
    p = math.pi / 180.0
    dlat = (lat2 - lat1) * p
    dlon = (lon2 - lon1) * p
    x = math.sin(dlat / 2) ** 2 + math.cos(lat1 * p) * math.cos(lat2 * p) * math.sin(dlon / 2) ** 2
    return 2 * r * math.asin(math.sqrt(x))


def _load_trail_graph(region: dict[str, Any]) -> dict[str, Any] | None:
    rid = str(region.get("id") or "")
    if not rid or not region.get("ready"):
        return None
    with _trail_graph_lock:
        if rid in _trail_graph_cache:
            _trail_graph_cache.move_to_end(rid)
            return _trail_graph_cache[rid]
    filename = os.path.basename(str(region.get("file") or f"{rid}.json.gz"))
    path = os.path.join(TRAIL_DATA_DIR, filename)
    if not os.path.isfile(path):
        return None
    try:
        with gzip.open(path, "rt", encoding="utf-8") as f:
            raw = json.load(f)
        nodes = {int(row[0]): (float(row[1]), float(row[2])) for row in raw.get("nodes", [])}
        adj: dict[int, list[tuple[int, float]]] = {}
        for row in raw.get("edges", []):
            a, b, w = int(row[0]), int(row[1]), float(row[2])
            if a not in nodes or b not in nodes:
                continue
            adj.setdefault(a, []).append((b, w))
            adj.setdefault(b, []).append((a, w))
        graph = {"nodes": nodes, "adj": adj, "region": rid, "name": region.get("name") or rid}
        with _trail_graph_lock:
            _trail_graph_cache[rid] = graph
            _trail_graph_cache.move_to_end(rid)
            while len(_trail_graph_cache) > max(1, TRAIL_GRAPH_CACHE_MAX):
                _trail_graph_cache.popitem(last=False)
        return graph
    except Exception as exc:
        print(f"[trail-graph-load-error] {rid}: {exc}", flush=True)
        return None


def _nearest_trail_node(graph: dict[str, Any], lat: float, lon: float) -> tuple[int, float] | None:
    best_id = None
    best_dist = float("inf")
    for nid, (nlat, nlon) in graph["nodes"].items():
        d = _haversine(lat, lon, nlat, nlon)
        if d < best_dist:
            best_id, best_dist = nid, d
    return (best_id, best_dist) if best_id is not None else None


def _astar_trail(graph: dict[str, Any], start: int, goal: int) -> list[int] | None:
    nodes = graph["nodes"]
    adj = graph["adj"]
    if start == goal:
        return [start]
    goal_lat, goal_lon = nodes[goal]
    heap: list[tuple[float, int]] = [(0.0, start)]
    g = {start: 0.0}
    came: dict[int, int] = {}
    closed: set[int] = set()
    while heap:
        _, cur = heapq.heappop(heap)
        if cur in closed:
            continue
        if cur == goal:
            path = [cur]
            while cur in came:
                cur = came[cur]
                path.append(cur)
            path.reverse()
            return path
        closed.add(cur)
        base = g[cur]
        for nxt, weight in adj.get(cur, []):
            tentative = base + weight
            if tentative >= g.get(nxt, float("inf")):
                continue
            came[nxt] = cur
            g[nxt] = tentative
            lat, lon = nodes[nxt]
            h = _haversine(lat, lon, goal_lat, goal_lon)
            heapq.heappush(heap, (tentative + h, nxt))
    return None


def _simplify_trail(coords: list[dict[str, float]], min_m: float = 55.0) -> list[dict[str, float]]:
    if len(coords) <= 2:
        return coords
    out = [coords[0]]
    last = coords[0]
    for p in coords[1:-1]:
        if _haversine(last["lat"], last["lon"], p["lat"], p["lon"]) >= min_m:
            out.append(p)
            last = p
    out.append(coords[-1])
    return out


def _candidate_trail_regions(lat1: float, lon1: float, lat2: float, lon2: float) -> list[dict[str, Any]]:
    manifest = _load_trail_manifest()
    candidates = []
    for region in manifest.get("regions", []):
        if not region.get("ready"):
            continue
        bbox = region.get("bbox") or []
        if len(bbox) != 4:
            continue
        south, west, north, east = map(float, bbox)
        pad = 0.02
        inside1 = south-pad <= lat1 <= north+pad and west-pad <= lon1 <= east+pad
        inside2 = south-pad <= lat2 <= north+pad and west-pad <= lon2 <= east+pad
        if inside1 and inside2:
            candidates.append(region)
    return candidates



def _clean_text(value: Any, limit: int = 500) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text[:limit] if text else None


def _clean_int(value: Any, minimum: int = 0, maximum: int = 10_000_000) -> int | None:
    if value is None or value == "":
        return None
    try:
        number = int(round(float(value)))
    except (TypeError, ValueError):
        return None
    return max(minimum, min(maximum, number))


def _sanitize_metadata(value: Any) -> dict[str, Any]:
    if not isinstance(value, dict):
        return {}
    # Keep analytics payloads small and deliberately exclude common identity fields.
    blocked = {"ip", "ip_address", "email", "name", "user_agent", "ua", "phone", "address"}
    out: dict[str, Any] = {}
    for key, val in list(value.items())[:24]:
        k = str(key)[:64]
        if k.lower() in blocked:
            continue
        if isinstance(val, (str, int, float, bool)) or val is None:
            out[k] = val if not isinstance(val, str) else val[:300]
    return out


def _usage_row(payload: dict[str, Any]) -> dict[str, Any]:
    event_name = _clean_text(payload.get("event_name"), 80)
    if event_name not in ALLOWED_EVENT_NAMES:
        raise ValueError("unknown event_name")
    session_id = _clean_text(payload.get("session_id"), 80)
    if not session_id:
        raise ValueError("session_id is required")
    return {
        "session_id": session_id,
        "app_version": _clean_text(payload.get("app_version"), 20) or APP_VERSION,
        "event_name": event_name,
        "success": bool(payload.get("success")) if payload.get("success") is not None else None,
        "duration_ms": _clean_int(payload.get("duration_ms"), 0, 3_600_000),
        "mountain": _clean_text(payload.get("mountain"), 120),
        "route_points": _clean_int(payload.get("route_points"), 0, 200),
        "stay_count": _clean_int(payload.get("stay_count"), 0, 30),
        "error_message": _clean_text(payload.get("error_message"), 700),
        "metadata": _sanitize_metadata(payload.get("metadata")),
    }


def _supabase_headers(*, accept_json: bool = False) -> dict[str, str]:
    """Build Data API headers for both new sb_secret_* keys and legacy service_role JWTs."""
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "User-Agent": UA,
    }
    # New Supabase secret keys are not JWTs and must not be sent as Bearer tokens.
    # Legacy service_role keys are JWTs and can continue to use Authorization.
    if SUPABASE_SERVICE_ROLE_KEY and not SUPABASE_SERVICE_ROLE_KEY.startswith("sb_secret_"):
        headers["Authorization"] = f"Bearer {SUPABASE_SERVICE_ROLE_KEY}"
    if accept_json:
        headers["Accept"] = "application/json"
    return headers


def _write_supabase_event(row: dict[str, Any]) -> bool:
    if not (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY):
        return False
    url = f"{SUPABASE_URL}/rest/v1/usage_events"
    body = json.dumps(row, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        method="POST",
        headers={
            **_supabase_headers(),
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
    )
    with urllib.request.urlopen(req, timeout=USAGE_EVENT_TIMEOUT) as resp:
        return 200 <= resp.status < 300

def _dashboard_auth_ok() -> bool:
    if not USAGE_DASHBOARD_PASSWORD:
        return False
    auth = request.authorization
    if not auth:
        return False
    return hmac.compare_digest(auth.username or "", USAGE_DASHBOARD_USERNAME) and hmac.compare_digest(auth.password or "", USAGE_DASHBOARD_PASSWORD)


def _dashboard_unauthorized():
    if not USAGE_DASHBOARD_PASSWORD:
        return Response(
            "USAGE_DASHBOARD_PASSWORD is not configured on the server.",
            status=503,
            content_type="text/plain; charset=utf-8",
        )
    response = Response("Authentication required", status=401, content_type="text/plain; charset=utf-8")
    response.headers["WWW-Authenticate"] = 'Basic realm="TRATEN Usage Dashboard", charset="UTF-8"'
    return response


def _submit_indexnow(urls: list[str]) -> tuple[int, str]:
    allowed_prefix = f"https://{INDEXNOW_HOST}/"
    clean_urls: list[str] = []
    for url in urls:
        if not isinstance(url, str):
            continue
        url = url.strip()
        if url == f"https://{INDEXNOW_HOST}" or url.startswith(allowed_prefix):
            if url not in clean_urls:
                clean_urls.append(url)
    if not clean_urls:
        raise ValueError("No valid IndexNow URLs were supplied.")

    body = json.dumps(
        {
            "host": INDEXNOW_HOST,
            "key": INDEXNOW_KEY,
            "keyLocation": f"https://{INDEXNOW_HOST}/{INDEXNOW_KEY_FILENAME}",
            "urlList": clean_urls,
        },
        ensure_ascii=False,
        separators=(",", ":"),
    ).encode("utf-8")
    req = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=body,
        method="POST",
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Traten-IndexNow/1.0",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            detail = resp.read(1000).decode("utf-8", errors="replace")
            return resp.status, detail
    except urllib.error.HTTPError as exc:
        detail = exc.read(1000).decode("utf-8", errors="replace")
        return exc.code, detail


def _supabase_read_usage_events(days: int | None) -> list[dict[str, Any]]:
    if not (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY):
        raise RuntimeError("Supabase is not configured")
    params = {
        "select": "created_at,session_id,event_name,success,mountain,duration_ms,route_points,stay_count,error_message,metadata",
        "order": "created_at.desc",
    }
    if days is not None:
        since = datetime.now(timezone.utc) - timedelta(days=days)
        params["created_at"] = "gte." + since.isoformat().replace("+00:00", "Z")
    query = urllib.parse.urlencode(params, safe=",.:+-")
    url = f"{SUPABASE_URL}/rest/v1/usage_events?{query}"
    events: list[dict[str, Any]] = []
    page_size = 1000
    for offset in range(0, USAGE_DASHBOARD_MAX_EVENTS, page_size):
        end = min(offset + page_size - 1, USAGE_DASHBOARD_MAX_EVENTS - 1)
        req = urllib.request.Request(
            url,
            headers={
                **_supabase_headers(accept_json=True),
                "Range": f"{offset}-{end}",
                "Range-Unit": "items",
            },
        )
        with urllib.request.urlopen(req, timeout=max(USAGE_EVENT_TIMEOUT, 15)) as resp:
            rows = json.loads(resp.read().decode("utf-8"))
        if not isinstance(rows, list):
            break
        events.extend(rows)
        if len(rows) < page_size:
            break
    return events


def _usage_dashboard_summary(events: list[dict[str, Any]]) -> dict[str, Any]:
    sessions = {str(e.get("session_id") or "") for e in events if e.get("session_id")}
    page_views = sum(1 for e in events if e.get("event_name") == "page_view")
    analyses_ok = sum(1 for e in events if e.get("event_name") == "weather_analysis" and e.get("success") is True)
    analyses_failed = sum(1 for e in events if e.get("event_name") == "weather_analysis" and e.get("success") is False)

    # Day-by-day usage trend in Japan Standard Time.
    jst = timezone(timedelta(hours=9))
    daily_map: dict[str, dict[str, Any]] = {}
    for e in events:
        raw_created = str(e.get("created_at") or "")
        try:
            created_dt = datetime.fromisoformat(raw_created.replace("Z", "+00:00"))
            if created_dt.tzinfo is None:
                created_dt = created_dt.replace(tzinfo=timezone.utc)
            day = created_dt.astimezone(jst).date().isoformat()
        except Exception:
            continue
        row = daily_map.setdefault(day, {
            "date": day, "sessions": set(), "page_views": 0,
            "analyses_ok": 0, "analyses_failed": 0,
        })
        session_id = str(e.get("session_id") or "")
        if session_id:
            row["sessions"].add(session_id)
        event_name = str(e.get("event_name") or "")
        if event_name == "page_view":
            row["page_views"] += 1
        if event_name == "weather_analysis" and e.get("success") is True:
            row["analyses_ok"] += 1
        if event_name == "weather_analysis" and e.get("success") is False:
            row["analyses_failed"] += 1

    daily_trend = []
    for day in sorted(daily_map):
        row = daily_map[day]
        daily_trend.append({
            "date": row["date"],
            "unique_sessions": len(row["sessions"]),
            "page_views": row["page_views"],
            "analyses_ok": row["analyses_ok"],
            "analyses_failed": row["analyses_failed"],
        })

    mountain_map: dict[str, dict[str, Any]] = {}
    place_map: dict[tuple[str, str, str], dict[str, Any]] = {}

    def mountain_row(name: str):
        return mountain_map.setdefault(name, {
            "mountain": name, "selected_count": 0, "analysis_count": 0,
            "sessions": set(), "last_used": "",
        })

    for e in events:
        event = str(e.get("event_name") or "")
        meta = e.get("metadata") if isinstance(e.get("metadata"), dict) else {}
        mountain = str(e.get("mountain") or meta.get("mountain") or "").strip()
        session = str(e.get("session_id") or "")
        created = str(e.get("created_at") or "")

        if mountain and event in {"mountain_selected", "weather_analysis", "route_candidates_loaded", "route_point_used", "point_selected"}:
            mr = mountain_row(mountain)
            if event == "mountain_selected":
                mr["selected_count"] += 1
            if event == "weather_analysis" and e.get("success") is True:
                mr["analysis_count"] += 1
            if session:
                mr["sessions"].add(session)
            if created > mr["last_used"]:
                mr["last_used"] = created

        if event not in {"point_selected", "route_point_used"}:
            continue
        point_name = str(meta.get("point_name") or "").strip()
        point_type = str(meta.get("point_type") or "other").strip() or "other"
        if not point_name:
            continue
        key = (mountain, point_name, point_type)
        pr = place_map.setdefault(key, {
            "mountain": mountain, "point_name": point_name, "point_type": point_type,
            "role": str(meta.get("point_role") or ""), "source": str(meta.get("source") or ""),
            "selected_count": 0, "used_count": 0, "sessions": set(), "last_used": "",
        })
        if event == "point_selected":
            pr["selected_count"] += 1
        else:
            pr["used_count"] += 1
        if session:
            pr["sessions"].add(session)
        if created > pr["last_used"]:
            pr["last_used"] = created
        if not pr["role"] and meta.get("point_role"):
            pr["role"] = str(meta.get("point_role"))

    mountains = []
    for row in mountain_map.values():
        row["unique_sessions"] = len(row.pop("sessions"))
        # Do not show incidental mountain context unless it was actually selected or analyzed.
        if row["selected_count"] <= 0 and row["analysis_count"] <= 0:
            continue
        mountains.append(row)
    mountains.sort(key=lambda x: (-x["analysis_count"], -x["selected_count"], x["mountain"]))

    places = []
    for row in place_map.values():
        row["unique_sessions"] = len(row.pop("sessions"))
        places.append(row)
    places.sort(key=lambda x: (-x["used_count"], -x["selected_count"], x["mountain"], x["point_name"]))

    recent_failures = [
        {
            "created_at": e.get("created_at"), "event_name": e.get("event_name"),
            "mountain": e.get("mountain"), "error_message": e.get("error_message"),
        }
        for e in events if e.get("success") is False
    ][:100]

    return {
        "ok": True,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "events_loaded": len(events),
        "truncated": len(events) >= USAGE_DASHBOARD_MAX_EVENTS,
        "summary": {
            "unique_sessions": len(sessions), "page_views": page_views,
            "analyses_ok": analyses_ok, "analyses_failed": analyses_failed,
        },
        "mountains": mountains,
        "places": places,
        "daily_trend": daily_trend,
        "recent_failures": recent_failures,
    }


def _cache_get(key: str):
    now = time.time()
    with _cache_lock:
        item = _cache.get(key)
        if not item:
            return None
        expires, status, ctype, body = item
        if expires <= now:
            _cache.pop(key, None)
            return None
        _cache.move_to_end(key)
        return status, ctype, body


def _cache_put(key: str, status: int, ctype: str, body: bytes, ttl: int | None = None):
    cache_ttl = CACHE_TTL if ttl is None else ttl
    if cache_ttl <= 0 or status != 200:
        return
    with _cache_lock:
        _cache[key] = (time.time() + cache_ttl, status, ctype, body)
        _cache.move_to_end(key)
        while len(_cache) > CACHE_MAX_ITEMS:
            _cache.popitem(last=False)


def _request_url(url: str, timeout: int = UPSTREAM_TIMEOUT):
    global _openmeteo_last_request
    host = urllib.parse.urlparse(url).hostname or ""
    is_openmeteo = host.endswith("open-meteo.com")
    attempts = OPENMETEO_MAX_RETRIES + 1 if is_openmeteo else 1

    for attempt in range(attempts):
        try:
            if is_openmeteo:
                with _openmeteo_lock:
                    wait = OPENMETEO_MIN_INTERVAL - (time.monotonic() - _openmeteo_last_request)
                    if wait > 0:
                        time.sleep(wait)
                    req = urllib.request.Request(
                        url,
                        headers={"User-Agent": UA, "Accept": "application/json"},
                    )
                    try:
                        with urllib.request.urlopen(req, timeout=timeout) as resp:
                            result = (resp.status, resp.headers.get("Content-Type", "application/json"), resp.read())
                    finally:
                        _openmeteo_last_request = time.monotonic()
                    return result

            req = urllib.request.Request(
                url,
                headers={"User-Agent": (METNO_USER_AGENT if host == "api.met.no" else UA), "Accept": "application/json"},
            )
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.status, resp.headers.get("Content-Type", "application/json"), resp.read()
        except urllib.error.HTTPError as exc:
            if exc.code != 429 or attempt >= attempts - 1:
                raise
            retry_after = exc.headers.get("Retry-After") if exc.headers else None
            try:
                delay = float(retry_after) if retry_after else 0.0
            except (TypeError, ValueError):
                delay = 0.0
            # Keep retries short enough for Render/Gunicorn request timeouts.
            delay = max(delay, 1.5 * (2 ** attempt))
            time.sleep(min(delay, 12.0))

    raise RuntimeError("upstream request failed")



def _noaa_cycle_candidates(now_utc: datetime) -> list[datetime]:
    """Recent GFS cycles, newest first, with a publication-delay cushion."""
    base = now_utc.replace(minute=0, second=0, microsecond=0)
    # Keep at least ~5h behind wall-clock time so the selected cycle is normally complete.
    base -= timedelta(hours=5)
    cycle_hour = (base.hour // 6) * 6
    first = base.replace(hour=cycle_hour)
    return [first - timedelta(hours=6 * i) for i in range(4)]


def _noaa_forecast_hour(cycle: datetime, target_utc: datetime) -> int | None:
    hours = (target_utc - cycle).total_seconds() / 3600.0
    if hours < 0 or hours > 384:
        return None
    # GFS files are available hourly through 120 h and every 3 h afterwards.
    step = 1 if hours <= 120 else 3
    fh = int(round(hours / step) * step)
    return max(0, min(384, fh))


def _noaa_filter_url(cycle: datetime, fh: int, lat: float, lon: float) -> str:
    # NOMADS uses east-positive longitudes; Japan already falls in 0..180.
    lon360 = lon % 360.0
    pad = 0.35
    params = {
        "file": f"gfs.t{cycle.hour:02d}z.pgrb2.0p25.f{fh:03d}",
        "lev_2_m_above_ground": "on",
        "lev_10_m_above_ground": "on",
        "lev_surface": "on",
        "lev_entire_atmosphere": "on",
        "var_TMP": "on",
        "var_RH": "on",
        "var_UGRD": "on",
        "var_VGRD": "on",
        "var_GUST": "on",
        "var_PRATE": "on",
        "var_TCDC": "on",
        "subregion": "",
        "leftlon": f"{lon360-pad:.2f}",
        "rightlon": f"{lon360+pad:.2f}",
        "toplat": f"{lat+pad:.2f}",
        "bottomlat": f"{lat-pad:.2f}",
        "dir": f"/gfs.{cycle:%Y%m%d}/{cycle.hour:02d}/atmos",
    }
    return NOAA_GFS_FILTER + "?" + urllib.parse.urlencode(params)


def _grib_nearest_value(gid, lat: float, lon: float) -> float | None:
    from eccodes import codes_grib_find_nearest
    try:
        found = codes_grib_find_nearest(gid, lat, lon % 360.0)
        if isinstance(found, dict):
            return float(found.get("value"))
        if found:
            return float(found[0].get("value"))
    except Exception:
        return None
    return None


def _parse_noaa_grib(path: str, lat: float, lon: float) -> dict[str, Any]:
    from eccodes import codes_get, codes_grib_new_from_file, codes_release
    values: dict[str, float] = {}
    with open(path, "rb") as fh:
        while True:
            gid = codes_grib_new_from_file(fh)
            if gid is None:
                break
            try:
                short = str(codes_get(gid, "shortName"))
                level_type = str(codes_get(gid, "typeOfLevel"))
                try:
                    level = float(codes_get(gid, "level"))
                except Exception:
                    level = float("nan")
                val = _grib_nearest_value(gid, lat, lon)
                if val is None or not math.isfinite(val):
                    continue
                if short in {"2t", "t"} and (level_type == "heightAboveGround" and level == 2):
                    values["temp"] = val - 273.15 if val > 150 else val
                elif short in {"2r", "r"} and (level_type == "heightAboveGround" and level == 2):
                    values["rh"] = val
                elif short in {"10u", "u"} and (level_type == "heightAboveGround" and level == 10):
                    values["u"] = val
                elif short in {"10v", "v"} and (level_type == "heightAboveGround" and level == 10):
                    values["v"] = val
                elif short in {"gust", "10fg"}:
                    values["gust"] = val
                elif short in {"prate"}:
                    values["rain"] = max(0.0, val * 3600.0)  # kg m-2 s-1 == mm/s
                elif short in {"tcc", "tcdc"}:
                    values["cloud"] = val * 100.0 if 0.0 <= val <= 1.01 else val
            finally:
                codes_release(gid)
    if "u" in values and "v" in values:
        u, v = values["u"], values["v"]
        values["wind"] = math.hypot(u, v)
        values["windDir"] = (math.degrees(math.atan2(-u, -v)) + 360.0) % 360.0
    return values


def _fetch_noaa_gfs(lat: float, lon: float, target_utc: datetime) -> dict[str, Any]:
    errors: list[str] = []
    for cycle in _noaa_cycle_candidates(datetime.now(timezone.utc)):
        fh = _noaa_forecast_hour(cycle, target_utc)
        if fh is None:
            continue
        url = _noaa_filter_url(cycle, fh, lat, lon)
        cache_key = "noaa-gfs:" + url
        cached = _cache_get(cache_key)
        if cached:
            _, _, body = cached
        else:
            try:
                req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/octet-stream"})
                with urllib.request.urlopen(req, timeout=NOAA_GFS_TIMEOUT) as resp:
                    body = resp.read()
                if not body.startswith(b"GRIB"):
                    errors.append(f"{cycle:%Y%m%d%H} f{fh:03d}: GRIBなし")
                    continue
                _cache_put(cache_key, 200, "application/x-grib2", body, ttl=NOAA_GFS_CACHE_TTL)
            except Exception as exc:
                errors.append(f"{cycle:%Y%m%d%H} f{fh:03d}: {exc}")
                continue
        tmp_path = None
        try:
            with tempfile.NamedTemporaryFile(suffix=".grib2", delete=False) as tmp:
                tmp.write(body)
                tmp_path = tmp.name
            vals = _parse_noaa_grib(tmp_path, lat, lon)
            if "temp" not in vals and "wind" not in vals:
                errors.append(f"{cycle:%Y%m%d%H} f{fh:03d}: 必要変数なし")
                continue
            valid = cycle + timedelta(hours=fh)
            return {
                "ok": True,
                "source": "NOAA GFS direct GRIB2",
                "model_run": cycle.isoformat().replace("+00:00", "Z"),
                "forecast_hour": fh,
                "valid_time": valid.isoformat().replace("+00:00", "Z"),
                "row": {
                    "time": valid.isoformat().replace("+00:00", "Z"),
                    "temp": vals.get("temp"), "rh": vals.get("rh"),
                    "rain": vals.get("rain"), "cloud": vals.get("cloud"),
                    "wind": vals.get("wind"), "gust": vals.get("gust"),
                    "windDir": vals.get("windDir"),
                    "cape": None, "visibility": None, "freezing": None,
                },
            }
        finally:
            if tmp_path:
                try:
                    os.unlink(tmp_path)
                except OSError:
                    pass
    raise RuntimeError(" / ".join(errors[-4:]) or "利用可能なGFSサイクルがありません")


def _request_overpass(endpoint: str, query: str, timeout: int = OVERPASS_TIMEOUT):
    data = urllib.parse.urlencode({"data": query}).encode("utf-8")
    req = urllib.request.Request(
        endpoint,
        data=data,
        method="POST",
        headers={
            "User-Agent": UA,
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.status, resp.headers.get("Content-Type", "application/json"), resp.read()


def _bytes_response(status: int, ctype: str, body: bytes, *, cache_control: str = "no-store"):
    response = Response(body, status=status, content_type=ctype)
    response.headers["Cache-Control"] = cache_control
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


def _national_grade(max_wind: float, max_gust: float, max_rain: float, max_cape: float, min_temp: float, min_visibility: float | None, *, caution_hours: int = 0, severe_hours: int = 0, extreme_hours: int = 0):
    # V1.4.79: 全国簡易判定は「てんくらの感覚」に近づけ、風・雨を主判定にする。
    # 雷(CAPE)・視界・低温は詳細注意情報として残すが、それだけでABCをCへ落とさない。
    # 6〜15時の10時間のうち、強い風雨の継続時間を重視する。
    if extreme_hours >= 1 or severe_hours >= 4:
        return "C", "6〜15時に強い風または雨が見込まれ、登山には厳しめの条件です。時間帯別の詳細を確認してください。"
    if severe_hours >= 1 or caution_hours >= 3:
        return "B", "6〜15時の一部で風または雨の影響が見込まれます。比較的よい時間帯を確認してください。"
    return "A", "6〜15時は風雨の大きな影響が比較的少なく、登山候補にしやすい条件です。詳細分析で最終確認してください。"

def _national_points_fingerprint(points: list[dict[str, Any]]) -> str:
    raw = "|".join(
        f'{p["name"]}:{p["lat"]:.5f}:{p["lon"]:.5f}:{"" if p.get("elevation") is None else round(float(p["elevation"]))}'
        for p in points
    )
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()[:20]


def _national_cache_file(date_text: str, fingerprint: str) -> str:
    return os.path.join(NATIONAL_OUTLOOK_CACHE_DIR, f"{date_text}-{fingerprint}.json")


def _national_read_disk_cache(date_text: str, fingerprint: str) -> tuple[dict[str, Any] | None, str | None]:
    path = _national_cache_file(date_text, fingerprint)
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception:
        return None, None
    now = time.time()
    fresh_until = float(data.get("fresh_until") or 0)
    stale_until = float(data.get("stale_until") or 0)
    if stale_until <= now:
        try: os.unlink(path)
        except OSError: pass
        return None, None
    return data, ("fresh" if fresh_until > now else "stale")


def _national_write_disk_cache(date_text: str, fingerprint: str, points: list[dict[str, Any]], results: list[dict[str, Any]]) -> dict[str, Any]:
    now = time.time()
    data = {
        "date": date_text,
        "fingerprint": fingerprint,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "generated_ts": now,
        "fresh_until": now + NATIONAL_OUTLOOK_CACHE_TTL,
        "stale_until": now + NATIONAL_OUTLOOK_STALE_TTL,
        "points": points,
        "results": results,
        "version": APP_VERSION,
    }
    path = _national_cache_file(date_text, fingerprint)
    tmp = path + f".{os.getpid()}.tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    os.replace(tmp, path)
    return data


def _national_lock_path(date_text: str, fingerprint: str) -> str:
    return _national_cache_file(date_text, fingerprint) + ".lock"


def _national_try_lock(date_text: str, fingerprint: str) -> bool:
    path = _national_lock_path(date_text, fingerprint)
    try:
        os.mkdir(path)
        with open(os.path.join(path, "owner"), "w", encoding="utf-8") as f:
            f.write(f"{os.getpid()} {time.time()}")
        return True
    except FileExistsError:
        try:
            age = time.time() - os.path.getmtime(path)
            if age > 180:
                import shutil
                shutil.rmtree(path, ignore_errors=True)
                os.mkdir(path)
                return True
        except OSError:
            pass
        return False


def _national_unlock(date_text: str, fingerprint: str) -> None:
    import shutil
    shutil.rmtree(_national_lock_path(date_text, fingerprint), ignore_errors=True)


def _national_point_key(date_text: str, p: dict[str, Any]) -> str:
    return f'{date_text}:{p["lat"]:.5f}:{p["lon"]:.5f}:{"" if p.get("elevation") is None else round(float(p["elevation"]))}'


def _national_point_cache_get(date_text: str, p: dict[str, Any]) -> dict[str, Any] | None:
    key = _national_point_key(date_text, p)
    now = time.time()
    with _national_point_cache_lock:
        item = _national_point_cache.get(key)
        if not item: return None
        expires, result = item
        if expires <= now:
            _national_point_cache.pop(key, None)
            return None
        return dict(result)


def _national_point_cache_put(date_text: str, p: dict[str, Any], result: dict[str, Any]) -> None:
    key = _national_point_key(date_text, p)
    with _national_point_cache_lock:
        _national_point_cache[key] = (time.time() + NATIONAL_OUTLOOK_CACHE_TTL, dict(result))
        if len(_national_point_cache) > 2500:
            oldest = sorted(_national_point_cache.items(), key=lambda kv: kv[1][0])[:500]
            for k, _ in oldest: _national_point_cache.pop(k, None)


def _request_openmeteo_national_once(url: str, timeout: int = UPSTREAM_TIMEOUT):
    """One Open-Meteo attempt for national refresh. 429 is not retried here.
    National outlook must stop immediately and fall back to the last-good cache.
    """
    global _openmeteo_last_request
    with _openmeteo_lock:
        wait = OPENMETEO_MIN_INTERVAL - (time.monotonic() - _openmeteo_last_request)
        if wait > 0: time.sleep(wait)
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.status, resp.headers.get("Content-Type", "application/json"), resp.read()
        finally:
            _openmeteo_last_request = time.monotonic()


def _national_result_from_forecast(p: dict[str, Any], forecast: dict[str, Any]) -> dict[str, Any] | None:
    hourly=forecast.get("hourly") or {}; times=hourly.get("time") or []
    idx=[i for i,t in enumerate(times) if isinstance(t,str) and len(t)>=13 and 6 <= int(t[11:13]) <= 15]
    def vals(k):
        a=hourly.get(k) or []; out=[]
        for i in idx:
            try:v=float(a[i])
            except (TypeError,ValueError,IndexError):continue
            if math.isfinite(v):out.append(v)
        return out
    wind=vals("wind_speed_10m"); gust=vals("wind_gusts_10m"); rain=vals("precipitation"); cape=vals("cape"); temp=vals("temperature_2m"); vis=vals("visibility")
    if not (wind and rain and temp): return None
    max_w=max(wind); max_g=max(gust) if gust else max_w; max_r=max(rain); max_c=max(cape) if cape else 0; min_t=min(temp); min_v=min(vis) if vis else None
    caution_hours=severe_hours=extreme_hours=0
    for i in idx:
        def hv(k, default=None):
            a=hourly.get(k) or []
            try:
                v=float(a[i]); return v if math.isfinite(v) else default
            except (TypeError,ValueError,IndexError): return default
        w=hv("wind_speed_10m",0); r=hv("precipitation",0)
        extreme = w>=18 or r>=8
        severe = w>=13 or r>=3
        caution = w>=8 or r>=0.8
        if extreme: extreme_hours+=1
        if severe: severe_hours+=1
        if caution: caution_hours+=1
    grade,summary=_national_grade(max_w,max_g,max_r,max_c,min_t,min_v,caution_hours=caution_hours,severe_hours=severe_hours,extreme_hours=extreme_hours)
    thunder="HIGH" if max_c>=700 else "MEDIUM" if max_c>=300 else "LOW"
    return {"name":p["name"],"grade":grade,"summary":summary,"maxWind":round(max_w,1),"maxGust":round(max_g,1),"maxRain":round(max_r,1),"maxCape":round(max_c),"minTemp":round(min_t,1),"minVisibility":round(min_v) if min_v is not None else None,"thunder":thunder,"cautionHours":caution_hours,"severeHours":severe_hours}


def _national_fetch_shared(date_text: str, points: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], bool, bool, str | None]:
    results_by_name: dict[str, dict[str, Any]] = {}
    missing=[]
    for p in points:
        cached=_national_point_cache_get(date_text,p)
        if cached:
            cached["name"]=p["name"]
            results_by_name[p["name"]]=cached
        else:
            missing.append(p)
    hourly_vars="temperature_2m,precipitation,cloud_cover,wind_speed_10m,wind_gusts_10m,cape,visibility"
    for start in range(0,len(missing),NATIONAL_OUTLOOK_CHUNK_SIZE):
        chunk=missing[start:start+NATIONAL_OUTLOOK_CHUNK_SIZE]
        params={
            "latitude":",".join(f'{p["lat"]:.5f}' for p in chunk),
            "longitude":",".join(f'{p["lon"]:.5f}' for p in chunk),
            "hourly":hourly_vars,"start_date":date_text,"end_date":date_text,
            "timezone":"Asia/Tokyo","wind_speed_unit":"ms"
        }
        if all(p["elevation"] is not None for p in chunk): params["elevation"]=",".join(f'{p["elevation"]:.0f}' for p in chunk)
        url="https://api.open-meteo.com/v1/forecast?"+urllib.parse.urlencode(params)
        try:
            status,ctype,body=_request_openmeteo_national_once(url)
        except urllib.error.HTTPError as exc:
            if exc.code == 429:
                return list(results_by_name.values()), False, True, "Open-Meteo HTTP 429"
            return list(results_by_name.values()), False, False, f"Open-Meteo HTTP {exc.code}"
        except Exception as exc:
            return list(results_by_name.values()), False, False, str(exc)
        if status != 200: return list(results_by_name.values()), False, status==429, f"Open-Meteo HTTP {status}"
        try:
            data=json.loads(body.decode("utf-8"))
        except Exception as exc:
            return list(results_by_name.values()), False, False, f"Open-Meteo JSON error: {exc}"
        rows=data if isinstance(data,list) else [data]
        if len(rows) != len(chunk): return list(results_by_name.values()), False, False, "Open-Meteo response size mismatch"
        for p,forecast in zip(chunk,rows):
            result=_national_result_from_forecast(p,forecast)
            if result:
                results_by_name[p["name"]]=result
                _national_point_cache_put(date_text,p,result)
    ordered=[results_by_name[p["name"]] for p in points if p["name"] in results_by_name]
    return ordered, len(ordered)==len(points), False, None


def _national_response(data: dict[str, Any], state: str, *, rate_limited: bool=False, warning: str | None=None) -> Response:
    now=time.time(); generated=float(data.get("generated_ts") or now)
    payload={
        "date":data.get("date"), "results":data.get("results") or [], "version":APP_VERSION,
        "complete":len(data.get("results") or []) >= len(data.get("points") or []),
        "cache":{"state":state,"generatedAt":data.get("generated_at"),"ageSeconds":max(0,round(now-generated)),"freshTtlSeconds":NATIONAL_OUTLOOK_CACHE_TTL},
        "rateLimited":bool(rate_limited),
    }
    if warning: payload["warning"]=warning
    body=json.dumps(payload,ensure_ascii=False).encode("utf-8")
    resp=Response(body,status=200,content_type="application/json; charset=utf-8")
    resp.headers["Cache-Control"]="no-store"
    resp.headers["X-Traten-National-Cache"]=state
    return resp


def _ensure_national_refresh_worker() -> None:
    global _national_refresh_thread_started
    with _national_refresh_thread_lock:
        if _national_refresh_thread_started: return
        _national_refresh_thread_started=True
    def worker():
        while True:
            time.sleep(max(300,NATIONAL_OUTLOOK_REFRESH_INTERVAL))
            try:
                files=[os.path.join(NATIONAL_OUTLOOK_CACHE_DIR,n) for n in os.listdir(NATIONAL_OUTLOOK_CACHE_DIR) if n.endswith('.json')]
                now=time.time()
                for path in files:
                    try:
                        with open(path,'r',encoding='utf-8') as f: data=json.load(f)
                        if float(data.get('stale_until') or 0)<=now: continue
                        if float(data.get('fresh_until') or 0)>now: continue
                        date_text=str(data.get('date') or '')
                        points=data.get('points') or []
                        fp=str(data.get('fingerprint') or '')
                        if not date_text or not fp or not points: continue
                        try:
                            target_date=datetime.strptime(date_text,'%Y-%m-%d').date()
                            today_jst=(datetime.now(timezone.utc)+timedelta(hours=9)).date()
                            if target_date < today_jst or target_date > today_jst + timedelta(days=15): continue
                        except ValueError:
                            continue
                        if not _national_try_lock(date_text,fp): continue
                        try:
                            latest,state=_national_read_disk_cache(date_text,fp)
                            if state=='fresh': continue
                            results,complete,rate_limited,error=_national_fetch_shared(date_text,points)
                            if complete:
                                _national_write_disk_cache(date_text,fp,points,results)
                            if rate_limited:
                                break
                        finally:
                            _national_unlock(date_text,fp)
                    except Exception:
                        continue
            except Exception:
                continue
    threading.Thread(target=worker,name='traten-national-refresh',daemon=True).start()


@app.post("/api/national-outlook")
def national_outlook():
    payload = request.get_json(silent=True) or {}
    date_text = str(payload.get("date") or "")[:10]
    try: target = datetime.strptime(date_text, "%Y-%m-%d").date()
    except ValueError: return jsonify(error="日付が不正です"), 400
    today_jst = (datetime.now(timezone.utc) + timedelta(hours=9)).date()
    if target < today_jst or target > today_jst + timedelta(days=15): return jsonify(error="全国判定は今日から15日先までです"), 400
    raw_points = payload.get("points")
    if not isinstance(raw_points, list) or not raw_points or len(raw_points) > 300: return jsonify(error="判定地点数が不正です"), 400
    points=[]
    for x in raw_points:
        if not isinstance(x, dict): continue
        name=str(x.get("name") or "")[:80]
        try: lat=float(x.get("lat")); lon=float(x.get("lon"))
        except (TypeError,ValueError): continue
        if not name or not (20 <= lat <= 50 and 120 <= lon <= 155): continue
        try: elev=float(x.get("elevation")) if x.get("elevation") is not None else None
        except (TypeError,ValueError): elev=None
        points.append({"name":name,"lat":lat,"lon":lon,"elevation":elev})
    if not points: return jsonify(error="有効な地点がありません"), 400

    fingerprint=_national_points_fingerprint(points)
    cached,state=_national_read_disk_cache(date_text,fingerprint)
    _ensure_national_refresh_worker()
    if cached and state=='fresh':
        return _national_response(cached,'shared-fresh')

    stale=cached if cached and state=='stale' else None
    if not _national_try_lock(date_text,fingerprint):
        # Another worker/user is already refreshing this date. Prefer the last-good shared result.
        if stale: return _national_response(stale,'shared-stale-refreshing',warning='共有キャッシュを更新中のため、直近の成功結果を表示しています。')
        # Briefly wait for the first generator, then re-check once.
        for _ in range(12):
            time.sleep(0.5)
            ready,ready_state=_national_read_disk_cache(date_text,fingerprint)
            if ready and ready_state=='fresh': return _national_response(ready,'shared-fresh')
        return jsonify(error="全国共有キャッシュを生成中です。数秒後に再度お試しください。"), 503

    try:
        # Re-check after acquiring the cross-worker lock.
        ready,ready_state=_national_read_disk_cache(date_text,fingerprint)
        if ready and ready_state=='fresh': return _national_response(ready,'shared-fresh')
        if ready and ready_state=='stale': stale=ready
        results,complete,rate_limited,error=_national_fetch_shared(date_text,points)
        if complete:
            data=_national_write_disk_cache(date_text,fingerprint,points,results)
            return _national_response(data,'live-generated')
        if stale:
            warning='Open-Meteoの取得制限に達したため、直近の成功キャッシュを表示しています。' if rate_limited else f'最新取得に失敗したため、直近の成功キャッシュを表示しています。{error or ""}'
            return _national_response(stale,'shared-stale',rate_limited=rate_limited,warning=warning)
        # First-ever request has no last-good cache. Keep any completed point results instead of total failure.
        partial={"date":date_text,"generated_at":datetime.now(timezone.utc).isoformat(),"generated_ts":time.time(),"points":points,"results":results}
        return _national_response(partial,'partial',rate_limited=rate_limited,warning=(error or '一部地点のみ取得できました。'))
    finally:
        _national_unlock(date_text,fingerprint)

@app.get("/api/health")
def health():
    return jsonify(
        ok=True,
        version=APP_VERSION,
        service="mountain-weather-decision",
        overpass_endpoints=len(OVERPASS_ENDPOINTS),
        usage_logging=True,
        supabase_configured=bool(SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY),
        trail_regions_ready=sum(1 for r in _load_trail_manifest().get("regions", []) if r.get("ready")),
    )




@app.post("/api/event")
def usage_event():
    if request.content_length and request.content_length > USAGE_EVENT_MAX_BYTES:
        return jsonify(error="event payload too large"), 413
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify(error="JSON body is required"), 400
    try:
        row = _usage_row(payload)
    except ValueError as exc:
        return jsonify(error=str(exc)), 400

    if USAGE_LOG_STDOUT:
        print("[usage] " + json.dumps(row, ensure_ascii=False, separators=(",", ":")), flush=True)

    stored = False
    storage_error = None
    try:
        stored = _write_supabase_event(row)
    except Exception as exc:
        storage_error = str(exc)[:500]
        print(f"[usage-storage-error] {storage_error}", flush=True)

    return jsonify(
        ok=True,
        stored=stored,
        sink="supabase" if stored else "render-log",
        storage_error=storage_error if (storage_error and os.environ.get("APP_ENV") != "production") else None,
    ), 202


@app.get("/api/trail-regions")
def trail_regions():
    manifest = _load_trail_manifest()
    return jsonify(manifest)


@app.get("/api/trail-route")
def trail_route():
    try:
        lat1 = float(request.args["lat1"]); lon1 = float(request.args["lon1"])
        lat2 = float(request.args["lat2"]); lon2 = float(request.args["lon2"])
    except Exception:
        return jsonify(error="lat1/lon1/lat2/lon2 are required"), 400
    for region in _candidate_trail_regions(lat1, lon1, lat2, lon2):
        graph = _load_trail_graph(region)
        if not graph or not graph["nodes"]:
            continue
        start = _nearest_trail_node(graph, lat1, lon1)
        goal = _nearest_trail_node(graph, lat2, lon2)
        if not start or not goal:
            continue
        if start[1] > 1800 or goal[1] > 1800:
            continue
        ids = _astar_trail(graph, start[0], goal[0])
        if not ids or len(ids) < 2:
            continue
        coords = [{"lat": lat1, "lon": lon1}]
        coords.extend({"lat": graph["nodes"][nid][0], "lon": graph["nodes"][nid][1]} for nid in ids)
        coords.append({"lat": lat2, "lon": lon2})
        coords = _simplify_trail(coords)
        response = jsonify(ok=True, source="preloaded-osm", region=graph["region"], region_name=graph["name"], coords=coords, start_gap_m=round(start[1]), end_gap_m=round(goal[1]))
        response.headers["Cache-Control"] = "public, max-age=86400"
        response.headers["X-Trail-Source"] = "PRELOADED"
        return response
    response = jsonify(ok=False, error="preloaded route not found")
    response.headers["X-Trail-Source"] = "MISS"
    return response, 404




@app.get("/api/noaa-gfs")
def noaa_gfs():
    try:
        lat = float(request.args["lat"])
        lon = float(request.args["lon"])
        date_text = request.args["date"]
        time_text = request.args.get("time", "12:00")
        # Input date/time is the app's Japan local time.
        local = datetime.fromisoformat(f"{date_text}T{time_text}:00+09:00")
        target_utc = local.astimezone(timezone.utc)
        if target_utc < datetime.now(timezone.utc) - timedelta(hours=2):
            return jsonify(error="NOAA GFS: 過去日時は対象外です"), 400
        if target_utc > datetime.now(timezone.utc) + timedelta(hours=384):
            return jsonify(error="NOAA GFS: 約16日先までです"), 400
        data = _fetch_noaa_gfs(lat, lon, target_utc)
        response = jsonify(data)
        response.headers["Cache-Control"] = "public, max-age=900"
        return response
    except ImportError as exc:
        return jsonify(error=f"NOAA GFS解析ライブラリがありません: {exc}"), 503
    except (KeyError, ValueError) as exc:
        return jsonify(error=f"NOAA GFS入力エラー: {exc}"), 400
    except Exception as exc:
        return jsonify(error=f"NOAA GFS取得失敗: {exc}"), 502


@app.get("/api/proxy")
def proxy():
    url = request.args.get("url", "")
    try:
        target = urllib.parse.urlparse(url)
        if target.scheme != "https" or target.hostname not in ALLOWED_HOSTS:
            return jsonify(error="許可されていない接続先です"), 400

        cached = _cache_get("get:" + url)
        if cached:
            status, ctype, body = cached
            return _bytes_response(status, ctype, body, cache_control="public, max-age=60")

        status, ctype, body = _request_url(url)
        is_openmeteo = (target.hostname or "").endswith("open-meteo.com")
        ttl = OPENMETEO_PROXY_CACHE_TTL if is_openmeteo else None
        _cache_put("get:" + url, status, ctype, body, ttl=ttl)
        return _bytes_response(status, ctype, body, cache_control=("public, max-age=300" if is_openmeteo else "public, max-age=60"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:1200]
        # Preserve the upstream status so the frontend can distinguish
        # invalid query/date-range errors from genuine gateway failures.
        return jsonify(error=f"上流API HTTP {exc.code}", detail=detail), exc.code
    except Exception as exc:
        return jsonify(error=f"上流APIへ接続できません: {exc}"), 502


@app.post("/api/overpass")
def overpass():
    query = request.get_data(cache=False, as_text=True)
    if not query.strip():
        return jsonify(error="Overpass query is empty"), 400

    cache_key = "overpass:" + query
    cached = _cache_get(cache_key)
    if cached:
        status, ctype, body = cached
        response = _bytes_response(status, ctype, body, cache_control="public, max-age=300")
        response.headers["X-Route-Cache"] = "HIT"
        return response

    errors: list[str] = []
    for endpoint in OVERPASS_ENDPOINTS:
        try:
            status, ctype, body = _request_overpass(endpoint, query)
            if status == 200:
                _cache_put(cache_key, status, ctype, body, ttl=OVERPASS_CACHE_TTL)
                response = _bytes_response(status, ctype, body, cache_control="public, max-age=300")
                response.headers["X-Route-Cache"] = "MISS"
                return response
            errors.append(f"{endpoint}: HTTP {status}")
        except Exception as exc:
            errors.append(f"{endpoint}: {exc}")

    return jsonify(error="Overpass取得失敗", detail=" / ".join(errors)), 502


@app.get("/usage-dashboard")
def usage_dashboard():
    if not _dashboard_auth_ok():
        return _dashboard_unauthorized()
    response = send_from_directory(BASE, "usage-dashboard.html")
    response.headers["Cache-Control"] = "no-store"
    response.headers["X-Robots-Tag"] = "noindex, nofollow"
    return response


@app.post("/api/admin/indexnow-submit")
def indexnow_submit():
    if not _dashboard_auth_ok():
        return _dashboard_unauthorized()
    payload = request.get_json(silent=True) or {}
    urls = payload.get("urls") if isinstance(payload, dict) else None
    if not isinstance(urls, list) or not urls:
        urls = INDEXNOW_PUBLIC_URLS
    try:
        status, detail = _submit_indexnow(urls)
        ok = status in {200, 202}
        response = jsonify(
            ok=ok,
            status=status,
            submitted=[u for u in urls if isinstance(u, str)],
            key_location=f"https://{INDEXNOW_HOST}/{INDEXNOW_KEY_FILENAME}",
            detail=detail[:500],
        )
        response.status_code = 200 if ok else 502
        response.headers["Cache-Control"] = "no-store"
        response.headers["X-Robots-Tag"] = "noindex, nofollow"
        return response
    except Exception as exc:
        return jsonify(ok=False, error=str(exc)[:500]), 502


@app.get("/api/admin/usage-summary")
def usage_dashboard_data():
    if not _dashboard_auth_ok():
        return _dashboard_unauthorized()
    raw_days = request.args.get("days", "30").strip().lower()
    if raw_days in {"all", "0"}:
        days = None
    else:
        try:
            days = max(1, min(3650, int(raw_days)))
        except ValueError:
            days = 30
    try:
        events = _supabase_read_usage_events(days)
        payload = _usage_dashboard_summary(events)
        payload["days"] = days
        response = jsonify(payload)
        response.headers["Cache-Control"] = "no-store"
        response.headers["X-Robots-Tag"] = "noindex, nofollow"
        return response
    except urllib.error.HTTPError as exc:
        detail = ""
        try:
            detail = exc.read().decode("utf-8", errors="replace")[:700]
        except Exception:
            detail = ""
        return jsonify(ok=False, error=f"Supabase HTTP {exc.code}", detail=detail), 502
    except Exception as exc:
        return jsonify(ok=False, error=str(exc)[:500]), 502


@app.get("/")
def index():
    response = send_from_directory(BASE, "index.html")
    response.headers["Cache-Control"] = "no-cache, max-age=0, must-revalidate"
    return response


@app.get("/robots.txt")
def robots_txt():
    response = send_from_directory(BASE, "robots.txt", mimetype="text/plain")
    response.headers["Cache-Control"] = "no-store, no-cache, max-age=0, must-revalidate"
    return response


@app.get("/sitemap.xml")
def sitemap_xml():
    response = send_from_directory(BASE, "sitemap.xml", mimetype="application/xml")
    response.headers["Cache-Control"] = "no-store, no-cache, max-age=0, must-revalidate"
    return response


@app.get("/BingSiteAuth.xml")
def bing_site_auth():
    response = send_from_directory(BASE, "BingSiteAuth.xml", mimetype="application/xml")
    response.headers["Cache-Control"] = "no-store, no-cache, max-age=0, must-revalidate"
    return response


PUBLIC_FILES = {"app.js", "styles.css", "access.js", "access-data.js", "access.css", "favicon.ico", "robots.txt", "sitemap.xml", "guide.html", "manifest.json", "google5a7b3dfd79ff97f0.html", "BingSiteAuth.xml", INDEXNOW_KEY_FILENAME}
PUBLIC_IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico"}


@app.get("/<path:path>")
def static_files(path: str):
    # Do not expose server/config files from the repository root.
    full_path = os.path.join(BASE, path)
    ext = os.path.splitext(path)[1].lower()
    is_public_asset = path in PUBLIC_FILES or ext in PUBLIC_IMAGE_EXTS
    if is_public_asset and os.path.isfile(full_path):
        response = send_from_directory(BASE, path)
        if path.endswith((".js", ".css", ".json")) or ext in PUBLIC_IMAGE_EXTS:
            response.headers["Cache-Control"] = "public, max-age=300"
        return response
    return send_from_directory(BASE, "index.html")


@app.after_request
def security_headers(response: Response):
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
    response.headers.setdefault("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
    if request.path in {"/", "/guide.html"}:
        response.headers.setdefault("X-Robots-Tag", "index, follow, max-image-preview:large")
    return response


if __name__ == "__main__":
    print(f"Mountain Weather Decision V{APP_VERSION}")
    print(f"Open http://localhost:{PORT}")
    print("Stop: Ctrl+C")
    app.run(host="0.0.0.0", port=PORT, threaded=True, debug=False)
