# V1.5.17 Release Audit

## UI変更
- `index.html` 上で `representativeCourseBtn` が `loadPoiBtn` より先に出現: PASS
- `loadPoiBtn` 初期文言 = `コースを自分で設計`: PASS
- `app.js` の未読込時文言 = `コースを自分で設計`: PASS
- `representativeCourseBtn` 文言 = `代表コースを読み込む`: PASS

## 構文
- `node --check app.js`: PASS
- `python3 -m py_compile server.py`: PASS

## CT回帰
- mountains: 300
- representative courses: 380
- expanded directional segments: 901
- verified/composed CT: 768
- estimated CT: 133
- derived intermediate-point CT: 0
- CT missing: 0
- route build errors: 0
- point/segment alignment errors: 0

## progressive weather
- V1.5.16 / V1.5.17 `async function analyze()` SHA-256:
  `912a8d45102e543d98afa1c4826e09499f36b4ca1f8150b448b85ff737898f9a`
- byte-identical: PASS

## 表示確認
- 実ブラウザでの視覚操作テストは未実施。
- DOM順序と文言、構文、CT回帰は静的・実行監査済み。
