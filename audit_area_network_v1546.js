const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,
 document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{}},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
 location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(s+`\nglobalThis.__X={MAJOR_TRAIL_NETWORKS_V1546,directCourseTimeInfoByNames,courseTimeInfo,normalizeCourseTimePointName,canonicalCourseTimeEndpointName};`,sandbox,{timeout:30000});
const X=sandbox.__X;
function directInfo(from,to){return X.directCourseTimeInfoByNames(from,to)||X.directCourseTimeInfoByNames(X.canonicalCourseTimeEndpointName(X.normalizeCourseTimePointName(from)),X.canonicalCourseTimeEndpointName(X.normalizeCourseTimePointName(to)));}
function componentCount(net){
  const adj=new Map(net.nodes.map(n=>[n,new Set()]));
  for(const [a,b] of net.edges){if(!adj.has(a))adj.set(a,new Set());if(!adj.has(b))adj.set(b,new Set());adj.get(a).add(b);adj.get(b).add(a);}
  let c=0;const seen=new Set();
  for(const n of adj.keys()){if(seen.has(n))continue;c++;const q=[n];seen.add(n);while(q.length){const x=q.pop();for(const y of adj.get(x)||[]){if(!seen.has(y)){seen.add(y);q.push(y);}}}}
  return c;
}
const rows=[]; const areas={};
for(const [area,net] of Object.entries(X.MAJOR_TRAIL_NETWORKS_V1546||{})){
  areas[area]={edges:0,verifiedDirect:0,missing:0,estimated:0,composedOnly:0,components:componentCount(net)};
  for(const [from,to] of net.edges){
    const d=directInfo(from,to), r=X.courseTimeInfo({name:from},{name:to});
    const status=d?'verified-direct':r?.estimated?'estimated':r?'composed-only':'missing';
    rows.push({area,from,to,minutes:d?.minutes??r?.minutes??null,source:d?.source||r?.source||'',direct:!!d,composed:!!r?.composed,estimated:!!r?.estimated,status});
    const a=areas[area];a.edges++;if(status==='verified-direct')a.verifiedDirect++;else if(status==='missing')a.missing++;else if(status==='estimated')a.estimated++;else a.composedOnly++;
  }
}
const summary={areas:Object.keys(areas).length,nodes:[...new Set(Object.values(X.MAJOR_TRAIL_NETWORKS_V1546).flatMap(n=>n.nodes))].length,directedAdjacentEdges:rows.length,verifiedDirect:rows.filter(r=>r.status==='verified-direct').length,missing:rows.filter(r=>r.status==='missing').length,estimated:rows.filter(r=>r.status==='estimated').length,composedOnly:rows.filter(r=>r.status==='composed-only').length,disconnectedAreas:Object.values(areas).filter(a=>a.components!==1).length};
fs.writeFileSync('AREA_NETWORK_CT_AUDIT_V1546.json',JSON.stringify({summary,areas,rows},null,2));
const lines=['TRATEN V1.5.46 MOUNTAIN-AREA CT NETWORK AUDIT','',...Object.entries(areas).map(([k,v])=>`${k}\tedges=${v.edges}\tverified=${v.verifiedDirect}\tmissing=${v.missing}\testimated=${v.estimated}\tcomposedOnly=${v.composedOnly}\tcomponents=${v.components}`),'',`TOTAL areas=${summary.areas} nodes=${summary.nodes} edges=${summary.directedAdjacentEdges} verified=${summary.verifiedDirect} missing=${summary.missing} estimated=${summary.estimated} composedOnly=${summary.composedOnly} disconnectedAreas=${summary.disconnectedAreas}`,'','EDGES:',...rows.map(r=>`${r.status}\t${r.area}\t${r.from} -> ${r.to}\t${r.minutes??'-'} min\t${r.source}`)];
fs.writeFileSync('AREA_NETWORK_CT_AUDIT_V1546.txt',lines.join('\n')+'\n');
console.log(JSON.stringify(summary,null,2));for(const [k,v] of Object.entries(areas))if(v.components!==1)console.log('disconnected',k,v.components);for(const r of rows.filter(r=>r.status!=='verified-direct'))console.log(r.status,r.area,`${r.from}->${r.to}`,r.minutes??'-');if(summary.missing||summary.estimated||summary.composedOnly||summary.disconnectedAreas)process.exitCode=2;
