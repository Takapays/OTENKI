# Traten V1.6.28 Release Audit

## Scope
Element-specific weather-model integration and meteoblue API-credit protection. No course, fixed-point, CT, representative-route, access, water, hut, camera or Instagram layout data was edited.

## Regression baseline
| Audit item | Canon V1.6.1 | Previous V1.6.27 | V1.6.28 | Result |
|---|---:|---:|---:|---|
| Japan 300 mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| CT missing | 0 | 0 | 0 | PASS |
| Estimated CT | <=1 | 1 | 1 | PASS |
| Representative routes | 415 | 416 | 416 | PASS (no decrease) |
| Existing JS top-level functions deleted | - | 0 | 0 | PASS |
| Existing server top-level functions deleted | - | 0 | 0 | PASS |

V1.6.28 edits only weather integration/display functions plus version/cache identifiers. The app.js diff contains no edits to route/CT/fixed-coordinate definition regions.

## Weather behavior tests
- Direct GFS temperature 18 C vs MET 3 C / MB 4 C => integrated temperature 3 C: PASS.
- Direct GFS gust 30 m/s with MET gust missing / MB gust 8 m/s => integrated gust 8 m/s: PASS.
- Wind 2 / 10 / 4 m/s (MET/GFS/MB) => disagreement arbiter 4 m/s: PASS.
- Rain 0 / 2 / 0.4 mm/h => disagreement arbiter 0.4 mm/h: PASS.
- MET gust present => MET gust wins: PASS.
- JS fallback integration has the same exclusions/arbiter thresholds: PASS.
- Meteoblue 3-hour fields are linearly interpolated to hourly rows instead of nearest-3h stepping.

## Syntax / preservation
- `node --check app.js`: PASS
- `python -m py_compile server.py`: PASS (pre-existing embedded-JS SyntaxWarning only)
- V1.6.27 PoC parser test: PASS
- V1.6.28 server element-policy tests: PASS
- V1.6.28 app element-policy tests: PASS
- JS top-level functions: 481 -> 481, missing 0
- server top-level functions: 151 -> 156, missing 0 (5 new helpers)

## Release decision
Regression detected: 0. Release permitted.
