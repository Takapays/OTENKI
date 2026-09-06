// Pure JavaScript tests. This is NOT a browser/DOM rendering test.
const assert=require('assert');
const {sandbox,vm}=require('./audit_runtime_v161.js');
const store=new Map();sandbox.localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)};
vm.runInContext('globalThis.__CACHE_TEST={read:readNationalOutlookBrowserCache,write:writeNationalOutlookBrowserCache,key:NATIONAL_OUTLOOK_BROWSER_CACHE_KEY,engine:NATIONAL_OUTLOOK_CACHE_ENGINE}',sandbox);
const api=sandbox.__CACHE_TEST,now=Date.now(),day='2099-09-08',r=[{name:'test',grade:'B'}];let passed=0;
function check(name,fn){fn();console.log('PASS '+name);passed++;}
store.set('saved-routes','KEEP');store.set('analysis-history','KEEP');
check('v6 old engine is not reused',()=>{store.set('traten:national-outlook:v6',JSON.stringify({date:day,results:r}));assert.equal(api.read(day),null)});
check('valid server expiration accepted',()=>{api.write(day,r,{freshUntil:new Date(now+1800000).toISOString(),generatedAt:new Date(now-12600000).toISOString()},api.engine);assert.equal(api.read(day)[0].grade,'B')});
check('read does not renew expiration',()=>{const before=store.get(api.key);api.read(day);api.read(day);assert.equal(store.get(api.key),before)});
check('remaining TTL is server remainder not four new hours',()=>{assert.equal(JSON.parse(store.get(api.key)).expiresAt,now+1800000)});
check('different date rejected',()=>assert.equal(api.read('2099-09-09'),null));
check('wrong engine rejected',()=>{api.write(day,r,{freshUntil:new Date(now+1800000).toISOString()},'metno-gfs-v1');assert.equal(api.read(day),null)});
check('expired results not persisted as fresh',()=>{api.write(day,r,{freshUntil:new Date(now-1).toISOString()},api.engine);assert.equal(api.read(day),null)});
check('missing expiry fails closed',()=>{api.write(day,r,{},api.engine);assert.equal(api.read(day),null)});
check('invalid JSON safe',()=>{store.set(api.key,'{');assert.equal(api.read(day),null)});
check('saved routes and analysis history untouched',()=>{assert.equal(store.get('saved-routes'),'KEEP');assert.equal(store.get('analysis-history'),'KEEP')});
console.log(JSON.stringify({suite:'pure-JS-cache',passed,browserRendering:false}));
