from pathlib import Path
root=Path(__file__).resolve().parents[1]
idx=(root/'index.html').read_text(encoding='utf-8')
app=(root/'app.js').read_text(encoding='utf-8')
server=(root/'server.py').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.20';" in app
assert 'APP_VERSION = "1.6.20"' in server
# Mobile legend is outside the map and materially smaller than V1.6.19.
map_pos=idx.index('id="nationalOutlookMap"')
mobile_legend_pos=idx.index('national-map-legend-mobile', map_pos)
aside_pos=idx.index('id="nationalOutlookDetail"', mobile_legend_pos)
assert map_pos < mobile_legend_pos < aside_pos
assert '.national-map-legend-overlay{display:none!important}' in idx
assert '.national-map-legend-mobile span{width:14px;height:14px;font-size:7px' in idx
# Desktop: hero first, then one independently scrollable body containing the graph.
fn=app[app.index('function showNationalOutlookDetail'):app.index('function ', app.index('function showNationalOutlookDetail')+10)]
assert fn.index('national-rich-hero') < fn.index('national-detail-scroll-body') < fn.index('national-model-slot-desktop') < fn.index('national-rich-content')
assert '#nationalOutlookDetail.is-open .national-detail-scroll-body{flex:1 1 auto;min-height:0;overflow-y:auto' in idx
assert '#nationalOutlookDetail.is-open .national-rich-hero{flex:0 0 auto!important' in idx
# Existing B/C display colors remain identical to the legend.
assert '.national-five-legend .grade-b{background:#4f8f3a}' in idx
assert '.national-five-legend .grade-c{background:#b08a19}' in idx
assert '.national-marker.grade-b,.national-nearby-grade.grade-b,.national-rich-grade.grade-b{background:#4f8f3a!important;color:#fff!important}' in idx
assert '.national-marker.grade-c,.national-nearby-grade.grade-c,.national-rich-grade.grade-c{background:#b08a19!important;color:#fff!important}' in idx
print('V1.6.20 guard: PASS')
