# V1.5.70

- V1.5.69で追加した `national_summary` / `national_debug` がRender/Gunicornで表示されない問題を修正しました。
- 原因は診断ログをINFOレベルで出力していたことです。両ログをWARNINGレベルへ変更し、RenderのApplication logsで確実に確認できるようにしました。
- 全国分析の取得エンジンは引き続き MET Norway + NOAA GFS direct のみで、Open-Meteoは使用しません。
