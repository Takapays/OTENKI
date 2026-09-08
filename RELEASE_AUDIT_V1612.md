# V1.6.12 release / regression audit

Canonical baseline: **V1.5.231 = V1.6.1**
Previous release: **V1.6.11**
Candidate: **V1.6.12**

| Audit item | V1.6.1 baseline | V1.6.11 | V1.6.12 | Result |
|---|---:|---:|---:|---|
| Japan 300 mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Existing fixed points | protected | unchanged | unchanged | PASS |
| Existing CT definitions | protected | unchanged | unchanged | PASS |
| Existing representative-route definitions | protected | unchanged | unchanged | PASS |
| Existing top-level JS functions | protected | present | no deletion vs V1.6.11 | PASS |
| Existing top-level server functions | protected | present | no deletion vs V1.6.11 | PASS |

Evidence:
- V1.6.1 verification: 300 mountains / 415 representative routes / missing CT 0 / estimated CT 1 / coordinate issues 0.
- V1.6.11 regression audit: 300 / 416 / 0 / 1 / 0, and protected route/fixed-point/CT definitions unchanged.
- V1.6.12 `app.js` differs from V1.6.11 only in the version identifier and `showNationalOutlookDetail` placement. The complete app.js prefix before that function and suffix after the function are byte-identical after normalizing the version identifier. Therefore route/fixed-point/CT/catalog definitions are unchanged.
- V1.6.12 server.py differs only in version and removal of the legacy Instagram A-E -> ABC collapse.
- Same-parser top-level function-set comparison found zero JS deletions and zero server deletions.

## Requested-change validation
- A-E legend occurs once and is inside `#nationalOutlookMap`.
- Legend is an absolute, non-interactive map overlay.
- Model comparison slot appears before the existing mountain hero/detail content.
- MET Norway / NOAA GFS same-hour mean and D/E floors remain unchanged.
- Instagram consumes native A-E and no longer collapses C/D/E to ABC.
- Instagram map markers, legends, generated image cards, captions, persisted draft counts and post completeness checks all support A-E.
- Instagram Reel/static render revision bumped to invalidate old ABC media cache.
- Local synthetic Instagram render test: 100 markers across A-E rendered successfully; A-E caption generated successfully.
- `python tests/test_v1612_guard.py`: **44 PASS**.
- `node --check app.js`: PASS.
- `python -m py_compile server.py instagram_bot.py`: PASS (inherited server.py regex emits an existing SyntaxWarning only).

## External/live limitations
- Live MET Norway / NOAA GFS / Supabase / Render were not invoked.
- No live Instagram post was sent. Instagram image rendering was tested locally with synthetic A-E rows.

**Release decision: PASS — no regression detected in protected data/functions; requested scope only.**
