// Traten V1.5.160: additional bulk reduction of representative 3-point routes.
// Public named waypoints, public numeric coordinates, public CT only. No estimated CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '金剛堂山':[
    {id:'v15160-kongodo-kataore',type:'peak',name:'片折岳',lat:36.396389,lon:137.038056,elevation:1346,source:'ヤマレコ公開地点情報 北緯36度23分47秒 東経137度02分17秒 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=30577'}
  ],
  '南木曽岳':[
    {id:'v15160-nagiso-marishiten',type:'peak',name:'摩利支天',lat:35.591835,lon:137.649113,elevation:1675,source:'山聲・南木曽岳ルートマップ 公開中心地緯度経度 35.591835,137.649113 https://yamabiko.ciao.jp/05_root-map/20k/20k_nagisodake/20k_nagisodake.html'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.108 金剛堂山: YAMAP model 94593.
  // 08:00 栃谷登山口駐車場 -> 09:55 片折岳 = 115
  // 09:55 片折岳 -> 11:15 金剛堂山（前金剛） = 80
  // 11:15 summit -> 12:20 片折岳 = 65
  // 12:20 片折岳 -> 13:45 栃谷登山口駐車場 = 85
  '栃谷登山口 金剛堂山→片折岳':115,
  '片折岳→金剛堂山':80,
  '金剛堂山→片折岳':65,
  '片折岳→栃谷登山口 金剛堂山':85,

  // No.85 南木曽岳: the established 蘭 route is a counter-clockwise one-way loop.
  // Keep the already verified direct ascent to 南木曽岳, then enrich the descent side.
  // Yamareco p5519142: 南木曽岳 10:43 ->避難小屋 10:52 -> 摩利支天見晴台 11:10 = 27
  // 摩利支天見晴台 11:10 -> 金時岩 12:11 -> 南木曽岳登山口 12:42 = 92
  '南木曽岳→摩利支天':27,
  '摩利支天→蘭登山口':92
});
const SOURCES=Object.freeze({
  '栃谷登山口 金剛堂山→片折岳':'YAMAP現行モデル94593「栃谷登山口-片折岳-金剛堂山 往復コース」公開チェックポイント時刻 https://yamap.com/model-courses/94593',
  '片折岳→金剛堂山':'YAMAP現行モデル94593 公開チェックポイント時刻 https://yamap.com/model-courses/94593',
  '金剛堂山→片折岳':'YAMAP現行モデル94593 公開チェックポイント時刻 https://yamap.com/model-courses/94593',
  '片折岳→栃谷登山口 金剛堂山':'YAMAP現行モデル94593 公開チェックポイント時刻 https://yamap.com/model-courses/94593',
  '南木曽岳→摩利支天':'ヤマレコ公開山行計画 p5519142（南木曽岳→避難小屋→摩利支天見晴台 27分） https://www.yamareco.com/modules/yr_plan/detail-5519142.html',
  '摩利支天→蘭登山口':'ヤマレコ公開山行計画 p5519142（摩利支天見晴台→金時岩→南木曽岳登山口 92分） https://www.yamareco.com/modules/yr_plan/detail-5519142.html'
});
function lookup(a,b){const key=`${String(a||'').trim()}→${String(b||'').trim()}`,n=T[key];return Number.isFinite(n)?{minutes:n,source:SOURCES[key]||'public route source',sourceType:'public-route'}:null;}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '金剛堂山':{label:'栃谷登山口 金剛堂山ルート',points:[
    ['trailhead','栃谷登山口 金剛堂山','登山口'],
    ['peak','片折岳','主要通過点'],
    ['peak','金剛堂山','山頂'],
    ['peak','片折岳','主要通過点'],
    ['trailhead','栃谷登山口 金剛堂山','下山口']
  ],source:'YAMAP model 94593 / 片折岳座標 ヤマレコ'},
  '南木曽岳':{label:'蘭登山口ルート',points:[
    ['trailhead','蘭登山口','登山口'],
    ['peak','南木曽岳','山頂'],
    ['peak','摩利支天','主要通過点'],
    ['trailhead','蘭登山口','下山口']
  ],source:'ヤマレコ p5519142 / 摩利支天座標 山聲ルートマップ'}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label)return c;if(Array.isArray(c?.points)&&c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.160 / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15160=Object.freeze({version:'1.5.160',routeNos:Object.freeze([85,108]),mountains:Object.freeze(['南木曽岳','金剛堂山']),reducedThreePointRoutes:2,policy:'public named waypoint + public numeric coordinate + public CT only; no guessed coordinates; no estimated CT'});
})();
