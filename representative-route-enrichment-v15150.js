// Traten V1.5.150: user-priority three-point course reduction batch.
// Priority No.164 and No.162 completed. No.163 remains intentionally untouched until an unambiguous public coordinate for a meaningful checkpoint is verified.
(function(){'use strict';
const FIXED=Object.freeze({
  '雲仙岳（普賢岳）':[
    {id:'v15150-unzen-azamidani',type:'pass',name:'あざみ谷',lat:32.758550036443,lon:130.28906632,elevation:null,source:'MapFan公開地点座標 https://mapfan.com/directions/points/32.750604622996%2C130.28542722574%2C%E4%BB%81%E7%94%B0%E5%B3%A0%E9%A7%85%EF%BC%88%E9%9B%B2%E4%BB%99%E3%83%AD%E3%83%BC%E3%83%97%E3%82%A6%E3%82%A7%E3%82%A4%EF%BC%89%2CSCH%2CJ%2CJB4%2C/32.758550036443%2C130.28906632%2C%E9%9B%B2%E4%BB%99%E3%81%82%E3%81%96%E3%81%BF%E8%B0%B7%2CSCCWQ%2CJ%2CDW%2C/types/walk/settings/now%2C4%2C101'}
  ],
  '多良岳':[
    {id:'v15150-taradake-kinsenji-hut',type:'hut',name:'多良岳金泉寺山小屋',lat:32.97345,lon:130.08935,elevation:870,source:'OpenStreetMap由来Mapcarta公開座標 https://mapcarta.com/W518149698'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // Priority No.164 雲仙岳（普賢岳） / 仁田峠第一展望所駐車場・普賢岳登山口ルート。
  // YAMAP model 12410 timestamps: 仁田峠駐車場 08:00 -> あざみ谷 08:29 -> 普賢岳 10:02 -> あざみ谷 10:43 -> 仁田峠駐車場 11:12.
  // Adjacent checkpoint sums: outbound あざみ谷->普賢岳 = 25+2+10+15+5+15+10+11 = 93 min; return 普賢岳->あざみ谷 = 21+20 = 41 min.
  '仁田峠第一展望所駐車場・普賢岳登山口→あざみ谷':29,
  'あざみ谷→雲仙岳（普賢岳）':93,
  '雲仙岳（普賢岳）→あざみ谷':41,
  'あざみ谷→仁田峠第一展望所駐車場・普賢岳登山口':29,

  // Priority No.162 多良岳 / 黒木第2駐車場・黒木登山口ルート。
  // YAMAP model 18717 timestamps: 黒木第2駐車場 08:00 -> 多良岳金泉寺山小屋 09:57 -> 多良岳（多良嶽神社上宮）10:30 -> hut 10:57 -> 黒木第2駐車場 12:29.
  '黒木第2駐車場・黒木登山口→多良岳金泉寺山小屋':117,
  '多良岳金泉寺山小屋→多良岳':33,
  '多良岳→多良岳金泉寺山小屋':27,
  '多良岳金泉寺山小屋→黒木第2駐車場・黒木登山口':92
});
const SOURCE_UNZEN='YAMAP公開モデル https://yamap.com/model-courses/12410 / MapFan公開地点座標（あざみ谷）';
const SOURCE_TARA='YAMAP公開モデル https://yamap.com/model-courses/18717 / OpenStreetMap由来Mapcarta公開座標（金泉寺山小屋） https://mapcarta.com/W518149698';
function lookup(a,b){
  const aa=String(a||'').trim(),bb=String(b||'').trim(),key=`${aa}→${bb}`,n=T[key];
  if(!Number.isFinite(n))return null;
  const source=key.includes('雲仙岳（普賢岳）')||key.includes('あざみ谷')||key.includes('仁田峠第一展望所駐車場')?SOURCE_UNZEN:SOURCE_TARA;
  return {minutes:n,source,sourceType:'public-model'};
}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '雲仙岳（普賢岳）':{label:'仁田峠第一展望所駐車場・普賢岳登山口ルート',points:[['trailhead','仁田峠第一展望所駐車場・普賢岳登山口','登山口'],['pass','あざみ谷','主要通過点'],['peak','雲仙岳（普賢岳）','山頂'],['pass','あざみ谷','主要通過点'],['trailhead','仁田峠第一展望所駐車場・普賢岳登山口','下山口']],source:SOURCE_UNZEN},
  '多良岳':{label:'黒木第2駐車場・黒木登山口ルート',points:[['trailhead','黒木第2駐車場・黒木登山口','登山口'],['hut','多良岳金泉寺山小屋','山小屋'],['peak','多良岳','山頂'],['hut','多良岳金泉寺山小屋','山小屋'],['trailhead','黒木第2駐車場・黒木登山口','下山口']],source:SOURCE_TARA}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.150 verified enrichment / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15150=Object.freeze({version:'1.5.150',priorityNos:Object.freeze([164,162]),mountains:Object.freeze(Object.keys(R)),reducedThreePointRoutes:2,blockedPriorityNos:Object.freeze([163,167]),policy:'user-priority order; no guessed coordinates; meaningful public checkpoints + published checkpoint CT; no estimated CT'});
})();
