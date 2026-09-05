# Traten V1.5.167

## Open-Meteo混雑・障害時の時系列フォールバック強化

- 通過地点の通常モデル取得がすべて失敗した地点は、Open-Meteo → MET Norway → NOAA GFS の順で自動切替。
- フォールバックは HTTP 429 だけでなく、Open-Meteo の 5xx / ネットワーク失敗にも対応。
- 通過地点は予備ソースを重複投票させず、MET Norway が取れればそこで確定。取れない場合のみ NOAA GFS を利用。
- 宿泊地点は Open-Meteo が取れない場合、まず MET Norway Locationforecast の到着〜翌朝時系列を利用。
- MET Norway も取得できない場合、既存 `/api/noaa-gfs` の NOMADS GRIB2 直取得を複数時刻に対して行い、宿泊分析用の時系列を構成。
- NOAA GFS で取得できない項目（視界・鉛直雲量等）は推測せず欠測のままとし、気温・湿度・降水・総雲量・風速・突風を中心に宿泊分析を継続。
- 画面表示バージョンおよびキャッシュキーを V1.5.167 に更新。

## 変更ファイル
- index.html
- weather-fallback-v15167.js
- README_V15167.md
