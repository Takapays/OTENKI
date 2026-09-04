from __future__ import annotations

import base64
import json
import os
from pathlib import Path
from typing import Any


def _data_uri(path: str | os.PathLike[str], mime: str) -> str:
    raw = Path(path).read_bytes()
    return f"data:{mime};base64," + base64.b64encode(raw).decode("ascii")


def _font_data_uri(font_path: str | None) -> str:
    if font_path and os.path.exists(font_path):
        return _data_uri(font_path, "font/ttf")
    return ""


def _browser_executable() -> str | None:
    explicit = os.environ.get("PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH", "").strip()
    if explicit and os.path.exists(explicit):
        return explicit
    for candidate in ("/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome"):
        if os.path.exists(candidate):
            return candidate
    return None


def renderer_status() -> dict[str, Any]:
    try:
        import playwright.sync_api  # noqa:F401
        package = True
    except Exception:
        package = False
    exe = _browser_executable()
    return {"engine": "playwright", "package": package, "systemChromium": bool(exe), "systemChromiumPath": exe or ""}


def render_scenes(*, template_path: str, map_path: str, logo_path: str, font_path: str | None,
                  date_short: str, counts: dict[str, int], rows: list[dict[str, Any]], out_dir: str) -> list[str]:
    try:
        from playwright.sync_api import sync_playwright
    except Exception as exc:
        raise RuntimeError("Playwright is not installed. Add 'playwright' and Chromium in the Render build step.") from exc

    template = Path(template_path).read_text(encoding="utf-8")
    map_uri = _data_uri(map_path, "image/png")
    logo_uri = _data_uri(logo_path, "image/png")
    font_uri = _font_data_uri(font_path)
    if not font_uri:
        raise RuntimeError("Japanese font for Reel template was not found")

    clean_rows = []
    for r in rows:
        try:
            clean_rows.append({"grade": str(r.get("grade") or ""), "lat": float(r.get("lat")), "lon": float(r.get("lon"))})
        except Exception:
            continue

    Path(out_dir).mkdir(parents=True, exist_ok=True)
    output: list[str] = []
    executable = _browser_executable()
    with sync_playwright() as p:
        launch = {"headless": True, "args": ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"]}
        if executable:
            launch["executable_path"] = executable
        browser = p.chromium.launch(**launch)
        try:
            for scene in ("hero", "map", "features"):
                page = browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
                try:
                    data = {"scene": scene, "dateShort": date_short, "counts": counts, "rows": clean_rows}
                    html = template.replace("__TRATEN_REEL_DATA__", json.dumps(data, ensure_ascii=False))
                    html = html.replace("__MAP_DATA_URI__", map_uri).replace("__LOGO_DATA_URI__", logo_uri).replace("__FONT_DATA_URI__", font_uri)
                    page.set_content(html, wait_until="load")
                    page.evaluate("document.fonts.ready")
                    out = os.path.join(out_dir, f"scene-{scene}.png")
                    page.screenshot(path=out, full_page=False)
                    output.append(out)
                finally:
                    page.close()
        finally:
            browser.close()
    return output
