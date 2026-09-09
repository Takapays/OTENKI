from pathlib import Path
root=Path(__file__).resolve().parents[1]
idx=(root/'index.html').read_text(encoding='utf-8')
app=(root/'app.js').read_text(encoding='utf-8')
server=(root/'server.py').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.23';" in app
assert 'APP_VERSION = "1.6.23"' in server
# Hourly grade logic is retained verbatim in substance.
for token in ['function nationalHourlyGradeForValues','function nationalHourlyGradeRows','function nationalHourlyGradeHtml',"if(modelGrades.includes('E'))grade='E';","else if(modelGrades.includes('D')&&grade!=='E')grade='D';"]:
    assert token in app
for threshold in ['rankFor(w,5,7,9,15)','rankFor(g,12,15,18,25)','rankFor(r,0.1,0.5,1.5,6)']:
    assert threshold in app
# User-requested presentation: no explanatory sentence, mobile stays one 10-slot row.
assert '時間別は中心値で判定し' not in app
assert '日全体の判定は継続時間も加味' not in app
mobile='@media(max-width:760px){.national-hourly-grades{padding:9px 6px;border-radius:16px}.national-hourly-grades-head{margin-bottom:7px}.national-hourly-grades-head strong{font-size:15px}.national-hourly-grade-grid{grid-template-columns:repeat(10,minmax(0,1fr));gap:2px}'
assert mobile in idx
# Existing chart specs/colors retained.
assert "nationalModelChartSvg(rows,'wind','風速','m/s',7)" in app
assert "nationalModelChartSvg(rows,'gust','突風','m/s',15)" in app
assert "nationalModelChartSvg(rows,'rain','降水','mm/h',7,'bars')" in app
assert '.national-hourly-grade-dot.grade-b{background:#4f8f3a}' in idx
assert '.national-hourly-grade-dot.grade-c{background:#b08a19}' in idx
# Daily national grading server logic unchanged.
assert 'if extreme_hours >= 1:' in server
assert 'if severe_hours >= 2:' in server
assert 'if severe_hours >= 1 or caution_hours >= 2:' in server
assert 'if caution_hours >= 1:' in server
print('V1.6.23 guard: PASS')
