# Traten V1.6.31

Open-Meteo実HTTPリクエスト日次カウンタを追加。

- Render上のTRATENが実際にOpen-Meteoへ送ったHTTP attemptを1件ずつSupabaseへ非同期記録
- proxy通常取得と管理診断を別集計
- JST当日 / UTC当日 / 直近24時間を確認可能
- 管理URL: `/api/admin/open-meteo-usage`（Usage Dashboardと同じBasic Auth）
- カウンタ開始はV1.6.31以降。過去分は遡及集計しない
- Open-Meteo側がクエリ量等を重み付けする場合があるため「残り」は比較用推定値
- 他のRenderサービスが同じegress IPを共有していても、その通信はTRATENカウンタには含まれない
