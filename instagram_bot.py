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
INSTAGRAM_REEL_SECONDS = max(6, min(12, int(os.environ.get("INSTAGRAM_REEL_SECONDS", "8"))))

_STATE_FILE = os.path.join(tempfile.gettempdir(), "traten-instagram-state.json")


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
            headers={"User-Agent": "Traten/1.5.89 (+https://otenki.onrender.com/)"},
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



def _render_gsi_japan_background(path: str, width: int = 1080, height: int = 1590) -> str:
    """Render the same GSI standard-map tiles used by the nationwide site map, without markers."""
    north, south, west, east = 46.2, 29.0, 127.0, 146.8
    z = 5
    try:
        wx0, wy0 = _lonlat_to_world_px(north, west, z)
        wx1, wy1 = _lonlat_to_world_px(south, east, z)
        tx0, ty0 = int(math.floor(wx0 / 256)), int(math.floor(wy0 / 256))
        tx1, ty1 = int(math.floor(wx1 / 256)), int(math.floor(wy1 / 256))
        canvas = Image.new("RGB", ((tx1-tx0+1)*256, (ty1-ty0+1)*256), (207,234,245))
        for ty in range(ty0, ty1+1):
            for tx in range(tx0, tx1+1):
                tile = _fetch_gsi_tile(z, tx, ty)
                canvas.paste(tile, ((tx-tx0)*256, (ty-ty0)*256))
        left = int(round(wx0 - tx0*256)); top = int(round(wy0 - ty0*256))
        right = int(round(wx1 - tx0*256)); bottom = int(round(wy1 - ty0*256))
        crop = canvas.crop((left, top, right, bottom)).resize((width,height), Image.Resampling.LANCZOS)
        # If all tile requests failed, _fetch_gsi_tile returns the same pale placeholder.
        extrema = crop.getextrema()
        if all((hi-lo) < 4 for lo, hi in extrema):
            raise RuntimeError("GSI tiles unavailable")
        crop.save(path, format="PNG", optimize=True)
        return path
    except Exception:
        fallback = os.path.join(os.path.dirname(__file__), "instagram-japan-base.png")
        if os.path.exists(fallback):
            Image.open(fallback).convert("RGB").resize((width,height), Image.Resampling.LANCZOS).save(path, format="PNG")
            return path
        raise

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


def _render_reel_scenes_pillow(*, rows: list[dict[str, Any]], counts: dict[str, int], target: date,
                                logo_path: str | None, out_dir: str) -> list[str]:
    """Render the approved Reel concept without a browser.

    V1.5.96 deliberately avoids Playwright/Chromium on Render Free.  Three still
    scenes are drawn directly with Pillow, then ffmpeg turns those stills into a
    short 9:16 Reel.  Only one 720x1280 canvas is alive at a time.
    """
    if Image is None or ImageDraw is None:
        raise RuntimeError("Pillow is not installed")

    W, H = 720, 1280
    navy = (5, 37, 67)
    deep = (8, 54, 92)
    yellow = (255, 211, 36)
    green = (22, 142, 83)
    amber = (220, 153, 12)
    red = (205, 62, 62)
    white = (255, 255, 255)
    light = (239, 247, 251)
    muted = (77, 96, 112)
    grade_colors = {"A": green, "B": amber, "C": red}

    os.makedirs(out_dir, exist_ok=True)
    scene_paths: list[str] = []

    def paste_logo(img, max_size=(180, 86), xy=(24, 18)):
        if not logo_path or not os.path.exists(logo_path):
            return
        try:
            with Image.open(logo_path) as src:
                logo = src.convert("RGBA")
                logo.thumbnail(max_size)
                img.paste(logo, xy, logo)
        except Exception:
            pass

    def save_scene(img, name: str) -> str:
        path = os.path.join(out_dir, name)
        img.save(path, format="JPEG", quality=90, optimize=True, progressive=False)
        img.close()
        scene_paths.append(path)
        return path

    # Scene 1: hero + live ABC counts.  Keep the A/B/C visual identity explicit.
    img = Image.new("RGB", (W, H), light)
    d = ImageDraw.Draw(img, "RGBA")
    d.rectangle((0, 0, W, 220), fill=white)
    paste_logo(img)
    d.text((24, 106), "まったく新しい登山天気ツール", font=_load_font(23), fill=amber)
    d.text((24, 142), "日本三百名山 全国分析", font=_load_font(42), fill=deep)
    d.text((24, 190), f"{target.month}/{target.day}  明日の登山コンディション", font=_load_font(22), fill=green)

    # Main promise card.
    d.rounded_rectangle((24, 256, 696, 482), radius=30, fill=navy)
    d.text((50, 280), "明日の", font=_load_font(72), fill=yellow)
    d.text((52, 370), "全国コンディションを一目で。", font=_load_font(30), fill=white)
    d.rounded_rectangle((500, 296, 660, 410), radius=54, fill=yellow)
    d.text((535, 315), "全部", font=_load_font(28), fill=navy)
    d.text((523, 355), "無料！", font=_load_font(34), fill=navy)

    # Grade chips.
    x0 = 24
    for idx, grade in enumerate("ABC"):
        x = x0 + idx * 228
        c = grade_colors[grade]
        d.rounded_rectangle((x, 530, x + 208, 695), radius=24, fill=white, outline=c, width=4)
        d.ellipse((x + 16, 550, x + 86, 620), fill=c)
        d.text((x + 39, 558), grade, font=_load_font(34), fill=white)
        d.text((x + 104, 544), str(counts.get(grade, 0)), font=_load_font(48), fill=c)
        d.text((x + 106, 606), "座", font=_load_font(20), fill=muted)
        label = {"A": "好条件", "B": "注意あり", "C": "厳しい"}[grade]
        d.text((x + 18, 646), label, font=_load_font(22), fill=muted)

    # Mini map with ABC markers.
    map_img = _render_japan_map(rows, 672, 430)
    img.paste(map_img, (24, 742))
    map_img.close()
    d.rounded_rectangle((24, 1188, 696, 1248), radius=26, fill=white)
    d.text((102, 1202), "山ごとの時間帯・風・雨・気温はトラテンへ", font=_fit_text(d, "山ごとの時間帯・風・雨・気温はトラテンへ", 560, 24, 18), fill=deep)
    save_scene(img, "scene-hero.jpg")

    # Scene 2: map focus.  The ABC markers are the visual anchor.
    img = Image.new("RGB", (W, H), (222, 240, 248))
    d = ImageDraw.Draw(img, "RGBA")
    d.rectangle((0, 0, W, 178), fill=white)
    paste_logo(img, max_size=(150, 70), xy=(22, 12))
    d.text((22, 88), "日本三百名山 全国マップ", font=_load_font(39), fill=deep)
    d.text((22, 136), f"{target.month}/{target.day}  A / B / C を全国で比較", font=_load_font(22), fill=muted)
    map_img = _render_japan_map(rows, 720, 865)
    img.paste(map_img, (0, 178))
    map_img.close()
    d.rectangle((0, 1043, W, H), fill=(255, 255, 255, 245))
    for idx, grade in enumerate("ABC"):
        x = 28 + idx * 226
        c = grade_colors[grade]
        d.ellipse((x, 1070, x + 70, 1140), fill=c)
        d.text((x + 23, 1079), grade, font=_load_font(34), fill=white)
        d.text((x + 82, 1068), str(counts.get(grade, 0)), font=_load_font(44), fill=c)
        d.text((x + 85, 1122), "座", font=_load_font(19), fill=muted)
    d.text((28, 1190), "地点ごとの判定を、登山前の比較材料に。", font=_load_font(27), fill=deep)
    d.text((28, 1230), "※判定は登山可否を保証するものではありません", font=_load_font(17), fill=muted)
    save_scene(img, "scene-map.jpg")

    # Scene 3: feature summary / CTA.
    img = Image.new("RGB", (W, H), navy)
    d = ImageDraw.Draw(img, "RGBA")
    d.text((34, 34), "まったく新しい登山天気ツール", font=_load_font(25), fill=yellow)
    d.text((34, 76), "トラテンでできること", font=_load_font(45), fill=white)
    d.rounded_rectangle((236, 148, 484, 212), radius=30, fill=yellow)
    d.text((295, 161), "全部無料！", font=_load_font(27), fill=navy)
    items = [
        ("全国分析", "三百名山を2週間先まで"),
        ("自分専用天気予報", "通過ポイントを入れてルート分析"),
        ("登山判断サポート", "時間帯別の風・雨・気温・視界"),
        ("登山ポータル", "登山口・ライブカメラ・山小屋・水場"),
    ]
    y = 246
    for k, (ttl, desc) in enumerate(items, 1):
        d.rounded_rectangle((34, y, 686, y + 154), radius=24, fill=(255, 255, 255, 242))
        d.ellipse((54, y + 38, 112, y + 96), fill=green)
        d.text((75, y + 45), str(k), font=_load_font(24), fill=white)
        d.text((132, y + 18), ttl, font=_load_font(29), fill=deep)
        d.text((132, y + 72), desc, font=_fit_text(d, desc, 510, 22, 17), fill=muted)
        y += 170
    d.text((34, 952), "登る前に、トラテン。", font=_load_font(42), fill=yellow)
    d.rounded_rectangle((34, 1030, 686, 1110), radius=38, fill=white)
    d.text((155, 1048), "otenki.onrender.com", font=_load_font(27), fill=green)
    d.text((34, 1160), "明日の山選びから、ルート上の時間帯予報まで。", font=_fit_text(d, "明日の山選びから、ルート上の時間帯予報まで。", 650, 25, 18), fill=(224, 238, 246))
    save_scene(img, "scene-features.jpg")
    return scene_paths


def render_national_reel(date_text: str, results: list[dict[str, Any]], *, logo_path: str | None = None) -> str:
    """Render a compact 9:16 Reel without Playwright/Chromium (V1.5.96)."""
    if Image is None or ImageDraw is None:
        raise RuntimeError("Pillow is not installed")
    rows = [dict(r) for r in results if isinstance(r, dict) and str(r.get("grade") or "") in {"A", "B", "C"}]
    if len(rows) < INSTAGRAM_MIN_NATIONAL_RESULTS:
        raise RuntimeError(f"national reel requires at least {INSTAGRAM_MIN_NATIONAL_RESULTS} results, got {len(rows)}")

    target = date.fromisoformat(date_text)
    counts = {g: sum(1 for r in rows if r.get("grade") == g) for g in "ABC"}
    outdir = os.path.join(tempfile.gettempdir(), "traten-instagram-reels-v1596")
    os.makedirs(outdir, exist_ok=True)
    out = os.path.join(outdir, f"traten-{date_text}-v1596.mp4")
    if os.path.exists(out) and os.path.getsize(out) > 100000:
        return out

    work = os.path.join(outdir, f"work-{date_text}-{os.getpid()}")
    os.makedirs(work, exist_ok=True)
    try:
        scenes = _render_reel_scenes_pillow(
            rows=rows,
            counts=counts,
            target=target,
            logo_path=logo_path,
            out_dir=work,
        )
        if len(scenes) != 3:
            raise RuntimeError(f"Pillow renderer returned {len(scenes)} scenes")

        # Keep encoding deliberately small-memory for Render Free (512 MB).
        fps = min(12, INSTAGRAM_REEL_FPS)
        sec = float(INSTAGRAM_REEL_SECONDS)
        d0 = max(2.2, sec * 0.40)
        d1 = max(1.4, sec * 0.25)
        d2 = max(1.8, sec - d0 - d1)
        wav = os.path.join(work, "bgm.wav")
        _write_original_bgm(wav, int(math.ceil(sec)))
        concat_path = os.path.join(work, "scenes.txt")

        def qpath(x: str) -> str:
            return x.replace("'", "'\\''")

        with open(concat_path, "w", encoding="utf-8") as f:
            f.write(f"file '{qpath(scenes[0])}'\nduration {d0:.3f}\n")
            f.write(f"file '{qpath(scenes[1])}'\nduration {d1:.3f}\n")
            f.write(f"file '{qpath(scenes[2])}'\nduration {d2:.3f}\n")
            f.write(f"file '{qpath(scenes[2])}'\n")

        import imageio_ffmpeg
        ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
        tmp = out + f".{os.getpid()}.tmp.mp4"
        cmd = [
            ffmpeg, "-y", "-f", "concat", "-safe", "0", "-i", concat_path, "-i", wav,
            "-vf", f"fps={fps},scale=720:1280,format=yuv420p",
            "-map", "0:v:0", "-map", "1:a:0",
            "-c:v", "libx264", "-preset", "ultrafast", "-tune", "stillimage",
            "-crf", "23", "-pix_fmt", "yuv420p", "-threads", "1",
            "-c:a", "aac", "-b:a", "128k", "-t", f"{sec:.3f}",
            "-movflags", "+faststart", tmp,
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120)
        os.replace(tmp, out)
        return out
    finally:
        shutil.rmtree(work, ignore_errors=True)
        try:
            import gc
            gc.collect()
        except Exception:
            pass

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
