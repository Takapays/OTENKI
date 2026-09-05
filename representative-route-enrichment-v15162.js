// Traten V1.5.162: bulk reduction of remaining representative 3-point routes.
// Public named waypoints, public numeric coordinates, public CT only. No estimated CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '飯縄山':[
    {id:'v15162-iizuna-south',type:'peak',name:'飯縄山南峰',lat:36.7362722,lon:138.1306194,elevation:1909,source:'國學院大學デジタル・ミュージアム「飯縄神社奥宮」北緯36度44分10.58秒 東経138度7分50.23秒 https://jmapps.ne.jp/kokugakuin/det.html?data_id=181995'}
  ],
  '七面山':[
    {id:'v15162-shichimen-keishinin',type:'hut',name:'敬慎院',lat:35.3764153,lon:138.3577283,elevation:null,source:'MapFan 七面山敬慎院 公開緯度経度 35.3764153,138.3577283 https://mapfan.com/spots/SWQY%2CJ%2C4BZVW'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.69 飯縄山. Yamareco public plan p5458641.
  // 一ノ鳥居苑地 08:00 -> 南登山口入口 08:19 -> 南登山口 08:25 -> 駒つなぎの場 09:38
  // -> 西登山道分岐 10:58 -> 南峰（飯縄神社）11:23 = 203 min? No: 19+6+73+80? Source says 70 from 駒つなぎ to西分岐, then15 = 183.
  // 南峰 11:23 -> 飯縄山 11:34 = 11; 飯縄山 12:07 -> 南峰 12:17 = 10.
  // 南峰 12:17 -> 西分岐 12:25 -> 駒つなぎ 13:04 -> 南登山口 13:55 -> 南登山口入口 13:59 -> 一ノ鳥居苑地 14:15 = 118? 8+39+51? Source says 駒つなぎ->南登山口 41, so 108.
  '一の鳥居苑地・飯縄山登山者駐車場→飯縄山南峰':183,
  '飯縄山南峰→飯縄山':11,
  '飯縄山→飯縄山南峰':10,
  '飯縄山南峰→一の鳥居苑地・飯縄山登山者駐車場':108,

  // No.97 七面山. YAMAP model 22284 public checkpoint schedule.
  // 七面山表参道入口（羽衣）07:00 -> 七面山11:24 = 264.
  // 七面山11:24 -> 敬慎院12:11 = 47.
  // 敬慎院12:11 -> 七面山表参道入口（羽衣）14:59 = 168.
  '羽衣・七面山表参道駐車場→七面山':264,
  '七面山→敬慎院':47,
  '敬慎院→羽衣・七面山表参道駐車場':168
});
const SOURCES=Object.freeze({
  '一の鳥居苑地・飯縄山登山者駐車場→飯縄山南峰':'ヤマレコ公開山行計画 p5458641（一ノ鳥居苑地→南峰（飯縄神社）を公開区間CTから集約） https://www.yamareco.com/modules/yr_plan/detail-5458641.html',
  '飯縄山南峰→飯縄山':'ヤマレコ公開山行計画 p5458641 https://www.yamareco.com/modules/yr_plan/detail-5458641.html',
  '飯縄山→飯縄山南峰':'ヤマレコ公開山行計画 p5458641 https://www.yamareco.com/modules/yr_plan/detail-5458641.html',
  '飯縄山南峰→一の鳥居苑地・飯縄山登山者駐車場':'ヤマレコ公開山行計画 p5458641（南峰→一ノ鳥居苑地を公開区間CTから集約） https://www.yamareco.com/modules/yr_plan/detail-5458641.html',
  '羽衣・七面山表参道駐車場→七面山':'YAMAP現行モデル22284「七面山表参道」公開チェックポイント時刻。アプリの「羽衣・七面山表参道駐車場」は同表参道の羽衣起点として名称対応。 https://yamap.com/model-courses/22284',
  '七面山→敬慎院':'YAMAP現行モデル22284 公開チェックポイント時刻 https://yamap.com/model-courses/22284',
  '敬慎院→羽衣・七面山表参道駐車場':'YAMAP現行モデル22284（敬慎院→羽衣起点を公開チェックポイント時刻から集約） https://yamap.com/model-courses/22284'
});
function lookup(a,b){const key=`${String(a||'').trim()}→${String(b||'').trim()}`,n=T[key];return Number.isFinite(n)?{minutes:n,source:SOURCES[key]||'public route source',sourceType:'public-route'}:null;}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '飯縄山':{label:'一の鳥居苑地・飯縄山登山者駐車場ルート',points:[
    ['trailhead','一の鳥居苑地・飯縄山登山者駐車場','登山口'],
    ['peak','飯縄山南峰','主要通過点'],
    ['peak','飯縄山','山頂'],
    ['peak','飯縄山南峰','主要通過点'],
    ['trailhead','一の鳥居苑地・飯縄山登山者駐車場','下山口']
  ],source:'ヤマレコ p5458641 / 飯縄神社奥宮座標 國學院大學デジタル・ミュージアム'},
  '七面山':{label:'羽衣・七面山表参道駐車場ルート',points:[
    ['trailhead','羽衣・七面山表参道駐車場','登山口'],
    ['peak','七面山','山頂'],
    ['hut','敬慎院','主要通過点'],
    ['trailhead','羽衣・七面山表参道駐車場','下山口']
  ],source:'YAMAP model 22284 / 敬慎院座標 MapFan'}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label)return c;if(Array.isArray(c?.points)&&c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.162 / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15162=Object.freeze({version:'1.5.162',routeNos:Object.freeze([69,97]),mountains:Object.freeze(['飯縄山','七面山']),reducedThreePointRoutes:2,policy:'public named waypoint + public numeric coordinate + public CT only; no guessed coordinates; no estimated CT'});
})();
