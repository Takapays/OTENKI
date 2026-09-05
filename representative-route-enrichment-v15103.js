// Traten V1.5.103: 「登山口→山頂→登山口」優先解消フェーズ / bulk batch 2。
// 既存固定地点を優先し、公開モデルコースで確認した区間CTだけ追加する。
// 推測座標・推測CTは追加しない。
(function(){'use strict';
const VERSION='1.5.103';

const EXTRA_CT=Object.freeze({
  // 甲斐駒ヶ岳: YAMAP 北沢峠-仙水峠-甲斐駒ヶ岳-双児山 周回モデル。
  // 仙水小屋 08:38 -> 甲斐駒ヶ岳 11:56 = 198分。
  '仙水小屋→甲斐駒ヶ岳':Object.freeze({minutes:198,source:'YAMAP・北沢峠-仙水峠-甲斐駒ヶ岳-双児山 周回モデル（仙水小屋08:38→甲斐駒ヶ岳11:56、2026-09-05確認）',sourceType:'yamap'}),

  // 苗場山: YAMAP 小赤沢コース公開チェックポイント。
  '小赤沢三合目登山口→苗場山頂ヒュッテ':Object.freeze({minutes:213,source:'YAMAP・苗場山 小赤沢コース（小赤沢3合目登山口06:00→苗場山頂ヒュッテ09:33、2026-09-05確認）',sourceType:'yamap'}),
  '苗場山頂ヒュッテ→苗場山':Object.freeze({minutes:2,source:'YAMAP・苗場山 小赤沢コース（苗場山頂ヒュッテ09:33→苗場山09:35、2026-09-05確認）',sourceType:'yamap'}),
  '苗場山→苗場山頂ヒュッテ':Object.freeze({minutes:1,source:'YAMAP・苗場山 小赤沢コース（苗場山09:35→苗場山頂ヒュッテ09:36、2026-09-05確認）',sourceType:'yamap'}),
  '苗場山頂ヒュッテ→小赤沢三合目登山口':Object.freeze({minutes:175,source:'YAMAP・苗場山 小赤沢コース（苗場山頂ヒュッテ09:36→小赤沢3合目登山口12:31、2026-09-05確認）',sourceType:'yamap'}),

  // 秋田駒ヶ岳: YAMAP 男女岳往復モデル。
  '秋田駒ヶ岳（男女岳）→阿弥陀池避難小屋':Object.freeze({minutes:8,source:'YAMAP・秋田駒ヶ岳 男女岳往復モデル（男女岳09:52→阿弥陀池避難小屋10:00、2026-09-05確認）',sourceType:'yamap'}),
  '阿弥陀池避難小屋→八合目小屋 秋田駒ヶ岳':Object.freeze({minutes:61,source:'YAMAP・秋田駒ヶ岳 男女岳往復モデル（阿弥陀池避難小屋10:00→八合目登山口11:01、2026-09-05確認）',sourceType:'yamap'}),

  // 大菩薩嶺: YAMAP 上日川峠-大菩薩嶺-大菩薩峠 周回モデル。
  '大菩薩嶺→介山荘':Object.freeze({minutes:34,source:'YAMAP・上日川峠-大菩薩嶺-大菩薩峠 周回モデル（大菩薩嶺10:12→介山荘10:46、2026-09-05確認）',sourceType:'yamap'}),
  '介山荘→上日川峠':Object.freeze({minutes:84,source:'YAMAP・上日川峠-大菩薩嶺-大菩薩峠 周回モデル（介山荘10:46→上日川峠12:10、2026-09-05確認）',sourceType:'yamap'}),


  // 空木岳: YAMAP 池山尾根往復モデル。駒峰ヒュッテ12:25→空木岳登山口16:19 = 234分。
  '空木駒峰ヒュッテ→池山口登山口':Object.freeze({minutes:234,source:'YAMAP・空木岳 池山尾根往復モデル（駒峰ヒュッテ12:25→空木岳登山口16:19、2026-09-05確認）',sourceType:'yamap'}),

  // 大天井岳: 公開表銀座モデル。中房→燕山荘 = 70 + 110 + 65 = 245分。
  '中房登山口（燕岳・大天井岳 表銀座ルート）→燕山荘':Object.freeze({minutes:245,source:'山旅旅・表銀座 中房～大天井岳モデル（中房→第2ベンチ70分→合戦小屋110分→燕山荘65分、2026-09-05確認）',sourceType:'public-guide'}),

  // 伯母子岳: YAMAP 大股～伯母子峠～伯母子岳～大股 ピストンモデル。
  '伯母子岳→伯母子岳避難小屋':Object.freeze({minutes:25,source:'YAMAP・大股～伯母子峠～伯母子岳～大股 ピストン（伯母子岳11:32→伯母子岳山小屋11:57、2026-09-05確認）',sourceType:'yamap'}),
  '伯母子岳避難小屋→大股登山口 伯母子岳':Object.freeze({minutes:150,source:'YAMAP・大股～伯母子峠～伯母子岳～大股 ピストン（伯母子岳山小屋11:57→大股側駐車場14:27、2026-09-05確認）',sourceType:'yamap'})
});

function ctKey(a,b){return `${String(a||'').trim()}→${String(b||'').trim()}`;}
try{
  if(typeof directCourseTimeInfoByNames==='function'){
    const old=directCourseTimeInfoByNames;
    directCourseTimeInfoByNames=function(a,b){return EXTRA_CT[ctKey(a,b)]||old(a,b);};
  }
}catch(_){ }
try{
  if(typeof courseTimeInfo==='function'){
    const old=courseTimeInfo;
    courseTimeInfo=function(a,b){return EXTRA_CT[ctKey(a?.name,b?.name)]||old(a,b);};
  }
}catch(_){ }

const RULES=Object.freeze({
  // V1.5.101 の赤岳キーが canonicalMountainName('八ヶ岳（赤岳）')='赤岳' と一致する形で確実に適用。
  '赤岳|美濃戸口ルート':Object.freeze([
    {after:'美濃戸口',before:'赤岳',points:[['trailhead','美濃戸','登山口'],['hut','赤岳鉱泉','山小屋'],['hut','行者小屋','山小屋']]}
  ]),

  // 既存の確認済み直結CTのみで往路を細分化。
  '茶臼岳|沼平ゲートルート':Object.freeze([
    {after:'沼平ゲート',before:'茶臼岳',points:[['hut','茶臼小屋','山小屋']],directional:true}
  ]),

  // 北沢峠→長衛小屋→仙水小屋まで既存CT。仙水小屋→山頂のみ公開モデルの区間合算を追加。
  '甲斐駒ヶ岳|北沢峠ルート':Object.freeze([
    {after:'北沢峠',before:'甲斐駒ヶ岳',points:[['hut','長衛小屋','山小屋'],['hut','仙水小屋','山小屋']],directional:true}
  ]),

  // 小赤沢コースは山頂ヒュッテを往復とも明示。
  '苗場山|小赤沢三合目ルート':Object.freeze([
    {after:'小赤沢三合目登山口',before:'苗場山',points:[['hut','苗場山頂ヒュッテ','山小屋']]}
  ]),

  // 下山時に阿弥陀池避難小屋を通る標準モデルを反映。
  '秋田駒ヶ岳|八合目小屋 秋田駒ヶ岳ルート':Object.freeze([
    {after:'秋田駒ヶ岳（男女岳）',before:'八合目小屋 秋田駒ヶ岳',points:[['hut','阿弥陀池避難小屋','山小屋']],directional:true}
  ]),

  // 大菩薩峠側へ周回して介山荘経由で上日川峠へ戻る形を反映。
  '大菩薩嶺|上日川峠ルート':Object.freeze([
    {after:'大菩薩嶺',before:'上日川峠',points:[['hut','介山荘','山小屋']],directional:true}
  ]),


  // 池山尾根は下山側に駒峰ヒュッテを明示。山頂→小屋は既存確認済みCT、小屋→登山口のみ公開モデルを追加。
  '空木岳|池山尾根ルート':Object.freeze([
    {after:'空木岳',before:'池山口登山口',points:[['hut','空木駒峰ヒュッテ','山小屋']],directional:true}
  ]),

  // 表銀座の往路に燕山荘・大天荘を明示。燕山荘→大天荘→山頂は既存確認済みCT。
  '大天井岳|中房登山口（燕岳・大天井岳 表銀座ルート）ルート':Object.freeze([
    {after:'中房登山口（燕岳・大天井岳 表銀座ルート）',before:'大天井岳',points:[['hut','燕山荘','山小屋'],['hut','大天荘','山小屋']],directional:true}
  ]),

  // 大股ピストンの下山側に伯母子岳避難小屋を明示。
  '伯母子岳|大股登山口 伯母子岳ルート':Object.freeze([
    {after:'伯母子岳',before:'大股登山口 伯母子岳',points:[['hut','伯母子岳避難小屋','山小屋']],directional:true}
  ])
});

function reversePoints(points){return [...points].reverse().map(p=>[p[0],p[1],p[2]]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const nxt=out[i+1];if(!nxt)continue;if(cur[1]===r.after&&nxt[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(!r.directional&&cur[1]===r.before&&nxt[1]===r.after)next.push(...reversePoints(r.points));}out=next;}return out;}

if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){
    const defs=old(mountain,course)||[];let key=String(mountain||'').trim();
    try{key=canonicalMountainName(key);}catch(_){ }
    const rules=RULES[`${key}|${course?.label||''}`];
    return rules?expand(defs,rules):defs;
  };
}

try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15103=Object.freeze({version:VERSION,phase:'3-point representative-route elimination / bulk batch 2',routeCount:Object.keys(RULES).length,extraVerifiedCtCount:Object.keys(EXTRA_CT).length,mountains:Object.freeze([...new Set(Object.keys(RULES).map(k=>k.split('|')[0]))]),policy:'existing fixed coordinates + public checkpoint CT only; no guessed coordinate/CT'});
})();
