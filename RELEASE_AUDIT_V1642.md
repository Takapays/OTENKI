# TRATEN V1.6.42 Release Audit

## Change scope
meteoblue diagnostic endpoint only. No weather thresholds, model integration, route/CT/fixed-point data, Instagram logic, or meteoblue production pacing/circuit behavior was changed.

## Diagnostic behavior
- Endpoint: `/api/diag/meteoblue`
- Auth: existing Usage Dashboard Basic Auth
- Test point: Mt. Fuji 35.3606, 138.7274, 3776 m
- Package: `basic-1h_clouds-3h_wind-3h_air-3h`
- Direct upstream attempts per endpoint invocation: 1
- Cache: bypassed
- Retry: none
- App 429 cooldown: bypassed for diagnosis only
- API key: redacted / never emitted
- Returned evidence: status, elapsed_ms, Retry-After, X-RateLimit-* headers if present, server header, body preview, current app cooldown remaining

## Diagnosis codes
- `meteoblue_reachable`
- `meteoblue_quota_or_plan_limit`
- `meteoblue_rate_limited`
- `meteoblue_auth_or_access_restricted`
- `meteoblue_upstream_error`
- `meteoblue_network_error`
- `meteoblue_mixed_or_unknown`

## Regression comparison
| Item | Canonical V1.6.1 | Previous V1.6.41 | Candidate V1.6.42 |
|---|---:|---:|---:|
| Japan 300 mountains | 300 | 300 | 300 |
| Coordinate issues | 0 | 0 | 0 |
| CT missing | 0 | 0 | 0 |
| Estimated CT | 1 | 1 | 1 |
| Representative courses | 415 | 416 | 416 |
| Fixed-point candidate records | 1825 | 1828 | 1828 |

`app.js` differs from V1.6.41 only in APP_VERSION, so mountain/route/CT/fixed-point runtime data are unchanged. `instagram_bot.py` is byte-identical to V1.6.41. `server.py` changes only APP_VERSION plus three new meteoblue diagnostic functions/route.

## Guards
- JavaScript syntax: PASS
- Python compile: PASS (pre-existing invalid-escape SyntaxWarning only)
- Diagnostic classification branches: 6/6 PASS using isolated AST execution (Flask is not installed in build container)
- Existing app.js named functions removed: 0
- Existing server.py named functions removed: 0
- Added server functions: 3
- HTML visible version == APP_VERSION: PASS
- index `app.js?v=` == APP_VERSION: PASS
- data-audit `app.js?v=` == APP_VERSION: PASS
- Production meteoblue minimum interval remains 2.0s default: PASS
- Production meteoblue 429 cooldown remains 60s default: PASS
- API key response-redaction guard: PASS

## Not locally exercised
Real Render, real meteoblue API, real Flask HTTP routing, Supabase, Open-Meteo, and Instagram posting were not invoked during packaging. The purpose of this release is to obtain the real Render-to-meteoblue response after deployment.

**Release status: PASS / local regression 0.**
