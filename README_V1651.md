# Traten V1.6.51

Base: V1.6.50

## Fix
Instagram carousel preview now fills only missing fresh Hyakumeizan cache dates on demand before rendering.
This fixes the case where a preview starts on today while the normal rolling cache intentionally warms tomorrow onward.

## Freshness policy
- Fresh-cache requirement is unchanged.
- No stale rows are used as a fallback.
- Instagram posting/static signed endpoints are unchanged.
- Reel code and V1.6.50 carousel visual rendering are unchanged.

## Changed production file
- server.py
