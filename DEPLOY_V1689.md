# V1.6.89 deployment checks

After deployment, open `/api/health` and confirm:

- `version`: `1.6.89`
- `supabase_configured`: `true`
- `national_persistent_cache_configured`: `true`
- `national_supabase_local_fallback_active`: `false`
- `national_cache_active_backend`: `supabase-primary`

For scheduled refresh, use one of the existing supported paths:

- Recommended for Cloud Run: keep the token-protected `/api/national-outlook/refresh-cache` external schedule enabled (existing GitHub Actions / scheduler).
- Optional in-process worker: set Cloud Run environment variable `NATIONAL_OUTLOOK_AUTO_REFRESH=1`; health should then show `national_auto_refresh_enabled:true` and the runtime state should leave `disabled` after startup grace.

The +3-day opening check should be done by moving across several nationwide-analysis dates. Cache-only date changes should return the saved result without waiting on JMA repair.
