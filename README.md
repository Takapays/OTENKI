# V1.5.76

- Instagram自動投稿をReel動画化。翌日の全国分析実データを9:16動画として投稿。
- 全国マップ上に百名山A/B/Cを実座標で描画し、冒頭で「明日の」を大きく表示。
- オリジナルのチル・エレクトロ系BGMを自動付与。
- 最後に「全国分析2週間先まで／自分専用天気予報／登山判断サポート／登山ポータル」を表示。
- ReelはInstagram APIのREELS投稿＋フィード共有。
- 既定 `INSTAGRAM_AUTO_MEDIA=reel`。静止画へ戻す場合は `INSTAGRAM_AUTO_MEDIA=image`。

# V1.5.75

- Instagram投稿キャプションのハッシュタグを拡充。登山・百名山・天気・山岳気象・主要山域など計27個を自動付与。
- 二重投稿判定用の日付タグ `#tratenYYYYMMDD` は維持。
- 投稿画像・全国分析・自動投稿時刻のロジックは変更なし。

# V1.5.75

- Instagram全国分析画像のサブタイトルを「翌日の登山コンディションを百名山で比較」に短縮し、右端の文字切れを解消。
- その他のInstagram投稿・全国分析ロジックは変更なし。

# V1.5.73

- Instagram投稿画像の日本語フォントを確実に利用するよう修正。`japanize-matplotlib` 同梱の IPAexGothic を優先候補に追加。
- 日本語対応フォントが見つからない場合、□の画像を生成せず明示エラーで停止。
- Instagram管理画面・投稿ロジック・全国分析ロジックは変更なし。

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
