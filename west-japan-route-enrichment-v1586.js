// Traten V1.5.86: 西日本（三百名山）通過ポイント拡充・第1弾。
// 対象: 藤原岳 / 大山（鳥取） / 剣山 / 三嶺 / 石鎚山 / 笹ヶ峰
// CT policy: existing verified public CT only, plus one explicit verified-total residual for 大山 descent.
(function(){'use strict';
const T=Object.freeze({
  // 近畿: 藤原岳。app.js既存確認済みCTの名称差を正規化。
  '大貝戸登山口 藤原岳→藤原山荘':{minutes:180,source:'山と高原地図Web・藤原岳 大貝戸登山道',sourceType:'yamakei'},
  '藤原山荘→藤原岳':{minutes:20,source:'山と高原地図Web・藤原岳 大貝戸登山道',sourceType:'yamakei'},
  '藤原岳→藤原山荘':{minutes:19,source:'ヤマレコ・藤原岳 大貝戸登山口ルート山行計画（標準CT複数照合）',sourceType:'yamareco'},
  '藤原山荘→大貝戸登山口 藤原岳':{minutes:114,source:'ヤマレコ・藤原岳 大貝戸登山口ルート山行計画（標準CT複数照合・区間合算）',sourceType:'yamareco'},

  // 中国: 大山。既存公式/確認済みCTで山頂避難小屋を往路へ追加。
  '夏山登山口 大山→六合目避難小屋':{minutes:128,source:'ヤマレコ・大山弥山 山行計画（標準CT補完）',sourceType:'yamareco'},
  '六合目避難小屋→大山頂上避難小屋':{minutes:73,source:'ヤマレコ・大山弥山 山行計画（標準CT補完）',sourceType:'yamareco'},
  '大山頂上避難小屋→大山（弥山）':{minutes:3,source:'ヤマレコ・大山弥山 山行計画（標準CT補完）',sourceType:'yamareco'},
  '大山（弥山）→六合目避難小屋':{minutes:60,source:'環境省・大山登山コース 大山山頂→六合目避難小屋60分',sourceType:'official'},
  '六合目避難小屋→夏山登山口 大山':{minutes:90,source:'大山登山ホームページ公式 山頂→夏山登山口150分 - 山頂→六合目60分',sourceType:'derived-verified'},

  // 四国: 剣山。西島駅まで細分化して既存YAMAP確認済みCTを使用。
  '見ノ越 剣山登山口→剣山野営場（西島野営場）':{minutes:42,source:'YAMAP・剣山王道モデルコース',sourceType:'yamap'},
  '剣山野営場（西島野営場）→剣山観光登山リフト西島駅':{minutes:16,source:'YAMAP・剣山王道モデルコース',sourceType:'yamap'},
  '剣山観光登山リフト西島駅→剣山':{minutes:37,source:'YAMAP標準モデル・見ノ越登山口-剣山往復',sourceType:'yamap'},
  '剣山→剣山観光登山リフト西島駅':{minutes:29,source:'YAMAP標準モデル・見ノ越登山口-剣山往復',sourceType:'yamap'},
  '剣山観光登山リフト西島駅→剣山野営場（西島野営場）':{minutes:7,source:'YAMAP・剣山王道モデルコース',sourceType:'yamap'},
  '剣山野営場（西島野営場）→見ノ越 剣山登山口':{minutes:40,source:'YAMAP・剣山王道モデルコース',sourceType:'yamap'},

  // 四国: 三嶺。名頃ルートへ統一し、三嶺ヒュッテを往復で明示。
  '名頃登山口 三嶺→三嶺ヒュッテ':{minutes:223,source:'ヤマレコ・三嶺 山行計画（標準CT補完）',sourceType:'yamareco'},
  '三嶺ヒュッテ→三嶺':{minutes:14,source:'ヤマレコ・三嶺 山行計画（標準CT補完）',sourceType:'yamareco'},
  '三嶺→三嶺ヒュッテ':{minutes:9,source:'ヤマレコ・三嶺 山行計画（標準CT補完）',sourceType:'yamareco'},
  '三嶺ヒュッテ→名頃登山口 三嶺':{minutes:131,source:'ヤマレコ・三嶺 山行計画（標準CT補完）',sourceType:'yamareco'},

  // 四国: 石鎚山。弥山だけで終わらず最高点の天狗岳を明示。
  '石鎚山（弥山）→石鎚山（天狗岳）':{minutes:20,source:'YAMAP公開モデルコース・石鎚山（弥山）→天狗岳',sourceType:'yamap'},
  '石鎚山（天狗岳）→石鎚山（弥山）':{minutes:7,source:'YAMAP公開モデルコース・天狗岳→石鎚山（弥山）',sourceType:'yamap'},

  // 四国: 笹ヶ峰。好日山荘の公開区間値をそのまま分割。
  '下津池 笹ヶ峰登山口→丸山荘':{minutes:40,source:'好日山荘・下津池登山口→丸山荘40分',sourceType:'other'},
  '丸山荘→笹ヶ峰':{minutes:40,source:'好日山荘・丸山荘→笹ヶ峰40分',sourceType:'other'},
  '笹ヶ峰→下津池 笹ヶ峰登山口':{minutes:106,source:'YAMAP標準モデル・笹ヶ峰往復',sourceType:'yamap'}
});

try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return T[`${String(a||'').trim()}→${String(b||'').trim()}`]||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return T[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '藤原岳':{label:'大貝戸・藤原山荘ルート',points:[['trailhead','大貝戸登山口 藤原岳','登山口'],['hut','藤原山荘','山小屋'],['peak','藤原岳','山頂'],['hut','藤原山荘','山小屋'],['trailhead','大貝戸登山口 藤原岳','下山口']],source:'V1.5.86 west enrichment',verified:true},
  '大山':{label:'夏山登山道・六合目・頂上避難小屋ルート',points:[['trailhead','夏山登山口 大山','登山口'],['hut','六合目避難小屋','山小屋'],['hut','大山頂上避難小屋','山小屋'],['peak','大山（弥山）','山頂'],['hut','六合目避難小屋','山小屋'],['trailhead','夏山登山口 大山','下山口']],source:'V1.5.86 west enrichment',verified:true},
  '剣山':{label:'見ノ越・西島駅ルート',points:[['trailhead','見ノ越 剣山登山口','登山口'],['camp','剣山野営場（西島野営場）','野営場'],['trailhead','剣山観光登山リフト西島駅','通過ポイント'],['peak','剣山','山頂'],['trailhead','剣山観光登山リフト西島駅','通過ポイント'],['camp','剣山野営場（西島野営場）','野営場'],['trailhead','見ノ越 剣山登山口','下山口']],source:'V1.5.86 west enrichment',verified:true},
  '三嶺':{label:'名頃・三嶺ヒュッテルート',points:[['trailhead','名頃登山口 三嶺','登山口'],['hut','三嶺ヒュッテ','山小屋'],['peak','三嶺','山頂'],['hut','三嶺ヒュッテ','山小屋'],['trailhead','名頃登山口 三嶺','下山口']],source:'V1.5.86 west enrichment',verified:true},
  '石鎚山':{label:'土小屋・弥山・天狗岳ルート',points:[['trailhead','土小屋登山口','登山口'],['hut','二ノ鎖元小屋','山小屋'],['peak','石鎚山（弥山）','山頂'],['peak','石鎚山（天狗岳）','最高点'],['peak','石鎚山（弥山）','通過ピーク'],['hut','二ノ鎖元小屋','山小屋'],['trailhead','土小屋登山口','下山口']],source:'V1.5.86 west enrichment',verified:true},
  '笹ヶ峰':{label:'下津池・丸山荘ルート',points:[['trailhead','下津池 笹ヶ峰登山口','登山口'],['hut','丸山荘','山小屋'],['peak','笹ヶ峰','山頂'],['trailhead','下津池 笹ヶ峰登山口','下山口']],source:'V1.5.86 west enrichment',verified:true}
});

if(typeof representativeCourseOptions==='function'){const o=representativeCourseOptions;representativeCourseOptions=function(mountain){let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){}const opts=o(mountain)||[];const r=R[k];if(!r)return opts;return [r,...opts.filter(c=>c?.label!==r.label)];};}

try{if(typeof buildRepresentativeResolvedRoute==='function'){const o=buildRepresentativeResolvedRoute;buildRepresentativeResolvedRoute=function(mountain,course){if(course?.source!=='V1.5.86 west enrichment')return o(mountain,course);const defs=representativeCourseExpandedPointDefs(mountain,course);const resolved=defs.map(([type,name,role])=>({type,name,role,p:representativeCandidate(type,name,mountain)||null}));const segments=[];for(let i=1;i<resolved.length;i++){const a=resolved[i-1],b=resolved[i];if(!a.p||!b.p)return {error:`${a.name} → ${b.name} の地点座標を解決できません。`};const info=T[`${a.name}→${b.name}`]||courseTimeInfo(a.p,b.p);if(!info)return {error:`${a.name} → ${b.name} の確認済みCTがありません。`};segments.push(info);}return {resolved,segments,distributedPointCount:0};};}}catch(_){ }

window.TRATEN_WEST_ENRICHMENT_V1586=Object.freeze({scope:'近畿・中国・四国・九州 59座監査 / 第1弾6座改善',mountains:Object.freeze(Object.keys(R)),policy:'verified public CT only; no geometric/elevation estimation'});
})();
