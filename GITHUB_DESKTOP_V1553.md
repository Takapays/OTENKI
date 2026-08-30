# GitHub Desktop - V1.5.53

## Summary
V1.5.53 Fix real-route CT gaps and block detours

## Description
- Fix South Yatsugatake CTs from Minotoguchi/Minoto to Akadake Kosen and Gyoja Goya.
- Add verified local CT fixes for Utsugidaira -> Komaho Hut and Yakedake Hut <-> Yakedake.
- Add a geography-aware guard so verified-edge graph composition cannot expose obvious remote detours as a local CT.
- Add route-integrity audit: 11/11 targeted checks pass; 32 raw implausible graph paths detected; 0 leak to UI.
- Keep estimated CT disabled.
- Preserve existing coordinates and weather-analysis behavior.
