# Traten V1.5.89 differential release

Fixes:
- Render Playwright Chromium is installed into a deterministic project-local `.playwright-browsers` directory.
- Runtime explicitly discovers/uses that browser, avoiding build/runtime HOME cache mismatch.
- Build script performs an actual Chromium launch smoke test.
- Desktop route point `通過時刻` input is forced wide enough to display HH:MM and the native clock button.

Deploy over V1.5.88. Keep the existing Render Build Command that ends with `./install-playwright-v1587.sh`; the updated script is included here.
