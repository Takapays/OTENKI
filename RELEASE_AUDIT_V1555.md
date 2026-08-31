# Traten V1.5.55 Release Audit

## Scope
V1.5.55 restores high-value custom-route candidates that V1.5.54 intentionally withheld until endpoint-specific public CT could be verified. This release focuses on Oze and Tanigawa while keeping the nationwide safety rule: displayed custom-route pairs must not fall back to estimated CT or implausible detours.

## Restored / corrected
- Oze corridor: added verified checkpoint-derived CT for 竜宮十字路 ↔ 龍宮小屋, 龍宮小屋 ↔ 見晴, and verified aggregate links from 鳩待峠 to 龍宮小屋 / 見晴.
- Tanigawa: normalized `トマノ耳` to `谷川岳（トマノ耳）`, added トマノ耳 ↔ オキノ耳, and checkpoint-derived 熊穴沢避難小屋 ↔ オキノ耳 CT.
- Nearby-summit duplicate handling: proximity alone no longer merges two different real summits. Duplicate collapse now also requires the normalized semantic point identity to match. This specifically avoids losing 谷川岳のトマノ耳 / オキノ耳 while retaining alias-equivalent duplicate cleanup such as 赤岳 labels.

## Nationwide custom-route audit
- mountains: 299
- raw candidates: 1,720
- displayed safe candidates: 1,192
- withheld / disconnected / duplicate: 260
- ordered displayed pairs: 11,560
- CT missing among displayed pairs: 0
- estimated CT among displayed pairs: 0
- verified routes >= 600 min: 5,242
- mountains with fewer than 2 safe points: 51

## Priority-area result
- 燧ヶ岳: 7 displayed candidates; 小沢平登山口 remains withheld.
- 至仏山: 6 displayed candidates; no hidden candidate remains in this builder.
- 谷川岳: 4 displayed candidates; 谷川岳肩ノ小屋 remains withheld pending endpoint-specific public CT.

## Regression checks
- JavaScript syntax: PASS
- Python syntax compile: PASS
- area network: 424 / 424 direct verified, missing 0, estimated 0
- Hyakumeizan + area network: 700 / 700 direct verified, missing 0, estimated 0
- classic routes: 109 / 109, missing 0, estimated 0, derived 0
- route-integrity targeted tests: 11 / 11 PASS
- raw implausible candidate paths detected: 32; leaked to UI: 0
- Ontake + Yatsugatake custom-route audit: 282 / 282 resolved, missing 0, estimated 0

## Known remaining restoration targets
These are deliberately not claimed as fixed in V1.5.55. Examples include:
- 大雪: 黒岳石室
- 谷川岳: 谷川岳肩ノ小屋
- 雲取山: 小袖乗越方面の未接続候補
- 金峰山: 大日小屋
- 石鎚山: 石鎚神社頂上山荘

They remain withheld until endpoint-specific public CT can be verified. No guessed CT was added.

## Non-CT regression policy
- Weather-analysis logic unchanged.
- No existing fixed coordinate was intentionally modified.
