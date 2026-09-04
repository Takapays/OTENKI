// Traten V1.5.83: 日本百名山 representative-route enrichment, priority-B batch 2.
// Policy: public/verified segment CT only. No geometric interpolation.
(function(){
  'use strict';

  const FIXED_V1583 = Object.freeze({
    '飯豊山':[
      {id:'v1583-iide-honzan',type:'hut',name:'本山小屋',lat:37.853333,lon:139.713889,elevation:2101,source:'PORTALFIELD公開位置情報・本山小屋'}
    ],
    '大朝日岳':[
      {id:'v1583-oasahi-hut',type:'hut',name:'大朝日岳山頂避難小屋',lat:38.2607,lon:139.9209,elevation:1780,source:'朝日鉱泉公開案内・山頂直下避難小屋位置'}
    ],
    '皇海山':[
      {id:'v1583-sukai-koshin-peak',type:'peak',name:'庚申山',lat:36.673056,lon:139.361111,elevation:1892,source:'国土地理院・庚申山'}
    ],
    '甲武信ヶ岳':[
      {id:'v1583-kobushi-hut',type:'hut',name:'甲武信小屋',lat:35.906944,lon:138.730556,elevation:2360,source:'PORTALFIELD公開位置情報・甲武信小屋'}
    ]
  });

  try {
    for (const [mountain,points] of Object.entries(FIXED_V1583)) {
      if (typeof appendFixedWaypoints === 'function') appendFixedWaypoints(mountain,points);
      else if (typeof BUILTIN_ROUTE_CATALOG !== 'undefined') {
        const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
        const add=points.filter(p=>!old.some(x=>x.name===p.name&&x.type===p.type));
        BUILTIN_ROUTE_CATALOG[mountain]=[...old,...add];
      }
    }
  } catch (_) {}

  const T = Object.freeze({
    // 飯豊山: existing verified 大日杉→切合 445m + Yamareco standard segments around 本山小屋.
    '大日杉登山口→切合小屋':{minutes:445,source:'既存確認済みCT・大日杉→切合小屋',sourceType:'verified'},
    '切合小屋→本山小屋':{minutes:121,source:'ヤマレコ標準コースタイム区間合算・切合小屋→本山小屋',sourceType:'yamareco'},
    '本山小屋→飯豊山':{minutes:14,source:'ヤマレコ標準コースタイム・本山小屋→飯豊山',sourceType:'yamareco'},
    '飯豊山→本山小屋':{minutes:5,source:'ヤマレコ標準コースタイム・飯豊山→本山小屋',sourceType:'yamareco'},
    '本山小屋→切合小屋':{minutes:92,source:'ヤマレコ標準コースタイム区間合算・本山小屋→切合小屋',sourceType:'yamareco'},
    '飯豊山→大日杉登山口':{minutes:425,source:'既存確認済み下山CT・飯豊山→大日杉',sourceType:'verified'},

    // 大朝日岳: existing 日暮沢/竜門 split + official summit hut relation.
    '日暮沢登山口駐車場（日暮沢小屋）→竜門小屋':{minutes:367,source:'既存確認済みCT・日暮沢→竜門小屋',sourceType:'verified'},
    '竜門小屋→大朝日岳山頂避難小屋':{minutes:180,source:'朝日鉱泉公式・竜門山避難小屋→大朝日岳山頂避難小屋 3時間',sourceType:'official'},
    '大朝日岳山頂避難小屋→大朝日岳':{minutes:20,source:'朝日鉱泉公式・山頂避難小屋→大朝日岳 約20分',sourceType:'official'},
    '大朝日岳→大朝日岳山頂避難小屋':{minutes:10,source:'朝日鉱泉公式・大朝日岳→山頂避難小屋 約10分',sourceType:'official'},
    '大朝日岳→日暮沢登山口駐車場（日暮沢小屋）':{minutes:340,source:'既存確認済み下山CT・大朝日岳→日暮沢',sourceType:'verified'},

    // 皇海山: current YAMAP model split at 庚申山.
    '銀山平・皇海山登山者駐車場→庚申山荘（避難小屋）':{minutes:201,source:'YAMAPモデル・銀山平→庚申山荘',sourceType:'yamap'},
    '庚申山荘（避難小屋）→庚申山':{minutes:45,source:'YAMAPモデル・庚申山荘→庚申山',sourceType:'yamap'},
    '庚申山→皇海山':{minutes:237,source:'YAMAPモデル・庚申山→鋸山→皇海山区間合算',sourceType:'yamap'},
    '皇海山→銀山平・皇海山登山者駐車場':{minutes:394,source:'既存確認済みCT・皇海山→銀山平',sourceType:'verified'},

    // 磐梯山: existing verified 八方台 / 弘法清水 split.
    '八方台登山口→弘法清水小屋':{minutes:125,source:'既存確認済みCT・八方台→弘法清水小屋',sourceType:'verified'},
    '弘法清水小屋→磐梯山':{minutes:40,source:'既存確認済みCT・弘法清水小屋→磐梯山',sourceType:'verified'},
    '磐梯山→弘法清水小屋':{minutes:22,source:'既存確認済みCT・磐梯山→弘法清水小屋',sourceType:'verified'},
    '弘法清水小屋→八方台登山口':{minutes:86,source:'既存確認済みCT・弘法清水小屋→八方台',sourceType:'verified'},

    // 鳥海山: existing full 鉾立 CT, split at 御浜 using current public model timings.
    '鉾立登山口（象潟口）→御浜小屋':{minutes:92,source:'YAMAP公開モデル・鉾立→御浜小屋区間合算',sourceType:'yamap'},
    '御浜小屋→鳥海山（新山）':{minutes:214,source:'既存確認済み鉾立→新山306分から鉾立→御浜92分を差引',sourceType:'derived-verified'},
    '鳥海山（新山）→御浜小屋':{minutes:115,source:'YAMAP公開モデル・新山→御浜小屋区間合算',sourceType:'yamap'},
    '御浜小屋→鉾立登山口（象潟口）':{minutes:88,source:'既存確認済み新山→鉾立203分から新山→御浜115分を差引',sourceType:'derived-verified'},

    // 甲武信ヶ岳: existing full CT split at 甲武信小屋.
    '毛木平登山口→甲武信小屋':{minutes:225,source:'川上村公式系既存CT240分から甲武信小屋→山頂15分を差引',sourceType:'derived-verified'},
    '甲武信小屋→甲武信ヶ岳':{minutes:15,source:'YAMAPモデル・甲武信小屋→甲武信ヶ岳',sourceType:'yamap'},
    '甲武信ヶ岳→甲武信小屋':{minutes:20,source:'YAMAPモデル・甲武信ヶ岳→甲武信小屋',sourceType:'yamap'},
    '甲武信小屋→毛木平登山口':{minutes:148,source:'既存確認済み下山168分から山頂→甲武信小屋20分を差引',sourceType:'derived-verified'}
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
        '飯豊山':{label:'大日杉登山口ルート',points:[['trailhead','大日杉登山口','登山口'],['hut','切合小屋','山小屋'],['hut','本山小屋','山小屋'],['peak','飯豊山','山頂'],['hut','本山小屋','山小屋'],['hut','切合小屋','山小屋'],['trailhead','大日杉登山口','下山口']]},
        '大朝日岳':{label:'日暮沢・竜門ルート',points:[['trailhead','日暮沢登山口駐車場（日暮沢小屋）','登山口'],['hut','竜門小屋','避難小屋'],['hut','大朝日岳山頂避難小屋','避難小屋'],['peak','大朝日岳','山頂'],['trailhead','日暮沢登山口駐車場（日暮沢小屋）','下山口']]},
        '皇海山':{label:'銀山平・庚申山ルート',points:[['trailhead','銀山平・皇海山登山者駐車場','登山口'],['hut','庚申山荘（避難小屋）','避難小屋'],['peak','庚申山','通過ピーク'],['peak','皇海山','山頂'],['trailhead','銀山平・皇海山登山者駐車場','下山口']]},
        '鳥海山':{label:'鉾立・御浜ルート',points:[['trailhead','鉾立登山口（象潟口）','登山口'],['hut','御浜小屋','山小屋'],['peak','鳥海山（新山）','山頂'],['hut','御浜小屋','山小屋'],['trailhead','鉾立登山口（象潟口）','下山口']]},
        '甲武信ヶ岳':{label:'毛木平・甲武信小屋ルート',points:[['trailhead','毛木平登山口','登山口'],['hut','甲武信小屋','山小屋'],['peak','甲武信ヶ岳','山頂'],['hut','甲武信小屋','山小屋'],['trailhead','毛木平登山口','下山口']]}
      };
      const rep=R[key]; if(!rep) return options;
      const route={...rep,source:'V1.5.83 public CT enrichment',verified:true};
      return [route,...options.filter(c=>c?.label!==rep.label)];
    };
  }

  window.TRATEN_HYAKU_ENRICHMENT_V1583=Object.freeze({
    enriched:Object.freeze({
      '飯豊山':['切合小屋','本山小屋'],
      '大朝日岳':['竜門小屋','大朝日岳山頂避難小屋'],
      '皇海山':['庚申山荘（避難小屋）','庚申山'],
      '鳥海山':['御浜小屋'],
      '甲武信ヶ岳':['甲武信小屋']
    }),
    policy:'public-verified-ct-only / no geometric estimation'
  });
})();
