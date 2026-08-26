#!/usr/bin/env node
'use strict';
const fs=require('fs'); const vm=require('vm');
global.window=global;
global.document={addEventListener:()=>{},getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],body:{},documentElement:{}};
try{Object.defineProperty(global,'navigator',{value:{userAgent:'node-audit'},configurable:true});}catch(e){}
global.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
global.location={href:'http://localhost/',origin:'http://localhost',pathname:'/'};
global.history={replaceState:()=>{}};
global.fetch=async()=>{throw new Error('network disabled')}; global.L={}; global.Chart=function(){};
global.MutationObserver=function(){this.observe=()=>{};this.disconnect=()=>{}}; global.ResizeObserver=function(){this.observe=()=>{};this.disconnect=()=>{}};
global.requestAnimationFrame=()=>0; global.cancelAnimationFrame=()=>{};
const source=fs.readFileSync('app.js','utf8');
const audit=`(function(){
  candidates=[];
  const rows=[];
  for(const mountain of JAPAN_300_MOUNTAINS){
    const info=nationalMountainGuideInfo(mountain);
    rows.push({mountain,ctLabel:info.ctLabel,ctNote:info.ctNote,routeCount:info.routeCount});
  }
  global.__OUT=rows;
})();`;
vm.runInThisContext(source+audit,{filename:'app.js+national-audit'});
const rows=global.__OUT;
const bad=rows.filter(r=>/情報なし|未登録/.test(r.ctLabel)||/CT情報なし|未登録/.test(r.ctNote));
const out=[
 'トラテン 全国一括判定・標準CT表示監査 V1.4.201',
 '=========================================',
 `対象: ${rows.length}山`,
 `標準CT表示あり: ${rows.length-bad.length}山`,
 `CT情報なし/未登録表示: ${bad.length}山`,
 '',
 ...bad.map(r=>`${r.mountain}: ${r.ctLabel} / ${r.ctNote}`)
];
fs.writeFileSync('NATIONAL_CT_DISPLAY_AUDIT_V14201.txt',out.join('\n'),'utf8');
console.log(out.join('\n'));
