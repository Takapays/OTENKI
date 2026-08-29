const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},sessionStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(s+`\nglobalThis.__X={JAPAN_300_MOUNTAINS,representativeCourseOptions,buildRepresentativeResolvedRoute};`,sandbox,{timeout:20000});
const X=sandbox.__X;
let courses=0,total=0,missing=0,derived=0,estimated=0,verified=0,errors=0,alignmentErrors=0;
const lines=[];
for(const mountain of X.JAPAN_300_MOUNTAINS){
  for(const course of X.representativeCourseOptions(mountain)){
    courses++;
    const built=X.buildRepresentativeResolvedRoute(mountain,course);
    if(built.error){errors++;lines.push(`ERROR | ${mountain} | ${course.label} | ${built.error}`);continue;}
    const expected=Math.max(0,(built.resolved||[]).length-1);
    const actual=(built.segments||[]).length;
    if(expected!==actual){alignmentErrors++;lines.push(`ALIGNMENT | ${mountain} | ${course.label} | points=${built.resolved.length} segments=${actual}`);}
    for(let i=0;i<actual;i++){
      const seg=built.segments[i]||{}; total++;
      const from=built.resolved[i]?.name||''; const to=built.resolved[i+1]?.name||'';
      if(seg.missing){missing++;lines.push(`MISSING | ${mountain} | ${course.label} | ${from} -> ${to}`);}
      else if(seg.derived){derived++;lines.push(`DERIVED | ${mountain} | ${course.label} | ${from} -> ${to} | ${seg.minutes}min | ${seg.source||''}`);}
      else if(seg.estimated){estimated++;}
      else verified++;
    }
  }
}
const summary=[
  'トラテン 展開後代表コースCT監査 V1.4.232',
  '========================================',
  `mountains: ${X.JAPAN_300_MOUNTAINS.length}`,
  `courses: ${courses}`,
  `expanded directional segments: ${total}`,
  `verified/composed CT: ${verified}`,
  `estimated CT: ${estimated}`,
  `derived intermediate-point CT: ${derived}`,
  `CT missing: ${missing}`,
  `route build errors: ${errors}`,
  `point/segment alignment errors: ${alignmentErrors}`,
  '',
  ...lines
];
fs.writeFileSync('EXPANDED_CT_AUDIT_V14232.txt',summary.join('\n')+'\n');
console.log(summary.slice(0,11).join('\n'));
if(missing||errors||alignmentErrors)process.exit(2);
