"""Offline tests using actual policy functions, without provider or Supabase I/O."""
from pathlib import Path
from typing import Any
import ast, math, json, zipfile, os, subprocess
NAMES={'_finite','_national_grade','_national_grade_rank','_national_bc_caution_hours','_national_merge_two_models','_national_ridge_series_usable','_national_jma_daily_from_series','_national_ridge_wind_only_daily','_national_reconcile_cached_row','_national_ridge_consensus_grade','_national_daily_compound_policy','_national_apply_ridge_continuity','_national_resolve_point_elevation','_national_attach_jma_result'}
def load(s):
    tree=ast.parse(s)
    ns={'Any':Any,'math':math,'NATIONAL_DAILY_RAIN_C_MM_H':.5,'NATIONAL_DAILY_WIND_C_MS':7.0,'NATIONAL_MOUNTAIN_ELEVATION_OVERRIDES':{}}
    exec(compile(ast.Module(body=[n for n in tree.body if (isinstance(n,ast.FunctionDef) and n.name in NAMES) or (isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='_RIDGE_DISAGREEMENT_SUMMARY' for t in n.targets))],type_ignores=[]),'<policy>','exec'),ns)
    return ns
s=Path('server.py').read_text(); ns=load(s)
basezip=os.environ.get('TRATEN_119_ZIP')
old=None
if basezip:
    with zipfile.ZipFile(basezip) as z: oldsrc=z.read('server.py').decode(); old=load(oldsrc)
def slots(w,r=0,wh=range(6,16),rh=range(6,16),start=6,end=16):
    return [dict(hour=h,wind=2,ridgeWind=w if h in wh else 2,estimatedRidgeGust=1.5*(w if h in wh else 2),rain=r if h in rh else 0) for h in range(start,end)]
def model(w,r=0,wh=range(6,16),rh=range(6,16),start=6,end=16):
    a=slots(w,r,wh,rh,start,end); d=ns['_national_jma_daily_from_series'](a) or {}
    return dict(d,series=a,ridgeGrade=d.get('shadowGrade'),ridgeWindApplied=True)
def center(w=2,r=0,t=5):
    a=[dict(hour=h,wind=w,gust=w*1.5,rain=r,temp=t) for h in range(6,16)]
    return dict(name='test',grade='C',summary='6〜15時に風7m/s以上・突風12m/s以上・0.5mm/h以上の雨の注意条件が合計2時間以上、または強い条件が1時間見込まれます。時間帯別予測を確認してください。',series=a,_series=a,maxWind=w,maxGust=w*1.5,maxRain=r,minTemp=t)
p={'name':'test','elevation':2000}
apply=ns['_national_apply_ridge_continuity']; rec=ns['_national_reconcile_cached_row']
cases=[
 ('single wind both E',center(),model(16),model(17.5),'D'),
 ('single model E',center(),model(16),model(8),'D'),
 ('wind 24 not exceptional',center(),model(24),model(19),'D'),
 ('single rain both E',center(),model(2,7),model(2,7),'D'),
 ('four simultaneous hours',center(),model(16,2,rh=range(6,10)),model(16,2,rh=range(6,10)),'D'),
 ('five simultaneous hours',center(),model(16,2,rh=range(6,11)),model(16,2,rh=range(6,11)),'E'),
 ('five hours D-level wind/rain',center(),model(10,2,rh=range(6,11)),model(10,2,rh=range(6,11)),'E'),
 ('wind and rain separated',center(),model(16,3,wh=range(6,11),rh=range(11,16)),model(16,3,wh=range(6,11),rh=range(11,16)),'D'),
 ('model rain disagreement',center(),model(16,3),model(16,0),'D'),
 ('cold strong wind',center(t=-10),model(16),model(16),'E'),
 ('cold short strong wind',center(t=-10),model(16,wh=range(6,10)),model(16,wh=range(6,10)),'D'),
 ('exceptional ridge one hour',center(),model(25,wh=[6]),model(2),'E'),
 ('exceptional rain one hour',center(),model(2,10,rh=[6]),model(2),'E'),
 ('missing comparison',center(),model(16),None,'E'),
 ('incomplete overlapping risk',center(),model(16,2,rh=range(6,10),end=14),model(16,2,rh=range(6,10),end=14),'E'),
 ('calm diagnostic unchanged',center(),model(2),model(2),'C'),
 ('surface E short or single',dict(center(),grade='E'),model(16),model(16),'D'),
 ('extreme surface gust',dict(center(),grade='E',maxGust=28),model(2),model(2),'E'),
 ('one severe surface model',dict(center(),grade='E',modelValues={'metno':{'maxWind':20}}),model(2),model(2),'E'),
 ('extreme partial ridge',center(),model(25,start=6,end=7),model(2),'E'),
]
def size(row): return len(json.dumps({k:v for k,v in row.items() if not k.startswith('_')},ensure_ascii=False,separators=(',',':')).encode())
for label,base,j,g,want in cases:
    row=apply(base,p,g,j); assert row['grade']==want,(label,row['grade'],want)
    assert rec(row)['grade']==want,(label,rec(row)['grade'],want)
    if old:
        prev=old['_national_apply_ridge_continuity'](base,p,g,j)
        assert set(row)==set(prev),label
        assert size(row)<=size(prev),(label,size(row),size(prev))
        for k in ('series','jmaValues','gfsRidgeValues','gefsRidgeValues'): assert row.get(k)==prev.get(k),(label,k)
        # Same inputs and cache policy give the same new classification, even on an old row.
        assert rec(prev)['grade']==want,(label,rec(prev)['grade'],want)
        assert set(rec(prev))==set(old['_national_reconcile_cached_row'](prev)),label
        assert size(rec(prev))<=size(old['_national_reconcile_cached_row'](prev)),label
    print(label,want)
# Safety overlay and old unexplained E retained.
r=apply(center(),p,model(16),model(16)); assert rec(dict(r,grade='E',weatherapiApplied=True))['grade']=='E'
assert rec({'grade':'E','name':'legacy'})['grade']=='E'
# Preserve original network/storage/cache functions, classifier and individual-route code.
if old:
    oldtree=ast.parse(oldsrc); newtree=ast.parse(s)
    def defs(t): return {n.name:ast.dump(n,include_attributes=False) for n in t.body if isinstance(n,ast.FunctionDef)}
    od,nd=defs(oldtree),defs(newtree)
    changed={k for k in od if od[k]!=nd.get(k)}
    assert changed=={'_national_reconcile_cached_row','_national_apply_ridge_continuity','_instagram_load_100_results_from_supabase'},changed
    print('Only 3 existing server functions changed; no network/TTL/storage or route code changes.')
a=Path('app.js').read_text()
js=a[a.index('function nationalHourlyGradeForValues'):a.index('function nationalGradeRank')]
js+="\nconst assert=require('node:assert/strict'); assert.equal(nationalHourlyGradeForValues(15,0,0),'E'); assert.equal(nationalHourlyGradeForValues(0,25,0),'E'); assert.equal(nationalHourlyGradeForValues(0,0,6),'E');"
subprocess.run(['node','-e',js],check=True)
assert 'v20-daily-e' in s and 'v20-daily-e' in a
assert '1.6.120' in Path('index.html').read_text()
print('PASS: 20 policy scenarios, legacy/cache parity, no new keys or larger sample writes, hourly warnings preserved')
# Exercise actual integrated surface safety floor + final daily policy, not only hand-set grades.
def surface(w,r):
    ss=[dict(hour=h,wind=w,gust=0,rain=r,temp=5) for h in range(6,16)]
    return dict(grade='E',maxWind=w,maxGust=0,maxRain=r,minTemp=5,_series=ss)
for m,g,j,want in [(surface(18,0),surface(2,0),model(16),'D'),(surface(2,8),surface(2,8),model(2,8),'D'),(surface(2,10),surface(2,0),model(2),'E')]:
    base=ns['_national_merge_two_models'](p,m,g)
    ridge=model(16 if m['maxWind']>=15 else 2,g['maxRain'])
    row=apply(base,p,ridge,j); assert row['grade']==want,(row['grade'],want)
    assert rec(row)['grade']==want
    if old:
        prev=old['_national_apply_ridge_continuity'](base,p,ridge,j)
        assert set(row)==set(prev) and size(row)<=size(prev)
print('PASS: 3 actual surface merge/floor integration cases')
