# V1.5.3 Release Audit

## 水場地図
- water-sources.html に専用地図領域 `#waterMap` / `#waterMapPanel` を実装: PASS
- 背景タイル: 国土地理院 標準地図 `https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png`: PASS
- 固定監査済み水場座標を `L.marker` + 💧カスタムアイコンでプロット: PASS
- 1地点時 `setView(..., 16)`: PASS
- 複数地点時 `fitBounds(..., maxZoom:16)`: PASS
- マーカー popup: 水場名 / 種類 / 最寄り地点 / 距離 / OSM飲用属性: PASS
- 一覧の「地理院地図で確認」リンク: 維持
- Leaflet読込失敗時も一覧表示を維持: PASS
- water-sources.js / water-sources.css のキャッシュバスター `?v=1.5.3`: PASS

## 水場監査データ
- 回収済み監査キャッシュ mountain_count: 300
- checked_count: 300
- available_count: 61
- unresolved_count: 0
- 水場候補ポイント総数: 118
- 緯度経度有効ポイント: 118 / 118
- `water-mountain-cache.json` は通常リリースZIPへ含めない

## ロゴ
- traten-logo.png: 358226 bytes
- SHA-256: 8b8c7474fb3635af4d0ad1c106f88cd4bf2a8fc567267d1bed301d8bb21a3aa7
- 水場 / ライブカメラ / 登山口 / 山小屋: `traten-logo.png?v=1.5.3` を参照

## 回帰監査
- JavaScript syntax: app.js / water-sources.js / trailheads.js / huts.js / live-cameras.js = OK
- Python syntax: server.py = OK
- Core Japanese 300 list: 300
- Representative courses: 380
- Expanded directional CT segments: 901
- verified/composed CT: 751
- estimated CT: 134
- derived intermediate-point CT: 16
- CT missing: 0
- route build errors: 0
- point/segment alignment errors: 0
- Progressive analyze() function: V1.5.2 と byte-identical
- Progressive analyze() SHA-256: 3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d
