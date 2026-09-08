# V1.6.16 Release Audit

## Scope
Instagram Reel only.

1. Add a new middle scene and expand Reel from 2 scenes to 3 scenes.
2. Middle scene uses the supplied Yarigatake national-detail graph screenshot.
3. Add prominent CTA: 「他の山はトラテンで！」.
4. Keep existing nationwide map as scene 1 and existing feature page as scene 3.
5. Keep normal Instagram static carousel at 2 pages.

## Regression comparison

| Item | Canonical V1.6.1 | Previous V1.6.15 | Candidate V1.6.16 | Result |
|---|---:|---:|---:|---|
| Mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | 1 | 1 | 1 | PASS |
| Representative routes | 415 | 416 | 416 | PASS |
| Fixed-point definitions | protected | unchanged | unchanged | PASS |
| CT definitions | protected | unchanged | unchanged | PASS |
| Nationwide A-E logic | baseline | unchanged | unchanged | PASS |
| MET/GFS merge logic | baseline | unchanged | unchanged | PASS |
| Normal Instagram static carousel | 2 pages | 2 pages | 2 pages | PASS |

## Change isolation
After normalizing V1.6.16 version identifiers back to V1.6.15, `app.js`, `index.html`, `server.py`, and `data-audit.html` are byte-identical to V1.6.15.

The runtime logic change is limited to `instagram_bot.py` plus one new visual asset:
- `reel_master_scene2_yarigatake.png`

No route, fixed-point, CT, nationwide grading, weather fetch/merge, graph, or Instagram A-E caption logic was changed.

## Reel validation
- Three-scene ffmpeg composition: PASS
- 12 second / 12 fps render: PASS
- Scene order: nationwide map -> Yarigatake graph -> existing feature page: PASS
- Reel render cache revision bumped to prevent reuse of old 2-scene MP4: PASS
- Static carousel still returns pages 1 and 2 only: PASS
- Python compile: PASS
- app.js syntax: PASS

Release status: PASS
