# RELEASE AUDIT V1.5.79

## Scope
日本百名山の代表コース通過ポイント改善・第1弾。

## Changes
- 百名山100座の代表コースを一括監査。
- 十勝岳: 望岳台・十勝岳避難小屋ルートを代表化（往復425分）。
- 御嶽: 女人堂を追加。
- 八ヶ岳（赤岳）: 行者小屋を追加。
- 岩手山: 馬返し登山口ルートを代表化。
- 常念岳: 一ノ沢ルートを代表化。
- 鹿島槍ヶ岳: 扇沢・柏原新道ルートを代表化。
- 浅間山 V1.5.78 の火山館・前掛山ルートを継続。

## Audit result
- 100座監査。
- ルート解決エラー: 草津白根山のみ（火山規制対応のため代表コース未設定状態を維持）。
- 優先A: 10座 / B: 18座 / C: 30座 / 当面OK: 41座 / HOLD: 1座。
- 次優先A: 越後駒ヶ岳、平ヶ岳、利尻山、トムラウシ山、恵那山、羅臼岳、後方羊蹄山、武尊山、両神山、巻機山。

## CT policy
- 既存の確認済み公開CTのみ使用。
- 距離按分・標高差回帰などの推定CTは追加していない。

## Verification
- `node --check app.js`: PASS
- `node --check asama-route-v1578.js`: PASS
- `node --check hyakumeizan-route-enrichment-v1579.js`: PASS
- `python3 -m py_compile server.py instagram_bot.py`: PASS
- `node audit_hyakumeizan_route_density_v1579.js`: PASS（fail=1, 草津白根山のみ）
