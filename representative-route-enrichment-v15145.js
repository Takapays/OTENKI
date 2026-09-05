// Traten V1.5.145: full-runtime three-point route reduction batch.
// Only public waypoint coordinates + published checkpoint CT; no estimated CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '愛鷹山（越前岳）':[
    {id:'v15145-ashitaka-umanose',type:'waypoint',name:'馬ノ背見晴台',lat:35.24788,lon:138.78903,elevation:1099,source:'OpenStreetMap/Mapcarta 馬ノ背見晴台公開座標 https://mapcarta.com/N13228143151'}
  ],
  '瑞牆山':[
    {id:'v15145-mizugaki-fudotaki',type:'waypoint',name:'不動滝',lat:35.901248,lon:138.589514,elevation:1840,source:'北杜市公式・みずがき山自然公園ルートの不動滝／公開地図位置 https://www.city.hokuto.lg.jp/fc/location/22460.html'}
  ],
  '伊吹山':[
    {id:'v15145-ibuki-6th-hut',type:'hut',name:'伊吹山六合目避難小屋',lat:35.412015,lon:136.398246,elevation:990,source:'公開施設座標 https://kuchikomi.tim.jp/yama2/Shisetsu.html?shisetsuId=1558'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }
const T=Object.freeze({
  // 岩木山: existing verified V1.5.85 checkpoint CT
  '岩木山八合目→鳳鳴ヒュッテ':60,'鳳鳴ヒュッテ→岩木山':26,'岩木山→鳳鳴ヒュッテ':20,'鳳鳴ヒュッテ→岩木山八合目':29,
  // 愛鷹山（越前岳）: YAMAP 十里木高原モデル checkpoint aggregation
  '十里木高原登山口→馬ノ背見晴台':37,'馬ノ背見晴台→愛鷹山（越前岳）':68,'愛鷹山（越前岳）→馬ノ背見晴台':60,'馬ノ背見晴台→十里木高原登山口':14,
  // 瑞牆山: YAMAP みずがき山自然公園周回 checkpoint aggregation
  'みずがき山自然公園→不動滝':97,'不動滝→瑞牆山':108,'瑞牆山→富士見平小屋':113,'富士見平小屋→みずがき山自然公園':68,
  // 伊吹山: YAMAP 上野登山口モデル checkpoint times
  '伊吹山 上野登山口（三之宮神社）→伊吹山六合目避難小屋':180,'伊吹山六合目避難小屋→伊吹山':22,'伊吹山→伊吹山六合目避難小屋':50,'伊吹山六合目避難小屋→伊吹山 上野登山口（三之宮神社）':120
});
const SOURCE=Object.freeze({
  '岩木山':'既存V1.5.85確認済みCT',
  '愛鷹山（越前岳）':'YAMAP公開モデル https://yamap.com/model-courses/6960',
  '瑞牆山':'YAMAP公開モデル https://yamap.com/model-courses/22279',
  '伊吹山':'YAMAP公開モデル https://yamap.com/model-courses/129'
});
function which(a,b){const s=`${a}|${b}`;if(s.includes('岩木山')||s.includes('鳳鳴'))return '岩木山';if(s.includes('馬ノ背')||s.includes('十里木')||s.includes('愛鷹'))return '愛鷹山（越前岳）';if(s.includes('瑞牆')||s.includes('みずがき')||s.includes('不動滝')||s.includes('富士見平'))return '瑞牆山';if(s.includes('伊吹'))return '伊吹山';return '';}
function lookup(a,b){const aa=String(a||'').trim(),bb=String(b||'').trim(),n=T[`${aa}→${bb}`];if(!Number.isFinite(n))return null;const m=which(aa,bb);return {minutes:n,source:SOURCE[m],sourceType:m==='岩木山'?'verified':'public-model'};}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }
const R=Object.freeze({
  '岩木山':{label:'岩木山八合目ルート',points:[['trailhead','岩木山八合目','登山口'],['hut','鳳鳴ヒュッテ','山小屋'],['peak','岩木山','山頂'],['hut','鳳鳴ヒュッテ','山小屋'],['trailhead','岩木山八合目','下山口']]},
  '愛鷹山（越前岳）':{label:'十里木高原登山口ルート',points:[['trailhead','十里木高原登山口','登山口'],['waypoint','馬ノ背見晴台','展望地点'],['peak','愛鷹山（越前岳）','山頂'],['waypoint','馬ノ背見晴台','展望地点'],['trailhead','十里木高原登山口','下山口']]},
  '瑞牆山':{label:'みずがき山自然公園ルート',points:[['trailhead','みずがき山自然公園','登山口'],['waypoint','不動滝','滝'],['peak','瑞牆山','山頂'],['hut','富士見平小屋','山小屋'],['trailhead','みずがき山自然公園','下山口']]},
  '伊吹山':{label:'伊吹山 上野登山口（三之宮神社）ルート',points:[['trailhead','伊吹山 上野登山口（三之宮神社）','登山口'],['hut','伊吹山六合目避難小屋','避難小屋'],['peak','伊吹山','山頂'],['hut','伊吹山六合目避難小屋','避難小屋'],['trailhead','伊吹山 上野登山口（三之宮神社）','下山口']]}
});
if(typeof representativeCourseOptions==='function'){const o=representativeCourseOptions;representativeCourseOptions=function(mountain){let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }const r=R[k],opts=o(mountain)||[];if(!r)return opts;return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.145 verified enrichment / ${SOURCE[k]}`,verified:true};});};}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15145=Object.freeze({version:'1.5.145',mountains:Object.freeze(Object.keys(R)),reducedThreePointRoutes:4,policy:'public coordinates + published checkpoint CT; no estimated CT'});
})();
