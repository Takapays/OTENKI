# Traten V1.6.97

V1.6.97 reorganizes the first screen so nationwide analysis is reached faster without changing the weather engine.

## UI changes
- Removed the two-choice top block for `全国から登山日和を探す / 自分専用予報をつくる`.
- Removed the four feature-description badges from the header.
- Moved the four resource shortcuts (`登山口 / 山小屋 / 水場 / ライブカメラ`) below the nationwide-analysis section.
- Moved `全国分析から、自分専用の登山天気予報へ` to the bottom of the page.
- Renamed the green nationwide refresh button from `全国を分析` to `最新情報取り込み`.
- Updated related UI guidance so it refers to `最新情報取り込み` consistently.

## Preserved behavior
- Nationwide date selector and 百名山 / 二百名山 / 三百名山 filters remain.
- Nationwide A-E map/detail behavior remains.
- V1.6.96 cache telemetry remains visible: fresh coverage, average age, oldest age, and 240-minute TTL.
- Cache, provider, weather-model, ridge-wind, and A-E grade logic are unchanged.
