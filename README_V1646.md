# Traten V1.6.46

V1.6.45 -> V1.6.46 Instagram 9-image carousel implementation.

- Default Instagram media mode: carousel (9 static images).
- Page 1: approved cover master, official supplied Traten logo, judgment timestamp, swipe prompt.
- Pages 2-8: existing nationwide judgment map renderer reused unchanged. Page 2 says 明日, page 3 says 明後日, pages 4-8 show date only.
- Page 9: approved Traten introduction master, official supplied logo, judgment timestamp.
- Existing Reel generation/preview code is retained. Protected Reel rendering functions are byte-identical to V1.6.45.
- Existing single-image preview endpoint is retained.
- Auto carousel requires fresh Japan 100-mountain results for seven consecutive dates.

If Render already has INSTAGRAM_AUTO_MEDIA explicitly set to reel, change that environment value to carousel. If unset, V1.6.46 defaults to carousel.
