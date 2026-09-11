# Traten V1.6.50 Release Audit

## Scope
V1.6.49 -> V1.6.50. Instagram carousel pages 2-8 only.

## Changed files
- `instagram_bot.py`
- `instagram_carousel_forecast_bg.png` (new)
- `README_V1650.md` (new)
- `RELEASE_AUDIT_V1650.md` (new)

## Intended change
- Pages 2-8 use the approved sky/ocean/Japan-islands background.
- Real nationwide rows continue to supply the A-E markers.
- Marker projection is visually aligned to the approved background.
- The easternmost Hyakumeizan marker (Rausu-dake) is kept fixed while the marker distribution is stretched leftward by 1.10x.
- Global marker position is adjusted upward by 54 px and rightward by 14 px.
- The supplied Traten logo is composited with its connected white edge background removed.

## Verification performed
- `python -m py_compile instagram_bot.py`: PASS
- `python -m py_compile server.py`: PASS (pre-existing SyntaxWarning remains)
- `node --check app.js`: PASS
- `render_national_carousel_images()` synthetic 9-page render: previously confirmed in this work session.
- Latest page-2 implementation preview generated from the modified `instagram_bot.py`: confirmed.

## Not executed
- Production Render deployment: 未実施
- Production Instagram publish/API: 未実施
- Live Supabase forecast cache read in this environment: 未実施

## Regression scope
No files other than the four listed above are included in this diff package. Reel assets/code and V1.6.49 application/server files are not included.
