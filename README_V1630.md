# Traten V1.6.30

Open-Meteo / Render切り分け用の管理診断エンドポイントを追加。

- `GET /api/diag/open-meteo`
- Usage Dashboardと同じBasic認証を使用
- Open-Meteo最小リクエスト / JMA実運用相当 / MET Norway対照を直接疎通
- `?full=1` でECMWF / GFS / ICONも追加確認
- キャッシュ・リトライなしでHTTP status、応答時間、Retry-After、rate-limit header、body先頭、例外種別を返す
- 診断結果を429/403/5xx/DNS・経路/正常に分類

通常の気象判定・モデル統合・Instagram・コース/CTは変更していない。
