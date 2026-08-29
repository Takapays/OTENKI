# V1.5.16 Release Audit

## 実装
- V1.5.15の王道ルート5本を `courseTimeInfo()` 相当で再監査。
- CT情報なしだった21区間を公開標準CTで区間別に固定。
- 可能な区間は逆方向CTも同時登録。
- 距離按分は使用していない。
- 新規推定CTは追加していない。

## 王道ルート監査
### V1.5.15 before
- 表銀座: CTなし 1
- パノラマ銀座: CTなし 3
- 裏銀座: CTなし 10
- 後立山縦走: CTなし 0
- 槍・穂高縦走: CTなし 7
- 合計: CTなし 21

### V1.5.16 after
- 表銀座: 12/12 確認済み・合成 / 推定0 / CTなし0
- パノラマ銀座: 11/11 確認済み・合成 / 推定0 / CTなし0
- 裏銀座: 16/16 確認済み・合成 / 推定0 / CTなし0
- 後立山縦走: 11/11 確認済み・合成 / 推定0 / CTなし0
- 槍・穂高縦走: 18/18 確認済み・合成 / 推定0 / CTなし0
- 合計: 68/68 / 推定0 / CTなし0

## 主な公開根拠
- 大天荘公式: 大天荘から大天井岳山頂まで10分。
- 双六小屋グループ公式おすすめプラン/FAQ: 双六岳、小池新道の区間時間。
- YAMAP公開モデルコース: 蝶ヶ岳・三股、三俣蓮華岳・双六岳等の標準チェックポイント時間。
- ヤマレコ公開山行計画: 裏銀座、水晶岳、槍・穂高縦走の細区間標準CT。
- 北穂高小屋公式: 北穂高岳周辺ルートの確認補助。

## 代表コース回帰監査
`node audit_expanded_ct_v14232.js`
- 日本三百名山: 300
- 代表コース: 380
- 展開後方向別CT: 901
- 確認済み・合成CT: 768
- 推定CT: 133
- 按分CT: 0
- CT情報なし: 0
- route build errors: 0
- point/segment alignment errors: 0

`node audit_intermediate_ct_v1514.js`
- derived rows: 0
- 既存の区間別CT固定24方向: PASS

## 構文・回帰
- APP_VERSION: 1.5.16
- JavaScript syntax: PASS (`app.js`, `water-sources.js`, `trailheads.js`, `huts.js`, `live-cameras.js`)
- Python compile: PASS (`server.py`, `audit_water_300.py`, `audit_water_v2_candidates.py`)
- HTML parse: PASS (`index`, `guide`, `huts`, `trailheads`, `live-cameras`, `water-sources`, `usage-dashboard`)
- `async function analyze()` は V1.5.15 と byte-identical
- analyze SHA-256: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`
- 水場300座 dry-run: 300/300 PASS
- Water V2: 65/65 route geometry / dry-run PASS

## 未実施
- 実ブラウザで王道ルートをクリックしての視覚操作確認は未実施。
- 外部気象API / Supabase実通信は今回の変更対象外。
