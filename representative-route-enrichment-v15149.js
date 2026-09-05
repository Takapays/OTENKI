// Traten V1.5.149: user-priority three-point course reduction batch.
// Priority No.165 completed. No.167 remains intentionally untouched until a public coordinate for its meaningful checkpoint is verified.
(function(){'use strict';
const FIXED=Object.freeze({
  '鶴見岳':[
    {id:'v15149-tsurumi-honoo-honome',type:'pass',name:'火男火売神社',lat:33.286941,lon:131.429758,elevation:null,source:'國學院大學神社資料由来Wikidata公開座標（火男火売神社上宮） https://www.wikidata.org/wiki/Q135198290'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // Priority No.165 鶴見岳 / 火男火売神社登山口駐車場ルート。
  // YAMAP model 12268 checkpoints:
  // 鶴見岳登山口 火男火売神社駐車場 08:00 -> 分岐 08:05 -> 火男火売神社 08:15 = 15 min.
  // 火男火売神社 08:15 -> 南登山道分れ 08:55 -> 山上駅分れ 09:55 -> 分岐 10:00 -> 分岐 10:05 -> 分岐 10:13 -> 鶴見岳 10:20 = 125 min.
  // Return: 鶴見岳 10:20 -> 火男火売神社 11:55 = 95 min; 火男火売神社 -> parking 12:00 = 5 min.
  '火男火売神社登山口駐車場→火男火売神社':15,
  '火男火売神社→鶴見岳':125,
  '鶴見岳→火男火売神社':95,
  '火男火売神社→火男火売神社登山口駐車場':5
});
const SOURCE='YAMAP公開モデル https://yamap.com/model-courses/12268 / 國學院大學神社資料由来Wikidata公開座標 https://www.wikidata.org/wiki/Q135198290';
function lookup(a,b){const aa=String(a||'').trim(),bb=String(b||'').trim(),n=T[`${aa}→${bb}`];if(!Number.isFinite(n))return null;return {minutes:n,source:SOURCE,sourceType:'public-model'};}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '鶴見岳':{label:'火男火売神社登山口駐車場ルート',points:[['trailhead','火男火売神社登山口駐車場','登山口'],['pass','火男火売神社','主要通過点'],['peak','鶴見岳','山頂'],['pass','火男火売神社','主要通過点'],['trailhead','火男火売神社登山口駐車場','下山口']]}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.149 verified enrichment / ${SOURCE}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15149=Object.freeze({version:'1.5.149',priorityNos:Object.freeze([165]),mountains:Object.freeze(Object.keys(R)),reducedThreePointRoutes:1,blockedPriorityNos:Object.freeze([167]),policy:'user-priority order; no guessed coordinates; meaningful public checkpoints + published checkpoint CT; no estimated CT'});
})();
