# Traten V1.6.99

V1.6.99 fixes the nationwide-grade/detail mismatch where a mountain could show A on the nationwide map and change to D only after the mountain was tapped.

## What changed
- The nationwide shared-cache snapshot remains authoritative while viewing a mountain detail.
- Opening a detail is now read-only for the nationwide A-E grade; it no longer refreshes and writes back only the tapped mountain.
- Cache-only first paint now reconciles all ridge evidence already saved in the row: JMA MSM, deterministic NOAA GFS upper-air, and NOAA GEFS fallback. The previous read path reconciled only JMA.
- Reconciliation is safety-side only; it can worsen an inconsistent saved row but does not improve a saved grade without a normal nationwide refresh.
- Existing cache age / average age / oldest age / TTL 240 min display remains unchanged.

## Why
A detail request fetches provider data at tap time, while the nationwide map represents a shared cached generation. Letting the detail overwrite only one mountain mixes two forecast generations on the same map. V1.6.99 keeps one snapshot consistent and reserves grade updates for the nationwide refresh path.

No ABCDE thresholds, ridge-wind formulas, cache TTL, or route-weather logic were changed.
