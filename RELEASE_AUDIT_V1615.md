# V1.6.15 Release Audit

## Scope
Display-only loading feedback for nationwide mountain detail.

- `2モデルの時間別予測を取得しています…` -> `解析中！・・・`
- Red/bold loading text
- Animated three-dot progress indication

## Regression comparison

| Item | Canonical V1.6.1 | Previous V1.6.14 | Candidate V1.6.15 | Result |
|---|---:|---:|---:|---|
| Mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Fixed-point definitions | protected | unchanged | unchanged | PASS |
| CT definitions | protected | unchanged | unchanged | PASS |
| Existing JS top-level functions | protected | retained | no deletion | PASS |
| Existing server top-level functions | protected | retained | no deletion | PASS |

## Change isolation
After normalizing the V1.6.15 version identifiers and requested loading markup/CSS, the four touched application files are identical to V1.6.14. All other inherited application files are byte-identical to V1.6.14.

## Functional guards retained
- A-E nationwide grading unchanged
- Same-hour MET Norway / NOAA GFS mean unchanged
- D/E safety floor unchanged
- Wind 0-7 m/s, gust 0-15 m/s, rain 0-7 mm/h graph specification unchanged
- Hourly paired MET Norway / NOAA GFS rain bars unchanged
- Instagram A-E behavior unchanged

## Tests
`tests/test_v1615_guard.py`: 29 PASS

Release status: PASS
