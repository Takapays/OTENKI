# Deploy V1.6.96

1. Upload/commit the V1.6.96 files to the GitHub repository used by Render and Cloud Run.
2. Wait for both deployments to finish.
3. Open `/api/health` and confirm `version` is `1.6.96`.
4. Confirm `national_100_rolling_dates_per_cycle` is `2`.
   - If the platform explicitly defines environment variable `NATIONAL_100_ROLLING_DATES_PER_CYCLE=1`, change that environment value to `2`; an explicit environment setting overrides the new default.
5. Open the nationwide screen and confirm the cache line shows fresh coverage / average age / oldest age / TTL 240 minutes.
6. No Supabase schema change is required.

Rollback: redeploy V1.6.95.
