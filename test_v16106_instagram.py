from pathlib import Path
s=Path('server.py').read_text(encoding='utf-8')
a=Path('app.js').read_text(encoding='utf-8')
i=Path('index.html').read_text(encoding='utf-8')
y=Path('.github/workflows/instagram-auto-post.yml').read_text(encoding='utf-8')

assert 'APP_VERSION = "1.6.106"' in s
assert "const APP_VERSION = '1.6.106';" in a
assert 'V1.6.106' in i and 'app.js?v=1.6.106' in i

# National refresh remains decoupled from Instagram publishing.
assert 'separate-scheduler-v106' in s
assert 'report["instagram"] = _instagram_maybe_post_after_refresh()' not in s

# V106 cache policy: first day fresh, future pages may use saved rows still within stale TTL.
assert 'def _instagram_load_saved_100_results' in s
assert 'include_stale=True' in s
assert 'require_fresh = i == 0' in s
assert 'available = set(fresh) if require_fresh else (set(fresh) | set(stale))' in s
assert 'carouselCachePolicy"] = "day1-fresh-days2-7-saved-within-stale-ttl"' in s

# Provider refill is chunk-progress aware rather than appearing frozen at 1/7 days.
assert 'progress_callback=None' in s
assert '"dueTotal": len(due)' in s
assert 'mountainsCompleted' in s and 'mountainsTotal' in s
assert '25/100' not in s  # UI is data-driven, not hard-coded to one chunk.
assert '保存済みデータ確認' in s
assert '明日分を最新化' in s

# Auto-post uses the prepared week directly so publishing does not re-demand seven fresh days.
assert 'load_carousel_results=_instagram_carousel_result_loader(date_text, week)' in s
assert 'result = _instagram_post_with_lock(' in s
assert 'result = _instagram_maybe_post_after_refresh()' not in s[s.index('def _instagram_auto_post_background'):s.index('def _instagram_scheduler_authorized')]

# Carousel preview remains asynchronous and page-count dynamic.
assert '/api/instagram/carousel-preview-status' in s
assert '_instagram_carousel_preview_background' in s
assert 'pages = len(urls) or len(paths or [])' in s
assert 'urls.length!==10' not in s

# Dedicated schedule remains 12:10 JST.
assert '/api/instagram/auto-post-start' in s
assert '/api/instagram/auto-post-status' in s
assert "cron: '10 3 * * *'" in y
assert 'NATIONAL_CACHE_REFRESH_TOKEN' in y

# Existing forecast engine and wind-C threshold remain unchanged.
assert 'metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7' in s
assert 'NATIONAL_DAILY_WIND_C_MS = 7.0' in s
print('V1.6.106 Instagram cache-policy regression: PASS')
