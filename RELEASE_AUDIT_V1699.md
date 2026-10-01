# Traten V1.6.99 Release Audit

## Baseline
- Exact baseline: V1.6.98.
- Scope: nationwide map/detail grade consistency only.

## Root cause
Two paths could make the displayed nationwide grade change only after tap:
1. Client detail hydration replaced the map/browser result with a fresh one-mountain detail result.
2. The cache-only read reconciliation inherited the old JMA-only logic even after GFS/GEFS ridge continuity was added, so saved GFS/GEFS evidence was not rechecked on first paint.

## Fix
- Detail hydration no longer mutates `nationalOutlookResults`, browser cache, grade badge, or map markers.
- `/api/national-outlook/detail` keeps an existing shared-cache grade as the authoritative detail grade and does not write a one-mountain live reconciliation back to shared cache.
- `_national_reconcile_cached_row()` now safety-side reconciles saved JMA, GFS and GEFS ridge series.
- GEFS-only/missing-primary A confidence cap is preserved on the read path.

## Unchanged
- National engine ID: `metno-gfs-jma-ridge-gust-worstof-v18-gefs-fallback`.
- Four-hour TTL.
- ABCDE thresholds.
- JMA/GFS/GEFS ridge-wind calculations.
- Cache-age display.
- Route analysis.

## Verification
- `node --check app.js`: PASS.
- `python3 -m py_compile server.py`: PASS except the pre-existing unrelated invalid-escape SyntaxWarning.
- `python3 test_v1699_grade_consistency.py`: PASS.
- `python3 test_v1699_ui_guard.py`: PASS.
