# Traten V1.6.97 Release Audit

## Baseline
- Exact baseline: V1.6.96 package.
- Scope: first-screen UI reorganization only, plus version synchronization and wording tied to the renamed refresh button.

## Requested changes implemented
1. Removed the top `全国 / 自分専用` choice block.
2. Removed the header's four feature-description badges.
3. Relocated the four resource shortcuts below nationwide analysis:
   - 登山口
   - 山小屋
   - 水場
   - ライブカメラ
4. Moved `全国分析から、自分専用の登山天気予報へ` to the bottom of the page.
5. Renamed `全国を分析` to `最新情報取り込み` and updated user-facing instructions that referenced the old button name.
6. Synchronized client/server/static visible version to 1.6.97.

## Cache-age preservation
V1.6.96 cache telemetry is deliberately retained unchanged. The nationwide status still renders:
- `freshCount / totalCount`
- `averageAgeSeconds`
- `oldestAgeSeconds` (with legacy `ageSeconds` fallback)
- `TTL 240分`

The existing `キャッシュ鮮度 ... / 平均 ... / 最古 ... / TTL 240分` line remains on both cache-only first paint and explicit refresh results.

## Unchanged behavior
- Nationwide date and mountain-category filters are unchanged.
- Forecast engine ID and all weather/grade rules are unchanged.
- Supabase primary + local fallback architecture is unchanged.
- Scheduled cache-refresh behavior introduced through V1.6.96 is unchanged.

## Verification
- `node --check app.js`: PASS.
- `python3 -m py_compile server.py`: PASS, with the pre-existing unrelated invalid-escape SyntaxWarning.
- `test_v1697_ui_layout.py`: PASS.
  - version synchronization
  - top choice block removed
  - four header feature badges removed
  - resource shortcuts relocated below nationwide analysis
  - nationwide date/filter/status retained
  - cache freshness / average age / oldest age / TTL strings retained
  - bottom explanatory block relocated after main content
  - old nationwide button wording removed from visible UI text

## Not changed / not claimed
- No production deployment was performed from this build environment.
- No live forecast-provider or Supabase request was required for this UI-only change.
