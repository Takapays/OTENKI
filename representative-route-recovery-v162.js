// Traten V1.6.2: recover a currently legal representative route without reviving prohibited historical routes.
// Policy: fixed coordinates and direction-specific/public checkpoint CT only. No coordinate guessing or proportional CT.
(function(){'use strict';
const VERSION='1.6.2';
if(typeof representativeCourseOptions!=='function')return;
const M='箱根山';
const FIXED=[
  {id:'v162-hakone-komagatake-station',type:'trailhead',name:'箱根駒ヶ岳ロープウェー 駒ヶ岳頂上駅',lat:35.223684,lon:139.0239898,elevation:1327,source:'MapFan公開座標 https://mapfan.com/spots/SCH%2CJ%2CZC4'},
  {id:'v162-hakone-komagatake',type:'peak',name:'箱根駒ヶ岳（駒ヶ岳）',lat:35.22445,lon:139.02520,elevation:1356,source:'Wikidata Q31454757 / GeoNames・OSM参照座標'},
  {id:'v162-hakone-kamiyama',type:'peak',name:'神山（箱根山）',lat:35.233333,lon:139.020833,elevation:1438,source:'気象庁・国土地理院公開座標'}
];
try{if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(M,FIXED);}catch(_){}
// YAMAP model course 29534 checkpoint sums (2026-09-07 checked):
// station -> Komagatake = 2+4+5 = 11m; Komagatake -> Kamiyama = 5+10+50 = 65m;
// Kamiyama -> station = 40+15+5 = 60m. These are checkpoint sums, not distance apportionment.
const CT=Object.freeze({
  '箱根駒ヶ岳ロープウェー 駒ヶ岳頂上駅→箱根駒ヶ岳（駒ヶ岳）':11,
  '箱根駒ヶ岳（駒ヶ岳）→神山（箱根山）':65,
  '神山（箱根山）→箱根駒ヶ岳ロープウェー 駒ヶ岳頂上駅':60
});
function lookup(a,b){const k=`${String(a||'').trim()}→${String(b||'').trim()}`,n=CT[k];return Number.isFinite(n)?{minutes:n,source:'YAMAP公開モデルコース https://yamap.com/model-courses/29534（公開チェックポイント時刻の区間合算）',sourceType:'yamap'}:null;}
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return lookup(a,b)||o(a,b);};}}catch(_){}
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return lookup(a?.name,b?.name)||o(a,b);};}}catch(_){}
const original=representativeCourseOptions;
representativeCourseOptions=function(mountain){
  let key=String(mountain||'').trim();try{key=canonicalMountainName(key);}catch(_){}
  const opts=original(mountain)||[];
  if(key!==M)return opts;
  // Replace the auto-generated station→generic 箱根山 route; it has no verified direct CT.
  return [{label:'駒ヶ岳頂上駅・神山ルート',points:[
    ['trailhead','箱根駒ヶ岳ロープウェー 駒ヶ岳頂上駅','登山口'],
    ['peak','箱根駒ヶ岳（駒ヶ岳）','通過ピーク'],
    ['peak','神山（箱根山）','山頂'],
    ['trailhead','箱根駒ヶ岳ロープウェー 駒ヶ岳頂上駅','下山口']
  ],source:'V1.6.2 legal-route recovery; old Owakudani route remains excluded'}];
};
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){}
window.TRATEN_REPRESENTATIVE_ROUTE_RECOVERY_V162=Object.freeze({version:VERSION,mountain:M,restored:1,unsafeHistoricalRoutesRevived:0});
})();
