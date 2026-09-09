from pathlib import Path
import ast, re
base=Path('/mnt/data/base_v1630')
cand=Path('/mnt/data/work_v1631')
bs=(base/'server.py').read_text(); cs=(cand/'server.py').read_text()
assert 'APP_VERSION = "1.6.31"' in cs
for token in ['openmeteo_request','_audit_openmeteo_request','/api/admin/open-meteo-usage','counted_requests_last_24h','source="proxy"','source="diagnostic"']:
    assert token in cs, token
# Existing server funcs preserved.
def funcs(text):
    t=ast.parse(text)
    return {n.name for n in ast.walk(t) if isinstance(n,(ast.FunctionDef,ast.AsyncFunctionDef))}
removed=funcs(bs)-funcs(cs)
assert not removed, removed
# Existing app top-level function names preserved (version-only expected).
def jsfuncs(text):
    return set(re.findall(r'^function\s+([A-Za-z_$][\w$]*)\s*\(', text, re.M))
ba=(base/'app.js').read_text(); ca=(cand/'app.js').read_text()
assert not (jsfuncs(ba)-jsfuncs(ca))
# Frontend logic is version-only.
assert ba.replace('1.6.30','VERSION') == ca.replace('1.6.31','VERSION')
print('PASS V1.6.31 guard')
