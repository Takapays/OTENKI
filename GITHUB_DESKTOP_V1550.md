# GitHub Desktop V1.5.50

## Summary
V1.5.50 Fix Kuju/Ontake custom-route CT gaps

## Description
- Fixed the real route-builder CT failure mechanism instead of only expanding declared mountain-area audit graphs.
- Added a verified-only shortest-path CT fallback that can combine exact-endpoint public CT sections from different verified sources; no coordinate/elevation estimation is used.
- Added missing Kuju selectable-point CT links for Makinoto/Hossho, Kuju/Nakadake and Sugamori/Mimata.
- Added missing Ontake selectable-point CT links for Nakanoyu/Nyonindo/Ishimuro and Ninoike/Gonoike.
- Added a new custom-route acceptance audit over the points actually offered by the UI in Kuju and Ontake.
- Same audit on V1.5.49 baseline: 67/132 ordered pairs resolved, 65 missing.
- V1.5.50: 132/132 ordered pairs resolved; Kuju 90/90, Ontake 42/42; missing 0, estimated 0, point-definition missing 0.
- Five representative custom-route assemblies pass with CT on every segment.
- Existing explicit area audit remains 424/424 direct verified; Hyakumeizan union remains 700/700 direct verified; classic routes remain 109/109.
- Legacy 300-mountain signal remains estimated 0 / CT conflicts 0; the pre-existing 81 unrelated missing directions are not fabricated.
- Preserved all existing fixed coordinates, weather/model logic and progressive rendering.
