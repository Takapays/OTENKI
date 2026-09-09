const fs=require('fs'),vm=require('vm');
const src=fs.readFileSync(__dirname+'/../app.js','utf8');
const a=src.indexOf('function numberOrNaN');
const b=src.indexOf('function dualEnsembleAgreement',a);
if(a<0||b<0)throw new Error('policy functions not found');
const ctx={console,Math};vm.createContext(ctx);vm.runInContext(src.slice(a,b),ctx);
const P=(id,row)=>({provider:{id,kind:'fallback'},row});
let out=ctx.blendProviderRowsSingleGroup([
 P('metno',{temp:3,wind:2,gust:NaN,rain:0,rh:80,cloud:50,cape:0}),
 P('noaa-gfs',{temp:18,wind:2.4,gust:30,rain:0,rh:70,cloud:50,cape:0}),
 P('meteoblue',{temp:4,wind:2.2,gust:8,rain:0,rh:75,cloud:50,cape:0})
]);
if(out.temp!==3)throw new Error('GFS temperature leaked '+out.temp);
if(out.gust!==8)throw new Error('GFS gust leaked '+out.gust);
out=ctx.blendProviderRowsSingleGroup([
 P('metno',{temp:3,wind:2,gust:NaN,rain:0,rh:80,cloud:50,cape:0}),
 P('noaa-gfs',{temp:18,wind:10,gust:30,rain:2,rh:70,cloud:50,cape:0}),
 P('meteoblue',{temp:4,wind:4,gust:8,rain:.4,rh:75,cloud:50,cape:0})
]);
if(Math.abs(out.wind-4)>1e-9)throw new Error('wind arbiter failed '+out.wind);
if(Math.abs(out.rain-.4)>1e-9)throw new Error('rain arbiter failed '+out.rain);
console.log('V1.6.28 app element policy tests: PASS');
