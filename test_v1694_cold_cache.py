from pathlib import Path
import ast, math, time
from typing import Any

src=Path('server.py').read_text()
tree=ast.parse(src)
needed={'_national_fetch_shared'}
node=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='_national_fetch_shared')
class Logger:
    def warning(self,*a,**k): pass
    def info(self,*a,**k): pass
ns={
    'Any':Any,'time':time,'app':type('App',(),{'logger':Logger()})(),
    '_national_with_resolved_elevation':lambda p:dict(p),
    '_national_point_cache_get':lambda date,p:None,
    '_national_metno_results':lambda date,pts:({}, {'requested':len(pts),'ok':0,'http_429':0,'http_403':0,'http_5xx':0,'timeout':0,'other':0}),
    '_national_gfs_results':lambda date,pts,include_series=False:{},
    '_openmeteo_jma_production_results':lambda date,pts:{},
    '_national_gefs_ridge_results':lambda date,pts,include_series=False:{},
    '_national_ridge_series_usable':lambda s:False,
    '_national_meteoblue_candidate':lambda m,g:False,
    '_national_meteoblue_results':lambda date,pts:{},
    '_national_merge_two_models':lambda p,m,g,mb=None:None,
    '_national_apply_ridge_continuity':lambda result,p,g,j,ge:result,
    '_national_meta':lambda result,fetched_at=None:{'generated_ts':fetched_at or time.time(),'fresh_until':time.time()+14400},
    '_national_point_cache_put':lambda *a,**k:None,
}
exec(compile(ast.Module(body=[node],type_ignores=[]),'server.py:selected','exec'),ns)
pts=[{'name':'ColdPeak','lat':36.0,'lon':138.0,'elevation':2000}]
rows,complete,limited,warning=ns['_national_fetch_shared']('2026-09-26',pts)
assert rows==[]
assert complete is False
assert limited is False
assert warning and 'Missing 1/1 mountains' in warning
assert 'cache_policy_ok = bool(cached) and (' in src
print('V1.6.94 cold-cache regression: PASS')
