# TRATEN V1.6.33 Release Audit

## Regression-first scope
Baseline: V1.6.1. Previous: V1.6.32.

| Item | V1.6.1 baseline | V1.6.32 | V1.6.33 |
|---|---:|---:|---:|
| Japan 300 mountains | 300 | 300 | 300 |
| Coordinate issues | 0 | 0 | 0 |
| CT missing | 0 | 0 | 0 |
| Estimated CT | <=1 | 1 | 1 |
| Representative courses | 415 | 416 | 416 |
| Removed top-level JS functions | - | - | 0 |
| Removed top-level server functions | - | - | 0 |

Route/CT/fixed-point declaration regions are unchanged versus V1.6.32.

## Root cause fixed
`_national_merge_two_models(..., mb)` supported meteoblue, but `_national_fetch_shared()` called it with MET Norway and NOAA GFS only. Therefore nationwide map grades never received meteoblue evidence. V1.6.33 adds a selective meteoblue acquisition stage and passes its result into the existing element-policy merger.

## Quota control
meteoblue is not sprayed across all 300 mountains. It is requested only when it can materially affect a nationwide decision: one direct model is missing, MET gust is unavailable on a provisional B-E result, or MET/GFS hourly wind/rain differ beyond the existing arbitration thresholds. The existing 6-hour payload cache is reused across dates.

## Waypoint verification
Waypoint first-pass already fetched MET Norway + NOAA direct GFS + meteoblue. V1.6.33 keeps that path and adds explicit `meteoblue X/Y points` status. Static guard verifies that `fetchMeteoblueFallback()` remains in the first visible pass and that fallback element blending uses meteoblue for gust fallback and wind/rain arbitration.

## Verification
- `node --check app.js`: PASS
- `python -m py_compile server.py`: PASS (pre-existing SyntaxWarning only)
- `python test_v1633_guard.py`: PASS
- server top-level functions: 165 -> 167; removed 0
- JS top-level functions: 482 -> 482; removed 0
- A-E thresholds changed: NO
- Open-Meteo background ordering changed: NO
- Open-Meteo 429 circuit: 60 minutes, unchanged

Release status: PASS.
