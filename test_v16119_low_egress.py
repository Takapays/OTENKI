from pathlib import Path
from typing import Any
import ast, math, json, zipfile, os
NAMES={'_finite','_national_grade','_national_grade_rank','_national_bc_caution_hours','_national_merge_two_models','_national_ridge_series_usable','_national_jma_daily_from_series','_national_ridge_wind_only_daily','_national_reconcile_cached_row','_national_ridge_consensus_grade','_national_apply_ridge_continuity','_national_resolve_point_elevation','_national_attach_jma_result'}
def load(s):
    tree=ast.parse(s)
    ns={'Any':Any,'math':math,'NATIONAL_DAILY_RAIN_C_MM_H':.5,'NATIONAL_DAILY_WIND_C_MS':7.0,'NATIONAL_MOUNTAIN_ELEVATION_OVERRIDES':{}}
    exec(compile(ast.Module(body=[n for n in tree.body if (isinstance(n,ast.FunctionDef) and n.name in NAMES) or (isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='_RIDGE_DISAGREEMENT_SUMMARY' for t in n.targets))],type_ignores=[]),'<policy>','exec'),ns)
    return ns
s=Path('server.py').read_text(); ns=load(s)
def series(w,n=10,r=0,start=6,end=16):
    return [dict(hour=h,wind=2,ridgeWind=w if h<6+n else 2,estimatedRidgeGust=1.5*(w if h<6+n else 2),rain=r if h<6+n else 0) for h in range(start,end)]
def make(w,n=10,r=0,start=6,end=16):
    ss=series(w,n,r,start,end); d=ns['_national_jma_daily_from_series'](ss) or {}
    return dict(d,series=ss,ridgeGrade=d.get('shadowGrade'),ridgeWindApplied=True)
p={'name':'test','elevation':2000}
base={'name':'test','grade':'C','summary':'6〜15時に風7m/s以上・突風12m/s以上・0.5mm/h以上の雨の注意条件が合計2時間以上、または強い条件が1時間見込まれます。時間帯別予測を確認してください。'}
# E/E, E/D, D/E, E/C, E/A, missing, extreme, rain, both D, both A.
cases=[(make(16),make(16),'E'),(make(16),make(10),'D'),(make(10),make(16),'D'),(make(16),make(8),'D'),(make(16),make(2),'D'),(make(16),None,'E'),(make(22),make(2),'E'),(make(2,r=8),make(2),'E'),(make(10),make(10),'D'),(make(2),make(2),'C'),(make(16,n=3),make(2,start=9),'E')]
apply=ns['_national_apply_ridge_continuity']; reconcile=ns['_national_reconcile_cached_row']
oldpath=os.environ.get('TRATEN_118_ZIP')
old=None
if oldpath:
    with zipfile.ZipFile(oldpath) as z: old=load(z.read('server.py').decode())
def size(row):return len(json.dumps(row,ensure_ascii=False,separators=(',',':')).encode())
for j,g,want in cases:
    row=apply(base,p,g,j)
    assert row['grade']==want,(j,g,row['grade'],want)
    assert reconcile(row)['grade']==want,(row['grade'],reconcile(row)['grade'])
    if old:
        previous=old['_national_apply_ridge_continuity'](base,p,g,j)
        assert set(row)==set(previous)
        assert size(row)<=size(previous),(size(row),size(previous))
        assert reconcile(previous)['grade']==want
        assert set(reconcile(previous))==set(old['_national_reconcile_cached_row'](previous))
        # All actual time-series fields and cache structure remain identical on write.
        for k in ('jmaValues','gfsRidgeValues','gefsRidgeValues'):
            assert row.get(k)==previous.get(k)
# Base E and fallback E remain E; GEFS not independent corroboration.
assert apply(dict(base,grade='E'),p,make(2),make(16))['grade']=='E'
assert apply(base,p,None,None,make(16))['grade']=='E'
assert apply(base,p,make(2),make(16),make(16))['grade']=='D'
assert apply(dict(base,grade='A'),p,None,None)['grade']=='B'
row=apply(base,p,make(2),make(16)); row.update(grade='E',weatherapiApplied=True)
assert reconcile(row)['grade']=='E'
# No new storage calls, identity or schema; baseline direct grading remains intact.
a=Path('app.js').read_text()
assert 'v20-daily-e' in s and 'v20-daily-e' in a
assert 'surfaceModelSeries' not in s and 'nationalSnapshotVersion' not in s
assert 'const reconciled=j?.reconciled;' in a
print('PASS: 11 ridge consensus cases, 5 safety/fallback checks, cache read parity, same fields & no larger sample JSON writes')
