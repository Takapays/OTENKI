# Traten V1.6.9

## 適用
V1.6.8に上書きする差分ZIPです。
正本系譜は **V1.5.231 = V1.6.1** とし、本リリースではルート・CT・固定地点データを変更しません。

## 修正内容
- 管理画面 `/data-audit` が古い `app.js?v=1.5.14` を読み続ける問題を修正。
- 監査画面を `index.html` と同じ39本の実行時JSスタックへ接続。`app.js` だけでなく、代表コースの enrichment / cleanup / regression-recovery / V1.6.2 recovery を同じ順番で読み込みます。
- `/data-audit` を `server.py` のバージョン付きHTML配信経由に変更し、実行中の `APP_VERSION` を全JSの `?v=` に強制反映。
- 監査画面は `/api/health` の server version と読み込んだ `app.js` の version が一致しない場合、数字を表示せず監査停止します。
- 監査用JSの読込失敗が1件でもあれば監査停止します。部分データを正常値として表示しません。
- 「再監査」はページを再読込し、最新のversion付きJSを取り直します。
- V1.6.8のPC版代表コースUIは変更しません。

## バージョン変更
- `app.js`: APP_VERSION 1.6.8 → 1.6.9 のみ。データ・ロジック変更なし。
- `index.html`: 表示版番号とasset cache-busterのみ 1.6.9へ更新。UI変更なし。
- `server.py`: APP_VERSION更新 + `/data-audit` の配信方式のみ修正。
- `data-audit.html`: 監査対象runtimeの接続修正。

## V1.6.8から引き継ぐ監査基準値
V1.6.8リリース監査では、runtime catalog は 300座 / 代表コース416本 / 座標未確認0 / 推定CT1 / CT情報なし0 / 代表コースなし5 / 通過ポイント少なめ155 でした。
V1.6.9はデータを変更していないため、完全なV1.6.8へ上書きした場合は同じruntime値になる設計です。JS欠損またはversion不一致時は数字を出さず停止します。

## 検証
- 監査画面とindex.htmlのruntime JS 39本が完全一致: PASS
- 全39本がserver.pyのPUBLIC_FILES許可対象: PASS
- 古い `app.js?v=1.5.14` 参照なし: PASS
- server/app version不一致のfail-closed: PASS
- JS読込失敗のfail-closed: PASS
- app.jsは版番号以外V1.6.8と完全一致: PASS
- index.htmlは版番号/cache-buster以外V1.6.8と完全一致: PASS
- `python -m py_compile server.py`: PASS（既存のSyntaxWarning 1件はV1.6.8から不変）
- `node --check app.js`: PASS
- 監査画面inline JS syntax: PASS
