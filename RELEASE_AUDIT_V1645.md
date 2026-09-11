# Traten V1.6.45 Release Audit

## Baselines
- Canonical regression baseline: V1.6.1 (= V1.5.231).
- Immediate previous release: V1.6.44.

## Intended change
Only the proactive rolling-cache scope changes: 300 mountains -> Japan 100 mountains.
Nationwide analysis for all 300 mountains remains available on demand. Existing non-100 cached rows are not destructively deleted; they age out normally.

## Regression comparison

| Protected item | Canon V1.6.1 | V1.6.44 | V1.6.45 | Result |
|---|---:|---:|---:|---|
| Japan 300 mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | <=1 | 1 | 1 | PASS |
| Representative courses | 415 | 416 | 416 | PASS |
| Existing fixed points | no decrease | unchanged | unchanged | PASS |
| Existing CT deletion/downgrade | prohibited | none | none | PASS |
| Existing server functions | no unintended deletion | 172 | 172 | PASS |
| Existing JS named functions | no unintended deletion | 515 | 515 | PASS |
| Proactive cache scope | 300 in V1.6.1 | 300 | **100** | INTENTIONAL CHANGE |

## Source delta V1.6.44 -> V1.6.45
- server.py: APP_VERSION + proactive cache scope fixed to 100. No function deletion.
- app.js: APP_VERSION only.
- index.html: version/cache-buster only.
- data-audit.html: version/cache-buster only.
- No route/CT/fixed-point/weather-grade/meteoblue-arbitration changes.

## Behavior guards
- `NATIONAL_PREFETCH_COUNT = 100` is explicit and no longer accepts a stale deployment env value of 300.
- Existing `_national_load_prefetch_points()` 100-member filter is retained.
- Existing `_national_load_100_points()` validates exactly 100 unique members.
- On-demand `/api/national-outlook` still accepts up to 300 points.

## Executed checks
- `python -m py_compile server.py`: PASS (pre-existing embedded-JS invalid-escape SyntaxWarning only).
- `node --check app.js`: PASS.
- Top-level Python function catalog: 172 -> 172, deleted 0.
- Named JS function catalog: 515 -> 515, deleted 0.
- Version consistency in server/app/index/data-audit: 1.6.45.
- Diff inspection: no route/CT/fixed-point data edits.

## Release interpretation
Local/source regression audit: PASS. The only intentional regression-rule exception is the user-requested reduction of proactive cache scope from 300 to 100. All 300 mountains remain in the product and remain analyzable.
