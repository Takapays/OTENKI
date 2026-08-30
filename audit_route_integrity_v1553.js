const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{}},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);vm.runInContext(s+'\nglobalThis.__X={MOUNTAIN_REGION,REGIONAL_CATALOG,regionalCandidates,courseTimeInfo,shortestVerifiedCourseTimeInfo,verifiedComposedPathIsImplausible};',sandbox,{timeout:30000}); const X=sandbox.__X;
const yatsu=(X.REGIONAL_CATALOG.yatsu_south||[]).reduce((m,p)=>(m[p.name]=p,m),{});
const checks=[
 ['美濃戸口','赤岳鉱泉',187],['赤岳鉱泉','美濃戸口',87],['美濃戸口','行者小屋',223],['行者小屋','美濃戸口',187],
 ['美濃戸','赤岳鉱泉',135],['赤岳鉱泉','美濃戸',45],['美濃戸','行者小屋',171],['行者小屋','美濃戸',145]
].map(([a,b,want])=>{const r=X.courseTimeInfo(yatsu[a],yatsu[b]);return {area:'八ヶ岳',from:a,to:b,want,got:r?.minutes??null,composed:!!r?.composed,via:r?.via||[],pass:r?.minutes===want&&!r?.estimated};});
const extraChecks=[
 ['central_kisokoma_utsugi','空木平避難小屋','空木駒峰ヒュッテ',44],
 ['nishiho_yake','焼岳小屋','焼岳',59],['nishiho_yake','焼岳','焼岳小屋',160]
].map(([area,a,b,want])=>{const m=Object.fromEntries((X.REGIONAL_CATALOG[area]||[]).map(p=>[p.name,p]));const r=X.courseTimeInfo(m[a],m[b]);return {area,from:a,to:b,want,got:r?.minutes??null,composed:!!r?.composed,via:r?.via||[],pass:r?.minutes===want&&!r?.estimated};});
checks.push(...extraChecks);
let suspiciousRaw=[], leaked=[];
const seen=new Set();
for(const mountain of Object.keys(X.MOUNTAIN_REGION)){
  const points=[...new Map((X.regionalCandidates(mountain)||[]).map(p=>[p.name,p])).values()];
  const sig=points.map(p=>p.name).sort().join('|'); if(seen.has(sig))continue; seen.add(sig);
  for(const a of points)for(const b of points){if(a.name===b.name)continue;
    const raw=X.shortestVerifiedCourseTimeInfo(a.name,b.name);
    if(raw&&X.verifiedComposedPathIsImplausible(a,b,raw)){
      suspiciousRaw.push({mountain,from:a.name,to:b.name,minutes:raw.minutes,via:raw.via||[]});
      const safe=X.courseTimeInfo(a,b);
      if(safe&&safe.composed&&X.verifiedComposedPathIsImplausible(a,b,safe)) leaked.push({mountain,from:a.name,to:b.name,minutes:safe.minutes,via:safe.via||[]});
    }
  }
}
const out={version:'1.5.53',targeted:checks,summary:{targetedPass:checks.filter(x=>x.pass).length,targetedTotal:checks.length,uniqueCandidateSets:seen.size,rawImplausibleDetected:suspiciousRaw.length,implausibleLeakedToUI:leaked.length},rawImplausible:suspiciousRaw,leaked};
fs.writeFileSync('ROUTE_INTEGRITY_AUDIT_V1553.json',JSON.stringify(out,null,2));
fs.writeFileSync('ROUTE_INTEGRITY_AUDIT_V1553.txt',[`TRATEN V1.5.53 ROUTE INTEGRITY AUDIT`,`targeted=${out.summary.targetedPass}/${out.summary.targetedTotal}`,`uniqueCandidateSets=${out.summary.uniqueCandidateSets}`,`rawImplausibleDetected=${out.summary.rawImplausibleDetected}`,`implausibleLeakedToUI=${out.summary.implausibleLeakedToUI}`,'',...checks.map(x=>`${x.pass?'PASS':'FAIL'} ${x.from}->${x.to} ${x.got}min expected=${x.want} composed=${x.composed} via=${x.via.join('>')}`),'','DETECTED AND BLOCKED:',...suspiciousRaw.map(x=>`${x.mountain}\t${x.from}->${x.to}\t${x.minutes}min\tvia=${x.via.join('>')}`)].join('\n')+'\n');
console.log(JSON.stringify(out.summary,null,2)); if(checks.some(x=>!x.pass)||leaked.length)process.exitCode=2;
