# RELEASE AUDIT V1.6.76

Base: V1.6.75.

## Intended change
Introduce location-aware aggregation for the itinerary overall grade without changing any per-point forecast or A-E threshold.

## Rules
- peak/pass: no downgrade
- hut/camp >=2200m: no downgrade
- hut/camp <2200m: isolated E -> route D; compound severe hazards keep E
- trailhead: isolated E -> route D; isolated D -> route C; compound severe hazards keep E/D
- other/intermediate points: unchanged

## Preservation
- Per-point A-E remains unchanged.
- Wind/rain/thunder/temperature/visibility thresholds remain unchanged.
- Visibility support logic from V1.6.75 remains unchanged.
- National outlook logic is untouched.
