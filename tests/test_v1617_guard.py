from pathlib import Path
from datetime import date
import sys
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
import instagram_bot as ib
ig=(ROOT/'instagram_bot.py').read_text(encoding='utf-8')
sv=(ROOT/'server.py').read_text(encoding='utf-8')
assert 'master-20260908-scenes-v13-yarigatake-live' in ig
assert '_build_reel_yarigatake_scene' in ig
assert '_instagram_load_yarigatake_detail' in sv
assert '_reel_yarigatake_scene_path' not in ig
assert 'reel_master_scene2_yarigatake.png' not in ig
assert 'concat=n=3:v=1:a=0' in ig
assert 'out_paths=[static_image_cache_path(date_text,1), static_image_cache_path(date_text,2)]' in ig
assert 'A：{counts.get(\'A\', 0)}座' in ig and 'E：{counts.get(\'E\', 0)}座' in ig
# Synthetic dynamic scene: only gust + rain; no fixed screenshot dependency.
hours=list(range(6,16))
met=[{'hour':h,'gust':5+i,'rain':i*0.4} for i,h in enumerate(hours)]
gfs=[{'hour':h,'gust':4+i,'rain':i*0.25} for i,h in enumerate(hours)]
detail={'merged':{'grade':'C'},'models':{'metno':{'series':met},'gfs':{'series':gfs}}}
im=ib._build_reel_yarigatake_scene(date(2026,9,9),detail,864,1536)
assert im.size==(864,1536)
im.close()
# Incomplete hourly data must fail instead of silently reusing a fixed/stale image.
try:
    ib._build_reel_yarigatake_scene(date(2026,9,9),{'merged':{'grade':'A'},'models':{}},864,1536)
    raise AssertionError('incomplete data should fail')
except RuntimeError:
    pass
print('V1.6.17 guard: PASS')
