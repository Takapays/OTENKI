from pathlib import Path
import re
root=Path(__file__).resolve().parent
app=(root/'app.js').read_text(encoding='utf-8')
server=(root/'server.py').read_text(encoding='utf-8')
index=(root/'index.html').read_text(encoding='utf-8')
audit=(root/'data-audit.html').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.38';" in app
assert 'APP_VERSION = "1.6.38"' in server
assert 'data-app-version>V1.6.38<' in index
assert 'app.js?v=1.6.38' in index
assert 'app.js?v=1.6.38' in audit
assert 'METEOBLUE_CLIENT_MAX_CONCURRENCY=2' in app
assert 'withMeteoblueClientSlot' in app
assert "r.status===429||r.status>=500" in app
assert 'meteoblue（取得できず）' in app
assert 'colspan="8"' in app
print('V1.6.38 guard: PASS')
