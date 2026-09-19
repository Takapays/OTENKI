# V1.6.76

Route-level weather severity now accounts for where the hazard occurs.

- Peak / pass / ridge: full weight in route-level judgment.
- High huts / camps (>=2200m): almost full weight.
- Lower huts / camps: isolated E is capped at D for the route-level judgment.
- Trailhead / exit: isolated E is capped at D; isolated D is capped at C for the route-level judgment.
- Compound severe hazards at trailheads or lower huts can still retain E/D.
- Point cards keep their original A-E grade. Only the overall itinerary grade is location-aware.
- Applies to the point grade as a whole, so wind, rain, thunder, temperature/hypothermia and visibility are treated consistently.
- Existing per-point weather thresholds are unchanged.
