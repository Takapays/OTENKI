from pathlib import Path
s=Path('server.py').read_text(encoding='utf-8')
assert 'APP_VERSION = "1.6.109"' in s
assert 'def _instagram_normalize_access_token' in s
assert 'def _instagram_sync_access_token' in s
assert '@app.get("/api/instagram/token-diagnostic")' in s
assert 'directGraphProbe' in s
assert 'sha256_12' in s and 'prefix4' in s and 'suffix4' in s
assert '_instagram_sync_access_token()\n        result = instagram_bot.test_connection()' in s
assert '_instagram_sync_access_token()\n    key = _national_open_lock("instagram-publish")' in s
print('V1.6.109 Instagram token diagnostic/sync checks: PASS')
