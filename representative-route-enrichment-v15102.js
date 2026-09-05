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
