# Traten V1.5.184

## Weather ensemble switch
- Normal operation: Open-Meteo group (up to 4: JMA MSM / ECMWF IFS / GFS / ICON) + always-on independent support group (MET Norway / meteoblue) = up to 6 models.
- NOAA direct GFS is NOT fetched during normal operation, avoiding duplicate GFS weighting.
- Open-Meteo 429/5xx/network failure: switch to MET Norway + meteoblue + NOAA direct GFS = up to 3 fallback models.
- Dual-ensemble logic remains group-weighted, not a simple 4-vs-2 vote.
- Safety-side handling remains: material group disagreement preserves adverse rain/wind/visibility; gust and CAPE keep the adverse maximum.
- Overnight analysis also supplements successful Open-Meteo data with MET Norway + meteoblue; NOAA direct is reserved for Open-Meteo failure.
- guide.html updated to document the normal 6-model / failure 3-model logic.

## Verification
- app.js syntax check
- server.py compile check
- ZIP integrity check
