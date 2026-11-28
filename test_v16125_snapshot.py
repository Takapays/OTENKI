"""Offline regression tests for the national snapshot and missing MET temperature."""
import ast, math, subprocess
from pathlib import Path
from typing import Any
src=Path('server.py').read_text()
ns={'Any':Any,'math':math,'NATIONAL_DAILY_RAIN_C_MM_H':.5,'NATIONAL_DAILY_WIND_C_MS':7.0,'NATIONAL_MOUNTAIN_ELEVATION_OVERRIDES':{}}
names={'_finite','_national_grade','_national_grade_rank','_national_bc_caution_hours','_national_merge_two_models','_national_ridge_series_usable','_national_jma_daily_from_series','_national_ridge_wind_only_daily','_national_reconcile_cached_row','_national_ridge_consensus_grade','_national_daily_compound_policy','_national_apply_ridge_continuity','_national_resolve_point_elevation'}
exec(compile(ast.Module(body=[n for n in ast.parse(src).body if isinstance(n,ast.FunctionDef) and n.name in names or isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='_RIDGE_DISAGREEMENT_SUMMARY' for t in n.targets)],type_ignores=[]),'<policy>','exec'),ns)
p={'name':'test','elevation':2592}; merge=ns['_national_merge_two_models']; apply=ns['_national_apply_ridge_continuity']; read=ns['_national_reconcile_cached_row']
def gfs(t,adjusted=True,ridge=16,rain=0):
    ss=[dict(hour=h,wind=2,gust=2,rain=rain,temp=t,tempAltitudeAdjusted=adjusted,ridgeWind=ridge,estimatedRidgeGust=ridge*1.5) for h in range(6,16)]
    return dict(grade='C',maxWind=2,maxGust=2,maxRain=rain,minTemp=t,series=ss,_series=ss)
def met(t):
    ss=[dict(hour=h,wind=2,gust=2,rain=0,temp=t) for h in range(6,16)]
    return dict(grade='A',maxWind=2,maxGust=2,maxRain=0,minTemp=t,series=ss)
for m,g,want in [(None,gfs(0),'D'),(None,gfs(-12),'E'),(None,gfs(0,False),'E'),(met(-12),gfs(0),'E'),(met(0),gfs(-12),'D'),(None,gfs(0,ridge=25),'E'),(None,gfs(0,rain=2),'E')]:
    row=apply(merge(p,m,g),p,g,None)
    assert row['grade']==want,(row['grade'],want,row['summary'])
    assert read(row)==row and read(read(row))==row
    public={k:v for k,v in row.items() if not k.startswith('_')}
    assert read(public)==public
# Cached JMA series reconstructed in detail has no shadowGrade: must still produce D.
g=gfs(0,ridge=10); j={'series':g['series']}; base=merge(p,met(0),g)
a=apply(base,p,None,j); assert a['grade']=='D',a
# Do not reinterpret authoritative finalized 122/125 rows, even if saved inputs are compact.
for policy in ('daily-compound-v16122','daily-compound-v16125'):
    r={'grade':'D','preRidgeGrade':'E','decisionPolicy':policy,'name':'test'}
    assert read(r)==r
assert read({'grade':'E','name':'legacy'})['grade']=='E'
legacy=read({'grade':'E','name':'legacy'}); assert read(legacy)==legacy
# Front end: saved model data, missing data, grade A-E preserved and no implicit refresh on tap.
a=Path('app.js').read_text()
js=a[a.index('function nationalGradeRank'):a.index('function nationalHourlyGradeHtml')]+a[a.index('function nationalSavedDetailData'):a.index('function renderNationalSavedDetail')]
js+='''\nconst assert=require('node:assert/strict');
const saved=nationalSavedDetailData({grade:'D',series:[{hour:6,wind:null,gust:null,rain:null}],gfsRidgeValues:{series:[{hour:6,ridgeWind:null,rain:null}]},gefsRidgeValues:{series:[{hour:6,ridgeWind:16}]}});
assert.equal(saved.savedSnapshot,true);assert.equal(saved.models.metno,null);
assert.equal(nationalHourlyDecisionRows([{model:'gfs',series:saved.models.gfs.series},{model:'gefs',series:saved.models.gefs.series}],saved.merged.series)[0].grade,'E');
assert.equal(nationalHourlyDecisionRows([],saved.merged.series)[0].grade,'?');
assert.equal(nationalElementGrade(null,5,7,9,15),'?');
'''
subprocess.run(['node','-e',js],check=True)
assert 'if(result)renderNationalSavedDetail' in a and 'if(result)void hydrateNationalModelDetail' not in a
assert 'data-national-live-refresh' in a and 'const reconciled=j?.reconciled' in a
assert '1.6.125' in Path('index.html').read_text()
print('PASS: finalized cache parity, seven temperature/extreme/compound cases, JMA reconstruction, legacy E safety, null/GEFS hourly, cache-first UI')
