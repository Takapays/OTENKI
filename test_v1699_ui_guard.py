from pathlib import Path
app=Path('app.js').read_text(encoding='utf-8')
server=Path('server.py').read_text(encoding='utf-8')
idx=Path('index.html').read_text(encoding='utf-8')

assert "const APP_VERSION = '1.6.99';" in app
assert 'APP_VERSION = "1.6.99"' in server
assert 'app.js?v=1.6.99' in idx
assert idx.count('data-app-version>V1.6.99</span>') == 2

# Tapping detail must not mutate the nationwide snapshot.
hydrate=app[app.index('async function hydrateNationalModelDetail'):app.index('function showNationalOutlookDetail')]
for forbidden in (
    'nationalOutlookResults.set(p.name,reconciled)',
    'patchNationalOutlookBrowserCacheResult(date,reconciled)',
    'updateNationalDetailGradeBadge(box,reconciled.grade)',
    'renderNationalOutlookMarkers();',
):
    assert forbidden not in hydrate, forbidden
assert 'snapshotResult' in hydrate

# Cache-age UI remains.
for token in ('averageAgeSeconds','oldestAgeSeconds','キャッシュ鮮度','TTL 240分'):
    assert token in app or token in idx

# Server detail no longer writes a one-mountain reconciliation to shared cache.
detail=server[server.index('@app.post("/api/national-outlook/detail")'):server.index('def _diagnostic_http_probe')]
assert 'detailSnapshotLocked' in detail
assert '_national_supabase_write(date_text,[p],[row])' not in detail
assert '_national_point_cache_put(date_text,p,row)' not in detail

print('V1.6.99 UI/detail snapshot guard: PASS')
