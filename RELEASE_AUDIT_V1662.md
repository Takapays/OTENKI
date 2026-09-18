# RELEASE AUDIT V1.6.62

## Scope
Open-Meteo JMA MSM daily shadow comparison only.

## Static checks
- `server.py`: Python compile completed. Existing repository emits pre-existing JS-regex SyntaxWarning strings only.
- `app.js`: `node --check` completed.
- Existing top-level Python functions removed: 0.
- Version synchronized: `server.py` and `app.js` = 1.6.62.

## New endpoint
`POST /api/openmeteo-jma-shadow/refresh`

Authorization uses the existing `X-Traten-Cache-Token` mechanism.

## Acquisition design
- Seed: existing Japan 100 mountain list.
- Model: Open-Meteo JMA MSM.
- Forecast horizon: 4 days.
- Batch size: 25 points, so normally 4 upstream calls per daily cycle.
- Registered mountain elevation supplied explicitly.
- `cell_selection=nearest`.
- Time window used for comparison: 06:00-15:00 JST.
- 429 handling: bounded retry/backoff.

## Production isolation
- The new collector does not write the shadow grade into the production national cache.
- `productionGradeUsed` is reported as false.
- No change to existing national grading functions or WeatherAPI production overlay.

## Comparison output
- existingGrade / existingSource
- shadowGrade / gradeDelta
- exact, one-step, two-plus counts
- JMA worse / JMA better counts
- per-date summary
- model grid latitude / longitude / elevation
- weather metrics and known input limitations

## Workflow
New `.github/workflows/openmeteo-jma-shadow-refresh.yml`:
- daily 06:20 JST
- manual `workflow_dispatch`
- artifact retained 30 days

## Verification limitation
The build environment used for packaging does not have Flask installed, so a full module-import mock execution was not available. Python compilation and JavaScript syntax checks passed. Real Open-Meteo/JMA API execution remains unverified until deployment/manual workflow run.
