# Deploy V1.6.104

1. Deploy the V1.6.104 files to the normal GitHub / Render / Cloud Run path.
2. Confirm the top page shows `V1.6.104` and the temporary maintenance notice uses 「最新情報を取り込み」ボタン wording.
3. Confirm `/api/health` reports `version` = `1.6.104`.
4. Press 「最新情報取り込み」 for 百名山 and confirm the first progress update is 25/100, with major mountains such as 槍ヶ岳・富士山・大雪山・石鎚山 included.
5. Confirm the map updates again at 50/100 and 75/100 rather than waiting for 100/100.
6. Render logs should show `national_base_parallel` timing lines for each 25-mountain batch.
