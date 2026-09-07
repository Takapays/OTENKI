# V1.6.7 Release Audit

## 変更範囲
- `index.html` のPC版代表コース表示CSSのみ。
- ルート定義、CT、気象、DEM、サーバー処理には変更なし。

## UI回帰確認
- PC版 `#representativeCourseSummaryAlways`: 常時 `display:grid`。
- hover / focus-within による代表コース一覧の表示切替セレクタ: 0件。
- PC版代表コース一覧: 3列コンパクトカード、タイトル11px、経路10px、各最大2行。
- `#representativeCourseBtn`: 維持。
- モバイル専用 `#mobileRepresentativeCourses` のCSS: 変更なし。
