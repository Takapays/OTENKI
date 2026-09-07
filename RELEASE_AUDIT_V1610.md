# Traten V1.6.10 Release Audit

## Baseline

- Baseline: V1.6.9
- Scope: Supabase write read-back retry + data-audit sparse threshold 3 -> 2

## Root cause addressed

The scheduled national cache job can receive an acknowledged Supabase upsert and then immediately read the previous row during strict verification. V1.6.9 treated that single immediate mismatch as a fatal `database read-back incomplete`, producing HTTP 503 and GitHub Actions exit code 22 even though later cache status could already show the rows as fresh.

V1.6.10 retains strict verification and adds a bounded retry window. A write is still fatal if the expected row/value/timestamp cannot be confirmed after all attempts.

## Data audit change

`TratenDataAudit.build()` now flags `sparseWaypoints` only when resolved fixed-point count is <= 2. The HTML description and exported `thresholds.sparseWaypointMax` are both 2.

## Regression scope

Diff against V1.6.9 shows:
- `app.js`: APP_VERSION + sparse audit threshold/label compatibility only.
- `server.py`: APP_VERSION + bounded Supabase verification retry helper/wiring only.
- `index.html`: version/cache-buster only.
- `data-audit.html`: version/cache-buster + sparse threshold wording only.

No CT values, route definitions, coordinates, weather grades, or representative-course UI logic were edited.
