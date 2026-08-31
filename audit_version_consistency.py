#!/usr/bin/env python3
from pathlib import Path
import re, sys
root = Path(__file__).resolve().parent
app = (root/'app.js').read_text(encoding='utf-8')
server = (root/'server.py').read_text(encoding='utf-8')
index = (root/'index.html').read_text(encoding='utf-8')

def one(pattern, text, label):
    m = re.search(pattern, text)
    if not m:
        print(f'FAIL: {label} not found')
        sys.exit(1)
    return m.group(1)

app_v = one(r"const APP_VERSION\s*=\s*'([^']+)'", app, 'app.js APP_VERSION')
server_v = one(r'APP_VERSION\s*=\s*"([^"]+)"', server, 'server.py APP_VERSION')
visible = re.findall(r'>V(\d+\.\d+\.\d+)<', index)
query_versions = re.findall(r'(?:styles\.css|ui-v1\.4\.254\.css|app\.js)\?v=(\d+\.\d+\.\d+)', index)
errors=[]
if app_v != server_v:
    errors.append(f'app.js={app_v} server.py={server_v}')
if not visible:
    errors.append('index.html visible version not found')
elif any(v != app_v for v in visible):
    errors.append(f'index visible versions={visible}, expected={app_v}')
if len(query_versions) < 3:
    errors.append(f'expected >=3 cache-buster versions, found {query_versions}')
elif any(v != app_v for v in query_versions):
    errors.append(f'cache-buster versions={query_versions}, expected={app_v}')
# Catch stale semantic version references in version-bearing positions only.
for stale in ('1.5.52','1.5.53','1.5.54','1.5.55','1.5.56','1.5.57'):
    if f'>V{stale}<' in index or f'?v={stale}' in index:
        errors.append(f'stale index version marker remains: {stale}')
if errors:
    print('VERSION CONSISTENCY AUDIT: FAIL')
    for e in errors: print(' -', e)
    sys.exit(1)
print('VERSION CONSISTENCY AUDIT: PASS')
print(' app.js:', app_v)
print(' server.py:', server_v)
print(' index visible:', ', '.join(visible))
print(' cache busters:', ', '.join(query_versions))
