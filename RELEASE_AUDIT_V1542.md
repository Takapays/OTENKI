# Traten V1.5.42 Release Audit

## Scope
6:00-7:59 representative-route CT audit and route splitting.

## CT audit
- Mountains: 300
- Courses: 380
- Segments: 968
- Direct: 837
- Composed: 11
- Estimated: 120
- Missing: 0
- Flags: 40
- Conflicts: 0
- Reverse flags: 1 (pre-existing びわ湖バレイ山頂駅↔蓬来山)

### 6:00-7:59 band
- V1.5.41 baseline: 70
- V1.5.42: 55
- direct: 34
- estimated: 21
- composed: 0

### Upper bands
- 8:00-9:59: 3
- >=10:00: 0

## Regression checks
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS
- Classic routes: 9 routes / 109 segments / missing 0 / estimated 0 / derived 0; byte-identical stdout vs V1.5.41.
- Fixed trailhead coordinates: 300/300; byte-identical stdout vs V1.5.41.
- Hut/local CT audit: representative10hPlus 0 / localPair10hPlus 0.
- Progressive weather markers unchanged in count: mergeAnalysisResults 1, progressiveStates 3, Promise.all 9.
- Weather/thunder/national A-B-C logic intentionally not changed.

## Data safety
- No existing fixed access coordinate changed.
- Added route points use public-source coordinates only; no guessed coordinate.
- No CT was fabricated to force the audit band lower.
- 鹿島槍ヶ岳の疑わしい逆方向サブ区間値は出荷前に削除し、下山側は既存の直接CTを維持。

## Visual status
Render production/browser visual verification was not performed in this environment.
