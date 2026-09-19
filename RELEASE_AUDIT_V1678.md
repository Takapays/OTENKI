# Release Audit V1.6.78

Scope: nationwide ridge-wind availability consistency.

- Base: V1.6.77.
- Fixed old elevation cutoff that excluded Kongosan-class summits from ridge estimation.
- Added cache completeness requirement for JMA ridge-wind series on mountain points >=500 m.
- Added cache-miss JMA detail fallback for a single opened mountain.
- Nationwide engine bumped v14 -> v15 to prevent reuse of old incomplete ridge data.
- Existing A-E thresholds and route weighting logic unchanged.
