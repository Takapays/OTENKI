from pathlib import Path
import ast, re, math, os
ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/'app.js').read_text(encoding='utf-8')
server=(ROOT/'server.py').read_text(encoding='utf-8')
index=(ROOT/'index.html').read_text(encoding='utf-8')
audit=(ROOT/'data-audit.html').read_text(encoding='utf-8')
ig=(ROOT/'instagram_bot.py').read_text(encoding='utf-8')
checks=[]
def check(name, cond):
    checks.append((name,bool(cond)))
    if not cond: raise AssertionError(name)

check('app version', "const APP_VERSION = '1.6.12';" in app)
check('server version', 'APP_VERSION = "1.6.12"' in server)
check('index version', index.count('data-app-version>V1.6.12')==2)
check('index assets', 'app.js?v=1.6.12' in index and 'styles.css?v=1.6.12' in index)
check('audit assets', 'app.js?v=1.6.12' in audit)

# Existing nationwide A-E + same-hour merge logic remains unchanged.
check('national cache engine retained', 'NATIONAL_OUTLOOK_ENGINE = "metno-gfs-v5-abcde-mean-floor"' in server)
check('browser cache engine retained', "NATIONAL_OUTLOOK_CACHE_ENGINE='metno-gfs-v5-abcde-mean-floor'" in app)
check('ABCDE accepted server', '{"A","B","C","D","E"}' in server)
check('ABCDE markers client', "['A','B','C','D','E'].includes(grade)" in app)
check('same-hour center copy', '中心値は2モデルの同時刻予測の平均です。' in app)
check('D/E floor copy', 'ただしD・E相当の強い／極端な条件は平均で解除しません。' in app)
check('missing MET one-hour rain protected', 'rain_known=bool(next_1)' in server and '"rain":round(r,1) if rain_known else None' in server)

# Requested UI placement changes.
legend='<div class="national-outlook-legend national-five-legend national-map-legend-overlay" aria-label="判定凡例">'
map_open='<div id="nationalOutlookMap" class="national-outlook-map" aria-label="日本三百名山 全国一括簡易判定">'
check('legend exists once', index.count(legend)==1)
check('legend inside map container', map_open+legend in index)
check('legend overlay css', '.national-map-legend-overlay{position:absolute' in index and 'z-index:650' in index)
check('tap guide retained', '<b>山をタップ</b>すると、判定理由・判定基準・MET Norway / NOAA GFS の時間別モデル差を確認できます。' in index)
slot='${result?`<div class="national-model-top" data-national-model-detail>'
hero='<div class="national-rich-hero${photo?\' has-photo\':\'\'}"${heroStyle}>'
check('model graph top slot', slot in app)
check('model graph before hero', app.index(slot, app.index('function showNationalOutlookDetail')) < app.index(hero, app.index('function showNationalOutlookDetail')))
check('old model slot removed from metrics', '<div class="national-rich-metrics">${metrics}</div><div data-national-model-detail></div>' not in app)
check('model graph endpoint retained', '@app.post("/api/national-outlook/detail")' in server)

# Instagram now consumes and renders native A-E instead of collapsing grades.
check('instagram server preserves A-E', '{"A":"A","B":"B","C":"B","D":"C","E":"C"}' not in server)
check('instagram grade5 audit retained', 'item["grade5"] = item.get("grade")' in server)
check('instagram A-E render filters', '{"A", "B", "C", "D", "E"}' in ig and '{"A","B","C","D","E"}' in ig)
check('instagram A-E counts', 'for g in "ABCDE"' in ig)
for grade in 'ABCDE':
    check(f'instagram color {grade}', f'"{grade}":' in ig)
check('instagram A-E caption', "D：{counts.get('D', 0)}座" in ig and "E：{counts.get('E', 0)}座" in ig)
check('instagram A-E persisted counts', '"counts": {g: int(counts.get(g, 0)) for g in "ABCDE"}' in ig)
check('instagram cache revision bumped', 'master-20260908-scenes-v11-abcde' in ig)
check('instagram horizontal legend', 'rows=[("A","良好"),("B","軽い注意"),("C","注意"),("D","悪い"),("E","非常に悪い")]' in ig)

# Script stack shape remains unchanged.
idx=re.findall(r'<script\s+src="([^"]+)"(?:\s+defer)?></script>',index)
aud=re.findall(r'<script\s+src="([^"]+)"[^>]*></script>',audit)
check('runtime script stack shape', len(idx)==39 and len(aud)==39)
check('audit stack equals index', aud==idx)

# Execute national grade/rank/merge functions in isolation.
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
