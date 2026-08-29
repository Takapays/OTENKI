const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,
  document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[]},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
  location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox); vm.runInContext(s+`\nglobalThis.__X={CLASSIC_ROUTES,classicRoutePoint,courseTimeInfo};`,sandbox,{timeout:30000});
const X=sandbox.__X;
let total=0,missing=0,estimated=0,derived=0,bad=0;
for(const r of X.CLASSIC_ROUTES){
  console.log(`## ${r.name} (${r.days})`);
  const pts=r.points.map((d,i)=>({d,p:X.classicRoutePoint(d),i}));
  for(const x of pts){
    if(!x.p){console.log(`POINT_MISSING ${x.d[1]}`);bad++;continue;}
    console.log(`POINT ${x.i+1}: ${x.p.name}${x.d[3]?' [STAY]':''} (${x.p.type}) ${x.p.lat},${x.p.lon}`);
  }
  for(let i=1;i<pts.length;i++){
    total++; const a=pts[i-1].p,b=pts[i].p;
    if(!a||!b)continue;
    const info=X.courseTimeInfo(a,b);
    if(!info){missing++;bad++;console.log(`  CT MISSING: ${a.name} -> ${b.name}`);}
    else {if(info.estimated){estimated++;bad++;} if(info.derived){derived++;bad++;} console.log(`  CT ${info.minutes}m: ${a.name} -> ${b.name} | ${info.source||''}${info.estimated?' [EST]':''}${info.derived?' [DERIVED]':''}`);}
  }
  console.log('');
}
console.log(`TOTAL routes=${X.CLASSIC_ROUTES.length} segments=${total} missing=${missing} estimated=${estimated} derived=${derived}`);
if(bad)process.exit(2);
