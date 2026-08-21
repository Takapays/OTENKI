#!/usr/bin/env python3
from pathlib import Path
import re

text = Path(__file__).with_name('app.js').read_text(encoding='utf-8')

m = re.search(r'const JAPAN_300_MOUNTAINS\s*=\s*\[(.*?)\];', text, re.S)
mountains = re.findall(r'"([^"]+)"', m.group(1)) if m else []


def array_blocks(name):
    blocks = []
    pat = re.compile(re.escape("'" + name + "'") + r'\s*:\s*\[')
    pat2 = re.compile(re.escape('"' + name + '"') + r'\s*:\s*\[')
    for match in list(pat.finditer(text)) + list(pat2.finditer(text)):
        start = match.end() - 1
        depth = 0
        quote = None
        escaped = False
        for i in range(start, len(text)):
            c = text[i]
            if quote is not None:
                if escaped:
                    escaped = False
                elif c == '\\':
                    escaped = True
                elif c == quote:
                    quote = None
                continue
            if c in "'\"`":
                quote = c
            elif c == '[':
                depth += 1
            elif c == ']':
                depth -= 1
                if depth == 0:
                    blocks.append(text[start:i + 1])
                    break
    return blocks

aliases = {
    '八ヶ岳（赤岳）': '赤岳',
    '宮ノ浦岳': '宮之浦岳',
    '御嶽': '御嶽山',
}

resolved = set()
for mountain in mountains:
    names = [mountain]
    if mountain in aliases:
        names.append(aliases[mountain])
    for name in names:
        for body in array_blocks(name):
            if "type:'trailhead'" in body or 'type:"trailhead"' in body:
                if re.search(r'lat:\s*-?\d', body) and re.search(r'lon:\s*-?\d', body):
                    resolved.add(mountain)
                    break
        if mountain in resolved:
            break

covered = [x for x in mountains if x in resolved]
missing = [x for x in mountains if x not in resolved]
print(f'Japan 300 fixed/resolved trailhead coverage: {len(covered)}/{len(mountains)}')
print('\nMissing fixed coordinates:')
for x in missing:
    print('-', x)
