# V1.5.72

- Instagram管理テスト画面 `/instagram-admin` を追加。Render Shellなしで接続確認・全国分析画像プレビュー・手動投稿が可能。
- 管理APIは既存 `NATIONAL_CACHE_REFRESH_TOKEN` を `X-Traten-Cache-Token` として使用。公開URLから無認証操作は不可。
- 入力した管理トークンはブラウザの sessionStorage のみに保持し、URLには含めない。
- `/api/instagram/test-connection` と `/api/instagram/preview-url` を追加。
- 全国分析の気象取得ロジックは変更なし（MET Norway + NOAA GFS direct）。

# V1.5.71

- 全国分析の対象判定を代表コース有無から分離。山頂座標が解決できる山は全国分析対象とする。
- 浅間山・草津白根山は代表コース自動生成除外を維持したまま、全国分析には含める。これにより百名山は98座ではなく100座を送信対象に戻す。
- 全国分析の気象取得エンジンは引き続き MET Norway + NOAA GFS direct のみ。Open-Meteoは使用しない。

# V1.5.70

- V1.5.69で追加した `national_summary` / `national_debug` がRender/Gunicornで表示されない問題を修正しました。
- 原因は診断ログをINFOレベルで出力していたことです。両ログをWARNINGレベルへ変更し、RenderのApplication logsで確実に確認できるようにしました。
- 全国分析の取得エンジンは引き続き MET Norway + NOAA GFS direct のみで、Open-Meteoは使用しません。
