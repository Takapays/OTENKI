# TRATEN V1.6.33

## Purpose
Fix a model-routing regression: V1.6.32 had meteoblue-aware integration code for nationwide analysis, but the nationwide fetch path never requested meteoblue. Waypoint analysis did request meteoblue, but the UI did not make that participation easy to verify.

## Changes
- Nationwide analysis now uses meteoblue selectively as the third-model arbiter.
  - one of MET/GFS missing
  - MET gust missing and provisional nationwide grade is B-E
  - hourly MET/GFS wind difference >= 3.0 m/s
  - hourly MET/GFS rain difference >= 0.7 mm/h
- Nationwide A-grade calm points are not automatically sent to meteoblue, preserving the free API quota.
- The existing 6-hour meteoblue payload cache is reused across forecast dates.
- Nationwide UI reports meteoblue fetched count and actual arbitration/fill count.
- Mountain detail source label explicitly shows meteoblue when fetched and whether it actually changed/fills the integration.
- Waypoint first-pass status now reports `meteoblue X/Y points`, so missing meteoblue data is visible rather than silently looking like a three-model result.
- Open-Meteo remains background enrichment with the existing 60-minute 429 circuit.

## Not changed
- A-E thresholds
- temperature/gust/wind/rain element policy thresholds
- course definitions / fixed points / CT
- Instagram logic
- Open-Meteo ordering or 429 circuit duration
