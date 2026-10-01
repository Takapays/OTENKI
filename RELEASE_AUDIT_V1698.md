# Traten V1.6.98 Release Audit

## Baseline
- Exact baseline: V1.6.97 package.
- Scope: small nationwide-analysis UI cleanup only.

## Change
1. Removed the explanatory strip above the nationwide cache summary: `山をタップすると、判定理由・判定基準・MET Norway / NOAA GFS / JMA MSM の時間帯別モデル差を確認できます。`
2. Kept the cache-age information visible, including `キャッシュ鮮度 ... / 平均 ... / 最古 ... / TTL 240分`.
3. No changes were made to nationwide analysis logic, weather models, cache TTL, or grading behavior.
4. Synchronized client/server/static visible version to 1.6.98.

## Verification
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS (pre-existing unrelated invalid-escape warning may remain)
- `python3 test_v1698_ui_layout.py`: PASS

## Not changed
- National cache freshness display remains visible.
- `最新情報取り込み` button behavior remains unchanged.
- Four shortcut buttons below nationwide analysis remain unchanged.
