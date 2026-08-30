const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{}},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);vm.runInContext(s+'\nglobalThis.__X={MOUNTAIN_REGION,regionalCandidates,courseTimeInfo};',sandbox,{timeout:30000});const X=sandbox.__X;
const alpsKeys=new Set(['omoteginza','yarihotaka','jonen_chou','kasa_sugoroku','nishiho_yake','ushiroginza','ushirotateyama','tateyama_tsurugi','yakushi_kurobe','hakuba_asahi','harinoki_funakubo','central_kisokoma_utsugi','southalps_north','southalps_shirane','southalps_central','southalps_south']);
const mountains=[];const uniqueSets=new Map();
for(const [mountain,key] of Object.entries(X.MOUNTAIN_REGION)){
  if(!alpsKeys.has(key))continue;
  const points=[...new Map(X.regionalCandidates(mountain).map(p=>[p.name,p])).values()];
  const names=points.map(p=>p.name),sig=[...names].sort().join('|');
  let resolved=0,direct=0,composed=0,estimated=0,missing=0,maxMinutes=0;
  for(const a of points)for(const b of points){if(a.name===b.name)continue;const r=X.courseTimeInfo(a,b);if(!r)missing++;else if(r.estimated)estimated++;else{resolved++;if(r.composed)composed++;else direct++;maxMinutes=Math.max(maxMinutes,Number(r.minutes)||0);}}
  const row={mountain,region:key,points:points.length,pairs:points.length*(points.length-1),resolved,direct,composed,estimated,missing,maxMinutes};mountains.push(row);
  if(!uniqueSets.has(sig))uniqueSets.set(sig,{representativeMountain:mountain,region:key,...row});
}
const sets=[...uniqueSets.values()];
const summary={mountains:mountains.length,uniqueCandidateSets:sets.length,uniqueSetPoints:sets.reduce((n,x)=>n+x.points,0),uniqueSetPairs:sets.reduce((n,x)=>n+x.pairs,0),uniqueSetResolved:sets.reduce((n,x)=>n+x.resolved,0),uniqueSetEstimated:sets.reduce((n,x)=>n+x.estimated,0),uniqueSetMissing:sets.reduce((n,x)=>n+x.missing,0),mountainBindingPairs:mountains.reduce((n,x)=>n+x.pairs,0),mountainBindingMissing:mountains.reduce((n,x)=>n+x.missing,0),mountainBindingEstimated:mountains.reduce((n,x)=>n+x.estimated,0)};
fs.writeFileSync('ALPS_CUSTOM_ROUTE_CT_AUDIT_V1552.json',JSON.stringify({summary,sets,mountains},null,2));
const lines=['TRATEN V1.5.52 JAPANESE ALPS CUSTOM-ROUTE CT AUDIT','',`mountains=${summary.mountains} uniqueCandidateSets=${summary.uniqueCandidateSets} uniqueSetPairs=${summary.uniqueSetPairs} resolved=${summary.uniqueSetResolved} estimated=${summary.uniqueSetEstimated} missing=${summary.uniqueSetMissing}`,`mountainBindingPairs=${summary.mountainBindingPairs} missing=${summary.mountainBindingMissing} estimated=${summary.mountainBindingEstimated}`,'','UNIQUE CANDIDATE SETS:',...sets.map(x=>`${x.representativeMountain}\tregion=${x.region}\tpoints=${x.points}\tpairs=${x.pairs}\tresolved=${x.resolved}\tdirect=${x.direct}\tcomposed=${x.composed}\testimated=${x.estimated}\tmissing=${x.missing}\tmax=${x.maxMinutes}min`),'','NONZERO:',...mountains.filter(x=>x.missing||x.estimated).map(x=>`${x.mountain}\tmissing=${x.missing}\testimated=${x.estimated}`)];
fs.writeFileSync('ALPS_CUSTOM_ROUTE_CT_AUDIT_V1552.txt',lines.join('\n')+'\n');console.log(JSON.stringify(summary,null,2));if(summary.uniqueSetMissing||summary.uniqueSetEstimated||summary.mountainBindingMissing||summary.mountainBindingEstimated)process.exitCode=2;
