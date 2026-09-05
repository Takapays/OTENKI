// Traten V1.5.152: batched user-priority three-point course reduction.
// Completed in this batch: No.143 比叡山, No.142 蓬来山.
// Policy: no guessed coordinates, no estimated CT; only meaningful public checkpoints with published directional CT.
(function(){'use strict';
const FIXED=Object.freeze({
  '比叡山':[
    {id:'v15152-hiei-enryakuji',type:'hut',name:'延暦寺',lat:35.0704883,lon:135.8409193,elevation:650,source:'MapFan公開座標 35.0704883,135.8409193 https://mapfan.com/spots/SCC4I%2CJ%2CPW'}
  ],
  '蓬来山':[
    {id:'v15152-horai-kojotoge',type:'pass',name:'小女郎峠',lat:35.12088,lon:135.5246,elevation:1083,source:'公開GPS記録 小女郎峠 35.12088,135.5246 https://yamanoboritusin.sakura.ne.jp/pdf/081123gongen.pdf'}
  ]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){ }

const T=Object.freeze({
  // No.143 比叡山 / 坂本ケーブル延暦寺駅ルート。
  // Yamareco p5459174: ケーブル延暦寺駅 -> 東海自然歩道分岐 17分 -> 延暦寺 7分 = 24分; 延暦寺 -> 大比叡 34分。
  // Yamareco p5371880 / p5636273: 大比叡 -> 延暦寺 21分; 延暦寺 -> 東海自然歩道分岐 4分 -> ケーブル延暦寺駅 15分 = 19分。
  '坂本ケーブル延暦寺駅→延暦寺':24,
  '延暦寺→比叡山（大比叡）':34,
  '比叡山（大比叡）→延暦寺':21,
  '延暦寺→坂本ケーブル延暦寺駅':19,

  // No.142 蓬来山 / 蓬莱駅 登山口ルート。
  // Yamareco p5371130: 蓬莱駅 -> 小女郎峠 231分, 小女郎峠 -> 蓬莱山 35分。
  // Yamareco p5551561: 蓬莱山 -> 小女郎峠 24分, 小女郎峠 -> 蓬莱駅 135分。
  '蓬莱駅 登山口→小女郎峠':231,
  '小女郎峠→蓬来山':35,
  '蓬来山→小女郎峠':24,
  '小女郎峠→蓬莱駅 登山口':135
});
const SOURCE_HIEI='ヤマレコ公開計画 p5459174 / p5371880 / p5636273; 延暦寺座標 MapFan https://mapfan.com/spots/SCC4I%2CJ%2CPW';
const SOURCE_HORAI='ヤマレコ公開計画 p5371130 / p5551561; 小女郎峠公開GPS座標 https://yamanoboritusin.sakura.ne.jp/pdf/081123gongen.pdf';
function sourceFor(key){return key.includes('比叡山')||key.includes('延暦寺')?SOURCE_HIEI:SOURCE_HORAI;}
function lookup(a,b){
  const aa=String(a||'').trim(),bb=String(b||'').trim(),key=`${aa}→${bb}`,n=T[key];
  if(!Number.isFinite(n))return null;
  return {minutes:n,source:sourceFor(key),sourceType:'public-plan'};
}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '比叡山':{label:'坂本ケーブル延暦寺駅ルート',points:[['trailhead','坂本ケーブル延暦寺駅','登山口'],['hut','延暦寺','主要通過点'],['peak','比叡山（大比叡）','山頂'],['hut','延暦寺','主要通過点'],['trailhead','坂本ケーブル延暦寺駅','下山口']],source:SOURCE_HIEI},
  '蓬来山':{label:'蓬莱駅 登山口ルート',points:[['trailhead','蓬莱駅 登山口','登山口'],['pass','小女郎峠','主要峠'],['peak','蓬来山','山頂'],['pass','小女郎峠','主要峠'],['trailhead','蓬莱駅 登山口','下山口']],source:SOURCE_HORAI}
});
if(typeof representativeCourseOptions==='function'){
  const o=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){ }
    const r=R[k],opts=o(mountain)||[];if(!r)return opts;
    return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:r.points,source:`V1.5.152 verified enrichment / ${r.source}`,verified:true};});
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15152=Object.freeze({version:'1.5.152',priorityNos:Object.freeze([143,142]),mountains:Object.freeze(Object.keys(R)),reducedThreePointRoutes:2,policy:'batched user-priority audit; no guessed coordinates; public directional CT; no estimated CT'});
})();
