# V1.4.256 静的フロント分離

## 目的
Render Free Web Serviceがスリープしているときでも、トラテンのHTML/CSS/JSを即表示する。

## 動作
1. `traten-static` が静的画面を即配信。
2. localStorageに全国判定キャッシュがあれば先に表示。
3. 画面描画後、`api-config.js` が `https://otenki.onrender.com/api/health` を非同期で呼びRender APIを起床。
4. 気象分析等の `/api/*` は自動的にRender APIへ送る。
5. Renderがまだ起動中ならAPI処理だけ待つが、画面自体は黒いRender待機画面にならない。

## 注意
- 初回訪問でlocalStorageが空の場合、全国共有キャッシュそのものはAPI起動後に取得する。
- 固定CT、代表コース、登山口、山小屋、ライブカメラ等の静的データはRender API起動を待たず利用できる。
- APIのサービスURLは現行 `https://otenki.onrender.com` を維持する。
