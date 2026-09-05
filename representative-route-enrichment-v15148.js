// Traten V1.5.148: user-priority three-point route reduction batch.
// Priority No.171 and No.168 from the V1.5.146 remaining-route list.
(function(){'use strict';
const FIXED=Object.freeze({
  '傾山':[
    {id:'v15148-katamuki-tsuzuragoe-hut',type:'hut',name:'九折越小屋',lat:32.8301748,lon:131.4564249,elevation:1260,source:'TREK station 九折越小屋 公開座標 https://trek.warp-station.com/modules/xdbase/?action=DataView&did=411'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.171 霧島山（韓国岳）・大浪池登山口。
  // YAMAP model 218 checkpoint totals:
  // 大浪池登山口 08:01 -> 韓国岳避難小屋 11:01 = 180 min.
  // 韓国岳避難小屋 -> 韓国岳 = 50 min.
  // 韓国岳 -> 韓国岳避難小屋は環境省公式値 50 min（既存値と同一）。
  // 韓国岳避難小屋 11:54 -> 大浪池登山口 13:20 = 86 min.
  '大浪池登山口→韓国岳避難小屋':180,
  '韓国岳避難小屋→霧島山（韓国岳）':50,
  '霧島山（韓国岳）→韓国岳避難小屋':50,
  '韓国岳避難小屋→大浪池登山口':86,

  // No.168 傾山。YAMAP model 10678:
  // 九折越登山口駐車場 -> 九折越 = 60 min,
  // 九折越 -> 傾山 = 25+55+11+9 = 100 min.
  // 傾山 -> 九折登山口 傾山は既存 verified 253 min を利用。
  '九折登山口 傾山→九折越小屋':60,
  '九折越小屋→傾山':100
});
const SOURCE=Object.freeze({
  '霧島山（韓国岳）':'YAMAP公開モデル https://yamap.com/model-courses/218 / 環境省・韓国岳大浪池登山コース',
  '傾山':'YAMAP公開モデル https://yamap.com/model-courses/10678 / TREK station 九折越小屋公開座標'
});
function which(a,b){const s=`${a}|${b}`;if(s.includes('韓国岳')||s.includes('大浪池'))return '霧島山（韓国岳）';if(s.includes('傾山')||s.includes('九折'))return '傾山';return '';}
function lookup(a,b){const aa=String(a||'').trim(),bb=String(b||'').trim(),n=T[`${aa}→${bb}`];if(!Number.isFinite(n))return null;const m=which(aa,bb);return {minutes:n,source:SOURCE[m],sourceType:'public-model'};}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '霧島山（韓国岳）':{label:'大浪池登山口ルート',points:[['trailhead','大浪池登山口','登山口'],['hut','韓国岳避難小屋','避難小屋'],['peak','霧島山（韓国岳）','山頂'],['hut','韓国岳避難小屋','避難小屋'],['trailhead','大浪池登山口','下山口']]},
  '傾山':{label:'九折登山口 傾山ルート',points:[['trailhead','九折登山口 傾山','登山口'],['hut','九折越小屋','避難小屋'],['peak','傾山','山頂'],['trailhead','九折登山口 傾山','下山口']]}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.148 verified enrichment / ${SOURCE[k]}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15148=Object.freeze({version:'1.5.148',priorityNos:Object.freeze([171,168]),mountains:Object.freeze(Object.keys(R)),reducedThreePointRoutes:2,policy:'user-priority order; meaningful public checkpoints + published checkpoint CT; no estimated CT'});
})();
