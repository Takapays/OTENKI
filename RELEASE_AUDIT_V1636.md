# TRATEN V1.6.36 Release Audit

## Requested change
Instagram Reel scene 2 is no longer full-bleed. The current dynamic 槍ヶ岳 forecast panel is scaled into a smartphone mockup so the surrounding composition is easier to read.

## Regression comparison
| Item | Canonical V1.6.1 | Previous V1.6.35 | Candidate V1.6.36 |
|---|---:|---:|---:|
| Japan 300 mountains | 300 | 300 | 300 |
| Coordinate issues | 0 | 0 | 0 |
| CT missing | 0 | 0 | 0 |
| Estimated CT | 1 | 1 | 1 |
| Representative courses | 415 | 416 | 416 |

The candidate does not edit route/CT/fixed-point declarations. `app.js` differs from V1.6.35 only by `APP_VERSION`; `server.py` differs only by `APP_VERSION`.

## Instagram regression
- Existing `instagram_bot.py` top-level functions retained: 70/70; missing 0.
- Added helper: `_wrap_reel_scene_in_phone`.
- Dynamic scene-2 content retained: 槍ヶ岳 heading, daily A-E, 6-15 hourly A-E, gust graph, rain graph, MET Norway / NOAA GFS legend, and CTA.
- Hourly A-E thresholds and D/E floor logic unchanged.
- `REEL_RENDER_REV` bumped to `master-20260909-scenes-v16-yarigatake-phone-frame`, preventing reuse of an old cached Reel.
- Synthetic 864x1536 scene-2 render PASS; smartphone surround/red rim verified by pixel guard.

## Syntax / tests
- `python test_v1636_guard.py`: PASS
- `python -m py_compile server.py instagram_bot.py`: PASS (existing `server.py` invalid-escape SyntaxWarning only)
- `node --check app.js`: PASS

## Change isolation
No changes to ABCDE thresholds, MET Norway/GFS/meteoblue integration, Open-Meteo ordering/circuit breaker, nationwide grading, waypoint grading, Instagram scene 1 or 3, course data, CT data, or fixed coordinates.

**Release status: PASS / regression 0.**
