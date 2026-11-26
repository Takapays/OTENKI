from pathlib import Path
import ast, math, json, subprocess
from typing import Any
s=Path('server.py').read_text(); a=Path('app.js').read_text()
tree=ast.parse(s)
names={'_finite','_national_grade','_national_grade_rank','_national_bc_caution_hours','_national_merge_two_models','_national_ridge_series_usable','_national_jma_daily_from_series','_national_ridge_wind_only_daily','_national_reconcile_cached_row'}
ns={'Any':Any,'math':math,'NATIONAL_DAILY_RAIN_C_MM_H':.5,'NATIONAL_DAILY_WIND_C_MS':7.0}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name in names],type_ignores=[]),'<daily policy>','exec'),ns)
f=ns['_national_grade']; cases=[]
def case(w,g,r,c,b,d,e,want):
    actual=f(w,g,r,0,0,None,caution_hours=c,bc_caution_hours=b,severe_hours=d,extreme_hours=e)[0]
    assert actual==want,(w,g,r,c,b,d,e,actual,want)
    cases.append([w,g,r,c,b,d,e,want])
for args in [(0,0,0,0,0,0,0,'A'),(5,0,0,2,0,0,0,'B'),(7,0,0,2,2,0,0,'C'),(9,18,1.5,1,1,1,0,'C'),(9,18,1.5,2,2,2,0,'D'),(15,25,6,1,1,1,1,'D'),(15,25,6,2,2,2,2,'D'),(15,25,6,3,3,3,3,'E'),(18,0,0,1,1,1,1,'E'),(0,28,0,1,1,1,1,'E'),(0,0,8,1,1,1,1,'E'),(17.9,27.9,7.9,1,1,1,1,'D')]:case(*args)
# Verify surface safety floor and ridge-only / JMA paths with actual production functions.
def rows(w=2,r=0,n=1):return [{'hour':h,'wind':w if h<6+n else 2,'gust':0,'rain':r if h<6+n else 0,'temp':5} for h in range(6,16)]
def model(w=2,r=0,n=1):return {'grade':'A','_series':rows(w,r,n)}
merge=ns['_national_merge_two_models']
for w,r,n,want in [(15,0,1,'D'),(15,0,2,'D'),(15,0,3,'E'),(18,0,1,'E'),(2,6,1,'D'),(2,8,1,'E')]:
    z=merge({'name':'test'},model(),model(w,r,n));assert z['grade']==want,(w,r,n,z)
    assert z['safetyFloorEvidence'][0]['grade']==want
for w,n,want in [(15,1,'D'),(15,2,'D'),(15,3,'E'),(18,1,'E')]:
    rr=[dict(x,ridgeWind=x['wind'],estimatedRidgeGust=x['wind']*1.5) for x in rows(w,0,n)]
    for name in ['_national_jma_daily_from_series','_national_ridge_wind_only_daily']:
        z=ns[name](rr);assert z['shadowGrade']==want,(name,z)
# Browser daily function must match the backend, but hourly dangerous values remain E.
js=a[a.index('function nationalHourlyGradeForValues'):a.index('function nationalGradeRank')]+a[a.index('function nationalDailyRuleCounts'):a.index('function reconcileNationalDetailResult')]
js+='\nconst assert=require("node:assert/strict");\n'
js+='for(const [w,g,r,c,b,d,e,want] of '+json.dumps(cases)+'){assert.equal(nationalDailyGradeFromCounts({caution:c,bc:b,severe:d,extreme:e,hard:w>=18||g>=28||r>=8}),want);}\n'
js+="assert.equal(nationalHourlyGradeForValues(15,0,0),'E');assert.equal(nationalHourlyGradeForValues(0,25,0),'E');assert.equal(nationalHourlyGradeForValues(0,0,6),'E');\n"
js+="assert.equal(nationalDailyGradeFromCounts(nationalDailyRuleCounts([{hour:6,wind:15,gust:25,rain:6}])), 'D');\n"
js+="assert.equal(nationalDailyGradeFromCounts(nationalDailyRuleCounts([{hour:6,ridgeWind:18}],true)), 'E');\n"
subprocess.run(['node','-e',js],check=True)
assert 'v20-daily-e' in a and 'v20-daily-e' in s
assert '1.6.118' in Path('index.html').read_text()
print('V1.6.118: 12 daily boundary cases, 6 surface-floor cases, 8 ridge cases, JS parity + hourly hazard preservation PASS')
