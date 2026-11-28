# V1.6.119 revised (low-egress edition)
Base: V1.6.118. Do not install the earlier V1.6.119 snapshot ZIP.
- National daily ridge grades: JMA and GFS both E => E; only one E => D when comparable coverage exists. Missing comparison, ridge wind >=22 m/s, estimated gust >=33 m/s, rain >=8 mm/h, or existing surface integration E retains E. GEFS is not independent corroboration. Hourly warnings and individual route decision logic are unchanged.
- Same decision helper used for fresh national generation, detail and cached row reconciliation. Existing cached rows can be reclassified without network or write. Detail still uses existing live acquisition and may differ when inputs differ (e.g. meteoblue or generation time).
- Cache engine remains v20-daily-e, same table/key, TTL, schedule, fields, network calls; no forced regeneration. No new hourly data stored. Existing stale data may remain in an offline browser fallback.
- Update Cloud Run service and both jobs to this image, keep their schedules and environment variables. Do not force a nationwide cache refresh solely for this release.
- Tests: python test_v16119_low_egress.py (optionally set TRATEN_118_ZIP to the 118 full ZIP for field and sample payload comparison); python -m py_compile server.py; node --check app.js. Production traffic and forecast distributions have not been measured.
