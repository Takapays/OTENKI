const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,
 document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{}},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
 location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(s+`\nglobalThis.__X={JAPAN_100_MOUNTAINS,representativeCourseOptions,representativeCourseExpandedPointDefs,directCourseTimeInfoByNames,courseTimeInfo,normalizeCourseTimePointName,canonicalCourseTimeEndpointName,MAJOR_TRAIL_NETWORKS_V1546,GENERATED_ROUTE_EXCLUSIONS_V1545};`,sandbox,{timeout:30000});
const X=sandbox.__X;
function directInfo(from,to){
  return X.directCourseTimeInfoByNames(from,to)||X.directCourseTimeInfoByNames(
    X.canonicalCourseTimeEndpointName(X.normalizeCourseTimePointName(from)),
    X.canonicalCourseTimeEndpointName(X.normalizeCourseTimePointName(to))
  );
}
const routeEdges=[]; const auditMap=new Map();
function addAuditEdge(mountain,course,from,to,origin){
  const k=`${from}→${to}`;
  if(!auditMap.has(k))auditMap.set(k,{from,to,mountains:new Set(),courses:new Set(),origins:new Set()});
  const r=auditMap.get(k); r.mountains.add(mountain); r.courses.add(course); r.origins.add(origin);
}
let routeDefinitions=0;
for(const mountain of X.JAPAN_100_MOUNTAINS){
  for(const course of X.representativeCourseOptions(mountain)){
    routeDefinitions++;
    const defs=X.representativeCourseExpandedPointDefs(mountain,course);
    for(let i=1;i<defs.length;i++){
      const from=defs[i-1][1],to=defs[i][1];
      const direct=directInfo(from,to); const resolved=X.courseTimeInfo({name:from},{name:to});
      routeEdges.push({mountain,course:course.label||'',from,to,direct:!!direct,composed:!!resolved?.composed,estimated:!!resolved?.estimated,minutes:direct?.minutes??resolved?.minutes??null,via:resolved?.via||[]});
      if(direct){ addAuditEdge(mountain,course.label||'',from,to,'route-direct'); continue; }
      if(resolved?.composed && Array.isArray(resolved.via)){
        const path=[from,...resolved.via,to];
        for(let j=1;j<path.length;j++)addAuditEdge(mountain,course.label||'',path[j-1],path[j],'route-composed-expanded');
      } else {
        addAuditEdge(mountain,course.label||'',from,to,resolved?.estimated?'route-estimated':'route-missing');
      }
    }
  }
}
for(const [area,net] of Object.entries(X.MAJOR_TRAIL_NETWORKS_V1546||{})){
  for(const [from,to] of net.edges)addAuditEdge(area,'explicit area network',from,to,'explicit-area-network');
}
const rows=[...auditMap.values()].map(r=>{
  const d=directInfo(r.from,r.to); const resolved=X.courseTimeInfo({name:r.from},{name:r.to});
  return {from:r.from,to:r.to,mountains:[...r.mountains],courses:[...r.courses],origins:[...r.origins],minutes:d?.minutes??resolved?.minutes??null,source:d?.source||resolved?.source||'',direct:!!d,composed:!!resolved?.composed,estimated:!!resolved?.estimated,status:d?'verified-direct':resolved?.estimated?'estimated':resolved?'composed-only':'missing'};
}).sort((a,b)=>a.mountains.join(',').localeCompare(b.mountains.join(','),'ja')||a.from.localeCompare(b.from,'ja')||a.to.localeCompare(b.to,'ja'));
const exclusions=[];
for(const [mountain,set] of Object.entries(X.GENERATED_ROUTE_EXCLUSIONS_V1545||{}))for(const trailhead of set)exclusions.push({mountain,trailhead,reason: mountain==='草津白根山'?'current volcanic restriction; do not generate summit CT':mountain==='浅間山'?'current access endpoint is Maekake-yama, not the crater summit':mountain==='燧ヶ岳'&&trailhead.startsWith('山ノ鼻')?'catalog cross-area mismatch (Shibutsu trailhead)':'not a current major summit route; old/side route must not be auto-connected'});
const summary={
  mountains:X.JAPAN_100_MOUNTAINS.size,
  routeDefinitions,
  routeEndpointEdges:routeEdges.length,
  uniqueAdjacentAuditEdges:rows.length,
  verifiedDirect:rows.filter(r=>r.status==='verified-direct').length,
  composedOnly:rows.filter(r=>r.status==='composed-only').length,
  estimated:rows.filter(r=>r.status==='estimated').length,
  missing:rows.filter(r=>r.status==='missing').length,
  routeDefinitionExclusions:exclusions.length,
  explicitAreaNetworks:Object.keys(X.MAJOR_TRAIL_NETWORKS_V1546||{}).length
};
const payload={summary,scope:'All currently declared Hyakumeizan route options are unioned into a directed network; known composed route edges are expanded to their verified underlying direct CT edges. Kuju plus the North/Central/South Alps and Yatsugatake add explicit branch networks beyond representative-route definitions. This audits the source-declared major network and does not claim every real-world minor trail nationwide is cataloged.',exclusions,rows,routeEdges};
fs.writeFileSync('HYAKUMEIZAN_NETWORK_CT_AUDIT_V1546.json',JSON.stringify(payload,null,2));
const lines=[
 'TRATEN V1.5.46 HYAKUMEIZAN CT NETWORK AUDIT','',
 `mountains: ${summary.mountains}`,`route definitions: ${summary.routeDefinitions}`,`route endpoint edges before minimal expansion: ${summary.routeEndpointEdges}`,`unique adjacent audit edges after expansion: ${summary.uniqueAdjacentAuditEdges}`,`verified direct: ${summary.verifiedDirect}`,`composed-only: ${summary.composedOnly}`,`estimated: ${summary.estimated}`,`missing: ${summary.missing}`,`route-definition exclusions: ${summary.routeDefinitionExclusions}`,`explicit area networks: ${summary.explicitAreaNetworks}`,'',
 'SCOPE:',payload.scope,'','EXCLUSIONS:',...exclusions.map(x=>`${x.mountain}\t${x.trailhead}\t${x.reason}`),'','ADJACENT EDGES:',...rows.map(r=>`${r.status}\t${r.mountains.join(',')}\t${r.from} -> ${r.to}\t${r.minutes??'-'} min\t${r.source}`)
];
fs.writeFileSync('HYAKUMEIZAN_NETWORK_CT_AUDIT_V1546.txt',lines.join('\n')+'\n');
console.log(JSON.stringify(summary,null,2));
for(const r of rows.filter(r=>r.status!=='verified-direct'))console.log(r.status,r.mountains.join(','),`${r.from}->${r.to}`,r.minutes??'-');
if(summary.missing||summary.estimated||summary.composedOnly)process.exitCode=2;
