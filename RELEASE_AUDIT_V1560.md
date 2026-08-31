# Traten V1.5.60 Release Audit

## Scope
UI/interaction-only release based on V1.5.59. No CT values, coordinates, weather model logic, or access data were changed.

## Requested changes
- Removed version-up/history information from `guide.html`.
- Planner `クリア` now also clears the currently displayed analysis results.
- Added a mobile-only `↑ 上に戻る` button at the very bottom of the analysis results.
- Removed the standalone point-risk ribbon and merged A/B/C/D/E into the `地点・到着` legend under both weather charts.

## Verification
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS
- `python3 audit_version_consistency.py`: PASS
- `audit_custom_route_integrity_v1556.js`: 299 mountains / 11,560 displayed ordered pairs / missing 0 / estimated 0
- `audit_area_network_v1548.js`: 424/424 verified / missing 0 / estimated 0
- `audit_hyakumeizan_network_v1548.js`: 700/700 verified / missing 0 / estimated 0
- Guide version-history markers: 0
- Standalone `riskRibbon`: removed from HTML and rendering code
- Mobile return-to-top control: present and mobile-only

## Version
`app.js`, `server.py`, visible index version, and index JS/CSS cache-busters are all `1.5.60`.
