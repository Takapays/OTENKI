from pathlib import Path
s=Path('server.py').read_text(encoding='utf-8')
a=Path('app.js').read_text(encoding='utf-8')
i=Path('index.html').read_text(encoding='utf-8')
y=Path('.github/workflows/instagram-auto-post.yml').read_text(encoding='utf-8')

assert 'APP_VERSION = "1.6.105"' in s
assert "const APP_VERSION = '1.6.105';" in a
assert 'V1.6.105' in i and 'app.js?v=1.6.105' in i

# National refresh no longer synchronously publishes Instagram.
assert 'report["instagram"] = {"ok":True,"skipped":True,"reason":"separate-scheduler-v105"}' in s
assert 'report["instagram"] = _instagram_maybe_post_after_refresh()' not in s

# Carousel preview is asynchronous and page-count is dynamic.
assert '/api/instagram/carousel-preview-status' in s
assert '_instagram_carousel_preview_background' in s
assert 'pages = len(urls) or len(paths or [])' in s
assert 'urls.length!==10' not in s
assert '10枚のカルーセルURL' not in s
assert 'カルーセルをプレビュー' in s

# Dedicated auto posting route and schedule.
assert '/api/instagram/auto-post-start' in s
assert '/api/instagram/auto-post-status' in s
assert '_instagram_auto_post_background' in s
assert "cron: '10 3 * * *'" in y
assert 'NATIONAL_CACHE_REFRESH_TOKEN' in y
assert 'timeout-minutes: 30' in y

# Existing forecast engine and wind-C threshold remain unchanged.
assert 'metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7' in s
assert 'NATIONAL_DAILY_WIND_C_MS = 7.0' in s
print('V1.6.105 Instagram regression: PASS')
