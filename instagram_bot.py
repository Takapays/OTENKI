from __future__ import annotations

import hashlib
import hmac
import io
import json
import os
import tempfile
import time
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
    draw.text((432, 127), "翌日の登山コンディションを取得できた百名山で比較", font=sub_font, fill=(65, 82, 96))
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


def caption_for(date_text: str, counts: dict[str, int]) -> str:
    target = date.fromisoformat(date_text)
    marker = f"#traten{target.strftime('%Y%m%d')}"
    return (
        f"🏔 {target.month}/{target.day} 日本百名山・全国登山天気\n\n"
        f"A：{counts.get('A', 0)}座　B：{counts.get('B', 0)}座　C：{counts.get('C', 0)}座\n\n"
        "風・雨・気温は時間帯で大きく変わります。\n"
        "山ごとの詳しい予報は、プロフィールのリンクから『トラテン｜トラバース天気』へ。\n\n"
        "※全国判定は登山可否を保証するものではありません。現地の最新情報・警報・登山道状況も確認してください。\n\n"
        f"#登山 #登山天気 #日本百名山 #山の天気 #トラテン {marker}"
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


def post_national(date_text: str, results: list[dict[str, Any]], *, force: bool = False) -> dict[str, Any]:
    if not configured():
        return {"ok": False, "skipped": True, "reason": "not-configured"}
    grades = [str(r.get("grade") or "") for r in results if isinstance(r, dict)]
    counts = {g: grades.count(g) for g in "ABC"}
    if sum(counts.values()) < INSTAGRAM_MIN_NATIONAL_RESULTS:
        return {"ok": False, "skipped": True, "reason": "incomplete", "count": sum(counts.values()), "minimum": INSTAGRAM_MIN_NATIONAL_RESULTS}

    local = _load_local_state()
    if not force and local.get("lastForecastDate") == date_text and local.get("lastMediaId"):
        return {"ok": True, "skipped": True, "reason": "already-posted-local", "mediaId": local.get("lastMediaId")}
    if not force and _already_posted_remote(date_text):
        local.update({"lastForecastDate": date_text, "lastCheckedAt": datetime.utcnow().isoformat() + "Z"})
        _save_local_state(local)
        return {"ok": True, "skipped": True, "reason": "already-posted-instagram"}

    create = _graph_request(
        f"{INSTAGRAM_USER_ID}/media",
        {"image_url": image_url(date_text), "caption": caption_for(date_text, counts)},
        method="POST",
    )
    creation_id = str(create.get("id") or "")
    if not creation_id:
        raise RuntimeError("Instagram media container id was not returned")

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
    return {"ok": True, "posted": True, "forecastDate": date_text, "mediaId": media_id, "creationId": creation_id}


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
    }
