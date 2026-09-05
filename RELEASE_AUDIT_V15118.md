# Release audit V1.5.118

## Baseline
- Based on the user's latest V1.5.117 state.
- V1.5.114–V1.5.117 server / Instagram Reel changes preserved.

## Regression fixed
Loading a representative course could leave the global `candidates` list containing only points used by that representative route. As a result, nearby same-area verified points disappeared from the manual waypoint dropdown unless the manual route-candidate loader had been run first.

V1.5.118 merges the selected mountain's full verified/selectable fixed candidate set before representative-course rows are created.

## Required regression checks
- 八ヶ岳（赤岳）:
  - 横岳（八ヶ岳）: selectable PASS
  - 阿弥陀岳: selectable PASS
  - 赤岳天望荘: selectable PASS
  - 硫黄岳山荘: selectable PASS
- 仙丈ヶ岳:
  - 甲斐駒ヶ岳: selectable PASS
- candidate counts in isolated VM check:
  - 八ヶ岳（赤岳）: 16
  - 仙丈ヶ岳: 7

## Syntax
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS

## Safety
- No CT values added or guessed.
- No coordinates added or guessed.
- Representative-route enrichment already present in V1.5.113 remains intact.
