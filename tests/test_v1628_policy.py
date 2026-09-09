import ast, math
from pathlib import Path
src=Path(__file__).parents[1].joinpath('server.py').read_text()
tree=ast.parse(src)
names={'_national_grade','_national_grade_rank','_finite','_national_merge_two_models'}
mods=[n for n in tree.body if isinstance(n,(ast.FunctionDef,ast.AsyncFunctionDef)) and n.name in names]
ns={'math':math,'Any':object,'dict':dict,'list':list}
exec(compile(ast.Module(body=mods,type_ignores=[]),'<policy>','exec'),ns)
merge=ns['_national_merge_two_models']
p={'name':'富士山'}
def row(source, series):
    winds=[x['wind'] for x in series if isinstance(x.get('wind'),(int,float))]
    gusts=[x['gust'] for x in series if isinstance(x.get('gust'),(int,float))]
    rains=[x['rain'] for x in series if isinstance(x.get('rain'),(int,float))]
    temps=[x['temp'] for x in series if isinstance(x.get('temp'),(int,float))]
    return {'source':source,'grade':'A','maxWind':max(winds) if winds else None,'maxGust':max(gusts) if gusts else None,'maxRain':max(rains) if rains else None,'minTemp':min(temps) if temps else None,'_series':series,'cautionHours':0,'severeHours':0}
# GFS temperature and gust are intentionally absurd and must not affect integrated values.
met=row('metno',[{'hour':h,'wind':2.0,'gust':None,'rain':0.0,'temp':3.0} for h in range(6,16)])
gfs=row('gfs',[{'hour':h,'wind':2.4,'gust':30.0,'rain':0.0,'temp':18.0} for h in range(6,16)])
mb=row('meteoblue',[{'hour':h,'wind':2.2,'gust':8.0,'rain':0.0,'temp':4.0} for h in range(6,16)])
r=merge(p,met,gfs,mb)
assert r['minTemp']==3.0, r
assert r['maxGust']==8.0, r
assert r['grade']=='A', r
# MET gust wins when present.
met2=row('metno',[{'hour':h,'wind':2.0,'gust':13.0,'rain':0.0,'temp':3.0} for h in range(6,16)])
r=merge(p,met2,gfs,mb)
assert r['maxGust']==13.0 and r['grade'] in {'C','D','E'}, r
# Wind disagreement uses meteoblue median arbiter: 2, 10, 4 -> 4.
met3=row('metno',[{'hour':h,'wind':2.0,'gust':None,'rain':0.0,'temp':3.0} for h in range(6,16)])
gfs3=row('gfs',[{'hour':h,'wind':10.0,'gust':1.0,'rain':0.0,'temp':18.0} for h in range(6,16)])
mb3=row('meteoblue',[{'hour':h,'wind':4.0,'gust':8.0,'rain':0.0,'temp':4.0} for h in range(6,16)])
r=merge(p,met3,gfs3,mb3)
assert r['maxWind']==4.0 and r['meteoblueUsed'], r
# Rain disagreement 0 vs 2 vs 0.4 -> median 0.4.
met4=row('metno',[{'hour':h,'wind':2.0,'gust':None,'rain':0.0,'temp':3.0} for h in range(6,16)])
gfs4=row('gfs',[{'hour':h,'wind':2.0,'gust':1.0,'rain':2.0,'temp':18.0} for h in range(6,16)])
mb4=row('meteoblue',[{'hour':h,'wind':2.0,'gust':8.0,'rain':0.4,'temp':4.0} for h in range(6,16)])
r=merge(p,met4,gfs4,mb4)
assert r['maxRain']==0.4 and r['meteoblueUsed'], r
print('V1.6.28 element policy tests: PASS')
