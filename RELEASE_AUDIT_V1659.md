# Release audit: V1.6.59

## Scope
Supabase egress reduction only. Base: V1.6.58.

## Directly verified
- `server.py` Python compile: PASS.
- `app.js` JavaScript syntax check: PASS.
- Version sync: `server.py` = 1.6.59, `app.js` = 1.6.59.
- Existing Python function removals: 0.
- New Python function: `_national_supabase_read_meta` only.
- `instagram_bot.py`: byte-identical to V1.6.58.
- `.github/workflows/weatherapi-shadow-refresh.yml`: byte-identical to V1.6.58.
- Render migration banner code remains present in `app.js`.
- WeatherAPI production guard/carry-forward code remains present in `server.py`.

## Supabase read classification
### Full result body remains required
- `_national_cached_snapshot()` and normal cache result reads.
- Instagram 100-mountain result loading.
- WeatherAPI shadow comparison against existing grades.

### Metadata-only in V1.6.59
- `_national_confirm_supabase_write()` read-after-write verification.
- `_national_fetch_and_persist()` final fresh/stale persistence count check.

Metadata query selects only:
`cache_key,generated_ts,fresh_until,stale_until`

## Behavior preserved
- Upsert must still return HTTP 2xx.
- Verification still requires the expected cache key to be fresh.
- Verification still requires stored `generated_ts` >= the just-written row timestamp.
- Retry count/delay settings are unchanged.

## Not yet verified in production
- Actual Supabase egress reduction after deployment.
- Supabase Usage Dashboard trend after the next scheduled refresh cycles.

## Recommended post-deploy check
Observe Supabase Egress for 6-24 hours. If usage remains high, inspect remaining full-result read paths and request frequency before considering database migration.
