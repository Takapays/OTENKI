# Traten V1.6.44 Release Audit

## Baselines
- Canonical regression baseline: V1.6.1 (= V1.5.231).
- Immediate previous release: V1.6.43.
- V1.6.43 source used for this patch: `Traten_V1.6.43_DIFF.zip` (actual Library artifact, not reconstructed from V1.6.42).

## Intended change
Fix the nationwide proactive-cache refresh path only, while preserving V1.6.43 selective meteoblue arbitration and all unrelated weather/route/UI/data behavior.

### Cache corrections
- Scheduled refresh receives a 210-second default work budget and stops only at chunk boundaries.
- Remaining due rows are deferred to the next scheduler cycle instead of being treated as a fatal HTTP failure.
- Scheduled Supabase writes are verified in aggregate rather than paying a read-after-write round trip for every chunk.
- A successful 2xx write followed by temporarily incomplete read-back is treated as verification-pending, not as a database-write failure.
- Partially completed dates are prioritized on the next rolling-cache cycle.
- Browser nationwide results receive a five-minute bridge cache if the aggregate server freshUntil is already stale, so one stale mountain does not immediately discard an otherwise useful snapshot.
- Real database-write failures, persistent-cache read failures, authentication/configuration failures remain fatal.

## Regression comparison

| Protected item | Canon V1.6.1 | Previous V1.6.43 | V1.6.44 | Result |
|---|---:|---:|---:|---|
| Japan 300 mountains | 300 | 300 | 300 | PASS |
| Coordinate issues | 0 | 0 | 0 | PASS |
| Missing CT | 0 | 0 | 0 | PASS |
| Estimated CT | <=1 | 1 | 1 | PASS |
| Representative courses | 415 | 416 | 416 | PASS |
| Existing fixed points | no decrease | retained in V1.6.43 | unchanged by V1.6.44 | PASS |
| Existing CT deletion/downgrade | prohibited | none reported | no CT/route data edits | PASS |
| Existing server functions | no unintended deletion | 172 | 172, deleted 0 | PASS |
| Existing JS named functions | no unintended deletion | unchanged catalog | 511 declarations before/after, deleted 0 | PASS |

The V1.6.44 source diff against V1.6.43 changes no route/CT/fixed-point declaration. `index.html` and `data-audit.html` changes are version/cache-buster replacements only.

## V1.6.43 -> V1.6.44 changed runtime files
- `server.py`: nationwide cache scheduling/persistence/recoverability + version marker.
- `app.js`: browser nationwide cache bridge + version marker.
- `index.html`: version/cache-buster 1.6.43 -> 1.6.44 only.
- `data-audit.html`: version/cache-buster 1.6.43 -> 1.6.44 only.
- `instagram_bot.py`: unchanged and therefore not included in the V1.6.44 diff ZIP.

## Structural/function audit
- `server.py` top-level functions: 172 -> 172; added 0; deleted 0.
- Changed server functions only: `_national_fetch_and_persist`, `_refresh_rolling_100_cache`, `_refresh_national_local_cache`, `_refresh_national_persistent_cache`, `national_outlook_refresh_cache`.
- `app.js` named function declarations: 511 -> 511; deleted 0.
- V1.6.43 meteoblue arbiter selection code is retained.
- `NATIONAL_PREFETCH_COUNT` default remains 300.
- National cache engine remains `metno-gfs-mb-v10-daily-light-rain`.

## Executed checks
- `python -m py_compile server.py`: PASS. Existing embedded-JS `\\s` SyntaxWarning remains; no compile failure.
- `node --check app.js`: PASS.
- V1.6.44 hotfix applicability check against the actual V1.6.43 files: PASS before write.
- Version markers in server/app/index/data-audit updated to 1.6.44.
- Diff inspection confirms no route/CT/fixed-point edits.

## Release interpretation
Local/source regression audit: PASS. No unintended regression detected in the inspected source delta.
Live Render + Supabase + GitHub Actions execution is not performed in this build environment; production acceptance should confirm the scheduled refresh endpoint no longer fails merely because work remains or read-back is briefly incomplete.
