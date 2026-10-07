from pathlib import Path
import ast

app = Path('app.js').read_text(encoding='utf-8')
server = Path('server.py').read_text(encoding='utf-8')
idx = Path('index.html').read_text(encoding='utf-8')

assert "const APP_VERSION = '1.6.102';" in app
assert 'APP_VERSION = "1.6.102"' in server
assert 'app.js?v=1.6.102' in idx
assert idx.count('data-app-version>V1.6.102</span>') == 2

engine='metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7'
assert f"const NATIONAL_OUTLOOK_CACHE_ENGINE='{engine}';" in app
assert f'NATIONAL_OUTLOOK_ENGINE = "{engine}"' in server

# No A/B-only page-open provider refresh returns.
for token in ('verifyOptimistic', 'verifyNationalOutlookOptimistic', 'NATIONAL_OPTIMISTIC_VERIFY_A_SECONDS', 'NATIONAL_OPTIMISTIC_VERIFY_B_SECONDS', '_national_optimistic_refresh_due'):
    assert token not in app + server, token

# Explicit all-mountain refresh and authoritative tapped detail remain.
assert 'forceRefresh:true' in app
assert 'payload.get("forceRefresh") is True' in server
assert 'reconciled["detailSnapshotLocked"]=False' in server
assert 'detailReconciledVersion"]="v16101-live-authority"' in server
assert '_national_supabase_write(date_text,[p],[reconciled_row])' in server

# Cache-age display remains.
for token in ('キャッシュ鮮度', '平均 約', '最古 約', 'TTL 240分'):
    assert token in app

# Criteria remain V1.6.101 wind-7 semantics.
assert 'Cへの累積対象＝風7m/s・突風12m/s・雨0.5mm/h以上' in app
assert '<b>C 注意</b>：風7m/s以上・突風12m/s以上' in app
assert 'Cへの累積対象＝風5m/s' not in app
assert 'NATIONAL_DAILY_WIND_C_MS = 7.0' in server

mod=ast.parse(server)
keep=[]
for node in mod.body:
    if isinstance(node,(ast.FunctionDef,ast.Assign,ast.AnnAssign)):
        names=[]
        if isinstance(node,ast.FunctionDef): names=[node.name]
        elif isinstance(node,ast.Assign): names=[t.id for t in node.targets if isinstance(t,ast.Name)]
        elif isinstance(node,ast.AnnAssign) and isinstance(node.target,ast.Name): names=[node.target.id]
        if any(n in {'NATIONAL_DAILY_RAIN_C_MM_H','NATIONAL_DAILY_WIND_C_MS','_national_bc_caution_hours','_national_grade'} for n in names):
            keep.append(node)
ns={'Any':object,'_finite':lambda v: isinstance(v,(int,float)) and v==v and abs(v)!=float('inf')}
exec(compile(ast.Module(body=keep,type_ignores=[]),'<actual>','exec'),ns)
bc=ns['_national_bc_caution_hours']; grade=ns['_national_grade']

rows=[{'wind':5.0,'gust':0,'rain':0},{'wind':6.9,'gust':0,'rain':0}]
assert bc(rows)==0
assert grade(6.9,0,0,0,0,None,caution_hours=2,severe_hours=0,extreme_hours=0,bc_caution_hours=bc(rows))[0]=='B'
rows=[{'wind':7.0,'gust':0,'rain':0},{'wind':7.1,'gust':0,'rain':0}]
assert bc(rows)==2
assert grade(7.1,0,0,0,0,None,caution_hours=2,severe_hours=0,extreme_hours=0,bc_caution_hours=bc(rows))[0]=='C'
assert bc([{'wind':0,'gust':12,'rain':0},{'wind':0,'gust':12,'rain':0}])==2
assert bc([{'wind':0,'gust':0,'rain':0.5},{'wind':0,'gust':0,'rain':0.5}])==2
assert grade(9,18,1.5,0,0,None,caution_hours=2,severe_hours=1,extreme_hours=0,bc_caution_hours=2)[0]=='C'
assert grade(9,18,1.5,0,0,None,caution_hours=2,severe_hours=2,extreme_hours=0,bc_caution_hours=2)[0]=='D'
assert grade(15,25,6,0,0,None,caution_hours=1,severe_hours=1,extreme_hours=1,bc_caution_hours=1)[0]=='E'

print('V1.6.102 V1.6.101 behavior regression checks: PASS')
