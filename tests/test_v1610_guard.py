from pathlib import Path
import ast
import re

ROOT = Path(__file__).resolve().parents[1]
app = (ROOT/'app.js').read_text(encoding='utf-8')
server = (ROOT/'server.py').read_text(encoding='utf-8')
index = (ROOT/'index.html').read_text(encoding='utf-8')
audit = (ROOT/'data-audit.html').read_text(encoding='utf-8')

checks = []
def check(name, cond):
    checks.append((name, bool(cond)))
    if not cond:
        raise AssertionError(name)

check('app version', "const APP_VERSION = '1.6.10';" in app)
check('server version', 'APP_VERSION = "1.6.10"' in server)
check('index visible version', index.count('data-app-version>V1.6.10') == 2)
check('index assets 1.6.10', 'app.js?v=1.6.10' in index and 'styles.css?v=1.6.10' in index)
check('audit assets 1.6.10', 'app.js?v=1.6.10' in audit and 'app.js?v=1.6.9' not in audit)
check('sparse threshold runtime <=2', 'if(resolvedPts.length<=2)' in app)
check('sparse threshold metadata 2', 'thresholds:{sparseWaypointMax:2}' in app)
check('sparse threshold html 2', '固定ポイントが2地点以下' in audit and '固定ポイントが3地点以下' not in audit)
check('readback retries configured', 'NATIONAL_SUPABASE_VERIFY_RETRIES' in server and 'NATIONAL_SUPABASE_VERIFY_DELAY' in server)
check('strict readback helper wired', '_national_confirm_supabase_write(date_text,batch,valid)' in server)
check('fatal readback policy retained', '"database read-back incomplete"' in server and 'fatal_tokens' in server)

idx = re.findall(r'<script\s+src="([^"]+)"(?:\s+defer)?></script>', index)
aud = re.findall(r'<script\s+src="([^"]+)"[^>]*></script>', audit)
check('runtime script stack unchanged in shape', len(idx) == 39 and len(aud) == 39)
check('audit runtime stack equals index', aud == idx)

# Execute only the new helper with stubs: first read is stale, second read confirms.
tree = ast.parse(server)
fn = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == '_national_confirm_supabase_write')
mod = ast.Module(body=[fn], type_ignores=[])
ast.fix_missing_locations(mod)
class FakeTime:
    def __init__(self): self.sleeps=[]
    def sleep(self, n): self.sleeps.append(n)
fake_time = FakeTime()
meta = {'generated_ts':1000.0,'fresh_until':9999999999.0,'stale_until':9999999999.0}
expected_row = {'name':'A','grade':'A','value':1,'_cache_meta':meta}
stale_row = {'name':'A','grade':'A','value':0,'_cache_meta':{'generated_ts':999.0,'fresh_until':9999999999.0,'stale_until':9999999999.0}}
state={'n':0}
def fake_read(date_text, points):
    state['n'] += 1
    return ({'A': stale_row} if state['n']==1 else {'A': expected_row}), {}, {}
def valid_results(points, results):
    return {r['name']:r for r in results}
def public(row):
    return {k:v for k,v in row.items() if not k.startswith('_cache_')}
ns={'NATIONAL_SUPABASE_VERIFY_RETRIES':3,'NATIONAL_SUPABASE_VERIFY_DELAY':0.01,'time':fake_time,
    '_national_supabase_read':fake_read,'_national_valid_results':valid_results,'_national_public_result':public}
exec(compile(mod,'<helper>','exec'),ns)
confirmed, attempts, err = ns['_national_confirm_supabase_write']('2026-09-10',[{'name':'A'}],{'A':expected_row})
check('readback retry recovers delayed visibility', confirmed == {'A'} and attempts == 2 and err is None and state['n'] == 2)

# Persistent mismatch must still fail after the bounded retry count.
state2={'n':0}
def always_stale(date_text, points):
    state2['n'] += 1
    return {'A': stale_row}, {}, {}
ns2=dict(ns); ns2['_national_supabase_read']=always_stale; ns2['time']=FakeTime()
exec(compile(mod,'<helper>','exec'),ns2)
confirmed2, attempts2, err2 = ns2['_national_confirm_supabase_write']('2026-09-10',[{'name':'A'}],{'A':expected_row})
check('readback mismatch remains fatal', confirmed2 == set() and attempts2 == 4 and bool(err2) and state2['n'] == 4)

print(f'OK: {len(checks)} checks')
