# Traten V1.5.201

## Summary
- Preserves the approved 2-page reel design.
- Page 1 is now **dynamic**: the date line and the A/B/C nationwide markers are redrawn every day from the next-day forecast rows.
- Page 2 remains the approved static design.
- The reel preview uses the same 2 images, so static preview and reel preview stay visually consistent.

## Included asset
- `reel_scene1_dynamic_template.png` : cleaned template for page 1 (date/markers removed)
- `reel_master_scene2.png` : approved static page 2

## Behavior
- `静止画をプレビュー` : page 1 dynamic + page 2 static
- `リールをプレビュー` : same two images connected into a reel

## Notes
- Page 1 date is rebuilt from the requested target date.
- Page 1 A/B/C markers are rebuilt from the forecast rows (`lat`, `lon`, `grade`).
