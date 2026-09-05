// Traten V1.5.163: bulk reduction of remaining representative 3-point routes.
// Priority recovery: Kongosan Chihaya-hondo + Mizukoshi-toge routes.
// Public named waypoint, public numeric coordinate, public CT only. No estimated CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '金剛山':[
    {id:'v15163-kongo-tenporinji',type:'waypoint',name:'金剛山転法輪寺',lat:34.421581,lon:135.668381,elevation:null,source:'CODH「日本歴史地名大系」施設・地点項目データセット 金剛山転法輪寺 公開緯度経度 34.421581,135.668381 https://geoshape.ex.nii.ac.jp/nrct-poi/resource/30/300000092300.html'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.139 金剛山 / 千早本道ルート. YAMAP model 26894.
  // 千早本道登山口 08:00 -> 金剛山 09:50 = 110 min.
  // 金剛山 09:50 -> 転法輪寺 09:56 = 6 min.
  // 転法輪寺 09:56 -> 千早本道登山口 11:29 = 93 min. Total 209 min = 03:29.
  '千早本道登山口→金剛山':110,
  '金剛山→金剛山転法輪寺':6,
  '金剛山転法輪寺→千早本道登山口':93,

  // No.140 金剛山 / 水越峠 金剛山ルート. YAMAP model 12195.
  // App fixed point「水越峠 金剛山」corresponds to the model's 水越峠 route start.
  // 水越峠 07:34 -> 金剛山 09:12 = 98 min.
  // 金剛山 09:12 -> 転法輪寺 09:18 = 6 min.
  // 転法輪寺 09:18 -> 水越峠 11:22 = 124 min. Total from pass = 228 min.
  '水越峠 金剛山→金剛山':98,
  '金剛山転法輪寺→水越峠 金剛山':124
});
const SOURCES=Object.freeze({
  '千早本道登山口→金剛山':'YAMAP現行モデル26894「千早本道登山口-金剛山 往復コース」公開チェックポイント時刻 https://yamap.com/model-courses/26894',
  '金剛山→金剛山転法輪寺':'YAMAP現行モデル26894/12195で金剛山→転法輪寺はいずれも6分 https://yamap.com/model-courses/26894 https://yamap.com/model-courses/12195',
  '金剛山転法輪寺→千早本道登山口':'YAMAP現行モデル26894 公開チェックポイント時刻から集約 https://yamap.com/model-courses/26894',
  '水越峠 金剛山→金剛山':'YAMAP現行モデル12195「水越峠-金剛山-金剛山葛木神社 周回コース」水越峠→金剛山を公開チェックポイント時刻から集約 https://yamap.com/model-courses/12195',
  '金剛山転法輪寺→水越峠 金剛山':'YAMAP現行モデル12195 転法輪寺→水越峠を公開チェックポイント時刻から集約 https://yamap.com/model-courses/12195'
});
function lookup(a,b){const key=`${String(a||'').trim()}→${String(b||'').trim()}`,n=T[key];return Number.isFinite(n)?{minutes:n,source:SOURCES[key]||'public route source',sourceType:'public-route'}:null;}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '金剛山':Object.freeze({
    '千早本道ルート':{points:[
      ['trailhead','千早本道登山口','登山口'],
      ['peak','金剛山','山頂'],
      ['waypoint','金剛山転法輪寺','主要通過点'],
      ['trailhead','千早本道登山口','下山口']
    ],source:'YAMAP model 26894 / 金剛山転法輪寺座標 CODH'},
    '水越峠 金剛山ルート':{points:[
      ['trailhead','水越峠 金剛山','登山口'],
      ['peak','金剛山','山頂'],
      ['waypoint','金剛山転法輪寺','主要通過点'],
      ['trailhead','水越峠 金剛山','下山口']
    ],source:'YAMAP model 12195 / 金剛山転法輪寺座標 CODH'}
  })
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const defs=R[k],opts=o(mountain)||[];if(!defs)return opts;
    return opts.map(c=>{const r=defs[c?.label];if(!r)return c;if(Array.isArray(c?.points)&&c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.163 / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15163=Object.freeze({version:'1.5.163',routeNos:Object.freeze([139,140]),mountains:Object.freeze(['金剛山']),reducedThreePointRoutes:2,policy:'public named waypoint + public numeric coordinate + public CT only; no guessed coordinates; no estimated CT'});
})();
