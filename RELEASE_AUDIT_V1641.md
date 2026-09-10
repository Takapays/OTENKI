# TRATEN V1.6.41 Release Audit

## Change scope
Instagram Reel automatic posting hour only.

- `INSTAGRAM_AUTO_POST_HOUR_JST` default: 17 -> 12 JST.
- Environment override retained.
- Posting target remains tomorrow's nationwide forecast.
- Posting still runs after national-cache refresh and keeps existing remote/local duplicate protection.

## Regression comparison
| Item | Canonical V1.6.1 | Previous V1.6.40 | Candidate V1.6.41 |
|---|---:|---:|---:|
| Japan 300 mountains | 300 | 300 | 300 |
| Coordinate issues | 0 | 0 | 0 |
| CT missing | 0 | 0 | 0 |
| Estimated CT | 1 | 1 | 1 |
| Representative courses | 415 | 416 | 416 |
| Fixed-point candidate records | 1825 | 1828 | 1828 |

`app.js` differs from V1.6.40 only in APP_VERSION. Therefore mountain/route/CT/fixed-point runtime data are unchanged from V1.6.40.
`server.py` differs from V1.6.40 only in APP_VERSION. National grade logic and weather integration are unchanged.
`instagram_bot.py` differs from V1.6.40 only in the default auto-post hour (17 -> 12).

## Guards
- Python compile: PASS
- JavaScript syntax: PASS
- Default auto-post hour with environment variable absent == 12: PASS
- Explicit environment override remains effective: PASS
- 11:59 JST is before post hour: PASS
- 12:00 JST is eligible for posting: PASS
- HTML visible version == APP_VERSION: PASS
- index `app.js?v=` == APP_VERSION: PASS
- data-audit `app.js?v=` == APP_VERSION: PASS
- Existing app.js named functions removed: 0
- Existing server.py named functions removed: 0

## Operational note
If Render explicitly defines `INSTAGRAM_AUTO_POST_HOUR_JST`, that environment value overrides the new code default. Set the Render environment variable to `12` as well if it currently exists.

Release status: PASS / regression 0.
