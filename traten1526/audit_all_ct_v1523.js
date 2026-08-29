const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,
 document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{}},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
 location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(s+`\nglobalThis.__X={JAPAN_300_MOUNTAINS,representativeCourseOptions,representativeCourseExpandedPointDefs,representativeCandidateForMountain,courseTimeInfo,COURSE_TIME_TABLES,normalizeCourseTimePointName,canonicalCourseTimeEndpointName,directCourseTimeInfoByNames,composedCourseTimeInfo,haversineKm};`,sandbox,{timeout:30000});
const X=sandbox.__X;
const rows=[],flags=[];
for(const mountain of X.JAPAN_300_MOUNTAINS){
 for(const course of X.representativeCourseOptions(mountain)){
  const defs=X.representativeCourseExpandedPointDefs(mountain,course);
  for(let i=1;i<defs.length;i++){
   const aDef=defs[i-1],bDef=defs[i];
   const a=X.representativeCandidateForMountain(mountain,aDef[0],aDef[1]);
   const b=X.representativeCandidateForMountain(mountain,bDef[0],bDef[1]);
   const info=a&&b?X.courseTimeInfo(a,b):null;
   const km=a&&b?X.haversineKm(a.lat,a.lon,b.lat,b.lon):null;
   const rec={mountain,course:course.label||'',from:aDef[1],to:bDef[1],minutes:info?.minutes??null,source:info?.source||'',composed:!!info?.composed,estimated:!!info?.estimated,via:info?.via||[],km};
   rows.push(rec);
   if(!info) flags.push({...rec,reason:'MISSING'});
   if(info?.composed && (info.via?.length||0)>=3) flags.push({...rec,reason:'COMPOSED_4PLUS_EDGES'});
   if(Number.isFinite(km)&&Number.isFinite(Number(info?.minutes))){
    const m=Number(info.minutes);
    if(km<=2 && m>180) flags.push({...rec,reason:'CLOSE_2KM_GT180'});
    else if(km<=5 && m>300) flags.push({...rec,reason:'CLOSE_5KM_GT300'});
    else if(km<=10 && m>600) flags.push({...rec,reason:'CLOSE_10KM_GT600'});
   }
  }
 }
}
// Duplicate directed keys with conflicting minutes across tables
const all=new Map();
X.COURSE_TIME_TABLES.forEach((t,ti)=>Object.entries(t).forEach(([k,v])=>{if(!all.has(k))all.set(k,[]);all.get(k).push({ti,minutes:Number(v.minutes),source:v.source||''});}));
const conflicts=[];
for(const [k,list] of all) if(new Set(list.map(x=>x.minutes)).size>1) conflicts.push({key:k,list});
// Reverse ratios among actual representative segments when both directions occur in route data
const pairMap=new Map(rows.filter(r=>Number.isFinite(Number(r.minutes))).map(r=>[`${r.from}→${r.to}`,r]));
const reverseFlags=[]; const seen=new Set();
for(const r of rows){ const rev=pairMap.get(`${r.to}→${r.from}`); if(!rev)continue; const id=[r.from,r.to].sort().join('|'); if(seen.has(id))continue; seen.add(id); const hi=Math.max(r.minutes,rev.minutes),lo=Math.min(r.minutes,rev.minutes); if(lo>0&&hi/lo>=3) reverseFlags.push({from:r.from,to:r.to,a:r.minutes,b:rev.minutes,ratio:hi/lo}); }
const summary={mountains:X.JAPAN_300_MOUNTAINS.length,courses:new Set(rows.map(r=>r.mountain+'|'+r.course)).size,segments:rows.length,direct:rows.filter(r=>!r.composed&&!r.estimated).length,composed:rows.filter(r=>r.composed).length,estimated:rows.filter(r=>r.estimated).length,missing:rows.filter(r=>r.minutes==null).length,flags:flags.length,conflicts:conflicts.length,reverseFlags:reverseFlags.length};
fs.writeFileSync('ALL_CT_AUDIT_V1523.json',JSON.stringify({summary,flags,conflicts,reverseFlags,rows},null,2));
console.log(JSON.stringify(summary,null,2));
console.log('\nFLAGS'); flags.slice(0,80).forEach(x=>console.log(x.reason,x.mountain,x.course,`${x.from}->${x.to}`,x.minutes,Number.isFinite(x.km)?x.km.toFixed(2):'',x.via.join('->')));
console.log('\nCONFLICTS'); conflicts.slice(0,80).forEach(x=>console.log(x.key,x.list.map(y=>y.minutes).join(',')));
console.log('\nREVERSE'); reverseFlags.slice(0,80).forEach(x=>console.log(`${x.from}<->${x.to}`,x.a,x.b,x.ratio.toFixed(2)));
