# RELEASE AUDIT V1.5.126

## 3点代表コース
index.html と同じ route-enrichment 読み込み順のVM監査。

- total representative options: 436 -> 424
- 3-point routes: 216 -> 204
- removed redundant 3-point options: 12

## 方針
同一アクセス起点・終点で、既存enrichmentに4点以上の検証済み代表コースが既に存在する場合のみ、旧3点代表コースを選択肢から除外。
異なる登山口・異なる下山口を持つ別コースは削除しない。
新規座標・新規CT・推定CTは追加していない。

## 残した細分化ルートの回帰監査
以下12ルートを buildRepresentativeResolvedRoute で再構築。
- route build errors: 0
- missing CT: 0
- estimated CT: 0

対象:
- 雄阿寒岳 / 滝口・五合目ルート
- 八幡平 / 山頂レストハウス・めがね沼周回ルート
- 早池峰山 / 小田越・五合目御金蔵ルート
- 奥白根山 / 菅沼・弥陀ヶ池ルート
- 赤城山（黒檜山） / 黒檜山・駒ヶ岳周回ルート
- 霧ヶ峰（車山） / 車山肩・蝶々深山周回ルート
- 美ヶ原 / 山本小屋・美しの塔ルート
- 焼岳 / 新中の湯・下堀沢出合ルート
- 金峰山 / 大弛峠・朝日岳ルート
- 日出ヶ岳 / 大台ヶ原・日出ヶ岳展望台ルート
- 湧蓋山 / 八丁原・一目山・湧蓋山周回ルート
- 開聞岳 / ふれあい公園・五合目ルート

## Syntax / version
- node --check app.js: PASS
- node --check representative-route-cleanup-v15126.js: PASS
- python3 -m py_compile server.py: PASS
- APP_VERSION / PC / mobile / cachebuster: 1.5.126
