#!/usr/bin/env python3
from __future__ import annotations
import argparse, csv, json, re
from pathlib import Path

TRAIL_WORDS = r'trailhead|登山口|下山口|登山道入口|登山道入り口|駐車場|バス停|停留所|駅前|五合目|八合目|峠|温泉|ロープウェイ|ロープウエイ|山麓駅|山頂駅'

def norm(s:str)->str:
    s=re.sub(r'\s+','',s or '')
    s=re.sub(r'[（(][^）)]*[）)]','',s)
    s=s.strip('●○・▶▷-　 ')
    s=s.replace('ヶ','ケ').replace('ヵ','カ')
    s=s.replace('ロープウエイ','ロープウェイ')
    s=re.sub(r'(登山口|登山道入口|登山道入り口|駐車場|駐車スペース|バス停|駅前|停留所)$','',s)
    return s

def load_access(path:Path):
    text=path.read_text(encoding='utf-8',errors='ignore')
    names=[]; aliases=[]
    pat=re.compile(r'add\("([^"]+)".*?\[(.*?)\],\s*\[',re.S)
    for m in pat.finditer(text):
        name=m.group(1); names.append(name)
        aliases.extend(re.findall(r'"([^"]+)"',m.group(2)))
    lookup={norm(x):x for x in names+aliases if norm(x)}
    return names, lookup

def extract_candidates(text:str):
    """Extract actual trailhead candidate names from Traten JS objects.

    Prefer explicit objects with type:'trailhead' and name:'...'.
    This avoids counting CT comments, route labels, source citations and UI strings.
    """
    out=set()
    # Common current form: {id:'...',type:'trailhead',name:'...',...}
    for m in re.finditer(r"\{[^{}]{0,1200}?type\s*:\s*[\"\']trailhead[\"\'][^{}]{0,1200}?name\s*:\s*[\"\']([^\"\']+)[\"\']", text, re.I|re.S):
        out.add(m.group(1).strip())
    # Also support name before type.
    for m in re.finditer(r"\{[^{}]{0,1200}?name\s*:\s*[\"\']([^\"\']+)[\"\'][^{}]{0,1200}?type\s*:\s*[\"\']trailhead[\"\']", text, re.I|re.S):
        out.add(m.group(1).strip())
    return sorted(x for x in out if 1 < len(x) < 100)

def main():
    ap=argparse.ArgumentParser(description='Audit Traten trailhead access coverage')
    ap.add_argument('sources', nargs='*', default=['app.js'], help='app.js and/or other source files')
    ap.add_argument('--access-data', default='access-data.js')
    ap.add_argument('--out', default='ACCESS_COVERAGE_REPORT.md')
    ap.add_argument('--missing-out', default='ACCESS_MISSING_ONLY.txt')
    ap.add_argument('--csv-out', default='ACCESS_COVERAGE.csv')
    args=ap.parse_args()
    access=Path(args.access_data)
    if not access.exists(): raise SystemExit(f'not found: {access}')
    names,lookup=load_access(access)
    candidates=set(); used=[]
    for src in args.sources:
        p=Path(src)
        if not p.exists():
            continue
        used.append(str(p))
        candidates.update(extract_candidates(p.read_text(encoding='utf-8',errors='ignore')))
    candidates=sorted(candidates)
    covered=[]; missing=[]
    for x in candidates:
        hit=lookup.get(norm(x))
        (covered if hit else missing).append((x,hit))
    lines=['# トラテン 登山口アクセス網羅性レポート','',f'- 監査対象: **{", ".join(used) if used else "なし"}**',f'- 候補抽出: **{len(candidates)}地点**',f'- アクセスDB登録: **{len(names)}地点**',f'- 一致: **{len(covered)}地点**',f'- 未一致: **{len(missing)}地点**','','## 未一致（要確認）','']
    lines += [f'- {x}' for x,_ in missing] if missing else ['- なし']
    lines += ['', '## 一致済み','']
    lines += [f'- {x} → {hit}' for x,hit in covered]
    lines += ['', '> 監査はソースコードから候補名をヒューリスティック抽出します。未一致は「アクセス情報なし」と表示される候補として優先確認してください。','']
    Path(args.out).write_text('\n'.join(lines),encoding='utf-8')
    Path(args.missing_out).write_text('\n'.join(x for x,_ in missing)+('\n' if missing else ''),encoding='utf-8')
    with Path(args.csv_out).open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.writer(f); w.writerow(['candidate','status','matched_access_name'])
        for x,hit in covered: w.writerow([x,'covered',hit])
        for x,_ in missing: w.writerow([x,'missing',''])
    print(json.dumps({'sources':used,'candidates':len(candidates),'db':len(names),'covered':len(covered),'missing':len(missing),'report':args.out,'missing_only':args.missing_out,'csv':args.csv_out},ensure_ascii=False))
if __name__=='__main__': main()
