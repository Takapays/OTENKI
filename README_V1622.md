# Traten V1.6.22

Base for application: V1.6.21. Canonical regression baseline: V1.5.231 = V1.6.1.

## Changes

1. Removed the top value flow chips: `山を選ぶ → ルート・出発時刻 → 通過時刻ごとの天気`.
2. Removed the planner mountain-count guidance line (`全国版：日本三百名山300座＋縦走主要ピーク...`).
3. Added a 06:00-15:00 hourly A-E strip to the national mountain detail model-comparison section.
4. Hourly grades use the MET Norway / NOAA GFS center value for A-C and keep a per-hour D/E safety floor when either model reaches D/E.
5. Existing daily national A-E aggregation is unchanged. Daily grade still accounts for persistence across the 06:00-15:00 window.

## Hourly A-E thresholds

The hourly strip uses the worst of wind / gust / hourly precipitation:

- A: below all B thresholds
- B: wind >= 5 m/s, gust >= 12 m/s, or rain >= 0.1 mm/h
- C: wind >= 7 m/s, gust >= 15 m/s, or rain >= 0.5 mm/h
- D: wind >= 9 m/s, gust >= 18 m/s, or rain >= 1.5 mm/h
- E: wind >= 15 m/s, gust >= 25 m/s, or rain >= 6 mm/h

D/E from either individual model is not averaged away for that hour.

## Scope

No route, fixed-point, CT, Instagram, weather acquisition, or daily national-grade logic was intentionally changed.
