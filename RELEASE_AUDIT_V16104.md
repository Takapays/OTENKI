# Traten V1.6.104 Release Audit

## Baseline
- Exact baseline: V1.6.103.
- Scope: manual nationwide-refresh latency, progressive display, priority order, and one maintenance-notice wording correction.

## Manual nationwide refresh
1. The client divides the selected mountains into sequential 25-mountain requests.
2. Each response is merged into the existing map immediately, so users see useful results after the first 25 instead of waiting for all 100.
3. Requests contain only the active 25-point batch. This preserves V1.6.102's egress goal by avoiding four repeated full-100 Supabase result reads.
4. Priority is usefulness-first rather than north-to-south catalog order:
   - Group 1: 25 major / nationally representative mountains, including 10 Alpine or major high mountains.
   - Groups 2-3: another 50 popular / major regional mountains.
   - Group 4: the remaining 25 百名山 in stable catalog order.
5. Missing results in a refreshed batch remove the old marker result for that mountain instead of silently retaining stale data.

## Provider latency
- MET Norway, deterministic NOAA GFS, and JMA MSM are independent first-stage providers and now start concurrently with a 3-worker executor.
- GEFS remains last-resort ridge fallback after JMA/GFS evidence is known.
- meteoblue remains selective second-stage arbitration after MET/GFS evidence is known.
- `national_base_parallel` log lines expose MET/GFS/JMA and total first-stage elapsed time per batch.

## Notice wording
- Temporary notice now reads: `11/7まで全国分析キャッシュはメンテ中です。「最新情報を取り込み」ボタンで分析は可能です。`
- It still disappears after 2026-11-07 JST.

## Preserved behavior
- National cache engine remains `metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7`.
- Wind 7 m/s daily-C accumulation rule is unchanged.
- No A/B-only automatic refresh is reintroduced.
- 7-day x 100-mountain rolling scope and 4-hour TTL remain unchanged.
- V1.6.102 one-hour refresh gating / metadata-only status checks remain unchanged.
- Tapped-mountain live detail remains authoritative as in V1.6.101.

## Verification
- `node --check app.js`: PASS.
- `python3 -m py_compile server.py`: PASS except the pre-existing unrelated invalid-escape SyntaxWarning.
- `test_v16104_regression.py`: PASS.
- `test_v16104_egress.py`: PASS.
- `test_v16104_notice.py`: PASS.
- `test_v16104_progressive.py`: PASS.

## Production acceptance
- Live provider timing is not claimed from the build environment. Confirm actual speedup from Render `national_base_parallel` logs after deployment.
