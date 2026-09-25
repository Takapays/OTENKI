from pathlib import Path
import ast, math
from typing import Any

src=Path('server.py').read_text()
tree=ast.parse(src)
wanted={
    '_finite','_national_grade_rank','_national_resolve_point_elevation',
    '_national_ridge_wind_estimate','_national_gfs_pressure_ridge_estimate',
    '_national_ridge_series_usable','_national_bc_caution_hours','_national_grade',
    '_national_jma_daily_from_series','_national_apply_ridge_continuity'
}
nodes=[n for n in tree.body if isinstance(n,(ast.FunctionDef,ast.AsyncFunctionDef)) and n.name in wanted]
ns={
    'math':math,'Any':Any,'NATIONAL_DAILY_RAIN_C_MM_H':0.5,
    'NATIONAL_MOUNTAIN_ELEVATION_OVERRIDES':{}
}
exec(compile(ast.Module(body=nodes,type_ignores=[]),'server.py:selected','exec'),ns)

gridge=ns['_national_gfs_pressure_ridge_estimate']
apply=ns['_national_apply_ridge_continuity']
p={'name':'TestPeak','lat':36.0,'lon':138.0,'elevation':2300}

# 1) Normal actual-height interpolation.
ridge,meta=gridge(p,{'wind':3.0,'model_elevation':1000.0,'wind850':6.0,'hgt850':1500.0,'wind700':12.0,'hgt700':3000.0})
assert ridge is not None and 8.5 < ridge < 10.5, (ridge,meta)
assert meta['method']=='height-interpolation',meta

# 2) 850 missing: 925/700 still bracket the summit.
ridge,meta=gridge(p,{'wind':3.0,'model_elevation':500.0,'wind925':4.0,'hgt925':800.0,'wind700':12.0,'hgt700':3000.0})
assert ridge is not None and meta['method']=='height-interpolation',(ridge,meta)
assert set(meta['levels'])=={'925','700'},meta

# 3) HGT missing but 850/700 wind exists: established nominal-height fallback, explicitly degraded.
ridge,meta=gridge(p,{'wind':3.0,'wind850':6.0,'wind700':12.0})
assert ridge is not None and meta['status']=='degraded' and meta['method']=='nominal-850-700',(ridge,meta)

# 4) No defensible upper-air evidence: do not invent a ridge value.
ridge,meta=gridge(p,{'wind':3.0,'model_elevation':500.0})
assert ridge is None and meta['status']=='unavailable',(ridge,meta)

# 4b) Same rule for a 1000 m summit: surface wind alone is not ridge evidence.
mid={'name':'Mid','lat':35.0,'lon':136.0,'elevation':1000}
ridge,meta=gridge(mid,{'wind':3.0,'model_elevation':400.0})
assert ridge is None and meta['status']=='unavailable',(ridge,meta)

def base(grade='A'):
    return {'name':'TestPeak','grade':grade,'summary':'base','source':'metno+gfs-element-policy','safetyFloorVersion':'v1677-evidence-v1'}

# 5) All upper-air evidence absent: only A is capped to B.
r=apply(base('A'),p,None,None)
assert r['grade']=='B' and r['ridgeConfidenceCapApplied'] and r['ridgeDecisionStatus']=='unavailable',r
r=apply(base('C'),p,None,None)
assert r['grade']=='C' and not r['ridgeConfidenceCapApplied'],r

# 6) GFS pressure-level ridge can worsen the base grade.
gfs_series=[]
for h in range(6,16):
    rw=10.0 if h in (8,9) else 4.0
    gfs_series.append({'hour':h,'wind':3.0,'ridgeWind':rw,'estimatedRidgeGust':rw*1.5,'rain':0.0,'temp':5.0})
gfs={'series':gfs_series,'_series':gfs_series,'ridgeGrade':'D','cycleFallback':False,'ridgeQuality':'height-interpolated','pressureLevels':[850,700]}
r=apply(base('A'),p,gfs,None)
assert r['grade']=='D' and r['gfsRidgeWorstOfApplied'] and r['ridgeDecisionStatus']=='gfs-pressure',r

# 7) Older GFS cycle use is explicit.
r=apply(base('A'),p,dict(gfs,cycleFallback=True),None)
assert r['ridgeDecisionStatus']=='gfs-pressure-previous-cycle',r

# 8) Sub-500 m points are not penalized for missing upper-air data.
low={'name':'Low','lat':35.0,'lon':135.0,'elevation':400}
r=apply({'name':'Low','grade':'A','summary':'base','source':'metno+gfs-element-policy','safetyFloorVersion':'v1677-evidence-v1'},low,None,None)
assert r['grade']=='A' and r['ridgeDecisionStatus']=='not-required',r

# 9) Source guards: GFS request contains all requested pressure levels and engine changed.
for token in ('lev_925_mb','lev_850_mb','lev_700_mb','lev_600_mb','v17-gfs-pressure-continuity'):
    assert token in src,token

print('V1.6.91 ridge continuity tests: PASS')
