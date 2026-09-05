# Release Audit V1.5.110

## Root cause
V1.5.100-1.5.109 の代表コース細分化は `representative-route-enrichment-v15109.js` の実行に依存していた。
本番でこの外部JSが未実行・未反映の場合、`app.js` の旧代表コース定義がそのまま表示される。

## Fix
- 代表コース細分化ロジックを `app.js` の末尾へ統合。
- `index.html` から `representative-route-enrichment-v15109.js` の読み込みを削除。
- frontend cache-buster / APP_VERSION を 1.5.110 へ更新。

## Verification
- `node --check app.js`: PASS
- `python -m py_compile server.py`: PASS
- VM execution after loading app.js only:
  - 仙丈ヶ岳: 6 points PASS
  - 甲斐駒ヶ岳: 5 points PASS
  - 八ヶ岳（赤岳）: 9 points PASS

この監査は、外部 enrichment JS を別途読み込まず `app.js` 単体で実施。
