# Release Audit V1.6.83

- Base: V1.6.79
- Scope: nationwide cache/JMA ridge repair only
- V1.6.82の「JMA稜線風必須でキャッシュ行を除外する」処理: 不採用
- Browser cache namespace: `traten:national-outlook:v1683-jma-repair`
- Server national engine: `metno-gfs-jma-ridge-gust-worstof-v16-consistent-grade`（V1.6.79互換）
- Missing elevation repair from existing app route data: 御嶽=3067m / 大山（鳥取）=1709m
- Cached JMA series -> daily badge safety-side reconciliation: implemented
- Cached row missing JMA ridge -> JMA-only repair, no MET/GFS refetch: implemented
- Detail JMA repair -> shared cache write-back: implemented
- Existing A-E thresholds: unchanged
- Python syntax: checked with `py_compile`
- JavaScript syntax: checked with `node --check`
- Live upstream/API behavior: 未確認（デプロイ後確認が必要）
