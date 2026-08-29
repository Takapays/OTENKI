const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,
  document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[]},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
  location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(s+`\nglobalThis.__X={V1514_INTERMEDIATE_VERIFIED_COURSE_TIMES,courseTimeInfo,JAPAN_300_MOUNTAINS,REPRESENTATIVE_COURSES,AUTO_REPRESENTATIVE_COURSES_V1466,EXTRA_REPRESENTATIVE_COURSES_V1466,EXTRA_REPRESENTATIVE_COURSES_V14199,EXTRA_REPRESENTATIVE_COURSES_V14201,buildRepresentativeResolvedRoute,canonicalMountainName};`,sandbox,{timeout:30000});
const X=sandbox.__X;
const required={
  '戸隠キャンプ場・高妻山登山者駐車場→一不動避難小屋':80,
  '一不動避難小屋→高妻山':135,
  '高妻山→一不動避難小屋':100,
  '一不動避難小屋→戸隠キャンプ場・高妻山登山者駐車場':65,
  '笹ヶ峰登山口→黒沢池ヒュッテ':190,
  '黒沢池ヒュッテ→妙高山':150,
  '妙高山→黒沢池ヒュッテ':130,
  '黒沢池ヒュッテ→笹ヶ峰登山口':160,
  '槍沢ロッヂ→ババ平（槍沢キャンプ場）':45,
  'ババ平（槍沢キャンプ場）→大曲（水俣乗越分岐）':55,
  '大曲（水俣乗越分岐）→天狗原分岐':60,
  '天狗原分岐→槍ヶ岳山荘':170,
  '槍ヶ岳山荘→天狗原分岐':100,
  '天狗原分岐→大曲（水俣乗越分岐）':50,
  '大曲（水俣乗越分岐）→ババ平（槍沢キャンプ場）':25,
  'ババ平（槍沢キャンプ場）→槍沢ロッヂ':35,
  '千畳敷→乗越浄土':60,
  '乗越浄土→木曽駒ヶ岳':60,
  '木曽駒ヶ岳→乗越浄土':60,
  '乗越浄土→千畳敷':50,
  '白木峰8合目駐車場→白木山荘（避難小屋）':60,
  '白木山荘（避難小屋）→白木峰':10,
  '白木峰→白木山荘（避難小屋）':10,
  '白木山荘（避難小屋）→白木峰8合目駐車場':41
};
let bad=0;
for(const [key,min] of Object.entries(required)){
  const [a,b]=key.split('→'); const info=X.courseTimeInfo({name:a},{name:b});
  if(!info||Number(info.minutes)!==min||info.estimated||info.derived){console.log('FAIL',key,info);bad++;}
  else console.log('OK',key,min);
}
function opts(m){const k=X.canonicalMountainName(m),man=X.REPRESENTATIVE_COURSES[k];const base=man?(Array.isArray(man)?man:[man]):(X.AUTO_REPRESENTATIVE_COURSES_V1466[k]||[]);return [...base,...(X.EXTRA_REPRESENTATIVE_COURSES_V1466[k]||[]),...(X.EXTRA_REPRESENTATIVE_COURSES_V14199[k]||[]),...(X.EXTRA_REPRESENTATIVE_COURSES_V14201[k]||[])];}
let courses=0,segments=0,verified=0,estimated=0,derived=0,missing=0,routeErrors=0,alignErrors=0;
const derivedRows=[];
for(const m of X.JAPAN_300_MOUNTAINS){for(const c of opts(m)){courses++;const r=X.buildRepresentativeResolvedRoute(m,c);if(r.error){routeErrors++;console.log('ROUTE_ERROR',m,c.label,r.error);continue;} if(r.segments.length!==Math.max(0,r.resolved.length-1))alignErrors++; for(let i=0;i<r.segments.length;i++){const seg=r.segments[i];segments++; if(seg.missing)missing++; else if(seg.derived){derived++;derivedRows.push([m,c.label,r.resolved[i]?.name,r.resolved[i+1]?.name,seg.minutes]);} else if(seg.estimated)estimated++; else verified++;}}}
console.log('DERIVED_ROWS',JSON.stringify(derivedRows));
console.log(`REP courses=${courses} segments=${segments} verified=${verified} estimated=${estimated} derived=${derived} missing=${missing} routeErrors=${routeErrors} alignErrors=${alignErrors}`);
console.log(`V1514 table=${Object.keys(X.V1514_INTERMEDIATE_VERIFIED_COURSE_TIMES).length}`);
if(derived||missing||routeErrors||alignErrors||bad)process.exit(2);
