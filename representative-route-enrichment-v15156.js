// Traten V1.5.156: cross-priority batch reduction of remaining three-point representative courses.
// Completed: No.154 三瓶山（東の原）, No.83 経ヶ岳（長野）, No.87 恵那山（神坂峠）.
// Policy: no guessed coordinates, no estimated CT; public checkpoint coordinates and published CT only.
(function(){'use strict';
const FIXED=Object.freeze({
  '三瓶山':[
    {id:'v15156-sanbe-mesanbe',type:'peak',name:'女三瓶山',lat:35.1347222,lon:132.6322222,elevation:953,source:'ヤマレコ 女三瓶山 北緯35度08分05秒 東経132度37分56秒 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=9761'}
  ],
  '経ヶ岳（長野）':[
    {id:'v15156-kyogatake-kitazawa',type:'peak',name:'北沢山',lat:35.89501,lon:137.85036,elevation:1969,source:'富士山と山の展望 北沢山 N35.89501 E137.85036 標高1969m https://fujisan3776.jp/prospect/220/t0551.html'}
  ],
  '恵那山':[
    {id:'v15156-ena-senryo',type:'peak',name:'千両山',lat:35.4672222,lon:137.6286111,elevation:1662,source:'YAMAPランドマーク 千両山 北緯35度28分3秒 東経137度37分42.6秒 https://yamap.com/landmarks/90586'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.154 三瓶山 / 東の原登山口（さんべ観光リフト）ルート。
  // YAMAP model 20904: 東の原駐車場 07:00 -> 女三瓶山 08:40 = 100分、女三瓶山 -> 男三瓶山（三瓶山）09:28 = 48分。
  // 復路は既存の確認済み「三瓶山（男三瓶山）→東の原登山口（さんべ観光リフト）」直通CTを維持する。
  '東の原登山口（さんべ観光リフト）→女三瓶山':100,
  '女三瓶山→三瓶山（男三瓶山）':48,

  // No.83 経ヶ岳（長野） / 権兵衛峠ルート。
  // YAMAP model 9072: 権兵衛峠登山口駐車場 07:00 -> 北沢山 08:40 = 100分、北沢山 -> 経ヶ岳 11:05 = 145分。
  // 復路: 経ヶ岳 11:05 -> 北沢山 12:30 = 85分、北沢山 -> 登山口 13:10 = 40分。
  '権兵衛峠登山口→北沢山':100,
  '北沢山→経ヶ岳':145,
  '経ヶ岳→北沢山':85,
  '北沢山→権兵衛峠登山口':40,

  // No.87 恵那山 / 神坂峠ルート。
  // YAMAP model 8795: 神坂峠登山口 06:02 -> 千両山 06:47 = 45分、千両山 -> 恵那山 10:48 = 241分。
  // 復路: 恵那山 10:48 -> 千両山 14:48 = 240分、千両山 -> 神坂峠登山口 14:50 = 2分。
  '神坂峠登山口→千両山':45,
  '千両山→恵那山':241,
  '恵那山→千両山':240,
  '千両山→神坂峠登山口':2
});
const SOURCE_SANBE='YAMAP 東の原登山口-女三瓶山-男三瓶山周回モデル https://yamap.com/model-courses/20904 / ヤマレコ 女三瓶山公開座標 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=9761';
const SOURCE_KYOGATAKE='YAMAP 経ヶ岳 権兵衛峠モデル https://yamap.com/model-courses/9072 / 富士山と山の展望 北沢山公開座標 https://fujisan3776.jp/prospect/220/t0551.html';
const SOURCE_ENA='YAMAP 恵那山 神坂峠モデル https://yamap.com/model-courses/8795 / YAMAP 千両山公開座標 https://yamap.com/landmarks/90586';
function sourceFor(key){
  if(key.includes('女三瓶山')||key.includes('三瓶山（男三瓶山）'))return SOURCE_SANBE;
  if(key.includes('北沢山')||key.includes('経ヶ岳'))return SOURCE_KYOGATAKE;
  return SOURCE_ENA;
}
function lookup(a,b){
  const aa=String(a||'').trim(),bb=String(b||'').trim(),key=`${aa}→${bb}`,n=T[key];
  if(!Number.isFinite(n))return null;
  return {minutes:n,source:sourceFor(key),sourceType:'public-route'};
}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '三瓶山':{label:'東の原登山口（さんべ観光リフト）ルート',points:[['trailhead','東の原登山口（さんべ観光リフト）','登山口'],['peak','女三瓶山','主要通過点'],['peak','三瓶山（男三瓶山）','山頂'],['trailhead','東の原登山口（さんべ観光リフト）','下山口']],source:SOURCE_SANBE},
  '経ヶ岳（長野）':{label:'権兵衛峠ルート',points:[['trailhead','権兵衛峠登山口','登山口'],['peak','北沢山','主要通過点'],['peak','経ヶ岳','山頂'],['peak','北沢山','主要通過点'],['trailhead','権兵衛峠登山口','下山口']],source:SOURCE_KYOGATAKE},
  '恵那山':{label:'神坂峠ルート',points:[['trailhead','神坂峠登山口','登山口'],['peak','千両山','主要通過点'],['peak','恵那山','山頂'],['peak','千両山','主要通過点'],['trailhead','神坂峠登山口','下山口']],source:SOURCE_ENA}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.156 verified enrichment / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15156=Object.freeze({
  version:'1.5.156',
  routeNos:Object.freeze([154,83,87]),
  mountains:Object.freeze(Object.keys(R)),
  reducedThreePointRoutes:3,
  policy:'cross-priority batch; no guessed coordinates; public CT and coordinates; no estimated CT; four-point enrichment allowed when verified direct return CT already exists'
});
})();
