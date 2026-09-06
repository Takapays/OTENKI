from __future__ import annotations

import hashlib
import math
import shutil
import struct
import subprocess
import wave
import hmac
import io
import json
import os
import tempfile
import time
import threading
import gc
import urllib.parse
import urllib.request
from datetime import date, datetime
from typing import Any, Callable

try:
    from PIL import Image, ImageDraw, ImageFont
except Exception:  # pragma: no cover - server.py handles disabled state gracefully
    Image = ImageDraw = ImageFont = None


GRAPH_API_VERSION = os.environ.get("INSTAGRAM_GRAPH_API_VERSION", "v24.0").strip() or "v24.0"
GRAPH_BASE_URL = os.environ.get("INSTAGRAM_GRAPH_BASE_URL", "https://graph.instagram.com").rstrip("/")
INSTAGRAM_USER_ID = os.environ.get("INSTAGRAM_USER_ID", "").strip()
INSTAGRAM_ACCESS_TOKEN = os.environ.get("INSTAGRAM_ACCESS_TOKEN", "").strip()
PUBLIC_BASE_URL = os.environ.get("PUBLIC_BASE_URL", "https://otenki.onrender.com").rstrip("/")
INSTAGRAM_AUTO_POST = os.environ.get("INSTAGRAM_AUTO_POST", "0").lower() not in {"0", "false", "no", "off", ""}
INSTAGRAM_AUTO_POST_HOUR_JST = max(0, min(23, int(os.environ.get("INSTAGRAM_AUTO_POST_HOUR_JST", "17"))))
INSTAGRAM_SITE_URL = os.environ.get("INSTAGRAM_SITE_URL", "https://otenki.onrender.com/").strip() or "https://otenki.onrender.com/"
INSTAGRAM_IMAGE_SECRET = os.environ.get("INSTAGRAM_IMAGE_SECRET", "").strip()
INSTAGRAM_FONT_PATH = os.environ.get("INSTAGRAM_FONT_PATH", "").strip()
INSTAGRAM_HTTP_TIMEOUT = max(5, min(60, int(os.environ.get("INSTAGRAM_HTTP_TIMEOUT", "25"))))
INSTAGRAM_MIN_NATIONAL_RESULTS = max(1, min(100, int(os.environ.get("INSTAGRAM_MIN_NATIONAL_RESULTS", "98"))))
INSTAGRAM_AUTO_MEDIA = (os.environ.get("INSTAGRAM_AUTO_MEDIA", "reel").strip().lower() or "reel")
INSTAGRAM_REEL_FPS = max(8, min(20, int(os.environ.get("INSTAGRAM_REEL_FPS", "12"))))
INSTAGRAM_REEL_SECONDS = max(6, min(12, int(os.environ.get("INSTAGRAM_REEL_SECONDS", "12"))))
REEL_RENDER_REV = "master-20260905-scenes-v7-similarityfit-rishiri-yakushima"

_STATE_FILE = os.path.join(tempfile.gettempdir(), "traten-instagram-state.json")

_reel_render_locks_lock = threading.Lock()
_reel_render_locks: dict[str, threading.Lock] = {}


def _reel_render_lock(date_text: str) -> threading.Lock:
    with _reel_render_locks_lock:
        lock = _reel_render_locks.get(date_text)
        if lock is None:
            lock = threading.Lock()
            _reel_render_locks[date_text] = lock
        return lock


def _master_scene_path(page: int) -> str:
    if int(page) == 1:
        return os.path.join(os.path.dirname(__file__), "reel_master_scene1.png")
    if int(page) == 2:
        return os.path.join(os.path.dirname(__file__), "reel_master_scene2.png")
    raise ValueError("invalid page")


def _load_master_scene(page: int) -> str:
    path = _master_scene_path(page)
    if not os.path.exists(path):
        raise RuntimeError(f"master scene asset is missing: {os.path.basename(path)}")
    return path


def _dynamic_scene1_template_path() -> str:
    path = os.path.join(os.path.dirname(__file__), "reel_scene1_dynamic_template.png")
    if not os.path.exists(path):
        raise RuntimeError("dynamic scene1 template asset is missing: reel_scene1_dynamic_template.png")
    return path


_fixed_marker_positions_cache: dict[str, tuple[int, int]] | None = None


def _fixed_marker_positions() -> dict[str, tuple[int, int]]:
    global _fixed_marker_positions_cache
    if _fixed_marker_positions_cache is not None:
        return _fixed_marker_positions_cache
    path = os.path.join(os.path.dirname(__file__), "reel_mountain_marker_positions.json")
    try:
        with open(path, "r", encoding="utf-8") as f:
            rows = json.load(f)
    except Exception as exc:
        raise RuntimeError(f"fixed marker master could not be loaded: {exc}")
    out: dict[str, tuple[int, int]] = {}
    for row in rows if isinstance(rows, list) else []:
        if not isinstance(row, dict):
            continue
        name = str(row.get("name") or "")
        try:
            x = int(row.get("x")); y = int(row.get("y"))
        except (TypeError, ValueError):
            continue
        if name and 0 <= x <= 864 and 0 <= y <= 1536:
            out[name] = (x, y)
    if len(out) < INSTAGRAM_MIN_NATIONAL_RESULTS:
        raise RuntimeError(f"fixed marker master is incomplete: {len(out)} positions")
    # Guard against an accidentally shuffled name-to-position table.  These anchor mountains
    # must remain in their expected broad parts of the approved artwork.
    anchors = {
        "利尻山": (560, 330, 700, 390),
        "羅臼岳": (740, 380, 840, 450),
        "岩木山": (540, 600, 650, 700),
        "富士山": (430, 950, 520, 1040),
        "大山（鳥取）": (280, 970, 360, 1060),
        "石鎚山": (180, 1080, 270, 1180),
        "阿蘇山（高岳）": (90, 1130, 180, 1235),
        "宮ノ浦岳": (80, 1290, 150, 1360),
    }
    for name, (xmin, ymin, xmax, ymax) in anchors.items():
        pos = out.get(name)
        if pos is None or not (xmin <= pos[0] <= xmax and ymin <= pos[1] <= ymax):
            raise RuntimeError(f"fixed marker master sanity check failed: {name}={pos}")
    _fixed_marker_positions_cache = out
    return out


def _latlon_to_scene1_px(lat: float, lon: float, W: int, H: int) -> tuple[int, int]:
    """
    Start from the V1.5.204 projection (the user's preferred "second attached image"),
    then apply one coherent transform to the ENTIRE marker layer.

    The global transform is calibrated from two end anchors on the artwork:
      - 利尻山 -> 利尻島
      - 宮ノ浦岳 -> 屋久島

    No per-mountain fixed slots are used here.
    """
    # V1.5.204 base projection
    north, south, west, east = 46.2, 30.0, 128.0, 146.0
    x1, x2 = int(W * 0.023), int(W * 0.972)
    y1, y2 = int(H * 0.195), int(H * 0.882)
    base_x = x1 + (lon - west) / (east - west) * (x2 - x1)
    base_px = base_x - (W / 864.0) * 4.0 * (45.0 - lat)
    base_py = y1 + (north - lat) / (north - south) * (y2 - y1)

    # Global fit on the 864x1536 approved artwork.
    # V1.5.204 anchor projections:
    #   利尻山   ~= (623, 366) -> artwork 利尻島 ~= (641, 299)
    #   宮ノ浦岳 ~= ( 74,1332) -> artwork 屋久島 ~= (126,1375)
    #
    # IMPORTANT: use ONE similarity transform (uniform scale + rotation + translation).
    # The previous independent X/Y scaling matched both end anchors but stretched the
    # marker layer vertically and compressed it horizontally, which made the A/B/C
    # positions drift away from the map through Honshu/Shikoku/Kyushu.
    p1x, p1y = 623.0, 366.0
    p2x, p2y = 74.0, 1332.0
    q1x, q1y = 641.0, 299.0
    q2x, q2y = 126.0, 1375.0

    dpx, dpy = p2x - p1x, p2y - p1y
    dqx, dqy = q2x - q1x, q2y - q1y
    denom = dpx * dpx + dpy * dpy
    a = (dqx * dpx + dqy * dpy) / denom
    b = (dqy * dpx - dqx * dpy) / denom
    tx = q1x - (a * p1x - b * p1y)
    ty = q1y - (b * p1x + a * p1y)

    px = int(round(a * base_px - b * base_py + tx))
    py = int(round(b * base_px + a * base_py + ty))
    return px, py


def _draw_scene1_grade_marker(draw, x: int, y: int, grade: str, radius: int = 20):
    colors = {"A": (31, 143, 84, 255), "B": (225, 158, 18, 255), "C": (205, 61, 64, 255)}
    grade = str(grade or "").upper()
    if grade not in colors:
        return
    c = colors[grade]
    shadow = 3
    draw.ellipse((x-radius-shadow, y-radius-shadow+3, x+radius+shadow, y+radius+shadow+3), fill=(0,0,0,50))
    draw.ellipse((x-radius-3, y-radius-3, x+radius+3, y+radius+3), fill=(255,255,255,245))
    draw.ellipse((x-radius, y-radius, x+radius, y+radius), fill=c)
    f = _load_font(max(22, int(radius * 1.06)))
    bb = draw.textbbox((0, 0), grade, font=f)
    draw.text((x-(bb[2]-bb[0])/2, y-(bb[3]-bb[1])/2-2), grade, font=f, fill=(255,255,255,255))


def build_dynamic_scene1(target: date, rows: list[dict[str, Any]]) -> "Image.Image":
    if Image is None or ImageDraw is None:
        raise RuntimeError("Pillow is not installed")
    base = Image.open(_dynamic_scene1_template_path()).convert("RGBA").resize((864, 1536), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(base, "RGBA")

    date_text = f"{target.month}/{target.day} 明日の登山コンディション"
    draw.text((48, 278), date_text, font=_load_font(33), fill=(14, 117, 63, 255))

    # Important: this deliberately restores the V1.5.204 style of placement:
    # lat/lon projection + ONE global transform for the entire layer.
    # Do not use the fixed marker master here.
    plotted = 0
    for row in rows:
        try:
            lat = float(row.get("lat"))
            lon = float(row.get("lon"))
            grade = str(row.get("grade") or "").upper()
        except Exception:
            continue
        if grade not in {"A", "B", "C"}:
            continue
        x, y = _latlon_to_scene1_px(lat, lon, 864, 1536)
        if 0 <= x <= 864 and 0 <= y <= 1536:
            _draw_scene1_grade_marker(draw, x, y, grade, radius=18)
            plotted += 1
    if plotted < INSTAGRAM_MIN_NATIONAL_RESULTS:
        raise RuntimeError(f"scene1 marker plotting incomplete: {plotted}")
    return base.convert("RGB")


def configured() -> bool:
    return bool(INSTAGRAM_USER_ID and INSTAGRAM_ACCESS_TOKEN and PUBLIC_BASE_URL)


def image_secret() -> bytes:
    secret = INSTAGRAM_IMAGE_SECRET or INSTAGRAM_ACCESS_TOKEN
    return secret.encode("utf-8")


def image_signature(date_text: str) -> str:
    if not image_secret():
        return ""
    return hmac.new(image_secret(), f"traten-national:{date_text}".encode("utf-8"), hashlib.sha256).hexdigest()[:32]


def valid_image_signature(date_text: str, supplied: str) -> bool:
    expected = image_signature(date_text)
    return bool(expected and supplied and hmac.compare_digest(expected, supplied))


def image_url(date_text: str) -> str:
    sig = image_signature(date_text)
    return f"{PUBLIC_BASE_URL}/api/instagram/national-image/{urllib.parse.quote(date_text)}?sig={urllib.parse.quote(sig)}"


def static_image_signature(date_text: str, page: int) -> str:
    if not image_secret():
        return ""
    payload = f"traten-national-static:{date_text}:{int(page)}"
    return hmac.new(image_secret(), payload.encode("utf-8"), hashlib.sha256).hexdigest()[:32]


def valid_static_image_signature(date_text: str, page: int, supplied: str) -> bool:
    expected = static_image_signature(date_text, page)
    return bool(expected and supplied and hmac.compare_digest(expected, supplied))


def static_image_url(date_text: str, page: int) -> str:
    sig = static_image_signature(date_text, page)
    return f"{PUBLIC_BASE_URL}/api/instagram/national-static/{urllib.parse.quote(date_text)}/{int(page)}?sig={urllib.parse.quote(sig)}"


def static_image_urls(date_text: str) -> list[str]:
    return [static_image_url(date_text, 1), static_image_url(date_text, 2)]


def reel_signature(date_text: str) -> str:
    if not image_secret():
        return ""
    return hmac.new(image_secret(), f"traten-national-reel:{date_text}".encode("utf-8"), hashlib.sha256).hexdigest()[:32]


def valid_reel_signature(date_text: str, supplied: str) -> bool:
    expected = reel_signature(date_text)
    return bool(expected and supplied and hmac.compare_digest(expected, supplied))


def reel_url(date_text: str) -> str:
    sig = reel_signature(date_text)
    return f"{PUBLIC_BASE_URL}/api/instagram/national-reel/{urllib.parse.quote(date_text)}?sig={urllib.parse.quote(sig)}"


def _bundled_japanese_font_path() -> str:
    """Return a Japanese-capable font installed via japanize-matplotlib."""
    try:
        import importlib.util
        spec = importlib.util.find_spec("japanize_matplotlib")
        if spec and spec.origin:
            candidate = os.path.join(os.path.dirname(spec.origin), "fonts", "ipaexg.ttf")
            if os.path.exists(candidate):
                return candidate
    except Exception:
        pass
    return ""


def _font_candidates() -> list[str]:
    return [
        INSTAGRAM_FONT_PATH,
        _bundled_japanese_font_path(),
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
        "/usr/share/fonts/truetype/noto/NotoSansJP-Bold.ttf",
        "/usr/share/fonts/truetype/noto/NotoSansJP-Regular.ttf",
        "/usr/share/fonts/truetype/fonts-japanese-gothic.ttf",
        "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc",
        "/System/Library/Fonts/Hiragino Sans GB.ttc",
    ]


def _load_font(size: int):
    if ImageFont is None:
        raise RuntimeError("Pillow is not installed")
    attempted = []
    for path in _font_candidates():
        if not path:
            continue
        attempted.append(path)
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size=size, index=0)
            except Exception:
                continue
    raise RuntimeError(
        "Japanese font is unavailable for Instagram image generation. "
        "Install japanize-matplotlib or set INSTAGRAM_FONT_PATH to a Japanese-capable font. "
        f"attempted={attempted}"
    )


def _fit_text(draw, text: str, max_width: int, start_size: int, min_size: int = 22):
    size = start_size
    while size > min_size:
        font = _load_font(size)
        if draw.textbbox((0, 0), text, font=font)[2] <= max_width:
            return font
        size -= 2
    return _load_font(min_size)


def _rounded_box(draw, xy, radius: int, fill, outline=None, width: int = 1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def render_national_image(date_text: str, results: list[dict[str, Any]], *, logo_path: str | None = None) -> bytes:
    if Image is None or ImageDraw is None:
        raise RuntimeError("Pillow is not installed")
    try:
        target = date.fromisoformat(date_text)
    except ValueError as exc:
        raise RuntimeError("invalid date") from exc

    rows = [dict(r) for r in results if isinstance(r, dict) and str(r.get("grade") or "") in {"A", "B", "C"}]
    counts = {g: sum(1 for r in rows if r.get("grade") == g) for g in "ABC"}
    total = sum(counts.values())
    if total < INSTAGRAM_MIN_NATIONAL_RESULTS:
        raise RuntimeError(f"national image requires at least {INSTAGRAM_MIN_NATIONAL_RESULTS} results, got {total}")

    W, H = 1080, 1350
    img = Image.new("RGB", (W, H), (245, 248, 251))
    draw = ImageDraw.Draw(img)

    # Header
    draw.rectangle((0, 0, W, 245), fill=(255, 255, 255))
    if logo_path and os.path.exists(logo_path):
        try:
            logo = Image.open(logo_path).convert("RGBA")
            logo.thumbnail((330, 190))
            img.paste(logo, (58, 28), logo)
        except Exception:
            pass

    title_font = _load_font(54)
    sub_font = _load_font(28)
    date_font = _load_font(38)
    draw.text((430, 54), "日本百名山 全国分析", font=title_font, fill=(8, 54, 92))
    draw.text((432, 127), "翌日の登山コンディションを百名山で比較", font=sub_font, fill=(65, 82, 96))
    draw.text((432, 171), f"{target.year}/{target.month}/{target.day}", font=date_font, fill=(8, 54, 92))

    # Grade cards
    grade_colors = {
        "A": ((20, 134, 76), (225, 246, 233)),
        "B": ((205, 133, 16), (255, 246, 219)),
        "C": ((194, 55, 55), (255, 232, 232)),
    }
    card_y1, card_y2 = 290, 565
    gap = 28
    margin = 58
    card_w = (W - margin * 2 - gap * 2) // 3
    grade_big_font = _load_font(92)
    count_font = _load_font(65)
    label_font = _load_font(27)
    labels = {"A": "比較的好条件", "B": "注意条件あり", "C": "厳しい条件"}
    for idx, grade in enumerate("ABC"):
        x1 = margin + idx * (card_w + gap)
        x2 = x1 + card_w
        fg, bg = grade_colors[grade]
        _rounded_box(draw, (x1, card_y1, x2, card_y2), 28, bg, outline=fg, width=3)
        draw.text((x1 + 30, card_y1 + 22), grade, font=grade_big_font, fill=fg)
        count_text = str(counts[grade])
        bbox = draw.textbbox((0, 0), count_text, font=count_font)
        draw.text((x2 - 28 - (bbox[2] - bbox[0]), card_y1 + 43), count_text, font=count_font, fill=fg)
        draw.text((x1 + 30, card_y1 + 145), "座", font=label_font, fill=fg)
        pct = round(counts[grade] / total * 100)
        draw.text((x1 + 30, card_y1 + 190), f"{pct}%  {labels[grade]}", font=_fit_text(draw, f"{pct}%  {labels[grade]}", card_w - 60, 27, 20), fill=(55, 68, 78))

    # Mountain lists: concise, high-value teaser rather than reproducing the whole site.
    a_names = [str(r.get("name") or "") for r in rows if r.get("grade") == "A"][:8]
    c_names = [str(r.get("name") or "") for r in rows if r.get("grade") == "C"][:8]
    section_font = _load_font(34)
    list_font = _load_font(27)
    x_left, x_right = 58, 554
    y = 625
    draw.text((x_left, y), "A判定の例", font=section_font, fill=(20, 110, 70))
    draw.text((x_right, y), "C判定の例", font=section_font, fill=(170, 55, 55))
    y += 58
    for i in range(8):
        left = a_names[i] if i < len(a_names) else "—"
        right = c_names[i] if i < len(c_names) else "—"
        draw.text((x_left, y + i * 43), f"・{left}", font=_fit_text(draw, f"・{left}", 440, 27, 20), fill=(40, 57, 70))
        draw.text((x_right, y + i * 43), f"・{right}", font=_fit_text(draw, f"・{right}", 440, 27, 20), fill=(40, 57, 70))

    # CTA/footer
    footer_top = 1060
    draw.rectangle((0, footer_top, W, H), fill=(8, 54, 92))
    cta_font = _load_font(42)
    body_font = _load_font(27)
    draw.text((58, footer_top + 42), "山ごとの時間帯・風・雨・気温はトラテンへ", font=cta_font, fill=(255, 255, 255))
    draw.text((58, footer_top + 112), "プロフィールのリンクから詳細を確認", font=body_font, fill=(224, 237, 246))
    draw.text((58, footer_top + 165), "otenki.onrender.com", font=_load_font(31), fill=(255, 194, 34))
    draw.text((58, footer_top + 220), "※全国判定は登山可否を保証するものではありません。最新情報も確認してください。", font=_load_font(20), fill=(205, 220, 231))

    out = io.BytesIO()
    img.save(out, format="JPEG", quality=91, optimize=True, progressive=True)
    return out.getvalue()


def _lonlat_to_world_px(lat: float, lon: float, zoom: int) -> tuple[float, float]:
    n = 2 ** zoom
    x = (lon + 180.0) / 360.0 * n * 256.0
    lat = max(-85.05112878, min(85.05112878, lat))
    r = math.radians(lat)
    y = (1.0 - math.asinh(math.tan(r)) / math.pi) / 2.0 * n * 256.0
    return x, y


def _fetch_gsi_tile(z: int, x: int, y: int) -> "Image.Image":
    cache_dir = os.path.join(tempfile.gettempdir(), "traten-gsi-tiles")
    os.makedirs(cache_dir, exist_ok=True)
    path = os.path.join(cache_dir, f"std-{z}-{x}-{y}.png")
    if not os.path.exists(path):
        req = urllib.request.Request(
            f"https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
            headers={"User-Agent": "Traten/1.5.85 (+https://otenki.onrender.com/)"},
        )
        try:
            with urllib.request.urlopen(req, timeout=15) as r, open(path + ".tmp", "wb") as f:
                f.write(r.read())
            os.replace(path + ".tmp", path)
        except Exception:
            try: os.remove(path + ".tmp")
            except Exception: pass
            return Image.new("RGB", (256, 256), (218, 236, 246))
    try:
        return Image.open(path).convert("RGB")
    except Exception:
        return Image.new("RGB", (256, 256), (218, 236, 246))


def _render_japan_map(results: list[dict[str, Any]], width: int, height: int) -> "Image.Image":
    # Bundled Japan base map guarantees a usable Reel even if an external tile server is unavailable.
    north, south, west, east = 46.2, 29.0, 127.0, 146.8
    base_path = os.path.join(os.path.dirname(__file__), "instagram-japan-base.png")
    if os.path.exists(base_path):
        crop = Image.open(base_path).convert("RGB").resize((width, height), Image.Resampling.LANCZOS)
    else:
        crop = Image.new("RGB", (width, height), (207, 234, 245))
    d = ImageDraw.Draw(crop, "RGBA")
    grade_colors = {"A": (22, 142, 83, 255), "B": (220, 153, 12, 255), "C": (205, 62, 62, 255)}
    font = _load_font(max(22, width // 25))
    r = max(17, width // 36)
    for row in results:
        try:
            lat, lon = float(row.get("lat")), float(row.get("lon"))
            grade = str(row.get("grade") or "")
        except Exception:
            continue
        if grade not in grade_colors: continue
        px = int((lon-west)/(east-west)*width)
        py = int((north-lat)/(north-south)*height)
        if not (-r <= px <= width+r and -r <= py <= height+r): continue
        d.ellipse((px-r-3,py-r-3,px+r+3,py+r+3), fill=(255,255,255,235))
        d.ellipse((px-r,py-r,px+r,py+r), fill=grade_colors[grade])
        bbox=d.textbbox((0,0), grade, font=font)
        d.text((px-(bbox[2]-bbox[0])/2, py-(bbox[3]-bbox[1])/2-2), grade, font=font, fill=(255,255,255,255))
    d.rounded_rectangle((12,height-36,142,height-10), radius=8, fill=(255,255,255,205))
    d.text((22,height-34), "全国マップ", font=_load_font(18), fill=(50,70,84,255))
    return crop


def _write_original_bgm(path: str, seconds: int) -> None:
    sr = 44100
    bpm = 112.0
    beat = 60.0 / bpm
    chords = [
        (174.61,220.00,261.63,329.63),
        (220.00,261.63,329.63,392.00),
        (261.63,329.63,392.00,493.88),
        (196.00,246.94,293.66,329.63),
    ]
    melody = (659.25,783.99,880.00,783.99,659.25,587.33,523.25,587.33)
    total = int(sr * seconds)
    with wave.open(path, "wb") as wf:
        wf.setnchannels(2); wf.setsampwidth(2); wf.setframerate(sr)
        block=[]
        for i in range(total):
            t=i/sr
            ci=min(3,int(t/(seconds/4.0)))
            local=t-ci*(seconds/4.0)
            v=0.0
            for f in chords[ci]:
                v += 0.035*math.sin(2*math.pi*f*local) + 0.010*math.sin(2*math.pi*f*1.004*local)
            # soft electronic pulse and pluck
            pos=t%beat
            if pos<0.16:
                v += 0.075*math.sin(2*math.pi*(55+45*math.exp(-18*pos))*pos)*math.exp(-20*pos)
            step=int(t/(beat/2.0))
            pl=t-step*(beat/2.0)
            if pl<0.16:
                f=melody[step%len(melody)]
                v += 0.032*math.sin(2*math.pi*f*pl)*math.exp(-12*pl)
            fade=min(1.0,t/0.35,(seconds-t)/0.55)
            v=max(-0.75,min(0.75,v*fade))
            left=int(v*32767); right=int(v*0.96*32767)
            block.append(struct.pack('<hh',left,right))
            if len(block)>=4096:
                wf.writeframes(b''.join(block)); block=[]
        if block: wf.writeframes(b''.join(block))


def _draw_reel_starburst(draw, cx: int, cy: int, r_outer: int, r_inner: int, fill):
    pts=[]
    for i in range(28):
        a=-math.pi/2 + i*math.pi/14
        r=r_outer if i%2==0 else r_inner
        pts.append((cx+math.cos(a)*r, cy+math.sin(a)*r))
    draw.polygon(pts, fill=fill)


def _draw_reel_grade_marker(draw, x: int, y: int, grade: str, radius: int = 26):
    colors={"A":(31,143,84,255),"B":(225,158,18,255),"C":(205,61,64,255)}
    c=colors[grade]
    draw.ellipse((x-radius-4,y-radius-4,x+radius+4,y+radius+4),fill=(255,255,255,245))
    draw.ellipse((x-radius,y-radius,x+radius,y+radius),fill=c)
    f=_load_font(int(radius*1.12))
    bb=draw.textbbox((0,0),grade,font=f)
    draw.text((x-(bb[2]-bb[0])/2,y-(bb[3]-bb[1])/2-2),grade,font=f,fill=(255,255,255,255))


def _draw_reel_footer(draw, W: int, H: int):
    y=H-142
    draw.rectangle((0,y,W,H),fill=(4,34,63,255))
    # simple mountain mark
    draw.line((38,y+86,86,y+34,118,y+70,148,y+49,194,y+88),fill=(255,255,255,255),width=8,joint="curve")
    draw.arc((35,y+72,196,y+126),180,360,fill=(55,170,93,255),width=7)
    draw.text((226,y+45),"トラテン",font=_load_font(48),fill=(255,255,255,255))
    draw.text((520,y+53),"登る前に、トラテン。",font=_load_font(30),fill=(255,255,255,235))


def _draw_reel_legend(draw, x: int, y: int):
    draw.rounded_rectangle((x,y,x+560,y+250),radius=26,fill=(255,255,255,238))
    rows=[("A","良い","絶好の登山日和！"),("B","まずまず","注意して楽しめる"),("C","注意","無理せず計画を再検討")]
    for i,(g,l1,l2) in enumerate(rows):
        yy=y+48+i*70
        _draw_reel_grade_marker(draw,x+46,yy,g,22)
        fg={"A":(28,137,80,255),"B":(218,147,8,255),"C":(198,58,62,255)}[g]
        draw.text((x+88,yy-20),l1,font=_load_font(24),fill=fg)
        draw.text((x+230,yy-17),l2,font=_load_font(20),fill=(40,55,69,255))


def _draw_reel_feature_icon(draw, kind: int, cx: int, cy: int):
    green=(18,121,78,255); navy=(9,55,91,255); pale=(232,244,239,255)
    draw.ellipse((cx-38,cy-38,cx+38,cy+38),fill=pale)
    if kind==1:  # Japan/map pins
        draw.polygon([(cx-14,cy-26),(cx+4,cy-18),(cx+13,cy-2),(cx+1,cy+24),(cx-18,cy+15),(cx-24,cy-4)],fill=green)
        draw.ellipse((cx+12,cy-27,cx+30,cy-9),fill=navy)
    elif kind==2:  # route/pin
        draw.line((cx-24,cy+16,cx-4,cy-4,cx+18,cy+13),fill=green,width=6)
        draw.ellipse((cx-28,cy-30,cx-8,cy-10),outline=navy,width=5)
        draw.ellipse((cx+10,cy-5,cx+30,cy+15),outline=navy,width=5)
    elif kind==3:  # weather
        draw.ellipse((cx-26,cy-18,cx-2,cy+6),fill=navy)
        draw.ellipse((cx-10,cy-25,cx+16,cy+7),fill=navy)
        draw.rectangle((cx-25,cy-2,cx+20,cy+10),fill=navy)
        draw.line((cx-17,cy+18,cx-23,cy+31),fill=green,width=5)
        draw.line((cx+1,cy+18,cx-5,cy+31),fill=green,width=5)
        draw.line((cx+19,cy+18,cx+13,cy+31),fill=green,width=5)
    else:  # portal/home
        draw.polygon([(cx-28,cy-2),(cx,cy-27),(cx+28,cy-2)],fill=green)
        draw.rectangle((cx-21,cy-2,cx+21,cy+24),fill=navy)
        draw.rectangle((cx-5,cy+7,cx+7,cy+24),fill=(255,255,255,255))


def _build_reel_scene1(target: date, rows: list[dict[str, Any]], W: int, H: int) -> "Image.Image":
    frame=Image.new("RGB",(W,H),(239,248,252))
    d=ImageDraw.Draw(frame,"RGBA")
    map_img=_render_japan_map(rows,W,1515)
    frame.paste(map_img,(0,240))
    d.rectangle((0,0,W,245),fill=(255,255,255,248))
    d.text((38,30),"＼ まったく新しい",font=_load_font(30),fill=(8,54,92,255))
    d.text((323,30),"登山天気ツール",font=_load_font(30),fill=(234,173,8,255))
    d.text((675,30),"／",font=_load_font(30),fill=(8,54,92,255))
    d.text((38,82),"日本三百名山 全国分析",font=_load_font(56),fill=(7,48,83,255))
    d.text((38,153),f"{target.month}/{target.day} 明日の登山コンディション",font=_load_font(29),fill=(25,127,79,255))
    d.rounded_rectangle((34,360,520,575),radius=32,fill=(4,35,66,245))
    d.text((64,378),"明日の",font=_load_font(88),fill=(255,222,45,255))
    d.text((67,500),"全国コンディション",font=_load_font(31),fill=(255,255,255,255))
    _draw_reel_starburst(d,190,735,118,92,(255,212,28,255))
    d.text((123,665),"全部",font=_load_font(43),fill=(5,45,73,255))
    d.text((110,724),"無料！",font=_load_font(54),fill=(5,45,73,255))
    _draw_reel_legend(d,470,1390)
    _draw_reel_footer(d,W,H)
    return frame


def _build_reel_scene2(target: date, W: int, H: int) -> "Image.Image":
    frame=Image.new("RGB",(W,H),(6,45,76))
    d=ImageDraw.Draw(frame,"RGBA")
    for y in range(H):
        q=y/(H-1)
        c=(6+int(4*q),45+int(28*q),76+int(27*q))
        d.line((0,y,W,y),fill=(*c,255))
    for x in range(70,W,180):
        d.arc((x-50,90,x+210,330),200,340,fill=(255,255,255,22),width=2)
    d.text((45,46),"まったく新しい",font=_load_font(27),fill=(255,255,255,245))
    d.text((258,46),"登山天気ツール",font=_load_font(27),fill=(255,214,41,255))
    d.text((45,100),"トラテン",font=_load_font(62),fill=(255,219,45,255))
    d.text((250,111),"でできること",font=_load_font(44),fill=(255,255,255,255))
    d.rounded_rectangle((327,203,755,290),radius=43,fill=(255,213,38,255))
    d.text((417,220),"全部無料！",font=_load_font(38),fill=(6,45,76,255))
    items=[
        ("全国分析","三百名山を2週間先まで"),
        ("自分専用天気予報","通過ポイントを入れたらルート分析"),
        ("登山判断サポート","時間帯別の風・雨・気温・視界"),
        ("登山ポータル","登山口アクセス・ライブカメラ・山小屋HP・水場"),
    ]
    y=350
    for k,(ttl,desc) in enumerate(items,1):
        d.rounded_rectangle((45,y,1035,y+245),radius=27,fill=(255,255,255,244))
        d.ellipse((75,y+67,137,y+129),fill=(20,127,81,255))
        num=str(k); nf=_load_font(28); bb=d.textbbox((0,0),num,font=nf)
        d.text((106-(bb[2]-bb[0])/2,y+77),num,font=nf,fill=(255,255,255,255))
        _draw_reel_feature_icon(d,k,196,y+117)
        d.text((270,y+43),ttl,font=_load_font(40),fill=(7,51,85,255))
        d.text((270,y+112),desc,font=_fit_text(d,desc,710,29,22),fill=(61,78,92,255))
        y+=270
    d.text((48,1495),"登る前に、トラテン。",font=_load_font(54),fill=(255,217,42,255))
    d.rounded_rectangle((255,1600,835,1690),radius=44,fill=(255,255,255,255))
    d.ellipse((300,1622,344,1666),outline=(20,127,81,255),width=4)
    d.line((322,1622,322,1666),fill=(20,127,81,255),width=3)
    d.line((301,1644,343,1644),fill=(20,127,81,255),width=3)
    d.text((370,1622),"otenki.onrender.com",font=_load_font(31),fill=(7,91,66,255))
    return frame


def _render_reel_stills(work: str, target: date, rows: list[dict[str, Any]], W: int, H: int) -> tuple[str, str]:
    scene1_path=os.path.join(work,"scene1.jpg")
    scene2_path=os.path.join(work,"scene2.jpg")
    scene1=_build_reel_scene1(target, rows, W, H)
    try:
        scene1.save(scene1_path, quality=90, optimize=True, progressive=False)
    finally:
        try: scene1.close()
        except Exception: pass
        del scene1
    scene2=_build_reel_scene2(target, W, H)
    try:
        scene2.save(scene2_path, quality=90, optimize=True, progressive=False)
    finally:
        try: scene2.close()
        except Exception: pass
        del scene2
    gc.collect()
    return scene1_path, scene2_path


def _compose_reel_from_stills(scene1_path: str, scene2_path: str, wav_path: str, out_path: str, *, fps: int, seconds: int, scene_cut: float) -> None:
    total_frames=max(1, fps*seconds)
    split_index=sum(1 for i in range(total_frames) if (i / max(1,(total_frames-1))) < scene_cut)
    first_frames=max(1, min(total_frames, split_index))
    second_frames=max(1, total_frames-first_frames)
    if first_frames + second_frames < total_frames:
        second_frames += total_frames - (first_frames + second_frames)
    dur1=first_frames/float(fps)
    dur2=second_frames/float(fps)
    import imageio_ffmpeg
    ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
    tmp=out_path+f".{os.getpid()}.tmp.mp4"
    cmd=[
        ffmpeg,"-y",
        "-loop","1","-t",f"{dur1:.6f}","-i",scene1_path,
        "-loop","1","-t",f"{dur2:.6f}","-i",scene2_path,
        "-i",wav_path,
        "-filter_complex",f"[0:v]fps={fps},format=yuv420p[v0];[1:v]fps={fps},format=yuv420p[v1];[v0][v1]concat=n=2:v=1:a=0[v]",
        "-map","[v]","-map","2:a",
        "-c:v","libx264","-preset","ultrafast","-tune","stillimage","-threads","1",
        "-x264-params","ref=1:bframes=0:rc-lookahead=0:sync-lookahead=0",
        "-profile:v","high","-level","4.0","-pix_fmt","yuv420p","-r",str(fps),
        "-c:a","aac","-b:a","128k","-shortest","-movflags","+faststart",tmp
    ]
    subprocess.run(cmd,check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=180)
    os.replace(tmp,out_path)


def reel_cache_path(date_text: str) -> str:
    outdir=os.path.join(tempfile.gettempdir(),"traten-instagram-reels")
    return os.path.join(outdir,f"traten-{date_text}-{REEL_RENDER_REV}.mp4")

def reel_cache_ready(date_text: str) -> bool:
    path=reel_cache_path(date_text)
    return os.path.exists(path) and os.path.getsize(path)>100000

def static_image_cache_path(date_text: str, page: int) -> str:
    outdir=os.path.join(tempfile.gettempdir(),"traten-instagram-static")
    return os.path.join(outdir,f"traten-{date_text}-{REEL_RENDER_REV}-p{int(page)}.png")


def static_image_cache_ready(date_text: str) -> bool:
    return all(os.path.exists(static_image_cache_path(date_text, i)) and os.path.getsize(static_image_cache_path(date_text, i)) > 100000 for i in (1,2))


def render_national_static_images(date_text: str, results: list[dict[str, Any]], *, logo_path: str | None = None) -> list[str]:
    rows=[dict(r) for r in results if isinstance(r,dict) and str(r.get("grade") or "") in {"A","B","C"}]
    if len(rows) < INSTAGRAM_MIN_NATIONAL_RESULTS:
        raise RuntimeError(f"national static images require at least {INSTAGRAM_MIN_NATIONAL_RESULTS} results, got {len(rows)}")
    target=date.fromisoformat(date_text)
    outdir=os.path.join(tempfile.gettempdir(),"traten-instagram-static")
    os.makedirs(outdir,exist_ok=True)
    out_paths=[static_image_cache_path(date_text,1), static_image_cache_path(date_text,2)]
    if all(os.path.exists(x) and os.path.getsize(x)>100000 for x in out_paths):
        return out_paths
    lock=_reel_render_lock(f"static-master:{date_text}")
    with lock:
        if all(os.path.exists(x) and os.path.getsize(x)>100000 for x in out_paths):
            return out_paths
        scene1=build_dynamic_scene1(target, rows)
        try:
            tmp1=out_paths[0]+f".{os.getpid()}.tmp.png"
            scene1.save(tmp1, optimize=True)
            os.replace(tmp1, out_paths[0])
        finally:
            try: scene1.close()
            except Exception: pass
            del scene1
        tmp2=out_paths[1]+f".{os.getpid()}.tmp.png"
        shutil.copyfile(_load_master_scene(2), tmp2)
        os.replace(tmp2, out_paths[1])
        gc.collect()
        return out_paths

def render_national_reel(date_text: str, results: list[dict[str, Any]], *, logo_path: str | None = None) -> str:
    """Render the Reel from the dynamic page-1 scene and the approved static page-2 scene."""
    rows=[dict(r) for r in results if isinstance(r,dict) and str(r.get("grade") or "") in {"A","B","C"}]
    if len(rows) < INSTAGRAM_MIN_NATIONAL_RESULTS:
        raise RuntimeError(f"national reel requires at least {INSTAGRAM_MIN_NATIONAL_RESULTS} results, got {len(rows)}")
    outdir=os.path.join(tempfile.gettempdir(),"traten-instagram-reels")
    os.makedirs(outdir,exist_ok=True)
    out=reel_cache_path(date_text)
    if os.path.exists(out) and os.path.getsize(out)>100000:
        return out
    lock=_reel_render_lock(f"reel-master:{date_text}")
    with lock:
        if os.path.exists(out) and os.path.getsize(out)>100000:
            return out
        static_paths = render_national_static_images(date_text, rows, logo_path=logo_path)
        work=os.path.join(outdir,f"work-{date_text}-{REEL_RENDER_REV}-{os.getpid()}")
        os.makedirs(work,exist_ok=True)
        try:
            wav=os.path.join(work,"bgm.wav")
            _write_original_bgm(wav, INSTAGRAM_REEL_SECONDS)
            gc.collect()
            _compose_reel_from_stills(static_paths[0], static_paths[1], wav, out, fps=INSTAGRAM_REEL_FPS, seconds=INSTAGRAM_REEL_SECONDS, scene_cut=0.66)
            gc.collect()
            return out
        finally:
            shutil.rmtree(work,ignore_errors=True)

def caption_for(date_text: str, counts: dict[str, int]) -> str:
    target = date.fromisoformat(date_text)
    marker = f"#traten{target.strftime('%Y%m%d')}"
    return (
        f"🏔 {target.month}/{target.day} 日本三百名山・全国登山天気\n\n"
        f"A：{counts.get('A', 0)}座　B：{counts.get('B', 0)}座　C：{counts.get('C', 0)}座\n\n"
        "風・雨・気温は時間帯で大きく変わります。\n"
        "山ごとの詳しい予報は、プロフィールのリンクから『トラテン｜トラバース天気』へ。\n\n"
        "※全国判定は登山可否を保証するものではありません。現地の最新情報・警報・登山道状況も確認してください。\n\n"
        "#登山 #登山天気 #日本三百名山 #三百名山 #日本百名山 #百名山 #山の天気 #天気予報 #登山情報 "
        "#登山好きな人と繋がりたい #山好きな人と繋がりたい #山登り #ハイキング #トレッキング "
        "#アウトドア #山旅 #登山計画 #登山初心者 #ソロ登山 #週末登山 #絶景登山 #山岳気象 "
        "#北アルプス #中央アルプス #南アルプス #八ヶ岳 #富士山 #トラテン "
        f"{marker}"
    )


def _graph_request(path: str, params: dict[str, Any] | None = None, *, method: str = "GET") -> dict[str, Any]:
    if not configured():
        raise RuntimeError("Instagram API is not configured")
    params = dict(params or {})
    params["access_token"] = INSTAGRAM_ACCESS_TOKEN
    base = f"{GRAPH_BASE_URL}/{GRAPH_API_VERSION}/{path.lstrip('/')}"
    data = None
    url = base
    if method.upper() == "GET":
        url += "?" + urllib.parse.urlencode(params)
    else:
        data = urllib.parse.urlencode(params).encode("utf-8")
    req = urllib.request.Request(url, data=data, method=method.upper(), headers={"User-Agent": "TRATEN-InstagramBot/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=INSTAGRAM_HTTP_TIMEOUT) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except Exception as exc:
        if hasattr(exc, "read"):
            try:
                body = exc.read().decode("utf-8", "replace")[:800]
                raise RuntimeError(f"Instagram API error: {body}") from exc
            except RuntimeError:
                raise
            except Exception:
                pass
        raise RuntimeError(f"Instagram API request failed: {exc}") from exc
    if not isinstance(payload, dict):
        raise RuntimeError("Instagram API returned an invalid response")
    if payload.get("error"):
        raise RuntimeError(f"Instagram API error: {payload['error']}")
    return payload


def test_connection() -> dict[str, Any]:
    """Verify credentials against the configured Instagram professional account."""
    if not configured():
        return {"ok": False, "configured": False, "reason": "not-configured"}
    payload = _graph_request(str(INSTAGRAM_USER_ID), {"fields": "id,username,account_type"})
    return {
        "ok": True,
        "configured": True,
        "id": str(payload.get("id") or ""),
        "username": str(payload.get("username") or ""),
        "accountType": str(payload.get("account_type") or ""),
        "graphApiVersion": GRAPH_API_VERSION,
    }


def _already_posted_remote(date_text: str) -> bool:
    marker = f"#traten{date.fromisoformat(date_text).strftime('%Y%m%d')}"
    payload = _graph_request(f"{INSTAGRAM_USER_ID}/media", {"fields": "id,caption,timestamp", "limit": 25})
    for item in payload.get("data") or []:
        if isinstance(item, dict) and marker in str(item.get("caption") or ""):
            return True
    return False


def _load_local_state() -> dict[str, Any]:
    try:
        with open(_STATE_FILE, "r", encoding="utf-8") as f:
            obj = json.load(f)
        return obj if isinstance(obj, dict) else {}
    except Exception:
        return {}


def _save_local_state(state: dict[str, Any]) -> None:
    tmp = _STATE_FILE + f".{os.getpid()}.tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, separators=(",", ":"))
    os.replace(tmp, _STATE_FILE)


def _finalize_reel_container(date_text: str, creation_id: str) -> None:
    # Delay first poll so the request that created the container can return and
    # Instagram can fetch the public video URL even on a single-worker Render service.
    time.sleep(8)
    try:
        deadline=time.time()+240
        last_status=None
        while time.time()<deadline:
            status=_graph_request(creation_id,{"fields":"status_code,status"})
            last_status=str(status.get("status_code") or status.get("status") or "")
            if last_status=="FINISHED": break
            if last_status in {"ERROR","EXPIRED"}:
                raise RuntimeError(f"Instagram reel container status: {last_status}")
            time.sleep(3)
        if last_status!="FINISHED":
            raise RuntimeError(f"Instagram reel container did not finish: {last_status}")
        publish=_graph_request(f"{INSTAGRAM_USER_ID}/media_publish",{"creation_id":creation_id},method="POST")
        media_id=str(publish.get("id") or "")
        if not media_id: raise RuntimeError("Instagram reel publish id was not returned")
        state=_load_local_state()
        state.update({
            "lastForecastDate":date_text,"lastMediaId":media_id,"lastCreationId":creation_id,
            "lastPostedAt":datetime.utcnow().isoformat()+"Z",
        })
        state.pop("pendingForecastDate",None); state.pop("pendingCreationId",None); state.pop("pendingStartedAt",None)
        _save_local_state(state)
    except Exception as exc:
        state=_load_local_state()
        state.update({"lastReelError":str(exc)[:500],"lastReelErrorAt":datetime.utcnow().isoformat()+"Z"})
        state.pop("pendingForecastDate",None); state.pop("pendingCreationId",None); state.pop("pendingStartedAt",None)
        _save_local_state(state)


def post_national(date_text: str, results: list[dict[str, Any]], *, force: bool = False) -> dict[str, Any]:
    if not configured():
        return {"ok": False, "skipped": True, "reason": "not-configured"}
    grades = [str(r.get("grade") or "") for r in results if isinstance(r, dict)]
    counts = {g: grades.count(g) for g in "ABC"}
    if sum(counts.values()) < INSTAGRAM_MIN_NATIONAL_RESULTS:
        return {"ok": False, "skipped": True, "reason": "incomplete", "count": sum(counts.values()), "minimum": INSTAGRAM_MIN_NATIONAL_RESULTS}

    local = _load_local_state()
    if not force and local.get("pendingForecastDate") == date_text and local.get("pendingCreationId"):
        return {"ok": True, "skipped": True, "reason": "reel-pending", "creationId": local.get("pendingCreationId")}
    if not force and local.get("lastForecastDate") == date_text and local.get("lastMediaId"):
        return {"ok": True, "skipped": True, "reason": "already-posted-local", "mediaId": local.get("lastMediaId")}
    if not force and _already_posted_remote(date_text):
        local.update({"lastForecastDate": date_text, "lastCheckedAt": datetime.utcnow().isoformat() + "Z"})
        _save_local_state(local)
        return {"ok": True, "skipped": True, "reason": "already-posted-instagram"}

    if INSTAGRAM_AUTO_MEDIA == "reel":
        render_national_reel(date_text, results, logo_path=os.path.join(os.path.dirname(__file__), "traten-logo.png"))
        create_params = {
            "media_type": "REELS",
            "video_url": reel_url(date_text),
            "caption": caption_for(date_text, counts),
            "share_to_feed": "true",
        }
    else:
        create_params = {"image_url": image_url(date_text), "caption": caption_for(date_text, counts)}
    create = _graph_request(
        f"{INSTAGRAM_USER_ID}/media",
        create_params,
        method="POST",
    )
    creation_id = str(create.get("id") or "")
    if not creation_id:
        raise RuntimeError("Instagram media container id was not returned")

    if INSTAGRAM_AUTO_MEDIA == "reel":
        pending = _load_local_state()
        pending.update({
            "pendingForecastDate": date_text,
            "pendingCreationId": creation_id,
            "pendingStartedAt": datetime.utcnow().isoformat() + "Z",
        })
        _save_local_state(pending)
        threading.Thread(target=_finalize_reel_container, args=(date_text, creation_id), daemon=True).start()
        return {"ok": True, "pending": True, "forecastDate": date_text, "creationId": creation_id, "mediaType": "reel"}

    # Image containers are usually ready quickly. Poll briefly instead of racing media_publish.
    deadline = time.time() + 45
    last_status = None
    while time.time() < deadline:
        status = _graph_request(creation_id, {"fields": "status_code,status"})
        last_status = str(status.get("status_code") or status.get("status") or "")
        if last_status == "FINISHED":
            break
        if last_status in {"ERROR", "EXPIRED"}:
            raise RuntimeError(f"Instagram media container status: {last_status}")
        time.sleep(2)

    publish = _graph_request(f"{INSTAGRAM_USER_ID}/media_publish", {"creation_id": creation_id}, method="POST")
    media_id = str(publish.get("id") or "")
    if not media_id:
        raise RuntimeError(f"Instagram publish id was not returned (container status={last_status})")
    state = {
        "lastForecastDate": date_text,
        "lastMediaId": media_id,
        "lastCreationId": creation_id,
        "lastPostedAt": datetime.utcnow().isoformat() + "Z",
    }
    _save_local_state(state)
    return {"ok": True, "posted": True, "forecastDate": date_text, "mediaId": media_id, "creationId": creation_id, "mediaType": "image"}


def maybe_post_tomorrow(*, now_jst: datetime, load_results: Callable[[str], list[dict[str, Any]]]) -> dict[str, Any]:
    if not INSTAGRAM_AUTO_POST:
        return {"ok": True, "skipped": True, "reason": "auto-post-disabled"}
    if not configured():
        return {"ok": False, "skipped": True, "reason": "not-configured"}
    if now_jst.hour < INSTAGRAM_AUTO_POST_HOUR_JST:
        return {"ok": True, "skipped": True, "reason": "before-post-hour", "postHourJst": INSTAGRAM_AUTO_POST_HOUR_JST}
    target = now_jst.date().fromordinal(now_jst.date().toordinal() + 1).isoformat()
    results = load_results(target)
    return post_national(target, results, force=False)


def status() -> dict[str, Any]:
    local = _load_local_state()
    return {
        "configured": configured(),
        "autoPost": INSTAGRAM_AUTO_POST,
        "autoMedia": INSTAGRAM_AUTO_MEDIA,
        "postHourJst": INSTAGRAM_AUTO_POST_HOUR_JST,
        "graphApiVersion": GRAPH_API_VERSION,
        "graphBaseUrl": GRAPH_BASE_URL,
        "publicBaseUrl": PUBLIC_BASE_URL,
        "userIdConfigured": bool(INSTAGRAM_USER_ID),
        "accessTokenConfigured": bool(INSTAGRAM_ACCESS_TOKEN),
        "imageSecretConfigured": bool(INSTAGRAM_IMAGE_SECRET),
        "lastForecastDate": local.get("lastForecastDate"),
        "lastMediaId": local.get("lastMediaId"),
        "lastPostedAt": local.get("lastPostedAt"),
        "pendingForecastDate": local.get("pendingForecastDate"),
        "pendingCreationId": local.get("pendingCreationId"),
        "lastReelError": local.get("lastReelError"),
    }
