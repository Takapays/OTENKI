// Traten V1.5.105 consolidated representative-route enrichment.
// Self-contained bundle: V1.5.100-V1.5.104. Prevents missing old diff scripts from silently reverting routes to trailhead-summit-trailhead.
// Traten V1.5.100: 全国代表コース細分化フェーズ1。
// 初回対象: 仙丈ヶ岳。既存の「北沢峠→山頂→北沢峠」だけの粗い代表コースを、
// 小仙丈ヶ岳・仙丈小屋・馬ノ背ヒュッテを含む実用的な周回へ置換する。
// 未確認座標・推定CTは追加しない。
(function(){'use strict';

const VERSION='1.5.100';
const SOURCE='V1.5.100 representative route enrichment';

// 小仙丈ヶ岳: OpenStreetMap (node 832298351) / Mapcarta掲載値。
try{
  const catalog=BUILTIN_ROUTE_CATALOG['仙丈ヶ岳']||(BUILTIN_ROUTE_CATALOG['仙丈ヶ岳']=[]);
  const key='peak|小仙丈ヶ岳';
  if(!catalog.some(p=>`${p.type}|${p.name}`===key)){
    catalog.push({
      id:'v15100-senjo-kosenjo',type:'peak',name:'小仙丈ヶ岳',
      lat:35.72590,lon:138.19600,elevation:2855,
      source:'OpenStreetMap node 832298351 / Mapcarta（2026-09-05確認）'
    });
  }
}catch(_){ }

// YAMAP「北沢峠-仙丈ヶ岳 周回コース」の公開モデルコース・チェックポイントを区間合算。
// 北沢峠→小仙丈ヶ岳 = 40 + 65 + 58 = 163分
// 小仙丈ヶ岳→仙丈ヶ岳 = 48 + 20 + 10 = 78分
// 馬ノ背ヒュッテ→北沢峠 = 10 + 25 + 45 + 30 = 110分
// 山頂→仙丈小屋、仙丈小屋→馬ノ背ヒュッテは既存の南アルプス市芦安山岳館CTを優先する。
const T=Object.freeze({
  '北沢峠→小仙丈ヶ岳':{minutes:163,source:'YAMAP・北沢峠-仙丈ヶ岳 周回モデル（北沢峠→分岐→藪沢大滝の頭→小仙丈ヶ岳、2026-09-05確認）',sourceType:'yamap'},
  '小仙丈ヶ岳→仙丈ヶ岳':{minutes:78,source:'YAMAP・北沢峠-仙丈ヶ岳 周回モデル（小仙丈ヶ岳→分岐→仙丈ヶ岳、2026-09-05確認）',sourceType:'yamap'},
  '馬の背ヒュッテ→北沢峠':{minutes:110,source:'YAMAP・北沢峠-仙丈ヶ岳 周回モデル（馬ノ背ヒュッテ→薮沢小屋→藪沢大滝の頭→北沢峠、2026-09-05確認）',sourceType:'yamap'}
});

try{
  if(typeof directCourseTimeInfoByNames==='function'){
    const old=directCourseTimeInfoByNames;
    directCourseTimeInfoByNames=function(a,b){
      return T[`${String(a||'').trim()}→${String(b||'').trim()}`]||old(a,b);
    };
  }
}catch(_){ }
try{
  if(typeof courseTimeInfo==='function'){
    const old=courseTimeInfo;
    courseTimeInfo=function(a,b){
      return T[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||old(a,b);
    };
  }
}catch(_){ }

const ROUTE=Object.freeze({
  label:'北沢峠・小仙丈尾根〜馬ノ背周回',
  points:Object.freeze([
    ['trailhead','北沢峠','登山口'],
    ['peak','小仙丈ヶ岳','通過ピーク'],
    ['peak','仙丈ヶ岳','山頂'],
    ['hut','仙丈小屋','山小屋'],
    ['hut','馬の背ヒュッテ','山小屋'],
    ['trailhead','北沢峠','下山口']
  ]),
  source:SOURCE,
  verified:true
});

if(typeof representativeCourseOptions==='function'){
  const old=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let key=String(mountain||'').trim();
    try{key=canonicalMountainName(key);}catch(_){ }
    const opts=old(mountain)||[];
    if(key!=='仙丈ヶ岳')return opts;
    // 同じ北沢峠起点の粗い旧コースは先頭から外し、新しい周回を第一候補にする。
    return [ROUTE,...opts.filter(c=>c?.label!==ROUTE.label && !(c?.points?.length<=3 && c?.points?.[0]?.[1]==='北沢峠'))];
  };
}

// 外部差分コースでも既存の代表コース解決器と同じ座標・CT検証を行う。
try{
  if(typeof buildRepresentativeResolvedRoute==='function'){
    const old=buildRepresentativeResolvedRoute;
    buildRepresentativeResolvedRoute=function(mountain,course){
      if(course?.source!==SOURCE)return old(mountain,course);
      const defs=course.points.map(p=>[...p]);
      const resolved=defs.map(([type,name,role])=>({type,name,role,p:representativeCandidate(type,name,mountain)||null}));
      const segments=[];
      for(let i=1;i<resolved.length;i++){
        const a=resolved[i-1],b=resolved[i];
        if(!a.p||!b.p)return {error:`${a.name} → ${b.name} の地点座標を解決できません。`};
        const info=T[`${a.name}→${b.name}`]||courseTimeInfo(a.p,b.p);
        if(!info||info.estimated)return {error:`${a.name} → ${b.name} の確認済みCTがありません。`};
        segments.push(info);
      }
      return {resolved,segments,distributedPointCount:0};
    };
  }
}catch(_){ }

try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15100=Object.freeze({
  version:VERSION,
  phase:'nationwide representative-course refinement / phase 1',
  mountains:Object.freeze(['仙丈ヶ岳']),
  route:Object.freeze(['北沢峠','小仙丈ヶ岳','仙丈ヶ岳','仙丈小屋','馬の背ヒュッテ','北沢峠']),
  policy:'verified fixed coordinates + public CT only; no coordinate/CT inference'
});
})();
// Traten V1.5.101: 全国代表コース細分化フェーズ2。
// 既存の固定座標 + 既存の確認済み直結CTだけを利用し、粗い代表コースへ主要通過点を追加する。
// 新規座標・新規CT・推定CTは追加しない。
(function(){'use strict';
const VERSION='1.5.101';

const RULES=Object.freeze({
  '槍ヶ岳|上高地・槍沢ルート': Object.freeze([
    {after:'上高地',before:'槍沢ロッヂ',points:[['hut','横尾山荘','山小屋']]},
    {after:'槍沢ロッヂ',before:'槍ヶ岳山荘',points:[
      ['camp','ババ平（槍沢キャンプ場）','テント場'],
      ['pass','大曲（水俣乗越分岐）','峠・分岐'],
      ['pass','天狗原分岐','峠・分岐']
    ]}
  ]),
  '常念岳|一ノ沢ルート': Object.freeze([
    {after:'一ノ沢登山口',before:'常念小屋',points:[['pass','常念乗越','峠・分岐']]}
  ]),
  '大雪山（旭岳）|旭岳ロープウェイ姿見駅ルート': Object.freeze([
    {after:'旭岳ロープウェイ姿見駅',before:'大雪山（旭岳）',points:[['hut','旭岳石室','山小屋']]}
  ]),
  '鳥海山|鉾立登山口（象潟口）ルート': Object.freeze([
    {after:'鉾立登山口（象潟口）',before:'鳥海山（新山）',points:[['hut','御浜小屋','山小屋']]}
  ]),
  '谷川岳|天神平ルート': Object.freeze([
    {after:'天神平',before:'谷川岳（オキノ耳）',points:[['hut','熊穴沢避難小屋','山小屋']]}
  ]),
  '赤岳|美濃戸口ルート': Object.freeze([
    {after:'美濃戸口',before:'赤岳',points:[
      ['trailhead','美濃戸','登山口'],['hut','赤岳鉱泉','山小屋'],['hut','行者小屋','山小屋']
    ]}
  ]),
  '高妻山|戸隠キャンプ場・高妻山登山者駐車場ルート': Object.freeze([
    {after:'戸隠キャンプ場・高妻山登山者駐車場',before:'高妻山',points:[['hut','一不動避難小屋','山小屋']]}
  ]),
  '妙高山|笹ヶ峰ルート': Object.freeze([
    {after:'笹ヶ峰登山口',before:'妙高山',points:[['hut','黒沢池ヒュッテ','山小屋']]}
  ]),
  '烏帽子岳|高瀬ダムルート': Object.freeze([
    {after:'高瀬ダム',before:'烏帽子岳',points:[['hut','烏帽子小屋','山小屋']]}
  ]),
  '木曽駒ヶ岳|千畳敷ルート': Object.freeze([
    {after:'千畳敷',before:'木曽駒ヶ岳',points:[['pass','乗越浄土','峠・分岐']]}
  ]),
  '甲武信ヶ岳|毛木平ルート': Object.freeze([
    {after:'毛木平登山口',before:'甲武信ヶ岳',points:[['hut','甲武信小屋','山小屋']]}
  ]),
  '瑞牆山|瑞牆山荘・富士見平口ルート': Object.freeze([
    {after:'瑞牆山荘・富士見平口',before:'瑞牆山',points:[['hut','富士見平小屋','山小屋']]}
  ]),
  '白木峰|白木峰8合目駐車場ルート': Object.freeze([
    {after:'白木峰8合目駐車場',before:'白木峰',points:[['hut','白木山荘（避難小屋）','山小屋']]}
  ]),
  '白山|別当出合ルート': Object.freeze([
    {after:'別当出合',before:'白山（御前峰）',points:[['hut','白山室堂','山小屋']]}
  ]),
  '剣山|見ノ越 剣山登山口ルート': Object.freeze([
    // 既存V1.5系で往路に野営場までは入っているため、西島駅を追加し、復路も同じ実ルートへ細分化。
    {after:'剣山野営場（西島野営場）',before:'剣山',points:[['trailhead','剣山観光登山リフト西島駅','登山口']],directional:true},
    {after:'剣山',before:'見ノ越 剣山登山口',points:[
      ['trailhead','剣山観光登山リフト西島駅','下山口'],['camp','剣山野営場（西島野営場）','テント場']
    ],directional:true}
  ]),
  '蝶ヶ岳|三股ルート': Object.freeze([
    {after:'三股登山口',before:'蝶ヶ岳',points:[['hut','蝶ヶ岳ヒュッテ','山小屋']]}
  ]),
  '唐松岳|八方尾根ルート': Object.freeze([
    {after:'八方池山荘',before:'唐松岳頂上山荘',points:[['pass','八方池','峠・分岐']]}
  ])
});

function reversePoints(points){return [...points].reverse().map(p=>[p[0],p[1],p[2]]);}
function expand(defs,rules){
  let out=defs.map(p=>[...p]);
  for(const r of rules){
    const next=[];
    for(let i=0;i<out.length;i++){
      const cur=out[i];
      next.push(cur);
      const nxt=out[i+1];
      if(!nxt)continue;
      if(cur[1]===r.after&&nxt[1]===r.before) next.push(...r.points.map(p=>[...p]));
      else if(!r.directional&&cur[1]===r.before&&nxt[1]===r.after) next.push(...reversePoints(r.points));
    }
    out=next;
  }
  return out;
}

if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){
    const defs=old(mountain,course)||[];
    let key=String(mountain||'').trim();
    try{key=canonicalMountainName(key);}catch(_){ }
    const rules=RULES[`${key}|${course?.label||''}`];
    return rules?expand(defs,rules):defs;
  };
}

try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15101=Object.freeze({
  version:VERSION,
  phase:'nationwide representative-course refinement / phase 2',
  mountains:Object.freeze([...new Set(Object.keys(RULES).map(k=>k.split('|')[0]))]),
  routeCount:Object.keys(RULES).length,
  policy:'existing fixed coordinates + existing verified direct CT only; no new coordinate/CT inference'
});
})();
// Traten V1.5.102: 「登山口→山頂→登山口」優先解消フェーズ。
// 既存の固定座標と既存の確認済み直結CTだけで、3点だけの代表コースを細分化する。
// 新規座標・新規CT・推定CTは追加しない。
(function(){'use strict';
const VERSION='1.5.102';
const RULES=Object.freeze({
  '至仏山|鳩待峠ルート':Object.freeze([
    {after:'鳩待峠',before:'至仏山',points:[['trailhead','山ノ鼻（至仏山東面登山道入口・登り専用）','経由']],directional:true}
  ]),
  '至仏山|山ノ鼻・東面登山道ルート':Object.freeze([
    {after:'至仏山',before:'山ノ鼻（至仏山東面登山道入口・登り専用）',points:[['trailhead','鳩待峠','経由']],directional:true}
  ]),
  '蓮華岳|扇沢登山口ルート':Object.freeze([
    {after:'扇沢登山口',before:'蓮華岳',points:[['hut','針ノ木小屋','山小屋']],directional:true}
  ]),
  '藤原岳|大貝戸登山口 藤原岳ルート':Object.freeze([
    {after:'大貝戸登山口 藤原岳',before:'藤原岳',points:[['hut','藤原山荘','山小屋']]}
  ]),
  '剣山|剣山観光登山リフト西島駅ルート':Object.freeze([
    {after:'剣山観光登山リフト西島駅',before:'剣山',points:[['hut','剣山頂上ヒュッテ','山小屋']],directional:true}
  ])
});
function reversePoints(points){return [...points].reverse().map(p=>[p[0],p[1],p[2]]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const nxt=out[i+1];if(!nxt)continue;if(cur[1]===r.after&&nxt[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(!r.directional&&cur[1]===r.before&&nxt[1]===r.after)next.push(...reversePoints(r.points));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){
    const defs=old(mountain,course)||[];let key=String(mountain||'').trim();try{key=canonicalMountainName(key);}catch(_){}
    const rules=RULES[`${key}|${course?.label||''}`];return rules?expand(defs,rules):defs;
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){}
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15102=Object.freeze({version:VERSION,phase:'3-point representative-route elimination / batch 1',routeCount:Object.keys(RULES).length,mountains:Object.freeze([...new Set(Object.keys(RULES).map(k=>k.split('|')[0]))]),policy:'existing fixed coordinates + existing verified direct CT only; no new coordinate/CT inference'});
})();
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

// Traten V1.5.106: 3-point representative-course reduction batch.
// Priority: eliminate trailhead -> summit -> trailhead routes using verified public CT / fixed coordinates only.
(function(){'use strict';
const VERSION='1.5.106';
const SOURCE='V1.5.106 3-point route reduction';

function addPoint(mountain,p){
  try{
    const c=BUILTIN_ROUTE_CATALOG[mountain]||(BUILTIN_ROUTE_CATALOG[mountain]=[]);
    if(!c.some(x=>x.type===p.type&&x.name===p.name))c.push(p);
  }catch(_){ }
}

// 三俣蓮華岳: all coordinates/CT already existed elsewhere in the fixed Alps network.
for(const p of [
  {id:'v15106-mitsu-tarobe',type:'hut',name:'太郎平小屋',lat:36.4548,lon:137.5195,elevation:2330,source:'existing fixed Alps network'},
  {id:'v15106-mitsu-kurobe',type:'peak',name:'黒部五郎岳',lat:36.3925,lon:137.5408,elevation:2840,source:'existing fixed Alps network'},
  {id:'v15106-mitsu-kurogoya',type:'hut',name:'黒部五郎小舎',lat:36.3834,lon:137.5565,elevation:2350,source:'existing fixed Alps network'},
  {id:'v15106-mitsu-sanso',type:'hut',name:'三俣山荘',lat:36.402,lon:137.5925,elevation:2550,source:'existing fixed Alps network'},
  {id:'v15106-mitsu-kumono',type:'hut',name:'雲ノ平山荘',lat:36.42061,lon:137.57654,elevation:2551,source:'existing fixed Alps network'},
  {id:'v15106-mitsu-yakushi',type:'hut',name:'薬師沢小屋',lat:36.42859,lon:137.54628,elevation:1920,source:'existing fixed Alps network'}
]) addPoint('三俣蓮華岳',p);

// 会津駒ヶ岳: 駒の小屋 coordinates from OpenStreetMap/Mapcarta; YAMAP public model CT.
addPoint('会津駒ヶ岳',{id:'v15106-aizu-komanokoya',type:'hut',name:'駒の小屋',lat:37.04315,lon:139.35244,elevation:2055,source:'OpenStreetMap / Mapcarta'});

// 燧ヶ岳: 俎嵓 coordinate from GSI survey result / OpenStreetMap; public model CT.
addPoint('燧ヶ岳',{id:'v15106-hiuchi-manaita',type:'peak',name:'俎嵓',lat:36.955142,lon:139.288684,elevation:2346,source:'国土地理院二等三角点「燧岳」 / OpenStreetMap'});

const T=Object.freeze({
  '滝沢登山口→駒の小屋':{minutes:182,source:'YAMAP 滝沢登山口-駒ノ大池-会津駒ヶ岳モデル（95+85+1+1分）',sourceType:'yamap'},
  '駒の小屋→会津駒ヶ岳':{minutes:30,source:'YAMAP 滝沢登山口-駒ノ大池-会津駒ヶ岳-中門岳モデル（駒の小屋→駒ノ大池→会津駒ヶ岳 15+15分）',sourceType:'yamap'},
  '御池登山口→俎嵓':{minutes:200,source:'YAMAP 御池→広沢田代→熊沢田代→俎嵓モデル（55+50+75+20分）',sourceType:'yamap'},
  '俎嵓→燧ヶ岳（柴安嵓）':{minutes:15,source:'YAMAP 広沢田代-熊沢田代-燧ヶ岳モデル 俎嵓→柴安嵓 15分',sourceType:'yamap'}
});
try{
  if(typeof directCourseTimeInfoByNames==='function'){
    const old=directCourseTimeInfoByNames;
    directCourseTimeInfoByNames=function(a,b){return T[`${String(a||'').trim()}→${String(b||'').trim()}`]||old(a,b);};
  }
}catch(_){ }
try{
  if(typeof courseTimeInfo==='function'){
    const old=courseTimeInfo;
    courseTimeInfo=function(a,b){return T[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||old(a,b);};
  }
}catch(_){ }

const RULES=Object.freeze({
  '三俣蓮華岳|折立登山口ルート':Object.freeze([
    {after:'折立登山口',before:'三俣蓮華岳',points:[['hut','太郎平小屋','山小屋'],['peak','黒部五郎岳','通過ピーク'],['hut','黒部五郎小舎','山小屋']],directional:true},
    {after:'三俣蓮華岳',before:'折立登山口',points:[['hut','三俣山荘','山小屋'],['hut','雲ノ平山荘','山小屋'],['hut','薬師沢小屋','山小屋']],directional:true}
  ]),
  '会津駒ヶ岳|滝沢ルート':Object.freeze([
    {after:'滝沢登山口',before:'会津駒ヶ岳',points:[['hut','駒の小屋','山小屋']],directional:true}
  ]),
  '燧ヶ岳|御池登山口ルート':Object.freeze([
    {after:'御池登山口',before:'燧ヶ岳（柴安嵓）',points:[['peak','俎嵓','通過ピーク']],directional:true}
  ])
});
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const nxt=out[i+1];if(nxt&&cur[1]===r.after&&nxt[1]===r.before)next.push(...r.points.map(p=>[...p]));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){const defs=old(mountain,course)||[];let key=String(mountain||'').trim();try{key=canonicalMountainName(key);}catch(_){ }const r=RULES[`${key}|${course?.label||''}`];return r?expand(defs,r):defs;};
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15106=Object.freeze({version:VERSION,mountains:Object.freeze(['三俣蓮華岳','会津駒ヶ岳','燧ヶ岳']),policy:'verified public CT + fixed/public coordinates only; no inference'});
})();

// Traten V1.5.107: 3-point representative-course reduction / verified one-hop batch.
// Only existing fixed candidates and existing non-estimated CT in both directions are used.
(function(){'use strict';
const VERSION='1.5.107';
const RULES=Object.freeze({
  '十勝岳|吹上温泉登山口ルート':Object.freeze([
    {after:'吹上温泉登山口',before:'十勝岳',points:[['hut','十勝岳避難小屋','避難小屋']]}
  ]),
  '岩手山|御神坂登山口ルート':Object.freeze([
    {after:'御神坂登山口',before:'岩手山',points:[['hut','八合目避難小屋','避難小屋']]}
  ]),
  '朝日岳（新潟・富山）|蓮華温泉ルート':Object.freeze([
    {after:'蓮華温泉',before:'朝日岳（新潟・富山）',points:[['hut','朝日小屋','山小屋']]}
  ]),
  '雪倉岳|蓮華温泉ルート':Object.freeze([
    {after:'蓮華温泉',before:'雪倉岳',points:[['hut','白馬大池山荘','山小屋']]}
  ]),
  '奥大日岳|室堂ルート':Object.freeze([
    {after:'室堂',before:'奥大日岳',points:[['hut','雷鳥荘','山小屋']]}
  ]),
  '御嶽山|中の湯登山口（黒沢口）ルート':Object.freeze([
    {after:'中の湯登山口（黒沢口）',before:'御嶽山（剣ヶ峰）',points:[['hut','女人堂','山小屋']]}
  ]),
  '藤原岳|孫太尾根登山口ルート':Object.freeze([
    {after:'孫太尾根登山口',before:'藤原岳',points:[['hut','藤原山荘','山小屋']]}
  ]),
  '大山|博労座ルート':Object.freeze([
    {after:'博労座',before:'大山（弥山）',points:[['hut','六合目避難小屋','避難小屋']]}
  ]),
  '三嶺|光石ルート':Object.freeze([
    {after:'光石登山口',before:'三嶺',points:[['hut','三嶺ヒュッテ','山小屋']]}
  ]),
  '祖母山|北谷登山口駐車場・北谷登山口ルート':Object.freeze([
    {after:'北谷登山口駐車場・北谷登山口',before:'祖母山',points:[['hut','祖母山九合目小屋','山小屋']]}
  ]),
  '祖母山|神原登山口ルート':Object.freeze([
    {after:'神原登山口',before:'祖母山',points:[['hut','祖母山九合目小屋','山小屋']]}
  ])
});
function rev(points){return [...points].reverse().map(p=>[...p]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const n=out[i+1];if(!n)continue;if(cur[1]===r.after&&n[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(cur[1]===r.before&&n[1]===r.after)next.push(...rev(r.points));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){
    const defs=old(mountain,course)||[];let m=String(mountain||'').trim();try{m=canonicalMountainName(m);}catch(_){ }
    const rules=RULES[`${m}|${course?.label||''}`];return rules?expand(defs,rules):defs;
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15107=Object.freeze({version:VERSION,phase:'3-point route elimination / verified one-hop batch',routeCount:Object.keys(RULES).length,mountains:Object.freeze([...new Set(Object.keys(RULES).map(k=>k.split('|')[0]))]),policy:'existing fixed candidates + existing verified bidirectional CT only; no new coordinates/CT'});
})();
