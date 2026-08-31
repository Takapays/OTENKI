const fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('app.js','utf8');
const sandbox={console:{log:()=>{},warn:()=>{},error:()=>{}},setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{}},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(source+'\nglobalThis.__AUDIT={APP_VERSION,JAPAN_300_MOUNTAINS,regionalCandidates,builtinCandidates,fixedNameFallbackCandidates,sanitizeFixedCustomRouteCandidates,courseTimeInfo};',sandbox,{timeout:30000});
const X=sandbox.__AUDIT;
const priority=['久住山','大雪山（旭岳）','飯豊山','大朝日岳','谷川岳','雲取山','甲武信ヶ岳','金峰山','至仏山','燧ヶ岳','丹沢山','八経ヶ岳','石鎚山','霧島山（韓国岳）','宮ノ浦岳','八ヶ岳（赤岳）','御嶽山'];
function fixedBase(m){
  let base=[...(X.builtinCandidates(m)||[]),...(X.regionalCandidates(m)||[])];
  const names=new Set(base.map(p=>`${p.type}|${p.name}`));
  for(const p of X.fixedNameFallbackCandidates(m)||[])if(!names.has(`${p.type}|${p.name}`))base.push(p);
  return base.filter(p=>p&&Number.isFinite(+p.lat)&&Number.isFinite(+p.lon));
}
const rows=[];let raw=0,shown=0,hidden=0,pairs=0,missing=0,estimated=0,longVerified=0,lessThan2=0;
for(const m of X.JAPAN_300_MOUNTAINS){
  const base=fixedBase(m);if(!base.length)continue;
  const z=X.sanitizeFixedCustomRouteCandidates(m,base);let mm=0,ee=0,ll=0,pp=0;
  for(const a of z.points)for(const b of z.points){if(a===b)continue;pp++;const r=X.courseTimeInfo(a,b);if(!r)mm++;else if(r.estimated)ee++;else if(+r.minutes>=600)ll++;}
  raw+=base.length;shown+=z.points.length;hidden+=z.hidden.length;pairs+=pp;missing+=mm;estimated+=ee;longVerified+=ll;if(z.points.length<2)lessThan2++;
  rows.push({mountain:m,raw:base.length,shown:z.points.length,hidden:z.hidden.map(p=>p.name),pairs:pp,missing:mm,estimated:ee,longVerified:ll});
}
const result={version:X.APP_VERSION,summary:{mountains:rows.length,rawCandidates:raw,shownCandidates:shown,hiddenDisconnectedOrDuplicate:hidden,shownOrderedPairs:pairs,missingShownPairs:missing,estimatedShownPairs:estimated,longVerifiedShownPairs:longVerified,mountainsWithLessThan2SafePoints:lessThan2},priority:rows.filter(r=>priority.includes(r.mountain)),affected:rows.filter(r=>r.hidden.length||r.missing||r.estimated)};
process.stdout.write(JSON.stringify(result,null,2)+'\n');
if(missing||estimated)process.exitCode=2;
