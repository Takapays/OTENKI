# Traten V1.5.43 Release Audit

## Scope
Representative-route CT review for the 5:00-5:59 band.

## Source provenance
- Source: actual `traten-v1.5.42-full.zip`
- Baseline root: `traten1542/`
- Release version: V1.5.43

## 5:00-5:59 audit
- V1.5.42 baseline: 57 segments
  - direct 40
  - estimated 16
  - composed 1
- V1.5.43: 55 segments
  - direct 39
  - estimated 16
  - composed 0

### Corrections / route restructuring
1. 羅臼岳・岩尾別温泉
   - Previous representative CT: 5:47 composed from older sub-segments.
   - Current official Shiretoko Rausu Visitor Center value adopted: ascent 5:00 / descent 4:00.
   - Result: composed value removed.
2. 宮ノ浦岳・淀川登山口
   - Official total 5:20 is valid.
   - Representative route now exposes existing fixed `淀川小屋` waypoint.
   - Split: 淀川登山口→淀川小屋 0:50 + 淀川小屋→宮ノ浦岳 4:30.
3. 笠ヶ岳・笠新道
   - Obsolete opaque 5:20 direct value did not match current Hida-Takayama official route guide.
   - Corrected to the verified hut structure: 笠新道登山口→笠ヶ岳山荘 7:00 + 山荘→笠ヶ岳 0:20.
   - No new coordinate was added; the existing fixed 笠ヶ岳山荘 point is reused.

## Adjacent bands
- 6:00-7:59: 55 -> 56.
  - The +1 is the same verified 笠新道登山口→笠ヶ岳山荘 7:00 section now exposed in the second valid Kasa route choice; it is not a new anomalous CT.
- 8:00-9:59: 3 -> 3.
- >=10:00: 0 -> 0.

## Full CT audit
- Mountains: 300
- Courses: 380
- Segments: 972
- Direct: 842
- Composed: 10
- Estimated: 120
- Missing: 0
- Flags: 38
- Conflicts: 0
- Reverse flags: 1 (pre-existing びわ湖バレイ山頂駅↔蓬来山)

## Regression checks
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS
- Classic routes: 9 routes / 109 segments / missing 0 / estimated 0 / derived 0; stdout byte-identical to V1.5.42 baseline.
- Fixed trailhead coordinates: 300/300; stdout byte-identical to V1.5.42 baseline.
- Hut/local CT audit: representative10hPlus 0 / localPair10hPlus 0 / rejectedLocalDetours 8.
- Progressive markers byte-count unchanged vs V1.5.42:
  - mergeAnalysisResults: 4 -> 4
  - progressiveStates: 3 -> 3
  - Promise.all: 10 -> 10
- Weather/thunder/national A-B-C logic intentionally not changed.

## Data safety
- No existing fixed access coordinate changed.
- No new coordinate added in V1.5.43.
- No CT was guessed to force the band lower.
- Remaining 16 estimated rows are retained as audit candidates rather than replaced with fabricated values.

## Scope limitation
All 5:00-5:59 representative rows were mechanically extracted and structurally checked. Public-source re-verification in this release focused on the clearly suspicious/obsolete cases above. This audit does not claim that every remaining direct 5-6h CT was freshly source-verified one by one.

## Visual status
Render production/browser visual verification was not performed in this environment.
