# Traten V1.6.31 Release Audit

## Scope
Open-Meteoの日次利用原因切り分け用カウンタのみ追加。ABCDE、気象統合、全国分析、地点別解析、Instagram、ルート/CT/固定点は変更なし。

## Counter
- 実際にOpen-Meteoへ送信したHTTP attemptを記録（429を含むリトライも1 attemptずつ）
- Supabase `usage_events` に `openmeteo_request` として非同期保存
- source: `proxy` / `diagnostic`
- 管理API: `/api/admin/open-meteo-usage`
- JST当日、UTC当日、直近24hを返す
- 他Renderサービスの通信は含まないため、TRATEN実数と429発生状況の比較で共有egress影響を推定可能

## Regression
- Canon V1.6.1: 300 mountains / 415 representative routes / missing CT 0 / estimated CT 1 / coordinate issues 0
- Previous V1.6.30: 300 / 416 / 0 / 1 / 0
- Candidate V1.6.31: 300 / 416 / 0 / 1 / 0
- JS named functions: 424 -> 424, missing 0
- Server functions: 178 -> 184, missing 0
- app.js normalized against V1.6.30: version-only
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS (pre-existing embedded-JS SyntaxWarning only)
- V1.6.31 guard: PASS

## Release decision
Regression detected: 0. Release permitted.
