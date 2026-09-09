# V1.6.35 Release Audit

## Scope
- Restore reliable meteoblue participation after V1.6.34 without changing ABCDE thresholds.
- Nationwide tapped detail: always request meteoblue for eligible 0-7 day dates, refresh MB/national cache generations, retry one transient upstream failure, and expose configured/fetched status.
- Waypoint analysis: keep MET Norway + NOAA GFS + meteoblue as the first visible pass; refresh the per-point browser cache generation so old provider snapshots are not reused.
- Nationwide overview remains selective for meteoblue to protect the free quota; tapped mountain detail is not selective.
- Copy changes: `山をタップで時間帯別分析📊` and `時間帯別解析中・・`.

## Regression
- Canonical V1.6.1: 300 mountains / representative routes 415 / CT missing 0 / estimated CT 1 / coordinate issues 0.
- V1.6.34: 300 / 416 / 0 / 1 / 0.
- V1.6.35: 300 / 416 / 0 / 1 / 0.
- Existing JS top-level functions: 480 -> 480, missing 0.
- Existing server top-level functions: 167 -> 167, missing 0.
- `node --check app.js`: PASS.
- `python -m py_compile server.py`: PASS (pre-existing regex SyntaxWarning only).
- `test_v1635_guard.py`: PASS.

## Change isolation
No route, CT, fixed-point, Instagram, Open-Meteo 60-minute circuit, or ABCDE threshold logic was changed.
