const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,
 document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{}},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
 location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(s+`\nglobalThis.__N={MAJOR_TRAIL_NETWORKS_V1545,directCourseTimeInfoByNames,courseTimeInfo};`,sandbox,{timeout:30000});
const N=sandbox.__N;
const rows=[];
for(const [area,net] of Object.entries(N.MAJOR_TRAIL_NETWORKS_V1545)){
  for(const [from,to] of net.edges){
    const direct=N.directCourseTimeInfoByNames(from,to);
    const resolved=N.courseTimeInfo({name:from},{name:to});
    rows.push({area,from,to,directMinutes:direct?.minutes??null,resolvedMinutes:resolved?.minutes??null,source:direct?.source||resolved?.source||'',direct:!!direct,composed:!!resolved?.composed,estimated:!!resolved?.estimated,status:direct?'verified-direct':(resolved?.estimated?'estimated':resolved?'composed-only':'missing')});
  }
}
const summary={areas:Object.keys(N.MAJOR_TRAIL_NETWORKS_V1545).length,nodes:Object.values(N.MAJOR_TRAIL_NETWORKS_V1545).reduce((n,x)=>n+x.nodes.length,0),directedEdges:rows.length,verifiedDirect:rows.filter(r=>r.status==='verified-direct').length,composedOnly:rows.filter(r=>r.status==='composed-only').length,estimated:rows.filter(r=>r.status==='estimated').length,missing:rows.filter(r=>r.status==='missing').length};
fs.writeFileSync('AREA_NETWORK_CT_AUDIT_V1545.json',JSON.stringify({summary,rows},null,2));
const lines=[
  'TRATEN V1.5.45 MOUNTAIN-AREA CT NETWORK AUDIT',
  '',
  `areas: ${summary.areas}`,
  `nodes: ${summary.nodes}`,
  `directed adjacent edges: ${summary.directedEdges}`,
  `verified direct: ${summary.verifiedDirect}`,
  `composed-only: ${summary.composedOnly}`,
  `estimated: ${summary.estimated}`,
  `missing: ${summary.missing}`,
  '',
  ...rows.map(r=>`${r.status}\t${r.area}\t${r.from} -> ${r.to}\t${r.directMinutes??'-'} min\t${r.source}`)
];
fs.writeFileSync('AREA_NETWORK_CT_AUDIT_V1545.txt',lines.join('\n')+'\n');
console.log(JSON.stringify(summary,null,2));
for(const r of rows) console.log(r.status, r.area, `${r.from}->${r.to}`, r.directMinutes??'-');
if(summary.missing||summary.estimated||summary.composedOnly)process.exitCode=2;
