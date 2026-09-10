# TRATEN V1.6.39

meteoblue 429 protection release.

- meteoblue is serialized and paced.
- 429 opens a 60-second cooldown so repeated route/national requests do not hammer the upstream API.
- MET Norway / NOAA GFS continue to work while meteoblue is cooling down.
- No nationwide ABCDE threshold changes are included in this release.
