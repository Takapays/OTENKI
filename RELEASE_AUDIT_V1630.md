# Traten V1.6.30 Release Audit

## Scope
Open-MeteoがRender本番から取得しづらい原因を切り分ける管理診断のみ追加。通常ユーザーの解析リクエスト、ABCDE判定、V1.6.28の要素別統合、V1.6.29の降水統合線は変更しない。

## Diagnostic endpoint
- `GET /api/diag/open-meteo`
- Usage Dashboardと同じBasic Auth。未認証で上流APIを消費できない。
- default probes: Open-Meteo generic minimal / Open-Meteo JMA operational-like / MET Norway control
- `?full=1`: ECMWF / GFS / ICONも追加
- probeは既存proxy cacheとOpen-Meteo retryを意図的に通さず、Renderから上流へone-shot接続
- response: HTTP status, elapsed_ms, Retry-After, X-RateLimit headers, Server, body_head, error_type
- no-store response

## Diagnosis classification tests
6/6 PASS:
- Open-Meteo 429 -> `open_meteo_rate_limited`
- Open-Meteo 403 -> `open_meteo_access_restricted`
- Open-Meteo all 200 -> `open_meteo_reachable`
- Open-Meteo network error + MET 200 -> `open_meteo_route_or_dns_issue`
- Open-Meteo + MET both network error -> `render_outbound_or_dns_issue`
- Open-Meteo 5xx -> `open_meteo_upstream_error`

## Regression comparison
| Audit item | Canon V1.6.1 | Previous V1.6.29 | V1.6.30 | Result |
|---|---:|---:|---:|---|
| Japan 300 mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| CT missing | 0 | 0 | 0 | PASS |
| Estimated CT | <=1 | 1 | 1 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Existing JS top-level functions deleted | - | 0 | 0 | PASS |
| Existing server top-level functions deleted | - | 0 | 0 | PASS |

`app.js` is byte-identical to V1.6.29 after normalizing only APP_VERSION. Therefore mountain data, coordinates, representative routes, CT, UI logic and weather calculation code in app.js are unchanged.

## Function preservation
- JS named functions: 481 -> 481 / missing 0
- server top-level functions: 156 -> 159 / missing 0
- added server functions only: `_diagnostic_http_probe`, `_diagnose_openmeteo`, `diagnostic_open_meteo`

## Syntax
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS (pre-existing embedded-JS SyntaxWarning only)

## Release decision
Regression detected: 0. Release permitted.
