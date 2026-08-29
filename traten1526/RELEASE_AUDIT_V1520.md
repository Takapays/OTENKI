# V1.5.20 Release Audit

## 変更概要
- 王道ルート「裏銀座」を双六岳→槍ヶ岳→新穂高へ変更。
- 双六小屋↔槍ヶ岳山荘の西鎌尾根CTを公式値で追加。
- 王道ルート「三股サーキット」を前常念岳・蝶槍・蝶ヶ岳ヒュッテ入りへ詳細化。
- 三股サーキットは蝶ヶ岳ヒュッテ泊をデフォルト化。
- 前常念岳を公開座標で固定通過ポイント化。
- 三股サーキットの新規隣接区間を公開CTで方向別登録。
- 距離按分・新規推定CTは使用しない。

## 公開根拠
- 双六小屋グループ公式: 双六小屋→槍ヶ岳山荘 5時間40分 / 逆方向5時間。
- YAMAP「常念岳（三股）」: 三股登山口↔前常念岳↔常念岳のチェックポイント時刻。
- YAMAP「三股-常念岳-蝶ヶ岳 周回コース」: 常念岳→蝶槍→蝶ヶ岳ヒュッテのチェックポイント時刻。
- YAMAP「三股登山口-蝶ヶ岳-蝶槍 往復コース」: 蝶槍↔蝶ヶ岳ヒュッテ55分を両方向で確認。
- 公開登山コースガイド: 常念岳→蝶槍3時間30分 / 蝶槍→常念岳4時間。
- 前常念岳座標: OpenStreetMap公開位置 36.32304, 137.73811。標高はYAMAPの2662mを採用。

## 構文監査
- `node --check app.js`: PASS
- `node --check water-sources.js`: PASS
- `node --check trailheads.js`: PASS
- `node --check huts.js`: PASS
- `node --check live-cameras.js`: PASS
- `python3 -m py_compile server.py`: PASS
- HTMLParser: index / guide / usage-dashboard / water-sources / huts / trailheads / live-cameras PASS

## CT回帰監査
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
- supplemental generated: 16

## 王道ルート回帰
`node audit_classic_routes_v1518.js`
- 9 routes
- 102 segments
- CT missing: 0
- estimated: 0
- derived: 0

変更対象:
- 裏銀座: 19ポイント / 18区間 / missing 0 / estimated 0 / derived 0
- 三股サーキット: 7ポイント / 6区間 / missing 0 / estimated 0 / derived 0

詳細: `CLASSIC_ROUTE_CT_AUDIT_V1520.txt`

## 逆方向CT確認
実行確認:
- 槍ヶ岳山荘 → 双六小屋: 300分
- 前常念岳 → 三股登山口: 210分
- 常念岳 → 前常念岳: 65分
- 蝶槍 → 常念岳: 240分
- 蝶ヶ岳ヒュッテ → 蝶槍: 55分

## progressive analyze() 回帰
brace scan で `async function analyze()` を V1.5.19 と V1.5.20 で比較。
- V1.5.19: 7517 bytes / SHA-256 `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`
- V1.5.20: 7517 bytes / SHA-256 `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`
- byte-identical: PASS

## 水場回帰
`python3 audit_water_300.py --dry-run`
- Japan 300 audit route points: 300/300
- Dry-run OK

`python3 audit_water_v2_candidates.py --dry-run`
- target mountains: 65
- route geometry: 65/65
- route-corridor: 31
- fixed-point-buffer: 34
- corridor centers: 533
- public-source seeds: 1
- Dry-run OK

## UI / ルート定義確認
- 裏銀座は双六小屋の宿泊フラグを解除し、槍ヶ岳山荘に宿泊フラグを設定。
- 三股サーキットは蝶ヶ岳ヒュッテに宿泊フラグを設定。
- 王道ルート宿泊翌朝06:00仕様はV1.5.19の処理を維持。
- 前常念岳は固定座標を持つため、座標フォールバック・推測を使わない。

実ブラウザでの視覚操作・スクリーンショット確認は未実施。
