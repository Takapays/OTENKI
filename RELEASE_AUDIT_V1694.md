# Traten V1.6.94 Release Audit

## Baseline
- Exact baseline: V1.6.93.
- Scope: cold-cache nationwide analysis failure only.

## Production evidence
Render showed repeated `national_chunk_failed` for all four 25-mountain chunks on 2026-09-26. The four failures occurred essentially immediately, while `national_model_mix` / `national_missing` did not appear for those attempts. Earlier MET Norway diagnostic lines also showed `requested=25 ok=0` without an HTTP/timeout classification, but that is not required to explain the immediate V1.6.93 chunk failure.

## Root cause
In `_national_fetch_shared()`, V1.6.92/93 computed `cache_policy_ok` with calls such as `cached.get(...)` even when `_national_point_cache_get()` returned `None` on a cold cache.

That raises `AttributeError` before provider acquisition starts. Because the V18 engine intentionally invalidated old derived nationwide cache rows, a cold start was common immediately after the V1.6.92 deployment. The chunk wrapper then logged only `national_chunk_failed`, and no rows could be created.

## Fix
`cache_policy_ok` is now gated with `bool(cached)` before dereferencing cached metadata.

No weather thresholds, GFS/GEFS/JMA ridge logic, Supabase policy, cache engine ID, TTL, or A-E decision rules were changed.

## Cache identity
The engine remains:
`metno-gfs-jma-ridge-gust-worstof-v18-gefs-fallback`

This is a runtime cold-start bug fix, not a forecast-algorithm change, so V1.6.92/93 V18 rows remain valid.

## Verification
- `node --check app.js`: PASS.
- `python3 -m py_compile server.py`: PASS except the pre-existing unrelated invalid-escape SyntaxWarning.
- V1.6.93 GFS base-survival regression: PASS after version assertion update.
- Cache regression: PASS after version assertion update.
- New cold-cache regression: PASS; `_national_fetch_shared()` with `cached=None` no longer raises and reaches provider acquisition.

## Not claimed
- No live Render/Cloud Run provider request was executed from the build environment.
- The earlier MET Norway `ok=0` / zero error counters should be rechecked after this crash is removed; it may represent a separate no-usable-rows condition, but it is not the cause of the immediate four-chunk V1.6.93 crash.
