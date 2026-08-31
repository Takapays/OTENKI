# Release Audit — V1.5.54

## Scope
V1.5.54 is a custom-route CT integrity release. The baseline is V1.5.53 full ZIP.

The release does **not** claim that every stored CT candidate nationwide has now been researched. Instead, it changes the product contract so that a fixed point is exposed in `コースを自分で設計` only when the displayed verified-CT set remains internally usable. A disconnected point stays in the underlying catalog and can return automatically after a public CT link is verified.

## Nationwide displayed-route audit
`audit_custom_route_integrity_v1554.js` was executed against the release build.

- Mountains with fixed candidates audited: **299**
- Raw fixed candidates examined: **1,720**
- Displayed safe candidates after integrity filtering: **1,189**
- Disconnected/duplicate candidates explicitly withheld: **263**
- Ordered pairs among displayed candidates: **11,680**
- Displayed pairs with CT missing: **0**
- Displayed pairs using estimated CT: **0**
- Displayed long verified pairs (>=600 min): **5,277**
- Mountains with fewer than two currently verified-connected safe points: **51**

For those 51 mountains the UI no longer exposes a broken multi-point route builder. It shows an explicit notice that verified CT-linked design points are insufficient. This is intentionally safer than generating a false detour or estimated CT.

## Priority-area pass
The requested priority areas were included in the same UI-level audit: Kuju, Daisetsu, Iide, Asahi, Tanigawa, Okuchichibu (Kumotori/Kobushi/Kinpu), Oze (Shibutsu/Hiuchigatake), Tanzawa, Omine (Hakkyo), Ishizuchi, Kirishima, Yakushima, Yatsugatake, and Ontake.

For every point that remains displayed in these fixed sets:
- CT missing: **0**
- estimated CT: **0**

See `CUSTOM_ROUTE_INTEGRITY_AUDIT_V1554.json` and `.txt` for per-mountain counts and hidden names.

## CT additions made in this release
Only verified or already-verified-component values were added:
- Chojabaru <-> Mt. Mimata: verified adjacent CT composition only.
- Kobushi hut <-> Mt. Kobushigatake: YAMAP public model course.
- Tanigawa Toma-no-mimi <-> Oki-no-mimi: YAMAP public Tenjin-ridge model course.
- Ishizuchi Misen <-> Tengudake: YAMAP public model course.

No reverse CT was invented. No coordinate/elevation-based CT was added.

## Long-route behavior
The previous blanket 10-hour ceiling on composed CT was removed. A long route can now be returned when:
1. every constituent edge is verified/public CT, and
2. the existing geographic detour guard does not reject the path.

This fixes legitimate long traverses without reopening estimated CT.

## Regression results
Executed on the release build:
- JavaScript syntax (`node --check app.js`): **PASS**
- Python syntax (`python -m py_compile server.py`): **PASS**
- Explicit area network: **424/424 verified direct**, missing 0, estimated 0, disconnected 0
- Hyakumeizan + area union: **700/700 verified direct**, missing 0, estimated 0
- Ontake + Yatsugatake selectable-point audit: **282/282 resolved**, missing 0, estimated 0, example routes 5/5
- Classic 9 routes: **109/109**, missing 0, estimated 0, derived 0
- V1.5.53 implausible-route regression: raw implausible paths detected 32, leaked to UI **0**, targeted tests 11/11
- Fixed literal coordinate pairs: baseline 1,588 / release 1,588 / added 0 / removed 0

## Known remaining data work
The legacy all-CT catalog audit still contains **54 missing stored route-direction entries**. These are not silently estimated. The V1.5.54 fixed-route UI integrity layer prevents disconnected stored points from producing misleading selectable combinations, but the remaining entries should still be researched and promoted back into the visible graph over time.

This distinction is intentional: **displayed custom-route integrity is 0 missing; underlying nationwide research backlog is not 0.**
