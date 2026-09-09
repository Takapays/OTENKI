# Traten V1.6.29 Release Audit

## Scope
全国分析の降水グラフ表示のみ。MET Norway / NOAA GFS の2本棒に、既存の `merged.series.rain`（トラテン統合値）を黒線＋点で重ねる。判定・統合計算は変更しない。

## Regression baseline
| Audit item | Canon V1.6.1 | Previous V1.6.28 | V1.6.29 | Result |
|---|---:|---:|---:|---|
| Japan 300 mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| CT missing | 0 | 0 | 0 | PASS |
| Estimated CT | <=1 | 1 | 1 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Existing JS top-level functions deleted | - | 0 | 0 | PASS |
| Existing server top-level functions deleted | - | 0 | 0 | PASS |

V1.6.29はV1.6.28のコース/CT/固定座標定義を変更していない。app.js実質差分は `nationalModelChartSvg()` のbars描画とAPP_VERSIONのみ。

## Display checks
- Rain bars remain MET Norway + NOAA GFS: PASS
- Integrated rain value is drawn as black line: PASS
- Integrated rain point markers are drawn: PASS
- Legend says `トラテン統合値`: PASS
- Existing element-specific integration policy unchanged: PASS

## Syntax / preservation
- `node --check app.js`: PASS
- `python -m py_compile server.py`: PASS (pre-existing embedded-JS SyntaxWarning only)
- V1.6.28 server/app policy tests: PASS
- V1.6.27 PoC parser test: PASS
- V1.6.29 rain integrated-line test: PASS
- JS top-level functions: 481 -> 481, missing 0
- server top-level functions: 156 -> 156, missing 0

## Release decision
Regression detected: 0. Release permitted.
