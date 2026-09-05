# Traten V1.5.174

Open-Meteo 429 diagnostics and request-pressure reduction.

## Changes
- Added per-analysis Open-Meteo request audit counters.
- Final analysis status reports actual Open-Meteo proxy request count, 429 count, duplicate coalescing count, and requests skipped by the 429 circuit breaker.
- Added `weather_api_audit` event metadata for later log analysis.
- Coalesces identical concurrent proxy requests so one upstream call serves all waiting consumers.
- Keeps successful identical proxy responses for 2 minutes in-memory to avoid immediate duplicate upstream calls.
- After the first Open-Meteo HTTP 429, suppresses additional Open-Meteo upstream requests for 60 seconds and lets existing MET Norway / NOAA GFS fallback paths take over.
- The existing route-point weather request design remains batched: one Open-Meteo request per model covers all uncached route points.
- MET Norway identical fallback requests are also coalesced/cached by the common proxy layer.

## Important finding
The normal point-forecast code was already batching all route points into one request per model. Therefore a typical analysis is not sending one Open-Meteo request per point. V1.5.174 makes the actual count visible so recurring 429s can be distinguished from app-side request multiplication.

## Verification
- `node --check app.js`: PASS
- APP_VERSION: 1.5.174
- index desktop/mobile visible version: V1.5.174
- app.js cache buster: 1.5.174
