from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
errors = []

def check(name, cond, detail=''):
    if not cond:
        errors.append(f'{name}: {detail}')
    print(('PASS' if cond else 'FAIL'), name, detail)

app = (ROOT/'app.js').read_text(encoding='utf-8')
server = (ROOT/'server.py').read_text(encoding='utf-8')
index = (ROOT/'index.html').read_text(encoding='utf-8')
audit = (ROOT/'data-audit.html').read_text(encoding='utf-8')

check('app version 1.6.9', "const APP_VERSION = '1.6.9';" in app)
check('server version 1.6.9', 'APP_VERSION = "1.6.9"' in server)
check('index visible version 1.6.9', index.count('data-app-version>V1.6.9') == 2, str(index.count('data-app-version>V1.6.9')))
check('no old audit app cache key', 'app.js?v=1.5.14' not in audit)
check('data-audit uses versioned html server', 'response = _serve_public_html("data-audit.html")' in server)
check('data-audit not direct send_from_directory', 'send_from_directory(BASE, "data-audit.html")' not in server)
check('version mismatch is fail-closed', 'バージョン不一致:' in audit and '監査停止（バージョン整合性を確認してください）' in audit)
check('asset load failure is fail-closed', '__tratenAuditAssetErrors' in audit and '監査用JS読込失敗' in audit)
check('reload refetches runtime', "$('reload').addEventListener('click',()=>location.reload())" in audit)

idx = re.findall(r'<script\s+src="([^"]+)"(?:\s+defer)?></script>', index)
aud = re.findall(r'<script\s+src="([^"]+)"[^>]*></script>', audit)
check('index runtime scripts count', len(idx) == 39, str(len(idx)))
check('audit runtime scripts count', len(aud) == 39, str(len(aud)))
check('audit runtime stack exactly equals index', aud == idx, f'index={len(idx)} audit={len(aud)}')
check('all audit runtime assets use 1.6.9 cache key', all('?v=1.6.9' in s for s in aud))
check('runtime stack starts with app.js', bool(aud) and aud[0].startswith('app.js?'))
check('runtime stack includes final recovery layer', bool(aud) and aud[-1].startswith('representative-route-recovery-v162.js?'))

# Ensure all script paths are allowed by the current static-file allowlist.
for src in aud:
    path = src.split('?',1)[0]
    check(f'PUBLIC_FILES allows {path}', repr(path) in server or f"'{path}'" in server or f'"{path}"' in server)

if errors:
    print('\n'.join(errors), file=sys.stderr)
    raise SystemExit(1)
print(f'OK: {14 + len(aud)} checks')
