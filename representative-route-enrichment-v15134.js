// Traten V1.5.134: reduce verified three-point representative routes (batch 2).
// Public model-course checkpoint CT only; waypoint coordinates are weather-grid representatives, not navigation data.
(function(){'use strict';
const FIXED=Object.freeze({
  '荒船山':[{id:'v15134-arafune-tomoiwa',type:'waypoint',name:'艫岩',lat:36.2110,lon:138.6290,elevation:1331,source:'YAMAP公開ルート図準拠（天気格子用代表位置）'}],
  '毛無山':[{id:'v15134-kenashi-fudo-view',type:'waypoint',name:'不動の滝見晴台',lat:35.4055,lon:138.5505,elevation:1180,source:'YAMAP公開ルート図準拠（天気格子用代表位置）'}]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){}
const T=Object.freeze({
  '内山峠登山口→艫岩':121,'艫岩→荒船山（経塚山）':57,'荒船山（経塚山）→艫岩':78,'艫岩→内山峠登山口':66,
  '麓・毛無山登山口→不動の滝見晴台':125,'不動の滝見晴台→毛無山':86,'毛無山→不動の滝見晴台':135,'不動の滝見晴台→麓・毛無山登山口':13
});
const URLS=Object.freeze({'荒船山':'https://yamap.com/model-courses/4052','毛無山':'https://yamap.com/model-courses/47'});
function lookup(a,b){const aa=String(a||'').trim(),bb=String(b||'').trim(),n=T[`${aa}→${bb}`];if(!Number.isFinite(n))return null;const mountain=aa.includes('荒船山')||bb.includes('荒船山')||aa==='艫岩'||bb==='艫岩'?'荒船山':'毛無山';return {minutes:n,source:`YAMAP公開モデルコース ${URLS[mountain]}`,sourceType:'yamap'};}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){}
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){}
const R=Object.freeze({
  '荒船山':{label:'内山峠登山口ルート',via:['waypoint','艫岩','展望地点']},
  '毛無山':{label:'麓・毛無山登山口ルート',via:['waypoint','不動の滝見晴台','展望地点']}
});
if(typeof representativeCourseOptions==='function'){const o=representativeCourseOptions;representativeCourseOptions=function(mountain){let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){}const r=R[k],opts=o(mountain)||[];if(!r)return opts;return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:[c.points[0],r.via,c.points[1],r.via,c.points[2]],source:'V1.5.134 verified checkpoint enrichment'};});};}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){}
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15134=Object.freeze({version:'1.5.134',mountains:Object.freeze(Object.keys(R)),reducedThreePointRoutes:2,policy:'public checkpoint CT; no estimated CT; representative coordinates are not for navigation'});
})();
