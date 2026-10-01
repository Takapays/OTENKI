from pathlib import Path

idx = Path('index.html').read_text(encoding='utf-8')
app = Path('app.js').read_text(encoding='utf-8')
server = Path('server.py').read_text(encoding='utf-8')

assert "const APP_VERSION = '1.6.98';" in app
assert 'APP_VERSION = "1.6.98"' in server
assert 'app.js?v=1.6.98' in idx
assert idx.count('data-app-version>V1.6.98</span>') == 2
assert '最新情報取り込み' in idx
assert '登山口' in idx and '山小屋' in idx and '水場' in idx and 'ライブカメラ' in idx
assert 'national-tap-guide' not in idx
assert '山をタップすると、判定理由・判定基準・MET Norway / NOAA GFS / JMA MSM の時間帯別モデル差を確認できます。' not in idx
for token in ('averageAgeSeconds', 'oldestAgeSeconds', 'キャッシュ鮮度', 'TTL 240分'):
    assert token in app or token in idx
print('V1.6.98 UI layout regression checks: PASS')
