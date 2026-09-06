# Traten V1.5.229 - historical route recovery / regression guard

V1.5.228 の index.html が参照していた過去のルート拡張 JavaScript が、差分パッケージ側から欠落していたため、過去に実施した代表コース詳細化が実行時に失われていた問題を修復した。

## Recovery
- V1.5.228 で index.html が参照していたローカル JavaScript 37本を全件照合し、実ファイルが欠落していた36本を過去リリース成果から回収。
- 代表コース拡張 V1.5.132 / 1.5.134 / 1.5.145-1.5.165 を復元。
- 浅間・百名山・西日本・代表コースcleanupの過去拡張資産も、index.html の参照と一致するよう復元。
- 三瓶山は過去成果どおり北の原ルート・西の原ルートとも6地点へ復旧。

## Acceptance
- 座標不備 0
- CT情報なし 0
- 推定CT 1以下
- 派生/按分CT 0
- 通過ポイント少なめ 156以下
- 代表コース 419以上
- index.html が参照するローカル JS 欠落 0

`audit_regression_guard_v15229.js` を今後のリリース前ガードとして同梱する。
