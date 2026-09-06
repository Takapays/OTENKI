# Traten V1.5.214

## Instagram Bot finalization

- Finalized the approved A/B/C marker placement for Instagram static/reel page 1.
- Keeps Hokkaido on the V1.5.213 similarity-fit master and moves Honshu/Shikoku/Kyushu slightly upward as one group.
- Yakushima follows the same group transform; there are no per-mountain exceptions.
- Adds two automatically generated JST labels to every page-1 render: `M/D HH:MM時点` and `作成日時: M/D HH:MM`.
- Bumps `REEL_RENDER_REV` so old cached static/reel media cannot mask the new placement.
- The placement/timestamp logic lives in `instagram_bot.py`, so it remains active for future Bot posts rather than being a one-off preview image.

## App version

- V1.5.214
