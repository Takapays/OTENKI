# Deploy V1.6.98

1. Apply/upload the V1.6.98 files to the GitHub repository used by Render and Cloud Run.
2. Wait for deployment to finish.
3. Open `/api/health` and confirm `version` is `1.6.97`.
4. On mobile, confirm the first screen now flows directly from the header into `全国分析`.
5. Confirm the four resource shortcuts appear below nationwide analysis.
6. Confirm the green button reads `最新情報取り込み`.
7. Confirm the nationwide status still shows cache freshness / average age / oldest age / `TTL 240分` after cache data loads.
8. Confirm `全国分析から、自分専用の登山天気予報へ` appears at the bottom of the page.

No environment-variable or Supabase schema change is required.

Rollback: redeploy V1.6.96.
