# V1.5.71

- 全国分析の対象判定を代表コース有無から分離。山頂座標が解決できる山は全国分析対象とする。
- 浅間山・草津白根山は代表コース自動生成除外を維持したまま、全国分析には含める。これにより百名山は98座ではなく100座を送信対象に戻す。
- 全国分析の気象取得エンジンは引き続き MET Norway + NOAA GFS direct のみ。Open-Meteoは使用しない。

# V1.5.70

- V1.5.69で追加した `national_summary` / `national_debug` がRender/Gunicornで表示されない問題を修正しました。
- 原因は診断ログをINFOレベルで出力していたことです。両ログをWARNINGレベルへ変更し、RenderのApplication logsで確実に確認できるようにしました。
- 全国分析の取得エンジンは引き続き MET Norway + NOAA GFS direct のみで、Open-Meteoは使用しません。
