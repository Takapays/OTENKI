# GitHub Desktop

## Summary
V1.5.45 Hyakumeizan CT network audit and Kuju branch completion

## Description
- Audited all currently declared Hyakumeizan route options as one directed mountain-area network instead of only one representative route per mountain.
- Expanded known composed route edges to verified direct underlying CT edges for acceptance testing: 419/419 adjacent edges verified, missing 0, estimated 0, composed-only 0.
- Added an explicit Kuju area graph covering Chojabaru / Amagaike / Bogatsuru / Hokkein / Sabo Dam / Sugamori / Kuju-wakare / Kuju / Danzan / Taisen: 20/20 directed adjacent edges verified.
- Added only publicly checked CT values; no coordinate/elevation estimates.
- Removed four invalid auto-generated route endpoint pairs instead of inventing CT (Oze cross-area/old-route cases, Kusatsu-Shirane restricted summit endpoint, Asama crater summit endpoint).
- Preserved weather logic, progressive rendering, and existing fixed-coordinate records.
- Added reproducible audit scripts and JSON/TXT release audit outputs.
