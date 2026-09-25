from pathlib import Path
import ast, math, os, tempfile, threading, time, urllib.request
from datetime import datetime, timezone, timedelta
from typing import Any

src=Path('server.py').read_text()
tree=ast.parse(src)
node=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='_national_gfs_results')
ns={
    'Any':Any,'datetime':datetime,'timezone':timezone,'timedelta':timedelta,'time':time,'tempfile':tempfile,'os':os,'urllib':__import__('urllib'),
    'NOAA_GFS_TIMEOUT':1,'NOAA_GFS_CACHE_TTL':1800,'NATIONAL_OUTLOOK_CACHE_TTL':14400,'NATIONAL_GFS_MIN_INTERVAL':0,
    '_national_gfs_last_request':0.0,'_national_gfs_lock':threading.Lock(),'UA':'test-agent',
    '_national_with_resolved_elevation':lambda p:dict(p),
    '_national_resolve_point_elevation':lambda name,e:e,
    '_finite':lambda v:isinstance(v,(int,float)) and math.isfinite(float(v)),
    '_national_gfs_pressure_ridge_estimate':lambda p,vals:(None,{'status':'unavailable','method':None,'levels':[]}),
    '_national_ridge_series_usable':lambda s:False,
    '_national_jma_daily_from_series':lambda s:None,
    '_national_bc_caution_hours':lambda rows:0,
    '_national_grade':lambda *a,**k:('A','base'),
}
import urllib.parse
ns['urllib'].parse=urllib.parse
exec(compile(ast.Module(body=[node],type_ignores=[]),'server.py:selected','exec'),ns)

point={'name':'TestPeak','lat':36.0,'lon':138.0,'elevation':2300}
now=datetime.now(timezone.utc)
cycle0=now.replace(minute=0,second=0,microsecond=0)-timedelta(hours=6)
cycle0=cycle0.replace(hour=(cycle0.hour//6)*6)
cycle1=cycle0-timedelta(hours=6)
ns['_noaa_cycle_candidates']=lambda _now:[cycle0,cycle1,cycle1-timedelta(hours=6),cycle1-timedelta(hours=12)]
ns['_noaa_forecast_hour']=lambda cycle,dt:int((dt-cycle).total_seconds()//3600)
ns['_noaa_filter_url_region']=lambda cycle,fh,points:f'https://example/combined?lev_925_mb=on&fh={fh}&c={cycle.hour}'
ns['_noaa_filter_url_region_base']=lambda cycle,fh,points:f'https://example/base?fh={fh}&c={cycle.hour}'
ns['_cache_get']=lambda key:None
ns['_cache_put']=lambda *a,**k:None

calls={'combined':0,'base':0}
class Resp:
    def __enter__(self):return self
    def __exit__(self,*a):return False
    def read(self):return b'GRIBbase'
def fake_urlopen(req,timeout=None):
    url=getattr(req,'full_url',str(req))
    if 'combined' in url:
        calls['combined']+=1
        raise TimeoutError('expanded upper-air request timed out')
    calls['base']+=1
    return Resp()
ns['urllib'].request.urlopen=fake_urlopen
ns['_parse_noaa_grib_points']=lambda path,points,**kwargs:{p['name']:{'wind':4.0,'gust':5.0,'rain':0.0,'temp':8.0,'model_elevation':1000.0} for p in points}

# Rebind globals in the selected function to this namespace.
fn=ns['_national_gfs_results']
# exec-created function already resolves this ns dict as globals.
target=(datetime.now(timezone.utc)+timedelta(hours=9,days=4)).date().isoformat()
res=fn(target,[point],include_series=True)
assert 'TestPeak' in res,res
row=res['TestPeak']
assert len(row.get('series') or [])>=4,row
assert row.get('ridgeWindApplied') is False,row
assert 6 <= calls['base'] <= 10,calls
assert calls['combined']>calls['base'],calls
assert 'score=(base_ready,ridge_ready)' in src
assert '_noaa_filter_url_region_base' in src
assert 'base retry skipped (latest base complete)' in src
assert 'metno-gfs-jma-ridge-gust-worstof-v18-gefs-fallback' in src
print('V1.6.93 GFS base-survival test: PASS',calls)
