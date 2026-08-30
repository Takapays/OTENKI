const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const names=['NORTH_ALPS_COURSE_TIMES','CENTRAL_SOUTH_ALPS_COURSE_TIMES','YATSUGATAKE_CHUSHIN_COURSE_TIMES','WEST_JAPAN_COURSE_TIMES','EAST_NORTH_COURSE_TIMES','SUPPLEMENTAL_COURSE_TIMES'];
function extract(name){
 const start=s.indexOf(`const ${name} = Object.freeze({`); if(start<0) throw name;
 const brace=s.indexOf('{',start); let d=0,i=brace,inStr=null,esc=false;
 for(;i<s.length;i++){let c=s[i]; if(inStr){if(esc)esc=false;else if(c==='\\')esc=true;else if(c===inStr)inStr=null;continue;} if(c==='"'||c==="'"||c==='`'){inStr=c;continue;} if(c==='{')d++; else if(c==='}'&&--d===0)break;}
 return vm.runInNewContext('('+s.slice(brace,i+1)+')');
}
let all={}; for(const n of names) Object.assign(all,extract(n));
console.log('edges',Object.keys(all).length);
const edges=[]; for(const [k,v] of Object.entries(all)){let [a,b]=k.split('→');edges.push({a,b,...v,key:k});}
const out={}; for(const e of edges)(out[e.a]??=[]).push(e);
function norm(src=''){return src.replace(/（[^）]*）/g,'').replace(/・(登山ルート|山行計画|標準CT.*)$/,'').trim();}
let cand=[];
for(const e1 of edges){for(const e2 of (out[e1.b]||[])){
 const key=e1.a+'→'+e2.b;if(e1.a===e2.b||all[key])continue;
 if(norm(e1.source)!==norm(e2.source))continue;
 cand.push({key,minutes:e1.minutes+e2.minutes,via:e1.b,source1:e1.source,source2:e2.source,norm:norm(e1.source)});
}}
console.log('2hop same-source candidates',cand.length);
for(const c of cand.slice(0,200)) console.log(JSON.stringify(c));
