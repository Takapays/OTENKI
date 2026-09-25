from pathlib import Path
import ast, math
from typing import Any
from datetime import datetime, timezone, timedelta

src=Path('server.py').read_text()
tree=ast.parse(src)
wanted={
    '_finite','_national_grade_rank','_national_resolve_point_elevation',
    '_national_ridge_wind_estimate','_national_gfs_pressure_ridge_estimate',
    '_national_gefs_pressure_ridge_estimate','_national_gefs_interpolate_series',
    '_national_ridge_series_usable','_national_bc_caution_hours','_national_grade',
    '_national_jma_daily_from_series','_national_ridge_wind_only_daily',
    '_national_apply_ridge_continuity','_noaa_gefs_filter_url_region'
}
nodes=[n for n in tree.body if isinstance(n,(ast.FunctionDef,ast.AsyncFunctionDef)) and n.name in wanted]
ns={
    'math':math,'Any':Any,'NATIONAL_DAILY_RAIN_C_MM_H':0.5,
    'NATIONAL_MOUNTAIN_ELEVATION_OVERRIDES':{},
    'NOAA_GEFS_FILTER':'https://nomads.ncep.noaa.gov/cgi-bin/filter_gefs_atmos_0p50a.pl',
    'urllib':__import__('urllib'),'datetime':datetime,'timezone':timezone,'timedelta':timedelta,
}
# urllib.parse is not loaded by plain __import__('urllib') in every runtime.
import urllib.parse
ns['urllib'].parse=urllib.parse
exec(compile(ast.Module(body=nodes,type_ignores=[]),'server.py:selected','exec'),ns)

p={'name':'TestPeak','lat':36.0,'lon':138.0,'elevation':2300}
ge=ns['_national_gefs_pressure_ridge_estimate']
interp=ns['_national_gefs_interpolate_series']
apply=ns['_national_apply_ridge_continuity']

# 1) GEFS actual HGT at 850/700 brackets a 2300m summit.
ridge,meta=ge(p,{'wind':3.0,'wind850':6.0,'hgt850':1500.0,'wind700':12.0,'hgt700':3000.0})
assert ridge is not None and 8.5 < ridge < 10.5,(ridge,meta)
assert meta['status']=='ok' and meta['method']=='gefs-height-interpolation',meta

# 2) High summit can use real 500-hPa wind with nominal 500-hPa height only as degraded fallback.
high={'name':'High','lat':35.3,'lon':138.7,'elevation':3776}
ridge,meta=ge(high,{'wind':4.0,'wind700':10.0,'hgt700':3000.0,'wind500':20.0})
assert ridge is not None and meta['status']=='degraded',(ridge,meta)
assert '500~' in meta['levels'],meta

# 3) GEFS surface wind alone must never become ridge evidence.
ridge,meta=ge(p,{'wind':4.0})
assert ridge is None and meta['status']=='unavailable',(ridge,meta)

# 4) Native 3-hour GEFS mean anchors expand to the 06-15 hourly decision grid.
samples=[]
for h,w in [(6,4.0),(9,7.0),(12,10.0),(15,7.0)]:
    samples.append({'hour':h,'wind':3.0,'ridgeWind':w,'estimatedRidgeGust':w*1.5,'ridgeMethod':'gefs-height-interpolation'})
series=interp(samples)
assert [x['hour'] for x in series]==list(range(6,16)),series
assert abs(next(x for x in series if x['hour']==8)['ridgeWind']-6.0)<1e-9
assert next(x for x in series if x['hour']==9)['nativeSample'] is True
assert next(x for x in series if x['hour']==8)['nativeSample'] is False

# 5) URL uses official GEFS ensemble-mean file and only required upper-air fields.
url=ns['_noaa_gefs_filter_url_region'](datetime(2026,9,24,0,tzinfo=timezone.utc),120,[p])
for token in ('filter_gefs_atmos_0p50a.pl','geavg.t00z.pgrb2a.0p50.f120','lev_925_mb=on','lev_850_mb=on','lev_700_mb=on','lev_500_mb=on','var_UGRD=on','var_VGRD=on','var_HGT=on','pgrb2ap5'):
    assert token in url,token

def base(grade='A'):
    return {'name':'TestPeak','grade':grade,'summary':'base','source':'metno+gfs-element-policy','safetyFloorVersion':'v1677-evidence-v1'}

def gefs_for(speed):
    ss=[{'hour':h,'wind':3.0,'ridgeWind':speed,'estimatedRidgeGust':speed*1.5,'ridgeMethod':'gefs-time-interpolation'} for h in range(6,16)]
    daily=ns['_national_ridge_wind_only_daily'](ss)
    return {'series':ss,'ridgeGrade':daily['shadowGrade'],'modelRun':'2026-09-24T00:00:00Z','ridgeQuality':'ensemble-mean','temporalInterpolation':True}

# 6) Calm GEFS alone does not certify A: keep lower-confidence B cap.
r=apply(base('A'),p,None,None,gefs_for(3.0))
assert r['grade']=='B' and r['ridgeDecisionStatus']=='gefs-ensemble-mean' and r['ridgeConfidenceCapApplied'],r
assert r['ridgeEvidenceAvailable'] and not r['ridgePrimaryEvidenceAvailable'],r

# 7) Strong GEFS fallback may worsen the grade safety-side.
r=apply(base('A'),p,None,None,gefs_for(10.0))
assert r['grade'] in {'D','E'} and r['gefsRidgeWorstOfApplied'],r
assert r['ridgeDecisionStatus']=='gefs-ensemble-mean' and not r['ridgeConfidenceCapApplied'],r

# 8) Existing C is never made safer by a calm GEFS fallback.
r=apply(base('C'),p,None,None,gefs_for(3.0))
assert r['grade']=='C' and not r['ridgeConfidenceCapApplied'],r

# 9) Primary deterministic GFS still wins source priority and avoids GEFS-only status.
gfs_series=[{'hour':h,'wind':3.0,'ridgeWind':6.0,'estimatedRidgeGust':9.0,'rain':0.0,'temp':5.0} for h in range(6,16)]
gfs={'series':gfs_series,'ridgeGrade':'B','cycleFallback':False,'ridgeQuality':'height-interpolated','pressureLevels':[850,700]}
r=apply(base('A'),p,gfs,None,gefs_for(12.0))
# GEFS can still be safety-side if explicitly passed, but runtime only fetches it when primary is absent.
assert r['ridgeDecisionStatus']=='gfs-pressure',r
assert r['grade'] in {'D','E'},r

# 10) Cache identity/version changed and runtime requests GEFS only after primary-ridge checks.
for token in ('metno-gfs-jma-ridge-gust-worstof-v18-gefs-fallback','v1692-ridge-continuity-v2','gefs_points=[]','not _national_ridge_series_usable(jseries) and not _national_ridge_series_usable(gseries)'):
    assert token in src,token

print('V1.6.92 GEFS fallback tests: PASS')
