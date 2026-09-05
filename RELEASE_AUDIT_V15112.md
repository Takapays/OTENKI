# RELEASE AUDIT V1.5.112

## Fixes
- applyRepresentativeCourse(): candidate precheck now calls representativeCandidate(type,name,mountain).
- 小仙丈ヶ岳 can resolve from BUILTIN_ROUTE_CATALOG even when custom-route sanitization hides it from the visible candidate list.
- 赤岳鉱泉 coordinate corrected to 35.98678, 138.36025 (elevation 2212m).

## Expected representative routes
- 仙丈ヶ岳: 北沢峠 → 小仙丈ヶ岳 → 仙丈ヶ岳 → 仙丈小屋 → 馬の背ヒュッテ → 北沢峠
- 甲斐駒ヶ岳: V1.5.110 enrichment preserved.
- 赤岳: V1.5.110 enrichment preserved; 赤岳鉱泉 marker position corrected.

## Regression
- V1.5.111 nationwide 300-mountain warm cache preserved.
- No new estimated CT or guessed coordinate introduced.
