// Traten V1.5.132: reduce verified three-point representative routes (batch 1).
// Public model-course checkpoint CT only; waypoint coordinates are weather-grid representatives, not navigation data.
(function(){'use strict';
const FIXED=Object.freeze({
  '樽前山':[{id:'v15132-tarumae-view',type:'waypoint',name:'樽前山7合目展望台',lat:42.6957,lon:141.3925,elevation:800,source:'苫小牧市・YAMAP公開ルート図準拠（天気格子用代表位置）'}],
  'ニセコアンヌプリ':[{id:'v15132-niseko-mikaeri',type:'pass',name:'見返坂分岐',lat:42.8735,lon:140.6605,elevation:950,source:'YAMAP公開ルート図準拠（天気格子用代表位置）'}],
  '栗駒山':[{id:'v15132-kurikoma-koke',type:'pass',name:'苔花台',lat:38.9750,lon:140.7760,elevation:1180,source:'YAMAP公開ルート図準拠（天気格子用代表位置）'}],
  '入笠山':[{id:'v15132-nyukasa-yamabiko',type:'hut',name:'山彦荘',lat:35.9018,lon:138.1746,elevation:1740,source:'YAMAP公開ルート図準拠（天気格子用代表位置）'}],
  '国師ヶ岳':[{id:'v15132-kokushi-mae',type:'peak',name:'前国師岳',lat:35.8698,lon:138.6720,elevation:2570,source:'YAMAP公開ルート図準拠（天気格子用代表位置）'}]
});
try{for(const [m,ps] of Object.entries(FIXED))if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}catch(_){}
const T=Object.freeze({
  '7合目登山口→樽前山7合目展望台':20,'樽前山7合目展望台→樽前山':35,'樽前山→樽前山7合目展望台':25,'樽前山7合目展望台→7合目登山口':15,
  '五色温泉インフォメーションセンター→見返坂分岐':60,'見返坂分岐→ニセコアンヌプリ':46,'ニセコアンヌプリ→見返坂分岐':45,'見返坂分岐→五色温泉インフォメーションセンター':31,
  '須川高原温泉→苔花台':91,'苔花台→栗駒山':105,'栗駒山→苔花台':60,'苔花台→須川高原温泉':19,
  '沢入登山口→山彦荘':74,'山彦荘→入笠山':56,'入笠山→山彦荘':35,'山彦荘→沢入登山口':50,
  '大弛峠→前国師岳':44,'前国師岳→国師ヶ岳':14,'国師ヶ岳→前国師岳':19,'前国師岳→大弛峠':20
});
const URLS=Object.freeze({'樽前山':'https://yamap.com/model-courses/95362','ニセコアンヌプリ':'https://yamap.com/model-courses/5362','栗駒山':'https://yamap.com/model-courses/12217','入笠山':'https://yamap.com/model-courses/9726','国師ヶ岳':'https://yamap.com/model-courses/96595'});
function lookup(a,b){const n=T[`${String(a||'').trim()}→${String(b||'').trim()}`];if(!Number.isFinite(n))return null;const mountain=Object.keys(URLS).find(m=>String(a).includes(m)||String(b).includes(m))||({'7合目登山口':'樽前山','見返坂分岐':'ニセコアンヌプリ','苔花台':'栗駒山','山彦荘':'入笠山','前国師岳':'国師ヶ岳'}[a]||{'樽前山7合目展望台':'樽前山','見返坂分岐':'ニセコアンヌプリ','苔花台':'栗駒山','山彦荘':'入笠山','前国師岳':'国師ヶ岳'}[b]);return {minutes:n,source:`YAMAP公開モデルコース ${URLS[mountain]||''}`,sourceType:'yamap'};}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){}
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){}
const R=Object.freeze({
  '樽前山':{label:'7合目ルート',via:['waypoint','樽前山7合目展望台','展望台']},
  'ニセコアンヌプリ':{label:'五色温泉インフォメーションセンタールート',via:['pass','見返坂分岐','分岐']},
  '栗駒山':{label:'須川高原温泉ルート',via:['pass','苔花台','分岐']},
  '入笠山':{label:'沢入ルート',via:['hut','山彦荘','山小屋']},
  '国師ヶ岳':{label:'大弛峠ルート',via:['peak','前国師岳','通過峰']}
});
if(typeof representativeCourseOptions==='function'){const o=representativeCourseOptions;representativeCourseOptions=function(mountain){let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){}const r=R[k],opts=o(mountain)||[];if(!r)return opts;return opts.map(c=>{if(c?.label!==r.label||!Array.isArray(c.points)||c.points.length!==3)return c;return {...c,points:[c.points[0],r.via,c.points[1],r.via,c.points[2]],source:'V1.5.132 verified checkpoint enrichment'};});};}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){}
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15132=Object.freeze({version:'1.5.132',mountains:Object.freeze(Object.keys(R)),reducedThreePointRoutes:5,policy:'public checkpoint CT; no estimated CT; representative coordinates are not for navigation'});
})();
