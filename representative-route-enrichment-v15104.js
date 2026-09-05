// Traten V1.5.104: 3-point representative-route elimination / bulk batch 3.
// Priority: eliminate representative courses that only show trailhead -> summit -> trailhead.
// Public model-course CTs and fixed/public coordinates only. No CT/coordinate inference.
(function(){'use strict';
const VERSION='1.5.104';

// New fixed route points required by public standard routes.
try{
  const cat=BUILTIN_ROUTE_CATALOG['岩手山']||(BUILTIN_ROUTE_CATALOG['岩手山']=[]);
  if(!cat.some(p=>p.type==='hut'&&p.name==='平笠不動避難小屋'))cat.push({
    id:'v15104-iwate-hirakasa',type:'hut',name:'平笠不動避難小屋',
    lat:39.8563889,lon:140.9963889,elevation:1766,
    source:'PORTALFIELD / 国土地理院地図掲載座標（北緯39度51分23秒 東経140度59分47秒、2026-09-05確認）'
  });
}catch(_){ }
try{
  const cat=BUILTIN_ROUTE_CATALOG['乗鞍岳']||(BUILTIN_ROUTE_CATALOG['乗鞍岳']=[]);
  if(!cat.some(p=>p.type==='hut'&&p.name==='肩ノ小屋'))cat.push({
    id:'v15104-norikura-katanokoya',type:'hut',name:'肩ノ小屋',
    lat:36.1144444,lon:137.5525,elevation:2768,
    source:'PORTALFIELD / 長野県山小屋情報（北緯36度6分52秒 東経137度33分09秒、2026-09-05確認）'
  });
}catch(_){ }

const EXTRA_CT=Object.freeze({
  // 岩手山・焼走り: YAMAP standard model.
  '焼走り登山口→平笠不動避難小屋':{minutes:290,source:'YAMAP 岩手山 焼走り登山口モデル（07:00→11:50、2026-09-05確認）',sourceType:'yamap'},
  '平笠不動避難小屋→岩手山':{minutes:12,source:'YAMAP 岩手山 焼走り登山口モデル（11:50→12:02、2026-09-05確認）',sourceType:'yamap'},
  '岩手山→平笠不動避難小屋':{minutes:75,source:'YAMAP 岩手山 焼走り登山口モデル（12:02→13:17、2026-09-05確認）',sourceType:'yamap'},
  '平笠不動避難小屋→焼走り登山口':{minutes:130,source:'YAMAP 岩手山 焼走り登山口モデル（13:17→15:27、2026-09-05確認）',sourceType:'yamap'},

  // 金峰山・瑞牆山荘: YAMAP standard model.
  '瑞牆山荘・富士見平口→富士見平小屋':{minutes:105,source:'YAMAP 瑞牆山荘-金峰山 往復モデル（07:03→08:48、2026-09-05確認）',sourceType:'yamap'},
  '富士見平小屋→金峰山':{minutes:184,source:'YAMAP 瑞牆山荘-金峰山 往復モデル（08:48→11:52、2026-09-05確認）',sourceType:'yamap'},
  '金峰山→富士見平小屋':{minutes:193,source:'YAMAP 瑞牆山荘-金峰山 往復モデル（11:52→15:05、2026-09-05確認）',sourceType:'yamap'},
  '富士見平小屋→瑞牆山荘・富士見平口':{minutes:33,source:'YAMAP 瑞牆山荘-金峰山 往復モデル（15:05→15:38、2026-09-05確認）',sourceType:'yamap'},

  // 天狗岳・唐沢鉱泉: YAMAP standard model.
  '唐沢鉱泉→黒百合ヒュッテ':{minutes:73,source:'YAMAP 中山峠-東天狗岳 往復モデル（唐沢鉱泉08:38→黒百合ヒュッテ09:51、2026-09-05確認）',sourceType:'yamap'},
  '黒百合ヒュッテ→天狗岳':{minutes:90,source:'YAMAP 中山峠-東天狗岳 往復モデル（黒百合ヒュッテ09:51→東天狗岳11:21、2026-09-05確認）',sourceType:'yamap'},
  '天狗岳→黒百合ヒュッテ':{minutes:103,source:'YAMAP 中山峠-東天狗岳 往復モデル（東天狗岳11:21→黒百合ヒュッテ13:04、2026-09-05確認）',sourceType:'yamap'},
  '黒百合ヒュッテ→唐沢鉱泉':{minutes:78,source:'YAMAP 中山峠-東天狗岳 往復モデル（黒百合ヒュッテ13:04→唐沢鉱泉14:22、2026-09-05確認）',sourceType:'yamap'},

  // 白山・平瀬道: YAMAP standard model.
  '大白川・平瀬道登山口→白山室堂':{minutes:269,source:'YAMAP 平瀬道登山口-室堂センター-白山 往復モデル（06:00→10:29、2026-09-05確認）',sourceType:'yamap'},
  '白山室堂→白山（御前峰）':{minutes:79,source:'YAMAP 平瀬道登山口-室堂センター-白山 往復モデル（10:29→11:48、2026-09-05確認）',sourceType:'yamap'},
  '白山（御前峰）→白山室堂':{minutes:17,source:'YAMAP 平瀬道登山口-室堂センター-白山 往復モデル（11:48→12:05、2026-09-05確認）',sourceType:'yamap'},
  '白山室堂→大白川・平瀬道登山口':{minutes:200,source:'YAMAP 平瀬道登山口-室堂センター-白山 往復モデル（12:05→15:25、2026-09-05確認）',sourceType:'yamap'},

  // 仙ノ倉山: YAMAP 松手山-平標山-仙ノ倉山-平元新道 model; descent only.
  '仙ノ倉山→平標山の家':{minutes:130,source:'YAMAP 松手山-平標山-仙ノ倉山-平元新道モデル（仙ノ倉10:51→平標山の家13:01、2026-09-05確認）',sourceType:'yamap'},
  '平標山の家→平標登山口・元橋駐車場':{minutes:67,source:'YAMAP 松手山-平標山-仙ノ倉山-平元新道モデル（平標山の家13:01→平標登山口駐車場14:08、2026-09-05確認）',sourceType:'yamap'},

  // 乗鞍岳・畳平: YAMAP standard model.
  '畳平バスターミナル→肩ノ小屋':{minutes:39,source:'YAMAP 乗鞍岳（畳平）モデル（08:00→肩ノ小屋08:39、2026-09-05確認）',sourceType:'yamap'},
  '肩ノ小屋→乗鞍岳':{minutes:62,source:'YAMAP 乗鞍岳（畳平）モデル（肩ノ小屋08:39→剣ヶ峰09:41、2026-09-05確認）',sourceType:'yamap'},
  '乗鞍岳→肩ノ小屋':{minutes:45,source:'YAMAP 乗鞍岳（畳平）モデル（剣ヶ峰09:41→肩ノ小屋10:26、2026-09-05確認）',sourceType:'yamap'},
  '肩ノ小屋→畳平バスターミナル':{minutes:28,source:'YAMAP 乗鞍岳（畳平）モデル（肩ノ小屋10:26→畳平10:54、2026-09-05確認）',sourceType:'yamap'},

  // 戸隠山: YAMAP 戸隠山周回 model; descent to campground via 一不動.
  '戸隠山→一不動避難小屋':{minutes:110,source:'YAMAP 戸隠山周回モデル（戸隠山10:10→一不動避難小屋12:00、2026-09-05確認）',sourceType:'yamap'},
  '一不動避難小屋→戸隠キャンプ場・戸隠牧場':{minutes:145,source:'YAMAP 戸隠山周回モデル（一不動12:00→キャンプ場前14:25、2026-09-05確認）',sourceType:'yamap'},

  // 久住山・長者原: YAMAP public model route through 法華院 and 長者原.
  '久住山→法華院温泉山荘':{minutes:114,source:'YAMAP 牧ノ戸峠-久住山-法華院温泉-長者原モデル（久住山10:38→法華院12:32、2026-09-05確認）',sourceType:'yamap'},
  '法華院温泉山荘→長者原':{minutes:156,source:'YAMAP 牧ノ戸峠-久住山-法華院温泉-長者原モデル（法華院08:00相当→長者原10:36、区間2:36、2026-09-05確認）',sourceType:'yamap'}
});
function key(a,b){return `${String(a||'').trim()}→${String(b||'').trim()}`;}
try{if(typeof directCourseTimeInfoByNames==='function'){const old=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return EXTRA_CT[key(a,b)]||old(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const old=courseTimeInfo;courseTimeInfo=function(a,b){return EXTRA_CT[key(a?.name,b?.name)]||old(a,b);};}}catch(_){ }

const RULES=Object.freeze({
  '岩手山|焼走りルート':[{after:'焼走り登山口',before:'岩手山',points:[['hut','平笠不動避難小屋','避難小屋']]}],
  '金峰山|瑞牆山荘・富士見平ルート':[{after:'瑞牆山荘・富士見平口',before:'金峰山',points:[['hut','富士見平小屋','山小屋']]}],
  '天狗岳|唐沢鉱泉ルート':[{after:'唐沢鉱泉',before:'天狗岳',points:[['hut','黒百合ヒュッテ','山小屋']]}],
  '白山|大白川・平瀬道ルート':[{after:'大白川・平瀬道登山口',before:'白山（御前峰）',points:[['hut','白山室堂','山小屋']]}],
  '仙ノ倉山|平標登山口・元橋駐車場ルート':[{after:'仙ノ倉山',before:'平標登山口・元橋駐車場',points:[['hut','平標山の家','山小屋']],directional:true}],
  '乗鞍岳|畳平バスターミナルルート':[{after:'畳平バスターミナル',before:'乗鞍岳',points:[['hut','肩ノ小屋','山小屋']]}],
  '戸隠山|戸隠キャンプ場・戸隠牧場ルート':[{after:'戸隠山',before:'戸隠キャンプ場・戸隠牧場',points:[['hut','一不動避難小屋','避難小屋']],directional:true}],
  '久住山|長者原ルート':[{after:'久住山',before:'長者原',points:[['hut','法華院温泉山荘','山小屋']],directional:true}]
});
function rev(points){return [...points].reverse().map(p=>[...p]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const n=out[i+1];if(!n)continue;if(cur[1]===r.after&&n[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(!r.directional&&cur[1]===r.before&&n[1]===r.after)next.push(...rev(r.points));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){const defs=old(mountain,course)||[];let m=String(mountain||'').trim();try{m=canonicalMountainName(m);}catch(_){ }const rules=RULES[`${m}|${course?.label||''}`];return rules?expand(defs,rules):defs;};
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15104=Object.freeze({version:VERSION,phase:'3-point representative-route elimination / bulk batch 3',routeCount:Object.keys(RULES).length,extraVerifiedCtCount:Object.keys(EXTRA_CT).length,newFixedPoints:2,policy:'public model-course CT + public fixed coordinates only; no inference'});
})();
