// Traten V1.5.147: full-runtime three-point route reduction batch 3.
// Adds only meaningful route checkpoints backed by public coordinates / published checkpoint CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '瓶ヶ森':[
    {id:'v15147-kamegamori-otokoyama',type:'peak',name:'男山',lat:33.790277,lon:133.191666,elevation:1838,source:'国土地理院地図公開位置（男山・瓶ヶ森） https://maps.gsi.go.jp/#15/33.790277/133.191666/'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // 瓶ヶ森: YAMAP model 21229. Parking -> trailhead 5 + trailhead -> Otokoyama 30 = 35;
  // Otokoyama -> summit = 10 + 3 = 13. Return summit -> parking already has verified 35 min in app.js.
  '瓶ヶ森駐車場→男山':35,
  '男山→瓶ヶ森':13,
  // 霧ヶ峰: YAMAP models 19649 / 74512. Summit -> Kurumayama-nokkoshi = 15+4+5 = 24;
  // nokkoshi -> Chochomiyama = 15+10 = 25; Chochomiyama -> Yashima = 73.
  // The existing Yashima -> summit 127 min remains the verified first leg.
  '霧ヶ峰（車山）→車山乗越':24,
  '車山乗越→蝶々深山':25,
  '蝶々深山→八島ヶ原湿原':73
});
const SOURCE=Object.freeze({
  '瓶ヶ森':'YAMAP公開モデル https://yamap.com/model-courses/21229 / 国土地理院公開位置',
  '霧ヶ峰（車山）':'YAMAP公開モデル https://yamap.com/model-courses/19649 および https://yamap.com/model-courses/74512'
});
function which(a,b){const s=`${a}|${b}`;if(s.includes('瓶ヶ森')||s.includes('男山'))return '瓶ヶ森';if(s.includes('霧ヶ峰')||s.includes('車山乗越')||s.includes('蝶々深山')||s.includes('八島ヶ原湿原'))return '霧ヶ峰（車山）';return '';}
function lookup(a,b){const aa=String(a||'').trim(),bb=String(b||'').trim(),n=T[`${aa}→${bb}`];if(!Number.isFinite(n))return null;const m=which(aa,bb);return {minutes:n,source:SOURCE[m],sourceType:'public-model'};}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '瓶ヶ森':{label:'瓶ヶ森駐車場ルート',points:[['trailhead','瓶ヶ森駐車場','登山口'],['peak','男山','主要ピーク'],['peak','瓶ヶ森','山頂'],['trailhead','瓶ヶ森駐車場','下山口']]},
  '霧ヶ峰（車山）':{label:'八島ヶ原湿原ルート',points:[['trailhead','八島ヶ原湿原','登山口'],['peak','霧ヶ峰（車山）','山頂'],['pass','車山乗越','分岐'],['peak','蝶々深山','主要ピーク'],['trailhead','八島ヶ原湿原','下山口']]}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.147 verified enrichment / ${SOURCE[k]}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15147=Object.freeze({version:'1.5.147',mountains:Object.freeze(Object.keys(R)),reducedThreePointRoutes:2,policy:'meaningful public checkpoints + published checkpoint CT; no estimated CT'});
})();
