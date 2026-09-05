// Traten V1.5.128: remove redundant 3-point representative routes when a verified
// refined route for the same access already exists. Existing V1.5.126 removals are preserved.
// V1.5.128 additionally removes two alias-named starts whose fixed coordinates are exactly identical
// to their refined alternatives (Aso Sensuikyo / Kirishima Ebino-Kogen).
(function(){'use strict';
const VERSION='1.5.128';
const REDUNDANT=Object.freeze({
  '雄阿寒岳':Object.freeze(['滝口・雄阿寒岳ルート']),
  '八幡平':Object.freeze(['八幡平見返峠・山頂レストハウスルート']),
  '早池峰山':Object.freeze(['小田越ルート']),
  '奥白根山':Object.freeze(['菅沼登山口ルート']),
  '赤城山（黒檜山）':Object.freeze(['黒檜山ルート']),
  '霧ヶ峰（車山）':Object.freeze(['車山肩ルート']),
  '美ヶ原':Object.freeze(['山本小屋・王ヶ頭ルート']),
  '焼岳':Object.freeze(['新中の湯登山口ルート']),
  '金峰山':Object.freeze(['大弛峠ルート']),
  '日出ヶ岳':Object.freeze(['大台ヶ原ビジターセンタールート']),
  '湧蓋山':Object.freeze(['八丁原登山口ルート']),
  '開聞岳':Object.freeze(['かいもん山麓ふれあい公園駐車場・開聞岳登山口アクセスルート']),
  '阿蘇山（高岳）':Object.freeze(['仙酔峡駐車場・仙酔峡登山口ルート']),
  '霧島山（韓国岳）':Object.freeze(['えびの高原・韓国岳登山口ルート'])
});
function keyFor(m){let k=String(m||'').trim();try{k=canonicalMountainName(k);}catch(_){}return k;}
if(typeof representativeCourseOptions==='function'){
  const old=representativeCourseOptions;
  representativeCourseOptions=function(mountain){const opts=old(mountain)||[];const k=keyFor(mountain),labels=REDUNDANT[k];if(!labels)return opts;const remove=new Set(labels);return opts.filter(c=>!remove.has(String(c?.label||'')));};
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){}
window.TRATEN_REPRESENTATIVE_ROUTE_CLEANUP_V15128=Object.freeze({version:VERSION,removedRouteCount:Object.values(REDUNDANT).reduce((n,a)=>n+a.length,0),mountains:Object.freeze(Object.keys(REDUNDANT)),policy:'remove redundant 3-point options only when a verified refined same-access alternative exists; no coordinate/CT changes'});
})();
