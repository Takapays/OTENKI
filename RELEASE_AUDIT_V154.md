# V1.5.4 Release Audit

## 変更確認
- 白馬岳「栂池温泉」除外ロジック: PASS
- 白馬岳「銀嶺水」固定追加: PASS
  - 36.779000, 137.816056 / 標高2073m
  - 公開座標出典: YAMAP landmark 199865
- API表示時の手動補正: PASS（関数単体テスト）
- audit_water_300.py 書込前の手動補正: PASS（関数単体テスト）
- 水場ページ「地理院地図で確認」外部リンク: 0件
- TOP水場カード「地理院地図で確認」外部リンク: 0件
- アプリ内地理院標準地図タイル: PASS
- 水場マーカー L.marker + 💧: PASS

## 構文・表示資産
- JavaScript syntax: app.js / water-sources.js = OK
- Python compile: server.py / audit_water_300.py = OK
- HTML parse: index.html / guide.html / huts.html / trailheads.html / live-cameras.html / water-sources.html = OK
- traten-logo.png: 358226 bytes
- traten-logo SHA-256: 8b8c7474fb3635af4d0ad1c106f88cd4bf2a8fc567267d1bed301d8bb21a3aa7

## 水場監査
- audit_water_300.py --dry-run: Japan 300 audit route points 300/300 / PASS
- V1.5.3監査済みキャッシュ基準: 300/300座、候補あり61座、118地点、未解決0
- V1.5.4は白馬岳内の1地点を1対1で補正（栂池温泉→銀嶺水）のため件数構造は維持
- water-mountain-cache.json: リリースZIP非同梱

## 回帰
- V1.5.3→V1.5.4 の app.js バージョン差分を除く機能差分は water card 外部リンク/出典表示のみ
- Progressive analyze() function: V1.5.3と byte-identical
- Progressive analyze() SHA-256: 3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d
- V1.5.3監査済みルート/CT領域に変更なし
  - 300座 / 380代表コース / 901方向別CT
  - 確認済み・合成751 / 推定134 / 中間地点按分16
  - CT欠損0 / ルート組立0 / 地点CT不一致0
