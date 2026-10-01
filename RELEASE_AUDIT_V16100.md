# Traten V1.6.100 Release Audit

## Baseline
- Exact baseline: V1.6.99 package.
- Scope: restore national-map/detail grade parity without changing the A-E thresholds.

## Root cause
V1.6.99 solved the visible A -> D jump by locking opened-mountain detail to the older nationwide snapshot. That hid the discrepancy rather than correcting it.

The nationwide row generator and opened-mountain detail already use the same core MET Norway / NOAA GFS integration plus JMA MSM / deterministic GFS / GEFS ridge-continuity policy. The remaining large gap can occur because the map is allowed to display a shared row up to four hours old while tapping a mountain performs a fresh one-point model acquisition. Thus an optimistic A can be materially older than the D obtained on tap.

## V1.6.100 behavior
1. The opened-mountain live calculation is authoritative again. It may change the displayed national grade when fresh evidence is worse or better.
2. The live detail result is written back to the in-process point cache and Supabase shared cache, so the map and later users converge to the same result.
3. On normal page/date load, cached A/B results receive a targeted parity check when old enough:
   - A: 60 minutes by default.
   - B: 120 minutes by default.
   - C/D/E: retain the normal four-hour cache policy.
4. The targeted parity check bypasses the point cache and runs the same national MET/GFS/JMA/GEFS pipeline used for newly generated rows.
5. `最新情報取り込み` now performs a true forced refresh of every displayed mountain instead of returning still-fresh four-hour cache rows.
6. The existing four-hour persistent cache TTL, cache-age display, A-E thresholds, ridge-wind formulas, and national engine ID are unchanged.

## Why this is safer than V1.6.99
- A stale A is no longer protected from a fresh D discovered on tap.
- The most optimistic map grades are revalidated more frequently without forcing a full 100-mountain refresh on every page open.
- A user tap becomes a repair path for the shared cache rather than a separate private truth that disappears when the panel closes.

## Verification
- `node --check app.js`: PASS.
- `python3 -m py_compile server.py`: PASS except the pre-existing unrelated invalid-escape SyntaxWarning.
- `python3 test_v16100_grade_parity.py`: PASS.
- Static guards confirm:
  - optimistic A/B verification uses `force_fetch=True`;
  - the green refresh button forces all displayed rows;
  - detail no longer uses the V1.6.99 snapshot lock;
  - detail writes the live reconciled row back to shared cache;
  - A-E threshold branches are unchanged.

## Production acceptance
A live production check is still required. Confirm at least one previously mismatched mountain by comparing:
1. the first national-map grade after the automatic A/B parity pass, and
2. the grade after tapping that mountain.

Small differences caused by a model update during the interaction are acceptable. A large A -> D gap should no longer persist because of cache-generation mismatch.
