# V1.5.48 nationwide network gap audit

## Five requested deep-dive areas

V1.5.48 moves the five V1.5.47 priority gaps into explicit mountain-area graphs and verifies every declared directed edge as a direct published CT.

### 大雪山
- Added the connected core traverse: 七合目リフト駅 / 黒岳 / 黒岳石室 / 北海岳 / 旭岳 branch / 白雲岳避難小屋 / 忠別岳 / 五色岳 / ヒサゴ沼避難小屋 / トムラウシ山 / 短縮コース登山口.
- Kurodake <-> Kurodake Ishimuro was added explicitly so the graph is no longer split.
- Remaining limitation: not every alternative approach or every intermediate minor peak of the Daisetsu massif is declared. No unsupported CT was invented.

### 飯豊連峰
- Main ridge is now connected from 御沢登山口 through 横峰 / 剣ヶ峰 / 三国岳 / 切合小屋 / 飯豊山 / 御西岳 to 大日岳.
- Direction-specific published CT is used where available.
- Remaining limitation: northern approaches and side ridges such as 杁差岳・北股岳方面, 梶川/丸森/石転び沢等 are not claimed complete in this release.

### 朝日連峰
- Main north-south traverse is connected from 大朝日岳 through 大朝日岳山頂避難小屋 / 竜門小屋 / 狐穴避難小屋 / 以東岳 and down via オツボ峰 / 大鳥池 to 泡滝ダム.
- Remaining limitation: 日暮沢/古寺/朝日鉱泉/祝瓶山 side branches are not all represented as adjacent minimal sections. Where public sources expose only larger ridge sections, they are not split by arithmetic.

### 奥秩父主脈
- Connected Kinpu side and Kokushi/Kobushi/Kasatori main-ridge sections: 金峰山 / 朝日岳 / 朝日峠 / 大弛峠 / 国師ヶ岳 / 甲武信ヶ岳 / 笠取山.
- Important limitation: published JAPAN TRAIL/YAMAP material exposes 笠取山→甲武信ヶ岳 and 甲武信ヶ岳→大弛峠 as whole section CTs while naming intermediate ridges. V1.5.48 therefore keeps those two sections coarse rather than fabricating 雁峠/古礼山/雁坂峠/破風山 etc. subsegment CT.

### 谷川主脈
- Main ridge now connects 平標山 / 仙ノ倉山 / エビス大黒ノ頭 / 毛渡乗越 / 万太郎山 / 大障子ノ頭 / 小障子ノ頭 / オジカ沢ノ頭 / 谷川岳（トマノ耳）.
- Public JAPAN TRAIL checkpoint timings support the forward main-ridge direction.
- Remaining limitation: unsupported reverse-direction CT is not mirrored; 馬蹄形 and side approaches remain separate future scope.

## Acceptance meaning

`missing 0` in the V1.5.48 explicit-area audit means every **declared** directed adjacent audit edge has a direct published CT. It does not mean every possible trail in each massif has been declared. Known unmodeled side branches and coarse published sections are explicitly retained here rather than hidden by estimates.
