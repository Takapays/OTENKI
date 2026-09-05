// Traten V1.5.161: continue priority three-point route reduction.
// No.153 Sanbe north/Himenogaike route: rebuild as a public Sanbe family loop.
// Uses waypoints already registered in V1.5.157. Public CT only; no estimated CT.
(function(){'use strict';
const T=Object.freeze({
  // YAMAP model 95040, standard time 06:16 = 376 min.
  // 姫逃池駐車場 07:00 -> 男三瓶山 08:49 = 109
  // 男三瓶山 08:49 -> 子三瓶山 10:04 = 75
  // 子三瓶山 10:04 -> 孫三瓶山 11:01 = 57
  // 孫三瓶山 11:01 -> 女三瓶山 12:33 = 92
  // 女三瓶山 12:33 -> 姫逃池駐車場 13:16 = 43
  '北の原・姫逃池登山口→三瓶山（男三瓶山）':109,
  '三瓶山（男三瓶山）→子三瓶山':75,
  '子三瓶山→孫三瓶山':57,
  '孫三瓶山→女三瓶山':92,
  '女三瓶山→北の原・姫逃池登山口':43
});
const SOURCE='YAMAP現行モデル95040「姫逃池登山口-男三瓶山-扇沢-子三瓶山-風越-奥の湯峠-女 周回コース」公開チェックポイント時刻 https://yamap.com/model-courses/95040 / 子三瓶山・孫三瓶山・女三瓶山の公開数値座標はV1.5.157登録済み';
function lookup(a,b){const key=`${String(a||'').trim()}→${String(b||'').trim()}`,n=T[key];return Number.isFinite(n)?{minutes:n,source:SOURCE,sourceType:'public-model'}:null;}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '三瓶山':{label:'北の原・姫逃池ルート',points:[
    ['trailhead','北の原・姫逃池登山口','登山口'],
    ['peak','三瓶山（男三瓶山）','主峰'],
    ['peak','子三瓶山','主要通過点'],
    ['peak','孫三瓶山','主要通過点'],
    ['peak','女三瓶山','主要通過点'],
    ['trailhead','北の原・姫逃池登山口','下山口']
  ],source:SOURCE}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label)return c;if(Array.isArray(c?.points)&&c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.161 / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15161=Object.freeze({version:'1.5.161',routeNos:Object.freeze([153]),mountains:Object.freeze(['三瓶山']),reducedThreePointRoutes:1,remainingPriorityNos:Object.freeze([163,140,139,138,122]),policy:'public named waypoint + public numeric coordinate + public CT only; no guessed coordinates; no estimated CT'});
})();
