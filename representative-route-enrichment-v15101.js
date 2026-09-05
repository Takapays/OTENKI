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
