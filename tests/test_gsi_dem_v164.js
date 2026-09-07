const fs=require('fs'),vm=require('vm'),assert=require('assert');
const src=fs.readFileSync('app.js','utf8');
const start=src.indexOf("const GSI_ELEVATION_DATASETS=");
const end=src.indexOf("async function ensureElevations(points){",start);
if(start<0||end<0)throw new Error('GSI helper block missing');
const code=src.slice(start,end);
const ctx={console,Math,Map,Set,Array,Number,String,Promise,URLSearchParams,Response,Headers,Blob,
  clamp:(v,a,b)=>Math.max(a,Math.min(b,v)),
  proxyFetch:async()=>{throw new Error('network disabled in static test')},
  createImageBitmap:async()=>{throw new Error('network disabled in static test')},
  document:{createElement(){throw new Error('DOM disabled in static test')}}
};
vm.createContext(ctx);vm.runInContext(code+'\nthis.__datasets=GSI_ELEVATION_DATASETS;this.__decode=decodeGsiElevationRgb;this.__tile=gsiTilePixel;',ctx);
assert.deepStrictEqual(Array.from(ctx.__datasets,x=>x.id),['DEM5A','DEM5B','DEM5C','DEM10B']);
assert(Math.abs(ctx.__decode(0,0,100)-1.00)<1e-9);
assert(Number.isNaN(ctx.__decode(128,0,0)));
// signed negative: x=2^24-100 => -1.00m
assert(Math.abs(ctx.__decode(255,255,156)+1.00)<1e-9);
const t=ctx.__tile(35.681236,139.767125,15);
assert(Number.isInteger(t.x)&&Number.isInteger(t.y)&&t.px>=0&&t.px<256&&t.py>=0&&t.py<256);
console.log(JSON.stringify({suite:'gsi-dem-v164',passed:5,datasets:Array.from(ctx.__datasets,x=>x.id),tokyoTile:t}));
