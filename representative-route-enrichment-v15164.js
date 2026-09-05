// Traten V1.5.164: batch reduction of remaining representative 3-point routes.
// No.23 Wagadake, No.151 Dogo-yama, No.163 Taradake.
// Public named waypoint, public numeric coordinate, public CT only. No estimated CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '和賀岳':[
    {id:'v15164-waga-yakushidake',type:'waypoint',name:'薬師岳',lat:39.55472222,lon:140.72875,elevation:1217,source:'YAMAP 薬師岳（岩手・秋田）公開山ページ「拡大地図」座標 140.72875,39.55472222 https://yamap.com/mountains/14669'}
  ],
  '道後山':[
    {id:'v15164-dogo-iwahi',type:'waypoint',name:'岩樋山',lat:35.06952778,lon:133.2238889,elevation:1268,source:'YAMAP 岩樋山 公開山ページ「拡大地図」座標 133.2238889,35.06952778 https://yamap.com/mountains/12972'}
  ],
  '多良岳':[
    {id:'v15164-tara-kunimi',type:'waypoint',name:'国見岳（多良岳）',lat:32.9755,lon:130.092555,elevation:996,source:'YAMAP 国見岳 公開山ページ「拡大地図」座標 130.092555,32.9755 https://yamap.com/mountains/12629'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.23 和賀岳 / 甘露水口・薬師岳登山口駐車場ルート. YAMAP model 9280.
  // App start is the 薬師岳登山口駐車場/甘露水口 fixed point.
  // 駐車場 06:10 -> 薬師岳 09:15 = 185 min.
  // 薬師岳 09:15 -> 和賀岳 10:55 = 100 min.
  // 和賀岳 10:55 -> 薬師岳 12:05 = 70 min.
  // 薬師岳 12:05 -> 駐車場 13:55 = 110 min. Total 465 min.
  '甘露水口・薬師岳登山口駐車場→薬師岳':185,
  '薬師岳→和賀岳':100,
  '和賀岳→薬師岳':70,
  '薬師岳→甘露水口・薬師岳登山口駐車場':110,

  // No.151 道後山 / 月見ヶ丘登山口駐車場 道後山ルート. YAMAP model 1296.
  // YAMAP named trailhead 08:25 -> 岩樋山 08:55 = 30 min.
  // 岩樋山 08:55 -> 道後山 09:25 = 30 min.
  // 道後山 09:25 -> named trailhead 10:35 = 70 min. Total 130 min.
  '月見ヶ丘登山口駐車場 道後山→岩樋山':30,
  '岩樋山→道後山':30,
  '道後山→月見ヶ丘登山口駐車場 道後山':70,

  // No.163 多良岳 / 中山キャンプ場（中山登山口）ルート. YAMAP model 2967.
  // Named trailhead 08:30 -> 国見岳 09:39 = 69 min.
  // 国見岳 09:39 -> 多良岳 09:42 = 3 min.
  // 多良岳 09:42 -> 国見岳 09:58 = 16 min.
  // 国見岳 09:58 -> named trailhead 10:53 = 55 min. Total 143 min.
  '中山キャンプ場（中山登山口）→国見岳（多良岳）':69,
  '国見岳（多良岳）→多良岳':3,
  '多良岳→国見岳（多良岳）':16,
  '国見岳（多良岳）→中山キャンプ場（中山登山口）':55
});
const SOURCES=Object.freeze({
  '甘露水口・薬師岳登山口駐車場→薬師岳':'YAMAP現行モデル9280 公開チェックポイント時刻（薬師岳登山口駐車場06:10→薬師岳09:15） https://yamap.com/model-courses/9280',
  '薬師岳→和賀岳':'YAMAP現行モデル9280 公開チェックポイント時刻（薬師岳09:15→和賀岳10:55） https://yamap.com/model-courses/9280',
  '和賀岳→薬師岳':'YAMAP現行モデル9280 公開チェックポイント時刻（和賀岳10:55→薬師岳12:05） https://yamap.com/model-courses/9280',
  '薬師岳→甘露水口・薬師岳登山口駐車場':'YAMAP現行モデル9280 公開チェックポイント時刻（薬師岳12:05→薬師岳登山口駐車場13:55） https://yamap.com/model-courses/9280',
  '月見ヶ丘登山口駐車場 道後山→岩樋山':'YAMAP現行モデル1296 公開チェックポイント時刻（月見が丘登山口駐車場トイレ08:25→岩樋山08:55） https://yamap.com/model-courses/1296',
  '岩樋山→道後山':'YAMAP現行モデル1296 公開チェックポイント時刻（岩樋山08:55→道後山09:25） https://yamap.com/model-courses/1296',
  '道後山→月見ヶ丘登山口駐車場 道後山':'YAMAP現行モデル1296 公開チェックポイント時刻（道後山09:25→月見が丘登山口駐車場トイレ10:35） https://yamap.com/model-courses/1296',
  '中山キャンプ場（中山登山口）→国見岳（多良岳）':'YAMAP現行モデル2967 公開チェックポイント時刻（中山キャンプ場登山口08:30→国見岳09:39） https://yamap.com/model-courses/2967',
  '国見岳（多良岳）→多良岳':'YAMAP現行モデル2967 公開チェックポイント時刻（国見岳09:39→多良岳09:42） https://yamap.com/model-courses/2967',
  '多良岳→国見岳（多良岳）':'YAMAP現行モデル2967 公開チェックポイント時刻（多良岳09:42→国見岳09:58） https://yamap.com/model-courses/2967',
  '国見岳（多良岳）→中山キャンプ場（中山登山口）':'YAMAP現行モデル2967 公開チェックポイント時刻（国見岳09:58→中山キャンプ場登山口10:53） https://yamap.com/model-courses/2967'
});
function lookup(a,b){const key=`${String(a||'').trim()}→${String(b||'').trim()}`,n=T[key];return Number.isFinite(n)?{minutes:n,source:SOURCES[key]||'public route source',sourceType:'public-route'}:null;}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '和賀岳':Object.freeze({
    '甘露水口・薬師岳登山口駐車場ルート':{points:[
      ['trailhead','甘露水口・薬師岳登山口駐車場','登山口'],
      ['waypoint','薬師岳','主要通過点'],
      ['peak','和賀岳','山頂'],
      ['waypoint','薬師岳','主要通過点'],
      ['trailhead','甘露水口・薬師岳登山口駐車場','下山口']
    ],source:'YAMAP model 9280 / 薬師岳座標 YAMAP公開山ページ'}
  }),
  '道後山':Object.freeze({
    '月見ヶ丘登山口駐車場 道後山ルート':{points:[
      ['trailhead','月見ヶ丘登山口駐車場 道後山','登山口'],
      ['waypoint','岩樋山','主要通過点'],
      ['peak','道後山','山頂'],
      ['trailhead','月見ヶ丘登山口駐車場 道後山','下山口']
    ],source:'YAMAP model 1296 / 岩樋山座標 YAMAP公開山ページ'}
  }),
  '多良岳':Object.freeze({
    '中山キャンプ場（中山登山口）ルート':{points:[
      ['trailhead','中山キャンプ場（中山登山口）','登山口'],
      ['waypoint','国見岳（多良岳）','主要通過点'],
      ['peak','多良岳','山頂'],
      ['waypoint','国見岳（多良岳）','主要通過点'],
      ['trailhead','中山キャンプ場（中山登山口）','下山口']
    ],source:'YAMAP model 2967 / 国見岳座標 YAMAP公開山ページ'}
  })
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const defs=R[k],opts=o(mountain)||[];if(!defs)return opts;
    return opts.map(c=>{const r=defs[c?.label];if(!r)return c;if(Array.isArray(c?.points)&&c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.164 / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15164=Object.freeze({version:'1.5.164',routeNos:Object.freeze([23,151,163]),mountains:Object.freeze(['和賀岳','道後山','多良岳']),reducedThreePointRoutes:3,policy:'public named waypoint + public numeric coordinate + public CT only; no guessed coordinates; no estimated CT'});
})();
