# V1.6.118: national daily D/E policy

- A/B/C server rules and D's existing two severe-hour rule retained.
- Daily E: wind >=18 m/s, gust >=28 m/s, or rain >=8 mm/h at least once; or old E-level conditions (wind >=15, gust >=25, rain >=6) at least three slots in 06:00–15:00, not necessarily consecutive.
- One or two old E-level slots force at least D, never A/B/C. Hourly E warnings use original thresholds; route-point safety rules, thunder, hypothermia and other route hazards remain unchanged. Daily D is not a safety clearance.
- Integrated models, individual surface-model safety floor, JMA/GFS/GEFS ridge daily grading, browser fallback and decision text use the new daily policy. Single-model hard extremes can still give E. Instagram uses the same national cache results; its publication code is unchanged.
- Policy revision changes cache engine from v19-cumulative-wind7 to v20-daily-e on server and browser. No stale v19 rows are used as v20. Old rows are not automatically deleted. Normal rolling refresh must populate new cache; the two Cloud Run Jobs must use the same new image as the web service before relying on them. Instagram requires complete data and may skip/fail until coverage is restored. Do not run repeated forced national refreshes merely to fill cache. Monitor Supabase usage.
- Thresholds are app classification choices, not validated mountain safety limits. No live forecast distribution or production deployment was evaluated here. Test with live data before treating this release as validated.

Tests: `python test_v16118_daily_e.py`, `node --check app.js`, `python -m py_compile server.py`, existing V1.6.114/115/116 job mock tests and V1.6.117 search migration test.
