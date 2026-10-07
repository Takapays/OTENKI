from pathlib import Path
import re

server = Path('server.py').read_text(encoding='utf-8')
app = Path('app.js').read_text(encoding='utf-8')
idx = Path('index.html').read_text(encoding='utf-8')

assert 'APP_VERSION = "1.6.103"' in server
assert "const APP_VERSION = '1.6.103';" in app
assert 'app.js?v=1.6.103' in idx
assert idx.count('data-app-version>V1.6.103</span>') == 2

# The rolling status check must be metadata-only.
m = re.search(r'def _national_100_date_cache_status\(.*?\n(?=def _refresh_rolling_100_cache)', server, re.S)
assert m, 'rolling status function missing'
block = m.group(0)
assert '_national_supabase_read_meta(date_text,points)' in block
assert '_national_supabase_read(date_text,points)' not in block

# Existing 900-second Render settings are intentionally clamped to one hour.
assert 'NATIONAL_OUTLOOK_REFRESH_INTERVAL = max(3600, int(os.environ.get("NATIONAL_OUTLOOK_REFRESH_INTERVAL", "3600")))' in server

# Legacy frequent external wake-ups must be gated server-side.
assert 'def _national_refresh_interval_gate()' in server
assert 'state="interval-not-due"' in server
assert 'refreshIntervalSeconds=NATIONAL_OUTLOOK_REFRESH_INTERVAL' in server

# Forecast semantics/cache identity are not changed by this egress release.
assert 'NATIONAL_OUTLOOK_ENGINE = "metno-gfs-jma-ridge-gust-worstof-v19-cumulative-wind7"' in server
assert 'NATIONAL_OUTLOOK_CACHE_TTL = int(os.environ.get("NATIONAL_OUTLOOK_CACHE_TTL", "14400"))' in server
assert 'NATIONAL_100_ROLLING_DAYS = max(1, min(15, int(os.environ.get("NATIONAL_100_ROLLING_DAYS", "7")))' in server
assert 'NATIONAL_DAILY_WIND_C_MS = 7.0' in server

print('V1.6.103 Supabase egress regression checks: PASS')
