from pathlib import Path
s=Path('server.py').read_text(encoding='utf-8')
a=Path('app.js').read_text(encoding='utf-8')
i=Path('index.html').read_text(encoding='utf-8')
y=Path('.github/workflows/instagram-auto-post.yml').read_text(encoding='utf-8')
assert 'APP_VERSION = "1.6.107"' in s
assert "const APP_VERSION = '1.6.107';" in a
assert 'V1.6.107' in i and 'app.js?v=1.6.107' in i
assert 'separate-scheduler-v107' in s
assert 'report["instagram"] = _instagram_maybe_post_after_refresh()' not in s
assert 'def _instagram_load_best_100_results' in s
assert 'prefer fresh rows, but a complete still-valid saved set' in s
assert '"phase":"waiting-lock"' in s
assert 'wait_deadline = time.monotonic() + 900.0' in s
assert 'time.sleep(2.0)' in s
assert '"phase":"saved-fallback"' in s
assert 'availableCount' in s
assert 'day1-fresh-first-saved-fallback-days2-7-saved-within-stale-ttl' in s
assert 'week[d] = _instagram_load_best_100_results(d, prefer_fresh=True) if i == 0 else _instagram_load_saved_100_results(d)' in s
assert 'load_carousel_results=_instagram_carousel_result_loader(date_text, week)' in s
assert "cron: '10 3 * * *'" in y
assert 'timeout-minutes: 30' in y
assert 'metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7' in s
assert 'NATIONAL_DAILY_WIND_C_MS = 7.0' in s
print('V1.6.107 Instagram lock/fallback regression: PASS')
