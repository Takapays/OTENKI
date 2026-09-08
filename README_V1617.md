# Traten V1.6.17

Instagram Reel scene 2 is now generated dynamically from the forecast date's Yarigatake national-detail data. The fixed screenshot is no longer referenced.

- Scene 1: nationwide A-E map
- Scene 2: Yarigatake A-E grade + gust chart + precipitation chart
- Scene 3: feature introduction
- Scene 2 uses MET Norway / NOAA GFS hourly data for 06-15 JST. Gust shows both models plus center value; precipitation shows two side-by-side model bars.
- If the hourly Yarigatake data is unavailable/incomplete, Reel generation fails instead of publishing a stale/fixed image.
- Static Instagram carousel remains 2 pages.
