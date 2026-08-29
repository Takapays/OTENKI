#!/usr/bin/env node
'use strict';
const fs=require('fs'),vm=require('vm'),path=require('path');
global.window=global;global.document={addEventListener:()=>{},getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],body:{},documentElement:{}};
try{Object.defineProperty(global,'navigator',{value:{userAgent:'node'},configurable:true});}catch(e){}
global.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};global.location={href:'http://localhost/',origin:'http://localhost',pathname:'/'};global.history={replaceState:()=>{}};global.fetch=async()=>{throw new Error('disabled')};global.L={};global.Chart=function(){};global.MutationObserver=function(){this.observe=()=>{};this.disconnect=()=>{}};global.ResizeObserver=function(){this.observe=()=>{};this.disconnect=()=>{}};global.requestAnimationFrame=()=>0;global.cancelAnimationFrame=()=>{};
const src=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
vm.runInThisContext(src+`\n(function(){const rows=[];let total=0;for(const m of JAPAN_300_MOUNTAINS){const opts=representativeCourseOptions(m);total+=opts.length;for(const c of opts){if(c.generatedConfirmed)rows.push({mountain:m,label:c.label,points:c.points.map(p=>p[1]).join(' → ')});}}global.__R={total,rows};})();`);
const r=global.__R;const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
fs.writeFileSync(path.join(__dirname,'REPRESENTATIVE_EXPANSION_V14198.csv'),'\uFEFFmountain,label,points\n'+r.rows.map(x=>[x.mountain,x.label,x.points].map(q).join(',')).join('\n'));
fs.writeFileSync(path.join(__dirname,'REPRESENTATIVE_EXPANSION_V14198.txt'),`V1.4.198 representative courses: ${r.total}\nconfirmed supplemental generated: ${r.rows.length}\n`+r.rows.map(x=>`${x.mountain}: ${x.label} | ${x.points}`).join('\n'));
console.log(fs.readFileSync(path.join(__dirname,'REPRESENTATIVE_EXPANSION_V14198.txt'),'utf8'));
