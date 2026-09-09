from pathlib import Path
from datetime import date
import importlib.util, re
root=Path(__file__).resolve().parent
a=(root/'app.js').read_text(encoding='utf-8')
s=(root/'server.py').read_text(encoding='utf-8')
b=(root/'instagram_bot.py').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.36';" in a
assert 'APP_VERSION = "1.6.36"' in s
assert 'REEL_RENDER_REV = "master-20260909-scenes-v16-yarigatake-phone-frame"' in b
assert 'def _wrap_reel_scene_in_phone' in b
assert 'return _wrap_reel_scene_in_phone(frame,W,H)' in b
# Preserve current scene-2 content: dynamic Yarigatake grade + hourly strip + gust/rain panels + CTA.
for token in ["'槍ヶ岳'","_draw_reel_hourly_grade_strip","'突風'","'降水'","'他の山は'","'トラテンで！'","MET Norway × NOAA GFS"]:
    assert token in b
# Current hourly A-E thresholds remain unchanged.
for token in ["rank_for(wind,5,7,9,15)","rank_for(gust,12,15,18,25)","rank_for(rain,0.1,0.5,1.5,6)","if 'E' in model_grades: grade='E'","elif 'D' in model_grades and grade != 'E': grade='D'"]:
    assert token in b
# Main app's meteoblue/Open-Meteo logic from V1.6.35 remains present.
for token in ['NATIONAL_OUTLOOK_ENGINE = "metno-gfs-mb-v9-element-policy"','mb=_national_fetch_meteoblue_detail(p,date_text)','mb=_national_meteoblue_results(date_text,mb_points)']:
    assert token in s
for token in ["const WEATHER_POINT_CACHE_PREFIX='traten:weather-point:v1635:';",'const OPEN_METEO_BLOCK_MS=60*60*1000;']:
    assert token in a
# Functional phone-frame render on synthetic live detail.
spec=importlib.util.spec_from_file_location('instagram_bot_test',root/'instagram_bot.py')
m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
met=[]; gfs=[]
for h in range(6,16):
    met.append({'hour':h,'wind':2.0,'gust':7.0+(h-6)*0.4,'rain':max(0,(h-10)*0.15)})
    gfs.append({'hour':h,'wind':1.5,'gust':6.0+(h-6)*0.3,'rain':max(0,(h-11)*0.08)})
detail={'merged':{'grade':'C'},'models':{'metno':{'series':met},'gfs':{'series':gfs}}}
im=m._build_reel_yarigatake_scene(date(2026,9,10),detail,864,1536)
assert im.size==(864,1536)
# Outer background and red handset rim prove that the scene is wrapped, not full-bleed.
assert im.getpixel((10,10))[0] > 220
r,g,bl=im.getpixel((55,120))
assert r > 150 and r > g*1.5 and r > bl*1.5
print('PASS V1.6.36 guard')
