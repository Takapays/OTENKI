# TRATEN V1.6.36

## Change
- Instagram Reel scene 2 (槍ヶ岳) is now rendered inside a centered smartphone mockup.
- The existing dynamic scene content is preserved: date/area, daily A-E, hourly A-E, gust chart, rain chart, MET/GFS legend, and 「他の山はトラテンで！」 CTA.
- Phone presentation uses a light neutral background, red rim, black bezel, speaker/camera detail, rounded screen and home indicator.
- Reel cache revision was bumped so previously rendered scene 2 is not reused.

## Isolation
- `app.js`: version only (1.6.35 -> 1.6.36).
- `server.py`: version only (1.6.35 -> 1.6.36).
- `instagram_bot.py`: one presentation helper plus scene-2 wrapper and render revision only.
- No weather logic, ABCDE thresholds, nationwide analysis, waypoint analysis, routes, fixed points, CTs or Open-Meteo/meteoblue logic changed.
