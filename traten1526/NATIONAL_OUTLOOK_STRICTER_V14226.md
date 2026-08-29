# V1.4.226 全国分析 微調整

## 変更点
- 注意風速: 8 m/s 以上 → 7 m/s 以上
- 注意降水: 0.8 mm/h 以上（変更なし）
- B判定: severe 1時間以上 または caution 3時間以上 → severe 1時間以上 または caution 2時間以上
- C判定: extreme 1時間以上 または severe 4時間以上（変更なし）
- severe: 風13 m/s以上 または雨3 mm/h以上（変更なし）
- extreme: 風18 m/s以上 または雨8 mm/h以上（変更なし）

## キャッシュ
- NATIONAL_OUTLOOK_ENGINE: metno-gfs-v2-stricter
- browser cache key: traten:national-outlook:v5
旧判定結果と混在しないよう分離。
