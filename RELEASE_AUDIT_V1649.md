# Traten V1.6.49 Release Audit

## Scope
V1.6.48 -> V1.6.49. Instagram carousel pages 2-8 only. The approved portrait layout is implemented, the bottom message is removed, and marker density is mildly reduced only for named Northern/Southern Alps mountains. Existing Reel rendering is intentionally untouched.

## Regression comparison
| Item | Canonical V1.6.1 | V1.6.48 | V1.6.49 | Result |
|---|---:|---:|---:|---|
| Japan 300 mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | <=1 | 1 | 1 | PASS |
| Representative courses | 415 | 416 | 416 | PASS |
| Existing fixed points | no decrease | retained | retained | PASS |
| JS named functions | no deletion | 488 | 488 | PASS |
| Server top-level functions | no deletion | 175 | 175 | PASS |
| Instagram top-level functions | no deletion | 88 | 90 | PASS (+2 carousel-only helpers) |
| Existing Reel `_reel_scene1_display_rows` | protected | baseline | byte-identical | PASS |
| Existing Reel `_render_japan_map` | protected | baseline | byte-identical | PASS |
| Pages 1 and 9 | protected | retained | unchanged | PASS |
| Hyakumeizan warm-cache scope | 100 | 100 | 100 | PASS |

## Intended visual changes
- Pages 2-8 use the approved poster-style header hierarchy: official logo, judgment timestamp, large date, tomorrow/day-after-tomorrow badge, and `日本百名山の判定`.
- Bottom slogan/message removed.
- New carousel-only `_carousel_render_japan_map` crops the white safety bands from the bundled Japan basemap before projection, fixing map/marker alignment without touching Reel rendering.
- New carousel-only `_carousel_display_rows` mildly thins only the named Northern/Southern Alps groups; 92/100 markers remain in the synthetic Hyakumeizan regression fixture.
- Central Alps and all regions outside Northern/Southern Alps are not thinned.

## Verification
- `python -m py_compile server.py instagram_bot.py`: PASS (pre-existing unrelated invalid-escape SyntaxWarning remains in server.py).
- `node --check app.js`: PASS.
- app.js/server.py/index.html/data-audit.html are byte-identical to V1.6.48 after normalizing version identifiers.
- Existing Reel `_reel_scene1_display_rows`: byte-identical to V1.6.48.
- Existing Reel `_render_japan_map`: byte-identical to V1.6.48.
- Instagram top-level functions: 88 -> 90; deleted 0.
- Changed existing Instagram function: `_carousel_forecast_page` only.
- Added Instagram helpers: `_carousel_display_rows`, `_carousel_render_japan_map`.
- Full synthetic 9-page carousel render: PASS; all 9 files generated, pages 2-8 each >330 KB.
- Production Instagram publish, Render deployment, Supabase, and live weather API calls were not executed locally.
