const fs=require('fs'),vm=require('vm'),path=require('path'),crypto=require('crypto');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..')); const output=process.argv[3];
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

vm.runInContext(`globalThis.__ALL={mountains:JAPAN_300_MOUNTAINS,opts:representativeCourseOptions,expand:representativeCourseExpandedPointDefs,builtin:builtinCandidates,regional:regionalCandidates,national:nationalOutlookPoints};`,sandbox);
const X=sandbox.__ALL;
const audit=window.TratenDataAudit.build();
const catalogs=X.mountains.map(m=>({mountain:m,routes:(X.opts(m)||[]).map(c=>({label:c.label,points:c.points,expanded:X.expand(m,c)})),fixed:[...X.builtin(m),...X.regional(m)]}));
const snapshot={mountains:X.mountains,catalogs,summary:audit.summary,national:X.national(),referencedJs:refs};
const digest=crypto.createHash('sha256').update(JSON.stringify(snapshot)).digest('hex');
const manifestPath=path.join(__dirname,'nonroute_baseline_v15230.json');
const manifest=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')):null;
if(!manifest)throw new Error('Frozen baseline required');
const names=manifest.protectedJavaScriptNames;
const functionHashes={};
for(const name of names){
 const value=vm.runInContext('typeof '+name+' === "function" ? '+name+'.toString() : null',sandbox);
 if(!value)throw new Error('Protected function missing: '+name);
 functionHashes[name]=crypto.createHash('sha256').update(value.replace(/\r\n/g,'\n').trim()).digest('hex');
}

 if(!manifest)throw new Error('Frozen baseline required');


 console.log('PASS LOOSE: runtime built; protected JS functions='+names.length);
if(output)fs.writeFileSync(output,JSON.stringify(snapshot,null,2));
module.exports={sandbox,vm,root,snapshot};
console.log(JSON.stringify({mountains:X.mountains.length,summary:audit.summary,refs:refs.length,auditKeys:Object.keys(audit)}));
if(X.mountains.length!==300)throw new Error('Mountain count changed');

