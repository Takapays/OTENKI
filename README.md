# V1.5.86
西日本（三百名山）通過ポイント増設PJ 第1弾。詳細は `RELEASE_AUDIT_V1586.md` を参照。

V1.5.85: Priority-C 30座を一括通過ポイント拡充。伊吹山は2026年の麓側入山禁止を反映し代表ルートを修正。

# V1.5.84

Priority-B route waypoint enrichment complete: 磐梯山 / 雨飾山 / 男体山 / 聖岳.


# V1.5.83
Priority-B representative route enrichment batch 2. See README_V1583.md and RELEASE_AUDIT_V1583.md.
# V1.5.79

- 日本百名山の代表コース通過ポイント密度を100座一括監査。
- 第1弾として、十勝岳・御嶽・八ヶ岳（赤岳）・岩手山・常念岳・鹿島槍ヶ岳を改善。
- 十勝岳は望岳台→十勝岳避難小屋→十勝岳を代表化。
- 御嶽は女人堂、赤岳は行者小屋を追加。
- 岩手山は馬返し、常念岳は一ノ沢、鹿島槍ヶ岳は扇沢・柏原新道を代表に変更。
- CTは既存の確認済み公開区間のみ使用し、距離按分による推定は追加しない。
- `HYAKUMEIZAN_ROUTE_AUDIT_V1579.md` / `HYAKUMEIZAN_ROUTE_PRIORITY_V1579.csv` を同梱。

# V1.5.78

- 浅間山の代表コースを「火山館・前掛山ルート（警戒レベル1時）」として追加。
- 通過ポイントを 天狗温泉浅間山荘 / 不動滝 / 火山館 / 湯の平分岐 / 賽の河原分岐 / 前掛山 の6地点へ拡張。
- 公開CTで往路230分、復路170分、往復400分（6時間40分）。
- 浅間山の新規地点同士は公開済み隣接CTのみで任意区間を合算。推定CTは使用しない。
- 百名山の通過ポイント＋CT拡張を次段階の監査対象として整理。

# V1.5.77

- Instagram管理画面から静止画とReelの両方をプレビュー可能。
- Reel冒頭・終盤を「まったく新しい登山天気ツール / 日本三百名山 / 全部無料！」の訴求へ更新。
- Reelの主要機能紹介を三百名山・自分専用天気予報・登山判断サポート・登山ポータルへ更新。
- 自動投稿は従来どおり `INSTAGRAM_AUTO_MEDIA=reel` が既定。

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
