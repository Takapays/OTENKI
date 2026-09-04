# RELEASE AUDIT V1.5.82

## Scope
日本百名山・代表コース通過ポイント増設 Priority-B 第1弾、および嘉津宇岳追加。

## Priority-B improved in this release (9/18)
- 雲取山: 七ツ石小屋 + 七ツ石山を通過点化（5地点）
- 妙高山: 黒沢池ヒュッテを往復通過点化（5地点）
- 岩手山: 八合目避難小屋を往復通過点化（5地点）
- 甲斐駒ヶ岳: 駒津峰を追加（5地点）
- 西吾妻山: 西大巓を追加（5地点）
- 仙丈ヶ岳: 馬の背ヒュッテ + 仙丈小屋を追加（7地点）
- 会津駒ヶ岳: 駒の小屋を追加（5地点）
- 燧ヶ岳: 熊沢田代を追加（5地点）
- 荒島岳: シャクナゲ平を追加（5地点）

## Added mountain
- 嘉津宇岳（沖縄県名護市）
- 山頂: 452m / 26.631182, 127.934834
- 登山口: 26.631139, 127.939389 / 271m
- 代表コース: 嘉津宇岳登山口 -> 嘉津宇岳 -> 嘉津宇岳登山口
- CT: 30分 + 30分 = 60分
- 九州エリアの追加山として選択可能。日本三百名山の全国分析対象には追加しない。

## Audit
- 日本百名山: 100座
- 代表コース unresolved: 1座（草津白根山の既存HOLDのみ）
- Priority-B: 18座中9座が5地点以上へ改善
- 嘉津宇岳: selectable=true / area=kyushu / CT=[30,30] / error=none
- node --check app.js: PASS
- node --check hyakumeizan-route-enrichment-v1582.js: PASS
- python -m py_compile server.py instagram_bot.py: PASS

## Policy
距離按分・標高差によるCT推定は追加していない。公開モデル、公式案内、既存確認済みCTのみを採用。
