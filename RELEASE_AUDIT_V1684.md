# RELEASE AUDIT V1.6.84

改修元: V1.6.83

## 対象変更

- app.js
  - APP_VERSION 1.6.84
  - 全国用の御嶽/大山（鳥取）標高補完
  - ブラウザキャッシュ先行描画を停止
  - ブラウザキャッシュは通信失敗時のみフォールバック
  - detail client fallbackで既存日判定を安全側から改善しない保護
  - ブラウザキャッシュキーをV1.6.84へ更新
- server.py
  - APP_VERSION 1.6.84
  - 御嶽/大山（鳥取）の旧null標高Supabaseキー互換読込
  - Supabaseメタ読込も旧キー互換
  - detailの1山キャッシュ読込も旧キーへフォールバック
  - 旧null標高のローカルディスクキャッシュfingerprintへフォールバック
- index.html
  - app.js query version 1.6.84

## 変更していない主要ロジック

- ABCDE判定閾値
- JMA MSM推定稜線風の計算式
- JMA worst-of方針
- 単独モデル safety floor の閾値
- 山行分析の地点別重み付け
- ルート分析ロジック

## 検証

- `python -m py_compile server.py`: 成功（既存の `\\s` SyntaxWarningのみ）
- `node --check app.js`: 成功
- V1.6.83との差分を確認し、対象外ロジックの意図的変更はなし
- 実環境API/Supabaseの動作: 未確認
