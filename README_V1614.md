# Traten V1.6.14

Base: V1.6.13

Requested scope only:
- National mountain detail wind chart y-axis fixed to 0-7 m/s
- National mountain detail gust chart y-axis fixed to 0-15 m/s
- National mountain detail precipitation chart y-axis fixed to 0-7 mm/h
- Precipitation changed from three line series to paired hourly bars: MET Norway + NOAA GFS
- Values above the fixed chart ceiling are clipped only for drawing and marked with an upward arrow so the raw severe forecast is not hidden

Not changed:
- National A-E grading thresholds or merge logic
- MET Norway / NOAA GFS same-hour mean logic used for grading
- D/E safety floor
- Mountain/route/fixed-point/CT data
- National detail responsive placement/copy
- Instagram A-E implementation

Overlay the operational files in `Traten_V1.6.14_DIFF.zip` onto V1.6.13.
