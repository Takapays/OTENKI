# Deploy V1.6.102

1. Apply/upload the V1.6.102 files to the GitHub repository used by Render / Cloud Run.
2. Deploy normally.
3. Open `/api/health` and confirm:
   - `version` = `1.6.102`
   - `national_cache_engine` = `metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7`
   - `national_refresh_interval_seconds` = `3600` (or greater)
   - `national_100_rolling_days` = `7`
   - `national_cache_ttl_seconds` = `14400`
4. No Render environment edit is required if `NATIONAL_OUTLOOK_REFRESH_INTERVAL` is still `900`; V1.6.102 clamps it to at least `3600`.
5. The existing GitHub Actions 15-minute wake-up may remain temporarily. Calls inside the one-hour server interval return `state: interval-not-due` without running the expensive Supabase refresh cycle.
6. After Supabase egress resets, confirm `national_cache_active_backend` returns to `supabase-primary` and `national_supabase_local_fallback_active` is `false`.
7. Watch Supabase egress for several days. The target is to keep average daily egress comfortably below roughly 167 MB/day if the 5 GB monthly free allowance must last 30 days.
