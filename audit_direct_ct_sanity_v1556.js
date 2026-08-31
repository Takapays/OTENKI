const fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('app.js','utf8');
const sandbox={console:{log:()=>{},warn:()=>{},error:()=>{}},setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{}},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(source+'\nglobalThis.__A={APP_VERSION,JAPAN_300_MOUNTAINS,regionalCandidates,builtinCandidates,fixedNameFallbackCandidates,directCourseTimeInfoByNames,normalizeCourseTimePointName,canonicalCourseTimeEndpointName,haversineKm,isClosedCourseTimePair};',sandbox,{timeout:30000});
const X=sandbox.__A;
const rows=[],seen=new Set(); let checked=0;
for(const m of X.JAPAN_300_MOUNTAINS){
 const pts=[...(X.builtinCandidates(m)||[]),...(X.regionalCandidates(m)||[]),...(X.fixedNameFallbackCandidates(m)||[])].filter(p=>p&&p.lat!=null&&p.lon!=null&&Number.isFinite(+p.lat)&&Number.isFinite(+p.lon));
 for(const a of pts)for(const b of pts){if(a===b)continue;const an=X.canonicalCourseTimeEndpointName(X.normalizeCourseTimePointName(a.name)),bn=X.canonicalCourseTimeEndpointName(X.normalizeCourseTimePointName(b.name));if(X.isClosedCourseTimePair(an,bn))continue;const info=X.directCourseTimeInfoByNames(an,bn)||X.directCourseTimeInfoByNames(a.name,b.name);if(!info)continue;const sig=`${m}|${a.name}|${b.name}`;if(seen.has(sig))continue;seen.add(sig);checked++;const min=+info.minutes;if(!Number.isFinite(min)||min<=0)continue;const km=X.haversineKm(+a.lat,+a.lon,+b.lat,+b.lon),speed=km/(min/60);if((km>=0.5&&speed>12)||(km>=2&&min<=15))rows.push({mountain:m,from:a.name,to:b.name,minutes:min,distanceKm:+km.toFixed(2),impliedKmh:+speed.toFixed(1),source:info.source||''});
 }
}
const result={version:X.APP_VERSION,checkedCandidateDirectPairs:checked,suspicious:rows.length,rows:rows.sort((a,b)=>b.impliedKmh-a.impliedKmh)};
process.stdout.write(JSON.stringify(result,null,2)+'\n');
if(rows.length)process.exitCode=2;
