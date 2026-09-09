from pathlib import Path
import importlib.util
from datetime import date
root=Path(__file__).resolve().parents[1]
app=(root/'app.js').read_text(encoding='utf-8')
server=(root/'server.py').read_text(encoding='utf-8')
idx=(root/'index.html').read_text(encoding='utf-8')
bot=(root/'instagram_bot.py').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.24';" in app
assert 'APP_VERSION = "1.6.24"' in server
assert 'app.js?v=1.6.24' in idx
# Web hourly logic unchanged.
for token in ['function nationalHourlyGradeForValues','function nationalHourlyGradeRows','function nationalHourlyGradeHtml',"if(modelGrades.includes('E'))grade='E';","else if(modelGrades.includes('D')&&grade!=='E')grade='D';"]:
    assert token in app
for threshold in ['rankFor(w,5,7,9,15)','rankFor(g,12,15,18,25)','rankFor(r,0.1,0.5,1.5,6)']:
    assert threshold in app
# Reel scene now contains hourly strip and same thresholds/D-E floor.
for token in ['def _reel_hourly_grade_for_values','def _reel_hourly_grades','def _draw_reel_hourly_grade_strip',"rank_for(wind,5,7,9,15)","rank_for(gust,12,15,18,25)","rank_for(rain,0.1,0.5,1.5,6)","if 'E' in model_grades: grade='E'","elif 'D' in model_grades and grade != 'E': grade='D'","_draw_reel_hourly_grade_strip(d,(24,252,W-24,370),hours,met,gfs)"]:
    assert token in bot
assert 'master-20260909-scenes-v15-yarigatake-hourly-grades' in bot
# Instagram detail remains dynamic, not a fixed screenshot.
assert "yarigatake_detail=_instagram_load_yarigatake_detail(date_text)" in server
# Daily national grading unchanged.
for token in ['if extreme_hours >= 1:','if severe_hours >= 2:','if severe_hours >= 1 or caution_hours >= 2:','if caution_hours >= 1:']:
    assert token in server
# Functional threshold checks.
spec=importlib.util.spec_from_file_location('instagram_bot_test',root/'instagram_bot.py')
m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
assert m._reel_hourly_grade_for_values(4.9,11.9,0.0)=='A'
assert m._reel_hourly_grade_for_values(5.0,11.0,0.0)=='B'
assert m._reel_hourly_grade_for_values(7.0,14.0,0.0)=='C'
assert m._reel_hourly_grade_for_values(9.0,17.0,0.0)=='D'
assert m._reel_hourly_grade_for_values(15.0,17.0,0.0)=='E'
met={6:{'wind':3,'gust':8,'rain':0},7:{'wind':3,'gust':8,'rain':0}}
gfs={6:{'wind':15,'gust':8,'rain':0},7:{'wind':9,'gust':8,'rain':0}}
grades=dict(m._reel_hourly_grades([6,7],met,gfs))
assert grades[6]=='E' and grades[7]=='D'
print('V1.6.24 guard: PASS')
