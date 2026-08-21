#!/usr/bin/env python3
from pathlib import Path
import re

text=Path(__file__).with_name('app.js').read_text(encoding='utf-8')
# Japan 300 list
m=re.search(r'const JAPAN_300_MOUNTAINS\s*=\s*\[(.*?)\];',text,re.S)
mountains=re.findall(r'"([^"]+)"',m.group(1)) if m else []
# Any object array keyed by mountain containing at least one resolved trailhead
resolved=set()
for mm in re.finditer(r"'([^']+)'\s*:\s*\[(.*?)\]\s*,?",text,re.S):
    name,body=mm.group(1),mm.group(2)
    if "type:'trailhead'" in body and re.search(r'lat:\s*-?\d',body) and re.search(r'lon:\s*-?\d',body):
        resolved.add(name)
# Regional mappings also provide resolved trailheads to their mountains
regions={}
for mm in re.finditer(r"'([^']+)'\s*:\s*'([^']+)'", re.search(r'const MOUNTAIN_REGION\s*=\s*\{(.*?)\};',text,re.S).group(1)):
    regions[mm.group(1)]=mm.group(2)
region_has=set()
regblock=re.search(r'const REGIONAL_CATALOG\s*=\s*\{(.*?)\n\};',text,re.S)
if regblock:
    for mm in re.finditer(r'(\w+)\s*:\s*\[(.*?)\]\s*,?',regblock.group(1),re.S):
        if "type:'trailhead'" in mm.group(2) and 'lat:' in mm.group(2) and 'lon:' in mm.group(2): region_has.add(mm.group(1))
for name,key in regions.items():
    if key in region_has: resolved.add(name)
aliases={'八ヶ岳（赤岳）':'赤岳','宮ノ浦岳':'宮之浦岳','御嶽':'御嶽山'}
covered=[m for m in mountains if m in resolved or aliases.get(m) in resolved]
missing=[m for m in mountains if not (m in resolved or aliases.get(m) in resolved)]
print(f'Japan 300 fixed/resolved trailhead coverage: {len(covered)}/{len(mountains)}')
print('\nMissing fixed coordinates:')
for x in missing: print('-',x)
