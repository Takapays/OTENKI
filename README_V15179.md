# Traten V1.5.179

## meteoblue fallback added
- Open-Meteo normal: existing models remain primary.
- Open-Meteo unavailable: MET Norway + NOAA GFS + meteoblue are fetched in parallel where available.
- Point forecast and +/-6h timeline blend all available fallback sources.
- Overnight forecast also blends all available fallback sources.
- meteoblue uses `basic-1h_clouds-1h` (hourly basic + cloud layers), up to 7 days.
- If meteoblue is not configured, Traten continues with MET Norway + NOAA GFS without failing.

## Required Render environment variable
1. Enable meteoblue Free Weather API and obtain an API key.
2. In Render > Service > Environment, add:
   `METEOBLUE_API_KEY=<your key>`
3. Redeploy.

The API key is kept on the server. The browser only calls `/api/meteoblue`.
