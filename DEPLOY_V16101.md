# Deploy V1.6.101

1. Deploy the V1.6.101 files to the GitHub repository used by Render / Cloud Run.
2. Confirm `/api/health` reports `version: 1.6.101`.
3. Confirm `national_cache_engine` is `metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7`.
4. The engine change intentionally starts a new national derived-cache generation.
5. Normal page open should not issue the removed `verifyOptimistic` request.
6. `最新情報取り込み` should still force a full refresh; tapping a mountain should still run live detail and write it back.
