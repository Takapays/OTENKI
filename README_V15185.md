# Traten V1.5.185

## Root fixes
- Mobile representative-course display no longer depends on the shared `hidden` class or the legacy PC representative-course CSS.
- The dedicated mobile course panel is placed immediately below the mountain selectors.
- Visibility is controlled directly by JS with inline `!important`, and mountain changes trigger immediate + animation-frame + short delayed rerender.
- Course selection changes keep mobile/desktop summaries synchronized.

## Guide restoration
- Restored the richer guide structure that had been lost in recent rewrites.
- Restored/added: representative course + CT, nationwide analysis, route-wide summary, point forecast, overnight analysis, trailhead access, huts, water sources, live cameras, saved routes, classic traverses, previous route, screenshots, smartphone install/use.
- Updated the weather-model section to the current normal 6-model / Open-Meteo-failure 3-model logic.

## Verification
- `node --check app.js`
- `python3 -m py_compile server.py`
- duplicate mobile panel ID check
- required guide-section keyword check
- ZIP integrity check
