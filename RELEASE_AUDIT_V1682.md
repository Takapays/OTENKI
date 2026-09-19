# V1.6.82 Release Audit

- Base: V1.6.81
- National cache engine: metno-gfs-jma-ridge-gust-worstof-v19-authoritative-ridge
- Browser cache key: traten:national-outlook:v1682-authoritative-ridge
- Short-range national rows with elevation >=500m require usable JMA ridge series before they count as complete.
- Detail reconciliation is monotonic safety-side only: it cannot downgrade an existing cached grade when JMA detail is partial/unavailable.
- 600hPa is used only as fallback for >=3000m when 700hPa is unavailable.
- Python syntax: checked (pre-existing invalid escape SyntaxWarning remains).
- JavaScript syntax: checked with node --check.
- No ABCDE threshold changes.
