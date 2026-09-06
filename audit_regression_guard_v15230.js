const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname;
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const refs=[...html.matchAll(/<script[^>]+src="([^"]+\.js)(?:\?[^\"]*)?"[^>]*>/g)].map(m=>m[1]).filter(x=>!/^https?:/.test(x));
const missingAssets=refs.filter(f=>!fs.existsSync(path.join(root,f)));
if(missingAssets.length){console.error('FAIL missing referenced JS:',missingAssets);process.exit(2);}
const noop=()=>{};function el(){return {addEventListener:noop,removeEventListener:noop,classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},style:{},dataset:{},setAttribute:noop,removeAttribute:noop,appendChild:noop,remove:noop,querySelector:()=>null,querySelectorAll:()=>[],getContext:()=>null,closest:()=>null,children:[],childNodes:[],value:'',textContent:'',innerHTML:''};}
const dummy=el();const document={addEventListener:noop,getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>el(),body:dummy,documentElement:dummy,readyState:'complete'};
const window={confirm:()=>true,addEventListener:noop,removeEventListener:noop,location:{search:'',href:'',origin:'',pathname:'/'},innerWidth:1024,innerHeight:768};
const sandbox={console,setTimeout:()=>0,clearTimeout:noop,setInterval:()=>0,clearInterval:noop,URLSearchParams,URL,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,WeakMap,Promise,document,window,navigator:{userAgent:'audit',onLine:true},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},sessionStorage:{getItem:()=>null,setItem:noop,removeItem:noop},location:window.location,crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false,status:500,json:async()=>({}),text:async()=>''}),AbortController:global.AbortController,Blob:global.Blob,FormData:global.FormData,TextEncoder:global.TextEncoder,TextDecoder:global.TextDecoder};
window.window=window;window.document=document;window.navigator=sandbox.navigator;window.localStorage=sandbox.localStorage;window.sessionStorage=sandbox.sessionStorage;window.fetch=sandbox.fetch;vm.createContext(sandbox);
for(const ref of refs){vm.runInContext(fs.readFileSync(path.join(root,ref),'utf8'),sandbox,{timeout:30000,filename:ref});}
vm.runInContext(`globalThis.__REG={M:JAPAN_300_MOUNTAINS,opts:representativeCourseOptions,exp:representativeCourseExpandedPointDefs};`,sandbox);
if(!window.TratenDataAudit) throw new Error('TratenDataAudit missing');
const a=window.TratenDataAudit.build(), X=sandbox.__REG;
let raw3=0,expanded3=0,hiddenEnrichment=0;
for(const m of X.M){for(const c of X.opts(m)||[]){const r=(c.points||[]).length;const e=(X.exp(m,c)||c.points||[]).length;if(r<=3)raw3++;if(e<=3)expanded3++;if(r<=3&&e>3)hiddenEnrichment++;}}
function route(m,label){return (X.opts(m)||[]).find(c=>c.label===label);}
const expected={
  kujuChojabaru:['長者原','久住山','法華院温泉山荘','長者原'],
  shari:['清岳荘登山口','上二股','斜里岳','上二股','清岳荘登山口'],
  gassan:['姥沢 月山リフト','牛首（月山）','月山','牛首（月山）','姥沢 月山リフト'],
  ibuki:['伊吹山ドライブウェイ山頂駐車場','西登山道中間分岐（伊吹山）','伊吹山','西登山道中間分岐（伊吹山）','伊吹山ドライブウェイ山頂駐車場'],
  higashiAkaishi:['瀬場登山口 東赤石山','赤石山荘','東赤石山','赤石山荘','瀬場登山口 東赤石山']
};
const actual={
  kujuChojabaru:(route('久住山','長者原ルート')?.points||[]).map(p=>p[1]),
  shari:(route('斜里岳','清岳荘・上二股ルート')?.points||[]).map(p=>p[1]),
  gassan:(route('月山','姥沢・牛首ルート')?.points||[]).map(p=>p[1]),
  ibuki:(route('伊吹山','山頂駐車場・西登山道ルート（麓側入山禁止中）')?.points||[]).map(p=>p[1]),
  higashiAkaishi:(route('東赤石山','瀬場・赤石山荘ルート')?.points||[]).map(p=>p[1])
};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const checks={
  version:a.version==='1.5.230',
  allReferencedJsPresent:missingAssets.length===0,
  coordinateIssues:a.summary.coordinateIssues===0,
  missingCt:a.summary.missingCt===0,
  derivedCt:a.summary.derivedCt===0,
  estimatedCt:a.summary.estimatedCt<=1,
  sparseWaypoints:a.summary.sparseWaypoints<=156,
  hiddenHistoricalEnrichment:hiddenEnrichment===0,
  rawAndExpandedThreePointCountsMatch:raw3===expanded3,
  kujuChojabaruRecovered:eq(actual.kujuChojabaru,expected.kujuChojabaru),
  shariRecovered:eq(actual.shari,expected.shari),
  gassanRecovered:eq(actual.gassan,expected.gassan),
  ibukiRecovered:eq(actual.ibuki,expected.ibuki),
  higashiAkaishiRecovered:eq(actual.higashiAkaishi,expected.higashiAkaishi)
};
const out={checks,summary:a.summary,raw3,expanded3,hiddenEnrichment,actual,referencedJs:refs.length,missingAssets};
fs.writeFileSync(path.join(root,'REGRESSION_GUARD_V15230.json'),JSON.stringify(out,null,2));
console.log(JSON.stringify(out,null,2));
if(Object.values(checks).some(v=>!v))process.exit(3);
