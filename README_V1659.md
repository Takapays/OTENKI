# Traten V1.6.59

## Purpose
Reduce Supabase egress without changing the national A-E decision logic, stored cache schema, WeatherAPI production guard, Instagram logic, or refresh cadence.

## Changes from V1.6.58
- Add `_national_supabase_read_meta()` for lightweight persistence verification.
- Read only `cache_key`, `generated_ts`, `fresh_until`, and `stale_until` when forecast result bodies are not required.
- Use metadata-only reads for per-write verification and the final persistence count check.
- Keep full `result` reads where forecast contents are actually required (cache snapshots/UI, Instagram, WeatherAPI shadow comparison).
- Synchronize `server.py` and `app.js` version to V1.6.59.

## Not changed
- National A-E grading and model arbitration.
- Supabase table/schema and stored `result` JSON.
- 15-minute nationwide refresh workflow cadence.
- WeatherAPI safety-overlay rules.
- Render migration banner behavior.
- Instagram bot implementation.
