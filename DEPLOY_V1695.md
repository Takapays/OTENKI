# V1.6.95 deployment check

1. Deploy the same commit to Render and Cloud Run.
2. `/api/health` must report `version: "1.6.95"` on both.
3. Run 9/26 `全国を判定` once.
4. Confirm no new `AttributeError: 'NoneType' object has no attribute 'get'` appears.
5. Confirm no new `national_chunk_failed` is produced from that cache-policy path.
6. If acquisition still returns zero results, inspect the new provider logs (`national_metno_*`, `national_gfs_*`, `national_model_mix`) because execution will now reach the providers.
