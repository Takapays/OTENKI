# TRATEN V1.6.40 release audit

## Scope and source

Previous release: V1.6.39. Canonical regression baseline: V1.6.1 (= V1.5.231).
This update intentionally changes ONLY the national DAILY light-rain B/C
accumulation rule, its explanatory text, release identifiers, and derived
rating/render cache generations. It does not implement a general grade easing.

V1.6.39 ZIP SHA256:
`63ceb1b58fcdea8118a456fa4f3ac05b402edf93d3d878ba36152c671a6f2f31`

Canonical V1.6.1 ZIP SHA256:
`d614ab9515bfa47dd8ee028ab4f9152517ba8490f1289d3822907aaebf3fc741`

## Identified condition and correction

The previous daily classifier moved to C after two caution slots, and rain
>= 0.1 mm/h alone counted as a caution slot. Consequently 0.1 mm/h across two
or more hours could yield C without stronger wind, gust, or rain.

The original caution counter is retained for B and compatibility. A separate
bcCautionHours counter now counts slots with wind >= 5 m/s, gust >= 12 m/s,
or rain >= 0.5 mm/h. Only the daily C accumulation uses this new counter.
The counter measures total hourly slots, not a requirement for consecutive hours.

| Condition during 06:00-15:00 JST | Previous | V1.6.40 |
|---|---|---|
| No caution condition | A | A |
| Rain 0.1-<0.5 mm/h only, at least two slots | C | B |
| Rain 0.5-<1.5 mm/h for one slot only | B | B |
| Rain >=0.5 mm/h in at least two slots, no severe condition | C | C |
| Severe condition in one slot | C | C |
| Severe condition in at least two slots | D | D |
| Extreme condition in any slot | E | E |

Other factors can make the overall daily rating worse than the rain-only rating.
Severe thresholds stay wind 9 / gust 18 m/s / rain 1.5 mm/h.
Extreme thresholds stay wind 15 / gust 25 m/s / rain 6 mm/h.
Existing per-model D/E floors are unchanged. Light rain is still a B concern,
not removed from the forecast and not treated as proof of no precipitation.

The new counter is computed in all active MET, direct GFS, meteoblue and
merged national daily paths. A legacy caller without hourly evidence retains
its existing behavior via an optional, backwards-compatible keyword argument.

## Protected behavior

- Hourly A-E thresholds are unchanged: wind 5/7/9/15, gust 12/15/18/25,
  rain 0.1/0.5/1.5/6. A daily B can therefore include one hourly C.
- Route-point analysis and summary functions are unchanged.
- Model integration arithmetic, source selection and null-handling are unchanged.
- Direct GFS temperature/gust remain excluded from the integrated representative
  values as before; this update does not add them back.
- All forecast series, plotted values and black integrated rain line are unchanged.
- V1.6.39 meteoblue transport controls are unchanged: client concurrency 1,
  client start interval 1.8 seconds, server interval 2 seconds, cooldown 60 seconds,
  national meteoblue worker count 1.
- Open-Meteo follow-up acquisition and its 60-minute 429 cooldown are unchanged.
- Successful raw meteoblue payload cache keys/TTL are unchanged.
- Route maps, course time data, fixed-point data, and assets are unchanged.
- Instagram rendering/publishing functions are unchanged. Only its render cache
  revision is bumped so new national daily grades cannot reuse an old image.

## Data and function regression comparison

The following are fresh Node VM runtime snapshots in each index.html script order,
not estimates copied from prior release notes. The VM uses a DOM/network double.

| Item | Canonical V1.6.1 | Previous V1.6.39 | V1.6.40 |
|---|---:|---:|---:|
| Japan 300 mountains | 300 | 300 | 300 |
| Coordinate issues | 0 | 0 | 0 |
| Missing CT | 0 | 0 | 0 |
| Estimated CT | 1 | 1 | 1 |
| Derived/apportioned CT | 0 | 0 | 0 |
| Representative courses | 415 | 416 | 416 |
| Fixed candidate records, per-mountain sum | 1,825 | 1,828 | 1,828 |
| Resolved route CT segment records | 1,501 | 1,504 | 1,504 |

Every canonical route, fixed candidate, and resolved CT record is retained with
its previous values and sources. Previous-to-candidate protected runtime catalogs
are identical. Fixed-candidate counts are per-mountain record totals, not a
count of globally deduplicated geographical points.

No canonical or previous JS/server/Instagram function was deleted. Server:
147 canonical, 168 previous, 169 candidate top-level functions. The new function
is _national_bc_caution_hours. JS: 467 canonical, 487 previous/candidate named
function declarations (includes nested declarations); deleted 0.

Server function changes are limited to _national_grade,
_national_result_from_metno, _national_gfs_results,
_national_result_from_meteoblue, and _national_merge_two_models.
The only changed existing callable JS function is nationalModelDetailHtml
(criteria explanation only). All source differences outside this allowlist
are the explicitly approved version/cache identifiers and the new constant.

## Cache and version synchronization

APP_VERSION (JS and server), visible index version, and index/data-audit app.js
cache-busters are all 1.6.40. Server and browser national engine identifier:
`metno-gfs-mb-v10-daily-light-rain`.

Browser national cache generation: `traten:national-outlook:v10-daily-light-rain`.
The old derived daily C ratings are not reused as new ratings. Raw weather caches
are retained. Instagram keeps its phone-frame renderer, with a daily-rain-v1640
cache suffix only.

## Executed local tests

- Canonical frozen runtime audit: PASS.
- Production-function daily tests: 20/20 PASS, 0 skipped (with --previous).
- Those tests include 3,500 seeded synthetic previous/new scenarios. Allowed
  rating changes are only C -> B; A/D/E remain unchanged in those scenarios.
- Exact rain boundaries, mixed conditions, non-consecutive slots, null/NaN,
  MET/MB parsers, direct GFS aggregation (GRIB boundary mocked), severe model
  floors and unchanged model integration: PASS.
- Structural/source allowlist audit: 25/25 PASS; no issues.
- Existing V1.6.28 client element-integration tests: PASS.
- Existing V1.6.29 dual-rain-bar/black-integration-line tests: PASS.
- V1.6.40 version/cache/429/hourly-threshold guards: PASS.
- node --check app.js; Python compile server.py/instagram_bot.py: PASS.
  An existing unrelated invalid-escape SyntaxWarning is unchanged.
- Fresh archive integrity, overlay and rerun: see package_verification_v1640.json.

The tests load the actual implementation from source. They are not a replacement
implementation of the new daily rule. The runtime data audit uses actual catalog
scripts loaded in HTML order, but not a real browser or live network.

## Runtime dependency provenance

representative-route-recovery-v162.js was an unchanged referenced dependency
absent from the available differential ZIPs. To reconstruct the prior full tree
for audit, its exact original bytes were read from the user's existing Sep 8
Safari webarchive, URL .../representative-route-recovery-v162.js?v=1.6.22.
It was used byte-identically in the previous and candidate audit trees; it is
NOT introduced as a new change and is NOT included in this differential ZIP.
SHA256: 997c966424bf1f216c64090c29bcf60ba5406e1f32fe5b786cb056147a12625d.

## Limits and release interpretation

No live forecast distribution, observation-based accuracy measurement, real Flask
HTTP, Render deployment, Supabase, or Instagram publishing test was performed.
The B/C distribution of the real 300-mountain forecast remains to be checked
on deployment. The existing unrecovered historical-route limitations stated
in the canonical release are not re-certified as fixed by this update.

Local regression result: no unintended regression detected in the checks above.
This is not a claim of perfect mountain-weather prediction or blanket climbing
safety. Successful deployment is still a separate production acceptance step.
