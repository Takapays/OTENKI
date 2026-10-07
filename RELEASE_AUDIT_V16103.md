# Traten V1.6.103 Release Audit

## Baseline
- Exact baseline: V1.6.102.
- Scope: top-of-app temporary maintenance notice only.

## Change
- Reused the existing temporary-notice mechanism.
- Public top page displays: `お知らせ　11/7まで全国分析キャッシュはメンテ中です。最新情報を取得で分析は可能です。`
- Notice lifetime is JST-aware and ends automatically after 2026-11-07.

## Preserved behavior
- V1.6.102 Supabase-egress reduction behavior is unchanged.
- National cache engine remains `metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7`.
- 7-day / 100-mountain rolling target and four-hour cache TTL remain unchanged.
- Weather grades, ridge-wind logic, detail analysis and user-triggered latest-information analysis are unchanged.

## Verification
- JavaScript syntax: PASS.
- Python compile: PASS except the pre-existing unrelated invalid-escape SyntaxWarning.
- Notice/version static regression: PASS.
- V1.6.102 egress and behavior regression suites: PASS after version assertion update.
