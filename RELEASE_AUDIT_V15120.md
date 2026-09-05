# RELEASE AUDIT V1.5.120

## Root cause
`loadCandidates()` と V1.5.118 の代表コース候補統合処理が `sanitizeFixedCustomRouteCandidates()` を通し、固定候補をCT完全接続グラフに縮退していた。
このため、固定座標と山域カタログに存在する縦走上の有効地点でも、全候補との双方向CT接続を満たさない地点がUI候補から消えていた。

## Fix
- 手動候補: `resolvedStaticBase` の座標確定地点を `dedupeCandidateList()` だけで整理し全保持。
- 代表コース読込時の候補統合: 同様に座標確定地点を全保持。
- CT検証・警告は実際に選んだ隣接区間に対して既存ロジックで実施。

## Static regression checks
- 赤岳 -> 横岳（八ヶ岳） candidate present: PASS
- 赤岳 -> 阿弥陀岳 candidate present: PASS
- 赤岳 -> 赤岳天望荘 candidate present: PASS
- 赤岳 -> 硫黄岳山荘 candidate present: PASS
- 仙丈ヶ岳 -> 甲斐駒ヶ岳 candidate present: PASS
- candidate dropdown itself has no CT-based visibility filter: PASS
- app.js syntax: PASS
- server.py compile: PASS

## Policy
縦走ルート設計では「候補地点を消さない」を優先する。CT未登録区間は地点を非表示にせず、選択後に既存の「CT情報なし / 要確認」表示で扱う。
