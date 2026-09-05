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
