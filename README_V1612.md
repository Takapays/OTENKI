# Traten V1.6.12

Base: V1.6.11 overlay update. Canonical regression baseline remains V1.5.231 = V1.6.1.

## Changes
- Nationwide mountain detail: move the on-demand MET Norway / NOAA GFS model comparison graphs above the existing mountain detail hero.
- Nationwide map: move the A-E / ? legend into the upper area of the map as a non-interactive overlay.
- Instagram: migrate all nationwide output from legacy ABC to native A-E.
  - preserve A-E grades from the nationwide cache (no C/D/E collapse)
  - A-E map markers and legend
  - A-E counts in generated image cards and captions
  - A-E counts in persisted post drafts and posting completeness checks
  - bump Reel/static render revision so legacy ABC cached media is not reused

## Not changed
- Nationwide grading thresholds
- MET Norway / NOAA GFS same-hour averaging logic
- D/E severe/extreme floor logic
- mountain catalog, coordinates, representative routes, fixed points, CT definitions
- route planner, detailed forecast logic outside the nationwide detail placement

## Deploy
Overlay the files in `Traten_V1.6.12_DIFF.zip` onto V1.6.11.
