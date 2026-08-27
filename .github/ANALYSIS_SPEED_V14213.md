# V1.4.213 分析高速化監査

## 実装内容
- JMA MSM / ECMWF IFS の先行モデル取得を Promise.all で並列化。
- 先行表示後は GFS / ICON のみを追加取得し、JMA / ECMWF の重複取得を廃止。
- 地点・通過日時・モデル単位の1時間セッションキャッシュを追加。
- Open-MeteoプロキシのブラウザCache-Controlをサーバーの30分TTLと統一。
- 宿泊詳細取得を初回の総合判断表示から分離。
- 総合判断を先に同期描画し、チャート・地図・地点別詳細を次フレームで描画。
- 追加モデルと宿泊詳細は独立して完了時に後追い更新。
- Open-Meteo 429時のMET Norway / NOAA GFSフォールバックも並列化。

## 検証
- node --check app.js: OK
- python -m py_compile server.py: OK
- CT監査: 875/875、CT情報なし0
- 固定登山口座標: 300/300
- Flask実HTTPテスト: この実行環境にFlask未導入のため未実施

## 注意
実ネットワークを使った秒数ベンチマークは未実施。改善値は構造上の高速化であり、実際の所要時間はOpen-Meteo、Render、端末回線状況に依存する。
