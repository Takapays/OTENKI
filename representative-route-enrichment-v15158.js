// Traten V1.5.158: continue reducing representative 3-point routes with public named waypoints only.
// No guessed coordinates and no estimated CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '金時山':[
    {id:'v15158-kintoki-yagurasawa',type:'pass',name:'矢倉沢峠',lat:35.2822,lon:139.01198,elevation:871,source:'GeoNames/OpenStreetMap公開位置（Mapcarta表示）35.2822,139.01198 https://mapcarta.com/33164560'}
  ],
  '経ヶ岳（福井）':[
    {id:'v15158-fukui-kyoga-hodzuki',type:'peak',name:'保月山',lat:36.0383492,lon:136.6013967,elevation:1273,source:'MapFan公開座標 36.0383492,136.6013967 https://mapfan.com/spots/SYQIA%2CJ%2CUL7'}
  ],
  '倶留尊山':[
    {id:'v15158-kuroso-nihonboso',type:'peak',name:'二本ボソ',lat:34.313456,lon:136.100501,elevation:996,source:'まめ登山部公開標高データ 34.313456,136.100501 https://www.mame-vin.jp/?page_id=40425'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.95 金時山: YAMAP model 10657. App start is exactly 金時見晴パーキング.
  // 金時見晴パーキング 08:05 -> 矢倉沢峠 08:07 = 2
  // 矢倉沢峠 08:07 -> 金時山 09:27 = 80 (via published model checkpoints)
  '金時見晴パーキング→矢倉沢峠':2,
  '矢倉沢峠→金時山':80,

  // No.118 経ヶ岳（福井）: Yamareco public plan p5518983.
  // 奥越高原青少年自然の家 -> 保月山 = 46+22+86 = 154
  // 保月山 -> 経ヶ岳 = 7+44+16+11+52 = 130
  // 経ヶ岳 -> 保月山 = 28+20+14+25+8 = 95
  // 保月山 -> 奥越高原青少年自然の家 = 48+13+27 = 88
  '奥越高原青少年自然の家→保月山':154,
  '保月山→経ヶ岳（福井）':130,
  '経ヶ岳（福井）→保月山':95,
  '保月山→奥越高原青少年自然の家':88,

  // No.131 倶留尊山: YAMAP models 94896 + 2307.
  // 曽爾高原 model start 08:00 -> 二本ボソ 09:34 = 94
  // 二本ボソ 09:09 -> 倶留尊山 09:44 = 35 in model 2307.
  '曽爾高原 倶留尊山登山口→二本ボソ':94,
  '二本ボソ→倶留尊山':35
});
const SOURCES=Object.freeze({
  '金時見晴パーキング→矢倉沢峠':'YAMAP現行モデル10657 https://yamap.com/model-courses/10657',
  '矢倉沢峠→金時山':'YAMAP現行モデル10657（公開チェックポイント区間合算） https://yamap.com/model-courses/10657',
  '奥越高原青少年自然の家→保月山':'ヤマレコ公開山行計画 p5518983（公開区間合算） https://www.yamareco.com/modules/yr_plan/detail-5518983.html',
  '保月山→経ヶ岳（福井）':'ヤマレコ公開山行計画 p5518983（公開区間合算） https://www.yamareco.com/modules/yr_plan/detail-5518983.html',
  '経ヶ岳（福井）→保月山':'ヤマレコ公開山行計画 p5518983（公開区間合算） https://www.yamareco.com/modules/yr_plan/detail-5518983.html',
  '保月山→奥越高原青少年自然の家':'ヤマレコ公開山行計画 p5518983（公開区間合算） https://www.yamareco.com/modules/yr_plan/detail-5518983.html',
  '曽爾高原 倶留尊山登山口→二本ボソ':'YAMAP現行モデル94896「曽爾高原-亀山峠-二本ボソ」公開チェックポイント区間合算 https://yamap.com/model-courses/94896',
  '二本ボソ→倶留尊山':'YAMAP現行モデル2307 公開チェックポイント区間合算 https://yamap.com/model-courses/2307'
});
function lookup(a,b){const key=`${String(a||'').trim()}→${String(b||'').trim()}`,n=T[key];return Number.isFinite(n)?{minutes:n,source:SOURCES[key]||'public route source',sourceType:'public-route'}:null;}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '金時山':{label:'金時見晴パーキングルート',points:[
    ['trailhead','金時見晴パーキング','登山口'],
    ['pass','矢倉沢峠','主要通過点'],
    ['peak','金時山','山頂'],
    ['trailhead','金時見晴パーキング','下山口']
  ],source:'YAMAP model 10657 / 矢倉沢峠座標 Mapcarta'},
  '経ヶ岳（福井）':{label:'奥越高原青少年自然の家ルート',points:[
    ['trailhead','奥越高原青少年自然の家','登山口'],
    ['peak','保月山','主要通過点'],
    ['peak','経ヶ岳（福井）','山頂'],
    ['peak','保月山','主要通過点'],
    ['trailhead','奥越高原青少年自然の家','下山口']
  ],source:'Yamareco p5518983 / 保月山座標 MapFan'},
  '倶留尊山':{label:'曽爾高原 倶留尊山登山口ルート',points:[
    ['trailhead','曽爾高原 倶留尊山登山口','登山口'],
    ['peak','二本ボソ','主要通過点'],
    ['peak','倶留尊山','山頂'],
    ['trailhead','曽爾高原 倶留尊山登山口','下山口']
  ],source:'YAMAP models 94896/2307 / 二本ボソ座標 まめ登山部'}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label)return c;return {...c,points:r.points,source:`V1.5.158 / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15158=Object.freeze({version:'1.5.158',routeNos:Object.freeze([95,118,131]),mountains:Object.freeze(['金時山','経ヶ岳（福井）','倶留尊山']),reducedThreePointRoutes:3,policy:'public named waypoint + public numeric coordinate + public CT only; direct return CT retained where route is intentionally 4 points; no estimated CT'});
})();
