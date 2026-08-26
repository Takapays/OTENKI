#!/usr/bin/env node
'use strict';
const fs=require('fs');
const vm=require('vm');
const path=require('path');

const ROOT=__dirname;
const APP=path.join(ROOT,'app.js');
const OUT_TXT=path.join(ROOT,'CT_COVERAGE_AUDIT_V14153.txt');
const OUT_CSV=path.join(ROOT,'CT_MISSING_SEGMENTS_V14153.csv');
const OUT_EST=path.join(ROOT,'CT_ESTIMATED_SEGMENTS_V14153.csv');

// Browser-only globals are stubbed because this audit only reads fixed route/CT data.
global.window=global;
global.document={addEventListener:()=>{},getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],body:{},documentElement:{}};
try{Object.defineProperty(global,'navigator',{value:{userAgent:'node-ct-audit'},configurable:true});}catch(e){}
global.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
global.location={href:'http://localhost/',origin:'http://localhost',pathname:'/'};
global.history={replaceState:()=>{}};
global.fetch=async()=>{throw new Error('network disabled in CT audit')};
global.L={};
global.Chart=function(){};
global.MutationObserver=function(){this.observe=()=>{};this.disconnect=()=>{}};
global.ResizeObserver=function(){this.observe=()=>{};this.disconnect=()=>{}};
global.requestAnimationFrame=()=>0;
global.cancelAnimationFrame=()=>{};

const source=fs.readFileSync(APP,'utf8');
const audit=`
(function(){
  const buckets={
    curated:{courses:0,segments:0,covered:0,verified:0,estimated:0,missing:0},
    generated:{courses:0,segments:0,covered:0,verified:0,estimated:0,missing:0},
    all:{courses:0,segments:0,covered:0,verified:0,estimated:0,missing:0}
  };
  const missingRows=[];
  const coveredRows=[];
  for(const mountain of JAPAN_300_MOUNTAINS){
    const options=representativeCourseOptions(mountain);
    for(const course of options){
      const group=course.generated?'generated':'curated';
      buckets[group].courses++;
      buckets.all.courses++;
      for(let i=1;i<course.points.length;i++){
        const from=course.points[i-1][1], to=course.points[i][1];
        const info=courseTimeInfo({name:from},{name:to});
        for(const b of [buckets[group],buckets.all]){
          b.segments++;
          if(info){b.covered++; if(info.estimated)b.estimated++; else b.verified++;} else b.missing++;
        }
        const row={mountain,course:course.label||'',from,to,generated:!!course.generated,
          minutes:info?Number(info.minutes):null,source:info?.source||'',composed:!!info?.composed,estimated:!!info?.estimated};
        (info?coveredRows:missingRows).push(row);
      }
    }
  }
  for(const b of Object.values(buckets)){
    b.coveragePct=b.segments?b.covered/b.segments*100:0;
    b.missingPct=b.segments?b.missing/b.segments*100:0;
  }
  const missingByMountain={};
  for(const r of missingRows)missingByMountain[r.mountain]=(missingByMountain[r.mountain]||0)+1;
  const priority=Object.entries(missingByMountain).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'ja'));
  global.__CT_AUDIT_RESULT__={buckets,missingRows,coveredRows,priority,mountainCount:JAPAN_300_MOUNTAINS.length};
})();`;
vm.runInThisContext(source+audit,{filename:'app.js+ct-audit'});
const result=global.__CT_AUDIT_RESULT__;
const p=n=>Number(n).toFixed(1);
const lines=[
  'トラテン CTカバー率監査 V1.4.153',
  '================================',
  '',
  '【主指標】画面で提示される代表コース候補の隣接区間',
  `対象: ${result.mountainCount}山 / ${result.buckets.all.courses}コース / ${result.buckets.all.segments}方向区間`,
  `CTあり: ${result.buckets.all.covered}区間 (${p(result.buckets.all.coveragePct)}%)`,
  `  確認済みCT: ${result.buckets.all.verified}区間`,
  `  推定CT: ${result.buckets.all.estimated}区間`,
  `CT情報なし: ${result.buckets.all.missing}区間 (${p(result.buckets.all.missingPct)}%)`,
  '',
  '【内訳】確認済み・手動/自動代表コース',
  `コース: ${result.buckets.curated.courses}`,
  `CTあり: ${result.buckets.curated.covered}/${result.buckets.curated.segments} (${p(result.buckets.curated.coveragePct)}%)`,
  `CT情報なし: ${result.buckets.curated.missing}/${result.buckets.curated.segments} (${p(result.buckets.curated.missingPct)}%)`,
  '',
  '【内訳】固定候補から自動生成される予備代表コース',
  `コース: ${result.buckets.generated.courses}`,
  `CTあり: ${result.buckets.generated.covered}/${result.buckets.generated.segments} (${p(result.buckets.generated.coveragePct)}%)`,
  `  確認済みCT: ${result.buckets.generated.verified}`,
  `  推定CT: ${result.buckets.generated.estimated}`, 
  `CT情報なし: ${result.buckets.generated.missing}/${result.buckets.generated.segments} (${p(result.buckets.generated.missingPct)}%)`,
  '',
  '【解釈】',
  '- 確認済みCTは常に推定CTより優先。',
  '- V1.4.153では未確認の固定登山口↔山頂にのみ推定CTを適用し、画面では「推定CT」と明示する。',
  '- 推定CTは固定座標・標高差と確認済み26区間で校正した回帰式による参考値。',
  '- 公式/公的資料・ヤマケイ・ヤマレコ等の確認済みCTを追加すると、その区間の推定CTは自動的に置き換わる。',
  '- CT情報源優先順位: 公式/公的資料 → ヤマケイ → ヤマレコ → その他 → YAMAP → 推定CT。',
  '',
  '【CT情報なしが多い山（上位）】',
  ...result.priority.slice(0,40).map(([m,n])=>`${m}: ${n}区間`),
  ''
];
fs.writeFileSync(OUT_TXT,lines.join('\n'),'utf8');
const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
const csv=['mountain,course,from,to,generated',...result.missingRows.map(r=>[r.mountain,r.course,r.from,r.to,r.generated?'1':'0'].map(q).join(','))];
fs.writeFileSync(OUT_CSV,'\uFEFF'+csv.join('\n'),'utf8');
const est=result.coveredRows.filter(r=>r.estimated);
const estCsv=['mountain,course,from,to,minutes,source',...est.map(r=>[r.mountain,r.course,r.from,r.to,r.minutes,r.source].map(q).join(','))];
fs.writeFileSync(OUT_EST,'\uFEFF'+estCsv.join('\n'),'utf8');
console.log(lines.slice(0,18).join('\n'));
console.log(`\nCSV: ${OUT_CSV}`);
