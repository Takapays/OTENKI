# Traten V1.6.95 Release Audit

## Confirmed production failure
Render traceback showed `_national_fetch_shared()` raising:

`AttributeError: 'NoneType' object has no attribute 'get'`

on the `ridgeContinuityVersion` cache-policy read while the per-point cache was empty.

## V1.6.95 fix
- Normalize `_national_point_cache_get(...)` to `cached_row = cached if isinstance(cached, dict) else {}`.
- Every cache-policy field read uses `cached_row.get(...)` only.
- No nullable `cached.get(...)` remains in that decision block.
- No change to GFS/JMA/GEFS grade logic, cache engine ID, Supabase/local architecture, or 4-hour TTL.
- Version bump is intentional so Render/Cloud Run deployment can be verified unambiguously as 1.6.95.

## Verification
- Python compile: PASS.
- JavaScript syntax: PASS.
- Cold-cache static regression: PASS (`cached_row` normalization present; no `cached.get` in the block).
- National cache engine remains `metno-gfs-jma-ridge-gust-worstof-v18-gefs-fallback`.
