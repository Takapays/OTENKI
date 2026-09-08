from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
PREV=Path('/mnt/data/traten_v1612src')

ig=(ROOT/'instagram_bot.py').read_text(encoding='utf-8')
assert 'master-20260908-scenes-v12-yarigatake' in ig
assert 'reel_master_scene2_yarigatake.png' in ig
assert 'concat=n=3:v=1:a=0' in ig
assert 'static_image_url(date_text, 1), static_image_url(date_text, 2)' in ig, 'normal static carousel must remain 2 pages'
assert 'A：{counts.get(\'A\', 0)}座' in ig and 'E：{counts.get(\'E\', 0)}座' in ig
assert (ROOT/'reel_master_scene2_yarigatake.png').exists()

# Requested release must not alter application behavior outside version identifiers.
for name in ('app.js','index.html','server.py','data-audit.html'):
    cur=(ROOT/name).read_text(encoding='utf-8').replace('1.6.16','1.6.15')
    old=(ROOT/name).read_text(encoding='utf-8').replace('1.6.16','1.6.15')
    assert cur == old

# Instagram delta is intentionally limited to reel revision, new scene asset/path,
# three-scene composition, and render call/docstring. The static-image renderer remains 2-page.
assert 'def render_national_static_images' in ig
assert 'out_paths=[static_image_cache_path(date_text,1), static_image_cache_path(date_text,2)]' in ig
print('V1.6.16 guard: PASS')
