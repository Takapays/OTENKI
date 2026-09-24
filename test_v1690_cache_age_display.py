from pathlib import Path

base = Path(__file__).resolve().parent
app = (base / "app.js").read_text(encoding="utf-8")
index = (base / "index.html").read_text(encoding="utf-8")
server = (base / "server.py").read_text(encoding="utf-8")

assert "const APP_VERSION = '1.6.90';" in app
assert 'APP_VERSION = "1.6.90"' in server
assert '>V1.6.90<' in index
assert 'app.js?v=1.6.90' in index

start = app.index("async function loadNationalOutlookSharedCacheOnly")
end = app.index("async function runNationalOutlook", start)
block = app[start:end]
assert "cacheOnly:true" in block
assert "data.cache?.ageSeconds" in block
assert "data.cache?.freshRemainingSeconds" in block
assert "キャッシュ年齢 約${ageMin}分" in block
assert "4時間TTL残り" in block

print("V1.6.90 cache-age display regression checks: PASS")
