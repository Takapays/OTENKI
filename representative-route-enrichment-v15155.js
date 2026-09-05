// Traten V1.5.155: batched retry of unresolved user-priority three-point courses.
// Completed: No.167 由布岳, No.144 比叡山（雲母坂）.
// Policy: no guessed coordinates, no estimated CT; public checkpoint coordinates and published CT only.
(function(){'use strict';
const FIXED=Object.freeze({
  '由布岳':[
    {id:'v15155-yufu-gonoe',type:'pass',name:'合野越',lat:33.2735278,lon:131.3889444,elevation:1025,source:'YAMAPランドマーク 合野越 北緯33度16分24.7秒 東経131度23分20.2秒 https://yamap.com/landmarks/71610'}
  ],
  '比叡山':[
    {id:'v15155-hiei-shugakuin',type:'peak',name:'修学院山',lat:35.0549444,lon:135.8097222,elevation:340,source:'YAMAP 修学院山 北緯35度3分17.8秒 東経135度48分35秒 https://yamap.com/mountains/21757'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.167 由布岳 / 由布岳正面登山口駐車場ルート。
  // YAMAP model 94764: 正面登山口 08:20 -> 合野越 10:25 = 125分、合野越 -> 由布岳（西峰・豊後富士）11:00 = 35分。
  // アプリの「由布岳」はYAMAP山情報でも標高1,583mの主峰（西峰）。復路は既存の確認済み直通CTを維持する。
  '由布岳正面登山口駐車場→合野越':125,
  '合野越→由布岳':35,

  // No.144 比叡山 / 雲母坂登山口（修学院）ルート。
  // YAMAP model 93195: 比叡山登山口 08:00 -> 修学院山 08:35 = 35分、修学院山 -> 大比叡 10:43 = 128分、
  // 大比叡 10:43 -> 修学院山 12:15 = 92分、修学院山 -> 比叡山登山口 12:40 = 25分。
  // トラテン既存監査で「修学院 比叡山登山口」->「雲母坂登山口（修学院）」の名称対応を確認済み。
  '雲母坂登山口（修学院）→修学院山':35,
  '修学院山→比叡山（大比叡）':128,
  '比叡山（大比叡）→修学院山':92,
  '修学院山→雲母坂登山口（修学院）':25
});
const SOURCE_YUFU='YAMAP 由布登山口バス停-由布岳正面登山口-由布岳 往復モデル https://yamap.com/model-courses/94764 / 合野越公開座標 https://yamap.com/landmarks/71610 / 由布岳主峰1,583m https://yamap.com/mountains/97';
const SOURCE_HIEI='YAMAP 比叡山登山口-修学院山-大比叡 往復モデル https://yamap.com/model-courses/93195 / 修学院山 https://yamap.com/mountains/21757 / トラテン trailhead_reaudit_v1421 名称対応';
function sourceFor(key){return key.includes('由布')||key.includes('合野越')?SOURCE_YUFU:SOURCE_HIEI;}
function lookup(a,b){
  const aa=String(a||'').trim(),bb=String(b||'').trim(),key=`${aa}→${bb}`,n=T[key];
  if(!Number.isFinite(n))return null;
  return {minutes:n,source:sourceFor(key),sourceType:'public-route'};
}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '由布岳':{label:'由布岳正面登山口駐車場ルート',points:[['trailhead','由布岳正面登山口駐車場','登山口'],['pass','合野越','主要通過点'],['peak','由布岳','山頂'],['trailhead','由布岳正面登山口駐車場','下山口']],source:SOURCE_YUFU},
  '比叡山':{label:'雲母坂登山口（修学院）ルート',points:[['trailhead','雲母坂登山口（修学院）','登山口'],['peak','修学院山','主要通過点'],['peak','比叡山（大比叡）','山頂'],['peak','修学院山','主要通過点'],['trailhead','雲母坂登山口（修学院）','下山口']],source:SOURCE_HIEI}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.155 verified enrichment / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15155=Object.freeze({
  version:'1.5.155',
  priorityNos:Object.freeze([167,144]),
  mountains:Object.freeze(Object.keys(R)),
  reducedThreePointRoutes:2,
  blockedPriorityNos:Object.freeze([163,155,154,153,140,139,138,122]),
  auditedPriorityNos:Object.freeze([167,163,155,154,153,144,140,139,138,122]),
  policy:'batched user-priority retry; no guessed coordinates; public CT and coordinates; no estimated CT; four-point enrichment allowed when a verified direct return CT already exists'
});
})();
