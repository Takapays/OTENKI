from pathlib import Path
s=Path('server.py').read_text(encoding='utf-8')
w=Path('.github/workflows/instagram-auto-post.yml').read_text(encoding='utf-8')
assert 'APP_VERSION = "1.6.115"' in s
assert '@app.post("/api/instagram/auto-post-prepare-day")' in s
assert '@app.post("/api/instagram/auto-post-publish")' in s
assert '_instagram_fill_100_results_for_use(date_text, require_fresh=require_fresh)' in s
assert '_instagram_load_week_100_results(date_text)' in s
assert '_instagram_post_with_lock(' in s
assert '/api/instagram/auto-post-prepare-day' in w
assert '/api/instagram/auto-post-publish' in w
assert 'for OFFSET in 0 1 2 3 4 5 6' in w
assert 'auto-post-start' not in w and 'auto-post-status' not in w
assert 'timeout-minutes: 60' in w
print('V1.6.115 stateless Instagram scheduler audit: PASS')
