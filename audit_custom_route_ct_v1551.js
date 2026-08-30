const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,
 document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{}},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
 location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(s+`\nglobalThis.__X={BUILTIN_ROUTE_CATALOG,TRAVERSE_CATALOG,regionalCandidates,canonicalMountainName,courseTimeInfo};`,sandbox,{timeout:30000});
const X=sandbox.__X;
const targets={
 '御嶽山':{label:'御嶽',names:['中の湯登山口（黒沢口）','田の原登山口','女人堂','石室山荘','二の池ヒュッテ','五の池小屋','御嶽山（剣ヶ峰）']},
 '八ヶ岳（赤岳）':{label:'八ヶ岳（赤岳）',names:['美濃戸口','美濃戸','富士見高原登山口','観音平','赤岳鉱泉','行者小屋','赤岳','赤岳天望荘','横岳（八ヶ岳）','硫黄岳（八ヶ岳）','硫黄岳山荘','阿弥陀岳','権現岳','権現小屋','編笠山','青年小屋']}
};
function pointMap(label){const m=X.canonicalMountainName(label);const pts=[...(X.BUILTIN_ROUTE_CATALOG[m]||[]),...(X.TRAVERSE_CATALOG[m]||[]),...X.regionalCandidates(m)];return new Map([...new Map(pts.map(p=>[p.type+'|'+p.name,p])).values()].map(p=>[p.name,p]));}
const areas={},rows=[];
for(const [area,cfg] of Object.entries(targets)){
 const map=pointMap(cfg.label),missingPointDefinitions=cfg.names.filter(n=>!map.has(n));
 const a={selectablePoints:cfg.names.length,foundPoints:cfg.names.length-missingPointDefinitions.length,missingPointDefinitions,pairs:0,resolved:0,direct:0,composed:0,estimated:0,missing:0,longVerified:0};
 for(const from of cfg.names)for(const to of cfg.names){if(from===to)continue;a.pairs++;const r=X.courseTimeInfo(map.get(from)||{name:from},map.get(to)||{name:to});const status=!r?'missing':r.estimated?'estimated':r.composed?'composed':'direct';if(status==='missing')a.missing++;else if(status==='estimated')a.estimated++;else{a.resolved++;if(status==='composed')a.composed++;else a.direct++;if(Number(r.minutes)>=600)a.longVerified++;}rows.push({area,from,to,status,minutes:r?.minutes??null,via:r?.via||[],source:r?.source||''});}
 areas[area]=a;
}
const examples=[
 ['御嶽山','中の湯→女人堂→石室→剣ヶ峰→二の池→五の池',['中の湯登山口（黒沢口）','女人堂','石室山荘','御嶽山（剣ヶ峰）','二の池ヒュッテ','五の池小屋']],
 ['御嶽山','田の原→剣ヶ峰→二の池',['田の原登山口','御嶽山（剣ヶ峰）','二の池ヒュッテ']],
 ['八ヶ岳（赤岳）','美濃戸口→美濃戸→行者→赤岳→天望荘→横岳→硫黄岳山荘→硫黄岳→赤岳鉱泉→美濃戸→美濃戸口',['美濃戸口','美濃戸','行者小屋','赤岳','赤岳天望荘','横岳（八ヶ岳）','硫黄岳山荘','硫黄岳（八ヶ岳）','赤岳鉱泉','美濃戸','美濃戸口']],
 ['八ヶ岳（赤岳）','観音平→編笠→青年→権現→赤岳→行者→美濃戸口',['観音平','編笠山','青年小屋','権現岳','赤岳','行者小屋','美濃戸口']],
 ['八ヶ岳（赤岳）','富士見高原→編笠→青年→権現→赤岳',['富士見高原登山口','編笠山','青年小屋','権現岳','赤岳']]
].map(([area,name,points])=>{const map=pointMap(targets[area].label);let ok=true,total=0;const segments=[];for(let i=0;i<points.length-1;i++){const r=X.courseTimeInfo(map.get(points[i])||{name:points[i]},map.get(points[i+1])||{name:points[i+1]});if(!r||r.estimated)ok=false;else total+=Number(r.minutes)||0;segments.push({from:points[i],to:points[i+1],minutes:r?.minutes??null,status:!r?'missing':r.estimated?'estimated':r.composed?'composed':'direct',via:r?.via||[]});}return{area,name,ok,totalMinutes:ok?total:null,segments};});
const summary={areas:Object.keys(areas).length,selectablePoints:Object.values(areas).reduce((s,a)=>s+a.selectablePoints,0),orderedPairs:Object.values(areas).reduce((s,a)=>s+a.pairs,0),resolved:Object.values(areas).reduce((s,a)=>s+a.resolved,0),direct:Object.values(areas).reduce((s,a)=>s+a.direct,0),composed:Object.values(areas).reduce((s,a)=>s+a.composed,0),estimated:Object.values(areas).reduce((s,a)=>s+a.estimated,0),missing:Object.values(areas).reduce((s,a)=>s+a.missing,0),longVerified:Object.values(areas).reduce((s,a)=>s+a.longVerified,0),missingPointDefinitions:Object.values(areas).reduce((s,a)=>s+a.missingPointDefinitions.length,0),exampleRoutes:examples.length,exampleRoutesPassed:examples.filter(x=>x.ok).length};
fs.writeFileSync('CUSTOM_ROUTE_CT_AUDIT_V1551.json',JSON.stringify({summary,areas,examples,rows},null,2));
const lines=['TRATEN V1.5.51 ONTAKE + YATSUGATAKE CUSTOM-ROUTE CT AUDIT','',...Object.entries(areas).map(([k,a])=>`${k}\tpoints=${a.selectablePoints}\tpairs=${a.pairs}\tresolved=${a.resolved}\tdirect=${a.direct}\tcomposed=${a.composed}\testimated=${a.estimated}\tmissing=${a.missing}\tlongVerified=${a.longVerified}`),'',`TOTAL points=${summary.selectablePoints} pairs=${summary.orderedPairs} resolved=${summary.resolved} direct=${summary.direct} composed=${summary.composed} estimated=${summary.estimated} missing=${summary.missing} longVerified=${summary.longVerified} examples=${summary.exampleRoutesPassed}/${summary.exampleRoutes}`,'','EXAMPLES:',...examples.map(x=>`${x.ok?'PASS':'FAIL'}\t${x.area}\t${x.name}\t${x.totalMinutes??'-'} min`),'','NON-RESOLVED:',...rows.filter(r=>r.status==='missing'||r.status==='estimated').map(r=>`${r.status}\t${r.area}\t${r.from} -> ${r.to}`)];
fs.writeFileSync('CUSTOM_ROUTE_CT_AUDIT_V1551.txt',lines.join('\n')+'\n');
console.log(JSON.stringify(summary,null,2));if(summary.missing||summary.estimated||summary.missingPointDefinitions||summary.exampleRoutesPassed!==summary.exampleRoutes)process.exitCode=2;
