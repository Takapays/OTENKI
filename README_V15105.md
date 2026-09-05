# OTENKI V1.5.105

## Purpose
代表コース細分化が本番画面に反映されない問題を修正。

## Root cause
V1.5.100〜V1.5.104 は代表コース細分化を複数の外部差分JSへ分割していたが、後続の差分ZIPは過去JSを同梱していなかった。そのため、環境によっては index.html が過去の enrichment JS を参照していても実体が存在せず、app.js の元の粗い代表コース（登山口→山頂→登山口）がそのまま使われる状態になっていた。

## Fix
- V1.5.100〜V1.5.104 の代表コース細分化を `representative-route-enrichment-v15105.js` 1本へ統合。
- index.html は旧 enrichment JS 5本を参照せず、V1.5.105 統合JSのみを読み込む。
- app.js / server.py / index.html を V1.5.105 に統一。
- 今後は差分ZIP単体で代表コース改修が反映される構成にする。

## Verified examples
- 仙丈ヶ岳: 北沢峠 → 小仙丈ヶ岳 → 仙丈ヶ岳 → 仙丈小屋 → 馬の背ヒュッテ → 北沢峠
- 甲斐駒ヶ岳: 北沢峠 → 長衛小屋 → 仙水小屋 → 甲斐駒ヶ岳 → 北沢峠

## Policy
推測座標・推測CTの追加なし。既存固定地点および公開確認済みCTのみ。
