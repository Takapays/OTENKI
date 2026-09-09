from pathlib import Path
root=Path(__file__).resolve().parent
a=(root/'app.js').read_text(); s=(root/'server.py').read_text()
assert "const APP_VERSION = '1.6.32';" in a
assert 'APP_VERSION = "1.6.32"' in s
assert 'async function analyzeFallbackThreeBatch' in a
assert 'let latestResults=await analyzeFallbackThreeBatch' in a
assert 'Open-Meteoは後追い更新' in a
assert 'const OPEN_METEO_BLOCK_MS=60*60*1000;' in a
assert a.index('let latestResults=await analyzeFallbackThreeBatch') < a.index('const preferredProbeId=',a.index('async function analyze(){'))
print('PASS V1.6.32 guard')
