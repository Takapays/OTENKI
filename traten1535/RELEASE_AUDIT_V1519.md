# V1.5.19 Release Audit

## 変更概要
- 「代表コースを読み込む」を主操作色（濃いグリーン）へ変更。
- 「コースを自分で設計」を補助色（淡いグリーン）へ変更。
- 前回ルート欄の「前回の山行」見出しを削除。
- 「前回ルートを復元」→「前回作成ルート復元」。
- 宿泊翌朝の既定出発時刻を 05:00 → 06:00 に変更。
- 王道ルートの宿泊翌朝も 06:00 に統一。
- 気象評価側の「朝5時」基準は別用途のため変更なし。

## 構文監査
- 全 JavaScript: `node --check` PASS
- `server.py`: `python3 -m py_compile server.py` PASS
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
- 97 segments
- CT missing: 0
- estimated: 0
- derived: 0

## progressive analyze() 回帰
brace scan で `async function analyze()` を V1.5.18 と V1.5.19 で比較。
- V1.5.18: 7517 bytes / SHA-256 `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`
- V1.5.19: 7517 bytes / SHA-256 `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`
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

## UI確認範囲
コード上で以下を確認。
- `#representativeCourseBtn` が主操作色で最終上書きされる。
- `#loadPoiBtn` と `route-load-needed` 状態が補助色で最終上書きされる。
- `index.html` に「前回の山行」見出しなし。
- 復元ボタン文言は「前回作成ルート復元」。
- 通常宿泊・保存ルート欠損時・王道ルートの翌朝デフォルトは 06:00。

実ブラウザでの視覚操作・スクリーンショット確認は未実施。
