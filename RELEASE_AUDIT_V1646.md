# Traten V1.6.46 Release Audit

## Scope
Previous release: V1.6.45. Canonical regression baseline: V1.6.1 (= V1.5.231).
Intentional change: add Instagram 9-static-image carousel and make carousel the default Instagram media mode. Existing Reel is retained.

## Regression comparison
| Item | Canonical V1.6.1 | V1.6.45 | V1.6.46 | Result |
|---|---:|---:|---:|---|
| Japan 300 mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | <=1 | 1 | 1 | PASS |
| Representative courses | 415 | 416 | 416 | PASS |
| Fixed points | no decrease | retained | unchanged | PASS |
| Existing CT deletion/downgrade | prohibited | none | none | PASS |
| JS named functions | no deletion | 515 | 515 | PASS |
| Server top-level functions | no deletion | 172 | 175 | PASS |
| Existing Instagram functions | no deletion | 71 | 88 | PASS |
| Proactive national cache scope | - | 100 | 100 | PASS |

## Protected existing Reel functions
The following functions are byte-identical between V1.6.45 and V1.6.46:
- _render_japan_map
- _reel_scene1_display_rows
- build_dynamic_scene1
- _build_reel_scene1
- _build_reel_scene2
- render_national_static_images
- render_national_reel
- _compose_reel_from_stills

Thus pages 2-8 reuse the current map rendering logic without modification.

## Tests
- python3 -m py_compile instagram_bot.py server.py: PASS (pre-existing server embedded-JS invalid-escape SyntaxWarning unchanged)
- node --check app.js: PASS
- 9-page synthetic render: PASS; 9 images, each 1080x1920
- Mocked Instagram Graph publish flow: PASS; 9 child containers + 1 CAROUSEL parent + publish
- app.js change outside version: none
- index.html/data-audit.html change outside version: none
- deleted server functions: 0
- deleted Instagram functions: 0
- deleted JS named functions: 0

## Live-environment limit
No real Instagram publish, Render deployment, Supabase live request, or live forecast API request was executed in this build environment. Production acceptance remains required after deployment.
