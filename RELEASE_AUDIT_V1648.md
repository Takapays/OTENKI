# Traten V1.6.48 Release Audit

## Scope
V1.6.47 -> V1.6.48. The defect was an omitted runtime asset: `instagram-japan-base.png`. When absent, `_render_japan_map` intentionally falls back to a flat pale background, so A-E markers render but the Japan basemap does not. V1.6.48 ships the missing basemap and bumps only the release/cache identifiers so cached blank carousel images are not reused.

## Regression comparison
| Item | Canonical V1.6.1 | V1.6.47 | V1.6.48 | Result |
|---|---:|---:|---:|---|
| Japan 300 mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | <=1 | 1 | 1 | PASS |
| Representative courses | 415 | 416 | 416 | PASS |
| Existing fixed points | no decrease | retained | retained | PASS |
| JS named functions | no deletion | 488 | 488 | PASS |
| Server top-level functions | no deletion | 175 | 175 | PASS |
| Instagram top-level functions | no deletion | 88 | 88 | PASS |
| `_render_japan_map` | protected | baseline | byte-identical | PASS |
| `_carousel_forecast_page` | protected | baseline | byte-identical | PASS |
| Existing Reel functions | protected | retained | unchanged | PASS |
| Pages 1 and 9 | protected | retained | unchanged | PASS |
| Hyakumeizan warm-cache scope | 100 | 100 | 100 | PASS |

## Verification
- `instagram-japan-base.png`: present, 1030x1200 PNG.
- V1.6.48 page-2 render test: 1080x1920 PASS; Japan basemap visibly present behind A-E markers.
- `python -m py_compile server.py instagram_bot.py`: PASS (pre-existing unrelated invalid-escape SyntaxWarning remains).
- `node --check app.js`: PASS.
- No top-level Python/JS function deletions.
- After normalizing version identifiers and carousel render revision, app.js/server.py/index.html/data-audit.html/instagram_bot.py are otherwise identical to V1.6.47.

## Production note
No live Instagram publish, Render deployment, Supabase write, or external weather API call was executed locally.
