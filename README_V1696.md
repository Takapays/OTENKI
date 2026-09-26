# Traten V1.6.96

V1.6.96 improves nationwide-cache refresh pacing and cache-age visibility.

- Default rolling refresh scope per scheduler cycle: **1 date -> 2 dates**.
- Cache status now distinguishes **fresh row count**, **average age**, and **oldest age**.
- Existing 4-hour fresh TTL remains unchanged.
- Existing GFS/JMA/GEFS forecast and grading logic is unchanged.
- Existing V1.6.95 cold-cache crash fix is retained.

The UI now shows a line such as:

`キャッシュ鮮度 96/100座 / 平均 約42分 / 最古 約327分 / TTL 240分`

This makes it clear when only a small number of rows are stale instead of presenting the oldest row as the age of the entire cache.
