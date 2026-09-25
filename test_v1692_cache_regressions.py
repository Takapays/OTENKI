from pathlib import Path
server=Path('server.py').read_text()
app=Path('app.js').read_text()
index=Path('index.html').read_text()

assert 'APP_VERSION = "1.6.92"' in server
assert "const APP_VERSION = '1.6.92';" in app
assert 'app.js?v=1.6.92' in index
assert 'metno-gfs-jma-ridge-gust-worstof-v18-gefs-fallback' in server
assert "metno-gfs-jma-ridge-gust-worstof-v18-gefs-fallback" in app
# V1.6.89 cacheOnly provider-free first paint remains before JMA repair/network work.
block=server[server.index('@app.post("/api/national-outlook")'):server.index('@app.post("/api/national-outlook/detail")')]
assert block.index('if payload.get("cacheOnly") is True:') < block.index('_national_repair_snapshot_jma')
# V1.6.90 cache-age display remains in the browser.
assert 'キャッシュ年齢' in app and 'freshRemainingSeconds' in app
# GEFS has a dedicated visible status and is cacheable, not treated as missing.
assert 'gefs-ensemble-mean' in server and 'gefs-ensemble-mean' in app
assert 'ridge_status in {"jma+gfs","jma","gfs-pressure","gfs-pressure-previous-cycle","gefs-ensemble-mean","unavailable"}' in server
print('V1.6.92 cache regressions: PASS')
