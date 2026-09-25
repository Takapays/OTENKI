from pathlib import Path

ROOT=Path(__file__).resolve().parent
server=(ROOT/'server.py').read_text(encoding='utf-8')
app=(ROOT/'app.js').read_text(encoding='utf-8')
index=(ROOT/'index.html').read_text(encoding='utf-8')

assert 'APP_VERSION = "1.6.91"' in server
assert "const APP_VERSION = '1.6.91';" in app
assert 'app.js?v=1.6.91' in index
assert index.count('V1.6.91') >= 2
assert 'metno-gfs-jma-ridge-gust-worstof-v17-gfs-pressure-continuity' in server
assert 'metno-gfs-jma-ridge-gust-worstof-v17-gfs-pressure-continuity' in app

# Preserve V1.6.89: cacheOnly returns before any synchronous JMA repair/provider request.
start=server.index('def national_outlook():')
end=server.index('def _national_detail_cached_result',start)
fn=server[start:end]
cache_pos=fn.index('if payload.get("cacheOnly") is True:')
repair_pos=fn.index('_national_repair_snapshot_jma',cache_pos)
assert cache_pos < repair_pos
cache_block=fn[cache_pos:repair_pos]
assert '_national_repair_snapshot_jma' not in cache_block
assert '_openmeteo_jma_production_results' not in cache_block

# Preserve V1.6.90: cache-only first paint includes age and remaining TTL.
start=app.index('async function loadNationalOutlookSharedCacheOnly')
end=app.index('async function runNationalOutlook',start)
block=app[start:end]
for token in ('cacheOnly:true','data.cache?.ageSeconds','data.cache?.freshRemainingSeconds','キャッシュ年齢 約${ageMin}分','4時間TTL残り'):
    assert token in block, token

# V1.6.91: missing ridge evidence is a cacheable state, so no per-open retry loop.
fetch_start=server.index('def _national_fetch_shared(date_text, points):')
fetch_end=server.index('def _national_response',fetch_start)
fetch=server[fetch_start:fetch_end]
assert '"unavailable"' in fetch
assert 'ridgeContinuityVersion' in fetch

print('V1.6.91 cache regression checks: PASS')
