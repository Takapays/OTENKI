# Traten V1.5.211

## User-requested fix: adjust the whole layer, not just two points
- Corrected the previous misunderstanding.
- Instead of moving only 利尻山 and 宮ノ浦岳, this version applies a **single global adjustment to all marker coordinates**.
- The transform is chosen so the two island anchors fit better:
  - 利尻山 aligns closer to 利尻島
  - 宮ノ浦岳 aligns closer to 屋久島
- Mountain-name mapping is untouched.
- Only the fixed marker master coordinates are adjusted.

## Transform
- x' = 1.0274261603 * x - 11.4556962025
- y' = 1.0080808081 * y - 2.9090909091

## Intent
- Preserve the overall "less-bad" layout the user referenced.
- Improve island alignment by moving the **entire layer** coherently.
