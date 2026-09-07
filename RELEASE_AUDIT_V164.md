# Traten V1.6.4 release audit

## Change
- 国土地理院標高タイルを日本国内の標高・朝景/夕景地形解析の主系統へ変更。
- 優先順: DEM5A -> DEM5B -> DEM5C -> DEM10B -> Open-Meteo Copernicus DEM GLO-90。
- PNG標高タイルを国土地理院公式仕様のRGB式でデコード。
- 同一タイルを共有キャッシュし、同時取得を6タイルに制限。
- `cyberjapandata.gsi.go.jp` をサーバープロキシ許可先へ追加し、DEMタイルは7日キャッシュ。
- DEM1Aは地平線レイの250m〜30kmサンプルに対して過剰精細なため不使用。

## Regression checks
- `node --check app.js`: PASS
- `python -m py_compile server.py`: PASS (existing SyntaxWarning only)
- `node tests/test_browser_cache_v162.js`: 10 PASS
- `python tests/audit_route_regression_v162.py`: PASS
  - mountains 300
  - representativeRoutes 416
  - noRepresentative 5
  - missingCt 0
  - estimatedCt 1
  - derivedCt 0
  - coordinateIssues 0
- `node tests/test_gsi_dem_v164.js`: 5 PASS
- Full Python non-route integration suite: NOT RUN in this container because Flask is not installed. It is not counted as PASS.

## Source policy
地理院標高タイルが取得できないタイル/画素だけ Open-Meteo Copernicus GLO-90 で補完する。Open-Meteo障害が地理院DEM主系統を止めない構成。
