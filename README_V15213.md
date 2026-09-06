# Traten V1.5.213

## Reel / static map marker correction
The A/B/C marker layer now uses a single **similarity transform** (uniform scale + rotation + translation) from the preferred V1.5.204 projection.

Anchors remain:
- 利尻山 -> 利尻島
- 宮ノ浦岳 -> 屋久島

No individual mountain is moved separately.

## Why this fixes the drift
V1.5.212 used separate X and Y scale factors. That forced the two end anchors to match, but distorted the marker layer and shifted intermediate mountains away from the artwork. V1.5.213 preserves the marker layer's shape while fitting the same two anchors.

Static preview and Reel preview still use the same scene 1. `REEL_RENDER_REV` was bumped so old cached Reel files are not reused.
