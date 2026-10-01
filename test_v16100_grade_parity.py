from pathlib import Path

server=Path('server.py').read_text(encoding='utf-8')
app=Path('app.js').read_text(encoding='utf-8')
idx=Path('index.html').read_text(encoding='utf-8')

assert 'APP_VERSION = "1.6.100"' in server
assert "const APP_VERSION = '1.6.100';" in app
assert 'app.js?v=1.6.100' in idx
assert idx.count('data-app-version>V1.6.100</span>') == 2

# National map parity: page-open rechecks old optimistic grades through a forced live path.
assert 'NATIONAL_OPTIMISTIC_VERIFY_A_SECONDS' in server
assert 'NATIONAL_OPTIMISTIC_VERIFY_B_SECONDS' in server
assert 'def _national_optimistic_refresh_due' in server
assert 'payload.get("verifyOptimistic") is True' in server
assert '_national_fetch_and_persist(date_text,points,due,snap,force_fetch=True)' in server
assert 'verifyOptimistic:true' in app
assert 'verifyNationalOutlookOptimistic(date,eligible)' in app

# The green button must really bypass the four-hour cache.
assert 'payload.get("forceRefresh") is True' in server
assert '_national_fetch_and_persist(date_text,points,points,snap,force_fetch=True)' in server
assert 'forceRefresh:true' in app

# Opened-mountain live data is authoritative again and is written back to the shared cache.
assert 'v16100-live-authority' in server
assert 'detailSnapshotLocked"]=False' in server
assert 'detail_persisted=_national_supabase_write' in server
assert 'nationalOutlookResults.set(p.name,reconciled)' in app
assert 'updateNationalDetailGradeBadge(box,reconciled.grade)' in app
assert 'v1699-snapshot-locked' not in server

# Core A-E thresholds and long-lived base cache TTL remain unchanged.
assert 'NATIONAL_OUTLOOK_CACHE_TTL = int(os.environ.get("NATIONAL_OUTLOOK_CACHE_TTL", "14400"))' in server
assert 'if severe_hours >= 2:' in server
assert 'if severe_hours >= 1 or significant_hours >= 2:' in server
assert 'if caution_hours >= 1:' in server

print('V1.6.100 national/detail parity guards: PASS')
