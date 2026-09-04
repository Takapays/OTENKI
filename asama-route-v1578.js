// Traten V1.5.78: 浅間山 representative-course / waypoint / CT expansion.
// Source policy: coordinates use public facility/location data; CT uses published route times.
(function(){
  'use strict';

  const ASAMA_MOUNTAIN = '浅間山';
  const ASAMA_ROUTE_LABEL = '火山館・前掛山ルート（警戒レベル1時）';

  // Coordinates:
  // - 登山口 / 火山館 / 湯の平付近 / 賽の河原側分岐 / 前掛山: 長野県の公開登山道施設資料
  // - 不動滝: 公開地図座標（ゼンリン/NAVITIME）
  const ASAMA_POINTS_V1578 = [
    {id:'v1578-asama-tengu', type:'trailhead', name:'天狗温泉浅間山荘', lat:36.380117, lon:138.478800, elevation:1410, source:'長野県・浅間山荘前掛山線 登山口道標（公開座標）'},
    {id:'v1578-asama-fudotaki', type:'pass', name:'不動滝', lat:36.391250, lon:138.489816, elevation:1660, source:'ゼンリン/NAVITIME公開座標・長野県登山道施設資料で周辺位置照合'},
    {id:'v1578-asama-kazankan', type:'hut', name:'火山館', lat:36.399617, lon:138.496150, elevation:1990, source:'長野県・浅間山荘前掛山線「火山館」公開座標'},
    {id:'v1578-asama-yunotaira', type:'pass', name:'湯の平分岐', lat:36.401917, lon:138.497300, elevation:2020, source:'長野県登山道施設資料「草すべり分岐」公開座標（湯の平分岐周辺）'},
    {id:'v1578-asama-sainokawara', type:'pass', name:'賽の河原分岐', lat:36.406500, lon:138.502083, elevation:2100, source:'長野県登山道施設資料「Jバンド分岐」公開座標（賽の河原側分岐）'},
    {id:'v1578-asama-maekake', type:'peak', name:'前掛山', lat:36.403900, lon:138.513167, elevation:2524, source:'長野県・浅間山荘前掛山線「前掛山頂上」公開座標'}
  ];

  // 浅間山火山館コース（公開トレッキングマップ）
  // 上り: 45 + 70 + 5 + 20 + 90 = 230分
  // 下り: 60 + 15 + 5 + 50 + 40 = 170分
  // 往復: 400分 = 6時間40分（長野県佐久地域振興局 2026-08-20 の現行推奨コース総時間とも一致）
  const ASAMA_CT_V1578 = Object.freeze({
    '天狗温泉浅間山荘→不動滝': {minutes:45, source:'浅間山火山館コース公開トレッキングマップ・天狗温泉浅間山荘→不動滝 45分', sourceType:'official-map'},
    '不動滝→天狗温泉浅間山荘': {minutes:40, source:'浅間山火山館コース公開トレッキングマップ・不動滝→天狗温泉浅間山荘 40分', sourceType:'official-map'},
    '不動滝→火山館': {minutes:70, source:'浅間山火山館コース公開トレッキングマップ・不動滝→火山館 70分', sourceType:'official-map'},
    '火山館→不動滝': {minutes:50, source:'浅間山火山館コース公開トレッキングマップ・火山館→不動滝 50分', sourceType:'official-map'},
    '火山館→湯の平分岐': {minutes:5, source:'浅間山火山館コース公開トレッキングマップ・火山館→湯の平分岐 5分', sourceType:'official-map'},
    '湯の平分岐→火山館': {minutes:5, source:'浅間山火山館コース公開トレッキングマップ・湯の平分岐→火山館 5分', sourceType:'official-map'},
    '湯の平分岐→賽の河原分岐': {minutes:20, source:'浅間山火山館コース公開トレッキングマップ・湯の平分岐→賽の河原分岐 20分', sourceType:'official-map'},
    '賽の河原分岐→湯の平分岐': {minutes:15, source:'浅間山火山館コース公開トレッキングマップ・賽の河原分岐→湯の平分岐 15分', sourceType:'official-map'},
    '賽の河原分岐→前掛山': {minutes:90, source:'浅間山火山館コース公開トレッキングマップ・賽の河原分岐→前掛山 90分', sourceType:'official-map'},
    '前掛山→賽の河原分岐': {minutes:60, source:'浅間山火山館コース公開トレッキングマップ・前掛山→賽の河原分岐 60分', sourceType:'official-map'}
  });

  // Add weather-analysis candidates to the existing mountain catalog.
  if (typeof appendFixedWaypoints === 'function') {
    appendFixedWaypoints(ASAMA_MOUNTAIN, ASAMA_POINTS_V1578);
  } else if (typeof BUILTIN_ROUTE_CATALOG !== 'undefined') {
    const old = BUILTIN_ROUTE_CATALOG[ASAMA_MOUNTAIN] || [];
    const seen = new Set(old.map(p => `${p.type}|${String(p.name||'').trim()}`));
    BUILTIN_ROUTE_CATALOG[ASAMA_MOUNTAIN] = [...old, ...ASAMA_POINTS_V1578.filter(p => !seen.has(`${p.type}|${p.name}`))];
  }

  // Reset candidate-derived caches after injecting the new fixed points.
  try { GENERATED_CT_POINT_INDEX_CACHE = null; } catch (_) {}
  try { COURSE_TIME_COORD_INDEX_CACHE = null; } catch (_) {}

  const normalizeAsamaEndpointV1578 = (name) => {
    const raw = String(name || '').normalize('NFKC').trim();
    const compact = raw.replace(/[\s　]+/g,'');
    const aliases = {
      '浅間山荘':'天狗温泉浅間山荘',
      '浅間山荘登山口':'天狗温泉浅間山荘',
      '浅間山荘登山口公衆トイレ':'天狗温泉浅間山荘',
      '天狗温泉浅間山荘前':'天狗温泉浅間山荘',
      '浅間火山館':'火山館',
      '湯ノ平分岐':'湯の平分岐',
      '賽の河原':'賽の河原分岐',
      '前掛山山頂':'前掛山',
      '浅間山（前掛山）':'前掛山',
      '浅間山(前掛山)':'前掛山'
    };
    return aliases[compact] || raw;
  };

  function directAsamaCtV1578(fromName, toName){
    const from = normalizeAsamaEndpointV1578(fromName);
    const to = normalizeAsamaEndpointV1578(toName);
    return ASAMA_CT_V1578[`${from}→${to}`] || null;
  }

  // Compose only inside this verified Asama adjacency graph, so custom point-to-point planning
  // also benefits without adding guessed CT or altering unrelated mountains.
  function composedAsamaCtV1578(fromName, toName){
    const from = normalizeAsamaEndpointV1578(fromName);
    const to = normalizeAsamaEndpointV1578(toName);
    if (!from || !to || from === to) return null;
    const direct = directAsamaCtV1578(from, to);
    if (direct) return direct;
    const nodes = new Set();
    const graph = new Map();
    for (const [key, info] of Object.entries(ASAMA_CT_V1578)) {
      const [a,b] = key.split('→');
      nodes.add(a); nodes.add(b);
      if (!graph.has(a)) graph.set(a, []);
      graph.get(a).push({to:b, info});
    }
    if (!nodes.has(from) || !nodes.has(to)) return null;
    const q = [{name:from, minutes:0, path:[from], sources:[]}];
    const best = new Map([[from,0]]);
    while (q.length) {
      q.sort((a,b)=>a.minutes-b.minutes);
      const cur = q.shift();
      if (cur.name === to) {
        return {
          minutes: cur.minutes,
          source:'浅間山火山館コース公開CT・確認済み隣接区間合算',
          sourceType:'official-map',
          composed:true,
          verifiedMixedSources:false,
          representativePath:true,
          via:cur.path.slice(1,-1)
        };
      }
      for (const edge of graph.get(cur.name) || []) {
        if (cur.path.includes(edge.to)) continue;
        const minutes = cur.minutes + Number(edge.info.minutes);
        if (best.has(edge.to) && best.get(edge.to) <= minutes) continue;
        best.set(edge.to, minutes);
        q.push({name:edge.to, minutes, path:[...cur.path,edge.to]});
      }
    }
    return null;
  }

  // Direct CT lookups elsewhere in the app should see the new verified legs first.
  if (typeof directCourseTimeInfoByNames === 'function') {
    const originalDirectCourseTimeInfoByNamesV1578 = directCourseTimeInfoByNames;
    directCourseTimeInfoByNames = function(fromName,toName){
      return directAsamaCtV1578(fromName,toName) || originalDirectCourseTimeInfoByNamesV1578(fromName,toName);
    };
  }

  // courseTimeInfo is the main route-builder entry point; support both adjacent and composed
  // verified Asama CT while preserving all existing behavior for every other mountain/point.
  if (typeof courseTimeInfo === 'function') {
    const originalCourseTimeInfoV1578 = courseTimeInfo;
    courseTimeInfo = function(fromPoint,toPoint){
      const local = composedAsamaCtV1578(fromPoint?.name,toPoint?.name);
      return local || originalCourseTimeInfoV1578(fromPoint,toPoint);
    };
  }

  // Representative route: use the currently recommended firehouse / Maekake route,
  // available only at eruption alert level 1. Round-trip descent is appended by the existing helper.
  const ASAMA_REPRESENTATIVE_V1578 = {
    label: ASAMA_ROUTE_LABEL,
    points: [
      ['trailhead','天狗温泉浅間山荘','登山口'],
      ['pass','不動滝','通過ポイント'],
      ['hut','火山館','山小屋'],
      ['pass','湯の平分岐','峠・分岐'],
      ['pass','賽の河原分岐','峠・分岐'],
      ['peak','前掛山','山頂']
    ],
    source:'長野県佐久地域振興局「浅間山・活火山体感コース」・公開トレッキングマップ',
    volcanoRestriction:'噴火警戒レベル1時のみ前掛山まで登山可能',
    verifiedCtTotalMinutes:400
  };

  if (typeof representativeCourseOptions === 'function' && typeof representativeCourseWithDescent === 'function') {
    const originalRepresentativeCourseOptionsV1578 = representativeCourseOptions;
    representativeCourseOptions = function(mountain){
      let key = String(mountain || '').trim();
      try { key = canonicalMountainName(key); } catch (_) {}
      if (key === ASAMA_MOUNTAIN) {
        return [representativeCourseWithDescent(key, ASAMA_REPRESENTATIVE_V1578)];
      }
      return originalRepresentativeCourseOptionsV1578(mountain);
    };
  }

  // Expose only non-secret diagnostics for release/audit checks.
  window.TRATEN_ASAMA_V1578 = Object.freeze({
    routeLabel: ASAMA_ROUTE_LABEL,
    outboundPoints: ASAMA_REPRESENTATIVE_V1578.points.map(p=>p[1]),
    outboundMinutes:230,
    descentMinutes:170,
    roundTripMinutes:400,
    alertLevelNote:'前掛山ルートは噴火警戒レベル1時のみ'
  });
})();
