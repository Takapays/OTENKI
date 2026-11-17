# Traten V1.6.112

Instagram scheduled publishing is now stateless. GitHub Actions prepares each of the seven carousel days through token-protected endpoints backed by Supabase, then calls the publish endpoint directly. No Render background thread or per-worker in-memory job status is required. Manual publishing and forecast logic are unchanged.
