# V1.4.231 日本三百名山 水場固定監査

## 実装

- 対象: 日本三百名山 300座
- 座標: `app.js` に既存登録済みの固定代表ルート座標のみ使用
- 監査中心取得: 300/300座で抽出成功
- 検索半径: 各代表ルート中心から約1.4km
- 対象OSMタグ: `amenity=drinking_water`, `natural=spring`, `man_made=water_tap`, `drinking_water=yes`
- 出力: `water-mountain-cache.json`
- 自動更新: GitHub Actions / 初回導入push・手動・週1回

## 表示

- `water-sources.html`: 水場あり山一覧
- 山情報ページ: 固定監査結果を優先して水場ボタンを表示
- 固定監査が未完了・失敗した山: 従来のライブOverpass判定へフォールバック
- 水場詳細を開いた時: 固定キャッシュの水場位置を使い、最近の公開レポート検索は従来どおり実行

## この作業環境での制約

この実行環境では `overpass-api.de` / `overpass.kumi.systems` のDNS解決ができないため、300山のライブ監査結果そのものは生成していません。初期 `water-mountain-cache.json` は300山すべて `checked:false` です。GitHubへV1.4.231をpushすると、新規workflowファイルをトリガーにGitHub Actionsが初回監査を自動実行します。

「水場あり」と推測で登録する処理はありません。
