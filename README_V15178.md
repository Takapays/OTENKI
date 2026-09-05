# Traten V1.5.178

## Changes
- Open-Meteo unavailable: fetch MET Norway and NOAA GFS in parallel instead of using NOAA only when MET Norway fails.
- Passage-point representative values and timeline rows are blended from both fallback models when both succeed.
- If only one fallback model succeeds, analysis continues with that model.
- Overnight fallback also fetches MET Norway + NOAA GFS and blends the available overnight timeline.
- Open-Meteo 5xx responses now use the same dual-model overnight fallback as HTTP 429.
- Version/cache-buster updated to V1.5.178.

## Verification
- node --check app.js: PASS
- ZIP integrity: checked during release packaging.
