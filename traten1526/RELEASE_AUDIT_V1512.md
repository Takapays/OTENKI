# トラテン V1.5.12 実監査結果

## 変更点監査

- 全国地図の日付変更イベント: `refreshFilteredView({fitToSelection:false})` を実行。
- 日付変更時: `fitBounds()` を実行しないため、Leafletの現在中心・現在ズームを維持。
- 百名山 / 二百名山 / 三百名山フィルタ変更: `refreshFilteredView({fitToSelection:true})` を実行し、従来どおり `fitBounds()`。
- 初回地図表示: 従来どおり対象山全体へ `fitBounds()`。

## 構文監査

- `node --check app.js`: PASS
- `node --check water-sources.js`: PASS
- `node --check trailheads.js`: PASS
- `node --check huts.js`: PASS
- `node --check live-cameras.js`: PASS
- `python3 -m py_compile server.py`: PASS

## CT / 代表コース回帰

`node audit_expanded_ct_v14232.js`

- mountains: 300
- courses: 380
- expanded directional segments: 901
- verified/composed CT: 751
- estimated CT: 134
- derived intermediate-point CT: 16
- CT missing: 0
- route build errors: 0
- point/segment alignment errors: 0

`node audit_representative_v14198.js`

- representative courses: 380
- confirmed supplemental generated: 16

## 気象分析回帰

`async function analyze(){...}` はV1.5.11とbyte-identical。

- SHA-256: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`

## 注意

この実行環境では実ブラウザでLeafletを操作する視覚テストは実施していません。コード上のイベント経路、構文、CT回帰、気象分析本体の不変性を実監査しています。
