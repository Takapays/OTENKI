#!/usr/bin/env python3
"""Audit mapped water sources for Japan 300 mountains using existing fixed route points.

V1.4.240: incremental rotating audit; one mountain per request in Actions to reduce Overpass query size.
- never guesses coordinates
- groups several mountains into one Overpass request
- bounded request time and endpoint fallback
- resumable; checked mountains are skipped
- failed batches remain unresolved for a later run
- network failures never masquerade as "no water"
"""
from __future__ import annotations
import argparse
import json
import math
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

BASE = Path(__file__).resolve().parent
APP_JS = BASE / "app.js"
OUT = BASE / "water-mountain-cache.json"
ENDPOINTS = [
    "https://overpass.private.coffee/api/interpreter",
    "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
    "https://overpass-api.de/api/interpreter",
]
RADIUS_M = 1400
MAX_CENTERS = 12
MAX_SOURCES = 12
ALIASES = {"八ヶ岳（赤岳）": "赤岳", "宮ノ浦岳": "宮之浦岳", "御嶽": "御嶽山"}


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')


def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    r = 6371000.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp, dl = math.radians(lat2-lat1), math.radians(lon2-lon1)
    a = math.sin(dp/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2
    return 2*r*math.asin(math.sqrt(a))


def array_blocks(text: str, name: str) -> list[str]:
    out: list[str] = []
    pats = [re.compile(re.escape("'" + name + "'") + r"\s*:\s*\["), re.compile(re.escape('"' + name + '"') + r"\s*:\s*\[")]
    for pat in pats:
        for match in pat.finditer(text):
            start = match.end() - 1
            depth = 0; quote = None; escaped = False
            for i in range(start, len(text)):
                c = text[i]
                if quote is not None:
                    if escaped: escaped = False
                    elif c == "\\": escaped = True
                    elif c == quote: quote = None
                    continue
                if c in "'\"`": quote = c
                elif c == '[': depth += 1
                elif c == ']':
                    depth -= 1
                    if depth == 0:
                        out.append(text[start:i+1]); break
    return out


def parse_points(block: str) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    obj_pat = re.compile(r"\{([^{}]{0,900})\}", re.S)
    for m in obj_pat.finditer(block):
        body = m.group(1)
        latm = re.search(r"\blat\s*:\s*(-?\d+(?:\.\d+)?)", body)
        lonm = re.search(r"\blon\s*:\s*(-?\d+(?:\.\d+)?)", body)
        if not latm or not lonm: continue
        namem = re.search(r"\bname\s*:\s*(['\"])(.*?)\1", body, re.S)
        typem = re.search(r"\btype\s*:\s*(['\"])(.*?)\1", body, re.S)
        try: lat, lon = float(latm.group(1)), float(lonm.group(1))
        except ValueError: continue
        rows.append({"name": (namem.group(2).strip() if namem else "通過地点"), "type": (typem.group(2) if typem else ""), "lat": lat, "lon": lon})
    return rows


def load_mountains_and_points() -> tuple[list[str], dict[str, list[dict[str, Any]]]]:
    text = APP_JS.read_text(encoding="utf-8")
    mm = re.search(r"const JAPAN_300_MOUNTAINS\s*=\s*\[(.*?)\];", text, re.S)
    if not mm: raise RuntimeError("JAPAN_300_MOUNTAINS not found")
    mountains = re.findall(r'"([^"]+)"', mm.group(1))
    all_points: dict[str, list[dict[str, Any]]] = {}
    for mountain in mountains:
        candidates = [mountain, ALIASES.get(mountain, "")]
        merged: list[dict[str, Any]] = []
        for key in [x for x in candidates if x]:
            for block in array_blocks(text, key):
                pts = parse_points(block)
                if any(p.get("type") == "trailhead" for p in pts): merged.extend(pts)
            preset_pat = re.compile(re.escape("'" + key + "'") + r"\s*:\s*\{\s*latitude\s*:\s*(-?\d+(?:\.\d+)?)\s*,\s*longitude\s*:\s*(-?\d+(?:\.\d+)?)")
            pm = preset_pat.search(text)
            if pm:
                merged.append({"name": mountain, "type": "peak", "lat": float(pm.group(1)), "lon": float(pm.group(2))})
        dedup: list[dict[str, Any]] = []
        for p in merged:
            if not any(haversine(p["lat"],p["lon"],q["lat"],q["lon"]) < 80 for q in dedup): dedup.append(p)
        all_points[mountain] = dedup[:24]
    return mountains, all_points


def centers(points: list[dict[str, Any]]) -> list[dict[str, Any]]:
    if not points: return []
    raw: list[dict[str, Any]] = []
    for i,p in enumerate(points):
        raw.append(p)
        if i+1 >= len(points): continue
        q=points[i+1]; dist=haversine(p["lat"],p["lon"],q["lat"],q["lon"])
        steps=min(2,max(0,int(dist//5000)))
        for step in range(1,steps+1):
            t=step/(steps+1)
            raw.append({"name":f"{p['name']}〜{q['name']}","type":"between","lat":p["lat"]+(q["lat"]-p["lat"])*t,"lon":p["lon"]+(q["lon"]-p["lon"])*t})
    out=[]
    for p in raw:
        if not any(haversine(p["lat"],p["lon"],q["lat"],q["lon"])<700 for q in out): out.append(p)
    if len(out) <= MAX_CENTERS: return out
    idxs=sorted(set(round(i*(len(out)-1)/(MAX_CENTERS-1)) for i in range(MAX_CENTERS)))
    return [out[i] for i in idxs]


def overpass_batch_query(batch: list[str], points_map: dict[str, list[dict[str, Any]]]) -> str:
    clauses=[]
    for mountain in batch:
        for p in centers(points_map.get(mountain) or []):
            a=f"(around:{RADIUS_M},{p['lat']:.5f},{p['lon']:.5f})"
            clauses += [
                f'nwr["amenity"="drinking_water"]{a};',
                f'nwr["natural"="spring"]{a};',
                f'nwr["man_made"="water_tap"]{a};',
                f'nwr["drinking_water"="yes"]{a};',
            ]
    return '[out:json][timeout:12];(' + ''.join(clauses) + ');out center tags;'


def kind(tags: dict[str, Any]) -> tuple[str,str]:
    amenity=str(tags.get('amenity') or ''); natural=str(tags.get('natural') or ''); man=str(tags.get('man_made') or ''); drinking=str(tags.get('drinking_water') or '').lower()
    if amenity=='drinking_water': return '飲料水','confirmed'
    if man=='water_tap': return '水栓','confirmed' if drinking=='yes' else 'unknown'
    if natural=='spring': return '湧水','confirmed' if drinking=='yes' else ('not_drinking' if drinking=='no' else 'unknown')
    if drinking=='yes': return '給水地点','confirmed'
    return '水場','unknown'


def parse_sources(payload: dict[str,Any], route_points: list[dict[str,Any]]) -> list[dict[str,Any]]:
    rows=[]
    for el in payload.get('elements',[]):
        tags=el.get('tags') or {}; lat=el.get('lat',(el.get('center') or {}).get('lat')); lon=el.get('lon',(el.get('center') or {}).get('lon'))
        try: lat=float(lat); lon=float(lon)
        except (TypeError,ValueError): continue
        best_name='通過地点'; best=float('inf')
        for p in route_points:
            d=haversine(lat,lon,p['lat'],p['lon'])
            if d<best: best=d; best_name=p['name']
        if best>1900: continue
        k,pot=kind(tags); raw=str(tags.get('name:ja') or tags.get('name') or '').strip()
        name=raw or (f"{best_name}付近の{k}")
        rows.append({'name':name,'lat':round(lat,6),'lon':round(lon,6),'kind':k,'potability':pot,'near_point':best_name,'distance_m':int(round(best)),'osm_id':f"{el.get('type','node')}/{el.get('id','')}"})
    ded=[]
    for row in sorted(rows,key=lambda x:(x['distance_m'],0 if x['potability']=='confirmed' else 1)):
        if any(haversine(row['lat'],row['lon'],q['lat'],q['lon'])<80 for q in ded): continue
        ded.append(row)
    return ded[:MAX_SOURCES]


def fetch_batch(batch: list[str], points_map: dict[str,list[dict[str,Any]]], timeout: int=7, attempts: int=2) -> tuple[dict[str,list[dict[str,Any]]],str|None,int]:
    q=overpass_batch_query(batch,points_map)
    if not q: return {}, 'fixed route points unavailable', 0
    last=None
    for attempt in range(max(1,attempts)):
        endpoint=ENDPOINTS[attempt % len(ENDPOINTS)]
        try:
            data=urllib.parse.urlencode({'data':q}).encode('utf-8')
            req=urllib.request.Request(endpoint,data=data,method='POST',headers={'User-Agent':'TratenWaterAudit/1.4.240 (+https://otenki.onrender.com/)','Content-Type':'application/x-www-form-urlencoded'})
            with urllib.request.urlopen(req,timeout=timeout) as r:
                payload=json.loads(r.read().decode('utf-8','replace'))
            return {m:parse_sources(payload,points_map.get(m) or []) for m in batch},None,attempt+1
        except urllib.error.HTTPError as e:
            last=f"{endpoint}: HTTP {e.code}"
        except Exception as e:
            last=f"{endpoint}: {type(e).__name__}: {e}"
        if attempt+1<attempts: time.sleep(1.0)
    return {},last,attempts


def load_previous() -> dict[str, Any]:
    if not OUT.exists(): return {}
    try: return (json.loads(OUT.read_text(encoding='utf-8')).get('mountains') or {})
    except Exception: return {}


def write_cache(mountains: list[str], rows: dict[str,Any]) -> None:
    normalized={m:rows.get(m,{'checked':False,'available':False,'count':0,'sources':[]}) for m in mountains}
    checked=sum(v.get('checked') is True for v in normalized.values())
    available=sum(v.get('available') is True for v in normalized.values())
    payload={
        'schema_version':4,
        'app_version':'1.4.248',
        'generated_at':now_iso(),
        'source':'OpenStreetMap / Overpass API',
        'audit_mode':'incremental-rotating',
        'radius_m':RADIUS_M,
        'mountain_count':len(mountains),
        'checked_count':checked,
        'available_count':available,
        'unresolved_count':len(mountains)-checked,
        'mountains':normalized,
    }
    OUT.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+"\n",encoding='utf-8')


def chunks(items: list[str], n: int):
    for i in range(0,len(items),n): yield items[i:i+n]


def main() -> int:
    ap=argparse.ArgumentParser()
    ap.add_argument('--batch-size',type=int,default=5)
    ap.add_argument('--sleep',type=float,default=0.6)
    ap.add_argument('--timeout',type=int,default=7)
    ap.add_argument('--attempts',type=int,default=2)
    ap.add_argument('--resume',action='store_true')
    ap.add_argument('--errors-only',action='store_true')
    ap.add_argument('--max-batches',type=int,default=0,help='0 = all pending batches')
    ap.add_argument('--max-mountains',type=int,default=0,help='0 = all pending mountains; otherwise process only this many unresolved mountains')
    ap.add_argument('--dry-run',action='store_true')
    args=ap.parse_args()

    mountains,points_map=load_mountains_and_points()
    rows=load_previous() if (args.resume or args.errors_only) else {}
    if args.dry_run:
        missing=[m for m in mountains if not points_map.get(m)]
        print(f'Japan 300 audit route points: {len(mountains)-len(missing)}/{len(mountains)}')
        if missing: print('Missing:', ', '.join(missing)); return 1
        print('Dry-run OK: no network requests were sent.'); return 0

    if args.errors_only or args.resume:
        # V1.4.236: rotate unresolved mountains by oldest attempt first.
        # This prevents the same failing mountains at the head of the list from
        # starving later unresolved mountains forever. Confirmed rows are never re-queried.
        unresolved=[m for m in mountains if rows.get(m,{}).get('checked') is not True]
        order={m:i for i,m in enumerate(mountains)}
        def retry_key(m):
            row=rows.get(m,{}) or {}
            stamp=str(row.get('checked_at') or '')
            # Never-attempted rows sort first; then oldest attempted rows.
            return (0 if not stamp else 1, stamp, order[m])
        candidates=sorted(unresolved,key=retry_key)
    else:
        candidates=list(mountains)

    if args.max_mountains>0:
        candidates=candidates[:max(1,args.max_mountains)]

    bsize=min(8,max(1,args.batch_size))
    batches=list(chunks(candidates,bsize))
    if args.max_batches>0: batches=batches[:args.max_batches]
    total=len(batches)

    for bi,batch in enumerate(batches,1):
        label=' / '.join(batch)
        result,error,used=fetch_batch(batch,points_map,timeout=max(3,args.timeout),attempts=max(1,args.attempts))
        if error is None:
            for m in batch:
                sources=result.get(m,[])
                rows[m]={'checked':True,'available':bool(sources),'count':len(sources),'sources':sources,'attempts':used,'checked_at':now_iso()}
            counts=', '.join(f"{m}:{len(result.get(m,[]))}" for m in batch)
            print(f"[batch {bi:02}/{total:02}] OK  {counts}",flush=True)
        else:
            for m in batch:
                prev=rows.get(m,{})
                rows[m]={'checked':False,'available':bool(prev.get('sources')),'count':len(prev.get('sources') or []),'sources':prev.get('sources') or [],'attempts':used,'checked_at':now_iso(),'error':error[:280]}
            print(f"[batch {bi:02}/{total:02}] ERR {label} :: {error}",flush=True)
        write_cache(mountains,rows)
        if args.sleep: time.sleep(args.sleep)

    write_cache(mountains,rows)
    checked=sum((rows.get(m) or {}).get('checked') is True for m in mountains)
    errors=sum((rows.get(m) or {}).get('checked') is not True for m in mountains)
    avail=sum((rows.get(m) or {}).get('available') is True for m in mountains)
    print(f'SUMMARY checked={checked}/{len(mountains)} available={avail} unresolved={errors}',flush=True)
    # Deliberately return success even with unresolved batches. The cache records them as unresolved,
    # and a later manual/scheduled run resumes only those mountains.
    return 0

if __name__=='__main__': raise SystemExit(main())
