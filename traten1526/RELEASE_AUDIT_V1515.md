# V1.5.15 Release Audit

## 実装
- 「前回の山行」「保存ルート」の直下に常時表示の「王道ルート」ボタンを追加。
- モーダルから5ルートを読み込み可能: 表銀座 / パノラマ銀座 / 裏銀座 / 後立山縦走 / 槍・穂高縦走。
- 全ルート地点は既存の固定候補カタログのみから解決。新規座標推測なし。
- 翌日06:00開始、推奨宿泊地点は翌朝05:00出発。
- CTなし・推定CTは既存の色分けUIを利用。

## 王道ルート固定地点監査
- 表銀座: 13地点 / 固定地点不足0 / 確認済みCT 11 / 推定0 / CTなし1
- パノラマ銀座: 12地点 / 固定地点不足0 / 確認済みCT 8 / 推定0 / CTなし3
- 裏銀座: 17地点 / 固定地点不足0 / 確認済みCT 6 / 推定0 / CTなし10
- 後立山縦走: 12地点 / 固定地点不足0 / 確認済みCT 11 / 推定0 / CTなし0
- 槍・穂高縦走: 19地点 / 固定地点不足0 / 確認済みCT 11 / 推定0 / CTなし7

CTなし区間は数値を新規推定・按分せず、+60分仮置きと強い注意色で手入力を促す既存仕様を維持。

## 回帰監査
- APP_VERSION: 1.5.15
- JavaScript syntax: PASS (`node --check app.js`)
- Python compile: PASS (`server.py`)
- HTML parse: PASS (index / guide / huts / trailheads / live-cameras / water-sources / usage-dashboard)
- 日本三百名山: 300
- 代表コース: 380
- 展開後方向別CT: 901
- 確認済み・合成CT: 768
- 推定CT: 133
- 按分CT: 0
- CT情報なし: 0
- route build errors: 0
- point/segment alignment errors: 0
- `async function analyze()` は V1.5.14 と byte-identical
- analyze SHA-256: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`
- 水場300座 dry-run: 300/300 PASS
- Water V2: 65/65 route geometry / dry-run PASS

## 未実施
- 実ブラウザでのモーダル操作・モバイル視覚確認はこの環境では未実施。
- 外部気象API / Supabaseの実通信は今回の変更対象外。
