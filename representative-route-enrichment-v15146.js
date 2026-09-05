// Traten V1.5.146: full-runtime three-point route reduction batch 2.
// Public waypoint coordinates + published checkpoint CT only; no estimated CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '妙高山':[
    {id:'v15146-myoko-tengudo',type:'pass',name:'天狗堂',lat:36.889722,lon:138.124167,elevation:1932,source:'ヤマレコ公開地点情報・北緯36度53分23秒 東経138度07分27秒 https://www.yamareco.com/modules/yamainfo/ptinfo.php?ptid=8137'}
  ],
  '伊予富士':[
    {id:'v15146-iyofuji-kuwase',type:'pass',name:'桑瀬峠',lat:33.801495,lon:133.2609722,elevation:1459,source:'峠データベース公開地点情報 https://pdb.the-orj.org/view.php?no=3146'}
  ],
  '英彦山':[
    {id:'v15146-hikosan-hoheiden',type:'waypoint',name:'英彦山神宮奉幣殿',lat:33.483519,lon:130.910308,elevation:720,source:'Wikimedia Commons撮影地点座標・添田町公式施設確認 https://commons.wikimedia.org/wiki/File:Hoheiden_of_Hikosan_Shrine.jpg'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }
const T=Object.freeze({
  // 妙高山・燕温泉: YAMAP標準モデル checkpoint aggregation
  '燕温泉登山口→天狗堂':185,
  '天狗堂→妙高山':100,
  '妙高山→天狗堂':75,
  '天狗堂→燕温泉登山口':98,
  // 伊予富士・旧寒風山トンネル南口: YAMAP + existing published return guide
  '寒風山登山口→桑瀬峠':60,
  '桑瀬峠→伊予富士':85,
  '伊予富士→桑瀬峠':90,
  '桑瀬峠→寒風山登山口':60,
  // 英彦山・別所: YAMAP別所登山口-奉幣殿-英彦山周回 checkpoint aggregation
  '別所駐車場・英彦山登山口→英彦山神宮奉幣殿':27,
  '英彦山神宮奉幣殿→英彦山':129,
  '英彦山→英彦山神宮奉幣殿':73,
  '英彦山神宮奉幣殿→別所駐車場・英彦山登山口':21
});
const SOURCE=Object.freeze({
  '妙高山':'YAMAP公開モデル https://yamap.com/model-courses/198',
  '伊予富士':'YAMAP公開モデル https://yamap.com/model-courses/24532 / 既存公開登山ガイド復路CT',
  '英彦山':'YAMAP公開モデル https://yamap.com/model-courses/10226'
});
function which(a,b){const s=`${a}|${b}`;if(s.includes('天狗堂')||s.includes('燕温泉')||s.includes('妙高山'))return '妙高山';if(s.includes('桑瀬峠')||s.includes('伊予富士')||s.includes('寒風山登山口'))return '伊予富士';if(s.includes('奉幣殿')||s.includes('英彦山'))return '英彦山';return '';}
function lookup(a,b){const aa=String(a||'').trim(),bb=String(b||'').trim(),n=T[`${aa}→${bb}`];if(!Number.isFinite(n))return null;const m=which(aa,bb);return {minutes:n,source:SOURCE[m],sourceType:'public-model'};}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }
const R=Object.freeze({
  '妙高山':{label:'燕温泉ルート',points:[['trailhead','燕温泉登山口','登山口'],['pass','天狗堂','分岐'],['peak','妙高山','山頂'],['pass','天狗堂','分岐'],['trailhead','燕温泉登山口','下山口']]},
  '伊予富士':{label:'寒風山登山口ルート',points:[['trailhead','寒風山登山口','登山口'],['pass','桑瀬峠','峠'],['peak','伊予富士','山頂'],['pass','桑瀬峠','峠'],['trailhead','寒風山登山口','下山口']]},
  '英彦山':{label:'別所駐車場・英彦山登山口ルート',points:[['trailhead','別所駐車場・英彦山登山口','登山口'],['waypoint','英彦山神宮奉幣殿','主要地点'],['peak','英彦山','山頂'],['waypoint','英彦山神宮奉幣殿','主要地点'],['trailhead','別所駐車場・英彦山登山口','下山口']]}
});
if(typeof representativeCourseOptions==='function'){const o=representativeCourseOptions;representativeCourseOptions=function(mountain){let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }const r=R[k],opts=o(mountain)||[];if(!r)return opts;return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.146 verified enrichment / ${SOURCE[k]}`,verified:true};});};}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15146=Object.freeze({version:'1.5.146',mountains:Object.freeze(Object.keys(R)),reducedThreePointRoutes:3,policy:'public coordinates + published checkpoint CT; no estimated CT'});
})();
