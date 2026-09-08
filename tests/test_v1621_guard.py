from pathlib import Path
root=Path(__file__).resolve().parents[1]
idx=(root/'index.html').read_text(encoding='utf-8')
app=(root/'app.js').read_text(encoding='utf-8')
server=(root/'server.py').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.21';" in app
assert 'APP_VERSION = "1.6.21"' in server
assert 'class="nm-axis nm-axis-y"' in app
assert 'class="nm-axis nm-axis-x"' in app
assert 'const W=620,H=240,pl=56,pr=18,pt=22,pb=48' in app
assert '.national-model-section-simple .nm-axis{font-size:15px;font-weight:900;fill:#263238}' in idx
assert '.national-model-section-simple .nm-axis-x{font-size:15px}' in idx
assert '.national-model-section-simple .nm-axis-y{font-size:15px}' in idx
assert '.national-model-section-simple .nm-axis{font-size:14px;font-weight:900;fill:#263238}' in idx
# V1.6.20 layout/colors retained.
assert '.national-map-legend-overlay{display:none!important}' in idx
assert '.national-map-legend-mobile span{width:14px;height:14px;font-size:7px' in idx
assert '#nationalOutlookDetail.is-open .national-detail-scroll-body{flex:1 1 auto;min-height:0;overflow-y:auto' in idx
assert '#nationalOutlookDetail.is-open .national-rich-hero{flex:0 0 auto!important' in idx
assert '.national-five-legend .grade-b{background:#4f8f3a}' in idx
assert '.national-five-legend .grade-c{background:#b08a19}' in idx
assert '.national-marker.grade-b,.national-nearby-grade.grade-b,.national-rich-grade.grade-b{background:#4f8f3a!important;color:#fff!important}' in idx
assert '.national-marker.grade-c,.national-nearby-grade.grade-c,.national-rich-grade.grade-c{background:#b08a19!important;color:#fff!important}' in idx
print('V1.6.21 guard: PASS')
