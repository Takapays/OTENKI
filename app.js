const $ = id => document.getElementById(id);
const APP_VERSION = '1.7.6';

const providers = [
  {id:'jma',name:'JMA MSM',kind:'openmeteo',endpoint:'https://api.open-meteo.com/v1/jma',model:'jma_msm',forecastDays:4,vars:['temperature_2m','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_direction_10m']},
  {id:'ecmwf',name:'ECMWF IFS',kind:'openmeteo',endpoint:'https://api.open-meteo.com/v1/ecmwf',forecastDays:15,vars:['temperature_2m','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_gusts_10m','wind_direction_10m','cape','visibility','freezing_level_height']},
  {id:'gfs',name:'GFS',kind:'openmeteo',endpoint:'https://api.open-meteo.com/v1/gfs',forecastDays:16,vars:['temperature_2m','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_gusts_10m','wind_direction_10m','cape','visibility','freezing_level_height']},
  {id:'icon',name:'ICON',kind:'openmeteo',endpoint:'https://api.open-meteo.com/v1/dwd-icon',forecastDays:8,vars:['temperature_2m','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_gusts_10m','wind_direction_10m','cape','visibility','freezing_level_height']}
];
const TYPE_LABEL={trailhead:'登山口・下山口',peak:'山頂',hut:'山小屋・避難小屋'};
const MOUNTAIN_PRESETS = {
  '槍ヶ岳': {latitude:36.3419, longitude:137.6476},
  '奥穂高岳': {latitude:36.2892, longitude:137.6480},
  '北穂高岳': {latitude:36.3028, longitude:137.6511},
  '前穂高岳': {latitude:36.2819, longitude:137.6606},
  '燕岳': {latitude:36.4069, longitude:137.7129},
  '大天井岳': {latitude:36.3658, longitude:137.7027},
  '常念岳': {latitude:36.3255, longitude:137.7273},
  '双六岳': {latitude:36.3723, longitude:137.5875},
  '白馬岳': {latitude:36.7585, longitude:137.7586},
  '唐松岳': {latitude:36.6874, longitude:137.7547},
  '五竜岳': {latitude:36.6584, longitude:137.7526},
  '南岳': {latitude:36.3183, longitude:137.6519},
  '鹿島槍ヶ岳': {latitude:36.6244, longitude:137.7467},
  '剱岳': {latitude:36.6233, longitude:137.6170},
  '立山': {latitude:36.5759, longitude:137.6197},
  '北岳': {latitude:35.6745, longitude:138.2389},
  '間ノ岳': {latitude:35.6461, longitude:138.2283},
  '甲斐駒ヶ岳': {latitude:35.7578, longitude:138.2368},
  '仙丈ヶ岳': {latitude:35.7201, longitude:138.1836},
  '富士山': {latitude:35.3606, longitude:138.7274},
  '赤岳': {latitude:35.9708, longitude:138.3701},
  '谷川岳': {latitude:36.8370, longitude:138.9300},
  '木曽駒ヶ岳': {latitude:35.7895, longitude:137.8047},
  '御嶽山': {latitude:35.8929, longitude:137.4803},
  '大山': {latitude:35.3711, longitude:133.5462},
  '石鎚山': {latitude:33.7679, longitude:133.1150},
  '宮之浦岳': {latitude:30.3362, longitude:130.5042}
};
const BUILTIN_ROUTE_CATALOG = {
  '槍ヶ岳': [
    // V4.8: 主要ポイントは座標・標高を内蔵し、名称検索に依存しない。
    {id:'builtin-yari-shinhotaka', type:'trailhead', name:'新穂高温泉', search:'新穂高温泉 登山口', lat:36.285405, lon:137.575014, elevation:1117},
    {id:'builtin-yari-kamikochi', type:'trailhead', name:'上高地', search:'上高地 バスターミナル', lat:36.246656, lon:137.635388, elevation:1505},
    {id:'builtin-yari-yokoo', type:'hut', name:'横尾山荘', search:'横尾山荘', lat:36.293444, lon:137.699175, elevation:1600},
    {id:'builtin-yari-yarisawa', type:'hut', name:'槍沢ロッヂ', search:'槍沢ロッヂ', lat:36.318056, lon:137.681111, elevation:1825},
    {id:'builtin-yari-yaridaira', type:'hut', name:'槍平小屋', search:'槍平小屋', lat:36.323220, lon:137.629910, elevation:1990},
    {id:'builtin-yari-yarigatake-sanso', type:'hut', name:'槍ヶ岳山荘', search:'槍ヶ岳山荘', lat:36.340939, lon:137.645795, elevation:3080},
    {id:'builtin-yari-yaridaira-camp', type:'camp', name:'槍平小屋テント場', search:'槍平小屋 テント場', lat:36.323220, lon:137.629910, elevation:1990},
    {id:'builtin-yari-yarigatake-camp', type:'camp', name:'槍ヶ岳山荘テント場', search:'槍ヶ岳山荘 テント場', lat:36.340939, lon:137.645795, elevation:3080},
    {id:'builtin-yari-senjo', type:'pass', name:'千丈乗越', search:'千丈乗越', lat:36.342275, lon:137.636036, elevation:2723},
    {id:'builtin-yari-hida', type:'pass', name:'飛騨乗越', search:'飛騨乗越', lat:36.338833, lon:137.645806, elevation:3020},
    {id:'builtin-yari-peak', type:'peak', name:'槍ヶ岳', search:'槍ヶ岳', lat:36.342009, lon:137.647735, elevation:3180}
  ],
  '奥穂高岳': [
    {id:'builtin-oku-kamikochi',type:'trailhead',name:'上高地',lat:36.246656,lon:137.635388,elevation:1505},
    {id:'builtin-oku-yokoo',type:'hut',name:'横尾山荘',lat:36.293444,lon:137.699175,elevation:1600},
    {id:'builtin-oku-karasawa',type:'hut',name:'涸沢ヒュッテ',lat:36.3008,lon:137.6668,elevation:2309},
    {id:'builtin-oku-hotaka',type:'hut',name:'穂高岳山荘',lat:36.2950,lon:137.6484,elevation:2996},
    {id:'builtin-oku-peak',type:'peak',name:'奥穂高岳',lat:36.2892,lon:137.6480,elevation:3190}
  ],
  '燕岳': [
    {id:'builtin-tsuba-nakabusa',type:'trailhead',name:'中房温泉登山口',lat:36.3929,lon:137.7485,elevation:1462},
    {id:'builtin-tsuba-kassen',type:'hut',name:'合戦小屋',lat:36.4009,lon:137.7258,elevation:2380},
    {id:'builtin-tsuba-enza',type:'hut',name:'燕山荘',lat:36.4073,lon:137.7152,elevation:2712},
    {id:'builtin-tsuba-peak',type:'peak',name:'燕岳',lat:36.4069,lon:137.7129,elevation:2763}
  ],
  '常念岳': [
    {id:'builtin-jonen-hito',type:'trailhead',name:'一ノ沢登山口',lat:36.3388,lon:137.7420,elevation:1320},
    {id:'builtin-jonen-nokkoshi',type:'pass',name:'常念乗越',lat:36.3305,lon:137.7272,elevation:2466},
    {id:'builtin-jonen-goya',type:'hut',name:'常念小屋',lat:36.3297,lon:137.7281,elevation:2450},
    {id:'builtin-jonen-peak',type:'peak',name:'常念岳',lat:36.3255,lon:137.7273,elevation:2857}
  ],
  '白馬岳': [
    {id:'builtin-hakuba-sarukura',type:'trailhead',name:'猿倉',lat:36.6974,lon:137.8182,elevation:1230},
    {id:'builtin-hakuba-shirouma',type:'hut',name:'白馬尻小屋跡',lat:36.7145,lon:137.7968,elevation:1560},
    {id:'builtin-hakuba-sanso',type:'hut',name:'白馬山荘',lat:36.7566,lon:137.7569,elevation:2832},
    {id:'builtin-hakuba-peak',type:'peak',name:'白馬岳',lat:36.7585,lon:137.7586,elevation:2932}
  ],
  '唐松岳': [
    {id:'builtin-kara-happo',type:'trailhead',name:'八方池山荘',lat:36.7030,lon:137.7893,elevation:1830},
    {id:'builtin-kara-happoike',type:'pass',name:'八方池',lat:36.6967,lon:137.7757,elevation:2060},
    {id:'builtin-kara-goya',type:'hut',name:'唐松岳頂上山荘',lat:36.6878,lon:137.7576,elevation:2620},
    {id:'builtin-kara-peak',type:'peak',name:'唐松岳',lat:36.6874,lon:137.7547,elevation:2696}
  ],
  '剱岳': [
    {id:'builtin-tsuru-murodo',type:'trailhead',name:'室堂',lat:36.5779,lon:137.5950,elevation:2450},
    {id:'builtin-tsuru-tsurugi',type:'hut',name:'剱澤小屋',lat:36.6047,lon:137.6177,elevation:2470},
    {id:'builtin-tsuru-kensanso',type:'hut',name:'剣山荘',lat:36.6108,lon:137.6208,elevation:2475},
    {id:'builtin-tsuru-peak',type:'peak',name:'剱岳',lat:36.6233,lon:137.6170,elevation:2999}
  ],
  '立山': [
    {id:'builtin-tate-murodo',type:'trailhead',name:'室堂',lat:36.5779,lon:137.5950,elevation:2450},
    {id:'builtin-tate-ichinokoshi',type:'hut',name:'一の越山荘',lat:36.5722,lon:137.6086,elevation:2700},
    {id:'builtin-tate-oyama',type:'peak',name:'雄山',lat:36.5759,lon:137.6197,elevation:3003}
  ],
  '北岳': [
    {id:'builtin-kita-hirokawara',type:'trailhead',name:'広河原',lat:35.6867,lon:138.2705,elevation:1520},
    {id:'builtin-kita-shiraneoike',type:'hut',name:'白根御池小屋',lat:35.6820,lon:138.2512,elevation:2236},
    {id:'builtin-kita-katanokoya',type:'hut',name:'北岳肩の小屋',lat:35.6771,lon:138.2405,elevation:3000},
    {id:'builtin-kita-peak',type:'peak',name:'北岳',lat:35.6745,lon:138.2389,elevation:3193}
  ],
  '富士山': [
    {id:'builtin-fuji-subaru',type:'trailhead',name:'富士スバルライン五合目',lat:35.3948,lon:138.7332,elevation:2305},
    {id:'builtin-fuji-yoshida7',type:'hut',name:'吉田口七合目',lat:35.3817,lon:138.7317,elevation:2700},
    {id:'builtin-fuji-hachigo',type:'hut',name:'八合目',lat:35.3719,lon:138.7315,elevation:3100},
    {id:'builtin-fuji-peak',type:'peak',name:'富士山（剣ヶ峰）',lat:35.3606,lon:138.7274,elevation:3776}
  ],
  '赤岳': [
    {id:'builtin-aka-minoto',type:'trailhead',name:'美濃戸口',lat:35.9978,lon:138.3079,elevation:1490},
    {id:'builtin-aka-akadakekosen',type:'hut',name:'赤岳鉱泉',lat:35.9861,lon:138.3504,elevation:2220},
    {id:'builtin-aka-gyojagoya',type:'hut',name:'行者小屋',lat:35.9772,lon:138.3572,elevation:2350},
    {id:'builtin-aka-peak',type:'peak',name:'赤岳',lat:35.9708,lon:138.3701,elevation:2899}
  ],
  '谷川岳': [
    {id:'builtin-tani-ropeway',type:'trailhead',name:'天神平',lat:36.8196,lon:138.9490,elevation:1319},
    {id:'builtin-tani-kumaano',type:'hut',name:'熊穴沢避難小屋',lat:36.8280,lon:138.9446,elevation:1465},
    {id:'builtin-tani-tomano',type:'peak',name:'トマノ耳',lat:36.8362,lon:138.9309,elevation:1963},
    {id:'builtin-tani-oki',type:'peak',name:'谷川岳 オキノ耳',lat:36.8370,lon:138.9300,elevation:1977}
  ],
  '双六岳': [
    {id:'builtin-sugoroku-shinhotaka',type:'trailhead',name:'新穂高温泉',lat:36.285405,lon:137.575014,elevation:1117},
    {id:'builtin-sugoroku-wasabidaira',type:'hut',name:'わさび平小屋',lat:36.3075,lon:137.5925,elevation:1402},
    {id:'builtin-sugoroku-kagamidaira',type:'hut',name:'鏡平山荘',lat:36.3388,lon:137.5888,elevation:2300},
    {id:'builtin-sugoroku-goya',type:'hut',name:'双六小屋',lat:36.3745,lon:137.5920,elevation:2550},
    {id:'builtin-sugoroku-peak',type:'peak',name:'双六岳',lat:36.3723,lon:137.5875,elevation:2860}
  ],
  '鹿島槍ヶ岳': [
    {id:'builtin-kashima-ogisawa',type:'trailhead',name:'扇沢登山口',lat:36.558056,lon:137.721389,elevation:1430},
    {id:'builtin-kashima-otani',type:'trailhead',name:'大谷原登山口',lat:36.604167,lon:137.800000,elevation:1070},
    {id:'builtin-kashima-taneike',type:'hut',name:'種池山荘',lat:36.5769,lon:137.7039,elevation:2450},
    {id:'builtin-kashima-tsumetaike',type:'hut',name:'冷池山荘',lat:36.6049,lon:137.7168,elevation:2410},
    {id:'builtin-kashima-kiretto',type:'hut',name:'キレット小屋',lat:36.6410,lon:137.7384,elevation:2470},
    {id:'builtin-kashima-peak',type:'peak',name:'鹿島槍ヶ岳',lat:36.6244,lon:137.7467,elevation:2889}
  ],
  '間ノ岳': [
    {id:'builtin-ainodake-hirokawara',type:'trailhead',name:'広河原',lat:35.6867,lon:138.2705,elevation:1520},
    {id:'builtin-ainodake-kitadake-sanso',type:'hut',name:'北岳山荘',lat:35.6585,lon:138.2315,elevation:2900},
    {id:'builtin-ainodake-kumanodaira',type:'hut',name:'熊ノ平小屋',lat:35.6176,lon:138.2276,elevation:2450},
    {id:'builtin-ainodake-peak',type:'peak',name:'間ノ岳',lat:35.6461,lon:138.2283,elevation:3190}
  ],
  '甲斐駒ヶ岳': [
    {id:'builtin-kaikoma-kitazawa',type:'trailhead',name:'北沢峠',lat:35.742214,lon:138.213675,elevation:2030},
    {id:'builtin-kaikoma-choei',type:'hut',name:'長衛小屋',lat:35.7434,lon:138.2149,elevation:1980},
    {id:'builtin-kaikoma-sensui',type:'hut',name:'仙水小屋',lat:35.7508,lon:138.2257,elevation:2130},
    {id:'builtin-kaikoma-peak',type:'peak',name:'甲斐駒ヶ岳',lat:35.7578,lon:138.2368,elevation:2967}
  ],
  '仙丈ヶ岳': [
    {id:'builtin-senjo-kitazawa',type:'trailhead',name:'北沢峠',lat:35.742214,lon:138.213675,elevation:2030},
    {id:'builtin-senjo-choei',type:'hut',name:'長衛小屋',lat:35.7434,lon:138.2149,elevation:1980},
    {id:'builtin-senjo-umanose',type:'hut',name:'馬の背ヒュッテ',lat:35.7254,lon:138.1924,elevation:2640},
    {id:'builtin-senjo-goya',type:'hut',name:'仙丈小屋',lat:35.7206,lon:138.1883,elevation:2900},
    {id:'builtin-senjo-peak',type:'peak',name:'仙丈ヶ岳',lat:35.7201,lon:138.1836,elevation:3033}
  ],
  '御嶽山': [
    {id:'builtin-ontake-nakanoyu',type:'trailhead',name:'中の湯登山口（黒沢口）',lat:35.894822,lon:137.521394,elevation:1820},
    {id:'builtin-ontake-tanohara',type:'trailhead',name:'田の原登山口',lat:35.873167,lon:137.503500,elevation:2196},
    {id:'builtin-ontake-nyonindo',type:'hut',name:'女人堂',lat:35.8955,lon:137.5073,elevation:2470},
    {id:'builtin-ontake-ishimuro',type:'hut',name:'石室山荘',lat:35.8941,lon:137.4907,elevation:2800},
    {id:'builtin-ontake-ninoike',type:'hut',name:'二の池ヒュッテ',lat:35.8899,lon:137.4848,elevation:2900},
    {id:'builtin-ontake-gonoike',type:'hut',name:'五の池小屋',lat:35.9020,lon:137.4665,elevation:2798},
    {id:'builtin-ontake-peak',type:'peak',name:'御嶽山（剣ヶ峰）',lat:35.8929,lon:137.4803,elevation:3067}
  ],
  '大山': [
    {id:'builtin-daisen-natsuyama',type:'trailhead',name:'夏山登山口',lat:35.391194,lon:133.530556,elevation:770},
    {id:'builtin-daisen-bakuroza',type:'trailhead',name:'博労座・大山寺側',lat:35.394694,lon:133.530306,elevation:740},
    {id:'builtin-daisen-roku',type:'hut',name:'六合目避難小屋',lat:35.3797,lon:133.5387,elevation:1350},
    {id:'builtin-daisen-summit',type:'hut',name:'大山頂上避難小屋',lat:35.3714,lon:133.5460,elevation:1700},
    {id:'builtin-daisen-peak',type:'peak',name:'大山（弥山）',lat:35.3711,lon:133.5462,elevation:1709}
  ],
  '石鎚山': [
    {id:'builtin-ishizuchi-tsuchigoya',type:'trailhead',name:'土小屋登山口',lat:33.758250,lon:133.144778,elevation:1492},
    {id:'builtin-ishizuchi-ropeway',type:'trailhead',name:'石鎚ロープウェイ前',lat:33.802778,lon:133.147778,elevation:450},
    {id:'builtin-ishizuchi-chojo',type:'hut',name:'石鎚神社頂上山荘',lat:33.7678,lon:133.1152,elevation:1970},
    {id:'builtin-ishizuchi-peak',type:'peak',name:'石鎚山（弥山）',lat:33.7679,lon:133.1150,elevation:1972}
  ],
  '宮之浦岳': [
    {id:'builtin-miyanoura-yodogawa',type:'trailhead',name:'淀川登山口',lat:30.299559,lon:130.533802,elevation:1360},
    {id:'builtin-miyanoura-yodogawa-goya',type:'hut',name:'淀川小屋',lat:30.3052,lon:130.5328,elevation:1380},
    {id:'builtin-miyanoura-shintakatsuka',type:'hut',name:'新高塚小屋',lat:30.3572,lon:130.5024,elevation:1460},
    {id:'builtin-miyanoura-takatsuka',type:'hut',name:'高塚小屋',lat:30.3741,lon:130.4979,elevation:1330},
    {id:'builtin-miyanoura-peak',type:'peak',name:'宮之浦岳',lat:30.3362,lon:130.5042,elevation:1936}
  ],
  '木曽駒ヶ岳': [
    {id:'builtin-kiso-senjo',type:'trailhead',name:'千畳敷',lat:35.7797,lon:137.8147,elevation:2612},
    {id:'builtin-kiso-nokkoshi',type:'pass',name:'乗越浄土',lat:35.7837,lon:137.8077,elevation:2850},
    {id:'builtin-kiso-tengu',type:'hut',name:'天狗荘',lat:35.7861,lon:137.8065,elevation:2870},
    {id:'builtin-kiso-hoken',type:'hut',name:'宝剣山荘',lat:35.7852,lon:137.8068,elevation:2865},
    {id:'builtin-kiso-chojo',type:'hut',name:'頂上山荘',lat:35.7904,lon:137.8060,elevation:2870},
    {id:'builtin-kiso-tamanokubo',type:'hut',name:'玉乃窪山荘',lat:35.7944,lon:137.7991,elevation:2756},
    {id:'builtin-kiso-peak',type:'peak',name:'木曽駒ヶ岳',lat:35.7895,lon:137.8047,elevation:2956}
  ]
};
const TRAVERSE_CATALOG = {
  '槍ヶ岳': [
    {id:'trv-yari-oku',type:'peak',name:'大喰岳',lat:36.3339,lon:137.6469,elevation:3101,sourceMountain:'槍ヶ岳・南岳周辺'},
    {id:'trv-yari-naka',type:'peak',name:'中岳',lat:36.3264,lon:137.6498,elevation:3084,sourceMountain:'槍ヶ岳・南岳周辺'},
    {id:'trv-yari-minami',type:'peak',name:'南岳',lat:36.3183,lon:137.6519,elevation:3033,sourceMountain:'槍ヶ岳・南岳周辺'},
    {id:'trv-yari-minamigoya',type:'hut',name:'南岳小屋',lat:36.3147,lon:137.6502,elevation:2970,sourceMountain:'槍ヶ岳・南岳周辺'},
    {id:'trv-yari-kitaho',type:'peak',name:'北穂高岳',lat:36.3028,lon:137.6511,elevation:3106,sourceMountain:'槍ヶ岳・穂高周辺'},
    {id:'trv-yari-kitahogoya',type:'hut',name:'北穂高小屋',lat:36.3025,lon:137.6502,elevation:3100,sourceMountain:'槍ヶ岳・穂高周辺'}
  ],
  '白馬岳': [
    {id:'trv-hakuba-tsugaike',type:'trailhead',name:'栂池自然園',lat:36.7498,lon:137.8618,elevation:1860,sourceMountain:'白馬岳'},
    {id:'trv-hakuba-renge',type:'trailhead',name:'蓮華温泉',lat:36.7858,lon:137.7934,elevation:1475,sourceMountain:'白馬岳'},
    {id:'trv-hakuba-oike',type:'hut',name:'白馬大池山荘',lat:36.7789,lon:137.7732,elevation:2380,sourceMountain:'白馬岳'},
    {id:'trv-hakuba-oike-camp',type:'camp',name:'白馬大池テント場',lat:36.7789,lon:137.7732,elevation:2380,sourceMountain:'白馬岳'},
    {id:'trv-hakuba-korenge',type:'peak',name:'小蓮華山',lat:36.7715,lon:137.7697,elevation:2766,sourceMountain:'白馬岳'},
    {id:'trv-hakuba-shakushi',type:'peak',name:'杓子岳',lat:36.7447,lon:137.7530,elevation:2812,sourceMountain:'白馬岳・唐松岳周辺'},
    {id:'trv-hakuba-yari',type:'peak',name:'白馬鑓ヶ岳',lat:36.7334,lon:137.7494,elevation:2903,sourceMountain:'白馬岳・唐松岳周辺'},
    {id:'trv-hakuba-tengu',type:'hut',name:'天狗山荘',lat:36.7207,lon:137.7475,elevation:2730,sourceMountain:'白馬岳・唐松岳周辺'},
    {id:'trv-hakuba-fuki',type:'pass',name:'不帰キレット',lat:36.7045,lon:137.7504,elevation:2400,sourceMountain:'白馬岳・唐松岳周辺'},
    {id:'trv-hakuba-karamatsu',type:'peak',name:'唐松岳',lat:36.6874,lon:137.7547,elevation:2696,sourceMountain:'白馬岳・唐松岳周辺'},
    {id:'trv-hakuba-karamatsugoya',type:'hut',name:'唐松岳頂上山荘',lat:36.6878,lon:137.7576,elevation:2620,sourceMountain:'白馬岳・唐松岳周辺'},
    {id:'trv-hakuba-goryu',type:'peak',name:'五竜岳',lat:36.6584,lon:137.7526,elevation:2814,sourceMountain:'唐松岳・五竜岳周辺'},
    {id:'trv-hakuba-goryugoya',type:'hut',name:'五竜山荘',lat:36.6634,lon:137.7547,elevation:2490,sourceMountain:'唐松岳・五竜岳周辺'},
    {id:'trv-hakuba-alpsdaira',type:'trailhead',name:'アルプス平',lat:36.6817,lon:137.8332,elevation:1515,sourceMountain:'五竜岳'},
    {id:'trv-hakuba-happo',type:'trailhead',name:'八方池山荘',lat:36.7030,lon:137.7893,elevation:1830,sourceMountain:'唐松岳'}
  ],
  '唐松岳': [],
  '五竜岳': []
};
TRAVERSE_CATALOG['唐松岳'] = TRAVERSE_CATALOG['白馬岳'];
TRAVERSE_CATALOG['五竜岳'] = TRAVERSE_CATALOG['白馬岳'];
TRAVERSE_CATALOG['南岳'] = TRAVERSE_CATALOG['槍ヶ岳'];


// 縦走では「選んだ山だけ」に候補を閉じず、同じ山域の主要地点をまとめて提示する。
const REGIONAL_CATALOG = {
  omoteginza: [
    {id:'area-omote-nakabusa',type:'trailhead',name:'中房温泉登山口',lat:36.3929,lon:137.7485,elevation:1462},
    {id:'area-omote-tsubakuro',type:'peak',name:'燕岳',lat:36.4069,lon:137.7129,elevation:2763},
    {id:'area-omote-enzanso',type:'hut',name:'燕山荘',lat:36.4073,lon:137.7152,elevation:2712},
    {id:'area-omote-otensho',type:'peak',name:'大天井岳',lat:36.3658,lon:137.7027,elevation:2922},
    {id:'area-omote-daitenso',type:'hut',name:'大天荘',lat:36.3646,lon:137.7043,elevation:2870},
    {id:'area-omote-jonen',type:'peak',name:'常念岳',lat:36.3255,lon:137.7273,elevation:2857},
    {id:'area-omote-jonengoya',type:'hut',name:'常念小屋',lat:36.3297,lon:137.7281,elevation:2450},
    {id:'area-omote-yari',type:'peak',name:'槍ヶ岳',lat:36.3420,lon:137.6477,elevation:3180},
    {id:'area-omote-yarigoya',type:'hut',name:'槍ヶ岳山荘',lat:36.3409,lon:137.6458,elevation:3080},
    {id:'area-omote-kamikochi',type:'trailhead',name:'上高地',lat:36.246656,lon:137.635388,elevation:1505},
    {id:'area-omote-ichinosawa',type:'trailhead',name:'一ノ沢登山口',lat:36.3388,lon:137.7420,elevation:1320},
    {id:'area-omote-shinhotaka',type:'trailhead',name:'新穂高温泉',lat:36.285405,lon:137.575014,elevation:1117}
  ],
  yarihotaka: [
    {id:'area-yh-kamikochi',type:'trailhead',name:'上高地',lat:36.246656,lon:137.635388,elevation:1505},
    {id:'area-yh-shinhotaka',type:'trailhead',name:'新穂高温泉',lat:36.285405,lon:137.575014,elevation:1117},
    {id:'area-yh-yokoo',type:'hut',name:'横尾山荘',lat:36.293444,lon:137.699175,elevation:1600},
    {id:'area-yh-yarisawa',type:'hut',name:'槍沢ロッヂ',lat:36.318056,lon:137.681111,elevation:1825},
    {id:'area-yh-yari',type:'peak',name:'槍ヶ岳',lat:36.342009,lon:137.647735,elevation:3180},
    {id:'area-yh-yarigoya',type:'hut',name:'槍ヶ岳山荘',lat:36.340939,lon:137.645795,elevation:3080},
    {id:'area-yh-okuwa',type:'peak',name:'大喰岳',lat:36.3339,lon:137.6469,elevation:3101},
    {id:'area-yh-naka',type:'peak',name:'中岳',lat:36.3264,lon:137.6498,elevation:3084},
    {id:'area-yh-minami',type:'peak',name:'南岳',lat:36.3183,lon:137.6519,elevation:3033},
    {id:'area-yh-minamigoya',type:'hut',name:'南岳小屋',lat:36.3147,lon:137.6502,elevation:2970},
    {id:'area-yh-kitaho',type:'peak',name:'北穂高岳',lat:36.3028,lon:137.6511,elevation:3106},
    {id:'area-yh-kitahogoya',type:'hut',name:'北穂高小屋',lat:36.3025,lon:137.6502,elevation:3100},
    {id:'area-yh-karasawa',type:'peak',name:'涸沢岳',lat:36.2959,lon:137.6508,elevation:3110},
    {id:'area-yh-okuhotaka',type:'peak',name:'奥穂高岳',lat:36.2892,lon:137.6480,elevation:3190},
    {id:'area-yh-maehotaka',type:'peak',name:'前穂高岳',lat:36.2819,lon:137.6606,elevation:3090},
    {id:'area-yh-hotakagoya',type:'hut',name:'穂高岳山荘',lat:36.2950,lon:137.6484,elevation:2996},
    {id:'area-yh-karasawahutte',type:'hut',name:'涸沢ヒュッテ',lat:36.3008,lon:137.6668,elevation:2309},
    {id:'area-yh-karasawagoya',type:'hut',name:'涸沢小屋',lat:36.3018,lon:137.6652,elevation:2350}
  ]
};
const MOUNTAIN_REGION = {
  '燕岳':'omoteginza','大天井岳':'omoteginza','常念岳':'omoteginza',
  '槍ヶ岳':'yarihotaka','南岳':'yarihotaka','北穂高岳':'yarihotaka','奥穂高岳':'yarihotaka','前穂高岳':'yarihotaka'
};
function regionalCandidates(mountain){
  const key=MOUNTAIN_REGION[mountain];
  if(!key)return [];
  // 槍ヶ岳は表銀座側からも選べるよう両グループを統合。
  if(mountain==='槍ヶ岳')return [...REGIONAL_CATALOG.omoteginza,...REGIONAL_CATALOG.yarihotaka];
  return REGIONAL_CATALOG[key]||[];
}

function builtinCandidates(mountain){
  const center=MOUNTAIN_PRESETS[mountain];
  return [...(BUILTIN_ROUTE_CATALOG[mountain]||[]), ...(TRAVERSE_CATALOG[mountain]||[])].map((p,i)=>({
    ...p,
    lat:Number.isFinite(p.lat)?p.lat:null,
    lon:Number.isFinite(p.lon)?p.lon:null,
    elevation:Number.isFinite(p.elevation)?p.elevation:'',
    distance:center&&Number.isFinite(p.lat)&&Number.isFinite(p.lon)?haversineMeters(center.latitude,center.longitude,p.lat,p.lon):100000+i
  }));
}

function haversineMeters(lat1,lon1,lat2,lon2){
  const R=6371000, r=Math.PI/180;
  const a=Math.sin((lat2-lat1)*r/2)**2+Math.cos(lat1*r)*Math.cos(lat2*r)*Math.sin((lon2-lon1)*r/2)**2;
  return 2*R*Math.asin(Math.sqrt(a));
}

let candidates=[];
let pointSeq=0;
const sessionId=(crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).slice(2));

document.addEventListener('DOMContentLoaded',init);
function init(){
  const sel=$('mountainPreset');
  sel.add(new Option('山を選択してください',''));
  Object.keys(MOUNTAIN_PRESETS).forEach(n=>sel.add(new Option(n,n)));
  sel.value='';
  $('loadPoiBtn').addEventListener('click',loadCandidates);
  $('addPointBtn').addEventListener('click',()=>addManualPointRow());
  $('analyzeBtn').addEventListener('click',analyze);
  $('mountainPreset').addEventListener('change',()=>{
    candidates=[];
    $('points').innerHTML=''; pointSeq=0;
    const selected=!!sel.value;
    $('candidateState').textContent=selected?'「この山のルート候補を読み込む」を押してください':'山を選択してください';
    updateLoadButtonAppearance(false);
    updateForecastHorizon();
  });
  $('candidateState').textContent='山を選択してください';
  updateLoadButtonAppearance(false);
  updateForecastHorizon();
  logEvent('page_view',{success:true});
}

function updateLoadButtonAppearance(loaded){
  const btn=$('loadPoiBtn');
  if(!btn)return;
  const hasMountain=!!$('mountainPreset')?.value;
  btn.disabled=!hasMountain;
  btn.classList.toggle('primary',hasMountain&&!loaded);
  btn.classList.toggle('secondary',!hasMountain||loaded);
  btn.classList.toggle('route-load-needed',hasMountain&&!loaded);
}
function loadCandidates(){
  const mountain=$('mountainPreset').value;
  if(!mountain){
    $('candidateState').textContent='先に山を選択してください';
    updateLoadButtonAppearance(false);
    return;
  }
  const base=[...(BUILTIN_ROUTE_CATALOG[mountain]||[]),...(TRAVERSE_CATALOG[mountain]||[]),...regionalCandidates(mountain)].filter(p=>Object.prototype.hasOwnProperty.call(TYPE_LABEL,p.type));
  const seen=new Set();
  candidates=base.filter(p=>{const k=`${p.name}|${p.lat}|${p.lon}`;if(seen.has(k))return false;seen.add(k);return true;});
  if(!candidates.some(p=>p.type==='peak') && MOUNTAIN_PRESETS[mountain]){const c=MOUNTAIN_PRESETS[mountain];candidates.push({id:'center-peak',type:'peak',name:mountain,lat:c.latitude,lon:c.longitude,elevation:''});}
  $('candidateState').textContent=`${mountain}：${candidates.length}地点を読み込みました（通信なし）`;
  updateLoadButtonAppearance(true);
  $('points').innerHTML=''; pointSeq=0;
  addPointRow('trailhead','','登山口');
  addPointRow('peak','','山頂');
  addPointRow('hut','','山小屋・避難小屋');
  addPointRow('trailhead','','下山口');
  updateForecastHorizon();
  logEvent('route_candidates_loaded',{success:true,metadata:{mountain,candidate_count:candidates.length}});
}


function addManualPointRow(){
  const rows=[...$('points').children];
  let date=todayLocal(), time='06:00';
  if(rows.length){
    const last=rows[rows.length-1];
    const lastValue=rowDateTimeValue(last);
    if(lastValue){
      const dt=new Date(lastValue);
      if(!Number.isNaN(dt.getTime())){
        if(last.querySelector('.point-stay')?.checked){
          dt.setDate(dt.getDate()+1);
          dt.setHours(5,0,0,0);
        }else{
          dt.setHours(dt.getHours()+1);
        }
        date=formatLocalDate(dt);
        time=formatLocalTime(dt);
      }
    }
  }
  addPointRow('peak','','経由',{date,time});
}
function formatLocalDate(dt){
  const y=dt.getFullYear(), m=String(dt.getMonth()+1).padStart(2,'0'), d=String(dt.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function formatLocalTime(dt){
  return `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
}

function typeOptions(selected){return Object.entries(TYPE_LABEL).map(([v,l])=>`<option value="${v}" ${v===selected?'selected':''}>${l}</option>`).join('');}
function candidateOptions(type,selected=''){
  const list=candidates.filter(p=>p.type===type);
  return `<option value="">地点を選択</option>`+list.map(p=>`<option value="${esc(p.id)}" ${p.id===selected?'selected':''}>${esc(p.name)}${p.elevation?` / ${p.elevation}m`:''}</option>`).join('');
}
function addPointRow(type='peak',selected='',roleLabel='',initialDateTime=null){
  pointSeq++;
  const row=document.createElement('div'); row.className='point-row'; row.dataset.id=String(pointSeq); row.dataset.role=roleLabel||'';
  row.innerHTML=`<div class="point-no"></div>
    <label>種類<select class="point-type">${typeOptions(type)}</select></label>
    <label class="point-name-label">地点<select class="point-select">${candidateOptions(type,selected)}</select></label>
    <label class="datetime-label date-label"><span class="field-caption">📅 通過日</span><span class="date-control"><input class="point-date" type="date" value="${initialDateTime?.date||todayLocal()}"><button class="date-picker-btn" type="button" title="カレンダーを開く" aria-label="カレンダーを開く">📅</button></span></label>
    <label class="datetime-label time-label"><span class="field-caption">🕒 通過時刻</span><input class="point-time" type="time" value="${initialDateTime?.time||'06:00'}"></label>
    <label class="stay-option ${type==='hut'?'':'hidden'}"><span>宿泊</span><span class="stay-toggle"><input class="point-stay" type="checkbox"><b>ここに泊まる</b></span></label>
    <button class="move up" type="button" title="上へ">↑</button><button class="move down" type="button" title="下へ">↓</button><button class="remove" type="button" title="削除">×</button>
    <div class="point-meta">地点を選択してください</div>`;
  $('points').appendChild(row); renumber();
  const typeSel=row.querySelector('.point-type'), pointSel=row.querySelector('.point-select'), stay=row.querySelector('.stay-option');
  typeSel.addEventListener('change',()=>{pointSel.innerHTML=candidateOptions(typeSel.value); stay.classList.toggle('hidden',typeSel.value!=='hut'); if(typeSel.value!=='hut')row.querySelector('.point-stay').checked=false; updateMeta(row);});
  pointSel.addEventListener('change',()=>updateMeta(row));
  const dateInput=row.querySelector('.point-date'), timeInput=row.querySelector('.point-time');
  const pickerBtn=row.querySelector('.date-picker-btn');
  const openDatePicker=()=>{
    try{ if(typeof dateInput.showPicker==='function') dateInput.showPicker(); else { dateInput.focus(); dateInput.click(); } }catch(_){ dateInput.focus(); }
  };
  pickerBtn?.addEventListener('click',openDatePicker);
  dateInput.addEventListener('dblclick',openDatePicker);
  [dateInput,timeInput].forEach(input=>{
    input.addEventListener('change',()=>{
      syncNextPointInitialTime(row);
      row.dataset.datetimeBefore=rowDateTimeValue(row)||'';
      updateForecastHorizon();
    });
  });
  row.querySelector('.point-stay').addEventListener('change',()=>{
    syncNextPointInitialTime(row);
    updateForecastHorizon();
  });
  row.querySelector('.remove').addEventListener('click',()=>{row.remove();renumber();updateForecastHorizon();});
  row.querySelector('.up').addEventListener('click',()=>{const p=row.previousElementSibling;if(p)row.parentNode.insertBefore(row,p);renumber();});
  row.querySelector('.down').addEventListener('click',()=>{const n=row.nextElementSibling;if(n)row.parentNode.insertBefore(n,row);renumber();});
}
function renumber(){[...$('points').children].forEach((r,i)=>r.querySelector('.point-no').textContent=String(i+1).padStart(2,'0'));}
function rowDateTimeValue(row){
  const date=row.querySelector('.point-date')?.value, time=row.querySelector('.point-time')?.value;
  return date&&time?`${date}T${time}:00+09:00`:'';
}
function formatJstInput(ms){
  const d=new Date(ms+9*60*60*1000);
  const pad=n=>String(n).padStart(2,'0');
  return {date:`${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`,time:`${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`};
}
function syncNextPointInitialTime(row){
  const next=row.nextElementSibling;
  const current=rowDateTimeValue(row);
  if(!next||!current)return;
  const dt=new Date(current);
  if(Number.isNaN(dt.getTime()))return;
  if(row.querySelector('.point-stay')?.checked){
    const base=new Date(`${row.querySelector('.point-date').value}T12:00:00+09:00`);
    base.setDate(base.getDate()+1);
    const nextDate=formatLocalDate(base);
    next.querySelector('.point-date').value=nextDate;
    next.querySelector('.point-time').value='05:00';
    next.dataset.datetimeBefore=`${nextDate}T05:00:00+09:00`;
    setStatus(`宿泊の次のポイントを翌朝 5:00 にしました。`);
  }else{
    const shifted=formatJstInput(dt.getTime()+60*60*1000);
    next.querySelector('.point-date').value=shifted.date;
    next.querySelector('.point-time').value=shifted.time;
    next.dataset.datetimeBefore=`${shifted.date}T${shifted.time}:00+09:00`;
  }
}
function updateForecastHorizon(){
  const el=$('forecastHorizonCurrent');
  if(!el)return;
  const dates=[...document.querySelectorAll('.point-date')].map(x=>x.value).filter(Boolean);
  if(!dates.length){el.textContent='通過日を入力すると予報期間の目安を表示します';return;}
  const today=todayLocal();
  const base=new Date(`${today}T00:00:00+09:00`).getTime();
  const maxDay=Math.max(...dates.map(d=>Math.round((new Date(`${d}T00:00:00+09:00`).getTime()-base)/86400000)));
  let text='',cls='';
  if(maxDay<0){text='過去の日付が含まれています';cls='out';}
  else if(maxDay<=4){text=`最遠 ${maxDay}日先：4モデル比較 ◎`;cls='best';}
  else if(maxDay<=7){text=`最遠 ${maxDay}日先：3モデル程度 ○`;cls='good';}
  else if(maxDay<=15){text=`最遠 ${maxDay}日先：ECMWF / GFS中心 △`;cls='caution';}
  else{text=`最遠 ${maxDay}日先：予報対象外`;cls='out';}
  el.textContent=`選択中：${text}`;
  el.className=`current-horizon ${cls}`;
}

function selectedCandidate(id){return candidates.find(p=>String(p.id)===String(id));}
function updateMeta(row){const p=selectedCandidate(row.querySelector('.point-select').value); row.querySelector('.point-meta').textContent=p?`${p.name} / ${p.elevation||'標高自動'}m / ${Number(p.lat).toFixed(4)}, ${Number(p.lon).toFixed(4)}`:'地点を選択してください';}
function collectPoints(){
  return [...$('points').children].map((row,i)=>{
    const p=selectedCandidate(row.querySelector('.point-select').value);
    if(!p) return null; // 最初から表示する4枠は、使わない枠を空欄のままにできる
    const date=row.querySelector('.point-date').value, time=row.querySelector('.point-time').value;
    if(!date||!time) throw new Error(`${p.name} の通過日・通過時刻を入力してください。`);
    return {...p,date,time,type:row.querySelector('.point-type').value,stay:!!row.querySelector('.point-stay')?.checked,role:row.dataset.role||''};
  }).filter(Boolean);
}
function validateChronology(points){
  for(let i=1;i<points.length;i++){
    const prev=points[i-1], cur=points[i];
    const prevMs=new Date(`${prev.date}T${prev.time}:00+09:00`).getTime();
    const curMs=new Date(`${cur.date}T${cur.time}:00+09:00`).getTime();
    if(!Number.isFinite(prevMs)||!Number.isFinite(curMs)) throw new Error('通過日時の形式を確認してください。');
    if(curMs<=prevMs){
      throw new Error(`時系列エラー：${cur.name}（${cur.date} ${cur.time}）は、直前の ${prev.name}（${prev.date} ${prev.time}）より後の日時にしてください。`);
    }
  }
}

async function ensureElevations(points){
  const missing=points.map((p,i)=>({p,i})).filter(x=>!(Number.isFinite(Number(x.p.elevation))&&Number(x.p.elevation)>0));
  if(!missing.length)return points;
  try{
    const q=new URLSearchParams({
      latitude:missing.map(x=>x.p.lat).join(','),
      longitude:missing.map(x=>x.p.lon).join(',')
    });
    const r=await proxyFetch(`https://api.open-meteo.com/v1/elevation?${q}`);
    if(!r.ok)return points;
    const j=await r.json();
    const values=Array.isArray(j?.elevation)?j.elevation:[j?.elevation];
    missing.forEach((x,k)=>{const e=Number(values[k]);if(Number.isFinite(e))x.p.elevation=e;});
  }catch(_e){}
  return points;
}
function daysAhead(date){
  const base=new Date(`${todayLocal()}T00:00:00+09:00`).getTime();
  const target=new Date(`${date}T00:00:00+09:00`).getTime();
  return Math.round((target-base)/86400000);
}
function providerEligible(provider,point){const d=daysAhead(point.date);return d>=0&&d<=provider.forecastDays;}
function extractProviderRow(hourly,point){
  if(!hourly?.time)return null;
  const idx=nearestTimeIndex(hourly.time,`${point.date}T${point.time}`);
  if(idx<0)return null;
  const get=k=>numberOrNaN(hourly[k]?.[idx]);
  return {time:hourly.time[idx],temp:get('temperature_2m'),rh:get('relative_humidity_2m'),rain:get('precipitation'),cloud:get('cloud_cover'),wind:get('wind_speed_10m'),gust:get('wind_gusts_10m'),windDir:get('wind_direction_10m'),cape:get('cape'),visibility:get('visibility'),freezing:get('freezing_level_height')};
}
async function fetchProviderBatch(provider,points){
  const eligible=points.map((point,index)=>({point,index})).filter(x=>providerEligible(provider,x.point));
  if(!eligible.length)return [];
  const dates=eligible.map(x=>x.point.date).sort();
  const params=new URLSearchParams({
    latitude:eligible.map(x=>x.point.lat).join(','),
    longitude:eligible.map(x=>x.point.lon).join(','),
    elevation:eligible.map(x=>Number(x.point.elevation)||'nan').join(','),
    hourly:provider.vars.join(','),timezone:'Asia/Tokyo',start_date:dates[0],end_date:dates[dates.length-1],wind_speed_unit:'ms'
  });
  if(provider.model)params.set('models',provider.model);
  const r=await proxyFetch(`${provider.endpoint}?${params}`);
  if(!r.ok)throw new Error(`HTTP ${r.status}`);
  const raw=await r.json();
  const locations=Array.isArray(raw)?raw:[raw];
  if(locations.length!==eligible.length)throw new Error(`地点数不一致 (${locations.length}/${eligible.length})`);
  return eligible.map((x,k)=>({index:x.index,row:extractProviderRow(locations[k]?.hourly,x.point)}));
}
function extractMetNoRow(payload,point){
  const ts=payload?.properties?.timeseries;
  if(!Array.isArray(ts)||!ts.length)return null;
  const targetMs=new Date(`${point.date}T${point.time}:00+09:00`).getTime();
  let best=null, bestDiff=Infinity;
  for(const item of ts){
    const ms=new Date(item?.time||'').getTime();
    if(!Number.isFinite(ms))continue;
    const diff=Math.abs(ms-targetMs);
    if(diff<bestDiff){bestDiff=diff;best=item;}
  }
  // MET Norway Locationforecast is a short/medium-range fallback. Avoid
  // silently substituting a forecast that is more than 3 hours away.
  if(!best || bestDiff>3*3600000)return null;
  const d=best?.data?.instant?.details||{};
  const next1=best?.data?.next_1_hours?.details||{};
  return {
    time:best.time,
    temp:numberOrNaN(d.air_temperature),
    rh:numberOrNaN(d.relative_humidity),
    rain:numberOrNaN(next1.precipitation_amount),
    cloud:numberOrNaN(d.cloud_area_fraction),
    wind:numberOrNaN(d.wind_speed),
    gust:numberOrNaN(d.wind_speed_of_gust),
    windDir:numberOrNaN(d.wind_from_direction),
    cape:NaN,visibility:NaN,freezing:NaN
  };
}
async function fetchMetNoPayload(point){
  // Locationforecast currently covers roughly nine days. It is used only
  // when Open-Meteo has returned HTTP 429 for this point.
  if(daysAhead(point.date)>9)return null;
  const q=new URLSearchParams({
    lat:String(Number(point.lat).toFixed(4)),
    lon:String(Number(point.lon).toFixed(4))
  });
  if(Number.isFinite(Number(point.elevation))&&Number(point.elevation)>0)q.set('altitude',String(Math.round(Number(point.elevation))));
  const r=await proxyFetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?${q}`);
  if(!r.ok)throw new Error(`MET Norway HTTP ${r.status}`);
  return await r.json();
}
async function fetchMetNoFallback(point){
  const payload=await fetchMetNoPayload(point);
  return payload?extractMetNoRow(payload,point):null;
}
async function fetchNoaaGfsFallback(point){
  if(daysAhead(point.date)>16)return null;
  const q=new URLSearchParams({lat:String(point.lat),lon:String(point.lon),date:point.date,time:point.time});
  const r=await fetch(`/api/noaa-gfs?${q}`,{headers:{Accept:'application/json'}});
  const payload=await r.json().catch(()=>null);
  if(!r.ok)throw new Error(payload?.error||`NOAA GFS HTTP ${r.status}`);
  return payload?.row||null;
}

async function analyzePointsBatch(points){
  const buckets=points.map(()=>({rows:[],errors:[]}));
  for(let pi=0;pi<providers.length;pi++){
    const provider=providers[pi];
    setStatus(`気象モデル ${pi+1}/${providers.length}：${provider.name} を全地点まとめて取得中…`);
    try{
      const fetched=await fetchProviderBatch(provider,points);
      fetched.forEach(x=>{
        if(x.row)buckets[x.index].rows.push({provider,row:x.row});
        else buckets[x.index].errors.push(`${provider.name}: 指定時刻なし`);
      });
    }catch(e){
      points.forEach((point,index)=>{if(providerEligible(provider,point))buckets[index].errors.push(`${provider.name}: ${e?.message||'取得失敗'}`);});
    }
  }
  // If a point has no Open-Meteo result and the eligible model calls were
  // rate-limited, fall back to MET Norway Locationforecast so the plan can
  // still be evaluated. This is a single-source fallback, not a 4-model vote.
  const metnoProvider={id:'metno',name:'MET Norway（予備）',kind:'fallback'};
  const noaaProvider={id:'noaa-gfs',name:'NOAA GFS（直取得）',kind:'fallback'};
  for(let index=0;index<points.length;index++){
    const bucket=buckets[index];
    if(bucket.rows.length)continue;
    const rateLimited=bucket.errors.some(x=>x.includes('HTTP 429'));
    if(!rateLimited)continue;
    setStatus(`Open-Meteoが混雑中：${points[index].name} を予備データで取得しています…`);
    try{
      const row=await fetchMetNoFallback(points[index]);
      if(row){
        bucket.rows.push({provider:metnoProvider,row});
        bucket.errors.push('Open-Meteo: HTTP 429 → MET Norway予備へ切替');
      }else bucket.errors.push('MET Norway: 指定時刻の予報なし（約9日先まで）');
    }catch(e){bucket.errors.push(e?.message||'MET Norway取得失敗');}
    try{
      const row=await fetchNoaaGfsFallback(points[index]);
      if(row){
        bucket.rows.push({provider:noaaProvider,row});
        bucket.errors.push('NOAA GFS: NOMADS GRIB2を直接取得');
      }else bucket.errors.push('NOAA GFS: 指定時刻の予報なし（約16日先まで）');
    }catch(e){bucket.errors.push(e?.message||'NOAA GFS取得失敗');}
  }
  return points.map((point,index)=>{
    const rows=buckets[index].rows, errors=buckets[index].errors;
    if(!rows.length)throw new Error(`${point.name}: 予報データを取得できませんでした。 ${errors.join(' / ')||'対応モデルがありません'}`);
    const avg=averageRows(rows.map(x=>x.row));
    return {point,providerRows:rows,errors,...avg,grade:assessGrade(avg),confidence:(rows.length===1&&rows[0].provider?.kind==='fallback'?'FALLBACK':assessConfidence(rows.map(x=>x.row))),thunder:thunderLevel(avg)};
  });
}

async function analyze(){
  const started=performance.now(); let points=[];
  try{
    points=collectPoints(); if(points.length<1)throw new Error('分析する地点を1つ以上選択してください。');
    validateChronology(points);
    $('analyzeBtn').disabled=true; setStatus(`分析開始：${points.length}地点を一括取得する準備をしています…`);
    await ensureElevations(points);
    const results=await analyzePointsBatch(points);
    const stayPoints=points.filter(p=>p.stay);
    let overnight=[];
    let overnightWarning='';
    if(stayPoints.length){
      setStatus(`宿泊分析：${stayPoints.length}泊分をまとめて取得しています…`);
      try{overnight=await analyzeOvernightsBatch(stayPoints);}catch(e){overnightWarning=` / 宿泊詳細は取得できませんでした（${e?.message||'取得失敗'}）`;}
    }
    renderAll(results,overnight); setStatus(`分析完了：${points.length}地点${stayPoints.length?` / 宿泊 ${stayPoints.length}泊`:''}${overnightWarning}（一括取得）`,false);
    logEvent('weather_analysis',{success:true,duration_ms:performance.now()-started,route_points:points.length,metadata:{provider_count:providers.length,manual_datetime:true,batch_weather:true}});
  }catch(e){setStatus(e.message||String(e),true);logEvent('weather_analysis',{success:false,duration_ms:performance.now()-started,route_points:points.length,error_message:e.message||String(e)});}
  finally{$('analyzeBtn').disabled=false;}
}
function analyzeOvernightJson(point,nightNo,j){
  const next=addDays(point.date,1), h=j?.hourly||{}, d=j?.daily||{};
  const sunset=d.sunset?.find(x=>String(x).startsWith(point.date))||d.sunset?.[0]||`${point.date}T18:00`;
  const sunrise=d.sunrise?.find(x=>String(x).startsWith(next))||d.sunrise?.[1]||`${next}T05:00`;
  const allRows=(h.time||[]).map((t,i)=>({time:t,temp:numberOrNaN(h.temperature_2m?.[i]),apparent:numberOrNaN(h.apparent_temperature?.[i]),rh:numberOrNaN(h.relative_humidity_2m?.[i]),rain:numberOrNaN(h.precipitation?.[i]),cloud:numberOrNaN(h.cloud_cover?.[i]),wind:numberOrNaN(h.wind_speed_10m?.[i]),gust:numberOrNaN(h.wind_gusts_10m?.[i]),visibility:numberOrNaN(h.visibility?.[i])}));
  const startMs=new Date(`${point.date}T${point.time}`).getTime(), endMs=new Date(`${next}T08:00`).getTime();
  const rows=allRows.filter(x=>{const t=new Date(x.time).getTime();return t>=startMs&&t<=endMs;});
  const morningStartMs=new Date(`${next}T00:00`).getTime(), morningEndMs=new Date(`${next}T08:00`).getTime();
  const morningRows=allRows.filter(x=>{const t=new Date(x.time).getTime();return t>=morningStartMs&&t<=morningEndMs;});
  const sunsetRow=allRows[nearestTimeIndex(allRows.map(x=>x.time),sunset)]||null, sunriseRow=allRows[nearestTimeIndex(allRows.map(x=>x.time),sunrise)]||null;
  const sunsetView=horizonVisibility(sunsetRow), sunriseView=horizonVisibility(sunriseRow);
  const darkStart=new Date(sunset).getTime()+90*60000, darkEnd=new Date(sunrise).getTime()-90*60000;
  const darkRows=rows.filter(x=>{const t=new Date(x.time).getTime();return t>=darkStart&&t<=darkEnd;}), astroRows=darkRows.length?darkRows:rows;
  const moon=moonInfo(point.date), best=astroRows.slice().sort((a,b)=>milkyScore(b,moon)-milkyScore(a,moon))[0]||null;
  const minTemp=minFinite(rows.map(x=>x.temp)), morningMinTemp=minFinite((morningRows.length?morningRows:rows).map(x=>x.temp)), minApp=minFinite(rows.map(x=>x.apparent)), maxWind=max(rows.map(x=>x.wind)), maxGust=max(rows.map(x=>x.gust)), maxRain=max(rows.map(x=>x.rain)), avgCloud=mean(rows.map(x=>x.cloud)), maxRh=max(rows.map(x=>x.rh)), minVis=minFinite(rows.map(x=>x.visibility));
  const fogRisk=(maxRh>=97&&avgCloud>=85)||(Number.isFinite(minVis)&&minVis<1000)?'高':(maxRh>=92||avgCloud>=75)?'中':'低';
  const score=best?milkyScore(best,moon):0;
  return {nightNo,point,sunset,sunrise,sunsetView,sunriseView,minTemp,morningMinTemp,minApp,maxWind,maxGust,maxRain,avgCloud,maxRh,minVis,fogRisk,moon,best,score,milkyLabel:score>=75?'期待大':score>=55?'見える可能性あり':score>=35?'条件次第':'厳しい'};
}
function metNoRows(payload){
  const ts=payload?.properties?.timeseries;
  if(!Array.isArray(ts))return [];
  return ts.map(item=>{
    const d=item?.data?.instant?.details||{}, n1=item?.data?.next_1_hours?.details||{}, n6=item?.data?.next_6_hours?.details||{};
    const temp=numberOrNaN(d.air_temperature), wind=numberOrNaN(d.wind_speed), rh=numberOrNaN(d.relative_humidity);
    let rain=numberOrNaN(n1.precipitation_amount);
    if(!Number.isFinite(rain)){const r6=numberOrNaN(n6.precipitation_amount); rain=Number.isFinite(r6)?r6/6:NaN;}
    return {time:item.time,temp,apparent:apparentTempApprox(temp,wind),rh,rain,cloud:numberOrNaN(d.cloud_area_fraction),wind,gust:numberOrNaN(d.wind_speed_of_gust),visibility:NaN};
  }).filter(x=>x.time);
}
function apparentTempApprox(temp,wind){
  if(!Number.isFinite(temp))return NaN;
  if(!Number.isFinite(wind)||wind<1.34||temp>10)return temp;
  const v=Math.max(4.8,wind*3.6), p=Math.pow(v,0.16);
  return 13.12+0.6215*temp-11.37*p+0.3965*temp*p;
}
function solarTimeApprox(date,lat,lon,isSunrise){
  const base=new Date(`${date}T12:00:00+09:00`), start=new Date(base.getFullYear(),0,0), n=Math.floor((base-start)/86400000);
  const rad=Math.PI/180, lngHour=lon/15, t=n+(((isSunrise?6:18)-lngHour)/24);
  const M=(0.9856*t)-3.289;
  let L=M+1.916*Math.sin(M*rad)+0.020*Math.sin(2*M*rad)+282.634; L=(L+360)%360;
  let RA=Math.atan(0.91764*Math.tan(L*rad))/rad; RA=(RA+360)%360;
  const Lq=Math.floor(L/90)*90, RAq=Math.floor(RA/90)*90; RA=(RA+(Lq-RAq))/15;
  const sinDec=0.39782*Math.sin(L*rad), cosDec=Math.cos(Math.asin(sinDec));
  const cosH=(Math.cos(90.833*rad)-(sinDec*Math.sin(lat*rad)))/(cosDec*Math.cos(lat*rad));
  if(cosH>1||cosH<-1)return `${date}T${isSunrise?'05:00':'18:00'}:00+09:00`;
  let H=(isSunrise?(360-Math.acos(cosH)/rad):(Math.acos(cosH)/rad))/15;
  const T=H+RA-(0.06571*t)-6.622, UT=(T-lngHour+24)%24, jst=(UT+9)%24;
  const hh=Math.floor(jst), mm=Math.round((jst-hh)*60)%60, h2=(hh+(Math.round((jst-hh)*60)>=60?1:0))%24;
  return `${date}T${String(h2).padStart(2,'0')}:${String(mm).padStart(2,'0')}:00+09:00`;
}
function analyzeOvernightMetNo(point,nightNo,payload){
  const next=addDays(point.date,1), allRows=metNoRows(payload);
  const startMs=new Date(`${point.date}T${point.time}:00+09:00`).getTime(), endMs=new Date(`${next}T08:00:00+09:00`).getTime();
  const rows=allRows.filter(x=>{const t=new Date(x.time).getTime();return t>=startMs&&t<=endMs;});
  const morningStartMs=new Date(`${next}T00:00:00+09:00`).getTime(), morningEndMs=new Date(`${next}T08:00:00+09:00`).getTime();
  const morningRows=allRows.filter(x=>{const t=new Date(x.time).getTime();return t>=morningStartMs&&t<=morningEndMs;});
  if(!rows.length)throw new Error('MET Norway: 宿泊時間帯の予報なし');
  const sunset=solarTimeApprox(point.date,Number(point.lat),Number(point.lon),false), sunrise=solarTimeApprox(next,Number(point.lat),Number(point.lon),true);
  const sunsetRow=allRows[nearestTimeIndex(allRows.map(x=>x.time),sunset)]||null, sunriseRow=allRows[nearestTimeIndex(allRows.map(x=>x.time),sunrise)]||null;
  const sunsetView=horizonVisibility(sunsetRow), sunriseView=horizonVisibility(sunriseRow);
  const darkStart=new Date(sunset).getTime()+90*60000, darkEnd=new Date(sunrise).getTime()-90*60000;
  const darkRows=rows.filter(x=>{const t=new Date(x.time).getTime();return t>=darkStart&&t<=darkEnd;}), astroRows=darkRows.length?darkRows:rows;
  const moon=moonInfo(point.date), best=astroRows.slice().sort((a,b)=>milkyScore(b,moon)-milkyScore(a,moon))[0]||null;
  const minTemp=minFinite(rows.map(x=>x.temp)), morningMinTemp=minFinite((morningRows.length?morningRows:rows).map(x=>x.temp)), minApp=minFinite(rows.map(x=>x.apparent)), maxWind=max(rows.map(x=>x.wind)), maxGust=max(rows.map(x=>x.gust)), maxRain=max(rows.map(x=>x.rain)), avgCloud=mean(rows.map(x=>x.cloud)), maxRh=max(rows.map(x=>x.rh));
  const fogRisk=(maxRh>=97&&avgCloud>=85)?'高':(maxRh>=92||avgCloud>=75)?'中':'低', score=best?milkyScore(best,moon):0;
  return {nightNo,point,sunset,sunrise,sunsetView,sunriseView,minTemp,morningMinTemp,minApp,maxWind,maxGust,maxRain,avgCloud,maxRh,minVis:NaN,fogRisk,moon,best,score,milkyLabel:score>=75?'期待大':score>=55?'見える可能性あり':score>=35?'条件次第':'厳しい',source:'MET Norway（予備）'};
}
async function analyzeOvernightsMetNo(points){
  const out=[];
  for(let i=0;i<points.length;i++){
    setStatus(`宿泊分析：Open-Meteo 429 → ${i+1}/${points.length}泊目をMET Norwayで取得中…`);
    const payload=await fetchMetNoPayload(points[i]);
    if(!payload)throw new Error('MET Norway: 宿泊予報は約9日先までです');
    out.push(analyzeOvernightMetNo(points[i],i+1,payload));
  }
  return out;
}
async function analyzeOvernightsBatch(points){
  if(!points.length)return [];
  const vars=['temperature_2m','apparent_temperature','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_gusts_10m','visibility'];
  const starts=points.map(p=>p.date).sort(), ends=points.map(p=>addDays(p.date,1)).sort();
  const q=new URLSearchParams({
    latitude:points.map(p=>p.lat).join(','),longitude:points.map(p=>p.lon).join(','),elevation:points.map(p=>Number(p.elevation)||'nan').join(','),
    hourly:vars.join(','),daily:'sunrise,sunset',timezone:'Asia/Tokyo',start_date:starts[0],end_date:ends[ends.length-1],wind_speed_unit:'ms'
  });
  const r=await proxyFetch(`https://api.open-meteo.com/v1/forecast?${q}`);
  if(!r.ok){
    if(r.status===429)return await analyzeOvernightsMetNo(points);
    throw new Error(`宿泊予報 HTTP ${r.status}`);
  }
  const raw=await r.json(), locations=Array.isArray(raw)?raw:[raw];
  if(locations.length!==points.length)throw new Error(`宿泊予報の地点数不一致 (${locations.length}/${points.length})`);
  return points.map((p,i)=>({...analyzeOvernightJson(p,i+1,locations[i]),source:'Open-Meteo'}));
}
function addDays(date,n){const d=new Date(`${date}T12:00:00`);d.setDate(d.getDate()+n);return d.toISOString().slice(0,10);}
function minFinite(v){const x=v.filter(Number.isFinite);return x.length?Math.min(...x):NaN;}
function timeOnly(s){
  if(!s)return '–';
  const str=String(s);
  if(/Z$|[+-]\d\d:\d\d$/.test(str)){
    const d=new Date(str);
    if(Number.isFinite(d.getTime()))return new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit',hour12:false}).format(d);
  }
  return str.slice(11,16);
}
function horizonVisibility(row){
  if(!row) return {label:'判定不可',mark:'–',score:0};
  let s=100;
  if(Number.isFinite(row.cloud)) s-=row.cloud*.75;
  if(Number.isFinite(row.rain)) s-=Math.min(45,row.rain*22);
  if(Number.isFinite(row.visibility)&&row.visibility<15000) s-=Math.min(30,(15000-row.visibility)/500);
  if(Number.isFinite(row.rh)&&row.rh>92) s-=Math.min(18,(row.rh-92)*2.2);
  s=Math.max(0,Math.min(100,s));
  if(s>=75)return {label:'期待できる',mark:'◎',score:s};
  if(s>=55)return {label:'可能性あり',mark:'○',score:s};
  if(s>=35)return {label:'微妙',mark:'△',score:s};
  return {label:'厳しい',mark:'×',score:s};
}

function moonInfo(date){
  const syn=29.53058867, known=new Date('2000-01-06T18:14:00Z').getTime(), t=new Date(`${date}T12:00:00+09:00`).getTime();
  let age=((t-known)/86400000)%syn;if(age<0)age+=syn;
  const illum=(1-Math.cos(2*Math.PI*age/syn))/2*100;
  const phase=age<1.85?'新月':age<7.38?'満ちていく月':age<9.23?'上弦':age<14.77?'満ちていく月':age<16.61?'満月':age<22.15?'欠けていく月':age<24?'下弦':'欠けていく月';
  return {age,illum,phase};
}
function milkyScore(row,moon){
  let s=100;
  if(Number.isFinite(row.cloud))s-=row.cloud*.7;
  if(Number.isFinite(row.rain))s-=Math.min(35,row.rain*18);
  if(Number.isFinite(row.visibility)&&row.visibility<10000)s-=Math.min(25,(10000-row.visibility)/400);
  if(Number.isFinite(row.rh)&&row.rh>92)s-=Math.min(15,(row.rh-92)*2);
  s-=moon.illum*.22;
  return Math.max(0,Math.min(100,s));
}
function renderOvernights(items){
  const section=$('overnightSection');
  if(!items.length){section.classList.add('hidden');$('overnightCards').innerHTML='';return;}
  section.classList.remove('hidden');
  $('overnightCards').innerHTML=items.map(o=>`<article class="overnight-card"><div class="overnight-head"><div><span class="night-badge">${o.nightNo}泊目</span><h3>${esc(o.point.name)}</h3><small>${o.point.date} / ${Math.round(o.point.elevation||0)}m${o.source?` ・ ${esc(o.source)}`:''}</small></div></div><div class="astro-cards"><div class="astro-card sunset-card"><small>🌇 日の入り</small><b>${timeOnly(o.sunset)}</b><span>${o.sunsetView.mark} ${o.sunsetView.label}</span></div><div class="astro-card milky-card"><small>🌌 天の川</small><b>${o.milkyLabel}</b><span>${Math.round(o.score)} / 100${o.best?` ・ ${timeOnly(o.best.time)}頃`:''}</span></div><div class="astro-card sunrise-card"><small>🌄 日の出</small><b>${timeOnly(o.sunrise)}</b><span>${o.sunriseView.mark} ${o.sunriseView.label}</span></div></div><div class="overnight-metrics"><span class="temp-focus arrival">到着時気温<b>${num(o.arrivalTemp)}℃</b><em>${esc(o.point.time||'--:--')} 到着</em></span><span class="temp-focus morning">翌朝最低<b>${num(o.morningMinTemp)}℃</b><em>0:00〜8:00</em></span><span>夜間最低<b>${num(o.minTemp)}℃</b></span><span>最低体感<b>${num(o.minApp)}℃</b></span><span>最大風<b>${num(o.maxWind)}m/s</b></span><span>最大突風<b>${num(o.maxGust)}m/s</b></span><span>夜間降水<b>${num(o.maxRain)}mm/h</b></span><span>平均雲量<b>${num(o.avgCloud,0)}%</b></span><span>ガス・霧<b>${o.fogRisk}</b></span><span>月明かり<b>${o.moon.phase} ${Math.round(o.moon.illum)}%</b></span></div><p class="night-note">天の川スコアは、夜間の雲量・降水・視程・湿度と月明かりから算出した目安です。地形による空の開け方や局地的な雲は反映しません。</p></article>`).join('');
}

function nearestTimeIndex(times,target){const t=new Date(target).getTime();let best=-1,d=Infinity;times.forEach((s,i)=>{const x=Math.abs(new Date(s).getTime()-t);if(x<d){d=x;best=i;}});return best;}
function numberOrNaN(v){const n=Number(v);return Number.isFinite(n)?n:NaN;}
function mean(v){const x=v.filter(Number.isFinite);return x.length?x.reduce((a,b)=>a+b,0)/x.length:NaN;} function max(v){const x=v.filter(Number.isFinite);return x.length?Math.max(...x):NaN;}
function averageRows(rows){return {temp:mean(rows.map(x=>x.temp)),rain:mean(rows.map(x=>x.rain)),cloud:mean(rows.map(x=>x.cloud)),wind:mean(rows.map(x=>x.wind)),gust:max(rows.map(x=>x.gust)),cape:max(rows.map(x=>x.cape)),visibility:mean(rows.map(x=>x.visibility)),freezing:mean(rows.map(x=>x.freezing))};}
function assessGrade(x){let s=0;if(x.wind>=20||x.gust>=25)s+=4;else if(x.wind>=15||x.gust>=20)s+=3;else if(x.wind>=10||x.gust>=15)s+=2;else if(x.wind>=7)s+=1;if(x.rain>=8)s+=4;else if(x.rain>=4)s+=3;else if(x.rain>=1.5)s+=2;else if(x.rain>=.3)s+=1;if(x.cape>=1000)s+=3;else if(x.cape>=500)s+=2;else if(x.cape>=200)s+=1;if(x.cloud>=95)s+=1;if(Number.isFinite(x.visibility)&&x.visibility<500)s+=2;if(x.temp<=-5)s+=2;else if(x.temp<=0)s+=1;return s>=8?'E':s>=6?'D':s>=4?'C':s>=2?'B':'A';}
function thunderLevel(x){if(x.cape>=1000&&x.rain>=1)return'EXTREME';if(x.cape>=500||(x.cape>=200&&x.rain>=1))return'HIGH';if(x.cape>=100||x.rain>=2)return'MEDIUM';return'LOW';}
function assessConfidence(rows){const spread=k=>{const v=rows.map(x=>x[k]).filter(Number.isFinite);return v.length>1?Math.max(...v)-Math.min(...v):0;};if(spread('wind')>7||spread('rain')>4||spread('temp')>6)return'LOW';if(spread('wind')>3.5||spread('rain')>1.5||spread('temp')>3)return'MEDIUM';return'HIGH';}
function gradeRank(g){return({A:1,B:2,C:3,D:4,E:5})[g]||9;} function verdict(g){return({A:'かなり良好',B:'概ね登山可能',C:'注意が必要',D:'かなり厳しい',E:'中止推奨'})[g]||'–';}
function maxThunder(v){const r={LOW:1,MEDIUM:2,HIGH:3,EXTREME:4};return [...v].sort((a,b)=>r[b]-r[a])[0]||'LOW';} function overallConfidence(v){return v.includes('LOW')?'LOW':v.includes('MEDIUM')?'MEDIUM':'HIGH';}
function num(v,d=1){return Number.isFinite(v)?v.toFixed(d):'–';}


function chartPath(values,w,h,pad=26){
  const finite=values.map(Number).filter(Number.isFinite);
  if(!finite.length)return {path:'',dots:[],min:0,max:1};
  let min=Math.min(...finite), max=Math.max(...finite);
  if(min===max){min-=1;max+=1;}
  const x=i=>values.length===1?w/2:pad+i*(w-pad*2)/(values.length-1);
  const y=v=>h-pad-(v-min)*(h-pad*2)/(max-min);
  const pts=[]; values.forEach((v,i)=>{if(Number.isFinite(Number(v)))pts.push([x(i),y(Number(v)),Number(v),i]);});
  return {path:pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' '),dots:pts,min,max};
}
function niceMax(v){
  if(!Number.isFinite(v) || v<=0) return 1;
  const p=Math.pow(10,Math.floor(Math.log10(v)));
  const n=v/p;
  const step=n<=1?1:n<=2?2:n<=5?5:10;
  return step*p;
}

function pointLegend(points){
  return `<div class="point-key" style="--point-count:${Math.max(points.length,1)}">${points.map((p,i)=>`<span class="point-key-item"><b>${String(i+1).padStart(2,'0')}</b><span class="point-key-copy"><strong>${esc(p.point.name)}</strong><small>${esc(p.point.time||'--:--')}</small></span></span>`).join('')}</div>`;
}
function chartKpis(items){
  return `<div class="chart-kpis">${items.map(x=>`<span class="chart-kpi"><small>${esc(x.label)}</small><b>${esc(x.value)}</b></span>`).join('')}</div>`;
}
function gridLines(w,h,left,right,top,bottom,steps=4){
  let html='';
  for(let i=0;i<=steps;i++){
    const yy=top+i*(h-top-bottom)/steps;
    html+=`<line class="chart-grid" x1="${left}" y1="${yy.toFixed(1)}" x2="${w-right}" y2="${yy.toFixed(1)}"/>`;
  }
  return html;
}

function renderImpactChart(points){
  const w=720,h=270,left=42,right=42,top=24,bottom=58;
  const rainMax=niceMax(max(points.map(p=>p.rain)));
  const windMax=niceMax(max(points.flatMap(p=>[p.wind,p.gust])));
  const x=i=>points.length===1?w/2:left+i*(w-left-right)/(points.length-1);
  const yRain=v=>h-bottom-(v/rainMax)*(h-top-bottom);
  const yWind=v=>h-bottom-(v/windMax)*(h-top-bottom);
  const barW=Math.min(28,Math.max(8,(w-left-right)/Math.max(points.length*2.5,10)));
  const bars=points.map((p,i)=>{const val=Number.isFinite(p.rain)?p.rain:0;const yy=yRain(val),xx=x(i)-barW/2;const labelY=Math.max(top+12,yy-6);return `<rect class="rain-bar" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(0,h-bottom-yy).toFixed(1)}" rx="5"><title>${esc(p.point.name)} ${p.point.time} 降水 ${num(val)}mm/h</title></rect><text class="chart-value rain-value" x="${x(i)}" y="${labelY.toFixed(1)}" text-anchor="middle">${num(val)}mm</text>`;}).join('');
  const buildLine=(key,cls,label)=>{const pts=points.map((p,i)=>Number.isFinite(p[key])?[x(i),yWind(p[key]),p[key],i]:null).filter(Boolean);const path=pts.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' ');const isGust=cls==='gust';return `<path class="chart-line ${cls}" d="${path}"/>${pts.map(q=>{const ly=Math.max(top+11,Math.min(h-bottom-6,q[1]+(isGust?-10:16)));return `<circle class="chart-dot ${cls}" cx="${q[0]}" cy="${q[1]}" r="4"><title>${esc(points[q[3]].point.name)} ${points[q[3]].point.time} ${label} ${num(q[2])}m/s</title></circle><text class="chart-value ${isGust?'gust-value':'wind-value'}" x="${q[0]}" y="${ly.toFixed(1)}" text-anchor="middle">${num(q[2])}</text>`;}).join('')}`;};
  const xTicks=points.map((p,i)=>`<g class="chart-step"><circle class="chart-step-dot" cx="${x(i)}" cy="${h-27}" r="10"></circle><text class="chart-step-text" x="${x(i)}" y="${h-23}" text-anchor="middle">${String(i+1).padStart(2,'0')}</text></g>`).join('');
  return `<article class="chart-card featured"><div class="chart-head"><div><h3>風・降水</h3><small>降水量のバーに、風速と突風を重ねて表示</small></div><div class="chart-legend"><span class="chart-legend-item rain">降水量</span><span class="chart-legend-item s0">風速</span><span class="chart-legend-item gust">突風</span></div></div>${chartKpis([{label:'最大降水',value:`${num(max(points.map(p=>p.rain)))} mm/h`},{label:'最大風速',value:`${num(max(points.map(p=>p.wind)))} m/s`},{label:'最大突風',value:`${num(max(points.map(p=>p.gust)))} m/s`}])}<div class="chart-canvas dual"><div class="chart-scale top left">風 ${num(windMax)}m/s</div><div class="chart-scale top right">雨 ${num(rainMax)}mm/h</div><div class="chart-scale bottom left">0</div><div class="chart-scale bottom right">0</div><svg class="chart-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="風と降水の複合グラフ"><defs><linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#91d1ff"/><stop offset="100%" stop-color="#4aa5ff"/></linearGradient></defs>${gridLines(w,h,left,right,top,bottom,4)}<line class="chart-axis" x1="${left}" y1="${h-bottom}" x2="${w-right}" y2="${h-bottom}"/>${bars}${buildLine('wind','s0','風速')}${buildLine('gust','gust','突風')}${xTicks}</svg></div>${pointLegend(points)}</article>`;
}
function renderTempCloudChart(points){
  const w=720,h=270,left=42,right=42,top=24,bottom=58;
  const temps=points.map(p=>p.temp).filter(Number.isFinite), clouds=points.map(p=>p.cloud).filter(Number.isFinite);
  let tMin=temps.length?Math.min(...temps):0, tMax=temps.length?Math.max(...temps):1;
  if(tMin===tMax){tMin-=1;tMax+=1;}
  const pad=Math.max(1,(tMax-tMin)*.12); tMin-=pad; tMax+=pad;
  const x=i=>points.length===1?w/2:left+i*(w-left-right)/(points.length-1);
  const yTemp=v=>h-bottom-(v-tMin)*(h-top-bottom)/(tMax-tMin);
  const yCloud=v=>h-bottom-(Math.max(0,Math.min(100,v))/100)*(h-top-bottom);
  const barW=Math.min(28,Math.max(8,(w-left-right)/Math.max(points.length*2.5,10)));
  const bars=points.map((p,i)=>{const val=Number.isFinite(p.cloud)?p.cloud:0;const yy=yCloud(val),xx=x(i)-barW/2;const labelY=Math.min(h-bottom-6,Math.max(top+14,yy+14));return `<rect class="cloud-bar" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(0,h-bottom-yy).toFixed(1)}" rx="5"><title>${esc(p.point.name)} ${p.point.time} 雲量 ${num(val,0)}%</title></rect><text class="chart-value cloud-value" x="${x(i)}" y="${labelY.toFixed(1)}" text-anchor="middle">${num(val,0)}%</text>`;}).join('');
  const pts=points.map((p,i)=>Number.isFinite(p.temp)?[x(i),yTemp(p.temp),p.temp,i]:null).filter(Boolean);
  const path=pts.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' ');
  const line=`<path class="chart-line temp" d="${path}"/>${pts.map(q=>{const ly=Math.max(top+11,q[1]-10);return `<circle class="chart-dot temp" cx="${q[0]}" cy="${q[1]}" r="4"><title>${esc(points[q[3]].point.name)} ${points[q[3]].point.time} 気温 ${num(q[2])}℃</title></circle><text class="chart-value temp-value" x="${q[0]}" y="${ly.toFixed(1)}" text-anchor="middle">${num(q[2])}℃</text>`;}).join('')}`;
  const xTicks=points.map((p,i)=>`<g class="chart-step"><circle class="chart-step-dot" cx="${x(i)}" cy="${h-27}" r="10"></circle><text class="chart-step-text" x="${x(i)}" y="${h-23}" text-anchor="middle">${String(i+1).padStart(2,'0')}</text></g>`).join('');
  const avgCloud=clouds.length?clouds.reduce((a,b)=>a+b,0)/clouds.length:NaN;
  return `<article class="chart-card featured"><div class="chart-head"><div><h3>気温・雲量</h3><small>気温の推移と、雲量による視界悪化の目安を同時表示</small></div><div class="chart-legend"><span class="chart-legend-item temp">気温</span><span class="chart-legend-item cloud">雲量</span></div></div>${chartKpis([{label:'最低気温',value:`${num(Math.min(...temps))}℃`},{label:'最高気温',value:`${num(Math.max(...temps))}℃`},{label:'平均雲量',value:`${num(avgCloud,0)}%`}])}<div class="chart-canvas temp-cloud"><div class="chart-scale top left">気温 ${num(tMax)}℃</div><div class="chart-scale top right">雲 100%</div><div class="chart-scale bottom left">${num(tMin)}℃</div><div class="chart-scale bottom right">0%</div><svg class="chart-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="気温と雲量の複合グラフ"><defs><linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c3cbd3" stop-opacity=".78"/><stop offset="100%" stop-color="#8f9aa6" stop-opacity=".36"/></linearGradient></defs>${gridLines(w,h,left,right,top,bottom,4)}<line class="chart-axis" x1="${left}" y1="${h-bottom}" x2="${w-right}" y2="${h-bottom}"/>${bars}${line}${xTicks}</svg></div>${pointLegend(points)}</article>`;
}
function renderWeatherCharts(points){
  const el=$('weatherCharts'); if(!el)return;
  el.innerHTML=[renderImpactChart(points),renderTempCloudChart(points)].join('');
  const ribbon=$('riskRibbon'); if(ribbon)ribbon.innerHTML=`<div class="risk-ribbon-head"><b>地点別リスク</b><small>番号はグラフのポイント番号と対応しています</small></div><div class="risk-ribbon-track">${points.map((p,i)=>`<div class="risk-stop g-${p.grade}"><span>${String(i+1).padStart(2,'0')}</span><b>${p.grade}</b><small>${esc(p.point.name)}</small><em>${esc(p.point.time||'')}</em></div>`).join('')}</div>`;
}

function thunderBadge(level){
  const lv=String(level||'LOW').toUpperCase();
  if(lv==='EXTREME')return `<span class="thunder-badge extreme">⚡⚡ EXTREME</span>`;
  if(lv==='HIGH')return `<span class="thunder-badge high">⚡ HIGH</span>`;
  if(lv==='MEDIUM')return `<span class="thunder-badge medium">⚡ MEDIUM</span>`;
  return `<span class="thunder-badge low">LOW</span>`;
}
function renderAll(points,overnight=[]){

  $('results').classList.remove('hidden'); renderWeatherCharts(points); const worst=points.reduce((a,b)=>gradeRank(b.grade)>gradeRank(a.grade)?b:a,points[0]); const best=points.reduce((a,b)=>gradeRank(b.grade)<gradeRank(a.grade)?b:a,points[0]);
  $('grade').textContent=worst.grade; $('verdict').textContent=verdict(worst.grade); $('bestWindow').textContent=`${best.point.date} ${best.point.time} ${best.point.name}`; $('maxWind').textContent=`${num(max(points.flatMap(x=>x.providerRows.map(y=>y.row.wind))))} m/s`; $('maxRain').textContent=`${num(max(points.flatMap(x=>x.providerRows.map(y=>y.row.rain))))} mm/h`; $('thunderRisk').innerHTML=thunderBadge(maxThunder(points.map(x=>x.thunder))); $('confidence').textContent=overallConfidence(points.map(x=>x.confidence));
  $('forecastCards').innerHTML=points.map((r,i)=>`<article class="forecast-card"><div class="card-head"><div><span>${String(i+1).padStart(2,'0')} / ${TYPE_LABEL[r.point.type]}</span><h3>${esc(r.point.name)}</h3><small>${r.point.date} ${r.point.time} / ${Math.round(r.point.elevation||0)}m</small></div><b class="grade g-${r.grade}">${r.grade}</b></div><div class="metrics"><span>気温 <b>${num(r.temp)}℃</b></span><span>風 <b>${num(r.wind)}m/s</b></span><span>突風 <b>${num(r.gust)}m/s</b></span><span>雨 <b>${num(r.rain)}mm/h</b></span><span>雲 <b>${num(r.cloud,0)}%</b></span><span class="thunder-metric thunder-${String(r.thunder).toLowerCase()}">雷 <b>${thunderBadge(r.thunder)}</b></span></div><div class="model-note">取得 ${r.providerRows.length}/${providers.length}モデル / 一致度 ${r.confidence}${r.errors.length?`<br><small>${esc(r.errors.join(' / '))}</small>`:''}</div></article>`).join('');
  const overnightWithArrival=overnight.map(o=>{const match=points.find(r=>r.point===o.point||(r.point.name===o.point.name&&r.point.date===o.point.date&&r.point.time===o.point.time));return {...o,arrivalTemp:match?.temp};});
  renderOvernights(overnightWithArrival);
  $('modelDetails').innerHTML=points.map(r=>`<article class="model-block"><h3>${esc(r.point.name)} <small>${r.point.date} ${r.point.time}</small></h3><div class="table-wrap"><table><thead><tr><th>モデル</th><th>気温</th><th>風</th><th>突風</th><th>雨</th><th>雲</th><th>大気不安定度</th><th>視程</th></tr></thead><tbody>${r.providerRows.map(x=>`<tr><td>${x.provider.name}</td><td>${num(x.row.temp)}℃</td><td>${num(x.row.wind)}m/s</td><td>${num(x.row.gust)}m/s</td><td>${num(x.row.rain)}mm</td><td>${num(x.row.cloud,0)}%</td><td>${num(x.row.cape,0)} J/kg</td><td>${Number.isFinite(x.row.visibility)?Math.round(x.row.visibility)+'m':'–'}</td></tr>`).join('')}</tbody></table></div></article>`).join('');
  $('updatedAt').textContent=new Date().toLocaleString('ja-JP');
}
async function proxyFetch(url){return fetch(`/api/proxy?url=${encodeURIComponent(url)}`);}
function setStatus(t,e=false){$('status').textContent=t;$('status').classList.remove('hidden');$('status').classList.toggle('error',e);}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);}
function todayLocal(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10);}
function logEvent(event_name,details={}){fetch('/api/event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session_id:sessionId,app_version:APP_VERSION,event_name,...details})}).catch(()=>{});}
