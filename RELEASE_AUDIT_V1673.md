# RELEASE AUDIT V1.6.73

Base: V1.6.72

## Intended changes
- National JMA safety path derives estimated ridge gust as ridgeWind * 1.5.
- National JMA daily A-E uses ridge wind, estimated ridge gust and rain consistently.
- National hourly A-E takes the worse of the existing integrated hourly grade and the JMA ridge-based hourly grade.
- National detail retains the 10m model comparison, adds a ridge-wind chart, and replaces the old gust chart with estimated ridge maximum instantaneous wind.
- Summary metric shows maximum estimated ridge wind with maximum 10m surface wind as context.

## Preserved
- Existing ridge-wind interpolation from 850/700hPa and 0.95 summit exposure.
- Existing A-E threshold values.
- 600hPa remains diagnostic only.
- JMA cannot improve an existing national grade; worst-of policy remains.
- No JMA native gust is fabricated; the 1.5x value is explicitly labeled as an estimate.

## Checks
- python -m py_compile server.py: OK (pre-existing SyntaxWarning only)
- node --check app.js: OK
- Version references: 1.6.73
