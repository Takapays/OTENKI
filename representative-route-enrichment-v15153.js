// Traten V1.5.153: batched user-priority three-point course reduction.
// Completed in this batch: No.156 瓶ヶ森, No.150 上蒜山, No.134 高見山.
// Policy: no guessed coordinates, no estimated CT; only meaningful public checkpoints with published directional CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '瓶ヶ森':[
    {id:'v15153-kamegamori-otoko',type:'peak',name:'男山（瓶ヶ森）',lat:33.790277,lon:133.191666,elevation:1838,source:'国土地理院地図リンク公開座標 33.790277,133.191666 https://maps.gsi.go.jp/#15/33.790277/133.191666/'}
  ],
  '上蒜山':[
    {id:'v15153-kamihiru-yarigamine',type:'peak',name:'槍ヶ峰',lat:35.31925,lon:133.65925,elevation:1100,source:'YAMAPランドマーク 北緯35度19分9.3秒 東経133度39分33.3秒 https://yamap.com/landmarks/93350'}
  ],
  '高見山':[
    {id:'v15153-takami-sugi',type:'hut',name:'高見杉',lat:34.429167,lon:136.070000,elevation:760,source:'ヤマレコ地点情報 北緯34度25分45秒 東経136度04分12秒 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=6388'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.156 瓶ヶ森 / 瓶ヶ森駐車場ルート。
  // YAMAP model 21229: 駐車場 -> 登山口 5分 -> 男山 30分 = 35分;
  // 男山 -> 分岐 10分 -> 分岐 3分 -> 瓶ヶ森 3分 = 16分;
  // 瓶ヶ森 -> 分岐 10分 -> 男山 20分 = 30分; 男山 -> 登山口/駐車場 5分。
  '瓶ヶ森駐車場→男山（瓶ヶ森）':35,
  '男山（瓶ヶ森）→瓶ヶ森':16,
  '瓶ヶ森→男山（瓶ヶ森）':30,
  '男山（瓶ヶ森）→瓶ヶ森駐車場':5,

  // No.150 上蒜山 / 上蒜山登山口駐車場ルート。
  // YAMAP model 10244: 駐車場 -> 槍ヶ峰 116分, 槍ヶ峰 -> 上蒜山 25分,
  // 上蒜山 -> 槍ヶ峰 25分, 槍ヶ峰 -> 駐車場 89分。
  '上蒜山登山口駐車場（上蒜山スキー場）→槍ヶ峰':116,
  '槍ヶ峰→上蒜山':25,
  '上蒜山→槍ヶ峰':25,
  '槍ヶ峰→上蒜山登山口駐車場（上蒜山スキー場）':89,

  // No.134 高見山 / たかすみ温泉ルート。
  // 好日山荘公開コースタイム: たかすみ温泉 -> 高見杉 60分 -> 杉谷平野分岐 55分 -> 山頂 60分;
  // 山頂 -> 杉谷平野分岐 30分 -> 高見杉 30分 -> たかすみ温泉 45分。
  'たかすみ温泉 高見山登山口→高見杉':60,
  '高見杉→高見山':115,
  '高見山→高見杉':60,
  '高見杉→たかすみ温泉 高見山登山口':45
});
const SOURCE_KAME='YAMAP 瓶ヶ森 往復コース https://yamap.com/model-courses/21229; 男山座標 国土地理院地図 https://maps.gsi.go.jp/#15/33.790277/133.191666/';
const SOURCE_HIRU='YAMAP 上蒜山登山口-槍ヶ峰-蒜山 往復コース https://yamap.com/model-courses/10244; 槍ヶ峰座標 https://yamap.com/landmarks/93350';
const SOURCE_TAKAMI='好日山荘 高見山公開コースタイム https://www.kojitusanso.jp/tozan-report/detail/?fm=14742; 高見杉座標 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=6388';
function sourceFor(key){
  if(key.includes('瓶ヶ森')||key.includes('男山'))return SOURCE_KAME;
  if(key.includes('上蒜山')||key.includes('槍ヶ峰'))return SOURCE_HIRU;
  return SOURCE_TAKAMI;
}
function lookup(a,b){
  const aa=String(a||'').trim(),bb=String(b||'').trim(),key=`${aa}→${bb}`,n=T[key];
  if(!Number.isFinite(n))return null;
  return {minutes:n,source:sourceFor(key),sourceType:'public-route'};
}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '瓶ヶ森':{label:'瓶ヶ森駐車場ルート',points:[['trailhead','瓶ヶ森駐車場','登山口'],['peak','男山（瓶ヶ森）','主要通過点'],['peak','瓶ヶ森','山頂'],['peak','男山（瓶ヶ森）','主要通過点'],['trailhead','瓶ヶ森駐車場','下山口']],source:SOURCE_KAME},
  '上蒜山':{label:'上蒜山登山口駐車場（上蒜山スキー場）ルート',points:[['trailhead','上蒜山登山口駐車場（上蒜山スキー場）','登山口'],['peak','槍ヶ峰','主要通過点'],['peak','上蒜山','山頂'],['peak','槍ヶ峰','主要通過点'],['trailhead','上蒜山登山口駐車場（上蒜山スキー場）','下山口']],source:SOURCE_HIRU},
  '高見山':{label:'たかすみ温泉ルート',points:[['trailhead','たかすみ温泉 高見山登山口','登山口'],['hut','高見杉','主要通過点'],['peak','高見山','山頂'],['hut','高見杉','主要通過点'],['trailhead','たかすみ温泉 高見山登山口','下山口']],source:SOURCE_TAKAMI}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.153 verified enrichment / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15153=Object.freeze({version:'1.5.153',priorityNos:Object.freeze([156,150,134]),mountains:Object.freeze(Object.keys(R)),reducedThreePointRoutes:3,policy:'batched user-priority audit; no guessed coordinates; public directional CT; no estimated CT'});
})();
