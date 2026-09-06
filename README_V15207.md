# Traten V1.5.207

## What changed
- Discarded the V1.5.206 marker assignment table that shuffled mountain names into the wrong regions.
- Restored the name-to-position master that keeps the 100 Hyakumeizan in their correct broad regions on the approved scene-1 artwork.
- Rendering remains fully fixed-coordinate based: the app does not calculate marker positions from lat/lon at preview time.
- Added anchor sanity checks so a future accidental name/position shuffle fails loudly instead of producing an obviously wrong map.

## Daily dynamic content
- Date text updates automatically.
- A/B/C grade updates automatically per mountain name.
- Static preview and Reel preview use the same scene-1 result.
