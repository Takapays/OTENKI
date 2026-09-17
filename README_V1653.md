# Traten V1.6.53

Base: V1.6.52

## Fix
データ監査で `app.js V1.6.49 / server V1.6.52` となるバージョン不一致を修正しました。

原因は、V1.6.50〜V1.6.52の差分で `server.py` のAPP_VERSIONだけが更新され、`app.js` のAPP_VERSIONがV1.6.49のまま残っていたことです。

## Changed production files
- app.js
  - `APP_VERSION`: 1.6.49 -> 1.6.53 のみ
- server.py
  - `APP_VERSION`: 1.6.52 -> 1.6.53
  - Instagram管理画面の表示バージョン: V1.6.52 -> V1.6.53

## Unchanged
- 10枚カルーセル実装
- 9枚目広告画像
- Reel
- 百名山/三百名山データ
- 天気判定・キャッシュ・ルート・CTロジック
