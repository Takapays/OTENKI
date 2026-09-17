# Traten V1.6.55

Base: V1.6.54

## WeatherAPI.com shadow PoC
WeatherAPI.com is added as a comparison-only source for the Japan 100 mountains.

- 100 mountains
- one WeatherAPI request per mountain
- up to 3 forecast days per request
- 06:00-15:00 local-hour aggregation
- output: comparison JSON only
- production A-E national decision: unchanged
- production Supabase national cache: unchanged
- existing MET Norway/GFS/meteoblue acquisition and merge: unchanged
- existing `national-cache-refresh.yml`: unchanged

A new protected endpoint generates the comparison JSON:

`POST /api/weatherapi-shadow/refresh`

It uses the existing `X-Traten-Cache-Token` authorization header and reads `WEATHERAPI_KEY` from the runtime environment/Secret Manager.

A new GitHub Actions workflow runs once daily at 06:35 JST and uploads the returned JSON as a 30-day workflow artifact.

The JSON includes WeatherAPI shadow aggregates and, when available, the existing cached national grade for the same mountain/date. `usedByProductionGrade` is always `false` in this PoC.

## Added workflow
- `.github/workflows/weatherapi-shadow-refresh.yml`

## Changed production files
- `server.py`
- `app.js` (version synchronization only)
