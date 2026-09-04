// Traten V1.5.84: 日本百名山 representative-route enrichment, Priority-B completion batch.
// Policy: public/verified segment CT only; no distance/elevation CT estimation.
(function(){
  'use strict';

  // Fixed weather-check waypoints newly exposed by representative routes.
  // Coordinates are route-map / public-map aligned representative positions; CT values are sourced independently below.
  const FIXED_V1584 = Object.freeze({
    '磐梯山':[
      {id:'v1584-bandai-happodai',type:'trailhead',name:'八方台登山口',lat:37.614343,lon:140.048326,elevation:1194,source:'既存固定候補・八方台登山口'},
      {id:'v1584-bandai-koboshimizu',type:'waypoint',name:'弘法清水小屋',lat:37.60495,lon:140.07195,elevation:1630,source:'磐梯山公式登山マップ・弘法清水小屋位置'}
    ],
    '雨飾山':[
      {id:'v1584-amakazari-arasugesawa',type:'waypoint',name:'荒菅沢',lat:36.8924,lon:137.9707,elevation:1448,source:'環境省公開ルート図・雨飾山 荒菅沢'}
    ],
    '男体山':[
      {id:'v1584-nantai-takino8',type:'waypoint',name:'八合目 瀧尾神社',lat:36.7579,lon:139.4896,elevation:2200,source:'YAMAP公開モデル・男体山 八合目 瀧尾神社'}
    ]
  });

  try {
    for (const [mountain,points] of Object.entries(FIXED_V1584)) {
      if (typeof appendFixedWaypoints === 'function') appendFixedWaypoints(mountain,points);
      else if (typeof BUILTIN_ROUTE_CATALOG !== 'undefined') {
        const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
        const add=points.filter(p=>!old.some(x=>x.name===p.name&&x.type===p.type));
        BUILTIN_ROUTE_CATALOG[mountain]=[...old,...add];
      }
    }
  } catch (_) {}

  const T = Object.freeze({
    // 磐梯山: 猪苗代観光協会公式登山マップ。八方台コース total 2:15 up / 1:40 down.
    // Map detail: 八方台→中ノ湯35, 中ノ湯→弘法清水70, 弘法清水→山頂30 / reverse 20+55+25.
    '八方台登山口→弘法清水小屋':{minutes:105,source:'猪苗代観光協会公式・磐梯山登山マップ（八方台→中ノ湯35分＋中ノ湯→弘法清水70分）',sourceType:'official'},
    '弘法清水小屋→磐梯山':{minutes:30,source:'猪苗代観光協会公式・磐梯山登山マップ（弘法清水→山頂30分）',sourceType:'official'},
    '磐梯山→弘法清水小屋':{minutes:20,source:'猪苗代観光協会公式・磐梯山登山マップ（山頂→弘法清水20分）',sourceType:'official'},
    '弘法清水小屋→八方台登山口':{minutes:80,source:'猪苗代観光協会公式・磐梯山登山マップ（弘法清水→中ノ湯55分＋中ノ湯→八方台25分）',sourceType:'official'},

    // 雨飾山: existing verified full CT 240/185 + Ministry of Environment official camp↔荒菅沢 split.
    '雨飾高原キャンプ場登山口→荒菅沢':{minutes:110,source:'環境省・妙高戸隠連山国立公園 雨飾山（荒菅沢まで） 上り約1時間50分',sourceType:'official'},
    '荒菅沢→雨飾山':{minutes:130,source:'既存確認済み雨飾高原→雨飾山240分から公式登山口→荒菅沢110分を差引',sourceType:'derived-verified'},
    '雨飾山→荒菅沢':{minutes:90,source:'既存確認済み雨飾山→雨飾高原185分から公式荒菅沢→登山口95分を差引',sourceType:'derived-verified'},
    '荒菅沢→雨飾高原キャンプ場登山口':{minutes:95,source:'環境省・妙高戸隠連山国立公園 雨飾山（荒菅沢まで） 下り約1時間35分',sourceType:'official'},

    // 男体山: current YAMAP representative model checkpoints, preserving exact public model total 6:44.
    // 登拝門→三合目45→四合目25→瀧尾神社105 =175; 瀧尾神社→奥宮60→男体山2 =62.
    // Down: 男体山→奥宮2→瀧尾神社35 =37; 瀧尾神社→四合目80→三合目20→登拝門30 =130.
    '二荒山神社中宮祠登山口→八合目 瀧尾神社':{minutes:175,source:'YAMAP公開モデル・二荒山神社-男体山往復（登拝門→三合目45分→四合目25分→瀧尾神社105分）',sourceType:'yamap'},
    '八合目 瀧尾神社→男体山':{minutes:62,source:'YAMAP公開モデル・男体山（瀧尾神社→奥宮60分＋奥宮→男体山2分）',sourceType:'yamap'},
    '男体山→八合目 瀧尾神社':{minutes:37,source:'YAMAP公開モデル・男体山（男体山→奥宮2分＋奥宮→瀧尾神社35分）',sourceType:'yamap'},
    '八合目 瀧尾神社→二荒山神社中宮祠登山口':{minutes:130,source:'YAMAP公開モデル・男体山（瀧尾神社→四合目80分→三合目20分→登拝門30分）',sourceType:'yamap'},

    // 聖岳: route already owns verified 聖平小屋 CTs. Add the hut on descent too.
    '椹島→聖平小屋':{minutes:321,source:'既存確認済みCT・椹島→聖平小屋',sourceType:'derived-verified'},
    '聖平小屋→聖岳':{minutes:179,source:'既存確認済みCT・聖平小屋→聖岳',sourceType:'yamareco'},
    '聖岳→聖平小屋':{minutes:104,source:'既存確認済みCT・聖岳→聖平小屋',sourceType:'yamareco'},
    '聖平小屋→椹島':{minutes:256,source:'既存確認済み聖岳→椹島360分から聖岳→聖平小屋104分を差引',sourceType:'derived-verified'}
  });

  try {
    if (typeof directCourseTimeInfoByNames === 'function') {
      const orig=directCourseTimeInfoByNames;
      directCourseTimeInfoByNames=function(a,b){return T[`${String(a||'').trim()}→${String(b||'').trim()}`]||orig(a,b);};
    }
  } catch (_) {}
  try {
    if (typeof courseTimeInfo === 'function') {
      const orig=courseTimeInfo;
      courseTimeInfo=function(a,b){return T[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||orig(a,b);};
    }
  } catch (_) {}

  if (typeof representativeCourseOptions === 'function') {
    const orig=representativeCourseOptions;
    representativeCourseOptions=function(mountain){
      let key=String(mountain||'').trim(); try{key=canonicalMountainName(key);}catch(_){}
      let options=orig(mountain)||[];
      const R={
        '磐梯山':{label:'八方台・弘法清水ルート',points:[['trailhead','八方台登山口','登山口'],['waypoint','弘法清水小屋','山小屋'],['peak','磐梯山','山頂'],['waypoint','弘法清水小屋','山小屋'],['trailhead','八方台登山口','下山口']]},
        '雨飾山':{label:'雨飾高原・荒菅沢ルート',points:[['trailhead','雨飾高原キャンプ場登山口','登山口'],['waypoint','荒菅沢','通過ポイント'],['peak','雨飾山','山頂'],['waypoint','荒菅沢','通過ポイント'],['trailhead','雨飾高原キャンプ場登山口','下山口']]},
        '男体山':{label:'二荒山神社中宮祠・八合目ルート',points:[['trailhead','二荒山神社中宮祠登山口','登山口'],['waypoint','八合目 瀧尾神社','通過ポイント'],['peak','男体山','山頂'],['waypoint','八合目 瀧尾神社','通過ポイント'],['trailhead','二荒山神社中宮祠登山口','下山口']]},
        '聖岳':{label:'椹島・聖平ルート',points:[['trailhead','椹島','登山口'],['hut','聖平小屋','山小屋'],['peak','聖岳','山頂'],['hut','聖平小屋','山小屋'],['trailhead','椹島','下山口']]}
      };
      const rep=R[key]; if(!rep) return options;
      const route={...rep,source:'V1.5.84 public CT enrichment',verified:true};
      return [route,...options.filter(c=>c?.label!==rep.label)];
    };
  }

  window.TRATEN_HYAKU_ENRICHMENT_V1584=Object.freeze({
    enriched:Object.freeze({
      '磐梯山':['弘法清水小屋'],
      '雨飾山':['荒菅沢'],
      '男体山':['八合目 瀧尾神社'],
      '聖岳':['聖平小屋（復路にも明示）']
    }),
    priorityBComplete:true,
    policy:'public-verified-ct-only / no geometric CT estimation'
  });
})();
