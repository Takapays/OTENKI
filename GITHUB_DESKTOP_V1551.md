# GitHub Desktop V1.5.51

## Summary
V1.5.51 Fix Ontake and Yatsugatake custom-route CT

## Description
- Re-audited CT from the actual `コースを自分で設計` selectable points instead of relying only on declared mountain-area graphs.
- Ontake: 7 selectable points / 42 ordered pairs / 42 resolved / missing 0 / estimated 0.
- Yatsugatake (Aka-dake): 16 selectable points / 240 ordered pairs / 240 resolved / missing 0 / estimated 0.
- Added verified public CT links for Minotoguchi/Minoto, Fujimi Kogen/Amigasa, Kannon-daira/Amigasa, Amigasa/Seinen-goya, Seinen-goya/Gongen, Gongen-goya/Gongen and Gongen/Aka-dake.
- Allows >10 h composed CT only inside the audited Ontake/Yatsugatake custom-route groups when every underlying edge is already publicly verified; no CT estimation or reverse mirroring was introduced.
- Preserved existing coordinates, weather-model logic and nationwide analysis behavior.
- Regression remains clean: area network 424/424, Hyakumeizan union 700/700, classic routes 109/109, legacy estimated 0 and CT conflicts 0.
