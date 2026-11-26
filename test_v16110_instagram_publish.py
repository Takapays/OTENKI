from pathlib import Path
root=Path(__file__).resolve().parent
s=(root/'server.py').read_text(encoding='utf-8')
a=(root/'app.js').read_text(encoding='utf-8')
i=(root/'index.html').read_text(encoding='utf-8')
assert 'APP_VERSION = "1.6.117"' in s
assert "const APP_VERSION = '1.6.117';" in a
assert 'app.js?v=1.6.117' in i
assert 'rows = _instagram_load_best_100_results(date_text, prefer_fresh=True)' in s
assert 'week = _instagram_load_week_100_results(date_text)' in s
assert 'load_carousel_results=_instagram_carousel_result_loader(date_text, week)' in s
manual=s.split('@app.post("/api/instagram/post-national")',1)[1].split('@app.post("/api/national-outlook")',1)[0]
assert '_instagram_load_fresh_100_results(date_text)' not in manual
assert 'return jsonify(ok=False, error="fresh nationwide cache is incomplete"' not in manual
print('V1.6.117 Instagram manual publish regression: PASS')
