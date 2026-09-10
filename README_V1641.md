# TRATEN V1.6.41

Instagram Reel automatic-post hour change only.

- Default `INSTAGRAM_AUTO_POST_HOUR_JST`: 17 -> 12 (JST).
- Existing `INSTAGRAM_AUTO_POST_HOUR_JST` environment override remains supported.
- No national ABCDE thresholds, weather-model integration, route/CT/fixed-point data, reel rendering, or Open-Meteo/meteoblue logic changed.
- Automatic posting is still invoked after a national-cache refresh; with the default 15-minute refresh interval, posting occurs on the first refresh at or after 12:00 JST rather than by a separate exact-clock scheduler.
