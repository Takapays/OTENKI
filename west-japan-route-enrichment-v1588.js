// Traten V1.5.88: 西日本（三百名山）固定地点 + CT + 代表コース連動・第2弾。
// 対象: 六甲山 / 武奈ヶ岳 / 氷ノ山 / 山上ヶ岳
// Policy: public verified CT only; no geometric/elevation estimation.
(function(){'use strict';

const FIXED=Object.freeze({
  '六甲山':[
    {id:'v1588-rokko-kazefuki',type:'pass',name:'風吹岩',lat:34.748225,lon:135.279733,elevation:447,source:'ヤマレコ地点情報（34°44′53″N 135°16′47″E）'},
    {id:'v1588-rokko-amagatoge',type:'pass',name:'雨ヶ峠',lat:34.762222,lon:135.270833,elevation:600,source:'ヤマレコ地点情報（34°45′44″N 135°16′15″E）'},
    {id:'v1588-rokko-ikkenchaya',type:'pass',name:'一軒茶屋',lat:34.777725,lon:135.265722,elevation:880,source:'MapFan 公開座標'}
  ],
  '武奈ヶ岳':[
    {id:'v1588-buna-gotenyama',type:'peak',name:'御殿山（武奈ヶ岳）',lat:35.151977,lon:135.532393,elevation:1097,source:'公開標高地点データ / YAMAPモデルコース地点'}
  ],
  '山上ヶ岳':[
    {id:'v1588-sanjo-ominesanji',type:'hut',name:'大峯山寺',lat:34.253035,lon:135.941339,elevation:1710,source:'NAVITIME公開座標 / 奈良県公式所在地確認'}
  ]
});

try{
  if(typeof appendFixedWaypoints==='function'){
    Object.entries(FIXED).forEach(([m,pts])=>appendFixedWaypoints(m,pts));
  } else if(typeof BUILTIN_ROUTE_CATALOG!=='undefined') {
    Object.entries(FIXED).forEach(([m,pts])=>{BUILTIN_ROUTE_CATALOG[m]=[...(BUILTIN_ROUTE_CATALOG[m]||[]),...pts];});
  }
}catch(_){ }

const T=Object.freeze({
  // 六甲山: 山と高原地図Web 2026-07-29更新の区間CT + 既存確認済み有馬下降CT。
  '芦屋川 高座の滝→風吹岩':{minutes:40,source:'山と高原地図Web・高座の滝→風吹岩40分',sourceType:'yamakei'},
  '風吹岩→雨ヶ峠':{minutes:60,source:'山と高原地図Web・風吹岩→雨ヶ峠60分',sourceType:'yamakei'},
  '雨ヶ峠→一軒茶屋':{minutes:90,source:'山と高原地図Web・雨ヶ峠→一軒茶屋90分',sourceType:'yamakei'},
  '一軒茶屋→六甲山':{minutes:10,source:'山と高原地図Web・一軒茶屋→六甲山最高峰10分',sourceType:'yamakei'},
  '六甲山→有馬温泉 六甲山登山口':{minutes:94,source:'YAMAP標準モデル・六甲山→有馬側登山口 1時間34分',sourceType:'yamap'},

  // 武奈ヶ岳: YAMAP 西南稜モデルコースのチェックポイントを合算。
  '坊村 武奈ヶ岳登山口→御殿山（武奈ヶ岳）':{minutes:147,source:'YAMAP西南稜モデル・坊村登山口→御殿山 95+30+15+7分',sourceType:'yamap'},
  '御殿山（武奈ヶ岳）→武奈ヶ岳':{minutes:46,source:'YAMAP西南稜モデル・御殿山→ワサビ峠40+分岐3+山頂3分',sourceType:'yamap'},
  '武奈ヶ岳→御殿山（武奈ヶ岳）':{minutes:54,source:'YAMAP西南稜モデル・山頂→分岐30+ワサビ峠9+御殿山15分',sourceType:'yamap'},
  '御殿山（武奈ヶ岳）→坊村 武奈ヶ岳登山口':{minutes:109,source:'YAMAP西南稜モデル・御殿山→分岐25+80+登山口4分',sourceType:'yamap'},

  // 氷ノ山: 鳥取県公式「氷ノ山登山マップ」養父市・氷ノ山越コース。
  '福定親水公園 氷ノ山登山口→氷ノ山越避難小屋':{minutes:120,source:'鳥取県公式・氷ノ山登山マップ 福定→地蔵堂45分→氷ノ山越75分',sourceType:'official'},
  '氷ノ山越避難小屋→氷ノ山':{minutes:55,source:'鳥取県公式・氷ノ山登山マップ 氷ノ山越→山頂55分',sourceType:'official'},
  '氷ノ山→氷ノ山越避難小屋':{minutes:40,source:'鳥取県公式・氷ノ山登山マップ 山頂→氷ノ山越40分',sourceType:'official'},
  '氷ノ山越避難小屋→福定親水公園 氷ノ山登山口':{minutes:100,source:'鳥取県公式・氷ノ山登山マップ 氷ノ山越→福定100分',sourceType:'official'},

  // 山上ヶ岳: YAMAP往復モデル 4:43 の区間列。大峯山寺は山頂直下の公式地点。
  '清浄大橋 大峯山登山口→大峯山寺':{minutes:155,source:'YAMAP・山上ヶ岳往復モデル 清浄大橋側起点→大峯山寺 155分（区間合算）',sourceType:'yamap'},
  '大峯山寺→山上ヶ岳':{minutes:4,source:'YAMAP・山上ヶ岳往復モデル 大峯山寺→山上ヶ岳4分',sourceType:'yamap'},
  '山上ヶ岳→大峯山寺':{minutes:10,source:'YAMAP・山上ヶ岳往復モデル 山上ヶ岳→大峯山寺10分',sourceType:'yamap'},
  '大峯山寺→清浄大橋 大峯山登山口':{minutes:114,source:'YAMAP・山上ヶ岳往復モデル 大峯山寺→清浄大橋側起点114分（区間合算）',sourceType:'yamap'}
});

try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return T[`${String(a||'').trim()}→${String(b||'').trim()}`]||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return T[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '六甲山':{label:'ロックガーデン・最高峰・有馬温泉縦走',points:[
    ['trailhead','芦屋川 高座の滝','登山口'],['pass','風吹岩','展望・通過ポイント'],['pass','雨ヶ峠','峠・分岐'],['pass','一軒茶屋','山頂直下'],['peak','六甲山','山頂'],['trailhead','有馬温泉 六甲山登山口','下山口']
  ],source:'V1.5.88 west enrichment',verified:true},
  '武奈ヶ岳':{label:'坊村・御殿山 西南稜ルート',points:[
    ['trailhead','坊村 武奈ヶ岳登山口','登山口'],['peak','御殿山（武奈ヶ岳）','通過ピーク'],['peak','武奈ヶ岳','山頂'],['peak','御殿山（武奈ヶ岳）','通過ピーク'],['trailhead','坊村 武奈ヶ岳登山口','下山口']
  ],source:'V1.5.88 west enrichment',verified:true},
  '氷ノ山':{label:'福定・氷ノ山越ルート',points:[
    ['trailhead','福定親水公園 氷ノ山登山口','登山口'],['hut','氷ノ山越避難小屋','避難小屋・峠'],['peak','氷ノ山','山頂'],['hut','氷ノ山越避難小屋','避難小屋・峠'],['trailhead','福定親水公園 氷ノ山登山口','下山口']
  ],source:'V1.5.88 west enrichment',verified:true},
  '山上ヶ岳':{label:'清浄大橋・大峯山寺ルート',points:[
    ['trailhead','清浄大橋 大峯山登山口','登山口'],['hut','大峯山寺','山頂直下'],['peak','山上ヶ岳','山頂'],['hut','大峯山寺','山頂直下'],['trailhead','清浄大橋 大峯山登山口','下山口']
  ],source:'V1.5.88 west enrichment',verified:true}
});

if(typeof representativeCourseOptions==='function'){const o=representativeCourseOptions;representativeCourseOptions=function(mountain){let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){}const opts=o(mountain)||[];const r=R[k];if(!r)return opts;return [r,...opts.filter(c=>c?.label!==r.label)];};}

try{if(typeof buildRepresentativeResolvedRoute==='function'){const o=buildRepresentativeResolvedRoute;buildRepresentativeResolvedRoute=function(mountain,course){if(course?.source!=='V1.5.88 west enrichment')return o(mountain,course);const defs=representativeCourseExpandedPointDefs(mountain,course);const resolved=defs.map(([type,name,role])=>({type,name,role,p:representativeCandidate(type,name,mountain)||null}));const segments=[];for(let i=1;i<resolved.length;i++){const a=resolved[i-1],b=resolved[i];if(!a.p||!b.p)return {error:`${a.name} → ${b.name} の地点座標を解決できません。`};const info=T[`${a.name}→${b.name}`]||courseTimeInfo(a.p,b.p);if(!info)return {error:`${a.name} → ${b.name} の確認済みCTがありません。`};segments.push(info);}return {resolved,segments,distributedPointCount:0};};}}catch(_){ }

try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_WEST_ENRICHMENT_V1588=Object.freeze({
  scope:'西日本三百名山 第2弾 / 固定地点+CT+代表コース連動4座',
  mountains:Object.freeze(Object.keys(R)),
  fixedAdded:Object.freeze({六甲山:3,武奈ヶ岳:1,山上ヶ岳:1,氷ノ山:0}),
  routeCtMinutes:Object.freeze({六甲山:294,武奈ヶ岳:356,氷ノ山:315,山上ヶ岳:283}),
  policy:'fixed point + verified CT + representative route are one atomic update; no geometric/elevation estimation'
});
})();
