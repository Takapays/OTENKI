# Traten V1.5.56 Release Audit

## Scope
V1.5.56 continues the CT-integrity cleanup after V1.5.55. It corrects a mistranscribed Daisetsu direct CT, excludes a currently closed Taiheizan access route, and adds a geographic sanity audit for direct CT entries so the same class of obvious error is caught before release.

## Corrections
- Daisetsu: `黒岳石室→北海岳` corrected to 100 min after public recheck.
- Daisetsu: `北海岳→黒岳石室` corrected from the impossible 2 min value to 70 min after public recheck.
- Taiheizan: `旭又登山口↔太平山` is excluded from direct lookup, graph composition, and fixed custom-route selection because Akita City currently states that the trail and access forest road are closed.
- Historical CT data is retained for traceability but cannot leak into routing while the closure rule is active.

## New release guard
`audit_direct_ct_sanity_v1556.js` checks direct CT between geographically resolved fixed route candidates for impossible implied walking speeds / very short times over multi-kilometre distances.

Result:
- candidate direct CT pairs checked: 2,272
- suspicious direct CT pairs: 0

## Nationwide custom-route integrity
- mountains: 299
- raw candidates: 1,720
- displayed safe candidates: 1,192
- withheld/disconnected/duplicate: 259
- ordered displayed pairs: 11,560
- CT missing among displayed pairs: 0
- estimated CT among displayed pairs: 0
- verified routes >= 600 min: 5,242
- mountains with fewer than 2 safe points: 51

## Regression checks
- JavaScript syntax: PASS
- Python syntax compile: PASS
- area network: 424 / 424 direct verified; missing 0; estimated 0
- Hyakumeizan + area network: 700 / 700 direct verified; missing 0; estimated 0
- classic routes: 109 / 109; missing 0; estimated 0; derived 0
- Ontake + Yatsugatake custom route: 282 / 282; missing 0; estimated 0; example routes 5 / 5 PASS
- route-integrity targeted tests: 11 / 11 PASS
- raw implausible composed paths detected: 32; leaked to UI: 0
- direct CT sanity audit: 2,272 checked; suspicious 0
- closed Asahimata direct CT lookup: null / blocked
- closed Asahimata custom-route candidate: excluded

## Known remaining work
This release does not claim that every hidden candidate has been restored. High-value remaining examples include 黒岳石室 as a selectable point in the 旭岳 builder, 谷川岳肩ノ小屋, 大日小屋, and 石鎚神社頂上山荘. They stay withheld until bidirectional endpoint-specific CT is sufficiently verified.

## Non-CT regression policy
- Weather-analysis logic unchanged.
- No fixed coordinates changed.
