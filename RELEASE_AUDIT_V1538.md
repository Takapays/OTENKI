# RELEASE AUDIT V1.5.38

## Scope
- Analysis-result cross-check panel expanded from Tenkura only to three services:
  - Tenkura
  - Weathernews (UI explicitly labels the free-range comparison as 登山口)
  - tenki.jp (UI explicitly labels the free web comparison as ふもと)
- Weathernews / tenki.jp mountain pages are resolved from provider-published mountain indexes; ambiguous matches return unavailable rather than guessing IDs.
- Verified direct fallbacks were added only for URLs manually confirmed for 富士山 / 槍ヶ岳 / 御嶽(山).
- External-link lookups run after the analysis summary is rendered and do not participate in weather-model acquisition, merge, or grading.

## Public source verification performed 2026-08-30
- Weathernews mountain portal: https://weathernews.jp/mountain/ (about 1200 mountains).
- Weathernews official mountain feature page states free users can check trailhead weather; summit weather is a member-only menu.
- Weathernews direct pages manually opened and confirmed:
  - 富士山 https://weathernews.jp/mountain/fuji/40504/
  - 槍ヶ岳 https://weathernews.jp/mountain/northernalps/40350/
  - 御嶽山 https://weathernews.jp/mountain/northernalps/41001/
- tenki.jp mountain portal: https://tenki.jp/mountain/ . The free web pages state they show foothill-area forecasts and warn that actual mountain conditions differ.
- tenki.jp direct pages manually opened and confirmed:
  - 富士山 https://tenki.jp/mountain/famous100/5/25/150.html
  - 槍ヶ岳 https://tenki.jp/mountain/famous100/3/23/161.html
  - 御嶽 https://tenki.jp/mountain/normal/3/23/1049.html

## Syntax / resolver tests
- `node --check app.js`: PASS
- `python -m py_compile server.py`: PASS
- Synthetic provider-index parser tests: PASS
  - Weathernews mountain URL acceptance / report URL rejection
  - tenki.jp famous100 / normal URL acceptance
  - unique-name resolution
  - ambiguous same-name resolution returns unavailable
- Verified direct fallback tests for 富士山 / 槍ヶ岳 / 御嶽: PASS
- Note: this container has no external DNS resolution, so Render-runtime fetching of the provider index pages was not executed here.

## CT regression
V1.5.37 vs V1.5.38 exact audit stdout comparison: IDENTICAL
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

## Classic routes regression
V1.5.37 vs V1.5.38 exact audit stdout comparison: IDENTICAL
- routes: 9
- segments: 109
- missing: 0
- estimated: 0
- derived: 0

## Fixed trailhead coordinates
V1.5.37 vs V1.5.38 exact audit stdout comparison: IDENTICAL
- Japan 300 fixed/resolved trailhead coverage: 300/300
- missing fixed coordinates: 0

## Progressive weather rendering / grading
- `app.js` diff inspected.
- Functional changes are limited to external cross-check link state/fetch handling plus version number and replacement of the old single Tenkura update call with the three-service async updater.
- Weather model fetch, merge, redraw, CAPE/thunder grading, wind/rain/visibility grading, and route CT logic were not changed in V1.5.38.
- External cross-check requests are fired after summary rendering and are not awaited by the weather-analysis pipeline.

## UI notes
- Desktop: three compact cross-check buttons displayed in one row when space permits.
- Mobile: cross-check buttons stack vertically.
- Weathernews is labeled `Weathernews 登山口`.
- tenki.jp is labeled `tenki.jp ふもと` to avoid presenting its free web forecast as a summit forecast.

## Production visual status
- Render production was not redeployed/visually checked from this environment.
