# RELEASE AUDIT V1.5.67

## Instagram 全国分析 Bot
- 投稿最低件数を 98 座へ変更。
- 98 座以上: 投稿対象。
- 97 座以下: `incomplete` として拒否。
- 浅間山・草津白根山の未取得を想定した運用。
- 閾値は `INSTAGRAM_MIN_NATIONAL_RESULTS` で変更可能（既定 98）。
- 画像サブタイトルは取得数に矛盾しない表現へ変更。
