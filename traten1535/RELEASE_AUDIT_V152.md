# V1.5.2 Release Audit

## 修正内容
- 水場の位置確認リンクを地理院地図へ切替済みの実装を V1.5.2 のキャッシュキーで確実に再取得させるよう更新。
- 水場専用ページとTOP水場モーダルは `https://maps.gsi.go.jp/#18/{lat}/{lon}/&base=std&ls=std&disp=1` を使用。
- V1.5.1 full ZIP 内で 0 byte になっていた `traten-logo.png` を V1.5.0 の正常ファイルから復元。
- 水場 / ライブカメラ / 登山口 / 山小屋の各ページで `traten-logo.png?v=1.5.2` を参照。

## 原因確認
- V1.5.1 の `traten-logo.png`: 0 byte。
- 復元後 `traten-logo.png`: 358226 bytes / PNG 848x621。
- 復元ファイル SHA-256: 8b8c7474fb3635af4d0ad1c106f88cd4bf2a8fc567267d1bed301d8bb21a3aa7（V1.5.0正常ファイルと一致）。
- V1.5.1 では地理院地図コードへ変更後も `water-sources.js?v=1.5.1` のままで、サーバーはversion付きJSを `max-age=31536000, immutable` で配信するため旧JSがブラウザに残り得た。
- V1.5.2 では水場ページのJS/CSS等を `?v=1.5.2` に更新し、旧キャッシュを回避。

## 実監査
- JavaScript syntax: app.js / water-sources.js / trailheads.js / huts.js / live-cameras.js = OK
- Python syntax: server.py = OK
- Core Japanese 300 list: 300 unique mountains
- Representative courses: 380
- Expanded directional CT segments: 901
- Expanded CT: verified/composed 751 / estimated 134 / intermediate apportioned 16 / missing 0
- Route build errors: 0
- Point/segment alignment errors: 0
- Progressive analyze() function: V1.5.0 と byte-identical
- Progressive analyze() SHA-256: 3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d
- `water-sources.js`: `地理院地図で確認` あり / `maps.gsi.go.jp` あり / `OpenStreetMapで確認` なし
- `app.js` TOP水場カード: `地理院地図で確認` あり / `maps.gsi.go.jp` あり
- 4専用ページすべて `traten-logo.png?v=1.5.2` を参照
- `water-mountain-cache.json`: release ZIP へ含めない
