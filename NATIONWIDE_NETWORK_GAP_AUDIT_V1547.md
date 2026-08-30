# V1.5.47 Nationwide mountain-area network gap audit

## Acceptance scope completed in this release

V1.5.47 extends the V1.5.46 Alps / Yatsugatake / Kuju graphs with 15 additional explicit major-area graphs:

1. 尾瀬・尾瀬ヶ原至仏燧
2. 富士山・四登山ルート山頂
3. 丹沢・主脈
4. 妙高・火打
5. 霧島・韓国岳大浪池
6. 大山・夏山行者
7. 四国・剣山三嶺
8. 屋久島・宮之浦岳
9. 谷川岳・天神尾根
10. 朝日連峰・大朝日
11. 飯豊連峰・大日杉
12. 奥秩父・雲取
13. 阿蘇・高岳中岳仙酔峡
14. 祖母山・神原北谷
15. 石鎚山・弥山天狗岳

Acceptance result from `audit_area_network_v1547.js`:

- explicit areas: 31 total
- unique named nodes: 225
- directed declared adjacent edges: 367
- direct verified CT: 367
- missing: 0
- estimated: 0
- composed-only: 0
- disconnected areas: 0

## Important improvements

### 尾瀬

The previous summit-centric data did not represent the main marsh corridor. V1.5.47 explicitly connects 鳩待峠 -> 山ノ鼻 -> 竜宮十字路 -> 見晴, then the 見晴新道 branch to 燧ヶ岳, plus 御池 and 至仏山 branches. The old 温泉小屋道 is not reintroduced; it is treated as abandoned/closed rather than given CT.

### 富士山

The four trailheads are no longer treated in the audit graph as if they all terminate directly at 剣ヶ峰. V1.5.47 distinguishes:

- 吉田・須走ルート山頂
- 富士宮ルート山頂
- 御殿場ルート山頂
- 剣ヶ峰

Only directions for which a public model explicitly gives a time are registered. An unsupported reverse value is not inferred.

### 大山 / 霧島

Environment Ministry published checkpoint-by-checkpoint course times are used directly. Existing conflicting older values for 韓国岳登山口->韓国岳 and 大山山頂->六合目避難小屋 were replaced with the official values so CT conflict count remains zero.

### 石鎚山

The audit graph now separates 弥山 from the actual highest point 天狗岳 rather than treating 弥山 as the sole summit endpoint.

## Major real-world networks still not claimed complete

The following are deliberately **not** declared complete. Trail topology is known to be richer than the current explicit graph, but exact public adjacent-section CT at the required endpoint granularity was not sufficiently confirmed during this release. No synthetic CT was inserted.

### 大雪山核心縦走

Known active topology includes 黒岳石室 / 白雲岳避難小屋 / 忠別岳避難小屋 / ヒサゴ沼避難小屋 and approaches from 旭岳・黒岳・銀泉台 through the central plateau. The Daisetsuzan National Park Council confirms the shelters and active routes, including Tomuraushi-Hisago-Kaun-dake, but the public material checked in this release did not provide a complete endpoint-by-endpoint CT table for the full traverse. Result: topology gap recorded, **no estimated CT**.

### 飯豊連峰 main traverse / northern approaches

The verified 大日杉 -> 切合小屋 -> 飯豊山 branch is explicit. 三国小屋 / 御西岳 / 大日岳 and northern approaches are not yet fully split into adjacent CT edges. The current Nishiaizu information also states that the 新長坂 route from 祓川 is closed because of collapse; it must not be completed by inventing CT.

### 朝日連峰 additional approaches

古寺 and 日暮沢 branches are represented. 朝日鉱泉 variants (中ツル / 鳥原山 / 御影森山 routes) are known but were not split because the public sources checked mainly gave whole-route or coarse times rather than every required adjacent section.

### 奥秩父 main ridge

雲取's 鴨沢-七ツ石-雲取-雲取山荘 branch is explicit. The larger 金峰山-国師ヶ岳-甲武信ヶ岳-雁坂峠 ridge is not yet declared as one complete graph because endpoint-specific adjacent CT is incomplete in the checked sources.

### 谷川連峰

The 天神尾根 is explicit. 馬蹄形 / 谷川主脈 / 一ノ倉・茂倉 side remains outside the completed graph pending consistent adjacent-section CT verification.

### 東北 volcanic ranges

鳥海山, 蔵王, 吾妻, 安達太良などには複数の主要登山道・火口周回・縦走枝があるが、今回は全国一括処理の中で完全な隣接CT表までは起こしていない。既存代表ルートCTは維持し、未監査枝を監査済みとは扱わない。

## Legacy 300-mountain signal

`node audit_all_ct_v1523.js` after V1.5.47:

- mountains: 300
- courses: 376
- segments: 963
- direct: 952
- composed: 11
- estimated: 0
- missing: 81
- CT conflicts: 0

The 81 legacy missing directions are not silently converted to verified. They remain unavailable and form a separate backlog from the 31 explicit major-area graphs.

## Conclusion

V1.5.47 materially broadens the explicit network audit beyond the Alps/Yatsugatake/Kuju set, but it does **not** claim national all-trail completeness. The strict acceptance statement is:

> Every one of the 367 directed adjacent sections explicitly declared in the 31 major mountain-area graphs has a direct, non-estimated CT, and every graph is connected. Known unmodeled branches remain listed as gaps rather than being inferred.
