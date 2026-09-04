// Traten V1.5.91: 西日本（三百名山）通過ポイント拡充・第4弾。
// 対象: 湧蓋山 / 市房山
// Policy: 公開確認済み座標 + 公開確認済みCT + 代表コースを原子更新。推定CTは追加しない。
(function(){'use strict';

function addFixed(mountain, point){
  try{
    if(typeof BUILTIN_ROUTE_CATALOG==='undefined')return;
    const arr=BUILTIN_ROUTE_CATALOG[mountain]||(BUILTIN_ROUTE_CATALOG[mountain]=[]);
    if(!arr.some(p=>p&&p.type===point.type&&String(p.name||'').trim()===point.name))arr.unshift(point);
  }catch(_){ }
}

// 湧蓋山: 既存山頂座標の誤差を補正し、一目山を固定中間地点として追加。
// 山頂: 公開標高データ 33.082379, 131.095164 / 一目山 33.061674, 131.102420。
addFixed('湧蓋山',{id:'fixed1591-waita-peak',type:'peak',name:'湧蓋山',lat:33.082379,lon:131.095164,elevation:1499.5,source:'公開標高データ・固定補正'});
addFixed('湧蓋山',{id:'fixed1591-waita-hitome',type:'peak',name:'一目山',lat:33.061674,lon:131.102420,elevation:1287.4,source:'公開標高データ・固定候補'});

// 市房山: 市房神社を固定中間地点として追加。
addFixed('市房山',{id:'fixed1591-ichifusa-jinja',type:'hut',name:'市房神社',lat:32.314940,lon:131.085710,elevation:922,source:'GeoNames/OSM公開位置・固定候補'});

const T=Object.freeze({
  // 湧蓋山: YAMAP周回モデル 08:00→13:51 = 351分。
  // 八丁原→一目山 28分 / 一目山→湧蓋山 180分 / 湧蓋山→八丁原 143分。
  '八丁原登山口→一目山':{minutes:28,source:'YAMAP・涌蓋山周回モデル 八丁原登山口駐車場08:00→一目山08:28',sourceType:'yamap'},
  '一目山→湧蓋山':{minutes:180,source:'YAMAP・涌蓋山周回モデル 一目山08:28→涌蓋山11:28（確認済みチェックポイント区間合算）',sourceType:'yamap'},
  '湧蓋山→八丁原登山口':{minutes:143,source:'YAMAP・涌蓋山周回モデル 涌蓋山11:28→八丁原登山口駐車場13:51（確認済みチェックポイント区間合算）',sourceType:'yamap'},

  // 市房山: YAMAP市房神社参道往復モデル 08:00→14:34 = 394分。
  '市房山キャンプ場（市房山登山口アクセス起点）→市房神社':{minutes:65,source:'YAMAP・市房神社参道往復モデル 標高572m地点08:00→市房神社09:05',sourceType:'yamap'},
  '市房神社→市房山':{minutes:195,source:'YAMAP・市房神社参道往復モデル 市房神社09:05→市房山12:20（6合目・8合目経由）',sourceType:'yamap'},
  '市房山→市房神社':{minutes:97,source:'YAMAP・市房神社参道往復モデル 市房山12:20→市房神社13:57',sourceType:'yamap'},
  '市房神社→市房山キャンプ場（市房山登山口アクセス起点）':{minutes:37,source:'YAMAP・市房神社参道往復モデル 市房神社13:57→標高572m地点14:34',sourceType:'yamap'}
});

try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return T[`${String(a||'').trim()}→${String(b||'').trim()}`]||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return T[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '湧蓋山':{label:'八丁原・一目山・湧蓋山周回ルート',points:[
    ['trailhead','八丁原登山口','登山口'],['peak','一目山','通過峰'],['peak','湧蓋山','山頂'],['trailhead','八丁原登山口','下山口']
  ],source:'V1.5.91 west enrichment',verified:true},
  '市房山':{label:'市房キャンプ場・市房神社ルート',points:[
    ['trailhead','市房山キャンプ場（市房山登山口アクセス起点）','登山口'],['hut','市房神社','神社・避難地点'],['peak','市房山','山頂'],['hut','市房神社','神社・避難地点'],['trailhead','市房山キャンプ場（市房山登山口アクセス起点）','下山口']
  ],source:'V1.5.91 west enrichment',verified:true}
});

if(typeof representativeCourseOptions==='function'){const o=representativeCourseOptions;representativeCourseOptions=function(mountain){let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){}const opts=o(mountain)||[];const r=R[k];if(!r)return opts;return [r,...opts.filter(c=>c?.label!==r.label)];};}

try{if(typeof buildRepresentativeResolvedRoute==='function'){const o=buildRepresentativeResolvedRoute;buildRepresentativeResolvedRoute=function(mountain,course){if(course?.source!=='V1.5.91 west enrichment')return o(mountain,course);const defs=representativeCourseExpandedPointDefs(mountain,course);const resolved=defs.map(([type,name,role])=>({type,name,role,p:representativeCandidate(type,name,mountain)||null}));const segments=[];for(let i=1;i<resolved.length;i++){const a=resolved[i-1],b=resolved[i];if(!a.p||!b.p)return {error:`${a.name} → ${b.name} の地点座標を解決できません。`};const info=T[`${a.name}→${b.name}`]||courseTimeInfo(a.p,b.p);if(!info)return {error:`${a.name} → ${b.name} の確認済みCTがありません。`};segments.push(info);}return {resolved,segments,distributedPointCount:0};};}}catch(_){ }

try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_WEST_ENRICHMENT_V1591=Object.freeze({
  scope:'西日本三百名山 第4弾 / 湧蓋山・市房山',
  mountains:Object.freeze(Object.keys(R)),
  fixedAdded:Object.freeze({湧蓋山:['湧蓋山（座標補正）','一目山'],市房山:['市房神社']}),
  routeCtMinutes:Object.freeze({湧蓋山:351,市房山:394}),
  policy:'verified public coordinates + verified public CT + representative route; no geometric/elevation CT estimation'
});
})();
