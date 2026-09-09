from pathlib import Path
root=Path(__file__).resolve().parent
a=(root/'app.js').read_text(encoding='utf-8')
s=(root/'server.py').read_text(encoding='utf-8')
h=(root/'index.html').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.35';" in a
assert 'APP_VERSION = "1.6.35"' in s
assert 'NATIONAL_OUTLOOK_ENGINE = "metno-gfs-mb-v9-element-policy"' in s
# Requested copy
assert '山をタップで時間帯別分析📊' in h
assert '山をタップでグラフ表示📊' not in h
assert '時間帯別解析中・・' in a
# Nationwide detail always calls MB and surfaces status.
assert 'mb=_national_fetch_meteoblue_detail(p,date_text)' in s
assert 'meteoblueStatus={"configured":bool(METEOBLUE_API_KEY),"fetched":bool(mb)' in s
assert 'models.meteoblue?.series' in a
assert 'meteoblue：${mbStatus.configured?' in a
# Nationwide overview retains selective quota protection and passes MB into merge.
assert 'mb=_national_meteoblue_results(date_text,mb_points)' in s
assert '_national_merge_two_models(p,metno.get(p["name"]),gfs.get(p["name"]),mb.get(p["name"]))' in s
# Waypoint first visible pass includes MB; cache generation is refreshed.
block=a[a.index('async function analyzeFallbackThreeBatch'):a.index('async function analyzeIndependentSupportBatch')]
assert 'fetchMeteoblueFallback(point)' in block
assert "const WEATHER_POINT_CACHE_PREFIX='traten:weather-point:v1635:';" in a
# Both MB transports have a transient retry but no 4xx immediate retry.
assert s.count('for attempt in range(2):') >= 2
assert s.count('if 400 <= int(exc.code) < 500: raise') >= 2
# Open-Meteo ordering/circuit unchanged.
assert 'const OPEN_METEO_BLOCK_MS=60*60*1000;' in a
assert a.index('let latestResults=await analyzeFallbackThreeBatch') < a.index('const preferredProbeId=',a.index('async function analyze(){'))
print('PASS V1.6.35 guard')
