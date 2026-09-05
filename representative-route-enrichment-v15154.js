// Traten V1.5.154: batched retry of unresolved user-priority three-point courses.
// Completed: No.149 那岐山, No.146 六甲山, No.145 愛宕山, No.132 三峰山.
// Policy: no guessed coordinates, no estimated CT; public checkpoint coordinates and published directional CT only.
(function(){'use strict';
const FIXED=Object.freeze({
  '那岐山':[
    {id:'v15154-nagi-okamiiwa',type:'waypoint',name:'大神岩',lat:35.1620278,lon:134.1826667,elevation:992,source:'YAMAPランドマーク 北緯35度9分43.3秒 東経134度10分57.6秒 https://yamap.com/landmarks/17732'}
  ],
  '六甲山':[
    {id:'v15154-rokko-ikkenchaya',type:'waypoint',name:'一軒茶屋',lat:34.777725,lon:135.2657222,elevation:null,source:'MapFan公開地点座標 https://mapfan.com/spots/SCAQC%2CJ%2C2JN8K0'}
  ],
  '愛宕山':[
    {id:'v15154-atago-mizuo',type:'pass',name:'水尾分かれ',lat:35.0480556,lon:135.6355556,elevation:695,source:'ヤマレコ地点情報 北緯35度02分53秒 東経135度38分08秒 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=5951'}
  ],
  '三峰山':[
    {id:'v15154-mitsumine-gohonsugi',type:'hut',name:'五本杉避難小屋',lat:34.4527778,lon:136.2008333,elevation:969.3,source:'ヤマレコ地点情報 北緯34度27分10秒 東経136度12分03秒 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=33379'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.149 那岐山 / 蛇淵の滝 那岐山登山口ルート。
  // ヤマレコ公開計画 p5457409: 蛇淵の滝入口 -> 那岐山登山口 8 -> B/C分岐 4 -> 大神岩 88 = 100分。
  // 大神岩 -> 三角点 59 -> 那岐山 13 = 72分。
  // 那岐山 -> 黒滝 60 -> B/C分岐 52 -> 那岐山登山口 2 -> 蛇淵の滝入口 5 = 119分。
  '蛇淵の滝 那岐山登山口→大神岩':100,
  '大神岩→那岐山':72,
  '那岐山→蛇淵の滝 那岐山登山口':119,

  // No.146 六甲山 / 有馬温泉 六甲山登山口ルート。
  // YAMAP model 19426: 虫地獄登山口（有馬温泉側）08:00 -> 六甲山 09:48 = 108分。
  // 公開山行記録: 六甲山最高峰 -> 一軒茶屋 約5分; 一軒茶屋 -> 虫地獄登山口 約50分。
  '有馬温泉 六甲山登山口→六甲山':108,
  '六甲山→一軒茶屋':5,
  '一軒茶屋→有馬温泉 六甲山登山口':50,

  // No.145 愛宕山 / 清滝 愛宕山登山口ルート。
  // 公開参考CT: 清滝 -> 水尾分かれ 120分 -> 愛宕神社 40分 -> 山頂 20分;
  // 山頂 -> 愛宕神社 20分 -> 水尾分かれ 30分 -> 清滝 90分。
  '清滝 愛宕山登山口→水尾分かれ':120,
  '水尾分かれ→愛宕山':60,
  '愛宕山→水尾分かれ':50,
  '水尾分かれ→清滝 愛宕山登山口':90,

  // No.132 三峰山 / みつえ青少年旅行村 三峰山登山口ルート。
  // ヤマレコ公開計画 p5470448: 登山口 -> 休憩所 47 -> 五本杉避難小屋 80 = 127分;
  // 小屋 -> 三畝峠 21 -> 三峰山 14 = 35分;
  // 三峰山 -> 三畝峠 10 -> 小屋 13 = 23分;
  // 小屋 -> 参篭所 58 -> 登山口 20 = 78分。
  'みつえ青少年旅行村 三峰山登山口→五本杉避難小屋':127,
  '五本杉避難小屋→三峰山':35,
  '三峰山→五本杉避難小屋':23,
  '五本杉避難小屋→みつえ青少年旅行村 三峰山登山口':78
});
const SOURCE_NAGI='ヤマレコ公開計画 p5457409 https://www.yamareco.com/modules/yr_plan/detail-5457409.html / 大神岩座標 YAMAP https://yamap.com/landmarks/17732';
const SOURCE_ROKKO='YAMAP 六甲越-六甲山 往復モデル https://yamap.com/model-courses/19426 / 有馬側=虫地獄登山口 https://yamap.com/mountains/116 / 一軒茶屋座標 MapFan / 下山区間公開記録';
const SOURCE_ATAGO='愛宕山参考コースタイム https://yamaaruki-navi.com/atagoyama170129/ / 水尾分かれ座標 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=5951';
const SOURCE_MITSUMINE='ヤマレコ公開計画 p5470448 https://www.yamareco.com/modules/yr_plan/detail-5470448.html / 五本杉避難小屋座標 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=33379';
function sourceFor(key){
  if(key.includes('那岐山')||key.includes('大神岩')||key.includes('蛇淵'))return SOURCE_NAGI;
  if(key.includes('六甲山')||key.includes('一軒茶屋')||key.includes('有馬温泉'))return SOURCE_ROKKO;
  if(key.includes('愛宕山')||key.includes('水尾分かれ')||key.includes('清滝'))return SOURCE_ATAGO;
  return SOURCE_MITSUMINE;
}
function lookup(a,b){
  const aa=String(a||'').trim(),bb=String(b||'').trim(),key=`${aa}→${bb}`,n=T[key];
  if(!Number.isFinite(n))return null;
  return {minutes:n,source:sourceFor(key),sourceType:'public-route'};
}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '那岐山':{label:'蛇淵の滝 那岐山登山口ルート',points:[['trailhead','蛇淵の滝 那岐山登山口','登山口'],['waypoint','大神岩','主要通過点'],['peak','那岐山','山頂'],['trailhead','蛇淵の滝 那岐山登山口','下山口']],source:SOURCE_NAGI},
  '六甲山':{label:'有馬温泉 六甲山登山口ルート',points:[['trailhead','有馬温泉 六甲山登山口','登山口'],['peak','六甲山','山頂'],['waypoint','一軒茶屋','主要通過点'],['trailhead','有馬温泉 六甲山登山口','下山口']],source:SOURCE_ROKKO},
  '愛宕山':{label:'清滝 愛宕山登山口ルート',points:[['trailhead','清滝 愛宕山登山口','登山口'],['pass','水尾分かれ','主要通過点'],['peak','愛宕山','山頂'],['pass','水尾分かれ','主要通過点'],['trailhead','清滝 愛宕山登山口','下山口']],source:SOURCE_ATAGO},
  '三峰山':{label:'みつえ青少年旅行村 三峰山登山口ルート',points:[['trailhead','みつえ青少年旅行村 三峰山登山口','登山口'],['hut','五本杉避難小屋','避難小屋'],['peak','三峰山','山頂'],['hut','五本杉避難小屋','避難小屋'],['trailhead','みつえ青少年旅行村 三峰山登山口','下山口']],source:SOURCE_MITSUMINE}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.154 verified enrichment / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15154=Object.freeze({
  version:'1.5.154',
  priorityNos:Object.freeze([149,146,145,132]),
  mountains:Object.freeze(Object.keys(R)),
  reducedThreePointRoutes:4,
  blockedPriorityNos:Object.freeze([167,163,155,154,153,144,140,139,138,122]),
  policy:'batched user-priority retry; no guessed coordinates; public directional CT; no estimated CT; four-point enrichment allowed when it safely removes a three-point route'
});
})();
