# GitHub Desktop — V1.5.54

## Summary
`V1.5.54 Enforce verified CT integrity nationwide`

## Description
- Custom-route fixed points are now filtered by verified CT connectivity before display.
- Every displayed fixed-point pair must resolve both directions with verified CT; no estimated CT is used.
- Verified long traverses are no longer rejected only because they exceed 10 hours; geographic detour protection remains mandatory.
- Added verified CT links for Kuju, Kobushigatake, Tanigawa and Ishizuchi gaps found during the integrity pass.
- Nationwide UI audit: 299 mountains, 1,189 displayed candidates, 11,680 ordered displayed pairs, missing 0, estimated 0.
- Disconnected/duplicate points remain in the data catalog and are hidden until verified linkage is available; 51 mountains currently have fewer than two safe linked points and show an explicit insufficient-CT message.
- Regression passed: 424/424 area edges, 700/700 Hyakumeizan+area edges, 282/282 Ontake+Yatsugatake, 109/109 classic-route sections.
