from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
server=(ROOT/'server.py').read_text(encoding='utf-8')
app=(ROOT/'app.js').read_text(encoding='utf-8')
idx=(ROOT/'index.html').read_text(encoding='utf-8')
poc=(ROOT/'poc-models.html').read_text(encoding='utf-8')
assert 'APP_VERSION = "1.6.26"' in server
assert "const APP_VERSION = '1.6.26';" in app
assert 'V1.6.26' in idx
assert "'poc-models.html'" in server
assert 'MET Norway / NOAA GFS / meteoblue' in poc
for name in ['富士山','北岳','奥穂高岳','槍ヶ岳','白馬岳']:
    assert name in poc
for h in range(6,16):
    assert 'h<=15' in poc or 'h<6||h>15' in poc
assert "function grade(w,g,r)" in poc
for token in [">=15",">=25",">=6",">=9",">=18",">=1.5",">=7",">=0.5",">=5",">=12",">=0.1"]:
    assert token in poc
assert '3モデル中央値' in poc
assert 'MET↔GFS判定差' in poc
assert '本番判定ではありません' in poc
print('V1.6.26 PoC static checks: PASS')
