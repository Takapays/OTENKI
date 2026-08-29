# トラテン V1.5.14 Release Audit

## Release scope

中間地点の距離按分CTを廃止し、V1.5.13時点で実際に残っていた按分CT 12区間を公開資料ベースの区間別CTへ置換した。
あわせて逆方向を含む24方向を `V1514_INTERMEDIATE_VERIFIED_COURSE_TIMES` として明示登録した。

## CT-specific audit

`node audit_intermediate_ct_v1514.js`

- V1.5.14明示CT: 24/24 OK
- representative routes checked: 158
- representative route segments: 236
- verified: 226
- estimated: 10
- derived/apportioned: 0
- missing: 0
- route errors: 0
- alignment errors: 0
- `DERIVED_ROWS []`

`node audit_expanded_ct_v14232.js`

- mountains: 300
- courses: 380
- expanded directional segments: 901
- verified/composed CT: 768
- estimated CT: 133
- derived intermediate-point CT: 0
- CT missing: 0
- route build errors: 0
- point/segment alignment errors: 0

`node audit_ct_coverage.js`

- mountains: 300
- courses: 380
- base directional segments: 877
- CT coverage: 877/877 (100%)
- verified: 744
- estimated: 133
- missing: 0

## Apportionment removal checks

- `splitRepresentativeSegmentMinutes`: removed
- selected-route parent-CT proportional fallback: removed
- `derived:true` in current `app.js`: 0
- `V1514_INTERMEDIATE_VERIFIED_COURSE_TIMES`: 24 explicit directions
- current data-audit UI: proportional/intermediate CT card and tab removed

## Progressive analysis regression

V1.5.13 and V1.5.14 `async function analyze()` comparison:

- byte-identical: YES
- SHA-256: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`

Weather progressive rendering logic was not changed in this release.

## Syntax / parse audit

JavaScript `node --check` PASS:

- `app.js`
- `water-sources.js`
- `trailheads.js`
- `huts.js`
- `live-cameras.js`
- `resource-mountain-data.js`

Python compile PASS:

- `server.py`
- `audit_water_300.py`
- `audit_water_v2_candidates.py`

HTML parse PASS:

- `index.html`
- `guide.html`
- `huts.html`
- `trailheads.html`
- `live-cameras.html`
- `water-sources.html`
- `data-audit.html`
- `usage-dashboard.html`

YAML parse PASS:

- `.github/workflows/water-source-audit.yml`
- `.github/workflows/water-v2-candidate-audit.yml`

## Water regression dry-runs

Legacy fixed-water audit:

- Japan 300 route points: 300/300
- dry-run: PASS, no network requests

Water V2:

- target mountains: 65
- route geometry: 65/65
- route-corridor: 31
- fixed-point-buffer: 34
- corridor centers: 533
- public-source seeds: 1
- dry-run: PASS, no Overpass requests

## Limitations

- Local visual browser rendering was not performed in this environment.
- Public CT values can differ between publishers. V1.5.14 stores the cited published route/model value for each explicit direction; it no longer creates a value from geographic distance.

## Release package audit

Changed files relative to V1.5.13:

- `CHANGELOG.md`
- `FIX_V1514.md`
- `README.md`
- `RELEASE_AUDIT_V1514.md`
- `app.js`
- `audit_intermediate_ct_v1514.js`
- `data-audit.html`
- `guide.html`
- `huts.html`
- `index.html`
- `live-cameras.html`
- `server.py`
- `trailheads.html`
- `water-sources.html`

Package rules:

- changed-files ZIP integrity: PASS
- full ZIP integrity: PASS
- `water-mountain-cache.json`: excluded
- V2 generated candidate queue files: excluded
- Python `__pycache__` / `.pyc`: excluded
