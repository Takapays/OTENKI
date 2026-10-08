from pathlib import Path
import re
app=Path('app.js').read_text(encoding='utf-8')
server=Path('server.py').read_text(encoding='utf-8')

# Curated priority groups: first 75 are explicit, the final 25 are the remaining 百名山.
m=re.search(r'const NATIONAL_OUTLOOK_PRIORITY_GROUPS=Object\.freeze\(\[(.*?)\]\);\nconst NATIONAL_OUTLOOK_PRIORITY_ORDER',app,re.S)
assert m
body=m.group(1)
groups=re.findall(r'Object\.freeze\(\[(.*?)\]\)',body,re.S)
assert len(groups)==3
parsed=[re.findall(r"'([^']+)'",g) for g in groups]
assert all(len(g)==25 for g in parsed)
flat=[x for g in parsed for x in g]
assert len(flat)==75 and len(set(flat))==75
expected_first10=['槍ヶ岳','奥穂高岳','剱岳','立山','白馬岳','薬師岳','木曽駒ヶ岳','御嶽','北岳','甲斐駒ヶ岳']
assert parsed[0][:10]==expected_first10
for name in ['富士山','八ヶ岳（赤岳）','谷川岳','利尻山','大雪山（旭岳）','白山','大山（鳥取）','石鎚山','久住山']:
    assert name in parsed[0]

h=re.search(r'const JAPAN_100_MOUNTAINS = new Set\(\[(.*?)\]\);',app,re.S)
assert h
hundred=re.findall(r"'([^']+)'",h.group(1))
assert len(hundred)==100 and len(set(hundred))==100
assert set(flat).issubset(set(hundred))
assert len([n for n in hundred if n not in set(flat)])==25

# Browser does 25-mountain requests and merges each response into the existing map.
assert 'nationalOutlookRefreshBatches(eligible,25)' in app
assert 'date,points:batch,forceRefresh:true' in app
assert 'forceRefreshNames' not in app
assert 'for(const p of batch)nationalOutlookResults.delete(p.name);' in app
assert 'for(const row of (data.results||[]))nationalOutlookResults.set(row.name,row);' in app
assert '主要山25座の最新判定を表示しました。' in app

# This avoids four repeated full-100 Supabase reads: each progressive request is only 25 points.
assert 'forceRefreshNames' not in server

# MET Norway / deterministic GFS / JMA start together; GEFS and meteoblue remain stage 2.
fetch=re.search(r'def _national_fetch_shared\(.*?\n(?=def _national_response)',server,re.S)
assert fetch
block=fetch.group(0)
assert 'ThreadPoolExecutor(max_workers=3,thread_name_prefix="traten-national-base")' in block
assert 'for k in ("metno","gfs","jma")' in block
assert 'national_base_parallel' in block
assert block.index('ThreadPoolExecutor(max_workers=3') < block.index('gefs_points=[]') < block.index('mb_points=')
print('V1.6.104 progressive priority/parallel checks: PASS')
