# Traten V1.5.204

## Fix
- Further corrected the scene-1 marker alignment on the approved nationwide template.
- The previous version still used a near-rectangular lon/lat projection, which left many Honshu/Kyushu markers slightly too far east.
- Added a latitude-based westward correction on top of the base map projection so the marker belt tracks the Japanese archipelago more naturally.

## Effect
- Better placement around Chubu / Kanto / Kansai / Kyushu.
- Hokkaido changes only slightly, central and southern Japan move inland more clearly.
- `静止画をプレビュー` and `リールをプレビュー` both use the same improved alignment.
