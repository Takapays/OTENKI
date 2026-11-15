from pathlib import Path
import ast
from types import SimpleNamespace
from typing import Any
src=Path('server.py').read_text(encoding='utf-8')
mod=ast.parse(src)
node=next(n for n in mod.body if isinstance(n,ast.FunctionDef) and n.name=='_instagram_fill_100_results_for_use')
code=compile(ast.Module(body=[node],type_ignores=[]),'<helper>','exec')

class FakeTime:
    def __init__(self): self.t=0.0
    def monotonic(self): self.t += 1.0; return self.t
    def sleep(self,_): self.t += 1.0

def rows(n): return [{'name':f'M{i}'} for i in range(n)]

# Case 1: tomorrow fresh is empty but a still-valid saved set is complete -> immediate fallback.
ns={'Any':Any,'instagram_bot':SimpleNamespace(INSTAGRAM_MIN_NATIONAL_RESULTS=80),
    '_instagram_load_fresh_100_results_partial':lambda d:[],
    '_instagram_load_saved_100_results':lambda d:rows(100),
    '_national_load_100_points':lambda: (_ for _ in ()).throw(AssertionError('provider fill should not start')),
    'time':FakeTime()}
exec(code,ns)
out=ns['_instagram_fill_100_results_for_use']('2026-11-16',require_fresh=True)
assert len(out)==100

# Case 2: another national refresh owns the date lock. Follow Supabase checkpoints until enough rows arrive.
calls={'fresh':0,'lock':0}
def fresh(_):
    calls['fresh']+=1
    return rows(0 if calls['fresh']<3 else (25 if calls['fresh']<5 else 100))
def try_lock(*_):
    calls['lock']+=1
    return False
progress=[]
ns={'Any':Any,'instagram_bot':SimpleNamespace(INSTAGRAM_MIN_NATIONAL_RESULTS=80),
    '_instagram_load_fresh_100_results_partial':fresh,
    '_instagram_load_saved_100_results':lambda d:[],
    '_national_load_100_points':lambda:[{'name':f'M{i}'} for i in range(100)],
    '_national_supabase_enabled':lambda:True,
    'datetime':__import__('datetime').datetime,'timezone':__import__('datetime').timezone,'timedelta':__import__('datetime').timedelta,
    '_national_points_fingerprint':lambda p:'fp','_national_try_lock':try_lock,
    'time':FakeTime()}
exec(code,ns)
out=ns['_instagram_fill_100_results_for_use']('2026-11-16',require_fresh=True,progress_callback=progress.append)
assert len(out)==100
assert any(x.get('phase')=='waiting-lock' for x in progress)
assert max(x.get('availableCount',0) for x in progress)>=25
print('V1.6.109 lock-follow behavior: PASS')
