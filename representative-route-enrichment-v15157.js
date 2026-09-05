// Traten V1.5.157: rebuild No.155 三瓶山 西の原 as the standard Sanbe family loop.
// Route: 西の原 -> 男三瓶 -> 女三瓶 -> 孫三瓶 -> 子三瓶 -> 西の原.
// Public route/CT: Yamareco p5466575 + YAMAP model 20551. No estimated CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '三瓶山':[
    {id:'v15157-sanbe-mesanbe',type:'peak',name:'女三瓶山',lat:35.1348,lon:132.6323,elevation:953,source:'OpenStreetMap公開地点（Mapcarta表示）35.1348,132.6323 https://mapcarta.com/N5405328690'},
    {id:'v15157-sanbe-magosanbe',type:'peak',name:'孫三瓶山',lat:35.1264,lon:132.6224,elevation:903,source:'OpenStreetMap公開地点（Mapcarta表示）35.1264,132.6224 https://mapcarta.com/N5405323246'},
    {id:'v15157-sanbe-kosanbe',type:'peak',name:'子三瓶山',lat:35.129818,lon:132.616744,elevation:961,source:'PeakVisor公開座標 35.129818,132.616744 https://peakvisor.com/peak/mt-ko-sanbe.html'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // Yamareco p5466575 (standard planned CT):
  // 西の原08:00 -> 男三瓶10:34 = 154
  // 男三瓶10:34 -> 女三瓶11:22 = 48
  // 女三瓶11:22 -> 孫三瓶12:27 = 65 (published plan section via 室ノ内展望所・大平山・奥の湯峠)
  // 孫三瓶12:27 -> 子三瓶13:13 = 46 (published plan section via 風越)
  // 子三瓶13:13 -> 西の原14:28 = 75 (published plan section via 扇沢・4番分岐)
  '西の原登山口→三瓶山（男三瓶山）':154,
  '三瓶山（男三瓶山）→女三瓶山':48,
  '女三瓶山→孫三瓶山':65,
  '孫三瓶山→子三瓶山':46,
  '子三瓶山→西の原登山口':75
});
const SOURCE='ヤマレコ公開山行計画 p5466575（西の原→男三瓶→女三瓶→大平山→孫三瓶→子三瓶→西の原 標準計画CT） https://www.yamareco.com/modules/yr_plan/detail-5466575.html / YAMAP現行モデル20551 https://yamap.com/model-courses/20551';
function lookup(a,b){const key=`${String(a||'').trim()}→${String(b||'').trim()}`,n=T[key];return Number.isFinite(n)?{minutes:n,source:SOURCE,sourceType:'public-route'}:null;}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '三瓶山':{label:'西の原登山口ルート',points:[
    ['trailhead','西の原登山口','登山口'],
    ['peak','三瓶山（男三瓶山）','主峰'],
    ['peak','女三瓶山','主要通過点'],
    ['peak','孫三瓶山','主要通過点'],
    ['peak','子三瓶山','主要通過点'],
    ['trailhead','西の原登山口','下山口']
  ],source:SOURCE}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label)return c;return {...c,points:r.points,source:`V1.5.157 Sanbe family loop / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15157=Object.freeze({version:'1.5.157',routeNos:Object.freeze([155]),mountains:Object.freeze(['三瓶山']),reducedThreePointRoutes:1,policy:'No.155 rebuilt from out-and-back into public Sanbe family loop; no guessed coordinates; no estimated CT'});
})();
