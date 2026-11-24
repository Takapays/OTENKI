# V1.6.113 release audit

Scope: nationwide scheduled-cache transport/control only.

Changed:
- scheduled due ordering: south -> north by latitude, then longitude/name
- scheduled chunk size 10; foreground chunk size remains 25
- external scheduler gate 900s; in-process interval remains 3600s
- interval gate uses lastRunFinishedAt only
- deterministic GFS / GEFS request timeout bounded by scheduled deadline
- national-cache-refresh GitHub workflow max-time 300, no retry masking

Unchanged:
- national decision engine `metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7`
- wind/rain thresholds
- Supabase schema/cache identity
- Instagram flows
- UI priority order and mountain catalog
