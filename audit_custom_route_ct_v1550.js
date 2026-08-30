const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,
 document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{}},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
 location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(s+`\nglobalThis.__X={BUILTIN_ROUTE_CATALOG,courseTimeInfo};`,sandbox,{timeout:30000});
const X=sandbox.__X;
const targets={
  'くじゅう連山':{
    catalogKeys:['久住山','大船山','中岳(くじゅう)','三俣山','星生山'],
    names:['牧ノ戸峠','長者原','久住分かれ避難小屋','法華院温泉山荘','坊ガツル','久住山','中岳(くじゅう)','三俣山','大船山','星生山']
  },
  '御嶽山':{
    catalogKeys:['御嶽山'],
    names:['中の湯登山口（黒沢口）','田の原登山口','女人堂','石室山荘','二の池ヒュッテ','五の池小屋','御嶽山（剣ヶ峰）']
  }
};
function pointMap(cfg){
 const map=new Map();
 for(const key of cfg.catalogKeys){for(const p of X.BUILTIN_ROUTE_CATALOG[key]||[]){if(cfg.names.includes(p.name)&&!map.has(p.name))map.set(p.name,p);}}
 return map;
}
const areas={};const rows=[];
for(const [area,cfg] of Object.entries(targets)){
 const map=pointMap(cfg); const missingPoints=cfg.names.filter(n=>!map.has(n));
 const a={selectablePoints:cfg.names.length,foundPoints:map.size,missingPointDefinitions:missingPoints,pairs:0,resolved:0,direct:0,composed:0,estimated:0,missing:0};
 for(const from of cfg.names){for(const to of cfg.names){if(from===to)continue;a.pairs++;
   const fp=map.get(from)||{name:from},tp=map.get(to)||{name:to}; const r=X.courseTimeInfo(fp,tp);
   const status=!r?'missing':r.estimated?'estimated':r.composed?'composed':'direct';
   if(status==='missing')a.missing++; else if(status==='estimated')a.estimated++; else {a.resolved++; if(status==='composed')a.composed++; else a.direct++;}
   rows.push({area,from,to,status,minutes:r?.minutes??null,source:r?.source||'',sourceType:r?.sourceType||'',composed:!!r?.composed,estimated:!!r?.estimated});
 }}
 areas[area]=a;
}
const exampleDefs=[
  {area:'くじゅう連山',name:'牧ノ戸峠→星生山→久住山→中岳',points:['牧ノ戸峠','星生山','久住山','中岳(くじゅう)']},
  {area:'くじゅう連山',name:'長者原→法華院→三俣山',points:['長者原','法華院温泉山荘','三俣山']},
  {area:'くじゅう連山',name:'坊ガツル→大船山→長者原',points:['坊ガツル','大船山','長者原']},
  {area:'御嶽山',name:'中の湯→女人堂→石室→剣ヶ峰→二の池→五の池',points:['中の湯登山口（黒沢口）','女人堂','石室山荘','御嶽山（剣ヶ峰）','二の池ヒュッテ','五の池小屋']},
  {area:'御嶽山',name:'田の原→剣ヶ峰→二の池',points:['田の原登山口','御嶽山（剣ヶ峰）','二の池ヒュッテ']}
];
const exampleRoutes=exampleDefs.map(def=>{
  const cfg=targets[def.area], map=pointMap(cfg); let total=0,ok=true; const segments=[];
  for(let i=0;i<def.points.length-1;i++){
    const from=def.points[i],to=def.points[i+1],r=X.courseTimeInfo(map.get(from)||{name:from},map.get(to)||{name:to});
    const status=!r?'missing':r.estimated?'estimated':r.composed?'composed':'direct';
    if(!r||r.estimated)ok=false; else total+=Number(r.minutes)||0;
    segments.push({from,to,status,minutes:r?.minutes??null,via:r?.via||[],source:r?.source||''});
  }
  return {...def,ok,totalMinutes:ok?total:null,segments};
});
const summary={areas:Object.keys(areas).length,selectablePoints:Object.values(areas).reduce((s,a)=>s+a.selectablePoints,0),orderedPairs:Object.values(areas).reduce((s,a)=>s+a.pairs,0),resolved:Object.values(areas).reduce((s,a)=>s+a.resolved,0),direct:Object.values(areas).reduce((s,a)=>s+a.direct,0),composed:Object.values(areas).reduce((s,a)=>s+a.composed,0),estimated:Object.values(areas).reduce((s,a)=>s+a.estimated,0),missing:Object.values(areas).reduce((s,a)=>s+a.missing,0),missingPointDefinitions:Object.values(areas).reduce((s,a)=>s+a.missingPointDefinitions.length,0),exampleRoutes:exampleRoutes.length,exampleRoutesPassed:exampleRoutes.filter(r=>r.ok).length};
fs.writeFileSync('CUSTOM_ROUTE_CT_AUDIT_V1550.json',JSON.stringify({summary,areas,exampleRoutes,rows},null,2));
const lines=['TRATEN V1.5.50 CUSTOM-ROUTE SELECTABLE-POINT CT AUDIT','',
 'Scope: all ordered pairs among the listed UI-selectable focus points for Kuju and Ontake. This is a route-builder resolution audit, not a claim that every pair is a direct adjacent trail section. Composed results use only verified CT edges; estimated CT is prohibited.','',
 ...Object.entries(areas).map(([k,a])=>`${k}\tpoints=${a.selectablePoints}\tfound=${a.foundPoints}\tpairs=${a.pairs}\tresolved=${a.resolved}\tdirect=${a.direct}\tcomposed=${a.composed}\testimated=${a.estimated}\tmissing=${a.missing}\tmissingPointDefs=${a.missingPointDefinitions.length}`),
 '',`TOTAL areas=${summary.areas} points=${summary.selectablePoints} pairs=${summary.orderedPairs} resolved=${summary.resolved} direct=${summary.direct} composed=${summary.composed} estimated=${summary.estimated} missing=${summary.missing} missingPointDefs=${summary.missingPointDefinitions} exampleRoutes=${summary.exampleRoutesPassed}/${summary.exampleRoutes}`,'','EXAMPLE ROUTES:',
 ...exampleRoutes.map(r=>`${r.ok?'PASS':'FAIL'}\t${r.area}\t${r.name}\t${r.totalMinutes??'-'} min`),'','NON-RESOLVED:',
 ...rows.filter(r=>r.status==='missing'||r.status==='estimated').map(r=>`${r.status}\t${r.area}\t${r.from} -> ${r.to}\t${r.minutes??'-'} min\t${r.source}`)];
fs.writeFileSync('CUSTOM_ROUTE_CT_AUDIT_V1550.txt',lines.join('\n')+'\n');
console.log(JSON.stringify(summary,null,2)); for(const [k,a] of Object.entries(areas)) console.log(k,a); for(const r of rows.filter(r=>r.status==='missing'||r.status==='estimated')) console.log(r.status,r.area,`${r.from}->${r.to}`);
if(summary.missing||summary.estimated||summary.missingPointDefinitions||summary.exampleRoutesPassed!==summary.exampleRoutes)process.exitCode=2;
