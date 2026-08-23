const $ = id => document.getElementById(id);
const APP_VERSION = '1.4.5';

const providers = [
  {id:'jma',name:'JMA MSM',kind:'openmeteo',endpoint:'https://api.open-meteo.com/v1/jma',model:'jma_msm',forecastDays:4,vars:['temperature_2m','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_direction_10m']},
  {id:'ecmwf',name:'ECMWF IFS',kind:'openmeteo',endpoint:'https://api.open-meteo.com/v1/ecmwf',forecastDays:15,vars:['temperature_2m','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_gusts_10m','wind_direction_10m','cape','visibility','freezing_level_height']},
  {id:'gfs',name:'GFS',kind:'openmeteo',endpoint:'https://api.open-meteo.com/v1/gfs',forecastDays:16,vars:['temperature_2m','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_gusts_10m','wind_direction_10m','cape','visibility','freezing_level_height']},
  {id:'icon',name:'ICON',kind:'openmeteo',endpoint:'https://api.open-meteo.com/v1/dwd-icon',forecastDays:8,vars:['temperature_2m','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_gusts_10m','wind_direction_10m','cape','visibility','freezing_level_height']}
];
const TYPE_LABEL={trailhead:'登山口・下山口',peak:'山頂',hut:'山小屋・避難小屋'};
const ROUTE_MAP_DEFAULT_VIEW=[36.2,138.2];
const routeMapViews={};
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
  '赤岳': {latitude:35.970833, longitude:138.370000},
  '谷川岳': {latitude:36.8370, longitude:138.9300},
  '木曽駒ヶ岳': {latitude:35.7895, longitude:137.8047},
  // V1.12.56 中央アルプス木曽駒〜空木縦走主要ピーク
  '宝剣岳': {latitude:35.781389, longitude:137.809167},
  '檜尾岳': {latitude:35.751944, longitude:137.813333},
  '熊沢岳': {latitude:35.739167, longitude:137.803333},
  '東川岳': {latitude:35.725278, longitude:137.805556},
  '御嶽山': {latitude:35.8929, longitude:137.4803},
  '大山': {latitude:35.3711, longitude:133.5462},
  '石鎚山': {latitude:33.7679, longitude:133.1150},
  '宮之浦岳': {latitude:30.3362, longitude:130.5042},
  // V1.9.1 北アルプス主要ピーク（縦走利用向け追加）
  '蝶ヶ岳': {latitude:36.2871, longitude:137.7265},
  '西穂高岳': {latitude:36.2788, longitude:137.6296},
  '笠ヶ岳（岐阜）': {latitude:36.3157, longitude:137.5504},
  '焼岳': {latitude:36.2269, longitude:137.5869},
  '薬師岳': {latitude:36.4689, longitude:137.5447},
  '黒部五郎岳': {latitude:36.3925, longitude:137.5408},
  '鷲羽岳': {latitude:36.4031, longitude:137.6053},
  '水晶岳（黒岳）': {latitude:36.4263, longitude:137.6028},
  '野口五郎岳': {latitude:36.4320, longitude:137.6372},
  '烏帽子岳': {latitude:36.4780, longitude:137.6505},
  '爺ヶ岳': {latitude:36.5883, longitude:137.7507},
  '針ノ木岳': {latitude:36.5374, longitude:137.6842},
  '蓮華岳': {latitude:36.5350, longitude:137.7030},
  '奥大日岳': {latitude:36.5986, longitude:137.5831},
  // V1.10.0 南アルプス・八ヶ岳の縦走主要ピーク
  '鳳凰山': {latitude:35.7017, longitude:138.3047},
  '横岳（八ヶ岳）': {latitude:35.984722, longitude:138.373611},
  '硫黄岳（八ヶ岳）': {latitude:35.998611, longitude:138.370000},
  '阿弥陀岳': {latitude:35.972222, longitude:138.358889},
  '権現岳': {latitude:35.949722, longitude:138.359722},
  '編笠山': {latitude:35.941667, longitude:138.345000},
  '北横岳': {latitude:36.087500, longitude:138.320000},
  // V1.10.3: geocoder依存を避ける代表的な山頂座標
  '筑波山': {latitude:36.225393, longitude:140.106982},
  '八経ヶ岳': {latitude:34.173611, longitude:135.907500},
  '日出ヶ岳': {latitude:34.185278, longitude:136.109167},
  '御在所岳': {latitude:35.020457, longitude:136.418668},
  '山上ヶ岳': {latitude:34.252500, longitude:135.941111},
  // V1.12.6: 国土地理院/JMAの韓国岳山頂座標を固定
  '霧島山（韓国岳）': {latitude:31.934167, longitude:130.861667}
};

const JAPAN_300_MOUNTAINS = [
  "利尻山",
  "羅臼岳",
  "斜里岳",
  "雄阿寒岳",
  "天塩岳",
  "ニセイカウシュッペ山",
  "大雪山（旭岳）",
  "石狩岳",
  "トムラウシ山",
  "オプタテシケ山",
  "十勝岳",
  "ニペソツ山",
  "幌尻岳",
  "カムイエクウチカウシ山",
  "ペテガリ岳",
  "神威岳",
  "芦別岳",
  "夕張岳",
  "暑寒別岳",
  "余市岳",
  "樽前山",
  "後方羊蹄山",
  "ニセコアンヌプリ",
  "狩場山",
  "渡島駒ヶ岳",
  "大千軒岳",
  "八甲田山",
  "岩木山",
  "白神岳",
  "八幡平",
  "乳頭山（烏帽子岳）",
  "秋田駒ヶ岳",
  "岩手山",
  "姫神山",
  "早池峰山",
  "五葉山",
  "和賀岳",
  "焼石岳",
  "栗駒山",
  "神室山",
  "森吉山",
  "太平山",
  "鳥海山",
  "月山",
  "摩耶山",
  "以東岳",
  "大朝日岳",
  "祝瓶山",
  "船形山",
  "泉ヶ岳",
  "蔵王山（熊野岳）",
  "飯豊山",
  "西吾妻山",
  "一切経山",
  "安達太良山",
  "磐梯山",
  "二岐山",
  "七ヶ岳",
  "荒海山",
  "帝釈山",
  "会津駒ヶ岳",
  "会津朝日岳",
  "燧ヶ岳",
  "大滝根山",
  "杁差岳",
  "二王子岳",
  "粟ヶ岳",
  "御神楽岳",
  "守門岳",
  "浅草岳",
  "平ヶ岳",
  "越後駒ヶ岳",
  "中ノ岳",
  "八海山",
  "苗場山",
  "佐武流山",
  "鳥甲山",
  "金北山",
  "米山",
  "八溝山",
  "筑波山",
  "三本槍岳",
  "男鹿岳",
  "景鶴山",
  "至仏山",
  "釈迦ヶ岳（栃木）",
  "女峰山",
  "男体山",
  "太郎山",
  "奥白根山",
  "皇海山",
  "袈裟丸山",
  "武尊山",
  "赤城山（黒檜山）",
  "草津白根山",
  "浅間隠山",
  "榛名山（榛名富士）",
  "妙義山（相馬岳）",
  "荒船山",
  "諏訪山",
  "巻機山",
  "朝日岳（群馬）",
  "谷川岳",
  "仙ノ倉山",
  "白砂山",
  "横手山",
  "岩菅山",
  "笠ヶ岳（長野）",
  "四阿山",
  "浅間山",
  "御座山",
  "蓼科山",
  "天狗岳",
  "八ヶ岳（赤岳）",
  "入笠山",
  "霧ヶ峰（車山）",
  "鉢伏山",
  "美ヶ原",
  "飯縄山",
  "戸隠山",
  "高妻山",
  "黒姫山",
  "斑尾山",
  "妙高山",
  "火打山",
  "焼山",
  "雨飾山",
  "青海黒姫山",
  "朝日岳（新潟・富山）",
  "雪倉岳",
  "白馬岳",
  "唐松岳",
  "五竜岳",
  "鹿島槍ヶ岳",
  "爺ヶ岳",
  "針ノ木岳",
  "蓮華岳",
  "毛勝山",
  "剱岳",
  "立山",
  "奥大日岳",
  "鍬崎山",
  "薬師岳",
  "黒部五郎岳",
  "烏帽子岳",
  "野口五郎岳",
  "水晶岳（黒岳）",
  "鷲羽岳",
  "三俣蓮華岳",
  "赤牛岳",
  "笠ヶ岳（岐阜）",
  "餓鬼岳",
  "燕岳",
  "有明山",
  "大天井岳",
  "常念岳",
  "槍ヶ岳",
  "奥穂高岳",
  "焼岳",
  "霞沢岳",
  "鉢盛山",
  "乗鞍岳",
  "御嶽",
  "小秀山",
  "奥三界岳",
  "経ヶ岳（長野）",
  "木曽駒ヶ岳",
  "空木岳",
  "南駒ヶ岳",
  "越百山",
  "安平路山",
  "南木曽岳",
  "恵那山",
  "武甲山",
  "両神山",
  "雲取山",
  "和名倉山（白石山）",
  "甲武信ヶ岳",
  "国師ヶ岳",
  "金峰山",
  "瑞牆山",
  "茅ヶ岳",
  "乾徳山",
  "大菩薩嶺",
  "大岳山",
  "三頭山",
  "大山（神奈川）",
  "塔ノ岳",
  "金時山",
  "箱根山",
  "天城山（万三郎岳）",
  "愛鷹山（越前岳）",
  "毛無山",
  "七面山",
  "山伏",
  "櫛形山",
  "御正体山",
  "三ッ峠山",
  "黒岳",
  "富士山",
  "甲斐駒ヶ岳",
  "鋸岳",
  "仙丈ヶ岳",
  "アサヨ峰",
  "地蔵ヶ岳",
  "北岳",
  "間ノ岳",
  "農鳥岳",
  "塩見岳",
  "荒川岳",
  "赤石岳",
  "聖岳",
  "上河内岳",
  "茶臼岳",
  "光岳",
  "池口岳",
  "奥茶臼山",
  "大無間山",
  "黒法師岳",
  "笊ヶ岳",
  "高塚山",
  "熊伏山",
  "白木峰",
  "金剛堂山",
  "人形山",
  "医王山",
  "大門山",
  "大笠山",
  "笈ヶ岳",
  "三方岩岳",
  "猿ヶ馬場山",
  "白山",
  "経ヶ岳（福井）",
  "野伏ヶ岳",
  "大日ヶ岳",
  "鷲ヶ岳",
  "位山",
  "川上岳",
  "荒島岳",
  "能郷白山",
  "冠山",
  "伊吹山",
  "藤原岳",
  "御在所岳",
  "倶留尊山",
  "三峰山",
  "高見山",
  "日出ヶ岳",
  "竜門岳",
  "山上ヶ岳",
  "八経ヶ岳",
  "釈迦ヶ岳（奈良）",
  "伯母子岳",
  "護摩壇山",
  "大和葛城山",
  "金剛山",
  "武奈ヶ岳",
  "蓬来山",
  "比叡山",
  "愛宕山",
  "六甲山",
  "扇ノ山",
  "氷ノ山",
  "那岐山",
  "大山（鳥取）",
  "上蒜山",
  "道後山",
  "吾妻山",
  "三瓶山",
  "剣山",
  "三嶺",
  "東赤石山",
  "笹ヶ峰",
  "伊予富士",
  "瓶ヶ森",
  "石鎚山",
  "三本杭",
  "篠山",
  "英彦山",
  "脊振山",
  "多良岳",
  "雲仙岳（普賢岳）",
  "鶴見岳",
  "由布岳",
  "大船山",
  "久住山",
  "湧蓋山",
  "阿蘇山（高岳）",
  "祖母山",
  "傾山",
  "大崩山",
  "国見岳",
  "市房山",
  "尾鈴山",
  "霧島山（韓国岳）",
  "高千穂峰",
  "桜島（御岳）",
  "高隈山",
  "開聞岳",
  "宮ノ浦岳"
];
const MOUNTAIN_NAME_ALIAS = {
  '大山（鳥取）':'大山',
  '宮ノ浦岳':'宮之浦岳',
  '御嶽':'御嶽山',
  '八ヶ岳（赤岳）':'赤岳',
  '大山（神奈川）':'大山（神奈川）',
  '朝日岳（群馬）':'朝日岳（群馬）',
  '朝日岳（新潟・富山）':'朝日岳（新潟・富山）',
  '笠ヶ岳（長野）':'笠ヶ岳（長野）',
  '笠ヶ岳（岐阜）':'笠ヶ岳（岐阜）',
  '経ヶ岳（長野）':'経ヶ岳（長野）',
  '経ヶ岳（福井）':'経ヶ岳（福井）',
  '釈迦ヶ岳（栃木）':'釈迦ヶ岳（栃木）',
  '釈迦ヶ岳（奈良）':'釈迦ヶ岳（奈良）'
};
function canonicalMountainName(label){return MOUNTAIN_NAME_ALIAS[label]||label;}
function mountainSearchQuery(label){
  const alias={'宮ノ浦岳':'宮之浦岳','御嶽':'御嶽山','八ヶ岳（赤岳）':'赤岳','八経ヶ岳':'八経ヶ岳','筑波山':'筑波山 女体山','日出ヶ岳':'大台ヶ原山 日出ヶ岳','御在所岳':'御在所山','山上ヶ岳':'大峰山 山上ヶ岳'}[label];
  if(alias)return alias;
  return String(label||'').replace(/（/g,' ').replace(/）/g,' ').replace(/\s+/g,' ').trim();
}
function mountainSearchVariants(label){
  const canonical=canonicalMountainName(label);
  const base=mountainSearchQuery(label);
  const variants=[canonical,base,String(label||'')];
  const aliasMap={
    '八経ヶ岳':['八経ヶ岳','八剣山','仏経ヶ岳','大峰山 八経ヶ岳'],
    '筑波山':['筑波山','女体山 筑波山','男体山 筑波山'],
    '日出ヶ岳':['日出ヶ岳','大台ヶ原山 日出ヶ岳','大台ケ原山 日出ヶ岳','大台ヶ原山'],
    '御在所岳':['御在所岳','御在所山','御在所岳 三重'],
    '山上ヶ岳':['山上ヶ岳','大峰山 山上ヶ岳','大峯山 山上ヶ岳'],
    '大雪山（旭岳）':['旭岳 大雪山'],
    '蔵王山（熊野岳）':['熊野岳 蔵王山'],
    '雲仙岳（普賢岳）':['普賢岳 雲仙岳'],
    '霧島山（韓国岳）':['韓国岳 霧島山'],
    '阿蘇山（高岳）':['高岳 阿蘇山']
  };
  const extra=aliasMap[label]||aliasMap[canonical]||[];
  return [...new Set([...variants,...extra].map(x=>String(x||'').trim()).filter(Boolean))];
}
async function resolvePeakByOverpass(label){
  const variants=mountainSearchVariants(label);
  for(const name of variants){
    const escaped=name.replaceAll('\"','\\\"');
    const query=`[out:json][timeout:18];(nwr["natural"="peak"]["name"="${escaped}"](area:3600382243);nwr["natural"="peak"]["name:ja"="${escaped}"](area:3600382243););out center tags 8;`;
    try{
      const res=await fetch('/api/overpass',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query})});
      if(!res.ok)continue;
      const data=await res.json();
      const rows=(data.elements||[]).map(el=>({lat:Number(el.lat??el.center?.lat),lon:Number(el.lon??el.center?.lon),tags:el.tags||{}})).filter(x=>Number.isFinite(x.lat)&&Number.isFinite(x.lon));
      if(rows.length)return {latitude:rows[0].lat,longitude:rows[0].lon};
    }catch(_){ }
  }
  return null;
}

const BUILTIN_ROUTE_CATALOG = {
  '筑波山': [
    {id:'builtin-tsukuba-tsutsujigaoka',type:'trailhead',name:'つつじヶ丘',lat:36.2201631,lon:140.1194898,elevation:542},
    {id:'builtin-tsukuba-jinja',type:'trailhead',name:'筑波山神社入口',lat:36.2137,lon:140.1016,elevation:270},
    {id:'builtin-tsukuba-nyotai',type:'peak',name:'筑波山（女体山）',lat:36.225393,lon:140.106982,elevation:877},
    {id:'builtin-tsukuba-nantai',type:'peak',name:'筑波山（男体山）',lat:36.225965,lon:140.098399,elevation:871}
  ],
  '八経ヶ岳': [
    {id:'builtin-hakkyo-tunnel',type:'trailhead',name:'行者還トンネル西口',lat:34.188877,lon:135.937116,elevation:1100},
    {id:'builtin-hakkyo-misenhut',type:'hut',name:'弥山小屋',lat:34.179444,lon:135.910278,elevation:1876},
    {id:'builtin-hakkyo-peak',type:'peak',name:'八経ヶ岳',lat:34.173611,lon:135.907500,elevation:1915}
  ],
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
    {id:'builtin-tsuru-hayatsuki',type:'trailhead',name:'馬場島（早月尾根登山口）',lat:36.645254,lon:137.560383,elevation:780,source:'固定候補'},
    {id:'builtin-tsuru-hayatsukigoya',type:'hut',name:'早月小屋',lat:36.631111,lon:137.597778,elevation:2214,source:'固定候補'},
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
    {id:'builtin-fuji-subaru',type:'trailhead',name:'富士スバルライン五合目（吉田口）',lat:35.394667,lon:138.731872,elevation:2300,source:'固定候補'},
    {id:'builtin-fuji-subashiri',type:'trailhead',name:'須走口五合目',lat:35.364942,lon:138.777077,elevation:1980,source:'固定候補'},
    {id:'builtin-fuji-gotemba',type:'trailhead',name:'御殿場口新五合目',lat:35.335281,lon:138.794672,elevation:1430,source:'固定候補'},
    {id:'builtin-fuji-fujinomiya',type:'trailhead',name:'富士宮口五合目',lat:35.336540,lon:138.734233,elevation:2380,source:'固定候補'},
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
  '蝶ヶ岳': [
    {id:'builtin-chou-mitsumata',type:'trailhead',name:'三股登山口',lat:36.2628,lon:137.7543,elevation:1350},
    {id:'builtin-chou-kamikochi',type:'trailhead',name:'上高地',lat:36.246656,lon:137.635388,elevation:1505},
    {id:'builtin-chou-yokoo',type:'hut',name:'横尾山荘',lat:36.293444,lon:137.699175,elevation:1600},
    {id:'builtin-chou-hutte',type:'hut',name:'蝶ヶ岳ヒュッテ',lat:36.2875,lon:137.7258,elevation:2670},
    {id:'builtin-chou-peak',type:'peak',name:'蝶ヶ岳',lat:36.2871,lon:137.7265,elevation:2677}
  ],
  '西穂高岳': [
    {id:'builtin-nishiho-kamikochi',type:'trailhead',name:'上高地',lat:36.246656,lon:137.635388,elevation:1505},
    {id:'builtin-nishiho-ropeway',type:'trailhead',name:'新穂高ロープウェイ 西穂高口駅',lat:36.2708,lon:137.5952,elevation:2156},
    {id:'builtin-nishiho-sanso',type:'hut',name:'西穂山荘',lat:36.2655,lon:137.6184,elevation:2385},
    {id:'builtin-nishiho-peak',type:'peak',name:'西穂高岳',lat:36.2788,lon:137.6296,elevation:2909}
  ],
  '笠ヶ岳（岐阜）': [
    {id:'builtin-kasa-shinhotaka',type:'trailhead',name:'新穂高温泉',lat:36.285405,lon:137.575014,elevation:1117},
    {id:'builtin-kasa-kasashindo',type:'trailhead',name:'笠新道登山口',lat:36.3008,lon:137.5866,elevation:1370},
    {id:'builtin-kasa-wasabidaira',type:'hut',name:'わさび平小屋',lat:36.3075,lon:137.5925,elevation:1402},
    {id:'builtin-kasa-sanso',type:'hut',name:'笠ヶ岳山荘',lat:36.3146,lon:137.5516,elevation:2810},
    {id:'builtin-kasa-peak',type:'peak',name:'笠ヶ岳',lat:36.3157,lon:137.5504,elevation:2898}
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


// V1.10.6: 近畿主要20座の代表登山口を座標込みで固定。
// 外部ジオコーディングに失敗しても、最低1つの登山口候補を即表示する。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '伊吹山': [
    {id:'kinki-ibuki-ueno',type:'trailhead',name:'伊吹山 上野登山口（三之宮神社）',lat:35.394142,lon:136.382775,elevation:220}
  ],
  '藤原岳': [
    {id:'kinki-fujiwara-ogaido',type:'trailhead',name:'大貝戸登山口',lat:35.1704991,lon:136.4751261,elevation:160},
    {id:'kinki-fujiwara-hut',type:'hut',name:'藤原山荘',lat:35.1579,lon:136.4468,elevation:1090}
  ],
  '御在所岳': [
    {id:'kinki-gozaisho-naka',type:'trailhead',name:'中道登山口',lat:35.014417,lon:136.436667,elevation:570},
    {id:'kinki-gozaisho-budodani',type:'trailhead',name:'武平峠登山口',lat:35.011361,lon:136.421556,elevation:810}
  ],
  '倶留尊山': [
    {id:'kinki-kuroso-soni',type:'trailhead',name:'曽爾高原登山口',lat:34.518261,lon:136.160949,elevation:700}
  ],
  '三峰山': [
    {id:'kinki-miune-mitsue',type:'trailhead',name:'みつえ青少年旅行村（三峰山登山口）',lat:34.471333,lon:136.195250,elevation:556}
  ],
  '高見山': [
    {id:'kinki-takami-takasumi',type:'trailhead',name:'たかすみ温泉登山口',lat:34.439833,lon:136.060556,elevation:470}
  ],
  '日出ヶ岳': [
    {id:'kinki-hide-vc',type:'trailhead',name:'大台ヶ原ビジターセンター',lat:34.180694,lon:136.097139,elevation:1570}
  ],
  '竜門岳': [
    {id:'kinki-ryumon',type:'trailhead',name:'竜門岳登山口（バイオトイレ前）',lat:34.420936,lon:135.892397,elevation:520}
  ],
  '山上ヶ岳': [
    {id:'kinki-sanjo-ohmine',type:'trailhead',name:'大峯大橋・清浄大橋登山口',lat:34.267139,lon:135.913167,elevation:916}
  ],
  '八経ヶ岳': [
    {id:'builtin-hakkyo-tunnel',type:'trailhead',name:'行者還トンネル西口',lat:34.188877,lon:135.937116,elevation:1100},
    {id:'builtin-hakkyo-misenhut',type:'hut',name:'弥山小屋',lat:34.179444,lon:135.910278,elevation:1876},
    {id:'builtin-hakkyo-peak',type:'peak',name:'八経ヶ岳',lat:34.173611,lon:135.907500,elevation:1915}
  ],
  '釈迦ヶ岳（奈良）': [
    {id:'kinki-shaka-futoo',type:'trailhead',name:'太尾登山口',lat:34.098167,lon:135.871750,elevation:1310}
  ],
  '伯母子岳': [
    {id:'kinki-obako-omata',type:'trailhead',name:'大股登山口',lat:34.106222,lon:135.631139,elevation:660},
    {id:'kinki-obako-hut',type:'hut',name:'伯母子岳避難小屋',lat:34.0769,lon:135.6503,elevation:1240}
  ],
  '護摩壇山': [
    {id:'kinki-gomadan',type:'trailhead',name:'護摩壇山森林公園ワイルドライフ',lat:34.040556,lon:135.567222,elevation:1000}
  ],
  '大和葛城山': [
    {id:'kinki-katsuragi-mizukoshi',type:'trailhead',name:'水越峠',lat:34.443567,lon:135.681872,elevation:510}
  ],
  '金剛山': [
    {id:'kinki-kongo-chihaya',type:'trailhead',name:'千早本道登山口',lat:34.418667,lon:135.650667,elevation:524},
    {id:'kinki-kongo-mizukoshi',type:'trailhead',name:'水越峠',lat:34.443567,lon:135.681872,elevation:510}
  ],
  '武奈ヶ岳': [
    {id:'kinki-buna-bomura',type:'trailhead',name:'坊村登山口',lat:35.246389,lon:135.866556,elevation:305},
    {id:'kinki-buna-intani',type:'trailhead',name:'イン谷口',lat:35.239083,lon:135.926194,elevation:270}
  ],
  '蓬来山': [
    {id:'kinki-horai-ropeway',type:'trailhead',name:'びわ湖バレイ ロープウェイ山頂駅',lat:35.213385,lon:135.895707,elevation:1100}
  ],
  '比叡山': [
    {id:'kinki-hiei-cable',type:'trailhead',name:'ケーブル延暦寺駅',lat:35.0665212,lon:135.843941,elevation:650}
  ],
  '愛宕山': [
    {id:'kinki-atago-kiyotaki',type:'trailhead',name:'清滝・愛宕山表参道登山口',lat:35.039750,lon:135.658220,elevation:90}
  ],
  '六甲山': [
    {id:'kinki-rokko-koza',type:'trailhead',name:'高座の滝・ロックガーデン入口',lat:34.745969,lon:135.288225,elevation:250},
    {id:'kinki-rokko-arima',type:'trailhead',name:'有馬温泉 六甲山登山口',lat:34.7973,lon:135.2496,elevation:380}
  ]
});



// V1.11.0: 全国主要山の代表登山口を座標込みで固定。
// まず利用頻度の高い山を固定し、名称固定候補 + 自動探索で全国の穴を補完する。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '剣山': [
    {id:'fixed-shikoku-tsurugi-minokoshi',type:'trailhead',name:'見ノ越 剣山登山口',lat:33.853577,lon:134.094250,elevation:1400},
    {id:'fixed-shikoku-tsurugi-nishijima',type:'trailhead',name:'剣山観光登山リフト 西島駅',lat:33.860656,lon:134.092260,elevation:1750}
  ],
  '祖母山': [
    {id:'fixed-kyushu-sobo-kitadani',type:'trailhead',name:'北谷登山口',lat:32.820472,lon:131.325167,elevation:1110},
    {id:'fixed-kyushu-sobo-kambara',type:'trailhead',name:'神原登山口',lat:32.854333,lon:131.339778,elevation:690}
  ],
  '久住山': [
    {id:'fixed-kyushu-kuju-makinoto',type:'trailhead',name:'牧ノ戸峠',lat:33.096461,lon:131.208391,elevation:1330},
    {id:'fixed-kyushu-kuju-chojabaru',type:'trailhead',name:'長者原',lat:33.118389,lon:131.229278,elevation:1030}
  ],
  '大船山': [
    {id:'fixed-kyushu-taisen-chojabaru',type:'trailhead',name:'長者原',lat:33.118389,lon:131.229278,elevation:1030},
    {id:'fixed-kyushu-taisen-oidake',type:'trailhead',name:'男池登山口',lat:33.125559,lon:131.294777,elevation:850}
  ],
  '由布岳': [
    {id:'fixed-kyushu-yufu-main',type:'trailhead',name:'由布岳正面登山口',lat:33.264611,lon:131.396278,elevation:780}
  ],
  '湧蓋山': [
    {id:'fixed-kyushu-waita-hatchobaru',type:'trailhead',name:'八丁原登山口',lat:33.104667,lon:131.179694,elevation:1100}
  ],
  '石鎚山': [
    ...(BUILTIN_ROUTE_CATALOG['石鎚山']||[]),
    {id:'fixed-shikoku-ishizuchi-tsuchigoya',type:'trailhead',name:'土小屋登山口',lat:33.758250,lon:133.144778,elevation:1492}
  ],
  '大山（鳥取）': [
    ...(BUILTIN_ROUTE_CATALOG['大山（鳥取）']||[]),
    {id:'fixed-chugoku-daisen-natsu',type:'trailhead',name:'夏山登山口',lat:35.391194,lon:133.530556,elevation:770}
  ],
  '宮之浦岳': [
    ...(BUILTIN_ROUTE_CATALOG['宮之浦岳']||[]),
    {id:'fixed-kyushu-miyanoura-yodogawa',type:'trailhead',name:'淀川登山口',lat:30.299559,lon:130.533802,elevation:1360}
  ]
});

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

// V1.12.56: 中央アルプス 木曽駒ヶ岳〜空木岳の縦走回廊。
// 国土地理院の主要山頂座標と公開情報で確認済みの山小屋座標のみを固定候補として使用。
Object.assign(REGIONAL_CATALOG, {
  central_kisokoma_utsugi: [
    {id:'area-cku-senjojiki',type:'trailhead',name:'千畳敷',lat:35.779700,lon:137.814700,elevation:2612,source:'固定候補'},
    {id:'area-cku-kisokoma',type:'peak',name:'木曽駒ヶ岳',lat:35.789444,lon:137.804444,elevation:2956,source:'固定候補'},
    {id:'area-cku-tengu',type:'hut',name:'天狗荘',lat:35.786100,lon:137.806500,elevation:2870,source:'固定候補'},
    {id:'area-cku-hoken-sanso',type:'hut',name:'宝剣山荘',lat:35.783155,lon:137.808938,elevation:2870,source:'固定候補'},
    {id:'area-cku-chojo',type:'hut',name:'頂上山荘',lat:35.790400,lon:137.806000,elevation:2870,source:'固定候補'},
    {id:'area-cku-hoken',type:'peak',name:'宝剣岳',lat:35.781389,lon:137.809167,elevation:2931,source:'固定候補'},
    {id:'area-cku-hinokio',type:'peak',name:'檜尾岳',lat:35.751944,lon:137.813333,elevation:2728,source:'固定候補'},
    {id:'area-cku-hinokio-hut',type:'hut',name:'檜尾小屋',lat:35.751111,lon:137.816111,elevation:2689,source:'固定候補'},
    {id:'area-cku-kumazawa',type:'peak',name:'熊沢岳',lat:35.739167,lon:137.803333,elevation:2778,source:'固定候補'},
    {id:'area-cku-higashikawa',type:'peak',name:'東川岳',lat:35.725278,lon:137.805556,elevation:2671,source:'固定候補'},
    {id:'area-cku-kisodono',type:'hut',name:'木曽殿山荘',lat:35.723056,lon:137.807778,elevation:2587,source:'固定候補'},
    {id:'area-cku-utsugi',type:'peak',name:'空木岳',lat:35.718889,lon:137.817222,elevation:2864,source:'固定候補'},
    {id:'area-cku-komaho',type:'hut',name:'空木駒峰ヒュッテ',lat:35.719722,lon:137.818333,elevation:2800,source:'固定候補'},
    {id:'area-cku-utsugidaira',type:'hut',name:'空木平避難小屋',lat:35.721111,lon:137.828056,elevation:2517,source:'固定候補'},
    {id:'area-cku-ikeyama',type:'trailhead',name:'池山口登山口',lat:35.736861,lon:137.878032,elevation:1370,source:'固定候補'}
  ]
});

// V1.9.1 北アルプスを山域単位で手登録。OpenStreetMap自動探索より先に確実な主要地点を提示する。
Object.assign(REGIONAL_CATALOG, {
  jonen_chou: [
    {id:'area-jc-mitsumata',type:'trailhead',name:'三股登山口',lat:36.2628,lon:137.7543,elevation:1350},
    {id:'area-jc-ichinosawa',type:'trailhead',name:'一ノ沢登山口',lat:36.3388,lon:137.7420,elevation:1320},
    {id:'area-jc-kamikochi',type:'trailhead',name:'上高地',lat:36.246656,lon:137.635388,elevation:1505},
    {id:'area-jc-yokoo',type:'hut',name:'横尾山荘',lat:36.293444,lon:137.699175,elevation:1600},
    {id:'area-jc-chou',type:'peak',name:'蝶ヶ岳',lat:36.2871,lon:137.7265,elevation:2677},
    {id:'area-jc-chouhutte',type:'hut',name:'蝶ヶ岳ヒュッテ',lat:36.2875,lon:137.7258,elevation:2670},
    {id:'area-jc-jonen',type:'peak',name:'常念岳',lat:36.3255,lon:137.7273,elevation:2857},
    {id:'area-jc-jonengoya',type:'hut',name:'常念小屋',lat:36.3297,lon:137.7281,elevation:2450},
    {id:'area-jc-otensho',type:'peak',name:'大天井岳',lat:36.3658,lon:137.7027,elevation:2922},
    {id:'area-jc-daitenso',type:'hut',name:'大天荘',lat:36.3646,lon:137.7043,elevation:2870}
  ],
  kasa_sugoroku: [
    {id:'area-ks-shinhotaka',type:'trailhead',name:'新穂高温泉',lat:36.285405,lon:137.575014,elevation:1117},
    {id:'area-ks-kasashindo',type:'trailhead',name:'笠新道登山口',lat:36.3008,lon:137.5866,elevation:1370},
    {id:'area-ks-wasabidaira',type:'hut',name:'わさび平小屋',lat:36.3075,lon:137.5925,elevation:1402},
    {id:'area-ks-kagamidaira',type:'hut',name:'鏡平山荘',lat:36.3388,lon:137.5888,elevation:2300},
    {id:'area-ks-kasa',type:'peak',name:'笠ヶ岳',lat:36.3157,lon:137.5504,elevation:2898},
    {id:'area-ks-kasasanso',type:'hut',name:'笠ヶ岳山荘',lat:36.3146,lon:137.5516,elevation:2810},
    {id:'area-ks-sugoroku',type:'peak',name:'双六岳',lat:36.3723,lon:137.5875,elevation:2860},
    {id:'area-ks-sugorokugoya',type:'hut',name:'双六小屋',lat:36.3745,lon:137.5920,elevation:2550},
    {id:'area-ks-mitsumata',type:'peak',name:'三俣蓮華岳',lat:36.3908,lon:137.5879,elevation:2841},
    {id:'area-ks-mitsumatasanso',type:'hut',name:'三俣山荘',lat:36.4020,lon:137.5925,elevation:2550},
    {id:'area-ks-washiba',type:'peak',name:'鷲羽岳',lat:36.4031,lon:137.6053,elevation:2924}
  ],
  nishiho_yake: [
    {id:'area-ny-kamikochi',type:'trailhead',name:'上高地',lat:36.246656,lon:137.635388,elevation:1505},
    {id:'area-ny-ropeway',type:'trailhead',name:'新穂高ロープウェイ 西穂高口駅',lat:36.2708,lon:137.5952,elevation:2156},
    {id:'area-ny-nishihosanso',type:'hut',name:'西穂山荘',lat:36.2655,lon:137.6184,elevation:2385},
    {id:'area-ny-nishiho',type:'peak',name:'西穂高岳',lat:36.2788,lon:137.6296,elevation:2909},
    {id:'area-ny-yake',type:'peak',name:'焼岳',lat:36.2269,lon:137.5869,elevation:2455},
    {id:'area-ny-yakegoya',type:'hut',name:'焼岳小屋',lat:36.2350,lon:137.6017,elevation:2080},
    {id:'area-ny-nakanoyu',type:'trailhead',name:'新中の湯登山口',lat:36.2107,lon:137.6017,elevation:1600}
  ],
  ushiroginza: [
    {id:'area-ug-takase',type:'trailhead',name:'高瀬ダム',lat:36.4690,lon:137.6895,elevation:1270},
    {id:'area-ug-nanakura',type:'trailhead',name:'七倉',lat:36.4740,lon:137.7200,elevation:1070},
    {id:'area-ug-eboshi',type:'peak',name:'烏帽子岳',lat:36.4780,lon:137.6505,elevation:2628},
    {id:'area-ug-eboshigoya',type:'hut',name:'烏帽子小屋',lat:36.4709,lon:137.6577,elevation:2520},
    {id:'area-ug-noguchi',type:'peak',name:'野口五郎岳',lat:36.4320,lon:137.6372,elevation:2924},
    {id:'area-ug-noguchigoya',type:'hut',name:'野口五郎小屋',lat:36.4386,lon:137.6338,elevation:2870},
    {id:'area-ug-suisho',type:'peak',name:'水晶岳',lat:36.4263,lon:137.6028,elevation:2986},
    {id:'area-ug-suishogoya',type:'hut',name:'水晶小屋',lat:36.4191,lon:137.6022,elevation:2900},
    {id:'area-ug-washiba',type:'peak',name:'鷲羽岳',lat:36.4031,lon:137.6053,elevation:2924},
    {id:'area-ug-mitsumatasanso',type:'hut',name:'三俣山荘',lat:36.4020,lon:137.5925,elevation:2550}
  ],
  ushirotateyama: [
    {id:'area-ut-ogisawa',type:'trailhead',name:'扇沢登山口',lat:36.558056,lon:137.721389,elevation:1430},
    {id:'area-ut-otani',type:'trailhead',name:'大谷原登山口',lat:36.604167,lon:137.800000,elevation:1070},
    {id:'area-ut-happo',type:'trailhead',name:'八方池山荘',lat:36.7030,lon:137.7893,elevation:1830},
    {id:'area-ut-alpsdaira',type:'trailhead',name:'アルプス平',lat:36.6817,lon:137.8332,elevation:1515},
    {id:'area-ut-jiigatake',type:'peak',name:'爺ヶ岳',lat:36.5883,lon:137.7507,elevation:2670},
    {id:'area-ut-taneike',type:'hut',name:'種池山荘',lat:36.5769,lon:137.7039,elevation:2450},
    {id:'area-ut-kashima',type:'peak',name:'鹿島槍ヶ岳',lat:36.6244,lon:137.7467,elevation:2889},
    {id:'area-ut-tsumetaike',type:'hut',name:'冷池山荘',lat:36.6049,lon:137.7168,elevation:2410},
    {id:'area-ut-goryu',type:'peak',name:'五竜岳',lat:36.6584,lon:137.7526,elevation:2814},
    {id:'area-ut-goryugoya',type:'hut',name:'五竜山荘',lat:36.6634,lon:137.7547,elevation:2490},
    {id:'area-ut-karamatsu',type:'peak',name:'唐松岳',lat:36.6874,lon:137.7547,elevation:2696},
    {id:'area-ut-karamatsugoya',type:'hut',name:'唐松岳頂上山荘',lat:36.6878,lon:137.7576,elevation:2620}
  ],
  tateyama_tsurugi: [
    {id:'area-tt-murodo',type:'trailhead',name:'室堂',lat:36.5779,lon:137.5950,elevation:2450},
    {id:'area-tt-raichoso',type:'hut',name:'雷鳥荘',lat:36.5852,lon:137.5945,elevation:2370},
    {id:'area-tt-ichinokoshi',type:'hut',name:'一の越山荘',lat:36.5722,lon:137.6086,elevation:2700},
    {id:'area-tt-tateyama',type:'peak',name:'立山（雄山）',lat:36.5759,lon:137.6197,elevation:3003},
    {id:'area-tt-oku',type:'peak',name:'奥大日岳',lat:36.5986,lon:137.5831,elevation:2611},
    {id:'area-tt-hayatsukigoya',type:'hut',name:'早月小屋',lat:36.631111,lon:137.597778,elevation:2214,source:'固定候補'},
    {id:'area-tt-tsurugisawa',type:'hut',name:'剱澤小屋',lat:36.6047,lon:137.6177,elevation:2470},
    {id:'area-tt-kensanso',type:'hut',name:'剣山荘',lat:36.6108,lon:137.6208,elevation:2475},
    {id:'area-tt-tsurugi',type:'peak',name:'剱岳',lat:36.6233,lon:137.6170,elevation:2999}
  ],
  yakushi_kurobe: [
    {id:'area-yk-oritate',type:'trailhead',name:'折立登山口',lat:36.4786,lon:137.4780,elevation:1350},
    {id:'area-yk-tarobe',type:'hut',name:'太郎平小屋',lat:36.4548,lon:137.5195,elevation:2330},
    {id:'area-yk-yakushi',type:'peak',name:'薬師岳',lat:36.4689,lon:137.5447,elevation:2926},
    {id:'area-yk-yakushigoya',type:'hut',name:'薬師岳山荘',lat:36.4630,lon:137.5400,elevation:2700},
    {id:'area-yk-kurobegoro',type:'peak',name:'黒部五郎岳',lat:36.3925,lon:137.5408,elevation:2840},
    {id:'area-yk-kurobegorogoya',type:'hut',name:'黒部五郎小舎',lat:36.3834,lon:137.5565,elevation:2350},
    {id:'area-yk-mitsumata',type:'peak',name:'三俣蓮華岳',lat:36.3908,lon:137.5879,elevation:2841},
    {id:'area-yk-mitsumatasanso',type:'hut',name:'三俣山荘',lat:36.4020,lon:137.5925,elevation:2550}
  ]
});

// V1.9.1 北アルプス北部・針ノ木周辺を追加。
// 手登録地点を基準にし、未登録の小屋等は従来どおりOpenStreetMap探索で補完する。
REGIONAL_CATALOG.hakuba_asahi = [
  {id:'area-ha-tsugaike',type:'trailhead',name:'栂池自然園',lat:36.7498,lon:137.8618,elevation:1860},
  {id:'area-ha-rengeonsen',type:'trailhead',name:'蓮華温泉',lat:36.7858,lon:137.7934,elevation:1475},
  {id:'area-ha-sarukura',type:'trailhead',name:'猿倉',lat:36.6974,lon:137.8182,elevation:1230},
  {id:'area-ha-oike',type:'hut',name:'白馬大池山荘',lat:36.7789,lon:137.7732,elevation:2380},
  {id:'area-ha-hakubasanso',type:'hut',name:'白馬山荘',lat:36.7566,lon:137.7569,elevation:2832},
  {id:'area-ha-asahigoya',type:'hut',name:'朝日小屋',lat:36.82472,lon:137.71528,elevation:2145},
  {id:'area-ha-hakuba',type:'peak',name:'白馬岳',lat:36.7585,lon:137.7586,elevation:2932},
  {id:'area-ha-happo',type:'trailhead',name:'八方池山荘',lat:36.7030,lon:137.7893,elevation:1830},
  {id:'area-ha-karamatsu',type:'peak',name:'唐松岳',lat:36.6874,lon:137.7547,elevation:2696},
  {id:'area-ha-karamatsugoya',type:'hut',name:'唐松岳頂上山荘',lat:36.6878,lon:137.7576,elevation:2620}
];
REGIONAL_CATALOG.harinoki_funakubo = [
  {id:'area-hf-ogisawa',type:'trailhead',name:'扇沢登山口',lat:36.558056,lon:137.721389,elevation:1430},
  {id:'area-hf-harinoki',type:'peak',name:'針ノ木岳',lat:36.5374,lon:137.6842,elevation:2821},
  {id:'area-hf-harinokigoya',type:'hut',name:'針ノ木小屋',lat:36.53711,lon:137.69408,elevation:2536},
  {id:'area-hf-renge',type:'peak',name:'蓮華岳',lat:36.5350,lon:137.7030,elevation:2799},
  {id:'area-hf-nanakura',type:'trailhead',name:'七倉',lat:36.4740,lon:137.7200,elevation:1070},
  {id:'area-hf-funakubo',type:'hut',name:'船窪小屋',lat:36.50648,lon:137.69525,elevation:2459},
  {id:'area-hf-takase',type:'trailhead',name:'高瀬ダム',lat:36.4690,lon:137.6895,elevation:1270},
  {id:'area-hf-taneike',type:'hut',name:'種池山荘',lat:36.5769,lon:137.7039,elevation:2450},
  {id:'area-hf-jiigatake',type:'peak',name:'爺ヶ岳',lat:36.5883,lon:137.7507,elevation:2670}
];


// V1.10.0 南アルプス・八ヶ岳を山域単位で手登録。
// 登山口・山小屋を固定候補として優先し、OSM自動探索で不足分を補完する。
REGIONAL_CATALOG.southalps_north = [
  {id:'area-san-kitasawa',type:'trailhead',name:'北沢峠',lat:35.7353,lon:138.2110,elevation:2032},
  {id:'area-san-todai',type:'trailhead',name:'戸台パーク（仙流荘）',lat:35.8150,lon:138.1610,elevation:860},
  {id:'area-san-hirokawara',type:'trailhead',name:'広河原',lat:35.6867,lon:138.2705,elevation:1520},
  {id:'area-san-nagoe',type:'hut',name:'長衛小屋',lat:35.7330,lon:138.2077,elevation:1980},
  {id:'area-san-sensui',type:'hut',name:'仙水小屋',lat:35.7467,lon:138.2105,elevation:2130},
  {id:'area-san-kaikoma',type:'peak',name:'甲斐駒ヶ岳',lat:35.7578,lon:138.2368,elevation:2967},
  {id:'area-san-senjo',type:'peak',name:'仙丈ヶ岳',lat:35.7201,lon:138.1836,elevation:3033},
  {id:'area-san-senjogoya',type:'hut',name:'仙丈小屋',lat:35.7206,lon:138.1883,elevation:2900},
  {id:'area-san-umanose',type:'hut',name:'馬の背ヒュッテ',lat:35.7277,lon:138.1900,elevation:2640},
  {id:'area-san-yashajin',type:'trailhead',name:'夜叉神峠登山口',lat:35.6528,lon:138.3310,elevation:1380},
  {id:'area-san-aoki',type:'hut',name:'南御室小屋',lat:35.6849,lon:138.3092,elevation:2420},
  {id:'area-san-houou',type:'peak',name:'鳳凰山',lat:35.7017,lon:138.3047,elevation:2841}
];
REGIONAL_CATALOG.southalps_shirane = [
  {id:'area-sas-hirokawara',type:'trailhead',name:'広河原',lat:35.6867,lon:138.2705,elevation:1520},
  {id:'area-sas-narada',type:'trailhead',name:'奈良田',lat:35.5685,lon:138.3038,elevation:830},
  {id:'area-sas-shiraneike',type:'hut',name:'白根御池小屋',lat:35.6820,lon:138.2512,elevation:2236},
  {id:'area-sas-kata',type:'hut',name:'北岳肩の小屋',lat:35.6771,lon:138.2405,elevation:3000},
  {id:'area-sas-kitazawa',type:'peak',name:'北岳',lat:35.6745,lon:138.2389,elevation:3193},
  {id:'area-sas-kitahut',type:'hut',name:'北岳山荘',lat:35.6585,lon:138.2315,elevation:2900},
  {id:'area-sas-aino',type:'peak',name:'間ノ岳',lat:35.6461,lon:138.2283,elevation:3190},
  {id:'area-sas-noutori',type:'peak',name:'農鳥岳',lat:35.6210,lon:138.2360,elevation:3026},
  {id:'area-sas-noutorigoya',type:'hut',name:'農鳥小屋',lat:35.6290,lon:138.2265,elevation:2800},
  {id:'area-sas-daimon',type:'hut',name:'大門沢小屋',lat:35.6025,lon:138.2580,elevation:1770}
];
REGIONAL_CATALOG.southalps_central = [
  {id:'area-sac-torikura',type:'trailhead',name:'鳥倉登山口',lat:35.5810,lon:138.1570,elevation:1780},
  {id:'area-sac-sanpuku',type:'hut',name:'三伏峠小屋',lat:35.5725,lon:138.1820,elevation:2580},
  {id:'area-sac-shiomi',type:'peak',name:'塩見岳',lat:35.5733,lon:138.1828,elevation:3052},
  {id:'area-sac-shiomigoya',type:'hut',name:'塩見小屋',lat:35.5777,lon:138.1932,elevation:2760},
  {id:'area-sac-sawarajima',type:'trailhead',name:'椹島',lat:35.4175,lon:138.1870,elevation:1120},
  {id:'area-sac-senmai',type:'hut',name:'千枚小屋',lat:35.4825,lon:138.1905,elevation:2610},
  {id:'area-sac-arakawa',type:'peak',name:'荒川岳',lat:35.5005,lon:138.1825,elevation:3141},
  {id:'area-sac-arakawagoya',type:'hut',name:'荒川小屋',lat:35.4760,lon:138.1645,elevation:2610},
  {id:'area-sac-akaishi',type:'peak',name:'赤石岳',lat:35.4610,lon:138.1570,elevation:3121},
  {id:'area-sac-akaishigoya',type:'hut',name:'赤石小屋',lat:35.4450,lon:138.1805,elevation:2560}
];
REGIONAL_CATALOG.southalps_south = [
  {id:'area-south-sawarajima',type:'trailhead',name:'椹島',lat:35.4175,lon:138.1870,elevation:1120},
  {id:'area-south-hijiri',type:'peak',name:'聖岳',lat:35.4220,lon:138.1390,elevation:3013},
  {id:'area-south-hijiridaira',type:'hut',name:'聖平小屋',lat:35.4090,lon:138.1510,elevation:2260},
  {id:'area-south-kamikouchi',type:'peak',name:'上河内岳',lat:35.3870,lon:138.1540,elevation:2803},
  {id:'area-south-chause',type:'peak',name:'茶臼岳',lat:35.3660,lon:138.1530,elevation:2604},
  {id:'area-south-chausu',type:'hut',name:'茶臼小屋',lat:35.3615,lon:138.1585,elevation:2400},
  {id:'area-south-hikari',type:'peak',name:'光岳',lat:35.3380,lon:138.0830,elevation:2592},
  {id:'area-south-hikarigoya',type:'hut',name:'光岳小屋',lat:35.3395,lon:138.0870,elevation:2510},
  {id:'area-south-numadaira',type:'trailhead',name:'沼平ゲート',lat:35.3150,lon:138.1880,elevation:930}
];
REGIONAL_CATALOG.yatsu_south = [
  {id:'area-ys-minoto',type:'trailhead',name:'美濃戸口',lat:35.9978,lon:138.3079,elevation:1490},
  {id:'area-ys-minoto2',type:'trailhead',name:'美濃戸',lat:35.9888,lon:138.3298,elevation:1720},
  {id:'area-ys-fujimi',type:'trailhead',name:'富士見高原登山口',lat:35.9240,lon:138.3320,elevation:1350},
  {id:'area-ys-kannon',type:'trailhead',name:'観音平',lat:35.9300,lon:138.3600,elevation:1560},
  {id:'area-ys-akakosen',type:'hut',name:'赤岳鉱泉',lat:35.9861,lon:138.3504,elevation:2220},
  {id:'area-ys-gyoja',type:'hut',name:'行者小屋',lat:35.9779,lon:138.3572,elevation:2350},
  {id:'area-ys-aka',type:'peak',name:'赤岳',lat:35.9708,lon:138.3701,elevation:2899},
  {id:'area-ys-tenbou',type:'hut',name:'赤岳天望荘',lat:35.9760,lon:138.3710,elevation:2722},
  {id:'area-ys-yoko',type:'peak',name:'横岳（八ヶ岳）',lat:35.9845,lon:138.3729,elevation:2829},
  {id:'area-ys-iou',type:'peak',name:'硫黄岳（八ヶ岳）',lat:36.0016,lon:138.3700,elevation:2760},
  {id:'area-ys-iouhut',type:'hut',name:'硫黄岳山荘',lat:35.9948,lon:138.3720,elevation:2650},
  {id:'area-ys-amida',type:'peak',name:'阿弥陀岳',lat:35.9732,lon:138.3582,elevation:2805},
  {id:'area-ys-gongen',type:'peak',name:'権現岳',lat:35.9497,lon:138.3586,elevation:2715},
  {id:'area-ys-gongengoya',type:'hut',name:'権現小屋',lat:35.9490,lon:138.3590,elevation:2700},
  {id:'area-ys-amigasa',type:'peak',name:'編笠山',lat:35.9422,lon:138.3450,elevation:2524},
  {id:'area-ys-seinen',type:'hut',name:'青年小屋',lat:35.9460,lon:138.3500,elevation:2380}
];
REGIONAL_CATALOG.yatsu_north = [
  {id:'area-yn-shibunoyu',type:'trailhead',name:'渋の湯',lat:36.0455,lon:138.3040,elevation:1840},
  {id:'area-yn-karasawa',type:'trailhead',name:'唐沢鉱泉',lat:36.0370,lon:138.3090,elevation:1870},
  {id:'area-yn-shirakoma',type:'trailhead',name:'白駒池入口',lat:36.0575,lon:138.3620,elevation:2090},
  {id:'area-yn-ropeway',type:'trailhead',name:'北八ヶ岳ロープウェイ山頂駅',lat:36.0755,lon:138.3370,elevation:2237},
  {id:'area-yn-tengu',type:'peak',name:'天狗岳',lat:36.0190,lon:138.3550,elevation:2646},
  {id:'area-yn-kuroyuri',type:'hut',name:'黒百合ヒュッテ',lat:36.0260,lon:138.3480,elevation:2410},
  {id:'area-yn-takamiishi',type:'hut',name:'高見石小屋',lat:36.0460,lon:138.3520,elevation:2300},
  {id:'area-yn-kitayoko',type:'peak',name:'北横岳',lat:36.0870,lon:138.3200,elevation:2480},
  {id:'area-yn-kitayokohutte',type:'hut',name:'北横岳ヒュッテ',lat:36.0830,lon:138.3220,elevation:2400},
  {id:'area-yn-tateshina7',type:'trailhead',name:'蓼科山七合目登山口',lat:36.1170,lon:138.2970,elevation:1900},
  {id:'area-yn-suzuran',type:'trailhead',name:'女乃神茶屋（蓼科山登山口）',lat:36.0890,lon:138.2770,elevation:1730},
  {id:'area-yn-tateshina',type:'peak',name:'蓼科山',lat:36.1036,lon:138.2950,elevation:2531},
  {id:'area-yn-tateshinagoya',type:'hut',name:'蓼科山頂ヒュッテ',lat:36.1035,lon:138.2944,elevation:2530}
];




// V1.12.0: 全国固定登山口の追加強化。
// 外部検索に依存せず初回から使える代表登山口を、確認できた座標から順次追加。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '利尻山': [
    {id:'fixed-hokkaido-rishiri-oshidomari',type:'trailhead',name:'利尻北麓野営場（鴛泊コース）',lat:45.222722,lon:141.212639,elevation:207,source:'固定候補'},
    {id:'fixed-hokkaido-rishiri-kutsugata',type:'trailhead',name:'見返台公園（沓形コース）',lat:45.182806,lon:141.192417,elevation:430,source:'固定候補'}
  ],
  '羅臼岳': [
    {id:'fixed-hokkaido-rausu-iwaobetsu',type:'trailhead',name:'岩尾別温泉・木下小屋登山口',lat:44.109750,lon:145.090444,elevation:213,source:'固定候補'},
    {id:'fixed-hokkaido-rausu-onsen',type:'trailhead',name:'羅臼温泉登山口',lat:44.032917,lon:145.156306,elevation:125,source:'固定候補'}
  ],
  '斜里岳': [
    {id:'fixed-hokkaido-shari-seigakuso',type:'trailhead',name:'清岳荘登山口',lat:43.774639,lon:144.685444,elevation:667,source:'固定候補'}
  ],
  '天塩岳': [
    {id:'fixed-hokkaido-teshio-hut',type:'trailhead',name:'天塩岳ヒュッテ登山口',lat:43.993194,lon:142.852611,elevation:766,source:'固定候補'}
  ],
  '八甲田山': [
    {id:'fixed-tohoku-hakkoda-sukayu',type:'trailhead',name:'酸ヶ湯登山口',lat:40.649583,lon:140.850333,elevation:895,source:'固定候補'},
    {id:'fixed-tohoku-hakkoda-ropeway',type:'trailhead',name:'八甲田ロープウェー山麓駅',lat:40.680667,lon:140.831222,elevation:663,source:'固定候補'}
  ],
  '岩木山': [
    {id:'fixed-tohoku-iwaki-dake',type:'trailhead',name:'嶽温泉・嶽コース登山口',lat:40.627972,lon:140.270472,elevation:438,source:'固定候補'},
    {id:'fixed-tohoku-iwaki-hyakuzawa',type:'trailhead',name:'百沢コース登山口',lat:40.627278,lon:140.331194,elevation:318,source:'固定候補'}
  ],
  '白神岳': [
    {id:'fixed-tohoku-shirakami',type:'trailhead',name:'白神岳登山口駐車場',lat:40.509944,lon:139.968444,elevation:190,source:'固定候補'}
  ],
  '秋田駒ヶ岳': [
    {id:'fixed-tohoku-akita-kunimi',type:'trailhead',name:'国見温泉登山口',lat:39.726667,lon:140.793972,elevation:831,source:'固定候補'}
  ],
  '岩手山': [
    {id:'fixed-tohoku-iwate-omisaka',type:'trailhead',name:'御神坂登山口',lat:39.808250,lon:140.993389,elevation:604,source:'固定候補'},
    {id:'fixed-tohoku-iwate-umagaeshi',type:'trailhead',name:'馬返し登山口',lat:39.834361,lon:141.039278,elevation:620,source:'固定候補'},
    {id:'fixed-tohoku-iwate-yakehashiri',type:'trailhead',name:'焼走り登山口',lat:39.875139,lon:141.044778,elevation:567,source:'固定候補'},
    {id:'fixed-tohoku-iwate-8go',type:'hut',name:'八合目避難小屋',lat:39.844167,lon:141.005833,elevation:1768,source:'固定候補'}
  ],
  '焼石岳': [
    {id:'fixed-tohoku-yakeishi-nakanuma',type:'trailhead',name:'中沼登山口',lat:39.146778,lon:140.879222,elevation:720,source:'固定候補'}
  ],
  '神室山': [
    {id:'fixed-tohoku-kamuro-ariya',type:'trailhead',name:'有屋登山口',lat:38.906833,lon:140.438583,elevation:400,source:'固定候補'}
  ],
  '太平山': [
    {id:'fixed-tohoku-taihei-asahimata',type:'trailhead',name:'旭又登山口',lat:39.812611,lon:140.282806,elevation:293,source:'固定候補'}
  ],
  '以東岳': [
    {id:'fixed-tohoku-itodake-awadaki',type:'trailhead',name:'泡滝ダム・大鳥登山口',lat:38.401111,lon:139.804250,elevation:510,source:'固定候補'}
  ],
  '七ヶ岳': [
    {id:'fixed-tohoku-nanatsugatake',type:'trailhead',name:'下岳登山口',lat:37.154667,lon:139.676611,elevation:1095,source:'固定候補'}
  ],
  '三頭山': [
    {id:'fixed-kanto-mitou-furusato',type:'trailhead',name:'山のふるさと村登山口',lat:35.766306,lon:139.023056,elevation:548,source:'固定候補'}
  ],
  '大岳山': [
    {id:'fixed-kanto-odake-shirakura',type:'trailhead',name:'白倉・大嶽神社里宮登山口',lat:35.744361,lon:139.133833,elevation:382,source:'固定候補'}
  ],
  '両神山': [
    {id:'fixed-kanto-ryokami-onouchi',type:'trailhead',name:'尾ノ内渓谷登山口',lat:36.046278,lon:138.866194,elevation:523,source:'固定候補'}
  ],
  '諏訪山': [
    {id:'fixed-kanto-suwa-taruhara',type:'trailhead',name:'樽原登山口',lat:36.074444,lon:138.731889,elevation:850,source:'固定候補'}
  ],
  '櫛形山': [
    {id:'fixed-koshin-kushigata-ikenochaya',type:'trailhead',name:'池ノ茶屋登山口',lat:35.585000,lon:138.362333,elevation:1840,source:'固定候補'}
  ],
  '瑞牆山': [
    {id:'fixed-koshin-mizugaki-park',type:'trailhead',name:'みずがき山自然公園',lat:35.896278,lon:138.573306,elevation:1460,source:'固定候補'}
  ],
  '大菩薩嶺': [
    {id:'fixed-koshin-daibosatsu-kamihikawa',type:'trailhead',name:'上日川峠',lat:35.731528,lon:138.832528,elevation:1580,source:'固定候補'}
  ],
  '白山': [
    {id:'fixed-hokuriku-hakusan-betto',type:'trailhead',name:'別当出合',lat:36.123917,lon:136.738000,elevation:1210,source:'固定候補'}
  ],
  '人形山': [
    {id:'fixed-hokuriku-ningyo-nakane',type:'trailhead',name:'人形堂・中根平登山口',lat:36.383194,lon:136.940389,elevation:832,source:'固定候補'}
  ],
  '位山': [
    {id:'fixed-gifu-kurai-danabira',type:'trailhead',name:'ダナ平林道登山口',lat:36.047194,lon:137.191556,elevation:1320,source:'固定候補'}
  ],
  '岩菅山': [
    {id:'fixed-koshin-iwasuge-hijiridaira',type:'trailhead',name:'聖平登山口',lat:36.748806,lon:138.532167,elevation:1535,source:'固定候補'}
  ],
  '大雪山（旭岳）': [
    {id:'fixed-hokkaido-asahidake-ropeway',type:'trailhead',name:'旭岳ロープウェイ山麓駅',lat:43.652778,lon:142.798083,elevation:1100,source:'固定候補'}
  ],
  '十勝岳': [
    {id:'fixed-hokkaido-tokachi-bogakudai',type:'trailhead',name:'望岳台',lat:43.447639,lon:142.649861,elevation:933,source:'固定候補'},
    {id:'fixed-hokkaido-tokachi-onsen',type:'trailhead',name:'十勝岳温泉登山口',lat:43.413917,lon:142.643361,elevation:1270,source:'固定候補'}
  ],
  '樽前山': [
    {id:'fixed-hokkaido-tarumae-7',type:'trailhead',name:'7合目登山口',lat:42.699167,lon:141.390222,elevation:657,source:'固定候補'}
  ],
  '安達太良山': [
    {id:'fixed-tohoku-adatara-okudake',type:'trailhead',name:'奥岳登山口・あだたら山ロープウェイ',lat:37.622778,lon:140.326056,elevation:948,source:'固定候補'}
  ],
  '蔵王山（熊野岳）': [
    {id:'fixed-tohoku-zao-chuo',type:'trailhead',name:'蔵王中央ロープウェイ温泉駅',lat:38.164833,lon:140.395417,elevation:854,source:'固定候補'}
  ],
  '八幡平': [
    {id:'fixed-tohoku-hachimantai-pass',type:'trailhead',name:'八幡平見返峠・山頂レストハウス',lat:39.949944,lon:140.856361,elevation:1540,source:'固定候補'}
  ],
  '早池峰山': [
    {id:'fixed-tohoku-hayachine-odagoe',type:'trailhead',name:'小田越登山口',lat:39.540806,lon:141.495694,elevation:1249,source:'固定候補'},
    {id:'fixed-tohoku-hayachine-take',type:'trailhead',name:'岳登山口・岳駐車場',lat:39.533250,lon:141.411583,elevation:515,source:'固定候補'}
  ],
  '栗駒山': [
    {id:'fixed-tohoku-kurikoma-iwakagami',type:'trailhead',name:'いわかがみ平',lat:38.944472,lon:140.804972,elevation:1113,source:'固定候補'}
  ],
  '男体山': [
    {id:'fixed-kanto-nantai-futarasan',type:'trailhead',name:'二荒山神社中宮祠登山口',lat:36.741944,lon:139.487806,elevation:1280,source:'固定候補'}
  ],
  '奥白根山': [
    {id:'fixed-kanto-nikkoshirane-ropeway',type:'trailhead',name:'丸沼高原・日光白根山ロープウェイ',lat:36.814806,lon:139.329444,elevation:1380,source:'固定候補'}
  ],
  '至仏山': [
    {id:'fixed-kanto-shibutsu-hatomachi',type:'trailhead',name:'鳩待峠',lat:36.888999,lon:139.200806,elevation:1590,source:'固定候補'}
  ],
  '女峰山': [
    {id:'fixed-kanto-nyoho-takino',type:'trailhead',name:'滝尾神社登山口',lat:36.765000,lon:139.593944,elevation:726,source:'固定候補'}
  ],
  '三本槍岳': [
    {id:'fixed-kanto-sanbonyari-nasu-rw',type:'trailhead',name:'那須ロープウェイ・峠の茶屋側',lat:37.125389,lon:139.979722,elevation:1386,source:'固定候補'}
  ]
});



// V1.12.1: 固定登山口・座標拡張 第2弾。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '鳥海山': [
    {id:'fixed2-tohoku-chokai-hokodate',type:'trailhead',name:'鉾立登山口（象潟口）',lat:39.121722,lon:139.990389,elevation:1145,source:'固定候補'},
    {id:'fixed2-tohoku-chokai-yunodai',type:'trailhead',name:'湯ノ台口登山口',lat:39.068889,lon:140.046361,elevation:1210,source:'固定候補'}
  ],
  '月山': [
    {id:'fixed2-tohoku-gassan-8',type:'trailhead',name:'月山八合目登山口',lat:38.586472,lon:140.016833,elevation:1380,source:'固定候補'}
  ],
  '大朝日岳': [
    {id:'fixed2-tohoku-oasahi-kodera',type:'trailhead',name:'古寺案内センター（古寺コース）',lat:38.301667,lon:139.971111,elevation:670,source:'固定候補'},
    {id:'fixed2-tohoku-oasahi-kosen',type:'trailhead',name:'朝日鉱泉登山口',lat:38.239250,lon:139.996444,elevation:563,source:'固定候補'}
  ],
  '磐梯山': [
    {id:'fixed2-tohoku-bandai-happodai',type:'trailhead',name:'八方台登山口',lat:37.614343,lon:140.048326,elevation:1194,source:'固定候補'}
  ],
  '会津駒ヶ岳': [
    {id:'fixed2-tohoku-aizukoma-takizawa',type:'trailhead',name:'滝沢登山口',lat:37.029647,lon:139.382727,elevation:1090,source:'固定候補'}
  ],
  '燧ヶ岳': [
    {id:'fixed2-oze-hiuchi-miike',type:'trailhead',name:'御池登山口',lat:36.983781,lon:139.304207,elevation:1505,source:'固定候補'},
    {id:'fixed2-oze-hiuchi-kozodaira',type:'trailhead',name:'小沢平登山口',lat:37.006326,lon:139.252641,elevation:945,source:'固定候補'}
  ],
  '苗場山': [
    {id:'fixed2-koshin-naeba-koakazawa',type:'trailhead',name:'小赤沢三合目登山口',lat:36.854350,lon:138.663250,elevation:1310,source:'固定候補'}
  ],
  '平ヶ岳': [
    {id:'fixed2-echigo-hiragatake-takanosu',type:'trailhead',name:'鷹ノ巣・平ヶ岳登山口',lat:37.037210,lon:139.252784,elevation:840,source:'固定候補'}
  ],
  '巻機山': [
    {id:'fixed2-echigo-makihata-sakurazaka',type:'trailhead',name:'桜坂登山口',lat:36.954532,lon:138.935319,elevation:730,source:'固定候補'}
  ],
  '仙ノ倉山': [
    {id:'fixed2-joetsu-sennokura-tairappyo',type:'trailhead',name:'平標登山口・元橋駐車場',lat:36.813507,lon:138.783102,elevation:970,source:'固定候補'}
  ],
  '氷ノ山': [
    {id:'fixed2-chugoku-hyonosen-fukusada',type:'trailhead',name:'福定親水公園登山口',lat:35.369944,lon:134.523139,elevation:654,source:'固定候補'}
  ],
  '大山（鳥取）': [
    {id:'fixed2-chugoku-daisen-nanko',type:'trailhead',name:'夏山登山道・南光河原',lat:35.391194,lon:133.530556,elevation:767,source:'固定候補'},
    {id:'fixed2-chugoku-daisen-shimoyama',type:'trailhead',name:'夏山登山道・下山駐車場',lat:35.390639,lon:133.527806,elevation:780,source:'固定候補'}
  ],
  '三嶺': [
    {id:'fixed2-shikoku-miune-nagoro',type:'trailhead',name:'名頃登山口',lat:33.852472,lon:134.023972,elevation:907,source:'固定候補'}
  ]
});



// V1.12.2: 固定登山口・座標拡張 第3弾（北海道・東北中心）。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '雄阿寒岳': [
    {id:'fixed3-hokkaido-oakan-takiguchi',type:'trailhead',name:'滝口・雄阿寒岳登山口',lat:43.431823,lon:144.136233,elevation:423,source:'固定候補'}
  ],
  'トムラウシ山': [
    {id:'fixed3-hokkaido-tomuraushi-short',type:'trailhead',name:'トムラウシ短縮コース登山口',lat:43.483722,lon:142.884778,elevation:957,source:'固定候補'},
    {id:'fixed3-hokkaido-tomuraushi-spa',type:'trailhead',name:'トムラウシ温泉登山口（東大雪荘）',lat:43.460194,lon:142.874528,elevation:643,source:'固定候補'}
  ],
  '幌尻岳': [
    {id:'fixed3-hokkaido-poroshiri-toyonuka',type:'trailhead',name:'とよぬか山荘・シャトルバス乗り場',lat:42.705361,lon:142.404639,elevation:223,source:'固定候補'}
  ],
  '後方羊蹄山': [
    {id:'fixed3-hokkaido-yotei-hirafu',type:'trailhead',name:'比羅夫登山口・半月湖畔自然公園',lat:42.846167,lon:140.752139,elevation:348,source:'固定候補'},
    {id:'fixed3-hokkaido-yotei-makkari',type:'trailhead',name:'真狩登山口・真狩キャンプ場',lat:42.794611,lon:140.785694,elevation:370,source:'固定候補'}
  ],
  'ニセコアンヌプリ': [
    {id:'fixed3-hokkaido-annupuri-goshiki',type:'trailhead',name:'五色温泉インフォメーションセンター',lat:42.873944,lon:140.639167,elevation:756,source:'固定候補'}
  ],
  '余市岳': [
    {id:'fixed3-hokkaido-yoichi-kiroro',type:'trailhead',name:'キロロリゾート・赤井川コース入口',lat:43.069444,lon:140.989111,elevation:562,source:'固定候補'}
  ],
  '渡島駒ヶ岳': [
    {id:'fixed3-hokkaido-oshimakoma-6th',type:'trailhead',name:'赤井川登山口・6合目駐車場',lat:42.043100,lon:140.680570,elevation:490,source:'固定候補'}
  ],
  '姫神山': [
    {id:'fixed3-tohoku-himekami-ipponsugi',type:'trailhead',name:'一本杉登山口',lat:39.854250,lon:141.230861,elevation:508,source:'固定候補'}
  ],
  '五葉山': [
    {id:'fixed3-tohoku-goyozan-akasaka',type:'trailhead',name:'赤坂峠登山口',lat:39.178583,lon:141.742028,elevation:711,source:'固定候補'}
  ],
  '森吉山': [
    {id:'fixed3-tohoku-moriyoshi-ani',type:'trailhead',name:'阿仁ゴンドラ山麓駅',lat:39.955806,lon:140.490583,elevation:538,source:'固定候補'},
    {id:'fixed3-tohoku-moriyoshi-buna',type:'trailhead',name:'ブナ帯登山口',lat:39.961917,lon:140.509417,elevation:835,source:'固定候補'}
  ]
});



// V1.12.3: 固定登山口・座標拡張 第4弾（関東・甲信中心）。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '西吾妻山': [
    {id:'fixed4-tohoku-nishiazuma-tengendai',type:'trailhead',name:'天元台ロープウェイ湯元駅',lat:37.775917,lon:140.123250,elevation:927,source:'固定候補'}
  ],
  '武尊山': [
    {id:'fixed4-kanto-hotaka-kawabadani',type:'trailhead',name:'川場谷野営場登山口',lat:36.771194,lon:139.153167,elevation:1230,source:'固定候補'}
  ],
  '赤城山（黒檜山）': [
    {id:'fixed4-kanto-akagi-kurobi',type:'trailhead',name:'黒檜山登山口',lat:36.554222,lon:139.183917,elevation:1350,source:'固定候補'},
    {id:'fixed4-kanto-akagi-onoko',type:'trailhead',name:'おのこ駐車場・駒ヶ岳登山口',lat:36.548111,lon:139.186500,elevation:1350,source:'固定候補'}
  ],
  '四阿山': [
    {id:'fixed4-koshin-azumaya-sugadaira',type:'trailhead',name:'菅平牧場登山口',lat:36.538255,lon:138.371745,elevation:1580,source:'固定候補'}
  ],
  '浅間山': [
    {id:'fixed4-koshin-asama-kurumazaka',type:'trailhead',name:'高峰高原・車坂峠',lat:36.405090,lon:138.469704,elevation:1970,source:'固定候補'}
  ],
  '霧ヶ峰（車山）': [
    {id:'fixed4-koshin-kirigamine-kurumakata',type:'trailhead',name:'車山肩',lat:36.103935,lon:138.187367,elevation:1800,source:'固定候補'}
  ],
  '美ヶ原': [
    {id:'fixed4-koshin-utsukushi-yamamotogoya',type:'trailhead',name:'山本小屋ふる里館・町営駐車場',lat:36.228410,lon:138.132690,elevation:1940,source:'固定候補'}
  ],
  '蓼科山': [
    {id:'fixed4-yatsu-tateshina7',type:'trailhead',name:'蓼科山七合目登山口',lat:36.117000,lon:138.297000,elevation:1900,source:'固定候補'},
    {id:'fixed4-yatsu-tateshina-suzuran',type:'trailhead',name:'女乃神茶屋・蓼科山登山口',lat:36.089000,lon:138.277000,elevation:1730,source:'固定候補'}
  ],
  '天狗岳': [
    {id:'fixed4-yatsu-tengu-karasawa',type:'trailhead',name:'唐沢鉱泉',lat:36.037000,lon:138.309000,elevation:1870,source:'固定候補'},
    {id:'fixed4-yatsu-tengu-shibunoyu',type:'trailhead',name:'渋の湯',lat:36.045500,lon:138.304000,elevation:1840,source:'固定候補'}
  ],
  '赤岳': [
    {id:'fixed4-yatsu-akadake-minoto',type:'trailhead',name:'美濃戸口',lat:35.999000,lon:138.313000,elevation:1500,source:'固定候補'}
  ]
});



// V1.12.4: 固定登山口・座標拡張 第5弾（奥秩父・丹沢・伊豆中心）。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '雲取山': [
    {id:'fixed5-okuchichibu-kumotori-kamosawa',type:'trailhead',name:'鴨沢登山口',lat:35.780424,lon:138.984381,elevation:550,source:'固定候補'},
    {id:'fixed5-okuchichibu-kumotori-kosode',type:'trailhead',name:'小袖乗越・丹波山村村営駐車場',lat:35.785900,lon:138.977500,elevation:738,source:'固定候補'}
  ],
  '甲武信ヶ岳': [
    {id:'fixed5-okuchichibu-kobushi-mokidaira',type:'trailhead',name:'毛木平登山口',lat:35.954134,lon:138.710874,elevation:1460,source:'固定候補'}
  ],
  '国師ヶ岳': [
    {id:'fixed5-okuchichibu-kokushi-odarumi',type:'trailhead',name:'大弛峠',lat:35.872723,lon:138.662769,elevation:2360,source:'固定候補'}
  ],
  '金峰山': [
    {id:'fixed5-okuchichibu-kinpu-odarumi',type:'trailhead',name:'大弛峠',lat:35.872723,lon:138.662769,elevation:2360,source:'固定候補'}
  ],
  '大山（神奈川）': [
    {id:'fixed5-tanzawa-oyama-cable2',type:'trailhead',name:'大山ケーブル口・市営第二駐車場',lat:35.424634,lon:139.249003,elevation:315,source:'固定候補'},
    {id:'fixed5-tanzawa-oyama-yabitsu',type:'trailhead',name:'ヤビツ峠',lat:35.428127,lon:139.219122,elevation:760,source:'固定候補'}
  ],
  '塔ノ岳': [
    {id:'fixed5-tanzawa-tonodake-okura',type:'trailhead',name:'大倉登山口',lat:35.404065,lon:139.168805,elevation:290,source:'固定候補'},
    {id:'fixed5-tanzawa-tonodake-tosawa',type:'trailhead',name:'戸沢出合',lat:35.435478,lon:139.173273,elevation:570,source:'固定候補'}
  ],
  '金時山': [
    {id:'fixed5-hakone-kintoki-shrine',type:'trailhead',name:'公時神社（金時神社）登山口',lat:35.278111,lon:139.002586,elevation:690,source:'固定候補'},
    {id:'fixed5-hakone-kintoki-line',type:'trailhead',name:'金時見晴パーキング',lat:35.283913,lon:139.013333,elevation:850,source:'固定候補'}
  ],
  '天城山（万三郎岳）': [
    {id:'fixed5-izu-amagi-kogen',type:'trailhead',name:'天城高原ハイカー専用駐車場',lat:34.872992,lon:139.023389,elevation:1045,source:'固定候補'}
  ],
  '愛鷹山（越前岳）': [
    {id:'fixed5-ashitaka-echizen-jurigi',type:'trailhead',name:'十里木高原登山口',lat:35.256128,lon:138.783748,elevation:870,source:'固定候補'}
  ],
  '三ッ峠山': [
    {id:'fixed5-mitsutoge-main',type:'trailhead',name:'三ツ峠登山口',lat:35.556073,lon:138.791834,elevation:1225,source:'固定候補'},
    {id:'fixed5-mitsutoge-nishikatsura',type:'trailhead',name:'西桂口',lat:35.538465,lon:138.821533,elevation:940,source:'固定候補'}
  ]
});



// V1.12.5: 固定登山口・座標拡張 第6弾（頸城・北ア周辺・中央アルプス・九州）。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '妙高山': [
    {id:'fixed6-kubiki-myoko-tsubame',type:'trailhead',name:'燕温泉登山口',lat:36.900946,lon:138.148066,elevation:1080,source:'固定候補'},
    {id:'fixed6-kubiki-myoko-sasagamine',type:'trailhead',name:'笹ヶ峰登山口',lat:36.868699,lon:138.078730,elevation:1310,source:'固定候補'}
  ],
  '火打山': [
    {id:'fixed6-kubiki-hiuchi-sasagamine',type:'trailhead',name:'笹ヶ峰登山口',lat:36.868699,lon:138.078730,elevation:1310,source:'固定候補'}
  ],
  '雨飾山': [
    {id:'fixed6-kubiki-amakazari-camp',type:'trailhead',name:'雨飾高原キャンプ場登山口',lat:36.882084,lon:137.974519,elevation:1160,source:'固定候補'},
    {id:'fixed6-kubiki-amakazari-ooami',type:'trailhead',name:'大網登山口',lat:36.884825,lon:137.944280,elevation:920,source:'固定候補'}
  ],
  '焼岳': [
    {id:'fixed6-northalps-yake-shinnakanoyu',type:'trailhead',name:'新中の湯登山口',lat:36.203955,lon:137.598878,elevation:1600,source:'固定候補'}
  ],
  '乗鞍岳': [
    {id:'fixed6-norikura-tatamidaira',type:'trailhead',name:'畳平バスターミナル',lat:36.124817,lon:137.553841,elevation:2702,source:'固定候補'},
    {id:'fixed6-norikura-kanko',type:'trailhead',name:'乗鞍高原観光センター・シャトルバス乗り場',lat:36.122278,lon:137.624306,elevation:1460,source:'固定候補'}
  ],
  '空木岳': [
    {id:'fixed6-centralalps-utsugi-ikeyama',type:'trailhead',name:'池山口登山口',lat:35.736861,lon:137.878032,elevation:1370,source:'固定候補'}
  ],
  '恵那山': [
    {id:'fixed6-centralalps-ena-hiro',type:'trailhead',name:'広河原登山口・峰越林道ゲート',lat:35.442862,lon:137.630613,elevation:1140,source:'固定候補'},
    {id:'fixed6-centralalps-ena-misaka',type:'trailhead',name:'神坂峠登山口',lat:35.472357,lon:137.632380,elevation:1565,source:'固定候補'}
  ],
  '南木曽岳': [
    {id:'fixed6-centralalps-nagiso-araragi',type:'trailhead',name:'蘭登山口',lat:35.577402,lon:137.640155,elevation:960,source:'固定候補'}
  ],
  '開聞岳': [
    {id:'fixed6-kyushu-kaimon-park',type:'trailhead',name:'かいもん山麓ふれあい公園登山口',lat:31.196611,lon:130.533639,elevation:120,source:'固定候補'}
  ],
  '阿蘇山（高岳）': [
    {id:'fixed6-kyushu-aso-sensuikyo',type:'trailhead',name:'仙酔峡登山口',lat:32.899281,lon:131.102628,elevation:980,source:'固定候補'}
  ]
});



// V1.12.6: 固定登山口・座標拡張 第7弾（北アルプス中心）。
// 既存の山域カタログで使用中の地点座標を各山の固定候補へ昇格。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '朝日岳（新潟・富山）': [
    {id:'fixed7-northalps-asahi-rengeonsen',type:'trailhead',name:'蓮華温泉',lat:36.7858,lon:137.7934,elevation:1475,source:'固定候補'}
  ],
  '雪倉岳': [
    {id:'fixed7-northalps-yukikura-rengeonsen',type:'trailhead',name:'蓮華温泉',lat:36.7858,lon:137.7934,elevation:1475,source:'固定候補'}
  ],
  '五竜岳': [
    {id:'fixed7-northalps-goryu-alpsdaira',type:'trailhead',name:'アルプス平',lat:36.6817,lon:137.8332,elevation:1515,source:'固定候補'}
  ],
  '爺ヶ岳': [
    {id:'fixed7-northalps-jii-ogisawa',type:'trailhead',name:'扇沢登山口',lat:36.558056,lon:137.721389,elevation:1430,source:'固定候補'}
  ],
  '針ノ木岳': [
    {id:'fixed7-northalps-harinoki-ogisawa',type:'trailhead',name:'扇沢登山口',lat:36.558056,lon:137.721389,elevation:1430,source:'固定候補'}
  ],
  '蓮華岳': [
    {id:'fixed7-northalps-renge-ogisawa',type:'trailhead',name:'扇沢登山口',lat:36.558056,lon:137.721389,elevation:1430,source:'固定候補'}
  ],
  '奥大日岳': [
    {id:'fixed7-northalps-okudainichi-murodo',type:'trailhead',name:'室堂',lat:36.5779,lon:137.5950,elevation:2450,source:'固定候補'}
  ],
  '薬師岳': [
    {id:'fixed7-northalps-yakushi-oritate',type:'trailhead',name:'折立登山口',lat:36.4786,lon:137.4780,elevation:1350,source:'固定候補'}
  ],
  '黒部五郎岳': [
    {id:'fixed7-northalps-kurobegoro-oritate',type:'trailhead',name:'折立登山口',lat:36.4786,lon:137.4780,elevation:1350,source:'固定候補'}
  ],
  '烏帽子岳': [
    {id:'fixed7-northalps-eboshi-takase',type:'trailhead',name:'高瀬ダム',lat:36.4690,lon:137.6895,elevation:1270,source:'固定候補'}
  ],
  '野口五郎岳': [
    {id:'fixed7-northalps-noguchi-takase',type:'trailhead',name:'高瀬ダム',lat:36.4690,lon:137.6895,elevation:1270,source:'固定候補'}
  ],
  '霧島山（韓国岳）': [
    {id:'fixed7-kyushu-karakuni-ebino',type:'trailhead',name:'えびの高原・韓国岳登山口',lat:31.9457,lon:130.8428,elevation:1180,source:'固定候補'},
    {id:'fixed14-kyushu-karakuni-onami',type:'trailhead',name:'大浪池登山口',lat:31.9144795,lon:130.8411962,elevation:1070,source:'固定候補'}
  ]
});



// V1.12.7: 固定登山口・座標拡張 第8弾（南アルプス中心）。
// 既存の南アルプス山域カタログの固定地点を各山の代表登山口へ昇格。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '鋸岳': [
    {id:'fixed8-southalps-nokogiri-kitasawa',type:'trailhead',name:'北沢峠',lat:35.7353,lon:138.2110,elevation:2032,source:'固定候補'}
  ],
  'アサヨ峰': [
    {id:'fixed8-southalps-asayo-kitasawa',type:'trailhead',name:'北沢峠',lat:35.7353,lon:138.2110,elevation:2032,source:'固定候補'}
  ],
  '地蔵ヶ岳': [
    {id:'fixed8-southalps-jizo-yashajin',type:'trailhead',name:'夜叉神峠登山口',lat:35.6528,lon:138.3310,elevation:1380,source:'固定候補'}
  ],
  '農鳥岳': [
    {id:'fixed8-southalps-notori-hirokawara',type:'trailhead',name:'広河原',lat:35.6867,lon:138.2705,elevation:1520,source:'固定候補'},
    {id:'fixed8-southalps-notori-narada',type:'trailhead',name:'奈良田',lat:35.5685,lon:138.3038,elevation:830,source:'固定候補'}
  ],
  '塩見岳': [
    {id:'fixed8-southalps-shiomi-torikura',type:'trailhead',name:'鳥倉登山口',lat:35.5810,lon:138.1570,elevation:1780,source:'固定候補'}
  ],
  '荒川岳': [
    {id:'fixed8-southalps-arakawa-sawarajima',type:'trailhead',name:'椹島',lat:35.4175,lon:138.1870,elevation:1120,source:'固定候補'}
  ],
  '赤石岳': [
    {id:'fixed8-southalps-akaishi-sawarajima',type:'trailhead',name:'椹島',lat:35.4175,lon:138.1870,elevation:1120,source:'固定候補'}
  ],
  '聖岳': [
    {id:'fixed8-southalps-hijiri-sawarajima',type:'trailhead',name:'椹島',lat:35.4175,lon:138.1870,elevation:1120,source:'固定候補'}
  ],
  '上河内岳': [
    {id:'fixed8-southalps-kamikochi-numadaira',type:'trailhead',name:'沼平ゲート',lat:35.3150,lon:138.1880,elevation:930,source:'固定候補'}
  ],
  '茶臼岳': [
    {id:'fixed8-southalps-chausu-numadaira',type:'trailhead',name:'沼平ゲート',lat:35.3150,lon:138.1880,elevation:930,source:'固定候補'}
  ],
  '光岳': [
    {id:'fixed8-southalps-hikari-numadaira',type:'trailhead',name:'沼平ゲート',lat:35.3150,lon:138.1880,elevation:930,source:'固定候補'}
  ]
});



// V1.12.8: 固定登山口・座標拡張 第9弾。
// 公開されている登山口座標を確認できた山を追加固定。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '飯豊山': [
    {id:'fixed9-tohoku-iide-osawa',type:'trailhead',name:'御沢登山口・御沢野営場',lat:37.795444,lon:139.772278,elevation:540,source:'固定候補'}
  ],
  '一切経山': [
    {id:'fixed9-tohoku-issai-jododaira',type:'trailhead',name:'浄土平',lat:37.723286,lon:140.255147,elevation:1575,source:'固定候補'}
  ],
  '越後駒ヶ岳': [
    {id:'fixed9-echigo-komagatake-shiori',type:'trailhead',name:'枝折峠',lat:37.152232,lon:139.129661,elevation:1070,source:'固定候補'}
  ],
  '荒島岳': [
    {id:'fixed9-hokuriku-arashima-kadohara',type:'trailhead',name:'勝原コース登山口',lat:35.963834,lon:136.604581,elevation:345,source:'固定候補'},
    {id:'fixed9-hokuriku-arashima-nakande',type:'trailhead',name:'中出コース登山口',lat:35.958222,lon:136.558778,elevation:347,source:'固定候補'}
  ],
  '能郷白山': [
    {id:'fixed9-hokuriku-nougo-nukumi',type:'trailhead',name:'温見峠',lat:35.779250,lon:136.518528,elevation:1040,source:'固定候補'}
  ],
  '茅ヶ岳': [
    {id:'fixed9-koshin-kayagatake-fukada',type:'trailhead',name:'深田記念公園・茅ヶ岳登山口',lat:35.770061,lon:138.506805,elevation:940,source:'固定候補'}
  ],
  '乾徳山': [
    {id:'fixed9-koshin-kentoku-tokuwa',type:'trailhead',name:'徳和・乾徳山登山口',lat:35.790770,lon:138.724621,elevation:830,source:'固定候補'}
  ],
  '飯縄山': [
    {id:'fixed9-koshin-iizuna-ichinotorii',type:'trailhead',name:'一の鳥居苑地・飯縄山登山者駐車場',lat:36.711077,lon:138.124645,elevation:1130,source:'固定候補'}
  ],
  '戸隠山': [
    {id:'fixed9-koshin-togakushi-okusha',type:'trailhead',name:'戸隠奥社側登山口',lat:36.765233,lon:138.062600,elevation:1350,source:'固定候補'}
  ]
});

// V1.12.8: 法華院温泉山荘を山小屋として座標込み固定。
for (const mountainName of ['久住山','大船山']) {
  const current = BUILTIN_ROUTE_CATALOG[mountainName] || [];
  if (!current.some(p => p.id === 'fixed9-kyushu-hokkein-hut')) {
    BUILTIN_ROUTE_CATALOG[mountainName] = [
      ...current,
      {id:'fixed9-kyushu-hokkein-hut',type:'hut',name:'法華院温泉山荘',lat:33.096353,lon:131.255433,elevation:1303,source:'固定候補'}
    ];
  }
}



// V1.12.9: 固定登山口・座標拡張 第10弾。
// 既存山域カタログの確定座標と公開登山口座標を個別山へ昇格。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '有明山': [
    {id:'fixed10-northalps-ariake-nakabusa',type:'trailhead',name:'中房登山口',lat:36.389401,lon:137.747800,elevation:1390,source:'固定候補'}
  ],
  '餓鬼岳': [
    {id:'fixed10-northalps-gaki-nakabusa',type:'trailhead',name:'中房登山口',lat:36.389401,lon:137.747800,elevation:1390,source:'固定候補'}
  ],
  '水晶岳（黒岳）': [
    {id:'fixed10-northalps-suisho-oritate',type:'trailhead',name:'折立登山口',lat:36.478600,lon:137.478000,elevation:1350,source:'固定候補'}
  ],
  '鷲羽岳': [
    {id:'fixed10-northalps-washiba-oritate',type:'trailhead',name:'折立登山口',lat:36.478600,lon:137.478000,elevation:1350,source:'固定候補'}
  ],
  '三俣蓮華岳': [
    {id:'fixed10-northalps-mitsumata-oritate',type:'trailhead',name:'折立登山口',lat:36.478600,lon:137.478000,elevation:1350,source:'固定候補'}
  ],
  '赤牛岳': [
    {id:'fixed10-northalps-akaushi-oritate',type:'trailhead',name:'折立登山口',lat:36.478600,lon:137.478000,elevation:1350,source:'固定候補'}
  ],
  '霞沢岳': [
    {id:'fixed10-northalps-kasumizawa-kamikochi',type:'trailhead',name:'上高地',lat:36.246656,lon:137.635388,elevation:1505,source:'固定候補'}
  ],
  '武甲山': [
    {id:'fixed10-kanto-buko-ichinotorii',type:'trailhead',name:'生川・一の鳥居',lat:35.941718,lon:139.115772,elevation:520,source:'固定候補'}
  ],
  '毛無山': [
    {id:'fixed10-fuji-kenashi-fumoto',type:'trailhead',name:'麓・毛無山登山口',lat:35.400333,lon:138.553889,elevation:868,source:'固定候補'}
  ],
  '箱根山': [
    {id:'fixed10-hakone-owakudani',type:'trailhead',name:'大涌谷登山口',lat:35.242390,lon:139.019850,elevation:1040,source:'固定候補'}
  ]
});


// V1.12.13: 剱岳・早月尾根の早月小屋を座標込み固定。
// V1.12.12: 三瓶山の東の原・西の原・北の原（姫逃池）を座標込み固定。
// V1.12.11: 剱岳に馬場島（早月尾根登山口）を座標込み固定。
// V1.12.10: 岩手山の馬返し・焼走り登山口、八合目避難小屋を座標込み固定。
// V1.12.9: 第10弾 低固定率地域の追加強化（中国・四国・九州・東北）。
// 公開情報で登山口名と座標が確認できた地点のみ固定。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '上蒜山': [
    {id:'fixed10-chugoku-kamihiruzen-ski',type:'trailhead',name:'上蒜山登山口駐車場（上蒜山スキー場）',lat:35.310222,lon:133.639028,elevation:547,source:'固定候補'}
  ],
  '道後山': [
    {id:'fixed10-chugoku-dogo-tsukimigaoka',type:'trailhead',name:'月見ヶ丘登山口駐車場',lat:35.067889,lon:133.214361,elevation:1076,source:'固定候補'}
  ],
  '吾妻山': [
    {id:'fixed10-chugoku-azuma-camp',type:'trailhead',name:'吾妻山キャンプ場駐車場',lat:35.065361,lon:133.027944,elevation:1018,source:'固定候補'}
  ],
  '三瓶山': [
    {id:'fixed12-chugoku-sanbe-east',type:'trailhead',name:'東の原登山口（さんべ観光リフト）',lat:35.128583,lon:132.642722,elevation:561,source:'固定候補'},
    {id:'fixed12-chugoku-sanbe-west',type:'trailhead',name:'西の原登山口',lat:35.130056,lon:132.602028,elevation:462,source:'固定候補'},
    {id:'fixed12-chugoku-sanbe-north',type:'trailhead',name:'北の原・姫逃池登山口',lat:35.151750,lon:132.621222,elevation:588,source:'固定候補'}
  ],
  '瓶ヶ森': [
    {id:'fixed10-shikoku-kamegamori',type:'trailhead',name:'瓶ヶ森登山口駐車場',lat:33.784694,lon:133.190194,elevation:1673,source:'固定候補'}
  ],
  '伊予富士': [
    {id:'fixed10-shikoku-iyofuji-kanpuzan',type:'trailhead',name:'旧寒風山トンネル南口駐車場',lat:33.800111,lon:133.266833,elevation:1113,source:'固定候補'}
  ],
  '笹ヶ峰': [
    {id:'fixed10-shikoku-sasagamine-minamione',type:'trailhead',name:'笹ヶ峰 南尾根登山口',lat:33.813361,lon:133.279111,elevation:1127,source:'固定候補'}
  ],
  '高千穂峰': [
    {id:'fixed10-kyushu-takachiho-kawara',type:'trailhead',name:'高千穂河原',lat:31.886500,lon:130.897000,elevation:972,source:'固定候補'}
  ],
  '船形山': [
    {id:'fixed10-tohoku-funagata-hatasaka',type:'trailhead',name:'旗坂キャンプ場駐車場（升沢コース）',lat:38.457917,lon:140.680472,elevation:553,source:'固定候補'}
  ],
  '大滝根山': [
    {id:'fixed10-tohoku-otakine-takatsuka',type:'trailhead',name:'高塚高原キャンプ場駐車場',lat:37.351500,lon:140.714667,elevation:1025,source:'固定候補'}
  ]
});

// V1.10.0 全国主要山域強化。
// 座標をハードコードせず、代表登山口・山小屋の「名称」を手登録し、選択時にOSM/Nominatimで座標解決する。
// これにより全国の三百名山で手登録候補を持ちつつ、施設移転・名称差異にも自動探索で補完できる。
const CURATED_ACCESS_HINTS = {
  // 北海道
  '利尻山':{trailheads:['北麓野営場 利尻山登山口','沓形登山口'],huts:['利尻山避難小屋']},
  '羅臼岳':{trailheads:['岩尾別温泉 羅臼岳登山口'],huts:['羅臼平']},
  '斜里岳':{trailheads:['清岳荘'],huts:['清岳荘']},
  '雄阿寒岳':{trailheads:['滝口 雄阿寒岳登山口']},
  '天塩岳':{trailheads:['天塩岳ヒュッテ 登山口'],huts:['天塩岳ヒュッテ']},
  'ニセイカウシュッペ山':{trailheads:['古川林道 ニセイカウシュッペ山登山口']},
  '大雪山（旭岳）':{trailheads:['旭岳ロープウェイ姿見駅','旭岳温泉'],huts:['旭岳石室']},
  '石狩岳':{trailheads:['シュナイダーコース登山口','ユニ石狩岳登山口']},
  'トムラウシ山':{trailheads:['トムラウシ温泉 短縮登山口'],huts:['ヒサゴ沼避難小屋']},
  'オプタテシケ山':{trailheads:['望岳台'],huts:['美瑛富士避難小屋']},
  '十勝岳':{trailheads:['望岳台','吹上温泉登山口'],huts:['十勝岳避難小屋']},
  'ニペソツ山':{trailheads:['幌加温泉 ニペソツ山登山口']},
  '幌尻岳':{trailheads:['とよぬか山荘','新冠ポロシリ山荘 登山口'],huts:['幌尻山荘','新冠ポロシリ山荘']},
  'カムイエクウチカウシ山':{trailheads:['札内川ヒュッテ'],huts:['札内川ヒュッテ']},
  'ペテガリ岳':{trailheads:['神威山荘 ペテガリ岳登山口'],huts:['ペテガリ山荘']},
  '神威岳':{trailheads:['神威山荘']},
  '芦別岳':{trailheads:['山部自然公園太陽の里 芦別岳登山口']},
  '夕張岳':{trailheads:['夕張岳登山口'],huts:['夕張岳ヒュッテ']},
  '暑寒別岳':{trailheads:['暑寒荘'],huts:['暑寒荘']},
  '余市岳':{trailheads:['キロロ ゴンドラ山頂駅']},
  '樽前山':{trailheads:['樽前山七合目登山口']},
  '後方羊蹄山':{trailheads:['羊蹄山比羅夫登山口','真狩登山口','京極登山口'],huts:['羊蹄山避難小屋']},
  'ニセコアンヌプリ':{trailheads:['ニセコアンヌプリ五色温泉登山口']},
  '狩場山':{trailheads:['千走新道登山口']},
  '渡島駒ヶ岳':{trailheads:['赤井川登山口 駒ヶ岳']},
  '大千軒岳':{trailheads:['知内川コース登山口 大千軒岳']},

  // 東北
  '八甲田山':{trailheads:['酸ヶ湯温泉','八甲田ロープウェー山頂公園駅'],huts:['仙人岱避難小屋']},
  '岩木山':{trailheads:['岩木山八合目','嶽温泉 岩木山登山口']},
  '白神岳':{trailheads:['白神岳登山口'],huts:['白神岳避難小屋']},
  '八幡平':{trailheads:['八幡平山頂レストハウス']},
  '乳頭山（烏帽子岳）':{trailheads:['黒湯温泉','蟹場温泉']},
  '秋田駒ヶ岳':{trailheads:['八合目小屋 秋田駒ヶ岳'],huts:['阿弥陀池避難小屋']},
  '岩手山':{trailheads:['馬返し登山口 岩手山','焼走り登山口'],huts:['八合目避難小屋']},
  '姫神山':{trailheads:['一本杉登山口 姫神山']},
  '早池峰山':{trailheads:['小田越登山口'],huts:['早池峰山避難小屋']},
  '五葉山':{trailheads:['赤坂峠 五葉山登山口'],huts:['石楠花荘']},
  '和賀岳':{trailheads:['甘露水登山口 和賀岳']},
  '焼石岳':{trailheads:['中沼登山口'],huts:['銀明水避難小屋']},
  '栗駒山':{trailheads:['いわかがみ平','須川高原温泉']},
  '神室山':{trailheads:['西ノ又登山口 神室山']},
  '森吉山':{trailheads:['阿仁ゴンドラ山頂駅']},
  '太平山':{trailheads:['旭又登山口 太平山']},
  '鳥海山':{trailheads:['鉾立 鳥海山登山口','湯ノ台口'],huts:['御浜小屋','大物忌神社参籠所']},
  '月山':{trailheads:['月山八合目','姥沢 月山リフト'],huts:['佛生池小屋']},
  '摩耶山':{trailheads:['越沢登山口 摩耶山 山形']},
  '以東岳':{trailheads:['泡滝ダム'],huts:['以東岳避難小屋','大鳥小屋']},
  '大朝日岳':{trailheads:['古寺鉱泉 朝日岳登山口','日暮沢小屋'],huts:['大朝日小屋','竜門小屋']},
  '祝瓶山':{trailheads:['祝瓶山荘 登山口'],huts:['祝瓶山荘']},
  '船形山':{trailheads:['大滝キャンプ場 船形山登山口','旗坂キャンプ場'],huts:['升沢避難小屋']},
  '泉ヶ岳':{trailheads:['泉ヶ岳大駐車場']},
  '蔵王山（熊野岳）':{trailheads:['蔵王ロープウェイ地蔵山頂駅','刈田峠']},
  '飯豊山':{trailheads:['御沢登山口 飯豊山','大日杉登山口'],huts:['三国小屋','切合小屋','本山小屋']},
  '西吾妻山':{trailheads:['天元台高原リフト北望台','グランデコ ゴンドラ山頂駅'],huts:['西吾妻小屋']},
  '一切経山':{trailheads:['浄土平'],huts:['酸ヶ平避難小屋']},
  '安達太良山':{trailheads:['あだたら山ロープウェイ山頂駅','奥岳登山口'],huts:['くろがね小屋']},
  '磐梯山':{trailheads:['八方台登山口','猪苗代登山口'],huts:['弘法清水小屋']},
  '二岐山':{trailheads:['御鍋神社登山口 二岐山']},
  '七ヶ岳':{trailheads:['たかつえスキー場 七ヶ岳登山口']},
  '荒海山':{trailheads:['八総鉱山跡 荒海山登山口']},
  '帝釈山':{trailheads:['馬坂峠 帝釈山登山口']},
  '会津駒ヶ岳':{trailheads:['滝沢登山口 会津駒ヶ岳'],huts:['駒の小屋']},
  '会津朝日岳':{trailheads:['赤倉沢登山口 会津朝日岳']},
  '燧ヶ岳':{trailheads:['御池登山口 燧ヶ岳','長英新道 尾瀬沼'],huts:['尾瀬沼ヒュッテ']},
  '大滝根山':{trailheads:['仙台平 大滝根山登山口']},

  // 関東（代表的な未補強山）
  '筑波山':{trailheads:['筑波山神社入口','筑波山つつじヶ丘駐車場','つつじヶ丘駅 筑波山ロープウェイ'],huts:[]},

  // 近畿
  '伊吹山':{trailheads:['伊吹山登山口 三之宮神社','伊吹山ドライブウェイ山頂駐車場']},
  '藤原岳':{trailheads:['大貝戸登山口 藤原岳','孫太尾根登山口'],huts:['藤原山荘']},
  '御在所岳':{trailheads:['中登山道口 御在所岳','御在所ロープウエイ山上公園駅']},
  '倶留尊山':{trailheads:['曽爾高原 倶留尊山登山口']},
  '三峰山':{trailheads:['みつえ青少年旅行村 三峰山登山口']},
  '高見山':{trailheads:['高見峠','たかすみ温泉 高見山登山口']},
  '日出ヶ岳':{trailheads:['大台ヶ原ビジターセンター']},
  '竜門岳':{trailheads:['竜門岳登山口 吉野']},
  '山上ヶ岳':{trailheads:['清浄大橋 大峯山登山口'],huts:['大峯山寺宿坊']},
  '八経ヶ岳':{trailheads:['行者還トンネル西口'],huts:['弥山小屋']},
  '釈迦ヶ岳（奈良）':{trailheads:['太尾登山口 釈迦ヶ岳 奈良']},
  '伯母子岳':{trailheads:['大股登山口 伯母子岳'],huts:['伯母子岳避難小屋']},
  '護摩壇山':{trailheads:['護摩壇山森林公園ワイルドライフ']},
  '大和葛城山':{trailheads:['葛城山ロープウェイ山上駅','水越峠']},
  '金剛山':{trailheads:['千早本道登山口','水越峠 金剛山']},
  '武奈ヶ岳':{trailheads:['坊村 武奈ヶ岳登山口','イン谷口']},
  '蓬来山':{trailheads:['びわ湖バレイ山頂駅','蓬莱駅 登山口']},
  '比叡山':{trailheads:['坂本ケーブル延暦寺駅','修学院 比叡山登山口']},
  '愛宕山':{trailheads:['清滝 愛宕山登山口']},
  '六甲山':{trailheads:['芦屋川 高座の滝','有馬温泉 六甲山登山口']},

  // 中国
  '扇ノ山':{trailheads:['河合谷高原 扇ノ山登山口','姫路公園登山口']},
  '氷ノ山':{trailheads:['福定親水公園 氷ノ山登山口','わかさ氷ノ山登山口'],huts:['氷ノ山越避難小屋','氷ノ山山頂避難小屋']},
  '那岐山':{trailheads:['蛇淵の滝 那岐山登山口'],huts:['那岐山避難小屋']},
  '大山（鳥取）':{trailheads:['夏山登山口 大山','博労座'],huts:['六合目避難小屋','大山頂上避難小屋']},
  '上蒜山':{trailheads:['上蒜山登山口']},
  '道後山':{trailheads:['月見ヶ丘駐車場 道後山']},
  '吾妻山':{trailheads:['休暇村吾妻山ロッジ 登山口']},
  '三瓶山':{trailheads:['東の原 三瓶山','西の原 三瓶山','三瓶山北の原']},

  // 四国
  '剣山':{trailheads:['見ノ越 剣山登山口','剣山観光登山リフト西島駅'],huts:['剣山頂上ヒュッテ']},
  '三嶺':{trailheads:['名頃登山口 三嶺','光石登山口'],huts:['三嶺ヒュッテ']},
  '東赤石山':{trailheads:['瀬場登山口 東赤石山'],huts:['赤石山荘']},
  '笹ヶ峰':{trailheads:['下津池 笹ヶ峰登山口']},
  '伊予富士':{trailheads:['寒風山登山口']},
  '瓶ヶ森':{trailheads:['瓶ヶ森駐車場']},
  '石鎚山':{trailheads:['土小屋登山口','石鎚ロープウェイ山頂成就駅'],huts:['石鎚神社頂上山荘']},
  '三本杭':{trailheads:['万年橋 滑床渓谷 三本杭登山口']},
  '篠山':{trailheads:['篠山登山口 愛媛高知']},

  // 九州
  '英彦山':{trailheads:['別所駐車場 英彦山','豊前坊 高住神社'],huts:['英彦山青年の家']},
  '脊振山':{trailheads:['脊振山山頂駐車場','椎原峠登山口']},
  '多良岳':{trailheads:['中山キャンプ場 多良岳','黒木登山口']},
  '雲仙岳（普賢岳）':{trailheads:['仁田峠'],huts:['紅葉茶屋']},
  '鶴見岳':{trailheads:['別府ロープウェイ鶴見山上駅','火男火売神社登山口']},
  '由布岳':{trailheads:['由布岳正面登山口','東登山口']},
  '大船山':{trailheads:['男池登山口'],huts:['法華院温泉山荘','坊ガツル']},
  '久住山':{trailheads:['牧ノ戸峠'],huts:['久住分かれ避難小屋','法華院温泉山荘']},
  '湧蓋山':{trailheads:['八丁原 湧蓋山登山口']},
  '阿蘇山（高岳）':{trailheads:['仙酔峡登山口','砂千里ヶ浜'],huts:['月見小屋']},
  '祖母山':{trailheads:['北谷登山口 祖母山','神原登山口'],huts:['祖母山九合目小屋']},
  '傾山':{trailheads:['九折登山口 傾山']},
  '大崩山':{trailheads:['祝子川 大崩山登山口'],huts:['大崩山荘']},
  '国見岳':{trailheads:['国見岳新登山口（五勇谷橋ルート）']},
  '市房山':{trailheads:['市房山キャンプ場 登山口']},
  '尾鈴山':{trailheads:['甘茶谷 尾鈴山登山口']},
  '霧島山（韓国岳）':{trailheads:['えびの高原 韓国岳登山口','大浪池登山口']},
  '高千穂峰':{trailheads:['高千穂河原']},
  '桜島（御岳）':{trailheads:['湯之平展望所']},
  '高隈山':{trailheads:['大野原 高隈山登山口']},
  '開聞岳':{trailheads:['かいもん山麓ふれあい公園 開聞岳登山口']},
  '宮ノ浦岳':{trailheads:['淀川登山口'],huts:['淀川小屋','新高塚小屋','高塚小屋']},
  '宮之浦岳':{trailheads:['淀川登山口'],huts:['淀川小屋','新高塚小屋','高塚小屋']}
};

function curatedHintRows(mountain){
  const hint=CURATED_ACCESS_HINTS[mountain]||CURATED_ACCESS_HINTS[Object.keys(MOUNTAIN_NAME_ALIAS).find(k=>MOUNTAIN_NAME_ALIAS[k]===mountain)]||null;
  if(!hint)return [];
  return [
    ...(hint.trailheads||[]).map((name,i)=>({type:'trailhead',name,search:`${name} ${mountain} 日本`,hintIndex:i})),
    ...(hint.huts||[]).map((name,i)=>({type:'hut',name,search:`${name} ${mountain} 日本`,hintIndex:i}))
  ];
}

function fixedNameFallbackCandidates(mountain){
  return curatedHintRows(mountain).map((h,i)=>({
    id:`fixed-name-${h.type}-${mountain}-${i}`,
    type:h.type,
    name:h.name,
    lat:null,
    lon:null,
    elevation:'',
    unresolved:true,
    source:'固定候補（座標確認中）'
  }));
}
function hasResolvedCoord(p){
  return p&&p.lat!==null&&p.lat!==undefined&&p.lon!==null&&p.lon!==undefined&&Number.isFinite(Number(p.lat))&&Number.isFinite(Number(p.lon));
}
async function resolveCuratedCandidates(mountain,center){
  const cacheKey=`curated:${mountainCacheKey(mountain)}`;
  const cached=routeCacheGet(cacheKey,365*24*60*60*1000);
  if(Array.isArray(cached))return cached;
  const hints=curatedHintRows(mountain);
  const jobs=hints.map(async h=>{
    try{
      const url=`https://nominatim.openstreetmap.org/search?format=jsonv2&countrycodes=jp&limit=4&addressdetails=1&q=${encodeURIComponent(h.search)}`;
      const res=await proxyFetch(url);
      if(!res.ok)return null;
      const rows=await res.json();
      const found=(Array.isArray(rows)?rows:[]).map(r=>({r,lat:Number(r.lat),lon:Number(r.lon)})).filter(x=>Number.isFinite(x.lat)&&Number.isFinite(x.lon));
      found.sort((a,b)=>haversineMeters(center.latitude,center.longitude,a.lat,a.lon)-haversineMeters(center.latitude,center.longitude,b.lat,b.lon));
      const best=found.find(x=>haversineMeters(center.latitude,center.longitude,x.lat,x.lon)<=70000);
      return best?{id:`curated-${h.type}-${mountain}-${h.hintIndex}-${Math.abs(Math.round(best.lat*1e5))}`,type:h.type,name:h.name,lat:best.lat,lon:best.lon,elevation:'',source:'固定候補（名称解決）'}:null;
    }catch(_){return null;}
  });
  const out=(await Promise.all(jobs)).filter(Boolean);
  routeCachePut(cacheKey,out);
  return out;
}

const MOUNTAIN_REGION = {
  // V1.10.0 南アルプス
  '甲斐駒ヶ岳':'southalps_north','鋸岳':'southalps_north','仙丈ヶ岳':'southalps_north','アサヨ峰':'southalps_north','地蔵ヶ岳':'southalps_north','鳳凰山':'southalps_north',
  '北岳':'southalps_shirane','間ノ岳':'southalps_shirane','農鳥岳':'southalps_shirane',
  '塩見岳':'southalps_central','荒川岳':'southalps_central','赤石岳':'southalps_central',
  '聖岳':'southalps_south','上河内岳':'southalps_south','茶臼岳':'southalps_south','光岳':'southalps_south','池口岳':'southalps_south','奥茶臼山':'southalps_south','大無間山':'southalps_south','黒法師岳':'southalps_south','笊ヶ岳':'southalps_south',
  // V1.10.0 八ヶ岳
  '八ヶ岳（赤岳）':'yatsu_south','赤岳':'yatsu_south','横岳（八ヶ岳）':'yatsu_south','硫黄岳（八ヶ岳）':'yatsu_south','阿弥陀岳':'yatsu_south','権現岳':'yatsu_south','編笠山':'yatsu_south',
  '蓼科山':'yatsu_north','天狗岳':'yatsu_north','北横岳':'yatsu_north',
  '燕岳':'omoteginza','大天井岳':'omoteginza',
  '常念岳':'jonen_chou','蝶ヶ岳':'jonen_chou',
  '槍ヶ岳':'yarihotaka','南岳':'yarihotaka','北穂高岳':'yarihotaka','奥穂高岳':'yarihotaka','前穂高岳':'yarihotaka',
  '西穂高岳':'nishiho_yake','焼岳':'nishiho_yake',
  '笠ヶ岳（岐阜）':'kasa_sugoroku','双六岳':'kasa_sugoroku','三俣蓮華岳':'kasa_sugoroku','鷲羽岳':'ushiroginza',
  '烏帽子岳':'ushiroginza','野口五郎岳':'ushiroginza','水晶岳（黒岳）':'ushiroginza',
  '朝日岳（新潟・富山）':'hakuba_asahi','雪倉岳':'hakuba_asahi','白馬岳':'hakuba_asahi','唐松岳':'hakuba_asahi',
  '針ノ木岳':'harinoki_funakubo','蓮華岳':'harinoki_funakubo',
  '爺ヶ岳':'ushirotateyama','鹿島槍ヶ岳':'ushirotateyama','五竜岳':'ushirotateyama',
  '立山':'tateyama_tsurugi','剱岳':'tateyama_tsurugi','奥大日岳':'tateyama_tsurugi',
  '薬師岳':'yakushi_kurobe','黒部五郎岳':'yakushi_kurobe',
  // V1.12.56 中央アルプス縦走回廊
  '木曽駒ヶ岳':'central_kisokoma_utsugi','宝剣岳':'central_kisokoma_utsugi','檜尾岳':'central_kisokoma_utsugi',
  '熊沢岳':'central_kisokoma_utsugi','東川岳':'central_kisokoma_utsugi','空木岳':'central_kisokoma_utsugi'
};
// typo-safe alias for the ura-ginza key used above.
MOUNTAIN_REGION['鷲羽岳']='ushiroginza';

// V1.12.22: 関東・上信越32座の山頂・代表登山口を公開座標で固定。
Object.assign(MOUNTAIN_PRESETS, {
  '八溝山':{latitude:36.930151,longitude:140.272988},
  '筑波山':{latitude:36.225359,longitude:140.106942},
  '三本槍岳':{latitude:37.150142,longitude:139.961414},
  '男鹿岳':{latitude:37.085312,longitude:139.822082},
  '景鶴山':{latitude:36.956884,longitude:139.210582},
  '至仏山':{latitude:36.903474,longitude:139.173248},
  '釈迦ヶ岳（栃木）':{latitude:36.899965,longitude:139.776761},
  '女峰山':{latitude:36.811457,longitude:139.536492},
  '男体山':{latitude:36.764951,longitude:139.490684},
  '太郎山':{latitude:36.817874,longitude:139.482780},
  '奥白根山':{latitude:36.798602,longitude:139.375921},
  '皇海山':{latitude:36.689863,longitude:139.336965},
  '袈裟丸山':{latitude:36.649389,longitude:139.327503},
  '武尊山':{latitude:36.805189,longitude:139.132601},
  '赤城山（黒檜山）':{latitude:36.560367,longitude:139.193270},
  '草津白根山':{latitude:36.643948,longitude:138.527727},
  '浅間隠山':{latitude:36.453704,longitude:138.652493},
  '榛名山（榛名富士）':{latitude:36.476933,longitude:138.878280},
  '妙義山（相馬岳）':{latitude:36.298645,longitude:138.748852},
  '荒船山':{latitude:36.203993,longitude:138.637127},
  '諏訪山':{latitude:36.040050,longitude:138.729580},
  '巻機山':{latitude:36.978551,longitude:138.964448},
  '朝日岳（群馬）':{latitude:36.880662,longitude:138.972624},
  '谷川岳':{latitude:36.837115,longitude:138.930157},
  '仙ノ倉山':{latitude:36.817468,longitude:138.839518},
  '白砂山':{latitude:36.738071,longitude:138.693474},
  '横手山':{latitude:36.668919,longitude:138.525913},
  '岩菅山':{latitude:36.742041,longitude:138.559524},
  '笠ヶ岳（長野）':{latitude:36.676633,longitude:138.481478},
  '四阿山':{latitude:36.541764,longitude:138.412969},
  '浅間山':{latitude:36.406526,longitude:138.522963},
  '御座山':{latitude:36.034105,longitude:138.606775}
});

const V1222_KANTO_JOSHINETSU_FIXED = {
  '八溝山':[
    {id:'v1222-yamizo-peak',type:'peak',name:'八溝山',lat:36.930151,lon:140.272988,elevation:1022,source:'固定候補'},
    {id:'v1222-yamizo-nichirinji',type:'trailhead',name:'日輪寺・八溝山登山口',lat:36.920763,lon:140.273636,elevation:820,source:'固定候補'}],
  '筑波山':[
    {id:'v1222-tsukuba-peak',type:'peak',name:'筑波山（女体山）',lat:36.225359,lon:140.106942,elevation:877,source:'固定候補'},
    {id:'v1222-tsukuba-tsutsujigaoka',type:'trailhead',name:'つつじヶ丘登山口',lat:36.2201631,lon:140.1194898,elevation:530,source:'固定候補'}],
  '三本槍岳':[
    {id:'v1222-sanbonyari-peak',type:'peak',name:'三本槍岳',lat:37.150142,lon:139.961414,elevation:1917,source:'固定候補'},
    {id:'v1222-sanbonyari-toge',type:'trailhead',name:'峠の茶屋・那須岳登山口',lat:37.125389,lon:139.979722,elevation:1462,source:'固定候補'}],
  '男鹿岳':[
    {id:'v1222-ojika-peak',type:'peak',name:'男鹿岳',lat:37.085312,lon:139.822082,elevation:1777,source:'固定候補'},
    {id:'v1222-ojika-miyama',type:'trailhead',name:'深山園地・塩那道路ゲート',lat:37.069713,lon:139.894165,elevation:1096,source:'固定候補'}],
  '景鶴山':[
    {id:'v1222-keizuru-peak',type:'peak',name:'景鶴山',lat:36.956884,lon:139.210582,elevation:2004,source:'固定候補'},
    {id:'v1222-keizuru-hatomachi',type:'trailhead',name:'鳩待峠（尾瀬側起点）',lat:36.888750,lon:139.201027,elevation:1585,source:'固定候補'}],
  '至仏山':[
    {id:'v1222-shibutsu-peak',type:'peak',name:'至仏山',lat:36.903474,lon:139.173248,elevation:2228,source:'固定候補'},
    {id:'v1222-shibutsu-hatomachi',type:'trailhead',name:'鳩待峠',lat:36.888750,lon:139.201027,elevation:1585,source:'固定候補'}],
  '釈迦ヶ岳（栃木）':[
    {id:'v1222-takahara-shaka-peak',type:'peak',name:'高原山・釈迦ヶ岳',lat:36.899965,lon:139.776761,elevation:1795,source:'固定候補'},
    {id:'v1222-takahara-omama',type:'trailhead',name:'八方ヶ原・大間々台登山口',lat:36.900510,lon:139.817691,elevation:1278,source:'固定候補'}],
  '女峰山':[
    {id:'v1222-nyoho-peak',type:'peak',name:'女峰山',lat:36.811457,lon:139.536492,elevation:2483,source:'固定候補'},
    {id:'v1222-nyoho-takino',type:'trailhead',name:'滝尾神社登山口',lat:36.765000,lon:139.593944,elevation:726,source:'固定候補'}],
  '男体山':[
    {id:'v1222-nantai-peak',type:'peak',name:'男体山',lat:36.764951,lon:139.490684,elevation:2486,source:'固定候補'},
    {id:'v1222-nantai-futarasan',type:'trailhead',name:'二荒山神社中宮祠登山口',lat:36.741944,lon:139.487806,elevation:1280,source:'固定候補'}],
  '太郎山':[
    {id:'v1222-taro-peak',type:'peak',name:'太郎山',lat:36.817874,lon:139.482780,elevation:2368,source:'固定候補'},
    {id:'v1222-taro-sanno',type:'trailhead',name:'山王峠・太郎山登山口',lat:36.812879,lon:139.454325,elevation:1720,source:'固定候補'}],
  '奥白根山':[
    {id:'v1222-nikkoshirane-peak',type:'peak',name:'奥白根山（日光白根山）',lat:36.798602,lon:139.375921,elevation:2578,source:'固定候補'},
    {id:'v1222-nikkoshirane-rw',type:'trailhead',name:'丸沼高原・日光白根山ロープウェイ',lat:36.814806,lon:139.329444,elevation:1380,source:'固定候補'}],
  '皇海山':[
    {id:'v1222-sukai-peak',type:'peak',name:'皇海山',lat:36.689863,lon:139.336965,elevation:2144,source:'固定候補'},
    {id:'v1222-sukai-ginzandaira',type:'trailhead',name:'銀山平・皇海山登山者駐車場',lat:36.655699,lon:139.407127,elevation:835,source:'固定候補'},
    {id:'v1222-sukai-koshin',type:'hut',name:'庚申山荘（避難小屋）',lat:36.669690,lon:139.368080,elevation:1495,source:'固定候補'}],
  '袈裟丸山':[
    {id:'v1222-kesamaru-peak',type:'peak',name:'袈裟丸山',lat:36.649389,lon:139.327503,elevation:1961,source:'固定候補'},
    {id:'v1222-kesamaru-oriba',type:'trailhead',name:'折場登山口',lat:36.601892,lon:139.340946,elevation:1190,source:'固定候補'}],
  '武尊山':[
    {id:'v1222-hotaka-peak',type:'peak',name:'武尊山',lat:36.805189,lon:139.132601,elevation:2158,source:'固定候補'},
    {id:'v1222-hotaka-kawaba',type:'trailhead',name:'川場谷野営場登山口',lat:36.771194,lon:139.153167,elevation:1230,source:'固定候補'}],
  '赤城山（黒檜山）':[
    {id:'v1222-akagi-peak',type:'peak',name:'赤城山（黒檜山）',lat:36.560367,lon:139.193270,elevation:1828,source:'固定候補'},
    {id:'v1222-akagi-kurobi',type:'trailhead',name:'黒檜山登山口',lat:36.554222,lon:139.183917,elevation:1350,source:'固定候補'}],
  '草津白根山':[
    {id:'v1222-kusatsushirane-peak',type:'peak',name:'草津白根山（白根山）',lat:36.643948,lon:138.527727,elevation:2160,source:'固定候補'},
    {id:'v1222-kusatsushirane-hakone',type:'trailhead',name:'白根火山・湯釜側起点',lat:36.637222,lon:138.534167,elevation:2010,source:'固定候補'}],
  '浅間隠山':[
    {id:'v1222-asamakakushi-peak',type:'peak',name:'浅間隠山',lat:36.453704,lon:138.652493,elevation:1757,source:'固定候補'},
    {id:'v1222-asamakakushi-trail',type:'trailhead',name:'浅間隠山登山口（二度上峠付近）',lat:36.439676,lon:138.649254,elevation:1340,source:'固定候補'}],
  '榛名山（榛名富士）':[
    {id:'v1222-harunafuji-peak',type:'peak',name:'榛名富士',lat:36.476933,lon:138.878280,elevation:1390,source:'固定候補'},
    {id:'v1222-harunafuji-vc',type:'trailhead',name:'榛名公園ビジターセンター登山口',lat:36.470669,lon:138.874255,elevation:1087,source:'固定候補'}],
  '妙義山（相馬岳）':[
    {id:'v1222-myogi-peak',type:'peak',name:'妙義山（相馬岳）',lat:36.298645,lon:138.748852,elevation:1104,source:'固定候補'},
    {id:'v1222-myogi-jinja',type:'trailhead',name:'妙義神社入口・登山者駐車場',lat:36.299287,lon:138.764227,elevation:450,source:'固定候補'}],
  '荒船山':[
    {id:'v1222-arafune-peak',type:'peak',name:'荒船山（経塚山）',lat:36.203993,lon:138.637127,elevation:1423,source:'固定候補'},
    {id:'v1222-arafune-uchiyama',type:'trailhead',name:'内山峠登山口',lat:36.222368,lon:138.616004,elevation:1060,source:'固定候補'}],
  '諏訪山':[
    {id:'v1222-suwa-peak',type:'peak',name:'諏訪山（上野村）',lat:36.040050,lon:138.729580,elevation:1549,source:'固定候補'},
    {id:'v1222-suwa-taruhara',type:'trailhead',name:'楢原・樽原登山口',lat:36.074444,lon:138.731889,elevation:850,source:'固定候補'},
    {id:'v1222-suwa-hamahira',type:'trailhead',name:'浜平登山口',lat:36.063583,lon:138.707333,elevation:686,source:'固定候補'}],
  '巻機山':[
    {id:'v1222-makihata-peak',type:'peak',name:'巻機山',lat:36.978551,lon:138.964448,elevation:1967,source:'固定候補'},
    {id:'v1222-makihata-sakurazaka',type:'trailhead',name:'桜坂登山口',lat:36.954532,lon:138.935319,elevation:730,source:'固定候補'}],
  '朝日岳（群馬）':[
    {id:'v1222-asahi-gunma-peak',type:'peak',name:'朝日岳（群馬）',lat:36.880662,lon:138.972624,elevation:1945,source:'固定候補'},
    {id:'v1222-asahi-yubiso',type:'trailhead',name:'湯檜曽公園・白毛門登山口側',lat:36.816547,lon:138.985161,elevation:590,source:'固定候補'}],
  '谷川岳':[
    {id:'v1222-tanigawa-peak',type:'peak',name:'谷川岳（オキノ耳）',lat:36.837115,lon:138.930157,elevation:1977,source:'固定候補'},
    {id:'v1222-tanigawa-tenjin',type:'trailhead',name:'天神平',lat:36.819600,lon:138.949000,elevation:1319,source:'固定候補'},
    {id:'v1222-tanigawa-kumazawa',type:'hut',name:'熊穴沢避難小屋',lat:36.828000,lon:138.944600,elevation:1465,source:'固定候補'}],
  '仙ノ倉山':[
    {id:'v1222-sennokura-peak',type:'peak',name:'仙ノ倉山',lat:36.817468,lon:138.839518,elevation:2026,source:'固定候補'},
    {id:'v1222-sennokura-tairappyo',type:'trailhead',name:'平標登山口・元橋駐車場',lat:36.813507,lon:138.783102,elevation:970,source:'固定候補'},
    {id:'v1222-sennokura-tairappyo-hut',type:'hut',name:'平標山の家',lat:36.806667,lon:138.824722,elevation:1655,source:'固定候補'}],
  '白砂山':[
    {id:'v1222-shirasuna-peak',type:'peak',name:'白砂山',lat:36.738071,lon:138.693474,elevation:2140,source:'固定候補'},
    {id:'v1222-shirasuna-nozori',type:'trailhead',name:'野反湖・白砂山登山口',lat:36.719662,lon:138.643020,elevation:1520,source:'固定候補'}],
  '横手山':[
    {id:'v1222-yokote-peak',type:'peak',name:'横手山',lat:36.668919,lon:138.525913,elevation:2307,source:'固定候補'},
    {id:'v1222-yokote-shibu',type:'trailhead',name:'渋峠',lat:36.666492,lon:138.534141,elevation:2150,source:'固定候補'}],
  '岩菅山':[
    {id:'v1222-iwasuge-peak',type:'peak',name:'岩菅山',lat:36.742041,lon:138.559524,elevation:2295,source:'固定候補'},
    {id:'v1222-iwasuge-hijiri',type:'trailhead',name:'聖平登山口',lat:36.748806,lon:138.532167,elevation:1535,source:'固定候補'}],
  '笠ヶ岳（長野）':[
    {id:'v1222-kasa-nagano-peak',type:'peak',name:'笠ヶ岳（長野）',lat:36.676633,lon:138.481478,elevation:2076,source:'固定候補'},
    {id:'v1222-kasa-nagano-toge',type:'trailhead',name:'笠岳峠・笠ヶ岳登山口',lat:36.676833,lon:138.477750,elevation:1923,source:'固定候補'}],
  '四阿山':[
    {id:'v1222-azumaya-peak',type:'peak',name:'四阿山',lat:36.541764,lon:138.412969,elevation:2354,source:'固定候補'},
    {id:'v1222-azumaya-sugadaira',type:'trailhead',name:'菅平牧場登山口',lat:36.538255,lon:138.371745,elevation:1580,source:'固定候補'}],
  '浅間山':[
    {id:'v1222-asama-peak',type:'peak',name:'浅間山',lat:36.406526,lon:138.522963,elevation:2568,source:'固定候補'},
    {id:'v1222-asama-kurumazaka',type:'trailhead',name:'高峰高原・車坂峠',lat:36.405090,lon:138.469704,elevation:1970,source:'固定候補'}],
  '御座山':[
    {id:'v1222-ogura-peak',type:'peak',name:'御座山',lat:36.034105,lon:138.606775,elevation:2112,source:'固定候補'},
    {id:'v1222-ogura-choja',type:'trailhead',name:'長者の森登山口',lat:36.064769,lon:138.629299,elevation:1240,source:'固定候補'},
    {id:'v1222-ogura-kuryu',type:'trailhead',name:'栗生登山口',lat:36.020483,lon:138.601839,elevation:1420,source:'固定候補'}]
};
for (const [mountain, fixed] of Object.entries(V1222_KANTO_JOSHINETSU_FIXED)) {
  const old = BUILTIN_ROUTE_CATALOG[mountain] || [];
  const keys = new Set(fixed.map(p => `${p.type}:${p.name}`));
  BUILTIN_ROUTE_CATALOG[mountain] = [...fixed, ...old.filter(p => !keys.has(`${p.type}:${p.name}`))];
}

function mergeRegionalCatalogs(...keys){
  const out=[];
  const seen=new Set();
  for(const key of keys){
    for(const p of (REGIONAL_CATALOG[key]||[])){
      const dedupeKey=`${p.type}|${accessNameKey(p.name)}`;
      if(seen.has(dedupeKey))continue;
      seen.add(dedupeKey);
      out.push(p);
    }
  }
  return out;
}

function regionalCandidates(mountain){
  const key=MOUNTAIN_REGION[mountain];
  if(!key)return [];
  // 槍ヶ岳は表銀座側からも選べるよう両グループを統合。
  if(mountain==='槍ヶ岳')return mergeRegionalCatalogs('omoteginza','yarihotaka','jonen_chou');

  // V1.12.36 北アルプス縦走回廊を連結。
  // 西穂高岳から奥穂高岳方面へ候補を閉じない。
  if(['西穂高岳','ジャンダルム','奥穂高岳','前穂高岳','北穂高岳','南岳'].includes(mountain)){
    return mergeRegionalCatalogs('nishiho_yake','yarihotaka');
  }

  // 白馬岳から後立山を南下し、五竜岳→鹿島槍ヶ岳→爺ヶ岳→針ノ木岳方面まで候補を連続表示。
  if(['白馬岳','唐松岳','五竜岳','鹿島槍ヶ岳','爺ヶ岳','針ノ木岳','蓮華岳'].includes(mountain)){
    return mergeRegionalCatalogs('hakuba_asahi','ushirotateyama','harinoki_funakubo');
  }

  // V1.12.56 木曽駒ヶ岳〜宝剣岳〜檜尾岳〜熊沢岳〜東川岳〜空木岳を同一回廊として提示。
  if(['木曽駒ヶ岳','宝剣岳','檜尾岳','熊沢岳','東川岳','空木岳'].includes(mountain)){
    return mergeRegionalCatalogs('central_kisokoma_utsugi');
  }
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
// V1.12.23: 八ヶ岳・中信を一括固定強化。山頂は国土地理院値を基準にし、公開座標を確認できた主要登山口・山小屋を固定候補化。
const FIXED_YATSUGATAKE_CHUSHIN_V11223 = {
  '蓼科山': [
    {id:'fixed23-tateshina-peak',type:'peak',name:'蓼科山',lat:36.103611,lon:138.295000,elevation:2531,source:'固定候補'},
    {id:'fixed23-tateshina-7',type:'trailhead',name:'蓼科山七合目登山口',lat:36.117000,lon:138.297000,elevation:1900,source:'固定候補'},
    {id:'fixed23-tateshina-suzuran',type:'trailhead',name:'女乃神茶屋（蓼科山登山口）',lat:36.089000,lon:138.277000,elevation:1730,source:'固定候補'},
    {id:'fixed23-tateshina-hutte',type:'hut',name:'蓼科山頂ヒュッテ',lat:36.103500,lon:138.294400,elevation:2530,source:'固定候補'}
  ],
  '天狗岳': [
    {id:'fixed23-tengu-peak',type:'peak',name:'天狗岳（東天狗岳）',lat:36.019167,lon:138.355556,elevation:2646,source:'固定候補'},
    {id:'fixed23-tengu-shibu',type:'trailhead',name:'渋の湯',lat:36.045500,lon:138.304000,elevation:1840,source:'固定候補'},
    {id:'fixed23-tengu-karasawa',type:'trailhead',name:'唐沢鉱泉',lat:36.037000,lon:138.309000,elevation:1870,source:'固定候補'},
    {id:'fixed23-tengu-kuroyuri',type:'hut',name:'黒百合ヒュッテ',lat:36.026000,lon:138.348000,elevation:2410,source:'固定候補'}
  ],
  '八ヶ岳（赤岳）': [
    {id:'fixed23-yatsu-aka-peak',type:'peak',name:'赤岳（八ヶ岳最高峰）',lat:35.970833,lon:138.370000,elevation:2899,source:'固定候補'},
    {id:'fixed23-yatsu-minotoguchi',type:'trailhead',name:'美濃戸口',lat:35.997800,lon:138.307900,elevation:1490,source:'固定候補'},
    {id:'fixed23-yatsu-minoto',type:'trailhead',name:'美濃戸',lat:35.988800,lon:138.329800,elevation:1720,source:'固定候補'},
    {id:'fixed23-yatsu-akakosen',type:'hut',name:'赤岳鉱泉',lat:35.986100,lon:138.350400,elevation:2220,source:'固定候補'},
    {id:'fixed23-yatsu-gyoja',type:'hut',name:'行者小屋',lat:35.977900,lon:138.357200,elevation:2350,source:'固定候補'},
    {id:'fixed23-yatsu-tenbo',type:'hut',name:'赤岳天望荘',lat:35.976000,lon:138.371000,elevation:2722,source:'固定候補'}
  ],
  '入笠山': [
    {id:'fixed23-nyukasa-peak',type:'peak',name:'入笠山',lat:35.896389,lon:138.171667,elevation:1955,source:'固定候補'},
    {id:'fixed23-nyukasa-sawairi',type:'trailhead',name:'沢入登山口',lat:35.901833,lon:138.190722,elevation:1450,source:'固定候補'},
    {id:'fixed23-nyukasa-goshodaira',type:'trailhead',name:'御所平 登山者用臨時駐車場',lat:35.901167,lon:138.172389,elevation:1780,source:'固定候補'}
  ],
  '霧ヶ峰（車山）': [
    {id:'fixed23-kirigamine-peak',type:'peak',name:'霧ヶ峰（車山）',lat:36.103056,lon:138.196667,elevation:1925,source:'固定候補'},
    {id:'fixed23-kirigamine-kata',type:'trailhead',name:'車山肩',lat:36.103935,lon:138.187367,elevation:1800,source:'固定候補'},
    {id:'fixed23-kirigamine-yashima',type:'trailhead',name:'八島ヶ原湿原',lat:36.120275,lon:138.159731,elevation:1645,source:'固定候補'}
  ],
  '鉢伏山': [
    {id:'fixed23-hachibuse-peak',type:'peak',name:'鉢伏山',lat:36.163056,lon:138.059167,elevation:1929,source:'固定候補'},
    {id:'fixed23-hachibuse-sanso-th',type:'trailhead',name:'鉢伏山荘駐車場',lat:36.166638,lon:138.057418,elevation:1840,source:'固定候補'},
    {id:'fixed23-hachibuse-tobira',type:'trailhead',name:'扉温泉',lat:36.186940,lon:138.079838,elevation:1050,source:'固定候補'},
    {id:'fixed23-hachibuse-sanso',type:'hut',name:'鉢伏山荘',lat:36.166111,lon:138.054722,elevation:1833,source:'固定候補'}
  ],
  '美ヶ原': [
    {id:'fixed23-utsukushi-peak',type:'peak',name:'美ヶ原（王ヶ頭）',lat:36.225833,lon:138.107500,elevation:2034,source:'固定候補'},
    {id:'fixed23-utsukushi-sanjio',type:'trailhead',name:'三城いこいの広場',lat:36.208900,lon:138.102361,elevation:1410,source:'固定候補'},
    {id:'fixed23-utsukushi-yamamoto',type:'trailhead',name:'山本小屋ふる里館・町営駐車場',lat:36.228410,lon:138.132690,elevation:1940,source:'固定候補'}
  ],
  '赤岳': [
    {id:'fixed23-aka-peak',type:'peak',name:'赤岳',lat:35.970833,lon:138.370000,elevation:2899,source:'固定候補'},
    {id:'fixed23-aka-minoto',type:'trailhead',name:'美濃戸口',lat:35.997800,lon:138.307900,elevation:1490,source:'固定候補'},
    {id:'fixed23-aka-kosen',type:'hut',name:'赤岳鉱泉',lat:35.986100,lon:138.350400,elevation:2220,source:'固定候補'},
    {id:'fixed23-aka-gyoja',type:'hut',name:'行者小屋',lat:35.977900,lon:138.357200,elevation:2350,source:'固定候補'}
  ],
  '横岳（八ヶ岳）': [
    {id:'fixed23-yoko-peak',type:'peak',name:'横岳（八ヶ岳）',lat:35.984722,lon:138.373611,elevation:2829,source:'固定候補'},
    {id:'fixed23-yoko-minoto',type:'trailhead',name:'美濃戸口',lat:35.997800,lon:138.307900,elevation:1490,source:'固定候補'},
    {id:'fixed23-yoko-iouhut',type:'hut',name:'硫黄岳山荘',lat:35.994800,lon:138.372000,elevation:2650,source:'固定候補'}
  ],
  '硫黄岳（八ヶ岳）': [
    {id:'fixed23-iou-peak',type:'peak',name:'硫黄岳（八ヶ岳）',lat:35.998611,lon:138.370000,elevation:2760,source:'固定候補'},
    {id:'fixed23-iou-minoto',type:'trailhead',name:'美濃戸口',lat:35.997800,lon:138.307900,elevation:1490,source:'固定候補'},
    {id:'fixed23-iou-kosen',type:'hut',name:'赤岳鉱泉',lat:35.986100,lon:138.350400,elevation:2220,source:'固定候補'},
    {id:'fixed23-iou-hut',type:'hut',name:'硫黄岳山荘',lat:35.994800,lon:138.372000,elevation:2650,source:'固定候補'}
  ],
  '阿弥陀岳': [
    {id:'fixed23-amida-peak',type:'peak',name:'阿弥陀岳',lat:35.972222,lon:138.358889,elevation:2805,source:'固定候補'},
    {id:'fixed23-amida-minoto',type:'trailhead',name:'美濃戸口',lat:35.997800,lon:138.307900,elevation:1490,source:'固定候補'},
    {id:'fixed23-amida-gyoja',type:'hut',name:'行者小屋',lat:35.977900,lon:138.357200,elevation:2350,source:'固定候補'}
  ],
  '権現岳': [
    {id:'fixed23-gongen-peak',type:'peak',name:'権現岳',lat:35.949722,lon:138.359722,elevation:2715,source:'固定候補'},
    {id:'fixed23-gongen-kannon',type:'trailhead',name:'観音平',lat:35.930000,lon:138.360000,elevation:1560,source:'固定候補'},
    {id:'fixed23-gongen-hut',type:'hut',name:'権現小屋',lat:35.949000,lon:138.359000,elevation:2700,source:'固定候補'}
  ],
  '編笠山': [
    {id:'fixed23-amigasa-peak',type:'peak',name:'編笠山',lat:35.941667,lon:138.345000,elevation:2524,source:'固定候補'},
    {id:'fixed23-amigasa-kannon',type:'trailhead',name:'観音平',lat:35.930000,lon:138.360000,elevation:1560,source:'固定候補'},
    {id:'fixed23-amigasa-fujimi',type:'trailhead',name:'富士見高原登山口',lat:35.924000,lon:138.332000,elevation:1350,source:'固定候補'},
    {id:'fixed23-amigasa-seinen',type:'hut',name:'青年小屋',lat:35.946000,lon:138.350000,elevation:2380,source:'固定候補'}
  ],
  '北横岳': [
    {id:'fixed23-kitayoko-peak',type:'peak',name:'北横岳',lat:36.087500,lon:138.320000,elevation:2480,source:'固定候補'},
    {id:'fixed23-kitayoko-ropeway',type:'trailhead',name:'北八ヶ岳ロープウェイ山頂駅',lat:36.075500,lon:138.337000,elevation:2237,source:'固定候補'},
    {id:'fixed23-kitayoko-hut',type:'hut',name:'北横岳ヒュッテ',lat:36.083000,lon:138.322000,elevation:2400,source:'固定候補'}
  ]
};
for(const [mountain,points] of Object.entries(FIXED_YATSUGATAKE_CHUSHIN_V11223)){
  BUILTIN_ROUTE_CATALOG[mountain]=[...(BUILTIN_ROUTE_CATALOG[mountain]||[]),...points];
}



// V1.12.24: 越後・尾瀬15座を一括固定強化。
// 山頂は国土地理院「日本の主な山岳」を基準にし、公開座標を確認できた主要登山口・山小屋を固定候補化。
const FIXED_ECHIGO_OZE_V11224 = {
  '杁差岳': [
    {id:'fixed24-eburi-peak',type:'peak',name:'杁差岳',lat:37.942500,lon:139.608889,elevation:1636,source:'固定候補'},
    {id:'fixed24-eburi-okutainai',type:'trailhead',name:'奥胎内ヒュッテ（足ノ松尾根ルート起点）',lat:37.924889,lon:139.539778,elevation:345,source:'固定候補'},
    {id:'fixed24-eburi-okutainai-hut',type:'hut',name:'奥胎内ヒュッテ',lat:37.923889,lon:139.539722,elevation:341,source:'固定候補'}
  ],
  '二王子岳': [
    {id:'fixed24-ninoji-peak',type:'peak',name:'二王子岳',lat:37.899722,lon:139.499167,elevation:1420,source:'固定候補'},
    {id:'fixed24-ninoji-jinja',type:'trailhead',name:'二王子神社登山口',lat:37.904278,lon:139.450778,elevation:297,source:'固定候補'}
  ],
  '粟ヶ岳': [
    {id:'fixed24-awa-peak',type:'peak',name:'粟ヶ岳',lat:37.555278,lon:139.188611,elevation:1293,source:'固定候補'},
    {id:'fixed24-awa-chuo',type:'trailhead',name:'粟ヶ岳中央登山口（県民休養地）',lat:37.579694,lon:139.145583,elevation:157,source:'固定候補'}
  ],
  '御神楽岳': [
    {id:'fixed24-mikagura-peak',type:'peak',name:'御神楽岳',lat:37.521944,lon:139.425833,elevation:1386,source:'固定候補'},
    {id:'fixed24-mikagura-muroya',type:'trailhead',name:'室谷登山口',lat:37.545861,lon:139.392833,elevation:302,source:'固定候補'}
  ],
  '守門岳': [
    {id:'fixed24-sumon-peak',type:'peak',name:'守門岳',lat:37.397778,lon:139.136667,elevation:1537,source:'固定候補'},
    {id:'fixed24-sumon-hokkure',type:'trailhead',name:'保久礼登山口',lat:37.410139,lon:139.095361,elevation:781,source:'固定候補'},
    {id:'fixed24-sumon-nibun',type:'trailhead',name:'二分登山口',lat:37.403806,lon:139.091944,elevation:586,source:'固定候補'}
  ],
  '浅草岳': [
    {id:'fixed24-asakusa-peak',type:'peak',name:'浅草岳',lat:37.343611,lon:139.233611,elevation:1585,source:'固定候補'},
    {id:'fixed24-asakusa-nezumochi',type:'trailhead',name:'ネズモチ平登山口駐車場',lat:37.359528,lon:139.216944,elevation:873,source:'固定候補'}
  ],
  '平ヶ岳': [
    {id:'fixed24-hiragatake-peak',type:'peak',name:'平ヶ岳',lat:37.001944,lon:139.170833,elevation:2141,source:'固定候補'},
    {id:'fixed24-hiragatake-takanosu',type:'trailhead',name:'鷹ノ巣・平ヶ岳登山口',lat:37.037210,lon:139.252784,elevation:840,source:'固定候補'}
  ],
  '越後駒ヶ岳': [
    {id:'fixed24-echigokoma-peak',type:'peak',name:'越後駒ヶ岳',lat:37.123611,lon:139.075278,elevation:2003,source:'固定候補'},
    {id:'fixed24-echigokoma-shiori',type:'trailhead',name:'枝折峠',lat:37.152232,lon:139.129661,elevation:1070,source:'固定候補'}
  ],
  '中ノ岳': [
    {id:'fixed24-nakano-peak',type:'peak',name:'中ノ岳',lat:37.085278,lon:139.077500,elevation:2085,source:'固定候補'},
    {id:'fixed24-nakano-jujikkyo',type:'trailhead',name:'十字峡登山センター',lat:37.058456,lon:139.032542,elevation:445,source:'固定候補'}
  ],
  '八海山': [
    {id:'fixed24-hakkai-peak',type:'peak',name:'八海山（入道岳）',lat:37.103889,lon:139.024722,elevation:1778,source:'固定候補'},
    {id:'fixed24-hakkai-ropeway',type:'trailhead',name:'八海山スキー場・ロープウェー山麓駅',lat:37.107276,lon:138.978704,elevation:376,source:'固定候補'},
    {id:'fixed24-hakkai-senbon',type:'hut',name:'八海山千本檜小屋',lat:37.112222,lon:139.015000,elevation:1656,source:'固定候補'}
  ],
  '苗場山': [
    {id:'fixed24-naeba-peak',type:'peak',name:'苗場山',lat:36.845833,lon:138.690278,elevation:2145,source:'固定候補'},
    {id:'fixed24-naeba-koakazawa',type:'trailhead',name:'小赤沢三合目登山口',lat:36.853611,lon:138.662222,elevation:1300,source:'固定候補'},
    {id:'fixed24-naeba-hutte',type:'hut',name:'苗場山頂ヒュッテ',lat:36.845683,lon:138.690000,elevation:2140,source:'固定候補'}
  ],
  '佐武流山': [
    {id:'fixed24-saburyu-peak',type:'peak',name:'佐武流山',lat:36.772222,lon:138.670556,elevation:2192,source:'固定候補'},
    {id:'fixed24-saburyu-doronoki',type:'trailhead',name:'ドロノ木平登山口',lat:36.817218,lon:138.632685,elevation:1060,source:'固定候補'}
  ],
  '鳥甲山': [
    {id:'fixed24-torikabuto-peak',type:'peak',name:'鳥甲山',lat:36.839167,lon:138.583889,elevation:2038,source:'固定候補'},
    {id:'fixed24-torikabuto-mujina',type:'trailhead',name:'ムジナ平登山口',lat:36.821784,lon:138.613771,elevation:1020,source:'固定候補'},
    {id:'fixed24-torikabuto-yashiki',type:'trailhead',name:'屋敷口',lat:36.850775,lon:138.617554,elevation:860,source:'固定候補'}
  ],
  '金北山': [
    {id:'fixed24-kinpoku-peak',type:'peak',name:'金北山',lat:38.103889,lon:138.349722,elevation:1172,source:'固定候補'},
    {id:'fixed24-kinpoku-hakuundai',type:'trailhead',name:'白雲台交流センター',lat:38.080833,lon:138.333333,elevation:850,source:'固定候補'}
  ],
  '米山': [
    {id:'fixed24-yoneyama-peak',type:'peak',name:'米山',lat:37.289444,lon:138.483889,elevation:993,source:'固定候補'},
    {id:'fixed24-yoneyama-ohira',type:'trailhead',name:'大平登山口',lat:37.298389,lon:138.460500,elevation:234,source:'固定候補'},
    {id:'fixed24-yoneyama-hut',type:'hut',name:'米山山頂避難小屋',lat:37.288889,lon:138.483611,elevation:989,source:'固定候補'}
  ]
};
for(const [mountain,points] of Object.entries(FIXED_ECHIGO_OZE_V11224)){
  BUILTIN_ROUTE_CATALOG[mountain]=[...(BUILTIN_ROUTE_CATALOG[mountain]||[]),...points];
}

// V1.12.25: 北海道26座＋東北38座を一括固定強化。
// 山頂は国土地理院2026-03-31版を主基準、二岐山は産総研地質調査総合センター公開位置を使用。
const FIXED_HOKKAIDO_TOHOKU_V11225 = {
  '利尻山': [
    {id:'fixed25-00-peak',type:'peak',name:'利尻山',lat:45.178536,lon:141.242036,elevation:1721,source:'固定候補'}
  ],
  '羅臼岳': [
    {id:'fixed25-01-peak',type:'peak',name:'羅臼岳',lat:44.075917,lon:145.122246,elevation:1660,source:'固定候補'}
  ],
  '斜里岳': [
    {id:'fixed25-02-peak',type:'peak',name:'斜里岳',lat:43.765743,lon:144.717659,elevation:1547,source:'固定候補'}
  ],
  '雄阿寒岳': [
    {id:'fixed25-03-peak',type:'peak',name:'雄阿寒岳',lat:43.454056,lon:144.164617,elevation:1370,source:'固定候補'}
  ],
  '天塩岳': [
    {id:'fixed25-04-peak',type:'peak',name:'天塩岳',lat:43.964372,lon:142.887986,elevation:1557,source:'固定候補'}
  ],
  'ニセイカウシュッペ山': [
    {id:'fixed25-05-peak',type:'peak',name:'ニセイカウシュッペ山',lat:43.779967,lon:142.985346,elevation:1883,source:'固定候補'},
    {id:'fixed25-05-th1',type:'trailhead',name:'ニセイカウシュッペ山登山口（古川林道・西尾根）',lat:43.796944,lon:142.949722,elevation:1126,source:'固定候補'}
  ],
  '大雪山（旭岳）': [
    {id:'fixed25-06-peak',type:'peak',name:'大雪山（旭岳）',lat:43.663582,lon:142.854138,elevation:2291,source:'固定候補'}
  ],
  '石狩岳': [
    {id:'fixed25-07-peak',type:'peak',name:'石狩岳',lat:43.546573,lon:143.022311,elevation:1967,source:'固定候補'},
    {id:'fixed25-07-th1',type:'trailhead',name:'シュナイダーコース登山口（音更川二十一ノ沢出合）',lat:43.528972,lon:143.063639,elevation:801,source:'固定候補'}
  ],
  'トムラウシ山': [
    {id:'fixed25-08-peak',type:'peak',name:'トムラウシ山',lat:43.527111,lon:142.848790,elevation:2141,source:'固定候補'}
  ],
  'オプタテシケ山': [
    {id:'fixed25-09-peak',type:'peak',name:'オプタテシケ山',lat:43.470244,lon:142.751538,elevation:2012,source:'固定候補'},
    {id:'fixed25-09-th1',type:'trailhead',name:'美瑛富士登山口',lat:43.470000,lon:142.673056,elevation:933,source:'固定候補'},
    {id:'fixed25-09-hut1',type:'hut',name:'美瑛富士避難小屋',lat:43.454444,lon:142.721944,elevation:1627,source:'固定候補'}
  ],
  '十勝岳': [
    {id:'fixed25-10-peak',type:'peak',name:'十勝岳',lat:43.417859,lon:142.686283,elevation:2077,source:'固定候補'}
  ],
  'ニペソツ山': [
    {id:'fixed25-11-peak',type:'peak',name:'ニペソツ山',lat:43.455985,lon:143.032245,elevation:2013,source:'固定候補'},
    {id:'fixed25-11-th1',type:'trailhead',name:'幌加温泉コース登山口',lat:43.471667,lon:143.129167,source:'固定候補'}
  ],
  '幌尻岳': [
    {id:'fixed25-12-peak',type:'peak',name:'幌尻岳',lat:42.719435,lon:142.682894,elevation:2052,source:'固定候補'}
  ],
  'カムイエクウチカウシ山': [
    {id:'fixed25-13-peak',type:'peak',name:'カムイエクウチカウシ山',lat:42.625112,lon:142.766406,elevation:1979,source:'固定候補'},
    {id:'fixed25-13-th1',type:'trailhead',name:'札内川ヒュッテ駐車場',lat:42.594111,lon:142.879611,elevation:500,source:'固定候補'},
    {id:'fixed25-13-hut1',type:'hut',name:'札内川ヒュッテ',lat:42.593889,lon:142.876944,elevation:626,source:'固定候補'}
  ],
  'ペテガリ岳': [
    {id:'fixed25-14-peak',type:'peak',name:'ペテガリ岳',lat:42.499337,lon:142.871019,elevation:1736,source:'固定候補'},
    {id:'fixed25-14-th1',type:'trailhead',name:'神威山荘（ペテガリ岳アプローチ起点）',lat:42.436917,lon:142.856528,elevation:389,source:'固定候補'},
    {id:'fixed25-14-hut1',type:'hut',name:'神威山荘',lat:42.436917,lon:142.856528,elevation:389,source:'固定候補'}
  ],
  '神威岳': [
    {id:'fixed25-15-peak',type:'peak',name:'神威岳',lat:42.428465,lon:142.906866,elevation:1600,source:'固定候補'},
    {id:'fixed25-15-th1',type:'trailhead',name:'神威山荘・神威岳登山口',lat:42.436917,lon:142.856528,elevation:389,source:'固定候補'},
    {id:'fixed25-15-hut1',type:'hut',name:'神威山荘',lat:42.436917,lon:142.856528,elevation:389,source:'固定候補'}
  ],
  '芦別岳': [
    {id:'fixed25-16-peak',type:'peak',name:'芦別岳',lat:43.235730,lon:142.283553,elevation:1726,source:'固定候補'},
    {id:'fixed25-16-th1',type:'trailhead',name:'新道登山口',lat:43.244667,lon:142.343583,elevation:325,source:'固定候補'}
  ],
  '夕張岳': [
    {id:'fixed25-17-peak',type:'peak',name:'夕張岳',lat:43.099691,lon:142.251011,elevation:1668,source:'固定候補'},
    {id:'fixed25-17-th1',type:'trailhead',name:'冷水・馬の背登山口（夕張岳ヒュッテ）',lat:43.109389,lon:142.192972,elevation:586,source:'固定候補'},
    {id:'fixed25-17-hut1',type:'hut',name:'夕張岳ヒュッテ',lat:43.109389,lon:142.192972,elevation:586,source:'固定候補'}
  ],
  '暑寒別岳': [
    {id:'fixed25-18-peak',type:'peak',name:'暑寒別岳',lat:43.715865,lon:141.522949,elevation:1491,source:'固定候補'},
    {id:'fixed25-18-th1',type:'trailhead',name:'暑寒荘・暑寒別岳登山口',lat:43.770833,lon:141.510417,elevation:286,source:'固定候補'},
    {id:'fixed25-18-hut1',type:'hut',name:'暑寒荘',lat:43.770833,lon:141.510417,elevation:286,source:'固定候補'}
  ],
  '余市岳': [
    {id:'fixed25-19-peak',type:'peak',name:'余市岳',lat:43.032728,lon:141.019787,elevation:1488,source:'固定候補'}
  ],
  '樽前山': [
    {id:'fixed25-20-peak',type:'peak',name:'樽前山',lat:42.690539,lon:141.376650,elevation:1041,source:'固定候補'}
  ],
  '後方羊蹄山': [
    {id:'fixed25-21-peak',type:'peak',name:'後方羊蹄山（羊蹄山）',lat:42.826659,lon:140.811488,elevation:1898,source:'固定候補'}
  ],
  'ニセコアンヌプリ': [
    {id:'fixed25-22-peak',type:'peak',name:'ニセコアンヌプリ',lat:42.875018,lon:140.658839,elevation:1308,source:'固定候補'}
  ],
  '狩場山': [
    {id:'fixed25-23-peak',type:'peak',name:'狩場山',lat:42.613353,lon:139.940602,elevation:1520,source:'固定候補'},
    {id:'fixed25-23-th1',type:'trailhead',name:'千走登山口',lat:42.595278,lon:139.956278,elevation:699,source:'固定候補'}
  ],
  '渡島駒ヶ岳': [
    {id:'fixed25-24-peak',type:'peak',name:'渡島駒ヶ岳（剣ヶ峯）',lat:42.063344,lon:140.677287,elevation:1131,source:'固定候補'}
  ],
  '大千軒岳': [
    {id:'fixed25-25-peak',type:'peak',name:'大千軒岳',lat:41.579319,lon:140.160818,elevation:1072,source:'固定候補'},
    {id:'fixed25-25-th1',type:'trailhead',name:'奥二股登山口駐車場',lat:41.563472,lon:140.198972,elevation:234,source:'固定候補'}
  ],
  '八甲田山': [
    {id:'fixed25-26-peak',type:'peak',name:'八甲田山（大岳）',lat:40.658907,lon:140.877249,elevation:1584,source:'固定候補'}
  ],
  '岩木山': [
    {id:'fixed25-27-peak',type:'peak',name:'岩木山',lat:40.655916,lon:140.303075,elevation:1624,source:'固定候補'}
  ],
  '白神岳': [
    {id:'fixed25-28-peak',type:'peak',name:'白神岳',lat:40.507426,lon:140.018230,elevation:1235,source:'固定候補'}
  ],
  '八幡平': [
    {id:'fixed25-29-peak',type:'peak',name:'八幡平',lat:39.957808,lon:140.854094,elevation:1613,source:'固定候補'}
  ],
  '乳頭山（烏帽子岳）': [
    {id:'fixed25-30-peak',type:'peak',name:'乳頭山（烏帽子岳）',lat:39.804889,lon:140.838626,elevation:1478,source:'固定候補'},
    {id:'fixed25-30-th1',type:'trailhead',name:'滝ノ上温泉・乳頭山登山口',lat:39.826667,lon:140.872806,elevation:630,source:'固定候補'}
  ],
  '秋田駒ヶ岳': [
    {id:'fixed25-31-peak',type:'peak',name:'秋田駒ヶ岳（男女岳）',lat:39.761097,lon:140.799381,elevation:1637,source:'固定候補'}
  ],
  '岩手山': [
    {id:'fixed25-32-peak',type:'peak',name:'岩手山',lat:39.852607,lon:141.001018,elevation:2038,source:'固定候補'}
  ],
  '姫神山': [
    {id:'fixed25-33-peak',type:'peak',name:'姫神山',lat:39.844024,lon:141.246896,elevation:1123,source:'固定候補'}
  ],
  '早池峰山': [
    {id:'fixed25-34-peak',type:'peak',name:'早池峰山',lat:39.558445,lon:141.488876,elevation:1917,source:'固定候補'}
  ],
  '五葉山': [
    {id:'fixed25-35-peak',type:'peak',name:'五葉山',lat:39.205453,lon:141.732123,elevation:1351,source:'固定候補'}
  ],
  '和賀岳': [
    {id:'fixed25-36-peak',type:'peak',name:'和賀岳',lat:39.570396,lon:140.754255,elevation:1439,source:'固定候補'},
    {id:'fixed25-36-th1',type:'trailhead',name:'甘露水口・薬師岳登山口駐車場',lat:39.538250,lon:140.714139,elevation:369,source:'固定候補'}
  ],
  '焼石岳': [
    {id:'fixed25-37-peak',type:'peak',name:'焼石岳',lat:39.163672,lon:140.828835,elevation:1547,source:'固定候補'}
  ],
  '栗駒山': [
    {id:'fixed25-38-peak',type:'peak',name:'栗駒山',lat:38.960912,lon:140.788430,elevation:1626,source:'固定候補'}
  ],
  '神室山': [
    {id:'fixed25-39-peak',type:'peak',name:'神室山',lat:38.902253,lon:140.492300,elevation:1365,source:'固定候補'}
  ],
  '森吉山': [
    {id:'fixed25-40-peak',type:'peak',name:'森吉山',lat:39.976753,lon:140.544174,elevation:1454,source:'固定候補'}
  ],
  '太平山': [
    {id:'fixed25-41-peak',type:'peak',name:'太平山',lat:39.796992,lon:140.310685,elevation:1170,source:'固定候補'}
  ],
  '鳥海山': [
    {id:'fixed25-42-peak',type:'peak',name:'鳥海山（新山）',lat:39.099369,lon:140.048885,elevation:2236,source:'固定候補'}
  ],
  '月山': [
    {id:'fixed25-43-peak',type:'peak',name:'月山',lat:38.549136,lon:140.026971,elevation:1984,source:'固定候補'}
  ],
  '摩耶山': [
    {id:'fixed25-44-peak',type:'peak',name:'摩耶山',lat:38.520194,lon:139.727851,elevation:1020,source:'固定候補'},
    {id:'fixed25-44-th1',type:'trailhead',name:'越沢口',lat:38.533472,lon:139.709889,elevation:283,source:'固定候補'}
  ],
  '以東岳': [
    {id:'fixed25-45-peak',type:'peak',name:'以東岳',lat:38.342954,lon:139.849062,elevation:1772,source:'固定候補'}
  ],
  '大朝日岳': [
    {id:'fixed25-46-peak',type:'peak',name:'大朝日岳',lat:38.260533,lon:139.922321,elevation:1870,source:'固定候補'}
  ],
  '祝瓶山': [
    {id:'fixed25-47-peak',type:'peak',name:'祝瓶山',lat:38.197610,lon:139.879609,elevation:1417,source:'固定候補'},
    {id:'fixed25-47-th1',type:'trailhead',name:'祝瓶山荘駐車場・桑住平ルート',lat:38.188694,lon:139.905694,elevation:575,source:'固定候補'}
  ],
  '船形山': [
    {id:'fixed25-48-peak',type:'peak',name:'船形山（御所山）',lat:38.455447,lon:140.619866,elevation:1500,source:'固定候補'}
  ],
  '泉ヶ岳': [
    {id:'fixed25-49-peak',type:'peak',name:'泉ヶ岳',lat:38.411987,lon:140.708761,elevation:1175,source:'固定候補'},
    {id:'fixed25-49-th1',type:'trailhead',name:'泉ヶ岳大駐車場',lat:38.390167,lon:140.722639,elevation:518,source:'固定候補'}
  ],
  '蔵王山（熊野岳）': [
    {id:'fixed25-50-peak',type:'peak',name:'蔵王山（熊野岳）',lat:38.143878,lon:140.439741,elevation:1841,source:'固定候補'}
  ],
  '飯豊山': [
    {id:'fixed25-51-peak',type:'peak',name:'飯豊山',lat:37.854831,lon:139.707110,elevation:2105,source:'固定候補'}
  ],
  '西吾妻山': [
    {id:'fixed25-52-peak',type:'peak',name:'西吾妻山',lat:37.738140,lon:140.140800,elevation:2035,source:'固定候補'}
  ],
  '一切経山': [
    {id:'fixed25-53-peak',type:'peak',name:'一切経山',lat:37.735364,lon:140.244343,elevation:1949,source:'固定候補'}
  ],
  '安達太良山': [
    {id:'fixed25-54-peak',type:'peak',name:'安達太良山',lat:37.621123,lon:140.287891,elevation:1700,source:'固定候補'}
  ],
  '磐梯山': [
    {id:'fixed25-55-peak',type:'peak',name:'磐梯山',lat:37.600975,lon:140.072248,elevation:1816,source:'固定候補'}
  ],
  '二岐山': [
    {id:'fixed25-56-peak',type:'peak',name:'二岐山（男岳）',lat:37.246389,lon:139.967222,elevation:1544,source:'固定候補'},
    {id:'fixed25-56-th1',type:'trailhead',name:'御鍋神社登山口',lat:37.234114,lon:139.970716,elevation:970,source:'固定候補'}
  ],
  '七ヶ岳': [
    {id:'fixed25-57-peak',type:'peak',name:'七ヶ岳',lat:37.124279,lon:139.657482,elevation:1636,source:'固定候補'}
  ],
  '荒海山': [
    {id:'fixed25-58-peak',type:'peak',name:'荒海山（太郎岳）',lat:37.036071,lon:139.643769,elevation:1581,source:'固定候補'},
    {id:'fixed25-58-th1',type:'trailhead',name:'八総鉱山跡・荒海山登山駐車場',lat:37.060556,lon:139.660000,elevation:834,source:'固定候補'}
  ],
  '帝釈山': [
    {id:'fixed25-59-peak',type:'peak',name:'帝釈山',lat:36.969811,lon:139.459994,elevation:2060,source:'固定候補'},
    {id:'fixed25-59-th1',type:'trailhead',name:'馬坂峠',lat:36.963880,lon:139.458759,elevation:1790,source:'固定候補'}
  ],
  '会津駒ヶ岳': [
    {id:'fixed25-60-peak',type:'peak',name:'会津駒ヶ岳',lat:37.047574,lon:139.353543,elevation:2133,source:'固定候補'}
  ],
  '会津朝日岳': [
    {id:'fixed25-61-peak',type:'peak',name:'会津朝日岳',lat:37.221148,lon:139.339661,elevation:1624,source:'固定候補'},
    {id:'fixed25-61-th1',type:'trailhead',name:'赤倉沢登山口',lat:37.246027,lon:139.377242,elevation:550,source:'固定候補'}
  ],
  '燧ヶ岳': [
    {id:'fixed25-62-peak',type:'peak',name:'燧ヶ岳（柴安嵓）',lat:36.955102,lon:139.285334,elevation:2356,source:'固定候補'}
  ],
  '大滝根山': [
    {id:'fixed25-63-peak',type:'peak',name:'大滝根山',lat:37.354899,lon:140.701664,elevation:1192,source:'固定候補'}
  ]
};
for(const [mountain,fixed] of Object.entries(FIXED_HOKKAIDO_TOHOKU_V11225)){
  const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
  const keys=new Set(fixed.map(p=>`${p.type}:${p.name}`));
  BUILTIN_ROUTE_CATALOG[mountain]=[...fixed,...old.filter(p=>!keys.has(`${p.type}:${p.name}`))];
}


// V1.12.26: 中央アルプス・御嶽11座の山頂・主要登山口・確認済み山小屋を固定。
const FIXED_CENTRAL_ALPS_ONTAKE_V11226 = {
  '御嶽山': [
    {id:'fixed26-ontake-peak',type:'peak',name:'御嶽山（剣ヶ峰）',lat:35.892778,lon:137.480278,elevation:3067,source:'固定候補'}
  ],
  '小秀山': [
    {id:'fixed26-kohide-peak',type:'peak',name:'小秀山',lat:35.785556,lon:137.396944,elevation:1982,source:'固定候補'},
    {id:'fixed26-kohide-otome',type:'trailhead',name:'乙女渓谷（小秀山登山口）',lat:35.776924,lon:137.359837,elevation:880,source:'固定候補'}
  ],
  '奥三界岳': [
    {id:'fixed26-okusan-peak',type:'peak',name:'奥三界岳',lat:35.681667,lon:137.507222,elevation:1811,source:'固定候補'},
    {id:'fixed26-okusan-gate',type:'trailhead',name:'川上林道ゲート（夕森渓谷）',lat:35.644965,lon:137.513254,elevation:720,source:'固定候補'},
    {id:'fixed26-okusan-yumori',type:'trailhead',name:'夕森渓谷駐車場',lat:35.642049,lon:137.510173,elevation:680,source:'固定候補'}
  ],
  '経ヶ岳（長野）': [
    {id:'fixed26-kyogatake-peak',type:'peak',name:'経ヶ岳',lat:35.912778,lon:137.862500,elevation:2296,source:'固定候補'},
    {id:'fixed26-kyogatake-gonbee',type:'trailhead',name:'権兵衛峠登山口',lat:35.875306,lon:137.857306,elevation:1545,source:'固定候補'},
    {id:'fixed26-kyogatake-chusenji',type:'trailhead',name:'仲仙寺登山口',lat:35.888220,lon:137.916434,elevation:920,source:'固定候補'}
  ],
  '木曽駒ヶ岳': [
    {id:'fixed26-kisokoma-peak',type:'peak',name:'木曽駒ヶ岳',lat:35.789444,lon:137.804444,elevation:2956,source:'固定候補'}
  ],
  '空木岳': [
    {id:'fixed26-utsugi-peak',type:'peak',name:'空木岳',lat:35.718889,lon:137.817222,elevation:2864,source:'固定候補'},
    {id:'fixed26-utsugi-ikeyama',type:'trailhead',name:'池山口登山口',lat:35.736861,lon:137.878032,elevation:1370,source:'固定候補'},
    {id:'fixed26-utsugi-inagawa',type:'trailhead',name:'伊奈川ダム上登山口',lat:35.695700,lon:137.751314,elevation:1090,source:'固定候補'},
    {id:'fixed26-utsugi-komaho',type:'hut',name:'空木駒峰ヒュッテ',lat:35.719722,lon:137.818333,elevation:2800,source:'固定候補'}
  ],
  '南駒ヶ岳': [
    {id:'fixed26-minamikoma-peak',type:'peak',name:'南駒ヶ岳',lat:35.701389,lon:137.810833,elevation:2841,source:'固定候補'},
    {id:'fixed26-minamikoma-inagawa',type:'trailhead',name:'伊奈川ダム上登山口',lat:35.695700,lon:137.751314,elevation:1090,source:'固定候補'}
  ],
  '越百山': [
    {id:'fixed26-kosumo-peak',type:'peak',name:'越百山',lat:35.679444,lon:137.803333,elevation:2614,source:'固定候補'},
    {id:'fixed26-kosumo-inagawa',type:'trailhead',name:'伊奈川ダム上登山口',lat:35.695700,lon:137.751314,elevation:1090,source:'固定候補'},
    {id:'fixed26-kosumo-goya',type:'hut',name:'越百小屋・越百避難小屋',lat:35.677500,lon:137.793611,elevation:2342,source:'固定候補'}
  ],
  '安平路山': [
    {id:'fixed26-anpeiji-peak',type:'peak',name:'安平路山',lat:35.630556,lon:137.774444,elevation:2363,source:'固定候補'},
    {id:'fixed26-anpeiji-surikogi',type:'trailhead',name:'摺古木自然園入口',lat:35.598439,lon:137.730911,elevation:1770,source:'固定候補'},
    {id:'fixed26-anpeiji-odaira',type:'trailhead',name:'大平宿（林道規制時起点）',lat:35.556528,lon:137.723250,elevation:1139,source:'固定候補'}
  ],
  '南木曽岳': [
    {id:'fixed26-nagiso-peak',type:'peak',name:'南木曽岳',lat:35.592500,lon:137.644167,elevation:1679,source:'固定候補'},
    {id:'fixed26-nagiso-araragi',type:'trailhead',name:'蘭登山口',lat:35.577402,lon:137.640155,elevation:960,source:'固定候補'}
  ],
  '恵那山': [
    {id:'fixed26-ena-peak',type:'peak',name:'恵那山',lat:35.443611,lon:137.597222,elevation:2191,source:'固定候補'},
    {id:'fixed26-ena-hiro',type:'trailhead',name:'広河原登山口・峰越林道ゲート',lat:35.442862,lon:137.630613,elevation:1140,source:'固定候補'},
    {id:'fixed26-ena-misaka',type:'trailhead',name:'神坂峠登山口',lat:35.472357,lon:137.632380,elevation:1565,source:'固定候補'}
  ]
};
for(const [mountain,fixed] of Object.entries(FIXED_CENTRAL_ALPS_ONTAKE_V11226)){
  const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
  const keys=new Set(fixed.map(p=>`${p.type}:${p.name}`));
  BUILTIN_ROUTE_CATALOG[mountain]=[...fixed,...old.filter(p=>!keys.has(`${p.type}:${p.name}`))];
}


// V1.12.27: 南アルプス22座の山頂を国土地理院値へ統一し、未固定7座の代表登山口を公開座標で固定。
Object.assign(MOUNTAIN_PRESETS, {
  '甲斐駒ヶ岳': {latitude:35.758056, longitude:138.236667},
  '鋸岳': {latitude:35.778889, longitude:138.210000},
  '仙丈ヶ岳': {latitude:35.720000, longitude:138.183611},
  'アサヨ峰': {latitude:35.731667, longitude:138.241389},
  '地蔵ヶ岳': {latitude:35.712222, longitude:138.298611},
  '北岳': {latitude:35.674444, longitude:138.238889},
  '間ノ岳': {latitude:35.646111, longitude:138.228333},
  '農鳥岳': {latitude:35.621111, longitude:138.236944},
  '塩見岳': {latitude:35.573889, longitude:138.183056},
  '荒川岳': {latitude:35.500833, longitude:138.182500},
  '赤石岳': {latitude:35.461111, longitude:138.157222},
  '聖岳': {latitude:35.422778, longitude:138.139722},
  '上河内岳': {latitude:35.389722, longitude:138.152778},
  '茶臼岳': {latitude:35.369167, longitude:138.140556},
  '光岳': {latitude:35.338056, longitude:138.083889},
  '池口岳': {latitude:35.330278, longitude:138.038333},
  '奥茶臼山': {latitude:35.485000, longitude:138.069167},
  '大無間山': {latitude:35.256111, longitude:138.161667},
  '黒法師岳': {latitude:35.196111, longitude:138.029444},
  '笊ヶ岳': {latitude:35.424167, longitude:138.259444},
  '高塚山': {latitude:35.115556, longitude:138.003611},
  '熊伏山': {latitude:35.263333, longitude:137.895000}
});

Object.assign(BUILTIN_ROUTE_CATALOG, {
  '池口岳': [
    {id:'fixed27-sa-0-th',type:'trailhead',name:'池口林道口・池口岳登山口',lat:35.334726,lon:137.966669,elevation:1060,source:'固定候補'},
    {id:'fixed27-sa-0-peak',type:'peak',name:'池口岳',lat:35.330278,lon:138.038333,elevation:2392,source:'固定候補'}
  ],
  '奥茶臼山': [
    {id:'fixed27-sa-1-th',type:'trailhead',name:'しらびそ峠・奥茶臼山登山口',lat:35.437991,lon:138.030336,elevation:1833,source:'固定候補'},
    {id:'fixed27-sa-1-peak',type:'peak',name:'奥茶臼山',lat:35.485000,lon:138.069167,elevation:2474,source:'固定候補'}
  ],
  '大無間山': [
    {id:'fixed27-sa-2-th',type:'trailhead',name:'田代・大無間山登山口',lat:35.257005,lon:138.234120,elevation:660,source:'固定候補'},
    {id:'fixed27-sa-2-peak',type:'peak',name:'大無間山',lat:35.256111,lon:138.161667,elevation:2330,source:'固定候補'}
  ],
  '黒法師岳': [
    {id:'fixed27-sa-3-th',type:'trailhead',name:'戸中山林道ゲート',lat:35.216648,lon:137.968967,elevation:610,source:'固定候補'},
    {id:'fixed27-sa-3-peak',type:'peak',name:'黒法師岳',lat:35.196111,lon:138.029444,elevation:2068,source:'固定候補'}
  ],
  '笊ヶ岳': [
    {id:'fixed27-sa-4-th',type:'trailhead',name:'老平・笊ヶ岳登山口',lat:35.404690,lon:138.323843,elevation:490,source:'固定候補'},
    {id:'fixed27-sa-4-peak',type:'peak',name:'笊ヶ岳',lat:35.424167,lon:138.259444,elevation:2629,source:'固定候補'}
  ],
  '高塚山': [
    {id:'fixed27-sa-5-th',type:'trailhead',name:'山犬段・高塚山登山口',lat:35.133066,lon:138.043377,elevation:1404,source:'固定候補'},
    {id:'fixed27-sa-5-peak',type:'peak',name:'高塚山',lat:35.115556,lon:138.003611,elevation:1621,source:'固定候補'}
  ],
  '熊伏山': [
    {id:'fixed27-sa-6-th',type:'trailhead',name:'青崩峠入口・熊伏山登山口',lat:35.250169,lon:137.908928,elevation:980,source:'固定候補'},
    {id:'fixed27-sa-6-peak',type:'peak',name:'熊伏山',lat:35.263333,lon:137.895000,elevation:1654,source:'固定候補'}
  ]
});

Object.assign(BUILTIN_ROUTE_CATALOG, {
  '甲斐駒ヶ岳': [
    ...(BUILTIN_ROUTE_CATALOG['甲斐駒ヶ岳'] || []),
    {id:'fixed27-sa-p0',type:'peak',name:'甲斐駒ヶ岳',lat:35.758056,lon:138.236667,elevation:2967,source:'固定候補'}
  ],
  '鋸岳': [
    ...(BUILTIN_ROUTE_CATALOG['鋸岳'] || []),
    {id:'fixed27-sa-p1',type:'peak',name:'鋸岳',lat:35.778889,lon:138.210000,elevation:2685,source:'固定候補'}
  ],
  '仙丈ヶ岳': [
    ...(BUILTIN_ROUTE_CATALOG['仙丈ヶ岳'] || []),
    {id:'fixed27-sa-p2',type:'peak',name:'仙丈ヶ岳',lat:35.720000,lon:138.183611,elevation:3033,source:'固定候補'}
  ],
  'アサヨ峰': [
    ...(BUILTIN_ROUTE_CATALOG['アサヨ峰'] || []),
    {id:'fixed27-sa-p3',type:'peak',name:'アサヨ峰',lat:35.731667,lon:138.241389,elevation:2799,source:'固定候補'}
  ],
  '地蔵ヶ岳': [
    ...(BUILTIN_ROUTE_CATALOG['地蔵ヶ岳'] || []),
    {id:'fixed27-sa-p4',type:'peak',name:'地蔵ヶ岳',lat:35.712222,lon:138.298611,elevation:2764,source:'固定候補'}
  ],
  '北岳': [
    ...(BUILTIN_ROUTE_CATALOG['北岳'] || []),
    {id:'fixed27-sa-p5',type:'peak',name:'北岳',lat:35.674444,lon:138.238889,elevation:3193,source:'固定候補'}
  ],
  '間ノ岳': [
    ...(BUILTIN_ROUTE_CATALOG['間ノ岳'] || []),
    {id:'fixed27-sa-p6',type:'peak',name:'間ノ岳',lat:35.646111,lon:138.228333,elevation:3190,source:'固定候補'}
  ],
  '農鳥岳': [
    ...(BUILTIN_ROUTE_CATALOG['農鳥岳'] || []),
    {id:'fixed27-sa-p7',type:'peak',name:'農鳥岳',lat:35.621111,lon:138.236944,elevation:3026,source:'固定候補'}
  ],
  '塩見岳': [
    ...(BUILTIN_ROUTE_CATALOG['塩見岳'] || []),
    {id:'fixed27-sa-p8',type:'peak',name:'塩見岳',lat:35.573889,lon:138.183056,elevation:3047,source:'固定候補'}
  ],
  '荒川岳': [
    ...(BUILTIN_ROUTE_CATALOG['荒川岳'] || []),
    {id:'fixed27-sa-p9',type:'peak',name:'荒川岳',lat:35.500833,lon:138.182500,elevation:3141,source:'固定候補'}
  ],
  '赤石岳': [
    ...(BUILTIN_ROUTE_CATALOG['赤石岳'] || []),
    {id:'fixed27-sa-p10',type:'peak',name:'赤石岳',lat:35.461111,lon:138.157222,elevation:3121,source:'固定候補'}
  ],
  '聖岳': [
    ...(BUILTIN_ROUTE_CATALOG['聖岳'] || []),
    {id:'fixed27-sa-p11',type:'peak',name:'聖岳',lat:35.422778,lon:138.139722,elevation:3013,source:'固定候補'}
  ],
  '上河内岳': [
    ...(BUILTIN_ROUTE_CATALOG['上河内岳'] || []),
    {id:'fixed27-sa-p12',type:'peak',name:'上河内岳',lat:35.389722,lon:138.152778,elevation:2803,source:'固定候補'}
  ],
  '茶臼岳': [
    ...(BUILTIN_ROUTE_CATALOG['茶臼岳'] || []),
    {id:'fixed27-sa-p13',type:'peak',name:'茶臼岳',lat:35.369167,lon:138.140556,elevation:2604,source:'固定候補'}
  ],
  '光岳': [
    ...(BUILTIN_ROUTE_CATALOG['光岳'] || []),
    {id:'fixed27-sa-p14',type:'peak',name:'光岳',lat:35.338056,lon:138.083889,elevation:2592,source:'固定候補'}
  ]
});

// V1.12.28: 北アルプス34座＋縦走主要ピーク5座の山頂を国土地理院2026-03-31版へ統一。
// 未固定だった毛勝山・鍬崎山・鉢盛山の代表登山口も公開座標で固定。
const V1228_NORTHERN_ALPS_PEAKS = {
  '朝日岳（新潟・富山）':{latitude:36.826738,longitude:137.729884,elevation:2418},
  '雪倉岳':{latitude:36.794644,longitude:137.754036,elevation:2611},
  '白馬岳':{latitude:36.758510,longitude:137.758555,elevation:2932},
  '唐松岳':{latitude:36.687234,longitude:137.754685,elevation:2696},
  '五竜岳':{latitude:36.658407,longitude:137.752691,elevation:2814},
  '鹿島槍ヶ岳':{latitude:36.624553,longitude:137.747058,elevation:2889},
  '爺ヶ岳':{latitude:36.588301,longitude:137.750922,elevation:2670},
  '針ノ木岳':{latitude:36.538077,longitude:137.684427,elevation:2821},
  '蓮華岳':{latitude:36.535747,longitude:137.710543,elevation:2799},
  '毛勝山':{latitude:36.701111,longitude:137.590844,elevation:2414},
  '剱岳':{latitude:36.623248,longitude:137.616878,elevation:2999},
  '立山':{latitude:36.575959,longitude:137.619808,elevation:3015},
  '奥大日岳':{latitude:36.598373,longitude:137.580978,elevation:2611},
  '鍬崎山':{latitude:36.539915,longitude:137.478028,elevation:2090},
  '薬師岳':{latitude:36.468841,longitude:137.544800,elevation:2926},
  '黒部五郎岳':{latitude:36.392550,longitude:137.539948,elevation:2840},
  '烏帽子岳':{latitude:36.479510,longitude:137.650918,elevation:2628},
  '野口五郎岳':{latitude:36.432683,longitude:137.637903,elevation:2924},
  '水晶岳（黒岳）':{latitude:36.426363,longitude:137.602779,elevation:2986},
  '鷲羽岳':{latitude:36.402996,longitude:137.605250,elevation:2924},
  '三俣蓮華岳':{latitude:36.389989,longitude:137.587734,elevation:2841},
  '赤牛岳':{latitude:36.461590,longitude:137.603289,elevation:2864},
  '笠ヶ岳（岐阜）':{latitude:36.315477,longitude:137.550401,elevation:2897},
  '餓鬼岳':{latitude:36.447226,longitude:137.736029,elevation:2647},
  '燕岳':{latitude:36.406817,longitude:137.712756,elevation:2763},
  '有明山':{latitude:36.391087,longitude:137.770678,elevation:2268},
  '大天井岳':{latitude:36.364989,longitude:137.701124,elevation:2922},
  '常念岳':{latitude:36.325524,longitude:137.727592,elevation:2857},
  '槍ヶ岳':{latitude:36.342024,longitude:137.647643,elevation:3180},
  '奥穂高岳':{latitude:36.289226,longitude:137.647988,elevation:3190},
  '焼岳':{latitude:36.226864,longitude:137.587067,elevation:2455},
  '霞沢岳':{latitude:36.221205,longitude:137.640601,elevation:2646},
  '鉢盛山':{latitude:36.086649,longitude:137.754849,elevation:2447},
  '乗鞍岳':{latitude:36.106487,longitude:137.553634,elevation:3026},
  '蝶ヶ岳':{latitude:36.287421,longitude:137.726084,elevation:2677},
  '西穂高岳':{latitude:36.278994,longitude:137.629062,elevation:2909},
  '南岳':{latitude:36.319012,longitude:137.650732,elevation:3033},
  '北穂高岳':{latitude:36.302540,longitude:137.652029,elevation:3106},
  '前穂高岳':{latitude:36.281979,longitude:137.660574,elevation:3090},
};
Object.assign(MOUNTAIN_PRESETS, Object.fromEntries(Object.entries(V1228_NORTHERN_ALPS_PEAKS).map(([n,p])=>[n,{latitude:p.latitude,longitude:p.longitude}])));
for (const [mountain,p] of Object.entries(V1228_NORTHERN_ALPS_PEAKS)) {
  const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
  const fixedPeak={id:`fixed28-north-peak-${mountain}`,type:'peak',name:mountain==='立山'?'立山（大汝山）':mountain,lat:p.latitude,lon:p.longitude,elevation:p.elevation,source:'固定候補'};
  BUILTIN_ROUTE_CATALOG[mountain]=[fixedPeak,...old.filter(x=>x.type!=='peak'||x.name!==fixedPeak.name)];
}
const V1228_NORTHERN_ALPS_ACCESS = {
  '毛勝山':[
    {id:'fixed28-kekachi-katakai',type:'trailhead',name:'片貝登山口（東又第五発電所登山口）',lat:36.731056,lon:137.552306,elevation:710,source:'固定候補'}
  ],
  '鍬崎山':[
    {id:'fixed28-kuwasaki-awasuno',type:'trailhead',name:'あわすのスキー場・鍬崎山登山口',lat:36.576278,lon:137.439917,elevation:601,source:'固定候補'}
  ],
  '鉢盛山':[
    {id:'fixed28-hachimori-shindo',type:'trailhead',name:'鉢盛坂新道口',lat:36.086470,lon:137.772764,elevation:1740,source:'固定候補'}
  ],
  '餓鬼岳':[
    {id:'fixed28-gaki-hut',type:'hut',name:'餓鬼岳小屋',lat:36.399167,lon:137.645000,elevation:2605,source:'固定候補'}
  ],
  '燕岳':[
    {id:'fixed28-tsubakuro-enzanso',type:'hut',name:'燕山荘',lat:36.399444,lon:137.715000,elevation:2704,source:'固定候補'}
  ]
};
for (const [mountain,pts] of Object.entries(V1228_NORTHERN_ALPS_ACCESS)) {
  const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
  const keys=new Set(pts.map(x=>`${x.type}:${x.name}`));
  BUILTIN_ROUTE_CATALOG[mountain]=[...pts,...old.filter(x=>!keys.has(`${x.type}:${x.name}`))];
}

let pointSeq=0;
const sessionId=(crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).slice(2));

document.addEventListener('DOMContentLoaded',init);


const MOUNTAIN_UI_AREAS = [
  ['hokkaido','北海道'],['tohoku','東北'],['echigo_oze','越後・尾瀬'],['kanto_joshinetsu','関東・上信越'],
  ['yatsugatake_chushin','八ヶ岳・中信'],['hokushin_kubiki','北信・頸城'],['northern_alps','北アルプス'],
  ['central_alps_ontake','中央アルプス・御嶽'],['okuchichibu_fuji','奥秩父・丹沢・富士'],['southern_alps','南アルプス'],
  ['hokuriku_gifu','北陸・岐阜'],['kinki','近畿'],['chugoku','中国'],['shikoku','四国'],['kyushu','九州']
];
const EXTRA_MOUNTAIN_UI_AREA = {
  '蝶ヶ岳':'northern_alps','西穂高岳':'northern_alps','南岳':'northern_alps','北穂高岳':'northern_alps','前穂高岳':'northern_alps',
  '赤岳':'yatsugatake_chushin','横岳（八ヶ岳）':'yatsugatake_chushin','硫黄岳（八ヶ岳）':'yatsugatake_chushin','阿弥陀岳':'yatsugatake_chushin','権現岳':'yatsugatake_chushin','編笠山':'yatsugatake_chushin','北横岳':'yatsugatake_chushin',
  '鳳凰山':'southern_alps','御嶽山':'central_alps_ontake','宮之浦岳':'kyushu','大山':'chugoku'
};
function mountainUiArea(name){
  if(EXTRA_MOUNTAIN_UI_AREA[name])return EXTRA_MOUNTAIN_UI_AREA[name];
  const i=JAPAN_300_MOUNTAINS.indexOf(name);
  if(i<0)return 'northern_alps'; // 現在の追加ピークは主に北アルプス
  if(i<=25)return 'hokkaido'; if(i<=63)return 'tohoku'; if(i<=78)return 'echigo_oze';
  if(i<=110)return 'kanto_joshinetsu'; if(i<=117)return 'yatsugatake_chushin'; if(i<=127)return 'hokushin_kubiki';
  if(i<=161)return 'northern_alps'; if(i<=172)return 'central_alps_ontake'; if(i<=199)return 'okuchichibu_fuji';
  if(i<=221)return 'southern_alps'; if(i<=240)return 'hokuriku_gifu'; if(i<=260)return 'kinki';
  if(i<=268)return 'chugoku'; if(i<=277)return 'shikoku'; return 'kyushu';
}

let deferredInstallPrompt=null;
function isStandaloneApp(){
  return window.matchMedia?.('(display-mode: standalone)')?.matches || window.navigator.standalone===true;
}
function isMobileDevice(){return window.matchMedia?.('(max-width: 900px)')?.matches;}
function isIosDevice(){return /iphone|ipad|ipod/i.test(navigator.userAgent||'');}
function openInstallGuide(){
  const guide=$('installGuide');if(!guide)return;
  const ios=$('installGuideIos'),generic=$('installGuideGeneric');
  if(ios)ios.classList.toggle('hidden',!isIosDevice());
  if(generic)generic.classList.toggle('hidden',isIosDevice());
  guide.classList.remove('hidden');
  document.body.classList.add('install-guide-open');
}
function closeInstallGuide(){
  $('installGuide')?.classList.add('hidden');
  document.body.classList.remove('install-guide-open');
}
function setupInstallApp(){
  const btn=$('installAppBtn');if(!btn)return;
  const refresh=()=>btn.classList.toggle('hidden',!isMobileDevice()||isStandaloneApp());
  refresh();
  window.addEventListener('resize',refresh,{passive:true});
  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();deferredInstallPrompt=e;refresh();
  });
  window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;btn.classList.add('hidden');closeInstallGuide();});
  btn.addEventListener('click',async()=>{
    if(isStandaloneApp()){btn.classList.add('hidden');return;}
    if(deferredInstallPrompt){
      const prompt=deferredInstallPrompt;deferredInstallPrompt=null;
      try{await prompt.prompt();await prompt.userChoice;}catch(_){ }
      refresh();return;
    }
    openInstallGuide();
  });
  document.querySelectorAll('[data-install-close]').forEach(el=>el.addEventListener('click',closeInstallGuide));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeInstallGuide();});
}

function init(){
  setupInstallApp();
  const area=$('mountainArea');
  const select=$('mountainPreset');
  const search=$('mountainSearch');
  const list=$('mountainPresetList');
  const existing=Object.keys(MOUNTAIN_PRESETS);
  const extra=existing.filter(n=>!JAPAN_300_MOUNTAINS.includes(n));
  const all=[...JAPAN_300_MOUNTAINS,...extra];
  area.innerHTML=`<option value="">山域を選択してください</option>${MOUNTAIN_UI_AREAS.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}`;
  list.innerHTML=all.map(n=>`<option value="${esc(n)}"></option>`).join('');

  const populateMountainSelect=(areaKey,preserve='')=>{
    const names=areaKey?all.filter(n=>mountainUiArea(n)===areaKey):[];
    select.innerHTML=`<option value="">${areaKey?'':'先に山域を選択してください'}</option>${names.map(n=>`<option value="${esc(n)}">${esc(n)}</option>`).join('')}`;
    select.disabled=!areaKey;
    if(preserve&&names.includes(preserve))select.value=preserve;
    const areaName=MOUNTAIN_UI_AREAS.find(([k])=>k===areaKey)?.[1]||'';
    $('mountainCount').textContent=areaKey?`${areaName}：${names.length}座を表示中 / 山名検索なら全国から直接選択できます`:`全国版：日本三百名山300座＋縦走主要ピーク${extra.length}座 / まず山域を選択`;
  };
  area.value=''; select.value=''; search.value=''; populateMountainSelect('');
  $('loadPoiBtn').addEventListener('click',loadCandidates);
  $('addPointBtn').addEventListener('click',()=>addManualPointRow());
  $('analyzeBtn').addEventListener('click',analyze);

  const resetForMountainChange=()=>{
    candidates=[];
    $('points').innerHTML=''; pointSeq=0;
    const selected=!!select.value.trim();
    $('candidateState').textContent=selected?'「この山のルート候補を読み込む」を押してください':'';
    updateLoadButtonAppearance(false);
    updateForecastHorizon();
    renderRouteMaps();
  };
  area.addEventListener('change',()=>{
    const current=select.value;
    populateMountainSelect(area.value,current);
    search.value=select.value||'';
    resetForMountainChange();
  });
  select.addEventListener('change',()=>{
    search.value=select.value;
    resetForMountainChange();
  });
  const chooseFromSearch=(q,commit=false)=>{
    if(!q){area.value='';populateMountainSelect('');resetForMountainChange();return false;}
    const hit=all.find(n=>n===q)||(commit?all.find(n=>n.includes(q)):null);
    if(!hit)return false;
    const areaKey=mountainUiArea(hit);
    area.value=areaKey;
    populateMountainSelect(areaKey,hit);
    if(commit)search.value=hit;
    resetForMountainChange();
    return true;
  };
  search.addEventListener('input',()=>{
    const q=search.value.trim();
    if(!q){area.value='';populateMountainSelect('');resetForMountainChange();return;}
    chooseFromSearch(q,false);
  });
  search.addEventListener('change',()=>chooseFromSearch(search.value.trim(),true));
  $('candidateState').textContent='';
  updateLoadButtonAppearance(false);
  updateForecastHorizon();
  logEvent('page_view',{success:true});
}

function updateLoadButtonAppearance(loaded){

  const btn=$('loadPoiBtn');
  if(!btn)return;
  const hasMountain=!!$('mountainPreset')?.value?.trim();
  btn.disabled=!hasMountain;
  btn.classList.toggle('primary',hasMountain&&!loaded);
  btn.classList.toggle('secondary',!hasMountain||loaded);
  btn.classList.toggle('route-load-needed',hasMountain&&!loaded);
}

const ROUTE_CACHE_PREFIX='traverse-route-v1111:';
function routeCacheGet(key,maxAgeMs=7*24*60*60*1000){
  try{
    const raw=localStorage.getItem(ROUTE_CACHE_PREFIX+key);
    if(!raw)return null;
    const parsed=JSON.parse(raw);
    if(!parsed||!parsed.savedAt||Date.now()-parsed.savedAt>maxAgeMs){localStorage.removeItem(ROUTE_CACHE_PREFIX+key);return null;}
    return parsed.value;
  }catch(_){return null;}
}
function routeCachePut(key,value){
  try{localStorage.setItem(ROUTE_CACHE_PREFIX+key,JSON.stringify({savedAt:Date.now(),value}));}catch(_){ }
}
function mountainCacheKey(label){return canonicalMountainName(label).replace(/\s+/g,'_');}
function refreshPointCandidateOptions(){
  [...document.querySelectorAll('.point-row')].forEach(row=>{
    const type=row.querySelector('.point-type')?.value;
    const sel=row.querySelector('.point-select');
    if(!type||!sel)return;
    const current=sel.value;
    sel.innerHTML=candidateOptions(type,current);
    if(current&&[...sel.options].some(o=>o.value===current))sel.value=current;
    updateMeta(row);
  });
}
function dedupeCandidateList(base){
  const seen=new Set();
  return base.filter(Boolean).filter(p=>{
    if(!Object.prototype.hasOwnProperty.call(TYPE_LABEL,p.type))return false;
    const lat=Number(p.lat),lon=Number(p.lon);
    const coord=hasResolvedCoord(p)?`${lat.toFixed(4)}|${lon.toFixed(4)}`:`unresolved|${p.name}`;
    const k=`${p.type}|${p.name}|${coord}`;
    if(seen.has(k))return false;seen.add(k);return true;
  });
}
function ensureCenterPeak(list,label,center){
  const peakName=label.replace(/（神奈川）|（鳥取）|（群馬）|（新潟・富山）|（長野）|（岐阜）|（福井）|（栃木）|（奈良）/g,'');
  if(!list.some(p=>p.type==='peak'&&Number.isFinite(Number(p.lat))&&Number.isFinite(Number(p.lon))&&haversineMeters(center.latitude,center.longitude,p.lat,p.lon)<2500)){
    list.unshift({id:'center-peak',type:'peak',name:peakName,lat:center.latitude,lon:center.longitude,elevation:'',distance:0,source:'山頂'});
  }
  return list;
}
const CENTRAL_ALPS_AUTO_ROUTE_V121=[
  ['trailhead','area-cku-senjojiki','登山口'],
  ['peak','area-cku-kisokoma','山頂'],
  ['hut','area-cku-chojo','山小屋・避難小屋'],
  ['hut','area-cku-hoken-sanso','山小屋・避難小屋'],
  ['peak','area-cku-hoken','山頂'],
  ['peak','area-cku-hinokio','山頂'],
  ['hut','area-cku-hinokio-hut','山小屋・避難小屋'],
  ['peak','area-cku-kumazawa','山頂'],
  ['peak','area-cku-higashikawa','山頂'],
  ['hut','area-cku-kisodono','山小屋・避難小屋'],
  ['peak','area-cku-utsugi','山頂'],
  ['hut','area-cku-komaho','山小屋・避難小屋'],
  ['trailhead','area-cku-ikeyama','下山口']
];
function centralAlpsAutoRouteFor(mountain){
  const corridor=['木曽駒ヶ岳','宝剣岳','檜尾岳','熊沢岳','東川岳','空木岳'];
  if(!corridor.includes(mountain))return null;
  const route=[...CENTRAL_ALPS_AUTO_ROUTE_V121];
  return mountain==='空木岳'?route.reverse():route;
}
function renderCandidateRows(label,center,{resetPoints=false}={}){
  candidates=ensureCenterPeak(dedupeCandidateList(candidates),label,center);
  refreshPointCandidateOptions();
  if(resetPoints){
    $('points').innerHTML=''; pointSeq=0;
    const mountain=canonicalMountainName(label);
    const autoRoute=centralAlpsAutoRouteFor(mountain);
    if(autoRoute){
      const available=new Map(candidates.map(p=>[p.id,p]));
      let added=0;
      for(const [type,id,role] of autoRoute){
        if(!available.has(id))continue;
        addPointRow(type,id,role);
        added++;
      }
      if(added){
        updateForecastHorizon();
        renderRouteMaps();
        return;
      }
    }
    const hasTrail=candidates.some(p=>p.type==='trailhead'), hasHut=candidates.some(p=>p.type==='hut');
    if(hasTrail)addPointRow('trailhead','','登山口');
    addPointRow('peak','','山頂');
    if(hasHut)addPointRow('hut','','山小屋・避難小屋');
    if(hasTrail)addPointRow('trailhead','','下山口');
    updateForecastHorizon();
    renderRouteMaps();
  }
}

function localFixedMountainCenter(label){
  const canonical=canonicalMountainName(label);
  const preset=MOUNTAIN_PRESETS[canonical];
  if(preset&&Number.isFinite(Number(preset.latitude))&&Number.isFinite(Number(preset.longitude))){
    return {latitude:Number(preset.latitude),longitude:Number(preset.longitude),source:'preset'};
  }
  const local=[
    ...(BUILTIN_ROUTE_CATALOG[canonical]||[]),
    ...(TRAVERSE_CATALOG[canonical]||[]),
    ...regionalCandidates(canonical),
    ...fixedNameFallbackCandidates(canonical)
  ].filter(p=>hasResolvedCoord(p));
  const peak=local.find(p=>p.type==='peak');
  const fallback=peak||local.find(p=>p.source==='固定候補')||local[0];
  if(!fallback)return null;
  return {latitude:Number(fallback.lat),longitude:Number(fallback.lon),source:peak?'fixed-peak':'fixed-access'};
}

async function resolveMountainCenter(label){
  const canonical=canonicalMountainName(label);
  const localCenter=localFixedMountainCenter(canonical);
  if(localCenter){
    const center={latitude:localCenter.latitude,longitude:localCenter.longitude};
    if(!MOUNTAIN_PRESETS[canonical])MOUNTAIN_PRESETS[canonical]=center;
    return center;
  }
  const cacheKey=`center:${mountainCacheKey(label)}`;
  const cached=routeCacheGet(cacheKey,365*24*60*60*1000);
  if(cached&&Number.isFinite(Number(cached.latitude))&&Number.isFinite(Number(cached.longitude))){
    MOUNTAIN_PRESETS[canonical]=cached;
    return cached;
  }

  // Nominatimで取りこぼす山名があるため、まずOSMのnatural=peakを直接検索。
  const overpassPeak=await resolvePeakByOverpass(label);
  if(overpassPeak){
    MOUNTAIN_PRESETS[canonical]=overpassPeak;
    routeCachePut(cacheKey,overpassPeak);
    return overpassPeak;
  }

  // 表記ゆれ・別名を順にNominatimへ問い合わせる。
  for(const q of mountainSearchVariants(label)){
    const searches=[`${q} 山 日本`,`${q} 日本`,q];
    for(const term of searches){
      try{
        const url=`https://nominatim.openstreetmap.org/search?format=jsonv2&countrycodes=jp&limit=10&addressdetails=1&q=${encodeURIComponent(term)}`;
        const res=await proxyFetch(url);
        if(!res.ok)continue;
        const rows=await res.json();
        const best=(Array.isArray(rows)?rows:[]).find(x=>x.type==='peak'||x.category==='natural'||x.class==='natural')||(Array.isArray(rows)?rows:[])[0];
        if(!best)continue;
        const center={latitude:Number(best.lat),longitude:Number(best.lon)};
        if(!Number.isFinite(center.latitude)||!Number.isFinite(center.longitude))continue;
        MOUNTAIN_PRESETS[canonical]=center;
        routeCachePut(cacheKey,center);
        return center;
      }catch(_){ }
    }
  }
  throw new Error('山頂座標が見つかりませんでした');
}
function overpassPoint(el){
  const lat=Number(el.lat ?? el.center?.lat), lon=Number(el.lon ?? el.center?.lon);
  if(!Number.isFinite(lat)||!Number.isFinite(lon))return null;
  const t=el.tags||{}, name=t.name||t['name:ja'];
  if(!name)return null;
  let type=null;
  if(t.tourism==='alpine_hut'||t.tourism==='wilderness_hut'||t.amenity==='shelter')type='hut';
  else if(t.information==='trailhead')type='trailhead';
  else if(t.natural==='peak')type='peak';
  if(!type)return null;
  const ele=Number(String(t.ele||'').replace(/[^0-9.\-]/g,''));
  return {id:`osm-${el.type}-${el.id}`,type,name,lat,lon,elevation:Number.isFinite(ele)?ele:'',source:'OpenStreetMap'};
}

function dedupeDiscovered(items,lat,lon){
  const seen=new Set();
  return items.filter(Boolean).filter(p=>{
    const k=`${p.type}|${p.name}|${Number(p.lat).toFixed(4)}|${Number(p.lon).toFixed(4)}`;
    if(seen.has(k))return false; seen.add(k); return true;
  }).map(p=>({...p,distance:haversineMeters(lat,lon,p.lat,p.lon)})).sort((a,b)=>a.distance-b.distance);
}
function classifyNamedOsmPoint(el){
  const lat=Number(el.lat ?? el.center?.lat), lon=Number(el.lon ?? el.center?.lon);
  if(!Number.isFinite(lat)||!Number.isFinite(lon))return null;
  const t=el.tags||{}, name=t['name:ja']||t.name;
  if(!name)return null;
  const ele=Number(String(t.ele||'').replace(/[^0-9.\-]/g,''));
  let type=null;
  if(t.tourism==='alpine_hut'||t.tourism==='wilderness_hut'||t.shelter_type==='basic_hut'||/(避難小屋|山小屋|山荘|ヒュッテ|ロッジ|小屋$)/.test(name)) type='hut';
  else if(t.information==='trailhead'||(t.highway==='bus_stop'&&/(登山口|登山道|ロープウェイ|ゴンドラ)/.test(name))||(t.amenity==='parking'&&/(登山|登山口|登山者|ロープウェイ|ゴンドラ)/.test(name))||t.aerialway==='station'||/(登山口|登山道入口|登山道入り口|登山者用駐車場|登山者駐車場|ロープウェイ.*駅|ゴンドラ.*駅)/.test(name)) type='trailhead';
  else if(t.natural==='peak') type='peak';
  if(!type)return null;
  return {id:`osm-${el.type}-${el.id}`,type,name,lat,lon,elevation:Number.isFinite(ele)?ele:'',source:'OpenStreetMap'};
}
async function discoverNearbyCandidates(center,radius=24000){
  const lat=Number(center.latitude), lon=Number(center.longitude);
  const cacheKey=`nearby:${lat.toFixed(4)},${lon.toFixed(4)}:${radius}`;
  const cached=routeCacheGet(cacheKey,7*24*60*60*1000);
  if(Array.isArray(cached))return cached;
  const peakRadius=Math.min(radius,22000);
  const query=`[out:json][timeout:40];(
    nwr(around:${radius},${lat},${lon})["tourism"="alpine_hut"];
    nwr(around:${radius},${lat},${lon})["tourism"="wilderness_hut"];
    nwr(around:${radius},${lat},${lon})["shelter_type"="basic_hut"];
    nwr(around:${radius},${lat},${lon})["amenity"="shelter"]["name"~"避難小屋|山小屋|山荘|ヒュッテ|小屋"];
    nwr(around:${radius},${lat},${lon})["tourism"="chalet"]["name"];
    nwr(around:${radius},${lat},${lon})["information"="trailhead"];
    nwr(around:${radius},${lat},${lon})["name"~"登山口|登山道入口|登山道入り口|登山者用駐車場|登山者駐車場"];
    nwr(around:${radius},${lat},${lon})["highway"="bus_stop"]["name"~"登山口|登山道|ロープウェイ|ゴンドラ"];
    nwr(around:${radius},${lat},${lon})["amenity"="parking"]["name"~"登山|登山口|登山者|ロープウェイ|ゴンドラ"];
    nwr(around:${radius},${lat},${lon})["aerialway"="station"]["name"];
    nwr(around:${peakRadius},${lat},${lon})["natural"="peak"]["name"];
  );out center tags;`;
  try{
    const res=await fetch('/api/overpass',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query})});
    if(!res.ok)return [];
    const data=await res.json();
    const all=dedupeDiscovered((data.elements||[]).map(classifyNamedOsmPoint),lat,lon);
    const trail=all.filter(x=>x.type==='trailhead').slice(0,radius>30000?30:18);
    const huts=all.filter(x=>x.type==='hut').slice(0,24);
    const peaks=all.filter(x=>x.type==='peak').slice(0,18);
    const result=[...trail,...huts,...peaks];
    routeCachePut(cacheKey,result);
    return result;
  }catch(_){return [];}
}

function nominatimTrailheadPoint(row,center,label,idx){
  const lat=Number(row?.lat),lon=Number(row?.lon);
  if(!Number.isFinite(lat)||!Number.isFinite(lon))return null;
  if(haversineMeters(center.latitude,center.longitude,lat,lon)>60000)return null;
  const display=String(row?.display_name||row?.name||'');
  const first=(row?.name||display.split(',')[0]||'').trim();
  if(!first)return null;
  const looksAccess=/(登山口|登山道|登山者|ロープウェイ|ゴンドラ|ケーブル|駐車場|バス停)/.test(display);
  if(!looksAccess)return null;
  return {id:`nominatim-trail-${idx}-${Math.abs(Math.round(lat*100000))}`,type:'trailhead',name:first,lat,lon,elevation:'',source:'OpenStreetMap検索'};
}
async function discoverTrailheadsByName(label,center){
  const cacheKey=`trailname:${mountainCacheKey(label)}`;
  const cached=routeCacheGet(cacheKey,365*24*60*60*1000);
  if(Array.isArray(cached))return cached;
  const queries=[`${label} 登山口 日本`,`${label} 登山道入口 日本`,`${label} ロープウェイ 日本`];
  const rows=[];
  for(const q of queries){
    try{
      const url=`https://nominatim.openstreetmap.org/search?format=jsonv2&countrycodes=jp&limit=8&addressdetails=1&q=${encodeURIComponent(q)}`;
      const res=await proxyFetch(url);
      if(!res.ok)continue;
      const data=await res.json();
      if(Array.isArray(data))rows.push(...data);
    }catch(_){ }
  }
  const result=dedupeDiscovered(rows.map((r,i)=>nominatimTrailheadPoint(r,center,label,i)),center.latitude,center.longitude).filter(x=>x.type==='trailhead').slice(0,12);
  routeCachePut(cacheKey,result);
  return result;
}
function accessNameKey(name,mountain=''){
  let x=String(name||'').normalize('NFKC').replace(/\s+/g,'');
  const m=String(mountain||'').normalize('NFKC').replace(/（.*?）/g,'').replace(/\s+/g,'');
  if(m)x=x.replaceAll(m,'');
  x=x.replace(/（.*?）/g,'').replace(/[・･\/／()（）]/g,'');
  x=x.replace(/登山道入口|登山道入り口|登山口|駐車場|バス停/g,'');
  return x;
}

async function loadCandidates(){
  const label=$('mountainPreset').value.trim();
  if(!label){
    $('candidateState').textContent='';
    updateLoadButtonAppearance(false);
    return;
  }
  const mountain=canonicalMountainName(label);
  const btn=$('loadPoiBtn');
  const before=btn.textContent;
  btn.disabled=true; btn.textContent='基本候補を表示中…';
  try{
    const center=await resolveMountainCenter(label);
    if(!MOUNTAIN_PRESETS[mountain])MOUNTAIN_PRESETS[mountain]=center;

    const embeddedBase=[...(BUILTIN_ROUTE_CATALOG[mountain]||[]),...(TRAVERSE_CATALOG[mountain]||[]),...regionalCandidates(mountain)].filter(p=>Object.prototype.hasOwnProperty.call(TYPE_LABEL,p.type));
    const embeddedNames=new Set(embeddedBase.map(p=>`${p.type}|${accessNameKey(p.name,mountain)}`));
    const fixedNameFallback=fixedNameFallbackCandidates(mountain).filter(p=>!embeddedNames.has(`${p.type}|${accessNameKey(p.name,mountain)}`));
    const staticBase=[...embeddedBase,...fixedNameFallback];
    const fullCacheKey=`full:${mountainCacheKey(mountain)}`;
    const cachedFull=routeCacheGet(fullCacheKey,7*24*60*60*1000);

    if(Array.isArray(cachedFull)&&cachedFull.length){
      candidates=[...staticBase,...cachedFull];
      renderCandidateRows(label,center,{resetPoints:true});
      const trailCount=candidates.filter(p=>p.type==='trailhead').length, hutCount=candidates.filter(p=>p.type==='hut').length, peakCount=candidates.filter(p=>p.type==='peak').length;
      $('candidateState').textContent=`${label}：登山口 ${trailCount} / 山小屋・避難小屋 ${hutCount} / 山頂・周辺ピーク ${peakCount}（キャッシュから高速表示）`;
      updateLoadButtonAppearance(true);
      logEvent('route_candidates_loaded',{success:true,metadata:{mountain:label,candidate_count:candidates.length,cache_hit:true}});
      return;
    }

    // まずローカル固定データだけで即表示。外部検索待ちでUIを止めない。
    candidates=[...staticBase];
    renderCandidateRows(label,center,{resetPoints:true});
    const initialCount=candidates.length;
    $('candidateState').textContent=`${label}：固定候補 ${initialCount}件を即時表示しました。追加候補を探索中…`;
    updateLoadButtonAppearance(true);
    btn.textContent='追加候補を検索中…';

    // 手登録名称の座標解決と24km探索を並行化。
    const [curated,dynamicPrimary]=await Promise.all([
      resolveCuratedCandidates(mountain,center),
      discoverNearbyCandidates(center,24000)
    ]);
    let dynamic=[...dynamicPrimary];
    let trailSearchStage='24km';
    const hasTrailIn=(arr)=>arr.some(p=>p.type==='trailhead');
    if(!hasTrailIn([...staticBase,...curated,...dynamic])){
      const extended=await discoverNearbyCandidates(center,45000);
      dynamic=[...dynamic,...extended];
      trailSearchStage='45km';
    }
    if(!hasTrailIn([...staticBase,...curated,...dynamic])){
      const named=await discoverTrailheadsByName(label,center);
      dynamic=[...dynamic,...named];
      trailSearchStage='山名検索';
    }

    const resolvedNames=new Set(curated.map(p=>`${p.type}|${p.name}`));
    const staticResolved=staticBase.filter(p=>!p.unresolved||!resolvedNames.has(`${p.type}|${p.name}`));
    candidates=[...staticResolved,...curated,...dynamic];
    renderCandidateRows(label,center,{resetPoints:false});
    routeCachePut(fullCacheKey,[...curated,...dynamic]);

    const trailCount=candidates.filter(p=>p.type==='trailhead').length, hutCount=candidates.filter(p=>p.type==='hut').length, peakCount=candidates.filter(p=>p.type==='peak').length;
    const resolvedTrailCount=candidates.filter(p=>p.type==='trailhead'&&hasResolvedCoord(p)).length;
    const trailNote=resolvedTrailCount?`登山口探索 ${trailSearchStage}`:(trailCount?'固定候補あり・一部座標確認中':'登山口候補を検出できませんでした');
    $('candidateState').textContent=`${label}：登山口 ${trailCount} / 山小屋・避難小屋 ${hutCount} / 山頂・周辺ピーク ${peakCount}（追加探索完了 / 固定候補 ${curated.length}件 / ${trailNote}）`;
    if(!trailCount)setStatus(`${label} の登山口候補が見つかりませんでした。`,true);
    else if(!resolvedTrailCount)setStatus(`${label} は代表登山口名を固定候補として表示しています。座標確認が完了した候補を選んでください。`,false);
    updateLoadButtonAppearance(true);
    logEvent('route_candidates_loaded',{success:true,metadata:{mountain:label,candidate_count:candidates.length,dynamic_count:dynamic.length,curated_count:curated.length,cache_hit:false}});
  }catch(e){
    $('candidateState').textContent=`${label}：候補を読み込めませんでした（${e.message||e}）`;
    setStatus(`山頂座標の取得に失敗しました：${e.message||e}`,true);
    updateLoadButtonAppearance(false);
  }finally{
    btn.textContent=before;
    btn.disabled=!$('mountainPreset').value.trim();
  }
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

async function resolveSingleCandidateCoordinate(candidate,mountainLabel){
  if(!candidate||hasResolvedCoord(candidate))return candidate;
  const mountain=canonicalMountainName(mountainLabel||$('mountainPreset')?.value||'');
  let center=null;
  try{center=await resolveMountainCenter(mountain);}catch(_){ }
  const terms=[
    `${candidate.name} ${mountain} 日本`,
    `${candidate.name} 日本`,
    candidate.name
  ];
  let best=null;
  for(const term of terms){
    try{
      const url=`https://nominatim.openstreetmap.org/search?format=jsonv2&countrycodes=jp&limit=8&addressdetails=1&q=${encodeURIComponent(term)}`;
      const res=await proxyFetch(url);
      if(!res.ok)continue;
      const rows=await res.json();
      const found=(Array.isArray(rows)?rows:[]).map(r=>({r,lat:Number(r.lat),lon:Number(r.lon)})).filter(x=>Number.isFinite(x.lat)&&Number.isFinite(x.lon));
      if(center){
        found.sort((a,b)=>haversineMeters(center.latitude,center.longitude,a.lat,a.lon)-haversineMeters(center.latitude,center.longitude,b.lat,b.lon));
        best=found.find(x=>haversineMeters(center.latitude,center.longitude,x.lat,x.lon)<=70000)||null;
      }else best=found[0]||null;
      if(best)break;
    }catch(_){ }
  }
  if(!best)return null;
  candidate.lat=best.lat;
  candidate.lon=best.lon;
  candidate.unresolved=false;
  candidate.source='固定候補（座標取得済み）';
  const cacheKey=`singlecoord:${mountainCacheKey(mountain)}:${candidate.name}`;
  routeCachePut(cacheKey,{lat:best.lat,lon:best.lon});
  return candidate;
}

async function ensureCandidateCoordinateForRow(row,{manual=false}={}){
  const select=row?.querySelector('.point-select');
  const meta=row?.querySelector('.point-meta');
  const p=selectedCandidate(select?.value);
  if(!p||hasResolvedCoord(p)){ updateMeta(row); return !!p; }
  const mountain=$('mountainPreset')?.value?.trim()||'';
  const cacheKey=`singlecoord:${mountainCacheKey(mountain)}:${p.name}`;
  const cached=routeCacheGet(cacheKey,365*24*60*60*1000);
  if(cached&&Number.isFinite(Number(cached.lat))&&Number.isFinite(Number(cached.lon))){
    p.lat=Number(cached.lat); p.lon=Number(cached.lon); p.unresolved=false; p.source='固定候補（キャッシュ）';
    refreshPointCandidateOptions(); updateMeta(row); return true;
  }
  if(meta)meta.innerHTML=`<span class="coord-loading">${esc(p.name)} / 座標を取得中…</span>`;
  const resolved=await resolveSingleCandidateCoordinate(p,mountain);
  if(resolved){
    refreshPointCandidateOptions();
    updateMeta(row);
    setStatus(`${p.name} の座標を取得しました。`);
    renderRouteMaps();
    return true;
  }
  if(meta)meta.innerHTML=`<span>${esc(p.name)} / 固定候補・座標未確定</span><button class="coord-retry-btn" type="button">座標を再取得</button>`;
  const retry=meta?.querySelector('.coord-retry-btn');
  retry?.addEventListener('click',()=>ensureCandidateCoordinateForRow(row,{manual:true}));
  if(manual)setStatus(`${p.name} の座標を取得できませんでした。時間をおいて再試行するか、別の候補を選択してください。`,true);
  renderRouteMaps();
  return false;
}

function candidateOptions(type,selected=''){
  const list=candidates.filter(p=>p.type===type);
  return `<option value="">地点を選択</option>`+list.map(p=>`<option value="${esc(p.id)}" ${p.id===selected?'selected':''}>${esc(p.name)}${p.elevation?` / ${p.elevation}m`:''}</option>`).join('');
}
function addPointRow(type='peak',selected='',roleLabel='',initialDateTime=null){
  pointSeq++;
  const row=document.createElement('div'); row.className='point-row'; row.dataset.id=String(pointSeq); row.dataset.role=roleLabel||'';
  row.innerHTML=`<div class="point-no"></div>
    <label class="point-type-label"><span class="field-caption">種類</span><select class="point-type">${typeOptions(type)}</select></label>
    <label class="point-name-label"><span class="field-caption">地点</span><select class="point-select">${candidateOptions(type,selected)}</select></label>
    <label class="datetime-label date-label"><span class="field-caption">通過日</span><span class="date-control"><input class="point-date" type="date" value="${initialDateTime?.date||todayLocal()}"><button class="date-picker-btn" type="button" title="カレンダーを開く" aria-label="カレンダーを開く">📅</button></span></label>
    <label class="datetime-label time-label"><span class="field-caption">通過時刻</span><input class="point-time" type="time" value="${initialDateTime?.time||'06:00'}"></label>
    <label class="stay-option ${type==='hut'?'':'hidden'}"><span>宿泊</span><span class="stay-toggle"><input class="point-stay" type="checkbox"><b><span class="stay-label-desktop">ここに泊まる</span><span class="stay-label-mobile">泊まる</span></b></span></label>
    <button class="move up" type="button" title="上へ">↑</button><button class="move down" type="button" title="下へ">↓</button><button class="remove" type="button" title="削除">×</button>
    <div class="point-meta">地点を選択してください</div>`;
  $('points').appendChild(row); renumber();
  const typeSel=row.querySelector('.point-type'), pointSel=row.querySelector('.point-select'), stay=row.querySelector('.stay-option');
  typeSel.addEventListener('change',()=>{pointSel.innerHTML=candidateOptions(typeSel.value); stay.classList.toggle('hidden',typeSel.value!=='hut'); if(typeSel.value!=='hut')row.querySelector('.point-stay').checked=false; updateMeta(row);});
  pointSel.addEventListener('change',()=>{updateMeta(row); const p=selectedCandidate(pointSel.value); if(p&&!hasResolvedCoord(p))ensureCandidateCoordinateForRow(row);});
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
      renderRouteMaps();
    });
  });
  row.querySelector('.point-stay').addEventListener('change',()=>{
    syncNextPointInitialTime(row);
    updateForecastHorizon();
    renderRouteMaps();
  });
  row.querySelector('.remove').addEventListener('click',()=>{row.remove();renumber();updateForecastHorizon();renderRouteMaps();});
  row.querySelector('.up').addEventListener('click',()=>{const p=row.previousElementSibling;if(p)row.parentNode.insertBefore(row,p);renumber();renderRouteMaps();});
  row.querySelector('.down').addEventListener('click',()=>{const n=row.nextElementSibling;if(n)row.parentNode.insertBefore(n,row);renumber();renderRouteMaps();});
  updateMeta(row);
  renderRouteMaps();
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
function updateMeta(row){
  const p=selectedCandidate(row.querySelector('.point-select').value);
  const meta=row.querySelector('.point-meta');
  if(!p){meta.textContent='地点を選択してください';renderRouteMaps();return;}
  if(hasResolvedCoord(p)){
    meta.textContent=`${p.name} / ${p.elevation||'標高自動'}m / ${Number(p.lat).toFixed(4)}, ${Number(p.lon).toFixed(4)}`;
    renderRouteMaps();
    return;
  }
  meta.innerHTML=`<span>${esc(p.name)} / 固定候補・座標未確定</span><button class="coord-retry-btn" type="button">座標を再取得</button>`;
  meta.querySelector('.coord-retry-btn')?.addEventListener('click',()=>ensureCandidateCoordinateForRow(row,{manual:true}));
  renderRouteMaps();
}
function collectPoints(){
  return [...$('points').children].map((row,i)=>{
    const p=selectedCandidate(row.querySelector('.point-select').value);
    if(!p) return null; // 最初から表示する4枠は、使わない枠を空欄のままにできる
    const date=row.querySelector('.point-date').value, time=row.querySelector('.point-time').value;
    if(!date||!time) throw new Error(`${p.name} の通過日・通過時刻を入力してください。`);
    if(!hasResolvedCoord(p)) throw new Error(`${p.name} の座標がまだ確定していません。地点欄の「座標を再取得」を押してください。`);
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
    return {point,providerRows:rows,errors,...avg,grade:assessGrade(avg),confidence:(rows.length===1&&rows[0].provider?.kind==='fallback'?'FALLBACK':assessConfidence(rows.map(x=>x.row))),thunder:thunderLevel(avg),hazards:assessHazards(avg)};
  });
}

async function scrollToSummaryResult(){
  const target=$('summaryResult');
  if(!target)return;
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      try{target.scrollIntoView({behavior:'smooth',block:'start'});}catch(_){target.scrollIntoView();}
      setTimeout(()=>{try{window.scrollBy({top:-12,left:0,behavior:'smooth'});}catch(_){window.scrollBy(0,-12);}},180);
    });
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
    renderAll(results,overnight); setStatus(`分析完了：${points.length}地点${stayPoints.length?` / 宿泊 ${stayPoints.length}泊`:''}${overnightWarning}（一括取得）`,false); scrollToSummaryResult();
    logEvent('weather_analysis',{success:true,duration_ms:performance.now()-started,route_points:points.length,metadata:{provider_count:providers.length,manual_datetime:true,batch_weather:true}});
  }catch(e){setStatus(e.message||String(e),true);logEvent('weather_analysis',{success:false,duration_ms:performance.now()-started,route_points:points.length,error_message:e.message||String(e)});}
  finally{$('analyzeBtn').disabled=false;}
}
function analyzeOvernightJson(point,nightNo,j){
  const next=addDays(point.date,1), h=j?.hourly||{}, d=j?.daily||{};
  const sunset=d.sunset?.find(x=>String(x).startsWith(point.date))||d.sunset?.[0]||`${point.date}T18:00`;
  const sunrise=d.sunrise?.find(x=>String(x).startsWith(next))||d.sunrise?.[1]||`${next}T05:00`;
  const allRows=(h.time||[]).map((t,i)=>({time:t,temp:numberOrNaN(h.temperature_2m?.[i]),apparent:numberOrNaN(h.apparent_temperature?.[i]),rh:numberOrNaN(h.relative_humidity_2m?.[i]),dew:numberOrNaN(h.dew_point_2m?.[i]),rain:numberOrNaN(h.precipitation?.[i]),cloud:numberOrNaN(h.cloud_cover?.[i]),lowCloud:numberOrNaN(h.cloud_cover_low?.[i]),midCloud:numberOrNaN(h.cloud_cover_mid?.[i]),highCloud:numberOrNaN(h.cloud_cover_high?.[i]),wind:numberOrNaN(h.wind_speed_10m?.[i]),gust:numberOrNaN(h.wind_gusts_10m?.[i]),visibility:numberOrNaN(h.visibility?.[i])}));
  const startMs=new Date(`${point.date}T${point.time}`).getTime(), endMs=new Date(`${next}T08:00`).getTime();
  const rows=allRows.filter(x=>{const t=new Date(x.time).getTime();return t>=startMs&&t<=endMs;});
  const morningStartMs=new Date(`${next}T00:00`).getTime(), morningEndMs=new Date(`${next}T08:00`).getTime();
  const morningRows=allRows.filter(x=>{const t=new Date(x.time).getTime();return t>=morningStartMs&&t<=morningEndMs;});
  const sunsetMs=new Date(sunset).getTime();
  const eveningRows=allRows.filter(x=>Math.abs(new Date(x.time).getTime()-sunsetMs)<=120*60000);
  const sunsetRow=allRows[nearestTimeIndex(allRows.map(x=>x.time),sunset)]||null, sunriseRow=allRows[nearestTimeIndex(allRows.map(x=>x.time),sunrise)]||null;
  const sunsetView=horizonVisibility(sunsetRow), sunriseView=horizonVisibility(sunriseRow);
  const darkStart=new Date(sunset).getTime()+90*60000, darkEnd=new Date(sunrise).getTime()-90*60000;
  const darkRows=rows.filter(x=>{const t=new Date(x.time).getTime();return t>=darkStart&&t<=darkEnd;}), astroRows=darkRows.length?darkRows:rows;
  const moon=moonInfo(point.date), best=astroRows.slice().sort((a,b)=>milkyScore(b,moon)-milkyScore(a,moon))[0]||null;
  const minTemp=minFinite(rows.map(x=>x.temp)), morningMinTemp=minFinite((morningRows.length?morningRows:rows).map(x=>x.temp)), minApp=minFinite(rows.map(x=>x.apparent)), maxWind=max(rows.map(x=>x.wind)), maxGust=max(rows.map(x=>x.gust)), maxRain=max(rows.map(x=>x.rain)), avgCloud=mean(rows.map(x=>x.cloud)), avgWind=mean(rows.map(x=>x.wind)), maxRh=max(rows.map(x=>x.rh)), minVis=minFinite(rows.map(x=>x.visibility));
  const fogRisk=(maxRh>=97&&avgCloud>=85)||(Number.isFinite(minVis)&&minVis<1000)?'高':(maxRh>=92||avgCloud>=75)?'中':'低';
  const score=best?milkyScore(best,moon):0;
  const dawnTarget=`${next}T05:00`;
  const dawnRow=allRows[nearestTimeIndex(allRows.map(x=>x.time),dawnTarget)]||morningRows[0]||null;
  const dawnVisual=dawnRow?weatherVisual({cloud:dawnRow.cloud,rain:dawnRow.rain,thunder:'LOW'}):{icon:'',label:'--',cls:'partly'};
  return {nightNo,point,sunset,sunrise,sunsetView,sunriseView,minTemp,morningMinTemp,minApp,maxWind,maxGust,maxRain,avgCloud,avgWind,maxRh,minVis,fogRisk,moon,best,score,_astroRows:astroRows,_morningRows:morningRows,_eveningRows:eveningRows,_darkStart:darkStart,_darkEnd:darkEnd,dawn:{time:dawnRow?.time||dawnTarget,temp:dawnRow?.temp,rain:dawnRow?.rain,cloud:dawnRow?.cloud,wind:dawnRow?.wind,label:dawnVisual.label,cls:dawnVisual.cls},milkyLabel:score>=75?'期待大':score>=55?'見える可能性あり':score>=35?'条件次第':'厳しい'};
}
function metNoRows(payload){
  const ts=payload?.properties?.timeseries;
  if(!Array.isArray(ts))return [];
  return ts.map(item=>{
    const d=item?.data?.instant?.details||{}, n1=item?.data?.next_1_hours?.details||{}, n6=item?.data?.next_6_hours?.details||{};
    const temp=numberOrNaN(d.air_temperature), wind=numberOrNaN(d.wind_speed), rh=numberOrNaN(d.relative_humidity);
    let rain=numberOrNaN(n1.precipitation_amount);
    if(!Number.isFinite(rain)){const r6=numberOrNaN(n6.precipitation_amount); rain=Number.isFinite(r6)?r6/6:NaN;}
    const cloud=numberOrNaN(d.cloud_area_fraction),lowCloud=numberOrNaN(d.cloud_area_fraction_low),midCloud=numberOrNaN(d.cloud_area_fraction_medium),highCloud=numberOrNaN(d.cloud_area_fraction_high);return {time:item.time,temp,apparent:apparentTempApprox(temp,wind),rh,dew:dewPointApprox(temp,rh),rain,cloud,lowCloud:Number.isFinite(lowCloud)?lowCloud:cloud,midCloud,highCloud,wind,gust:numberOrNaN(d.wind_speed_of_gust),visibility:NaN};
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
  const sunsetMs=new Date(sunset).getTime();
  const eveningRows=allRows.filter(x=>Math.abs(new Date(x.time).getTime()-sunsetMs)<=120*60000);
  const sunsetRow=allRows[nearestTimeIndex(allRows.map(x=>x.time),sunset)]||null, sunriseRow=allRows[nearestTimeIndex(allRows.map(x=>x.time),sunrise)]||null;
  const sunsetView=horizonVisibility(sunsetRow), sunriseView=horizonVisibility(sunriseRow);
  const darkStart=new Date(sunset).getTime()+90*60000, darkEnd=new Date(sunrise).getTime()-90*60000;
  const darkRows=rows.filter(x=>{const t=new Date(x.time).getTime();return t>=darkStart&&t<=darkEnd;}), astroRows=darkRows.length?darkRows:rows;
  const moon=moonInfo(point.date), best=astroRows.slice().sort((a,b)=>milkyScore(b,moon)-milkyScore(a,moon))[0]||null;
  const minTemp=minFinite(rows.map(x=>x.temp)), morningMinTemp=minFinite((morningRows.length?morningRows:rows).map(x=>x.temp)), minApp=minFinite(rows.map(x=>x.apparent)), maxWind=max(rows.map(x=>x.wind)), maxGust=max(rows.map(x=>x.gust)), maxRain=max(rows.map(x=>x.rain)), avgCloud=mean(rows.map(x=>x.cloud)), avgWind=mean(rows.map(x=>x.wind)), maxRh=max(rows.map(x=>x.rh));
  const fogRisk=(maxRh>=97&&avgCloud>=85)?'高':(maxRh>=92||avgCloud>=75)?'中':'低', score=best?milkyScore(best,moon):0;
  const dawnTarget=`${next}T05:00:00+09:00`;
  const dawnRow=allRows[nearestTimeIndex(allRows.map(x=>x.time),dawnTarget)]||morningRows[0]||null;
  const dawnVisual=dawnRow?weatherVisual({cloud:dawnRow.cloud,rain:dawnRow.rain,thunder:'LOW'}):{icon:'',label:'--',cls:'partly'};
  return {nightNo,point,sunset,sunrise,sunsetView,sunriseView,minTemp,morningMinTemp,minApp,maxWind,maxGust,maxRain,avgCloud,avgWind,maxRh,minVis:NaN,fogRisk,moon,best,score,_astroRows:astroRows,_morningRows:morningRows,_eveningRows:eveningRows,_darkStart:darkStart,_darkEnd:darkEnd,dawn:{time:dawnRow?.time||dawnTarget,temp:dawnRow?.temp,rain:dawnRow?.rain,cloud:dawnRow?.cloud,wind:dawnRow?.wind,label:dawnVisual.label,cls:dawnVisual.cls},milkyLabel:score>=75?'期待大':score>=55?'見える可能性あり':score>=35?'条件次第':'厳しい',source:'MET Norway（予備）'};
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
  const vars=['temperature_2m','apparent_temperature','relative_humidity_2m','dew_point_2m','precipitation','cloud_cover','cloud_cover_low','cloud_cover_mid','cloud_cover_high','wind_speed_10m','wind_gusts_10m','visibility'];
  const starts=points.map(p=>p.date).sort(), ends=points.map(p=>addDays(p.date,1)).sort();
  const q=new URLSearchParams({
    latitude:points.map(p=>p.lat).join(','),longitude:points.map(p=>p.lon).join(','),elevation:points.map(p=>Number(p.elevation)||'nan').join(','),
    hourly:vars.join(','),daily:'sunrise,sunset',timezone:'Asia/Tokyo',start_date:starts[0],end_date:ends[ends.length-1],wind_speed_unit:'ms'
  });
  const r=await proxyFetch(`https://api.open-meteo.com/v1/forecast?${q}`);
  let baseItems;
  if(!r.ok){
    if(r.status===429)baseItems=await analyzeOvernightsMetNo(points);
    else throw new Error(`宿泊予報 HTTP ${r.status}`);
  }else{
    const raw=await r.json(), locations=Array.isArray(raw)?raw:[raw];
    if(locations.length!==points.length)throw new Error(`宿泊予報の地点数不一致 (${locations.length}/${points.length})`);
    baseItems=points.map((p,i)=>({...analyzeOvernightJson(p,i+1,locations[i]),source:'Open-Meteo'}));
  }
  return await enrichOvernightsWithMilky(baseItems);
}

const GALACTIC_CENTER={ra:266.41683,dec:-29.00781};
const LIGHT_POLLUTION_CENTERS=[
  ['札幌',43.0618,141.3545,1970000],['旭川',43.7706,142.3650,325000],['函館',41.7687,140.7288,245000],['青森',40.8222,140.7474,270000],['弘前',40.6031,140.4638,165000],['盛岡',39.7036,141.1527,285000],['秋田',39.7200,140.1026,300000],['仙台',38.2682,140.8694,1090000],['山形',38.2404,140.3633,245000],['福島',37.7608,140.4747,280000],
  ['新潟',37.9161,139.0364,770000],['富山',36.6953,137.2113,410000],['金沢',36.5613,136.6562,460000],['福井',36.0641,136.2196,260000],['長野',36.6486,138.1948,370000],['松本',36.2380,137.9720,235000],['甲府',35.6623,138.5682,190000],['前橋',36.3895,139.0634,330000],['宇都宮',36.5551,139.8828,515000],['東京',35.6762,139.6503,14000000],
  ['横浜',35.4437,139.6380,3770000],['さいたま',35.8617,139.6455,1340000],['千葉',35.6074,140.1065,980000],['静岡',34.9756,138.3828,680000],['浜松',34.7108,137.7261,790000],['名古屋',35.1815,136.9066,2330000],['岐阜',35.4233,136.7607,400000],['京都',35.0116,135.7681,1450000],['大阪',34.6937,135.5023,2750000],['神戸',34.6901,135.1955,1500000],
  ['奈良',34.6851,135.8048,350000],['和歌山',34.2305,135.1708,350000],['鳥取',35.5011,134.2351,185000],['松江',35.4681,133.0484,200000],['岡山',34.6551,133.9195,720000],['広島',34.3853,132.4553,1200000],['山口',34.1785,131.4737,190000],['高松',34.3428,134.0466,420000],['松山',33.8392,132.7657,505000],['高知',33.5597,133.5311,320000],
  ['徳島',34.0703,134.5548,250000],['福岡',33.5902,130.4017,1610000],['北九州',33.8834,130.8751,920000],['佐賀',33.2635,130.3009,230000],['長崎',32.7503,129.8777,400000],['熊本',32.8031,130.7079,740000],['大分',33.2396,131.6093,475000],['宮崎',31.9077,131.4202,400000],['鹿児島',31.5966,130.5571,590000],['那覇',26.2124,127.6809,315000]
];
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function jdFromDate(d){return d.getTime()/86400000+2440587.5;}
function gmstDeg(d){const x=jdFromDate(d)-2451545.0;return ((280.46061837+360.98564736629*x)%360+360)%360;}
function equatorialAltitude(date,lat,lon,raDeg,decDeg){
  const rad=Math.PI/180, lst=(gmstDeg(date)+Number(lon)+360)%360, h=((lst-raDeg+540)%360)-180;
  const s=Math.sin(Number(lat)*rad)*Math.sin(decDeg*rad)+Math.cos(Number(lat)*rad)*Math.cos(decDeg*rad)*Math.cos(h*rad);
  return Math.asin(clamp(s,-1,1))/rad;
}
function moonEquatorial(date){
  const rad=Math.PI/180,d=jdFromDate(date)-2451545.0,e=23.4397*rad;
  const L=(218.316+13.176396*d)*rad,M=(134.963+13.064993*d)*rad,F=(93.272+13.229350*d)*rad;
  const l=L+6.289*rad*Math.sin(M),b=5.128*rad*Math.sin(F);
  const ra=Math.atan2(Math.sin(l)*Math.cos(e)-Math.tan(b)*Math.sin(e),Math.cos(l));
  const dec=Math.asin(Math.sin(b)*Math.cos(e)+Math.cos(b)*Math.sin(e)*Math.sin(l));
  return {ra:(ra/rad+360)%360,dec:dec/rad};
}
function moonAltitudeAt(date,lat,lon){const m=moonEquatorial(date);return equatorialAltitude(date,lat,lon,m.ra,m.dec);}
function isoTime(ms){return new Date(ms).toISOString();}
function galacticCenterDetails(point,startMs,endMs){
  if(!Number.isFinite(startMs)||!Number.isFinite(endMs)||endMs<=startMs)return null;
  let best={alt:-90,time:startMs},first=null,last=null;
  for(let t=startMs;t<=endMs;t+=10*60000){
    const alt=equatorialAltitude(new Date(t),point.lat,point.lon,GALACTIC_CENTER.ra,GALACTIC_CENTER.dec);
    if(alt>best.alt)best={alt,time:t};
    if(alt>=15){if(first===null)first=t;last=t;}
  }
  return {peakTime:isoTime(best.time),maxAltitude:best.alt,visibleStart:first===null?null:isoTime(first),visibleEnd:last===null?null:isoTime(last)};
}
function moonNightDetails(point,sunset,sunrise,moon,bestTime){
  const start=new Date(sunset).getTime(),end=new Date(sunrise).getTime();
  if(!Number.isFinite(start)||!Number.isFinite(end))return {impact:'判定不可',bestAltitude:NaN};
  let prevT=start,prevAlt=moonAltitudeAt(new Date(start),point.lat,point.lon),rise=null,set=null,maxAlt=-90;
  for(let t=start+10*60000;t<=end;t+=10*60000){
    const alt=moonAltitudeAt(new Date(t),point.lat,point.lon);maxAlt=Math.max(maxAlt,alt);
    if(prevAlt<=0&&alt>0&&rise===null)rise=t;
    if(prevAlt>0&&alt<=0&&set===null)set=t;
    prevT=t;prevAlt=alt;
  }
  const bestDate=bestTime?new Date(bestTime):new Date((start+end)/2),bestAltitude=moonAltitudeAt(bestDate,point.lat,point.lon);
  const active=Math.max(0,Math.sin(Math.max(0,bestAltitude)*Math.PI/180));
  const effective=moon.illum*active;
  const impact=effective<8?'ほぼなし':effective<25?'小':effective<55?'中':'大';
  const allAbove=!rise&&!set&&moonAltitudeAt(new Date(start),point.lat,point.lon)>0;
  const allBelow=!rise&&!set&&moonAltitudeAt(new Date(start),point.lat,point.lon)<=0;
  return {rise:rise?isoTime(rise):null,set:set?isoTime(set):null,maxAltitude:maxAlt,bestAltitude,impact,effective,allAbove,allBelow};
}
function lightPollutionEstimate(point){
  let nearest=null,bestEff=Infinity;
  for(const [name,lat,lon,pop] of LIGHT_POLLUTION_CENTERS){
    const km=haversineMeters(Number(point.lat),Number(point.lon),lat,lon)/1000;
    const weight=1+Math.max(0,Math.log10(pop/100000))*0.38;
    const eff=km/weight+(Number(point.elevation)||0)/160;
    if(eff<bestEff){bestEff=eff;nearest={name,km,pop};}
  }
  let score,label;
  if(bestEff>=95){score=15;label='非常に少ない';}
  else if(bestEff>=70){score=13;label='少ない';}
  else if(bestEff>=45){score=10;label='やや少ない';}
  else if(bestEff>=28){score=7;label='中程度';}
  else {score=4;label='やや多い';}
  return {score,label,nearest,effectiveDistance:bestEff,note:'周辺主要市街地との距離・規模・標高からの簡易推定'};
}
async function fetchAirQualityForPoint(point){
  const next=addDays(point.date,1);
  const q=new URLSearchParams({latitude:point.lat,longitude:point.lon,hourly:'pm10,pm2_5,aerosol_optical_depth,european_aqi',timezone:'Asia/Tokyo',start_date:point.date,end_date:next});
  const r=await proxyFetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${q}`);
  if(!r.ok)throw new Error(`空気質 HTTP ${r.status}`);
  return await r.json();
}
function airQualitySummary(payload,startMs,endMs){
  const h=payload?.hourly||{},rows=(h.time||[]).map((t,i)=>({time:t,pm25:numberOrNaN(h.pm2_5?.[i]),pm10:numberOrNaN(h.pm10?.[i]),aod:numberOrNaN(h.aerosol_optical_depth?.[i]),aqi:numberOrNaN(h.european_aqi?.[i])})).filter(r=>{const x=new Date(r.time).getTime();return x>=startMs&&x<=endMs;});
  if(!rows.length)return {available:false,label:'取得不可',score:7};
  const pm25=mean(rows.map(x=>x.pm25)),pm10=mean(rows.map(x=>x.pm10)),aod=mean(rows.map(x=>x.aod)),aqi=mean(rows.map(x=>x.aqi));
  let score=10,label='非常に良い';
  if((Number.isFinite(pm25)&&pm25>25)||(Number.isFinite(aqi)&&aqi>60)){score=3;label='霞みやすい';}
  else if((Number.isFinite(pm25)&&pm25>15)||(Number.isFinite(aqi)&&aqi>40)){score=5;label='やや霞む';}
  else if((Number.isFinite(pm25)&&pm25>8)||(Number.isFinite(aqi)&&aqi>25)||(Number.isFinite(aod)&&aod>0.18)){score=7;label='良い';}
  return {available:true,label,score,pm25,pm10,aod,aqi};
}
function milkySkyComponent(row){
  let s=30;
  if(Number.isFinite(row?.cloud))s-=row.cloud*.24;
  if(Number.isFinite(row?.rain))s-=Math.min(12,row.rain*6);
  if(Number.isFinite(row?.visibility)&&row.visibility<15000)s-=Math.min(7,(15000-row.visibility)/1800);
  if(Number.isFinite(row?.rh)&&row.rh>93)s-=Math.min(5,(row.rh-93)*.7);
  return clamp(s,0,30);
}
function milkyDetailedScore(row,point,moon,galactic,air,light){
  const t=new Date(row.time),gcAlt=equatorialAltitude(t,point.lat,point.lon,GALACTIC_CENTER.ra,GALACTIC_CENTER.dec),moonAlt=moonAltitudeAt(t,point.lat,point.lon);
  const sky=milkySkyComponent(row);
  const moonEffective=moon.illum*Math.max(0,Math.sin(Math.max(0,moonAlt)*Math.PI/180));
  const moonPts=25*(1-clamp(moonEffective/100,0,1));
  const galPts=20*clamp((gcAlt-5)/40,0,1);
  const airPts=air?.score??7,lightPts=light?.score??10;
  return {score:clamp(sky+moonPts+galPts+airPts+lightPts,0,100),gcAlt,moonAlt,sky,moonPts,galPts,airPts,lightPts};
}
function milkyLabelFromScore(score){return score>=80?'期待大':score>=65?'見頃':score>=50?'見える可能性あり':score>=35?'条件次第':'厳しい';}
function formatTimeRange(a,b){return a&&b?`${timeOnly(a)}〜${timeOnly(b)}`:'判定不可';}
function milkyAdvice(m){
  const bits=[];
  if(m.moon?.impact==='ほぼなし'||m.moon?.impact==='小')bits.push('月明かりの影響は小さめ');
  else if(m.moon?.impact)bits.push(`月明かりの影響は${m.moon.impact}`);
  if(m.air?.available)bits.push(`空気質は${m.air.label}`);
  bits.push(`光害は${m.light.label}目安`);
  return bits.join('。')+'。';
}

function dewPointApprox(temp,rh){
  if(!Number.isFinite(temp)||!Number.isFinite(rh)||rh<=0)return NaN;
  const a=17.62,b=243.12,g=Math.log(clamp(rh,1,100)/100)+(a*temp)/(b+temp);
  return (b*g)/(a-g);
}
function cloudSeaRowScore(row){
  const low=Number.isFinite(row?.lowCloud)?row.lowCloud:Number(row?.cloud);
  const total=Number(row?.cloud);
  const upper=Number.isFinite(total)&&Number.isFinite(low)?clamp(total-low,0,100):Number.isFinite(total)?total:50;
  const clearAbove=100-upper;
  const dew=Number.isFinite(row?.dew)?row.dew:dewPointApprox(Number(row?.temp),Number(row?.rh));
  const spread=Number.isFinite(dew)&&Number.isFinite(row?.temp)?Math.max(0,row.temp-dew):NaN;
  const wind=Number(row?.wind),rain=Number(row?.rain),rh=Number(row?.rh);
  let lowPts=0;if(Number.isFinite(low)){lowPts=low>=55?30:low>=35?23:low>=20?14:low>=10?7:2;}
  let clearPts=Number.isFinite(clearAbove)?25*clamp((clearAbove-25)/65,0,1):12;
  let moisturePts=10;
  if(Number.isFinite(spread))moisturePts=20*clamp((4.5-spread)/4.0,0,1);
  else if(Number.isFinite(rh))moisturePts=20*clamp((rh-72)/26,0,1);
  let windPts=7;if(Number.isFinite(wind)){windPts=wind<=1.5?15:wind<=3?13:wind<=5?8:wind<=7?3:0;}
  let precipPts=8;if(Number.isFinite(rain)){precipPts=rain<=0.05?10:rain<=0.3?8:rain<=1?4:0;}
  const score=clamp(lowPts+clearPts+moisturePts+windPts+precipPts,0,100);
  return {score,lowCloud:low,upperCloud:upper,clearAbove,dew,dewSpread:spread,wind,rain,rh};
}
function cloudSeaLabel(score){return score>=80?'期待大':score>=65?'期待できる':score>=50?'可能性あり':score>=35?'条件次第':'厳しい';}
function cloudSeaRadiative(detail){
  if(!detail)return '判定不可';
  const c=Number(detail.clearAbove),w=Number(detail.wind),r=Number(detail.rain);
  if(c>=70&&w<=2.5&&r<=0.1)return '良好';
  if(c>=50&&w<=4&&r<=0.3)return 'やや良好';
  return '弱め';
}
function cloudSeaAdvice(c){
  if(!c?.bestDetail)return '早朝の予報条件を十分に評価できませんでした。';
  const d=c.bestDetail,b=[];
  if(Number.isFinite(d.lowCloud)&&d.lowCloud>=55)b.push('低層雲が多い');
  else if(Number.isFinite(d.lowCloud)&&d.lowCloud<20)b.push('低層雲が少ない');
  if(Number.isFinite(d.clearAbove)&&d.clearAbove>=70)b.push('上空は比較的抜ける');
  if(Number.isFinite(d.dewSpread)&&d.dewSpread<=2)b.push('気温と露点が近く霧が生じやすい');
  if(Number.isFinite(d.wind)&&d.wind<=3)b.push('風が弱く雲が滞留しやすい');
  if(Number.isFinite(d.rain)&&d.rain>0.5)b.push('見頃時間帯の降水が不利');
  const lead=b.length?b.slice(0,3).join('・'):'決め手となる条件は弱め';
  return `${lead}予報です。${c.score>=65?'日の出前後に雲海が見られる可能性があります。':c.score>=50?'条件が揃えば雲海になる可能性があります。':'現時点では雲海の条件は強くありません。'}`;
}
function buildCloudSeaAnalysis(o){
  const rows=(Array.isArray(o._morningRows)?o._morningRows:[]).filter(r=>{const h=Number(String(r.time||'').slice(11,13));return Number.isFinite(h)&&h>=3&&h<=8;});
  if(!rows.length)return {score:0,label:'判定不可',best:null,bestDetail:null,windowStart:null,windowEnd:null,advice:'早朝予報を取得できませんでした。'};
  let best=null,bestDetail=null;
  const scored=rows.map(row=>{const detail=cloudSeaRowScore(row);if(!bestDetail||detail.score>bestDetail.score){best=row;bestDetail=detail;}return {row,detail};});
  const score=bestDetail?.score||0,threshold=Math.max(50,score-10);
  const good=scored.filter(x=>x.detail.score>=threshold);
  const c={score,label:cloudSeaLabel(score),best,bestDetail,windowStart:good[0]?.row.time||best?.time||null,windowEnd:good[good.length-1]?.row.time||best?.time||null,radiative:cloudSeaRadiative(bestDetail)};
  c.advice=cloudSeaAdvice(c);return c;
}
function cloudSeaIcon(){return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 32h36"/><path d="M8 30l9-10 6 7 6-5 11 8"/><path d="M10 38c4-3 8-3 12 0s8 3 12 0 6-2 8-1"/><path d="M12 42c4-2 7-2 10 0s7 2 10 0 6-2 9-1"/></svg>';}
function renderCloudSeaDetail(o){
  const c=o.cloudSea;if(!c)return '';
  const d=c.bestDetail||{};
  const low=Number.isFinite(d.lowCloud)?`${Math.round(d.lowCloud)}%`:'--';
  const upper=Number.isFinite(d.clearAbove)?`${Math.round(d.clearAbove)}%`:'--';
  const spread=Number.isFinite(d.dewSpread)?`${num(d.dewSpread,1)}℃`:'--';
  const wind=Number.isFinite(d.wind)?`${num(d.wind,1)}m/s`:'--';
  const tone=c.score>=65?'good':c.score>=50?'fair':c.score>=35?'caution':'hard';
  return `<section class="cloudsea-panel ${tone}">
    <div class="cloudsea-head"><div class="cloudsea-title"><div class="cloudsea-symbol">${cloudSeaIcon()}</div><div><small>翌朝の雲海予測</small><b>${Math.round(c.score)} / 100　${esc(c.label)}</b></div></div><span>${formatTimeRange(c.windowStart,c.windowEnd)}</span></div>
    <div class="cloudsea-grid">
      <div class="cloudsea-card"><small>低層雲</small><b>${low}</b><span>${Number(d.lowCloud)>=55?'多い':Number(d.lowCloud)>=30?'やや多い':'少ない'}</span></div>
      <div class="cloudsea-card"><small>上空の抜け</small><b>${upper}</b><span>${Number(d.clearAbove)>=70?'良好':Number(d.clearAbove)>=45?'まずまず':'雲が多い'}</span></div>
      <div class="cloudsea-card"><small>気温−露点差</small><b>${spread}</b><span>${Number(d.dewSpread)<=2?'霧が生じやすい':Number(d.dewSpread)<=4?'湿り気あり':'乾き気味'}</span></div>
      <div class="cloudsea-card"><small>風 / 放射冷却</small><b>${wind}</b><span>放射冷却 ${esc(c.radiative||'--')}</span></div>
    </div>
    <div class="cloudsea-advice"><strong>☁ 雲海の目安</strong><p>${esc(c.advice||'')}</p></div>
    <p class="cloudsea-note">※ 雲海期待度は低層雲・上空の雲・湿度/露点・風・降水から算出した気象条件の目安です。谷地形・局地風・実際の雲底高度によって見え方は変わります。</p>
  </section>`;
}


function sunDeclinationApprox(date){
  const d=new Date(`${date}T12:00:00+09:00`),start=new Date(d.getFullYear(),0,0),n=Math.floor((d-start)/86400000);
  return -23.44*Math.cos((2*Math.PI/365)*(n+10));
}
function sunriseAzimuthApprox(date,lat){
  const rad=Math.PI/180,dec=sunDeclinationApprox(date)*rad,phi=Number(lat)*rad,alt=-0.833*rad;
  const cosA=(Math.sin(dec)-Math.sin(phi)*Math.sin(alt))/(Math.cos(phi)*Math.cos(alt));
  return Math.acos(clamp(cosA,-1,1))/rad;
}
function compass16(deg){
  const dirs=['北','北北東','北東','東北東','東','東南東','南東','南南東','南','南南西','南西','西南西','西','西北西','北西','北北西'];
  return dirs[Math.round(((Number(deg)%360)+360)%360/22.5)%16];
}
const TERRAIN_RAY_DISTANCES_KM=[0.25,0.5,1,2,3,5,7.5,10,15,20,30];
const TERRAIN_RAY_OFFSETS_DEG=[-4,0,4];
const terrainHorizonCache=new Map();
function destinationPoint(lat,lon,bearingDeg,distanceKm){
  const R=6371,rad=Math.PI/180,br=Number(bearingDeg)*rad,d=Number(distanceKm)/R,p1=Number(lat)*rad,l1=Number(lon)*rad;
  const p2=Math.asin(Math.sin(p1)*Math.cos(d)+Math.cos(p1)*Math.sin(d)*Math.cos(br));
  const l2=l1+Math.atan2(Math.sin(br)*Math.sin(d)*Math.cos(p1),Math.cos(d)-Math.sin(p1)*Math.sin(p2));
  return {lat:p2/rad,lon:((l2/rad+540)%360)-180};
}
function terrainOpening(angle){
  if(!Number.isFinite(Number(angle)))return {label:'判定不可',mark:'–',score:70};
  const a=Number(angle);
  if(a<=1.5)return {label:'開けている',mark:'◎',score:100};
  if(a<=4)return {label:'比較的開けている',mark:'○',score:82};
  if(a<=8)return {label:'稜線の影響あり',mark:'△',score:55};
  return {label:'大きく遮られる',mark:'×',score:25};
}
function terrainProfileFromSamples(point,azimuth,samples){
  const obs=Number(point.elevation),R=6371000;
  if(!Number.isFinite(obs)||!samples.length)return {available:false,opening:terrainOpening(NaN)};
  let maxAngle=-90,dominant=null;
  for(const s of samples){
    const d=Number(s.distanceKm)*1000,e=Number(s.elevation);
    if(!Number.isFinite(d)||d<=0||!Number.isFinite(e))continue;
    const curvature=(d*d)/(2*R);
    const apparentRise=e-obs-curvature;
    const angle=Math.atan2(apparentRise,d)*180/Math.PI;
    if(angle>maxAngle){maxAngle=angle;dominant={...s,angle};}
  }
  if(!dominant)return {available:false,opening:terrainOpening(NaN)};
  const effective=Math.max(0,maxAngle),opening=terrainOpening(effective);
  return {available:true,azimuth:Number(azimuth),horizonAngle:effective,rawHorizonAngle:maxAngle,opening,dominant};
}
async function fetchTerrainHorizonForOvernight(o){
  const next=addDays(o.point.date,1),morningAz=sunriseAzimuthApprox(next,o.point.lat),eveningAz=sunsetAzimuthApprox(o.point.date,o.point.lat);
  const key=[Number(o.point.lat).toFixed(4),Number(o.point.lon).toFixed(4),Math.round(Number(o.point.elevation)||0),Math.round(morningAz),Math.round(eveningAz)].join('|');
  if(terrainHorizonCache.has(key))return terrainHorizonCache.get(key);
  const requests=[];
  for(const scene of [{name:'morning',az:morningAz},{name:'evening',az:eveningAz}]){
    for(const off of TERRAIN_RAY_OFFSETS_DEG){
      for(const distanceKm of TERRAIN_RAY_DISTANCES_KM){
        const bearing=(scene.az+off+360)%360,p=destinationPoint(o.point.lat,o.point.lon,bearing,distanceKm);
        requests.push({scene:scene.name,az:scene.az,bearing,distanceKm,lat:p.lat,lon:p.lon});
      }
    }
  }
  try{
    const q=new URLSearchParams({latitude:requests.map(x=>x.lat.toFixed(6)).join(','),longitude:requests.map(x=>x.lon.toFixed(6)).join(',')});
    const r=await proxyFetch(`https://api.open-meteo.com/v1/elevation?${q}`);
    if(!r.ok)throw new Error(`HTTP ${r.status}`);
    const j=await r.json(),elev=Array.isArray(j?.elevation)?j.elevation:[];
    const grouped={morning:[],evening:[]};
    requests.forEach((req,i)=>{const e=Number(elev[i]);if(Number.isFinite(e))grouped[req.scene].push({...req,elevation:e});});
    const result={morning:terrainProfileFromSamples(o.point,morningAz,grouped.morning),evening:terrainProfileFromSamples(o.point,eveningAz,grouped.evening),source:'Copernicus DEM GLO-90 / Open-Meteo'};
    terrainHorizonCache.set(key,result);return result;
  }catch(e){
    const result={morning:{available:false,opening:terrainOpening(NaN)},evening:{available:false,opening:terrainOpening(NaN)},source:'取得不可',error:e?.message||String(e)};
    terrainHorizonCache.set(key,result);return result;
  }
}
function solarAltitudeApprox(date,lat,lon){
  const rad=Math.PI/180,jst=new Date(date.getTime()+9*3600000),year=jst.getUTCFullYear(),start=Date.UTC(year,0,0),day=Math.floor((Date.UTC(year,jst.getUTCMonth(),jst.getUTCDate())-start)/86400000);
  const hour=jst.getUTCHours()+jst.getUTCMinutes()/60+jst.getUTCSeconds()/3600;
  const gamma=2*Math.PI/365*(day-1+(hour-12)/24);
  const eq=229.18*(0.000075+0.001868*Math.cos(gamma)-0.032077*Math.sin(gamma)-0.014615*Math.cos(2*gamma)-0.040849*Math.sin(2*gamma));
  const dec=0.006918-0.399912*Math.cos(gamma)+0.070257*Math.sin(gamma)-0.006758*Math.cos(2*gamma)+0.000907*Math.sin(2*gamma)-0.002697*Math.cos(3*gamma)+0.00148*Math.sin(3*gamma);
  let tst=hour*60+eq+4*Number(lon)-60*9;tst=((tst%1440)+1440)%1440;
  let ha=tst/4-180;if(ha<-180)ha+=360;
  const phi=Number(lat)*rad,cosz=Math.sin(phi)*Math.sin(dec)+Math.cos(phi)*Math.cos(dec)*Math.cos(ha*rad);
  return 90-Math.acos(clamp(cosz,-1,1))/rad;
}
function terrainAdjustedSolarTime(baseIso,point,terrain,isSunrise){
  const base=new Date(baseIso).getTime();
  if(!Number.isFinite(base)||!terrain?.available||Number(terrain.horizonAngle)<=1.5)return {time:baseIso,deltaMin:0,adjusted:false};
  const threshold=Number(terrain.horizonAngle),start=isSunrise?base:base-180*60000,end=isSunrise?base+180*60000:base;
  let found=null;
  for(let t=start;t<=end;t+=60000){
    if(solarAltitudeApprox(new Date(t),point.lat,point.lon)>=threshold){if(isSunrise){found=t;break;}found=t;}
  }
  if(found===null)return {time:baseIso,deltaMin:0,adjusted:false};
  const delta=Math.round((found-base)/60000);
  return {time:new Date(found).toISOString(),deltaMin:delta,adjusted:Math.abs(delta)>=2};
}
function terrainSceneAdvice(terrain,solar){
  if(!terrain?.available)return '周辺地形データを取得できなかったため、地形遮蔽は評価に含めていません。';
  const a=Number(terrain.horizonAngle),open=terrain.opening;
  if(a<=1.5)return `地形開放度は${open.mark}${open.label}で、周辺稜線による大きな遮蔽は少ない見込みです。`;
  const timing=solar?.adjusted?` 地形を考慮すると太陽が見える目安は ${timeOnly(solar.time)} 頃です。`:'';
  return `地形開放度は${open.mark}${open.label}（遮蔽角 約${a.toFixed(1)}°）です。${timing}`;
}

function sunriseGlowScore(row){
  if(!row)return 0;
  const total=Number(row.cloud),low=Number(row.lowCloud),mid=Number(row.midCloud),high=Number(row.highCloud),rain=Number(row.rain),vis=Number(row.visibility);
  const upper=Number.isFinite(mid)||Number.isFinite(high)?Math.max(Number.isFinite(mid)?mid:0,Number.isFinite(high)?high:0):Number.isFinite(total)&&Number.isFinite(low)?clamp(total-low,0,100):Number.isFinite(total)?total:40;
  let s=50;
  if(Number.isFinite(upper)){const ideal=45;s+=35*(1-Math.min(1,Math.abs(upper-ideal)/55));}
  if(Number.isFinite(low))s-=Math.max(0,low-35)*.55;
  if(Number.isFinite(rain))s-=Math.min(25,rain*15);
  if(Number.isFinite(vis)&&vis<10000)s-=Math.min(20,(10000-vis)/500);
  return clamp(s,0,100);
}
function sunriseScore(row,view){
  if(!row)return 0;
  let s=Number(view?.score)||50;
  if(Number.isFinite(row.lowCloud))s-=Math.max(0,row.lowCloud-45)*.35;
  if(Number.isFinite(row.rain))s-=Math.min(20,row.rain*12);
  return clamp(s,0,100);
}
function morningSceneLabel(score){return score>=80?'期待大':score>=65?'期待できる':score>=50?'可能性あり':score>=35?'条件次第':'厳しい';}
function buildMorningScene(o,terrain=null){
  const rows=Array.isArray(o._morningRows)?o._morningRows:[];
  const sunriseMs=new Date(o.sunrise).getTime();
  const near=rows.filter(r=>Math.abs(new Date(r.time).getTime()-sunriseMs)<=90*60000);
  const sunriseRow=rows[nearestTimeIndex(rows.map(r=>r.time),o.sunrise)]||near[0]||null;
  const cloudSea=buildCloudSeaAnalysis(o);
  const riseWeatherScore=sunriseScore(sunriseRow,o.sunriseView),glowScore=sunriseGlowScore(sunriseRow);
  const terrainScore=terrain?.available?Number(terrain.opening?.score):null;
  const riseScore=terrain?.available?clamp(riseWeatherScore*.72+terrainScore*.28,0,100):riseWeatherScore;
  const combined=clamp(riseScore*.4+(cloudSea.score||0)*.4+glowScore*.2,0,100);
  const next=addDays(o.point.date,1),az=sunriseAzimuthApprox(next,o.point.lat);
  const windowStart=new Date(sunriseMs-30*60000).toISOString(),windowEnd=new Date(sunriseMs+45*60000).toISOString();
  const temp=Number(sunriseRow?.temp),apparent=Number(sunriseRow?.apparent),wind=Number(sunriseRow?.wind),rain=Number(sunriseRow?.rain),vis=Number(sunriseRow?.visibility),low=Number(sunriseRow?.lowCloud);
  const adviceBits=[];
  if(riseScore>=65)adviceBits.push('日の出は見えやすい条件'); else if(riseScore<40)adviceBits.push('日の出方向の雲に注意');
  if(cloudSea.score>=65)adviceBits.push('雲海も期待'); else if(cloudSea.score>=50)adviceBits.push('雲海の可能性あり');
  if(glowScore>=65)adviceBits.push('朝焼けにも期待');
  const terrainSolar=terrainAdjustedSolarTime(o.sunrise,o.point,terrain,true);
  const baseAdvice=`${adviceBits.length?adviceBits.join('・'):'朝景条件はやや不安定'}です。${cloudSea.score>=65&&riseScore>=65?'日の出と雲海を同時に楽しめる可能性があります。':riseScore>=65?'日の出を中心に狙いやすい予報です。':cloudSea.score>=65?'雲海条件は良好ですが、日の出そのものは雲の影響を受ける可能性があります。':'現時点では大きな好条件は揃っていません。'}`;
  const advice=`${baseAdvice} ${terrainSceneAdvice(terrain,terrainSolar)}`;
  return {score:combined,label:morningSceneLabel(combined),sunriseScore:riseScore,sunriseWeatherScore:riseWeatherScore,glowScore,cloudSea,azimuth:az,azimuthLabel:compass16(az),windowStart,windowEnd,temp,apparent,wind,rain,visibility:vis,lowCloud:low,terrain,terrainSolar,advice};
}
function renderSceneTerrainStrip(terrain,solar,scene){
  const isMorning=scene==='morning',label=isMorning?'地形を考慮した日の出':'地形を考慮した日の入り';
  if(!terrain?.available)return `<div class="scene-terrain-strip unavailable"><div><small>地形開放度</small><b>– 判定不可</b></div><div><small>遮蔽角</small><b>--</b></div><div><small>${label}</small><b>地形データ取得不可</b></div></div>`;
  const opening=terrain.opening||terrainOpening(terrain.horizonAngle),delta=Number(solar?.deltaMin)||0;
  let deltaText='天文時刻とほぼ同じ';
  if(solar?.adjusted)deltaText=isMorning?`天文時刻より約${Math.abs(delta)}分後`:`天文時刻より約${Math.abs(delta)}分前`;
  return `<div class="scene-terrain-strip"><div><small>地形開放度</small><b>${opening.mark} ${esc(opening.label)}</b></div><div><small>地形遮蔽角</small><b>${Number(terrain.horizonAngle).toFixed(1)}°</b><span>${terrain.dominant?`${num(terrain.dominant.distanceKm,1)}km先の稜線が最大`:'周辺稜線を解析'}</span></div><div><small>${label}</small><b>${timeOnly(solar?.time)}</b><span>${esc(deltaText)}</span></div></div>`;
}

function morningSceneIcon(){return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 34h38"/><path d="M10 31l9-11 6 7 5-5 8 9"/><path d="M17 17a8 8 0 0 1 14 0"/><path d="M24 6v5M10 16h5M33 16h5"/></svg>';}
function renderMorningScene(o){
  const m=o.morningScene;if(!m)return '';const c=m.cloudSea||{},d=c.bestDetail||{};
  const vis=Number.isFinite(m.visibility)?(m.visibility>=10000?`${(m.visibility/1000).toFixed(0)}km`:`${(m.visibility/1000).toFixed(1)}km`):'--';
  const tone=m.score>=65?'good':m.score>=50?'fair':m.score>=35?'caution':'hard';
  return `<section class="morning-scene-panel ${tone}">
    <div class="morning-scene-head"><div class="morning-scene-title"><div class="morning-scene-symbol">${morningSceneIcon()}</div><div><small>朝景分析</small><b>${Math.round(m.score)} / 100　${esc(m.label)}</b></div></div><span>ベスト ${formatTimeRange(m.windowStart,m.windowEnd)}</span></div>
    <div class="morning-scene-summary">
      <div><small>日の出</small><b>${timeOnly(o.sunrise)}</b><span>${esc(m.azimuthLabel)} ${Math.round(m.azimuth)}°</span></div>
      <div><small>日の出期待度</small><b>${Math.round(m.sunriseScore)} / 100</b><span>${m.sunriseScore>=65?'見えやすい':m.sunriseScore>=45?'可能性あり':'雲に注意'}</span></div>
      <div><small>雲海期待度</small><b>${Math.round(c.score||0)} / 100</b><span>${esc(c.label||'--')}</span></div>
      <div><small>朝焼け期待度</small><b>${Math.round(m.glowScore)} / 100</b><span>${m.glowScore>=65?'期待できる':m.glowScore>=45?'可能性あり':'弱め'}</span></div>
    </div>
    ${renderSceneTerrainStrip(m.terrain,m.terrainSolar,'morning')}
    <div class="morning-scene-grid">
      <div><small>東側・低層雲</small><b>${Number.isFinite(m.lowCloud)?Math.round(m.lowCloud)+'%':'--'}</b></div>
      <div><small>視界</small><b>${vis}</b></div>
      <div><small>気温 / 体感</small><b>${num(m.temp,1)}℃ / ${num(m.apparent,1)}℃</b></div>
      <div><small>風 / 降水</small><b>${num(m.wind,1)}m/s / ${num(m.rain,1)}mm/h</b></div>
    </div>
    <div class="morning-scene-advice"><strong>☀ 朝景の見どころ</strong><p>${esc(m.advice)}</p></div>
    <p class="morning-scene-note">※ 朝景分析は気象条件に加え、周辺山岳地形による日の出方向の遮蔽を評価します。地形標高は Copernicus DEM GLO-90（Open-Meteo、約90m解像度）を使用。建物・樹木・直近の岩壁や局地雲は反映されません。</p>
  </section>`;
}


function sunsetAzimuthApprox(date,lat){return 360-sunriseAzimuthApprox(date,lat);}
function solarTwilightTimeApprox(date,lat,lon,zenithDeg){
  const base=new Date(`${date}T12:00:00+09:00`),start=new Date(base.getFullYear(),0,0),n=Math.floor((base-start)/86400000);
  const rad=Math.PI/180,lngHour=Number(lon)/15,t=n+((18-lngHour)/24);
  const M=(0.9856*t)-3.289;
  let L=M+1.916*Math.sin(M*rad)+0.020*Math.sin(2*M*rad)+282.634;L=(L+360)%360;
  let RA=Math.atan(0.91764*Math.tan(L*rad))/rad;RA=(RA+360)%360;
  const Lq=Math.floor(L/90)*90,RAq=Math.floor(RA/90)*90;RA=(RA+(Lq-RAq))/15;
  const sinDec=0.39782*Math.sin(L*rad),cosDec=Math.cos(Math.asin(sinDec));
  const cosH=(Math.cos(Number(zenithDeg)*rad)-(sinDec*Math.sin(Number(lat)*rad)))/(cosDec*Math.cos(Number(lat)*rad));
  if(cosH>1||cosH<-1)return null;
  const H=(Math.acos(cosH)/rad)/15,T=H+RA-(0.06571*t)-6.622,UT=(T-lngHour+24)%24,jst=(UT+9)%24;
  const mins=Math.round(jst*60),hh=Math.floor(mins/60)%24,mm=mins%60;
  return `${date}T${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:00+09:00`;
}
function sunsetGlowScore(row){
  if(!row)return 0;
  const total=Number(row.cloud),low=Number(row.lowCloud),mid=Number(row.midCloud),high=Number(row.highCloud),rain=Number(row.rain),vis=Number(row.visibility);
  const upper=Number.isFinite(mid)||Number.isFinite(high)?Math.max(Number.isFinite(mid)?mid:0,Number.isFinite(high)?high:0):Number.isFinite(total)&&Number.isFinite(low)?clamp(total-low,0,100):Number.isFinite(total)?total:40;
  let s=48;
  if(Number.isFinite(upper)){const ideal=48;s+=38*(1-Math.min(1,Math.abs(upper-ideal)/55));}
  if(Number.isFinite(low))s-=Math.max(0,low-35)*.6;
  if(Number.isFinite(rain))s-=Math.min(28,rain*16);
  if(Number.isFinite(vis)&&vis<10000)s-=Math.min(20,(10000-vis)/500);
  return clamp(s,0,100);
}
function sunsetSceneScore(row,view){
  if(!row)return 0;
  let s=Number(view?.score)||50;
  if(Number.isFinite(row.lowCloud))s-=Math.max(0,row.lowCloud-40)*.4;
  if(Number.isFinite(row.rain))s-=Math.min(22,row.rain*14);
  if(Number.isFinite(row.visibility)&&row.visibility<8000)s-=Math.min(18,(8000-row.visibility)/450);
  return clamp(s,0,100);
}
function eveningSceneLabel(score){return score>=80?'期待大':score>=65?'期待できる':score>=50?'可能性あり':score>=35?'条件次第':'厳しい';}
function buildEveningScene(o,terrain=null){
  const rows=Array.isArray(o._eveningRows)?o._eveningRows:[];
  const sunsetMs=new Date(o.sunset).getTime();
  const sunsetRow=rows[nearestTimeIndex(rows.map(r=>r.time),o.sunset)]||null;
  const sunWeatherScore=sunsetSceneScore(sunsetRow,o.sunsetView),glowScore=sunsetGlowScore(sunsetRow);
  const terrainScore=terrain?.available?Number(terrain.opening?.score):null;
  const sunScore=terrain?.available?clamp(sunWeatherScore*.72+terrainScore*.28,0,100):sunWeatherScore;
  const scored=rows.filter(r=>{const dt=new Date(r.time).getTime()-sunsetMs;return dt>=-60*60000&&dt<=75*60000;}).map(r=>{
    const proximity=Math.max(0,1-Math.abs(new Date(r.time).getTime()-sunsetMs)/(90*60000));
    return {row:r,score:clamp(sunsetSceneScore(r,horizonVisibility(r))*.45+sunsetGlowScore(r)*.45+proximity*10,0,100)};
  });
  scored.sort((a,b)=>a.row.time.localeCompare(b.row.time));
  const bestScore=scored.length?Math.max(...scored.map(x=>x.score)):clamp(sunScore*.55+glowScore*.45,0,100);
  const threshold=Math.max(50,bestScore-10),good=scored.filter(x=>x.score>=threshold);
  const defaultStart=new Date(sunsetMs-35*60000).toISOString(),defaultEnd=new Date(sunsetMs+45*60000).toISOString();
  const windowStart=good[0]?.row.time||defaultStart,windowEnd=good[good.length-1]?.row.time||defaultEnd;
  const combined=clamp(sunScore*.55+glowScore*.45,0,100);
  const az=sunsetAzimuthApprox(o.point.date,o.point.lat);
  const temp=Number(sunsetRow?.temp),apparent=Number(sunsetRow?.apparent),wind=Number(sunsetRow?.wind),rain=Number(sunsetRow?.rain),vis=Number(sunsetRow?.visibility),low=Number(sunsetRow?.lowCloud);
  const mid=Number(sunsetRow?.midCloud),high=Number(sunsetRow?.highCloud),upper=(Number.isFinite(mid)||Number.isFinite(high))?Math.max(Number.isFinite(mid)?mid:0,Number.isFinite(high)?high:0):NaN;
  const civil=solarTwilightTimeApprox(o.point.date,o.point.lat,o.point.lon,96),nautical=solarTwilightTimeApprox(o.point.date,o.point.lat,o.point.lon,102),astro=solarTwilightTimeApprox(o.point.date,o.point.lat,o.point.lon,108);
  const bits=[];
  if(sunScore>=65)bits.push('夕日は見えやすい条件');else if(sunScore<40)bits.push('日没方向の低い雲に注意');
  if(glowScore>=70)bits.push('夕焼けは期待大');else if(glowScore>=55)bits.push('夕焼けにも期待');
  if(Number.isFinite(upper)&&upper>=25&&upper<=70)bits.push('中高層雲が色づきやすい');
  if(Number.isFinite(low)&&low>65)bits.push('低層雲が多め');
  const terrainSolar=terrainAdjustedSolarTime(o.sunset,o.point,terrain,false);
  const baseAdvice=`${bits.length?bits.join('・'):'夕景条件はやや不安定'}です。${sunScore>=65&&glowScore>=65?'夕日から日没後の夕焼けまで連続して楽しめる可能性があります。':glowScore>=65?'夕日そのものより、日没後の空の色づきに期待できます。':sunScore>=65?'夕日を中心に狙いやすい予報です。':'雲の切れ間や局地的な変化に左右されやすい条件です。'}`;
  const advice=`${baseAdvice} ${terrainSceneAdvice(terrain,terrainSolar)}`;
  return {score:combined,label:eveningSceneLabel(combined),sunsetScore:sunScore,sunsetWeatherScore:sunWeatherScore,glowScore,azimuth:az,azimuthLabel:compass16(az),windowStart,windowEnd,temp,apparent,wind,rain,visibility:vis,lowCloud:low,upperCloud:upper,civil,nautical,astro,terrain,terrainSolar,advice};
}
function eveningSceneIcon(){return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 34h38"/><path d="M9 31l10-10 6 7 6-5 8 8"/><path d="M17 25a8 8 0 0 0 14 0"/><path d="M24 8v5M10 18h5M33 18h5"/></svg>';}
function renderEveningScene(o){
  const e=o.eveningScene;if(!e)return '';
  const vis=Number.isFinite(e.visibility)?(e.visibility>=10000?`${(e.visibility/1000).toFixed(0)}km`:`${(e.visibility/1000).toFixed(1)}km`):'--';
  const tone=e.score>=65?'good':e.score>=50?'fair':e.score>=35?'caution':'hard';
  const twilight=[e.civil?`市民薄明 ${timeOnly(e.civil)}`:null,e.nautical?`航海薄明 ${timeOnly(e.nautical)}`:null,e.astro?`天文薄明 ${timeOnly(e.astro)}`:null].filter(Boolean).join(' / ');
  return `<section class="evening-scene-panel ${tone}">
    <div class="evening-scene-head"><div class="evening-scene-title"><div class="evening-scene-symbol">${eveningSceneIcon()}</div><div><small>夕景分析</small><b>${Math.round(e.score)} / 100　${esc(e.label)}</b></div></div><span>ベスト ${formatTimeRange(e.windowStart,e.windowEnd)}</span></div>
    <div class="evening-scene-summary">
      <div><small>日の入り</small><b>${timeOnly(o.sunset)}</b><span>${esc(e.azimuthLabel)} ${Math.round(e.azimuth)}°</span></div>
      <div><small>夕日期待度</small><b>${Math.round(e.sunsetScore)} / 100</b><span>${e.sunsetScore>=65?'見えやすい':e.sunsetScore>=45?'可能性あり':'雲に注意'}</span></div>
      <div><small>夕焼け期待度</small><b>${Math.round(e.glowScore)} / 100</b><span>${e.glowScore>=70?'期待大':e.glowScore>=55?'期待できる':'弱め'}</span></div>
      <div><small>中高層雲</small><b>${Number.isFinite(e.upperCloud)?Math.round(e.upperCloud)+'%':'--'}</b><span>${Number(e.upperCloud)>=25&&Number(e.upperCloud)<=70?'色づき好条件':Number(e.upperCloud)>70?'多め':'少なめ'}</span></div>
    </div>
    ${renderSceneTerrainStrip(e.terrain,e.terrainSolar,'evening')}
    <div class="evening-scene-grid">
      <div><small>西側地平線・雲目安</small><b>${Number.isFinite(e.lowCloud)?Math.round(e.lowCloud)+'%':'--'}</b></div>
      <div><small>視界</small><b>${vis}</b></div>
      <div><small>気温 / 体感</small><b>${num(e.temp,1)}℃ / ${num(e.apparent,1)}℃</b></div>
      <div><small>風 / 降水</small><b>${num(e.wind,1)}m/s / ${num(e.rain,1)}mm/h</b></div>
    </div>
    <div class="evening-scene-twilight"><small>日没後の薄明</small><b>${esc(twilight||'--')}</b></div>
    <div class="evening-scene-advice"><strong>☀ 夕景の見どころ</strong><p>${esc(e.advice)}</p></div>
    <p class="evening-scene-note">※ 夕景分析は気象条件に加え、周辺山岳地形による日の入り方向の遮蔽を評価します。地形標高は Copernicus DEM GLO-90（Open-Meteo、約90m解像度）を使用。「西側地平線・雲目安」は低層雲量の代用値です。建物・樹木・直近の岩壁や局地雲は反映されません。</p>
  </section>`;
}

async function enrichOvernightsWithMilky(items){
  const [airResults,terrainResults]=await Promise.all([
    Promise.all(items.map(async o=>{try{return await fetchAirQualityForPoint(o.point);}catch(_){return null;}})),
    Promise.all(items.map(async o=>{try{return await fetchTerrainHorizonForOvernight(o);}catch(_){return {morning:{available:false,opening:terrainOpening(NaN)},evening:{available:false,opening:terrainOpening(NaN)}};}}))
  ]);
  return items.map((o,i)=>{
    const rows=Array.isArray(o._astroRows)?o._astroRows:[];
    const start=Number(o._darkStart)||new Date(o.sunset).getTime()+90*60000,end=Number(o._darkEnd)||new Date(o.sunrise).getTime()-90*60000;
    const air=airQualitySummary(airResults[i],start,end),light=lightPollutionEstimate(o.point),galactic=galacticCenterDetails(o.point,start,end);
    let best=null,bestDetail=null;
    for(const row of rows){const d=milkyDetailedScore(row,o.point,o.moon,galactic,air,light);if(!bestDetail||d.score>bestDetail.score){best=row;bestDetail=d;}}
    const score=bestDetail?bestDetail.score:0;
    const moon=moonNightDetails(o.point,o.sunset,o.sunrise,o.moon,best?.time||galactic?.peakTime);
    const goodRows=rows.filter(row=>milkyDetailedScore(row,o.point,o.moon,galactic,air,light).score>=Math.max(55,score-8));
    const windowStart=goodRows[0]?.time||galactic?.visibleStart||best?.time||null,windowEnd=goodRows[goodRows.length-1]?.time||galactic?.visibleEnd||best?.time||null;
    const milky={score,best,bestDetail,galactic,moon,air,light,windowStart,windowEnd,advice:null};milky.advice=milkyAdvice(milky);
    const cloudSea=buildCloudSeaAnalysis(o);
    const terrain=terrainResults[i]||{};
    const morningScene=buildMorningScene({...o,cloudSea},terrain.morning);
    const eveningScene=buildEveningScene(o,terrain.evening);
    const clean={...o,best,score,milkyLabel:milkyLabelFromScore(score),milky,cloudSea,morningScene,eveningScene,terrain};delete clean._astroRows;delete clean._morningRows;delete clean._eveningRows;delete clean._darkStart;delete clean._darkEnd;return clean;
  });
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
function overnightIcon(name){
  const common='viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  const paths={
    sunset:'<circle cx="24" cy="18" r="7"/><path d="M7 32h34M12 27h24M24 4v5M8 18h5M35 18h5M12.5 8.5l3.5 3.5M32 12l3.5-3.5"/>',
    sunrise:'<path d="M7 32h34M12 27h24"/><path d="M17 27a7 7 0 0 1 14 0"/><path d="M24 8v6M10 20h5M33 20h5M14 11l4 4M30 15l4-4"/>',
    milky:'<path d="M10 35c8-11 15-15 28-22"/><path d="M12 29c9-8 16-11 26-15"/><path d="M11 14l1.5 3.5L16 19l-3.5 1.5L11 24l-1.5-3.5L6 19l3.5-1.5L11 14zM35 27l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z"/>',
    clock:'<circle cx="24" cy="24" r="17"/><path d="M24 14v11l8 5"/>',
    thermometer:'<path d="M20 9a4 4 0 0 1 8 0v20.5a8 8 0 1 1-8 0V9z"/><path d="M24 15v19"/>',
    wind:'<path d="M5 17h24c5 0 5-8 0-8-3 0-4 2-4 4M5 25h31c6 0 6 10 0 10-3 0-5-2-5-4M5 33h17"/>',
    rain:'<path d="M14 28h20a8 8 0 0 0 0-16 11 11 0 0 0-21 3 7 7 0 0 0 1 13z"/><path d="M17 34l-2 5M25 34l-2 5M33 34l-2 5"/>',
    cloud:'<path d="M10 32h27a8 8 0 0 0 0-16 11 11 0 0 0-21 3 7 7 0 0 0-6 13z"/>',
    fog:'<path d="M9 16h27M5 24h31M10 32h27M18 40h17"/>',
    moon:'<path d="M34 32A15 15 0 1 1 21 8a14 14 0 0 0 13 24z"/><path d="M36 9l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/>',
    shield:'<path d="M24 5l15 6v11c0 10-6 17-15 21C15 39 9 32 9 22V11l15-6z"/><path d="M17 24l5 5 10-11"/>'
  };
  return `<svg ${common}>${paths[name]||paths.cloud}</svg>`;
}
function overnightDawnIcon(dawn){
  const cls=(dawn&&dawn.cls)||'';
  const rain=Number(dawn&&dawn.rain);
  const cloud=Number(dawn&&dawn.cloud);
  if(Number.isFinite(rain)&&rain>=0.5)return 'rain';
  if(cls==='rainy')return 'rain';
  if(cls==='cloudy')return 'cloud';
  if(Number.isFinite(cloud)&&cloud>=75)return 'cloud';
  return 'sunrise';
}

function formatOvernightDate(dateStr){
  if(!dateStr)return '';
  const d=new Date(`${dateStr}T00:00:00+09:00`);
  const wd=['日','月','火','水','木','金','土'];
  return Number.isNaN(d.getTime())?dateStr:`${dateStr}（${wd[d.getDay()]}）`;
}
function overnightComfort(o){
  let score=5;
  if(Number.isFinite(o.minApp)&&o.minApp<=0)score-=2; else if(Number.isFinite(o.minApp)&&o.minApp<=5)score-=1;
  if(Number.isFinite(o.maxWind)&&o.maxWind>=12)score-=2; else if(Number.isFinite(o.maxWind)&&o.maxWind>=8)score-=1;
  if(Number.isFinite(o.maxRain)&&o.maxRain>=4)score-=2; else if(Number.isFinite(o.maxRain)&&o.maxRain>=1)score-=1;
  if(o.fogRisk==='高')score-=1;
  score=Math.max(1,Math.min(5,score));
  return {score,label:score>=5?'かなり快適':score>=4?'比較的快適':score>=3?'注意':score>=2?'やや厳しい':'厳しい',note:score>=4?'大きな荒れは少ない見込みです。':score>=3?'防寒と天候変化に注意。':'防寒と風雨への備えを強めてください。'};
}
function overnightStars(score){return Array.from({length:5},(_,i)=>`<span class="${i<score?'on':''}">★</span>`).join('');}
function overnightMetric(icon,label,value,sub='',tone='blue'){
  return `<div class="overnight-v2-metric tone-${tone}"><div class="metric-icon">${overnightIcon(icon)}</div><div><small>${esc(label)}</small><b>${value}</b>${sub?`<em>${esc(sub)}</em>`:''}</div></div>`;
}


function milkyDetailIcon(kind){
  if(kind==='galaxy')return overnightIcon('milky');
  if(kind==='moon')return overnightIcon('moon');
  if(kind==='air')return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 18h23c6 0 6-9 0-9-4 0-5 2-5 5M6 26h31c6 0 6 9 0 9-4 0-5-2-5-5M6 34h18"/></svg>';
  if(kind==='light')return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M17 31h14M19 36h10M20 40h8"/><path d="M15 21a9 9 0 1 1 18 0c0 5-4 7-6 10h-6c-2-3-6-5-6-10z"/><path d="M24 4v4M8 21H4M44 21h-4M11 8l3 3M37 8l-3 3"/></svg>';
  return overnightIcon('cloud');
}
function milkySceneIcon(){return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 33c3-8 11-13 20-13 4 0 7 1 10 3-3 0-6 2-7 5 0 2 1 4 3 5H8z"/><path d="M31 12l1.2 2.8L35 16l-2.8 1.2L31 20l-1.2-2.8L27 16l2.8-1.2L31 12z"/><path d="M15 11l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9.9-2z"/><path d="M22 7l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7L22 7z"/></svg>';}
function renderMilkyDetail(o){
  const m=o.milky;if(!m)return '';
  const moon=m.moon||{},air=m.air||{},light=m.light||{},g=m.galactic||{};
  const moonEvent=moon.allBelow?'夜間は月なし':moon.allAbove?'一晩中月あり':moon.set?`月没 ${timeOnly(moon.set)}`:moon.rise?`月出 ${timeOnly(moon.rise)}`:'月の出入りなし';
  const airSub=air.available?`PM2.5 ${num(air.pm25,1)} μg/m³${Number.isFinite(air.aod)?` / AOD ${num(air.aod,2)}`:''}`:'空気質APIを取得できませんでした';
  const near=light.nearest?`${light.nearest.name} 約${Math.round(light.nearest.km)}km`:'周辺市街地から推定';
  return `<section class="milky-detail-panel">
    <div class="milky-detail-head"><div class="milky-detail-title"><div class="milky-detail-symbol">${milkySceneIcon()}</div><div><small>星空・天の川分析</small><b>${Math.round(m.score)} / 100　${esc(o.milkyLabel)}</b></div></div><span><em>見頃時間</em>${formatTimeRange(m.windowStart,m.windowEnd)}</span></div>
    <div class="milky-detail-summary">
      <div><small>天の川スコア</small><b>${Math.round(m.score)} / 100</b><span>${esc(o.milkyLabel)}</span></div>
      <div><small>おすすめ時間帯</small><b>${formatTimeRange(m.windowStart,m.windowEnd)}</b><span>${Number.isFinite(g.maxAltitude)?`銀河中心が高い時間帯`:'観察条件が良い時間帯'}</span></div>
      <div><small>月明かり</small><b>${esc(moon.impact||'判定不可')}</b><span>${esc(o.moon.phase)} ${Math.round(o.moon.illum)}% / ${moonEvent}</span></div>
    </div>
    <div class="milky-detail-grid">
      <div class="milky-detail-card tone-purple"><div class="milky-detail-icon">${milkyDetailIcon('galaxy')}</div><div><small>天頂に近づく時刻</small><b>${timeOnly(g.peakTime)}</b><span>最大高度 ${Number.isFinite(g.maxAltitude)?Math.round(g.maxAltitude)+'°':'--'}</span></div></div>
      <div class="milky-detail-card tone-air"><div class="milky-detail-icon">${milkyDetailIcon('air')}</div><div><small>空気質・透明度</small><b>${esc(air.label||'取得不可')}</b><span>${esc(airSub)}</span></div></div>
      <div class="milky-detail-card tone-light"><div class="milky-detail-icon">${milkyDetailIcon('light')}</div><div><small>光害目安</small><b>${esc(light.label||'判定不可')}</b><span>${esc(near)} / 簡易推定</span></div></div>
    </div>
    <div class="milky-detail-advice"><span>✦</span><p><b>観察の目安</b>${esc(m.advice||'')}</p></div>
    <p class="milky-detail-note">※ 天の川スコアは、雲・雨、銀河中心の高度、月明かり、空気質、光害目安を組み合わせた観察条件の総合評価です。光害は周辺市街地等からの簡易推定で、地形遮蔽や局地雲は反映しません。</p>
  </section>`;
}

function renderOvernights(items){
  const section=$('overnightSection');
  if(!items.length){section.classList.add('hidden');$('overnightCards').innerHTML='';return;}
  section.classList.remove('hidden');
  $('overnightCards').innerHTML=items.map(o=>{
    const dawn=o.dawn||{};
    const comfort=overnightComfort(o);
    const dawnIcon=overnightDawnIcon(dawn);
    return `<article class="overnight-card overnight-v2">
      <div class="overnight-v2-head">
        <span class="night-badge">${o.nightNo}泊目</span>
        <div class="overnight-v2-place"><div class="hut-mark">⌂</div><div><h3>${esc(o.point.name)}</h3><p>${formatOvernightDate(o.point.date)} / 標高 ${Math.round(o.point.elevation||0).toLocaleString('ja-JP')}m${o.source?` ・ ${esc(o.source)}`:''}</p></div></div>
      </div>
      ${renderEveningScene(o)}
      ${renderMilkyDetail(o)}
      ${renderMorningScene(o)}
      <div class="overnight-dawn-strip-v69 ${esc(dawn.cls||'partly')}">
        <div class="ods69-icon">${overnightIcon(dawnIcon)}</div>
        <div class="ods69-item ods69-main"><small>朝5時の空</small><b>${timeOnly(dawn.time)||'05:00'}</b></div>
        <div class="ods69-item"><small>天気</small><b>${esc(dawn.label||'--')}</b></div>
        <div class="ods69-item"><small>気温</small><b>${num(dawn.temp,1)}℃</b></div>
        <div class="ods69-item"><small>風</small><b>${num(dawn.wind,1)}m/s</b></div>
        <div class="ods69-item"><small>雨</small><b>${num(dawn.rain,1)}mm/h</b></div>
      </div>
      <div class="overnight-v2-metrics">
        ${overnightMetric('thermometer','到着時気温',`${num(o.arrivalTemp)}℃`,`${o.point.time||'--:--'} 到着`,'green')}
        ${overnightMetric('thermometer','翌朝最低気温',`${num(o.morningMinTemp)}℃`,'0:00〜8:00','blue')}
        ${overnightMetric('moon','夜間最低気温',`${num(o.minTemp)}℃`,'','purple')}
        ${overnightMetric('thermometer','最低体感温度',`${num(o.minApp)}℃`,'','green')}
        ${overnightMetric('wind','最大風速',`${num(o.maxWind)}m/s`,`平均 ${num(o.avgWind,1)}m/s`,'blue')}
        ${overnightMetric('wind','最大突風',`${num(o.maxGust)}m/s`,'','blue')}
        ${overnightMetric('rain','夜間降水量',`${num(o.maxRain)}mm/h`,'','blue')}
        ${overnightMetric('cloud','平均雲量',`${num(o.avgCloud,0)}%`,'','blue')}
        ${overnightMetric('fog','ガス・霧',esc(o.fogRisk),'','blue')}
        ${overnightMetric('moon','月明かり',`${esc(o.moon.phase)} ${Math.round(o.moon.illum)}%`,'','purple')}
      </div>
      <div class="overnight-v2-footer solo">
        <div class="comfort-box"><div class="footer-icon">${overnightIcon('shield')}</div><div><small>総合快適度（到着〜翌朝）</small><div class="comfort-stars">${overnightStars(comfort.score)}</div><b>${comfort.label}</b><p>${comfort.note}</p></div></div>
      </div>
    </article>`;
  }).join('');
}

function nearestTimeIndex(times,target){const t=new Date(target).getTime();let best=-1,d=Infinity;times.forEach((s,i)=>{const x=Math.abs(new Date(s).getTime()-t);if(x<d){d=x;best=i;}});return best;}
function numberOrNaN(v){const n=Number(v);return Number.isFinite(n)?n:NaN;}
function mean(v){const x=v.filter(Number.isFinite);return x.length?x.reduce((a,b)=>a+b,0)/x.length:NaN;} function max(v){const x=v.filter(Number.isFinite);return x.length?Math.max(...x):NaN;}
function averageRows(rows){return {temp:mean(rows.map(x=>x.temp)),rain:mean(rows.map(x=>x.rain)),cloud:mean(rows.map(x=>x.cloud)),wind:mean(rows.map(x=>x.wind)),gust:max(rows.map(x=>x.gust)),cape:max(rows.map(x=>x.cape)),visibility:mean(rows.map(x=>x.visibility)),freezing:mean(rows.map(x=>x.freezing))};}
function assessGrade(x){let s=0;if(x.wind>=20||x.gust>=25)s+=4;else if(x.wind>=15||x.gust>=20)s+=3;else if(x.wind>=10||x.gust>=15)s+=2;else if(x.wind>=7)s+=1;if(x.rain>=8)s+=4;else if(x.rain>=4)s+=3;else if(x.rain>=1.5)s+=2;else if(x.rain>=.3)s+=1;if(x.cape>=1000)s+=3;else if(x.cape>=500)s+=2;else if(x.cape>=200)s+=1;if(x.cloud>=95)s+=1;if(Number.isFinite(x.visibility)&&x.visibility<500)s+=2;if(x.temp<=-5)s+=2;else if(x.temp<=0)s+=1;return s>=8?'E':s>=6?'D':s>=4?'C':s>=2?'B':'A';}
function thunderLevel(x){if(x.cape>=1000&&x.rain>=1)return'EXTREME';if(x.cape>=500||(x.cape>=200&&x.rain>=1))return'HIGH';if(x.cape>=100||x.rain>=2)return'MEDIUM';return'LOW';}
const HAZARD_RANK={NONE:0,CAUTION:1,WARNING:2,DANGER:3};
const HAZARD_LABEL={NONE:'平常',CAUTION:'注意',WARNING:'警戒',DANGER:'危険'};
function hazardItem(type,icon,label,level,value,detail){return {type,icon,label,level,value,detail,rank:HAZARD_RANK[level]||0};}
function assessHazards(x){
  const thunder=thunderLevel(x);
  const thunderLv=thunder==='EXTREME'?'DANGER':thunder==='HIGH'?'WARNING':thunder==='MEDIUM'?'CAUTION':'NONE';
  const windLv=(x.wind>=20||x.gust>=25)?'DANGER':(x.wind>=15||x.gust>=20)?'WARNING':(x.wind>=10||x.gust>=15)?'CAUTION':'NONE';
  const rainLv=x.rain>=8?'DANGER':x.rain>=4?'WARNING':x.rain>=1.5?'CAUTION':'NONE';
  let tempLv='NONE',tempDetail='';
  if(Number.isFinite(x.temp)){
    if(x.temp<=-10){tempLv='DANGER';tempDetail='厳しい低温';}
    else if(x.temp<=-5){tempLv='WARNING';tempDetail='低温';}
    else if(x.temp<=0){tempLv='CAUTION';tempDetail='氷点下';}
    else if(x.temp>=35){tempLv='DANGER';tempDetail='極端な高温';}
    else if(x.temp>=32){tempLv='WARNING';tempDetail='高温';}
    else if(x.temp>=30){tempLv='CAUTION';tempDetail='暑熱';}
  }
  const visLv=!Number.isFinite(x.visibility)?'NONE':x.visibility<500?'DANGER':x.visibility<1000?'WARNING':x.visibility<3000?'CAUTION':'NONE';
  return [
    hazardItem('thunder','⚡','雷',thunderLv,thunder,thunderLv==='NONE'?'顕著な雷リスクなし':`雷リスク ${thunder}`),
    hazardItem('wind','💨','風',windLv,`${num(x.wind)}m/s`,Number.isFinite(x.gust)?`平均 ${num(x.wind)}m/s・突風 ${num(x.gust)}m/s`:`平均 ${num(x.wind)}m/s`),
    hazardItem('rain','🌧️','雨',rainLv,`${num(x.rain)}mm/h`,`時間降水量 ${num(x.rain)}mm/h`),
    hazardItem('temp',tempLv==='NONE'?'🌡️':x.temp<=0?'🥶':'🥵','気温',tempLv,`${num(x.temp)}℃`,tempDetail||`気温 ${num(x.temp)}℃`),
    hazardItem('visibility','🌫️','視界',visLv,Number.isFinite(x.visibility)?`${Math.round(x.visibility)}m`:'–',Number.isFinite(x.visibility)?`予報視程 ${Math.round(x.visibility)}m`:'視程データなし')
  ];
}
function maxHazard(hazards){return (hazards||[]).reduce((a,b)=>(b.rank||0)>(a.rank||0)?b:a,hazardItem('none','✓','顕著な注意要素なし','NONE','', ''));}
function hazardBadge(h){if(!h||h.level==='NONE')return '';return `<span class="hazard-badge ${String(h.level).toLowerCase()}">${h.icon} ${h.label} ${HAZARD_LABEL[h.level]}</span>`;}
function hazardMetricClass(h){return h&&h.level!=='NONE'?` hazard-${String(h.level).toLowerCase()}`:'';}
function renderRouteAlerts(points){
  const el=$('routeAlerts');if(!el)return;
  const active=[];
  points.forEach((r,i)=>(r.hazards||[]).filter(h=>h.level!=='NONE').forEach(h=>active.push({...h,point:r.point,index:i,grade:r.grade})));
  active.sort((a,b)=>b.rank-a.rank||gradeRank(b.grade)-gradeRank(a.grade)||a.index-b.index);
  if(!active.length){el.innerHTML='<div class="route-alerts clear"><div class="route-alert-title"><span>✓</span><div><b>顕著な気象注意要素なし</b><small>設定した通過時刻の予報値では、5系統の警戒基準に達していません。</small></div></div></div>';return;}
  const top=active[0], maxRank=top.rank;
  const topLevel=maxRank>=3?'danger':maxRank>=2?'warning':'caution';
  const chips=active.slice(0,8).map(h=>`<span class="route-alert-chip ${String(h.level).toLowerCase()}"><b>${h.icon} ${esc(h.label)}</b><span>${esc(h.point.time||'')} ${esc(h.point.name)}</span><small>${esc(h.detail)}</small></span>`).join('');
  el.innerHTML=`<div class="route-alerts ${topLevel}"><div class="route-alert-title"><span>${top.icon}</span><div><small>今回の最大リスク</small><b>${esc(top.point.time||'')} ${esc(top.point.name)}｜${esc(top.label)} ${HAZARD_LABEL[top.level]}</b><em>${esc(top.detail)}</em></div></div><div class="route-alert-chips">${chips}</div><p>※ 気象予報値から機械的に抽出した注意情報です。登山可否を保証・断定するものではありません。</p></div>`;
}
function routeCommentaryData(points){
  const active=[];
  points.forEach((r,i)=>(r.hazards||[]).filter(h=>h.level!=='NONE').forEach(h=>active.push({...h,point:r.point,index:i,grade:r.grade})));
  active.sort((a,b)=>b.rank-a.rank||gradeRank(b.grade)-gradeRank(a.grade)||a.index-b.index);
  const worst=points.reduce((a,b)=>gradeRank(b.grade)>gradeRank(a.grade)?b:a,points[0]);
  const confidence=overallConfidence(points.map(x=>x.confidence));
  const half=Math.max(1,Math.ceil(points.length/2));
  const first=active.filter(h=>h.index<half);
  const second=active.filter(h=>h.index>=half);
  const maxRank=list=>list.reduce((m,h)=>Math.max(m,h.rank||0),0);
  return {active,worst,confidence,firstRank:maxRank(first),secondRank:maxRank(second)};
}
function buildDecisionCommentary(points){
  if(!Array.isArray(points)||!points.length)return {tone:'clear',title:'解説',body:'分析結果がありません。'};
  const {active,worst,confidence,firstRank,secondRank}=routeCommentaryData(points);
  const grade=worst.grade;
  const tone=grade==='E'||grade==='D'?'danger':grade==='C'?'warning':grade==='B'?'caution':'clear';
  const intro={
    A:'設定した通過時刻では、ルート全体に大きな気象リスクは見当たりません。',
    B:'全体としては比較的安定していますが、一部の地点・時間帯に注意要素があります。',
    C:'ルート上に無視しにくい注意要素があり、通過時刻を含めて慎重に見たい状況です。',
    D:'ルート上に強い気象リスクがあり、現計画のままでは厳しい条件が含まれます。',
    E:'ルート上に非常に強い気象リスクがあり、現計画は大きな見直しが必要な条件です。'
  }[grade]||'ルート全体の気象条件を確認してください。';
  const parts=[intro];
  if(active.length){
    const top=active[0];
    parts.push(`最大の注意点は ${top.point.time||''} ${top.point.name} の「${top.label}」で、${top.detail}です。`);
    const distinct=[...new Set(active.filter(h=>h.rank>=2).map(h=>h.label))];
    if(distinct.length>=2)parts.push(`特に ${distinct.slice(0,3).join('・')} が重なる地点では、複合的に条件が悪化する可能性があります。`);
  }else{
    parts.push('5系統の警戒基準に達する地点はありませんが、山岳では局地的な変化があるため現地状況の確認は必要です。');
  }
  if(secondRank>firstRank&&secondRank>=1){
    parts.push('ルート後半ほど注意要素が強くなる傾向です。可能であれば早めの行動開始で、悪化する時間帯を避けられる余地があります。');
  }else if(firstRank>secondRank&&firstRank>=2){
    parts.push('前半に強い注意要素が集中しています。出発直後から条件を確認し、改善を待つ選択肢も含めて判断してください。');
  }else if(active.length){
    parts.push('注意要素は特定の時間帯だけでなくルート中に分散しているため、通過地点ごとの変化を追うのが重要です。');
  }
  if(confidence==='LOW')parts.push('なお、気象モデル間の差が大きいため予報の不確実性も高めです。直前の再分析をおすすめします。');
  else if(confidence==='MEDIUM')parts.push('モデル間には一定のばらつきがあるため、出発前に最新予報を再確認してください。');
  return {tone,title:'この計画の解説',body:parts.join(' ')};
}
function renderDecisionCommentary(points){
  const el=$('decisionCommentary');
  if(!el)return;
  const c=buildDecisionCommentary(points);
  const {active}=routeCommentaryData(points); const top=active[0];
  const highlight=top?`<div class="decision-highlight"><span>⚡</span><div><b>${esc(top.label)}リスク ${HAZARD_LABEL[top.level]||top.level}</b><strong>${esc(top.point.time||'')} ${esc(top.point.name)} が最大の注意点</strong></div></div>`:'';
  el.className=`decision-commentary ${c.tone}`;
  el.innerHTML=`<div class="decision-commentary-icon"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 9h30v22H22l-9 8v-8H9Z"/><path d="M17 20h2m5 0h2m5 0h2"/></svg></div><div class="decision-commentary-copy"><small>分析結果から自動生成</small><b>${esc(c.title)}</b>${highlight}<p>${esc(c.body)}</p><em>✓ 最新の予報をもとに自動生成した解説です。登山可否を保証するものではありません。</em></div>`;
}
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
  return `<article class="chart-card featured"><div class="chart-head"><div><h3>風・降水</h3></div><div class="chart-legend"><span class="chart-legend-item rain">降水量</span><span class="chart-legend-item s0">風速</span><span class="chart-legend-item gust">突風</span></div></div>${chartKpis([{label:'最大降水',value:`${num(max(points.map(p=>p.rain)))} mm/h`},{label:'最大風速',value:`${num(max(points.map(p=>p.wind)))} m/s`},{label:'最大突風',value:`${num(max(points.map(p=>p.gust)))} m/s`}])}<div class="chart-canvas dual"><div class="chart-scale top left">風 ${num(windMax)}m/s</div><div class="chart-scale top right">雨 ${num(rainMax)}mm/h</div><div class="chart-scale bottom left">0</div><div class="chart-scale bottom right">0</div><svg class="chart-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="風と降水の複合グラフ"><defs><linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#91d1ff"/><stop offset="100%" stop-color="#4aa5ff"/></linearGradient></defs>${gridLines(w,h,left,right,top,bottom,4)}<line class="chart-axis" x1="${left}" y1="${h-bottom}" x2="${w-right}" y2="${h-bottom}"/>${bars}${buildLine('wind','s0','風速')}${buildLine('gust','gust','突風')}${xTicks}</svg></div>${pointLegend(points)}</article>`;
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
  return `<article class="chart-card featured"><div class="chart-head"><div><h3>気温・雲量</h3></div><div class="chart-legend"><span class="chart-legend-item temp">気温</span><span class="chart-legend-item cloud">雲量</span></div></div>${chartKpis([{label:'最低気温',value:`${num(Math.min(...temps))}℃`},{label:'最高気温',value:`${num(Math.max(...temps))}℃`},{label:'平均雲量',value:`${num(avgCloud,0)}%`}])}<div class="chart-canvas temp-cloud"><div class="chart-scale top left">気温 ${num(tMax)}℃</div><div class="chart-scale top right">雲 100%</div><div class="chart-scale bottom left">${num(tMin)}℃</div><div class="chart-scale bottom right">0%</div><svg class="chart-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="気温と雲量の複合グラフ"><defs><linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c3cbd3" stop-opacity=".78"/><stop offset="100%" stop-color="#8f9aa6" stop-opacity=".36"/></linearGradient></defs>${gridLines(w,h,left,right,top,bottom,4)}<line class="chart-axis" x1="${left}" y1="${h-bottom}" x2="${w-right}" y2="${h-bottom}"/>${bars}${line}${xTicks}</svg></div>${pointLegend(points)}</article>`;
}
function renderWeatherCharts(points){
  const el=$('weatherCharts'); if(!el)return;
  el.innerHTML=[renderImpactChart(points),renderTempCloudChart(points)].join('');
  const ribbon=$('riskRibbon'); if(ribbon)ribbon.innerHTML=`<div class="risk-ribbon-head"><b>地点別リスク</b><small>番号はグラフのポイント番号と対応しています</small></div><div class="risk-ribbon-track">${points.map((p,i)=>`<div class="risk-stop g-${p.grade}"><span>${String(i+1).padStart(2,'0')}</span><b>${p.grade}</b><small>${esc(p.point.name)}</small><em>${esc(p.point.time||'')}</em></div>`).join('')}</div>`;
}

function routeTypeBadgeLabel(type){return TYPE_LABEL[type]||'地点';}
function routePointDateTime(point){
  const date=String(point?.date||'').trim();
  const time=String(point?.time||'').trim();
  if(date&&time)return `${date} ${time}`;
  return date||time||'日時未設定';
}
function routePointBase(source){return source&&source.point?source.point:source;}
function normalizeRouteMapPoint(source,index){
  const point=routePointBase(source);
  if(!point)return null;
  const lat=Number(point.lat), lon=Number(point.lon);
  if(!Number.isFinite(lat)||!Number.isFinite(lon))return null;
  return {...point,lat,lon,order:index+1};
}
function collectRouteMapPointsFromForm(){
  const rows=[...($('points')?.children||[])];
  return rows.map((row,index)=>{
    const candidate=selectedCandidate(row.querySelector('.point-select')?.value);
    if(!candidate||!hasResolvedCoord(candidate))return null;
    return normalizeRouteMapPoint({
      ...candidate,
      type:row.querySelector('.point-type')?.value||candidate.type||'peak',
      date:row.querySelector('.point-date')?.value||'',
      time:row.querySelector('.point-time')?.value||'',
      stay:!!row.querySelector('.point-stay')?.checked,
      role:row.dataset.role||''
    },index);
  }).filter(Boolean);
}
function routePointTypeIcon(type){
  if(type==='peak')return '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 31 16 12l6 9 4-5 10 15H4z"/><path d="m13 17 3-5 3 5"/></svg>';
  if(type==='hut')return '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 17 20 7l14 10v16H6V17z"/><path d="M15 33V22h10v11"/><path d="M20 18v4"/></svg>';
  return '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 31h26"/><path d="m9 30 8-14 5 7 4-5 6 12"/><circle cx="10" cy="10" r="3"/><path d="m12 13 5 4-3 6m3-6 5-2"/></svg>';
}
function routePointDateParts(point){
  const date=String(point?.date||'').trim();
  const time=String(point?.time||'').trim();
  if(!date&&!time)return {date:'日時未設定',time:''};
  return {date:date||'日付未設定',time:time||'時刻未設定'};
}
function routeMapListHtml(points){
  const head=`<div class="route-point-list-head"><div><span class="route-list-pin" aria-hidden="true">⌖</span><strong>通過ポイント</strong></div><b>${String(points.length).padStart(2,'0')} <small>ポイント</small></b></div>`;
  const rows=points.map((point,index)=>{
    const type=point.type||'peak',dt=routePointDateParts(point),last=index===points.length-1;
    return `<article class="route-point-pill type-${esc(type)}${last?' is-last':''}">
      <div class="route-point-rail" aria-hidden="true"><span class="route-point-dot"></span></div>
      <div class="route-point-no">${String(point.order).padStart(2,'0')}</div>
      <div class="route-point-type-icon">${routePointTypeIcon(type)}</div>
      <div class="route-point-copy"><strong>${esc(point.name||'地点')}</strong><small>${esc(routeTypeBadgeLabel(type))}${point.stay?' ・ 宿泊':''}</small></div>
      <div class="route-point-datetime"><span class="route-date-icon" aria-hidden="true">▦</span><div><b>${esc(dt.date)}</b><small>${esc(dt.time)}</small></div></div>
      <span class="route-point-chevron" aria-hidden="true">›</span>
    </article>`;
  }).join('');
  return head+`<div class="route-point-timeline">${rows}</div>`;
}
function routeMapPopupHtml(point){
  const role=point.role?`<div>${esc(point.role)}</div>`:'';
  const stay=point.stay?'<div>宿泊地点</div>':'';
  return `<div class="route-popup"><strong>${String(point.order).padStart(2,'0')} / ${esc(point.name||'地点')}</strong><div>${esc(routeTypeBadgeLabel(point.type))}</div><div>${esc(routePointDateTime(point))}</div>${role}${stay}</div>`;
}
function routeMapIcon(point){
  if(!window.L)return null;
  return L.divIcon({
    className:'route-map-marker-wrap',
    html:`<div class="route-map-marker type-${esc(point.type||'peak')}"><span>${String(point.order).padStart(2,'0')}</span></div>`,
    iconSize:[34,34],
    iconAnchor:[17,17],
    popupAnchor:[0,-18]
  });
}
function ensureRouteMap(mapId){
  if(!window.L)return null;
  const host=$(mapId);
  if(!host)return null;
  let state=routeMapViews[mapId];
  if(state)return state;
  const map=L.map(host,{zoomControl:false,scrollWheelZoom:false,attributionControl:true});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:18,
    attribution:'&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.control.zoom({position:'bottomright'}).addTo(map);
  state={map,markers:L.layerGroup().addTo(map),lines:L.layerGroup().addTo(map)};
  routeMapViews[mapId]=state;
  return state;
}
function invalidateRouteMap(state,callback=null){
  if(!state?.map)return;
  requestAnimationFrame(()=>{
    try{state.map.invalidateSize({pan:false,animate:false});}catch(_){}
    requestAnimationFrame(()=>{if(typeof callback==='function')callback();});
  });
}
const MOBILE_ROUTE_MAP_INITIAL_ZOOM=13;
function fitRouteMapToPoints(state,latlngs){
  if(!state?.map||!latlngs.length)return;
  try{
    if(latlngs.length===1){
      state.map.setView(latlngs[0],MOBILE_ROUTE_MAP_INITIAL_ZOOM,{animate:false});
      return;
    }
    const bounds=L.latLngBounds(latlngs);
    if(window.matchMedia?.('(max-width: 900px)')?.matches){
      // Smartphone: keep a consistent, close initial scale like the route-map reference image.
      // Users can still zoom with the +/- controls afterwards.
      state.map.setView(bounds.getCenter(),MOBILE_ROUTE_MAP_INITIAL_ZOOM,{animate:false});
      return;
    }
    state.map.fitBounds(bounds,{padding:[28,28],maxZoom:13,animate:false});
  }catch(_){}
}
function renderSingleRouteMap({mapId,emptyId,listId},points){
  const emptyEl=$(emptyId), mapEl=$(mapId), listEl=$(listId);
  if(listEl)listEl.innerHTML=points.length?routeMapListHtml(points):'';
  if(!mapEl)return;

  // Leaflet must measure the map after the element is visible. Initializing it
  // while .hidden is applied can leave the first view at world-map scale.
  if(!points.length){
    mapEl.classList.add('hidden');
    if(emptyEl)emptyEl.classList.remove('hidden');
    const existing=routeMapViews[mapId];
    if(existing){existing.markers.clearLayers();existing.lines.clearLayers();}
    return;
  }

  mapEl.classList.remove('hidden');
  if(emptyEl)emptyEl.classList.add('hidden');
  const state=ensureRouteMap(mapId);
  if(!state){
    mapEl.classList.add('hidden');
    if(emptyEl){emptyEl.classList.remove('hidden');emptyEl.textContent='地図ライブラリを読み込めなかったため、地点一覧のみ表示しています。';}
    return;
  }

  state.markers.clearLayers();
  state.lines.clearLayers();
  const latlngs=points.map(point=>[point.lat,point.lon]);
  if(points.length>=2){
    L.polyline(latlngs,{color:'#1f7fbd',weight:4,opacity:.95}).addTo(state.lines);
  }
  points.forEach(point=>{
    const marker=L.marker([point.lat,point.lon],{icon:routeMapIcon(point)}).addTo(state.markers);
    marker.bindPopup(routeMapPopupHtml(point));
  });
  invalidateRouteMap(state,()=>fitRouteMapToPoints(state,latlngs));
}
function renderRouteMaps(points=null){
  const normalized=(Array.isArray(points)?points:collectRouteMapPointsFromForm())
    .map((source,index)=>normalizeRouteMapPoint(source,index))
    .filter(Boolean);
  const configs=[
    {mapId:'routeMapPreview',emptyId:'routeMapPreviewEmpty',listId:'routeMapPreviewList'},
    {mapId:'routeMapResults',emptyId:'routeMapResultsEmpty',listId:'routeMapResultsList'}
  ];
  configs.forEach(config=>renderSingleRouteMap(config,normalized));
}

function thunderBadge(level){
  const lv=String(level||'LOW').toUpperCase();
  if(lv==='EXTREME')return `<span class="thunder-badge extreme">⚡⚡ EXTREME</span>`;
  if(lv==='HIGH')return `<span class="thunder-badge high">⚡ HIGH</span>`;
  if(lv==='MEDIUM')return `<span class="thunder-badge medium">⚡ MEDIUM</span>`;
  return `<span class="thunder-badge low">LOW</span>`;
}
function weatherIconSvg(kind){
  const common='viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  const icons={
    sun:'<circle cx="24" cy="24" r="7.5"/><path d="M24 4.5v6M24 37.5v6M4.5 24h6M37.5 24h6M10.2 10.2l4.3 4.3M33.5 33.5l4.3 4.3M37.8 10.2l-4.3 4.3M14.5 33.5l-4.3 4.3"/>',
    partly:'<circle cx="18" cy="17" r="7"/><path d="M18 3v5M18 26v4M4 17h5M27 17h5M8.5 7.5l3.5 3.5M28 7.5l-3.5 3.5"/><path d="M14 38h23a7 7 0 0 0 0-14 10 10 0 0 0-19-2 7 7 0 0 0-4 16z"/>',
    cloud:'<path d="M10 36h27a8 8 0 0 0 0-16 11 11 0 0 0-21 3 7 7 0 0 0-6 13z"/>',
    shower:'<path d="M10 31h27a8 8 0 0 0 0-16 11 11 0 0 0-21 3 7 7 0 0 0-6 13z"/><path d="M17 36l-2 5M26 36l-2 5M35 36l-2 5"/>',
    rain:'<path d="M10 29h27a8 8 0 0 0 0-16 11 11 0 0 0-21 3 7 7 0 0 0-6 13z"/><path d="M15 34l-3 8M24 34l-3 8M33 34l-3 8M40 34l-3 8"/>',
    unknown:'<circle cx="24" cy="24" r="17"/><path d="M19 18a6 6 0 1 1 8 5.7c-2 .9-3 2.1-3 4.3M24 35h.01"/>'
  };
  return `<svg ${common}>${icons[kind]||icons.unknown}</svg>`;
}
function weatherVisual(r){
  const cloud=Number.isFinite(r.cloud)?r.cloud:NaN;
  const rain=Number.isFinite(r.rain)?r.rain:NaN;
  let kind='unknown',label='予報値';
  if(Number.isFinite(rain)&&rain>=3){kind='rain';label='雨';}
  else if(Number.isFinite(rain)&&rain>=0.5){kind='shower';label=(Number.isFinite(cloud)&&cloud>=70)?'雨時々くもり':'にわか雨';}
  else if(Number.isFinite(cloud)&&cloud>=85){kind='cloud';label='くもり';}
  else if(Number.isFinite(cloud)&&cloud>=55){kind='partly';label='晴れ時々くもり';}
  else if(Number.isFinite(cloud)||Number.isFinite(rain)){kind='sun';label='晴れ';}
  return {icon:weatherIconSvg(kind),label,cls:kind};
}
function windDirectionLabel(deg){
  if(!Number.isFinite(deg)) return '–';
  const dirs=['北','北北東','北東','東北東','東','東南東','南東','南南東','南','南南西','南西','西南西','西','西北西','北西','北北西'];
  const idx=Math.round((((deg%360)+360)%360)/22.5)%16;
  return dirs[idx];
}
function windDirectionArrow(deg){
  if(!Number.isFinite(deg)) return '•';
  const arrows=['↑','↗','↗','↗','→','↘','↘','↘','↓','↙','↙','↙','←','↖','↖','↖'];
  const idx=Math.round((((deg%360)+360)%360)/22.5)%16;
  return arrows[idx];
}
function visibilityShort(v){
  if(!Number.isFinite(v)) return '–';
  if(v>=10000) return `${Math.round(v/1000)}`;
  if(v>=1000) return `${(v/1000).toFixed(1)}`;
  return `${Math.round(v)}`;
}
function visibilityEvaluation(v){
  if(!Number.isFinite(v)) return {label:'判定不可',cls:'unknown'};
  const km=v/1000;
  if(km<0.5)return {label:'危険',cls:'danger'};
  if(km<1)return {label:'警戒',cls:'warning'};
  if(km<3)return {label:'注意',cls:'caution'};
  if(km<10)return {label:'良好',cls:'good'};
  if(km<20)return {label:'かなり良好',cls:'great'};
  return {label:'絶景期待',cls:'excellent'};
}
function visibilityGaugePct(value){
  if(!Number.isFinite(value)) return 0;
  const km=Math.max(0,value/1000);
  const knots=[[0,0],[0.5,18],[1,32],[3,50],[10,72],[20,92],[40,100]];
  for(let i=1;i<knots.length;i++){
    if(km<=knots[i][0]){
      const [x0,p0]=knots[i-1],[x1,p1]=knots[i];
      return p0+(p1-p0)*((km-x0)/(x1-x0));
    }
  }
  return 100;
}
function metricGauge(kind,value){
  if(kind==='visibility'){
    const pct=visibilityGaugePct(value);
    return `<div class="rf-gauge rf-gauge-visibility" aria-hidden="true"><div class="rf-gauge-track"><span class="rf-gauge-zone z-danger"></span><span class="rf-gauge-zone z-warning"></span><span class="rf-gauge-zone z-caution"></span><span class="rf-gauge-zone z-good"></span><span class="rf-gauge-zone z-great"></span><span class="rf-gauge-zone z-excellent"></span><span class="rf-gauge-thumb gauge-visibility" style="left:${pct.toFixed(1)}%"></span></div><div class="rf-vis-ticks"><span style="left:18%">0.5</span><span style="left:32%">1</span><span style="left:50%">3</span><span style="left:72%">10</span><span style="left:92%">20+</span></div></div>`;
  }
  const defs={
    temp:{min:-10,max:35,left:'低',right:'高'},
    wind:{min:0,max:20,left:'弱',right:'強'},
    rain:{min:0,max:10,left:'少',right:'多'}
  };
  const d=defs[kind]||defs.temp;
  const pct=Number.isFinite(value)?clamp(((value-d.min)/(d.max-d.min))*100,0,100):0;
  return `<div class="rf-gauge" aria-hidden="true"><span class="rf-gauge-edge">${d.left}</span><div class="rf-gauge-track"><span class="rf-gauge-fill gauge-${kind}" style="width:${pct.toFixed(1)}%"></span><span class="rf-gauge-thumb gauge-${kind}" style="left:${pct.toFixed(1)}%"></span></div><span class="rf-gauge-edge">${d.right}</span></div>`;
}
function pointMetricIcon(kind){
  const common='viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"';
  if(kind==='temp')return `<svg ${common}><path d="M20 9a4 4 0 0 1 8 0v20.5a8 8 0 1 1-8 0V9z"/><path d="M24 15v19"/><circle cx="24" cy="36" r="3"/></svg>`;
  if(kind==='wind')return `<svg ${common}><path d="M6 17h23c6 0 6-9 0-9-4 0-5 2-5 5"/><path d="M6 25h31c6 0 6 9 0 9-4 0-5-2-5-5"/><path d="M6 33h16"/></svg>`;
  if(kind==='rain')return `<svg ${common}><path d="M15 28h19a8 8 0 0 0 1-16 12 12 0 0 0-22 4 6 6 0 0 0 2 12z"/><path d="M18 33l-2 5M25 33l-2 5M32 33l-2 5"/></svg>`;
  if(kind==='direction')return `<svg ${common}><path d="M12 35L36 11"/><path d="M21 11h15v15"/></svg>`;
  if(kind==='visibility')return `<svg ${common}><path d="M4 24s7-11 20-11 20 11 20 11-7 11-20 11S4 24 4 24z"/><circle cx="24" cy="24" r="5"/></svg>`;
  return '';
}
function pointForecastMessage(r){
  const g=r.grade||'A';
  if(g==='A')return {cls:'good',text:'到着時は大きな気象上の注意要素は少ない見込みです。'};
  if(g==='B')return {cls:'fair',text:'概ね安定していますが、一部の気象要素に注意してください。'};
  if(g==='C')return {cls:'caution',text:'注意要素があります。到着前に最新予報を再確認してください。'};
  return {cls:'warning',text:'強い注意要素があります。行動判断は最新情報を確認して慎重に。'};
}
function pointForecastRow(r,i,total){
  const hz=Object.fromEntries((r.hazards||[]).map(h=>[h.type,h]));
  const wx=weatherVisual(r);
  const typeLabel=TYPE_LABEL[r.point.type]||r.point.type||'地点';
  const elev=Math.round(r.point.elevation||0);
  const visUnit=Number.isFinite(r.visibility)?(r.visibility>=1000?'km':'m'):' ';
  const msg=pointForecastMessage(r);
  const windDeg=r.providerRows?.[0]?.row?.windDir ?? NaN;
  const visEval=visibilityEvaluation(r.visibility);
  const windDegLabel=Number.isFinite(windDeg)?`(${Math.round((((windDeg%360)+360)%360))}°)`: '風の向き';
  return `<article class="route-forecast-row point-dashboard-card">
    <div class="rf-point-head">
      <div class="rf-point-copy">
        <div class="rf-time"><small>${esc(r.point.date||'----/--/--')}</small><strong>${esc(r.point.time||'--:--')}</strong></div>
        <div class="rf-place"><b>${esc(r.point.name)}</b><small>${esc(typeLabel)} / 標高 ${elev.toLocaleString('ja-JP')}m</small></div>
      </div>
      <div class="rf-weather wx-${wx.cls}"><span class="rf-weather-icon" aria-hidden="true">${wx.icon}</span><small>${wx.label}</small></div>
    </div>
    <div class="rf-metrics-grid">
      <div class="rf-metric temp${hazardMetricClass(hz.temp)}" data-label="気温">
        <div class="rf-metric-title"><span class="rf-metric-symbol temp">${pointMetricIcon('temp')}</span><b>気温</b></div>
        <div class="rf-value-wrap"><strong>${num(r.temp,0)}</strong><small>℃</small></div>
        ${metricGauge('temp',r.temp)}
      </div>
      <div class="rf-metric wind${hazardMetricClass(hz.wind)}" data-label="風">
        <div class="rf-metric-title"><span class="rf-metric-symbol wind">${pointMetricIcon('wind')}</span><b>風</b></div>
        <div class="rf-value-wrap"><strong>${num(r.wind,0)}</strong><small>m/s</small></div>
        ${metricGauge('wind',r.wind)}
      </div>
      <div class="rf-metric rain${hazardMetricClass(hz.rain)}" data-label="雨">
        <div class="rf-metric-title"><span class="rf-metric-symbol rain">${pointMetricIcon('rain')}</span><b>雨</b></div>
        <div class="rf-value-wrap"><strong>${num(r.rain,1)}</strong><small>mm/h</small></div>
        ${metricGauge('rain',r.rain)}
      </div>
      <div class="rf-direction" data-label="風向">
        <div class="rf-metric-title"><span class="rf-metric-symbol direction">${pointMetricIcon('direction')}</span><b>風向</b></div>
        <div class="rf-direction-main"><strong>${windDirectionArrow(windDeg)}</strong><b>${windDirectionLabel(windDeg)}</b></div>
        <small>${windDegLabel}</small>
      </div>
      <div class="rf-metric vis${hazardMetricClass(hz.visibility)}" data-label="視界">
        <div class="rf-metric-title"><span class="rf-metric-symbol visibility">${pointMetricIcon('visibility')}</span><b>視界</b><em class="rf-vis-eval ${visEval.cls}">${visEval.label}</em></div>
        <div class="rf-value-wrap"><strong>${visibilityShort(r.visibility)}</strong><small>${visUnit}</small></div>
        ${metricGauge('visibility',r.visibility)}
      </div>
    </div>
    <div class="rf-point-message ${msg.cls}"><span>✓</span><p>${esc(msg.text)}</p></div>
  </article>`;
}

function renderPointForecastTimeline(points){
  const el=$('forecastCards');
  if(!el) return;
  el.innerHTML=`<div class="route-forecast-board point-dashboard-board">
    <div class="route-forecast-list">${points.map((r,i)=>pointForecastRow(r,i,points.length)).join('')}</div>
    <div class="route-forecast-foot">※ 各地点の通過時刻に対する代表予報値です。詳細なモデル比較は「06 気象モデル詳細」を参照してください。</div>
  </div>`;
}

function renderAll(points,overnight=[]){

  $('results').classList.remove('hidden'); renderWeatherCharts(points); renderDecisionCommentary(points); renderRouteMaps(points.map(x=>x.point)); const worst=points.reduce((a,b)=>gradeRank(b.grade)>gradeRank(a.grade)?b:a,points[0]);
  const maxWindValue=max(points.flatMap(x=>x.providerRows.map(y=>y.row.wind))); const maxRainValue=max(points.flatMap(x=>x.providerRows.map(y=>y.row.rain))); const thunderLevel=maxThunder(points.map(x=>x.thunder)); const confidenceLevel=overallConfidence(points.map(x=>x.confidence));
  $('grade').textContent=worst.grade; $('verdict').textContent=verdict(worst.grade);
  const gradeLabels={A:'EXCELLENT',B:'GOOD',C:'CAUTION',D:'HARD',E:'STOP'}; const verdictNotes={A:'全体としてかなり安定した予報です。',B:'一部に注意点はありますが、全体としては比較的安定しています。',C:'注意要素があります。通過時刻と場所を確認してください。',D:'強い気象リスクを含む計画です。見直しを推奨します。',E:'非常に強い気象リスクがあります。中止を含めて再検討してください。'};
  $('gradeLabel').textContent=gradeLabels[worst.grade]||'–'; $('verdictNote').textContent=verdictNotes[worst.grade]||'ルート全体の気象条件を確認してください。';
  $('maxWind').textContent=`${num(maxWindValue)} m/s`; $('maxWindLabel').textContent=maxWindValue<5?'弱い':maxWindValue<10?'やや強い':maxWindValue<15?'強い':'非常に強い';
  $('maxRain').textContent=`${num(maxRainValue)} mm/h`; $('maxRainLabel').textContent=maxRainValue<0.2?'ほとんどなし':maxRainValue<1?'弱い':maxRainValue<5?'雨に注意':'強い雨';
  $('thunderRisk').textContent=thunderLevel; $('thunderRiskLabel').textContent=({LOW:'低い',MEDIUM:'注意',HIGH:'高い',EXTREME:'非常に高い'})[thunderLevel]||'–';
  $('confidence').textContent=confidenceLevel; $('confidenceLabel').textContent=({LOW:'低い',MEDIUM:'中程度',HIGH:'高い'})[confidenceLevel]||'–';
  const setMarker=(id,pct)=>{const el=$(id);if(el)el.style.left=`${Math.max(2,Math.min(98,pct))}%`;}; setMarker('maxWindMarker',(maxWindValue/20)*100); setMarker('maxRainMarker',(maxRainValue/20)*100); setMarker('thunderMarker',({LOW:8,MEDIUM:38,HIGH:68,EXTREME:94})[thunderLevel]||8); setMarker('confidenceMarker',({LOW:8,MEDIUM:50,HIGH:94})[confidenceLevel]||8);
  renderPointForecastTimeline(points);
  const overnightWithArrival=overnight.map(o=>{const match=points.find(r=>r.point===o.point||(r.point.name===o.point.name&&r.point.date===o.point.date&&r.point.time===o.point.time));return {...o,arrivalTemp:match?.temp};});
  renderOvernights(overnightWithArrival);
  $('modelDetails').innerHTML=points.map(r=>`<article class="model-block"><h3>${esc(r.point.name)} <small>${r.point.date} ${r.point.time}</small></h3><div class="table-wrap"><table><thead><tr><th>モデル</th><th>気温</th><th>風</th><th>突風</th><th>雨</th><th>雲</th><th>大気不安定度</th><th>視程</th></tr></thead><tbody>${r.providerRows.map(x=>`<tr><td>${x.provider.name}</td><td>${num(x.row.temp)}℃</td><td>${num(x.row.wind)}m/s</td><td>${num(x.row.gust)}m/s</td><td>${num(x.row.rain)}mm</td><td>${num(x.row.cloud,0)}%</td><td>${num(x.row.cape,0)} J/kg</td><td>${Number.isFinite(x.row.visibility)?Math.round(x.row.visibility)+'m':'–'}</td></tr>`).join('')}</tbody></table></div></article>`).join('');
  $('updatedAt').textContent=new Date().toLocaleString('ja-JP');
}
async function proxyFetch(url){return fetch(`/api/proxy?url=${encodeURIComponent(url)}`);}
function setStatus(t,e=false){const els=[$('statusDesktop'),$('statusMobile')].filter(Boolean);if(!els.length){console.warn('status elements missing:',t);return;}els.forEach(el=>{el.textContent=t;el.classList.remove('hidden');el.classList.toggle('error',e);});}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);}
function todayLocal(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10);}
function logEvent(event_name,details={}){fetch('/api/event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session_id:sessionId,app_version:APP_VERSION,event_name,...details})}).catch(()=>{});}



// V1.12.15: 九州主要ポイントを公開座標で固定。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '祖母山': [
    ...(BUILTIN_ROUTE_CATALOG['祖母山'] || []),
    {id:'fixed15-sobo-9gome',type:'hut',name:'祖母山九合目小屋',lat:32.830556,lon:131.347500,elevation:1657,source:'固定候補'}
  ],
  '鶴見岳': [
    ...(BUILTIN_ROUTE_CATALOG['鶴見岳'] || []),
    {id:'fixed15-tsurumi-honoho',type:'trailhead',name:'火男火売神社登山口',lat:33.272528,lon:131.439583,elevation:700,source:'固定候補'}
  ],
  '大崩山': [
    ...(BUILTIN_ROUTE_CATALOG['大崩山'] || []),
    {id:'fixed15-okue-kamihori',type:'trailhead',name:'祝子川 大崩山登山口',lat:32.743611,lon:131.542611,elevation:612,source:'固定候補'},
    {id:'fixed15-okue-hut',type:'hut',name:'大崩山荘',lat:32.748333,lon:131.536111,elevation:744,source:'固定候補'}
  ],
  '大船山': [
    ...(BUILTIN_ROUTE_CATALOG['大船山'] || []),
    {id:'fixed15-taisen-bogatsuru',type:'hut',name:'坊ガツル',lat:33.099667,lon:131.262833,elevation:1234,source:'固定候補'}
  ],
  '雲仙岳（普賢岳）': [
    ...(BUILTIN_ROUTE_CATALOG['雲仙岳（普賢岳）'] || []),
    {id:'fixed15-unzen-fugendake',type:'peak',name:'雲仙岳（普賢岳）',lat:32.760000,lon:130.292222,elevation:1359,source:'固定候補'}
  ],
  '阿蘇山（高岳）': [
    ...(BUILTIN_ROUTE_CATALOG['阿蘇山（高岳）'] || []),
    {id:'fixed15-aso-takadake',type:'peak',name:'阿蘇山（高岳）',lat:32.884444,lon:131.103889,elevation:1592,source:'固定候補'}
  ],
  '多良岳': [
    ...(BUILTIN_ROUTE_CATALOG['多良岳'] || []),
    {id:'fixed15-taradake-peak',type:'peak',name:'多良岳（多良嶽神社上宮）',lat:32.975861,lon:130.093389,elevation:983,source:'固定候補'},
    {id:'fixed15-taradake-kuroki',type:'trailhead',name:'黒木登山口',lat:32.975944,lon:130.063361,elevation:352,source:'固定候補'},
    {id:'fixed15-taradake-nakayama',type:'trailhead',name:'中山キャンプ場 多良岳',lat:32.985306,lon:130.094306,elevation:548,source:'固定候補'}
  ],
  '傾山': [
    ...(BUILTIN_ROUTE_CATALOG['傾山'] || []),
    {id:'fixed15-katamuki-tsuzura',type:'trailhead',name:'九折登山口 傾山',lat:32.853167,lon:131.446861,elevation:374,source:'固定候補'}
  ],
  '市房山': [
    ...(BUILTIN_ROUTE_CATALOG['市房山'] || []),
    {id:'fixed15-ichifusa-camp',type:'trailhead',name:'市房山キャンプ場 登山口',lat:32.318250,lon:131.070306,elevation:574,source:'固定候補'}
  ],
  '国見岳': [
    ...(BUILTIN_ROUTE_CATALOG['国見岳'] || []),
    {id:'fixed15-kunimi-goyudani-new',type:'trailhead',name:'国見岳新登山口（五勇谷橋ルート）',lat:32.532250,lon:130.995194,elevation:1010,source:'固定候補'}
  ]
});

// V1.12.14: 霧島山（韓国岳）の大浪池登山口を座標込み固定。
// V1.12.15: 九州主要ポイント座標固定、長者原重複候補整理。


// V1.12.16: 四国の日本三百名山9座について、山頂・主要登山口・山小屋/避難小屋を公開座標で固定。
// 山頂は原則として国土地理院の経緯度を採用。既存の誤座標・名称揺れもこのブロックで整理する。
Object.assign(MOUNTAIN_PRESETS, {
  '剣山': {latitude:33.853611, longitude:134.094167},
  '三嶺': {latitude:33.839444, longitude:133.987778},
  '東赤石山': {latitude:33.875278, longitude:133.373889},
  '笹ヶ峰': {latitude:33.828056, longitude:133.274722},
  '伊予富士': {latitude:33.788056, longitude:133.248056},
  '瓶ヶ森': {latitude:33.794722, longitude:133.193333},
  '石鎚山': {latitude:33.767778, longitude:133.115000},
  '三本杭': {latitude:33.188333, longitude:132.635278},
  '篠山': {latitude:33.055833, longitude:132.659167}
});

Object.assign(BUILTIN_ROUTE_CATALOG, {
  '剣山': [
    {id:'fixed16-shikoku-tsurugi-minokoshi',type:'trailhead',name:'見ノ越 剣山登山口',lat:33.866558,lon:134.089036,elevation:1394,source:'固定候補'},
    {id:'fixed16-shikoku-tsurugi-nishijima',type:'trailhead',name:'剣山観光登山リフト西島駅',lat:33.860656,lon:134.092260,elevation:1750,source:'固定候補'},
    {id:'fixed16-shikoku-tsurugi-hutte',type:'hut',name:'剣山頂上ヒュッテ',lat:33.855000,lon:134.096111,elevation:1939,source:'固定候補'},
    {id:'fixed16-shikoku-tsurugi-peak',type:'peak',name:'剣山',lat:33.853611,lon:134.094167,elevation:1955,source:'固定候補'}
  ],
  '三嶺': [
    {id:'fixed16-shikoku-miune-nagoro',type:'trailhead',name:'名頃登山口 三嶺',lat:33.852472,lon:134.023972,elevation:907,source:'固定候補'},
    {id:'fixed16-shikoku-miune-hikariishi',type:'trailhead',name:'光石登山口',lat:33.804472,lon:133.971694,elevation:910,source:'固定候補'},
    {id:'fixed16-shikoku-miune-hut',type:'hut',name:'三嶺ヒュッテ',lat:33.840556,lon:133.991389,elevation:1845,source:'固定候補'},
    {id:'fixed16-shikoku-miune-peak',type:'peak',name:'三嶺',lat:33.839444,lon:133.987778,elevation:1894,source:'固定候補'}
  ],
  '東赤石山': [
    {id:'fixed16-shikoku-higashiakaishi-seba',type:'trailhead',name:'瀬場登山口 東赤石山',lat:33.853278,lon:133.390639,elevation:652,source:'固定候補'},
    {id:'fixed16-shikoku-higashiakaishi-hut',type:'hut',name:'赤石山荘',lat:33.875000,lon:133.367222,elevation:1552,source:'固定候補'},
    {id:'fixed16-shikoku-higashiakaishi-peak',type:'peak',name:'東赤石山',lat:33.875278,lon:133.373889,elevation:1710,source:'固定候補'}
  ],
  '笹ヶ峰': [
    {id:'fixed16-shikoku-sasagamine-shimotsuike',type:'trailhead',name:'下津池 笹ヶ峰登山口',lat:33.840100,lon:133.257808,elevation:997,source:'固定候補'},
    {id:'fixed16-shikoku-sasagamine-maruyama',type:'hut',name:'丸山荘',lat:33.833889,lon:133.271944,elevation:1519,source:'固定候補'},
    {id:'fixed16-shikoku-sasagamine-peak',type:'peak',name:'笹ヶ峰',lat:33.828056,lon:133.274722,elevation:1860,source:'固定候補'}
  ],
  '伊予富士': [
    {id:'fixed16-shikoku-iyofuji-kanpuzan',type:'trailhead',name:'寒風山登山口',lat:33.799772,lon:133.266575,elevation:1114,source:'固定候補'},
    {id:'fixed16-shikoku-iyofuji-peak',type:'peak',name:'伊予富士',lat:33.788056,lon:133.248056,elevation:1756,source:'固定候補'}
  ],
  '瓶ヶ森': [
    {id:'fixed16-shikoku-kamegamori-parking',type:'trailhead',name:'瓶ヶ森駐車場',lat:33.784694,lon:133.190194,elevation:1673,source:'固定候補'},
    {id:'fixed16-shikoku-kamegamori-hut',type:'hut',name:'瓶ヶ森避難小屋',lat:33.792500,lon:133.188056,elevation:1728,source:'固定候補'},
    {id:'fixed16-shikoku-kamegamori-peak',type:'peak',name:'瓶ヶ森',lat:33.794722,lon:133.193333,elevation:1896,source:'固定候補'}
  ],
  '石鎚山': [
    {id:'fixed16-shikoku-ishizuchi-tsuchigoya',type:'trailhead',name:'土小屋登山口',lat:33.758250,lon:133.144778,elevation:1492,source:'固定候補'},
    {id:'fixed16-shikoku-ishizuchi-joju',type:'trailhead',name:'石鎚ロープウェイ山頂成就駅',lat:33.795022,lon:133.133590,elevation:1300,source:'固定候補'},
    {id:'fixed16-shikoku-ishizuchi-chojo',type:'hut',name:'石鎚神社頂上山荘',lat:33.768972,lon:133.113333,elevation:1965,source:'固定候補'},
    {id:'fixed16-shikoku-ishizuchi-misen',type:'peak',name:'石鎚山（弥山）',lat:33.769064,lon:133.113625,elevation:1972,source:'固定候補'},
    {id:'fixed16-shikoku-ishizuchi-tengu',type:'peak',name:'石鎚山（天狗岳）',lat:33.767778,lon:133.115000,elevation:1982,source:'固定候補'}
  ],
  '三本杭': [
    {id:'fixed16-shikoku-sanbongui-nametoko',type:'trailhead',name:'万年橋 滑床渓谷 三本杭登山口',lat:33.202722,lon:132.659528,elevation:363,source:'固定候補'},
    {id:'fixed16-shikoku-sanbongui-peak',type:'peak',name:'三本杭',lat:33.188333,lon:132.635278,elevation:1226,source:'固定候補'}
  ],
  '篠山': [
    {id:'fixed16-shikoku-sasayama-trailhead',type:'trailhead',name:'篠山登山口 愛媛高知',lat:33.052222,lon:132.663611,elevation:788,source:'固定候補'},
    {id:'fixed16-shikoku-sasayama-peak',type:'peak',name:'篠山',lat:33.055833,lon:132.659167,elevation:1065,source:'固定候補'}
  ]
});


// V1.12.17: 近畿の日本三百名山20座について、山頂・主要登山口・既存山小屋/避難小屋候補を固定座標化。
// 山頂は国土地理院「日本の主な山岳」を優先し、藤原岳は公開地図座標を採用。
Object.assign(MOUNTAIN_PRESETS, {
  '伊吹山': {latitude:35.417778, longitude:136.406389},
  '藤原岳': {latitude:35.158666, longitude:136.452635},
  '御在所岳': {latitude:35.020556, longitude:136.417778},
  '倶留尊山': {latitude:34.530833, longitude:136.170278},
  '三峰山': {latitude:34.448611, longitude:136.206389},
  '高見山': {latitude:34.428611, longitude:136.088333},
  '日出ヶ岳': {latitude:34.185278, longitude:136.109167},
  '竜門岳': {latitude:34.440556, longitude:135.897778},
  '山上ヶ岳': {latitude:34.252500, longitude:135.941111},
  '八経ヶ岳': {latitude:34.173611, longitude:135.907500},
  '釈迦ヶ岳（奈良）': {latitude:34.114444, longitude:135.903056},
  '伯母子岳': {latitude:34.077500, longitude:135.650833},
  '護摩壇山': {latitude:34.057500, longitude:135.566944},
  '大和葛城山': {latitude:34.456111, longitude:135.682222},
  '金剛山': {latitude:34.419444, longitude:135.673056},
  '武奈ヶ岳': {latitude:35.264722, longitude:135.896944},
  '蓬来山': {latitude:35.209444, longitude:135.885833},
  '比叡山': {latitude:35.065833, longitude:135.834444},
  '愛宕山': {latitude:35.060278, longitude:135.634167},
  '六甲山': {latitude:34.778056, longitude:135.263611}
});

Object.assign(BUILTIN_ROUTE_CATALOG, {
  '伊吹山': [
    {id:'fixed17-kinki-ibuki-ueno',type:'trailhead',name:'伊吹山 上野登山口（三之宮神社）',lat:35.394142,lon:136.382775,elevation:220,source:'固定候補'},
    {id:'fixed17-kinki-ibuki-driveway',type:'trailhead',name:'伊吹山ドライブウェイ山頂駐車場',lat:35.421556,lon:136.407694,elevation:1240,source:'固定候補'},
    {id:'fixed17-kinki-ibuki-peak',type:'peak',name:'伊吹山',lat:35.417778,lon:136.406389,elevation:1377,source:'固定候補'}
  ],
  '藤原岳': [
    {id:'fixed17-kinki-fujiwara-ogaido',type:'trailhead',name:'大貝戸登山口 藤原岳',lat:35.1704991,lon:136.4751261,elevation:160,source:'固定候補'},
    {id:'fixed17-kinki-fujiwara-mago',type:'trailhead',name:'孫太尾根登山口',lat:35.133194,lon:136.486333,elevation:222,source:'固定候補'},
    {id:'fixed17-kinki-fujiwara-hut',type:'hut',name:'藤原山荘',lat:35.157900,lon:136.446800,elevation:1090,source:'固定候補'},
    {id:'fixed17-kinki-fujiwara-peak',type:'peak',name:'藤原岳',lat:35.158666,lon:136.452635,elevation:1144,source:'固定候補'}
  ],
  '御在所岳': [
    {id:'fixed17-kinki-gozaisho-naka',type:'trailhead',name:'中登山道口 御在所岳',lat:35.014417,lon:136.436667,elevation:570,source:'固定候補'},
    {id:'fixed17-kinki-gozaisho-budodani',type:'trailhead',name:'武平峠登山口',lat:35.011361,lon:136.421556,elevation:810,source:'固定候補'},
    {id:'fixed17-kinki-gozaisho-ropeway',type:'trailhead',name:'御在所ロープウエイ山上公園駅',lat:35.0197042,lon:136.4246795,elevation:1160,source:'固定候補'},
    {id:'fixed17-kinki-gozaisho-peak',type:'peak',name:'御在所岳',lat:35.020556,lon:136.417778,elevation:1212,source:'固定候補'}
  ],
  '倶留尊山': [
    {id:'fixed17-kinki-kuroso-soni',type:'trailhead',name:'曽爾高原 倶留尊山登山口',lat:34.518261,lon:136.160949,elevation:700,source:'固定候補'},
    {id:'fixed17-kinki-kuroso-peak',type:'peak',name:'倶留尊山',lat:34.530833,lon:136.170278,elevation:1037,source:'固定候補'}
  ],
  '三峰山': [
    {id:'fixed17-kinki-miune-mitsue',type:'trailhead',name:'みつえ青少年旅行村 三峰山登山口',lat:34.471333,lon:136.195250,elevation:556,source:'固定候補'},
    {id:'fixed17-kinki-miune-peak',type:'peak',name:'三峰山',lat:34.448611,lon:136.206389,elevation:1235,source:'固定候補'}
  ],
  '高見山': [
    {id:'fixed17-kinki-takami-takasumi',type:'trailhead',name:'たかすみ温泉 高見山登山口',lat:34.439833,lon:136.060556,elevation:470,source:'固定候補'},
    {id:'fixed17-kinki-takami-toge',type:'trailhead',name:'高見峠',lat:34.423333,lon:136.090778,elevation:896,source:'固定候補'},
    {id:'fixed17-kinki-takami-peak',type:'peak',name:'高見山',lat:34.428611,lon:136.088333,elevation:1248,source:'固定候補'}
  ],
  '日出ヶ岳': [
    {id:'fixed17-kinki-hide-vc',type:'trailhead',name:'大台ヶ原ビジターセンター',lat:34.180694,lon:136.097139,elevation:1570,source:'固定候補'},
    {id:'fixed17-kinki-hide-peak',type:'peak',name:'日出ヶ岳',lat:34.185278,lon:136.109167,elevation:1695,source:'固定候補'}
  ],
  '竜門岳': [
    {id:'fixed17-kinki-ryumon',type:'trailhead',name:'竜門岳登山口 吉野',lat:34.420936,lon:135.892397,elevation:520,source:'固定候補'},
    {id:'fixed17-kinki-ryumon-peak',type:'peak',name:'竜門岳',lat:34.440556,lon:135.897778,elevation:904,source:'固定候補'}
  ],
  '山上ヶ岳': [
    {id:'fixed17-kinki-sanjo-ohmine',type:'trailhead',name:'清浄大橋 大峯山登山口',lat:34.267139,lon:135.913167,elevation:916,source:'固定候補'},
    {id:'fixed17-kinki-sanjo-shukubo',type:'hut',name:'大峯山寺宿坊',lat:34.253035,lon:135.941339,elevation:1710,source:'固定候補'},
    {id:'fixed17-kinki-sanjo-peak',type:'peak',name:'山上ヶ岳',lat:34.252500,lon:135.941111,elevation:1719,source:'固定候補'}
  ],
  '八経ヶ岳': [
    {id:'fixed17-kinki-hakkyo-tunnel',type:'trailhead',name:'行者還トンネル西口',lat:34.188877,lon:135.937116,elevation:1100,source:'固定候補'},
    {id:'fixed17-kinki-hakkyo-misenhut',type:'hut',name:'弥山小屋',lat:34.179444,lon:135.910278,elevation:1876,source:'固定候補'},
    {id:'fixed17-kinki-hakkyo-peak',type:'peak',name:'八経ヶ岳',lat:34.173611,lon:135.907500,elevation:1915,source:'固定候補'}
  ],
  '釈迦ヶ岳（奈良）': [
    {id:'fixed17-kinki-shaka-futoo',type:'trailhead',name:'太尾登山口 釈迦ヶ岳 奈良',lat:34.098167,lon:135.871750,elevation:1310,source:'固定候補'},
    {id:'fixed17-kinki-shaka-peak',type:'peak',name:'釈迦ヶ岳（奈良）',lat:34.114444,lon:135.903056,elevation:1800,source:'固定候補'}
  ],
  '伯母子岳': [
    {id:'fixed17-kinki-obako-omata',type:'trailhead',name:'大股登山口 伯母子岳',lat:34.106222,lon:135.631139,elevation:660,source:'固定候補'},
    {id:'fixed17-kinki-obako-hut',type:'hut',name:'伯母子岳避難小屋',lat:34.076900,lon:135.650300,elevation:1240,source:'固定候補'},
    {id:'fixed17-kinki-obako-peak',type:'peak',name:'伯母子岳',lat:34.077500,lon:135.650833,elevation:1344,source:'固定候補'}
  ],
  '護摩壇山': [
    {id:'fixed17-kinki-gomadan-park',type:'trailhead',name:'護摩壇山森林公園ワイルドライフ',lat:34.040556,lon:135.567222,elevation:1000,source:'固定候補'},
    {id:'fixed17-kinki-gomadan-peak',type:'peak',name:'護摩壇山',lat:34.057500,lon:135.566944,elevation:1372,source:'固定候補'}
  ],
  '大和葛城山': [
    {id:'fixed17-kinki-katsuragi-ropeway',type:'trailhead',name:'葛城山ロープウェイ山上駅',lat:34.4584349,lon:135.6869184,elevation:900,source:'固定候補'},
    {id:'fixed17-kinki-katsuragi-mizukoshi',type:'trailhead',name:'水越峠',lat:34.443567,lon:135.681872,elevation:510,source:'固定候補'},
    {id:'fixed17-kinki-katsuragi-peak',type:'peak',name:'大和葛城山',lat:34.456111,lon:135.682222,elevation:959,source:'固定候補'}
  ],
  '金剛山': [
    {id:'fixed17-kinki-kongo-chihaya',type:'trailhead',name:'千早本道登山口',lat:34.418667,lon:135.650667,elevation:524,source:'固定候補'},
    {id:'fixed17-kinki-kongo-mizukoshi',type:'trailhead',name:'水越峠 金剛山',lat:34.443567,lon:135.681872,elevation:510,source:'固定候補'},
    {id:'fixed17-kinki-kongo-peak',type:'peak',name:'金剛山',lat:34.419444,lon:135.673056,elevation:1125,source:'固定候補'}
  ],
  '武奈ヶ岳': [
    {id:'fixed17-kinki-buna-bomura',type:'trailhead',name:'坊村 武奈ヶ岳登山口',lat:35.246389,lon:135.866556,elevation:305,source:'固定候補'},
    {id:'fixed17-kinki-buna-intani',type:'trailhead',name:'イン谷口',lat:35.239083,lon:135.926194,elevation:270,source:'固定候補'},
    {id:'fixed17-kinki-buna-peak',type:'peak',name:'武奈ヶ岳',lat:35.264722,lon:135.896944,elevation:1214,source:'固定候補'}
  ],
  '蓬来山': [
    {id:'fixed17-kinki-horai-ropeway',type:'trailhead',name:'びわ湖バレイ山頂駅',lat:35.213385,lon:135.895707,elevation:1100,source:'固定候補'},
    {id:'fixed17-kinki-horai-station',type:'trailhead',name:'蓬莱駅 登山口',lat:35.18210013,lon:135.9143855,elevation:95,source:'固定候補'},
    {id:'fixed17-kinki-horai-peak',type:'peak',name:'蓬来山',lat:35.209444,lon:135.885833,elevation:1174,source:'固定候補'}
  ],
  '比叡山': [
    {id:'fixed17-kinki-hiei-cable',type:'trailhead',name:'坂本ケーブル延暦寺駅',lat:35.0665212,lon:135.843941,elevation:650,source:'固定候補'},
    {id:'fixed17-kinki-hiei-kirara',type:'trailhead',name:'雲母坂登山口（修学院）',lat:35.052056,lon:135.804500,elevation:120,source:'固定候補'},
    {id:'fixed17-kinki-hiei-peak',type:'peak',name:'比叡山（大比叡）',lat:35.065833,lon:135.834444,elevation:848,source:'固定候補'}
  ],
  '愛宕山': [
    {id:'fixed17-kinki-atago-kiyotaki',type:'trailhead',name:'清滝 愛宕山登山口',lat:35.039750,lon:135.658220,elevation:90,source:'固定候補'},
    {id:'fixed17-kinki-atago-peak',type:'peak',name:'愛宕山',lat:35.060278,lon:135.634167,elevation:924,source:'固定候補'}
  ],
  '六甲山': [
    {id:'fixed17-kinki-rokko-koza',type:'trailhead',name:'芦屋川 高座の滝',lat:34.745969,lon:135.288225,elevation:250,source:'固定候補'},
    {id:'fixed17-kinki-rokko-arima',type:'trailhead',name:'有馬温泉 六甲山登山口',lat:34.797300,lon:135.249600,elevation:380,source:'固定候補'},
    {id:'fixed17-kinki-rokko-peak',type:'peak',name:'六甲山',lat:34.778056,lon:135.263611,elevation:931,source:'固定候補'}
  ]
});

// V1.12.18: 中国地方の日本三百名山（現行アプリ区分8座）について、山頂・主要登山口・確認可能な山小屋/避難小屋を固定座標化。
// 山頂は国土地理院等の公開座標、登山口・小屋は公開情報で名称と座標を確認できた地点のみ採用。
Object.assign(MOUNTAIN_PRESETS, {
  '扇ノ山': {latitude:35.439722, longitude:134.440833},
  '氷ノ山': {latitude:35.353889, longitude:134.513889},
  '那岐山': {latitude:35.171667, longitude:134.180278},
  '上蒜山': {latitude:35.325000, longitude:133.663333},
  '道後山': {latitude:35.069444, longitude:133.232778},
  '吾妻山': {latitude:35.068333, longitude:133.033056},
  '三瓶山': {latitude:35.140556, longitude:132.621667}
});

Object.assign(CURATED_ACCESS_HINTS, {
  '扇ノ山':{trailheads:['河合谷高原 扇ノ山登山口','姫路公園登山口'],huts:['扇ノ山山頂避難小屋']},
  '氷ノ山':{trailheads:['福定親水公園 氷ノ山登山口','わかさ氷ノ山登山口'],huts:['氷ノ山越避難小屋','氷ノ山山頂避難小屋']},
  '那岐山':{trailheads:['蛇淵の滝 那岐山登山口'],huts:['那岐山避難小屋','馬ノ背小屋（那岐山）']},
  '大山（鳥取）':{trailheads:['夏山登山口 大山','博労座'],huts:['六合目避難小屋','大山頂上避難小屋']},
  '上蒜山':{trailheads:['上蒜山登山口駐車場（上蒜山スキー場）']},
  '道後山':{trailheads:['月見ヶ丘登山口駐車場 道後山']},
  '吾妻山':{trailheads:['吾妻山キャンプ場駐車場'],huts:['大膳原野営場避難小屋']},
  '三瓶山':{trailheads:['東の原登山口（さんべ観光リフト）','西の原登山口','北の原・姫逃池登山口'],huts:['三瓶山頂避難小屋']}
});

Object.assign(BUILTIN_ROUTE_CATALOG, {
  '扇ノ山': [
    {id:'fixed18-chugoku-ogino-kawai',type:'trailhead',name:'河合谷高原 扇ノ山登山口',lat:35.465333,lon:134.433111,elevation:1043,source:'固定候補'},
    {id:'fixed18-chugoku-ogino-himeji',type:'trailhead',name:'姫路公園登山口',lat:35.430722,lon:134.427472,elevation:894,source:'固定候補'},
    {id:'fixed18-chugoku-ogino-hut',type:'hut',name:'扇ノ山山頂避難小屋',lat:35.439722,lon:134.440833,elevation:1310,source:'固定候補'},
    {id:'fixed18-chugoku-ogino-peak',type:'peak',name:'扇ノ山',lat:35.439722,lon:134.440833,elevation:1310,source:'固定候補'}
  ],
  '氷ノ山': [
    {id:'fixed18-chugoku-hyono-fukusada',type:'trailhead',name:'福定親水公園 氷ノ山登山口',lat:35.369944,lon:134.523139,elevation:654,source:'固定候補'},
    {id:'fixed18-chugoku-hyono-wakasa',type:'trailhead',name:'わかさ氷ノ山登山口',lat:35.358111,lon:134.495750,elevation:923,source:'固定候補'},
    {id:'fixed18-chugoku-hyono-goe',type:'hut',name:'氷ノ山越避難小屋',lat:35.363778,lon:134.503444,elevation:1250,source:'固定候補'},
    {id:'fixed18-chugoku-hyono-summithut',type:'hut',name:'氷ノ山山頂避難小屋',lat:35.353889,lon:134.513889,elevation:1509,source:'固定候補'},
    {id:'fixed18-chugoku-hyono-peak',type:'peak',name:'氷ノ山',lat:35.353889,lon:134.513889,elevation:1510,source:'固定候補'}
  ],
  '那岐山': [
    {id:'fixed18-chugoku-nagi-bc',type:'trailhead',name:'蛇淵の滝 那岐山登山口',lat:35.155250,lon:134.191944,elevation:559,source:'固定候補'},
    {id:'fixed18-chugoku-nagi-umanose',type:'hut',name:'馬ノ背小屋（那岐山）',lat:35.176111,lon:134.174167,elevation:922,source:'固定候補'},
    {id:'fixed18-chugoku-nagi-peak',type:'peak',name:'那岐山',lat:35.171667,lon:134.180278,elevation:1255,source:'固定候補'}
  ],
  '大山': [
    {id:'fixed18-chugoku-daisen-natsu',type:'trailhead',name:'夏山登山口 大山',lat:35.391194,lon:133.530556,elevation:770,source:'固定候補'},
    {id:'fixed18-chugoku-daisen-bakuroza',type:'trailhead',name:'博労座',lat:35.394694,lon:133.530306,elevation:740,source:'固定候補'},
    {id:'fixed18-chugoku-daisen-roku',type:'hut',name:'六合目避難小屋',lat:35.379700,lon:133.538700,elevation:1350,source:'固定候補'},
    {id:'fixed18-chugoku-daisen-summithut',type:'hut',name:'大山頂上避難小屋',lat:35.371400,lon:133.546000,elevation:1700,source:'固定候補'},
    {id:'fixed18-chugoku-daisen-peak',type:'peak',name:'大山（弥山）',lat:35.371100,lon:133.546200,elevation:1709,source:'固定候補'}
  ],
  '上蒜山': [
    {id:'fixed18-chugoku-kamihiruzen-trail',type:'trailhead',name:'上蒜山登山口駐車場（上蒜山スキー場）',lat:35.310222,lon:133.639028,elevation:547,source:'固定候補'},
    {id:'fixed18-chugoku-kamihiruzen-peak',type:'peak',name:'上蒜山',lat:35.325000,lon:133.663333,elevation:1202,source:'固定候補'}
  ],
  '道後山': [
    {id:'fixed18-chugoku-dogo-trail',type:'trailhead',name:'月見ヶ丘登山口駐車場 道後山',lat:35.067889,lon:133.214361,elevation:1076,source:'固定候補'},
    {id:'fixed18-chugoku-dogo-peak',type:'peak',name:'道後山',lat:35.069444,lon:133.232778,elevation:1271,source:'固定候補'}
  ],
  '吾妻山': [
    {id:'fixed18-chugoku-azuma-trail',type:'trailhead',name:'吾妻山キャンプ場駐車場',lat:35.065361,lon:133.027944,elevation:1018,source:'固定候補'},
    {id:'fixed18-chugoku-azuma-daisenbara',type:'hut',name:'大膳原野営場避難小屋',lat:35.068573,lon:133.041215,elevation:'',source:'固定候補'},
    {id:'fixed18-chugoku-azuma-peak',type:'peak',name:'吾妻山',lat:35.068333,lon:133.033056,elevation:1239,source:'固定候補'}
  ],
  '三瓶山': [
    {id:'fixed18-chugoku-sanbe-east',type:'trailhead',name:'東の原登山口（さんべ観光リフト）',lat:35.128583,lon:132.642722,elevation:561,source:'固定候補'},
    {id:'fixed18-chugoku-sanbe-west',type:'trailhead',name:'西の原登山口',lat:35.130056,lon:132.602028,elevation:462,source:'固定候補'},
    {id:'fixed18-chugoku-sanbe-north',type:'trailhead',name:'北の原・姫逃池登山口',lat:35.151750,lon:132.621222,elevation:588,source:'固定候補'},
    {id:'fixed18-chugoku-sanbe-peak',type:'peak',name:'三瓶山（男三瓶山）',lat:35.140556,lon:132.621667,elevation:1126,source:'固定候補'}
  ]
});


// V1.12.19: 北陸・岐阜の現行アプリ区分19座を一括固定。
// 山頂は国土地理院「日本の主な山岳」を基準。登山口・ルート起点・小屋は公開情報で一点座標を確認できた地点のみ採用。
// 笈ヶ岳・猿ヶ馬場山など一般登山道がない山は、通常の「登山口」と誤認しないよう残雪期ルート起点と明記する。
Object.assign(MOUNTAIN_PRESETS, {
  '白木峰': {latitude:36.415556, longitude:137.112222},
  '金剛堂山': {latitude:36.378889, longitude:137.048889},
  '人形山': {latitude:36.348889, longitude:136.939722},
  '医王山': {latitude:36.512778, longitude:136.796111},
  '大門山': {latitude:36.365278, longitude:136.803611},
  '大笠山': {latitude:36.320556, longitude:136.789722},
  '笈ヶ岳': {latitude:36.298611, longitude:136.792222},
  '三方岩岳': {latitude:36.258889, longitude:136.844444},
  '猿ヶ馬場山': {latitude:36.225833, longitude:136.942778},
  '白山': {latitude:36.155000, longitude:136.771389},
  '経ヶ岳（福井）': {latitude:36.046389, longitude:136.621944},
  '野伏ヶ岳': {latitude:36.012778, longitude:136.732500},
  '大日ヶ岳': {latitude:36.001389, longitude:136.837778},
  '鷲ヶ岳': {latitude:35.940278, longitude:136.971389},
  '位山': {latitude:36.038333, longitude:137.196667},
  '川上岳': {latitude:36.008333, longitude:137.149444},
  '荒島岳': {latitude:35.934167, longitude:136.601389},
  '能郷白山': {latitude:35.762500, longitude:136.514167},
  '冠山': {latitude:35.779722, longitude:136.409444}
});

Object.assign(CURATED_ACCESS_HINTS, {
  '白木峰':{trailheads:['白木峰8合目駐車場'],huts:['白木山荘（避難小屋）']},
  '金剛堂山':{trailheads:['栃谷登山口 金剛堂山']},
  '人形山':{trailheads:['人形堂・中根平登山口']},
  '医王山':{trailheads:['医王の里登山者用駐車場','西尾平駐車場','しがらくび駐車場']},
  '大門山':{trailheads:['ブナオ峠 大門山登山口']},
  '大笠山':{trailheads:['桂湖森林公園駐車場（大笠山ルート起点）','ブナオ峠（大笠山ルート）']},
  '笈ヶ岳':{trailheads:['中宮温泉ビジターセンター（笈ヶ岳ルート起点）']},
  '三方岩岳':{trailheads:['三方岩駐車場']},
  '猿ヶ馬場山':{trailheads:['村営せせらぎ公園駐車場（猿ヶ馬場山残雪期ルート起点）']},
  '白山':{trailheads:['別当出合','市ノ瀬','大白川・平瀬道登山口'],huts:['白山室堂']},
  '経ヶ岳（福井）':{trailheads:['経ヶ岳登山口展望台駐車場','奥越高原青少年自然の家']},
  '野伏ヶ岳':{trailheads:['白山中居神社（野伏ヶ岳残雪期ルート起点）']},
  '大日ヶ岳':{trailheads:['桧峠 大日ヶ岳登山口','高鷲スノーパーク']},
  '鷲ヶ岳':{trailheads:['鷲ヶ岳立石キャンプ場（林道ルート起点）']},
  '位山':{trailheads:['ダナ平林道登山口','モンデウス飛騨位山']},
  '川上岳':{trailheads:['山之口登山口 川上岳']},
  '荒島岳':{trailheads:['勝原コース登山口','中出コース登山口']},
  '能郷白山':{trailheads:['温見峠']},
  '冠山':{trailheads:['冠山峠']}
});

Object.assign(BUILTIN_ROUTE_CATALOG, {
  '白木峰': [
    {id:'fixed19-hg-shirakimine-8go',type:'trailhead',name:'白木峰8合目駐車場',lat:36.418556,lon:137.104972,elevation:1322,source:'固定候補'},
    {id:'fixed19-hg-shirakimine-hut',type:'hut',name:'白木山荘（避難小屋）',lat:36.417250,lon:137.111694,source:'固定候補'},
    {id:'fixed19-hg-shirakimine-peak',type:'peak',name:'白木峰',lat:36.415556,lon:137.112222,elevation:1596,source:'固定候補'}
  ],
  '金剛堂山': [
    {id:'fixed19-hg-kongodo-tochidani',type:'trailhead',name:'栃谷登山口 金剛堂山',lat:36.407333,lon:137.029278,elevation:778,source:'固定候補'},
    {id:'fixed19-hg-kongodo-peak',type:'peak',name:'金剛堂山',lat:36.378889,lon:137.048889,elevation:1650,source:'固定候補'}
  ],
  '人形山': [
    {id:'fixed19-hg-ningyo-nakane',type:'trailhead',name:'人形堂・中根平登山口',lat:36.383194,lon:136.940389,elevation:832,source:'固定候補'},
    {id:'fixed19-hg-ningyo-peak',type:'peak',name:'人形山',lat:36.348889,lon:136.939722,elevation:1726,source:'固定候補'}
  ],
  '医王山': [
    {id:'fixed19-hg-io-ionosato',type:'trailhead',name:'医王の里登山者用駐車場',lat:36.529028,lon:136.770472,elevation:515,source:'固定候補'},
    {id:'fixed19-hg-io-nishio',type:'trailhead',name:'西尾平駐車場',lat:36.528833,lon:136.780944,elevation:634,source:'固定候補'},
    {id:'fixed19-hg-io-shigaraku',type:'trailhead',name:'しがらくび駐車場',lat:36.526889,lon:136.788889,elevation:705,source:'固定候補'},
    {id:'fixed19-hg-io-peak',type:'peak',name:'医王山（奥医王山）',lat:36.512778,lon:136.796111,elevation:939,source:'固定候補'}
  ],
  '大門山': [
    {id:'fixed19-hg-daimon-bunao',type:'trailhead',name:'ブナオ峠 大門山登山口',lat:36.372694,lon:136.823722,elevation:984,source:'固定候補'},
    {id:'fixed19-hg-daimon-peak',type:'peak',name:'大門山',lat:36.365278,lon:136.803611,elevation:1572,source:'固定候補'}
  ],
  '大笠山': [
    {id:'fixed19-hg-ogasa-katsura',type:'trailhead',name:'桂湖森林公園駐車場（大笠山ルート起点）',lat:36.327250,lon:136.837167,elevation:574,source:'固定候補'},
    {id:'fixed19-hg-ogasa-bunao',type:'trailhead',name:'ブナオ峠（大笠山ルート）',lat:36.372694,lon:136.823722,elevation:984,source:'固定候補'},
    {id:'fixed19-hg-ogasa-peak',type:'peak',name:'大笠山',lat:36.320556,lon:136.789722,elevation:1822,source:'固定候補'}
  ],
  '笈ヶ岳': [
    {id:'fixed19-hg-oizuru-chugu',type:'trailhead',name:'中宮温泉ビジターセンター（笈ヶ岳ルート起点）',lat:36.262722,lon:136.760389,elevation:606,source:'固定候補'},
    {id:'fixed19-hg-oizuru-peak',type:'peak',name:'笈ヶ岳',lat:36.298611,lon:136.792222,elevation:1841,source:'固定候補'}
  ],
  '三方岩岳': [
    {id:'fixed19-hg-sanpoiwa-p',type:'trailhead',name:'三方岩駐車場',lat:36.263333,lon:136.837778,elevation:1450,source:'固定候補'},
    {id:'fixed19-hg-sanpoiwa-peak',type:'peak',name:'三方岩岳',lat:36.258889,lon:136.844444,elevation:1736,source:'固定候補'}
  ],
  '猿ヶ馬場山': [
    {id:'fixed19-hg-sarugabamba-seseragi',type:'trailhead',name:'村営せせらぎ公園駐車場（猿ヶ馬場山残雪期ルート起点）',lat:36.257363,lon:136.902778,source:'固定候補'},
    {id:'fixed19-hg-sarugabamba-peak',type:'peak',name:'猿ヶ馬場山',lat:36.225833,lon:136.942778,elevation:1875,source:'固定候補'}
  ],
  '白山': [
    {id:'fixed19-hg-hakusan-betto',type:'trailhead',name:'別当出合',lat:36.125064,lon:136.739781,elevation:1260,source:'固定候補'},
    {id:'fixed19-hg-hakusan-ichinose',type:'trailhead',name:'市ノ瀬',lat:36.114278,lon:136.700778,elevation:830,source:'固定候補'},
    {id:'fixed19-hg-hakusan-hirase',type:'trailhead',name:'大白川・平瀬道登山口',lat:36.143583,lon:136.820750,elevation:1235,source:'固定候補'},
    {id:'fixed19-hg-hakusan-murodo',type:'hut',name:'白山室堂',lat:36.148889,lon:136.767500,elevation:2450,source:'固定候補'},
    {id:'fixed19-hg-hakusan-peak',type:'peak',name:'白山（御前峰）',lat:36.155000,lon:136.771389,elevation:2702,source:'固定候補'}
  ],
  '経ヶ岳（福井）': [
    {id:'fixed19-hg-kyogatake-fukui-view',type:'trailhead',name:'経ヶ岳登山口展望台駐車場',lat:36.032889,lon:136.590750,elevation:894,source:'固定候補'},
    {id:'fixed19-hg-kyogatake-fukui-okukoshi',type:'trailhead',name:'奥越高原青少年自然の家',lat:36.023389,lon:136.583389,elevation:596,source:'固定候補'},
    {id:'fixed19-hg-kyogatake-fukui-peak',type:'peak',name:'経ヶ岳（福井）',lat:36.046389,lon:136.621944,elevation:1625,source:'固定候補'}
  ],
  '野伏ヶ岳': [
    {id:'fixed19-hg-nobuse-hakusanchoi',type:'trailhead',name:'白山中居神社（野伏ヶ岳残雪期ルート起点）',lat:35.991056,lon:136.768583,elevation:720,source:'固定候補'},
    {id:'fixed19-hg-nobuse-peak',type:'peak',name:'野伏ヶ岳',lat:36.012778,lon:136.732500,elevation:1674,source:'固定候補'}
  ],
  '大日ヶ岳': [
    {id:'fixed19-hg-dainichi-hinoki',type:'trailhead',name:'桧峠 大日ヶ岳登山口',lat:35.962889,lon:136.808972,elevation:957,source:'固定候補'},
    {id:'fixed19-hg-dainichi-takasu',type:'trailhead',name:'高鷲スノーパーク',lat:35.994944,lon:136.878361,elevation:920,source:'固定候補'},
    {id:'fixed19-hg-dainichi-peak',type:'peak',name:'大日ヶ岳',lat:36.001389,lon:136.837778,elevation:1709,source:'固定候補'}
  ],
  '鷲ヶ岳': [
    {id:'fixed19-hg-washigatake-tateishi',type:'trailhead',name:'鷲ヶ岳立石キャンプ場（林道ルート起点）',lat:35.958899,lon:136.958301,elevation:1100,source:'固定候補'},
    {id:'fixed19-hg-washigatake-peak',type:'peak',name:'鷲ヶ岳',lat:35.940278,lon:136.971389,elevation:1671,source:'固定候補'}
  ],
  '位山': [
    {id:'fixed19-hg-kurai-danabira',type:'trailhead',name:'ダナ平林道登山口',lat:36.047194,lon:137.191556,elevation:1320,source:'固定候補'},
    {id:'fixed19-hg-kurai-montdeus',type:'trailhead',name:'モンデウス飛騨位山',lat:36.062444,lon:137.226333,elevation:900,source:'固定候補'},
    {id:'fixed19-hg-kurai-peak',type:'peak',name:'位山',lat:36.038333,lon:137.196667,elevation:1529,source:'固定候補'}
  ],
  '川上岳': [
    {id:'fixed19-hg-kaore-yamanokuchi',type:'trailhead',name:'山之口登山口 川上岳',lat:36.013611,lon:137.175250,elevation:889,source:'固定候補'},
    {id:'fixed19-hg-kaore-peak',type:'peak',name:'川上岳',lat:36.008333,lon:137.149444,elevation:1625,source:'固定候補'}
  ],
  '荒島岳': [
    {id:'fixed19-hg-arashima-kadohara',type:'trailhead',name:'勝原コース登山口',lat:35.963834,lon:136.604581,elevation:345,source:'固定候補'},
    {id:'fixed19-hg-arashima-nakande',type:'trailhead',name:'中出コース登山口',lat:35.958222,lon:136.558778,elevation:347,source:'固定候補'},
    {id:'fixed19-hg-arashima-peak',type:'peak',name:'荒島岳',lat:35.934167,lon:136.601389,elevation:1523,source:'固定候補'}
  ],
  '能郷白山': [
    {id:'fixed19-hg-nougo-nukumi',type:'trailhead',name:'温見峠',lat:35.779250,lon:136.518528,elevation:1040,source:'固定候補'},
    {id:'fixed19-hg-nougo-peak',type:'peak',name:'能郷白山（権現山）',lat:35.762500,lon:136.514167,elevation:1617,source:'固定候補'}
  ],
  '冠山': [
    {id:'fixed19-hg-kanmuri-toge',type:'trailhead',name:'冠山峠',lat:35.788417,lon:136.393083,elevation:1047,source:'固定候補'},
    {id:'fixed19-hg-kanmuri-peak',type:'peak',name:'冠山',lat:35.779722,lon:136.409444,elevation:1257,source:'固定候補'}
  ]
});

// V1.12.20: 奥秩父・丹沢15座の山頂・主要登山口・山小屋を固定座標化。
// 山頂は国土地理院「日本の主な山岳」を優先。山小屋・登山口は公開座標が確認できた地点のみ採用。
Object.assign(MOUNTAIN_PRESETS, {
  '武甲山': {latitude:35.951667, longitude:139.097778},
  '両神山': {latitude:36.023333, longitude:138.841389},
  '雲取山': {latitude:35.855556, longitude:138.943889},
  '和名倉山（白石山）': {latitude:35.899444, longitude:138.878056},
  '甲武信ヶ岳': {latitude:35.908889, longitude:138.728889},
  '国師ヶ岳': {latitude:35.870833, longitude:138.673056},
  '金峰山': {latitude:35.871389, longitude:138.625278},
  '瑞牆山': {latitude:35.893333, longitude:138.591944},
  '茅ヶ岳': {latitude:35.795000, longitude:138.513889},
  '乾徳山': {latitude:35.823056, longitude:138.715000},
  '大菩薩嶺': {latitude:35.748889, longitude:138.845556},
  '大岳山': {latitude:35.765278, longitude:139.130278},
  '三頭山': {latitude:35.739167, longitude:139.013889},
  '大山（神奈川）': {latitude:35.440833, longitude:139.231389},
  '塔ノ岳': {latitude:35.454167, longitude:139.163333}
});

Object.assign(CURATED_ACCESS_HINTS, {
  '武甲山':{trailheads:['生川・一の鳥居']},
  '両神山':{trailheads:['日向大谷口','尾ノ内渓谷登山口']},
  '雲取山':{trailheads:['鴨沢登山口','小袖乗越・丹波山村村営駐車場'],huts:['雲取山荘']},
  '和名倉山（白石山）':{trailheads:['三ノ瀬（民宿みはらし）']},
  '甲武信ヶ岳':{trailheads:['毛木平登山口'],huts:['甲武信小屋']},
  '国師ヶ岳':{trailheads:['大弛峠']},
  '金峰山':{trailheads:['大弛峠','瑞牆山荘・富士見平口'],huts:['富士見平小屋','大日小屋']},
  '瑞牆山':{trailheads:['瑞牆山荘・富士見平口','みずがき山自然公園'],huts:['富士見平小屋']},
  '茅ヶ岳':{trailheads:['深田記念公園・茅ヶ岳登山口']},
  '乾徳山':{trailheads:['徳和・乾徳山登山口']},
  '大菩薩嶺':{trailheads:['上日川峠'],huts:['介山荘']},
  '大岳山':{trailheads:['白倉・大嶽神社里宮登山口'],huts:['大岳山荘']},
  '三頭山':{trailheads:['山のふるさと村登山口']},
  '大山（神奈川）':{trailheads:['大山ケーブル口・市営第二駐車場','ヤビツ峠']},
  '塔ノ岳':{trailheads:['大倉登山口','戸沢出合'],huts:['尊仏山荘']}
});

Object.assign(BUILTIN_ROUTE_CATALOG, {
  '武甲山': [
    {id:'fixed20-okutan-buko-ichinotorii',type:'trailhead',name:'生川・一の鳥居',lat:35.941718,lon:139.115772,elevation:520,source:'固定候補'},
    {id:'fixed20-okutan-buko-peak',type:'peak',name:'武甲山',lat:35.951667,lon:139.097778,elevation:1304,source:'固定候補'}
  ],
  '両神山': [
    {id:'fixed20-okutan-ryokami-hinata',type:'trailhead',name:'日向大谷口',lat:36.027967,lon:138.878234,elevation:640,source:'固定候補'},
    {id:'fixed20-okutan-ryokami-onouchi',type:'trailhead',name:'尾ノ内渓谷登山口',lat:36.046278,lon:138.866194,elevation:523,source:'固定候補'},
    {id:'fixed20-okutan-ryokami-peak',type:'peak',name:'両神山',lat:36.023333,lon:138.841389,elevation:1723,source:'固定候補'}
  ],
  '雲取山': [
    {id:'fixed20-okutan-kumotori-kamosawa',type:'trailhead',name:'鴨沢登山口',lat:35.780424,lon:138.984381,elevation:550,source:'固定候補'},
    {id:'fixed20-okutan-kumotori-kosode',type:'trailhead',name:'小袖乗越・丹波山村村営駐車場',lat:35.785900,lon:138.977500,elevation:738,source:'固定候補'},
    {id:'fixed20-okutan-kumotori-hut',type:'hut',name:'雲取山荘',lat:35.860833,lon:138.943333,elevation:1836,source:'固定候補'},
    {id:'fixed20-okutan-kumotori-peak',type:'peak',name:'雲取山',lat:35.855556,lon:138.943889,elevation:2017,source:'固定候補'}
  ],
  '和名倉山（白石山）': [
    {id:'fixed20-okutan-wanakura-sannose',type:'trailhead',name:'三ノ瀬（民宿みはらし）',lat:35.838773,lon:138.837935,elevation:1280,source:'固定候補'},
    {id:'fixed20-okutan-wanakura-peak',type:'peak',name:'和名倉山（白石山）',lat:35.899444,lon:138.878056,elevation:2036,source:'固定候補'}
  ],
  '甲武信ヶ岳': [
    {id:'fixed20-okutan-kobushi-mokidaira',type:'trailhead',name:'毛木平登山口',lat:35.954134,lon:138.710874,elevation:1460,source:'固定候補'},
    {id:'fixed20-okutan-kobushi-hut',type:'hut',name:'甲武信小屋',lat:35.906944,lon:138.730556,elevation:2360,source:'固定候補'},
    {id:'fixed20-okutan-kobushi-peak',type:'peak',name:'甲武信ヶ岳',lat:35.908889,lon:138.728889,elevation:2475,source:'固定候補'}
  ],
  '国師ヶ岳': [
    {id:'fixed20-okutan-kokushi-odarumi',type:'trailhead',name:'大弛峠',lat:35.872723,lon:138.662769,elevation:2360,source:'固定候補'},
    {id:'fixed20-okutan-kokushi-peak',type:'peak',name:'国師ヶ岳',lat:35.870833,lon:138.673056,elevation:2592,source:'固定候補'}
  ],
  '金峰山': [
    {id:'fixed20-okutan-kinpu-odarumi',type:'trailhead',name:'大弛峠',lat:35.872723,lon:138.662769,elevation:2360,source:'固定候補'},
    {id:'fixed20-okutan-kinpu-mizugaki',type:'trailhead',name:'瑞牆山荘・富士見平口',lat:35.878124,lon:138.580085,elevation:1530,source:'固定候補'},
    {id:'fixed20-okutan-kinpu-fujimidaira',type:'hut',name:'富士見平小屋',lat:35.882500,lon:138.587500,elevation:1814,source:'固定候補'},
    {id:'fixed20-okutan-kinpu-dainichi',type:'hut',name:'大日小屋',lat:35.880833,lon:138.601111,elevation:1976,source:'固定候補'},
    {id:'fixed20-okutan-kinpu-peak',type:'peak',name:'金峰山',lat:35.871389,lon:138.625278,elevation:2599,source:'固定候補'}
  ],
  '瑞牆山': [
    {id:'fixed20-okutan-mizugaki-sanso',type:'trailhead',name:'瑞牆山荘・富士見平口',lat:35.878124,lon:138.580085,elevation:1530,source:'固定候補'},
    {id:'fixed20-okutan-mizugaki-park',type:'trailhead',name:'みずがき山自然公園',lat:35.896278,lon:138.573306,elevation:1460,source:'固定候補'},
    {id:'fixed20-okutan-mizugaki-fujimidaira',type:'hut',name:'富士見平小屋',lat:35.882500,lon:138.587500,elevation:1814,source:'固定候補'},
    {id:'fixed20-okutan-mizugaki-peak',type:'peak',name:'瑞牆山',lat:35.893333,lon:138.591944,elevation:2230,source:'固定候補'}
  ],
  '茅ヶ岳': [
    {id:'fixed20-okutan-kaya-fukada',type:'trailhead',name:'深田記念公園・茅ヶ岳登山口',lat:35.770061,lon:138.506805,elevation:940,source:'固定候補'},
    {id:'fixed20-okutan-kaya-peak',type:'peak',name:'茅ヶ岳',lat:35.795000,lon:138.513889,elevation:1704,source:'固定候補'}
  ],
  '乾徳山': [
    {id:'fixed20-okutan-kentoku-tokuwa',type:'trailhead',name:'徳和・乾徳山登山口',lat:35.790770,lon:138.724621,elevation:830,source:'固定候補'},
    {id:'fixed20-okutan-kentoku-peak',type:'peak',name:'乾徳山',lat:35.823056,lon:138.715000,elevation:2031,source:'固定候補'}
  ],
  '大菩薩嶺': [
    {id:'fixed20-okutan-daibosatsu-kamihikawa',type:'trailhead',name:'上日川峠',lat:35.731528,lon:138.832528,elevation:1580,source:'固定候補'},
    {id:'fixed20-okutan-daibosatsu-kaizan',type:'hut',name:'介山荘',lat:35.736111,lon:138.852778,elevation:1889,source:'固定候補'},
    {id:'fixed20-okutan-daibosatsu-peak',type:'peak',name:'大菩薩嶺',lat:35.748889,lon:138.845556,elevation:2057,source:'固定候補'}
  ],
  '大岳山': [
    {id:'fixed20-okutan-odake-shirakura',type:'trailhead',name:'白倉・大嶽神社里宮登山口',lat:35.744361,lon:139.133833,elevation:382,source:'固定候補'},
    {id:'fixed20-okutan-odake-hut',type:'hut',name:'大岳山荘',lat:35.764618,lon:139.133311,source:'固定候補'},
    {id:'fixed20-okutan-odake-peak',type:'peak',name:'大岳山',lat:35.765278,lon:139.130278,elevation:1266,source:'固定候補'}
  ],
  '三頭山': [
    {id:'fixed20-okutan-mitou-furusato',type:'trailhead',name:'山のふるさと村登山口',lat:35.766306,lon:139.023056,elevation:548,source:'固定候補'},
    {id:'fixed20-okutan-mitou-peak',type:'peak',name:'三頭山',lat:35.739167,lon:139.013889,elevation:1531,source:'固定候補'}
  ],
  '大山（神奈川）': [
    {id:'fixed20-tanzawa-oyama-cable',type:'trailhead',name:'大山ケーブル口・市営第二駐車場',lat:35.424634,lon:139.249003,elevation:315,source:'固定候補'},
    {id:'fixed20-tanzawa-oyama-yabitsu',type:'trailhead',name:'ヤビツ峠',lat:35.428127,lon:139.219122,elevation:760,source:'固定候補'},
    {id:'fixed20-tanzawa-oyama-peak',type:'peak',name:'大山（神奈川）',lat:35.440833,lon:139.231389,elevation:1252,source:'固定候補'}
  ],
  '塔ノ岳': [
    {id:'fixed20-tanzawa-tonodake-okura',type:'trailhead',name:'大倉登山口',lat:35.404065,lon:139.168805,elevation:290,source:'固定候補'},
    {id:'fixed20-tanzawa-tonodake-tosawa',type:'trailhead',name:'戸沢出合',lat:35.435478,lon:139.173273,elevation:570,source:'固定候補'},
    {id:'fixed20-tanzawa-tonodake-sonbutsu',type:'hut',name:'尊仏山荘',lat:35.454167,lon:139.163333,elevation:1491,source:'固定候補'},
    {id:'fixed20-tanzawa-tonodake-peak',type:'peak',name:'塔ノ岳',lat:35.454167,lon:139.163333,elevation:1491,source:'固定候補'}
  ]
});

// V1.12.21: 北信・頸城10座の山頂・主要登山口・山小屋／避難小屋を固定座標化。
// 山頂は国土地理院「日本の主な山岳」を優先。登山口・山小屋は公開座標が確認できた地点のみ採用。
Object.assign(MOUNTAIN_PRESETS, {
  '飯縄山': {latitude:36.739444, longitude:138.133611},
  '戸隠山': {latitude:36.770278, longitude:138.055000},
  '高妻山': {latitude:36.800000, longitude:138.051944},
  '黒姫山': {latitude:36.813333, longitude:138.127222},
  '斑尾山': {latitude:36.837500, longitude:138.274444},
  '妙高山': {latitude:36.891389, longitude:138.113333},
  '火打山': {latitude:36.922778, longitude:138.068056},
  '焼山': {latitude:36.920833, longitude:138.035833},
  '雨飾山': {latitude:36.901944, longitude:137.962500},
  '青海黒姫山': {latitude:36.976667, longitude:137.790000}
});

Object.assign(BUILTIN_ROUTE_CATALOG, {
  '飯縄山': [
    {id:'fixed21-hk-iizuna-ichinotorii',type:'trailhead',name:'一の鳥居苑地・飯縄山登山者駐車場',lat:36.711077,lon:138.124645,elevation:1130,source:'固定候補'},
    {id:'fixed21-hk-iizuna-peak',type:'peak',name:'飯縄山',lat:36.739444,lon:138.133611,elevation:1917,source:'固定候補'}
  ],
  '戸隠山': [
    {id:'fixed21-hk-togakushi-okusha',type:'trailhead',name:'戸隠神社奥社登山口',lat:36.765233,lon:138.062600,elevation:1350,source:'固定候補'},
    {id:'fixed21-hk-togakushi-camp',type:'trailhead',name:'戸隠キャンプ場・戸隠牧場',lat:36.769172,lon:138.090407,elevation:1170,source:'固定候補'},
    {id:'fixed21-hk-togakushi-ichifudo',type:'hut',name:'一不動避難小屋',lat:36.782533,lon:138.063200,elevation:1747,source:'固定候補'},
    {id:'fixed21-hk-togakushi-peak',type:'peak',name:'戸隠山',lat:36.770278,lon:138.055000,elevation:1904,source:'固定候補'}
  ],
  '高妻山': [
    {id:'fixed21-hk-takatsuma-camp',type:'trailhead',name:'戸隠キャンプ場・高妻山登山者駐車場',lat:36.769172,lon:138.090407,elevation:1170,source:'固定候補'},
    {id:'fixed21-hk-takatsuma-ichifudo',type:'hut',name:'一不動避難小屋',lat:36.782533,lon:138.063200,elevation:1747,source:'固定候補'},
    {id:'fixed21-hk-takatsuma-peak',type:'peak',name:'高妻山',lat:36.800000,lon:138.051944,elevation:2353,source:'固定候補'}
  ],
  '黒姫山': [
    {id:'fixed21-hk-kurohime-ohashi',type:'trailhead',name:'大橋林道口・黒姫山登山口',lat:36.779899,lon:138.099342,elevation:1140,source:'固定候補'},
    {id:'fixed21-hk-kurohime-peak',type:'peak',name:'黒姫山',lat:36.813333,lon:138.127222,elevation:2053,source:'固定候補'}
  ],
  '斑尾山': [
    {id:'fixed21-hk-madarao-visitor',type:'trailhead',name:'斑尾高原ビジターセンター（山の家）',lat:36.855448,lon:138.296359,elevation:965,source:'固定候補'},
    {id:'fixed21-hk-madarao-ski',type:'trailhead',name:'斑尾高原スキー場',lat:36.851825,lon:138.291592,elevation:960,source:'固定候補'},
    {id:'fixed21-hk-madarao-peak',type:'peak',name:'斑尾山',lat:36.837500,lon:138.274444,elevation:1382,source:'固定候補'}
  ],
  '妙高山': [
    {id:'fixed21-hk-myoko-tsubame',type:'trailhead',name:'燕温泉登山口',lat:36.900946,lon:138.148066,elevation:1080,source:'固定候補'},
    {id:'fixed21-hk-myoko-sasagamine',type:'trailhead',name:'笹ヶ峰登山口',lat:36.868699,lon:138.078730,elevation:1310,source:'固定候補'},
    {id:'fixed21-hk-myoko-koyaike',type:'hut',name:'高谷池ヒュッテ',lat:36.909722,lon:138.084722,elevation:2101,source:'固定候補'},
    {id:'fixed21-hk-myoko-kurosawa',type:'hut',name:'黒沢池ヒュッテ',lat:36.906389,lon:138.101389,elevation:2007,source:'固定候補'},
    {id:'fixed21-hk-myoko-peak',type:'peak',name:'妙高山',lat:36.891389,lon:138.113333,elevation:2454,source:'固定候補'}
  ],
  '火打山': [
    {id:'fixed21-hk-hiuchi-sasagamine',type:'trailhead',name:'笹ヶ峰登山口',lat:36.868699,lon:138.078730,elevation:1310,source:'固定候補'},
    {id:'fixed21-hk-hiuchi-koyaike',type:'hut',name:'高谷池ヒュッテ',lat:36.909722,lon:138.084722,elevation:2101,source:'固定候補'},
    {id:'fixed21-hk-hiuchi-kurosawa',type:'hut',name:'黒沢池ヒュッテ',lat:36.906389,lon:138.101389,elevation:2007,source:'固定候補'},
    {id:'fixed21-hk-hiuchi-peak',type:'peak',name:'火打山',lat:36.922778,lon:138.068056,elevation:2462,source:'固定候補'}
  ],
  '焼山': [
    {id:'fixed21-hk-yakeyama-gate',type:'trailhead',name:'焼山林道第2ゲート（焼山ルート起点）',lat:36.972025,lon:138.030806,elevation:850,source:'固定候補'},
    {id:'fixed21-hk-yakeyama-kanayama',type:'trailhead',name:'金山登山口（小谷側）',lat:36.869778,lon:138.008111,elevation:1240,source:'固定候補'},
    {id:'fixed21-hk-yakeyama-peak',type:'peak',name:'新潟焼山',lat:36.920833,lon:138.035833,elevation:2400,source:'固定候補'}
  ],
  '雨飾山': [
    {id:'fixed21-hk-amakazari-camp',type:'trailhead',name:'雨飾高原キャンプ場登山口',lat:36.882084,lon:137.974519,elevation:1160,source:'固定候補'},
    {id:'fixed21-hk-amakazari-ooami',type:'trailhead',name:'大網登山口',lat:36.884825,lon:137.944280,elevation:920,source:'固定候補'},
    {id:'fixed21-hk-amakazari-sanso',type:'hut',name:'雨飾山荘（雨飾温泉）',lat:36.920556,lon:137.954444,elevation:882,source:'固定候補'},
    {id:'fixed21-hk-amakazari-peak',type:'peak',name:'雨飾山',lat:36.901944,lon:137.962500,elevation:1963,source:'固定候補'}
  ],
  '青海黒姫山': [
    {id:'fixed21-hk-oumi-shimizukura',type:'trailhead',name:'清水倉登山口',lat:36.986032,lon:137.766972,elevation:90,source:'固定候補'},
    {id:'fixed21-hk-oumi-peak',type:'peak',name:'青海黒姫山',lat:36.976667,lon:137.790000,elevation:1221,source:'固定候補'}
  ]
});
// V1.12.29: 九州22座を再監査。山頂は国土地理院2026-03-31版へ統一し、主要登山口を再確認。
// 多良岳は従来の多良嶽神社上宮983mではなく、国土地理院の多良岳996mを山頂として採用。
// 桜島は入山規制中のため、湯之平展望所を「アクセス地点・入山不可」と明記して固定。
const V1229_KYUSHU_PEAKS = {
  "英彦山":{latitude:33.476247,longitude:130.925973,elevation:1199,label:"英彦山"},
  "脊振山":{latitude:33.43644,longitude:130.368623,elevation:1054,label:"脊振山"},
  "多良岳":{latitude:32.975491,longitude:130.092539,elevation:996,label:"多良岳"},
  "雲仙岳（普賢岳）":{latitude:32.759909,longitude:130.292147,elevation:1359,label:"雲仙岳（普賢岳）"},
  "鶴見岳":{latitude:33.286621,longitude:131.429751,elevation:1375,label:"鶴見岳"},
  "由布岳":{latitude:33.282267,longitude:131.390233,elevation:1583,label:"由布岳"},
  "大船山":{latitude:33.095024,longitude:131.28069,elevation:1786,label:"大船山"},
  "久住山":{latitude:33.082187,longitude:131.240871,elevation:1786,label:"久住山"},
  "湧蓋山":{latitude:33.139941,longitude:131.164344,elevation:1499,label:"涌蓋山"},
  "阿蘇山（高岳）":{latitude:32.884318,longitude:131.103918,elevation:1592,label:"阿蘇山（高岳）"},
  "祖母山":{latitude:32.828131,longitude:131.347045,elevation:1756,label:"祖母山"},
  "傾山":{latitude:32.839,longitude:131.475911,elevation:1605,label:"傾山"},
  "大崩山":{latitude:32.737774,longitude:131.513389,elevation:1644,label:"大崩山"},
  "国見岳":{latitude:32.547131,longitude:131.018363,elevation:1739,label:"国見岳"},
  "市房山":{latitude:32.311682,longitude:131.101036,elevation:1720,label:"市房山"},
  "尾鈴山":{latitude:32.299301,longitude:131.426587,elevation:1405,label:"尾鈴山"},
  "霧島山（韓国岳）":{latitude:31.93417,longitude:130.861577,elevation:1700,label:"霧島山（韓国岳）"},
  "高千穂峰":{latitude:31.886257,longitude:130.918939,elevation:1573,label:"高千穂峰"},
  "桜島（御岳）":{latitude:31.592626,longitude:130.656638,elevation:1117,label:"桜島（御岳・北岳）"},
  "高隈山":{latitude:31.486212,longitude:130.818538,elevation:1236,label:"高隈山（大箆柄岳）"},
  "開聞岳":{latitude:31.179926,longitude:130.528406,elevation:924,label:"開聞岳"},
  "宮ノ浦岳":{latitude:30.335951,longitude:130.504287,elevation:1936,label:"宮ノ浦岳"},
};
Object.assign(MOUNTAIN_PRESETS, Object.fromEntries(Object.entries(V1229_KYUSHU_PEAKS).map(([n,p])=>[n,{latitude:p.latitude,longitude:p.longitude}])));
for (const [mountain,p] of Object.entries(V1229_KYUSHU_PEAKS)) {
  const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
  const fixedPeak={id:`fixed29-kyushu-peak-${mountain}`,type:'peak',name:p.label,lat:p.latitude,lon:p.longitude,elevation:p.elevation,source:'固定候補'};
  BUILTIN_ROUTE_CATALOG[mountain]=[fixedPeak,...old.filter(x=>x.type!=='peak')];
}
const V1229_KYUSHU_ACCESS = {
  "英彦山":[
    {id:"fixed29-英彦山-別所駐車場・英彦山登山口",type:"trailhead",name:"別所駐車場・英彦山登山口",lat:33.488861,lon:130.905111,elevation:633,source:'固定候補'},
    {id:"fixed29-英彦山-豊前坊・高住神社登山口",type:"trailhead",name:"豊前坊・高住神社登山口",lat:33.484778,lon:130.932028,elevation:796,source:'固定候補'},
  ],
  "脊振山":[
    {id:"fixed29-脊振山-脊振山山頂駐車場",type:"trailhead",name:"脊振山山頂駐車場",lat:33.434361,lon:130.369944,elevation:996,source:'固定候補'},
    {id:"fixed29-脊振山-椎原峠登山口",type:"trailhead",name:"椎原峠登山口",lat:33.455389,lon:130.349139,elevation:423,source:'固定候補'},
  ],
  "多良岳":[
    {id:"fixed29-多良岳-黒木第2駐車場・黒木登山口",type:"trailhead",name:"黒木第2駐車場・黒木登山口",lat:32.975944,lon:130.063361,elevation:352,source:'固定候補'},
    {id:"fixed29-多良岳-中山キャンプ場（中山登山口）",type:"trailhead",name:"中山キャンプ場（中山登山口）",lat:32.985306,lon:130.094306,elevation:548,source:'固定候補'},
  ],
  "雲仙岳（普賢岳）":[
    {id:"fixed29-雲仙岳（普賢岳）-仁田峠第一展望所駐車場・普賢岳登山口",type:"trailhead",name:"仁田峠第一展望所駐車場・普賢岳登山口",lat:32.750611,lon:130.28375,elevation:1066,source:'固定候補'},
  ],
  "鶴見岳":[
    {id:"fixed29-鶴見岳-火男火売神社登山口駐車場",type:"trailhead",name:"火男火売神社登山口駐車場",lat:33.272528,lon:131.439583,elevation:700,source:'固定候補'},
    {id:"fixed29-鶴見岳-別府ロープウェイ 鶴見山上駅",type:"trailhead",name:"別府ロープウェイ 鶴見山上駅",lat:33.285174,lon:131.433301,elevation:1300,source:'固定候補'},
  ],
  "由布岳":[
    {id:"fixed29-由布岳-由布岳正面登山口駐車場",type:"trailhead",name:"由布岳正面登山口駐車場",lat:33.264611,lon:131.396278,elevation:780,source:'固定候補'},
  ],
  "大船山":[
    {id:"fixed29-大船山-男池駐車場・男池登山口",type:"trailhead",name:"男池駐車場・男池登山口",lat:33.125559,lon:131.294777,elevation:850,source:'固定候補'},
    {id:"fixed29-大船山-吉部（坊ガツル）登山口駐車場",type:"trailhead",name:"吉部（坊ガツル）登山口駐車場",lat:33.133222,lon:131.255389,elevation:935,source:'固定候補'},
  ],
  "久住山":[
    {id:"fixed29-久住山-牧ノ戸峠",type:"trailhead",name:"牧ノ戸峠",lat:33.096111,lon:131.207861,elevation:1330,source:'固定候補'},
    {id:"fixed29-久住山-長者原",type:"trailhead",name:"長者原",lat:33.118694,lon:131.229583,elevation:1036,source:'固定候補'},
  ],
  "湧蓋山":[
    {id:"fixed29-湧蓋山-八丁原登山口",type:"trailhead",name:"八丁原登山口",lat:33.104667,lon:131.179694,elevation:1100,source:'固定候補'},
  ],
  "阿蘇山（高岳）":[
    {id:"fixed29-阿蘇山（高岳）-仙酔峡駐車場・仙酔峡登山口",type:"trailhead",name:"仙酔峡駐車場・仙酔峡登山口",lat:32.899281,lon:131.102628,elevation:980,source:'固定候補'},
  ],
  "祖母山":[
    {id:"fixed29-祖母山-北谷登山口駐車場・北谷登山口",type:"trailhead",name:"北谷登山口駐車場・北谷登山口",lat:32.820472,lon:131.325167,elevation:1110,source:'固定候補'},
    {id:"fixed29-祖母山-神原登山口",type:"trailhead",name:"神原登山口",lat:32.854333,lon:131.339778,elevation:690,source:'固定候補'},
  ],
  "傾山":[
    {id:"fixed29-傾山-九折登山口 傾山",type:"trailhead",name:"九折登山口 傾山",lat:32.853167,lon:131.446861,elevation:374,source:'固定候補'},
  ],
  "大崩山":[
    {id:"fixed29-大崩山-祝子川 大崩山登山口",type:"trailhead",name:"祝子川 大崩山登山口",lat:32.743611,lon:131.542611,elevation:612,source:'固定候補'},
  ],
  "国見岳":[
    {id:"fixed29-国見岳-国見岳新登山口（五勇谷橋ルート）",type:"trailhead",name:"国見岳新登山口（五勇谷橋ルート）",lat:32.53225,lon:130.995194,elevation:1010,source:'固定候補'},
  ],
  "市房山":[
    {id:"fixed29-市房山-市房山キャンプ場アクセス起点",type:"trailhead",name:"市房山キャンプ場（市房山登山口アクセス起点）",lat:32.31825,lon:131.070306,elevation:574,source:'固定候補'},
  ],
  "尾鈴山":[
    {id:"fixed29-尾鈴山-尾鈴山第1駐車場",type:"trailhead",name:"尾鈴山第1駐車場（尾鈴山登山口アクセス起点）",lat:32.284889,lon:131.465306,elevation:410,source:'固定候補'},
  ],
  "霧島山（韓国岳）":[
    {id:"fixed29-霧島山（韓国岳）-えびの高原・韓国岳登山口",type:"trailhead",name:"えびの高原・韓国岳登山口",lat:31.9457,lon:130.8428,elevation:1180,source:'固定候補'},
    {id:"fixed29-霧島山（韓国岳）-大浪池登山口",type:"trailhead",name:"大浪池登山口",lat:31.9144795,lon:130.8411962,elevation:1070,source:'固定候補'},
  ],
  "高千穂峰":[
    {id:"fixed29-高千穂峰-高千穂河原駐車場・高千穂峰登山口",type:"trailhead",name:"高千穂河原駐車場・高千穂峰登山口",lat:31.884944,lon:130.895278,elevation:965,source:'固定候補'},
  ],
  "桜島（御岳）":[
    {id:"fixed29-桜島（御岳）-湯之平展望所",type:"trailhead",name:"湯之平展望所（一般立入可能な最高地点・山頂入山不可）",lat:31.591463,lon:130.630017,elevation:373,source:'固定候補'},
  ],
  "高隈山":[
    {id:"fixed29-高隈山-大箆柄岳垂桜コース駐車場",type:"trailhead",name:"大箆柄岳 垂桜コース駐車場・登山口",lat:31.496222,lon:130.795306,elevation:672,source:'固定候補'},
  ],
  "開聞岳":[
    {id:"fixed29-開聞岳-かいもん山麓ふれあい公園駐車場",type:"trailhead",name:"かいもん山麓ふれあい公園駐車場・開聞岳登山口アクセス",lat:31.196611,lon:130.533639,elevation:120,source:'固定候補'},
  ],
  "宮ノ浦岳":[
    {id:"fixed29-宮ノ浦岳-淀川登山口",type:"trailhead",name:"淀川登山口",lat:30.299559,lon:130.533802,elevation:1360,source:'固定候補'},
    {id:"fixed29-宮ノ浦岳-淀川小屋",type:"hut",name:"淀川小屋",lat:30.3,lon:130.523889,elevation:1385,source:'固定候補'},
  ],
};
const V1229_KYUSHU_STALE_ACCESS_NAMES = {
  "多良岳":new Set(["黒木登山口","中山キャンプ場 多良岳"]),
  "鶴見岳":new Set(["火男火売神社登山口"]),
  "由布岳":new Set(["由布岳正面登山口"]),
  "大船山":new Set(["男池登山口"]),
  "阿蘇山（高岳）":new Set(["仙酔峡登山口"]),
  "祖母山":new Set(["北谷登山口"]),
  "市房山":new Set(["市房山キャンプ場 登山口"]),
  "高千穂峰":new Set(["高千穂河原"]),
  "開聞岳":new Set(["かいもん山麓ふれあい公園登山口"]),
};
for (const [mountain,pts] of Object.entries(V1229_KYUSHU_ACCESS)) {
  const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
  const keys=new Set(pts.map(x=>`${x.type}:${x.name}`));
  const stale=V1229_KYUSHU_STALE_ACCESS_NAMES[mountain]||new Set();
  BUILTIN_ROUTE_CATALOG[mountain]=[...pts,...old.filter(x=>!keys.has(`${x.type}:${x.name}`)&&!stale.has(x.name))];
}
Object.assign(CURATED_ACCESS_HINTS, {
  "英彦山":{trailheads:["別所駐車場・英彦山登山口", "豊前坊・高住神社登山口"]},
  "脊振山":{trailheads:["脊振山山頂駐車場", "椎原峠登山口"]},
  "多良岳":{trailheads:["黒木第2駐車場・黒木登山口", "中山キャンプ場（中山登山口）"]},
  "雲仙岳（普賢岳）":{trailheads:["仁田峠第一展望所駐車場・普賢岳登山口"]},
  "鶴見岳":{trailheads:["火男火売神社登山口駐車場", "別府ロープウェイ 鶴見山上駅"]},
  "由布岳":{trailheads:["由布岳正面登山口駐車場"]},
  "大船山":{trailheads:["男池駐車場・男池登山口", "吉部（坊ガツル）登山口駐車場"],huts:["法華院温泉山荘", "坊ガツル"]},
  "久住山":{trailheads:["牧ノ戸峠", "長者原"],huts:["久住分かれ避難小屋", "法華院温泉山荘"]},
  "湧蓋山":{trailheads:["八丁原登山口"]},
  "阿蘇山（高岳）":{trailheads:["仙酔峡駐車場・仙酔峡登山口"],huts:["月見小屋"]},
  "祖母山":{trailheads:["北谷登山口駐車場・北谷登山口", "神原登山口"],huts:["祖母山九合目小屋"]},
  "傾山":{trailheads:["九折登山口 傾山"]},
  "大崩山":{trailheads:["祝子川 大崩山登山口"],huts:["大崩山荘"]},
  "国見岳":{trailheads:["国見岳新登山口（五勇谷橋ルート）"]},
  "市房山":{trailheads:["市房山キャンプ場（市房山登山口アクセス起点）"]},
  "尾鈴山":{trailheads:["尾鈴山第1駐車場（尾鈴山登山口アクセス起点）"]},
  "霧島山（韓国岳）":{trailheads:["えびの高原・韓国岳登山口", "大浪池登山口"]},
  "高千穂峰":{trailheads:["高千穂河原駐車場・高千穂峰登山口"]},
  "桜島（御岳）":{trailheads:["湯之平展望所（一般立入可能な最高地点・山頂入山不可）"]},
  "高隈山":{trailheads:["大箆柄岳 垂桜コース駐車場・登山口"]},
  "開聞岳":{trailheads:["かいもん山麓ふれあい公園駐車場・開聞岳登山口アクセス"]},
  "宮ノ浦岳":{trailheads:["淀川登山口"],huts:["淀川小屋"]},
});

// V1.12.29 alias bridge: UI label "宮ノ浦岳" is canonicalized to "宮之浦岳" before candidate loading.
// Mirror the re-audited peak/access points to the canonical key so the fixed values are actually used at runtime.
MOUNTAIN_PRESETS['宮之浦岳'] = {...MOUNTAIN_PRESETS['宮ノ浦岳']};
{
  const curated = BUILTIN_ROUTE_CATALOG['宮ノ浦岳'] || [];
  const old = BUILTIN_ROUTE_CATALOG['宮之浦岳'] || [];
  const curatedKeys = new Set(curated.map(x=>`${x.type}:${x.name}`));
  BUILTIN_ROUTE_CATALOG['宮之浦岳'] = [
    ...curated,
    ...old.filter(x=>x.type!=='peak' && !curatedKeys.has(`${x.type}:${x.name}`))
  ];
}
CURATED_ACCESS_HINTS['宮之浦岳'] = CURATED_ACCESS_HINTS['宮ノ浦岳'];


// V1.12.30: 全国固定登山口カバー最終5座を再監査して固定。
// 山頂は国土地理院「日本の主な山岳」を基準に確認。
// 「黒岳」は北アルプスの水晶岳（別名・黒岳）ではなく、日本三百名山の御坂黒岳。
const V1230_FINAL5_PEAKS = {
  '大天井岳':{latitude:36.365000,longitude:137.701111,elevation:2922,label:'大天井岳'},
  '七面山':{latitude:35.369444,longitude:138.348889,elevation:1989,label:'七面山'},
  '山伏':{latitude:35.304444,longitude:138.285278,elevation:2013,label:'山伏'},
  '御正体山':{latitude:35.486944,longitude:138.931667,elevation:1681,label:'御正体山'},
  '黒岳':{latitude:35.551944,longitude:138.749444,elevation:1793,label:'黒岳（御坂黒岳）'},
};
Object.assign(MOUNTAIN_PRESETS, Object.fromEntries(Object.entries(V1230_FINAL5_PEAKS).map(([n,p])=>[n,{latitude:p.latitude,longitude:p.longitude}])));
for (const [mountain,p] of Object.entries(V1230_FINAL5_PEAKS)) {
  const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
  const fixedPeak={id:`fixed30-final5-peak-${mountain}`,type:'peak',name:p.label,lat:p.latitude,lon:p.longitude,elevation:p.elevation,source:'固定候補'};
  BUILTIN_ROUTE_CATALOG[mountain]=[fixedPeak,...old.filter(x=>x.type!=='peak')];
}
const V1230_FINAL5_ACCESS = {
  '大天井岳':[
    {id:'fixed30-otensho-nakabusa',type:'trailhead',name:'中房登山口（燕岳・大天井岳 表銀座ルート）',lat:36.389401,lon:137.747800,elevation:1390,source:'固定候補'}
  ],
  '七面山':[
    {id:'fixed30-shichimen-hagoromo',type:'trailhead',name:'羽衣・七面山表参道駐車場',lat:35.386001,lon:138.378645,elevation:480,source:'固定候補'}
  ],
  '山伏':[
    {id:'fixed30-yanbushi-hyakujotoge',type:'trailhead',name:'百畳峠（百畳平）駐車場・山伏登山口',lat:35.296019,lon:138.280566,elevation:1770,source:'固定候補'}
  ],
  '御正体山':[
    {id:'fixed30-mishotai-dozaka',type:'trailhead',name:'道坂トンネル都留側駐車場・御正体山登山口',lat:35.511901,lon:138.967737,elevation:1010,source:'固定候補'}
  ],
  '黒岳':[
    {id:'fixed30-misakakuro-shinmisaka',type:'trailhead',name:'新御坂トンネル御坂口駐車場（御坂黒岳ルート）',lat:35.572695,lon:138.764949,elevation:990,source:'固定候補'}
  ],
};
for (const [mountain,pts] of Object.entries(V1230_FINAL5_ACCESS)) {
  const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
  const keys=new Set(pts.map(x=>`${x.type}:${x.name}`));
  BUILTIN_ROUTE_CATALOG[mountain]=[...pts,...old.filter(x=>!keys.has(`${x.type}:${x.name}`))];
}
Object.assign(CURATED_ACCESS_HINTS, {
  '大天井岳':{trailheads:['中房登山口（燕岳・大天井岳 表銀座ルート）']},
  '七面山':{trailheads:['羽衣・七面山表参道駐車場']},
  '山伏':{trailheads:['百畳峠（百畳平）駐車場・山伏登山口']},
  '御正体山':{trailheads:['道坂トンネル都留側駐車場・御正体山登山口']},
  '黒岳':{trailheads:['新御坂トンネル御坂口駐車場（御坂黒岳ルート）']},
});


// V1.12.37: 西穂高岳〜奥穂高岳縦走の追加ピーク「ジャンダルム」を固定。
// 公開座標を複数照合し、36°17′16.001″N / 137°38′37.000″E を10進表記へ変換。
// 標高 3,163m。山行可否・ルート難易度を保証するものではない。
const V1237_GENDARME = {
  latitude:36.287778,
  longitude:137.643611,
  elevation:3163
};
MOUNTAIN_PRESETS['ジャンダルム'] = {
  latitude:V1237_GENDARME.latitude,
  longitude:V1237_GENDARME.longitude
};
BUILTIN_ROUTE_CATALOG['ジャンダルム'] = [
  {id:'fixed37-gendarme-peak',type:'peak',name:'ジャンダルム',lat:V1237_GENDARME.latitude,lon:V1237_GENDARME.longitude,elevation:V1237_GENDARME.elevation,source:'固定候補'}
];
MOUNTAIN_REGION['ジャンダルム'] = 'nishiho_yake';
{
  const gendarmePoint={id:'fixed37-hotaka-gendarme',type:'peak',name:'ジャンダルム',lat:V1237_GENDARME.latitude,lon:V1237_GENDARME.longitude,elevation:V1237_GENDARME.elevation,source:'固定候補'};
  const old=REGIONAL_CATALOG.nishiho_yake||[];
  if(!old.some(p=>p.name==='ジャンダルム')) REGIONAL_CATALOG.nishiho_yake=[...old,gendarmePoint];
}
