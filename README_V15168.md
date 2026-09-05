# Traten V1.5.168

## 修正
- V1.5.167で代表値だけフォールバックし、地点別カードの `timelineRows` が空になっていた不具合を修正。
- Open-Meteo障害時、MET Norway Locationforecast の時系列から通過時刻前後±6時間を生成して地点グラフへ渡す。
- MET Norwayも失敗した場合、NOAA GFSを通過時刻前後±6時間で複数取得し、同じ地点グラフ形式へ変換する。
- 通常のOpen-Meteo取得時は既存 `blendTimelineRows` を維持。
- 宿泊分析はV1.5.167のMET Norway/GFS時系列フォールバックを維持。
- 推測値は作らず、取得できない変数は欠測のまま。

## 重要な原因
V1.5.167の `analyzePointsBatch()` 上書きで、返却オブジェクトから `timelineRows` が欠落していた。代表値は表示できても `renderWeatherTimeline()` が2点未満となり「時系列データを取得できませんでした」を表示していた。
