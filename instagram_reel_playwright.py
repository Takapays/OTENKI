from __future__ import annotations

import base64
import json
import os
import subprocess
import sys
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

    # V1.5.89: install Chromium into the project directory during Render build.
    # HOME based Playwright caches can differ between build/runtime on Render, so
    # search the deterministic local browser directory first.
    root = Path(__file__).resolve().parent
    local_dir = root / ".playwright-browsers"
    patterns = (
        "chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell",
        "chromium-*/chrome-linux/chrome",
        "chromium-*/chrome-linux64/chrome",
    )
    for pattern in patterns:
        for candidate in sorted(local_dir.glob(pattern), reverse=True):
            if candidate.is_file() and os.access(candidate, os.X_OK):
                return str(candidate)

    for candidate in ("/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome"):
        if os.path.exists(candidate):
            return candidate
    return None


def _ensure_browser_executable() -> str | None:
    """Ensure the Playwright Chromium bundle exists in the deploy-local directory.

    Render can use different HOME/cache locations during build and runtime. V1.5.93
    pins both phases to .playwright-browsers and, as a final safety net, installs the
    matching Chromium bundle lazily on first Reel render when it is still absent.
    """
    root = Path(__file__).resolve().parent
    local_dir = root / ".playwright-browsers"
    os.environ["PLAYWRIGHT_BROWSERS_PATH"] = str(local_dir)
    exe = _browser_executable()
    if exe:
        return exe
    try:
        local_dir.mkdir(parents=True, exist_ok=True)
        env = os.environ.copy()
        env["PLAYWRIGHT_BROWSERS_PATH"] = str(local_dir)
        subprocess.run(
            [sys.executable, "-m", "playwright", "install", "chromium"],
            check=True,
            timeout=300,
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
        )
    except Exception as exc:
        raise RuntimeError(
            "Chromium is not available for Playwright and automatic installation failed: "
            + str(exc)
        ) from exc
    return _browser_executable()


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
    # V1.5.89: make Playwright use the same browser directory used by the build step.
    local_browser_dir = Path(__file__).resolve().parent / ".playwright-browsers"
    if local_browser_dir.exists():
        os.environ.setdefault("PLAYWRIGHT_BROWSERS_PATH", str(local_browser_dir))
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
    executable = _ensure_browser_executable()
    if not executable:
        raise RuntimeError("Playwright Chromium executable was not found after installation.")
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
