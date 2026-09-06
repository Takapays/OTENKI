# Traten V1.5.182

## Changes
- meteoblue Free API package set expanded to `basic-1h + clouds-3h + wind-3h + air-3h`.
- meteoblue 3-hour cloud / gust / visibility / CAPE / lifted-index data are merged onto the nearest hourly basic forecast.
- Open-Meteo fallback ensemble remains MET Norway + NOAA GFS direct + meteoblue.
- Backup 2/3-model representative values now use median-based blending for temperature, humidity, rain, cloud, wind and visibility to reduce single-model outlier influence.
- Gust and CAPE remain adverse-side / maximum oriented for safety.
- Forecast confidence no longer forces a coherent 3-model backup ensemble to LOW; it can be MEDIUM when the three backup models agree.
- `guide.html` now documents NOAA GFS direct fallback, meteoblue, data resolution, and fallback ensemble logic.
- Version/cache busters updated to V1.5.182.

## Notes
- Near-term Open-Meteo success can provide JMA MSM / ECMWF IFS / GFS / ICON (up to 4 models depending on forecast horizon).
- When Open-Meteo is unavailable, backup availability depends on each provider's forecast horizon: meteoblue about 7 days, MET Norway about 9 days, NOAA GFS about 16 days.
