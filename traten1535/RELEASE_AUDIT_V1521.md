# V1.5.21 Release Audit

## Scope
- 王道ルート導線を前回作成ルート / 保存ルートより上へ移動
- 王道ルートを暖色の強調ボタンへ変更
- 04 地点別予報をPC/スマホ共に縦方向へコンパクト化
- 温度 / 風 / 雨 / 視界のゲージバーは維持

## Syntax
- `node --check app.js`: PASS
- `node --check water-sources.js`: PASS
- `node --check trailheads.js`: PASS
- `node --check huts.js`: PASS
- `node --check live-cameras.js`: PASS
- `python3 -m py_compile server.py`: PASS

## UI static assertions
- `classic-route-launch` が `lastAnalysisPanel` より前: PASS
- 王道ルート強調グラデーション: PASS
- 04地点別予報の専用compact CSS: PASS
- PC/スマホ双方のcompact override: PASS
- `.rf-gauge-track` / `.rf-gauge-fill` / `.rf-gauge-thumb` が残存: PASS
- compact後もゲージ高さ8pxを明示: PASS

## CT regression
`node audit_expanded_ct_v14232.js`
- mountains: 300
- courses: 380
- expanded directional segments: 901
- verified/composed CT: 768
- estimated CT: 133
- derived intermediate-point CT: 0
- CT missing: 0
- route build errors: 0
- point/segment alignment errors: 0

`node audit_representative_v14198.js`
- representative courses: 380
- confirmed supplemental generated: 16

## Classic route regression
`node audit_classic_routes_v1520_detail.js`
- routes: 9
- segments: 102
- missing CT: 0
- estimated CT: 0
- derived CT: 0

## Progressive weather rendering
`async function analyze()`
- V1.5.20: 7517 bytes
- V1.5.21: 7517 bytes
- SHA-256 both: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`
- byte-identical: PASS

## Water dry-run
- `python3 audit_water_300.py --dry-run`: 300/300, no network requests, PASS
- `python3 audit_water_v2_candidates.py --dry-run`: 65/65 route geometry, corridor centers 533, no Overpass requests, PASS

## Browser visual validation
- Headless Chromiumで初期画面の実描画確認を試行したが、この実行環境ではプロセスがタイムアウトしスクリーンショット生成に至らなかった。
- そのため、実ブラウザの視覚確認は未完了。DOM順序・CSS適用条件・構文・回帰監査を実施済み。
