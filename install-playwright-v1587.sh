#!/bin/sh
set -eu
ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
BROWSER_DIR="$ROOT_DIR/.playwright-browsers"
python -m pip install -r "$ROOT_DIR/requirements-reel-v1587.txt"
mkdir -p "$BROWSER_DIR"
PLAYWRIGHT_BROWSERS_PATH="$BROWSER_DIR" python -m playwright install chromium
PLAYWRIGHT_BROWSERS_PATH="$BROWSER_DIR" python - <<'PY2'
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
    print("playwright chromium smoke test: OK", b.version)
    b.close()
PY2
