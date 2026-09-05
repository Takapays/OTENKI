# Traten V1.5.145

## 3点代表コース削減（full-runtime監査基準）
V1.5.128時点の保存リストは197コース。旧監査が enrichment scripts を読み込んでおらず、途中で86/78/72と誤集計していたため、V1.5.145以降は index.html が実際に読み込む全ルートスクリプトを実行して集計する。

- V1.5.144 true 3-point routes: 180 / total representative routes 422
- V1.5.145 true 3-point routes: 176 / total representative routes 422
- 今回削減: 4

### 今回の対象
1. 岩木山・岩木山八合目ルート
   - 岩木山八合目 → 鳳鳴ヒュッテ → 岩木山 → 鳳鳴ヒュッテ → 岩木山八合目
   - 既存V1.5.85確認済みCTを再利用。既存の豊富な代表ルートと重複して残っていた3点版を正常化。
2. 愛鷹山（越前岳）・十里木高原登山口ルート
   - 十里木高原登山口 → 馬ノ背見晴台 → 愛鷹山（越前岳） → 馬ノ背見晴台 → 十里木高原登山口
   - 座標: OpenStreetMap/Mapcarta https://mapcarta.com/N13228143151
   - CT: YAMAP https://yamap.com/model-courses/6960
3. 瑞牆山・みずがき山自然公園ルート
   - みずがき山自然公園 → 不動滝 → 瑞牆山 → 富士見平小屋 → みずがき山自然公園
   - 公開ルート: 北杜市 https://www.city.hokuto.lg.jp/fc/location/22460.html
   - CT: YAMAP https://yamap.com/model-courses/22279
4. 伊吹山・上野登山口（三之宮神社）ルート
   - 上野登山口 → 伊吹山六合目避難小屋 → 伊吹山 → 六合目避難小屋 → 上野登山口
   - 避難小屋座標: https://kuchikomi.tim.jp/yama2/Shisetsu.html?shisetsuId=1558
   - CT: YAMAP https://yamap.com/model-courses/129
   - 現地規制・通行可否は最新公式情報を優先すること。

## 監査
- total representative courses = 422
- true 3-point routes = 176
- 追加4ルートは固定座標解決済み
- 追加CTに estimated なし
- JavaScript syntax check passed
