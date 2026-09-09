from pathlib import Path
root=Path(__file__).resolve().parent
a=(root/'app.js').read_text(encoding='utf-8')
s=(root/'server.py').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.33';" in a
assert 'APP_VERSION = "1.6.33"' in s
assert 'NATIONAL_OUTLOOK_ENGINE = "metno-gfs-mb-v8-element-policy"' in s
# Nationwide must actually fetch selective MB and pass it into the element-policy merge.
assert 'mb=_national_meteoblue_results(date_text,mb_points)' in s
assert '_national_merge_two_models(p,metno.get(p["name"]),gfs.get(p["name"]),mb.get(p["name"]))' in s
assert 'meteoblueFetchedCount' in s and 'meteoblueUsedCount' in s
# Waypoint analysis must fetch MB in the first visible three-model pass and retain it in fallback blending.
assert 'async function analyzeFallbackThreeBatch' in a
block=a[a.index('async function analyzeFallbackThreeBatch'):a.index('async function analyzeIndependentSupportBatch')]
assert 'fetchMeteoblueFallback(point)' in block
blend=a[a.index('function blendProviderRowsSingleGroup'):a.index('function dualEnsembleAgreement')]
assert "rowForProvider(providerRows,'meteoblue')" in blend
assert 'out.gust=Number.isFinite(met?.gust)?met.gust:Number.isFinite(mb?.gust)?mb.gust:NaN;' in blend
assert "median([met.wind,gfs.wind,mb.wind])" in blend
assert "median([met.rain,gfs.rain,mb.rain])" in blend
assert 'meteoblue ${initialMeteoblueCount}/${points.length}地点' in a
# Open-Meteo ordering/circuit from 1.6.32 must stay intact.
assert 'const OPEN_METEO_BLOCK_MS=60*60*1000;' in a
assert a.index('let latestResults=await analyzeFallbackThreeBatch') < a.index('const preferredProbeId=',a.index('async function analyze(){'))
print('PASS V1.6.33 guard')
