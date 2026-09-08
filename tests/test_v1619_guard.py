from pathlib import Path
root=Path(__file__).resolve().parents[1]
idx=(root/'index.html').read_text(encoding='utf-8')
app=(root/'app.js').read_text(encoding='utf-8')
server=(root/'server.py').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.19';" in app
assert 'APP_VERSION = "1.6.19"' in server
assert '.national-five-legend .grade-b{background:#4f8f3a}' in idx
assert '.national-five-legend .grade-c{background:#b08a19}' in idx
assert '.national-marker.grade-b,.national-nearby-grade.grade-b,.national-rich-grade.grade-b{background:#4f8f3a!important;color:#fff!important}' in idx
assert '.national-marker.grade-c,.national-nearby-grade.grade-c,.national-rich-grade.grade-c{background:#b08a19!important;color:#fff!important}' in idx
print('V1.6.19 guard: PASS')
