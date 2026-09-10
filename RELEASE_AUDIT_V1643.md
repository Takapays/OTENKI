# V1.6.43 Release Audit

## Intended change
meteoblueを常用モデルから選択的な仲裁モデルへ変更し、API credit消費を大幅に抑制する。

## Selection policy
- 基本: MET Norway + NOAA GFS
- meteoblueを呼ぶ条件: MET/GFSどちらか欠落、風速差 >= 3.0 m/s、降水差 >= 0.7 mm/h、またはMET突風欠測かつ基本2モデルに注意条件あり。
- 全国版の日判定は既存 `_national_meteoblue_candidate` を継続使用。
- 全国山詳細・槍ヶ岳リール詳細も同じ選択ルールへ統一。

## Regression
- Canon V1.6.1: mountains 300 / representative routes 415 / missing CT 0 / estimated CT <=1 / coordinate issues 0.
- Previous V1.6.42: mountains 300 / representative routes 416 / missing CT 0 / estimated CT 1 / coordinate issues 0.
- V1.6.43: weather acquisition/control-flow only; route/CT/fixed-point assets are not included or modified by this diff. Metrics remain 300 / 416 / 0 / 1 / 0.
- app.js top-level functions: 487 -> 488; deleted 0; added meteoblueArbiterNeeded.
- server.py functions: 172 -> 172; deleted 0.
- Changed runtime files vs V1.6.42: app.js, server.py, index.html, data-audit.html only.
- instagram_bot.py unchanged.

## Checks
- node --check app.js: PASS
- python3 -m py_compile server.py: PASS (pre-existing embedded-JS invalid escape SyntaxWarning only)
- selective meteoblue arbiter unit guard: PASS
- version/cache sync 1.6.43: PASS
