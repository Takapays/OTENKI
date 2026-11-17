from pathlib import Path
s=Path('server.py').read_text()
assert 'APP_VERSION = "1.6.111"' in s
assert 'def _instagram_graph_compat_call' in s
assert 'def _instagram_direct_account_probe' in s
assert 'graph.instagram.com/' in s and 'graph.facebook.com/' in s
assert 'instagram_bot.post_national,' in s
assert '_instagram_graph_compat_call(' in s
assert 'result = _instagram_direct_account_probe()' in s
assert 'targetInstagramProbe' in s
assert 'transport"] = "direct-facebook-graph"' in s
assert 'instagram_bot.test_connection()' not in s
print('V1.6.111 Instagram Graph compatibility static audit PASS')
