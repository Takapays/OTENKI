#!/usr/bin/env python3
"""Audit mapped water sources for Japan 300 mountains using existing fixed route points.

Output: water-mountain-cache.json
This script is intended for GitHub Actions / a network-enabled maintenance environment.
It never guesses coordinates: all query centers are parsed from fixed coordinates already in app.js.
"""
from __future__ import annotations
import argparse
import json
import math
import re
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

BASE = Path(__file__).resolve().parent
APP_JS = BASE / "app.js"
OUT = BASE / "water-mountain-cache.json"
ENDPOINTS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
]
RADIUS_M = 1400
MAX_CENTERS = 15
MAX_SOURCES = 12
ALIASES = {"八ヶ岳（赤岳）": "赤岳", "宮ノ浦岳": "宮之浦岳", "御嶽": "御嶽山"}


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
    # Fixed route objects consistently contain name/type/lat/lon; order can vary.
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
            # Add an already-fixed mountain summit coordinate when present in MOUNTAIN_PRESETS.
            # This is existing project data, not a guessed coordinate.
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
    # Use fixed route points first. Fill large gaps with interpolated centers, matching app behavior.
    if not points: return []
    raw: list[dict[str, Any]] = []
    for i,p in enumerate(points):
        raw.append(p)
        if i+1 >= len(points): continue
        q=points[i+1]; dist=haversine(p["lat"],p["lon"],q["lat"],q["lon"])
        steps=min(3,max(0,int(dist//4500)))
        for step in range(1,steps+1):
            t=step/(steps+1)
            raw.append({"name":f"{p['name']}〜{q['name']}","type":"between","lat":p["lat"]+(q["lat"]-p["lat"])*t,"lon":p["lon"]+(q["lon"]-p["lon"])*t})
    out=[]
    for p in raw:
        if not any(haversine(p["lat"],p["lon"],q["lat"],q["lon"])<700 for q in out): out.append(p)
    if len(out) <= MAX_CENTERS: return out
    # Preserve first/last and sample evenly so long routes do not overload Overpass.
    idxs=sorted(set(round(i*(len(out)-1)/(MAX_CENTERS-1)) for i in range(MAX_CENTERS)))
    return [out[i] for i in idxs]


def overpass_query(points: list[dict[str, Any]]) -> str:
    parts=[]
    for p in centers(points):
        a=f"(around:{RADIUS_M},{p['lat']:.5f},{p['lon']:.5f})"
        parts += [f'node["amenity"="drinking_water"]{a};', f'node["natural"="spring"]{a};', f'node["man_made"="water_tap"]{a};', f'node["drinking_water"="yes"]{a};', f'way["amenity"="drinking_water"]{a};', f'way["natural"="spring"]{a};', f'way["drinking_water"="yes"]{a};']
    return '[out:json][timeout:30];(' + ''.join(parts) + ');out center tags;'


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


def fetch(mountain: str, points: list[dict[str,Any]], timeout: int=40) -> tuple[list[dict[str,Any]],str|None]:
    q=overpass_query(points)
    if not q or not points: return [],'fixed route points unavailable'
    last=None
    for endpoint in ENDPOINTS:
        try:
            data=urllib.parse.urlencode({'data':q}).encode('utf-8')
            req=urllib.request.Request(endpoint,data=data,method='POST',headers={'User-Agent':'TratenWaterAudit/1.4.231 (+https://otenki.onrender.com/)','Content-Type':'application/x-www-form-urlencoded'})
            with urllib.request.urlopen(req,timeout=timeout) as r:
                payload=json.loads(r.read().decode('utf-8','replace'))
            return parse_sources(payload,points),None
        except Exception as e: last=f"{endpoint}: {type(e).__name__}: {e}"
    return [],last


def main() -> int:
    ap=argparse.ArgumentParser(); ap.add_argument('--limit',type=int,default=0); ap.add_argument('--sleep',type=float,default=0.45); ap.add_argument('--resume',action='store_true'); ap.add_argument('--dry-run',action='store_true'); args=ap.parse_args()
    mountains, points_map=load_mountains_and_points()
    prev={}
    if args.resume and OUT.exists():
        try: prev=(json.loads(OUT.read_text(encoding='utf-8')).get('mountains') or {})
        except Exception: prev={}
    rows=dict(prev); targets=mountains[:args.limit or None]
    if args.dry_run:
        missing=[m for m in mountains if not points_map.get(m)]
        print(f'Japan 300 audit route points: {len(mountains)-len(missing)}/{len(mountains)}')
        if missing:
            print('Missing:', ', '.join(missing))
            return 1
        print('Dry-run OK: no network requests were sent.')
        return 0
    for i,m in enumerate(targets,1):
        if args.resume and rows.get(m,{}).get('checked') is True: continue
        pts=points_map.get(m) or []
        if not pts:
            rows[m]={'checked':False,'available':False,'count':0,'sources':[],'error':'fixed route points unavailable'}
        else:
            sources,error=fetch(m,pts)
            rows[m]={'checked':error is None,'available':bool(sources),'count':len(sources),'sources':sources}
            if error: rows[m]['error']=error[:280]
        print(f"[{i:03}/{len(targets)}] {m}: {'OK' if rows[m]['checked'] else 'ERR'} / {rows[m]['count']} source(s)",flush=True)
        payload={'schema_version':1,'app_version':'1.4.231','generated_at':datetime.now(timezone.utc).isoformat().replace('+00:00','Z'),'source':'OpenStreetMap / Overpass API','radius_m':RADIUS_M,'mountain_count':len(mountains),'mountains':{m:rows.get(m,{'checked':False,'available':False,'count':0,'sources':[]}) for m in mountains}}
        OUT.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+"\n",encoding='utf-8')
        if args.sleep: time.sleep(args.sleep)
    return 0

if __name__=='__main__': raise SystemExit(main())
