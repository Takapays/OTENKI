from pathlib import Path
s=Path("server.py").read_text()
wf=Path(".github/workflows/national-cache-refresh.yml").read_text()
assert 'APP_VERSION = "1.6.117"' in s
assert 'NATIONAL_SCHEDULED_REFRESH_INTERVAL' in s and '"900"' in s
assert 'NATIONAL_SCHEDULED_CHUNK_SIZE' in s and '"10"' in s
assert 'work_due.sort(key=lambda p:(float(p.get("lat") or 0.0)' in s
assert '"scheduledOrder":"south-to-north" if scheduled else "input-order"' in s
assert 'stamp = snap.get("lastRunFinishedAt")' in s
assert '_national_deadline_timeout(deadline,NOAA_GFS_TIMEOUT)' in s
assert '_national_deadline_timeout(deadline,NOAA_GEFS_TIMEOUT)' in s
assert "cron: '7,22,37,52 * * * *'" in wf
assert '--max-time 300' in wf
assert '--retry' not in wf
print('V1.6.117 national scheduler south-to-north regression: PASS')
