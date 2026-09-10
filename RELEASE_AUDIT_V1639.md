# TRATEN V1.6.39 Release Audit

## Change scope
meteoblue HTTP 429 mitigation only. No ABCDE threshold, weather-integration rule, route/CT/fixed-point data, Instagram content, or Open-Meteo ordering/circuit logic was changed.

## 429 mitigation
- Browser-side meteoblue concurrency: 2 -> 1.
- Browser-side minimum request-start interval: 1.8 seconds.
- Server-side all meteoblue paths share one serialized gate within the process.
- Server-side minimum upstream interval: 2.0 seconds.
- On upstream HTTP 429, a 60-second meteoblue circuit/cooldown opens; requests during the cooldown fail fast instead of repeatedly hitting meteoblue.
- Immediate browser retry on 429 removed. 5xx retains one short retry.
- Nationwide meteoblue arbiter worker pool: max 4 -> 1.
- Existing successful-response cache remains in use; cached payloads do not consume a new upstream call.

This design deliberately avoids making the initial three-model display wait 30-60 seconds on the same request. After a 429, MET Norway / NOAA GFS continue to provide the display while meteoblue is allowed to recover, and a later request after the cooldown can try again.

## Regression comparison
| Item | Canonical V1.6.1 | Previous V1.6.38 | Candidate V1.6.39 |
|---|---:|---:|---:|
| Japan 300 mountains | 300 | 300 | 300 |
| Coordinate issues | 0 | 0 | 0 |
| CT missing | 0 | 0 | 0 |
| Estimated CT | 1 | 1 | 1 |
| Representative courses | 415 | 416 | 416 |

The JAPAN_300_MOUNTAINS declaration and representative-course declaration block are byte-identical to V1.6.38.

## Function regression
- app.js named functions retained: 483/483; missing 0.
- server.py existing named functions retained: 167/167; missing 0.
- Added server helper: `_meteoblue_upstream_fetch`.

## Mandatory release guard
- HTML visible version == APP_VERSION: PASS
- index `app.js?v=` == APP_VERSION: PASS
- data-audit `app.js?v=` == APP_VERSION: PASS
- JavaScript syntax: PASS
- Python compile: PASS (pre-existing invalid-escape SyntaxWarning only)
- Client meteoblue concurrency == 1: PASS
- Client request gap == 1.8 s: PASS
- Server meteoblue request gap == 2.0 s: PASS
- Server 429 cooldown == 60 s: PASS
- Nationwide meteoblue worker == 1: PASS
- Existing app.js functions removed: 0
- Existing server.py functions removed: 0

**Release status: PASS / regression 0.**
