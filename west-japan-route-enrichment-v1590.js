// Traten V1.5.90: 西日本（三百名山）通過ポイント拡充・第3弾。
// 対象: 東赤石山 / 大崩山 / 伯母子岳
// Policy: 既存の固定座標地点を再利用し、公開確認済みCTで代表コースへ正式連動。推定CTは追加しない。
(function(){'use strict';

const T=Object.freeze({
  // 東赤石山: 公開登山記録の瀬場→赤石山荘→八巻山→東赤石山→赤石山荘→瀬場の時刻列。
  // 登りは 215 + 115 = 330分で既存の確認済み総CTと一致。
  '瀬場登山口 東赤石山→赤石山荘':{minutes:215,source:'公開登山記録・瀬場登山口07:05→赤石山荘10:40（215分）',sourceType:'other'},
  '赤石山荘→東赤石山':{minutes:115,source:'公開登山記録・赤石山荘10:40→八巻山11:50→東赤石山12:35（115分）',sourceType:'other'},
  '東赤石山→赤石山荘':{minutes:45,source:'公開登山記録・東赤石山12:35→赤石山荘13:20（45分）',sourceType:'other'},
  '赤石山荘→瀬場登山口 東赤石山':{minutes:140,source:'公開登山記録・赤石山荘13:20→瀬場登山口15:40（140分）',sourceType:'other'},

  // 大崩山: YAMAP 坊主尾根モデル。35 + 243 + 170 + 30 = 478分で既存往復総CTと一致。
  '祝子川 大崩山登山口→大崩山荘':{minutes:35,source:'YAMAP・坊主尾根モデル 大崩山登山口→大崩山荘35分',sourceType:'yamap'},
  '大崩山荘→大崩山':{minutes:243,source:'YAMAP・坊主尾根モデル 大崩山荘→ワク塚分岐→袖ダキ→各ワク塚→大崩山 243分（区間合算）',sourceType:'yamap'},
  '大崩山→大崩山荘':{minutes:170,source:'YAMAP・坊主尾根モデル 大崩山→坊主尾根→大崩山荘170分（区間合算）',sourceType:'yamap'},
  '大崩山荘→祝子川 大崩山登山口':{minutes:30,source:'YAMAP・坊主尾根モデル 大崩山荘→大崩山登山口30分',sourceType:'yamap'},

  // 伯母子岳: YAMAP 大股往復モデル。下山側で山頂→避難小屋25分、避難小屋→大股150分。
  // 216 + 25 + 150 = 391分で既存往復総CTと一致。
  '大股登山口 伯母子岳→伯母子岳':{minutes:216,source:'YAMAP・大股→伯母子岳モデル 3時間36分',sourceType:'yamap'},
  '伯母子岳→伯母子岳避難小屋':{minutes:25,source:'YAMAP・大股〜伯母子岳往復モデル 伯母子岳11:32→伯母子岳山小屋11:57（25分）',sourceType:'yamap'},
  '伯母子岳避難小屋→大股登山口 伯母子岳':{minutes:150,source:'YAMAP・大股〜伯母子岳往復モデル 山小屋11:57→大股14:27（150分・区間合算）',sourceType:'yamap'}
});

try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return T[`${String(a||'').trim()}→${String(b||'').trim()}`]||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return T[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||o(a,b);};}}catch(_){ }

const R=Object.freeze({
  '東赤石山':{label:'瀬場・赤石山荘ルート',points:[
    ['trailhead','瀬場登山口 東赤石山','登山口'],['hut','赤石山荘','山小屋'],['peak','東赤石山','山頂'],['hut','赤石山荘','山小屋'],['trailhead','瀬場登山口 東赤石山','下山口']
  ],source:'V1.5.90 west enrichment',verified:true},
  '大崩山':{label:'祝子川・大崩山荘 坊主尾根ルート',points:[
    ['trailhead','祝子川 大崩山登山口','登山口'],['hut','大崩山荘','山小屋'],['peak','大崩山','山頂'],['hut','大崩山荘','山小屋'],['trailhead','祝子川 大崩山登山口','下山口']
  ],source:'V1.5.90 west enrichment',verified:true},
  '伯母子岳':{label:'大股・伯母子岳・避難小屋ルート',points:[
    ['trailhead','大股登山口 伯母子岳','登山口'],['peak','伯母子岳','山頂'],['hut','伯母子岳避難小屋','避難小屋'],['trailhead','大股登山口 伯母子岳','下山口']
  ],source:'V1.5.90 west enrichment',verified:true}
});

if(typeof representativeCourseOptions==='function'){const o=representativeCourseOptions;representativeCourseOptions=function(mountain){let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){}const opts=o(mountain)||[];const r=R[k];if(!r)return opts;return [r,...opts.filter(c=>c?.label!==r.label)];};}

try{if(typeof buildRepresentativeResolvedRoute==='function'){const o=buildRepresentativeResolvedRoute;buildRepresentativeResolvedRoute=function(mountain,course){if(course?.source!=='V1.5.90 west enrichment')return o(mountain,course);const defs=representativeCourseExpandedPointDefs(mountain,course);const resolved=defs.map(([type,name,role])=>({type,name,role,p:representativeCandidate(type,name,mountain)||null}));const segments=[];for(let i=1;i<resolved.length;i++){const a=resolved[i-1],b=resolved[i];if(!a.p||!b.p)return {error:`${a.name} → ${b.name} の地点座標を解決できません。`};const info=T[`${a.name}→${b.name}`]||courseTimeInfo(a.p,b.p);if(!info)return {error:`${a.name} → ${b.name} の確認済みCTがありません。`};segments.push(info);}return {resolved,segments,distributedPointCount:0};};}}catch(_){ }

try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_WEST_ENRICHMENT_V1590=Object.freeze({
  scope:'西日本三百名山 第3弾 / 既存固定地点+確認済みCT+代表コース連動3座',
  mountains:Object.freeze(Object.keys(R)),
  fixedReused:Object.freeze({東赤石山:['赤石山荘'],大崩山:['大崩山荘'],伯母子岳:['伯母子岳避難小屋']}),
  routeCtMinutes:Object.freeze({東赤石山:515,大崩山:478,伯母子岳:391}),
  policy:'fixed coordinate point + verified public CT + representative route are one atomic update; no geometric/elevation estimation'
});
})();
