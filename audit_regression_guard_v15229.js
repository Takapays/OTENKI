const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname;
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const refs=[...html.matchAll(/<script[^>]+src="([^"]+\.js)(?:\?[^\"]*)?"[^>]*>/g)].map(m=>m[1]).filter(x=>!/^https?:/.test(x));
const missingAssets=refs.filter(f=>!fs.existsSync(path.join(root,f)));
if(missingAssets.length){console.error('FAIL missing referenced JS:',missingAssets);process.exit(2);}
const noop=()=>{};function el(){return {addEventListener:noop,removeEventListener:noop,classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},style:{},dataset:{},setAttribute:noop,removeAttribute:noop,appendChild:noop,remove:noop,querySelector:()=>null,querySelectorAll:()=>[],getContext:()=>null,closest:()=>null,children:[],value:'',textContent:'',innerHTML:''};}
const dummy=el();const document={addEventListener:noop,getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>el(),body:dummy,documentElement:dummy};
const window={confirm:()=>true,addEventListener:noop,removeEventListener:noop,location:{search:'',href:'',origin:''},innerWidth:1024,innerHeight:768};
const sandbox={console,setTimeout:()=>0,clearTimeout:noop,setInterval:()=>0,clearInterval:noop,URLSearchParams,URL,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,WeakMap,Promise,document,window,navigator:{userAgent:'audit',onLine:true},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},sessionStorage:{getItem:()=>null,setItem:noop,removeItem:noop},location:window.location,crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false,status:500,json:async()=>({}),text:async()=>''}),AbortController:global.AbortController,Blob:global.Blob,FormData:global.FormData,TextEncoder:global.TextEncoder,TextDecoder:global.TextDecoder};
window.window=window;window.document=document;window.navigator=sandbox.navigator;window.localStorage=sandbox.localStorage;window.sessionStorage=sandbox.sessionStorage;window.fetch=sandbox.fetch;vm.createContext(sandbox);
for(const ref of refs){vm.runInContext(fs.readFileSync(path.join(root,ref),'utf8'),sandbox,{timeout:30000,filename:ref});}
if(!window.TratenDataAudit) throw new Error('TratenDataAudit missing');
const a=window.TratenDataAudit.build();
function route(m,label){return (sandbox.representativeCourseOptions(m)||[]).find(c=>c.label===label);}
const north=route('三瓶山','北の原・姫逃池ルート'), west=route('三瓶山','西の原登山口ルート');
const checks={
  version:a.version==='1.5.229',
  allReferencedJsPresent:missingAssets.length===0,
  coordinateIssues:a.summary.coordinateIssues===0,
  missingCt:a.summary.missingCt===0,
  derivedCt:a.summary.derivedCt===0,
  estimatedCt:a.summary.estimatedCt<=1,
  noRepresentative:a.summary.noRepresentative<=6,
  sparseWaypoints:a.summary.sparseWaypoints<=156,
  representativeRoutes:a.summary.representativeRoutes>=419,
  sanbeNorthRecovered:(north?.points?.length||0)>=6,
  sanbeWestRecovered:(west?.points?.length||0)>=6
};
const out={checks,summary:a.summary,sanbe:{north:(north?.points||[]).map(p=>p[1]),west:(west?.points||[]).map(p=>p[1])},referencedJs:refs.length,missingAssets};
fs.writeFileSync(path.join(root,'REGRESSION_GUARD_V15229.json'),JSON.stringify(out,null,2));
console.log(JSON.stringify(out,null,2));
if(Object.values(checks).some(v=>!v)) process.exit(3);
