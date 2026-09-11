# Traten V1.6.47 Release Audit

## Scope
V1.6.46 -> V1.6.47. Only carousel forecast pages 2-8 are visually redesigned to follow the approved mock more closely. Page 1 and page 9 assets/composition are unchanged. Existing Reel generation is retained unchanged. The nationwide judgment map renderer is retained byte-for-byte.

## Intended design changes
- Large official Traten logo in the safe upper-left area.
- Larger judgment timestamp in the upper-right.
- Large date with 明日 on page 2, 明後日 on page 3, date only on pages 4-8.
- Clear 日本百名山の判定 heading and divider.
- Compact A-E legend floating over the current judgment map.
- Wider Instagram-safe margins; no critical text near edges.
- No 63/100 (AB) summary and no explanatory date footnote.

## Regression checks
| Item | Canonical V1.6.1 | V1.6.46 | V1.6.47 | Result |
|---|---:|---:|---:|---|
| Japan 300 mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | <=1 | 1 | 1 | PASS |
| Representative courses | 415 | 416 | 416 | PASS |
| Existing fixed points | no decrease | retained | unchanged | PASS |
| Existing CT deletion/downgrade | prohibited | none | none | PASS |
| JS named functions | 449 baseline | 515 | 515 | PASS |
| Server top-level functions | 93 baseline | 175 | 175 | PASS |
| Instagram top-level functions | - | 88 | 88 | PASS |
| Existing Reel protected functions | - | baseline | byte-identical | PASS |
| `_render_japan_map` | - | baseline | byte-identical | PASS |

Canonical V1.6.1 facts are from the frozen verification artifact. V1.6.47 does not alter app.js data/logic except version identifiers, and does not alter server logic except version identifiers. The only changed existing Instagram function is `_carousel_forecast_page`.

## Executed local checks
- `python3 -m py_compile server.py instagram_bot.py`: PASS (pre-existing unrelated invalid escape SyntaxWarning in server admin JS string remains).
- `node --check app.js`: PASS.
- 9-page carousel render test with synthetic 100-mountain rows: PASS.
- 1080x1920 output size for all 9 pages: PASS.
- Mocked Instagram 9-child CAROUSEL creation/publish flow: PASS.
- Existing Reel protected functions byte-identical to V1.6.46: PASS.
- Existing nationwide map renderer byte-identical to V1.6.46: PASS.

## Production limitation
No live Render, Supabase, weather API, or Instagram publish was executed locally. Production posting remains a separate acceptance step.
