# Traten V1.5.175

## Open-Meteo 429 gate
- Sends exactly one Open-Meteo model request first for each analysis.
- Uses JMA MSM as the probe through day 4, ECMWF IFS through day 15, and GFS on day 16.
- Only if that probe succeeds are the remaining Open-Meteo model requests started.
- If the probe gets HTTP 429, no additional real Open-Meteo model requests are sent; MET Norway / NOAA GFS fallback is used instead.
- The Open-Meteo 429 circuit breaker is extended from 60 seconds to 10 minutes and stored in sessionStorage so re-analysis/page reload in the same tab does not immediately hit Open-Meteo again.
- Overnight analysis starts after the probe. While the circuit is open, its Open-Meteo request is locally skipped and MET Norway is used.
- The completion audit now also shows remaining circuit-breaker minutes.

## Verification
- `node --check app.js`: PASS
- Version and cache-busters: 1.5.175
