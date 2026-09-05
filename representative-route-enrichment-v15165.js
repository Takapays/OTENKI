// Traten V1.5.165: batch reduction of remaining representative 3-point routes.
// No.121 Dainichigatake, No.131 Kuroso-yama, No.141 Horai-yama.
// Public named waypoint, public numeric coordinate, public CT only. No estimated CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '大日ヶ岳':[
    {id:'v15165-dainichi-suigo',type:'waypoint',name:'水後山',lat:35.99078,lon:136.821112,elevation:1559,source:'YAMAP 水後山公開山ページ「拡大地図」座標 136.821112,35.99078 https://yamap.com/mountains/1394'}
  ],
  '倶留尊山':[
    {id:'v15165-kuroso-nihonboso',type:'waypoint',name:'二本ボソ',lat:34.5262277,lon:136.168035,elevation:996,source:'YAMAP 二本ボソ公開山ページ「拡大地図」座標 136.168035,34.5262277 https://yamap.com/mountains/24862'},
    {id:'v15165-kuroso-kameyama',type:'waypoint',name:'亀山',lat:34.51696619420874,lon:136.1651474245196,elevation:849,source:'YAMAP 亀山公開山ページ「拡大地図」座標 136.1651474245196,34.51696619420874 https://yamap.com/mountains/9802'}
  ],
  '蓬来山':[
    {id:'v15165-horai-uchimi',type:'waypoint',name:'打見山',lat:35.21342416194736,lon:135.8937035538525,elevation:1104,source:'YAMAP 打見山公開山ページ「拡大地図」座標 135.8937035538525,35.21342416194736 https://yamap.com/mountains/7990'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.121 大日ヶ岳 / 桧峠 大日ヶ岳ルート. YAMAP model 26301.
  // App trailhead corresponds to YAMAP named 大日ヶ岳登山道入口.
  // 登山道入口 09:25 -> 水後山 10:15 = 50 min.
  // 水後山 10:15 -> 鎌ヶ峰 10:50 -> 大日ヶ岳 11:40 = 85 min.
  // 大日ヶ岳 11:40 -> 鎌ヶ峰 12:25 -> 水後山 12:55 = 75 min.
  // 水後山 12:55 -> 登山道入口 13:35 = 40 min. Total 250 min.
  '桧峠 大日ヶ岳登山口→水後山':50,
  '水後山→大日ヶ岳':85,
  '大日ヶ岳→水後山':75,
  '水後山→桧峠 大日ヶ岳登山口':40,

  // No.131 倶留尊山 / 曽爾高原 倶留尊山登山口ルート. YAMAP model 2307.
  // Standard model is the 曽爾高原 round course: start -> 亀山峠 -> 二本ボソ -> 倶留尊山 -> 二本ボソ -> 亀山 -> start.
  // Unnamed generic branches are aggregated only; every minute comes from published checkpoint intervals.
  '曽爾高原 倶留尊山登山口→二本ボソ':84,
  '二本ボソ→倶留尊山':35,
  '倶留尊山→二本ボソ':40,
  '二本ボソ→亀山':23,
  '亀山→曽爾高原 倶留尊山登山口':12,

  // No.141 蓬来山 / びわ湖バレイ山頂駅ルート. YAMAP model 23595.
  // App mountain key retains legacy spelling 蓬来山; YAMAP model labels the peak 蓬莱山.
  // 山頂駅 -> 打見山 = 3; 打見山 -> トイレ -> 蓬莱山 = 29;
  // 蓬莱山 -> トイレ -> 打見山 = 29; 打見山 -> 山頂駅 = 3. Total 64 min.
  'びわ湖バレイ山頂駅→打見山':3,
  '打見山→蓬来山':29,
  '蓬来山→打見山':29,
  '打見山→びわ湖バレイ山頂駅':3
});
const SOURCES=Object.freeze({
  '桧峠 大日ヶ岳登山口→水後山':'YAMAP現行モデル26301 公開チェックポイント時刻（大日ヶ岳登山道入口09:25→水後山10:15） https://yamap.com/model-courses/26301',
  '水後山→大日ヶ岳':'YAMAP現行モデル26301 公開チェックポイント時刻（水後山10:15→鎌ヶ峰10:50→大日ヶ岳11:40、35+50分） https://yamap.com/model-courses/26301',
  '大日ヶ岳→水後山':'YAMAP現行モデル26301 公開チェックポイント時刻（大日ヶ岳11:40→鎌ヶ峰12:25→水後山12:55、45+30分） https://yamap.com/model-courses/26301',
  '水後山→桧峠 大日ヶ岳登山口':'YAMAP現行モデル26301 公開チェックポイント時刻（水後山12:55→大日ヶ岳登山道入口13:35） https://yamap.com/model-courses/26301',
  '曽爾高原 倶留尊山登山口→二本ボソ':'YAMAP現行モデル2307 公開チェックポイント時刻（曽爾高原モデル開始08:00→二本ボソ09:24、14+20+35+15分） https://yamap.com/model-courses/2307',
  '二本ボソ→倶留尊山':'YAMAP現行モデル2307 公開チェックポイント時刻（二本ボソ09:24→分岐09:44→倶留尊山09:59、20+15分） https://yamap.com/model-courses/2307',
  '倶留尊山→二本ボソ':'YAMAP現行モデル2307 公開チェックポイント時刻（倶留尊山09:59→分岐10:14→二本ボソ10:39、15+25分） https://yamap.com/model-courses/2307',
  '二本ボソ→亀山':'YAMAP現行モデル2307 公開チェックポイント時刻（二本ボソ10:39→亀山峠10:54→亀山11:02、15+8分） https://yamap.com/model-courses/2307',
  '亀山→曽爾高原 倶留尊山登山口':'YAMAP現行モデル2307 公開チェックポイント時刻（亀山11:02→曽爾高原モデル終点11:14、12分） https://yamap.com/model-courses/2307',
  'びわ湖バレイ山頂駅→打見山':'YAMAP現行モデル23595 公開チェックポイント時刻（ロープウェイ山頂駅08:00→打見山08:03） https://yamap.com/model-courses/23595',
  '打見山→蓬来山':'YAMAP現行モデル23595 公開チェックポイント時刻（打見山08:03→トイレ08:13→蓬莱山08:32、10+19分） https://yamap.com/model-courses/23595',
  '蓬来山→打見山':'YAMAP現行モデル23595 公開チェックポイント時刻（蓬莱山08:32→トイレ08:51→打見山09:01、19+10分） https://yamap.com/model-courses/23595',
  '打見山→びわ湖バレイ山頂駅':'YAMAP現行モデル23595 公開チェックポイント時刻（打見山09:01→ロープウェイ山頂駅09:04） https://yamap.com/model-courses/23595'
});
function lookup(a,b){const key=`${String(a||'').trim()}→${String(b||'').trim()}`,n=T[key];return Number.isFinite(n)?{minutes:n,source:SOURCES[key]||'public route source',sourceType:'public-route'}:null;}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '大日ヶ岳':Object.freeze({
    '桧峠 大日ヶ岳ルート':{points:[
      ['trailhead','桧峠 大日ヶ岳登山口','登山口'],
      ['waypoint','水後山','主要通過点'],
      ['peak','大日ヶ岳','山頂'],
      ['waypoint','水後山','主要通過点'],
      ['trailhead','桧峠 大日ヶ岳登山口','下山口']
    ],source:'YAMAP model 26301 / 水後山座標 YAMAP公開山ページ'}
  }),
  '倶留尊山':Object.freeze({
    '曽爾高原 倶留尊山登山口ルート':{points:[
      ['trailhead','曽爾高原 倶留尊山登山口','登山口'],
      ['waypoint','二本ボソ','主要通過点'],
      ['peak','倶留尊山','山頂'],
      ['waypoint','二本ボソ','主要通過点'],
      ['waypoint','亀山','主要通過点'],
      ['trailhead','曽爾高原 倶留尊山登山口','下山口']
    ],source:'YAMAP model 2307 / 二本ボソ・亀山座標 YAMAP公開山ページ'}
  }),
  '蓬来山':Object.freeze({
    'びわ湖バレイ山頂駅ルート':{points:[
      ['trailhead','びわ湖バレイ山頂駅','登山口'],
      ['waypoint','打見山','主要通過点'],
      ['peak','蓬来山','山頂'],
      ['waypoint','打見山','主要通過点'],
      ['trailhead','びわ湖バレイ山頂駅','下山口']
    ],source:'YAMAP model 23595 / 打見山座標 YAMAP公開山ページ'}
  })
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const defs=R[k],opts=o(mountain)||[];if(!defs)return opts;
    return opts.map(c=>{const r=defs[c?.label];if(!r)return c;if(Array.isArray(c?.points)&&c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.165 / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15165=Object.freeze({version:'1.5.165',routeNos:Object.freeze([121,131,141]),mountains:Object.freeze(['大日ヶ岳','倶留尊山','蓬来山']),reducedThreePointRoutes:3,policy:'public named waypoint + public numeric coordinate + public CT only; no guessed coordinates; no estimated CT'});
})();
