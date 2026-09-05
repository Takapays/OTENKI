# RELEASE AUDIT V1.5.100

## Representative route: 仙丈ヶ岳
Expected:
`北沢峠 → 小仙丈ヶ岳 → 仙丈ヶ岳 → 仙丈小屋 → 馬の背ヒュッテ → 北沢峠`

Runtime resolver test:
- route label: 北沢峠・小仙丈尾根〜馬ノ背周回
- resolved points: 6/6
- missing fixed coordinates: 0
- missing CT: 0
- estimated CT: 0
- segment CT: 163 / 78 / 20 / 40 / 110 min
- total: 411 min

## Sources
- 小仙丈ヶ岳 coordinate/elevation: OpenStreetMap node 832298351 via Mapcarta (35.72590, 138.19600, 2855m).
- 北沢峠→小仙丈ヶ岳 / 小仙丈ヶ岳→仙丈ヶ岳 / 馬ノ背ヒュッテ→北沢峠: YAMAP「北沢峠-仙丈ヶ岳 周回コース」公開チェックポイントの区間合算（2026-09-05確認）。
- 仙丈ヶ岳→仙丈小屋 / 仙丈小屋→馬の背ヒュッテ: 既存の南アルプス市芦安山岳館CT。

## Static checks
- `node --check app.js`: PASS
- `node --check representative-route-enrichment-v15100.js`: PASS
- `python -m py_compile server.py`: PASS
- runtime representative resolver test: PASS

## Scope
This is phase 1 of the nationwide representative-course density review. It does not claim all 300 mountains are refined in this release.
