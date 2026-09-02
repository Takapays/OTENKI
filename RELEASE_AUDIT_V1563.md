# Release Audit V1.5.63

## Implemented
- Apparent temperature derived from air temperature, relative humidity, and wind speed.
- Cold-weather fallback uses wind chill when humidity is unavailable.
- Point forecast cards show apparent temperature below air temperature.
- Temperature/cloud chart now plots air temperature and apparent temperature together.
- ABC low/high temperature grading uses apparent temperature when available.
- Route summary and generated commentary include the minimum apparent temperature.
- Combined rain + wind + low apparent temperature creates a hypothermia hazard/message.
- Model detail table includes model-by-model apparent temperature.

## Verification
- JavaScript syntax: PASS (`node --check app.js`)
- Python syntax: PASS (`python -m py_compile server.py`)
- Version consistency: PASS (app.js/server.py/index visible/cache busters = 1.5.63)
- Nationwide custom-route displayed pairs: 11,560; missing 0; estimated 0
- Explicit area network: 424/424 verified direct; missing 0; estimated 0
- Hyakumeizan union network: 700/700 verified direct; missing 0; estimated 0
- CT / coordinate / access data values were not edited in this release.

## Scope note
- This release was verified by syntax/static/network audit in the available runtime. A real browser visual interaction test was not performed, so no claim is made that every screen size was visually inspected.
