import json, subprocess, pathlib, sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
BASE=json.loads((ROOT/'tests/runtime_catalog_baseline_v161.json').read_text())
out=ROOT/'tests/_runtime_v162_snapshot.json'
subprocess.run(['node',str(ROOT/'tests/audit_runtime_loose_v162.js'),str(ROOT),str(out)],check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
CUR=json.loads(out.read_text()); out.unlink(missing_ok=True)
assert BASE['mountains']==CUR['mountains'], '300-mountain order changed'
a={x['mountain']:x for x in BASE['catalogs']}; b={x['mountain']:x for x in CUR['catalogs']}
changed=[]
for m in BASE['mountains']:
    if a[m]!=b[m]: changed.append(m)
assert changed==['箱根山'], f'unapproved runtime catalog changes: {changed}'
assert a['箱根山']['routes']==[], 'V1.6.1 baseline expected no Hakone representative route'
r=b['箱根山']['routes']
assert len(r)==1 and r[0]['label']=='駒ヶ岳頂上駅・神山ルート', r
assert [p[1] for p in r[0]['points']]==['箱根駒ヶ岳ロープウェー 駒ヶ岳頂上駅','箱根駒ヶ岳（駒ヶ岳）','神山（箱根山）','箱根駒ヶ岳ロープウェー 駒ヶ岳頂上駅']
bs=BASE['summary']; cs=CUR['summary']
assert cs['mountains']==300
assert cs['representativeRoutes']==bs['representativeRoutes']+1
assert cs['noRepresentative']==bs['noRepresentative']-1
for k in ['missingCt','estimatedCt','derivedCt','coordinateIssues']:
    assert cs[k] <= bs[k], (k,bs[k],cs[k])
print(json.dumps({'ok':True,'approvedCatalogChanges':changed,'baseline':bs,'current':cs},ensure_ascii=False))
