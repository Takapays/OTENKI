// Traten V1.5.82: 日本百名山 representative-route enrichment, priority-B batch 1 + 嘉津宇岳.
// Policy: public/verified segment CT only. No distance/elevation interpolation.
(function(){
  'use strict';

  const FIXED_V1582 = Object.freeze({
    '雲取山':[
      {id:'v1582-kumotori-nanatsuishi',type:'peak',name:'七ツ石山',lat:35.8298,lon:138.9618,elevation:1757,source:'公開地形座標・七ツ石山'}
    ],
    '甲斐駒ヶ岳':[
      {id:'v1582-kaikoma-komatsumine',type:'peak',name:'駒津峰',lat:35.75327,lon:138.22946,elevation:2750,source:'公開地形座標・駒津峰'}
    ],
    '西吾妻山':[
      {id:'v1582-nishiazuma-nishidaiten',type:'peak',name:'西大巓',lat:37.7338,lon:140.1275,elevation:1982,source:'公開地形座標・西大巓'}
    ],
    '会津駒ヶ岳':[
      {id:'v1582-aizukoma-komanokoya',type:'hut',name:'駒の小屋',lat:37.04315,lon:139.35244,elevation:2055,source:'駒の小屋公開位置情報'}
    ],
    '燧ヶ岳':[
      {id:'v1582-hiuchi-kumasawa',type:'pass',name:'熊沢田代',lat:36.9653,lon:139.2951,elevation:1950,source:'公開地点座標・熊沢田代'}
    ],
    '嘉津宇岳':[
      {id:'v1582-katsuu-th',type:'trailhead',name:'嘉津宇岳登山口',lat:26.631139,lon:127.939389,elevation:271,source:'嘉津宇岳登山口公開駐車場情報'},
      {id:'v1582-katsuu-peak',type:'peak',name:'嘉津宇岳',lat:26.631182,lon:127.934834,elevation:452,source:'公開山頂座標'}
    ]
  });

  try {
    // 嘉津宇岳 is intentionally an extra selectable mountain; it is not inserted into 日本三百名山.
    MOUNTAIN_PRESETS['嘉津宇岳']={latitude:26.631182,longitude:127.934834};
  } catch (_) {}

  try {
    for (const [mountain,points] of Object.entries(FIXED_V1582)) {
      if (typeof appendFixedWaypoints === 'function') appendFixedWaypoints(mountain,points);
      else if (typeof BUILTIN_ROUTE_CATALOG !== 'undefined') {
        const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
        const add=points.filter(p=>!old.some(x=>x.name===p.name&&x.type===p.type));
        BUILTIN_ROUTE_CATALOG[mountain]=[...old,...add];
      }
    }
  } catch (_) {}

  // Extra mountain reading / UI region without mutating the frozen lookup tables in app.js.
  try {
    if (typeof nationalMountainReading === 'function') {
      const originalNationalMountainReadingV1582=nationalMountainReading;
      nationalMountainReading=function(name){
        if(String(name||'').trim()==='嘉津宇岳') return 'かつうだけ';
        return originalNationalMountainReadingV1582(name);
      };
    }
  } catch (_) {}
  try {
    if (typeof mountainUiArea === 'function') {
      const originalMountainUiAreaV1582=mountainUiArea;
      mountainUiArea=function(name){
        if(String(name||'').trim()==='嘉津宇岳') return 'kyushu';
        return originalMountainUiAreaV1582(name);
      };
    }
  } catch (_) {}

  const V1582_COURSE_TIMES = Object.freeze({
    // 雲取山: YAMAP 鴨沢モデル。七ツ石小屋・七ツ石山を気象通過点として分割。
    '鴨沢登山口→七ツ石小屋':{minutes:220,source:'YAMAP・雲取山（鴨沢コース）モデル',sourceType:'yamap'},
    '七ツ石小屋→七ツ石山':{minutes:37,source:'YAMAP・雲取山（鴨沢コース）モデル',sourceType:'yamap'},
    '七ツ石山→雲取山':{minutes:105,source:'YAMAP・雲取山（鴨沢コース）モデル',sourceType:'yamap'},
    '雲取山→鴨沢登山口':{minutes:297,source:'既存確認済みCT・鴨沢コース下山',sourceType:'verified'},

    // 妙高山: 既存確認済み区間を往復とも明示し、黒沢池ヒュッテを下山時にも残す。
    '笹ヶ峰登山口→黒沢池ヒュッテ':{minutes:190,source:'既存確認済み・妙高山笹ヶ峰ルート',sourceType:'verified'},
    '黒沢池ヒュッテ→妙高山':{minutes:150,source:'既存確認済み・妙高山笹ヶ峰ルート',sourceType:'verified'},
    '妙高山→黒沢池ヒュッテ':{minutes:130,source:'既存確認済み・妙高山笹ヶ峰ルート',sourceType:'verified'},
    '黒沢池ヒュッテ→笹ヶ峰登山口':{minutes:160,source:'既存確認済み・妙高山笹ヶ峰ルート',sourceType:'verified'},

    // 岩手山: 馬返し－八合目避難小屋を往復通過点として保持。
    '馬返し登山口→八合目避難小屋':{minutes:255,source:'既存確認済みCT・岩手山馬返しルート',sourceType:'verified'},
    '八合目避難小屋→岩手山':{minutes:65,source:'公開標準CT・八合目避難小屋→不動平→岩手山',sourceType:'other'},
    '岩手山→八合目避難小屋':{minutes:27,source:'既存確認済みCT・岩手山馬返しルート',sourceType:'verified'},
    '八合目避難小屋→馬返し登山口':{minutes:145,source:'既存確認済みCT・岩手山馬返しルート',sourceType:'verified'},

    // 甲斐駒ヶ岳: YAMAP仙水峠往復モデルを北沢峠起点へ接続。
    '北沢峠→駒津峰':{minutes:231,source:'YAMAP・仙水峠－駒津峰－甲斐駒ヶ岳モデル＋北沢峠接続',sourceType:'yamap'},
    '駒津峰→甲斐駒ヶ岳':{minutes:91,source:'YAMAP・仙水峠－駒津峰－甲斐駒ヶ岳モデル',sourceType:'yamap'},
    '甲斐駒ヶ岳→駒津峰':{minutes:127,source:'YAMAP・仙水峠－駒津峰－甲斐駒ヶ岳モデル',sourceType:'yamap'},
    '駒津峰→北沢峠':{minutes:81,source:'YAMAP・仙水峠－駒津峰－甲斐駒ヶ岳モデル＋北沢峠接続',sourceType:'yamap'},

    // 西吾妻山: YAMAP 白布峠往復モデルの時刻差。
    '白布峠登山口→西大巓':{minutes:185,source:'YAMAP・白布峠－西大巓－西吾妻山往復モデル',sourceType:'yamap'},
    '西大巓→西吾妻山':{minutes:66,source:'YAMAP・白布峠－西大巓－西吾妻山往復モデル',sourceType:'yamap'},
    '西吾妻山→西大巓':{minutes:140,source:'YAMAP・白布峠－西大巓－西吾妻山往復モデル',sourceType:'yamap'},
    '西大巓→白布峠登山口':{minutes:60,source:'YAMAP・白布峠－西大巓－西吾妻山往復モデル',sourceType:'yamap'},

    // 仙丈ヶ岳: 既存公式系CTを利用した藪沢・馬の背側代表。小屋2点を追加。
    '北沢峠→馬の背ヒュッテ':{minutes:150,source:'南アルプス山岳情報・北沢峠→馬の背ヒュッテ',sourceType:'official'},
    '馬の背ヒュッテ→仙丈小屋':{minutes:60,source:'南アルプス市芦安山岳館・藪沢コース',sourceType:'official'},
    '仙丈小屋→仙丈ヶ岳':{minutes:30,source:'南アルプス市芦安山岳館・藪沢コース',sourceType:'official'},
    '仙丈ヶ岳→仙丈小屋':{minutes:25,source:'YAMAP・仙丈ヶ岳モデル（仙丈小屋区間）',sourceType:'yamap'},
    '仙丈小屋→馬の背ヒュッテ':{minutes:80,source:'YAMAP・仙丈ヶ岳モデル（分岐経由）',sourceType:'yamap'},
    '馬の背ヒュッテ→北沢峠':{minutes:155,source:'公開標準CT・馬の背ヒュッテ→北沢峠',sourceType:'other'},

    // 会津駒ヶ岳: 駒の小屋を中間気象点に追加。
    '滝沢登山口→駒の小屋':{minutes:218,source:'YAMAP・滝沢登山口－駒ノ大池－会津駒ヶ岳モデル',sourceType:'yamap'},
    '駒の小屋→会津駒ヶ岳':{minutes:13,source:'公開標準CT・駒の小屋→会津駒ヶ岳',sourceType:'other'},
    '会津駒ヶ岳→駒の小屋':{minutes:15,source:'公開標準CT・会津駒ヶ岳→駒の小屋',sourceType:'other'},
    '駒の小屋→滝沢登山口':{minutes:145,source:'YAMAP・会津駒ヶ岳モデル区間合算',sourceType:'yamap'},

    // 燧ヶ岳: 御池ルートの湿原を気象通過点化。
    '御池登山口→熊沢田代':{minutes:145,source:'YAMAP・御池登山口－広沢田代－熊沢田代モデル',sourceType:'yamap'},
    '熊沢田代→燧ヶ岳（柴安嵓）':{minutes:86,source:'公開標準CT・熊沢田代→俎嵓→柴安嵓',sourceType:'other'},
    '燧ヶ岳（柴安嵓）→熊沢田代':{minutes:75,source:'公開標準CT・柴安嵓→俎嵓→熊沢田代',sourceType:'other'},
    '熊沢田代→御池登山口':{minutes:70,source:'YAMAP・熊沢田代→広沢田代→御池モデル',sourceType:'yamap'},

    // 荒島岳: YAMAP勝原モデルからシャクナゲ平を追加。
    '勝原コース登山口→シャクナゲ平':{minutes:165,source:'YAMAP・勝原登山口－シャクナゲ平モデル',sourceType:'yamap'},
    'シャクナゲ平→荒島岳':{minutes:83,source:'YAMAP・勝原コース公開チェックポイント合算',sourceType:'yamap'},
    '荒島岳→シャクナゲ平':{minutes:61,source:'YAMAP・勝原コース公開チェックポイント合算',sourceType:'yamap'},
    'シャクナゲ平→勝原コース登山口':{minutes:159,source:'YAMAP・勝原登山口－シャクナゲ平モデル',sourceType:'yamap'},

    // 嘉津宇岳: 沖縄観光情報の公開案内（登山口から山頂約30分）。
    '嘉津宇岳登山口→嘉津宇岳':{minutes:30,source:'沖縄観光情報・嘉津宇岳 登山口から山頂約30分',sourceType:'official'},
    '嘉津宇岳→嘉津宇岳登山口':{minutes:30,source:'公開コース案内・同一道往復の目安',sourceType:'other'}
  });

  try {
    if (typeof directCourseTimeInfoByNames === 'function') {
      const originalDirectCourseTimeInfoByNamesV1582=directCourseTimeInfoByNames;
      directCourseTimeInfoByNames=function(fromName,toName){
        const hit=V1582_COURSE_TIMES[`${String(fromName||'').trim()}→${String(toName||'').trim()}`];
        return hit||originalDirectCourseTimeInfoByNamesV1582(fromName,toName);
      };
    }
  } catch (_) {}
  try {
    if (typeof courseTimeInfo === 'function') {
      const originalCourseTimeInfoV1582=courseTimeInfo;
      courseTimeInfo=function(fromPoint,toPoint){
        const key=`${String(fromPoint?.name||'').trim()}→${String(toPoint?.name||'').trim()}`;
        return V1582_COURSE_TIMES[key]||originalCourseTimeInfoV1582(fromPoint,toPoint);
      };
    }
  } catch (_) {}

  // Add 荒島岳 point after wrappers so weather coordinate is fixed before representative expansion.
  try {
    if (typeof appendFixedWaypoints === 'function') appendFixedWaypoints('荒島岳',[
      {id:'v1582-arashima-shakunage',type:'pass',name:'シャクナゲ平',lat:35.9506,lon:136.5967,elevation:1204,source:'公開登山地図・シャクナゲ平'}
    ]);
  } catch (_) {}

  if (typeof representativeCourseOptions === 'function') {
    const originalRepresentativeCourseOptionsV1582=representativeCourseOptions;
    representativeCourseOptions=function(mountain){
      let key=String(mountain||'').trim();
      try { key=canonicalMountainName(key); } catch (_) {}
      let options=originalRepresentativeCourseOptionsV1582(mountain)||[];
      const replacements={
        '雲取山':{label:'鴨沢ルート',points:[['trailhead','鴨沢登山口','登山口'],['hut','七ツ石小屋','山小屋'],['peak','七ツ石山','通過ピーク'],['peak','雲取山','山頂'],['trailhead','鴨沢登山口','下山口']]},
        '妙高山':{label:'笹ヶ峰ルート',points:[['trailhead','笹ヶ峰登山口','登山口'],['hut','黒沢池ヒュッテ','山小屋'],['peak','妙高山','山頂'],['hut','黒沢池ヒュッテ','山小屋'],['trailhead','笹ヶ峰登山口','下山口']]},
        '岩手山':{label:'馬返し登山口ルート',points:[['trailhead','馬返し登山口','登山口'],['hut','八合目避難小屋','避難小屋'],['peak','岩手山','山頂'],['hut','八合目避難小屋','避難小屋'],['trailhead','馬返し登山口','下山口']]},
        '甲斐駒ヶ岳':{label:'北沢峠ルート',points:[['trailhead','北沢峠','登山口'],['peak','駒津峰','通過ピーク'],['peak','甲斐駒ヶ岳','山頂'],['peak','駒津峰','通過ピーク'],['trailhead','北沢峠','下山口']]},
        '西吾妻山':{label:'白布峠登山口ルート',points:[['trailhead','白布峠登山口','登山口'],['peak','西大巓','通過ピーク'],['peak','西吾妻山','山頂'],['peak','西大巓','通過ピーク'],['trailhead','白布峠登山口','下山口']]},
        '仙丈ヶ岳':{label:'北沢峠・藪沢馬の背ルート',points:[['trailhead','北沢峠','登山口'],['hut','馬の背ヒュッテ','山小屋'],['hut','仙丈小屋','山小屋'],['peak','仙丈ヶ岳','山頂'],['hut','仙丈小屋','山小屋'],['hut','馬の背ヒュッテ','山小屋'],['trailhead','北沢峠','下山口']]},
        '会津駒ヶ岳':{label:'滝沢ルート',points:[['trailhead','滝沢登山口','登山口'],['hut','駒の小屋','山小屋'],['peak','会津駒ヶ岳','山頂'],['hut','駒の小屋','山小屋'],['trailhead','滝沢登山口','下山口']]},
        '燧ヶ岳':{label:'御池登山口ルート',points:[['trailhead','御池登山口','登山口'],['pass','熊沢田代','湿原'],['peak','燧ヶ岳（柴安嵓）','山頂'],['pass','熊沢田代','湿原'],['trailhead','御池登山口','下山口']]},
        '荒島岳':{label:'勝原コースルート',points:[['trailhead','勝原コース登山口','登山口'],['pass','シャクナゲ平','主要分岐'],['peak','荒島岳','山頂'],['pass','シャクナゲ平','主要分岐'],['trailhead','勝原コース登山口','下山口']]},
        '嘉津宇岳':{label:'嘉津宇岳登山口ルート',points:[['trailhead','嘉津宇岳登山口','登山口'],['peak','嘉津宇岳','山頂'],['trailhead','嘉津宇岳登山口','下山口']]}
      };
      const rep=replacements[key];
      if(rep){
        const route={...rep,source:'V1.5.82 public CT enrichment',verified:true};
        const idx=options.findIndex(c=>c?.label===rep.label);
        if(idx>=0) options=options.map((c,i)=>i===idx?route:c);
        else options=[route,...options];
      }
      return options;
    };
  }

  window.TRATEN_HYAKU_ENRICHMENT_V1582=Object.freeze({
    enriched:Object.freeze({
      '雲取山':['七ツ石小屋','七ツ石山'],
      '妙高山':['黒沢池ヒュッテ（往復）'],
      '岩手山':['八合目避難小屋（往復）'],
      '甲斐駒ヶ岳':['駒津峰'],
      '西吾妻山':['西大巓'],
      '仙丈ヶ岳':['馬の背ヒュッテ','仙丈小屋'],
      '会津駒ヶ岳':['駒の小屋'],
      '燧ヶ岳':['熊沢田代'],
      '荒島岳':['シャクナゲ平'],
      '嘉津宇岳':['嘉津宇岳登山口','嘉津宇岳']
    }),
    priorityBCompleted:9,
    policy:'public-verified-ct-only / no geometric estimation'
  });
})();
