from pathlib import Path
from datetime import date
import sys
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
import instagram_bot as ib
ig=(ROOT/'instagram_bot.py').read_text(encoding='utf-8')
app=(ROOT/'app.js').read_text(encoding='utf-8')
idx=(ROOT/'index.html').read_text(encoding='utf-8')
assert "APP_VERSION = '1.6.18'" in app
assert 'master-20260908-scenes-v14-yarigatake-live-alps-thin' in ig
assert '_reel_scene1_display_rows' in ig
assert '_render_japan_map(_reel_scene1_display_rows(rows),W,1515)' in ig
assert 'national-model-section-simple' in app
assert '時間別予測' in app and 'MET Norway × NOAA GFS' in app
assert 'national-model-status ${agreement}' not in app
assert 'national-model-note' not in app.split('function nationalModelDetailHtml',1)[1].split('}',1)[0]
assert "nationalModelChartSvg(rows,'wind','風速','m/s',7)" in app
assert "nationalModelChartSvg(rows,'gust','突風','m/s',15)" in app
assert "nationalModelChartSvg(rows,'rain','降水','mm/h',7,'bars')" in app
assert 'H=230' in app
assert 'national-model-simple-head' in idx
# Display-only thinning: only in Alps box and approximately half.
rows=[]
for i in range(10):
    rows.append({'name':f'Alps{i:02d}','lat':36.0+i*0.01,'lon':137.8,'grade':'A'})
for i in range(5):
    rows.append({'name':f'Other{i:02d}','lat':43.0,'lon':142.0,'grade':'B'})
out=ib._reel_scene1_display_rows(rows)
assert len([r for r in out if r['name'].startswith('Alps')])==5
assert len([r for r in out if r['name'].startswith('Other')])==5
# Source collection must not be mutated.
assert len(rows)==15
print('V1.6.18 guard: PASS')
