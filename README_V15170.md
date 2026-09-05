# Traten V1.5.170

- Fix visible version reverting to V1.5.146 by updating APP_VERSION in the core app.js itself.
- Move passage-point weather fallback into core app.js instead of an external monkey patch.
- Open-Meteo 429/5xx/network failure -> MET Norway full +/-6h passage timeseries.
- If MET Norway is unavailable -> NOAA GFS direct multi-time fallback (-6,-3,0,+3,+6h).
- Existing overnight fallback behavior remains unchanged.
