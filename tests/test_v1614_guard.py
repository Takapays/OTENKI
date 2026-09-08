from pathlib import Path
import ast, re, math, hashlib, subprocess, tempfile
ROOT=Path(__file__).resolve().parents[1]
BASE=Path('/mnt/data/traten_v1613')
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

check('app version', "const APP_VERSION = '1.6.14';" in app)
check('server version', 'APP_VERSION = "1.6.14"' in server)
check('index version', index.count('data-app-version>V1.6.14')==2)
check('index assets', 'app.js?v=1.6.14' in index and 'styles.css?v=1.6.14' in index)
check('audit assets', 'app.js?v=1.6.14' in audit)

# National logic remains untouched.
check('national cache engine retained', 'NATIONAL_OUTLOOK_ENGINE = "metno-gfs-v5-abcde-mean-floor"' in server)
check('browser cache engine retained', "NATIONAL_OUTLOOK_CACHE_ENGINE='metno-gfs-v5-abcde-mean-floor'" in app)
check('ABCDE accepted server', '{"A","B","C","D","E"}' in server)
check('same-hour mean copy retained', '中心値は2モデルの同時刻予測の平均です。' in app)
check('D/E safety floor copy retained', 'ただしD・E相当の強い／極端な条件は平均で解除しません。' in app)

# Requested graph changes.
check('wind fixed max 7', "nationalModelChartSvg(rows,'wind','風速','m/s',7)" in app)
check('gust fixed max 15', "nationalModelChartSvg(rows,'gust','突風','m/s',15)" in app)
check('rain fixed max 7 bars', "nationalModelChartSvg(rows,'rain','降水','mm/h',7,'bars')" in app)
check('fixed clamp used', 'Math.min(limit,v)' in app)
check('wind/rain ticks fixed to 0 2 4 6 7', "key==='gust'?[0,5,10,15]:[0,2,4,6,7]" in app)
check('rain uses paired rectangles', '<rect x=' in app and "nm-bar-met" in app and "nm-bar-gfs" in app)
check('rain bars are model-only', "subtitle='MET Norway / NOAA GFS';" in app)
check('line graphs retain center value', "subtitle='MET Norway / NOAA GFS / 中心値';" in app and 'nm-avg' in app)
check('over-limit indicator retained', 'class="nm-over">↑</text>' in app and '↑は上限超過' in app)
check('bar CSS exists', '.nm-bar-met{fill:#2678b8}' in index and '.nm-bar-gfs{fill:#d46a25}' in index)
check('bar legend CSS exists', '.national-model-legend .met.bar:before{background:#2678b8}' in index and '.national-model-legend .gfs.bar:before{background:#d46a25}' in index)

# Ensure previous requested responsive layout/copy remains.
check('desktop hint retained', '<strong>山をタップでグラフ表示📊</strong>' in index)
check('mobile hint retained', '<div class="national-mobile-map-hint" aria-hidden="true">山をタップでグラフ表示📊</div>' in index)
check('mobile graph slot retained', '.national-model-slot-mobile{display:none}' in index and '.national-model-slot-desktop{display:none}.national-model-slot-mobile{display:block}' in index)
check('small mobile legend retained', '.national-map-legend-overlay span{width:18px;height:18px;font-size:9px}' in index)

# Instagram is untouched.
check('instagram bot byte-identical', sha(ROOT/'instagram_bot.py')==sha(BASE/'instagram_bot.py'))
check('instagram A-E retained', 'for g in "ABCDE"' in ig and "D：{counts.get('D', 0)}座" in ig and "E：{counts.get('E', 0)}座" in ig)

# Server only version changed from V1.6.13.
base_server=(BASE/'server.py').read_text(encoding='utf-8').replace('APP_VERSION = "1.6.13"','APP_VERSION = "1.6.14"')
check('server only version changed', server==base_server)

# Function declarations must not disappear.
old_js=set(re.findall(r'(?m)^function\s+([A-Za-z_$][\w$]*)\s*\(', (BASE/'app.js').read_text(encoding='utf-8')))
new_js=set(re.findall(r'(?m)^function\s+([A-Za-z_$][\w$]*)\s*\(', app))
check('no existing JS functions deleted', old_js <= new_js)
old_tree=ast.parse((BASE/'server.py').read_text(encoding='utf-8'))
new_tree=ast.parse(server)
old_sf={n.name for n in old_tree.body if isinstance(n,(ast.FunctionDef,ast.AsyncFunctionDef))}
new_sf={n.name for n in new_tree.body if isinstance(n,(ast.FunctionDef,ast.AsyncFunctionDef))}
check('no existing server functions deleted', old_sf <= new_sf)

# Execute chart renderer in isolation with synthetic hourly data.
a=app.index('function nationalModelChartSvg('); b=app.index('\nfunction nationalModelDetailHtml',a)
fn=app[a:b]
js="const esc=s=>String(s);\n"+fn+r'''
const rows=[
 {model:'metno',series:Array.from({length:10},(_,i)=>({hour:6+i,wind:i===3?8:3+i*.2,gust:i===5?17:8+i*.3,rain:i===4?8:i*.3}))},
 {model:'gfs',series:Array.from({length:10},(_,i)=>({hour:6+i,wind:2+i*.3,gust:7+i*.4,rain:i*.2}))}
];
const w=nationalModelChartSvg(rows,'wind','風速','m/s',7);
const g=nationalModelChartSvg(rows,'gust','突風','m/s',15);
const r=nationalModelChartSvg(rows,'rain','降水','mm/h',7,'bars');
if((w.match(/<path /g)||[]).length!==3) throw Error('wind paths');
if((g.match(/<path /g)||[]).length!==3) throw Error('gust paths');
if((r.match(/<rect /g)||[]).length!==20) throw Error('rain paired bars');
if((r.match(/<path /g)||[]).length!==0) throw Error('rain line present');
if(!w.includes('縦軸 0〜7')||!g.includes('縦軸 0〜15')||!r.includes('縦軸 0〜7')) throw Error('axis labels');
if(!w.includes('↑は上限超過')||!g.includes('↑は上限超過')||!r.includes('↑は上限超過')) throw Error('overflow note');
console.log('chart-render-pass');
'''
with tempfile.NamedTemporaryFile('w',suffix='.js',delete=False,encoding='utf-8') as f:
    f.write(js); temp=f.name
proc=subprocess.run(['node',temp],capture_output=True,text=True)
check('synthetic chart renderer', proc.returncode==0 and 'chart-render-pass' in proc.stdout)

# National grade/merge helpers still behave as before.
tree=ast.parse(server)
wanted={'_national_grade','_national_grade_rank','_national_merge_two_models'}
fns=[n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name in wanted]
check('national helper functions found', {n.name for n in fns}==wanted)
mod=ast.Module(body=fns,type_ignores=[]);ast.fix_missing_locations(mod)
ns={'math':math,'Any':object}; exec(compile(mod,'<national>','exec'),ns)
grade=ns['_national_grade']; merge=ns['_national_merge_two_models']
check('grade A retained', grade(3,5,0,0,10,None,caution_hours=0,severe_hours=0,extreme_hours=0)[0]=='A')
check('grade D retained', grade(9,12,0,0,10,None,caution_hours=2,severe_hours=2,extreme_hours=0)[0]=='D')
check('grade E retained', grade(15,25,6,0,10,None,caution_hours=1,severe_hours=1,extreme_hours=1)[0]=='E')

print(f'OK: {len(checks)} checks')
