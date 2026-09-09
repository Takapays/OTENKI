# TRATEN V1.6.38 Release Audit

## Fix
- Route-point analysis no longer bursts all meteoblue calls at once.
- Client-side meteoblue concurrency is capped at 2.
- Transient meteoblue HTTP 429 / 5xx is retried once after a short delay.
- If meteoblue is unavailable for a route point, the model table now shows an explicit `meteoblue（取得できず）` row with the recorded reason instead of silently omitting the model.
- Version/cache-busting synchronized to 1.6.38 in index/data-audit/app/server.

## Root cause assessment
V1.6.37 `analyzeFallbackThreeBatch()` launched every route point in parallel, and each point launched MET Norway / NOAA GFS / meteoblue in parallel. A route with many waypoints could therefore create a short meteoblue request burst. This explains why a small North Alps test could succeed while a longer route could lose meteoblue on an individual point. The change addresses that burst without changing the model-integration policy.

## Regression comparison
| Item | Canonical V1.6.1 | Previous V1.6.37 | Candidate V1.6.38 |
|---|---:|---:|---:|
| Japan 300 mountains | 300 | 300 | 300 |
| Coordinate issues | 0 | 0 | 0 |
| CT missing | 0 | 0 | 0 |
| Estimated CT | 1 | 1 | 1 |
| Representative courses | 415 | 416 | 416 |

No route / CT / coordinate declaration was edited. V1.6.38 app.js diff versus V1.6.37 is limited to APP_VERSION, meteoblue request throttling/retry, and explicit missing-meteoblue display.

## Function regression
- Existing app.js top-level functions retained: 482/482; missing 0.
- Added helper: `withMeteoblueClientSlot`.
- server.py behavior unchanged except APP_VERSION.

## Mandatory release guard
- HTML visible version == APP_VERSION: PASS
- `app.js?v=` == APP_VERSION: PASS
- data-audit `app.js?v=` == APP_VERSION: PASS
- JS syntax: PASS
- Python compile: PASS (pre-existing invalid-escape SyntaxWarning only)
- meteoblue concurrency guard: PASS
- meteoblue transient retry guard: PASS
- missing-meteoblue explicit row guard: PASS

## Scope isolation
Unchanged: ABCDE thresholds, MET/GFS/meteoblue element policy, Open-Meteo background ordering and 60-minute circuit breaker, nationwide analysis, route/CT/fixed-point data, Instagram reel scenes, weather chart logic.

**Release status: PASS / regression 0.**
