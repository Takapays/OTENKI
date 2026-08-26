#!/usr/bin/env node
'use strict';
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname;
global.window=global;global.document={addEventListener:()=>{},getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],body:{},documentElement:{}};
try{Object.defineProperty(global,'navigator',{value:{userAgent:'node'},configurable:true});}catch(e){}
global.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};global.location={href:'http://localhost/',origin:'http://localhost',pathname:'/'};global.history={replaceState:()=>{}};global.fetch=async()=>{throw new Error('disabled')};global.L={};global.Chart=function(){};global.MutationObserver=function(){this.observe=()=>{};this.disconnect=()=>{}};global.ResizeObserver=function(){this.observe=()=>{};this.disconnect=()=>{}};global.requestAnimationFrame=()=>0;global.cancelAnimationFrame=()=>{};
const oldCsv=fs.readFileSync('/mnt/data/traten-v1.4.197-hut-label-national-ct-fix/CT_ESTIMATED_SEGMENTS_V14197.csv','utf8').replace(/^\uFEFF/,'').trim().split(/\r?\n/);
function parse(line){const a=[];let v='',q=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'){if(q&&line[i+1]==='"'){v+='"';i++;}else q=!q;}else if(c===','&&!q){a.push(v);v='';}else v+=c;}a.push(v);return a;}
const hdr=parse(oldCsv[0]);const old=oldCsv.slice(1).map(x=>{const a=parse(x),o={};hdr.forEach((h,i)=>o[h]=a[i]);return o;});
const newLines=fs.readFileSync(path.join(root,'CT_ESTIMATED_SEGMENTS_V14198.csv'),'utf8').replace(/^\uFEFF/,'').trim().split(/\r?\n/);const nh=parse(newLines[0]);const nset=new Set(newLines.slice(1).map(x=>{const a=parse(x),o={};nh.forEach((h,i)=>o[h]=a[i]);return [o.mountain,o.course,o.from,o.to].join('\u0001');}));
const removed=old.filter(o=>!nset.has([o.mountain,o.course,o.from,o.to].join('\u0001')));
const src=fs.readFileSync(path.join(root,'app.js'),'utf8');
vm.runInThisContext(src+`\n(function(){global.__ct_lookup=(a,b)=>courseTimeInfo({name:a},{name:b});})();`);
const qv=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
const rows=removed.map(r=>{const info=global.__ct_lookup(r.from,r.to);return {...r,newMinutes:info?.minutes??'',newSource:info?.source??'',sourceType:info?.sourceType??''};});
const out=['mountain,course,from,to,oldEstimatedMinutes,confirmedMinutes,source,sourceType',...rows.map(r=>[r.mountain,r.course,r.from,r.to,r.minutes,r.newMinutes,r.newSource,r.sourceType].map(qv).join(','))];
fs.writeFileSync(path.join(root,'CT_VERIFIED_UPGRADES_V14198.csv'),'\uFEFF'+out.join('\n'),'utf8');
console.log('verified upgrades:',rows.length);
