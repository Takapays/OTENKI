# V1.5.52 release audit

## Baseline
- Sole source baseline: `traten-v1.5.51-full.zip`.
- Version after this work: **V1.5.52**.
- Scope: Japanese Alps custom-route CT repair across North, Central and South Alps.
- CT policy: published/verified walking CT only; no coordinate/elevation estimation; no unsupported reverse mirroring.

## User-facing custom-route acceptance
`node audit_alps_custom_route_v1552.js`

- Alpine mountain bindings: **60**
- Unique candidate sets: **18**
- Unique selectable points across those sets: **233**
- Unique ordered point pairs: **3,614**
- Resolved: **3,614 / 3,614**
- Missing: **0**
- Estimated: **0**
- Mountain-binding ordered pairs (including repeated shared corridors): **13,570**
- Missing across mountain bindings: **0**
- Estimated across mountain bindings: **0**

This audit uses the same `regionalCandidates()` + `courseTimeInfo()` path used by custom route building, rather than only auditing predeclared network edges.

## Main repairs
- Extended verified shortest-path composition from 8 to 40 direct CT edges for long Alpine traverses; the fallback still uses only registered verified CT edges.
- Long composed CT is accepted only for known Alps route endpoints (plus the existing Ontake/Yatsugatake whitelist), avoiding a global relaxation for unrelated mountains.
- Connected previously isolated Alpine UI points including:
  - Karasawa Hut / Karasawa Hutte
  - Nishiho ropeway / Nishiho Hut / Nishi-Hotaka / Gendarme / Oku-Hotaka / Yake-dake
  - Nanakura / Funakubo / Harinoki / Takase Dam
  - Murodo / Raichoso
  - Tengu-so / Kiso-Komagatake summit hut
  - Sanpuku Pass / Arakawa Hut
  - Minami-Omuro Hut / Houou
- South Alps north candidates are now scoped by actual walking system: Kitazawa-pass system and Yashajin-Houou system are no longer mixed with the Todai Park transit terminal in one route-builder candidate set.

## Regression checks
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS
- Ontake + Yatsugatake V1.5.51 custom-route audit: **282/282**, missing 0, estimated 0, examples 5/5 PASS.
- Explicit area network audit: **424/424 direct verified**, missing 0, estimated 0.
- Hyakumeizan union audit: **700/700 direct verified**, missing 0, estimated 0.
- Legacy nationwide audit: 300 mountains / 379 courses / 974 segments / estimated 0 / missing 80 / conflicts 0. Remaining legacy gaps are outside this Alps custom-route acceptance scope.
- Representative-route audit: 379 courses; supplemental generated 16.
- `async function analyze()` SHA-256 is byte-identical to V1.5.51: `3146a73e1290f20a91fd90192c7db8420ec51ab078d4740cc736a11edde74a5d`.
- Changed existing coordinate (`lat`/`lon`) records: **0**.

## Important scope statement
`missing 0` here means every pair of points actually offered by the Alpine custom-route candidate sets resolves through verified CT data. It does not claim every minor/unregistered trail in the Japanese Alps is cataloged.
