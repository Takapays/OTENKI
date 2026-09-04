# OTENKI V1.5.93

## Playwright / Render fix
- Playwright Chromium is installed to `/opt/render/project/src/.playwright-browsers` during Render build.
- `PLAYWRIGHT_BROWSERS_PATH` is pinned to the same directory at runtime.
- `server.py` also sets the same default path so the application and Playwright cannot drift to different HOME caches.
- `instagram_reel_playwright.py` includes a final lazy-install fallback: if Chromium is still absent when Reel rendering starts, it installs the matching Chromium bundle into `.playwright-browsers` and retries.

## Version display fix
- Desktop and mobile version badges are V1.5.93.
- Frontend cache keys are V1.5.93.
- Server APP_VERSION is 1.5.93.

This is a differential ZIP only.
