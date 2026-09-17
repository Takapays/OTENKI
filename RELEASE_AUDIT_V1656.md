# Traten V1.6.56 Release Audit

Base: V1.6.55

## Intended change
- Preserve WeatherAPI.com returned `location.name`, `location.region`, `location.lat`, and `location.lon` in the shadow comparison output.
- Calculate great-circle distance between the registered mountain coordinate and the WeatherAPI returned coordinate.
- Summarize unique returned locations and groups where multiple mountains map to the same returned coordinate.
- Do not use these fields in production A-E decisions.

## Regression checks performed before packaging
PASS:
- `python -m py_compile server.py instagram_bot.py`
- `node --check app.js`
- V1.6.55 source baseline verified against reconstructed V1.6.55 `server.py` / `app.js`.
- Existing `server.py` function count: 200 -> 200; deleted functions: 0; added functions: 0.
- Existing WeatherAPI daily workflow `.github/workflows/weatherapi-shadow-refresh.yml`: byte-identical to V1.6.55.
- `instagram_bot.py`: byte-identical to V1.6.55.
- Controlled 100-mountain x 3-day shadow-collection regression:
  - 300 rows returned
  - 100 returned locations captured
  - duplicate provider-coordinate grouping detected as expected
  - per-row provider location fields present
  - `usedByProductionGrade` remained `False`
- Existing production-file differences from V1.6.55 are limited to:
  - `server.py`: version sync + WeatherAPI shadow location metadata / summary only
  - `app.js`: version `1.6.55` -> `1.6.56` only

## Existing warning
`server.py` still emits the pre-existing Python `SyntaxWarning` for the embedded JavaScript regex string `\\s`. This warning was not introduced by V1.6.56.

## Not directly executed in this build environment
- Live WeatherAPI.com calls were not made from the packaging environment.
- Live Cloud Run / GitHub Actions execution is therefore unverified until deployed.
- 100/300 mountain master data files are not part of the V1.6.55 diff workspace used for packaging, so their row counts were not re-counted here. V1.6.56 does not include or modify those files.
