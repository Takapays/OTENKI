# Traten V1.6.60

Base: V1.6.59

## Purpose
Keep the nationwide 100-mountain forecast usable during a temporary Supabase fair-use/API outage without changing the A-E decision logic.

## Changes
- Adds a bounded Supabase circuit breaker for recoverable national-cache failures:
  - HTTP 402
  - HTTP 429
  - HTTP 5xx
  - URL/network errors and timeouts
- During the fallback window, nationwide cache refresh continues in `local-only` mode.
- Existing local disk cache is used when available; missing/stale rows can still be rebuilt from the existing upstream forecast acquisition path and checkpointed locally.
- The circuit breaker retries Supabase automatically after the fallback interval (default 600 seconds). A successful Supabase access clears the degraded state and normal `supabase+local` operation resumes.
- HTTP 401/403 and other non-recoverable configuration/authentication failures are not hidden by the fallback.
- `/api/health` now exposes:
  - `national_supabase_local_fallback_active`
  - `national_supabase_local_fallback_reason`
- Adds a temporary public maintenance notice on both Render and Cloud Run top pages from 2026-09-20 through 2026-09-23 JST. It disappears automatically from 2026-09-24 JST.

## Temporary notice text
`一部機能メンテナンス中　9/23頃まで、全国予報の更新に遅延が生じる場合があります。通常の山天気はご利用いただけます。`

## Intentionally unchanged
- Production A-E weather decision thresholds/logic
- WeatherAPI safety overlay rules
- MET Norway / GFS / meteoblue decision behavior
- Instagram bot implementation and assets
- Render migration notice and Cloud Run destination URL
- Mountain data files

## Limitation
Cloud Run local disk is ephemeral. Local-only fallback is continuity protection, not durable storage. A container restart/redeploy can remove local cache; the existing upstream forecast path remains responsible for rebuilding missing rows.
