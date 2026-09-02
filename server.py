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
import re
import html
import unicodedata
from html.parser import HTMLParser
import xml.etree.ElementTree as ET
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
APP_VERSION = "1.5.65"
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
    "https://otenki.onrender.com/live-cameras.html",
    "https://otenki.onrender.com/trailheads.html",
    "https://otenki.onrender.com/huts.html",
    "https://otenki.onrender.com/water-sources.html",
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
    "water_report",
    "route_camera",
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


# V1.5.36: resolve the selected mountain to an actual "てんきとくらす" mountain page.
# URLs are not guessed from mountain names. The resolver reads Tenkura's own regional
# mountain indexes, extracts the links that are actually published there, and returns
# a direct link only when the name match is unambiguous. Regional index results are
# cached so weather analysis itself is never blocked by this lookup.
TENKURA_BASE = "https://tenkura.n-kishou.co.jp"
TENKURA_INDEX_URLS = {
    "hk": f"{TENKURA_BASE}/tk/kanko/kasel.html?ba=hk&type=15",
    "th": f"{TENKURA_BASE}/tk/kanko/kasel.html?ba=th&type=15",
    "hr": f"{TENKURA_BASE}/tk/kanko/kasel.html?ba=hr&type=15",
    "kk": f"{TENKURA_BASE}/tk/kanko/kasel.html?ba=kk&type=15",
    "tk": f"{TENKURA_BASE}/tk/kanko/kasel.html?ba=tk&type=15",
    "kn": f"{TENKURA_BASE}/tk/kanko/kasel.html?ba=kn&type=15",
    "cg": f"{TENKURA_BASE}/tk/kanko/kasel.html?ba=cg&type=15",
    "sk": f"{TENKURA_BASE}/tk/kanko/kasel.html?ba=sk&type=15",
    "ks": f"{TENKURA_BASE}/tk/kanko/kasel.html?ba=ks&type=15",
}
TENKURA_AREA_HINTS = {
    "hokkaido": ["hk"],
    "tohoku": ["th"],
    "echigo_oze": ["hr", "kk", "th"],
    "kanto_joshinetsu": ["kk", "hr"],
    "yatsugatake_chushin": ["kk"],
    "hokushin_kubiki": ["kk", "hr"],
    "northern_alps": ["kk", "hr", "tk"],
    "central_alps_ontake": ["kk", "tk"],
    "okuchichibu_fuji": ["kk"],
    "southern_alps": ["kk", "tk"],
    "hokuriku_gifu": ["hr", "tk"],
    "kinki": ["kn"],
    "chugoku": ["cg"],
    "shikoku": ["sk"],
    "kyushu": ["ks"],
}
TENKURA_INDEX_TTL = max(3600, int(os.environ.get("TENKURA_INDEX_TTL", "21600")))
TENKURA_TIMEOUT = max(3, min(20, int(os.environ.get("TENKURA_TIMEOUT", "8"))))
_tenkura_index_cache: dict[str, tuple[float, list[dict[str, str]]]] = {}
_tenkura_index_lock = threading.Lock()

# Known naming differences between the Traten mountain catalog and Tenkura.
# These aliases are names only; the actual target URL still has to be present in
# Tenkura's regional index before it is returned.
TENKURA_VERIFIED_LINKS = {
    "富士山": {"name": "富士山山頂", "url": f"{TENKURA_BASE}/tk/kanko/kad.html?code=19150004&type=15", "region": "kk"},
    "槍ヶ岳": {"name": "槍ヶ岳", "url": f"{TENKURA_BASE}/tk/kanko/kad.html?code=20150022&type=15", "region": "kk"},
    "御嶽": {"name": "御嶽山", "url": f"{TENKURA_BASE}/tk/kanko/kad.html?code=20150023&type=15", "region": "kk"},
    "御嶽山": {"name": "御嶽山", "url": f"{TENKURA_BASE}/tk/kanko/kad.html?code=20150023&type=15", "region": "kk"},
}

TENKURA_NAME_ALIASES = {
    "富士山": ["富士山山頂"],
    "御嶽": ["御嶽山"],
    "御嶽山": ["御嶽山"],
    "大雪山（旭岳）": ["旭岳", "大雪山旭岳"],
    "蔵王山（熊野岳）": ["熊野岳", "蔵王山（熊野岳）"],
    "茶臼岳（那須岳）": ["茶臼岳(那須岳)", "茶臼岳（那須岳）"],
    "榛名山（榛名富士）": ["榛名富士"],
    "八ヶ岳（赤岳）": ["赤岳"],
    "霧ヶ峰（車山）": ["車山（霧ヶ峰）", "車山(霧ヶ峰)"],
    "水晶岳（黒岳）": ["水晶岳", "黒岳"],
    "笠ヶ岳（岐阜）": ["笠ヶ岳"],
    "笠ヶ岳（長野）": ["笠ヶ岳"],
    "朝日岳（群馬）": ["朝日岳"],
    "朝日岳（新潟・富山）": ["朝日岳"],
    "釈迦ヶ岳（栃木）": ["釈迦ヶ岳"],
    "経ヶ岳（長野）": ["経ヶ岳"],
    "阿蘇山（高岳）": ["高岳", "高岳(阿蘇山)", "高岳［阿蘇山］"],
    "雲仙岳（普賢岳）": ["普賢岳", "雲仙岳（普賢岳）"],
    "霧島山（韓国岳）": ["韓国岳", "霧島山（韓国岳）"],
}

class _TenkuraIndexParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self._href: str | None = None
        self._parts: list[str] = []
        self.links: list[dict[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "a":
            return
        href = dict(attrs).get("href") or ""
        if "kad.html" not in href or "type=15" not in href:
            return
        self._href = href
        self._parts = []

    def handle_data(self, data: str) -> None:
        if self._href is not None:
            self._parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() != "a" or self._href is None:
            return
        name = "".join(self._parts).strip()
        href = self._href
        self._href = None
        self._parts = []
        if not name:
            return
        url = urllib.parse.urljoin(f"{TENKURA_BASE}/tk/kanko/", href)
        parsed = urllib.parse.urlparse(url)
        if parsed.hostname != "tenkura.n-kishou.co.jp" or not parsed.path.endswith("/kad.html"):
            return
        self.links.append({"name": name, "url": url})

def _tenkura_decode(body: bytes, content_type: str = "") -> str:
    m = re.search(r"charset=([\w-]+)", content_type or "", re.I)
    candidates = [m.group(1)] if m else []
    candidates += ["utf-8", "cp932", "shift_jis", "euc_jp"]
    seen: set[str] = set()
    best = ""
    best_bad = 10**9
    for enc in candidates:
        if not enc or enc.lower() in seen:
            continue
        seen.add(enc.lower())
        try:
            text = body.decode(enc, errors="replace")
        except LookupError:
            continue
        bad = text.count("�")
        if bad < best_bad:
            best, best_bad = text, bad
        if bad == 0:
            return text
    return best

def _tenkura_norm(value: str) -> str:
    text = unicodedata.normalize("NFKC", str(value or ""))
    text = text.replace("ヶ", "ケ").replace("ヵ", "カ")
    return re.sub(r"[\s・･　]", "", text).lower()

def _tenkura_name_candidates(mountain: str) -> list[str]:
    values = [mountain, *TENKURA_NAME_ALIASES.get(mountain, [])]
    # Parenthetical location/alias qualifiers are common in Traten. The stripped
    # form is only used when it produces a unique match in the hinted region(s).
    stripped = re.sub(r"[（(［\[].*?[）)］\]]", "", mountain).strip()
    if stripped and stripped != mountain:
        values.append(stripped)
    out: list[str] = []
    seen: set[str] = set()
    for value in values:
        key = _tenkura_norm(value)
        if key and key not in seen:
            seen.add(key)
            out.append(value)
    return out

def _fetch_tenkura_index(region: str) -> list[dict[str, str]]:
    now = time.time()
    with _tenkura_index_lock:
        cached = _tenkura_index_cache.get(region)
        if cached and cached[0] > now:
            return [dict(x) for x in cached[1]]
    url = TENKURA_INDEX_URLS[region]
    req = urllib.request.Request(url, headers={
        "User-Agent": "TRATEN/1.5.42 https://otenki.onrender.com",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "ja,en;q=0.5",
    })
    with urllib.request.urlopen(req, timeout=TENKURA_TIMEOUT) as resp:
        body = resp.read(2 * 1024 * 1024)
        text = _tenkura_decode(body, resp.headers.get("Content-Type", ""))
    parser = _TenkuraIndexParser()
    parser.feed(text)
    # Deduplicate exact URL entries while preserving the official display name.
    rows: list[dict[str, str]] = []
    seen_urls: set[str] = set()
    for row in parser.links:
        if row["url"] in seen_urls:
            continue
        seen_urls.add(row["url"])
        rows.append(row)
    with _tenkura_index_lock:
        _tenkura_index_cache[region] = (now + TENKURA_INDEX_TTL, rows)
    return [dict(x) for x in rows]

def _resolve_tenkura_link(mountain: str, area: str = "") -> dict[str, Any] | None:
    verified = TENKURA_VERIFIED_LINKS.get(mountain)
    if verified:
        return {**verified, "matchedBy": "verified-direct"}
    candidates = _tenkura_name_candidates(mountain)
    candidate_keys = {_tenkura_norm(x) for x in candidates}
    hinted = [r for r in TENKURA_AREA_HINTS.get(area, []) if r in TENKURA_INDEX_URLS]
    regions = hinted + [r for r in TENKURA_INDEX_URLS if r not in hinted]
    matches: list[dict[str, str]] = []
    for region in regions:
        try:
            rows = _fetch_tenkura_index(region)
        except Exception:
            continue
        region_matches = [row for row in rows if _tenkura_norm(row.get("name", "")) in candidate_keys]
        if region_matches:
            matches.extend([{**row, "region": region} for row in region_matches])
            # A unique match inside an explicitly hinted first-choice region is safe
            # and avoids unnecessary requests to all other Tenkura regional indexes.
            unique_urls = {m["url"] for m in region_matches}
            if region in hinted and len(unique_urls) == 1:
                row = region_matches[0]
                return {"name": row["name"], "url": row["url"], "region": region, "matchedBy": "official-index"}
    unique: dict[str, dict[str, str]] = {m["url"]: m for m in matches}
    if len(unique) == 1:
        row = next(iter(unique.values()))
        return {"name": row["name"], "url": row["url"], "region": row["region"], "matchedBy": "official-index"}
    return None



# V1.5.38: additional external mountain-weather cross checks.
# Like Tenkura, targets are resolved only from URLs actually published by the
# provider (or a tiny set of manually verified direct URLs). Unknown or
# ambiguous matches stay unavailable rather than guessing an ID.
WEATHERNEWS_BASE = "https://weathernews.jp"
WEATHERNEWS_INDEX_URL = f"{WEATHERNEWS_BASE}/mountain/"
TENKIJP_BASE = "https://tenki.jp"
TENKIJP_INDEX_URL = f"{TENKIJP_BASE}/mountain/"
EXTERNAL_INDEX_TTL = max(3600, int(os.environ.get("EXTERNAL_MOUNTAIN_INDEX_TTL", "21600")))
EXTERNAL_INDEX_TIMEOUT = max(3, min(20, int(os.environ.get("EXTERNAL_MOUNTAIN_INDEX_TIMEOUT", "8"))))
_external_mountain_index_cache: dict[str, tuple[float, list[dict[str, str]]]] = {}
_external_mountain_index_lock = threading.Lock()

EXTERNAL_NAME_ALIASES = {
    **TENKURA_NAME_ALIASES,
    "大雪山（旭岳）": ["大雪山", "旭岳"],
    "蔵王山（熊野岳）": ["蔵王山", "熊野岳"],
    "茶臼岳（那須岳）": ["那須岳", "茶臼岳"],
    "八ヶ岳（赤岳）": ["八ヶ岳", "赤岳"],
    "霧ヶ峰（車山）": ["霧ヶ峰", "車山"],
    "水晶岳（黒岳）": ["水晶岳", "黒岳"],
    "阿蘇山（高岳）": ["阿蘇山", "高岳"],
    "雲仙岳（普賢岳）": ["雲仙岳", "普賢岳"],
    "霧島山（韓国岳）": ["霧島山", "韓国岳"],
}

WEATHERNEWS_VERIFIED_LINKS = {
    "富士山": {"name": "富士山", "url": f"{WEATHERNEWS_BASE}/mountain/fuji/40504/"},
    "槍ヶ岳": {"name": "槍ヶ岳", "url": f"{WEATHERNEWS_BASE}/mountain/northernalps/40350/"},
    "御嶽": {"name": "御嶽山", "url": f"{WEATHERNEWS_BASE}/mountain/northernalps/41001/"},
    "御嶽山": {"name": "御嶽山", "url": f"{WEATHERNEWS_BASE}/mountain/northernalps/41001/"},
}

TENKIJP_VERIFIED_LINKS = {
    "富士山": {"name": "富士山", "url": f"{TENKIJP_BASE}/mountain/famous100/5/25/150.html"},
    "槍ヶ岳": {"name": "槍ヶ岳", "url": f"{TENKIJP_BASE}/mountain/famous100/3/23/161.html"},
    "御嶽": {"name": "御嶽", "url": f"{TENKIJP_BASE}/mountain/normal/3/23/1049.html"},
    "御嶽山": {"name": "御嶽", "url": f"{TENKIJP_BASE}/mountain/normal/3/23/1049.html"},
}

class _ExternalMountainIndexParser(HTMLParser):
    def __init__(self, provider: str) -> None:
        super().__init__(convert_charrefs=True)
        self.provider = provider
        self._href: str | None = None
        self._parts: list[str] = []
        self.links: list[dict[str, str]] = []

    def _accepted(self, href: str) -> bool:
        parsed = urllib.parse.urlparse(urllib.parse.urljoin(
            WEATHERNEWS_INDEX_URL if self.provider == "weathernews" else TENKIJP_INDEX_URL, href
        ))
        if self.provider == "weathernews":
            if parsed.hostname != "weathernews.jp":
                return False
            return bool(re.fullmatch(r"/mountain/[a-z0-9_-]+/\d+/?", parsed.path, re.I))
        if parsed.hostname != "tenki.jp":
            return False
        return bool(re.fullmatch(r"/mountain/(?:famous100|normal)/\d+/\d+/\d+\.html", parsed.path, re.I)
                    or re.fullmatch(r"/mountain/\d+/\d+/\d+\.html", parsed.path, re.I))

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "a":
            return
        href = dict(attrs).get("href") or ""
        if not self._accepted(href):
            return
        self._href = href
        self._parts = []

    def handle_data(self, data: str) -> None:
        if self._href is not None:
            self._parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() != "a" or self._href is None:
            return
        href = self._href
        name = re.sub(r"\s+", " ", "".join(self._parts)).strip()
        self._href = None
        self._parts = []
        if not name:
            return
        base = WEATHERNEWS_INDEX_URL if self.provider == "weathernews" else TENKIJP_INDEX_URL
        url = urllib.parse.urljoin(base, href)
        self.links.append({"name": name, "url": url})

def _external_name_candidates(mountain: str) -> list[str]:
    values = [mountain, *EXTERNAL_NAME_ALIASES.get(mountain, [])]
    stripped = re.sub(r"[（(［\[].*?[）)］\]]", "", mountain).strip()
    if stripped and stripped != mountain:
        values.append(stripped)
    out: list[str] = []
    seen: set[str] = set()
    for value in values:
        key = _tenkura_norm(value)
        if key and key not in seen:
            seen.add(key)
            out.append(value)
    return out

def _fetch_external_mountain_index(provider: str) -> list[dict[str, str]]:
    now = time.time()
    with _external_mountain_index_lock:
        cached = _external_mountain_index_cache.get(provider)
        if cached and cached[0] > now:
            return [dict(x) for x in cached[1]]
    if provider == "weathernews":
        url = WEATHERNEWS_INDEX_URL
    elif provider == "tenkijp":
        url = TENKIJP_INDEX_URL
    else:
        raise ValueError("unknown provider")
    req = urllib.request.Request(url, headers={
        "User-Agent": "TRATEN/1.5.42 https://otenki.onrender.com",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "ja,en;q=0.5",
    })
    with urllib.request.urlopen(req, timeout=EXTERNAL_INDEX_TIMEOUT) as resp:
        body = resp.read(4 * 1024 * 1024)
        text = _tenkura_decode(body, resp.headers.get("Content-Type", ""))
    parser = _ExternalMountainIndexParser(provider)
    parser.feed(text)
    rows: list[dict[str, str]] = []
    seen_urls: set[str] = set()
    for row in parser.links:
        if row["url"] in seen_urls:
            continue
        seen_urls.add(row["url"])
        rows.append(row)
    with _external_mountain_index_lock:
        _external_mountain_index_cache[provider] = (now + EXTERNAL_INDEX_TTL, rows)
    return [dict(x) for x in rows]

def _resolve_external_mountain_link(provider: str, mountain: str) -> dict[str, Any] | None:
    verified_map = WEATHERNEWS_VERIFIED_LINKS if provider == "weathernews" else TENKIJP_VERIFIED_LINKS
    verified = verified_map.get(mountain)
    if verified:
        return {**verified, "matchedBy": "verified-direct"}
    candidate_keys = {_tenkura_norm(x) for x in _external_name_candidates(mountain)}
    try:
        rows = _fetch_external_mountain_index(provider)
    except Exception:
        return None
    matches = [row for row in rows if _tenkura_norm(row.get("name", "")) in candidate_keys]
    unique = {row["url"]: row for row in matches}
    if len(unique) != 1:
        return None
    row = next(iter(unique.values()))
    return {"name": row["name"], "url": row["url"], "matchedBy": "official-index"}


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
NATIONAL_OUTLOOK_BOOT_GRACE = int(os.environ.get("NATIONAL_OUTLOOK_BOOT_GRACE", "45"))
NATIONAL_CACHE_REFRESH_TOKEN = os.environ.get("NATIONAL_CACHE_REFRESH_TOKEN", "")
# V1.5.7: proactively keep the next seven days of Japan 100 Famous Mountains
# in the persistent Supabase cache. One forecast date is refreshed per cycle to
# avoid API bursts; the 15-minute worker interval still completes a full sweep
# comfortably inside the four-hour TTL.
NATIONAL_100_ROLLING_AUTO_CACHE = os.environ.get(
    "NATIONAL_100_ROLLING_AUTO_CACHE", os.environ.get("NATIONAL_NEXTDAY_100_AUTO_CACHE", "1")
).lower() not in {"0", "false", "no"}
NATIONAL_100_ROLLING_DAYS = max(1, min(9, int(os.environ.get("NATIONAL_100_ROLLING_DAYS", "7"))))
NATIONAL_100_ROLLING_DATES_PER_CYCLE = max(1, min(3, int(os.environ.get("NATIONAL_100_ROLLING_DATES_PER_CYCLE", "1"))))
NATIONAL_100_POINTS_FILE = os.path.join(BASE, "national-100-points.json")
NATIONAL_REFRESH_STATUS_FILE = os.path.join(tempfile.gettempdir(), "traten-national-refresh-status.json")
_national_last_refresh_report: dict[str, Any] = {}
_national_refresh_runtime: dict[str, Any] = {
    "state": "not-started",
    "workerPid": None,
    "workerThreadAlive": False,
    "lastCheckAt": None,
    "lastRunStartedAt": None,
    "lastRunFinishedAt": None,
    "lastRunOk": None,
    "lastError": None,
}
_national_refresh_worker_thread: threading.Thread | None = None
_national_refresh_worker_lock_handle = None
NATIONAL_OUTLOOK_CHUNK_SIZE = max(5, min(50, int(os.environ.get("NATIONAL_OUTLOOK_CHUNK_SIZE", "25"))))
NATIONAL_OUTLOOK_ENGINE = "metno-gfs-v3-conservative"
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

    # V1.5.8: anonymous analyzed-route history and popular-route aggregation.
    # Route/timing details live inside the existing metadata JSON, so no Supabase
    # schema migration is required. Older events simply have no itinerary field.
    analysis_history: list[dict[str, Any]] = []
    route_map: dict[tuple[str, str], dict[str, Any]] = {}
    for e in events:
        if e.get("event_name") != "weather_analysis" or e.get("success") is not True:
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
        stay_count = int(e.get("stay_count") or meta.get("overnight_count") or 0)
        row = {
            "created_at": e.get("created_at"),
            "mountain": mountain,
            "route_label": route_label,
            "route_path": route_path,
            "start_date": start_date,
            "end_date": end_date,
            "stay_count": stay_count,
            "point_count": int(e.get("route_points") or len(itinerary) or 0),
            "itinerary": itinerary,
        }
        if route_path or itinerary:
            analysis_history.append(row)

        if not route_path:
            continue
        key = (mountain, route_path)
        rr = route_map.setdefault(key, {
            "mountain": mountain, "route_label": route_label, "route_path": route_path,
            "analysis_count": 0, "sessions": set(), "last_used": "",
        })
        rr["analysis_count"] += 1
        if e.get("session_id"):
            rr["sessions"].add(str(e.get("session_id")))
        created = str(e.get("created_at") or "")
        if created > rr["last_used"]:
            rr["last_used"] = created
        if not rr["route_label"] and route_label:
            rr["route_label"] = route_label

    analysis_history.sort(key=lambda x: str(x.get("created_at") or ""), reverse=True)
    analysis_history = analysis_history[:100]
    popular_routes = []
    for row in route_map.values():
        row["unique_sessions"] = len(row.pop("sessions"))
        popular_routes.append(row)
    popular_routes.sort(key=lambda x: str(x.get("last_used") or ""), reverse=True)
    popular_routes.sort(key=lambda x: (x["analysis_count"], x["unique_sessions"]), reverse=True)
    popular_routes = popular_routes[:20]

    # V1.5.9: aggregate actually-used estimated/missing CT segments.
    # This is a review queue only; user usage never turns an estimate into a verified CT.
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
                row["status"] = "missing"
                row["minutes"] = None
            elif row.get("minutes") is None and seg.get("minutes") is not None:
                row["minutes"] = seg.get("minutes")
            if session:
                row["sessions"].add(session)
            if mountain:
                row["mountains"].add(mountain)
            if created > row["last_used"]:
                row["last_used"] = created
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
        "analysis_history": analysis_history,
        "popular_routes": popular_routes,
        "ct_review_segments": ct_review_segments,
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
    # V1.5.64: nationwide A/B/C is intentionally conservative. A is reserved
    # for a day with no caution hour during 06-15. Strong conditions sustained
    # for two hours, or any extreme hour, are C.
    if extreme_hours >= 1 or severe_hours >= 2:
        return "C", "6〜15時に強い風・突風・雨・低視程などが見込まれ、登山には厳しめの条件です。時間帯別の詳細を確認してください。"
    if severe_hours >= 1 or caution_hours >= 1:
        return "B", "6〜15時の一部に風・突風・雨・低視程などの注意要素があります。詳細分析で通過時刻を確認してください。"
    return "A", "6〜15時に主要な注意条件が見当たらない日です。詳細分析でルートと到着時刻を最終確認してください。"


NATIONAL_SUPABASE_CACHE_TABLE = os.environ.get("NATIONAL_SUPABASE_CACHE_TABLE", "national_outlook_cache")
NATIONAL_SUPABASE_TIMEOUT = int(os.environ.get("NATIONAL_SUPABASE_TIMEOUT", "12"))

def _national_supabase_enabled() -> bool:
    return bool(SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY and NATIONAL_SUPABASE_CACHE_TABLE)

def _national_supabase_key(date_text: str, p: dict[str, Any]) -> str:
    raw=f'{NATIONAL_OUTLOOK_ENGINE}|{date_text}|{p["name"]}|{p["lat"]:.5f}|{p["lon"]:.5f}|{"" if p.get("elevation") is None else round(float(p["elevation"]))}'
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()

def _national_supabase_read(date_text: str, points: list[dict[str, Any]]) -> tuple[dict[str, dict[str, Any]], dict[str, dict[str, Any]], dict[str, dict[str, float]]]:
    """Return (fresh_by_name, stale_by_name) from persistent shared cache.
    Missing table/config fails open so national outlook still works with local fallback.
    """
    if not _national_supabase_enabled():
        return {}, {}, {}
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
        return {}, {}, {}
    wanted={_national_supabase_key(date_text,p):p["name"] for p in points}
    now=time.time(); fresh={}; stale={}; meta={}
    for row in rows if isinstance(rows,list) else []:
        key=str(row.get("cache_key") or "")
        name=wanted.get(key)
        result=row.get("result")
        if not name or not isinstance(result,dict): continue
        result=dict(result); result["name"]=name
        try:
            fu=float(row.get("fresh_until") or 0); su=float(row.get("stale_until") or 0)
            gt=float(row.get("generated_ts") or 0)
        except (TypeError,ValueError): continue
        if su<=now: continue
        meta[name]={"generated_ts":gt,"fresh_until":fu,"stale_until":su}
        (fresh if fu>now else stale)[name]=result
    return fresh,stale,meta

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



def _national_load_100_points() -> list[dict[str, Any]]:
    try:
        with open(NATIONAL_100_POINTS_FILE, "r", encoding="utf-8") as f:
            rows = json.load(f)
    except Exception as exc:
        app.logger.warning("national_100_seed_load_failed %s", exc)
        return []
    out=[]
    seen=set()
    for row in rows if isinstance(rows,list) else []:
        if not isinstance(row,dict): continue
        name=str(row.get("name") or "")[:80]
        try:
            lat=float(row.get("lat")); lon=float(row.get("lon"))
        except (TypeError,ValueError):
            continue
        if not name or name in seen or not (20 <= lat <= 50 and 120 <= lon <= 155):
            continue
        try: elev=float(row.get("elevation")) if row.get("elevation") is not None else None
        except (TypeError,ValueError): elev=None
        seen.add(name); out.append({"name":name,"lat":lat,"lon":lon,"elevation":elev})
    return out


def _national_rolling_100_date_texts() -> list[str]:
    """Return tomorrow through N days ahead in JST for proactive 100-mountain caching."""
    today_jst=(datetime.now(timezone.utc)+timedelta(hours=9)).date()
    return [(today_jst+timedelta(days=offset)).isoformat() for offset in range(1, NATIONAL_100_ROLLING_DAYS+1)]


def _national_nextday_date_text() -> str:
    # Backward-compatible helper retained for diagnostics / older callers.
    return _national_rolling_100_date_texts()[0]


def _national_100_date_cache_status(date_text: str, points: list[dict[str, Any]], *, force: bool=False) -> tuple[dict[str, Any], list[dict[str, Any]]]:
    """Inspect one rolling forecast date and return its status plus due points."""
    report={"date":date_text,"seedCount":len(points),"freshBefore":0,"staleBefore":0,"missingBefore":0,"pointsDue":0,"pointsUpdated":0,"ok":True,"error":None}
    fresh,stale,_=_national_supabase_read(date_text,points)
    report["freshBefore"]=len(fresh); report["staleBefore"]=len(stale)
    report["missingBefore"]=sum(1 for p in points if p["name"] not in fresh and p["name"] not in stale)
    due=points if force else [p for p in points if p["name"] not in fresh]
    report["pointsDue"]=len(due)
    return report,due


def _refresh_rolling_100_cache(*, force: bool=False, max_dates: int | None=None) -> dict[str, Any]:
    """Maintain a rolling 7-day Supabase cache for Japan's 100 Famous Mountains.

    The window is tomorrow through NATIONAL_100_ROLLING_DAYS days ahead.
    To protect upstream weather APIs, only the earliest due forecast date(s) are
    refreshed each cycle (one date by default). Fresh rows are never refetched.
    """
    points=_national_load_100_points()
    dates=_national_rolling_100_date_texts()
    limit=max(1, int(max_dates or NATIONAL_100_ROLLING_DATES_PER_CYCLE))
    report: dict[str, Any]={
        "ok":True,"windowStart":dates[0] if dates else None,"windowEnd":dates[-1] if dates else None,
        "rollingDays":len(dates),"seedCount":len(points),"targetRows":len(dates)*len(points),
        "datesInspected":0,"datesDue":0,"datesProcessed":0,"pointsDue":0,"pointsUpdated":0,
        "dateReports":[],"errors":[],
    }
    if len(points)!=100:
        report.update(ok=False,error=f"百名山固定座標が100件ではありません: {len(points)}")
        return report
    if not _national_supabase_enabled():
        report.update(ok=False,error="Supabase national cache is not configured")
        return report

    due_dates: list[tuple[str,list[dict[str,Any]],dict[str,Any]]]=[]
    for date_text in dates:
        date_report,due=_national_100_date_cache_status(date_text,points,force=force)
        report["datesInspected"]+=1
        report["pointsDue"]+=len(due)
        report["dateReports"].append(date_report)
        if due:
            report["datesDue"]+=1
            due_dates.append((date_text,due,date_report))

    # V1.5.65: incomplete dates are repaired before moving on.  Within a date,
    # fetch in small blocks and persist every successful block immediately.
    # This prevents a partial upstream response (for example 58/100) from being
    # treated as the day's finished refresh and makes progress survive timeouts.
    due_dates.sort(key=lambda item: (-len(item[1]), item[0]))
    selected=due_dates[:limit]
    for date_text,due,date_report in selected:
        fingerprint=_national_points_fingerprint(points)
        if not _national_try_lock(date_text,fingerprint):
            date_report["locked"]=True
            continue
        report["datesProcessed"]+=1
        date_report["chunkSize"]=NATIONAL_OUTLOOK_CHUNK_SIZE
        date_report["chunks"]=[]
        updated_names=set()
        try:
            for start in range(0,len(due),NATIONAL_OUTLOOK_CHUNK_SIZE):
                chunk=due[start:start+NATIONAL_OUTLOOK_CHUNK_SIZE]
                chunk_report={"start":start,"requested":len(chunk),"updated":0,"completeFetch":False,"error":None}
                try:
                    results,complete,rate_limited,error=_national_fetch_shared(date_text,chunk)
                    if results:
                        wrote=_national_supabase_write(date_text,chunk,results)
                        if wrote:
                            names={str(r.get("name") or "") for r in results if isinstance(r,dict) and r.get("name")}
                            updated_names.update(names)
                            chunk_report["updated"]=len(names)
                    chunk_report["completeFetch"]=bool(complete)
                    chunk_report["rateLimited"]=bool(rate_limited)
                    if error:
                        chunk_report["error"]=error
                    date_report["chunks"].append(chunk_report)
                    if rate_limited:
                        date_report["rateLimited"]=True
                        break
                except Exception as exc:
                    chunk_report["error"]=str(exc)[:200]
                    date_report["chunks"].append(chunk_report)
                    app.logger.exception("national_rolling_100_chunk_failed date=%s start=%s",date_text,start)

            date_report["pointsUpdated"]=len(updated_names)
            report["pointsUpdated"]+=len(updated_names)
            fresh_after,stale_after,_=_national_supabase_read(date_text,points)
            date_report["freshAfter"]=len(fresh_after)
            date_report["staleAfter"]=len(stale_after)
            date_report["missingAfter"]=max(0,len(points)-len(set(fresh_after)|set(stale_after)))
            date_report["remainingDueAfter"]=max(0,len(points)-len(fresh_after))
            date_report["completeFetch"]=len(fresh_after)>=len(points)
            if date_report["remainingDueAfter"]:
                date_report["ok"]=False
                date_report["error"]=f'fresh cache incomplete: {len(fresh_after)}/{len(points)}'
                report["errors"].append({"date":date_text,"error":date_report["error"]})
        except Exception as exc:
            app.logger.exception("national_rolling_100_refresh_failed date=%s",date_text)
            date_report["ok"]=False; date_report["error"]=str(exc)[:200]
            report["errors"].append({"date":date_text,"error":str(exc)[:200]})
        finally:
            _national_unlock(date_text,fingerprint)
    report["ok"]=not report["errors"] and not report.get("error")
    return report


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
    """Refresh only the proactive rolling 7-day / 100-mountain cache.

    Other dates and the additional 200 mountains remain opportunistic/on-demand:
    every successful user analysis is stored in the same Supabase shared cache and
    is reusable within the four-hour fresh TTL, but the background worker does not
    spend API calls keeping those rows warm.
    """
    global _national_last_refresh_report
    started=time.time()
    rolling=(
        _refresh_rolling_100_cache(force=force)
        if NATIONAL_100_ROLLING_AUTO_CACHE
        else {"ok":True,"disabled":True,"rollingDays":NATIONAL_100_ROLLING_DAYS,"pointsDue":0,"pointsUpdated":0,"errors":[]}
    )
    report: dict[str, Any]={
        "ok":bool(rolling.get("ok",True)),"force":force,"rolling100":rolling,
        "datesChecked":int(rolling.get("datesInspected") or 0),
        "datesDue":int(rolling.get("datesDue") or 0),
        "datesProcessed":int(rolling.get("datesProcessed") or 0),
        "pointsDue":int(rolling.get("pointsDue") or 0),
        "pointsUpdated":int(rolling.get("pointsUpdated") or 0),
        "errors":list(rolling.get("errors") or []),
        "backgroundScope":"100-famous-mountains-next-7-days",
    }
    if rolling.get("error"):
        report["errors"].append({"error":rolling.get("error")})
    report["elapsedSeconds"]=round(time.time()-started,2)
    report["ok"]=bool(rolling.get("ok",True)) and not report["errors"]
    _national_last_refresh_report=dict(report)
    _national_last_refresh_report["finishedAt"]=datetime.now(timezone.utc).isoformat()
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
        w=hv("wind_speed_10m",0); g=hv("wind_gusts_10m",w); r=hv("precipitation",0); v=hv("visibility",None); c=hv("cape",0)
        extreme = w>=15 or g>=25 or r>=6 or (v is not None and v<1000)
        severe = w>=9 or g>=18 or r>=1.5 or (v is not None and v<3000) or c>=1000
        caution = w>=5 or g>=12 or r>=0.1 or (v is not None and v<5000) or c>=500
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
    for w,g,r,_ in rows:
        if w>=15 or g>=25 or r>=6: extreme_hours+=1
        if w>=9 or g>=18 or r>=1.5: severe_hours+=1
        if w>=5 or g>=12 or r>=0.1: caution_hours+=1
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
        caution=sum(1 for x in rr if x["wind"]>=5 or x.get("gust",x["wind"])>=12 or x["rain"]>=0.1)
        severe=sum(1 for x in rr if x["wind"]>=9 or x.get("gust",x["wind"])>=18 or x["rain"]>=1.5)
        extreme=sum(1 for x in rr if x["wind"]>=15 or x.get("gust",x["wind"])>=25 or x["rain"]>=6)
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
                 "freshUntil":datetime.fromtimestamp(float(data.get("fresh_until") or now), timezone.utc).isoformat(),
                 "freshRemainingSeconds":max(0,round(float(data.get("fresh_until") or 0)-now)),
                 "cachedCount":int(cached_count if cached_count is not None else data.get("cached_count") or got),
                 "freshCount":int(data.get("supabase_fresh_count") or 0),
                 "staleCount":int(data.get("supabase_stale_count") or 0),
                 "newlyFetchedCount":int(newly_fetched_count or 0),
                 "staleFallbackCount":max(0,int(stale_fallback_count or 0)),
                 "missingCount":max(0,total-got),
                 "cacheHit":bool((cached_count if cached_count is not None else data.get("cached_count") or got)>0 and int(newly_fetched_count or 0)==0)},
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


def _save_national_refresh_runtime() -> None:
    payload = dict(_national_refresh_runtime)
    payload["workerThreadAlive"] = bool(_national_refresh_worker_thread and _national_refresh_worker_thread.is_alive())
    payload["statusWrittenAt"] = datetime.now(timezone.utc).isoformat()
    tmp = NATIONAL_REFRESH_STATUS_FILE + f".{os.getpid()}.tmp"
    try:
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))
        os.replace(tmp, NATIONAL_REFRESH_STATUS_FILE)
    except Exception:
        try:
            if os.path.exists(tmp): os.unlink(tmp)
        except OSError:
            pass


def _national_refresh_runtime_snapshot() -> dict[str, Any]:
    snap = dict(_national_refresh_runtime)
    # /tmp is shared by Gunicorn workers. Prefer the status written by the lock owner
    # so /api/health is consistent no matter which worker serves the request.
    try:
        with open(NATIONAL_REFRESH_STATUS_FILE, "r", encoding="utf-8") as f:
            shared = json.load(f)
        if isinstance(shared, dict):
            snap.update(shared)
    except Exception:
        pass
    thread = _national_refresh_worker_thread
    if snap.get("workerPid") == os.getpid():
        snap["workerThreadAlive"] = bool(thread and thread.is_alive())
    if snap.get("lastCheckAt"):
        try:
            last = datetime.fromisoformat(str(snap["lastCheckAt"]).replace("Z", "+00:00"))
            nxt = last + timedelta(seconds=max(300, NATIONAL_OUTLOOK_REFRESH_INTERVAL))
            snap["nextCheckAt"] = nxt.astimezone(timezone.utc).isoformat()
        except Exception:
            snap["nextCheckAt"] = None
    else:
        snap["nextCheckAt"] = None
    return snap


def _run_national_refresh_cycle(trigger: str) -> None:
    now_iso = datetime.now(timezone.utc).isoformat()
    _national_refresh_runtime["lastCheckAt"] = now_iso
    _national_refresh_runtime["lastRunStartedAt"] = now_iso
    _national_refresh_runtime["state"] = "running"
    _national_refresh_runtime["lastError"] = None
    _save_national_refresh_runtime()
    try:
        if NATIONAL_OUTLOOK_AUTO_REFRESH and _national_supabase_enabled():
            report = _refresh_national_persistent_cache(force=False)
            _national_refresh_runtime["lastRunOk"] = bool(report.get("ok"))
            _national_refresh_runtime["lastError"] = None if report.get("ok") else str(report.get("errors") or report.get("error") or "refresh failed")[:500]
        else:
            _national_refresh_runtime["lastRunOk"] = True
        _national_refresh_runtime["state"] = "sleeping"
    except Exception as exc:
        _national_refresh_runtime["lastRunOk"] = False
        _national_refresh_runtime["lastError"] = str(exc)[:500]
        _national_refresh_runtime["state"] = "error"
        app.logger.exception("national_refresh_cycle_failed trigger=%s", trigger)
    finally:
        _national_refresh_runtime["lastRunFinishedAt"] = datetime.now(timezone.utc).isoformat()
        _save_national_refresh_runtime()


def _ensure_national_refresh_worker() -> None:
    """Start one refresh worker per Render instance, safely across Gunicorn workers."""
    global _national_refresh_thread_started, _national_refresh_worker_thread, _national_refresh_worker_lock_handle
    if not NATIONAL_OUTLOOK_AUTO_REFRESH:
        _national_refresh_runtime["state"] = "disabled"
        return
    with _national_refresh_thread_lock:
        if _national_refresh_worker_thread and _national_refresh_worker_thread.is_alive():
            return
        # Gunicorn runs two workers. Use an OS file lock so only one owns the
        # background refresh loop; the other workers remain standby.
        try:
            import fcntl
            lock_path = os.path.join(tempfile.gettempdir(), "traten-national-refresh-worker.lock")
            handle = open(lock_path, "a+")
            try:
                fcntl.flock(handle.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
            except BlockingIOError:
                handle.close()
                _national_refresh_runtime["state"] = "standby"
                _national_refresh_runtime["workerPid"] = None
                return
            _national_refresh_worker_lock_handle = handle
        except Exception as exc:
            # Render is Linux, but keep a fallback so local Windows development still works.
            app.logger.warning("national_refresh_worker_lock_unavailable %s", exc)
        _national_refresh_thread_started = True
        _national_refresh_runtime["state"] = "starting"
        _national_refresh_runtime["workerPid"] = os.getpid()
        _save_national_refresh_runtime()

        def worker():
            # V1.4.237: do not compete with Render cold-start / first-page delivery.
            # The persistent cache can wait briefly; user-facing HTML/JS gets priority.
            _national_refresh_runtime["state"] = "boot-grace"
            _national_refresh_runtime["workerPid"] = os.getpid()
            _save_national_refresh_runtime()
            if NATIONAL_OUTLOOK_BOOT_GRACE > 0:
                time.sleep(NATIONAL_OUTLOOK_BOOT_GRACE)
            _run_national_refresh_cycle("boot")
            while True:
                time.sleep(max(300, NATIONAL_OUTLOOK_REFRESH_INTERVAL))
                _run_national_refresh_cycle("interval")

        thread = threading.Thread(target=worker, name="traten-national-refresh", daemon=True)
        _national_refresh_worker_thread = thread
        thread.start()


@app.before_request
def _ensure_refresh_worker_on_request():
    # A request after a Render wake is a second safety net. If the owning Gunicorn
    # worker disappeared, the next request lets another worker acquire the lock.
    if NATIONAL_OUTLOOK_AUTO_REFRESH and not (_national_refresh_worker_thread and _national_refresh_worker_thread.is_alive()):
        _ensure_national_refresh_worker()


@app.post("/api/national-outlook/refresh-cache")
def national_outlook_refresh_cache():
    """Scheduled wake-up endpoint for the persistent nationwide cache.

    Configure the same NATIONAL_CACHE_REFRESH_TOKEN in Render and GitHub Actions.
    The endpoint maintains tomorrow through seven days ahead for the 100 Famous Mountains, refreshing only rows whose four-hour TTL has expired.
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
    cache_only = bool(payload.get("cacheOnly"))
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
    sb_fresh,sb_stale,sb_meta=_national_supabase_read(date_text,points)
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
        selected_meta=[sb_meta.get(p["name"]) for p in points if p["name"] in sb_meta]
        generated_values=[float(m.get("generated_ts") or 0) for m in selected_meta if m and float(m.get("generated_ts") or 0)>0]
        fresh_values=[float(m.get("fresh_until") or 0) for m in selected_meta if m and float(m.get("fresh_until") or 0)>0]
        stale_values=[float(m.get("stale_until") or 0) for m in selected_meta if m and float(m.get("stale_until") or 0)>0]
        generated_ts=min(generated_values) if generated_values else now
        fresh_until=min(fresh_values) if fresh_values else now
        stale_until=min(stale_values) if stale_values else now+NATIONAL_OUTLOOK_STALE_TTL
        cached={
            "date":date_text,"fingerprint":fingerprint,
            "generated_at":datetime.fromtimestamp(generated_ts,timezone.utc).isoformat(),"generated_ts":generated_ts,
            "fresh_until":fresh_until,"stale_until":stale_until,
            "points":points,"results":persistent_seed,"complete":len(persistent_seed)>=len(points),"cached_count":len(persistent_seed),"version":APP_VERSION,
            "supabase_fresh_count":len(sb_fresh),"supabase_stale_count":len(sb_stale),
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

    # V1.4.190: initial nationwide display may ask only for already-saved results.
    # Never generate/fetch forecasts for cacheOnly requests.
    if cache_only:
        if cached_results:
            cache_state='cache-only-fresh' if state=='fresh' else 'cache-only-stale'
            return _national_response(cached,cache_state,cached_count=cached_count,newly_fetched_count=0)
        now=time.time()
        empty={
            'date':date_text,'fingerprint':fingerprint,'generated_at':datetime.now(timezone.utc).isoformat(),'generated_ts':now,
            'fresh_until':now,'stale_until':now,'points':points,'results':[],'complete':False,'cached_count':0,'version':APP_VERSION,
        }
        return _national_response(empty,'cache-miss',cached_count=0,newly_fetched_count=0)

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
        national_browser_cache_ttl_seconds=NATIONAL_OUTLOOK_CACHE_TTL,
        national_auto_refresh_enabled=NATIONAL_OUTLOOK_AUTO_REFRESH,
        national_refresh_interval_seconds=NATIONAL_OUTLOOK_REFRESH_INTERVAL,
        national_refresh_token_configured=bool(NATIONAL_CACHE_REFRESH_TOKEN),
        national_100_rolling_auto_cache=NATIONAL_100_ROLLING_AUTO_CACHE,
        national_100_rolling_days=NATIONAL_100_ROLLING_DAYS,
        national_100_rolling_dates_per_cycle=NATIONAL_100_ROLLING_DATES_PER_CYCLE,
        national_100_chunk_size=NATIONAL_OUTLOOK_CHUNK_SIZE,
        national_100_rolling_target_rows=NATIONAL_100_ROLLING_DAYS*len(_national_load_100_points()),
        national_nextday_100_seed_count=len(_national_load_100_points()),
        national_last_refresh_report=_national_last_refresh_report or None,
        national_refresh_runtime=_national_refresh_runtime_snapshot(),
        usage_logging=True,
        startup_optimization={"gzip_text_responses": True, "lazy_leaflet": True, "lazy_html2canvas": True},
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
        return _bytes_response(status, ctype, body, cache_control=(f"public, max-age={OPENMETEO_PROXY_CACHE_TTL}" if is_openmeteo else "public, max-age=60"))
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


# V1.4.250: water audit results live on the dedicated GitHub `water-cache` branch.
# This keeps scheduled cache commits away from main and prevents release ZIPs /
# normal application merges from rolling the accumulated audit back.
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

# V1.4.253: recent water-report search/status judgement removed; fixed water list is served by /api/water-mountain-index.

# V1.4.220: route live / road camera discovery.
CAMERA_MAX_RESULTS = int(os.environ.get("CAMERA_MAX_RESULTS", "12"))
CAMERA_POINT_LIMIT = int(os.environ.get("CAMERA_POINT_LIMIT", "7"))

def _camera_search_query(mountain: str, point_name: str) -> str:
    # One compact query per route point. Results are filtered again below.
    return f'"{point_name}" (ライブカメラ OR 道路カメラ OR 定点カメラ OR ライブ映像)'

def _camera_type(text: str) -> str:
    t = text.lower()
    if any(k in t for k in ("道路", "国道", "県道", "林道", "峠", "路面", "road")):
        return "road"
    if any(k in t for k in ("山小屋", "山荘", "ヒュッテ", "ロッジ", "小屋")):
        return "hut"
    if any(k in t for k in ("ロープウェイ", "観光", "スキー", "ビジターセンター")):
        return "tourism"
    if any(k in t for k in ("気象", "山岳", "積雪", "天候")):
        return "weather"
    return "other"

def _camera_official(host: str, text: str) -> bool:
    h = (host or "").lower()
    t = text.lower()
    if h.endswith(".go.jp") or h.endswith(".lg.jp"):
        return True
    if any(k in h for k in ("mlit.go.jp", "pref.", "city.", "town.", "vill.")):
        return True
    if any(k in t for k in ("国土交通省", "道路情報", "県公式", "市公式", "町公式", "村公式", "観光協会", "山荘", "山小屋")):
        return True
    return False

def _camera_useful(row: dict[str, Any]) -> bool:
    text = f'{row.get("title", "")} {row.get("snippet", "")}'
    return any(k in text for k in ("ライブカメラ", "道路カメラ", "監視カメラ", "カメラ画像", "路面状況", "道路情報カメラ", "定点カメラ", "webカメラ", "webcam", "ライブ映像"))

def _route_camera_points(points: list[dict[str, Any]]) -> list[dict[str, Any]]:
    if len(points) <= CAMERA_POINT_LIMIT:
        return points
    idxs = {0, len(points)-1}
    for i in range(1, CAMERA_POINT_LIMIT-1):
        idxs.add(round(i*(len(points)-1)/(CAMERA_POINT_LIMIT-1)))
    return [points[i] for i in sorted(idxs)[:CAMERA_POINT_LIMIT]]

def _search_cameras_for_point(mountain: str, point: dict[str, Any]) -> tuple[list[dict[str, Any]], str | None]:
    query = _camera_search_query(mountain, point["name"])
    try:
        rows = _bing_rss_search(query)
    except Exception as exc:
        return [], str(exc)
    out = []
    search_url = "https://www.bing.com/search?" + urllib.parse.urlencode({"q": query, "setlang": "ja-JP"})
    for row in rows:
        if not _camera_useful(row):
            continue
        text = f'{row.get("title", "")} {row.get("snippet", "")}'
        item = dict(row)
        item["near_point"] = point["name"]
        item["type"] = _camera_type(text)
        item["official"] = _camera_official(row.get("host", ""), text)
        item["search_url"] = search_url
        out.append(item)
    return out, None

# V1.4.221: lightweight route-extra availability probe.
# The client uses this only after a route settles, so water/camera buttons stay hidden
# unless at least one candidate is confirmed. Results are cached to avoid repeated
# network work while the user edits times on the same route.
ROUTE_EXTRA_AVAILABILITY_TTL = int(os.environ.get("ROUTE_EXTRA_AVAILABILITY_TTL", "1800"))
_route_extra_availability_cache: dict[str, tuple[float, dict[str, Any]]] = {}
_route_extra_availability_lock = threading.Lock()

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

def _availability_camera_points(points: list[dict[str, Any]]) -> list[dict[str, Any]]:
    # Availability should be materially cheaper than opening the full camera panel.
    # Probe at most start / middle / end; the full endpoint still searches up to 7 points.
    if len(points) <= 3:
        return points
    idxs = sorted({0, len(points)//2, len(points)-1})
    return [points[i] for i in idxs]

@app.post("/api/route-extras-availability")
def route_extras_availability():
    payload = request.get_json(silent=True) or {}
    mountain = str(payload.get("mountain") or "").strip()[:80]
    raw_points = payload.get("points") or []
    points: list[dict[str, Any]] = []
    for row in raw_points[:24]:
        try:
            lat, lon = float(row.get("lat")), float(row.get("lon"))
        except (TypeError, ValueError, AttributeError):
            continue
        if not (-90 <= lat <= 90 and -180 <= lon <= 180):
            continue
        points.append({"name": str(row.get("name") or "通過地点").strip()[:100], "lat": lat, "lon": lon})
    if not mountain or len(points) < 1:
        return jsonify(ok=True, water=False, camera=False, ready=False)

    key = _route_extra_availability_key(mountain, points)
    cached = _route_extra_availability_get(key)
    if cached is not None:
        cached["cached"] = True
        return jsonify(cached)

    water = False
    camera = False
    diagnostics: list[str] = []

    # Run the two independent checks concurrently. Water discovery already uses the
    # existing Overpass cache; camera searches reuse the existing Bing RSS cache.
    def check_water() -> bool:
        try:
            waters, errs = _discover_water_sources(points)
            if errs:
                diagnostics.extend([f"water: {x}" for x in errs[-1:]])
            return bool(waters)
        except Exception as exc:
            diagnostics.append(f"water: {exc}")
            return False

    # V1.4.224: live-camera visibility is decided from the verified fixed catalog
    # in camera-data.js. Do not run a web search during availability probes.
    try:
        water = bool(check_water())
    except Exception as exc:
        diagnostics.append(f"water: {exc}")
    camera = False

    result = {
        "ok": True, "ready": True, "water": water, "camera": camera,
        "checked_points": len(points), "cached": False,
        "partial": bool(diagnostics), "diagnostics": diagnostics[-3:],
    }
    _route_extra_availability_put(key, result)
    return jsonify(result)

@app.post("/api/route-cameras")
def route_cameras():
    payload = request.get_json(silent=True) or {}
    mountain = str(payload.get("mountain") or "").strip()[:80]
    raw_points = payload.get("points") or []
    points: list[dict[str, Any]] = []
    for row in raw_points[:24]:
        try:
            lat, lon = float(row.get("lat")), float(row.get("lon"))
        except (TypeError, ValueError, AttributeError):
            continue
        if not (-90 <= lat <= 90 and -180 <= lon <= 180):
            continue
        name = str(row.get("name") or "通過地点").strip()[:100]
        points.append({"name": name, "lat": lat, "lon": lon})
    if not mountain or len(points) < 1:
        return jsonify(error="山と座標付き地点を1地点以上設定してください。"), 400

    selected = _route_camera_points(points)
    found: list[dict[str, Any]] = []
    errors: list[str] = []
    with ThreadPoolExecutor(max_workers=min(6, len(selected)), thread_name_prefix="traten-camera") as ex:
        futs = {ex.submit(_search_cameras_for_point, mountain, pt): pt for pt in selected}
        for fut in as_completed(futs):
            pt = futs[fut]
            try:
                rows, err = fut.result()
            except Exception as exc:
                rows, err = [], str(exc)
            found.extend(rows)
            if err:
                errors.append(f'{pt["name"]}: {err}')

    # Deduplicate by destination URL, while preferring official/public-authority candidates.
    dedup: dict[str, dict[str, Any]] = {}
    for row in found:
        url = row.get("url") or ""
        if not url:
            continue
        old = dedup.get(url)
        if old is None or (row.get("official") and not old.get("official")):
            dedup[url] = row
    cameras = list(dedup.values())
    type_rank = {"road": 0, "hut": 1, "weather": 2, "tourism": 3, "other": 4}
    cameras.sort(key=lambda x: (0 if x.get("official") else 1, type_rank.get(x.get("type"), 9), x.get("near_point", "")))
    cameras = cameras[:CAMERA_MAX_RESULTS]

    search_links = []
    for pt in selected[:6]:
        q = f'"{pt["name"]}" (ライブカメラ OR 道路カメラ OR 定点カメラ)'
        search_links.append({"label": f'{pt["name"]}のカメラを検索', "url": "https://www.bing.com/search?" + urllib.parse.urlencode({"q": q, "setlang": "ja-JP"})})

    return jsonify({
        "ok": True, "mountain": mountain,
        "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "cameras": cameras, "search_links": search_links,
        "notes": [
            "通過地点名と山名から、ライブカメラ・道路カメラ・林道・山小屋等の公開ページを検索しています。",
            "カメラ画像や映像自体はトラテンに転載せず、提供元の公開ページへのリンクだけを表示します。",
            "検索結果は候補表示です。撮影地点・撮影方向・更新日時・冬季停止等はリンク先の提供元情報を確認してください。",
        ],
        "partial": bool(errors),
        "diagnostics": {"search_errors": errors[-5:], "searched_points": [p["name"] for p in selected]},
    })

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


@app.get("/api/tenkura-link")
def tenkura_link():
    mountain = (request.args.get("mountain") or "").strip()
    area = (request.args.get("area") or "").strip()
    if not mountain or len(mountain) > 80:
        return jsonify(ok=False, error="mountain is required"), 400
    try:
        result = _resolve_tenkura_link(mountain, area)
    except Exception as exc:
        return jsonify(ok=False, available=False, error=str(exc)[:300]), 502
    response = jsonify(ok=True, available=bool(result), mountain=mountain, result=result)
    response.headers["Cache-Control"] = "public, max-age=21600"
    return response


@app.get("/api/weathernews-link")
def weathernews_link():
    mountain = (request.args.get("mountain") or "").strip()
    if not mountain or len(mountain) > 80:
        return jsonify(ok=False, error="mountain is required"), 400
    result = _resolve_external_mountain_link("weathernews", mountain)
    response = jsonify(ok=True, available=bool(result), mountain=mountain, result=result)
    response.headers["Cache-Control"] = "public, max-age=21600"
    return response


@app.get("/api/tenkijp-link")
def tenkijp_link():
    mountain = (request.args.get("mountain") or "").strip()
    if not mountain or len(mountain) > 80:
        return jsonify(ok=False, error="mountain is required"), 400
    result = _resolve_external_mountain_link("tenkijp", mountain)
    response = jsonify(ok=True, available=bool(result), mountain=mountain, result=result)
    response.headers["Cache-Control"] = "public, max-age=21600"
    return response


def _index_response():
    response = send_from_directory(BASE, "index.html")
    # HTML must always revalidate. Versioned JS/CSS assets can remain immutable,
    # but the document itself carries the cache-buster query strings.
    response.headers["Cache-Control"] = "no-store, no-cache, max-age=0, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


@app.get("/")
def index():
    return _index_response()


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


PUBLIC_FILES = {"app.js", "styles.css", "ui-v1.4.254.css", "access.js", "access-data.js", "access.css", "camera-data.js", "live-cameras.js", "live-cameras.css", "live-cameras.html", "water-sources.html", "water-sources.js", "water-sources.css", "water-mountain-cache.json", "trailheads.html", "trailheads.js", "huts.html", "huts.js", "hut-data.js", "resource-index.css", "resource-mountain-data.js", "trailhead-access.html", "trailhead-access.js", "favicon.ico", "robots.txt", "sitemap.xml", "guide.html", "manifest.json", "google5a7b3dfd79ff97f0.html", "BingSiteAuth.xml", INDEXNOW_KEY_FILENAME}
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
            # Versioned asset URLs (?v=...) are immutable. A new app version changes
            # the query string, so repeat launches can reuse the local copy safely.
            if request.args.get("v"):
                response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
            else:
                response.headers["Cache-Control"] = "public, max-age=3600"
        return response
    return _index_response()


@app.after_request
def security_headers(response: Response):
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
    response.headers.setdefault("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
    if request.path in {"/", "/guide.html"}:
        response.headers.setdefault("X-Robots-Tag", "index, follow, max-image-preview:large")

    # V1.4.208: compress first-party text assets. app.js and styles.css have grown
    # with nationwide fixed data; gzip cuts the transfer size to roughly one quarter.
    # Skip streaming/range/empty responses and already-compressed payloads.
    accept_encoding = request.headers.get("Accept-Encoding", "")
    content_type = (response.content_type or "").lower()
    compressible = any(token in content_type for token in (
        "text/", "javascript", "json", "xml", "svg"
    ))
    if (
        "gzip" in accept_encoding.lower()
        and compressible
        and response.status_code == 200
        and not response.headers.get("Content-Encoding")
        and "Content-Range" not in response.headers
    ):
        try:
            response.direct_passthrough = False
            data = response.get_data()
            if len(data) >= 1024:
                packed = gzip.compress(data, compresslevel=6)
                if len(packed) < len(data):
                    response.set_data(packed)
                    response.headers["Content-Encoding"] = "gzip"
                    response.headers["Content-Length"] = str(len(packed))
                    vary = response.headers.get("Vary", "")
                    if "Accept-Encoding" not in vary:
                        response.headers["Vary"] = (vary + ", Accept-Encoding").strip(", ")
        except Exception:
            # Compression is an optimization only; never break a response because of it.
            pass
    return response


# V1.4.193: start the cache watcher immediately when each Gunicorn worker imports
# the app. An OS-level lock makes exactly one worker the background-loop owner.
# before_request above provides failover after Render wakes or a worker restarts.
if NATIONAL_OUTLOOK_AUTO_REFRESH:
    _ensure_national_refresh_worker()


if __name__ == "__main__":
    print(f"Mountain Weather Decision V{APP_VERSION}")
    print(f"Open http://localhost:{PORT}")
    print("Stop: Ctrl+C")
    app.run(host="0.0.0.0", port=PORT, threaded=True, debug=False)
