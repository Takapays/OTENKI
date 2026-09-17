# Traten V1.6.55 Release Audit

Base: V1.6.54

## Intended change
Add a WeatherAPI.com shadow-comparison path without changing the production nationwide A-E decision.

## Regression checks performed before packaging
PASS:
- `python -m py_compile server.py instagram_bot.py`
- `node --check app.js`
- `app.js` change versus V1.6.54 is only `APP_VERSION` 1.6.54 -> 1.6.55.
- Existing top-level `server.py` functions removed: 0.
- Existing top-level `server.py` functions changed: 0.
- New top-level functions: 4 only:
  - `_weatherapi_shadow_request_point`
  - `_weatherapi_shadow_day_result`
  - `_weatherapi_shadow_collect`
  - `weatherapi_shadow_refresh`
- Existing core functions AST-identical to V1.6.54:
  - `_refresh_national_persistent_cache`
  - `_national_fill_metno`
  - `_national_result_from_metno`
  - `_instagram_load_fresh_100_results`
  - `national_outlook_refresh_cache`
- Dependency-controlled 100x3 shadow collector test:
  - mountainsRequested = 100
  - apiCalls = 100
  - expectedRows = 300
  - rowsReturned = 300
  - usedByProductionGrade = false
- WeatherAPI hourly parser static test:
  - kph -> m/s conversion verified
  - 06:00-15:00 filter verified
  - precipitation/humidity/cloud/visibility aggregation verified
- Workflow YAML parsed successfully.
- Workflow contains exactly one daily cron: `35 21 * * *` (06:35 JST).
- Workflow target is Cloud Run production endpoint `/api/weatherapi-shadow/refresh`.
- Workflow uses existing GitHub secret `TRATEN_CACHE_REFRESH_TOKEN`; WeatherAPI API key is not stored in the workflow or repository.

## Existing warning
`server.py` still emits the pre-existing Python SyntaxWarning for the embedded JavaScript regex string `\\s`. This predates V1.6.55 and was not changed.

## Not executed locally
- Live WeatherAPI.com 100-mountain run: not executed in the packaging environment (no outbound network).
- Live Cloud Run/GitHub Actions execution: not executed during packaging.
- Production A-E output comparison: intentionally not applicable because WeatherAPI shadow data is not consumed by production grading.

## Deployment prerequisite
Before the scheduled workflow can succeed, the Cloud Run production service `traten` must expose Secret Manager secret `WEATHERAPI_KEY` as environment variable `WEATHERAPI_KEY`.
