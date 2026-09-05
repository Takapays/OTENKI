// Traten V1.5.151: batched user-priority three-point course reduction.
// Completed in this batch: No.159, No.136, No.129, No.127.
// Higher-priority candidates without both a meaningful public checkpoint and defensible public coordinates/CT remain untouched.
(function(){'use strict';
const FIXED=Object.freeze({
  '英彦山':[
    {id:'v15151-hikosan-kitadake',type:'peak',name:'英彦山（北岳）',lat:33.47944444444445,lon:130.93305555555557,elevation:1192,source:'公開地点座標 北緯33度28分46秒・東経130度55分59秒 https://ymkr-okurimono.sakura.ne.jp/mountain/mnt/m541.html'}
  ],
  '釈迦ヶ岳（奈良）':[
    {id:'v15151-shaka-furutanomori',type:'peak',name:'古田ノ森',lat:34.10861111111111,lon:135.89083333333332,elevation:1618,source:'公開地点座標「古田の森」北緯34度06分31秒・東経135度53分27秒 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=19791'}
  ],
  '御在所岳':[
    {id:'v15151-gozaisho-jizoiwa',type:'pass',name:'地蔵岩',lat:35.02,lon:136.4338888888889,elevation:895,source:'ヤマレコ公開地点座標 北緯35度01分12秒・東経136度26分02秒 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=2272'}
  ],
  '能郷白山':[
    {id:'v15151-nogo-columbus',type:'peak',name:'コロンブスピーク',lat:35.77194444444444,lon:136.51222222222222,elevation:1492,source:'公開地点座標 北緯35度46分19秒・東経136度30分44秒 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=22393'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.159 英彦山 / 豊前坊・高住神社登山口ルート。
  // YAMAP model 10960: 豊前坊駐車場 08:00 -> 英彦山（北岳）09:20 -> 中岳（英彦山）09:50;
  // return uses the same 北岳 corridor and reaches 豊前坊駐車場 11:24.
  '豊前坊・高住神社登山口→英彦山（北岳）':80,
  '英彦山（北岳）→英彦山':30,
  '英彦山→英彦山（北岳）':30,
  '英彦山（北岳）→豊前坊・高住神社登山口':60,

  // No.136 釈迦ヶ岳（奈良） / 太尾登山口ルート。
  // YAMAP model 105 timestamps: 登山口08:00 -> 古田ノ森09:25 -> 山頂10:27 -> 古田ノ森11:37 -> 登山口12:12.
  '太尾登山口 釈迦ヶ岳 奈良→古田ノ森':85,
  '古田ノ森→釈迦ヶ岳（奈良）':62,
  '釈迦ヶ岳（奈良）→古田ノ森':70,
  '古田ノ森→太尾登山口 釈迦ヶ岳 奈良':35,

  // No.129 御在所岳 / 中登山道口ルート。
  // YAMAP model 12183 timestamps: 中登山口06:03 -> 地蔵岩07:08 -> 山頂08:49 -> 地蔵岩10:23 -> 中登山口10:46.
  '中登山道口 御在所岳→地蔵岩':65,
  '地蔵岩→御在所岳':101,
  '御在所岳→地蔵岩':94,
  '地蔵岩→中登山道口 御在所岳':23,

  // No.127 能郷白山 / 温見峠ルート。
  // YAMAP model 1249: 温見峠08:00 -> コロンブスピーク09:15 -> 能郷白山09:55;
  // after the summit-side short loop, the direct return is 能郷白山10:03 -> コロンブスピーク10:33 -> 温見峠11:33.
  '温見峠→コロンブスピーク':75,
  'コロンブスピーク→能郷白山（権現山）':40,
  '能郷白山（権現山）→コロンブスピーク':30,
  'コロンブスピーク→温見峠':60
});
const SOURCE_HIKOSAN='YAMAP公開モデル https://yamap.com/model-courses/10960 / 英彦山北岳公開座標 https://ymkr-okurimono.sakura.ne.jp/mountain/mnt/m541.html';
const SOURCE_SHAKA='YAMAP公開モデル https://yamap.com/model-courses/105 / 古田ノ森（古田の森）公開座標 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=19791';
const SOURCE_GOZAISHO='YAMAP公開モデル https://yamap.com/model-courses/12183 / 地蔵岩公開座標 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=2272';
const SOURCE_NOGO='YAMAP公開モデル https://yamap.com/model-courses/1249 / コロンブスピーク公開座標 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=22393';
function sourceFor(key){
  if(key.includes('英彦山')||key.includes('豊前坊'))return SOURCE_HIKOSAN;
  if(key.includes('釈迦ヶ岳')||key.includes('古田ノ森')||key.includes('太尾登山口'))return SOURCE_SHAKA;
  if(key.includes('御在所岳')||key.includes('地蔵岩'))return SOURCE_GOZAISHO;
  return SOURCE_NOGO;
}
function lookup(a,b){
  const aa=String(a||'').trim(),bb=String(b||'').trim(),key=`${aa}→${bb}`,n=T[key];
  if(!Number.isFinite(n))return null;
  return {minutes:n,source:sourceFor(key),sourceType:'public-model'};
}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '英彦山':{label:'豊前坊・高住神社登山口ルート',points:[['trailhead','豊前坊・高住神社登山口','登山口'],['peak','英彦山（北岳）','通過峰'],['peak','英彦山','山頂'],['peak','英彦山（北岳）','通過峰'],['trailhead','豊前坊・高住神社登山口','下山口']],source:SOURCE_HIKOSAN},
  '釈迦ヶ岳（奈良）':{label:'太尾登山口 釈迦ヶ岳 奈良ルート',points:[['trailhead','太尾登山口 釈迦ヶ岳 奈良','登山口'],['peak','古田ノ森','通過峰'],['peak','釈迦ヶ岳（奈良）','山頂'],['peak','古田ノ森','通過峰'],['trailhead','太尾登山口 釈迦ヶ岳 奈良','下山口']],source:SOURCE_SHAKA},
  '御在所岳':{label:'中登山道口 御在所岳ルート',points:[['trailhead','中登山道口 御在所岳','登山口'],['pass','地蔵岩','主要通過点'],['peak','御在所岳','山頂'],['pass','地蔵岩','主要通過点'],['trailhead','中登山道口 御在所岳','下山口']],source:SOURCE_GOZAISHO},
  '能郷白山':{label:'温見峠ルート',points:[['trailhead','温見峠','登山口'],['peak','コロンブスピーク','通過峰'],['peak','能郷白山（権現山）','山頂'],['peak','コロンブスピーク','通過峰'],['trailhead','温見峠','下山口']],source:SOURCE_NOGO}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.151 verified enrichment / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15151=Object.freeze({version:'1.5.151',priorityNos:Object.freeze([159,136,129,127]),mountains:Object.freeze(Object.keys(R)),reducedThreePointRoutes:4,blockedPriorityNos:Object.freeze([156,155,154,153,150,149,146,145,144,139,134]),policy:'batched user-priority audit; no guessed coordinates; meaningful public checkpoints + published checkpoint CT; no estimated CT'});
})();
