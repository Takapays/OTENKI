# V1.5.30 Release Audit

## 対象
- 基準: `traten-v1.5.29-full.zip` を展開した実ソース
- 変更: スマホ版 04 地点別予報の4指標カード配置崩れ修正
- バージョン: V1.5.29 → V1.5.30

## 原因
V1.5.29で独立した風向カードを削除した後も、既存のスマホCSSに `temp / wind / rain / visibility` の named `grid-area` 指定が `!important` 付きで残っていました。V1.5.29で追加した汎用 `grid-area:auto` は詳細度が足りず打ち消せず、暗黙グリッドが横方向へ拡張され、気温・風・雨カードが画面外へ押し出されて視界だけが右側に見える状態になっていました。

## 実施した変更
- 気温・風・雨・視界それぞれに対して、既存指定以上の詳細度で `grid-area / grid-column / grid-row` を `auto !important` に明示リセット。
- スマホ（900px以下）は `2列 × 2段`、PCはV1.5.29の4列構成を維持。
- 風向は引き続き「風」カード内の矢印・方角・度数表示を維持。

## 実監査結果

### 1. 構文
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS

### 2. バージョン整合
- `app.js`: 1.5.30
- `server.py`: 1.5.30
- `index.html`: V1.5.30 / cache-buster 1.5.30
- 登山口・山小屋・水場・ライブカメラ各ページ: V1.5.30へ統一

### 3. CT / 地点整合
`audit_all_ct_v1523.js` を V1.5.29 と V1.5.30 の両方へ実行して比較。

V1.5.30:
- 日本三百名山: 300
- 代表コース: 380
- 代表コース区間: 901
- direct: 757
- composed: 12
- estimated: 132
- missing: 0
- flags: 48
- conflicts: 0
- reverseFlags: 1

比較結果:
- V1.5.29 と監査出力完全一致
- CT・地点・区間データへの変更なし

### 4. 王道ルート組立
`audit_classic_routes_v1518.js`:
- 9ルート / 109区間
- missing: 0
- estimated: 0
- derived: 0
- V1.5.29 と監査出力完全一致

### 5. progressive weather rendering
- 今回 `app.js` の気象取得・merge・再描画処理には変更なし
- `mergeAnalysisResults()` / `progressiveStates` / モデル到着ごとの `renderAll()` / 最終 `Promise.all(...)` 構造を維持

### 6. 変更差分範囲
- 実質UI修正: `styles.css`
- `app.js`: バージョン番号のみ
- その他: バージョン表示 / cache-buster / README / CHANGELOG / guide / 監査記録
- CTテーブル、固定座標、代表コース、気象モデル・判定ロジックは変更なし

### 7. 削除
- 削除ファイルなし

### 8. 視覚確認
- ユーザー提供スクリーンショットと実CSSを照合し、崩れの原因となる旧named `grid-area` 指定を実ソースで確認。
- 修正後ソースでは4指標すべての旧named area指定を明示的に解除することを確認。
- 実ブラウザ/Render上での表示確認は未実施。
