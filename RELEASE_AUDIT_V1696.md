# Traten V1.6.96 Release Audit

## Scope
This release changes cache refresh pacing and cache telemetry only. Weather-model and grade logic are intentionally unchanged.

## Changes
- `APP_VERSION`: 1.6.96 in `server.py` and `app.js`.
- `index.html` loads `app.js?v=1.6.96`.
- `NATIONAL_100_ROLLING_DATES_PER_CYCLE` default changed from 1 to 2.
- `/api/national-outlook` cache metadata now exposes:
  - `freshCount` / `totalCount`
  - `averageAgeSeconds`
  - `oldestAgeSeconds`
  - `newestAgeSeconds`
- Legacy `ageSeconds` remains and still represents the oldest row for backward compatibility.
- Nationwide UI displays fresh coverage + average age + oldest age + 240-minute TTL.

## Expected behavior
With the existing 15-minute external scheduler, two rolling dates can be processed per cycle instead of one. A seven-day rolling window can therefore advance materially faster, while preserving the per-date completion preference and the existing deadline/rate-limit safeguards.

## Verification
- Python compile: PASS.
- JavaScript syntax: PASS.
- Static checks: version references, rolling-cycle default, and new cache-age metadata/display fields verified.
- Forecast engine ID unchanged: `metno-gfs-jma-ridge-gust-worstof-v18-gefs-fallback`.
