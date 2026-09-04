# RELEASE AUDIT V1.5.89

## Reel / Playwright
Observed Render error: Chromium headless shell executable missing under `/opt/render/.cache/ms-playwright/...`.
The browser package and browser binary were resolving through a HOME based cache. V1.5.89 installs Chromium to `.playwright-browsers` under the deployed project and the renderer resolves that executable directly. The build installer now launches Chromium once as a smoke test, so a missing browser fails at build time rather than at Reel preview time.

## Desktop passage-time UI
On PC, `input[type=time]` could collapse until only the native clock icon remained because the CT badge shared a constrained flex area. V1.5.89 adds a desktop-only width floor for the time label/control/input; mobile layout is unchanged.
