// Traten V1.5.80: 日本百名山 representative-route enrichment, batch 2.
// Policy: verified/public CT only. No distance-ratio or elevation-based CT estimation.
(function(){
  'use strict';

  // Route points restored/added from public-route references.
  const FIXED_V1580 = Object.freeze({
    '利尻山':[
      {id:'v1580-rishiri-chokanyama',type:'peak',name:'長官山',lat:45.19385,lon:141.23837,elevation:1218,source:'利尻山鴛泊コース主要地点（環境省登山モデル／地形照合）'}
    ],
    '羅臼岳':[
      {id:'v1580-rausu-daira',type:'pass',name:'羅臼平',lat:44.08175,lon:145.12853,elevation:1345,source:'羅臼平（公開地形・位置情報照合）'}
    ]
  });

  try {
    for (const [mountain,points] of Object.entries(FIXED_V1580)) {
      if (typeof appendFixedWaypoints === 'function') appendFixedWaypoints(mountain,points);
      else if (typeof BUILTIN_ROUTE_CATALOG !== 'undefined') {
        const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
        const add=points.filter(p=>!old.some(x=>x.name===p.name&&x.type===p.type));
        BUILTIN_ROUTE_CATALOG[mountain]=[...old,...add];
      }
    }
  } catch (_) {}

  // CT additions are exact decompositions of already-used public totals.
  // 利尻山: Environment Ministry Oshidomari model, walking time excluding stated rests.
  // Up 310 min = 北麓野営場→長官山 205 + 長官山→山頂 105.
  // Down 220 min = 山頂→長官山 85 + 長官山→北麓野営場 135.
  try {
    if (typeof COURSE_TIME_MINUTES !== 'undefined') {
      Object.assign(COURSE_TIME_MINUTES,{
        '利尻北麓野営場（鴛泊コース）→長官山':{minutes:205,source:'環境省・利尻山鴛泊コース登山モデル（休憩を除く歩行時間）',sourceType:'official'},
        '長官山→利尻山':{minutes:105,source:'環境省・利尻山鴛泊コース登山モデル（休憩を除く歩行時間）',sourceType:'official'},
        '利尻山→長官山':{minutes:85,source:'環境省・利尻山鴛泊コース登山モデル（休憩を除く歩行時間）',sourceType:'official'},
        '長官山→利尻北麓野営場（鴛泊コース）':{minutes:135,source:'環境省・利尻山鴛泊コース登山モデル（休憩を除く歩行時間）',sourceType:'official'}
      });
    }
  } catch (_) {}

  if (typeof representativeCourseOptions === 'function' && typeof representativeCourseWithDescent === 'function') {
    const originalRepresentativeCourseOptionsV1580=representativeCourseOptions;
    representativeCourseOptions=function(mountain){
      let key=String(mountain||'').trim();
      try { key=canonicalMountainName(key); } catch (_) {}
      let options=originalRepresentativeCourseOptionsV1580(mountain)||[];

      // 利尻山: 沓形コース上部は公式通行止めが継続しているため代表候補から外し、
      // 公式の鴛泊コースを長官山で分割する。
      if(key==='利尻山'){
        options=options.filter(c=>!String(c?.label||'').includes('沓形'));
        const route=representativeCourseWithDescent(key,{
          label:'鴛泊・長官山ルート',
          points:[
            ['trailhead','利尻北麓野営場（鴛泊コース）','登山口'],
            ['peak','長官山','8合目'],
            ['peak','利尻山','山頂']
          ],
          source:'環境省・利尻山鴛泊コース登山モデル',verified:true
        });
        options=[route,...options.filter(c=>c?.label!==route.label)];
      }

      // 恵那山: 現在の市公式案内で最短・比較的登りやすい広河原ルートを先頭へ。
      if(key==='恵那山'){
        const idx=options.findIndex(c=>c?.label==='広河原ルート');
        if(idx>0) options=[options[idx],...options.slice(0,idx),...options.slice(idx+1)];
      }

      // 羅臼岳: 既存の4方向確認済みCTを使い、羅臼平を往復とも通す。
      if(key==='羅臼岳'){
        options=options.map(c=>c?.label==='岩尾別温泉・木下小屋登山口ルート'
          ? representativeCourseWithDescent(key,{...c,points:[
              ['trailhead','岩尾別温泉・木下小屋登山口','登山口'],
              ['pass','羅臼平','分岐・高原'],
              ['peak','羅臼岳','山頂']
            ],descentExtended:false,originalPointCount:undefined})
          : c);
      }
      return options;
    };
  }

  window.TRATEN_HYAKU_ENRICHMENT_V1580=Object.freeze({
    enriched:Object.freeze({
      '利尻山':['長官山'],
      '羅臼岳':['羅臼平']
    }),
    routeCorrections:Object.freeze({
      '利尻山':'沓形上部通行止めのため鴛泊コースを代表化',
      'トムラウシ山':'公式CTへ更新',
      '恵那山':'広河原公式CTへ更新'
    }),
    policy:'verified/public-ct-only / no estimation'
  });
})();
