# V1.5.18 Release Audit

## 実装内容
- 王道ルートを5本から9本へ拡張。
- 追加: 白峰三山 / 鳳凰三山 / 三股サーキット / 雲ノ平グランドサークル。
- 雲ノ平グランドサークル用に、薬師沢小屋・雲ノ平山荘を公開座標で固定通過ポイント化。
- 追加ルートに必要な未登録CTは区間別の公開標準CTを登録。距離按分・新規推定CTは不使用。

## 王道ルート実resolver監査
`node audit_classic_routes_v1518.js`

- 王道ルート: 9本
- 合計隣接区間: 97
- CT情報なし: 0
- 推定CT: 0
- 按分CT: 0
- 新規4ルートも各ルート単位で missing=0 / estimated=0 / derived=0

追加4ルート:
- 白峰三山: 10地点 / 9区間
- 鳳凰三山: 9地点 / 8区間
- 三股サーキット: 4地点 / 3区間
- 雲ノ平グランドサークル: 10地点 / 9区間

## 新規固定座標
- 薬師沢小屋: 36.42859, 137.54628 / 1920m
  - 座標: OpenStreetMap node 4346427174 の公開位置
  - 標高: 公開山小屋情報 1920m
- 雲ノ平山荘: 36.42061, 137.57654 / 2551m
  - 座標: OpenStreetMap node 5643992032 の公開位置
  - 標高: 公開山小屋情報 2551m
- 推測座標なし。

## CT根拠
- 白峰三山・鳳凰三山: 既存の南アルプス市芦安山岳館等の確認済み区間CTを再利用。
- 三股サーキット: YAMAP公開モデルコースの標準チェックポイント時刻から、三股→常念岳 440分 / 常念岳→三股 265分を固定。
- 雲ノ平周回:
  - 太郎平小屋→薬師沢小屋 140分: 雲ノ平山荘公式
  - 薬師沢小屋→雲ノ平山荘 195分: 雲ノ平山荘公式
  - 三俣山荘→雲ノ平山荘 160分: 雲ノ平山荘公式
  - 雲ノ平山荘→三俣山荘 170分: 公開周回コース
  - 逆方向・黒部五郎周辺は公開山行計画/公開標準コースタイムで個別固定。

## 代表コース回帰
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

## 構文・HTML
- 全 `*.js` に `node --check`: PASS
- `python3 -m py_compile server.py`: PASS
- HTMLParser: index / guide / usage-dashboard / water-sources / huts / trailheads / live-cameras = PASS

## progressive weather rendering
V1.5.17 と V1.5.18 の `async function analyze()` を直接brace scanして比較。
- V1.5.17 SHA-256: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`
- V1.5.18 SHA-256: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`
- 7517 bytes / byte-identical: YES

## 水場回帰
- `python3 audit_water_300.py --dry-run`: Japan 300 audit route points 300/300, PASS
- `python3 audit_water_v2_candidates.py --dry-run`: V2 target 65, route geometry 65/65, PASS
- dry-runのためOverpass通信は実施していない。

## 実行環境上の未実施
- Flaskはコンテナに未導入 (`ModuleNotFoundError: No module named 'flask'`)。
- したがってローカルFlask HTTP起動、実ブラウザ操作、視覚レンダリング、Supabase実通信は未実施。
