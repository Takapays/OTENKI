# Traten V1.5.169

通過地点のフォールバック時系列表示を修正。

- MET Norway / NOAA GFS の通過地点時系列を地点別キャッシュに保持。
- プログレッシブなモデル統合で timelineRows が失われても、カード描画直前に復元。
- analyzePointsBatch の providerList / statusLabel 引数を尊重し、JMA/ECMWF/ICON/GFS の先行・追加取得フローを壊さないよう修正。
- 宿泊地の Open-Meteo -> MET Norway -> NOAA GFS フォールバックは維持。
