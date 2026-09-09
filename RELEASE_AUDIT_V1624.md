# V1.6.24 Release Audit

Canonical baseline: **V1.5.231 = V1.6.1**  
Previous release: **V1.6.23**

| Item | Canonical V1.6.1 | V1.6.23 | V1.6.24 | Result |
|---|---:|---:|---:|---|
| Mountains | 300 | 300 | 300 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Existing baseline JS top-level functions removed | 0 | 0 | 0 | PASS |
| Existing baseline server top-level functions removed | 0 | 0 | 0 | PASS |
| Existing baseline Instagram top-level functions removed | 0 | 0 | 0 | PASS |
| Existing V1.6.23 JS top-level functions removed | - | - | 0 | PASS |
| Existing V1.6.23 server top-level functions removed | - | - | 0 | PASS |
| Existing reel renderer functions removed | - | - | 0 | PASS |

## Intended changes

- Add a single-row 06:00-15:00 A-E strip to Instagram Reel scene 2.
- Use the target day's live Yarigatake MET Norway / NOAA GFS hourly data.
- Use the exact web hourly thresholds: wind 5/7/9/15, gust 12/15/18/25, rain 0.1/0.5/1.5/6.
- Preserve the web rule that single-model D/E is not averaged away.
- Keep the scene-2 daily A-E badge, gust chart, rain chart and CTA.
- Bump the reel render revision to avoid reuse of the old cached scene 2.

## Regression isolation

- `instagram_bot.py`: three hourly-grade/render helper functions added; series parser also retains wind; scene-2 layout adjusted to make room for the strip.
- `app.js`: version string only; web hourly/daily logic unchanged.
- `server.py`: version string only; national analysis and Yarigatake data loading unchanged.
- `index.html` / `data-audit.html`: cache/version strings only.
- Route, fixed-point and CT definitions were not changed.

## Verification

- `python -m py_compile server.py instagram_bot.py`: PASS (pre-existing SyntaxWarning in server only)
- `node --check app.js`: PASS
- `tests/test_v1624_guard.py`: PASS
- Existing V1.6.22 hourly-grade logic test: PASS
- Synthetic scene-2 render at 864x1536: PASS
- Previous/canonical top-level function removals: 0

**Release decision: PASS / regression detected: 0**
