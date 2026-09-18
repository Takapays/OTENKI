# V1.6.61 Release Audit

Base: V1.6.60

## Scope
1. Saved Routes entry visibility regression fix.
2. Nationwide mountain detail hourly forecast date label.

## Verified
- `node --check app.js`: PASS.
- `python -m py_compile server.py`: PASS (pre-existing regex SyntaxWarning may be emitted by Python).
- Saved Routes storage/read/write/modal functions remain present.
- When no previous route exists, `lastAnalysisPanel` is no longer hidden; only `lastRouteBtn` is hidden/disabled.
- Hourly detail receives the currently selected nationwide date and renders it as YYYY/MM/DD.
- `server.py` differs from V1.6.60 only by APP_VERSION 1.6.61.
- V1.6.60 Supabase local-fallback health/status markers remain present.

## Not changed
- A-E forecast decision logic.
- MET Norway / NOAA GFS / meteoblue / WeatherAPI decision logic.
- Supabase fallback behavior.
- Instagram behavior.
- Mountain datasets and coordinates.

## Not verified
- Full mobile-browser visual E2E on the production Cloud Run URL; verify after deployment on the previously affected device.
