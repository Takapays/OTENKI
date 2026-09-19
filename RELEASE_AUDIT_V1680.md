# Release Audit V1.6.80

## 改修元
V1.6.79

## 変更範囲
- `server.py`: 全国詳細再判定の共有キャッシュ永続化、JMA推定稜線風系列の妥当性検査、キャッシュ世代更新
- `app.js`: V1.6.80/新キャッシュキー、サーバー再整合結果を正として採用
- `index.html`: バージョン表記更新

## 退行防止
- ABCDE判定閾値は変更していない。
- JMA稜線風推定式は変更していない。
- MET Norway / NOAA GFS の既存モデル取得・統合ロジックは変更していない。
- 全国詳細の写真・YAMAP・コース等の既存UIは変更していない。

## 検証
- `python -m py_compile server.py`: PASS（既存HTML内 `\\s` の SyntaxWarning のみ）
- `node --check app.js`: PASS
- ZIP階層: なし
