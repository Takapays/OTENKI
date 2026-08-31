# V1.5.59 Release Audit

## Purpose
Fix stale cached optional access assets that caused the live site to keep showing `アクセス情報なし` for Ontake even though the current `access-data.js` already contained the two records.

## Root cause
`app.js` still used `const TRATEN_OPTIONAL_ASSET_VERSION='1.4.242';`.
The server marks any JS/CSS requested with `?v=` as `public, max-age=31536000, immutable`.
Therefore browsers could legitimately reuse the old `access-data.js?v=1.4.242` for up to one year even after Render deployed V1.5.58.

## Fix
- App version: 1.5.59
- Server version: 1.5.59
- HTML visible/cache-buster version: 1.5.59
- `TRATEN_OPTIONAL_ASSET_VERSION=APP_VERSION`
- `access-data.js` metadata: 6.0.10
- Existing Ontake access data retained:
  - 田の原登山口
  - 中の湯登山口（黒沢口）

## Verification
- `node --check app.js`: PASS
- `node --check access-data.js`: PASS
- `python3 -m py_compile server.py`: PASS
- Runtime evaluation of `access-data.js`: PASS
- 田の原登山口 DB record: PASS
- 中の湯登山口（黒沢口） DB record: PASS
- Optional asset cache-buster linked to APP_VERSION: PASS
- No stale `1.4.242` optional asset version literal: PASS

## Scope
No CT values, coordinates, route graphs, or weather-analysis algorithms were changed.
