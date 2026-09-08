from pathlib import Path
import ast, re, math

ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/'app.js').read_text(encoding='utf-8')
server=(ROOT/'server.py').read_text(encoding='utf-8')
index=(ROOT/'index.html').read_text(encoding='utf-8')
audit=(ROOT/'data-audit.html').read_text(encoding='utf-8')
checks=[]
def check(name, cond):
    checks.append((name,bool(cond)))
    if not cond: raise AssertionError(name)

check('app version', "const APP_VERSION = '1.6.11';" in app)
check('server version', 'APP_VERSION = "1.6.11"' in server)
check('index version', index.count('data-app-version>V1.6.11')==2)
check('index assets', 'app.js?v=1.6.11' in index and 'styles.css?v=1.6.11' in index)
check('audit assets', 'app.js?v=1.6.11' in audit)
check('new server cache engine', 'NATIONAL_OUTLOOK_ENGINE = "metno-gfs-v5-abcde-mean-floor"' in server)
check('new browser cache engine', "NATIONAL_OUTLOOK_CACHE_ENGINE='metno-gfs-v5-abcde-mean-floor'" in app)
check('new browser cache key', "traten:national-outlook:v8-abcde-mean-floor" in app)
check('old national cache engine absent', 'metno-gfs-v4-conservative-recovered' not in server and 'metno-gfs-v4-conservative-recovered' not in app)
check('ABCDE accepted server', '{"A","B","C","D","E"}' in server)
check('ABCDE markers client', "['A','B','C','D','E'].includes(grade)" in app)
for g,label in [('A','良好'),('B','軽い注意'),('C','注意'),('D','悪い'),('E','非常に悪い')]:
    check(f'grade label {g}', f"grade==='{g}'?'{label}'" in app)
check('A-E legend', all(x in index for x in ['grade-a\">A</span>良好','grade-b\">B</span>軽い注意','grade-c\">C</span>注意','grade-d\">D</span>悪い','grade-e\">E</span>非常に悪い']))
check('tap guide', '<b>山をタップ</b>すると、判定理由・判定基準・MET Norway / NOAA GFS の時間別モデル差を確認できます。' in index)
check('detail endpoint', '@app.post("/api/national-outlook/detail")' in server)
check('model graph UI', '地点別予測｜モデル差' in app and 'nationalModelChartSvg' in app)
check('grade-factor charts', "'wind','風速','m/s'" in app and "'gust','突風','m/s'" in app and "'rain','降水','mm/h'" in app)
check('same-hour center copy', '中心値は2モデルの同時刻予測の平均です。' in app)
check('missing MET one-hour rain not averaged as zero', 'rain_known=bool(next_1)' in server and '"rain":round(r,1) if rain_known else None' in server)
check('criteria UI', 'ABCDE 判定基準を見る' in app)
check('instagram legacy compatibility', 'item["grade5"]' in server and '{"A":"A","B":"B","C":"B","D":"C","E":"C"}' in server)
check('national remains independent from open-meteo', 'National analysis never invokes Open-Meteo' in server)
check('sparse threshold retained', 'if(resolvedPts.length<=2)' in app and 'thresholds:{sparseWaypointMax:2}' in app)
check('supabase readback guard retained', '_national_confirm_supabase_write(date_text,batch,valid)' in server and 'database read-back incomplete' in server)

# Script stack remains unchanged in shape.
idx=re.findall(r'<script\s+src="([^"]+)"(?:\s+defer)?></script>',index)
aud=re.findall(r'<script\s+src="([^"]+)"[^>]*></script>',audit)
check('runtime script stack shape', len(idx)==39 and len(aud)==39)
check('audit stack equals index', aud==idx)

# Execute only national grade/rank/merge functions in isolation.
tree=ast.parse(server)
wanted={'_national_grade','_national_grade_rank','_national_merge_two_models'}
fns=[n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name in wanted]
check('national helper functions found', {n.name for n in fns}==wanted)
mod=ast.Module(body=fns,type_ignores=[]);ast.fix_missing_locations(mod)
ns={'math':math,'Any':object}
exec(compile(mod,'<national>','exec'),ns)
grade=ns['_national_grade']; merge=ns['_national_merge_two_models']
check('grade A', grade(3,5,0,0,10,None,caution_hours=0,severe_hours=0,extreme_hours=0)[0]=='A')
check('grade B one caution hour', grade(5.5,8,0,0,10,None,caution_hours=1,severe_hours=0,extreme_hours=0)[0]=='B')
check('grade C two caution hours', grade(5.5,8,0,0,10,None,caution_hours=2,severe_hours=0,extreme_hours=0)[0]=='C')
check('grade C one severe hour', grade(9,12,0,0,10,None,caution_hours=1,severe_hours=1,extreme_hours=0)[0]=='C')
check('grade D two severe hours', grade(9,12,0,0,10,None,caution_hours=2,severe_hours=2,extreme_hours=0)[0]=='D')
check('grade E extreme hour', grade(15,25,6,0,10,None,caution_hours=1,severe_hours=1,extreme_hours=1)[0]=='E')

def model(g,series):
    return {'name':'X','grade':g,'summary':'x','maxWind':max(x['wind'] for x in series),'maxGust':max(x['gust'] for x in series),'maxRain':max(x['rain'] for x in series),'minTemp':min(x['temp'] for x in series),'cautionHours':0,'severeHours':0,'_series':series}
p={'name':'X'}
met=model('A',[{'hour':6,'wind':3,'gust':5,'rain':0,'temp':10},{'hour':7,'wind':3,'gust':5,'rain':0,'temp':10}])
gfs=model('C',[{'hour':6,'wind':7,'gust':9,'rain':0,'temp':12},{'hour':7,'wind':7,'gust':9,'rain':0,'temp':12}])
r=merge(p,met,gfs)
check('same-hour mean used', r['maxWind']==5.0 and r['cautionHours']==2 and r['grade']=='C' and r['integration']=='hourly-mean-with-severe-floor')
metD=model('D',[{'hour':6,'wind':12,'gust':15,'rain':0,'temp':10}]); gfsA=model('A',[{'hour':6,'wind':2,'gust':3,'rain':0,'temp':10}])
check('D floor retained', merge(p,metD,gfsA)['grade']=='D')
metE=model('E',[{'hour':6,'wind':16,'gust':26,'rain':7,'temp':10}])
check('E floor retained', merge(p,metE,gfsA)['grade']=='E')
check('private series not returned', '_series' not in merge(p,met,gfs))

print(f'OK: {len(checks)} checks')
