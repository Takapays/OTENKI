// Offline diagnostic tests: extract the shipped browser functions without starting the app.
const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const src=fs.readFileSync('app.js','utf8');
const block=src.slice(src.indexOf('const NATIONAL_E_DIAGNOSTIC_LABELS='),src.indexOf('function renderNationalOutlookMarkers(){'));
const ctx=vm.createContext({}); vm.runInContext(block+'\nthis.reason=nationalEReason;this.collect=nationalECollect;this.limited=nationalComparisonLimited;',ctx);
const series=(w,r)=>Array.from({length:10},(_,i)=>({hour:i+6,ridgeWind:w,estimatedRidgeGust:w*1.5,rain:r}));
const row=(summary,extra={})=>({name:'test',grade:'E',summary,...extra});
const pair=(w,r,t)=>({jmaValues:{series:series(w,r)},gfsRidgeValues:{series:series(w,r)},series:series(w,r).map(x=>({...x,temp:t}))});
const tests=[
 [row('比較不足のためEを維持。'),'missing'],[row('雷・視界の重大な危険条件。'),'thunderVisibility'],
 [row('極端な稜線風・降水。',pair(25,0,0)),'wind'],[row('極端な稜線風・降水。',pair(2,10,0)),'rain'],[row('極端な稜線風・降水。',pair(25,10,0)),'extremeBoth'],
 [row('極端な稜線風・降水。'),'extremeUnknown'],[row('極端な地上風・突風・降水。',{maxWind:20}),'wind'],
 [row('単独モデルでも極端な風・降水。',{modelValues:{metno:{maxRain:10}}}),'rain'],
 [row('複合危険が10時間。',pair(16,2,5)),'windRain'],[row('複合危険が10時間。',pair(16,0,-10)),'windCold'],[row('複合危険が10時間。',pair(16,2,-10)),'compoundMixed'],
 [row('複合危険が5時間。',pair(16,2,5)),'compoundUnknown'],[row('複合危険が10時間。'),'compoundUnknown'],
 [row('従来のE'),'unknown'],[row('',{weatherapiApplied:true,weatherapiBaseGrade:'D'}),'overlay'],[row('',{grade:'D'}),null]
];
for(const [r,want] of tests){const before=JSON.stringify(r);assert.equal(ctx.reason(r),want);assert.equal(JSON.stringify(r),before);}
const {total,groups}=ctx.collect(tests.map(x=>x[0]));assert.equal(total,15);assert.equal([...groups.values()].reduce((n,a)=>n+a.length,0),total);
assert.equal(ctx.collect([]).total,0);
// render path must be called before Leaflet availability check; panel is in the actual HTML.
assert.match(src,/function renderNationalOutlookMarkers\(\)\{\s*renderNationalEDiagnostic\(\);/);
assert.match(fs.readFileSync('index.html','utf8'),/id="nationalEDiagnostic"/);
assert.equal(ctx.reason(row('気象値不足のためE維持。')),'weatherMissing');
const onlyGfs=pair(16,2,5);delete onlyGfs.jmaValues;
assert.equal(ctx.reason(row('複合危険が10時間。',onlyGfs)),'windRain');
assert.equal(ctx.limited(onlyGfs),true);assert.equal(ctx.limited(pair(16,2,5)),false);
assert.equal(ctx.reason(row('極端な稜線風・降水。',{jmaValues:{maxRidgeWind:25}})),'wind');
console.log('PASS: 21 diagnostic assertions, including missing weather, single model, confidence, saved extreme');
