# Traten V1.6.89

Base: V1.6.88

## Main changes
- Fixes the nationwide-analysis +3-day delay on date-open.
- `cacheOnly:true` is now truly cache-only: it never performs synchronous JMA MSM repair/network access before returning the saved nationwide cache.
- Existing cached JMA evidence is still reconciled locally, so no already-saved safety-side grade is discarded.
- Pressing `全国を判定` now paints the shared cache first, keeps it visible, and refreshes missing/expired rows behind that display.
- `/api/health` now reports `national_cache_active_backend` as `supabase-primary`, `local-fallback`, or `local-only`.
- `app.js`, `server.py`, visible version labels, and `app.js?v=` are synchronized to V1.6.89.

## Supabase / scheduled refresh
The current cache design already prefers Supabase when it is configured and the fallback circuit is not active. Local `/tmp` remains the fallback.

`national_auto_refresh_enabled` is the in-process worker switch only. The existing `/api/national-outlook/refresh-cache` token-protected endpoint remains the reliable external scheduler path for Cloud Run/GitHub Actions. V1.6.89 does not silently override deployment environment variables.

If the deployment intentionally wants the in-process worker too, set `NATIONAL_OUTLOOK_AUTO_REFRESH=1` in the Cloud Run environment. Otherwise keep the external scheduled refresh enabled.
