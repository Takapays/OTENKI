# RELEASE AUDIT V1.5.127

## 3点代表コース
- baseline V1.5.126: 204
- V1.5.127: 201
- reduced: 3
- total representative options: 424

## 対象
- 茶臼岳（那須岳） / 那須ロープウェイ・峠の茶屋側ルート
- 荒島岳 / 中出コースルート
- 六甲山 / 芦屋川 高座の滝ルート

## 実ルート監査
- 茶臼岳: 峰の茶屋跡避難小屋経由を公開モデルで確認
- 荒島岳中出: シャクナゲ平経由を公開モデルで確認
- 六甲山: 高座の滝 -> 風吹岩 -> 雨ヶ峠 -> 一軒茶屋 -> 六甲山の順序と区間CTを既存山と高原地図Webデータで確認

## 回帰
- target route build errors: 0
- target CT missing: 0
- target estimated CT: 0
- node --check app.js: PASS
- python3 -m py_compile server.py: PASS
- APP_VERSION / PC / mobile / cachebuster: 1.5.127

未確認座標・CTの推測追加なし。
