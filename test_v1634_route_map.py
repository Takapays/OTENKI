from pathlib import Path
root=Path(__file__).resolve().parent
a=(root/'app.js').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.34';" in a
block=a[a.index('function fitRouteMapToPoints'):a.index('function renderSingleRouteMap')]
assert "state.map.fitBounds(bounds,{padding:mobile?[20,20]:[28,28],maxZoom:13,animate:false});" in block
assert 'state.map.setView(bounds.getCenter()' not in block
risk=a[a.index('function routeRiskGrade'):a.index('function routeMapLineGeometry')]
assert "if(g==='A')return 'A';" in risk
assert "if(g==='B')return 'B';" in risk
assert "if(['C','D','E'].includes(g))return 'C';" in risk
assert 'gradeRank(g)>gradeRank(worst)' in risk
print('PASS V1.6.34 route map guard')
