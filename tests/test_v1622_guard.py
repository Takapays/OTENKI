from pathlib import Path
import re, subprocess, json
root=Path(__file__).resolve().parents[1]
idx=(root/'index.html').read_text(encoding='utf-8')
app=(root/'app.js').read_text(encoding='utf-8')
server=(root/'server.py').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.22';" in app
assert 'APP_VERSION = "1.6.22"' in server
# Requested UI removals.
assert 'class="top-value-flow"' not in idx
assert 'id="mountainCount"' not in idx
assert "const countEl=$('mountainCount');" in app
# Hourly A-E strip and thresholds.
for token in ['function nationalHourlyGradeForValues','function nationalHourlyGradeRows','function nationalHourlyGradeHtml','時間別 A〜E','grade-b','grade-c','grade-d','grade-e']:
    assert token in app or token in idx
for threshold in ['rankFor(w,5,7,9,15)','rankFor(g,12,15,18,25)','rankFor(r,0.1,0.5,1.5,6)']:
    assert threshold in app
assert "if(modelGrades.includes('E'))grade='E';" in app
assert "else if(modelGrades.includes('D')&&grade!=='E')grade='D';" in app
# Existing chart specs retained.
assert "nationalModelChartSvg(rows,'wind','風速','m/s',7)" in app
assert "nationalModelChartSvg(rows,'gust','突風','m/s',15)" in app
assert "nationalModelChartSvg(rows,'rain','降水','mm/h',7,'bars')" in app
# Existing colors retained.
assert '.national-hourly-grade-dot.grade-b{background:#4f8f3a}' in idx
assert '.national-hourly-grade-dot.grade-c{background:#b08a19}' in idx
# No change to server national grade thresholds beyond version bump.
assert 'if extreme_hours >= 1:' in server
assert 'if severe_hours >= 2:' in server
assert 'if severe_hours >= 1 or caution_hours >= 2:' in server
assert 'if caution_hours >= 1:' in server
print('V1.6.22 guard: PASS')
