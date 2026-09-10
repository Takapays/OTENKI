from pathlib import Path
root=Path(__file__).resolve().parent
app=(root/'app.js').read_text(encoding='utf-8')
server=(root/'server.py').read_text(encoding='utf-8')
index=(root/'index.html').read_text(encoding='utf-8')
audit=(root/'data-audit.html').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.39';" in app
assert 'APP_VERSION = "1.6.39"' in server
assert 'data-app-version>V1.6.39<' in index
assert 'app.js?v=1.6.39' in index
assert 'app.js?v=1.6.39' in audit
assert 'METEOBLUE_CLIENT_MAX_CONCURRENCY=1' in app
assert 'METEOBLUE_CLIENT_MIN_INTERVAL_MS=1800' in app
assert 'METEOBLUE_MIN_INTERVAL' in server and '"2.0"' in server
assert 'METEOBLUE_429_COOLDOWN' in server and '"60"' in server
assert 'MeteoblueCircuitOpen' in server
assert 'max_workers=1,thread_name_prefix="traten-national-mb"' in server
assert 'if(attempt===0&&r.status>=500)' in app
print('V1.6.39 guard: PASS')
