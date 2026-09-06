# Traten V1.5.212

## Important correction
This release uses the **second attached shifted image** as the reference behavior: the V1.5.204-style lat/lon projection.

It does NOT use the later fixed-marker image/mapping that the user rejected.

## Adjustment
A single global transform is applied to the entire 100-mountain marker layer so that the two end anchors fit the artwork better:
- 利尻山 -> 利尻島
- 宮ノ浦岳 -> 屋久島

No individual mountain is moved separately.
No name-to-slot remapping is used.

## Resulting model
1. project all mountains exactly with the earlier V1.5.204 projection
2. apply one global x/y scale + translation to every marker
3. draw the daily A/B/C grade at the transformed point

Static preview and Reel preview use the same scene1.
