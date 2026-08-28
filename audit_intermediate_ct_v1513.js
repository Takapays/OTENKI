const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,
  document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[]},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
  location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(s+`\nglobalThis.__X={V1513_INTERMEDIATE_VERIFIED_COURSE_TIMES,courseTimeInfo,intermediateParentSplitCourseTime,JAPAN_300_MOUNTAINS,REPRESENTATIVE_COURSES,AUTO_REPRESENTATIVE_COURSES_V1466,EXTRA_REPRESENTATIVE_COURSES_V1466,EXTRA_REPRESENTATIVE_COURSES_V14199,EXTRA_REPRESENTATIVE_COURSES_V14201,buildRepresentativeResolvedRoute,canonicalMountainName};`,sandbox,{timeout:30000});
const X=sandbox.__X;
const required={
  '宝剣岳→宝剣山荘':20,'宝剣山荘→宝剣岳':20,'宝剣山荘→頂上山荘':40,'頂上山荘→宝剣山荘':35,'頂上山荘→木曽駒ヶ岳':20,'木曽駒ヶ岳→頂上山荘':15,
  '八方池山荘→八方池':100,'八方池→唐松岳頂上山荘':150,'唐松岳頂上山荘→八方池':120,'八方池→八方池山荘':80,
  '一ノ沢登山口→常念乗越':270,'常念乗越→常念小屋':1,'常念小屋→常念乗越':1,'常念乗越→一ノ沢登山口':170
};
let bad=0;
for(const [key,min] of Object.entries(required)){
  const [a,b]=key.split('→'); const info=X.courseTimeInfo({name:a},{name:b});
  if(!info||Number(info.minutes)!==min||info.estimated||info.derived){console.log('FAIL',key,info);bad++;}
  else console.log('OK',key,min);
}
function opts(m){const k=X.canonicalMountainName(m),man=X.REPRESENTATIVE_COURSES[k];const base=man?(Array.isArray(man)?man:[man]):(X.AUTO_REPRESENTATIVE_COURSES_V1466[k]||[]);return [...base,...(X.EXTRA_REPRESENTATIVE_COURSES_V1466[k]||[]),...(X.EXTRA_REPRESENTATIVE_COURSES_V14199[k]||[]),...(X.EXTRA_REPRESENTATIVE_COURSES_V14201[k]||[])];}
let courses=0,segments=0,verified=0,estimated=0,derived=0,missing=0,routeErrors=0,alignErrors=0;
for(const m of X.JAPAN_300_MOUNTAINS){for(const c of opts(m)){courses++;const r=X.buildRepresentativeResolvedRoute(m,c);if(r.error){routeErrors++;continue;} if(r.segments.length!==Math.max(0,r.resolved.length-1))alignErrors++; for(const seg of r.segments){segments++; if(seg.missing)missing++; else if(seg.derived)derived++; else if(seg.estimated)estimated++; else verified++;}}}
console.log(`REP courses=${courses} segments=${segments} verified=${verified} estimated=${estimated} derived=${derived} missing=${missing} routeErrors=${routeErrors} alignErrors=${alignErrors}`);
// Actual route-context fallback test on a remaining published-parent/intermediate route.
const highwife=opts('高妻山').find(c=>String(c.label).includes('戸隠キャンプ場'));
const highwifeResolved=X.buildRepresentativeResolvedRoute('高妻山',highwife).resolved.map(x=>x.p);
const fallback=X.intermediateParentSplitCourseTime(highwifeResolved,1);
if(!fallback||!fallback.derived||!Number.isFinite(Number(fallback.minutes))){console.log('FAIL route-context fallback',fallback);bad++;}
else console.log(`OK route-context fallback 高妻山 first leg ${fallback.minutes}min parent=${fallback.parentFrom}->${fallback.parentTo} ${fallback.parentMinutes}min`);
console.log(`V1513 table=${Object.keys(X.V1513_INTERMEDIATE_VERIFIED_COURSE_TIMES).length}`);
if(missing||routeErrors||alignErrors||bad)process.exit(2);
