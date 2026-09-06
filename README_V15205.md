# Traten V1.5.205

## Fixed-coordinate marker master
- Removed runtime lat/lon -> artwork coordinate conversion from Instagram scene 1.
- Added `reel_mountain_marker_positions.json` with one fixed x/y coordinate for each of the 100 mountains.
- The coordinates are calibrated to the approved scene-1 artwork, so the marker layout no longer shifts when projection formulas change.
- Daily output changes only the requested date and each mountain's A/B/C grade.

## Preview behavior
- `静止画をプレビュー`: dynamic date + dynamic A/B/C on fixed mountain positions; page 2 unchanged.
- `リールをプレビュー`: uses the exact same two images.

## Validation
- Fixed marker master contains 100 named mountain positions.
- Renderer refuses to produce scene 1 if fewer than the configured minimum can be placed.
