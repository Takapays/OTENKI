# V1.5.35 Release Audit

## 対象
- 基準: `traten-v1.5.34-full.zip` を展開した実ソース
- 変更: 分析結果の総合判断へ、選択山の「てんきとくらす（てんくら）」個別ページリンクを追加
- バージョン: V1.5.34 → V1.5.35

## 実装方針
- 山名からてんくらURLを推測生成しない。
- てんくら公式の地域別「高原・山」一覧をサーバー側で取得し、そこに実在する `kad.html` 個別ページだけを候補にする。
- トラテンの山名とてんくらの表示名を正規化・既知別名で照合し、一意に確認できた場合のみリンクを有効化する。
- 富士山・槍ヶ岳・御嶽/御嶽山は公開Web検索で現行個別URLを直接確認できたため、検証済み直接リンクも保持する。
- その他の山は実行時に公式一覧から解決するため、てんくら側URL変更への追従性を確保する。
- 外部リンク解決は分析結果表示後に非同期実行し、既存のprogressive weather renderingを待たせない。

## UI
- 02 総合判断の下に「他サービスでも確認 / 山行前のクロスチェック」を追加。
- 「てんくら」ボタンは照合中 / 利用可能 / 未確認の状態を表示。
- 個別ページを確認できた場合だけ `target=_blank` で有効化。
- スマホでは横幅100%の1段カード表示に変更。
- 結果スクリーンショットには外部リンクカードを含めない（`screenshot-exclude`）。

## 実監査結果

### 1. 構文
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS

### 2. てんくら解決ロジック
実ソースから該当クラス・関数をAST抽出してfixtureテスト。
- HTML内の公式個別リンク抽出: PASS
- 相対URL → `https://tenkura.n-kishou.co.jp/tk/kanko/kad.html?...` 正規化: PASS
- 富士山 → 富士山山頂: PASS
- 槍ヶ岳 → 槍ヶ岳: PASS
- 御嶽 → 御嶽山: PASS
- 御嶽山 → 御嶽山: PASS
- 存在しない山 → `None`（誤リンクしない）: PASS

公開Webで確認した現行ページ:
- 富士山山頂: code=19150004
- 槍ヶ岳: code=20150022
- 御嶽山: code=20150023

### 3. CT / 代表コース
`audit_all_ct_v1523.js` 実行結果:
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
- V1.5.34と監査出力が完全一致

### 4. 王道ルート
`audit_classic_routes_v1518.js` 実行結果:
- 王道ルート: 9
- 区間: 109
- missing: 0
- estimated: 0
- derived: 0
- V1.5.34と監査出力が完全一致

### 5. 固定座標
`audit_fixed_access.py`:
- fixed/resolved: 299/300
- 既存未解決: 観音岳(鳳凰) 1件
- 今回座標データは変更していない。

### 6. progressive weather rendering
`app.js` 差分確認:
- 既存 `mergeAnalysisResults()` / `progressiveStates` / モデル到着ごとの `renderAll()` / 最終統合処理は無変更。
- `renderSummaryCore()` の末尾から非同期 `updateTenkuraLink()` を呼ぶ追加のみ。
- 同一山のprogressive再描画中は `tenkuraLinkPendingKey` で重複問い合わせを抑制。

### 7. 変更範囲
- `app.js`: バージョン、てんくらリンクの非同期UI更新
- `server.py`: バージョン、てんくら公式地域一覧の取得・キャッシュ・一意照合API
- `index.html`: 外部クロスチェックカード
- `styles.css`: PC/スマホ表示
- `guide.html`, `README.md`, `CHANGELOG.md`: V1.5.35説明
- その他ページ: バージョン/cache-buster更新

CTテーブル、固定座標、代表コース、気象モデル取得・判定ロジックは変更なし。

### 8. 制約
- この実行環境のcontainerから外部DNS接続できないため、Renderと同じ実ネットワークでの `/api/tenkura-link` 通信試験は未実施。
- ただし、てんくら公式地域一覧と富士山・槍ヶ岳・御嶽山の現行個別ページはWeb検索で実在確認済み。
- Renderデプロイ後の実画面・実通信確認は未実施。未実施事項を確認済みとは扱わない。
