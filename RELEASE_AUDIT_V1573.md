# RELEASE AUDIT V1.5.73

## 変更
- `requirements.txt` に `japanize-matplotlib==1.1.3` を追加
- Instagram画像生成時に package 内 `fonts/ipaexg.ttf` を自動検出
- 日本語フォントが利用できない場合は `ImageFont.load_default()` にフォールバックせず停止

## 影響範囲
- Instagram投稿画像生成のみ
- 全国分析ロジック、MET Norway / NOAA GFS取得、キャッシュ、Instagram API投稿処理は変更なし

## 確認
- Python構文チェック済み
- 差分ZIPはV1.5.72から変更されたファイルのみ
