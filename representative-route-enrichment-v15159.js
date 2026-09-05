// Traten V1.5.159: batch reduction of representative 3-point routes using public named waypoints only.
// No guessed coordinates and no estimated CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '白神岳':[
    {id:'v15159-shirakami-mate',type:'peak',name:'蟶山',lat:40.51341,lon:139.99257,elevation:842,source:'Mapcarta/OpenStreetMap公開位置 40.51341,139.99257 https://mapcarta.com/29405088 / 標高 YAMAP https://yamap.com/mountains/1145'}
  ],
  '釈迦ヶ岳（栃木）':[
    {id:'v15159-takahara-kengamine',type:'peak',name:'剣ヶ峰',lat:36.90605,lon:139.793933,elevation:1537,source:'PeakVisor公開座標 36.90605,139.793933 https://peakvisor.com/peak/kengamine-1fiea8.html / 標高 YAMAP https://yamap.com/mountains/24691'}
  ],
  '大日ヶ岳':[
    {id:'v15159-dainichi-suigo',type:'peak',name:'水後山',lat:35.991226,lon:136.82146,elevation:1559,source:'PeakVisor公開座標 35.991226,136.82146 https://peakvisor.com/peak/mt-suigo.html / 標高 YAMAP https://yamap.com/mountains/1394'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.18 白神岳: YAMAP model 65, same 白神岳登山口駐車場 area.
  // 06:00 parking -> 08:29 蟶山 = 149
  // 08:29 蟶山 -> 10:48 白神岳 = 139
  '白神岳登山口駐車場→蟶山':149,
  '蟶山→白神岳':139,

  // No.51 高原山・釈迦ヶ岳: YAMAP model 12278 gives 大間々台->剣ヶ峰.
  // 08:00 大間々台公衆トイレ -> 09:27 剣ヶ峰 = 87
  // Yamareco p5473174 gives 剣ヶ峰 -> 釈迦ヶ岳 = 100.
  '八方ヶ原・大間々台登山口→剣ヶ峰':87,
  '剣ヶ峰→高原山・釈迦ヶ岳':100,

  // No.121 大日ヶ岳: YAMAP model 26301 is explicitly the 桧峠 route.
  // 08:00 満天の湯入口（桧峠駐車場 is 21m from model start） -> 10:15 水後山 = 135
  // 水後山 10:15 -> 大日ヶ岳 11:40 = 85
  // 大日ヶ岳 11:40 -> 水後山 12:55 = 75
  // 水後山 12:55 -> model start 14:45 = 110
  '桧峠 大日ヶ岳登山口→水後山':135,
  '水後山→大日ヶ岳':85,
  '大日ヶ岳→水後山':75,
  '水後山→桧峠 大日ヶ岳登山口':110
});
const SOURCES=Object.freeze({
  '白神岳登山口駐車場→蟶山':'YAMAP現行モデル65「白神岳 蟶山コース」公開チェックポイント時刻 https://yamap.com/model-courses/65',
  '蟶山→白神岳':'YAMAP現行モデル65「白神岳 蟶山コース」公開チェックポイント時刻 https://yamap.com/model-courses/65',
  '八方ヶ原・大間々台登山口→剣ヶ峰':'YAMAP現行モデル12278「剣ヶ峰 往復コース」公開チェックポイント時刻 https://yamap.com/model-courses/12278',
  '剣ヶ峰→高原山・釈迦ヶ岳':'ヤマレコ公開山行計画 p5473174（剣ヶ峰→釈迦ケ岳 100分） https://www.yamareco.com/modules/yr_plan/detail-5473174.html',
  '桧峠 大日ヶ岳登山口→水後山':'YAMAP現行モデル26301「桧峠-水後山-大日ヶ岳」公開チェックポイント時刻 https://yamap.com/model-courses/26301',
  '水後山→大日ヶ岳':'YAMAP現行モデル26301 公開チェックポイント時刻 https://yamap.com/model-courses/26301',
  '大日ヶ岳→水後山':'YAMAP現行モデル26301 公開チェックポイント時刻 https://yamap.com/model-courses/26301',
  '水後山→桧峠 大日ヶ岳登山口':'YAMAP現行モデル26301 公開チェックポイント時刻 https://yamap.com/model-courses/26301'
});
function lookup(a,b){const key=`${String(a||'').trim()}→${String(b||'').trim()}`,n=T[key];return Number.isFinite(n)?{minutes:n,source:SOURCES[key]||'public route source',sourceType:'public-route'}:null;}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '白神岳':{label:'白神岳駐車場ルート',points:[
    ['trailhead','白神岳登山口駐車場','登山口'],
    ['peak','蟶山','主要通過点'],
    ['peak','白神岳','山頂'],
    ['trailhead','白神岳登山口駐車場','下山口']
  ],source:'YAMAP model 65 / 蟶山座標 Mapcarta'},
  '釈迦ヶ岳（栃木）':{label:'八方ヶ原・大間々台登山口ルート',points:[
    ['trailhead','八方ヶ原・大間々台登山口','登山口'],
    ['peak','剣ヶ峰','主要通過点'],
    ['peak','高原山・釈迦ヶ岳','山頂'],
    ['trailhead','八方ヶ原・大間々台登山口','下山口']
  ],source:'YAMAP model 12278 + Yamareco p5473174 / 剣ヶ峰座標 PeakVisor'},
  '大日ヶ岳':{label:'桧峠 大日ヶ岳ルート',points:[
    ['trailhead','桧峠 大日ヶ岳登山口','登山口'],
    ['peak','水後山','主要通過点'],
    ['peak','大日ヶ岳','山頂'],
    ['peak','水後山','主要通過点'],
    ['trailhead','桧峠 大日ヶ岳登山口','下山口']
  ],source:'YAMAP model 26301 / 水後山座標 PeakVisor'}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label)return c;return {...c,points:r.points,source:`V1.5.159 / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15159=Object.freeze({version:'1.5.159',routeNos:Object.freeze([18,51,121]),mountains:Object.freeze(['白神岳','釈迦ヶ岳（栃木）','大日ヶ岳']),reducedThreePointRoutes:3,policy:'public named waypoint + public numeric coordinate + public CT only; existing verified direct return CT retained on intentional 4-point routes; no estimated CT'});
})();
