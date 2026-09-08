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
from html.parser import HTMLParser
import html as html_lib
import re
import unicodedata
from typing import Any

from flask import Flask, Response, jsonify, request, send_from_directory, send_file, abort

import instagram_bot

BASE = os.path.dirname(os.path.abspath(__file__))
APP_VERSION = "1.6.20"
PORT = int(os.environ.get("PORT", "8000"))
METEOBLUE_API_KEY = os.environ.get("METEOBLUE_API_KEY", "").strip()
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
# V1.5.190: history/error panels intentionally start fresh from this release.
USAGE_DASHBOARD_RESET_AT = "2026-09-06T02:00:01+00:00"

INDEXNOW_KEY = "5d55ce5ee953aa38b715681f5207ee3d"
INDEXNOW_KEY_FILENAME = f"{INDEXNOW_KEY}.txt"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow"
INDEXNOW_HOST = "otenki.onrender.com"
INDEXNOW_PUBLIC_URLS = ['https://otenki.onrender.com/', 'https://otenki.onrender.com/guide.html', 'https://otenki.onrender.com/live-cameras.html', 'https://otenki.onrender.com/trailheads.html', 'https://otenki.onrender.com/huts.html', 'https://otenki.onrender.com/water-sources.html']

ALLOWED_EVENT_NAMES = {'trail_route_calculated', 'route_created', 'page_view', 'result_screenshot', 'route_camera', 'water_list', 'weather_api_audit', 'arrival_times_calculated', 'classic_route_loaded', 'planner_clear', 'representative_course_loaded', 'route_candidates_loaded', 'water_report', 'route_point_used', 'mountain_selected', 'point_selected', 'weather_analysis'}

ALLOWED_HOSTS = {
    "api.open-meteo.com",
    "air-quality-api.open-meteo.com",
    "geocoding-api.open-meteo.com",
    "nominatim.openstreetmap.org",
    "api.met.no",
    "cyberjapandata.gsi.go.jp",
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
NATIONAL_100_POINTS_FILE = os.path.join(BASE, "national-100-points.json")
NATIONAL_OUTLOOK_CHUNK_SIZE = max(1, min(50, int(os.environ.get("NATIONAL_OUTLOOK_CHUNK_SIZE", "25"))))
NATIONAL_OUTLOOK_ENGINE = "metno-gfs-v5-abcde-mean-floor"
NATIONAL_GFS_MIN_INTERVAL = float(os.environ.get("NATIONAL_GFS_MIN_INTERVAL", "0.35"))
_national_gfs_lock = threading.Lock()
_national_gfs_last_request = 0.0
NATIONAL_OUTLOOK_CACHE_DIR = os.environ.get("NATIONAL_OUTLOOK_CACHE_DIR", os.path.join(tempfile.gettempdir(), "traten-national-outlook"))
os.makedirs(NATIONAL_OUTLOOK_CACHE_DIR, exist_ok=True)
_national_point_cache: dict[str, tuple[float, dict[str, Any]]] = {}
_national_point_cache_lock = threading.Lock()
_national_refresh_thread_started = False
_national_refresh_thread_lock = threading.Lock()

# V1.6.1: preserve legacy environment names, separating proactive 300 and social 100.
NATIONAL_OUTLOOK_BOOT_GRACE = max(0, int(os.environ.get("NATIONAL_OUTLOOK_BOOT_GRACE", "45")))
NATIONAL_100_ROLLING_AUTO_CACHE = os.environ.get("NATIONAL_100_ROLLING_AUTO_CACHE", os.environ.get("NATIONAL_NEXTDAY_100_AUTO_CACHE", "1")).lower() not in {"0", "false", "no", "off", ""}
NATIONAL_100_ROLLING_DAYS = max(1, min(15, int(os.environ.get("NATIONAL_100_ROLLING_DAYS", "7"))))
NATIONAL_100_ROLLING_DATES_PER_CYCLE = max(1, min(15, int(os.environ.get("NATIONAL_100_ROLLING_DATES_PER_CYCLE", "1"))))
NATIONAL_PREFETCH_COUNT = int(os.environ.get("NATIONAL_PREFETCH_COUNT", "300"))
if NATIONAL_PREFETCH_COUNT not in {100, 300}:
    raise ValueError("NATIONAL_PREFETCH_COUNT must be 100 or 300")
NATIONAL_PREFETCH_POINTS_FILE = os.path.join(BASE, "national-runtime-points-v161.json")
NATIONAL_REFRESH_STATUS_FILE = os.path.join(NATIONAL_OUTLOOK_CACHE_DIR, "refresh-status.json")
_national_last_refresh_report = {}
_national_refresh_worker_thread = None
_national_refresh_worker_lock_handle = None
_national_refresh_thread_pid = None
_national_refresh_runtime = {"state":"not-started", "workerPid":None, "lastCheckAt":None,
    "lastRunStartedAt":None, "lastRunFinishedAt":None, "lastRunOk":None, "lastError":None}
_national_file_handles = {}
_national_file_handles_lock = threading.Lock()
_national_refresh_stop = threading.Event()


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


def _sanitize_route_itinerary(value: Any) -> list[dict[str, Any]]:
    """Sanitize anonymous route/timing detail for usage analytics.

    Deliberately stores no coordinates, IP, user agent, email, or free-form identity data.
    The route is capped so one analytics event stays small even for long traverses.
    """
    if not isinstance(value, list):
        return []
    allowed = {"point_name", "point_type", "point_role", "date", "time", "stay"}
    out: list[dict[str, Any]] = []
    for raw in value[:40]:
        if not isinstance(raw, dict):
            continue
        row: dict[str, Any] = {}
        for key in allowed:
            val = raw.get(key)
            if key == "stay":
                row[key] = bool(val)
            elif val is not None:
                limit = 120 if key == "point_name" else 40
                row[key] = str(val)[:limit]
        if row.get("point_name"):
            out.append(row)
    return out


def _sanitize_ct_review_segments(value: Any) -> list[dict[str, Any]]:
    """Sanitize CT review candidates captured from anonymous analyzed routes."""
    if not isinstance(value, list):
        return []
    out: list[dict[str, Any]] = []
    for raw in value[:39]:
        if not isinstance(raw, dict):
            continue
        from_name = _clean_text(raw.get("from_name"), 120)
        to_name = _clean_text(raw.get("to_name"), 120)
        status = str(raw.get("status") or "").strip()
        if not from_name or not to_name or status not in {"estimated", "missing"}:
            continue
        row = {"from_name": from_name, "to_name": to_name, "status": status}
        minutes = _clean_int(raw.get("minutes"), 0, 2000)
        if minutes is not None:
            row["minutes"] = minutes
        source = _clean_text(raw.get("source"), 180)
        if source:
            row["source"] = source
        out.append(row)
    return out


def _sanitize_metadata(value: Any) -> dict[str, Any]:
    if not isinstance(value, dict):
        return {}
    # Keep analytics payloads small and deliberately exclude common identity fields.
    blocked = {"ip", "ip_address", "email", "name", "user_agent", "ua", "phone", "address"}
    long_text_keys = {"route_path"}
    out: dict[str, Any] = {}
    for key, val in list(value.items())[:32]:
        k = str(key)[:64]
        if k.lower() in blocked:
            continue
        if k == "itinerary":
            rows = _sanitize_route_itinerary(val)
            if rows:
                out[k] = rows
            continue
        if k == "ct_review_segments":
            rows = _sanitize_ct_review_segments(val)
            if rows:
                out[k] = rows
            continue
        if isinstance(val, (str, int, float, bool)) or val is None:
            if isinstance(val, str):
                out[k] = val[:1600 if k in long_text_keys else 300]
            else:
                out[k] = val
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

    # V1.5.190: anonymous analyzed-route history is restored. Older records are
    # intentionally hidden: the owner requested a clean slate from this release.
    try:
        history_cutoff = datetime.fromisoformat(USAGE_DASHBOARD_RESET_AT)
    except Exception:
        history_cutoff = datetime(2026, 9, 6, 2, 0, 1, tzinfo=timezone.utc)

    def after_dashboard_reset(event: dict[str, Any]) -> bool:
        try:
            raw = str(event.get("created_at") or "")
            dt = datetime.fromisoformat(raw.replace("Z", "+00:00"))
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc) >= history_cutoff.astimezone(timezone.utc)
        except Exception:
            return False

    analysis_history: list[dict[str, Any]] = []
    for e in events:
        if e.get("event_name") != "weather_analysis" or e.get("success") is not True or not after_dashboard_reset(e):
            continue
        meta = e.get("metadata") if isinstance(e.get("metadata"), dict) else {}
        itinerary = _sanitize_route_itinerary(meta.get("itinerary"))
        mountain = str(e.get("mountain") or meta.get("mountain") or "").strip()
        route_path = str(meta.get("route_path") or "").strip()
        if not route_path and itinerary:
            route_path = " → ".join(str(x.get("point_name") or "") for x in itinerary if x.get("point_name"))
        route_label = str(meta.get("route_label") or "").strip()
        start_date = str(meta.get("start_date") or (itinerary[0].get("date") if itinerary else "") or "")[:10]
        end_date = str(meta.get("end_date") or (itinerary[-1].get("date") if itinerary else "") or "")[:10]
        row = {
            "created_at": e.get("created_at"), "mountain": mountain,
            "route_label": route_label, "route_path": route_path,
            "start_date": start_date, "end_date": end_date,
            "stay_count": int(e.get("stay_count") or meta.get("overnight_count") or 0),
            "point_count": int(e.get("route_points") or len(itinerary) or 0),
            "itinerary": itinerary,
        }
        if route_path or itinerary:
            analysis_history.append(row)
    analysis_history.sort(key=lambda x: str(x.get("created_at") or ""), reverse=True)
    analysis_history = analysis_history[:100]

    # Keep the CT review queue useful; this is independent from the reset history panels.
    ct_review_map: dict[tuple[str, str], dict[str, Any]] = {}
    for e in events:
        if e.get("event_name") != "weather_analysis" or e.get("success") is not True:
            continue
        meta = e.get("metadata") if isinstance(e.get("metadata"), dict) else {}
        segments = _sanitize_ct_review_segments(meta.get("ct_review_segments"))
        mountain = str(e.get("mountain") or "").strip()
        session = str(e.get("session_id") or "")
        created = str(e.get("created_at") or "")
        for seg in segments:
            key = (seg["from_name"], seg["to_name"])
            row = ct_review_map.setdefault(key, {
                "from_name": seg["from_name"], "to_name": seg["to_name"],
                "status": seg["status"], "minutes": seg.get("minutes"),
                "source": seg.get("source", ""), "use_count": 0,
                "sessions": set(), "mountains": set(), "last_used": "",
            })
            row["use_count"] += 1
            if seg["status"] == "missing":
                row["status"] = "missing"; row["minutes"] = None
            elif row.get("minutes") is None and seg.get("minutes") is not None:
                row["minutes"] = seg.get("minutes")
            if session: row["sessions"].add(session)
            if mountain: row["mountains"].add(mountain)
            if created > row["last_used"]: row["last_used"] = created
    ct_review_segments = []
    for row in ct_review_map.values():
        row["unique_sessions"] = len(row.pop("sessions"))
        row["mountains"] = sorted(row.pop("mountains"))
        ct_review_segments.append(row)
    ct_review_segments.sort(key=lambda x: (x["use_count"], x["unique_sessions"], x["last_used"]), reverse=True)
    ct_review_segments = ct_review_segments[:100]

    recent_failures = [
        {
            "created_at": e.get("created_at"), "event_name": e.get("event_name"),
            "mountain": e.get("mountain"), "error_message": e.get("error_message"),
        }
        for e in events if e.get("success") is False and after_dashboard_reset(e)
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
        "analysis_history": analysis_history,
        "ct_review_segments": ct_review_segments,
        "history_reset_at": USAGE_DASHBOARD_RESET_AT,
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


def _national_public_result(row):
    return {k:v for k,v in row.items() if not k.startswith("_")}

def _national_meta(row, *, fetched_at=None):
    meta = row.get("_cache_meta") if isinstance(row, dict) else None
    if isinstance(meta, dict):
        try:
            gt, fu, su = (float(meta[k]) for k in ("generated_ts", "fresh_until", "stale_until"))
            if all(math.isfinite(x) for x in (gt,fu,su)) and 0 < gt <= fu <= su:
                return {"generated_ts":gt, "fresh_until":fu, "stale_until":su}
        except (KeyError,TypeError,ValueError):
            pass
    if fetched_at is None:
        return None
    return {"generated_ts":fetched_at, "fresh_until":fetched_at + NATIONAL_OUTLOOK_CACHE_TTL,
            "stale_until":fetched_at + max(NATIONAL_OUTLOOK_CACHE_TTL,NATIONAL_OUTLOOK_STALE_TTL)}

def _national_valid_results(points, results, *, fetched_at=None):
    wanted = {p["name"] for p in points}
    rows = {}
    for row in results or []:
        if not isinstance(row, dict) or row.get("name") not in wanted or row.get("grade") not in {"A","B","C","D","E"}:
            continue
        meta = _national_meta(row, fetched_at=fetched_at)
        if meta is None or meta["stale_until"] <= time.time():
            continue
        rows[row["name"]] = dict(row, _cache_meta=meta)
    return rows

def _national_snapshot(date_text, fingerprint, points, results):
    rows = _national_valid_results(points,results)
    ordered = [rows[p["name"]] for p in points if p["name"] in rows]
    now = time.time(); metas = [r["_cache_meta"] for r in ordered]
    gt = min((m["generated_ts"] for m in metas),default=now)
    fu = min((m["fresh_until"] for m in metas),default=now)
    su = max((m["stale_until"] for m in metas),default=now)
    return {"date":date_text,"fingerprint":fingerprint,"engine":NATIONAL_OUTLOOK_ENGINE,
        "generated_at":datetime.fromtimestamp(gt,timezone.utc).isoformat(),"generated_ts":gt,
        "fresh_until":fu,"stale_until":su,"points":points,"results":ordered,
        "complete":len(ordered)==len(points),"cached_count":len(ordered),"version":APP_VERSION}

def _national_open_lock(name):
    """Non-blocking process + thread lock. No timeout stealing of a live owner's lock."""
    key = os.path.join(NATIONAL_OUTLOOK_CACHE_DIR,"lock-"+hashlib.sha256(name.encode()).hexdigest()+".lck")
    with _national_file_handles_lock:
        prev = _national_file_handles.get(key)
        if prev and prev[0] == os.getpid():
            return None
        if prev:
            # Inherited descriptors after a fork must not be unlocked on behalf of the parent.
            prev[1].close(); _national_file_handles.pop(key,None)
        handle = open(key,"a+b")
        try:
            if os.name == "nt":
                import msvcrt
                handle.seek(0); handle.write(b"0"); handle.flush(); handle.seek(0)
                msvcrt.locking(handle.fileno(),msvcrt.LK_NBLCK,1)
            else:
                import fcntl
                fcntl.flock(handle.fileno(),fcntl.LOCK_EX|fcntl.LOCK_NB)
        except (OSError,ImportError):
            handle.close(); return None
        _national_file_handles[key] = (os.getpid(),handle)
        return key

def _national_close_lock(key):
    if key is None:
        return
    with _national_file_handles_lock:
        item = _national_file_handles.pop(key,None)
        if item:
            item[1].close()

def _national_cached_snapshot(date_text, fingerprint, points):
    read_error = None
    try:
        fresh, stale, meta = _national_supabase_read(date_text,points)
    except RuntimeError as exc:
        fresh, stale, meta = {}, {}, {}
        read_error = str(exc)
    disk,_ = _national_read_disk_cache(date_text,fingerprint)
    rows = _national_valid_results(points,(disk or {}).get("results") or [])
    for p in points:
        name = p["name"]
        if name in fresh:
            rows[name] = dict(fresh[name],_cache_meta=meta[name])
        elif name in stale:
            local = rows.get(name)
            if not local or local["_cache_meta"]["generated_ts"] < meta[name]["generated_ts"]:
                rows[name] = dict(stale[name],_cache_meta=meta[name])
    snap = _national_snapshot(date_text,fingerprint,points,list(rows.values()))
    snap["supabase_fresh_count"] = len(fresh); snap["supabase_stale_count"] = len(stale)
    if read_error:
        snap["cacheReadError"] = read_error
    return snap

def _national_fetch_and_persist(date_text, points, due, initial=None):
    """Fetch at most CHUNK_SIZE, checkpoint immediately and verify database writes."""
    fp = _national_points_fingerprint(points)
    rows = _national_valid_results(points,(initial or {}).get("results") or [])
    fetched_names = set(); persisted_names = set(); errors = []; chunks = []; limited = False
    persistent = _national_supabase_enabled()
    for start in range(0,len(due),NATIONAL_OUTLOOK_CHUNK_SIZE):
        if _national_refresh_stop.is_set():
            errors.append("refresh interrupted"); break
        batch = due[start:start+NATIONAL_OUTLOOK_CHUNK_SIZE]
        cr = {"start":start,"requested":len(batch),"fetched":0,"persisted":0,"completeFetch":False,"error":None}
        at = time.time()
        try:
            received,complete,limited,warning = _national_fetch_shared(date_text,batch)
            valid = _national_valid_results(batch,received,fetched_at=at)
            rows.update(valid); fetched_names.update(valid)
            cr.update(fetched=len(valid),completeFetch=bool(complete and len(valid)==len(batch)),rateLimited=bool(limited))
            if valid:
                # Local checkpoint is independent of DB; a failed DB write is never counted as persisted.
                try:
                    _national_write_disk_cache(date_text,fp,points,list(rows.values()))
                except OSError as exc:
                    errors.append("local checkpoint failed: "+type(exc).__name__)
                if persistent:
                    wrote = _national_supabase_write(date_text,batch,list(valid.values()))
                    if wrote:
                        confirmed, verify_attempts, verify_error = _national_confirm_supabase_write(date_text,batch,valid)
                        persisted_names.update(confirmed); cr["persisted"] = len(confirmed)
                        cr["verifyAttempts"] = verify_attempts
                        if verify_error:
                            cr["error"] = "database read-back incomplete"
                            cr["verifyDetail"] = verify_error
                    else:
                        cr["error"] = "database write failed"
                else:
                    cr["localSaved"] = len(valid)
            if not cr["completeFetch"] and not cr["error"]:
                cr["error"] = warning or "forecast acquisition incomplete"
            if warning:
                cr["warning"] = warning
        except Exception as exc:
            cr["error"] = type(exc).__name__+": "+str(exc)[:160]
            app.logger.exception("national_chunk_failed date=%s start=%s",date_text,start)
        if cr["error"]:
            errors.append(cr["error"])
        chunks.append(cr)
        if limited:
            break
    snap = _national_snapshot(date_text,fp,points,list(rows.values()))
    if persistent:
        try:
            fresh,stale,_ = _national_supabase_read(date_text,points)
        except RuntimeError as exc:
            fresh,stale = {},{}
            errors.append(str(exc))
        fresh_count = len(fresh); stored = len(set(fresh)|set(stale))
    else:
        fresh_count = sum(r["_cache_meta"]["fresh_until"] > time.time() for r in snap["results"])
        stored = len(snap["results"])
    remaining = max(0,len(points)-fresh_count)
    report = {"ok":not errors and remaining==0,"requested":len(due),"pointsFetched":len(fetched_names),
        "pointsUpdated":len(persisted_names) if persistent else fresh_count,
        "persistedCount":len(persisted_names),"freshAfter":fresh_count,"missingAfter":max(0,len(points)-stored),
        "remainingDueAfter":remaining,"chunkSize":NATIONAL_OUTLOOK_CHUNK_SIZE,"chunks":chunks,
        "errors":list(dict.fromkeys(errors)),"rateLimited":limited,"backend":"supabase+local" if persistent else "local-only"}
    if remaining and not report["errors"]:
        report["errors"].append(f"fresh cache incomplete: {fresh_count}/{len(points)}")
    snap["persistence"] = report; snap["rateLimited"] = limited
    return snap,report

def _national_load_prefetch_points():
    try:
        with open(NATIONAL_PREFETCH_POINTS_FILE,encoding="utf-8") as f:
            raw = json.load(f)
    except (OSError,ValueError):
        return []
    points = []; seen = set()
    for p in raw if isinstance(raw,list) else []:
        try:
            name = str(p["name"]); lat = float(p["lat"]); lon = float(p["lon"])
            elev = float(p["elevation"]) if p.get("elevation") is not None else None
        except (KeyError,TypeError,ValueError):
            return []
        if name in seen or not (20<=lat<=50 and 120<=lon<=155) or (elev is not None and not math.isfinite(elev)):
            return []
        seen.add(name); points.append({"name":name,"lat":lat,"lon":lon,"elevation":elev})
    if NATIONAL_PREFETCH_COUNT == 100:
        members = _national_load_100_points()
        wanted = {p["name"] for p in members}
        points = [p for p in points if p["name"] in wanted]
    return points

def _national_rolling_100_date_texts():
    today = (datetime.now(timezone.utc)+timedelta(hours=9)).date()
    return [(today+timedelta(days=i)).isoformat() for i in range(1,NATIONAL_100_ROLLING_DAYS+1)]

def _national_100_date_cache_status(date_text, points, *, force=False):
    fresh,stale,_ = _national_supabase_read(date_text,points)
    due = points if force else [p for p in points if p["name"] not in fresh]
    return {"date":date_text,"seedCount":len(points),"freshBefore":len(fresh),"staleBefore":len(stale),
        "missingBefore":max(0,len(points)-len(set(fresh)|set(stale))),"pointsDue":len(due),
        "pointsUpdated":0,"ok":not due,"processed":False}, due

def _refresh_rolling_100_cache(*, force=False, max_dates=None):
    # Legacy function name is retained for compatibility, scope is explicit in the report.
    points = _national_load_prefetch_points(); dates = _national_rolling_100_date_texts()
    report = {"ok":True,"rollingDays":len(dates),"seedCount":len(points),"targetRows":len(points)*len(dates),
        "windowStart":dates[0],"windowEnd":dates[-1],"datesInspected":0,"datesDue":0,"datesProcessed":0,
        "pointsDue":0,"pointsUpdated":0,"dateReports":[],"errors":[],"windowComplete":False}
    if len(points)!=NATIONAL_PREFETCH_COUNT or not _national_supabase_enabled():
        report.update(ok=False,error=f"Seed count/configuration mismatch: {len(points)}/{NATIONAL_PREFETCH_COUNT}")
        return report
    due_dates = []
    for d in dates:
        status,due = _national_100_date_cache_status(d,points,force=force)
        report["dateReports"].append(status); report["datesInspected"]+=1; report["pointsDue"]+=len(due)
        if due:
            due_dates.append((d,due,status))
    report["datesDue"] = len(due_dates)
    # Fill missing dates first; within equal deficit, earliest forecast day first.
    due_dates.sort(key=lambda x:(-len(x[1]),x[0]))
    for d,due,status in due_dates[:max(1,int(max_dates or NATIONAL_100_ROLLING_DATES_PER_CYCLE))]:
        fp = _national_points_fingerprint(points)
        if not _national_try_lock(d,fp):
            status.update(locked=True,error="date refresh in progress"); report["errors"].append({"date":d,"error":"locked"}); continue
        try:
            initial = _national_cached_snapshot(d,fp,points)
            # Re-read inside the lock so another request's new rows are not refetched.
            _,due = _national_100_date_cache_status(d,points,force=force)
            _,done = _national_fetch_and_persist(d,points,due,initial)
            status.update(done,processed=True); report["datesProcessed"]+=1; report["pointsUpdated"]+=done["pointsUpdated"]
            if not done["ok"]:
                report["errors"].append({"date":d,"error":done["errors"]})
            if done["rateLimited"]:
                break
        except Exception as exc:
            status.update(ok=False,error=type(exc).__name__); report["errors"].append({"date":d,"error":type(exc).__name__})
        finally:
            _national_unlock(d,fp)
    report["remainingDueAfter"] = sum(x.get("remainingDueAfter",x["pointsDue"]) for x in report["dateReports"])
    report["windowComplete"] = report["remainingDueAfter"]==0
    report["ok"] = not report["errors"]
    report["state"] = "complete" if report["windowComplete"] else "incomplete" if report["errors"] else "scheduled-remaining"
    return report

def _instagram_load_yarigatake_detail(date_text: str) -> dict[str, Any]:
    """Load the same-day/hourly national model data used by the web detail graph."""
    points=_national_load_prefetch_points()
    p=next((dict(x) for x in points if str(x.get("name") or "")=="槍ヶ岳"),None)
    if not p:
        raise RuntimeError("Yarigatake point is unavailable")
    met=None; gfs=None
    try:
        met=_national_result_from_metno(p,date_text,_request_metno_national_point(p) or {},include_series=True)
    except Exception as exc:
        app.logger.warning("instagram_yarigatake_metno_failed %s",type(exc).__name__)
    try:
        gfs=_national_gfs_results(date_text,[p],include_series=True).get("槍ヶ岳")
    except Exception as exc:
        app.logger.warning("instagram_yarigatake_gfs_failed %s",type(exc).__name__)
    merged=_national_merge_two_models(p,met,gfs)
    if not merged or (not met and not gfs):
        raise RuntimeError("Yarigatake forecast unavailable")
    def clean(row):
        if not row: return None
        return {k:v for k,v in row.items() if k != "_series"}
    return {"date":date_text,"name":"槍ヶ岳","merged":merged,"models":{"metno":clean(met),"gfs":clean(gfs)}}


def _instagram_maybe_post_after_refresh():
    # Do not turn auto posting on. Honor the existing bot configuration/hour/remote deduplication.
    if not instagram_bot.INSTAGRAM_AUTO_POST:
        return {"ok":True,"skipped":True,"reason":"auto-post-disabled"}
    key = _national_open_lock("instagram-publish")
    if key is None:
        return {"ok":True,"skipped":True,"reason":"posting-in-progress"}
    try:
        return instagram_bot.maybe_post_tomorrow(now_jst=datetime.now(timezone.utc)+timedelta(hours=9),
            load_results=_instagram_load_fresh_100_results, load_reel_detail=_instagram_load_yarigatake_detail)
    except Exception as exc:
        app.logger.exception("instagram_auto_post_failed")
        return {"ok":False,"error":type(exc).__name__}
    finally:
        _national_close_lock(key)

def _instagram_post_with_lock(date_text, rows, *, force=False):
    key = _national_open_lock("instagram-publish")
    if key is None:
        return {"ok":False,"skipped":True,"reason":"posting-in-progress"}
    try:
        return instagram_bot.post_national(date_text,rows,force=force,load_reel_detail=_instagram_load_yarigatake_detail)
    finally:
        _national_close_lock(key)

def _refresh_national_local_cache():
    report = {"ok":True,"pointsUpdated":0,"errors":[],"datesProcessed":0}
    today = (datetime.now(timezone.utc)+timedelta(hours=9)).date()
    for filename in sorted(os.listdir(NATIONAL_OUTLOOK_CACHE_DIR)):
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}-[a-f0-9]+\.json",filename):
            continue
        try:
            with open(os.path.join(NATIONAL_OUTLOOK_CACHE_DIR,filename),encoding="utf-8") as f:
                raw = json.load(f)
            d = raw["date"]; fp = raw["fingerprint"]; ps = raw["points"]
            if raw.get("engine")!=NATIONAL_OUTLOOK_ENGINE or not today<=datetime.strptime(d,"%Y-%m-%d").date()<=today+timedelta(days=15):
                continue
            snap,_ = _national_read_disk_cache(d,fp)
            if not snap or (snap["complete"] and snap["fresh_until"]>time.time()):
                continue
            if not _national_try_lock(d,fp):
                continue
            try:
                fresh = {r["name"] for r in snap["results"] if r["_cache_meta"]["fresh_until"]>time.time()}
                _,done = _national_fetch_and_persist(d,ps,[p for p in ps if p["name"] not in fresh],snap)
                report["datesProcessed"]+=1;report["pointsUpdated"]+=done["pointsUpdated"];report["errors"].extend(done["errors"])
            finally:
                _national_unlock(d,fp)
            if report["datesProcessed"]>=NATIONAL_100_ROLLING_DATES_PER_CYCLE:
                break
        except (OSError,ValueError,KeyError,TypeError) as exc:
            report["errors"].append(type(exc).__name__)
    report["ok"] = not report["errors"]
    return report

def _save_national_refresh_runtime():
    data = dict(_national_refresh_runtime,engine=NATIONAL_OUTLOOK_ENGINE,
        lastReport=_national_last_refresh_report,workerThreadAlive=bool(_national_refresh_worker_thread and _national_refresh_worker_thread.is_alive()),
        statusWrittenAt=datetime.now(timezone.utc).isoformat())
    tmp = NATIONAL_REFRESH_STATUS_FILE+f".{os.getpid()}.{threading.get_ident()}.tmp"
    try:
        with open(tmp,"w",encoding="utf-8") as f:
            json.dump(data,f,ensure_ascii=False,separators=(",", ":"))
        os.replace(tmp,NATIONAL_REFRESH_STATUS_FILE)
    except OSError:
        try:
            os.unlink(tmp)
        except OSError:
            pass

def _national_refresh_runtime_snapshot():
    snap = dict(_national_refresh_runtime)
    try:
        with open(NATIONAL_REFRESH_STATUS_FILE,encoding="utf-8") as f:
            shared = json.load(f)
        if shared.get("engine")==NATIONAL_OUTLOOK_ENGINE:
            snap.update(shared)
    except (OSError,ValueError):
        pass
    if not NATIONAL_OUTLOOK_AUTO_REFRESH:
        snap.update(state="disabled",workerThreadAlive=False)
    elif snap.get("workerPid")==os.getpid():
        snap["workerThreadAlive"] = bool(_national_refresh_worker_thread and _national_refresh_worker_thread.is_alive())
    stamp = snap.get("lastRunFinishedAt") or snap.get("lastCheckAt")
    try:
        dt = datetime.fromisoformat(stamp)
        snap["nextCheckAt"] = (dt+timedelta(seconds=max(300,NATIONAL_OUTLOOK_REFRESH_INTERVAL))).isoformat()
        snap["statusAgeSeconds"] = max(0,int((datetime.now(timezone.utc)-dt).total_seconds()))
    except (TypeError,ValueError):
        snap["nextCheckAt"] = None
    return snap

def _run_national_refresh_cycle(trigger):
    if not NATIONAL_OUTLOOK_AUTO_REFRESH:
        _national_refresh_runtime["state"] = "disabled"
        return
    now = datetime.now(timezone.utc).isoformat()
    _national_refresh_runtime.update(lastCheckAt=now,lastRunStartedAt=now,state="running",lastError=None,trigger=trigger)
    _save_national_refresh_runtime()
    try:
        report = _refresh_national_persistent_cache(force=False) if _national_supabase_enabled() else _refresh_national_local_cache()
        _national_refresh_runtime.update(lastRunOk=bool(report.get("ok")),lastError=None if report.get("ok") else str(report.get("errors"))[:500],state="sleeping")
    except Exception as exc:
        _national_refresh_runtime.update(lastRunOk=False,lastError=type(exc).__name__+": "+str(exc)[:200],state="error")
        app.logger.exception("national_refresh_cycle_failed")
    finally:
        _national_refresh_runtime["lastRunFinishedAt"] = datetime.now(timezone.utc).isoformat()
        _save_national_refresh_runtime()

def _national_grade(max_wind: float, max_gust: float, max_rain: float, max_cape: float, min_temp: float, min_visibility: float | None, *, caution_hours: int = 0, severe_hours: int = 0, extreme_hours: int = 0):
    # V1.6.11: five-level nationwide condition scale. Thresholds are unchanged;
    # the former B/C buckets are split so light/transient and extreme conditions
    # are distinguishable without weakening the severe/extreme safeguards.
    if extreme_hours >= 1:
        return "E", "6〜15時に極端な風・突風・雨が見込まれます。モデル差と時間帯別予測を必ず確認してください。"
    if severe_hours >= 2:
        return "D", "6〜15時に強い風・突風・雨が複数時間見込まれ、厳しい条件です。時間帯別予測を確認してください。"
    if severe_hours >= 1 or caution_hours >= 2:
        return "C", "6〜15時に注意条件が続く、または強い条件が一時的に見込まれます。時間帯別予測を確認してください。"
    if caution_hours >= 1:
        return "B", "6〜15時の一部に軽い注意要素があります。山をタップして時間帯とモデル差を確認してください。"
    return "A", "6〜15時に主要な注意条件が見当たらない日です。山をタップして時間帯別予測を最終確認してください。"


NATIONAL_SUPABASE_CACHE_TABLE = os.environ.get("NATIONAL_SUPABASE_CACHE_TABLE", "national_outlook_cache")
NATIONAL_SUPABASE_TIMEOUT = int(os.environ.get("NATIONAL_SUPABASE_TIMEOUT", "12"))
# V1.6.10: Supabase can briefly return the previous row immediately after an upsert.
# Keep write verification strict, but allow a short bounded read-back window before
# declaring a database failure. This never converts an unconfirmed write to success.
NATIONAL_SUPABASE_VERIFY_RETRIES = max(0, min(5, int(os.environ.get("NATIONAL_SUPABASE_VERIFY_RETRIES", "3"))))
NATIONAL_SUPABASE_VERIFY_DELAY = max(0.1, min(3.0, float(os.environ.get("NATIONAL_SUPABASE_VERIFY_DELAY", "0.6"))))

def _national_supabase_enabled() -> bool:
    return bool(SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY and NATIONAL_SUPABASE_CACHE_TABLE)

def _national_supabase_key(date_text: str, p: dict[str, Any]) -> str:
    raw=f'{NATIONAL_OUTLOOK_ENGINE}|{date_text}|{p["name"]}|{p["lat"]:.5f}|{p["lon"]:.5f}|{"" if p.get("elevation") is None else round(float(p["elevation"]))}'
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()

def _national_supabase_read(date_text, points):
    """Return fresh, stale and original per-row timestamps; never reset freshness on reads."""
    if not _national_supabase_enabled():
        return {}, {}, {}
    params = {"select":"cache_key,mountain_name,result,generated_ts,fresh_until,stale_until",
              "forecast_date":f"eq.{date_text}", "engine":f"eq.{NATIONAL_OUTLOOK_ENGINE}",
              "stale_until":f"gt.{time.time()}", "limit":"1000"}
    url = f"{SUPABASE_URL}/rest/v1/{NATIONAL_SUPABASE_CACHE_TABLE}?" + urllib.parse.urlencode(params, safe=",.:+-")
    req = urllib.request.Request(url, headers=_supabase_headers(accept_json=True))
    try:
        with urllib.request.urlopen(req, timeout=NATIONAL_SUPABASE_TIMEOUT) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except Exception as exc:
        app.logger.warning("national_cache_read_failed %s", type(exc).__name__)
        raise RuntimeError("persistent cache read failed") from exc
    wanted = {_national_supabase_key(date_text,p):p["name"] for p in points}
    fresh, stale, meta_by_name = {}, {}, {}
    for dbrow in data if isinstance(data,list) else []:
        if not isinstance(dbrow,dict):
            continue
        name = wanted.get(str(dbrow.get("cache_key") or ""))
        row = dbrow.get("result")
        if not name or not isinstance(row,dict) or row.get("grade") not in {"A","B","C","D","E"}:
            continue
        meta = _national_meta({"_cache_meta":{k:dbrow.get(k) for k in ("generated_ts","fresh_until","stale_until")}})
        if meta is None or meta["stale_until"] <= time.time():
            continue
        meta_by_name[name] = meta
        (fresh if meta["fresh_until"] > time.time() else stale)[name] = dict(row, name=name, _cache_meta=meta)
    return fresh, stale, meta_by_name

def _national_supabase_write(date_text, points, results):
    """Acknowledge writes; cached rows retain their source-generation timestamp."""
    if not _national_supabase_enabled():
        return False
    by_name = {p["name"]:p for p in points}
    valid = _national_valid_results(points,results)
    rows = []
    for name,r in valid.items():
        p = by_name[name]; meta = r["_cache_meta"]
        if meta["fresh_until"] <= time.time():
            continue
        rows.append({"cache_key":_national_supabase_key(date_text,p),"forecast_date":date_text,
            "engine":NATIONAL_OUTLOOK_ENGINE,"mountain_name":name,"lat":round(float(p["lat"]),5),
            "lon":round(float(p["lon"]),5),"elevation":None if p.get("elevation") is None else round(float(p["elevation"])),
            "result":_national_public_result(r),"generated_at":datetime.fromtimestamp(meta["generated_ts"],timezone.utc).isoformat(),
            **meta,"app_version":APP_VERSION})
    if not rows:
        return False
    url = f"{SUPABASE_URL}/rest/v1/{NATIONAL_SUPABASE_CACHE_TABLE}?on_conflict=cache_key"
    req = urllib.request.Request(url,data=json.dumps(rows,ensure_ascii=False,separators=(",", ":")).encode(),method="POST",
        headers={**_supabase_headers(),"Content-Type":"application/json","Prefer":"resolution=merge-duplicates,return=minimal"})
    try:
        with urllib.request.urlopen(req,timeout=NATIONAL_SUPABASE_TIMEOUT) as resp:
            return 200 <= resp.status < 300
    except Exception as exc:
        app.logger.warning("national_cache_write_failed %s", type(exc).__name__)
        return False


def _national_confirm_supabase_write(date_text, points, expected):
    """Strictly verify an acknowledged Supabase write with bounded read-back retries."""
    expected = _national_valid_results(points, list((expected or {}).values()))
    if not expected:
        return set(), 0, None
    confirmed = set(); last_error = None
    attempts = NATIONAL_SUPABASE_VERIFY_RETRIES + 1
    for attempt in range(attempts):
        # Give PostgREST/Supabase a small propagation window before every verification read.
        time.sleep(min(3.0, NATIONAL_SUPABASE_VERIFY_DELAY * (attempt + 1)))
        try:
            checked, _, _ = _national_supabase_read(date_text, points)
            confirmed = {name for name, row in expected.items() if name in checked
                and checked[name].get("_cache_meta",{}).get("generated_ts",0) >= row["_cache_meta"]["generated_ts"]
                and _national_public_result(checked[name]) == _national_public_result(row)}
            if len(confirmed) == len(expected):
                return confirmed, attempt + 1, None
            last_error = f"database read-back incomplete: {len(confirmed)}/{len(expected)}"
        except RuntimeError as exc:
            last_error = str(exc)
    return confirmed, attempts, last_error or "database read-back incomplete"


def _national_load_100_points():
    """Keep the current social 100 membership, using exactly the UI/cache point identities.

    This is a cache-key compatibility mapping, not a geographic coordinate correction.
    Both original historical seed files remain untouched for further coordinate auditing.
    """
    try:
        with open(NATIONAL_100_POINTS_FILE, encoding="utf-8") as f:
            members = json.load(f)
        with open(os.path.join(BASE,"national-runtime-points-v161.json"),encoding="utf-8") as f:
            runtime = json.load(f)
        by_name = {p["name"]:p for p in runtime}
        names = [p["name"] for p in members]
        if len(names)!=100 or len(set(names))!=100 or any(n not in by_name for n in names):
            return []
        return [dict(by_name[n]) for n in names]
    except (OSError,ValueError,KeyError,TypeError):
        return []


def _national_nextday_date_text() -> str:
    today_jst=(datetime.now(timezone.utc)+timedelta(hours=9)).date()
    return (today_jst+timedelta(days=1)).isoformat()


def _instagram_load_fresh_100_results(date_text: str) -> list[dict[str, Any]]:
    points = _national_load_100_points()
    if len(points) != 100 or not _national_supabase_enabled():
        return []
    try:
        fresh, _, _ = _national_supabase_read(date_text, points)
    except RuntimeError:
        return []
    ordered = []
    for p in points:
        row = fresh.get(p["name"])
        if not isinstance(row, dict):
            continue
        item = dict(row)
        # V1.6.12: Instagram uses the same A-E nationwide grade as the web UI.
        # Keep the exact grade; do not collapse C/D/E back into legacy ABC.
        item["grade5"] = item.get("grade")
        # Reel/static scene 1 needs lat/lon to re-plot the A-E markers each day.
        item["name"] = p["name"]
        item["lat"] = p.get("lat")
        item["lon"] = p.get("lon")
        item["elevation"] = p.get("elevation")
        ordered.append(item)
    if len(ordered) < instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS:
        return []
    return ordered

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
        app.logger.warning("national_refresh_seed_failed %s", type(exc).__name__)
        raise RuntimeError("persistent cache candidate read failed") from exc
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


def _refresh_national_persistent_cache(*, force=False):
    global _national_last_refresh_report
    key = _national_open_lock("national-refresh-cycle")
    if key is None:
        return {"ok":False,"skipped":True,"state":"running-elsewhere","pointsUpdated":0,"errors":["refresh cycle locked"]}
    started = time.time()
    try:
        rolling = _refresh_rolling_100_cache(force=force) if NATIONAL_100_ROLLING_AUTO_CACHE else {"ok":True,"disabled":True,"pointsUpdated":0,"errors":[],"dateReports":[]}
        report = {"ok":rolling["ok"],"force":force,"rolling100":rolling,"rolling":rolling,
            "datesChecked":rolling.get("datesInspected",0),"datesDue":rolling.get("datesDue",0),
            "datesProcessed":rolling.get("datesProcessed",0),"pointsDue":rolling.get("pointsDue",0),
            "pointsUpdated":rolling.get("pointsUpdated",0),"errors":list(rolling.get("errors",[])),
            "backgroundScope":f"{NATIONAL_PREFETCH_COUNT}-mountains-next-{NATIONAL_100_ROLLING_DAYS}-days",
            "onDemandReports":[]}
        if rolling.get("error"):
            report["errors"].append(rolling["error"])
        # Preserve current stale maintenance for previously requested non-prefetch dates/points.
        seeds = {p["name"] for p in _national_load_prefetch_points()} if NATIONAL_100_ROLLING_AUTO_CACHE else set()
        dates = set(_national_rolling_100_date_texts())
        groups = _national_supabase_refresh_candidates(force=force)
        for d,ps in sorted(groups.items()):
            ps = [p for p in ps if d not in dates or p["name"] not in seeds]
            if not ps:
                continue
            if len(report["onDemandReports"])>=NATIONAL_100_ROLLING_DATES_PER_CYCLE:
                break
            fp = _national_points_fingerprint(ps)
            if not _national_try_lock(d,fp):
                continue
            try:
                initial = _national_cached_snapshot(d,fp,ps)
                fresh = {r["name"] for r in initial["results"] if r["_cache_meta"]["fresh_until"]>time.time()}
                due = ps if force else [p for p in ps if p["name"] not in fresh]
                _,done = _national_fetch_and_persist(d,ps,due,initial)
                report["onDemandReports"].append(dict(done,date=d));report["pointsUpdated"]+=done["pointsUpdated"]
                report["pointsDue"]+=len(due);report["datesProcessed"]+=1
                if not done["ok"]:
                    report["errors"].append({"date":d,"error":done["errors"]})
            finally:
                _national_unlock(d,fp)
        # Only independently verified fresh social rows are eligible, not the refresh count.
        report["instagram"] = _instagram_maybe_post_after_refresh()
        report["ok"] = not report["errors"]
        report["elapsedSeconds"] = round(time.time()-started,2)
        report["finishedAt"] = datetime.now(timezone.utc).isoformat()
        _national_last_refresh_report = report
        return report
    finally:
        _national_close_lock(key)


def _national_points_fingerprint(points: list[dict[str, Any]]) -> str:
    raw = NATIONAL_OUTLOOK_ENGINE + "|" + "|".join(
        f'{p["name"]}:{p["lat"]:.5f}:{p["lon"]:.5f}:{"" if p.get("elevation") is None else round(float(p["elevation"]))}'
        for p in points
    )
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()[:20]


def _national_cache_file(date_text: str, fingerprint: str) -> str:
    return os.path.join(NATIONAL_OUTLOOK_CACHE_DIR, f"{date_text}-{fingerprint}.json")


def _national_read_disk_cache(date_text, fingerprint):
    try:
        with open(_national_cache_file(date_text,fingerprint),encoding="utf-8") as f:
            data = json.load(f)
        if data.get("engine") != NATIONAL_OUTLOOK_ENGINE or data.get("date") != date_text or data.get("fingerprint") != fingerprint:
            return None, "incompatible"
        snap = _national_snapshot(date_text,fingerprint,data.get("points") or [],data.get("results") or [])
        if not snap["results"]:
            return None, "missing"
        return snap, "fresh" if snap["fresh_until"] > time.time() else "stale"
    except (OSError,ValueError,TypeError,KeyError):
        return None, "missing"


def _national_write_disk_cache(date_text, fingerprint, points, results):
    data = _national_snapshot(date_text,fingerprint,points,results)
    path = _national_cache_file(date_text,fingerprint)
    tmp = path + f".{os.getpid()}.{threading.get_ident()}.tmp"
    try:
        with open(tmp,"w",encoding="utf-8") as f:
            json.dump(data,f,ensure_ascii=False,separators=(",", ":"))
        os.replace(tmp,path)
    finally:
        try:
            os.unlink(tmp)
        except OSError:
            pass
    return data


def _national_lock_path(date_text, fingerprint):
    # A single date lock coordinates overlapping UI requests and 100/300 seed batches.
    return f"national-date:{NATIONAL_OUTLOOK_ENGINE}:{date_text}"


def _national_try_lock(date_text, fingerprint):
    return _national_open_lock(_national_lock_path(date_text,fingerprint)) is not None


def _national_unlock(date_text, fingerprint):
    name = _national_lock_path(date_text,fingerprint)
    key = os.path.join(NATIONAL_OUTLOOK_CACHE_DIR,"lock-"+hashlib.sha256(name.encode()).hexdigest()+".lck")
    _national_close_lock(key)


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


def _national_point_cache_put(date_text, p, result, ttl=None):
    meta = _national_meta(result, fetched_at=time.time())
    expires = meta["fresh_until"]
    if ttl is not None:
        expires = min(expires,time.time()+max(1,int(ttl)))
    row = dict(result,_cache_meta=dict(meta,fresh_until=expires))
    with _national_point_cache_lock:
        _national_point_cache[_national_point_key(date_text,p)] = (expires,row)
        if len(_national_point_cache) > 2500:
            for key,_ in sorted(_national_point_cache.items(),key=lambda kv:kv[1][0])[:500]:
                _national_point_cache.pop(key,None)


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


def _national_result_from_metno(p: dict[str, Any], date_text: str, payload: dict[str, Any], *, include_series: bool = False) -> dict[str, Any] | None:
    rows=[]
    for item in ((payload.get("properties") or {}).get("timeseries") or []):
        iso=str(item.get("time") or "")
        try:
            dt=datetime.fromisoformat(iso.replace("Z","+00:00")).astimezone(timezone(timedelta(hours=9)))
        except Exception:
            continue
        if dt.strftime("%Y-%m-%d")!=date_text or not (6<=dt.hour<=15): continue
        data=item.get("data") or {}; instant=((data.get("instant") or {}).get("details") or {})
        next_1=data.get("next_1_hours") or {}
        nxt=(next_1.get("details") or {})
        def fv(obj,key,default=None):
            try:
                v=float(obj.get(key)); return v if math.isfinite(v) else default
            except (TypeError,ValueError): return default
        temp=fv(instant,"air_temperature"); wind=fv(instant,"wind_speed"); gust=fv(instant,"wind_speed_of_gust",wind)
        rain_known=bool(next_1) and "precipitation_amount" in nxt
        rain=fv(nxt,"precipitation_amount",0.0)
        if temp is None or wind is None: continue
        rows.append((dt.hour,wind,gust if gust is not None else wind,rain if rain is not None else 0.0,temp,rain_known))
    if not rows: return None
    winds=[x[1] for x in rows]; gusts=[x[2] for x in rows]; rains=[x[3] for x in rows]; temps=[x[4] for x in rows]
    caution_hours=severe_hours=extreme_hours=0
    for _,w,g,r,_,_ in rows:
        if w>=15 or g>=25 or r>=6: extreme_hours+=1
        if w>=9 or g>=18 or r>=1.5: severe_hours+=1
        if w>=5 or g>=12 or r>=0.1: caution_hours+=1
    max_w=max(winds); max_g=max(gusts); max_r=max(rains); min_t=min(temps)
    grade,summary=_national_grade(max_w,max_g,max_r,0,min_t,None,caution_hours=caution_hours,severe_hours=severe_hours,extreme_hours=extreme_hours)
    series=[{"hour":h,"wind":round(w,1),"gust":round(g,1),"rain":round(r,1) if rain_known else None,"temp":round(t,1)} for h,w,g,r,t,rain_known in rows]
    out={"name":p["name"],"grade":grade,"summary":summary,"maxWind":round(max_w,1),"maxGust":round(max_g,1),"maxRain":round(max_r,1),"maxCape":0,"minTemp":round(min_t,1),"minVisibility":None,"thunder":"–","cautionHours":caution_hours,"severeHours":severe_hours,"source":"metno","_series":series}
    if include_series:
        out["series"]=series
    return out


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


def _national_gfs_results(date_text: str, points: list[dict[str, Any]], *, include_series: bool = False) -> dict[str, dict[str, Any]]:
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
                    cycle_rows[p["name"]].append({"hour":target_dt.astimezone(timezone(timedelta(hours=9))).hour,"wind":float(vals.get("wind") or 0),"gust":float(vals.get("gust") or vals.get("wind") or 0),"rain":float(vals.get("rain") or 0),"temp":float(vals.get("temp")),"cloud":vals.get("cloud")})
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
        caution=sum(1 for x in rr if x["wind"]>=5 or x.get("gust",x["wind"])>=12 or x["rain"]>=0.1)
        severe=sum(1 for x in rr if x["wind"]>=9 or x.get("gust",x["wind"])>=18 or x["rain"]>=1.5)
        extreme=sum(1 for x in rr if x["wind"]>=15 or x.get("gust",x["wind"])>=25 or x["rain"]>=6)
        grade,summary=_national_grade(max(winds),max(gusts),max(rains),0,min(temps),None,caution_hours=caution,severe_hours=severe,extreme_hours=extreme)
        series=[{"hour":int(x.get("hour")),"wind":round(float(x["wind"]),1),"gust":round(float(x.get("gust",x["wind"])),1),"rain":round(float(x["rain"]),1),"temp":round(float(x["temp"]),1)} for x in rr]
        out={"name":p["name"],"grade":grade,"summary":summary,"maxWind":round(max(winds),1),"maxGust":round(max(gusts),1),"maxRain":round(max(rains),1),"maxCape":0,"minTemp":round(min(temps),1),"minVisibility":None,"thunder":"–","cautionHours":caution,"severeHours":severe,"source":"gfs","_series":series}
        if include_series:
            out["series"]=series
        results[p["name"]]=out
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
    return {"A":1,"B":2,"C":3,"D":4,"E":5}.get(str(g),0)


def _national_merge_two_models(p: dict[str, Any], met: dict[str, Any] | None, gfs: dict[str, Any] | None) -> dict[str, Any] | None:
    if not met and not gfs: return None
    if not met:
        return {k:v for k,v in dict(gfs,source="gfs",modelGrades={"gfs":gfs.get("grade")},modelAgreement="single",integration="single").items() if k != "_series"}
    if not gfs:
        return {k:v for k,v in dict(met,source="metno",modelGrades={"metno":met.get("grade")},modelAgreement="single",integration="single").items() if k != "_series"}

    # V1.6.11: align both models by JST hour and average the weather values at the
    # same hour before grading. This avoids averaging daily maxima that may occur
    # at different times. D/E from either model remain hard floors.
    met_series={int(x.get("hour")):x for x in (met.get("_series") or met.get("series") or []) if isinstance(x,dict) and isinstance(x.get("hour"),(int,float))}
    gfs_series={int(x.get("hour")):x for x in (gfs.get("_series") or gfs.get("series") or []) if isinstance(x,dict) and isinstance(x.get("hour"),(int,float))}
    common=sorted(set(met_series)&set(gfs_series))
    center=[]
    for h in common:
        a,b=met_series[h],gfs_series[h]
        def mean_key(k, fallback=0.0):
            vals=[]
            for row in (a,b):
                v=row.get(k)
                if isinstance(v,(int,float)) and math.isfinite(float(v)): vals.append(float(v))
            return sum(vals)/len(vals) if vals else fallback
        center.append({"hour":h,"wind":mean_key("wind"),"gust":mean_key("gust"),"rain":mean_key("rain"),"temp":mean_key("temp",0.0)})

    if center:
        caution=sum(1 for x in center if x["wind"]>=5 or x["gust"]>=12 or x["rain"]>=0.1)
        severe=sum(1 for x in center if x["wind"]>=9 or x["gust"]>=18 or x["rain"]>=1.5)
        extreme=sum(1 for x in center if x["wind"]>=15 or x["gust"]>=25 or x["rain"]>=6)
        avg_w=max(x["wind"] for x in center); avg_g=max(x["gust"] for x in center); avg_r=max(x["rain"] for x in center); avg_t=min(x["temp"] for x in center)
        base_grade,base_summary=_national_grade(avg_w,avg_g,avg_r,0,avg_t,None,caution_hours=caution,severe_hours=severe,extreme_hours=extreme)
        integration="hourly-mean-with-severe-floor"
    else:
        # Fallback only when hourly alignment is unavailable. Keep backward-safe
        # aggregate handling, and surface the reduced comparison quality.
        def avg(k):
            vals=[float(x.get(k)) for x in (met,gfs) if isinstance(x.get(k),(int,float)) and math.isfinite(float(x.get(k)))]
            return sum(vals)/len(vals) if vals else None
        avg_w=avg("maxWind") or 0.0; avg_g=avg("maxGust") or avg_w; avg_r=avg("maxRain") or 0.0; avg_t=avg("minTemp")
        caution=round((int(met.get("cautionHours") or 0)+int(gfs.get("cautionHours") or 0))/2)
        severe=round((int(met.get("severeHours") or 0)+int(gfs.get("severeHours") or 0))/2)
        base_grade,base_summary=_national_grade(avg_w,avg_g,avg_r,0,avg_t or 0,None,caution_hours=caution,severe_hours=severe,extreme_hours=0)
        integration="aggregate-mean-fallback-with-severe-floor"

    mg,gg=met.get("grade"),gfs.get("grade")
    floor=max((_national_grade_rank(mg),_national_grade_rank(gg)))
    if floor>=5: grade="E"
    elif floor>=4: grade="D"
    else: grade=base_grade
    diff=abs(_national_grade_rank(mg)-_national_grade_rank(gg))
    summary=base_summary
    if diff>=2:
        summary += " 2モデルの差が大きいため、時間別グラフで両方の予測を確認してください。"
    return {"name":p["name"],"grade":grade,"summary":summary,
        "maxWind":round(avg_w,1),"maxGust":round(avg_g,1),"maxRain":round(avg_r,1),
        "maxCape":0,"minTemp":round(avg_t,1) if avg_t is not None else None,"minVisibility":None,"thunder":"–",
        "cautionHours":caution,"severeHours":severe,"source":"metno+gfs","integration":integration,
        "modelGrades":{"metno":mg,"gfs":gg},"modelAgreement":"high" if diff==0 else "medium" if diff==1 else "low",
        "modelValues":{"metno":{"maxWind":met.get("maxWind"),"maxGust":met.get("maxGust"),"maxRain":met.get("maxRain"),"minTemp":met.get("minTemp")},
                       "gfs":{"maxWind":gfs.get("maxWind"),"maxGust":gfs.get("maxGust"),"maxRain":gfs.get("maxRain"),"minTemp":gfs.get("minTemp")}}}


def _national_fetch_shared(date_text, points):
    # National analysis never invokes Open-Meteo or the separate detailed forecast API.
    rows = {}; missing = []; warnings = []; metno = {}; gfs = {}; stats = {}
    for p in points:
        cached = _national_point_cache_get(date_text,p)
        if cached and cached.get("source") in {"metno+gfs","metno","gfs"}:
            rows[p["name"]] = dict(cached,name=p["name"])
        else:
            missing.append(p)
    if missing:
        fetched_at = time.time()
        try:
            metno,stats = _national_metno_results(date_text,missing)
        except Exception as exc:
            warnings.append("MET Norway unavailable")
            app.logger.warning("national_metno_failed %s",type(exc).__name__)
        try:
            gfs = _national_gfs_results(date_text,missing)
        except Exception as exc:
            warnings.append("NOAA GFS unavailable")
            app.logger.warning("national_gfs_failed %s",type(exc).__name__)
        for p in missing:
            result = _national_merge_two_models(p,metno.get(p["name"]),gfs.get(p["name"]))
            if result:
                row = dict(result,_cache_meta=_national_meta(result,fetched_at=fetched_at))
                rows[p["name"]] = row
                _national_point_cache_put(date_text,p,row)
    absent = [p["name"] for p in points if p["name"] not in rows]
    if absent:
        warnings.append(f"Missing {len(absent)}/{len(points)} mountains")
        app.logger.warning("national_missing date=%s names=%s",date_text,",".join(absent))
    limited = bool(absent and stats.get("http_429"))
    if limited:
        warnings.append("MET Norway rate limited")
    return [rows[p["name"]] for p in points if p["name"] in rows], not absent, limited, "; ".join(warnings) or None


def _national_response(data, state, *, warning=None, cached_count=None, newly_fetched_count=None, stale_fallback_count=0):
    now = time.time()
    rows = _national_valid_results(data.get("points") or [],data.get("results") or [])
    results = [_national_public_result(r) for r in rows.values()]
    total = len(data.get("points") or []); got = len(results)
    metas = [r["_cache_meta"] for r in rows.values()]
    gt = min((m["generated_ts"] for m in metas),default=now)
    fu = min((m["fresh_until"] for m in metas),default=now)
    fresh_count = sum(m["fresh_until"] > now for m in metas)
    cc = got if cached_count is None else int(cached_count)
    nf = int(newly_fetched_count or 0)
    payload = {"date":data.get("date"),"results":results,"version":APP_VERSION,"engine":NATIONAL_OUTLOOK_ENGINE,
        "complete":total>0 and got==total,"allFresh":total>0 and fresh_count==total,
        "cache":{"state":state,"backend":"supabase+local" if _national_supabase_enabled() else "local-only",
            "generatedAt":datetime.fromtimestamp(gt,timezone.utc).isoformat(),"ageSeconds":max(0,round(now-gt)),
            "freshTtlSeconds":NATIONAL_OUTLOOK_CACHE_TTL,"freshUntil":datetime.fromtimestamp(fu,timezone.utc).isoformat(),
            "freshRemainingSeconds":max(0,int(fu-now)),"cachedCount":cc,"freshCount":fresh_count,
            "staleCount":got-fresh_count,"newlyFetchedCount":nf,"staleFallbackCount":max(stale_fallback_count,got-fresh_count),
            "missingCount":max(0,total-got),"remainingDueCount":max(0,total-fresh_count),"cacheHit":cc>0 and nf==0},
        "rateLimited":bool(data.get("rateLimited")),
        "dualModelCount":sum(r.get("source")=="metno+gfs" for r in results),
        "metnoOnlyCount":sum(r.get("source")=="metno" for r in results),
        "gfsOnlyCount":sum(r.get("source")=="gfs" for r in results)}
    if data.get("cacheReadError"):
        payload["cache"]["readError"] = data["cacheReadError"]
        warning = "; ".join(x for x in (warning,data["cacheReadError"]) if x)
    if warning:
        payload["warning"] = warning
    if "persistence" in data:
        payload["persistence"] = data["persistence"]
    resp = jsonify(payload)
    resp.headers["Cache-Control"] = "no-store"
    resp.headers["X-Traten-National-Cache"] = state
    return resp


def _ensure_national_refresh_worker():
    global _national_refresh_worker_thread,_national_refresh_thread_started,_national_refresh_worker_lock_handle,_national_refresh_thread_pid
    if not NATIONAL_OUTLOOK_AUTO_REFRESH:
        _national_refresh_runtime["state"] = "disabled"
        return
    with _national_refresh_thread_lock:
        if _national_refresh_thread_pid==os.getpid() and _national_refresh_worker_thread and _national_refresh_worker_thread.is_alive():
            return
        key = _national_open_lock("refresh-worker")
        if key is None:
            _national_refresh_runtime["state"] = "standby"
            return
        _national_refresh_worker_lock_handle = key
        _national_refresh_thread_pid = os.getpid()
        _national_refresh_thread_started = True
        _national_refresh_stop.clear()
        _national_refresh_runtime.update(state="starting",workerPid=os.getpid())
        def worker():
            global _national_refresh_thread_started
            try:
                _national_refresh_runtime["state"] = "boot-grace"; _save_national_refresh_runtime()
                if _national_refresh_stop.wait(NATIONAL_OUTLOOK_BOOT_GRACE):
                    return
                while NATIONAL_OUTLOOK_AUTO_REFRESH and not _national_refresh_stop.is_set():
                    _run_national_refresh_cycle("boot" if not _national_refresh_runtime.get("lastCheckAt") else "interval")
                    if _national_refresh_stop.wait(max(300,NATIONAL_OUTLOOK_REFRESH_INTERVAL)):
                        return
            finally:
                _national_refresh_thread_started = False
                _national_refresh_runtime["state"] = "stopped"; _save_national_refresh_runtime()
                _national_close_lock(key)
        thread = threading.Thread(target=worker,name="traten-national-refresh",daemon=True)
        _national_refresh_worker_thread = thread
        try:
            thread.start()
        except Exception:
            _national_refresh_thread_started = False;_national_close_lock(key);raise


@app.post("/api/national-outlook/refresh-cache")
def national_outlook_refresh_cache():
    if not NATIONAL_CACHE_REFRESH_TOKEN:
        return jsonify(error="NATIONAL_CACHE_REFRESH_TOKEN is not configured"),503
    supplied = request.headers.get("X-Traten-Cache-Token","")
    if not supplied or not hmac.compare_digest(supplied,NATIONAL_CACHE_REFRESH_TOKEN):
        return jsonify(error="unauthorized"),401
    if not _national_supabase_enabled():
        return jsonify(error="Supabase national cache is not configured"),503
    try:
        report = _refresh_national_persistent_cache(force=False)
    except Exception as exc:
        app.logger.exception("national_manual_refresh_failed")
        report = {"ok":False,"state":"failed","error":type(exc).__name__,"pointsUpdated":0}
    # V1.6.2 scheduler semantics: a recoverable partial acquisition is not a GitHub Actions
    # failure. The JSON still keeps ok=false/incomplete so health monitoring can see the gap,
    # and the next 15-minute run resumes from Supabase. Configuration/DB-write failures remain 503.
    def _recoverable_partial_refresh(r):
        if r.get("state") == "running-elsewhere":
            return False
        rolling = r.get("rolling") or r.get("rolling100") or {}
        date_reports = rolling.get("dateReports") or []
        chunks = []
        for dr in date_reports:
            chunks.extend(dr.get("chunks") or [])
        rate_limited = any(bool(c.get("rateLimited")) for c in chunks)
        messages = []
        def collect(v):
            if isinstance(v,str): messages.append(v.lower())
            elif isinstance(v,list):
                for x in v: collect(x)
            elif isinstance(v,dict):
                for x in v.values(): collect(x)
        collect(r.get("errors") or [])
        fatal_tokens = ("database write failed","database read-back incomplete","supabase national cache is not configured",
                        "seed count/configuration mismatch","token is not configured","unauthorized")
        fatal = any(t in m for m in messages for t in fatal_tokens)
        transient_tokens = ("429","rate limit","forecast acquisition incomplete","fresh cache incomplete","timeout","timed out")
        transient = rate_limited or any(t in m for m in messages for t in transient_tokens)
        return bool(transient and not fatal)
    recoverable = _recoverable_partial_refresh(report)
    if recoverable:
        report["schedulerAccepted"] = True
        report["schedulerReason"] = "recoverable-partial; next scheduled run will resume stale/missing rows"
    status = 200 if report.get("ok") or recoverable else 202 if report.get("state")=="running-elsewhere" else 503
    return jsonify(report),status


def _instagram_admin_authorized() -> bool:
    # Dashboard Basic Auth is sufficient; cache token remains a supported fallback.
    if _dashboard_auth_ok():
        return True
    if not NATIONAL_CACHE_REFRESH_TOKEN:
        return False
    supplied = request.headers.get("X-Traten-Cache-Token", "")
    return bool(supplied and hmac.compare_digest(supplied, NATIONAL_CACHE_REFRESH_TOKEN))


@app.get("/instagram-admin")
def instagram_admin_page():
    """Browser-based Instagram bot console linked from the protected usage dashboard."""
    if not _dashboard_auth_ok():
        return _dashboard_unauthorized()
    return Response("""<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>トラテン Instagram 管理</title>
<style>
:root{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#17324a;background:#f4f7fa}
body{margin:0}.wrap{max-width:920px;margin:0 auto;padding:28px 18px 60px}
h1{font-size:26px;margin:0 0 6px}.sub{color:#607284;margin-bottom:22px}
.card{background:#fff;border:1px solid #dbe4ec;border-radius:14px;padding:18px;margin:14px 0;box-shadow:0 2px 9px #0000000a}
label{display:block;font-weight:700;margin:8px 0 6px}
input{width:100%;box-sizing:border-box;padding:11px 12px;border:1px solid #bdcbd6;border-radius:9px;font-size:15px}
button{border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;background:#0b5e9a;color:#fff;margin:6px 8px 6px 0}
button.secondary{background:#667989}button.danger{background:#a33d3d}
.row{display:flex;gap:12px;flex-wrap:wrap}.row>div{flex:1;min-width:220px}
.status{white-space:pre-wrap;background:#102536;color:#eaf4fb;border-radius:10px;padding:13px;min-height:48px;font-family:ui-monospace,Consolas,monospace;font-size:13px;overflow:auto}
img{display:block;width:min(100%,540px);height:auto;border-radius:12px;border:1px solid #dbe4ec;margin-top:12px}
video{display:block;width:min(100%,540px);height:auto;max-height:76vh;border-radius:12px;border:1px solid #dbe4ec;margin-top:12px;background:#091827}
.small{font-size:13px;color:#657687}.pill{display:inline-block;padding:4px 9px;border-radius:999px;background:#eaf2f8;margin-right:6px;font-size:13px}
</style>
</head><body><main class="wrap">
<h1>トラテン Instagram 管理</h1>
<div class="sub">V1.5.190 / 接続確認・静止画/リールプレビュー・手動投稿</div>

<section class="card">
<label>管理トークン（任意・Basic認証利用時は空欄でOK）</label>
<input id="token" type="password" autocomplete="off" placeholder="Render Environment の値">
<div class="small">通常は使用状況ダッシュボードと同じBasic認証で利用できます。必要な場合だけRenderのNATIONAL_CACHE_REFRESH_TOKENを入力してください。</div>
<button onclick="saveToken()">このタブに保存</button>
<button class="secondary" onclick="clearToken()">消去</button>
</section>

<section class="card">
<h2>1. 状態・接続確認</h2>
<button onclick="loadStatus()">状態確認</button>
<button onclick="testConnection()">Instagram接続確認</button>
<div id="summary" style="margin:10px 0"></div>
<div id="out" class="status">未確認</div>
</section>

<section class="card">
<h2>2. 投稿画像プレビュー</h2>
<div class="row"><div><label>予報日</label><input id="date" type="date"></div></div>
<button onclick="preview()">静止画をプレビュー</button>
<button onclick="previewReelVideo()">リールをプレビュー</button>
<div id="previewMsg" class="small"></div>
<div id="previewStaticWrap" hidden style="display:grid;gap:12px;margin-top:10px"><img id="previewImg1" alt="Instagram投稿画像プレビュー 1枚目" hidden><img id="previewImg2" alt="Instagram投稿画像プレビュー 2枚目" hidden></div>
<div id="reelControls" hidden style="margin-top:10px"><button id="reelPlayBtn" class="secondary" type="button" onclick="playPreviewReel()" disabled>▶ リールを再生</button> <a id="reelOpenLink" href="#" target="_blank" rel="noopener" style="display:none;margin-left:8px">別タブで開く</a></div>
<video id="previewReelVideo" controls playsinline preload="metadata" hidden style="min-height:360px;aspect-ratio:9/16;pointer-events:auto"></video>
</section>

<section class="card">
<h2>3. 手動投稿</h2>
<p class="small">同じ予報日は通常二重投稿しません。まず画像プレビューを確認してから実行してください。</p>
<button class="danger" onclick="postNow()">この予報日をInstagramへ投稿</button>
<label style="font-weight:400"><input id="force" type="checkbox" style="width:auto"> 二重投稿防止を無視して強制投稿（通常はOFF）</label>
<div id="postOut" class="status">未実行</div>
</section>
</main>
<script>
const $=id=>document.getElementById(id);
function token(){return $('token').value.trim()}
function saveToken(){sessionStorage.setItem('tratenIgAdminToken',token());alert('このタブに保存しました')}
function clearToken(){sessionStorage.removeItem('tratenIgAdminToken');$('token').value=''}
function h(json=false){const x={};if(token())x['X-Traten-Cache-Token']=token();if(json)x['Content-Type']='application/json';return x}
async function api(url,opt={}){
  const r=await fetch(url,{...opt,headers:{...(opt.headers||{}),...h(!!opt.body)}});
  const raw=await r.text();
  let j=null;try{j=raw?JSON.parse(raw):{}}catch{}
  if(!r.ok){
    const detail=(j&&j.error)||raw.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(0,180)||('HTTP '+r.status);
    throw new Error(detail);
  }
  if(!j)throw new Error('サーバー応答をJSONとして読み取れませんでした。HTTP '+r.status);
  return j;
}
function show(id,obj){$(id).textContent=JSON.stringify(obj,null,2)}
async function loadStatus(){
  try{
    const j=await api('/api/instagram/status');show('out',j);$('date').value=j.tomorrow||'';
    $('summary').innerHTML=`<span class="pill">configured: ${j.configured}</span><span class="pill">autoPost: ${j.autoPost}</span><span class="pill">autoMedia: ${j.autoMedia}</span><span class="pill">fresh: ${j.tomorrowFreshCount}</span>`;
    if(Array.isArray(j.previewImageUrls) && j.previewImageUrls.length){$('previewStaticWrap').hidden=false;$('previewImg1').src=j.previewImageUrls[0];$('previewImg1').hidden=false;if(j.previewImageUrls[1]){$('previewImg2').src=j.previewImageUrls[1];$('previewImg2').hidden=false;}}
  }catch(e){$('out').textContent=e.message}
}
async function testConnection(){
  try{show('out',await api('/api/instagram/test-connection'))}
  catch(e){$('out').textContent=e.message}
}
async function preview(){
  try{
    const d=$('date').value;if(!d)throw new Error('予報日を選択してください');
    const r=await api('/api/instagram/preview-url?date='+encodeURIComponent(d));
    $('previewReelVideo').pause();$('previewReelVideo').hidden=true;$('reelControls').hidden=true;$('reelPlayBtn').disabled=true;$('reelOpenLink').style.display='none';
    $('previewStaticWrap').hidden=false;$('previewImg1').hidden=true;$('previewImg2').hidden=true;
    const urls=Array.isArray(r.previewImageUrls)&&r.previewImageUrls.length?r.previewImageUrls:(r.previewImageUrl?[r.previewImageUrl]:[]);
    if(!urls.length) throw new Error('静止画URLを取得できませんでした');
    if(urls[0]){$('previewImg1').src=urls[0]+'&t='+Date.now();$('previewImg1').hidden=false;}
    if(urls[1]){$('previewImg2').src=urls[1]+'&t='+Date.now();$('previewImg2').hidden=false;}
    $('previewMsg').textContent=`静止画: ${r.date} / ${r.count}座 / ${urls.length}枚（リールと同デザイン）`;
  }catch(e){$('previewMsg').textContent=e.message}
}
async function previewReelVideo(){
  try{
    const d=$('date').value;if(!d)throw new Error('予報日を選択してください');
    $('previewMsg').textContent='リール生成を開始しています…';
    $('previewStaticWrap').hidden=true;$('previewImg1').hidden=true;$('previewImg2').hidden=true;
    $('reelControls').hidden=true;$('reelPlayBtn').disabled=true;$('reelOpenLink').style.display='none';
    const start=await api('/api/instagram/reel-preview-url?date='+encodeURIComponent(d));
    let r=start;
    for(let i=0;i<90 && !r.ready;i++){
      $('previewMsg').textContent=`リールを生成しています… ${Math.min(99,Math.max(1,Math.round((i+1)/90*100)))}%`;
      await new Promise(resolve=>setTimeout(resolve,2000));
      r=await api('/api/instagram/reel-preview-status?date='+encodeURIComponent(d));
      if(r.error)throw new Error(r.error);
    }
    if(!r.ready)throw new Error('リール生成がタイムアウトしました。少し待って再度お試しください。');
    $('previewImg1').hidden=true;$('previewImg2').hidden=true;
    const v=$('previewReelVideo');
    const url=r.previewReelUrl+'&t='+Date.now();
    v.hidden=false;v.controls=true;v.src=url;
    $('reelOpenLink').href=url;$('reelOpenLink').style.display='inline';$('reelControls').hidden=false;
    v.onerror=()=>{ $('previewMsg').textContent='リール動画の読込に失敗しました。「別タブで開く」をお試しください。'; $('reelPlayBtn').disabled=true; };
    v.onloadedmetadata=()=>{ $('previewMsg').textContent=`リール生成完了: ${r.date} / ${r.count}座 / ${Math.round(v.duration||0)}秒。下の「▶ リールを再生」を押してください。`; };
    v.oncanplay=()=>{ $('reelPlayBtn').disabled=false; $('previewMsg').textContent=`リール再生準備完了: ${r.date} / ${r.count}座 / ${Math.round(v.duration||0)}秒`; };
    v.onwaiting=()=>{ $('previewMsg').textContent='動画データを読み込み中です…'; };
    v.load();
  }catch(e){$('previewMsg').textContent=e.message}
}
async function playPreviewReel(){
  const v=$('previewReelVideo');
  try{ await v.play(); $('previewMsg').textContent=`再生中 / ${Math.round(v.duration||0)}秒`; }
  catch(e){ $('previewMsg').textContent='ブラウザで再生できませんでした。「別タブで開く」を試してください: '+(e&&e.message?e.message:'再生エラー'); }
}
async function postNow(){
  try{
    const d=$('date').value;if(!d)throw new Error('予報日を選択してください');
    if(!confirm(d+' の全国分析をInstagramへ投稿します。よろしいですか？'))return;
    const j=await api('/api/instagram/post-national',{method:'POST',body:JSON.stringify({date:d,force:$('force').checked})});
    show('postOut',j);
  }catch(e){$('postOut').textContent=e.message}
}
$('token').value=sessionStorage.getItem('tratenIgAdminToken')||'';
</script>
</body></html>""", content_type="text/html; charset=utf-8")


@app.get("/api/instagram/preview-url")
def instagram_preview_url():
    if not _instagram_admin_authorized():
        return jsonify(error="unauthorized"), 401
    date_text = str(request.args.get("date") or _national_nextday_date_text())[:10]
    try:
        datetime.strptime(date_text, "%Y-%m-%d")
    except ValueError:
        return jsonify(error="invalid date"), 400
    rows = _instagram_load_fresh_100_results(date_text)
    if len(rows) < instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS:
        return jsonify(error="fresh nationwide cache is incomplete", count=len(rows), minimum=instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS, date=date_text), 409
    return jsonify(date=date_text, count=len(rows), previewImageUrls=instagram_bot.static_image_urls(date_text), previewImageUrl=instagram_bot.static_image_url(date_text, 1))


_instagram_reel_jobs_lock = threading.Lock()
_instagram_reel_jobs: dict[str, dict[str, Any]] = {}


def _process_rss_mb() -> float | None:
    try:
        with open("/proc/self/status", "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("VmRSS:"):
                    return round(int(line.split()[1]) / 1024.0, 1)
    except Exception:
        pass
    return None

def _instagram_reel_background(date_text: str, rows: list[dict[str, Any]]) -> None:
    try:
        app.logger.warning("instagram_reel_start date=%s rss_mb=%s rows=%s", date_text, _process_rss_mb(), len(rows))
        instagram_bot.render_national_reel(date_text, rows, logo_path=os.path.join(BASE, "traten-logo.png"), yarigatake_detail=_instagram_load_yarigatake_detail(date_text))
        app.logger.warning("instagram_reel_done date=%s rss_mb=%s", date_text, _process_rss_mb())
        with _instagram_reel_jobs_lock:
            _instagram_reel_jobs[date_text] = {"running": False, "error": None, "finished": time.time()}
    except Exception as exc:
        app.logger.exception("instagram_reel_preview_prepare_failed date=%s rss_mb=%s", date_text, _process_rss_mb())
        with _instagram_reel_jobs_lock:
            _instagram_reel_jobs[date_text] = {"running": False, "error": str(exc)[:500], "finished": time.time()}

@app.get("/api/instagram/reel-preview-url")
def instagram_reel_preview_url():
    if not _instagram_admin_authorized():
        return jsonify(error="unauthorized"), 401
    date_text = str(request.args.get("date") or _national_nextday_date_text())[:10]
    try:
        datetime.strptime(date_text, "%Y-%m-%d")
    except ValueError:
        return jsonify(error="invalid date"), 400
    rows = _instagram_load_fresh_100_results(date_text)
    if len(rows) < instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS:
        return jsonify(error="fresh nationwide cache is incomplete", count=len(rows), minimum=instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS, date=date_text), 409
    if instagram_bot.reel_cache_ready(date_text):
        return jsonify(date=date_text, count=len(rows), ready=True, previewReelUrl=instagram_bot.reel_url(date_text))
    with _instagram_reel_jobs_lock:
        job = _instagram_reel_jobs.get(date_text) or {}
        if not job.get("running"):
            _instagram_reel_jobs[date_text] = {"running": True, "error": None, "started": time.time()}
            threading.Thread(target=_instagram_reel_background, args=(date_text, rows), daemon=True, name=f"instagram-reel-{date_text}").start()
    # Important: return JSON immediately. Rendering 1080x1920/12s synchronously can exceed
    # the reverse-proxy request timeout and previously surfaced as `response parse error`.
    return jsonify(date=date_text, count=len(rows), ready=False, generating=True), 202

@app.get("/api/instagram/reel-preview-status")
def instagram_reel_preview_status():
    if not _instagram_admin_authorized():
        return jsonify(error="unauthorized"), 401
    date_text = str(request.args.get("date") or _national_nextday_date_text())[:10]
    try:
        datetime.strptime(date_text, "%Y-%m-%d")
    except ValueError:
        return jsonify(error="invalid date"), 400
    rows = _instagram_load_fresh_100_results(date_text)
    if instagram_bot.reel_cache_ready(date_text):
        return jsonify(date=date_text, count=len(rows), ready=True, previewReelUrl=instagram_bot.reel_url(date_text))
    with _instagram_reel_jobs_lock:
        job = dict(_instagram_reel_jobs.get(date_text) or {})
    return jsonify(date=date_text, count=len(rows), ready=False, generating=bool(job.get("running")), error=job.get("error"))


@app.get("/api/instagram/national-image/<date_text>")
def instagram_national_image(date_text: str):
    """Signed public JPEG URL consumed by Meta's image fetcher."""
    date_text = str(date_text or "")[:10]
    try:
        datetime.strptime(date_text, "%Y-%m-%d")
    except ValueError:
        return jsonify(error="invalid date"), 400
    if not instagram_bot.valid_image_signature(date_text, request.args.get("sig", "")):
        return jsonify(error="unauthorized"), 401
    rows = _instagram_load_fresh_100_results(date_text)
    if len(rows) < instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS:
        return jsonify(error="fresh nationwide cache is incomplete", count=len(rows), minimum=instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS), 409
    try:
        body = instagram_bot.render_national_image(
            date_text, rows, logo_path=os.path.join(BASE, "traten-logo.webp")
        )
    except Exception as exc:
        app.logger.exception("instagram_national_image_failed date=%s", date_text)
        return jsonify(error=str(exc)[:300]), 500
    response = Response(body, status=200, content_type="image/jpeg")
    response.headers["Cache-Control"] = "public, max-age=900"
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


@app.get("/api/instagram/national-static/<date_text>/<int:page>")
def instagram_national_static(date_text: str, page: int):
    try:
        datetime.strptime(date_text, "%Y-%m-%d")
    except ValueError:
        return jsonify(error="invalid date"), 400
    if page not in (1, 2):
        return jsonify(error="invalid page"), 400
    if not instagram_bot.valid_static_image_signature(date_text, page, request.args.get("sig", "")):
        return jsonify(error="unauthorized"), 401
    rows = _instagram_load_fresh_100_results(date_text)
    if len(rows) < instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS:
        return jsonify(error="fresh nationwide cache is incomplete", count=len(rows), minimum=instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS), 409
    try:
        paths = instagram_bot.render_national_static_images(date_text, rows, logo_path=os.path.join(BASE, "traten-logo.png"))
        return send_file(paths[page-1], mimetype="image/png", conditional=True, download_name=f"traten-{date_text}-p{page}.png")
    except Exception as exc:
        app.logger.exception("instagram_national_static_failed date=%s page=%s", date_text, page)
        return jsonify(error=str(exc)[:500]), 500


@app.get("/api/instagram/national-reel/<date_text>")
def instagram_national_reel(date_text: str):
    try:
        datetime.strptime(date_text, "%Y-%m-%d")
    except ValueError:
        return jsonify(error="invalid date"), 400
    if not instagram_bot.valid_reel_signature(date_text, request.args.get("sig", "")):
        return jsonify(error="unauthorized"), 401
    rows = _instagram_load_fresh_100_results(date_text)
    if len(rows) < instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS:
        return jsonify(error="fresh nationwide cache is incomplete", count=len(rows), minimum=instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS), 409
    try:
        if not instagram_bot.reel_cache_ready(date_text):
            return jsonify(error="reel is not ready yet", hint="preview generation must finish on the same Render worker before the MP4 is requested"), 503
        path = instagram_bot.reel_cache_path(date_text)
        return send_file(path, mimetype="video/mp4", conditional=True, download_name=f"traten-{date_text}.mp4")
    except Exception as exc:
        app.logger.exception("instagram_national_reel_failed date=%s", date_text)
        return jsonify(error=str(exc)[:500]), 500


@app.get("/api/instagram/status")
def instagram_status():
    if not _instagram_admin_authorized():
        return jsonify(error="unauthorized"), 401
    status = instagram_bot.status()
    target = _national_nextday_date_text()
    status["tomorrow"] = target
    status["tomorrowFreshCount"] = len(_instagram_load_fresh_100_results(target))
    if instagram_bot.configured():
        status["previewImageUrl"] = instagram_bot.static_image_url(target, 1)
        status["previewImageUrls"] = instagram_bot.static_image_urls(target)
    return jsonify(status)


@app.get("/api/instagram/test-connection")
def instagram_test_connection():
    if not _instagram_admin_authorized():
        return jsonify(error="unauthorized"), 401
    try:
        result = instagram_bot.test_connection()
        return jsonify(result), 200 if result.get("ok") else 503
    except Exception as exc:
        app.logger.exception("instagram_connection_test_failed")
        return jsonify(ok=False, error=str(exc)[:500]), 502


@app.post("/api/instagram/post-national")
def instagram_post_national():
    """Protected manual publish/test endpoint.

    JSON: {"date":"YYYY-MM-DD", "force":false}. Omit date for tomorrow JST.
    """
    if not _instagram_admin_authorized():
        return jsonify(error="unauthorized"), 401
    payload = request.get_json(silent=True) or {}
    date_text = str(payload.get("date") or _national_nextday_date_text())[:10]
    try:
        datetime.strptime(date_text, "%Y-%m-%d")
    except ValueError:
        return jsonify(error="invalid date"), 400
    rows = _instagram_load_fresh_100_results(date_text)
    if len(rows) < instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS:
        return jsonify(ok=False, error="fresh nationwide cache is incomplete", count=len(rows), minimum=instagram_bot.INSTAGRAM_MIN_NATIONAL_RESULTS, date=date_text), 409
    try:
        result = _instagram_post_with_lock(date_text, rows, force=bool(payload.get("force")))
        return jsonify(result), 200 if result.get("ok") else 503
    except Exception as exc:
        app.logger.exception("instagram_manual_post_failed date=%s", date_text)
        return jsonify(ok=False, error=str(exc)[:500]), 502


@app.post("/api/national-outlook")
def national_outlook():
    payload = request.get_json(silent=True)
    if not isinstance(payload,dict):
        return jsonify(error="JSON object required"),400
    date_text = str(payload.get("date") or "")
    try:
        target = datetime.strptime(date_text,"%Y-%m-%d").date()
    except ValueError:
        return jsonify(error="Invalid forecast date"),400
    today = (datetime.now(timezone.utc)+timedelta(hours=9)).date()
    if target < today or target > today+timedelta(days=15):
        return jsonify(error="Forecast date must be today through 15 days ahead"),400
    raw = payload.get("points")
    if not isinstance(raw,list) or not 1 <= len(raw) <= 300:
        return jsonify(error="Expected 1-300 points"),400
    points = []; seen = set()
    for p in raw:
        if not isinstance(p,dict):
            return jsonify(error="Invalid point"),400
        try:
            name = str(p.get("name") or "")[:80]; lat = float(p["lat"]); lon = float(p["lon"])
            elev = float(p["elevation"]) if p.get("elevation") is not None else None
        except (KeyError,TypeError,ValueError):
            return jsonify(error="Invalid coordinates"),400
        if not name or name in seen or not (20<=lat<=50 and 120<=lon<=155) or (elev is not None and not math.isfinite(elev)):
            return jsonify(error="Invalid or duplicate point"),400
        points.append({"name":name,"lat":lat,"lon":lon,"elevation":elev}); seen.add(name)
    fp = _national_points_fingerprint(points)
    snap = _national_cached_snapshot(date_text,fp,points)
    count = len(snap["results"])
    if payload.get("cacheOnly") is True:
        state = "cache-only-fresh" if count and snap["fresh_until"]>time.time() else "cache-only-stale" if count else "cache-miss"
        return _national_response(snap,state,cached_count=count,newly_fetched_count=0)
    if snap["complete"] and snap["fresh_until"] > time.time():
        return _national_response(snap,"shared-fresh",cached_count=count,newly_fetched_count=0)
    if not _national_try_lock(date_text,fp):
        return _national_response(snap,"shared-partial-refreshing",warning="Cache refresh in progress; saved results only",cached_count=count,newly_fetched_count=0)
    try:
        snap = _national_cached_snapshot(date_text,fp,points)
        count = len(snap["results"])
        fresh = {r["name"] for r in snap["results"] if r["_cache_meta"]["fresh_until"]>time.time()}
        due = [p for p in points if p["name"] not in fresh]
        if not due:
            return _national_response(snap,"shared-fresh",cached_count=count,newly_fetched_count=0)
        snap,report = _national_fetch_and_persist(date_text,points,due,snap)
        state = "live-generated" if report["ok"] else "partial-updated" if snap["results"] else "partial"
        return _national_response(snap,state,warning="; ".join(report["errors"]) or None,
            cached_count=count,newly_fetched_count=report["pointsFetched"])
    finally:
        _national_unlock(date_text,fp)

@app.post("/api/national-outlook/detail")
def national_outlook_detail():
    payload=request.get_json(silent=True) or {}
    date_text=str(payload.get("date") or "")[:10]
    point=payload.get("point") or {}
    try:
        target=datetime.strptime(date_text,"%Y-%m-%d").date()
        name=str(point.get("name") or "")[:80]; lat=float(point["lat"]); lon=float(point["lon"]); elev=float(point["elevation"]) if point.get("elevation") is not None else None
    except (ValueError,TypeError,KeyError):
        return jsonify(error="invalid request"),400
    today=(datetime.now(timezone.utc)+timedelta(hours=9)).date()
    if target<today or target>today+timedelta(days=15) or not name or not (20<=lat<=50 and 120<=lon<=155):
        return jsonify(error="invalid request"),400
    p={"name":name,"lat":lat,"lon":lon,"elevation":elev}
    met=None; gfs=None; warnings=[]
    try:
        met=_national_result_from_metno(p,date_text,_request_metno_national_point(p) or {},include_series=True)
    except Exception as exc:
        warnings.append("MET Norway unavailable"); app.logger.warning("national_detail_metno_failed %s",type(exc).__name__)
    try:
        gfs=_national_gfs_results(date_text,[p],include_series=True).get(name)
    except Exception as exc:
        warnings.append("NOAA GFS unavailable"); app.logger.warning("national_detail_gfs_failed %s",type(exc).__name__)
    merged=_national_merge_two_models(p,met,gfs)
    if not merged:
        return jsonify(error="forecast unavailable",warning="; ".join(warnings) or None),503
    def detail_model(row):
        if not row: return None
        return {k:v for k,v in row.items() if k != "_series"}
    return jsonify(ok=True,date=date_text,name=name,merged=merged,models={"metno":detail_model(met),"gfs":detail_model(gfs)},warning="; ".join(warnings) or None,version=APP_VERSION)


@app.get("/api/health")
def health():
    runtime = _national_refresh_runtime_snapshot()
    return jsonify(ok=True,version=APP_VERSION,service="mountain-weather-decision",overpass_endpoints=len(OVERPASS_ENDPOINTS),
        national_persistent_cache_configured=_national_supabase_enabled(),
        national_persistent_cache_table=NATIONAL_SUPABASE_CACHE_TABLE if _national_supabase_enabled() else None,
        national_cache_engine=NATIONAL_OUTLOOK_ENGINE,national_cache_ttl_seconds=NATIONAL_OUTLOOK_CACHE_TTL,
        national_browser_cache_ttl_seconds=NATIONAL_OUTLOOK_CACHE_TTL,national_auto_refresh_enabled=NATIONAL_OUTLOOK_AUTO_REFRESH,
        national_refresh_interval_seconds=NATIONAL_OUTLOOK_REFRESH_INTERVAL,national_refresh_token_configured=bool(NATIONAL_CACHE_REFRESH_TOKEN),
        national_100_rolling_auto_cache=NATIONAL_100_ROLLING_AUTO_CACHE,national_100_rolling_days=NATIONAL_100_ROLLING_DAYS,
        national_100_rolling_dates_per_cycle=NATIONAL_100_ROLLING_DATES_PER_CYCLE,national_100_chunk_size=NATIONAL_OUTLOOK_CHUNK_SIZE,
        national_100_rolling_target_rows=NATIONAL_100_ROLLING_DAYS*len(_national_load_prefetch_points()),
        national_prefetch_seed_count=len(_national_load_prefetch_points()),national_nextday_100_seed_count=len(_national_load_100_points()),
        national_last_refresh_report=_national_last_refresh_report or runtime.get("lastReport") or None,national_refresh_runtime=runtime,
        usage_logging=True,startup_optimization={"gzip_text_responses":True,"lazy_leaflet":True,"lazy_html2canvas":True},
        supabase_configured=bool(SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY),
        trail_regions_ready=sum(1 for r in _load_trail_manifest().get("regions",[]) if r.get("ready")))




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



# V1.5.230: external mountain-weather link resolver shared by the analysis
# result panel and the national mountain introduction/detail page.
_EXTERNAL_WEATHER_CACHE_TTL = 6 * 3600
_external_weather_cache_lock = threading.Lock()
_external_weather_cache: dict[str, tuple[float, dict[str, Any]]] = {}

class _AnchorCollector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.anchors: list[tuple[str, str]] = []
        self._href = ""
        self._text: list[str] = []
        self._in_a = False

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "a":
            return
        self._in_a = True
        self._text = []
        self._href = dict(attrs).get("href") or ""

    def handle_data(self, data):
        if self._in_a:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._in_a:
            text = " ".join("".join(self._text).split())
            if self._href and text:
                self.anchors.append((self._href, text))
            self._in_a = False
            self._href = ""
            self._text = []


def _weather_link_cache_get(key: str) -> dict[str, Any] | None:
    now = time.time()
    with _external_weather_cache_lock:
        hit = _external_weather_cache.get(key)
        if not hit:
            return None
        ts, value = hit
        if now - ts > _EXTERNAL_WEATHER_CACHE_TTL:
            _external_weather_cache.pop(key, None)
            return None
        return dict(value)


def _weather_link_cache_put(key: str, value: dict[str, Any]) -> dict[str, Any]:
    with _external_weather_cache_lock:
        _external_weather_cache[key] = (time.time(), dict(value))
    return value


def _decode_html_bytes(body: bytes, content_type: str = "") -> str:
    charsets = []
    m = re.search(r"charset=([A-Za-z0-9._-]+)", content_type or "", re.I)
    if m:
        charsets.append(m.group(1))
    head = body[:4096].decode("ascii", errors="ignore")
    m = re.search(r"charset\s*=\s*[\"']?([A-Za-z0-9._-]+)", head, re.I)
    if m:
        charsets.append(m.group(1))
    charsets.extend(["utf-8", "cp932", "shift_jis", "euc_jp"])
    tried = set()
    for enc in charsets:
        enc = enc.lower()
        if enc in tried:
            continue
        tried.add(enc)
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode("utf-8", errors="replace")


def _fetch_external_html(url: str, timeout: int = 12) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; Traten/1.5.230; +https://otenki.onrender.com/)",
            "Accept": "text/html,application/xhtml+xml",
            "Accept-Language": "ja,en;q=0.7",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        body = resp.read(2 * 1024 * 1024)
        return _decode_html_bytes(body, resp.headers.get("Content-Type", ""))


def _mountain_key(name: str) -> str:
    s = unicodedata.normalize("NFKC", str(name or "")).strip()
    # App-side disambiguators are useful for UI but external services often use
    # a different parenthetical label. Compare both the full and base forms.
    s = s.replace("ヶ", "ケ").replace("ケ岳", "ヶ岳")
    s = re.sub(r"[\s・･\-‐‑‒–—―]+", "", s)
    return s.casefold()


def _mountain_base_key(name: str) -> str:
    s = _mountain_key(name)
    s = re.sub(r"[（(\[].*?[）)\]]", "", s)
    aliases = {
        "宮ノ浦岳": "宮之浦岳",
        "後方羊蹄山": "羊蹄山",
        "大菩薩岳": "大菩薩嶺",
        "大台ケ原山": "大台ヶ原山",
        "八甲田山": "大岳",
        "阿蘇山": "高岳",
        "九重山": "久住山",
        "霧島山": "韓国岳",
        "立山": "雄山",
        "穂高岳": "奥穂高岳",
    }
    return _mountain_key(aliases.get(s, s))


def _candidate_name_keys(name: str) -> list[str]:
    full = _mountain_key(name)
    base = _mountain_base_key(name)
    out = [full]
    if base and base != full:
        out.append(base)
    # Service naming variants found on the public mountain lists.
    raw = unicodedata.normalize("NFKC", str(name or "")).strip()
    variants = {
        "宮ノ浦岳": ["宮之浦岳"],
        "大山（鳥取）": ["大山", "大山（弥山）"],
        "阿蘇山（高岳）": ["阿蘇山", "高岳", "阿蘇山（高岳）"],
        "八甲田山": ["八甲田山", "大岳", "大岳（八甲田山）"],
        "九重山": ["九重山", "久住山", "久住山（九重山）"],
        "霧島山": ["霧島山", "韓国岳", "韓国岳（霧島山）"],
        "立山": ["立山", "雄山", "雄山（立山）"],
        "穂高岳": ["穂高岳", "奥穂高岳"],
        "羊蹄山": ["羊蹄山", "後方羊蹄山", "後方羊蹄山（羊蹄山）"],
    }
    for v in variants.get(raw, []):
        k = _mountain_key(v)
        if k and k not in out:
            out.append(k)
        bk = _mountain_base_key(v)
        if bk and bk not in out:
            out.append(bk)
    return out


def _parse_anchors(page_html: str, base_url: str) -> list[tuple[str, str]]:
    parser = _AnchorCollector()
    try:
        parser.feed(page_html)
    except Exception:
        return []
    return [(urllib.parse.urljoin(base_url, href), html_lib.unescape(text)) for href, text in parser.anchors]


def _pick_mountain_anchor(anchors: list[tuple[str, str]], mountain: str, url_must_contain: str = "") -> dict[str, Any] | None:
    keys = _candidate_name_keys(mountain)
    best = None
    best_score = -1
    for url, text in anchors:
        if url_must_contain and url_must_contain not in url:
            continue
        tk = _mountain_key(text)
        tb = _mountain_base_key(text)
        score = -1
        for k in keys:
            if tk == k:
                score = max(score, 100)
            elif tb == k:
                score = max(score, 90)
            elif len(k) >= 3 and (k in tk or tk in k):
                score = max(score, 60)
        if score > best_score:
            best_score = score
            best = {"url": url, "name": text.strip(), "direct": True}
    return best if best_score >= 60 else None


def _tenkura_area_code(area: str) -> str | None:
    a = unicodedata.normalize("NFKC", str(area or ""))
    if "北海道" in a: return "hk"
    if "東北" in a: return "th"
    if "北陸" in a: return "hr"
    if any(x in a for x in ("関東", "甲信", "上信越", "秩父", "多摩", "富士", "八ヶ岳", "中央アルプス", "南アルプス", "北アルプス")): return "kk"
    if "東海" in a: return "tk"
    if "近畿" in a: return "kn"
    if "中国" in a: return "cg"
    if "四国" in a: return "sk"
    if any(x in a for x in ("九州", "沖縄")): return "ks"
    return None


def _external_weather_fallback(service: str, mountain: str) -> dict[str, Any]:
    if service == "tenkura":
        url = "https://tenkura.n-kishou.co.jp/tk/kanko/ka_type.html?type=15"
        label = "てんくらの山検索を開く"
        name = "てんくら 山検索"
    elif service == "weathernews":
        url = "https://weathernews.jp/mountain/"
        label = "ウェザーニュースの山検索を開く"
        name = "ウェザーニュース 山検索"
    else:
        url = "https://tenki.jp/mountain/"
        label = "tenki.jpの山検索を開く"
        name = "tenki.jp 山検索"
    return {"url": url, "name": name, "label": label, "direct": False, "requested": mountain}


def _resolve_external_weather_link(service: str, mountain: str, area: str = "") -> dict[str, Any]:
    mountain = str(mountain or "").strip()
    area = str(area or "").strip()
    if not mountain:
        raise ValueError("mountain is required")
    key = f"external-weather:v15220:{service}:{mountain}:{area}"
    cached = _weather_link_cache_get(key)
    if cached is not None:
        return cached

    result = None
    try:
        if service == "weathernews":
            base = "https://weathernews.jp/mountain/"
            page = _fetch_external_html(base)
            result = _pick_mountain_anchor(_parse_anchors(page, base), mountain, "/mountain/")
        elif service == "tenkijp":
            base = "https://tenki.jp/mountain/"
            page = _fetch_external_html(base)
            result = _pick_mountain_anchor(_parse_anchors(page, base), mountain, "/mountain/")
        elif service == "tenkura":
            preferred = _tenkura_area_code(area)
            # Public list page contains the individual kad.html links. Try the
            # selected mountain area first, then the remaining regions to avoid
            # false negatives caused by different area nomenclature.
            codes = [preferred] if preferred else []
            codes.extend(c for c in ("hk", "th", "hr", "kk", "tk", "kn", "cg", "sk", "ks") if c and c not in codes)
            for code in codes:
                base = f"https://tenkura.n-kishou.co.jp/tk/kanko/kasel.html?ba={code}&type=15"
                try:
                    page = _fetch_external_html(base)
                except Exception:
                    continue
                found = _pick_mountain_anchor(_parse_anchors(page, base), mountain, "kad.html")
                if found:
                    result = found
                    break
    except Exception:
        result = None

    if not result:
        result = _external_weather_fallback(service, mountain)
    else:
        result["label"] = f"{result.get('name') or mountain}のページを開く"
        result["requested"] = mountain
    return _weather_link_cache_put(key, result)


def _external_weather_response(service: str):
    mountain = request.args.get("mountain", "").strip()
    area = request.args.get("area", "").strip()
    if not mountain:
        return jsonify(available=False, error="mountain is required"), 400
    try:
        result = _resolve_external_weather_link(service, mountain, area)
        response = jsonify(available=bool(result.get("url")), result=result)
        response.headers["Cache-Control"] = "public, max-age=21600"
        return response
    except Exception as exc:
        # Even if a remote provider changes HTML or temporarily refuses our
        # lookup, keep the button useful by linking to that provider's mountain
        # search/list page instead of presenting a dead control.
        result = _external_weather_fallback(service, mountain)
        result["resolver_error"] = str(exc)[:160]
        response = jsonify(available=True, result=result)
        response.headers["Cache-Control"] = "public, max-age=900"
        return response


@app.get("/api/tenkura-link")
def tenkura_link():
    return _external_weather_response("tenkura")


@app.get("/api/weathernews-link")
def weathernews_link():
    return _external_weather_response("weathernews")


@app.get("/api/tenkijp-link")
def tenkijp_link():
    return _external_weather_response("tenkijp")



@app.get("/api/meteoblue")
def meteoblue_forecast():
    """Server-side meteoblue proxy so the API key never reaches the browser."""
    if not METEOBLUE_API_KEY:
        return jsonify(error="meteoblue API key is not configured", configured=False), 503
    try:
        lat = float(request.args["lat"])
        lon = float(request.args["lon"])
        params = {
            "lat": f"{lat:.5f}",
            "lon": f"{lon:.5f}",
            "apikey": METEOBLUE_API_KEY,
            "format": "json",
            "tz": "Asia/Tokyo",
            "windspeed": "ms-1",
            "winddirection": "degree",
            "precipitationamount": "mm",
            "temperature": "C",
        }
        asl = request.args.get("asl")
        if asl not in (None, ""):
            try: params["asl"] = str(round(float(asl)))
            except (TypeError, ValueError): pass
        url = "https://my.meteoblue.com/packages/basic-1h_clouds-3h_wind-3h_air-3h?" + urllib.parse.urlencode(params)
        cache_key = "meteoblue:basic-1h_clouds-3h_wind-3h_air-3h:v15182:" + urllib.parse.urlencode({k:v for k,v in params.items() if k != "apikey"})
        cached = _cache_get(cache_key)
        if cached:
            status, ctype, body = cached
            return _bytes_response(status, ctype, body, cache_control="public, max-age=900")
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
        with urllib.request.urlopen(req, timeout=UPSTREAM_TIMEOUT) as resp:
            status = resp.status
            ctype = resp.headers.get("Content-Type", "application/json")
            body = resp.read()
        _cache_put(cache_key, status, ctype, body, ttl=900)
        return _bytes_response(status, ctype, body, cache_control="public, max-age=900")
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:1200]
        return jsonify(error=f"meteoblue HTTP {exc.code}", detail=detail), exc.code
    except (KeyError, ValueError) as exc:
        return jsonify(error=f"meteoblue input error: {exc}"), 400
    except Exception as exc:
        return jsonify(error=f"meteoblue fetch failed: {exc}"), 502


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
        is_gsi_elevation = (target.hostname or "") == "cyberjapandata.gsi.go.jp" and "/xyz/dem" in (target.path or "")
        ttl = (7 * 24 * 3600) if is_gsi_elevation else (OPENMETEO_PROXY_CACHE_TTL if is_openmeteo else None)
        _cache_put("get:" + url, status, ctype, body, ttl=ttl)
        cache_control = "public, max-age=604800" if is_gsi_elevation else ("public, max-age=300" if is_openmeteo else "public, max-age=60")
        return _bytes_response(status, ctype, body, cache_control=cache_control)
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
    # V1.6.9: serve through the version rewriter so every JS/CSS asset uses
    # the running server APP_VERSION. This prevents immutable old app.js
    # cache entries from contaminating the admin audit.
    response = _serve_public_html("data-audit.html")
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


ROUTE_EXTRA_AVAILABILITY_TTL = int(os.environ.get("ROUTE_EXTRA_AVAILABILITY_TTL", "1800"))
_route_extra_availability_cache = {}
_route_extra_availability_lock = threading.Lock()

WATER_MOUNTAIN_CACHE_PATH = os.path.join(BASE, "water-mountain-cache.json")
WATER_MOUNTAIN_CACHE_REMOTE_URL = os.environ.get(
    "WATER_MOUNTAIN_CACHE_REMOTE_URL",
    "https://raw.githubusercontent.com/Takapays/OTENKI/water-cache/water-mountain-cache.json",
).strip()
# V1.5.1 recovery fallback. `ea3633c` is the immutable completed 300/300 audit
# (61 mountains with candidates) that pre-dates creation of the dedicated branch.
# It is used only until/when `water-cache` becomes available; release ZIPs still
# intentionally exclude water-mountain-cache.json.
WATER_MOUNTAIN_CACHE_BOOTSTRAP_URL = os.environ.get(
    "WATER_MOUNTAIN_CACHE_BOOTSTRAP_URL",
    "https://raw.githubusercontent.com/Takapays/OTENKI/ea3633c/water-mountain-cache.json",
).strip()
WATER_MOUNTAIN_CACHE_REMOTE_TTL = max(60, int(os.environ.get("WATER_MOUNTAIN_CACHE_REMOTE_TTL", "300")))
WATER_MOUNTAIN_CACHE_REMOTE_TIMEOUT = max(1, int(os.environ.get("WATER_MOUNTAIN_CACHE_REMOTE_TIMEOUT", "5")))
_water_mountain_cache_state: dict[str, Any] = {
    "mtime": None, "data": None, "remote_data": None, "remote_checked_at": 0.0
}

def _valid_water_mountain_cache(data: Any) -> bool:
    return isinstance(data, dict) and isinstance(data.get("mountains"), dict)

def _water_mountain_cache_remote_load() -> dict[str, Any] | None:
    now = time.time()
    cached = _water_mountain_cache_state.get("remote_data")
    checked_at = float(_water_mountain_cache_state.get("remote_checked_at") or 0.0)
    if _valid_water_mountain_cache(cached) and now - checked_at < WATER_MOUNTAIN_CACHE_REMOTE_TTL:
        return cached

    # Dedicated water-cache is authoritative. If it does not exist yet, recover
    # from the immutable completed audit commit instead of silently returning 0.
    urls = [u for u in (WATER_MOUNTAIN_CACHE_REMOTE_URL, WATER_MOUNTAIN_CACHE_BOOTSTRAP_URL) if u]
    for url in dict.fromkeys(urls):
        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "Traten/1.5.42", "Cache-Control": "no-cache"},
            )
            with urllib.request.urlopen(req, timeout=WATER_MOUNTAIN_CACHE_REMOTE_TIMEOUT) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            if _valid_water_mountain_cache(data):
                _water_mountain_cache_state["remote_data"] = data
                _water_mountain_cache_state["remote_checked_at"] = now
                return data
        except Exception:
            continue

    # Keep serving the last known-good remote result if GitHub is temporarily unavailable.
    if _valid_water_mountain_cache(cached):
        _water_mountain_cache_state["remote_checked_at"] = now
        return cached
    return None

def _water_mountain_cache_local_load() -> dict[str, Any]:
    try:
        mtime = os.path.getmtime(WATER_MOUNTAIN_CACHE_PATH)
    except OSError:
        return {"mountains": {}}
    if _water_mountain_cache_state.get("mtime") == mtime and _valid_water_mountain_cache(_water_mountain_cache_state.get("data")):
        return _water_mountain_cache_state["data"]
    try:
        with open(WATER_MOUNTAIN_CACHE_PATH, "r", encoding="utf-8") as fh:
            data = json.load(fh)
        if not _valid_water_mountain_cache(data):
            data = {"mountains": {}}
    except Exception:
        data = {"mountains": {}}
    _water_mountain_cache_state["mtime"] = mtime
    _water_mountain_cache_state["data"] = data
    return data

def _water_mountain_cache_load() -> dict[str, Any]:
    # Remote dedicated branch is authoritative. Local file is only a deploy/startup fallback.
    remote = _water_mountain_cache_remote_load()
    return remote if _valid_water_mountain_cache(remote) else _water_mountain_cache_local_load()

def _water_mountain_cache_entry(mountain: str) -> dict[str, Any] | None:
    row = (_water_mountain_cache_load().get("mountains") or {}).get(str(mountain or "").strip())
    return row if isinstance(row, dict) else None


# V1.5.6: curated water corrections that must survive remote cache refreshes.
# Coordinates are fixed only from public published coordinates; never guessed.
def _apply_water_manual_overrides(data: dict[str, Any]) -> dict[str, Any]:
    if not _valid_water_mountain_cache(data):
        return data
    import copy
    out = copy.deepcopy(data)
    mountains = out.get("mountains") or {}
    row = mountains.get("白馬岳")
    if isinstance(row, dict):
        sources = [x for x in (row.get("sources") or []) if not (isinstance(x, dict) and "栂池温泉" in str(x.get("name") or ""))]
        ginrei = {
            "name": "銀嶺水",
            "lat": 36.779000,
            "lon": 137.816056,
            "kind": "湧水",
            "potability": "unknown",
            "near_point": "栂池登山道入口",
            "distance_m": 585,
            "source_name": "YAMAP",
            "source_url": "https://yamap.com/landmarks/199865",
            "source_note": "標高2073m・北緯36度46分44.4秒・東経137度48分57.8秒（公開情報）",
            "manual_verified": True,
        }
        if not any(isinstance(x, dict) and str(x.get("name") or "") == "銀嶺水" for x in sources):
            sources.append(ginrei)
        row["sources"] = sources
        row["count"] = len(sources)
        row["available"] = bool(sources)
        row["checked"] = True
    return out

@app.get("/api/water-mountain-index")
def water_mountain_index():
    data = _apply_water_manual_overrides(_water_mountain_cache_load())
    mountains = data.get("mountains") or {}
    if not mountains:
        # Never present a failed cache fetch as a legitimate "0 audited mountains" result.
        return jsonify(ok=False, error="水場監査済みキャッシュを取得できませんでした"), 503
    name = str(request.args.get("mountain") or "").strip()
    if name:
        row = mountains.get(name)
        return jsonify(ok=True, mountain=name, entry=row if isinstance(row, dict) else None, generated_at=data.get("generated_at"), source=data.get("source"), radius_m=data.get("radius_m"))
    checked = sum(1 for v in mountains.values() if isinstance(v, dict) and v.get("checked") is True)
    available = sum(1 for v in mountains.values() if isinstance(v, dict) and v.get("checked") is True and v.get("available") is True)
    errors = sum(1 for v in mountains.values() if isinstance(v, dict) and v.get("error"))
    audit_stamps = [str(v.get("checked_at") or "") for v in mountains.values() if isinstance(v, dict) and v.get("checked_at")]
    last_audit_at = max(audit_stamps) if audit_stamps else None
    return jsonify(ok=True, generated_at=data.get("generated_at"), last_audit_at=last_audit_at, source=data.get("source"), radius_m=data.get("radius_m"), mountain_count=len(mountains), checked_count=checked, available_count=available, error_count=errors, mountains=mountains)


def _route_extra_availability_key(mountain: str, points: list[dict[str, Any]]) -> str:
    compact = [
        [str(p.get("name") or "")[:80], round(float(p["lat"]), 4), round(float(p["lon"]), 4)]
        for p in points
    ]
    raw = json.dumps([mountain, compact], ensure_ascii=False, separators=(",", ":"))
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()

def _route_extra_availability_get(key: str) -> dict[str, Any] | None:
    now = time.time()
    with _route_extra_availability_lock:
        item = _route_extra_availability_cache.get(key)
        if not item:
            return None
        expires, value = item
        if expires <= now:
            _route_extra_availability_cache.pop(key, None)
            return None
        return dict(value)

def _route_extra_availability_put(key: str, value: dict[str, Any]) -> None:
    with _route_extra_availability_lock:
        _route_extra_availability_cache[key] = (time.time() + max(300, ROUTE_EXTRA_AVAILABILITY_TTL), dict(value))
        if len(_route_extra_availability_cache) > 300:
            oldest = sorted(_route_extra_availability_cache.items(), key=lambda kv: kv[1][0])[:60]
            for k, _ in oldest:
                _route_extra_availability_cache.pop(k, None)

@app.post("/api/route-extras-availability")
def route_extras_availability():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify(ok=False, error="JSON object required"), 400
    mountain = str(payload.get("mountain") or "").strip()[:80]
    raw = payload.get("points", [])
    if not isinstance(raw, list):
        return jsonify(ok=False, error="points must be a list"), 400
    points = []
    for row in raw[:24]:
        if not isinstance(row, dict):
            continue
        try:
            lat, lon = float(row.get("lat")), float(row.get("lon"))
        except (TypeError, ValueError):
            continue
        if not (-90 <= lat <= 90 and -180 <= lon <= 180):
            continue
        points.append({"name":str(row.get("name") or "point")[:100], "lat":lat, "lon":lon})
    if not mountain or not points:
        return jsonify(ok=True, ready=False, water=False, camera=False, cameraSource="client-fixed-catalog")
    key = _route_extra_availability_key(mountain, points)
    cached = _route_extra_availability_get(key)
    if cached is not None:
        return jsonify(dict(cached, cached=True))
    data = _apply_water_manual_overrides(_water_mountain_cache_load())
    mountains = data.get("mountains") or {}
    entry = mountains.get(mountain)
    known = isinstance(entry, dict) and entry.get("checked") is True and not entry.get("error")
    result = {"ok":True, "ready":known, "water":bool(known and entry.get("sources")),
              "camera":False, "cameraSource":"client-fixed-catalog", "cached":False,
              "partial":not known, "checked_points":len(points),
              "diagnostics":[] if known else ["water fixed index unavailable or not audited"]}
    # A failed index read is unknown, not a cacheable 'no water' finding.
    if known:
        _route_extra_availability_put(key, result)
    return jsonify(result)

PUBLIC_FILES = {
    '5d55ce5ee953aa38b715681f5207ee3d.txt',
    'BingSiteAuth.xml',
    'access-data.js',
    'access.css',
    'access.js',
    'app.js',
    'asama-route-v1578.js',
    'camera-data.js',
    'favicon-32.png',
    'favicon.ico',
    'google5a7b3dfd79ff97f0.html',
    'guide.html',
    'hut-data.js',
    'huts.html',
    'huts.js',
    'hyakumeizan-route-enrichment-v1579.js',
    'hyakumeizan-route-enrichment-v1580.js',
    'hyakumeizan-route-enrichment-v1581.js',
    'hyakumeizan-route-enrichment-v1582.js',
    'hyakumeizan-route-enrichment-v1583.js',
    'hyakumeizan-route-enrichment-v1584.js',
    'hyakumeizan-route-enrichment-v1585.js',
    'index.html',
    'live-cameras.css',
    'live-cameras.html',
    'live-cameras.js',
    'manifest.json',
    'national-100-points.json',
    'national-300-points.json',
    'reel_master_scene1.png',
    'reel_master_scene2.png',
    'representative-route-cleanup-v15128.js',
    'representative-route-enrichment-v15132.js',
    'representative-route-enrichment-v15134.js',
    'representative-route-enrichment-v15145.js',
    'representative-route-enrichment-v15146.js',
    'representative-route-enrichment-v15147.js',
    'representative-route-enrichment-v15148.js',
    'representative-route-enrichment-v15149.js',
    'representative-route-enrichment-v15150.js',
    'representative-route-enrichment-v15151.js',
    'representative-route-enrichment-v15152.js',
    'representative-route-enrichment-v15153.js',
    'representative-route-enrichment-v15154.js',
    'representative-route-enrichment-v15155.js',
    'representative-route-enrichment-v15156.js',
    'representative-route-enrichment-v15157.js',
    'representative-route-enrichment-v15158.js',
    'representative-route-enrichment-v15159.js',
    'representative-route-enrichment-v15160.js',
    'representative-route-enrichment-v15161.js',
    'representative-route-enrichment-v15162.js',
    'representative-route-enrichment-v15163.js',
    'representative-route-enrichment-v15164.js',
    'representative-route-enrichment-v15165.js',
    'resource-index.css',
    'resource-mountain-data.js',
    'robots.txt',
    'route-regression-recovery-v15230.js',
    'representative-route-recovery-v162.js',
    'sitemap.xml',
    'styles.css',
    'trailhead-access.html',
    'trailhead-access.js',
    'trailheads.html',
    'trailheads.js',
    'traten-icon-180.png',
    'traten-icon-192.png',
    'traten-logo.png',
    'ui-v1.4.254.css',
    'water-mountain-cache.json',
    'water-sources.css',
    'water-sources.html',
    'water-sources.js',
    'west-japan-route-enrichment-v1586.js',
    'west-japan-route-enrichment-v1588.js',
    'west-japan-route-enrichment-v1590.js',
    'west-japan-route-enrichment-v1591.js',
}
PUBLIC_IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico"}



def _serve_public_html(path):
    with open(os.path.join(BASE,path),encoding="utf-8") as f:
        body=f.read()
    def version_asset(match):
        lead,url,quote=match.groups()
        parsed=urllib.parse.urlsplit(url)
        if parsed.scheme or parsed.netloc or not parsed.path.endswith((".js",".css")):
            return match.group(0)
        query=dict(urllib.parse.parse_qsl(parsed.query))
        query["v"]=APP_VERSION
        changed=urllib.parse.urlunsplit((parsed.scheme,parsed.netloc,parsed.path,urllib.parse.urlencode(query),parsed.fragment))
        return lead+changed+quote
    body=re.sub(r'''((?:src|href)=["'])([^"']+)(["'])''',version_asset,body)
    response=Response(body,content_type="text/html; charset=utf-8")
    response.headers["Cache-Control"]="no-store, no-cache, max-age=0, must-revalidate"
    return response

@app.get("/<path:path>")
def static_files(path):
    # Reject traversal/hidden directories; an unknown JS/API must never become HTML with 200.
    parts = path.replace("\\", "/").split("/")
    if any(p in {"", ".", ".."} or p.startswith(".") for p in parts):
        abort(404)
    ext = os.path.splitext(path)[1].lower()
    allowed = path in PUBLIC_FILES or (len(parts)==1 and ext in PUBLIC_IMAGE_EXTS)
    full = os.path.realpath(os.path.join(BASE,path))
    if not allowed or not full.startswith(os.path.realpath(BASE)+os.sep) or not os.path.isfile(full):
        if not ext and not path.startswith("api/"):
            return _serve_public_html("index.html")
        if path.startswith("api/"):
            return jsonify(error="Not found"),404
        abort(404)
    if path.endswith(".html"):
        return _serve_public_html(path)
    response = send_from_directory(BASE,path)
    if path.endswith((".js",".css")) or ext in PUBLIC_IMAGE_EXTS:
        response.headers["Cache-Control"] = "public, max-age=31536000, immutable" if request.args.get("v") else "public, max-age=3600"
    elif path.endswith(".json"):
        # Mutable fixed catalogs, especially the independently updated water cache, are not immutable.
        response.headers["Cache-Control"] = "public, max-age=300"
    return response


@app.after_request
def security_headers(response):
    response.headers.setdefault("Referrer-Policy","strict-origin-when-cross-origin")
    response.headers.setdefault("X-Frame-Options","SAMEORIGIN")
    response.headers.setdefault("Permissions-Policy","geolocation=(), microphone=(), camera=()")
    response.headers.setdefault("X-Content-Type-Options","nosniff")
    if request.path in {"/","/guide.html"}:
        response.headers.setdefault("X-Robots-Tag","index, follow, max-image-preview:large")
    ctype = (response.content_type or "").lower()
    compressible = any(t in ctype for t in ("text/","javascript","json","xml","svg"))
    if compressible:
        response.vary.add("Accept-Encoding")
    if (compressible and request.accept_encodings["gzip"]>0 and request.method!="HEAD"
        and response.status_code==200 and not response.headers.get("Content-Encoding")
        and "Content-Range" not in response.headers and not response.is_streamed):
        try:
            body = response.get_data()
            if len(body)>=1024:
                packed = gzip.compress(body,compresslevel=6,mtime=0)
                if len(packed)<len(body):
                    response.set_data(packed);response.headers["Content-Encoding"]="gzip"
                    response.headers["Content-Length"]=str(len(packed))
                    response.set_etag(hashlib.sha256(packed).hexdigest())
        except Exception:
            pass
    elif (compressible and response.direct_passthrough and request.accept_encodings["gzip"]>0
          and request.method!="HEAD" and response.status_code==200 and not response.headers.get("Content-Encoding")
          and "Content-Range" not in response.headers and response.content_length is not None and response.content_length<=8*1024*1024):
        try:
            response.direct_passthrough=False
            body=response.get_data()
            if len(body)>=1024:
                packed=gzip.compress(body,compresslevel=6,mtime=0)
                if len(packed)<len(body):
                    response.set_data(packed);response.headers["Content-Encoding"]="gzip"
                    response.headers["Content-Length"]=str(len(packed));response.set_etag(hashlib.sha256(packed).hexdigest())
        except Exception:
            pass
    return response


# V1.6.1: failover on requests, but a cache-only read must not launch forecast work.
@app.before_request
def _ensure_refresh_worker_on_request():
    if request.path == "/api/national-outlook":
        payload = request.get_json(silent=True)
        if isinstance(payload, dict) and payload.get("cacheOnly") is True:
            return None
    if NATIONAL_OUTLOOK_AUTO_REFRESH:
        _ensure_national_refresh_worker()
    return None

if NATIONAL_OUTLOOK_AUTO_REFRESH:
    _ensure_national_refresh_worker()

if __name__ == "__main__":
    print(f"Mountain Weather Decision V{APP_VERSION}")
    print(f"Open http://localhost:{PORT}")
    print("Stop: Ctrl+C")
    app.run(host="0.0.0.0", port=PORT, threaded=True, debug=False)
