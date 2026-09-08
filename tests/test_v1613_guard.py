from pathlib import Path
import ast, re, math, hashlib
ROOT=Path(__file__).resolve().parents[1]
BASE=Path('/mnt/data/traten_v1612_base')
app=(ROOT/'app.js').read_text(encoding='utf-8')
server=(ROOT/'server.py').read_text(encoding='utf-8')
index=(ROOT/'index.html').read_text(encoding='utf-8')
audit=(ROOT/'data-audit.html').read_text(encoding='utf-8')
ig=(ROOT/'instagram_bot.py').read_text(encoding='utf-8')
checks=[]
def check(name, cond):
    checks.append((name,bool(cond)))
    if not cond: raise AssertionError(name)
def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()

check('app version', "const APP_VERSION = '1.6.13';" in app)
check('server version', 'APP_VERSION = "1.6.13"' in server)
check('index version', index.count('data-app-version>V1.6.13')==2)
check('index assets', 'app.js?v=1.6.13' in index and 'styles.css?v=1.6.13' in index)
check('audit assets', 'app.js?v=1.6.13' in audit)

# National logic is retained.
check('national cache engine retained', 'NATIONAL_OUTLOOK_ENGINE = "metno-gfs-v5-abcde-mean-floor"' in server)
check('browser cache engine retained', "NATIONAL_OUTLOOK_CACHE_ENGINE='metno-gfs-v5-abcde-mean-floor'" in app)
check('ABCDE accepted server', '{"A","B","C","D","E"}' in server)
check('ABCDE markers client', "['A','B','C','D','E'].includes(grade)" in app)
check('same-hour center copy', '中心値は2モデルの同時刻予測の平均です。' in app)
check('D/E floor copy', 'ただしD・E相当の強い／極端な条件は平均で解除しません。' in app)
check('missing MET one-hour rain protected', 'rain_known=bool(next_1)' in server and '"rain":round(r,1) if rain_known else None' in server)

# Requested text and responsive placement.
check('desktop hint copy', '<strong>山をタップでグラフ表示📊</strong>' in index)
check('mobile hint copy', '<div class="national-mobile-map-hint" aria-hidden="true">山をタップでグラフ表示📊</div>' in index)
check('old desktop hint removed', '山をタップして候補を比較' not in index)
check('old mobile hint removed', '山をクリックで詳細表示' not in index)
check('mobile legend smaller circles', '.national-map-legend-overlay span{width:18px;height:18px;font-size:9px}' in index)
check('mobile legend smaller type', 'font-size:9px;gap:2px 4px;padding:4px 6px' in index)
check('responsive slots css', '.national-model-slot-mobile{display:none}' in index and '.national-model-slot-desktop{display:none}.national-model-slot-mobile{display:block}' in index)
start=app.index('function showNationalOutlookDetail')
desk='national-model-slot-desktop'
hero='<div class="national-rich-hero${photo?\' has-photo\':\'\'}"${heroStyle}>'
mob='national-model-slot-mobile'
check('desktop graph before hero', app.index(desk,start) < app.index(hero,start))
check('mobile graph after hero', app.index(mob,start) > app.index(hero,start))
check('both model slots hydrated', "querySelectorAll('[data-national-model-detail]')" in app and 'slots.forEach(slot=>slot.innerHTML=html)' in app)

# Legend remains in map.
legend='<div class="national-outlook-legend national-five-legend national-map-legend-overlay" aria-label="判定凡例">'
map_open='<div id="nationalOutlookMap" class="national-outlook-map" aria-label="日本三百名山 全国一括簡易判定">'
check('legend exists once', index.count(legend)==1)
check('legend inside map container', map_open+legend in index)

# Instagram and its A-E implementation are untouched from V1.6.12.
check('instagram bot byte-identical', sha(ROOT/'instagram_bot.py')==sha(BASE/'instagram_bot.py'))
check('instagram A-E retained', 'for g in "ABCDE"' in ig and "D：{counts.get('D', 0)}座" in ig and "E：{counts.get('E', 0)}座" in ig)

# server logic is unchanged except version string.
base_server=(BASE/'server.py').read_text(encoding='utf-8').replace('APP_VERSION = "1.6.12"','APP_VERSION = "1.6.13"')
check('server only version changed', server==base_server)

# Script stack shape remains unchanged aside from cache-bust version.
idx=re.findall(r'<script\s+src="([^"]+)"(?:\s+defer)?></script>',index)
aud=re.findall(r'<script\s+src="([^"]+)"[^>]*></script>',audit)
check('runtime script stack shape', len(idx)==39 and len(aud)==39)
check('audit stack equals index', aud==idx)

# Execute national grade/rank/merge functions in isolation to prove no regression.
tree=ast.parse(server)
wanted={'_national_grade','_national_grade_rank','_national_merge_two_models'}
fns=[n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name in wanted]
check('national helper functions found', {n.name for n in fns}==wanted)
mod=ast.Module(body=fns,type_ignores=[]);ast.fix_missing_locations(mod)
ns={'math':math,'Any':object}
exec(compile(mod,'<national>','exec'),ns)
grade=ns['_national_grade']; merge=ns['_national_merge_two_models']
check('grade A', grade(3,5,0,0,10,None,caution_hours=0,severe_hours=0,extreme_hours=0)[0]=='A')
check('grade B', grade(5.5,8,0,0,10,None,caution_hours=1,severe_hours=0,extreme_hours=0)[0]=='B')
check('grade C', grade(5.5,8,0,0,10,None,caution_hours=2,severe_hours=0,extreme_hours=0)[0]=='C')
check('grade D', grade(9,12,0,0,10,None,caution_hours=2,severe_hours=2,extreme_hours=0)[0]=='D')
check('grade E', grade(15,25,6,0,10,None,caution_hours=1,severe_hours=1,extreme_hours=1)[0]=='E')
def model(g,series):
    return {'name':'X','grade':g,'summary':'x','maxWind':max(x['wind'] for x in series),'maxGust':max(x['gust'] for x in series),'maxRain':max(x['rain'] for x in series),'minTemp':min(x['temp'] for x in series),'cautionHours':0,'severeHours':0,'_series':series}
p={'name':'X'}
met=model('A',[{'hour':6,'wind':3,'gust':5,'rain':0,'temp':10},{'hour':7,'wind':3,'gust':5,'rain':0,'temp':10}])
gfs=model('C',[{'hour':6,'wind':7,'gust':9,'rain':0,'temp':12},{'hour':7,'wind':7,'gust':9,'rain':0,'temp':12}])
r=merge(p,met,gfs)
check('same-hour mean used', r['maxWind']==5.0 and r['cautionHours']==2 and r['grade']=='C')
metD=model('D',[{'hour':6,'wind':12,'gust':15,'rain':0,'temp':10}]); gfsA=model('A',[{'hour':6,'wind':2,'gust':3,'rain':0,'temp':10}])
check('D floor retained', merge(p,metD,gfsA)['grade']=='D')
metE=model('E',[{'hour':6,'wind':16,'gust':26,'rain':7,'temp':10}])
check('E floor retained', merge(p,metE,gfsA)['grade']=='E')
print(f'OK: {len(checks)} checks')
