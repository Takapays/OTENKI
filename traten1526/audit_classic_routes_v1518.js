const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,
  document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[]},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
  location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(s+`\nglobalThis.__X={CLASSIC_ROUTES,classicRoutePoint,courseTimeInfo};`,sandbox,{timeout:30000});
const X=sandbox.__X;
let bad=0,total=0,missing=0,estimated=0,derived=0;
for(const r of X.CLASSIC_ROUTES){
  let rm=0,re=0,rd=0;
  const pts=r.points.map(d=>X.classicRoutePoint(d));
  pts.forEach((p,i)=>{if(!p){console.log('POINT_MISSING',r.name,r.points[i][1]);bad++;}});
  for(let i=1;i<pts.length;i++){
    total++; if(!pts[i-1]||!pts[i])continue;
    const info=X.courseTimeInfo(pts[i-1],pts[i]);
    if(!info){rm++;missing++;console.log('CT_MISSING',r.name,pts[i-1].name,'->',pts[i].name);}
    else if(info.derived){rd++;derived++;console.log('CT_DERIVED',r.name,pts[i-1].name,'->',pts[i].name,info.minutes);}
    else if(info.estimated){re++;estimated++;console.log('CT_ESTIMATED',r.name,pts[i-1].name,'->',pts[i].name,info.minutes);}
  }
  console.log(`ROUTE ${r.name}: points=${pts.length} segments=${Math.max(0,pts.length-1)} missing=${rm} estimated=${re} derived=${rd}`);
  if(['白峰三山','鳳凰三山','三股サーキット','雲ノ平グランドサークル'].includes(r.name)&&(rm||re||rd))bad++;
}
console.log(`TOTAL routes=${X.CLASSIC_ROUTES.length} segments=${total} missing=${missing} estimated=${estimated} derived=${derived}`);
if(bad)process.exit(2);
