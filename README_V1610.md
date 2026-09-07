# Traten V1.6.10

V1.6.9 に対する差分リリースです。

## 変更

1. 全国キャッシュ定期更新の Supabase 保存後確認を改善
   - upsert 成功直後の read-back が一時的に旧行を返す場合に、短い待機を挟んで最大3回再確認します。
   - 確認できない書き込みを成功扱いにはしません。再確認後も一致しなければ従来どおり `database read-back incomplete` として失敗します。
   - デフォルト: `NATIONAL_SUPABASE_VERIFY_RETRIES=3`, `NATIONAL_SUPABASE_VERIFY_DELAY=0.6` 秒。

2. データ監査「通過ポイント少なめ」
   - 旧: 固定ポイント 3地点以下
   - 新: 固定ポイント **2地点以下**

3. バージョンを V1.6.10 に同期
   - app.js / server.py / index.html / data-audit.html のキャッシュキーを同期。

## 変更していないもの

- CT値
- 代表コース定義
- 固定地点の座標・標高
- 全国判定ロジック
- PC版代表コースUI
- Instagram投稿ロジック

## 適用

V1.6.9 のリポジトリへ ZIP 内ファイルを同じパスで上書きしてください。
