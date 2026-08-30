# RELEASE AUDIT V1.5.37

## Scope
- Basis: V1.5.36 full ZIP.
- Detailed analysis thunder/CAPE logic only.
- No CT, fixed coordinates, access data, weather provider endpoints, or nationwide A/B/C thresholds changed.

## Logic change
- CAPE alone no longer adds points to the detailed A/B/C/D/E grade.
- Thunder grade points require precipitation plus either multi-model CAPE agreement or an exceptionally high single-model CAPE signal.
- Multi-model evidence fields added: CAPE model count, >=500 J/kg support count, >=1000 J/kg support count, median CAPE.
- Thunder badge remains separate from the overall grade so CAPE-only instability can still be surfaced as information.

## Actual syntax checks
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS
- generated `__pycache__` removed before packaging.

## Actual thunder regression matrix (executed against the functions extracted from the current app.js)
- CAPE500 only / 1 model / no rain -> grade A, thunder LOW: PASS
- CAPE1000 only / 1 model / no rain -> grade A, thunder MEDIUM: PASS
- CAPE1200 / 3 models but only 1 >=500 / no rain -> grade A, thunder MEDIUM: PASS
- CAPE800 / 2-model consensus / no rain -> grade A, thunder MEDIUM: PASS
- CAPE800 + rain0.5 / 2-model consensus -> grade B, thunder MEDIUM: PASS
- CAPE1200 + rain1 / 2-model consensus -> grade B, thunder HIGH: PASS
- CAPE1800 + rain1 / single model -> grade B, thunder HIGH: PASS
- CAPE1500 + rain2 / >=1000 consensus -> grade C, thunder EXTREME: PASS

## CT audit
Current and fresh V1.5.36 baseline outputs are byte-identical.
- mountains: 300
- courses: 380
- segments: 901
- direct: 757
- composed: 12
- estimated: 132
- missing: 0
- flags: 47
- conflicts: 0
- reverseFlags: 1

## Classic route audit
Current and V1.5.36 baseline outputs are byte-identical.
- routes: 9
- segments: 109
- missing: 0
- estimated: 0
- derived: 0

## Fixed trailhead coordinate audit
Current and V1.5.36 baseline outputs are byte-identical.
- coverage: 300/300
- missing fixed coordinates: 0

## Progressive rendering
The actual source region containing `analyzePointsBatch`, `analyzePointsFirstAvailable`, and `mergeAnalysisResults` is byte-identical to V1.5.36 (same SHA-256 for the audited source slice).
The later grade recalculation now uses the revised thunder evidence after every progressive merge.

## Visual / production status
- Browser visual check: not performed.
- Render production check: not performed.

## Deleted files
- None.
