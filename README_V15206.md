# Traten V1.5.206

## Instagram scene 1 marker recalibration
- Rebuilt `reel_mountain_marker_positions.json` from the actual marker centers detected in the approved 2026-09-05 reel scene.
- Keeps the fixed-slot approach introduced in V1.5.205.
- Removes the previous hand-adjusted pixel master that still inherited the drift from the latitude/longitude projection.
- Static preview and Reel preview continue to share the exact same fixed-slot master.

## Daily behavior
- Date text remains dynamic.
- Next-day A/B/C grades remain dynamic.
- Marker x/y slots are fixed to the approved reel's visual marker footprint.

## Validation
- 100 unique mountain names
- 100 fixed x/y slots
- Python compile and JS syntax check passed.
