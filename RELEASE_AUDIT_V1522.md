# V1.5.22 Release Audit

## Scope
- 表銀座の大天井岳→槍ヶ岳で 18時間10分（1090分）になっていた不自然な composed CT を修正。
- 大天井ヒュッテ / ヒュッテ西岳 / 西岳 / 水俣乗越 / ヒュッテ大槍を王道ルートの明示通過ポイントに追加。
- 表銀座中盤を公開標準CTの隣接区間へ分解。
- 槍沢ロッヂ→横尾山荘の直接CTも追加。

## Before / After
### V1.5.21
- 大天井岳 → 槍ヶ岳山荘: 1090分（18時間10分）
- source: composed CT が遠回り経路を結合

### V1.5.22
大天井岳 → 槍ヶ岳（西岳山頂立寄り込み）:
- 大天井岳 → 大天荘 6分
- 大天荘 → 大天井ヒュッテ 34分
- 大天井ヒュッテ → ヒュッテ西岳 122分
- ヒュッテ西岳 → 西岳 16分
- 西岳 → ヒュッテ西岳 8分
- ヒュッテ西岳 → 水俣乗越 70分
- 水俣乗越 → ヒュッテ大槍 135分
- ヒュッテ大槍 → 槍ヶ岳山荘 51分
- 槍ヶ岳山荘 → 槍ヶ岳 30分
- 合計: 472分（7時間52分）

## Fixed waypoint coordinates
- 大天井ヒュッテ: 36.362846, 137.695560（北アルプス山小屋友交会）
- ヒュッテ西岳: 36.335644, 137.680013（北アルプス山小屋友交会）
- 西岳: 36.337222, 137.679444 / 2758m（国土地理院）
- 水俣乗越: 36.336867, 137.670133 / 2471m（公開GPS記録）
- ヒュッテ大槍: 36.338116, 137.654940（北アルプス山小屋友交会）
- 推測座標: 0

## Classic route audit
Executed:
`node audit_classic_routes_v1520_detail.js`

Result:
- classic routes: 9
- directional adjacent segments: 109
- CT missing: 0
- estimated: 0
- derived/apportioned: 0

表銀座では追加した全通過ポイントが固定座標で解決し、全隣接区間にCTが存在することを確認。

## Representative route CT regression
Executed:
`node audit_expanded_ct_v14232.js`

Result:
- mountains: 300
- representative courses: 380
- expanded directional segments: 901
- verified/composed CT: 768
- estimated CT: 133
- derived intermediate-point CT: 0
- CT missing: 0
- route build errors: 0
- point/segment alignment errors: 0

Executed:
`node audit_representative_v14198.js`

Result:
- representative courses: 380
- confirmed supplemental generated: 16

## Syntax / compile
PASS:
- `node --check app.js`
- `node --check water-sources.js`
- `node --check trailheads.js`
- `node --check huts.js`
- `node --check live-cameras.js`
- `python3 -m py_compile server.py`

## Progressive weather regression
Brace-scanned `async function analyze()`:
- V1.5.21: 7081 bytes
- V1.5.22: 7081 bytes
- SHA-256 both: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`

Result: byte-identical.

## Water regression
`python3 audit_water_300.py --dry-run`
- Japan 300 audit route points: 300/300
- Dry-run OK

`python3 audit_water_v2_candidates.py --dry-run`
- target mountains: 65
- route geometry available: 65/65
- corridor centers: 533
- Dry-run OK

## Browser validation
実ブラウザでの視覚・操作確認は未実施。
DOM/JSデータ、CT resolver、構文、回帰監査で確認。
