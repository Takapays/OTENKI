// Traten V1.5.79: 日本百名山 representative-route waypoint enrichment, batch 1.
// Policy: reuse verified CT edges and fixed/public coordinates only. No distance-ratio CT estimation.
(function(){
  'use strict';

  const PRIMARY_LABEL_V1579 = Object.freeze({
    // Route options already existed and had verified CTs. Prefer the more representative / waypoint-rich option.
    '岩手山':'馬返し登山口ルート',
    '常念岳':'一ノ沢ルート',
    '鹿島槍ヶ岳':'扇沢・柏原新道ルート'
  });

  // V1.5.79: 望岳台 was present in an older fixed catalog block but later catalog replacement removed it.
  // Restore the published fixed coordinate so the verified 望岳台→十勝岳避難小屋→十勝岳 CT chain can be used.
  const TOKACHI_BOGAKUDAI_V1579 = {
    id:'v1579-tokachi-bogakudai',type:'trailhead',name:'望岳台',
    lat:43.447639,lon:142.649861,elevation:933,
    source:'既存固定候補座標（V1.4系カタログ復元）'
  };
  try {
    if (typeof appendFixedWaypoints === 'function') appendFixedWaypoints('十勝岳',[TOKACHI_BOGAKUDAI_V1579]);
    else if (typeof BUILTIN_ROUTE_CATALOG !== 'undefined') {
      const old=BUILTIN_ROUTE_CATALOG['十勝岳']||[];
      if(!old.some(p=>p.type==='trailhead'&&p.name==='望岳台')) BUILTIN_ROUTE_CATALOG['十勝岳']=[...old,TOKACHI_BOGAKUDAI_V1579];
    }
  } catch (_) {}

  if (typeof representativeCourseOptions === 'function' && typeof representativeCourseWithDescent === 'function') {
    const originalRepresentativeCourseOptionsV1579 = representativeCourseOptions;
    representativeCourseOptions = function(mountain){
      let key=String(mountain||'').trim();
      try { key=canonicalMountainName(key); } catch (_) {}
      let options=originalRepresentativeCourseOptionsV1579(mountain)||[];

      // 十勝岳: 望岳台→十勝岳避難小屋→山頂. All four adjacent CT directions already verified in app.js.
      if (key==='十勝岳') {
        const route=representativeCourseWithDescent(key,{
          label:'望岳台・十勝岳避難小屋ルート',
          points:[
            ['trailhead','望岳台','登山口'],
            ['hut','十勝岳避難小屋','避難小屋'],
            ['peak','十勝岳','山頂']
          ],
          source:'既存確認済みCT（望岳台・十勝岳避難小屋・十勝岳）',
          verified:true
        });
        options=[route,...options.filter(c=>c?.label!==route.label)];
      }

      // 御嶽: direct summit jump -> 女人堂を上り/下りともに通す。
      if (key==='御嶽山') {
        options=options.map(c=>c?.label==='中の湯登山口（黒沢口）ルート'
          ? representativeCourseWithDescent(key,{...c,points:[
              ['trailhead','中の湯登山口（黒沢口）','登山口'],
              ['hut','女人堂','山小屋'],
              ['peak','御嶽山（剣ヶ峰）','山頂']
            ],descentExtended:false,originalPointCount:undefined})
          : c);
      }

      // 赤岳: 美濃戸口→行者小屋→赤岳. All four adjacent CT directions are already verified.
      if (key==='赤岳') {
        options=options.map(c=>c?.label==='美濃戸口ルート'
          ? representativeCourseWithDescent(key,{...c,points:[
              ['trailhead','美濃戸口','登山口'],
              ['hut','行者小屋','山小屋'],
              ['peak','赤岳','山頂']
            ],descentExtended:false,originalPointCount:undefined})
          : c);
      }

      const preferred=PRIMARY_LABEL_V1579[key];
      if (preferred) {
        const idx=options.findIndex(c=>c?.label===preferred);
        if (idx>0) options=[options[idx],...options.slice(0,idx),...options.slice(idx+1)];
      }
      return options;
    };
  }

  window.TRATEN_HYAKU_ENRICHMENT_V1579 = Object.freeze({
    primaryRouteChanges:Object.freeze({...PRIMARY_LABEL_V1579,'十勝岳':'望岳台・十勝岳避難小屋ルート'}),
    explicitWaypointEnrichments:Object.freeze({'御嶽山':['女人堂'],'赤岳':['行者小屋']}),
    policy:'verified-ct-only / no distance-ratio estimation'
  });
})();
