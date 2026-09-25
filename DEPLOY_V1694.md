# V1.6.94 deployment check

1. Confirm `/api/health` reports `version: "1.6.94"` on Render and Cloud Run.
2. Confirm `national_cache_engine` remains `metno-gfs-jma-ridge-gust-worstof-v18-gefs-fallback`.
3. Open 9/26 and run `全国を判定` once.
4. In logs, confirm the immediate four-line `national_chunk_failed start=0/25/50/75` pattern has disappeared.
5. Confirm either rows are generated or provider-specific diagnostics now appear (`national_model_mix`, `national_missing`, `national_gfs_failed...`, etc.).
6. If MET Norway still reports `requested=25 ok=0` with every error counter zero, inspect it separately; V1.6.94 intentionally does not hide that provider/data issue.
