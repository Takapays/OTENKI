# V1.5.0 構成整理

V1.4.256で試験導入した「静的フロント + Render API」構成は採用せず、従来のRender Python Web Service単体構成へ戻した。

削除対象:
- api-config.js
- dist/
- scripts/build_static_frontend.sh
- STATIC_FRONTEND_V14256.md
- server.py のStatic Site向けCORS
- render.yaml の traten-static 定義と STATIC_FRONTEND_ORIGINS

維持対象:
- V1.4.254 TOP4ボタンデザイン
- V1.4.255 中白根山CT修正
- 水場固定一覧運用
- 気象分析、全国判定、代表コース、固定座標

公開構成:
- https://otenki.onrender.com/ を従来どおりRender Python Web Serviceが直接配信
- APIは同一オリジン /api/*
