# V1.6.107 deployment

1. Overlay the extracted ZIP contents onto the GitHub repository and push `main`.
2. Confirm `/api/health` reports version `1.6.107` and `national_cache_active_backend: supabase-primary`.
3. Open `/instagram-admin`, press carousel preview for tomorrow.
   - If saved rows exist, preview should advance immediately.
   - If the nationwide refresh owns tomorrow's date lock, the mountain counter should follow persisted checkpoints instead of returning `cache is incomplete` immediately.
4. GitHub Actions `Instagram auto post` remains scheduled at 12:10 JST and can also be run manually.
5. Keep `NATIONAL_CACHE_REFRESH_TOKEN` identical in Render and GitHub Actions secrets.
