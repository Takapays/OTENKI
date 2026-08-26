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
from concurrent.futures import ThreadPoolExecutor, as_completed
import tempfile
from datetime import datetime, timezone, timedelta
from collections import OrderedDict
from typing import Any

from flask import Flask, Response, jsonify, request, send_from_directory

BASE = os.path.dirname(os.path.abspath(__file__))
APP_VERSION = "1.4.184"
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
    "TraverseWeatherDecision/1.4.147 https://otenki.onrender.com",
)

METNO_USER_AGENT = os.environ.get(
    "METNO_USER_AGENT",
    "TRATEN/1.4.147 https://otenki.onrender.com",
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
OPENMETEO_MIN_INTERVAL = float(os.environ.get("OPENMETEO_MIN_INTERVAL", "1.4"))
OPENMETEO_MAX_RETRIES = int(os.environ.get("OPENMETEO_MAX_RETRIES", "4"))
OPENMETEO_PROXY_CACHE_TTL = int(os.environ.get("OPENMETEO_PROXY_CACHE_TTL", "1800"))
NATIONAL_OUTLOOK_CACHE_TTL = int(os.environ.get("NATIONAL_OUTLOOK_CACHE_TTL", "14400"))
NATIONAL_METNO_FALLBACK_TTL = int(os.environ.get("NATIONAL_METNO_FALLBACK_TTL", "3600"))
NATIONAL_METNO_MAX_DAYS = int(os.environ.get("NATIONAL_METNO_MAX_DAYS", "9"))
NATIONAL_METNO_WORKERS = max(1, min(8, int(os.environ.get("NATIONAL_METNO_WORKERS", "4"))))
# MET Norway explicitly asks clients to avoid request bursts and to handle 429 throttling.
# National outlook already reuses Supabase rows, so a gentler default is safer for cold fills.
NATIONAL_METNO_MIN_INTERVAL = float(os.environ.get("NATIONAL_METNO_MIN_INTERVAL", "0.20"))
NATIONAL_METNO_MAX_RETRIES = max(1, min(5, int(os.environ.get("NATIONAL_METNO_MAX_RETRIES", "3"))))
NATIONAL_METNO_RETRY_BASE = float(os.environ.get("NATIONAL_METNO_RETRY_BASE", "1.2"))
NATIONAL_METNO_RETRY_MAX = float(os.environ.get("NATIONAL_METNO_RETRY_MAX", "12"))
_national_metno_lock = threading.Lock()
_national_metno_last_request = 0.0
NATIONAL_OUTLOOK_STALE_TTL = int(os.environ.get("NATIONAL_OUTLOOK_STALE_TTL", "86400"))
NATIONAL_OUTLOOK_REFRESH_INTERVAL = int(os.environ.get("NATIONAL_OUTLOOK_REFRESH_INTERVAL", "900"))
NATIONAL_OUTLOOK_AUTO_REFRESH = os.environ.get("NATIONAL_OUTLOOK_AUTO_REFRESH", "1").lower() not in {"0", "false", "no"}
NATIONAL_CACHE_REFRESH_TOKEN = os.environ.get("NATIONAL_CACHE_REFRESH_TOKEN", "")
NATIONAL_OUTLOOK_CHUNK_SIZE = int(os.environ.get("NATIONAL_OUTLOOK_CHUNK_SIZE", "50"))
NATIONAL_OUTLOOK_ENGINE = "metno-gfs-v1"
NATIONAL_GFS_MIN_INTERVAL = float(os.environ.get("NATIONAL_GFS_MIN_INTERVAL", "0.35"))
_national_gfs_lock = threading.Lock()
_national_gfs_last_request = 0.0
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


NATIONAL_SUPABASE_CACHE_TABLE = os.environ.get("NATIONAL_SUPABASE_CACHE_TABLE", "national_outlook_cache")
NATIONAL_SUPABASE_TIMEOUT = int(os.environ.get("NATIONAL_SUPABASE_TIMEOUT", "12"))

def _national_supabase_enabled() -> bool:
    return bool(SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY and NATIONAL_SUPABASE_CACHE_TABLE)

def _national_supabase_key(date_text: str, p: dict[str, Any]) -> str:
    raw=f'{NATIONAL_OUTLOOK_ENGINE}|{date_text}|{p["name"]}|{p["lat"]:.5f}|{p["lon"]:.5f}|{"" if p.get("elevation") is None else round(float(p["elevation"]))}'
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()

def _national_supabase_read(date_text: str, points: list[dict[str, Any]]) -> tuple[dict[str, dict[str, Any]], dict[str, dict[str, Any]]]:
    """Return (fresh_by_name, stale_by_name) from persistent shared cache.
    Missing table/config fails open so national outlook still works with local fallback.
    """
    if not _national_supabase_enabled():
        return {}, {}
    params={
        "select":"cache_key,mountain_name,result,generated_ts,fresh_until,stale_until",
        "forecast_date":f"eq.{date_text}",
        "engine":f"eq.{NATIONAL_OUTLOOK_ENGINE}",
        "stale_until":f"gt.{time.time()}",
        "limit":"1000",
    }
    url=f"{SUPABASE_URL}/rest/v1/{NATIONAL_SUPABASE_CACHE_TABLE}?"+urllib.parse.urlencode(params,safe=",.:+-")
    req=urllib.request.Request(url,headers={**_supabase_headers(accept_json=True)})
    try:
        with urllib.request.urlopen(req,timeout=NATIONAL_SUPABASE_TIMEOUT) as resp:
            rows=json.loads(resp.read().decode("utf-8"))
    except Exception:
        return {}, {}
    wanted={_national_supabase_key(date_text,p):p["name"] for p in points}
    now=time.time(); fresh={}; stale={}
    for row in rows if isinstance(rows,list) else []:
        key=str(row.get("cache_key") or "")
        name=wanted.get(key)
        result=row.get("result")
        if not name or not isinstance(result,dict): continue
        result=dict(result); result["name"]=name
        try: fu=float(row.get("fresh_until") or 0); su=float(row.get("stale_until") or 0)
        except (TypeError,ValueError): continue
        if su<=now: continue
        (fresh if fu>now else stale)[name]=result
    return fresh,stale

def _national_supabase_write(date_text: str, points: list[dict[str, Any]], results: list[dict[str, Any]]) -> bool:
    if not _national_supabase_enabled() or not results:
        return False
    by_name={p["name"]:p for p in points}
    now=time.time(); generated_at=datetime.now(timezone.utc).isoformat()
    rows=[]
    for r in results:
        if not isinstance(r,dict) or not r.get("name"): continue
        p=by_name.get(str(r.get("name")))
        if not p: continue
        rows.append({
            "cache_key":_national_supabase_key(date_text,p),
            "forecast_date":date_text,
            "engine":NATIONAL_OUTLOOK_ENGINE,
            "mountain_name":p["name"],
            "lat":round(float(p["lat"]),5),
            "lon":round(float(p["lon"]),5),
            "elevation":None if p.get("elevation") is None else round(float(p["elevation"])),
            "result":r,
            "generated_at":generated_at,
            "generated_ts":now,
            "fresh_until":now+NATIONAL_OUTLOOK_CACHE_TTL,
            "stale_until":now+NATIONAL_OUTLOOK_STALE_TTL,
            "app_version":APP_VERSION,
        })
    if not rows: return False
    url=f"{SUPABASE_URL}/rest/v1/{NATIONAL_SUPABASE_CACHE_TABLE}?on_conflict=cache_key"
    body=json.dumps(rows,ensure_ascii=False,separators=(",", ":")).encode("utf-8")
    req=urllib.request.Request(url,data=body,method="POST",headers={**_supabase_headers(),"Content-Type":"application/json","Prefer":"resolution=merge-duplicates,return=minimal"})
    try:
        with urllib.request.urlopen(req,timeout=NATIONAL_SUPABASE_TIMEOUT) as resp:
            return 200<=resp.status<300
    except Exception:
        return False

def _national_supabase_refresh_candidates(force: bool = False) -> dict[str, list[dict[str, Any]]]:
    """Load persistent cache rows that should be refreshed, grouped by forecast date.

    This makes the refresh worker independent from Render's ephemeral /tmp files.
    Rows survive deploys/restarts in Supabase, so a scheduled wake-up can refresh them.
    """
    if not _national_supabase_enabled():
        return {}
    now = time.time()
    today_jst = (datetime.now(timezone.utc) + timedelta(hours=9)).date()
    params = {
        "select": "forecast_date,mountain_name,lat,lon,elevation,fresh_until,stale_until",
        "engine": f"eq.{NATIONAL_OUTLOOK_ENGINE}",
        "stale_until": f"gt.{now}",
        "limit": "10000",
    }
    url = f"{SUPABASE_URL}/rest/v1/{NATIONAL_SUPABASE_CACHE_TABLE}?" + urllib.parse.urlencode(params, safe=",.:+-")
    req = urllib.request.Request(url, headers={**_supabase_headers(accept_json=True)})
    try:
        with urllib.request.urlopen(req, timeout=NATIONAL_SUPABASE_TIMEOUT) as resp:
            rows = json.loads(resp.read().decode("utf-8"))
    except Exception as exc:
        app.logger.warning("national_refresh_seed_failed %s", exc)
        return {}
    groups: dict[str, list[dict[str, Any]]] = {}
    seen: set[tuple[str, str]] = set()
    for row in rows if isinstance(rows, list) else []:
        date_text = str(row.get("forecast_date") or "")[:10]
        name = str(row.get("mountain_name") or "")[:80]
        if not date_text or not name:
            continue
        try:
            target = datetime.strptime(date_text, "%Y-%m-%d").date()
            if target < today_jst or target > today_jst + timedelta(days=15):
                continue
            fresh_until = float(row.get("fresh_until") or 0)
            stale_until = float(row.get("stale_until") or 0)
            lat = float(row.get("lat")); lon = float(row.get("lon"))
            elev_raw = row.get("elevation")
            elev = float(elev_raw) if elev_raw is not None else None
        except (TypeError, ValueError):
            continue
        if stale_until <= now or (not force and fresh_until > now):
            continue
        key = (date_text, name)
        if key in seen:
            continue
        seen.add(key)
        groups.setdefault(date_text, []).append({"name": name, "lat": lat, "lon": lon, "elevation": elev})
    return groups


def _refresh_national_persistent_cache(*, force: bool = False) -> dict[str, Any]:
    """Refresh stale nationwide rows stored in Supabase.

    The operation is intentionally stale-only by default: an hourly external wake-up
    is cheap when nothing is due, while each row is actually fetched only after its
    four-hour TTL has expired.
    """
    started = time.time()
    groups = _national_supabase_refresh_candidates(force=force)
    report: dict[str, Any] = {
        "ok": True, "force": force, "datesChecked": len(groups), "pointsDue": sum(len(v) for v in groups.values()),
        "pointsUpdated": 0, "datesUpdated": 0, "errors": [],
    }
    for date_text in sorted(groups):
        points = groups[date_text]
        if not points:
            continue
        fingerprint = _national_points_fingerprint(points)
        if not _national_try_lock(date_text, fingerprint):
            continue
        try:
            results, complete, rate_limited, error = _national_fetch_shared(date_text, points)
            if results:
                _national_supabase_write(date_text, points, results)
                report["pointsUpdated"] += len(results)
                report["datesUpdated"] += 1
            if error:
                report["errors"].append({"date": date_text, "error": error})
            if rate_limited:
                report["errors"].append({"date": date_text, "error": "rate_limited"})
                break
        except Exception as exc:
            app.logger.exception("national_persistent_refresh_failed date=%s", date_text)
            report["errors"].append({"date": date_text, "error": str(exc)[:200]})
        finally:
            _national_unlock(date_text, fingerprint)
    report["elapsedSeconds"] = round(time.time() - started, 2)
    report["ok"] = not report["errors"]
    return report


def _national_points_fingerprint(points: list[dict[str, Any]]) -> str:
    raw = NATIONAL_OUTLOOK_ENGINE + "|" + "|".join(
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
    # V1.4.125: partial nationwide results are first-class shared cache entries.
    # A cache does not need all mountains to be useful; later requests merge only newly obtained mountains.
    now = time.time()
    result_names = {str(r.get("name") or "") for r in results if isinstance(r, dict)}
    data = {
        "date": date_text,
        "fingerprint": fingerprint,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "generated_ts": now,
        "fresh_until": now + NATIONAL_OUTLOOK_CACHE_TTL,
        "stale_until": now + NATIONAL_OUTLOOK_STALE_TTL,
        "points": points,
        "results": results,
        "complete": len(result_names) >= len(points),
        "cached_count": len(result_names),
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
    return f'{NATIONAL_OUTLOOK_ENGINE}:{date_text}:{p["lat"]:.5f}:{p["lon"]:.5f}:{"" if p.get("elevation") is None else round(float(p["elevation"]))}'


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


def _national_point_cache_put(date_text: str, p: dict[str, Any], result: dict[str, Any], ttl: int | None = None) -> None:
    key = _national_point_key(date_text, p)
    with _national_point_cache_lock:
        _national_point_cache[key] = (time.time() + (NATIONAL_OUTLOOK_CACHE_TTL if ttl is None else max(60, int(ttl))), dict(result))
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
    return {"name":p["name"],"grade":grade,"summary":summary,"maxWind":round(max_w,1),"maxGust":round(max_g,1),"maxRain":round(max_r,1),"maxCape":round(max_c),"minTemp":round(min_t,1),"minVisibility":round(min_v) if min_v is not None else None,"thunder":thunder,"cautionHours":caution_hours,"severeHours":severe_hours,"source":"openmeteo"}



def _metno_retry_delay(exc: Exception, attempt: int) -> float:
    retry_after=None
    if isinstance(exc, urllib.error.HTTPError):
        try: retry_after=float(exc.headers.get("Retry-After") or 0)
        except (TypeError,ValueError): retry_after=None
    if retry_after and retry_after>0:
        return min(NATIONAL_METNO_RETRY_MAX,max(0.5,retry_after))
    return min(NATIONAL_METNO_RETRY_MAX,NATIONAL_METNO_RETRY_BASE*(2**attempt))

def _metno_error_kind(exc: Exception) -> str:
    if isinstance(exc,urllib.error.HTTPError): return f"http_{exc.code}"
    if isinstance(exc,urllib.error.URLError): return "url_error"
    if isinstance(exc,TimeoutError): return "timeout"
    return exc.__class__.__name__.lower()

def _request_metno_national_point(p: dict[str, Any], timeout: int = UPSTREAM_TIMEOUT) -> dict[str, Any] | None:
    """Fetch one MET Norway Locationforecast point with throttling-aware retry."""
    global _national_metno_last_request
    params={"lat":f'{p["lat"]:.5f}',"lon":f'{p["lon"]:.5f}'}
    if p.get("elevation") is not None:
        try: params["altitude"]=str(round(float(p["elevation"])))
        except (TypeError,ValueError): pass
    url="https://api.met.no/weatherapi/locationforecast/2.0/compact?"+urllib.parse.urlencode(params)
    last_exc=None
    for attempt in range(NATIONAL_METNO_MAX_RETRIES):
        with _national_metno_lock:
            wait=NATIONAL_METNO_MIN_INTERVAL-(time.monotonic()-_national_metno_last_request)
            if wait>0: time.sleep(wait)
            _national_metno_last_request=time.monotonic()
        req=urllib.request.Request(url,headers={"User-Agent":METNO_USER_AGENT,"Accept":"application/json"})
        try:
            with urllib.request.urlopen(req,timeout=timeout) as resp:
                if resp.status!=200: return None
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            last_exc=exc
            if exc.code not in {429,500,502,503,504} or attempt>=NATIONAL_METNO_MAX_RETRIES-1: raise
        except (urllib.error.URLError,TimeoutError) as exc:
            last_exc=exc
            if attempt>=NATIONAL_METNO_MAX_RETRIES-1: raise
        time.sleep(_metno_retry_delay(last_exc,attempt))
    if last_exc: raise last_exc
    return None


def _national_result_from_metno(p: dict[str, Any], date_text: str, payload: dict[str, Any]) -> dict[str, Any] | None:
    rows=[]
    for item in ((payload.get("properties") or {}).get("timeseries") or []):
        iso=str(item.get("time") or "")
        try:
            dt=datetime.fromisoformat(iso.replace("Z","+00:00")).astimezone(timezone(timedelta(hours=9)))
        except Exception:
            continue
        if dt.strftime("%Y-%m-%d")!=date_text or not (6<=dt.hour<=15): continue
        data=item.get("data") or {}; instant=((data.get("instant") or {}).get("details") or {})
        nxt=((data.get("next_1_hours") or {}).get("details") or {})
        def fv(obj,key,default=None):
            try:
                v=float(obj.get(key)); return v if math.isfinite(v) else default
            except (TypeError,ValueError): return default
        temp=fv(instant,"air_temperature"); wind=fv(instant,"wind_speed"); gust=fv(instant,"wind_speed_of_gust",wind); rain=fv(nxt,"precipitation_amount",0.0)
        if temp is None or wind is None: continue
        rows.append((wind,gust if gust is not None else wind,rain if rain is not None else 0.0,temp))
    if not rows: return None
    winds=[x[0] for x in rows]; gusts=[x[1] for x in rows]; rains=[x[2] for x in rows]; temps=[x[3] for x in rows]
    caution_hours=severe_hours=extreme_hours=0
    for w,_,r,_ in rows:
        if w>=18 or r>=8: extreme_hours+=1
        if w>=13 or r>=3: severe_hours+=1
        if w>=8 or r>=0.8: caution_hours+=1
    max_w=max(winds); max_g=max(gusts); max_r=max(rains); min_t=min(temps)
    grade,summary=_national_grade(max_w,max_g,max_r,0,min_t,None,caution_hours=caution_hours,severe_hours=severe_hours,extreme_hours=extreme_hours)
    return {"name":p["name"],"grade":grade,"summary":summary,"maxWind":round(max_w,1),"maxGust":round(max_g,1),"maxRain":round(max_r,1),"maxCape":0,"minTemp":round(min_t,1),"minVisibility":None,"thunder":"–","cautionHours":caution_hours,"severeHours":severe_hours,"source":"metno"}


def _national_fill_metno(date_text: str, points: list[dict[str, Any]], results_by_name: dict[str, dict[str, Any]]) -> int:
    """Fill missing national-outlook mountains from MET Norway. Returns number filled."""
    try:
        target=datetime.strptime(date_text,"%Y-%m-%d").date()
        today=(datetime.now(timezone.utc)+timedelta(hours=9)).date()
        if target<today or target>today+timedelta(days=NATIONAL_METNO_MAX_DAYS): return 0
    except ValueError:
        return 0
    missing=[p for p in points if p["name"] not in results_by_name]
    if not missing: return 0
    filled=0
    def one(p):
        try:
            payload=_request_metno_national_point(p)
            return p,_national_result_from_metno(p,date_text,payload or {})
        except Exception:
            return p,None
    with ThreadPoolExecutor(max_workers=NATIONAL_METNO_WORKERS,thread_name_prefix="traten-metno") as ex:
        futures=[ex.submit(one,p) for p in missing]
        for fut in as_completed(futures):
            p,result=fut.result()
            if result:
                results_by_name[p["name"]]=result
                _national_point_cache_put(date_text,p,result,ttl=NATIONAL_METNO_FALLBACK_TTL)
                filled+=1
    return filled


def _noaa_filter_url_region(cycle: datetime, fh: int, points: list[dict[str, Any]]) -> str:
    lats=[float(p["lat"]) for p in points]; lons=[float(p["lon"])%360.0 for p in points]
    pad=0.35
    params={
        "file":f"gfs.t{cycle.hour:02d}z.pgrb2.0p25.f{fh:03d}",
        "lev_2_m_above_ground":"on","lev_10_m_above_ground":"on","lev_surface":"on","lev_entire_atmosphere":"on",
        "var_TMP":"on","var_UGRD":"on","var_VGRD":"on","var_GUST":"on","var_PRATE":"on","var_TCDC":"on",
        "subregion":"",
        "leftlon":f"{max(0,min(lons)-pad):.2f}","rightlon":f"{min(359.75,max(lons)+pad):.2f}",
        "toplat":f"{min(90,max(lats)+pad):.2f}","bottomlat":f"{max(-90,min(lats)-pad):.2f}",
        "dir":f"/gfs.{cycle:%Y%m%d}/{cycle.hour:02d}/atmos",
    }
    return NOAA_GFS_FILTER+"?"+urllib.parse.urlencode(params)


def _parse_noaa_grib_points(path: str, points: list[dict[str, Any]]) -> dict[str, dict[str, float]]:
    from eccodes import codes_get, codes_grib_find_nearest, codes_grib_new_from_file, codes_release
    out={p["name"]:{} for p in points}
    with open(path,"rb") as fh:
        while True:
            gid=codes_grib_new_from_file(fh)
            if gid is None: break
            try:
                short=str(codes_get(gid,"shortName")); level_type=str(codes_get(gid,"typeOfLevel"))
                try: level=float(codes_get(gid,"level"))
                except Exception: level=float("nan")
                key=None
                if short in {"2t","t"} and level_type=="heightAboveGround" and level==2: key="temp"
                elif short in {"10u","u"} and level_type=="heightAboveGround" and level==10: key="u"
                elif short in {"10v","v"} and level_type=="heightAboveGround" and level==10: key="v"
                elif short in {"gust","10fg"}: key="gust"
                elif short=="prate": key="rain"
                elif short in {"tcc","tcdc"}: key="cloud"
                if not key: continue
                for p in points:
                    try:
                        found=codes_grib_find_nearest(gid,float(p["lat"]),float(p["lon"])%360.0)
                        item=found if isinstance(found,dict) else (found[0] if found else None)
                        if not item: continue
                        val=float(item.get("value"))
                        if not math.isfinite(val): continue
                        if key=="temp" and val>150: val-=273.15
                        elif key=="rain": val=max(0.0,val*3600.0)
                        elif key=="cloud" and 0<=val<=1.01: val*=100.0
                        out[p["name"]][key]=val
                    except Exception:
                        continue
            finally:
                codes_release(gid)
    for vals in out.values():
        if "u" in vals and "v" in vals:
            vals["wind"]=math.hypot(vals["u"],vals["v"])
    return out


def _national_gfs_results(date_text: str, points: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    global _national_gfs_last_request
    try: target_date=datetime.strptime(date_text,"%Y-%m-%d").date()
    except ValueError: return {}
    # 06:00-15:00 JST => convert each hour to UTC and use one common recent GFS cycle.
    targets=[datetime.combine(target_date,datetime.min.time(),tzinfo=timezone(timedelta(hours=9))).replace(hour=h).astimezone(timezone.utc) for h in range(6,16)]
    rows={p["name"]:[] for p in points}
    errors=[]
    for cycle in _noaa_cycle_candidates(datetime.now(timezone.utc)):
        fh_targets=[]
        for dt in targets:
            fh=_noaa_forecast_hour(cycle,dt)
            if fh is None: break
            fh_targets.append((fh,dt))
        if len(fh_targets)!=len(targets): continue
        cycle_rows={p["name"]:[] for p in points}; ok_hours=0
        for fh,target_dt in fh_targets:
            url=_noaa_filter_url_region(cycle,fh,points); cache_key="national-gfs-region:"+url
            cached=_cache_get(cache_key); body=cached[2] if cached else None
            if body is None:
                try:
                    with _national_gfs_lock:
                        wait=NATIONAL_GFS_MIN_INTERVAL-(time.monotonic()-_national_gfs_last_request)
                        if wait>0: time.sleep(wait)
                        req=urllib.request.Request(url,headers={"User-Agent":UA,"Accept":"application/octet-stream"})
                        with urllib.request.urlopen(req,timeout=NOAA_GFS_TIMEOUT) as resp: body=resp.read()
                        _national_gfs_last_request=time.monotonic()
                    if not body.startswith(b"GRIB"): raise RuntimeError("GRIB2データではありません")
                    _cache_put(cache_key,200,"application/x-grib2",body,ttl=max(NOAA_GFS_CACHE_TTL,NATIONAL_OUTLOOK_CACHE_TTL))
                except Exception as exc:
                    errors.append(f"f{fh:03d}:{exc}"); continue
            tmp_path=None
            try:
                with tempfile.NamedTemporaryFile(suffix=".grib2",delete=False) as tmp:
                    tmp.write(body); tmp_path=tmp.name
                parsed=_parse_noaa_grib_points(tmp_path,points)
                for p in points:
                    vals=parsed.get(p["name"]) or {}
                    if vals.get("wind") is None or vals.get("temp") is None: continue
                    cycle_rows[p["name"]].append({"wind":float(vals.get("wind") or 0),"gust":float(vals.get("gust") or vals.get("wind") or 0),"rain":float(vals.get("rain") or 0),"temp":float(vals.get("temp")),"cloud":vals.get("cloud")})
                ok_hours+=1
            finally:
                if tmp_path:
                    try: os.unlink(tmp_path)
                    except OSError: pass
        if ok_hours>=6:
            rows=cycle_rows; break
    results={}
    for p in points:
        rr=rows.get(p["name"]) or []
        if len(rr)<4: continue
        winds=[x["wind"] for x in rr]; gusts=[x["gust"] for x in rr]; rains=[x["rain"] for x in rr]; temps=[x["temp"] for x in rr]
        caution=sum(1 for x in rr if x["wind"]>=8 or x["rain"]>=0.8)
        severe=sum(1 for x in rr if x["wind"]>=13 or x["rain"]>=3)
        extreme=sum(1 for x in rr if x["wind"]>=18 or x["rain"]>=8)
        grade,summary=_national_grade(max(winds),max(gusts),max(rains),0,min(temps),None,caution_hours=caution,severe_hours=severe,extreme_hours=extreme)
        results[p["name"]]={"name":p["name"],"grade":grade,"summary":summary,"maxWind":round(max(winds),1),"maxGust":round(max(gusts),1),"maxRain":round(max(rains),1),"maxCape":0,"minTemp":round(min(temps),1),"minVisibility":None,"thunder":"–","cautionHours":caution,"severeHours":severe,"source":"gfs"}
    return results


def _national_metno_results(date_text: str, points: list[dict[str, Any]]) -> tuple[dict[str, dict[str, Any]], dict[str, int]]:
    out={}; stats={"requested":len(points),"ok":0,"http_429":0,"http_403":0,"http_5xx":0,"timeout":0,"other":0}
    try:
        target=datetime.strptime(date_text,"%Y-%m-%d").date(); today=(datetime.now(timezone.utc)+timedelta(hours=9)).date()
        if target<today or target>today+timedelta(days=NATIONAL_METNO_MAX_DAYS): return out,stats
    except ValueError: return out,stats
    def one(p):
        try: return p,_national_result_from_metno(p,date_text,_request_metno_national_point(p) or {}),None
        except Exception as exc: return p,None,_metno_error_kind(exc)
    with ThreadPoolExecutor(max_workers=NATIONAL_METNO_WORKERS,thread_name_prefix="traten-national-metno") as ex:
        for fut in as_completed([ex.submit(one,p) for p in points]):
            p,result,kind=fut.result()
            if result:
                out[p["name"]]=result; stats["ok"]+=1
            elif kind:
                if kind=="http_429": stats["http_429"]+=1
                elif kind=="http_403": stats["http_403"]+=1
                elif kind.startswith("http_5"): stats["http_5xx"]+=1
                elif kind in {"timeout","url_error"}: stats["timeout"]+=1
                else: stats["other"]+=1
    failed=stats["requested"]-stats["ok"]
    if failed:
        app.logger.warning("national_metno_partial requested=%s ok=%s http429=%s http403=%s http5xx=%s timeout=%s other=%s",stats["requested"],stats["ok"],stats["http_429"],stats["http_403"],stats["http_5xx"],stats["timeout"],stats["other"])
    return out,stats


def _national_grade_rank(g: str) -> int:
    return {"A":1,"B":2,"C":3}.get(str(g),0)


def _national_merge_two_models(p: dict[str, Any], met: dict[str, Any] | None, gfs: dict[str, Any] | None) -> dict[str, Any] | None:
    if not met and not gfs: return None
    if not met: return dict(gfs,source="gfs",modelGrades={"gfs":gfs.get("grade")},modelAgreement="single")
    if not gfs: return dict(met,source="metno",modelGrades={"metno":met.get("grade")},modelAgreement="single")
    worse=met if _national_grade_rank(met.get("grade"))>=_national_grade_rank(gfs.get("grade")) else gfs
    def mx(k):
        vals=[x.get(k) for x in (met,gfs) if isinstance(x.get(k),(int,float)) and math.isfinite(float(x.get(k)))]
        return max(vals) if vals else None
    def mn(k):
        vals=[x.get(k) for x in (met,gfs) if isinstance(x.get(k),(int,float)) and math.isfinite(float(x.get(k)))]
        return min(vals) if vals else None
    mg,gg=met.get("grade"),gfs.get("grade")
    diff=abs(_national_grade_rank(mg)-_national_grade_rank(gg))
    return {"name":p["name"],"grade":worse.get("grade","?"),"summary":worse.get("summary") or "2モデルのうち厳しい側を採用しています。",
        "maxWind":round(mx("maxWind") or 0,1),"maxGust":round(mx("maxGust") or mx("maxWind") or 0,1),"maxRain":round(mx("maxRain") or 0,1),
        "maxCape":0,"minTemp":round(mn("minTemp"),1) if mn("minTemp") is not None else None,"minVisibility":None,"thunder":"–",
        "cautionHours":max(int(met.get("cautionHours") or 0),int(gfs.get("cautionHours") or 0)),"severeHours":max(int(met.get("severeHours") or 0),int(gfs.get("severeHours") or 0)),
        "source":"metno+gfs","modelGrades":{"metno":mg,"gfs":gg},"modelAgreement":"high" if diff==0 else "medium" if diff==1 else "low"}


def _national_fetch_shared(date_text: str, points: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], bool, bool, str | None]:
    # V1.4.113: nationwide simple outlook is isolated from Open-Meteo.
    # Reuse per-point combined results first; then fetch MET Norway + NOAA GFS direct only.
    results_by_name={}
    missing=[]
    for p in points:
        cached=_national_point_cache_get(date_text,p)
        if cached and str(cached.get("source") or "") in {"metno+gfs","metno","gfs"}:
            cached["name"]=p["name"]; results_by_name[p["name"]]=cached
        else: missing.append(p)
    warning_parts=[]
    if missing:
        metno={}; gfs={}
        # Fetch both independent sources. One can still complete if the other is temporarily unavailable.
        try:
            metno,metno_stats=_national_metno_results(date_text,missing)
            if metno_stats.get("http_429"): warning_parts.append("MET Norwayが混雑したため一部は保存済み結果を利用しました")
            elif metno_stats.get("http_403"): warning_parts.append("MET Norwayの認証ヘッダー確認が必要です")
            elif metno_stats.get("http_5xx") or metno_stats.get("timeout"): warning_parts.append("MET Norwayの一部応答が不安定でした")
        except Exception as exc:
            app.logger.warning("national_metno_failed kind=%s",_metno_error_kind(exc))
            warning_parts.append("MET Norwayの一部を取得できませんでした")
        try: gfs=_national_gfs_results(date_text,missing)
        except Exception as exc: warning_parts.append(f"NOAA GFSの一部を取得できませんでした")
        for p in missing:
            result=_national_merge_two_models(p,metno.get(p["name"]),gfs.get(p["name"]))
            if result:
                results_by_name[p["name"]]=result
                _national_point_cache_put(date_text,p,result)
    ordered=[results_by_name[p["name"]] for p in points if p["name"] in results_by_name]
    complete=len(ordered)==len(points)
    if not complete: warning_parts.append(f"{len(points)-len(ordered)}座は現在データを取得できませんでした")
    return ordered,complete,False,"。".join(dict.fromkeys(warning_parts)) or None


def _national_response(data: dict[str, Any], state: str, *, rate_limited: bool=False, warning: str | None=None, cached_count: int | None=None, newly_fetched_count: int | None=None, stale_fallback_count: int=0) -> Response:
    now=time.time(); generated=float(data.get("generated_ts") or now)
    results=data.get("results") or []; points=data.get("points") or []
    result_names={str(r.get("name") or "") for r in results if isinstance(r,dict)}
    total=len(points); got=len(result_names)
    payload={
        "date":data.get("date"), "results":results, "version":APP_VERSION,
        "complete":got >= total if total else False,
        "cache":{"state":state,"backend":"supabase+local" if _national_supabase_enabled() else "local-only","generatedAt":data.get("generated_at"),"ageSeconds":max(0,round(now-generated)),"freshTtlSeconds":NATIONAL_OUTLOOK_CACHE_TTL,
                 "cachedCount":int(cached_count if cached_count is not None else data.get("cached_count") or got),
                 "newlyFetchedCount":int(newly_fetched_count or 0),
                 "staleFallbackCount":max(0,int(stale_fallback_count or 0)),
                 "missingCount":max(0,total-got)},
        "rateLimited":False,
        "dualModelCount":sum(1 for r in results if r.get("source")=="metno+gfs"),
        "metnoOnlyCount":sum(1 for r in results if r.get("source")=="metno"),
        "gfsOnlyCount":sum(1 for r in results if r.get("source")=="gfs"),
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
                if NATIONAL_OUTLOOK_AUTO_REFRESH and _national_supabase_enabled():
                    _refresh_national_persistent_cache(force=False)
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
                            latest_results=(latest or {}).get("results") or []
                            latest_names={str(r.get("name") or "") for r in latest_results if isinstance(r,dict)}
                            fetch_points=points if state=='stale' else [p for p in points if p.get("name") not in latest_names]
                            results,complete,rate_limited,error=_national_fetch_shared(date_text,fetch_points) if fetch_points else ([],True,False,None)
                            by_name={str(r.get("name") or ""):dict(r) for r in latest_results if isinstance(r,dict) and r.get("name")}
                            for r in results:
                                if isinstance(r,dict) and r.get("name"): by_name[str(r.get("name"))]=dict(r)
                            merged=[by_name[p["name"]] for p in points if p.get("name") in by_name]
                            _national_write_disk_cache(date_text,fp,points,merged)
                            if rate_limited:
                                break
                        finally:
                            _national_unlock(date_text,fp)
                    except Exception:
                        continue
            except Exception:
                continue
    threading.Thread(target=worker,name='traten-national-refresh',daemon=True).start()


@app.post("/api/national-outlook/refresh-cache")
def national_outlook_refresh_cache():
    """Scheduled wake-up endpoint for the persistent nationwide cache.

    Configure the same NATIONAL_CACHE_REFRESH_TOKEN in Render and GitHub Actions.
    The endpoint refreshes only rows whose four-hour TTL has expired.
    """
    if not NATIONAL_CACHE_REFRESH_TOKEN:
        return jsonify(error="NATIONAL_CACHE_REFRESH_TOKEN is not configured"), 503
    supplied = request.headers.get("X-Traten-Cache-Token", "")
    if not supplied or not hmac.compare_digest(supplied, NATIONAL_CACHE_REFRESH_TOKEN):
        return jsonify(error="unauthorized"), 401
    if not _national_supabase_enabled():
        return jsonify(error="Supabase national cache is not configured"), 503
    report = _refresh_national_persistent_cache(force=False)
    return jsonify(report), 200 if report.get("ok") else 207


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
    sb_fresh,sb_stale=_national_supabase_read(date_text,points)
    cached,state=_national_read_disk_cache(date_text,fingerprint)
    disk_state=state
    _ensure_national_refresh_worker()

    # Persistent Supabase cache is authoritative across Render restarts/instances.
    # Merge it ahead of the ephemeral /tmp cache; stale rows are fallback only.
    disk_results=(cached or {}).get("results") or []
    disk_by_name={str(r.get("name") or ""):dict(r) for r in disk_results if isinstance(r,dict) and r.get("name")}
    persistent_seed=[]
    for p in points:
        name=p["name"]
        if name in sb_fresh: persistent_seed.append(sb_fresh[name])
        elif name in disk_by_name: persistent_seed.append(disk_by_name[name])
        elif name in sb_stale: persistent_seed.append(sb_stale[name])
    if persistent_seed:
        now=time.time()
        cached={
            "date":date_text,"fingerprint":fingerprint,"generated_at":datetime.now(timezone.utc).isoformat(),"generated_ts":now,
            "fresh_until":now+NATIONAL_OUTLOOK_CACHE_TTL,"stale_until":now+NATIONAL_OUTLOOK_STALE_TTL,
            "points":points,"results":persistent_seed,"complete":len(persistent_seed)>=len(points),"cached_count":len(persistent_seed),"version":APP_VERSION,
        }
        # Supabase is authoritative across restarts. Preserve a genuinely fresh local snapshot
        # when no persistent rows exist yet (useful during first deployment/migration).
        if len(sb_fresh)>=len(points): state="fresh"
        elif not sb_fresh and not sb_stale and disk_state=="fresh": state="fresh"
        else: state="stale"

    def merge_results(base_results, new_results):
        by_name={str(r.get("name") or ""):dict(r) for r in (base_results or []) if isinstance(r,dict) and r.get("name")}
        for r in (new_results or []):
            if isinstance(r,dict) and r.get("name"): by_name[str(r.get("name"))]=dict(r)
        return [by_name[p["name"]] for p in points if p["name"] in by_name]

    cached_results=(cached or {}).get("results") or []
    cached_names={str(r.get("name") or "") for r in cached_results if isinstance(r,dict)}
    cached_count=len(cached_names)
    is_cached_complete=cached_count >= len(points)

    # A complete fresh cache returns immediately. A fresh partial cache is useful,
    # but we continue only for the missing mountains and merge the result back.
    if cached and state=='fresh' and is_cached_complete:
        return _national_response(cached,'supabase-fresh' if len(sb_fresh)>=len(points) else 'shared-fresh',cached_count=cached_count,newly_fetched_count=0)

    if not _national_try_lock(date_text,fingerprint):
        # Another worker/user is filling the same date. Return whatever partial/full cache exists immediately.
        if cached_results:
            cache_state='shared-partial-refreshing' if not is_cached_complete else 'shared-stale-refreshing'
            warning='保存済みの判定結果を表示しています。未取得の山は別の処理で更新中です。' if not is_cached_complete else '共有キャッシュを更新中のため、保存済み結果を表示しています。'
            return _national_response(cached,cache_state,warning=warning,cached_count=cached_count,newly_fetched_count=0)
        for _ in range(12):
            time.sleep(0.5)
            ready,ready_state=_national_read_disk_cache(date_text,fingerprint)
            if ready and (ready.get('results') or []):
                ready_count=len({str(r.get('name') or '') for r in (ready.get('results') or []) if isinstance(r,dict)})
                ready_complete=ready_count>=len(points)
                return _national_response(ready,'shared-fresh' if ready_complete else 'shared-partial-refreshing',cached_count=ready_count,newly_fetched_count=0)
        return jsonify(error="全国共有キャッシュを生成中です。数秒後に再度お試しください。"), 503

    try:
        # Re-check after lock because another request may have completed while we waited.
        ready,ready_state=_national_read_disk_cache(date_text,fingerprint)
        if ready:
            cached=ready; state=ready_state
            cached_results=ready.get('results') or []
            cached_names={str(r.get('name') or '') for r in cached_results if isinstance(r,dict)}
            cached_count=len(cached_names)
            if state=='fresh' and cached_count>=len(points):
                return _national_response(ready,'shared-fresh',cached_count=cached_count,newly_fetched_count=0)

        # Supabase fresh rows survive deploy/restart and are never refetched within fresh TTL.
        # Only stale/missing rows are refreshed; stale rows remain fallback for failures.
        if sb_fresh:
            fetch_points=[p for p in points if p['name'] not in sb_fresh]
            base_results=cached_results
            state_prefix='partial' if sb_fresh else 'refresh'
        elif cached and state=='fresh':
            fetch_points=[p for p in points if p['name'] not in cached_names]
            base_results=cached_results
            state_prefix='partial'
        else:
            fetch_points=points
            base_results=cached_results
            state_prefix='refresh'

        new_results=[]; error=None
        if fetch_points:
            new_results,_,_,error=_national_fetch_shared(date_text,fetch_points)
        merged=merge_results(base_results,new_results)
        data=_national_write_disk_cache(date_text,fingerprint,points,merged)
        _national_supabase_write(date_text,points,new_results)
        complete=len(merged)>=len(points)
        new_names={str(r.get('name') or '') for r in new_results if isinstance(r,dict) and r.get('name')}
        newly_fetched=max(0,len(new_names - cached_names))
        merged_names={str(r.get('name') or '') for r in merged if isinstance(r,dict) and r.get('name')}
        stale_fallback_count=len((set(sb_stale) & merged_names)-new_names)

        if complete:
            response_state='partial-completed' if state_prefix=='partial' else 'live-generated'
            return _national_response(data,response_state,cached_count=cached_count,newly_fetched_count=newly_fetched,stale_fallback_count=stale_fallback_count)

        missing_count=max(0,len(points)-len(merged))
        warning=(error or f'保存済み結果を利用し、未取得の{missing_count}座だけ次回以降も追加取得します。')
        return _national_response(data,'partial-updated',warning=warning,cached_count=cached_count,newly_fetched_count=newly_fetched,stale_fallback_count=stale_fallback_count)
    finally:
        _national_unlock(date_text,fingerprint)

@app.get("/api/health")
def health():
    return jsonify(
        ok=True,
        version=APP_VERSION,
        service="mountain-weather-decision",
        overpass_endpoints=len(OVERPASS_ENDPOINTS),
        national_persistent_cache_configured=_national_supabase_enabled(),
        national_persistent_cache_table=NATIONAL_SUPABASE_CACHE_TABLE if _national_supabase_enabled() else None,
        national_cache_ttl_seconds=NATIONAL_OUTLOOK_CACHE_TTL,
        national_auto_refresh_enabled=NATIONAL_OUTLOOK_AUTO_REFRESH,
        national_refresh_interval_seconds=NATIONAL_OUTLOOK_REFRESH_INTERVAL,
        national_refresh_token_configured=bool(NATIONAL_CACHE_REFRESH_TOKEN),
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


@app.get("/data-audit")
def data_audit():
    if not _dashboard_auth_ok():
        return _dashboard_unauthorized()
    response = send_from_directory(BASE, "data-audit.html")
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


# V1.4.174: start the cache watcher on process boot, not only after a user opens 全国判定.
# Render free instances can sleep, so the GitHub Actions wake-up endpoint below is the
# reliable scheduler; this worker covers periods while the process stays awake.
if NATIONAL_OUTLOOK_AUTO_REFRESH:
    threading.Timer(2.0, _ensure_national_refresh_worker).start()


if __name__ == "__main__":
    print(f"Mountain Weather Decision V{APP_VERSION}")
    print(f"Open http://localhost:{PORT}")
    print("Stop: Ctrl+C")
    app.run(host="0.0.0.0", port=PORT, threaded=True, debug=False)
