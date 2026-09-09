# V1.6.25 Release Audit

Canonical baseline: **V1.5.231 = V1.6.1**  
Previous release: **V1.6.24**

| Item | Canonical V1.6.1 | V1.6.24 | V1.6.25 | Result |
|---|---:|---:|---:|---|
| Mountains | 300 | 300 | 300 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Existing V1.6.24 JS top-level functions removed | - | 0 | 0 | PASS |
| Existing V1.6.24 server top-level functions removed | - | 0 | 0 | PASS |

## Root cause

Nationwide MET Norway requests already pass the registered mountain elevation as the API `altitude` parameter. NOAA GFS, however, used the 2 m temperature from the nearest 0.25-degree model grid cell without translating it from the GFS model terrain height to the registered summit elevation. For high mountains, especially Fuji (3,776 m), this could make GFS temperature far too warm. The two-model merge then averaged that warm GFS value with MET Norway, producing implausibly warm displayed minimum temperatures.

## Fix

- Request GFS surface HGT together with TMP/wind/gust/rain.
- Read the GFS model-grid surface elevation at each mountain.
- Translate only GFS 2 m temperature from model-grid elevation to the registered mountain elevation using 6.5 C/km.
- Do not alter GFS wind, gust, rain, or the A-E thresholds in this release.
- MET Norway handling remains unchanged because it already receives the registered altitude.
- Bump national cache engine to `metno-gfs-v6-altitude-temp-abcde` so old pre-fix temperatures cannot be reused.

## Regression isolation

- `app.js`: version only; routes, fixed points, CT and client-side grade logic unchanged byte-for-byte after version normalization.
- `index.html` / `data-audit.html`: version/cache strings only.
- `instagram_bot.py`: byte-identical to V1.6.24.
- `server.py`: altitude-temperature correction plus version/cache-engine change only.

## Verification

- `python3 -m py_compile server.py instagram_bot.py`: PASS
- `node --check app.js`: PASS
- `tests/test_v1625_altitude_temp.py`: PASS
- Existing V1.6.22 hourly-grade tests: PASS
- Existing V1.6.24 JS functions removed: 0
- Existing V1.6.24 server functions removed: 0
- Canonical data metrics carried forward unchanged and protected by an app.js version-only diff.

**Release decision: PASS / regression detected: 0**
