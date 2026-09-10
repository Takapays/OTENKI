# TRATEN V1.6.40 - national daily light-rain classification

Apply this incremental update to a working V1.6.39 installation. Preserve all
existing files that are not included in this ZIP. In particular, do not delete
route/catalog scripts, assets, environment settings, caches, or database state.

## What changes

The national daily A-E rating for 06:00-15:00 JST now separates light rain from
conditions that accumulate into daily C. If the only concern is rain at
0.1 <= rain < 0.5 mm/h, the daily rating stays B, even across all ten slots.
This does not mean no rain, nor does B certify that a climb is safe.

Daily C still applies when wind >= 5 m/s, gust >= 12 m/s, or rain >= 0.5 mm/h
occurs in at least two hourly slots in total. They need not be consecutive;
multiple conditions within one slot count once. A severe slot still forces
at least C; two severe slots force D; any extreme slot forces E. The existing
individual-model D/E floors also remain in place.

Hourly A-E, route-point analysis, actual forecast numbers, graphs, model
integration, and weather API acquisition are unchanged. V1.6.39 meteoblue
429 controls are retained. The rain forecast is not rounded to zero.

## Install

1. Back up the five existing files listed below from V1.6.39.
2. Extract this ZIP and copy its contents over the existing application folder.
   Do not replace the folder by deleting its other contents.
3. Commit/push through the same deployment workflow used for previous updates.
4. Once deployed, reload the app and check that the visible version is V1.6.40.
5. Recalculate the national outlook once. Check the displayed national criteria.

Changed application files:
- server.py
- app.js
- index.html
- data-audit.html
- instagram_bot.py (render-cache revision only, no rendering functions changed)

The derived national result cache and browser result cache have a new generation.
The successful raw meteoblue forecast cache is NOT cleared or re-keyed by this
update. Newly rendered Instagram national daily grades follow the new policy;
reel design, phone frame, hourly grades, and publishing functions are unchanged.

The existing auxiliary file representative-route-recovery-v162.js remains an
unchanged deployment dependency. This patch neither replaces nor removes it.

## Offline checks

Python 3.10+ and Node.js are required for these checks. No API key is used.

    python test_national_rain_v1640.py --previous /path/to/V1.6.39/server.py
    python test_v1640_guard.py
    node tests/audit_national_runtime_v1640.js /path/to/installed/app /tmp/catalog.json

Run the first command with --previous to enable all differential comparisons.
Without it, three previous-version comparisons are explicitly reported skipped.
The runtime catalog check must run against a full installation, not this ZIP
alone, because unchanged route scripts are intentionally excluded from the ZIP.

## Verification and limits

See RELEASE_AUDIT_V1640.md, regression_audit_v1640.json,
daily_rating_comparison_v1640.json, and package_verification_v1640.json.
The examples and 3,500-case comparison use synthetic forecast fixtures, not
observations or a live forecast of all 300 mountains. The actual number of B/C
mountains and prediction accuracy have not been measured. No production Render,
Supabase, real weather API, live Flask HTTP, or Instagram publishing test was run.

Rollback: restore the five backed-up V1.6.39 application files and redeploy.
