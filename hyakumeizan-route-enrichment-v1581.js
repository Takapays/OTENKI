// Traten V1.5.81: 日本百名山 representative-route enrichment, batch 3 (remaining priority-A mountains).
// Policy: public/verified segment CT only. No distance-ratio or elevation-based CT estimation.
(function(){
  'use strict';

  const FIXED_V1581 = Object.freeze({
    // V1.5.80 compatibility repair: a legacy Object.assign later in app.js had overwritten
    // the 鴛泊 trailhead entry with the 沓形-only list. Restore the official 鴛泊 start point.
    '利尻山':[
      {id:'v1581-rishiri-oshidomari',type:'trailhead',name:'利尻北麓野営場（鴛泊コース）',lat:45.222722,lon:141.212639,elevation:207,source:'既存固定候補復旧・鴛泊コース'}
    ],
    '越後駒ヶ岳':[
      {id:'v1581-echigokoma-ogura',type:'peak',name:'小倉山',lat:37.080611,lon:139.055150,elevation:1378,source:'国土地理院三角点公開値（小倉山）'}
    ],
    '平ヶ岳':[
      {id:'v1581-hiragatake-shimodaikura',type:'peak',name:'下台倉山',lat:37.014416,lon:139.131927,elevation:1610,source:'国土地理院地形・公開標高座標'},
      {id:'v1581-hiragatake-daikura',type:'peak',name:'台倉山',lat:37.010678,lon:139.130567,elevation:1695,source:'国土地理院三角点公開値'},
      {id:'v1581-hiragatake-ikenodake',type:'peak',name:'池ノ岳',lat:37.003868,lon:139.103973,elevation:2080,source:'国土地理院地形・公開標高座標'}
    ],
    '後方羊蹄山':[
      {id:'v1581-yotei-makkari',type:'peak',name:'真狩岳',lat:42.828233,lon:140.811180,elevation:1893,source:'国土地理院一等三角点・真狩岳公開値'}
    ],
    '武尊山':[
      {id:'v1581-hotaka-maehotaka',type:'peak',name:'前武尊',lat:36.789940,lon:139.146280,elevation:2040,source:'公開地形座標・前武尊'}
    ],
    '両神山':[
      {id:'v1581-ryokami-kiyotaki',type:'hut',name:'清滝避難小屋',lat:36.021111,lon:138.850833,elevation:1290,source:'清滝避難小屋公開位置情報'}
    ],
    '巻機山':[
      {id:'v1581-makihata-mae',type:'peak',name:'前巻機',lat:36.581922,lon:138.573542,elevation:1861,source:'国土地理院公開値・前巻機（ニセ巻機）'}
    ]
  });

  try {
    for (const [mountain,points] of Object.entries(FIXED_V1581)) {
      if (typeof appendFixedWaypoints === 'function') appendFixedWaypoints(mountain,points);
      else if (typeof BUILTIN_ROUTE_CATALOG !== 'undefined') {
        const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
        const add=points.filter(p=>!old.some(x=>x.name===p.name&&x.type===p.type));
        BUILTIN_ROUTE_CATALOG[mountain]=[...old,...add];
      }
    }
  } catch (_) {}

  // Segment CTs below are direct sums / sections explicitly published in public model routes.
  // No geometric interpolation is used.
  const V1581_COURSE_TIMES = Object.freeze({
        // V1.5.80 compatibility repair: 利尻山 waypoint split was added there; make the split CTs resolvable here.
        '利尻北麓野営場（鴛泊コース）→長官山':{minutes:205,source:'環境省・利尻山鴛泊コース登山モデル（休憩を除く歩行時間）',sourceType:'official'},
        '長官山→利尻山':{minutes:105,source:'環境省・利尻山鴛泊コース登山モデル（休憩を除く歩行時間）',sourceType:'official'},
        '利尻山→長官山':{minutes:85,source:'環境省・利尻山鴛泊コース登山モデル（休憩を除く歩行時間）',sourceType:'official'},
        '長官山→利尻北麓野営場（鴛泊コース）':{minutes:135,source:'環境省・利尻山鴛泊コース登山モデル（休憩を除く歩行時間）',sourceType:'official'},
        // 越後駒ヶ岳: public standard course totaling 8h30 (same total as YAMAP model course), collapsed at 小倉山.
        '枝折峠→小倉山':{minutes:140,source:'公開標準コース・枝折峠→明神峠35＋道行山60＋小倉山45',sourceType:'other'},
        '小倉山→越後駒ヶ岳':{minutes:140,source:'公開標準コース・小倉山→百草ノ池50＋駒の小屋65＋分岐・山頂25',sourceType:'other'},
        '越後駒ヶ岳→小倉山':{minutes:100,source:'公開標準コース・山頂→分岐5＋駒の小屋15＋百草ノ池50＋小倉山30',sourceType:'other'},
        '小倉山→枝折峠':{minutes:130,source:'公開標準コース・小倉山→道行山40＋明神峠60＋枝折峠30',sourceType:'other'},

        // 平ヶ岳: Yamareco public standard plan p5602548 (same classic trailhead route).
        '鷹ノ巣・平ヶ岳登山口→下台倉山':{minutes:179,source:'ヤマレコ公開山行計画 p5602548・平ケ岳登山口→前坂84＋下台倉山95',sourceType:'yamareco'},
        '下台倉山→台倉山':{minutes:49,source:'ヤマレコ公開山行計画 p5602548',sourceType:'yamareco'},
        '台倉山→池ノ岳':{minutes:148,source:'ヤマレコ公開山行計画 p5602548・台倉山→Point58＋池ノ岳90',sourceType:'yamareco'},
        '池ノ岳→平ヶ岳':{minutes:34,source:'ヤマレコ公開山行計画 p5602548・池ノ岳→三角点31＋山頂3',sourceType:'yamareco'},
        '平ヶ岳→池ノ岳':{minutes:29,source:'ヤマレコ公開山行計画 p5602548・山頂→三角点3＋池ノ岳26',sourceType:'yamareco'},
        '池ノ岳→台倉山':{minutes:108,source:'ヤマレコ公開山行計画 p5602548・池ノ岳→Point53＋台倉山55',sourceType:'yamareco'},
        '台倉山→下台倉山':{minutes:39,source:'ヤマレコ公開山行計画 p5602548',sourceType:'yamareco'},
        '下台倉山→鷹ノ巣・平ヶ岳登山口':{minutes:104,source:'ヤマレコ公開山行計画 p5602548・下台倉山→前坂54＋登山口50',sourceType:'yamareco'},

        // 羊蹄山: YAMAP public model course, 京極 course. One stable rim waypoint is used.
        '京極登山口→真狩岳':{minutes:287,source:'YAMAP標準モデル・京極登山口→二合目50＋六合目115＋分岐112＋真狩岳10',sourceType:'yamap'},
        '真狩岳→後方羊蹄山（羊蹄山）':{minutes:10,source:'YAMAP標準モデル・京極コース',sourceType:'yamap'},
        '後方羊蹄山（羊蹄山）→真狩岳':{minutes:2,source:'YAMAP標準モデル・京極コース',sourceType:'yamap'},
        '真狩岳→京極登山口':{minutes:195,source:'YAMAP標準モデル・京極コース総下り197分から山頂→真狩岳2分を除く公開区間',sourceType:'yamap'},

        // 武尊山: YAMAP public model for 川場谷野営場 route, collapsed at 前武尊.
        '川場谷野営場登山口→前武尊':{minutes:225,source:'YAMAP標準モデル・川場谷野営場→前武尊（公開チェックポイント合算）',sourceType:'yamap'},
        '前武尊→武尊山':{minutes:85,source:'YAMAP標準モデル・前武尊→家の串山25＋中ノ岳分岐30＋武尊山30',sourceType:'yamap'},
        '武尊山→前武尊':{minutes:100,source:'YAMAP標準モデル・武尊山→中ノ岳分岐25＋家の串山45＋前武尊30',sourceType:'yamap'},
        '前武尊→川場谷野営場登山口':{minutes:75,source:'YAMAP標準モデル・前武尊→川場谷野営場（公開チェックポイント合算）',sourceType:'yamap'},

        // 両神山: public standard route breakdown (日向大谷口→会所→清滝小屋→両神神社→山頂).
        '日向大谷口→清滝避難小屋':{minutes:125,source:'公開標準コース・日向大谷口→会所35＋清滝小屋90',sourceType:'other'},
        '清滝避難小屋→両神山':{minutes:80,source:'公開標準コース・清滝小屋→両神神社50＋山頂30',sourceType:'other'},
        '両神山→清滝避難小屋':{minutes:55,source:'公開標準コース・山頂→両神神社20＋清滝小屋35',sourceType:'other'},
        '清滝避難小屋→日向大谷口':{minutes:100,source:'公開標準コース・清滝小屋→会所70＋日向大谷口30',sourceType:'other'},

        // 巻機山: YAMAP public model course (井戸尾根) collapsed at 前巻機.
        '桜坂登山口→前巻機':{minutes:226,source:'YAMAP標準モデル・巻機山登山口→五合目81＋六合目40＋1564m50＋前巻機15',sourceType:'yamap'},
        '前巻機→巻機山':{minutes:50,source:'YAMAP標準モデル・前巻機→分岐30＋御機屋10＋巻機山10',sourceType:'yamap'},
        '巻機山→前巻機':{minutes:80,source:'YAMAP標準モデル・巻機山→御機屋20＋分岐15＋前巻機45',sourceType:'yamap'},
        '前巻機→桜坂登山口':{minutes:118,source:'YAMAP標準モデル・前巻機→登山口（公開チェックポイント時刻差）',sourceType:'yamap'}
  });
  try {
    if (typeof directCourseTimeInfoByNames === 'function') {
      const originalDirectCourseTimeInfoByNamesV1581=directCourseTimeInfoByNames;
      directCourseTimeInfoByNames=function(fromName,toName){
        const hit=V1581_COURSE_TIMES[`${String(fromName||'').trim()}→${String(toName||'').trim()}`];
        return hit||originalDirectCourseTimeInfoByNamesV1581(fromName,toName);
      };
    }
  } catch (_) {}
  try {
    if (typeof courseTimeInfo === 'function') {
      const originalCourseTimeInfoV1581=courseTimeInfo;
      courseTimeInfo=function(fromPoint,toPoint){
        const fromName=String(fromPoint?.name||'').trim();
        const toName=String(toPoint?.name||'').trim();
        const hit=V1581_COURSE_TIMES[`${fromName}→${toName}`];
        return hit||originalCourseTimeInfoV1581(fromPoint,toPoint);
      };
    }
  } catch (_) {}

  if (typeof representativeCourseOptions === 'function' && typeof representativeCourseWithDescent === 'function') {
    const originalRepresentativeCourseOptionsV1581=representativeCourseOptions;
    representativeCourseOptions=function(mountain){
      let key=String(mountain||'').trim();
      try { key=canonicalMountainName(key); } catch (_) {}
      let options=originalRepresentativeCourseOptionsV1581(mountain)||[];

      const replacements={
        '越後駒ヶ岳':{label:'枝折峠ルート',points:[['trailhead','枝折峠','登山口'],['peak','小倉山','中間ピーク'],['peak','越後駒ヶ岳','山頂']]},
        '平ヶ岳':{label:'鷹ノ巣・平ヶ岳ルート',points:[['trailhead','鷹ノ巣・平ヶ岳登山口','登山口'],['peak','下台倉山','通過ピーク'],['peak','台倉山','通過ピーク'],['peak','池ノ岳','湿原手前'],['peak','平ヶ岳','山頂']]},
        '後方羊蹄山':{label:'京極登山口ルート',points:[['trailhead','京極登山口','登山口'],['peak','真狩岳','外輪山'],['peak','後方羊蹄山（羊蹄山）','山頂']]},
        '武尊山':{label:'川場谷野営場ルート',points:[['trailhead','川場谷野営場登山口','登山口'],['peak','前武尊','通過ピーク'],['peak','武尊山','山頂']]},
        '両神山':{label:'日向大谷口ルート',points:[['trailhead','日向大谷口','登山口'],['hut','清滝避難小屋','避難小屋'],['peak','両神山','山頂']]},
        '巻機山':{label:'桜坂ルート',points:[['trailhead','桜坂登山口','登山口'],['peak','前巻機','ニセ巻機'],['peak','巻機山','山頂']]}
      };
      const rep=replacements[key];
      if(rep){
        const route=representativeCourseWithDescent(key,{...rep,source:'V1.5.81 public CT enrichment',verified:true});
        const idx=options.findIndex(c=>c?.label===rep.label);
        if(idx>=0) options=options.map((c,i)=>i===idx?route:c);
        else options=[route,...options];
      }
      return options;
    };
  }

  window.TRATEN_HYAKU_ENRICHMENT_V1581=Object.freeze({
    enriched:Object.freeze({
      '越後駒ヶ岳':['小倉山'],
      '平ヶ岳':['下台倉山','台倉山','池ノ岳'],
      '後方羊蹄山':['真狩岳'],
      '武尊山':['前武尊'],
      '両神山':['清滝避難小屋'],
      '巻機山':['前巻機']
    }),
    policy:'public-verified-ct-only / no geometric estimation'
  });
})();
