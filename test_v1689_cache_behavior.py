from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
server = (ROOT / 'server.py').read_text(encoding='utf-8')
app = (ROOT / 'app.js').read_text(encoding='utf-8')
index = (ROOT / 'index.html').read_text(encoding='utf-8')

assert 'APP_VERSION = "1.6.89"' in server
assert "const APP_VERSION = '1.6.89';" in app
assert 'app.js?v=1.6.89' in index
assert index.count('V1.6.89') >= 2

start = server.index('def national_outlook():')
end = server.index('def _national_detail_cached_result', start)
fn = server[start:end]
cache_pos = fn.index('if payload.get("cacheOnly") is True:')
repair_pos = fn.index('_national_repair_snapshot_jma', cache_pos)
assert cache_pos < repair_pos, 'cacheOnly must return before synchronous JMA repair'
cache_block = fn[cache_pos:repair_pos]
assert '_national_repair_snapshot_jma' not in cache_block
assert '_openmeteo_jma_production_results' not in cache_block
assert 'newly_fetched_count=0' in cache_block

js_start = app.index('async function runNationalOutlook()')
js_end = app.index('\n}', js_start) + 2
run_fn = app[js_start:js_end]
assert 'loadNationalOutlookSharedCacheOnly({silentMiss:true})' in run_fn
assert run_fn.index('loadNationalOutlookSharedCacheOnly({silentMiss:true})') < run_fn.index("fetch('/api/national-outlook'")
assert "保存済みの全国分析を表示中" in run_fn

assert 'national_cache_active_backend' in server
print('V1.6.89 cache behavior guards: PASS')
