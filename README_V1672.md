# Traten V1.6.72

Nationwide mountain analysis safety alignment.

- JMA MSM nationwide safety-side comparison now requests 850/700/600 hPa wind in the existing batch call.
- Nationwide JMA grading uses the same summit ridge-wind estimate as route analysis (850/700 hPa interpolation with 0.95 peak exposure, surface wind as floor).
- 600 hPa is retained as diagnostic evidence only; it does not alter the ridge formula.
- JMA ridge wind can only keep or worsen the existing MET Norway + GFS nationwide grade through the existing JMA worst-of policy; it never improves a grade.
- JMA surface wind and pressure-level values are retained in diagnostics for auditability.
- Visibility remains unavailable in this JMA nationwide path and is not fabricated.
- Removed the stale meteoblue wording from the nationwide tap guide.

Cache engine bumped to metno-gfs-jma-ridge-worstof-v13 so old nationwide grades are not reused as V1.6.72 results.
