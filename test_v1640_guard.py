"""Release, cache-generation, and retained transport guards for V1.6.40."""
from pathlib import Path
import re, subprocess, sys, ast
root=Path(__file__).resolve().parent
app=(root/'app.js').read_text(encoding='utf-8')
server=(root/'server.py').read_text(encoding='utf-8')
index=(root/'index.html').read_text(encoding='utf-8')
audit=(root/'data-audit.html').read_text(encoding='utf-8')
ig=(root/'instagram_bot.py').read_text(encoding='utf-8')
version='1.6.40'
assert f"const APP_VERSION = '{version}';" in app
assert f'APP_VERSION = "{version}"' in server
assert f'data-app-version>V{version}<' in index
assert f'app.js?v={version}' in index and f'app.js?v={version}' in audit
engine=re.search(r'NATIONAL_OUTLOOK_ENGINE = "([^"]+)"',server).group(1)
assert engine=='metno-gfs-mb-v10-daily-light-rain'
assert f"const NATIONAL_OUTLOOK_CACHE_ENGINE='{engine}';" in app
assert "traten:national-outlook:v10-daily-light-rain" in app
assert 'NATIONAL_DAILY_RAIN_C_MM_H = 0.5' in server
assert 'bc_caution_hours=bc_caution_hours' in server
assert 'METEOBLUE_CLIENT_MAX_CONCURRENCY=1' in app
assert 'METEOBLUE_CLIENT_MIN_INTERVAL_MS=1800' in app
assert 'METEOBLUE_MIN_INTERVAL' in server and '"2.0"' in server
assert 'METEOBLUE_429_COOLDOWN' in server and '"60"' in server
assert 'max_workers=1,thread_name_prefix="traten-national-mb"' in server
assert 'MeteoblueCircuitOpen' in server
assert 'if(attempt===0&&r.status>=500)' in app
assert 'daily-rain-v1640' in ig
assert 'yarigatake-phone-frame' in ig
# Frontend hourly thresholds are deliberately unchanged.
start=app.index('function nationalHourlyGradeForValues(')
end=app.index('\nfunction ',start+10)
hourly=app[start:end]
assert 'rankFor(w,5,7,9,15)' in hourly
assert 'rankFor(g,12,15,18,25)' in hourly
assert 'rankFor(r,0.1,0.5,1.5,6)' in hourly
subprocess.run(['node','--check',str(root/'app.js')],check=True)
ast.parse(server);ast.parse(ig)
print('V1.6.40 release/cache/429/hourly-threshold guards: PASS')
