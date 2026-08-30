# V1.4.248 Progressive Visibility Update

- First actionable result: first complete JMA or ECMWF result.
- ICON starts concurrently with JMA and ECMWF.
- When ICON completes, its visibility is merged immediately and renderAll() is called immediately.
- GFS starts after the first actionable result and is merged independently as the deterioration guard.
- The UI no longer waits for the whole secondary model batch before reflecting ICON visibility.
- Missing visibility remains NaN rather than 0 (V1.4.247 behavior retained).
