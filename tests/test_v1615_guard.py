from pathlib import Path
import ast, re, hashlib, subprocess
ROOT=Path(__file__).resolve().parents[1]
BASE=Path('/mnt/data/traten_v1614')
app=(ROOT/'app.js').read_text(encoding='utf-8')
server=(ROOT/'server.py').read_text(encoding='utf-8')
index=(ROOT/'index.html').read_text(encoding='utf-8')
audit=(ROOT/'data-audit.html').read_text(encoding='utf-8')
checks=[]
def check(name, cond):
    checks.append((name,bool(cond)))
    if not cond: raise AssertionError(name)
def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()

# Version consistency.
check('app version', "const APP_VERSION = '1.6.15';" in app)
check('server version', 'APP_VERSION = "1.6.15"' in server)
check('index version badges', index.count('data-app-version>V1.6.15')==2)
check('index app asset version', 'app.js?v=1.6.15' in index)
check('audit app asset version', 'app.js?v=1.6.15' in audit)

# Requested loading presentation.
loading='解析中！<span class="national-loading-dots" aria-hidden="true">・・・</span>'
check('loading copy appears 3 times', app.count(loading)==3)
check('old loading copy removed', '2モデルの時間別予測を取得しています' not in app)
check('loading is red', '.national-model-loading{color:#c62828;font-weight:900}' in index)
check('animated dots class exists', '.national-loading-dots{' in index)
check('animated dots keyframes exists', '@keyframes nationalLoadingDots' in index)
check('animated dots use 3 steps', 'animation:nationalLoadingDots 1.05s steps(3,end) infinite' in index)

# Normalize V1.6.15-only display changes; everything else in app/index/server/audit must equal V1.6.14.
base_app=(BASE/'app.js').read_text(encoding='utf-8')
norm_app=app.replace("const APP_VERSION = '1.6.15';", "const APP_VERSION = '1.6.14';")
norm_app=norm_app.replace(loading, '2モデルの時間別予測を取得しています…')
check('app changes limited to version/loading UI', norm_app==base_app)

base_index=(BASE/'index.html').read_text(encoding='utf-8')
added='.national-model-loading{color:#c62828;font-weight:900}.national-loading-dots{display:inline-block;width:3em;white-space:nowrap;overflow:hidden;vertical-align:bottom;animation:nationalLoadingDots 1.05s steps(3,end) infinite}@keyframes nationalLoadingDots{0%{width:0}100%{width:3em}}'
norm_index=index.replace(added,'').replace('1.6.15','1.6.14')
check('index changes limited to version/loading CSS', norm_index==base_index)
check('server only version changed', server.replace('APP_VERSION = "1.6.15"','APP_VERSION = "1.6.14"')==(BASE/'server.py').read_text(encoding='utf-8'))
check('audit only version changed', audit.replace('1.6.15','1.6.14')==(BASE/'data-audit.html').read_text(encoding='utf-8'))

# Protected national logic and chart specification retained.
check('national engine retained', 'NATIONAL_OUTLOOK_ENGINE = "metno-gfs-v5-abcde-mean-floor"' in server)
check('browser national engine retained', "NATIONAL_OUTLOOK_CACHE_ENGINE='metno-gfs-v5-abcde-mean-floor'" in app)
check('ABCDE retained', '{"A","B","C","D","E"}' in server)
check('wind fixed max retained', "nationalModelChartSvg(rows,'wind','風速','m/s',7)" in app)
check('gust fixed max retained', "nationalModelChartSvg(rows,'gust','突風','m/s',15)" in app)
check('rain paired bars retained', "nationalModelChartSvg(rows,'rain','降水','mm/h',7,'bars')" in app)
check('desktop hint retained', '<strong>山をタップでグラフ表示📊</strong>' in index)
check('mobile hint retained', '山をタップでグラフ表示📊' in index)

# No top-level JS/server function deletion versus immediate previous version.
old_js=set(re.findall(r'(?m)^function\s+([A-Za-z_$][\w$]*)\s*\(', base_app))
new_js=set(re.findall(r'(?m)^function\s+([A-Za-z_$][\w$]*)\s*\(', app))
check('no existing JS functions deleted', old_js <= new_js)
old_tree=ast.parse((BASE/'server.py').read_text(encoding='utf-8'))
new_tree=ast.parse(server)
old_sf={n.name for n in old_tree.body if isinstance(n,(ast.FunctionDef,ast.AsyncFunctionDef))}
new_sf={n.name for n in new_tree.body if isinstance(n,(ast.FunctionDef,ast.AsyncFunctionDef))}
check('no existing server functions deleted', old_sf <= new_sf)

# All other inherited application files are byte-identical to V1.6.14.
ignore={'app.js','index.html','server.py','data-audit.html','README_V1614.md','RELEASE_AUDIT_V1614.md','REGRESSION_AUDIT_V1614.json'}
base_files={p.relative_to(BASE) for p in BASE.rglob('*') if p.is_file() and p.name not in ignore and not str(p.relative_to(BASE)).startswith('tests/') and '__pycache__' not in str(p.relative_to(BASE))}
root_files={p.relative_to(ROOT) for p in ROOT.rglob('*') if p.is_file() and p.name not in ignore and not str(p.relative_to(ROOT)).startswith('tests/') and '__pycache__' not in str(p.relative_to(ROOT))}
common=base_files & root_files
check('no inherited application file missing', base_files <= root_files)
check('all inherited application files byte-identical', all(sha(BASE/r)==sha(ROOT/r) for r in common))

# Syntax checks.
proc=subprocess.run(['node','--check',str(ROOT/'app.js')],capture_output=True,text=True)
check('app.js syntax', proc.returncode==0)
proc=subprocess.run(['python','-m','py_compile',str(ROOT/'server.py')],capture_output=True,text=True)
check('server.py compile', proc.returncode==0)

print(f'OK: {len(checks)} checks')
