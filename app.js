const $ = id => document.getElementById(id);
const HUT_OFFICIAL_SITES = Object.freeze({
  '槍ヶ岳山荘':'https://www.yarigatake.co.jp/yarigatake/',
  '槍沢ロッヂ':'https://www.yarigatake.co.jp/yarisawa/',
  '南岳小屋':'https://www.yarigatake.co.jp/minamidake/',
  '燕山荘':'https://www.enzanso.co.jp/enzanso',
  '合戦小屋':'https://www.enzanso.co.jp/',
  '大天荘':'https://www.enzanso.co.jp/daitenso',
  '双六小屋':'https://www.sugorokugoya.com/sugoroku/',
  '黒部五郎小舎':'https://www.sugorokugoya.com/',
  '鏡平山荘':'https://www.sugorokugoya.com/',
  'わさび平小屋':'https://www.sugorokugoya.com/',
  '穂高岳山荘':'https://www.hotakadakesanso.com/',
  '涸沢ヒュッテ':'https://karasawa-hyutte.com/',
  '涸沢小屋':'https://karasawagoya.com/',
  '北穂高小屋':'https://www.kitaho.co.jp/',
  '白馬山荘':'https://hakubakan.com/lodge/hakubasanso/',
  '白馬大池山荘':'https://hakubakan.com/lodge/hakubaoikesanso/',
  '五竜山荘':'https://hakubakan.com/lodge/goryusanso/',
  'キレット小屋':'https://hakubakan.com/lodge/kiretto/',
  '常念小屋':'https://www.mt-jonen.com/',
  '蝶ヶ岳ヒュッテ':'https://chougatake.com/',
  '唐松岳頂上山荘':'http://www.karamatsu.jp/',
  '西穂山荘':'https://www.nishiho.com/',
  '三俣山荘':'https://mitsumatasanso.com/mitsumata',
  '水晶小屋':'https://mitsumatasanso.com/',
  '長衛小屋':'https://choei.ashiyasu.com/',
  '北岳山荘':'https://www.city.minami-alps.yamanashi.jp/sisetsu/kankou/yamagoya/',
  '白根御池小屋':'https://www.city.minami-alps.yamanashi.jp/sisetsu/kankou/yamagoya/',
  '宝剣山荘':'https://miyadakankou.co.jp/houkensansou',
  '天狗荘':'https://miyadakankou.co.jp/tengusou',
  '頂上山荘':'https://miyadakankou.co.jp/chojosansou',
  '駒ヶ岳頂上山荘':'https://miyadakankou.co.jp/chojosansou',
  '檜尾小屋':'https://www.hinokio-chuoalps.com/',
  '木曽殿山荘':'https://www.kisodonosansou.com/',
  '西駒山荘':'https://www.ina-city-kankou.co.jp/yamagoya/nishikoma/',
  '赤岳鉱泉':'https://www.akadakekousen.jp/akadakekousen',
  '行者小屋':'https://www.akadakekousen.jp/',
  '黒百合ヒュッテ':'https://www.kuroyurihyutte.com/',
  '高見石小屋':'https://takamiishi.com/',
  '法華院温泉山荘':'http://www.hokkein.co.jp',
  '石鎚神社頂上山荘':'https://ishizuchisan.jp/',
  '一の越山荘':'https://tateyama-1nokoshi.in.coocan.jp/',
  '冷池山荘':'https://www.kasimayari.jp/',
  '種池山荘':'https://www.kasimayari.jp/',
  '剣山荘':'https://www.kenzanso.com/',
  '剱澤小屋':'https://tsurugisawagoya.com/',
  '早月小屋':'https://www.hayatsukikoya.com/',
  '槍平小屋':'https://www.yaridaira.jp/',
  '横尾山荘':'https://www.yokoo-sanso.co.jp/',
  '笠ヶ岳山荘':'https://kasagatake.com/',
  '太郎平小屋':'https://ltaro.com/lodge/tarodaira-goya/',
  '薬師岳山荘':'https://www.yakushidake-sansou.com/',
  '針ノ木小屋':'https://www.pref.nagano.lg.jp/kankoki/sangyo/kanko/sotaikyo/yamagoya/yamagoya_kitaalps.html',
  '船窪小屋':'https://www.pref.nagano.lg.jp/kankoki/sangyo/kanko/sotaikyo/yamagoya/yamagoya_kitaalps.html',
  '烏帽子小屋':'https://www.pref.nagano.lg.jp/kankoki/sangyo/kanko/sotaikyo/yamagoya/yamagoya_kitaalps.html',
  '野口五郎小屋':'https://www.pref.nagano.lg.jp/kankoki/sangyo/kanko/sotaikyo/yamagoya/yamagoya_kitaalps.html',
  '三伏峠小屋':'https://sanpukutouge.com/',
  '塩見小屋':'https://www.ina-city-kankou.co.jp/yamagoya/shiomi/',
  '仙丈小屋':'https://www.ina-city-kankou.co.jp/yamagoya/senjo/',
  '仙水小屋':'https://www.minamialps-net.jp/yamagoya/021_sensui',
  '北岳肩の小屋':'https://katanokoya.com/',
  '農鳥小屋':'https://notorihut.jimdofree.com/',
  '大門沢小屋':'https://minami-alpskankou.jp/?page_id=5812',
  '熊ノ平小屋':'https://www.t-forest.com/alpsinfo/climber/lodgeinfo/',
  '千枚小屋':'https://www.t-forest.com/alpsinfo/climber/lodgeinfo/',
  '荒川小屋':'https://www.t-forest.com/alpsinfo/climber/lodgeinfo/',
  '赤石小屋':'https://www.t-forest.com/alpsinfo/climber/lodgeinfo/',
  '聖平小屋':'https://www.t-forest.com/alpsinfo/climber/lodgeinfo/',
  '茶臼小屋':'https://www.t-forest.com/alpsinfo/climber/lodgeinfo/',
  '光岳小屋':'https://www.t-forest.com/alpsinfo/climber/lodgeinfo/',
  '硫黄岳山荘':'https://iodake.jp/',
  '赤岳天望荘':'https://www.yatsugatake.gr.jp/',
  '北横岳ヒュッテ':'https://www.tateshinakougen.gr.jp/yatu/stay/05.html',
  '甲武信小屋':'https://www.kobushigoya.net/',
  '雲取山荘':'https://kumotorisansou.com/',
  '尊仏山荘':'https://sonbutsusanso.amebaownd.com/',
  '夕張岳ヒュッテ':'https://yuparikozakura.org/?page_id=67',
  '札内川ヒュッテ':'https://www.vill.nakasatsunai.hokkaido.jp/kankou/kankou/satsunaigawa_hute/',
  '美瑛富士避難小屋':'https://www.kamikawa.pref.hokkaido.lg.jp/fs/1/0/6/6/9/4/5/8/_/%E7%99%BB%E5%B1%B1%E3%82%AC%E3%82%A4%E3%83%89%28R3.1%E7%89%88%29.pdf',
  '剣山頂上ヒュッテ':'https://tsurugisan-hutte.com/',
  '弥山小屋':'https://www.vill.tenkawa.nara.jp/office/publicfacility/2699',
  '久住分かれ避難小屋':'https://www.pref.oita.jp/soshiki/13070/kujuhinangoya.html',
  '大山頂上避難小屋':'https://www.pref.tottori.lg.jp/secure/955810/R7hinanngoya.pdf',
  '祖母山九合目小屋':'https://sobokatamuki-br-council.org/news-event/%E7%A5%96%E6%AF%8D%E5%B1%B1%E4%B9%9D%E5%90%88%E7%9B%AE%E5%B1%B1%E5%B0%8F%E5%B1%8B%E3%83%90%E3%82%A4%E3%82%AA%E3%83%88%E3%82%A4%E3%83%AC%E3%81%AE%E4%BD%BF%E7%94%A8%E9%96%8B%E5%A7%8B%E3%81%AB%E3%81%A4/',
  '新高塚小屋':'https://www.town.yakushima.kagoshima.jp/t_yakushima/wp-content/uploads/2024/06/20240604_hinangoya.pdf',
  '高塚小屋':'https://www.town.yakushima.kagoshima.jp/t_yakushima/wp-content/uploads/2024/06/20240604_hinangoya.pdf',
  '淀川小屋':'https://www.town.yakushima.kagoshima.jp/t_yakushima/wp-content/uploads/2024/06/20240604_hinangoya.pdf',
  '二の池ヒュッテ':'https://www.ninoikehutte.com/',
  '五の池小屋':'https://www.gonoike.jp/',
  '女人堂':'https://www.pref.nagano.lg.jp/kankoki/sangyo/kanko/sotaikyo/yamagoya/yamagoya_sonota.html',
  '石室山荘':'https://www.pref.nagano.lg.jp/kankoki/sangyo/kanko/sotaikyo/yamagoya/yamagoya_sonota.html',
  '南御室小屋':'https://www.houousan.com/',
  '雨飾山荘（雨飾温泉）':'https://www.amakazarisanso.com/',
  '高谷池ヒュッテ':'https://myokotourism.jp/kouyaike/',
  '雷鳥荘':'https://www.raichoso.com/',
  '白山室堂':'https://hakusan-guide.or.jp/hakusan_stay/murodou/',
  '蓼科山頂ヒュッテ':'https://www.tateshinayama.com/',
  '青年小屋':'https://yatsugatake-seinengoya-tooinomiya.net/',
  '空木駒峰ヒュッテ':'https://www.komaho.net/',
  '越百小屋・越百避難小屋':'https://www.pref.nagano.lg.jp/kankoki/sangyo/kanko/sotaikyo/yamagoya/yamagoya_cyuualps.html',
  '焼岳小屋':'https://www.pref.nagano.lg.jp/kankoki/sangyo/kanko/sotaikyo/yamagoya/yamagoya_kitaalps.html',
  '餓鬼岳小屋':'https://www.pref.nagano.lg.jp/kankoki/sangyo/kanko/sotaikyo/yamagoya/yamagoya_kitaalps.html',
  '平標山の家':'https://tairappyouyama.wixsite.com/yamanoie',
  '見晴（尾瀬小屋・見晴地区）':'https://www.ozegoya.co.jp/',
  '龍宮小屋':'https://ryugugoya.jp/',
  '三嶺ヒュッテ':'https://www.rinya.maff.go.jp/shikoku/policy/business/invitation/sizen_kyuyorin/sanrei.html',
  '扇ノ山山頂避難小屋':'https://www.pref.tottori.lg.jp/93958.htm',
  '伯母子岳避難小屋':'https://www.pref.nara.lg.jp/ikasu-nara/bunkashigen/main00108.html',
  '庚申山荘（避難小屋）':'https://www.city.nikko.lg.jp/material/files/group/7/05shisetsukarute.pdf',
  '介山荘':'http://www.kaizansou.jp/',
  '富士見平小屋':'https://www.fujimidairagoya.jp/',
  '朝日小屋':'https://www.asahigoya.net/',
  '奥胎内ヒュッテ':'https://www.okutainai.com/',
  '苗場山頂ヒュッテ':'https://sakae-akiyamago.com/stay/4888/',
  '玉乃窪山荘':'http://www.kiso.ne.jp/~tamanokubo.ag/',
  '黒沢池ヒュッテ':'https://niigata-kankou.or.jp/spot/8514',
  '鉢伏山荘':'https://www.pref.nagano.lg.jp/kankoki/sangyo/kanko/sotaikyo/yamagoya/yamagoya_sonota.html',
  '権現小屋':'https://www.pref.nagano.lg.jp/kankoki/sangyo/kanko/sotaikyo/yamagoya/yamagoya_yatsugatake.html',
  '空木平避難小屋':'https://www.pref.nagano.lg.jp/kankoki/sangyo/kanko/sotaikyo/yamagoya/yamagoya_cyuualps.html',
  '馬の背ヒュッテ':'https://umanose.com/',
  '天狗山荘':'https://yamagoya.hakubakousha.com/',
  '一不動避難小屋':'https://www.city.nagano.nagano.jp/n150820/kanko/p002620.html',
  '大峯山寺宿坊':'https://www.vill.tenkawa.nara.jp/tourism/wp-content/uploads/2020/04/301a3a7b3d179a3bf468236e916022d8.pdf',
  '八海山千本檜小屋':'https://m-uonuma.jp/trekking/hakkai/',
  '米山山頂避難小屋':'https://www.city.kashiwazaki.lg.jp/soshikiichiran/sangyoshinkobu/shogyokankoka/kankosinko/yama/yoneyama/9258.html',
  '藤原山荘':'https://www.kanko-inabe.com/tourism/1050/',
  '瓶ヶ森避難小屋':'https://www.city.saijo.ehime.jp/soshiki/kanko/kamegamorihinanngoyakoujikansei.html',
  '暑寒荘':'https://www.town.mashike.hokkaido.jp/tourism/area/mtsyokan/route-syokan.html',
  '大崩山荘':'https://www.kanko-miyazaki.jp/spot/1069',
  '氷ノ山山頂避難小屋':'https://www.pref.tottori.lg.jp/secure/973724/hyounosenmapJap.pdf',
  '氷ノ山越避難小屋':'https://www.pref.tottori.lg.jp/secure/973724/hyounosenmapJap.pdf',
  '富士一館':'https://www.fuji-ichikan.jp/',
  '東洋館':'https://www.fuji-toyokan.jp/',
  '富士山ホテル':'https://www.fujisanhotel.com/',
  '御来光山荘':'https://www.fuji-tozan.com/mountain_lodge/goraiko_sanso/',
  '頂上山口屋':'https://www.fujisan-climb.jp/season/hut.html',
  '頂上富士館':'https://fujisanchou.com/',
  '谷川岳肩ノ小屋':'https://www.enjoy-minakami.jp/place.php?itemid=586',
  '北沢峠こもれび山荘':'https://www.ina-city-kankou.co.jp/yamagoya/kitazawa/',
  '本沢温泉':'https://www.yatsu-honzawaonsen.com/',
  '根石岳山荘':'https://www.yatsu-honzawaonsen.com/neshidake.html',
  '将監小屋':'https://www.koshu-kankou.jp/',
  '雁坂小屋':'https://karisakagoya.com/',
  '黒岳石室':'https://www.rinyu.co.jp/kurodake/',
  '一の森ヒュッテ':'https://www.tsurugisan-hutte.com/',
  '旭岳石室':'https://asahidake.hokkaido.jp/',
  '御浜小屋':'https://www.chokaizan.com/',
  '行者還避難小屋':'https://www.vill.tenkawa.nara.jp/',
  '楊枝ヶ宿避難小屋':'https://www.vill.tenkawa.nara.jp/',
  '大日小屋':'https://www.dainichigoya.jp/',
});
function hutOfficialSite(name){return HUT_OFFICIAL_SITES[String(name||'').trim()]||'';}
function normalizeTimeToTenMinutes(value){
  const m=String(value||'').match(/^(\d{1,2}):(\d{2})$/);if(!m)return value||'';
  let total=(Number(m[1])*60)+Number(m[2]);
  total=Math.round(total/10)*10;
  total=((total%1440)+1440)%1440;
  return `${String(Math.floor(total/60)).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`;
}
const APP_VERSION = '1.5.131';
// V1.5.122: keep desktop/mobile visible version badges synchronized with the JS build.
// The HTML still carries a fallback value so the version is visible before JS executes.
function syncVisibleAppVersion(){
  const text=`V${APP_VERSION}`;
  document.querySelectorAll('[data-app-version], .mobile-topbar-version').forEach(el=>{el.textContent=text;});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',syncVisibleAppVersion,{once:true});
else syncVisibleAppVersion();

// V1.4.211: access modal can resolve fixed coordinates across all mountain catalogs
// without duplicating the large coordinate database in access-data.js.
window.TratenLookupFixedPoint = function(name){
  const target=String(name||'').replace(/\s+/g,'').replace(/[（(].*?[）)]/g,'').replace(/(?:登山口|駐車場|バス停|停留所)$/,'');
  if(!target)return null;
  const norm=v=>String(v||'').replace(/\s+/g,'').replace(/[（(].*?[）)]/g,'').replace(/(?:登山口|駐車場|バス停|停留所)$/,'');
  const seen=new Set();
  for(const m of Object.keys(MOUNTAIN_PRESETS||{})){
    let list=[];try{list=[...(builtinCandidates(m)||[]),...(regionalCandidates(m)||[])];}catch(_){continue;}
    for(const p of list){
      const key=`${p.type}|${p.name}|${p.lat}|${p.lon}`; if(seen.has(key))continue; seen.add(key);
      if(norm(p.name)===target && Number.isFinite(p.lat)&&Number.isFinite(p.lon)) return {name:p.name,lat:p.lat,lon:p.lon,elevation:p.elevation||''};
    }
  }
  return null;
};





// V1.4.34: 北アルプス全域の主要区間 標準コースタイム（分）。
// 公開情報で方向別所要時間を確認できた区間だけを登録する。推測値は使用しない。
// 北アルプス山小屋友交会「主なルート（所要時間）」「北アルプス 夏山コースタイム」準拠。
const NORTH_ALPS_COURSE_TIMES = Object.freeze({
  '上高地→槍沢ロッヂ': {minutes:260, source:'北アルプス山小屋友交会・槍沢ロッヂ'},
  '槍沢ロッヂ→上高地': {minutes:240, source:'北アルプス山小屋友交会・槍沢ロッヂ'},
  '槍沢ロッヂ→槍ヶ岳山荘': {minutes:280, source:'北アルプス山小屋友交会・槍沢ロッヂ'},
  '槍ヶ岳山荘→槍沢ロッヂ': {minutes:210, source:'北アルプス山小屋友交会・槍沢ロッヂ'},
  // V1.4.63: 槍ヶ岳山荘グループ公式FAQ『穂先（頂上）までは通常片道30分程度』。
  '槍ヶ岳山荘→槍ヶ岳': {minutes:30, source:'槍ヶ岳山荘グループ公式FAQ・穂先まで片道30分'},
  '槍ヶ岳→槍ヶ岳山荘': {minutes:30, source:'槍ヶ岳山荘グループ公式FAQ・穂先まで片道30分'},
  '三股→蝶ヶ岳': {minutes:330, source:'北アルプス山小屋友交会・蝶ヶ岳ヒュッテ'},
  '蝶ヶ岳→三股': {minutes:190, source:'北アルプス山小屋友交会・蝶ヶ岳ヒュッテ'},
  '横尾→蝶ヶ岳': {minutes:270, source:'北アルプス山小屋友交会・蝶ヶ岳ヒュッテ'},
  '蝶ヶ岳→横尾': {minutes:180, source:'北アルプス山小屋友交会・蝶ヶ岳ヒュッテ'},
  '常念小屋→常念山頂': {minutes:90, source:'北アルプス山小屋友交会・蝶ヶ岳ヒュッテ'},
  '常念山頂→常念小屋': {minutes:60, source:'常念小屋公式・コース（常念岳山頂→常念小屋 約1時間）', sourceType:'official'},
  '常念山頂→蝶ヶ岳': {minutes:270, source:'北アルプス山小屋友交会・蝶ヶ岳ヒュッテ'},
  '蝶ヶ岳→常念山頂': {minutes:300, source:'北アルプス山小屋友交会・蝶ヶ岳ヒュッテ'},
  '燕山荘→大天荘': {minutes:210, source:'北アルプス山小屋友交会・大天荘'},
  '高瀬ダム→烏帽子小屋': {minutes:360, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '烏帽子小屋→高瀬ダム': {minutes:240, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '烏帽子小屋→烏帽子岳': {minutes:45, source:'北アルプス山小屋友交会・烏帽子小屋（小屋→烏帽子岳山頂 片道45分）', sourceType:'official'},
  '烏帽子岳→烏帽子小屋': {minutes:45, source:'北アルプス山小屋友交会・烏帽子小屋（小屋↔烏帽子岳山頂 片道45分）', sourceType:'official'},
  '烏帽子小屋→野口五郎岳': {minutes:210, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '野口五郎岳→烏帽子小屋': {minutes:150, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '野口五郎岳→水晶小屋': {minutes:180, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '水晶小屋→野口五郎岳': {minutes:150, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '水晶小屋→三俣山荘': {minutes:150, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '三俣山荘→水晶小屋': {minutes:180, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '三俣山荘→三俣蓮華岳': {minutes:60, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '三俣蓮華岳→三俣山荘': {minutes:40, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '三俣蓮華岳→双六小屋': {minutes:90, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '双六小屋→三俣蓮華岳': {minutes:120, source:'北アルプス山小屋友交会・夏山コースタイム'},
  // V1.4.33: 表銀座（燕山荘グループ公式の現行案内で区間時間を確認）
  '中房→合戦小屋': {minutes:240, source:'燕山荘グループ・合戦小屋/ルートマップ'},
  '合戦小屋→燕山荘': {minutes:90, source:'燕山荘グループ・合戦小屋/ルートマップ'},
  '燕山荘→燕岳': {minutes:30, source:'燕山荘グループ・ルートマップ'},
  // V1.4.33: 新穂高〜双六（双六小屋グループ公式FAQ）
  '新穂高温泉→わさび平小屋': {minutes:80, source:'双六小屋グループ・FAQ'},
  'わさび平小屋→鏡平山荘': {minutes:240, source:'双六小屋グループ・FAQ'},
  '鏡平山荘→双六小屋': {minutes:130, source:'双六小屋グループ・鏡平山荘（現行案内）'},
  // V1.4.33: 槍・穂高主要区間（北アルプス山小屋友交会・夏山コースタイム）
  '上高地→横尾': {minutes:180, source:'北穂高小屋公式・ルートガイド（上高地→横尾 3時間）', sourceType:'official'},
  '横尾→上高地': {minutes:190, source:'山と高原地図2026掲載CT（横尾→上高地 3時間10分）', sourceType:'other'},
  // V1.5.24: 代表コース側の表示名「横尾山荘」でも合成CTへ落ちないよう明示キーを持つ。
  '上高地→横尾山荘': {minutes:180, source:'北穂高小屋公式・ルートガイド（上高地→横尾 3時間）', sourceType:'official'},
  '横尾山荘→上高地': {minutes:190, source:'山と高原地図2026掲載CT（横尾→上高地 3時間10分）', sourceType:'other'},
  // V1.4.246: 槍ヶ岳山荘グループ公式モデルルートで横尾→槍沢ロッヂ 1時間30分を確認。
  // これが無いと composed CT が 横尾→上高地→槍沢ロッヂ と逆走結合し 7時間15分になるため、直接CTを優先登録する。
  '横尾→槍沢ロッヂ': {minutes:90, source:'槍ヶ岳山荘グループ・殺生小屋モデルルート（横尾→槍沢ロッヂ 1時間30分）', sourceType:'official'},
  '横尾→涸沢ヒュッテ': {minutes:190, source:'北穂高小屋公式・ルートガイド（横尾→本谷橋1時間10分→涸沢2時間）', sourceType:'official'},
  '涸沢ヒュッテ→横尾': {minutes:120, source:'山と高原地図2026掲載CT（涸沢→横尾 2時間）', sourceType:'other'},
  // V1.5.24: 表示名「横尾山荘」でも直接CTを確実に採用する。
  '横尾山荘→涸沢ヒュッテ': {minutes:190, source:'北穂高小屋公式・ルートガイド（横尾→本谷橋1時間10分→涸沢2時間）', sourceType:'official'},
  '涸沢ヒュッテ→横尾山荘': {minutes:120, source:'山と高原地図2026掲載CT（涸沢→横尾 2時間）', sourceType:'other'},
  '新穂高温泉→槍平小屋': {minutes:270, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '槍平小屋→新穂高温泉': {minutes:210, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '槍平小屋→槍ヶ岳山荘': {minutes:240, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '槍ヶ岳山荘→槍平小屋': {minutes:150, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '槍ヶ岳山荘→南岳小屋': {minutes:120, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '南岳小屋→槍ヶ岳山荘': {minutes:120, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '南岳小屋→北穂高小屋': {minutes:210, source:'山と高原地図2026掲載CT（南岳小屋→北穂高小屋 3時間30分）', sourceType:'other'},
  '南岳小屋→北穂高岳': {minutes:210, source:'山と高原地図2026掲載CT（南岳小屋→北穂高小屋・北穂高岳直下 3時間30分）', sourceType:'other'},
  '北穂高小屋→南岳小屋': {minutes:200, source:'山と高原地図2026掲載CT（北穂高小屋→南岳小屋 3時間20分）', sourceType:'other'},
  '北穂高小屋→涸沢ヒュッテ': {minutes:105, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '涸沢ヒュッテ→北穂高小屋': {minutes:180, source:'北アルプス山小屋友交会・夏山コースタイム'},

  // V1.4.34: 白馬・朝日・後立山（白馬村公式モデルコース）
  '猿倉→白馬尻小屋': {minutes:90, source:'白馬村公式観光サイト・モデルコース'},
  '白馬尻小屋→白馬山荘': {minutes:320, source:'白馬村公式観光サイト・モデルコース（公式区間合算）'},
  '白馬山荘→白馬岳': {minutes:15, source:'白馬村公式観光サイト・モデルコース'},
  '白馬岳→白馬山荘': {minutes:10, source:'白馬村公式観光サイト・モデルコース'},
  '白馬岳→小蓮華山': {minutes:90, source:'白馬村公式観光サイト・モデルコース（公式区間合算）'},
  '小蓮華山→白馬岳': {minutes:95, source:'白馬村公式観光サイト・モデルコース（公式区間合算）'},
  '小蓮華山→白馬大池山荘': {minutes:90, source:'白馬村公式観光サイト・モデルコース'},
  '白馬大池山荘→小蓮華山': {minutes:130, source:'白馬村公式観光サイト・モデルコース'},
  '白馬大池山荘→栂池自然園': {minutes:170, source:'白馬村公式観光サイト・モデルコース（公式区間合算）'},
  '栂池自然園→白馬大池山荘': {minutes:235, source:'白馬村公式観光サイト・モデルコース（公式区間合算）'},
  '白馬大池山荘→蓮華温泉': {minutes:140, source:'白馬村公式観光サイト・モデルコース'},
  '白馬山荘→杓子岳': {minutes:75, source:'白馬村公式観光サイト・モデルコース（公式区間合算）'},
  '杓子岳→白馬鑓ヶ岳': {minutes:60, source:'白馬村公式観光サイト・モデルコース'},
  '白馬鑓ヶ岳→天狗山荘': {minutes:50, source:'白馬村公式観光サイト・モデルコース'},
  '天狗山荘→不帰キレット': {minutes:120, source:'白馬村公式観光サイト・モデルコース'},
  '不帰キレット→唐松岳': {minutes:180, source:'白馬村公式観光サイト・モデルコース'},
  '唐松岳→唐松岳頂上山荘': {minutes:20, source:'白馬村公式観光サイト・モデルコース'},
  '唐松岳頂上山荘→唐松岳': {minutes:20, source:'白馬村公式観光サイト・モデルコース'},
  '八方池山荘→唐松岳頂上山荘': {minutes:250, source:'白馬村公式観光サイト・モデルコース（公式区間合算）'},
  '唐松岳頂上山荘→八方池山荘': {minutes:200, source:'白馬村公式観光サイト・モデルコース（公式区間合算）'},
  '唐松岳頂上山荘→五竜山荘': {minutes:180, source:'白馬村公式観光サイト・モデルコース'},
  '五竜山荘→五竜岳': {minutes:60, source:'白馬村公式観光サイト・モデルコース'},
  '五竜岳→五竜山荘': {minutes:45, source:'白馬村公式観光サイト・モデルコース'},
  'アルプス平→五竜山荘': {minutes:350, source:'白馬村公式観光サイト・モデルコース（公式区間合算）'},
  '五竜山荘→アルプス平': {minutes:260, source:'白馬村公式観光サイト・モデルコース（公式区間合算）'},
  '五竜岳→キレット小屋': {minutes:240, source:'白馬村公式観光サイト・モデルコース'},
  'キレット小屋→鹿島槍ヶ岳': {minutes:180, source:'白馬村公式観光サイト・モデルコース'},
  '鹿島槍ヶ岳→冷池山荘': {minutes:90, source:'白馬村公式観光サイト・モデルコース'},
  '冷池山荘→爺ヶ岳': {minutes:120, source:'白馬村公式観光サイト・モデルコース'},
  '爺ヶ岳→種池山荘': {minutes:30, source:'白馬村公式観光サイト・モデルコース'},
  '種池山荘→扇沢': {minutes:180, source:'白馬村公式観光サイト・モデルコース'},
  '白馬岳→雪倉岳': {minutes:135, source:'白馬村公式観光サイト・モデルコース（公式区間合算）'},
  '雪倉岳→朝日小屋': {minutes:240, source:'白馬村公式観光サイト・モデルコース'},
  '朝日小屋→朝日岳': {minutes:60, source:'白馬村公式観光サイト・モデルコース'},
  '朝日岳→蓮華温泉': {minutes:320, source:'白馬村公式観光サイト・モデルコース（公式区間合算）'},

  // V1.4.34: 針ノ木・船窪（各小屋公式）
  '扇沢→針ノ木小屋': {minutes:240, source:'針ノ木小屋公式・登山道情報'},
  '針ノ木小屋→蓮華岳': {minutes:40, source:'船窪小屋公式・登山ルート'},
  '蓮華岳→針ノ木小屋': {minutes:40, source:'船窪小屋公式・登山ルート'},
  '七倉→船窪小屋': {minutes:360, source:'船窪小屋公式・登山ルート'},
  '船窪小屋→七倉': {minutes:240, source:'船窪小屋公式・登山ルート'},

  // V1.4.34: 立山・剱（立山黒部アルペンルート／早月小屋公式）
  '室堂→一の越山荘': {minutes:60, source:'立山黒部アルペンルート公式・雄山モデルコース'},
  '一の越山荘→立山（雄山）': {minutes:50, source:'立山黒部アルペンルート公式・雄山モデルコース'},
  '立山（雄山）→一の越山荘': {minutes:50, source:'立山黒部アルペンルート公式・雄山モデルコース'},
  '一の越山荘→室堂': {minutes:60, source:'立山黒部アルペンルート公式・雄山モデルコース'},
  '馬場島→早月小屋': {minutes:360, source:'早月小屋公式・アクセス'},

  // V1.4.34: 常念山脈（北アルプス山小屋友交会）
  '一ノ沢→常念小屋': {minutes:300, source:'北アルプス山小屋友交会・常念小屋'},
  '大天井岳→常念小屋': {minutes:180, source:'北アルプス山小屋友交会・常念小屋'},

  // V1.4.34: 西穂・焼岳／穂高（北アルプス山小屋友交会）
  '上高地→焼岳小屋': {minutes:150, source:'北アルプス山小屋友交会・焼岳小屋'},
  '西穂山荘→焼岳小屋': {minutes:150, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '焼岳小屋→西穂山荘': {minutes:210, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '涸沢ヒュッテ→穂高岳山荘': {minutes:150, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '穂高岳山荘→涸沢ヒュッテ': {minutes:105, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '穂高岳山荘→奥穂高岳': {minutes:40, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '奥穂高岳→穂高岳山荘': {minutes:60, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '奥穂高岳→前穂高岳': {minutes:120, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '前穂高岳→奥穂高岳': {minutes:120, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '穂高岳山荘→北穂高小屋': {minutes:130, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '北穂高小屋→穂高岳山荘': {minutes:150, source:'北アルプス山小屋友交会・夏山コースタイム'},
  '涸沢ヒュッテ→北穂高岳': {minutes:190, source:'北アルプス山小屋友交会・北穂高小屋'},

  // V1.4.34: 薬師岳（薬師岳山荘公式）
  '折立登山口→太郎平小屋': {minutes:270, source:'薬師岳山荘公式・登山ルート（公式区間合算）'},
  '太郎平小屋→薬師岳山荘': {minutes:150, source:'薬師岳山荘公式・登山ルート（公式区間合算）'},
  '薬師岳山荘→薬師岳': {minutes:50, source:'薬師岳山荘公式・登山ルート'},
  '薬師岳→薬師岳山荘': {minutes:40, source:'薬師岳山荘公式・登山ルート'},
  '薬師岳山荘→太郎平小屋': {minutes:90, source:'薬師岳山荘公式・登山ルート'},
  '太郎平小屋→折立登山口': {minutes:210, source:'薬師岳山荘公式・登山ルート'},

  // V1.4.34: 双六・笠・黒部五郎（双六小屋グループ公式）
  '新穂高温泉→鏡平山荘': {minutes:300, source:'双六小屋グループ・鏡平山荘'},
  '鏡平山荘→笠ヶ岳山荘': {minutes:330, source:'双六小屋グループ・鏡平山荘'},
  '双六小屋→黒部五郎小舎': {minutes:210, source:'双六小屋グループ・黒部五郎小舎'},

  // V1.4.61: 太郎平小屋－黒部五郎岳。ヤマレコ公開『山行計画』の標準CTを複数照合し、同一路線の細区間を合算。
  '太郎平小屋→黒部五郎岳': {minutes:276, source:'ヤマレコ・黒部五郎岳 太郎平ルート山行計画（標準CT複数照合・区間合算）', sourceType:'yamareco'},
  '黒部五郎岳→太郎平小屋': {minutes:228, source:'ヤマレコ・黒部五郎岳 太郎平ルート山行計画（標準CT複数照合・区間合算）', sourceType:'yamareco'}
});







// V1.4.39: 北海道・東北・関東・甲信越の主要区間 標準コースタイム（分）。
// 公式情報を優先し、細区間はヤマレコ公開「山行計画」の標準CTで複数確認できる値のみ補助利用。
// 推測値・実歩行記録の実績時間は使用しない。
const EAST_NORTH_COURSE_TIMES = Object.freeze({
  // 関東：男体山（日光市観光協会公式 2026）
  '二荒山神社中宮祠登山口→男体山': {minutes:230, source:'日光市観光協会公式・男体山コースタイム'},
  '男体山→二荒山神社中宮祠登山口': {minutes:160, source:'日光市観光協会公式・男体山コースタイム'},

  // 関東：谷川岳（天神尾根）
  '天神平→熊穴沢避難小屋': {minutes:35, source:'ヤマレコ・谷川岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '熊穴沢避難小屋→谷川岳オキノ耳': {minutes:115, source:'ヤマレコ・谷川岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '熊穴沢避難小屋→天神平': {minutes:52, source:'ヤマレコ・谷川岳 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 関東：雲取山（鴨沢）
  '鴨沢登山口→雲取山': {minutes:440, source:'ヤマレコ・雲取山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '雲取山→雲取山荘': {minutes:22, source:'ヤマレコ・雲取山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '雲取山荘→雲取山': {minutes:40, source:'ヤマレコ・雲取山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '雲取山→鴨沢登山口': {minutes:297, source:'ヤマレコ・雲取山 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 東北：岩手山（馬返し）
  '馬返し登山口岩手山→八合目避難小屋': {minutes:255, source:'ヤマレコ・岩手山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '八合目避難小屋→岩手山': {minutes:65, source:'ヤマレコ・岩手山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '岩手山→八合目避難小屋': {minutes:27, source:'ヤマレコ・岩手山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '八合目避難小屋→馬返し登山口岩手山': {minutes:145, source:'ヤマレコ・岩手山 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 東北：早池峰山（小田越）
  '小田越登山口→早池峰山': {minutes:154, source:'ヤマレコ・早池峰山 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 東北：磐梯山（八方台）
  '八方台登山口→弘法清水小屋': {minutes:125, source:'ヤマレコ・磐梯山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '弘法清水小屋→磐梯山': {minutes:40, source:'ヤマレコ・磐梯山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '磐梯山→弘法清水小屋': {minutes:22, source:'ヤマレコ・磐梯山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '弘法清水小屋→八方台登山口': {minutes:86, source:'ヤマレコ・磐梯山 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 北海道：大雪山・旭岳
  '旭岳ロープウェイ姿見駅→旭岳石室': {minutes:20, source:'ヤマレコ・旭岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '旭岳石室→大雪山（旭岳）': {minutes:140, source:'ヤマレコ・旭岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '大雪山（旭岳）→旭岳石室': {minutes:77, source:'ヤマレコ・旭岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '旭岳石室→旭岳ロープウェイ姿見駅': {minutes:22, source:'ヤマレコ・旭岳 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 北海道：十勝岳（望岳台）
  '望岳台→十勝岳避難小屋': {minutes:95, source:'ヤマレコ・十勝岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '十勝岳避難小屋→十勝岳': {minutes:173, source:'ヤマレコ・十勝岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '十勝岳→十勝岳避難小屋': {minutes:99, source:'ヤマレコ・十勝岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '十勝岳避難小屋→望岳台': {minutes:58, source:'ヤマレコ・十勝岳 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 北海道：羅臼岳（岩尾別温泉）
  '岩尾別温泉・木下小屋登山口→羅臼平': {minutes:276, source:'ヤマレコ・羅臼岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '羅臼平→羅臼岳': {minutes:71, source:'ヤマレコ・羅臼岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '羅臼岳→羅臼平': {minutes:39, source:'ヤマレコ・羅臼岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '羅臼平→岩尾別温泉・木下小屋登山口': {minutes:164, source:'ヤマレコ・羅臼岳 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 北海道：斜里岳
  '清岳荘→斜里岳': {minutes:221, source:'ヤマレコ・斜里岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '斜里岳→清岳荘': {minutes:139, source:'ヤマレコ・斜里岳 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 甲信越：火打山（笹ヶ峰）
  '笹ヶ峰登山口→高谷池ヒュッテ': {minutes:212, source:'ヤマレコ・火打山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '高谷池ヒュッテ→火打山': {minutes:103, source:'ヤマレコ・火打山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '火打山→高谷池ヒュッテ': {minutes:67, source:'ヤマレコ・火打山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '高谷池ヒュッテ→笹ヶ峰登山口': {minutes:137, source:'ヤマレコ・火打山 山行計画（標準CT補完）', sourceType:'yamareco'},

  // V1.4.40: 全国CT未登録山の機械抽出後に追加した第1波。
  // 北海道は行政・環境省の公開コースタイムを優先。
  '利尻北麓野営場（鴛泊コース）→利尻山': {minutes:310, source:'環境省・利尻山鴛泊コース登山モデル（休憩時間を除く歩行時間）'},
  '利尻山→利尻北麓野営場（鴛泊コース）': {minutes:220, source:'環境省・利尻山鴛泊コース登山モデル（休憩時間を除く歩行時間）'},
  '比羅夫登山口・半月湖畔自然公園→後方羊蹄山（羊蹄山）': {minutes:310, source:'倶知安町公式・羊蹄山 倶知安ひらふコース'},
  '7合目登山口→樽前山': {minutes:50, source:'苫小牧市公式・樽前山登山案内'},

  // 東北：ヤマレコ標準計画を複数照合した区間のみ補完。
  '酸ヶ湯登山口→八甲田山（大岳）': {minutes:179, source:'ヤマレコ・八甲田大岳 山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '八甲田山（大岳）→酸ヶ湯登山口': {minutes:121, source:'ヤマレコ・八甲田大岳 山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '八合目小屋 秋田駒ヶ岳→秋田駒ヶ岳（男女岳）': {minutes:102, source:'ヤマレコ・秋田駒ヶ岳 男女岳 山行計画（標準CT複数照合）', sourceType:'yamareco'},

  // 関東：標準計画の区間時間を複数照合。
  'つつじヶ丘登山口→筑波山（女体山）': {minutes:89, source:'ヤマレコ・筑波山 女体山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '筑波山（女体山）→つつじヶ丘登山口': {minutes:56, source:'ヤマレコ・筑波山 女体山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '黒檜山登山口→赤城山（黒檜山）': {minutes:102, source:'ヤマレコ・赤城山 黒檜山 山行計画（標準CT複数照合）', sourceType:'yamareco'},

  // 甲信越：公開コースデータで上り・下りを確認。
  '雨飾高原キャンプ場登山口→雨飾山': {minutes:240, source:'日本アルプス登山案内・雨飾山 小谷温泉コース'},
  '雨飾山→雨飾高原キャンプ場登山口': {minutes:185, source:'日本アルプス登山案内・雨飾山 小谷温泉コース'},
  '戸隠キャンプ場・高妻山登山者駐車場→高妻山': {minutes:290, source:'日本百名山登山コースデータ・高妻山 戸隠コース'},
  '高妻山→戸隠キャンプ場・高妻山登山者駐車場': {minutes:200, source:'日本百名山登山コースデータ・高妻山 戸隠コース'},
  '笹ヶ峰登山口→妙高山': {minutes:290, source:'日本百名山登山コースデータ・妙高山 笹ヶ峰コース'},
  '妙高山→笹ヶ峰登山口': {minutes:230, source:'日本百名山登山コースデータ・妙高山 笹ヶ峰コース'},

  // V1.4.41: 全国CT未登録山の穴埋め第2波（北海道・東北）。
  // 公式値を最優先し、公式CTが得にくい区間のみヤマレコ公開「山行計画」の標準CTを複数照合。
  '滝口・雄阿寒岳登山口→雄阿寒岳': {minutes:200, source:'環境省・阿寒摩周国立公園 雄阿寒岳登山コース'},
  '雄阿寒岳→滝口・雄阿寒岳登山口': {minutes:140, source:'環境省・阿寒摩周国立公園 雄阿寒岳登山コース'},
  '五色温泉インフォメーションセンター→ニセコアンヌプリ': {minutes:110, source:'ニセコ町公式観光パンフレット・五色温泉コース'},
  'ニセコアンヌプリ→五色温泉インフォメーションセンター': {minutes:70, source:'ニセコ町公式観光パンフレット・五色温泉コース'},
  'トムラウシ短縮コース登山口→トムラウシ山': {minutes:305, source:'大雪山国立公園連絡協議会・トムラウシ山 短縮コース 登り5時間05分', sourceType:'official'},
  'トムラウシ山→トムラウシ短縮コース登山口': {minutes:210, source:'大雪山国立公園連絡協議会・トムラウシ山 短縮コース 下り3時間30分', sourceType:'official'},
  'シュナイダーコース登山口（音更川二十一ノ沢出合）→石狩岳': {minutes:285, source:'ヤマレコ・石狩岳 シュナイダーコース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '石狩岳→シュナイダーコース登山口（音更川二十一ノ沢出合）': {minutes:174, source:'ヤマレコ・石狩岳 シュナイダーコース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '岩木山八合目→岩木山': {minutes:86, source:'ヤマレコ・岩木山 八合目コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '岩木山→岩木山八合目': {minutes:49, source:'ヤマレコ・岩木山 八合目コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '鉾立登山口（象潟口）→鳥海山（新山）': {minutes:306, source:'ヤマレコ・鳥海山 鉾立コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '鳥海山（新山）→鉾立登山口（象潟口）': {minutes:203, source:'ヤマレコ・鳥海山 鉾立コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '月山八合目登山口→月山': {minutes:156, source:'ヤマレコ・月山 八合目コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '月山→月山八合目登山口': {minutes:103, source:'ヤマレコ・月山 八合目コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '蔵王ロープウェイ地蔵山頂駅→蔵王山（熊野岳）': {minutes:60, source:'ヤマレコ・熊野岳 地蔵山頂駅コース山行計画（標準CT複数照合）', sourceType:'yamareco'},

  // V1.4.42: 全国CT未登録山の穴埋め第3波（北海道・東北）。
  // 同一路線の標準CTを複数の公開山行計画で照合。ルート差がある山は採用ルートをsourceに明記。
  '天塩岳ヒュッテ登山口→天塩岳': {minutes:268, source:'ヤマレコ・天塩岳 前天塩岳経由 山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '天塩岳→天塩岳ヒュッテ登山口': {minutes:184, source:'ヤマレコ・天塩岳 新道側下山 山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '暑寒荘→暑寒別岳': {minutes:311, source:'ヤマレコ・暑寒別岳 暑寒ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '暑寒別岳→暑寒荘': {minutes:194, source:'ヤマレコ・暑寒別岳 暑寒ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '暑寒荘・暑寒別岳登山口→暑寒別岳': {minutes:311, source:'ヤマレコ・暑寒別岳 暑寒ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '暑寒別岳→暑寒荘・暑寒別岳登山口': {minutes:194, source:'ヤマレコ・暑寒別岳 暑寒ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  'いわかがみ平→栗駒山': {minutes:122, source:'ヤマレコ・栗駒山 いわかがみ平中央コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '栗駒山→いわかがみ平': {minutes:72, source:'ヤマレコ・栗駒山 いわかがみ平中央コース山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '浄土平→一切経山': {minutes:101, source:'ヤマレコ・一切経山 浄土平コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '一切経山→浄土平': {minutes:65, source:'ヤマレコ・一切経山 浄土平コース山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '滝沢登山口→会津駒ヶ岳': {minutes:241, source:'ヤマレコ・会津駒ヶ岳 滝沢登山口コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '会津駒ヶ岳→滝沢登山口': {minutes:139, source:'ヤマレコ・会津駒ヶ岳 滝沢登山口コース山行計画（標準CT複数照合）', sourceType:'yamareco'},

  // V1.4.43: 全国CT未登録山の穴埋め第4波（北海道・東北）。
  // 固定ポイント名称と公開標準CTの端点が一致する区間を優先。CT差が大きい山は保留。
  'ニセイカウシュッペ山登山口（古川林道・西尾根）→ニセイカウシュッペ山': {minutes:197, source:'ヤマレコ・ニセイカウシュッペ山 山行計画（標準CT確認）', sourceType:'yamareco'},
  'ニセイカウシュッペ山→ニセイカウシュッペ山登山口（古川林道・西尾根）': {minutes:124, source:'ヤマレコ・ニセイカウシュッペ山 山行計画（標準CT確認）', sourceType:'yamareco'},

  '冷水・馬の背登山口（夕張岳ヒュッテ）→夕張岳': {minutes:271, source:'ヤマレコ・夕張岳 冷水コース山行計画（夕張岳ヒュッテ起点区間を複数照合）', sourceType:'yamareco'},
  '夕張岳→冷水・馬の背登山口（夕張岳ヒュッテ）': {minutes:175, source:'ヤマレコ・夕張岳 冷水コース山行計画（夕張岳ヒュッテ終点区間を複数照合）', sourceType:'yamareco'},

  '千走登山口→狩場山': {minutes:207, source:'ヤマレコ・狩場山 千走コース山行計画（標準CT確認）', sourceType:'yamareco'},
  '狩場山→千走登山口': {minutes:125, source:'ヤマレコ・狩場山 千走コース山行計画（標準CT確認）', sourceType:'yamareco'},

  '白神岳登山口駐車場→白神岳': {minutes:288, source:'ヤマレコ・白神岳 蟶山コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '白神岳→白神岳登山口駐車場': {minutes:181, source:'ヤマレコ・白神岳 蟶山コース山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '祝瓶山荘駐車場・桑住平ルート→祝瓶山': {minutes:225, source:'ヤマレコ・祝瓶山 祝瓶山荘・桑住平ルート山行計画（標準CT確認）', sourceType:'yamareco'},
  '祝瓶山→祝瓶山荘駐車場・桑住平ルート': {minutes:178, source:'ヤマレコ・祝瓶山 祝瓶山荘・桑住平ルート山行計画（標準CT確認）', sourceType:'yamareco'},

  '馬坂峠→帝釈山': {minutes:60, source:'ヤマレコ・帝釈山 馬坂峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '帝釈山→馬坂峠': {minutes:34, source:'ヤマレコ・帝釈山 馬坂峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  // V1.4.44: 全国CT未登録山の穴埋め第5波（北陸・関東・上信越）。
  // 白山・荒島岳・武尊山は自治体/県の公開標準CTを優先。能郷白山はヤマレコ標準計画を複数照合。
  '別当出合→白山室堂': {minutes:270, source:'白山市公式・白山 砂防新道 標準時間（休憩含まず）'},
  '白山室堂→別当出合': {minutes:140, source:'白山市公式・白山 砂防新道 標準時間（休憩含まず）'},
  '白山室堂→白山（御前峰）': {minutes:40, source:'石川県・白山のグレーディング／登山マップ2026'},
  '白山（御前峰）→白山室堂': {minutes:30, source:'石川県・白山のグレーディング／登山マップ2026'},

  '勝原コース登山口→荒島岳': {minutes:210, source:'大野市公式・荒島岳 勝原コース'},
  '荒島岳→勝原コース登山口': {minutes:150, source:'大野市公式・荒島岳 勝原コース'},
  '中出コース登山口→荒島岳': {minutes:220, source:'大野市公式・荒島岳 中出コース'},
  '荒島岳→中出コース登山口': {minutes:160, source:'大野市公式・荒島岳 中出コース'},

  '川場谷野営場登山口→武尊山': {minutes:275, source:'群馬県公開・川場村観光ガイド 武尊山 川場谷野営場コース'},
  '武尊山→川場谷野営場登山口': {minutes:225, source:'群馬県公開・川場村観光ガイド 武尊山 川場谷野営場コース'},

  '温見峠→能郷白山（権現山）': {minutes:145, source:'ヤマレコ・能郷白山 温見峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '能郷白山（権現山）→温見峠': {minutes:85, source:'ヤマレコ・能郷白山 温見峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  // V1.4.45: 全国CT未登録山の穴埋め第6波（上信越・越後）。
  // 新潟県・魚沼市観光協会・上田市等の公式CTを優先し、方向別CTが不足する山のみヤマレコ標準計画を複数照合。
  '桜坂登山口→巻機山': {minutes:307, source:'ヤマレコ・巻機山 井戸尾根コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '巻機山→桜坂登山口': {minutes:187, source:'ヤマレコ・巻機山 井戸尾根コース山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '小赤沢三合目登山口→苗場山': {minutes:200, source:'ヤマレコ・苗場山 小赤沢三合目コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '苗場山→小赤沢三合目登山口': {minutes:136, source:'ヤマレコ・苗場山 小赤沢三合目コース山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '枝折峠→越後駒ヶ岳': {minutes:360, source:'魚沼市観光協会公式・越後駒ヶ岳 枝折峠コース'},
  '越後駒ヶ岳→枝折峠': {minutes:330, source:'魚沼市観光協会公式・越後駒ヶ岳 枝折峠コース'},

  '鷹ノ巣・平ヶ岳登山口→平ヶ岳': {minutes:390, source:'魚沼市観光協会公式・平ヶ岳 鷹ノ巣コース'},
  '平ヶ岳→鷹ノ巣・平ヶ岳登山口': {minutes:240, source:'魚沼市観光協会公式・平ヶ岳 鷹ノ巣コース'},

  '菅平牧場登山口→四阿山': {minutes:180, source:'上田市公式・菅平牧場 四阿山コース'},

  '十字峡登山センター→中ノ岳': {minutes:360, source:'新潟県公式観光情報・中ノ岳 十字峡登山口コース'},

  // V1.4.46: 全国CT未登録山の穴埋め第7波（北信・秋山郷）。
  // 地点名と実際の起終点が一致する区間のみ採用。浅間山・黒姫山は地点差/規制・ルート差のため今回は保留。
  'ドロノ木平登山口→佐武流山': {minutes:404, source:'ヤマレコ・佐武流山 ドロノキ平ルート山行計画（標準CT確認）', sourceType:'yamareco'},
  '佐武流山→ドロノ木平登山口': {minutes:293, source:'ヤマレコ・佐武流山 ドロノキ平ルート山行計画（標準CT確認）', sourceType:'yamareco'},

  'ムジナ平登山口→鳥甲山': {minutes:270, source:'津南町観光協会公式・鳥甲山 ムジナ平ルート'},
  '屋敷口→鳥甲山': {minutes:300, source:'津南町観光協会公式・鳥甲山 屋敷ルート'},

  '一の鳥居苑地・飯縄山登山者駐車場→飯縄山': {minutes:150, source:'長野市公式・飯縄山 南登山道'},
  '飯縄山→一の鳥居苑地・飯縄山登山者駐車場': {minutes:120, source:'長野市公式・飯縄山 南登山道'},

  '戸隠神社奥社登山口→戸隠山': {minutes:130, source:'ヤマレコ・戸隠山 山行計画（奥社→八方睨→戸隠山、標準CT複数照合）', sourceType:'yamareco'},
  '戸隠山→一不動避難小屋': {minutes:89, source:'ヤマレコ・戸隠山 山行計画（戸隠山→九頭龍山→一不動、標準CT複数照合）', sourceType:'yamareco'},

  // V1.4.47: 全国CT未登録山の穴埋め第8波（越後・佐渡）。
  // 公式・自治体の標準CTを優先。金北山の上りのみヤマレコ標準計画を複数照合。
  '白雲台交流センター→金北山': {minutes:125, source:'ヤマレコ・金北山 白雲台登山口ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '金北山→白雲台交流センター': {minutes:80, source:'さど観光ナビ公式・ドンデン高原～白雲台縦走ルート'},
  '大平登山口→米山': {minutes:150, source:'柏崎市公式・米山 大平コース（休憩含まず）'},
  '保久礼登山口→守門岳': {minutes:210, source:'魚沼市観光協会公式・守門岳 保久礼コース'},
  '二口登山口→守門岳': {minutes:180, source:'魚沼市観光協会公式・守門岳 二口コース'},
  'ネズモチ平登山口駐車場→浅草岳': {minutes:135, source:'魚沼市観光協会公式・浅草岳 ネズモチ平コース'},
  '粟ヶ岳中央登山口（県民休養地）→粟ヶ岳': {minutes:180, source:'加茂市公式・粟ヶ岳 中央登山道'},
  '室谷登山口→御神楽岳': {minutes:240, source:'新潟県公式観光情報・御神楽岳 室谷登山口'},

  // V1.4.48: 全国CT未登録山の穴埋め第9波（北陸・飛騨）。
  // 固定地点と公開CTの起終点が一致するルートのみ採用。八海山は山麓駅と山頂駅の起点差があるため保留。
  '人形堂・中根平登山口→人形山': {minutes:251, source:'ヤマレコ・人形山 中根平登山口ルート山行計画（標準CT区間合算）', sourceType:'yamareco'},
  '人形山→人形堂・中根平登山口': {minutes:166, source:'ヤマレコ・人形山 中根平登山口ルート山行計画（標準CT区間合算）', sourceType:'yamareco'},

  '栃谷登山口金剛堂山→金剛堂山': {minutes:227, source:'ヤマレコ・金剛堂山 栃谷登山口ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '金剛堂山→栃谷登山口金剛堂山': {minutes:142, source:'ヤマレコ・金剛堂山 栃谷登山口ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  'ブナオ峠大門山登山口→大門山': {minutes:130, source:'日本アルプス登山案内・大門山 ブナオ峠コース'},
  '大門山→ブナオ峠大門山登山口': {minutes:100, source:'日本アルプス登山案内・大門山 ブナオ峠コース'},

  '山之口登山口川上岳→川上岳': {minutes:218, source:'ヤマレコ・川上岳 山之口登山口ルート山行計画（標準CT区間合算）', sourceType:'yamareco'},
  '川上岳→山之口登山口川上岳': {minutes:144, source:'ヤマレコ・川上岳 山之口登山口ルート山行計画（標準CT区間合算）', sourceType:'yamareco'},

  '冠山峠→冠山': {minutes:45, source:'ヤマレコ・冠山 冠山峠ルート山行計画（標準CT区間合算）', sourceType:'yamareco'},
  '冠山→冠山峠': {minutes:34, source:'ヤマレコ・冠山 冠山峠ルート山行計画（標準CT区間合算）', sourceType:'yamareco'},

  // V1.4.49: 全国CT未登録山の穴埋め第10波（福井・岐阜・北陸）。
  // 固定候補と公開CTの起終点が一致する区間のみ採用。公式値を優先し、不足方向のみ補助CTを利用。
  '桧峠 大日ヶ岳登山口→大日ヶ岳': {minutes:260, source:'TABITABI郡上公式・大日ヶ岳 ウイングヒルズ白鳥リゾートコース'},
  '大日ヶ岳→桧峠 大日ヶ岳登山口': {minutes:180, source:'TABITABI郡上公式・大日ヶ岳 ウイングヒルズ白鳥リゾートコース'},

  'ダナ平林道登山口→位山': {minutes:60, source:'高山市公式・位山 巨石群登山道'},
  '位山→ダナ平林道登山口': {minutes:50, source:'高山市公式・位山 巨石群登山道'},

  '西尾平駐車場→医王山（奥医王山）': {minutes:103, source:'ヤマレコ・奥医王山 西尾平ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '医王山（奥医王山）→西尾平駐車場': {minutes:80, source:'ヤマレコ・奥医王山 西尾平ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '奥越高原青少年自然の家→経ヶ岳（福井）': {minutes:270, source:'福井県公式・経ヶ岳登山道地図（一般的な所要時間・登り区間合算）'},
  '経ヶ岳（福井）→奥越高原青少年自然の家': {minutes:183, source:'ヤマレコ・経ヶ岳 奥越高原青少年自然の家ルート山行計画（標準CT区間合算）', sourceType:'yamareco'},

  '乙女渓谷（小秀山登山口）→小秀山': {minutes:283, source:'ヤマレコ・小秀山 乙女渓谷二ノ谷ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '小秀山→乙女渓谷（小秀山登山口）': {minutes:192, source:'ヤマレコ・小秀山 三ノ谷下山ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  // V1.4.50: 全国CT未登録山の穴埋め第11波（北陸～中央アルプス北端）。
  // 固定地点と公開CTの起終点が一致する区間のみ採用。奥三界岳は現行の通行規制とは分離してCT自体を保持。
  '川上林道ゲート（夕森渓谷）→奥三界岳': {minutes:307, source:'ヤマレコ・奥三界岳 川上林道ゲート山行計画（標準CT区間合算）', sourceType:'yamareco'},
  '奥三界岳→川上林道ゲート（夕森渓谷）': {minutes:205, source:'ヤマレコ・奥三界岳 川上林道ゲート山行計画（標準CT区間合算）', sourceType:'yamareco'},

  '権兵衛峠登山口→経ヶ岳': {minutes:240, source:'ヤマレコ・経ヶ岳 権兵衛峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '経ヶ岳→権兵衛峠登山口': {minutes:164, source:'ヤマレコ・経ヶ岳 権兵衛峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '鷲ヶ岳立石キャンプ場（林道ルート起点）→鷲ヶ岳': {minutes:80, source:'マウンテンシティ・鷲ヶ岳キャンプ場ルート（一般コースタイム）'},
  '鷲ヶ岳→鷲ヶ岳立石キャンプ場（林道ルート起点）': {minutes:60, source:'マウンテンシティ・鷲ヶ岳キャンプ場ルート（一般コースタイム）'},

  // V1.4.51: 全国CT未登録山の穴埋め第12波（中央アルプス・御嶽／奥秩父）。
  // 固定地点と標準CTの端点が一致する区間のみ採用。御嶽・奥秩父はヤマレコ標準CTを複数照合。
  '田の原登山口→御嶽山（剣ヶ峰）': {minutes:202, source:'ヤマレコ・御嶽山 田の原ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '御嶽山（剣ヶ峰）→田の原登山口': {minutes:116, source:'ヤマレコ・御嶽山 田の原ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '神坂峠登山口→恵那山': {minutes:300, source:'中津川市公式・恵那山 神坂峠ルート'},
  '恵那山→神坂峠登山口': {minutes:270, source:'中津川市公式・恵那山 神坂峠ルート'},

  '上日川峠→大菩薩嶺': {minutes:122, source:'ヤマレコ・大菩薩嶺 上日川峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '大菩薩嶺→上日川峠': {minutes:74, source:'ヤマレコ・大菩薩嶺 上日川峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '大弛峠→金峰山': {minutes:128, source:'ヤマレコ・金峰山 大弛峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '金峰山→大弛峠': {minutes:105, source:'ヤマレコ・金峰山 大弛峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '瑞牆山荘・富士見平口→富士見平小屋': {minutes:66, source:'ヤマレコ・瑞牆山 瑞牆山荘ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '富士見平小屋→瑞牆山': {minutes:118, source:'ヤマレコ・瑞牆山 瑞牆山荘ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '瑞牆山→富士見平小屋': {minutes:76, source:'ヤマレコ・瑞牆山 瑞牆山荘ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '富士見平小屋→瑞牆山荘・富士見平口': {minutes:37, source:'ヤマレコ・瑞牆山 瑞牆山荘ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '瑞牆山荘・富士見平口→瑞牆山': {minutes:184, source:'ヤマレコ・瑞牆山 瑞牆山荘ルート山行計画（標準CT区間合算）', sourceType:'yamareco'},
  '瑞牆山→瑞牆山荘・富士見平口': {minutes:113, source:'ヤマレコ・瑞牆山 瑞牆山荘ルート山行計画（標準CT区間合算）', sourceType:'yamareco'},

  // V1.4.52: 全国CT未登録山の穴埋め第13波（奥秩父～関東）。
  // 公式CTを優先し、公式で逆方向が得られない区間のみヤマレコ公開「山行計画」の標準CTを複数照合して補完。
  '日向大谷口→両神山': {minutes:300, source:'ヤマレコ・両神山 日向大谷ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '両神山→日向大谷口': {minutes:197, source:'ヤマレコ・両神山 日向大谷ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '毛木平登山口→甲武信ヶ岳': {minutes:240, source:'川上村公式・甲武信ヶ岳 毛木平～千曲川源流ルート'},
  '甲武信ヶ岳→毛木平登山口': {minutes:168, source:'ヤマレコ・甲武信ヶ岳 毛木平ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '深田記念公園・茅ヶ岳登山口→茅ヶ岳': {minutes:140, source:'北杜市観光協会・茅ヶ岳 深田記念公園ルート'},
  '茅ヶ岳→深田記念公園・茅ヶ岳登山口': {minutes:103, source:'ヤマレコ・茅ヶ岳 深田公園ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '徳和・乾徳山登山口→乾徳山': {minutes:294, source:'ヤマレコ・乾徳山 徳和・オソバ沢ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '乾徳山→徳和・乾徳山登山口': {minutes:171, source:'ヤマレコ・乾徳山 徳和・オソバ沢ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '生川・一の鳥居→武甲山': {minutes:130, source:'横瀬町観光協会公式・武甲山 表参道ルート'},
  '武甲山→生川・一の鳥居': {minutes:104, source:'ヤマレコ・武甲山 一の鳥居表参道ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  // V1.4.53: 全国CT未登録山の穴埋め第14波（関東・山梨・伊豆を一括拡張）。
  // 今回は8座・18方向。公式値を優先し、方向別CTがない区間はヤマレコ公開「山行計画」の標準CTを複数照合。
  '大弛峠→国師ヶ岳': {minutes:60, source:'山梨市公式・国師ヶ岳（大弛峠から山頂まで約1時間）'},
  '国師ヶ岳→大弛峠': {minutes:35, source:'ヤマレコ・国師ヶ岳 大弛峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '大倉登山口→塔ノ岳': {minutes:309, source:'ヤマレコ・塔ノ岳 大倉尾根ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '塔ノ岳→大倉登山口': {minutes:192, source:'ヤマレコ・塔ノ岳 大倉尾根ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '公時神社（金時神社）登山口→金時山': {minutes:116, source:'ヤマレコ・金時山 公時神社ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '金時山→公時神社（金時神社）登山口': {minutes:65, source:'ヤマレコ・金時山 公時神社ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '金時見晴パーキング→金時山': {minutes:83, source:'ヤマレコ・金時山 金時見晴パーキングルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '金時山→金時見晴パーキング': {minutes:48, source:'ヤマレコ・金時山 金時見晴パーキングルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '三ツ峠登山口→三ッ峠山': {minutes:110, source:'西桂町公式・三ツ峠山 裏登山口コース'},
  '三ッ峠山→三ツ峠登山口': {minutes:80, source:'西桂町公式・三ツ峠山 裏登山口コース'},

  '十里木高原登山口→愛鷹山（越前岳）': {minutes:146, source:'ヤマレコ・越前岳 十里木高原ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '愛鷹山（越前岳）→十里木高原登山口': {minutes:82, source:'ヤマレコ・越前岳 十里木高原ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '百畳峠（百畳平）駐車場・山伏登山口→山伏': {minutes:59, source:'ヤマレコ・山伏 百畳峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '山伏→百畳峠（百畳平）駐車場・山伏登山口': {minutes:34, source:'ヤマレコ・山伏 百畳峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '道坂トンネル都留側駐車場・御正体山登山口→御正体山': {minutes:247, source:'ヤマレコ・御正体山 道坂トンネルルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '御正体山→道坂トンネル都留側駐車場・御正体山登山口': {minutes:180, source:'ヤマレコ・御正体山 道坂トンネルルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  'ヤビツ峠→大山（神奈川）': {minutes:122, source:'ヤマレコ・大山 ヤビツ峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '大山（神奈川）→ヤビツ峠': {minutes:73, source:'ヤマレコ・大山 ヤビツ峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  // V1.4.54: 全国CT未登録山の穴埋め第15波（東北・北関東を一括拡張）。
  // 8座・15方向。公式値を優先し、端点一致が確認できるヤマレコ標準計画のみ補助利用。逆方向が不明確な区間は登録しない。
  '八幡平見返峠・山頂レストハウス→八幡平': {minutes:25, source:'ヤマレコ・八幡平 山頂レストハウス周回山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '八幡平→八幡平見返峠・山頂レストハウス': {minutes:21, source:'ヤマレコ・八幡平 山頂レストハウス周回山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '中沼登山口→焼石岳': {minutes:215, source:'ヤマレコ・焼石岳 中沼コース山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '焼石岳→中沼登山口': {minutes:140, source:'ヤマレコ・焼石岳 中沼コース山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '有屋登山口→神室山': {minutes:267, source:'ヤマレコ・神室山 有屋口ルート山行計画（標準CT確認）', sourceType:'yamareco'},
  '神室山→有屋登山口': {minutes:173, source:'ヤマレコ・神室山 有屋口ルート山行計画（標準CT確認）', sourceType:'yamareco'},

  '奥岳登山口・あだたら山ロープウェイ→安達太良山': {minutes:150, source:'二本松市観光連盟公式・安達太良山 奥岳登山口 五葉松平コース'},

  '山王峠・太郎山登山口→太郎山': {minutes:219, source:'ヤマレコ・太郎山 山王峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '太郎山→山王峠・太郎山登山口': {minutes:154, source:'ヤマレコ・太郎山 山王峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '浅間隠山登山口（二度上峠付近）→浅間隠山': {minutes:107, source:'ヤマレコ・浅間隠山 二度上峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '浅間隠山→浅間隠山登山口（二度上峠付近）': {minutes:64, source:'ヤマレコ・浅間隠山 二度上峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '榛名公園ビジターセンター登山口→榛名富士': {minutes:70, source:'ヤマレコ・榛名富士 ビジターセンタールート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '榛名富士→榛名公園ビジターセンター登山口': {minutes:36, source:'ヤマレコ・榛名富士 ビジターセンタールート山行計画（標準CT確認）', sourceType:'yamareco'},

  '内山峠登山口→荒船山（経塚山）': {minutes:181, source:'ヤマレコ・荒船山 内山峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '荒船山（経塚山）→内山峠登山口': {minutes:146, source:'ヤマレコ・荒船山 内山峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  // V1.4.55: 全国CT未登録山の穴埋め第16波（北東北・阿武隈を追加）。
  // 固定候補と公開標準CTの端点が一致する区間のみ採用。異なる下山路を使う大滝根山は登り方向のみ登録。
  '一本杉登山口 姫神山→姫神山': {minutes:138, source:'ヤマレコ・姫神山 一本杉登山口ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '姫神山→一本杉登山口 姫神山': {minutes:77, source:'ヤマレコ・姫神山 一本杉登山口ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '赤坂峠 五葉山登山口→五葉山': {minutes:156, source:'ヤマレコ・五葉山 赤坂峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '五葉山→赤坂峠 五葉山登山口': {minutes:96, source:'ヤマレコ・五葉山 赤坂峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '石楠花荘→五葉山': {minutes:13, source:'ヤマレコ・五葉山 赤坂峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '五葉山→石楠花荘': {minutes:11, source:'ヤマレコ・五葉山 赤坂峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '阿仁ゴンドラ山頂駅→森吉山': {minutes:83, source:'ヤマレコ・森吉山 阿仁ゴンドラ山頂駅ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '森吉山→阿仁ゴンドラ山頂駅': {minutes:57, source:'ヤマレコ・森吉山 阿仁ゴンドラ山頂駅ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  '仙台平 大滝根山登山口→大滝根山': {minutes:125, source:'ヤマレコ・大滝根山 仙台平・鬼穴ルート山行計画（標準CT確認）', sourceType:'yamareco'},

  // V1.4.56: 全国CT未登録山の穴埋め第17波（東北南部〜会津）。
  // 固定座標の端点と公開CTの端点が一致した区間のみ追加。飯豊山・西吾妻山・荒海山・七ヶ岳・会津朝日岳は端点差/固定小屋未確定のため保留。
  '古寺案内センター（古寺コース）→大朝日岳': {minutes:370, source:'山と高原地図Web・古寺案内センターから大朝日岳へ'},
  '大朝日岳→古寺案内センター（古寺コース）': {minutes:245, source:'山と高原地図Web・古寺案内センターから大朝日岳へ'},

  '御鍋神社登山口→二岐山（男岳）': {minutes:127, source:'ヤマレコ・二岐山 御鍋神社登山口ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '二岐山（男岳）→御鍋神社登山口': {minutes:71, source:'ヤマレコ・二岐山 御鍋神社登山口ルート山行計画（標準CT確認）', sourceType:'yamareco'},

  // V1.4.57: 全国CT未登録山の穴埋め第18波（北陸・越後を横断して端点一致区間を追加）。
  // 公開公式CTを優先し、公式資料同士で値が割れる方向は登録しない。
  '二王子神社登山口→二王子岳': {minutes:240, source:'新潟県観光協会公式・二王子岳 二王子神社登山口コース'},
  '白木峰8合目駐車場→白木峰': {minutes:60, source:'富山市公式・白木峰 登山道ルート'},
  '三方岩岳→三方岩駐車場': {minutes:40, source:'石川県林業公社・三方岩トレッキングコース（下り）'},

  // V1.4.58: 全国CT未登録方向の穴埋め第19波（尾瀬・越後の逆方向補完）。
  // 固定地点名とヤマレコ公開「山行計画」の端点名が一致し、標準CTを確認できた方向のみ追加。
  '鳩待峠→至仏山': {minutes:173, source:'ヤマレコ・至仏山 鳩待峠ルート山行計画（標準CT複数照合・区間合算）', sourceType:'yamareco'},
  '至仏山→鳩待峠': {minutes:111, source:'ヤマレコ・至仏山 鳩待峠ルート山行計画（標準CT複数照合・区間合算）', sourceType:'yamareco'},

  '米山→大平登山口': {minutes:101, source:'ヤマレコ・米山 大平登山口ルート山行計画（標準CT複数照合・区間合算）', sourceType:'yamareco'},
  '中ノ岳→十字峡登山センター': {minutes:232, source:'ヤマレコ・中ノ岳 十字峡登山センタールート山行計画（標準CT複数照合・区間合算）', sourceType:'yamareco'},
  '御神楽岳→室谷登山口': {minutes:155, source:'ヤマレコ・御神楽岳 室谷登山口ルート山行計画（標準CT確認・区間合算）', sourceType:'yamareco'}
});

// V1.4.38: 九州・四国・近畿・中国の主要区間 標準コースタイム（分）。
// 公式情報を優先し、細区間で公式CTが得にくい箇所のみヤマレコ公開「山行計画」の標準CTを補助利用。
// 速度倍率が明記された計画・実歩行実績は採用しない。推測値は使用しない。
const WEST_JAPAN_COURSE_TIMES = Object.freeze({
  // 九州：由布・祖母・雲仙
  '由布岳正面登山口→由布岳': {minutes:187, source:'ヤマレコ・由布岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '由布岳→由布岳正面登山口': {minutes:107, source:'ヤマレコ・由布岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '北谷登山口→祖母山': {minutes:155, source:'ヤマレコ・祖母山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '祖母山→北谷登山口': {minutes:127, source:'ヤマレコ・祖母山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '仁田峠→雲仙岳（普賢岳）': {minutes:90, source:'ヤマレコ・普賢岳 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 九州：くじゅう・霧島
  '牧ノ戸峠→久住分かれ避難小屋': {minutes:113, source:'ヤマレコ・牧ノ戸峠〜久住山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '久住分かれ避難小屋→久住山': {minutes:37, source:'ヤマレコ・牧ノ戸峠〜久住山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '韓国岳登山口→霧島山（韓国岳）': {minutes:90, source:'環境省・韓国岳大浪池登山コース 韓国岳登山口→韓国岳山頂90分（V1.5.47公式値優先）', sourceType:'official'},
  '霧島山（韓国岳）→韓国岳登山口': {minutes:74, source:'ヤマレコ・韓国岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '高千穂河原→高千穂峰': {minutes:145, source:'ヤマレコ・高千穂峰 山行計画（標準CT補完）', sourceType:'yamareco'},
  '高千穂峰→高千穂河原': {minutes:85, source:'ヤマレコ・高千穂峰 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 四国：剣山〜三嶺
  '見の越→西島駅': {minutes:64, source:'ヤマレコ・剣山/次郎笈 山行計画（標準CT補完）', sourceType:'yamareco'},
  '西島駅→剣山頂上ヒュッテ': {minutes:50, source:'ヤマレコ・剣山/次郎笈 山行計画（標準CT補完）', sourceType:'yamareco'},
  '剣山頂上ヒュッテ→剣山': {minutes:7, source:'ヤマレコ・剣山/次郎笈 山行計画（標準CT補完）', sourceType:'yamareco'},
  '剣山→剣山頂上ヒュッテ': {minutes:7, source:'ヤマレコ・剣山縦走 山行計画（標準CT補完）', sourceType:'yamareco'},
  '剣山→次郎笈': {minutes:63, source:'ヤマレコ・剣山/次郎笈 山行計画（標準CT補完）', sourceType:'yamareco'},
  '次郎笈→剣山': {minutes:66, source:'ヤマレコ・剣山〜三嶺 山行計画（標準CT補完）', sourceType:'yamareco'},
  // V1.5.14: 剣山〜三嶺縦走の実利用CT欠損を公開標準CTで固定。
  // 剣山→白髪避難小屋 / 次郎笈→白髪避難小屋はヤマレコ公開山行計画の区間合算。
  // 逆方向は三嶺→剣山縦走の公開山行計画の区間合算。
  '剣山→白髪避難小屋': {minutes:322, source:'ヤマレコ・三嶺 山行計画（剣山→白髪避難小屋 標準CT区間合算）', sourceType:'yamareco'},
  '白髪避難小屋→剣山': {minutes:368, source:'ヤマレコ・三嶺→剣山縦走 山行計画（白髪避難小屋→剣山 標準CT区間合算）', sourceType:'yamareco'},
  '次郎笈→白髪避難小屋': {minutes:259, source:'ヤマレコ・三嶺 山行計画（次郎笈→白髪避難小屋 標準CT区間合算）', sourceType:'yamareco'},
  '白髪避難小屋→次郎笈': {minutes:302, source:'ヤマレコ・三嶺→剣山縦走 山行計画（白髪避難小屋→次郎笈 標準CT区間合算）', sourceType:'yamareco'},
  '白髪避難小屋→三嶺ヒュッテ': {minutes:131, source:'確認済みCT合成（白髪避難小屋→三嶺 122分 + 三嶺→三嶺ヒュッテ 9分）', sourceType:'composed-verified'},
  '三嶺ヒュッテ→白髪避難小屋': {minutes:126, source:'確認済みCT合成（三嶺ヒュッテ→三嶺 14分 + 三嶺→白髪避難小屋 112分）', sourceType:'composed-verified'},

  // V1.5.14: 剣山野営場（西島野営場）の周辺CT。YAMAPモデルコースの区間合算。
  '見ノ越 剣山登山口→剣山野営場（西島野営場）': {minutes:42, source:'YAMAP・剣山王道モデルコース（見ノ越→剣山野営場 標準CT区間合算）', sourceType:'yamap'},
  '剣山野営場（西島野営場）→見ノ越 剣山登山口': {minutes:40, source:'YAMAP・剣山王道モデルコース（剣山野営場→見ノ越 標準CT区間合算）', sourceType:'yamap'},
  '剣山野営場（西島野営場）→剣山観光登山リフト西島駅': {minutes:16, source:'YAMAP・剣山王道モデルコース（野営場→西島駅 標準CT区間合算）', sourceType:'yamap'},
  '剣山観光登山リフト西島駅→剣山野営場（西島野営場）': {minutes:7, source:'YAMAP・剣山王道モデルコース（西島駅→野営場 標準CT区間合算）', sourceType:'yamap'},
  '白髪避難小屋→三嶺': {minutes:122, source:'ヤマレコ・剣山〜三嶺 山行計画（標準CT補完）', sourceType:'yamareco'},
  '三嶺→白髪避難小屋': {minutes:112, source:'ヤマレコ・三嶺〜剣山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '三嶺ヒュッテ→三嶺': {minutes:14, source:'ヤマレコ・三嶺 山行計画（標準CT補完）', sourceType:'yamareco'},
  '三嶺→三嶺ヒュッテ': {minutes:9, source:'ヤマレコ・三嶺 山行計画（標準CT補完）', sourceType:'yamareco'},
  '名頃登山口→三嶺ヒュッテ': {minutes:223, source:'ヤマレコ・三嶺 山行計画（標準CT補完）', sourceType:'yamareco'},
  '三嶺ヒュッテ→名頃登山口': {minutes:131, source:'ヤマレコ・三嶺 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 四国：石鎚山（石鎚山系公式）
  '石鎚ロープウェイ山頂成就駅→石鎚山（弥山）': {minutes:210, source:'石鎚山・石鎚山系公式 初心者向けルート'},
  '石鎚山（弥山）→石鎚ロープウェイ山頂成就駅': {minutes:180, source:'石鎚山・石鎚山系公式 初心者向けルート'},
  '土小屋登山口→石鎚山（弥山）': {minutes:150, source:'石鎚山・石鎚山系公式 初心者向けルート'},
  '石鎚山（弥山）→土小屋登山口': {minutes:120, source:'石鎚山・石鎚山系公式 初心者向けルート'},

  // 近畿：大峰・比良
  '行者還トンネル西口→弥山小屋': {minutes:205, source:'ヤマレコ・八経ヶ岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '弥山小屋→八経ヶ岳': {minutes:34, source:'ヤマレコ・八経ヶ岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '八経ヶ岳→弥山小屋': {minutes:30, source:'ヤマレコ・八経ヶ岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '弥山小屋→行者還トンネル西口': {minutes:131, source:'ヤマレコ・八経ヶ岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '坊村→武奈ヶ岳': {minutes:232, source:'ヤマレコ・武奈ヶ岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '武奈ヶ岳→坊村': {minutes:143, source:'ヤマレコ・武奈ヶ岳 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 中国：大山・氷ノ山・蒜山・道後山・三瓶山
  '夏山登山口→六合目避難小屋': {minutes:128, source:'ヤマレコ・大山弥山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '六合目避難小屋→大山頂上避難小屋': {minutes:73, source:'ヤマレコ・大山弥山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '大山頂上避難小屋→大山（弥山）': {minutes:3, source:'ヤマレコ・大山弥山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '大山（弥山）→六合目避難小屋': {minutes:60, source:'環境省・大山登山コース 大山山頂→六合目避難小屋60分（V1.5.47公式値優先）', sourceType:'official'},
  '福定親水公園→氷ノ山': {minutes:221, source:'ヤマレコ・氷ノ山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '氷ノ山→福定親水公園': {minutes:133, source:'ヤマレコ・氷ノ山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '氷ノ山→氷ノ山山頂避難小屋': {minutes:1, source:'ヤマレコ・氷ノ山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '上蒜山登山口駐車場→上蒜山': {minutes:166, source:'ヤマレコ・上蒜山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '上蒜山→上蒜山登山口駐車場': {minutes:103, source:'ヤマレコ・上蒜山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '月見ヶ丘→道後山': {minutes:109, source:'ヤマレコ・道後山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '道後山→月見ヶ丘': {minutes:78, source:'ヤマレコ・道後山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '東の原登山口→三瓶山（男三瓶山）': {minutes:227, source:'ヤマレコ・男三瓶山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '三瓶山（男三瓶山）→東の原登山口': {minutes:132, source:'ヤマレコ・男三瓶山 山行計画（標準CT補完）', sourceType:'yamareco'},

  // V1.4.57: 近畿の未登録固定地点。固定地点と公開CT端点の一致を確認できた区間のみ追加。
  'みつえ青少年旅行村（三峰山登山口）→三峰山': {minutes:120, source:'御杖村観光協会公式・三峰山 登尾ルート（片道約2時間）'},

  // 藤原岳：山と高原地図Webの登り標準CT。逆方向はヤマレコ公開「山行計画」の標準CTを複数照合。
  '大貝戸登山口→藤原山荘': {minutes:180, source:'山と高原地図Web・藤原岳 大貝戸登山道'},
  '藤原山荘→藤原岳': {minutes:20, source:'山と高原地図Web・藤原岳 大貝戸登山道'},
  '大貝戸登山口→藤原岳': {minutes:200, source:'山と高原地図Web・藤原岳 大貝戸登山道（区間合算）'},
  '藤原岳→藤原山荘': {minutes:19, source:'ヤマレコ・藤原岳 大貝戸登山口ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '藤原山荘→大貝戸登山口': {minutes:114, source:'ヤマレコ・藤原岳 大貝戸登山口ルート山行計画（標準CT複数照合・区間合算）', sourceType:'yamareco'},
  '藤原岳→大貝戸登山口': {minutes:133, source:'ヤマレコ・藤原岳 大貝戸登山口ルート山行計画（標準CT複数照合・区間合算）', sourceType:'yamareco'},


  // V1.4.60: 確認済み同一資料CTの一意な連続経路を自動合算し、直通選択でも到着時刻へ反映。
  // V1.4.59: 全国CT残り一括穴埋め。固定地点と公開CT端点が一致する区間のみ追加。
  // 近畿：高見山・大和葛城山
  '高見峠→高見山': {minutes:76, source:'ヤマレコ・高見山 高見峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '高見山→高見峠': {minutes:41, source:'ヤマレコ・高見山 高見峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '水越峠→大和葛城山': {minutes:120, source:'ヤマレコ・大和葛城山 水越峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '大和葛城山→水越峠': {minutes:77, source:'ヤマレコ・大和葛城山 水越峠ルート山行計画（標準CT複数照合）', sourceType:'yamareco'},

  // 四国：瓶ヶ森（観光協会モデルコースの片道所要時間）
  '瓶ヶ森駐車場→瓶ヶ森': {minutes:50, source:'西条市観光物産協会・瓶ヶ森モデルコース', sourceType:'official'},

  // 九州：宮之浦岳。屋久島町公式の淀川登山口－宮之浦岳ルートの方向別所要時間。
  '淀川登山口→淀川小屋': {minutes:50, source:'屋久島町・屋久島山岳登山ルート（淀川登山口－宮之浦岳）', sourceType:'official'},
  '淀川小屋→淀川登山口': {minutes:50, source:'屋久島町・屋久島山岳登山ルート（淀川登山口－宮之浦岳）', sourceType:'official'},
  '淀川小屋→宮之浦岳': {minutes:270, source:'屋久島町・屋久島山岳登山ルート（公式区間合算）', sourceType:'official'},
  '宮之浦岳→淀川小屋': {minutes:235, source:'屋久島町・屋久島山岳登山ルート（公式区間合算）', sourceType:'official'},
  '淀川登山口→宮之浦岳': {minutes:320, source:'屋久島町・屋久島山岳登山ルート', sourceType:'official'},
  '宮之浦岳→淀川登山口': {minutes:285, source:'屋久島町・屋久島山岳登山ルート', sourceType:'official'}
});

// V1.4.37: 八ヶ岳・中信の主要区間 標準コースタイム（分）。
// 公式情報で細かな方向別CTを確認できない区間は、ヤマレコ公開「山行計画」の標準CTを補助利用。
// 速度倍率が明記された計画・実歩行実績は採用しない。
const YATSUGATAKE_CHUSHIN_COURSE_TIMES = Object.freeze({
  // 南八ヶ岳：行者小屋〜赤岳・阿弥陀、硫黄〜横岳縦走
  '行者小屋→赤岳': {minutes:119, source:'ヤマレコ・赤岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '赤岳→行者小屋': {minutes:65, source:'ヤマレコ・赤岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '赤岳→赤岳天望荘': {minutes:20, source:'ヤマレコ・赤岳/横岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '赤岳天望荘→赤岳': {minutes:38, source:'ヤマレコ・赤岳/横岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '赤岳天望荘→横岳（八ヶ岳）': {minutes:50, source:'ヤマレコ・赤岳/横岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '横岳（八ヶ岳）→赤岳天望荘': {minutes:50, source:'ヤマレコ・赤岳/横岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '横岳（八ヶ岳）→硫黄岳山荘': {minutes:30, source:'ヤマレコ・横岳/硫黄岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '硫黄岳山荘→横岳（八ヶ岳）': {minutes:46, source:'ヤマレコ・横岳/硫黄岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '硫黄岳山荘→硫黄岳（八ヶ岳）': {minutes:26, source:'ヤマレコ・横岳/硫黄岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '硫黄岳（八ヶ岳）→硫黄岳山荘': {minutes:16, source:'ヤマレコ・横岳/硫黄岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '赤岳鉱泉→硫黄岳（八ヶ岳）': {minutes:128, source:'ヤマレコ・硫黄岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '硫黄岳（八ヶ岳）→赤岳鉱泉': {minutes:72, source:'ヤマレコ・硫黄岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '赤岳鉱泉→行者小屋': {minutes:43, source:'ヤマレコ・赤岳鉱泉/行者小屋 山行計画（標準CT補完）', sourceType:'yamareco'},
  '行者小屋→赤岳鉱泉': {minutes:29, source:'ヤマレコ・赤岳鉱泉/行者小屋 山行計画（標準CT補完）', sourceType:'yamareco'},
  '行者小屋→阿弥陀岳': {minutes:91, source:'ヤマレコ・赤岳/阿弥陀岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '阿弥陀岳→行者小屋': {minutes:48, source:'ヤマレコ・赤岳/阿弥陀岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '赤岳→阿弥陀岳': {minutes:95, source:'YAMAP標準モデル・美濃戸登山口-地蔵ノ頭 周回コース（赤岳→中岳→中岳のコル→阿弥陀岳、チェックポイント合算1時間35分）', sourceType:'yamap'},
  '阿弥陀岳→美濃戸口': {minutes:201, source:'YAMAP標準モデル・美濃戸口登山口-御小屋山-阿弥陀岳 往復コース（阿弥陀岳→八ヶ岳山荘＝美濃戸口、チェックポイント合算3時間21分）', sourceType:'yamap'},

  // 南八ヶ岳南端：観音平〜編笠〜青年小屋〜権現
  '観音平→編笠山': {minutes:174, source:'ヤマレコ・編笠山/権現岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '編笠山→青年小屋': {minutes:14, source:'ヤマレコ・編笠山/権現岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '青年小屋→権現岳': {minutes:66, source:'ヤマレコ・編笠山/権現岳 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 北八ヶ岳：天狗岳
  '渋の湯→黒百合ヒュッテ': {minutes:137, source:'ヤマレコ・天狗岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '黒百合ヒュッテ→渋の湯': {minutes:101, source:'ヤマレコ・天狗岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '黒百合ヒュッテ→天狗岳': {minutes:82, source:'ヤマレコ・天狗岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '天狗岳→黒百合ヒュッテ': {minutes:52, source:'ヤマレコ・天狗岳 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 北横岳
  '北八ヶ岳ロープウェイ山頂駅→北横岳ヒュッテ': {minutes:35, source:'ヤマレコ・北横岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '北横岳ヒュッテ→北八ヶ岳ロープウェイ山頂駅': {minutes:34, source:'ヤマレコ・北横岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '北横岳ヒュッテ→北横岳': {minutes:22, source:'ヤマレコ・北横岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '北横岳→北横岳ヒュッテ': {minutes:13, source:'ヤマレコ・北横岳 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 蓼科山
  '蓼科山七合目登山口→蓼科山頂ヒュッテ': {minutes:140, source:'ヤマレコ・蓼科山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '蓼科山頂ヒュッテ→蓼科山七合目登山口': {minutes:78, source:'ヤマレコ・蓼科山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '女神茶屋→蓼科山頂ヒュッテ': {minutes:183, source:'ヤマレコ・蓼科山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '蓼科山頂ヒュッテ→女神茶屋': {minutes:105, source:'ヤマレコ・蓼科山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '蓼科山頂ヒュッテ→蓼科山': {minutes:3, source:'ヤマレコ・蓼科山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '蓼科山→蓼科山頂ヒュッテ': {minutes:2, source:'ヤマレコ・蓼科山 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 中信：入笠山・霧ヶ峰・美ヶ原・鉢伏山
  '沢入登山口→入笠山': {minutes:131, source:'ヤマレコ・入笠山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '入笠山→沢入登山口': {minutes:81, source:'ヤマレコ・入笠山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '車山肩→霧ヶ峰（車山）': {minutes:40, source:'ヤマレコ・霧ヶ峰/車山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '霧ヶ峰（車山）→車山肩': {minutes:30, source:'ヤマレコ・霧ヶ峰/車山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '八島ヶ原湿原→霧ヶ峰（車山）': {minutes:127, source:'ヤマレコ・霧ヶ峰/車山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '霧ヶ峰（車山）→八島ヶ原湿原': {minutes:94, source:'ヤマレコ・霧ヶ峰/車山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '山本小屋ふる里館→美ヶ原': {minutes:55, source:'ヤマレコ・美ヶ原/王ヶ頭 山行計画（標準CT補完）', sourceType:'yamareco'},
  '美ヶ原→山本小屋ふる里館': {minutes:49, source:'ヤマレコ・美ヶ原/王ヶ頭 山行計画（標準CT補完）', sourceType:'yamareco'},
  '扉温泉→鉢伏山': {minutes:231, source:'ヤマレコ・鉢伏山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '鉢伏山→扉温泉': {minutes:132, source:'ヤマレコ・鉢伏山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '鉢伏山荘→鉢伏山': {minutes:23, source:'ヤマレコ・鉢伏山 山行計画（標準CT補完）', sourceType:'yamareco'}
});

// V1.4.35: 中央アルプス・南アルプス主要区間 標準コースタイム（分）。
// 公開情報で所要時間を確認できた区間のみ登録。推測値は使用しない。
const CENTRAL_SOUTH_ALPS_COURSE_TIMES = Object.freeze({
  // 中央アルプス（中央アルプス駒ヶ岳ロープウェイ／駒ヶ根観光協会／空木駒峰ヒュッテ）
  '千畳敷→木曽駒ヶ岳': {minutes:120, source:'中央アルプス駒ヶ岳ロープウェイ・登山コース（公式区間合算）'},
  '木曽駒ヶ岳→千畳敷': {minutes:110, source:'中央アルプス駒ヶ岳ロープウェイ・登山コース（公式区間合算）'},
  '空木岳→檜尾岳': {minutes:320, source:'駒ヶ根観光協会・中央アルプス登山案内'},
  '空木駒峰ヒュッテ→空木岳': {minutes:10, source:'空木駒峰ヒュッテ公式・池山尾根コース'},

  // 南アルプス北部：甲斐駒ヶ岳・仙丈ヶ岳（南アルプス市芦安山岳館）
  '北沢峠→長衛小屋': {minutes:10, source:'南アルプス市芦安山岳館・甲斐駒ヶ岳/仙水峠コース'},
  '長衛小屋→北沢峠': {minutes:15, source:'南アルプス市芦安山岳館・甲斐駒ヶ岳/仙水峠コース'},
  '長衛小屋→仙水小屋': {minutes:40, source:'南アルプス市芦安山岳館・仙水峠'},
  '仙水小屋→長衛小屋': {minutes:30, source:'南アルプス市芦安山岳館・仙水峠'},
  '北沢峠→甲斐駒ヶ岳': {minutes:260, source:'南アルプス市芦安山岳館・北沢峠-駒津峰コース（公式区間合算）'},
  '甲斐駒ヶ岳→北沢峠': {minutes:195, source:'南アルプス市芦安山岳館・北沢峠-駒津峰コース（公式区間合算）'},
  '北沢峠→仙丈ヶ岳': {minutes:240, source:'南アルプス市芦安山岳館・小仙丈コース（公式区間合算）'},
  '仙丈ヶ岳→北沢峠': {minutes:160, source:'南アルプス市芦安山岳館・小仙丈コース（公式区間合算）'},
  '馬の背ヒュッテ→仙丈小屋': {minutes:60, source:'南アルプス市芦安山岳館・藪沢コース'},
  '仙丈小屋→馬の背ヒュッテ': {minutes:40, source:'南アルプス市芦安山岳館・藪沢コース'},
  '仙丈小屋→仙丈ヶ岳': {minutes:30, source:'南アルプス市芦安山岳館・藪沢コース'},
  '仙丈ヶ岳→仙丈小屋': {minutes:20, source:'南アルプス市芦安山岳館・藪沢コース'},

  // 白峰三山・塩見（南アルプス市芦安山岳館）
  '広河原→白根御池小屋': {minutes:180, source:'南アルプス市芦安山岳館・北岳 草すべりコース'},
  '白根御池小屋→広河原': {minutes:90, source:'南アルプス市芦安山岳館・北岳 草すべりコース'},
  '白根御池小屋→北岳肩の小屋': {minutes:180, source:'南アルプス市芦安山岳館・北岳 草すべりコース（公式区間合算）'},
  '北岳肩の小屋→白根御池小屋': {minutes:110, source:'南アルプス市芦安山岳館・北岳 草すべりコース（公式区間合算）'},
  '北岳肩の小屋→北岳': {minutes:50, source:'南アルプス市芦安山岳館・北岳 草すべりコース'},
  '北岳→北岳肩の小屋': {minutes:40, source:'南アルプス市芦安山岳館・北岳 草すべりコース'},
  '北岳→北岳山荘': {minutes:50, source:'南アルプス市芦安山岳館・北岳-間ノ岳縦走コース'},
  '北岳山荘→北岳': {minutes:75, source:'南アルプス市芦安山岳館・北岳-間ノ岳縦走コース'},
  '北岳山荘→間ノ岳': {minutes:100, source:'南アルプス市芦安山岳館・北岳-間ノ岳縦走コース'},
  // V1.4.255: 中白根山を通過点として選んだ場合もCTを直接参照できるようYAMAP標準モデル区間を固定。
  '北岳山荘→中白根山': {minutes:36, source:'YAMAP標準モデル・北岳山荘→中白根山（36分）', sourceType:'yamap'},
  '中白根山→間ノ岳': {minutes:55, source:'YAMAP標準モデル・中白根山→間ノ岳（55分）', sourceType:'yamap'},
  '間ノ岳→中白根山': {minutes:30, source:'YAMAP標準モデル・間ノ岳→中白根山（30分）', sourceType:'yamap'},
  '中白根山→北岳山荘': {minutes:25, source:'YAMAP標準モデル・中白根山→北岳山荘（25分）', sourceType:'yamap'},
  '間ノ岳→北岳山荘': {minutes:80, source:'南アルプス市芦安山岳館・北岳-間ノ岳縦走コース'},
  '間ノ岳→農鳥小屋': {minutes:60, source:'南アルプス市芦安山岳館・農鳥岳縦走コース'},
  '農鳥小屋→間ノ岳': {minutes:90, source:'南アルプス市芦安山岳館・農鳥岳縦走コース'},
  '農鳥小屋→農鳥岳': {minutes:90, source:'南アルプス市芦安山岳館・農鳥岳縦走コース（公式区間合算）'},
  '農鳥岳→農鳥小屋': {minutes:70, source:'南アルプス市芦安山岳館・農鳥岳縦走コース（公式区間合算）'},
  // V1.4.164: 大門沢コースの公式参考タイムを合算。農鳥岳→大門沢下降点30分、→大門沢小屋3時間、→奈良田第一発電所3時間、奈良田バス終点まで約40分。
  '農鳥岳→奈良田': {minutes:430, source:'南アルプス市芦安山岳館・農鳥岳 大門沢コース（公式下山参考タイム6時間30分＋奈良田まで約40分）', sourceType:'official'},
  '間ノ岳→熊ノ平小屋': {minutes:120, source:'南アルプス市芦安山岳館・間ノ岳-塩見岳縦走コース'},
  '熊ノ平小屋→間ノ岳': {minutes:180, source:'南アルプス市芦安山岳館・間ノ岳-塩見岳縦走コース'},
  '熊ノ平小屋→塩見岳': {minutes:180, source:'南アルプス市芦安山岳館・間ノ岳-塩見岳縦走コース'},
  '塩見岳→熊ノ平小屋': {minutes:225, source:'南アルプス市芦安山岳館・間ノ岳-塩見岳縦走コース'},
  '塩見岳→三伏峠小屋': {minutes:210, source:'南アルプス市芦安山岳館・間ノ岳-塩見岳縦走コース'},
  '三伏峠小屋→塩見岳': {minutes:270, source:'南アルプス市芦安山岳館・間ノ岳-塩見岳縦走コース'},
  '鳥倉登山口→塩見小屋': {minutes:390, source:'伊那市観光協会・塩見小屋案内（現行案内）'},

  // 鳳凰三山（南アルプス市芦安山岳館）
  '夜叉神峠登山口→南御室小屋': {minutes:340, source:'南アルプス市芦安山岳館・鳳凰山 夜叉神コース（公式区間合算）'},
  '南御室小屋→夜叉神峠登山口': {minutes:230, source:'南アルプス市芦安山岳館・鳳凰山 夜叉神コース（公式区間合算）'},
  '南御室小屋→薬師岳(鳳凰)': {minutes:90, source:'南アルプス市芦安山岳館・鳳凰山 夜叉神コース'},
  '薬師岳(鳳凰)→南御室小屋': {minutes:70, source:'南アルプス市芦安山岳館・鳳凰山 夜叉神コース'},
  '薬師岳(鳳凰)→観音岳(鳳凰)': {minutes:40, source:'南アルプス市芦安山岳館・鳳凰山 夜叉神コース'},
  '観音岳(鳳凰)→薬師岳(鳳凰)': {minutes:30, source:'南アルプス市芦安山岳館・鳳凰山 夜叉神コース'},

  // 南アルプス南部（静岡市公式「南アルプスへの交通案内」モデルコース／南プス）
  '椹島→千枚小屋': {minutes:420, source:'静岡市公式・南アルプス南部モデルコース'},
  '千枚小屋→荒川小屋': {minutes:300, source:'静岡市公式・南アルプス南部モデルコース'},
  '荒川小屋→赤石小屋': {minutes:330, source:'静岡市公式・南アルプス南部モデルコース'},
  '赤石小屋→椹島': {minutes:210, source:'静岡市公式・南アルプス南部モデルコース'},
  '赤石小屋→赤石岳': {minutes:180, source:'静岡市公式・南アルプス南部案内（赤石小屋から赤石岳まで約3時間）'},
  // V1.4.120: 山と溪谷オンラインの椹島ロッヂ案内で明記された標準的な所要時間を補完。
  '椹島→赤石小屋': {minutes:240, source:'山と溪谷オンライン・椹島ロッヂ 赤石岳代表コース（約4時間）'},
  '千枚小屋→椹島': {minutes:180, source:'山と溪谷オンライン・椹島ロッヂ 荒川三山周回案内（約3時間）'},
  '光岳小屋→光岳': {minutes:15, source:'静岡市公式・南アルプス山小屋一覧'},
  '茶臼小屋→茶臼岳': {minutes:30, source:'静岡市 南プス・茶臼小屋案内'},
  '茶臼小屋→上河内岳': {minutes:120, source:'静岡市 南プス・茶臼小屋案内'}
});



// V1.4.36: 公式情報だけでは分割できなかった主要区間の補完CT。
// 補助ソースはヤマケイオンライン、次いでヤマレコの公開「山行計画」標準CTを使用。
// V1.4.127: ヤマレコの公開計画はユーザー設定ペースで時間が変わる場合があるため、計画1件だけを標準CTとはみなさない。
// 複数計画の同一区間値が一致するものを優先し、山行記録で歩くペース倍率が表示される場合は1.0基準へ逆算した候補値を照合に使う。
const SUPPLEMENTAL_COURSE_TIMES = Object.freeze({
  // V1.5.1: 日本百名山の代表峰整理。公開標準モデルの端点が一致する区間のみ追加。
  '峠の茶屋・那須岳登山口→茶臼岳（那須岳）': {minutes:101, source:'YAMAP標準モデル・峠の茶屋登山口→茶臼岳（那須岳）（チェックポイント合算1時間41分）', sourceType:'yamap'},
  '茶臼岳（那須岳）→峠の茶屋・那須岳登山口': {minutes:62, source:'YAMAP標準モデル・茶臼岳（那須岳）→峠の茶屋登山口（チェックポイント合算1時間02分）', sourceType:'yamap'},
  '那須ロープウェイ・峠の茶屋側→茶臼岳（那須岳）': {minutes:101, source:'峠の茶屋・那須岳登山口と同一固定座標。YAMAP標準モデルの同一区間CTを適用', sourceType:'yamap'},
  '茶臼岳（那須岳）→那須ロープウェイ・峠の茶屋側': {minutes:62, source:'峠の茶屋・那須岳登山口と同一固定座標。YAMAP標準モデルの同一区間CTを適用', sourceType:'yamap'},
  '塔ノ岳→丹沢山': {minutes:81, source:'YAMAP標準モデル・菩提峠-表尾根-塔ノ岳-丹沢山往復コース（塔ノ岳→丹沢山 1時間21分）', sourceType:'yamap'},
  '丹沢山→塔ノ岳': {minutes:81, source:'YAMAP標準モデル・菩提峠-表尾根-塔ノ岳-丹沢山往復コース（丹沢山→塔ノ岳 1時間21分）', sourceType:'yamap'},
  // V1.4.145: 残存推定CTの確認済み化 batch19。端点一致する公的資料・標準公開計画を優先。
  '神威山荘・神威岳登山口→神威岳': {minutes:440, source:'YAMAP標準モデル・神威山荘→神威岳（7時間20分）。別公開コースデータの参考タイム7時間10分とも近似', sourceType:'yamap'},
  '越沢口→摩耶山': {minutes:165, source:'山形県山岳情報ポータル・摩耶山 越沢コース 片道2時間30分〜3時間（標準中間値2時間45分）', sourceType:'official'},
  '滝尾神社登山口→女峰山': {minutes:351, source:'ヤマレコ公開山行計画 p5549316・滝尾神社→女峰山 区間CT合算5時間51分', sourceType:'yamareco'},
  '那須ロープウェイ・峠の茶屋側→三本槍岳': {minutes:172, source:'既確認済みの峠の茶屋・那須岳登山口→三本槍岳と同一徒歩起点。ヤマレコ p5532010/p5524672 区間CT一致', sourceType:'yamareco'},
  '中房登山口→有明山': {minutes:202, source:'ヤマレコ公開山行計画 p5229304・中房温泉登山口→登山者用駐車場10分＋有明山北峰192分＝202分', sourceType:'yamareco'},
  // V1.4.144: 残存推定CTの確認済み化 batch18。長距離・難ルートと端点一致が明確な標準CTを優先。
  'イドンナップ山荘駐車場（新冠陽希コース）→幌尻岳': {minutes:675, source:'YAMAP標準モデル・イドンナップ山荘駐車場→新冠ポロシリ山荘 6時間57分＋新冠ポロシリ山荘→幌尻岳 4時間18分＝11時間15分', sourceType:'yamap'},
  '銀山平・皇海山登山者駐車場→皇海山': {minutes:483, source:'YAMAP標準モデル・銀山平駐車場→庚申山→鋸山→皇海山（8時間03分）', sourceType:'yamap'},
  '蓮華温泉→朝日岳（新潟・富山）': {minutes:419, source:'YAMAP標準モデル・蓮華温泉駐車場→朝日岳（6時間59分）', sourceType:'yamap'},
  '高塚高原キャンプ場駐車場→大滝根山': {minutes:53, source:'ヤマレコ公開山行計画・高塚高原キャンプ場→大滝根山（53分、標準計画）', sourceType:'yamareco'},
  '下津池 笹ヶ峰登山口→笹ヶ峰': {minutes:80, source:'好日山荘・下津池登山口→丸山荘40分＋丸山荘→笹ヶ峰40分＝80分', sourceType:'other'},
  // V1.4.143: 残存推定CTの確認済み化 batch17。複数ソース一致・標準モデルの起終点一致を優先。
  'あわすのスキー場・鍬崎山登山口→鍬崎山': {minutes:405, source:'YAMAP標準モデル・あわすのスキー場駐車場→鍬崎山（6時間45分）。ヤマレコ標準計画とも同水準', sourceType:'yamap'},
  '蓬莱駅 登山口→蓬来山': {minutes:277, source:'YAMAP標準モデル・蓬莱駅→小女郎峠→蓬莱山（4時間37分）', sourceType:'yamap'},
  '別所駐車場・英彦山登山口→英彦山': {minutes:146, source:'YAMAP標準モデル・別所駐車場→奉幣殿→英彦山（南岳）（2時間26分）', sourceType:'yamap'},
  '豊前坊・高住神社登山口→英彦山': {minutes:146, source:'YAMAP標準モデル・豊前坊駐車場→北岳→中岳→英彦山（南岳）（2時間26分）', sourceType:'yamap'},
  '大箆柄岳 垂桜コース駐車場・登山口→高隈山（大箆柄岳）': {minutes:165, source:'YAMAP標準モデル・垂桜コース登山口駐車場→大箆柄岳（2時間45分）', sourceType:'yamap'},
  '吉部（坊ガツル）登山口駐車場→大船山': {minutes:278, source:'YAMAP標準モデル・吉部登山口駐車場→坊ガツル→段原→大船山（4時間38分）', sourceType:'yamap'},
  // V1.4.142: 残存推定CTの確認済み化 batch16。長距離・難ルートを優先して標準CTへ置換。
  '札内川ヒュッテ駐車場→カムイエクウチカウシ山': {minutes:560, source:'YAMAP標準モデル・駐車場→札内川七ノ沢分岐→八ノ沢分岐→八ノ沢カール→山頂（9時間20分）', sourceType:'yamap'},
  '神威山荘（ペテガリ岳アプローチ起点）→ペテガリ岳': {minutes:650, source:'日本二百名山コースデータ・神威山荘→ペテガリ岳 参考タイム10時間50分', sourceType:'other'},
  '椹島→聖岳': {minutes:500, source:'日本百名山コースデータ・椹島コース 上り8時間20分', sourceType:'other'},
  '笠新道登山口→笠ヶ岳（岐阜）': {minutes:435, source:'笠新道登山口案内板・笠ヶ岳山荘まで約7時間＋YAMAP標準モデル 山荘→山頂15分', sourceType:'other'},
  '北沢峠→アサヨ峰': {minutes:230, source:'横浜ハイキングクラブ計画・北沢峠→仙水小屋40分→仙水峠40分→栗沢山90分→アサヨ峰60分', sourceType:'other'},
  // V1.4.141: 残存推定CTの確認済み化 batch15。標準モデルのチェックポイントから片道CTを直接確定。
  '祝子川 大崩山登山口→大崩山': {minutes:278, source:'YAMAP標準モデル・坊主尾根コース 大崩山登山口→大崩山（4時間38分）', sourceType:'yamap'},
  '八丁原登山口→涌蓋山': {minutes:208, source:'YAMAP標準モデル・八丁原登山口駐車場→涌蓋山（3時間28分）', sourceType:'yamap'},
  '国見岳新登山口（五勇谷橋ルート）→国見岳': {minutes:145, source:'YAMAP標準モデル・国見岳新登山口→国見岳（2時間25分）', sourceType:'yamap'},
  // V1.4.140: 残存推定CTの確認済み化 batch14。公式・標準モデルで端点一致が確認できた区間のみ追加。
  '鉢盛坂新道口→鉢盛山': {minutes:180, source:'朝日村公式・鉢盛山登山道 野俣沢林道ルート'},
  '孫太尾根登山口→藤原岳': {minutes:200, source:'公共交通アクセス案内・孫太尾根標準CT'},
  '雲母坂登山口（修学院）→比叡山（大比叡）': {minutes:128, source:'YAMAP標準モデル・雲母坂登山口〜大比叡'},
  'びわ湖バレイ山頂駅→蓬来山': {minutes:60, source:'びわ湖バレイ公式・蓬莱山頂コース'},
  '黒木第2駐車場・黒木登山口→多良岳': {minutes:150, source:'YAMAP標準モデル・黒木第2駐車場〜多良岳'},

  // V1.4.139: 残存推定CTを実標準CTへ置換。長距離・難ルートを優先。
  '伊奈川ダム上登山口→南駒ヶ岳': {minutes:627, source:'YAMAP標準モデル・伊奈川ダム駐車場→越百山→仙涯嶺→南駒ヶ岳（10時間27分）', sourceType:'yamap'},
  '伊奈川ダム上登山口→越百山': {minutes:397, source:'YAMAP標準モデル・伊奈川ダム駐車場→越百避難小屋→越百山（6時間37分）', sourceType:'yamap'},
  '九折登山口 傾山→傾山': {minutes:360, source:'好日山荘・九折登山口→林道60分→水場ルート分岐120分→傾山120分（6時間）', sourceType:'other'},
  '万年橋 滑床渓谷 三本杭登山口→三本杭': {minutes:201, source:'YAMAP標準モデル・万年橋駐車場→三本杭（3時間21分）', sourceType:'yamap'},
  '脊振山山頂駐車場→脊振山': {minutes:10, source:'神埼市公式・山頂手前駐車場から約10分', sourceType:'official'},
  '別府ロープウェイ 鶴見山上駅→鶴見岳': {minutes:20, source:'別府ロープウェイ公式・山上駅から頂上まで約15〜30分（代表値20分）', sourceType:'official'},
  // V1.4.138: 残存推定CTの継続削減。YAMAP標準モデルの起終点・チェックポイントが一致する区間を昇格。
  '中房登山口（燕岳・大天井岳 表銀座ルート）→大天井岳': {minutes:445, source:'YAMAP標準モデル・大天井岳 中房温泉→山頂（7時間25分）', sourceType:'yamap'},
  '上高地→霞沢岳': {minutes:512, source:'YAMAP標準モデル・霞沢岳 上高地→徳本峠→K1→山頂（8時間32分）', sourceType:'yamap'},
  '蘭登山口→南木曽岳': {minutes:249, source:'YAMAP標準モデル・南木曽岳 蘭駐車場→山頂（4時間09分）', sourceType:'yamap'},
  '新御坂トンネル御坂口駐車場（御坂黒岳ルート）→黒岳（御坂黒岳）': {minutes:161, source:'YAMAP標準モデル・三ツ峠入口→旧御坂峠→黒岳（2時間41分）', sourceType:'yamap'},
  '水越峠 金剛山→金剛山': {minutes:167, source:'YAMAP標準モデル・水越峠登山口→金剛山（2時間47分）', sourceType:'yamap'},
  // V1.4.137: 残存推定CTを継続削減。公的・観光公式・山と高原地図Webの標準所要時間を優先。
  '斑尾高原ビジターセンター（山の家）→斑尾山': {minutes:90, source:'斑尾高原観光協会・かえでの木トレイル 山頂まで約1時間30分', sourceType:'official'},
  '芦屋川 高座の滝→六甲山': {minutes:200, source:'山と高原地図Web・高座の滝→風吹岩40分→雨ヶ峠60分→一軒茶屋90分→六甲山最高峰10分（合計3時間20分）', sourceType:'yamakei'},
  '蛇淵の滝 那岐山登山口→那岐山': {minutes:120, source:'岡山観光WEB公式・那岐山 登山道から山頂まで徒歩約2時間', sourceType:'official'},
  '光石登山口→三嶺': {minutes:240, source:'高知県観光情報公式・三嶺 登頂時間目安 約4時間（光石登山口を県側代表登山口として照合）', sourceType:'official'},
  // V1.4.135: 残存推定CTの継続監査。公式/公的資料・山と高原地図・複数公開計画で起終点が一致する区間を昇格。
  '甘露水口・薬師岳登山口駐車場→和賀岳': {minutes:260, source:'YAMAP標準モデル・薬師岳登山口駐車場→甘露水→薬師岳→和賀岳（4時間20分）', sourceType:'yamap'},
  '赤倉沢登山口→会津朝日岳': {minutes:225, source:'山と高原地図Web系コース案内・赤倉沢登山口→三吉ミチギ→人見ノ松→叶ノ高手→熊ノ平→会津朝日岳（3時間45分）', sourceType:'yamakei'},
  '富士スバルライン五合目（吉田口）→富士山（剣ヶ峰）': {minutes:370, source:'富士登山オフィシャルサイト・吉田ルート 登り約6時間10分', sourceType:'official'},
  '須走口五合目→富士山（剣ヶ峰）': {minutes:420, source:'富士登山オフィシャルサイト・須走ルート 登り約7時間', sourceType:'official'},
  '寒風山登山口→伊予富士': {minutes:145, source:'YAMAP標準モデル・旧寒風山トンネル南口→桑瀬峠→伊予富士（2時間25分）', sourceType:'yamap'},
  '曽爾高原 倶留尊山登山口→倶留尊山': {minutes:105, source:'奈良観光情報・曽爾高原→倶留尊山 約1時間30分〜2時間（中間標準値1時間45分）', sourceType:'official'},
  // V1.4.132: 残存推定CTの大規模再監査。公的資料・標準モデルで起終点が一致する区間を優先して昇格。
// V1.4.133: 登山口監査。交通アクセス専用の下部駅・シャトル乗り場を trailhead 候補から削除。
// V1.4.134: 実徒歩起点の再登録に合わせて3区間を標準CTへ昇格。
  '白布峠登山口→西吾妻山': {minutes:251, source:'YAMAP・白布峠〜西吾妻山往復モデル（登山口→山頂 4時間11分）', sourceType:'yamap'},
  '八海山・屏風道二合目登山口→八海山（入道岳）': {minutes:365, source:'YAMAP・八海山 屏風道〜八ツ峰〜入道岳モデル（登山口→入道岳 6時間05分）', sourceType:'yamap'},
  '菅沼登山口→奥白根山（日光白根山）': {minutes:175, source:'YAMAP・菅沼〜弥陀ヶ池〜日光白根山往復モデル（登山口→山頂 2時間55分）', sourceType:'yamap'},
  '大滝キャンプ場・船形山登山口→船形山（御所山）': {minutes:147, source:'YAMAP・船形山 大滝キャンプ場往復モデル（登山口→山頂 2時間27分）', sourceType:'yamap'},
  '市ノ瀬→白山（御前峰）': {minutes:470, source:'石川県公式・白山 白山禅定道（市ノ瀬→室堂7時間10分＋室堂→御前峰40分）'},
  '河合谷高原 扇ノ山登山口→扇ノ山': {minutes:100, source:'環境省・中国自然歩道 扇ノ山 河合谷登山口→頂上 1時間40分'},
  '姫路公園登山口→扇ノ山': {minutes:80, source:'環境省・中国自然歩道 扇ノ山 姫路登山口→頂上 1時間20分'},
  '吾妻山キャンプ場駐車場→吾妻山': {minutes:54, source:'ヤマレコ・吾妻山公開山行計画（駐車場→登山口8分＋登山口→山頂46分）', sourceType:'yamareco'},
  '山のふるさと村登山口→三頭山': {minutes:190, source:'登山口ナビ・三頭山 サイグチ沢コース（登り3時間10分）'},
  '西桂口→三ッ峠山': {minutes:175, source:'登山口ナビ・三ツ峠山 達磨石・西桂口（登り2時間55分）'},
  '太尾登山口 釈迦ヶ岳 奈良→釈迦ヶ岳（奈良）': {minutes:147, source:'YAMAP・釈迦ヶ岳往復モデル（太尾登山口駐車場→山頂 2時間27分）', sourceType:'yamap'},
  '大股登山口 伯母子岳→伯母子岳': {minutes:216, source:'YAMAP・大股登山口→伯母子岳モデル（駐車場→山頂 3時間36分）', sourceType:'yamap'},
  '市房山キャンプ場（市房山登山口アクセス起点）→市房山': {minutes:240, source:'水上村・市房山登山ルートマップ（登山口→山頂 4時間）'},
  '仙酔峡駐車場・仙酔峡登山口→阿蘇山（高岳）': {minutes:155, source:'国立阿蘇青少年交流の家・中岳高岳登山（仙酔峡→高岳 標準区間合算155分）'},
  '篠山登山口 愛媛高知→篠山': {minutes:50, source:'宿毛市公式・篠山 第1/第2駐車場登山口→山頂 約40〜60分（標準中間値50分）'},
  '八方ヶ原・大間々台登山口→高原山・釈迦ヶ岳': {minutes:173, source:'YAMAP・釈迦ヶ岳（高原山）往復モデル（大間々台→山頂 2時間53分）', sourceType:'yamap'},
  // V1.4.131: 推定CTから確認済みCTへ追加昇格（YAMAP標準モデルコース・山と高原地図優先）
  '大橋林道口・黒姫山登山口→黒姫山': {minutes:213, source:'YAMAP・黒姫山（大橋登山口）モデルコース（大橋→山頂 3時間33分）', sourceType:'yamap'},
  '扇沢登山口→爺ヶ岳': {minutes:372, source:'YAMAP・柏原新道登山口〜爺ヶ岳モデルコース（登山口→中峰 6時間12分）', sourceType:'yamap'},
  '扇沢登山口→針ノ木岳': {minutes:398, source:'YAMAP・針ノ木岳往復モデルコース（針ノ木岳登山口→山頂 6時間38分）', sourceType:'yamap'},
  '高瀬ダム→烏帽子岳': {minutes:380, source:'山と高原地図掲載標準CT（高瀬ダム→烏帽子岳 上り6時間20分）', sourceType:'yamakei'},
  '羽衣・七面山表参道駐車場→七面山': {minutes:311, source:'YAMAP・七面山表参道モデルコース（羽衣→山頂 5時間11分）', sourceType:'yamap'},
  '清浄大橋 大峯山登山口→山上ヶ岳': {minutes:236, source:'ヤマレコ公開山行計画・清浄大橋→山上ヶ岳 標準区間合算3時間56分', sourceType:'yamareco'},
  'イン谷口→武奈ヶ岳': {minutes:205, source:'YAMAP・金糞峠〜コヤマノ岳〜武奈ヶ岳モデルコース（イン谷口駐車場→山頂 3時間25分）', sourceType:'yamap'},
  '火男火売神社登山口駐車場→鶴見岳': {minutes:140, source:'YAMAP・火男火売神社〜鶴見岳往復モデルコース（駐車場→山頂 2時間20分）', sourceType:'yamap'},
  '中山キャンプ場（中山登山口）→多良岳': {minutes:102, source:'YAMAP・多良岳往復モデルコース（中山キャンプ場登山口→上宮 1時間42分）', sourceType:'yamap'},
  '有馬温泉 六甲山登山口→六甲山': {minutes:110, source:'YAMAP・六甲越〜六甲山往復モデルコース（虫地獄登山口→山頂 1時間50分）', sourceType:'yamap'},
  // V1.4.130: 全国20区間を推定CTから確認済みCTへ一括昇格（公的資料・山と高原地図/YAMAP標準CT）
  '新道登山口→芦別岳': {minutes:240, source:'北海道上川総合振興局・芦別岳登山ガイド 新道コース（登山口→山頂 区間合算4時間）'},
  '山部自然公園太陽の里 芦別岳登山口→芦別岳': {minutes:240, source:'北海道上川総合振興局・芦別岳登山ガイド 新道コース（登山口→山頂 区間合算4時間）'},
  '泡滝ダム・大鳥登山口→以東岳': {minutes:394, source:'公開登山ガイド・泡滝ダム〜大鳥池〜以東岳 直登コース（上り6時間34分）'},
  '泉ヶ岳大駐車場→泉ヶ岳': {minutes:166, source:'YAMAP・泉ヶ岳 水神コース（自然ふれあい館側→山頂 2時間46分）', sourceType:'yamap'},
  '長者の森登山口→御座山': {minutes:224, source:'YAMAP・御座山 長者の森コース（駐車場→山頂 3時間44分）', sourceType:'yamap'},
  '新中の湯登山口→焼岳': {minutes:169, source:'YAMAP・焼岳 新中の湯ルート（登山口→北峰 2時間49分）', sourceType:'yamap'},
  '中の湯登山口（黒沢口）→御嶽山（剣ヶ峰）': {minutes:245, source:'登山口ナビ・御嶽山 黒沢口登山道（登り4時間05分）'},
  '麓・毛無山登山口→毛無山': {minutes:215, source:'富士宮市公式・毛無山コース（登山口→不動の滝40分＋尾根筋160分＋山頂15分）'},
  '千早本道登山口→金剛山': {minutes:110, source:'YAMAP・金剛山 千早本道コース（登山口→山頂 1時間50分）', sourceType:'yamap'},
  '清滝 愛宕山登山口→愛宕山': {minutes:175, source:'YAMAP・愛宕山 表参道モデルコース（登山道入口→山頂 2時間55分）', sourceType:'yamap'},
  'わかさ氷ノ山登山口→氷ノ山': {minutes:130, source:'鳥取県・氷ノ山登山マップ 氷ノ越コース（登り約2時間10分）'},
  '博労座→大山（弥山）': {minutes:195, source:'環境省・大山登山コース（博労座→夏山登山口15分＋行者谷分かれ80分＋六合目20分＋山頂80分）'},
  '西の原登山口→三瓶山（男三瓶山）': {minutes:120, source:'三瓶山登山ガイドマップ・西の原登山道（約100〜140分、標準値120分）'},
  '三方岩駐車場→三方岩岳': {minutes:50, source:'YAMAP・三方岩岳登山口コース（駐車場→展望台/山頂部 50分）', sourceType:'yamap'},
  '中登山道口 御在所岳→御在所岳': {minutes:131, source:'YAMAP・御在所岳 中道コース（中登山口→山頂 2時間11分）', sourceType:'yamap'},
  '武平峠登山口→御在所岳': {minutes:95, source:'YAMAP・御在所岳 武平峠コース（武平トンネル東登山口→山頂 1時間35分）', sourceType:'yamap'},
  '神原登山口→祖母山': {minutes:227, source:'YAMAP・祖母山 神原登山口〜国観峠〜山頂（3時間47分）', sourceType:'yamap'},
  '大浪池登山口→霧島山（韓国岳）': {minutes:231, source:'YAMAP・韓国岳 大浪池コース（登山口→韓国岳 3時間51分）', sourceType:'yamap'},
  '池ノ茶屋登山口→櫛形山': {minutes:70, source:'YAMAP・櫛形山 池の茶屋林道登山口コース（駐車場→山頂 1時間10分）', sourceType:'yamap'},
  '笠岳峠・笠ヶ岳登山口→笠ヶ岳（長野）': {minutes:30, source:'山と高原地図/YAMAP案内・笠ヶ岳 峠の茶屋から往復約1時間（登り約30分）', sourceType:'yamakei'},
  // V1.4.130: 長距離・高難度ルートを優先して推定CTから確認済みCTへ昇格
  '折立登山口→水晶岳（黒岳）': {minutes:750, source:'公開登山ガイド・折立〜水晶岳 標準CT区間合算（12時間30分）'},
  '折立登山口→鷲羽岳': {minutes:880, source:'公開登山ガイド・折立〜雲ノ平〜祖父岳〜鷲羽岳 標準CT区間合算（14時間40分）'},
  '新穂高温泉→笠ヶ岳（岐阜）': {minutes:510, source:'公開登山ガイド・笠ヶ岳 新穂高温泉コース（上り8時間30分）'},
  '御神坂登山口→岩手山': {minutes:280, source:'環境省・十和田八幡平国立公園 御神坂コース（片道4時間40分）'},
  '奥二股登山口駐車場→大千軒岳': {minutes:240, source:'福島町公式・大千軒岳 奥二股登山口コース（約4時間）'},
  '黒湯温泉→乳頭山（烏帽子岳）': {minutes:120, source:'休暇村乳頭温泉郷公式・黒湯温泉口（目安120分）'},
  '旭又登山口→太平山': {minutes:180, source:'秋田市公式・太平山ウォーキングマップ（山頂まで約3時間）'},
  // V1.4.128: 推定CTから確認済みCTへ昇格（公式/公的資料・ヤマケイ優先）
  '美瑛富士登山口→オプタテシケ山': {minutes:480, source:'大雪山国立公園連絡協議会・オプタテシケ山（美瑛富士登山口から登り8時間）'},
  '幌加温泉コース登山口→ニペソツ山': {minutes:450, source:'公開登山ガイド・ニペソツ山 幌加温泉コース（標準CT区間合算 7時間30分）'},
  'キロロリゾート・赤井川コース入口→余市岳': {minutes:240, source:'山と高原地図Web・キロロリゾートから余市岳へ（往路4時間）', sourceType:'yamakei'},
  '日暮沢登山口駐車場（日暮沢小屋）→大朝日岳': {minutes:480, source:'やまがた山・大朝日岳 日暮沢コース（片道8時間）'},
  '伊吹山ドライブウェイ山頂駐車場→伊吹山': {minutes:20, source:'伊吹山ドライブウェイ公式・中央登山道（山頂まで約20分）'},
  '大台ヶ原ビジターセンター→日出ヶ岳': {minutes:40, source:'山と高原地図Web・大台ヶ原 東大台コース（約40分）', sourceType:'yamakei'},
  // V1.4.127: ヤマレコ計画値のペース差を再点検。複数計画で区間値が一致するものを優先して確認済みへ昇格。
  'ブナ帯登山口→森吉山': {minutes:167, source:'ヤマレコ・森吉山 ブナ帯登山口ルート p5472014/p5467226（84+31+14+19+19分で一致）', sourceType:'yamareco'},
  '森吉山→ブナ帯登山口': {minutes:107, source:'ヤマレコ・森吉山 ブナ帯登山口ルート p5472014/p5467226（12+13+13+19+50分で一致）', sourceType:'yamareco'},
  '湯ノ台口登山口→鳥海山（新山）': {minutes:274, source:'ヤマレコ・鳥海山 湯ノ台ルート p5546770/p5688668（23+61+39+39+58+27+27分で一致）', sourceType:'yamareco'},
  '鳥海山（新山）→湯ノ台口登山口': {minutes:171, source:'ヤマレコ・鳥海山 湯ノ台ルート p5546770/p5688668（23+21+31+22+23+36+15分）', sourceType:'yamareco'},
  '大日杉登山口→飯豊山': {minutes:608, source:'ヤマレコ・飯豊連峰縦走 p5526848（大日杉登山小屋→切合小屋445分 + 切合小屋→飯豊山163分）', sourceType:'yamareco'},
  // V1.4.126: 推定CTから確認済みCTへ一括昇格（ヤマレコ公開計画の標準CTを優先）
  '天城高原ハイカー専用駐車場→天城山（万三郎岳）': {minutes:151, source:'ヤマレコ・天城山 天城縦走登山口〜万三郎岳 p5462857/p5454811/p5540390（区間CT一致）', sourceType:'yamareco'},
  '天城山（万三郎岳）→天城高原ハイカー専用駐車場': {minutes:114, source:'ヤマレコ・天城山 万三郎岳〜天城縦走登山口 p5454811/p5540390（区間CT一致）', sourceType:'yamareco'},
  '美濃戸口→赤岳': {minutes:350, source:'ヤマレコ・赤岳 美濃戸口〜赤岳 p5370686/p5481220（標準CT 約350分）', sourceType:'yamareco'},
  '赤岳→美濃戸口': {minutes:216, source:'ヤマレコ・赤岳 赤岳〜美濃戸口 p5370686/p5481220（標準CT 215〜216分）', sourceType:'yamareco'},
  '伊吹山 上野登山口（三之宮神社）→伊吹山': {minutes:189, source:'ヤマレコ・伊吹山 上野登山口〜山頂 p5372216（区間CT合算）', sourceType:'yamareco'},
  '伊吹山→伊吹山 上野登山口（三之宮神社）': {minutes:111, source:'ヤマレコ・伊吹山 山頂〜上野登山口 p5372216（区間CT合算）', sourceType:'yamareco'},
  '三城いこいの広場→美ヶ原（王ヶ頭）': {minutes:169, source:'ヤマレコ・美ヶ原 三城〜王ヶ頭 p5370073/p5547620（区間CT一致）', sourceType:'yamareco'},
  '平標登山口・元橋駐車場→仙ノ倉山': {minutes:239, source:'ヤマレコ・仙ノ倉山 元橋駐車場〜仙ノ倉山 p5538950/p5557829（区間CT合算）', sourceType:'yamareco'},
  // V1.4.253: 管理画面で指定された残存推定CT 16区間を確定。
  // 値はV1.4.252時点で画面表示していた推定CTをそのまま採用し、
  // 外部資料確認済みとは区別して「ユーザー確定」として固定する。
  '笠新道登山口→笠ヶ岳': {minutes:440, source:'飛騨高山旅ガイド・笠新道登山口→笠ヶ岳山荘7時間＋山荘→笠ヶ岳20分', sourceType:'official'},
  '笠ヶ岳→笠新道登山口': {minutes:190, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  '大天井岳→中房登山口（燕岳・大天井岳 表銀座ルート）': {minutes:260, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  '霞沢岳→上高地': {minutes:365, source:'YAMA HACK・霞沢岳 上高地ピストン（山頂→K1→JP→徳本峠→明神→上高地 区間合算 6時間05分）', sourceType:'other'},
  '中宮温泉ビジターセンター（笈ヶ岳ルート起点）→笈ヶ岳': {minutes:310, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  '笈ヶ岳→中宮温泉ビジターセンター（笈ヶ岳ルート起点）': {minutes:250, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  '倶留尊山→曽爾高原 倶留尊山登山口': {minutes:80, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  '三峰山→みつえ青少年旅行村 三峰山登山口': {minutes:140, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  'たかすみ温泉 高見山登山口→高見山': {minutes:190, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  '高見山→たかすみ温泉 高見山登山口': {minutes:150, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  '護摩壇山森林公園ワイルドライフ→護摩壇山': {minutes:110, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  '護摩壇山→護摩壇山森林公園ワイルドライフ': {minutes:100, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  '蓬来山→蓬莱駅 登山口': {minutes:210, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  '比叡山（大比叡）→坂本ケーブル延暦寺駅': {minutes:40, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  '六甲山→芦屋川 高座の滝': {minutes:220, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  '三嶺→光石登山口': {minutes:220, source:'ユーザー確定・V1.4.252表示推定CTを採用（V1.4.253）', sourceType:'manual'},
  // V1.4.152: 推定CTから確認済みCTへ昇格（端点一致の標準/公開計画を優先）。
  '高峰高原・車坂峠→浅間山': {minutes:230, source:'浅間山登山コースデータ・車坂峠コース（表コース経由） 上り3時間50分＝230分'},
  '桂湖森林公園駐車場（大笠山ルート起点）→大笠山': {minutes:351, source:'YAMAP大笠山モデルコース（桂湖登り口→山頂341分）＋ヤマレコ公開計画（桂湖駐車場→大笠山登山口10分）＝351分', sourceType:'yamap'},
  '白山中居神社（野伏ヶ岳残雪期ルート起点）→野伏ヶ岳': {minutes:180, source:'ヤマレコ公開山行計画 p5226046・白山中居神社→野伏ヶ岳 180分', sourceType:'yamareco'},
  '瀬場登山口 東赤石山→東赤石山': {minutes:330, source:'好日山荘・東赤石山（瀬場登山口→赤石山荘265分→八巻山30分→東赤石山35分＝330分）'},
  // V1.4.151: 推定CTから確認済みCTへ昇格（公開標準/詳細ルート情報で端点一致を確認）。
  '奥胎内ヒュッテ（足ノ松尾根ルート起点）→杁差岳': {minutes:470, source:'YAMA HACK・杁差岳 足ノ松尾根コース（奥胎内ヒュッテ→山頂 標準7時間50分、ヤマプラ参照）'},
  '滝ノ上温泉・乳頭山登山口→乳頭山（烏帽子岳）': {minutes:153, source:'公開登山ガイド・滝ノ上登山口→白沼60分→湿原31分→乳頭山62分＝2時間33分'},
  '白倉・大嶽神社里宮登山口→大岳山': {minutes:180, source:'公開登山ガイド・白倉 大嶽神社里宮→大岳山（白倉分岐経由）コースタイム3時間'},
  '尾鈴山第1駐車場（尾鈴山登山口アクセス起点）→尾鈴山': {minutes:200, source:'都農町観光ルート参照公開ガイド・第1駐車場→登山口60分＋三合目25分＋六合目35分＋九合目60分＋山頂20分＝200分'},
  // V1.4.150: 推定CTから確認済みCTへ昇格（起終点一致の標準/公式ルートを優先）。
  'しらびそ峠・奥茶臼山登山口→奥茶臼山': {minutes:305, source:'YAMAP・奥茶臼山（しらびそ峠）モデルコース（しらびそ峠駐車場 06:00→奥茶臼山 11:05、5時間05分）', sourceType:'yamap'},
  '男池駐車場・男池登山口→大船山': {minutes:243, source:'YAMA HACK・男池〜大船山コース（男池69分＋ソババッケ82分＋大戸越92分＝4時間03分）'},
  '椎原峠登山口→脊振山': {minutes:170, source:'公開登山ガイド・椎原峠登山口〜脊振山（区間CT合算 2時間50分）'},
  '妙義神社入口・登山者駐車場→妙義山（相馬岳）': {minutes:225, source:'登山口ナビ・表妙義 白雲山（妙義山市営駐車場→相馬岳）標準登り3時間45分'},
  '妙義山（相馬岳）→妙義神社入口・登山者駐車場': {minutes:100, source:'日本アルプスガイド・タルワキ沢コース（相馬岳→妙義神社南入口 1時間40分）', sourceType:'other'},
  '青崩峠入口・熊伏山登山口→熊伏山': {minutes:120, source:'信州遠山郷公式・熊伏山（駐車場→青崩峠20分→青崩の頭40分→前熊伏山40分→山頂20分）'},
  '竜門岳登山口 吉野→竜門岳': {minutes:120, source:'公開登山ガイド・竜門岳 吉野側ルート（登山口→山頂 標準約2時間、YAMAP往復モデル3時間40分とも整合）'},
  // V1.4.149: 推定CTから確認済みCTへ昇格（端点一致の公開標準CT）。
  '会津高原たかつえスキー場・七ヶ岳登山口→七ヶ岳': {minutes:197, source:'ヤマレコ・七ヶ岳 たかつえスキー場ルート p5577482（区間CT合算）', sourceType:'yamareco'},
  '八総鉱山跡・荒海山登山駐車場→荒海山（太郎岳）': {minutes:204, source:'ヤマレコ・荒海山 八総鉱山跡ルート p5532401/p5528452（区間CT一致・合算）', sourceType:'yamareco'},
  '清水倉登山口→青海黒姫山': {minutes:253, source:'ヤマレコ・青海黒姫山 清水倉登山口ルート p5546299（区間CT合算）', sourceType:'yamareco'},
  '坂本ケーブル延暦寺駅→比叡山（大比叡）': {minutes:46, source:'ヤマレコ・比叡山 ケーブル延暦寺駅→大比叡 p5636273/p5367113（区間CT一致）', sourceType:'yamareco'},
  '医王の里登山者用駐車場→医王山（奥医王山）': {minutes:175, source:'ヤマレコ・奥医王山 医王の里ルート p5276231（区間CT合算）', sourceType:'yamareco'},
  '山犬段・高塚山登山口→高塚山': {minutes:179, source:'ヤマレコ・高塚山 山犬段休憩舎ルート p5369365（54+39+46+40=179分）。固定登山口は同地点・標高1404mの山犬段', sourceType:'yamareco'},
  // V1.4.125: 推定CTから確認済みCTへ一括昇格（ヤマレコ公開計画の区間値を複数計画で照合）
  '吹上温泉登山口→十勝岳': {minutes:267, source:'ヤマレコ・十勝岳 吹上温泉ルート p5503284（区間CT合算）', sourceType:'yamareco'},
  '十勝岳→吹上温泉登山口': {minutes:165, source:'ヤマレコ・十勝岳 吹上温泉ルート p5503284（区間CT合算）', sourceType:'yamareco'},
  '姥沢 月山リフト→月山': {minutes:208, source:'ヤマレコ・月山 姥沢ルート p5524588/p5239593（区間CT一致）', sourceType:'yamareco'},
  '月山→姥沢 月山リフト': {minutes:126, source:'ヤマレコ・月山 姥沢ルート p5524588（区間CT合算）', sourceType:'yamareco'},
  '峠の茶屋・那須岳登山口→三本槍岳': {minutes:172, source:'ヤマレコ・三本槍岳 峠の茶屋ルート p5532010/p5524672（区間CT一致）', sourceType:'yamareco'},
  '三本槍岳→峠の茶屋・那須岳登山口': {minutes:131, source:'ヤマレコ・三本槍岳 峠の茶屋ルート p5532010/p5524672（区間CT一致）', sourceType:'yamareco'},
  '野反湖・白砂山登山口→白砂山': {minutes:249, source:'ヤマレコ・白砂山 野反湖ルート p5542380/p5468873（区間CT一致）', sourceType:'yamareco'},
  '白砂山→野反湖・白砂山登山口': {minutes:185, source:'ヤマレコ・白砂山 野反湖ルート p5542380/p5468873（区間CT一致）', sourceType:'yamareco'},
  '栗生登山口→御座山': {minutes:169, source:'ヤマレコ・御座山 栗生ルート p5464090/p5549270（区間CT一致）', sourceType:'yamareco'},
  '御座山→栗生登山口': {minutes:98, source:'ヤマレコ・御座山 栗生ルート p5464090/p5549270（区間CT一致）', sourceType:'yamareco'},
  '室堂→奥大日岳': {minutes:170, source:'ヤマレコ・奥大日岳 室堂ルート p5846483（区間CT合算）', sourceType:'yamareco'},
  '奥大日岳→室堂': {minutes:152, source:'ヤマレコ・奥大日岳 室堂ルート p5846483（区間CT合算）', sourceType:'yamareco'},
  '渋峠→横手山': {minutes:19, source:'ヤマレコ・横手山 渋峠ルート p5545812/p5522422（区間CT一致）', sourceType:'yamareco'},
  '横手山→渋峠': {minutes:12, source:'ヤマレコ・横手山 渋峠ルート p5545812/p5522422（区間CT一致）', sourceType:'yamareco'},
  '日輪寺・八溝山登山口→八溝山': {minutes:50, source:'ヤマレコ・八溝山 日輪寺ルート p5505702（区間CT）', sourceType:'yamareco'},
  '八溝山→日輪寺・八溝山登山口': {minutes:31, source:'ヤマレコ・八溝山 日輪寺ルート p5233980（下山区間CT）', sourceType:'yamareco'},
  '聖平登山口→岩菅山': {minutes:194, source:'ヤマレコ・岩菅山 聖平登山口ルート p5368403（区間CT合算）', sourceType:'yamareco'},
  '岩菅山→聖平登山口': {minutes:122, source:'ヤマレコ・岩菅山 聖平登山口ルート p5368403（区間CT合算）', sourceType:'yamareco'},
  '折場登山口→袈裟丸山': {minutes:222, source:'ヤマレコ・前袈裟丸山 折場登山口ルート p5458221/p5457895（区間CT一致）', sourceType:'yamareco'},
  '袈裟丸山→折場登山口': {minutes:156, source:'ヤマレコ・前袈裟丸山 折場登山口ルート p5458221/p5457895（区間CT一致）', sourceType:'yamareco'},
  // V1.4.123: 推定CTから確認済みCTへ置換。ヤマレコの公開山行計画（らくルート標準CT）を優先。
  '羅臼温泉登山口→羅臼岳': {minutes:403, source:'ヤマレコ・羅臼岳 山行計画 p5230560（標準CT）', sourceType:'yamareco'},
  '京極登山口→後方羊蹄山（羊蹄山）': {minutes:320, source:'ヤマレコ・羊蹄山 京極コース 山行計画 p5541585（標準CT）', sourceType:'yamareco'},
  '畳平バスターミナル→乗鞍岳': {minutes:100, source:'ヤマレコ・畳平〜乗鞍岳（剣ヶ峰）山行計画 p5533460（標準CT）', sourceType:'yamareco'},
  'かいもん山麓ふれあい公園→開聞岳': {minutes:195, source:'ヤマレコ・開聞岳 山行計画 p5592303（標準CT）', sourceType:'yamareco'},
  '開聞岳→かいもん山麓ふれあい公園': {minutes:113, source:'ヤマレコ・開聞岳 山行計画 p5592303（標準CT）', sourceType:'yamareco'},
  '八甲田ロープウェー山頂公園駅→八甲田山（大岳）': {minutes:148, source:'ヤマレコ・八甲田山 山頂公園駅〜大岳 山行計画 p5522141（区間CT合算）', sourceType:'yamareco'},
  '須川高原温泉→栗駒山': {minutes:147, source:'ヤマレコ・栗駒山 須川温泉ルート 山行計画 p5542501（標準CT）', sourceType:'yamareco'},
  '栗駒山→須川高原温泉': {minutes:98, source:'ヤマレコ・栗駒山 須川温泉ルート 山行計画 p5542501（標準CT）', sourceType:'yamareco'},
  '猪苗代登山口（猪苗代スキー場）→磐梯山': {minutes:283, source:'ヤマレコ・磐梯山 猪苗代登山口ルート 山行計画 p5500273（標準CT）', sourceType:'yamareco'},
  '御池登山口→燧ヶ岳（柴安嵓）': {minutes:231, source:'ヤマレコ・燧ヶ岳 御池ルート 山行計画 p5563896（標準CT）', sourceType:'yamareco'},
  '燧ヶ岳（柴安嵓）→御池登山口': {minutes:145, source:'ヤマレコ・燧ヶ岳 御池ルート 山行計画 p5561223（標準CT）', sourceType:'yamareco'},
  // V1.4.122: 全国CT一括補完。ヤマケイ掲載の代表ルート総CTを優先採用。
  '沓形登山口→利尻山': {minutes:360, source:'山と溪谷オンライン・利尻山 沓形コース（登山口→山頂 約6時間）', sourceType:'yamakei'},
  '清岳荘登山口→斜里岳': {minutes:180, source:'山と溪谷オンライン・斜里岳 清里コース（清岳荘→山頂 約3時間）', sourceType:'yamakei'},
  // V1.4.119: 剱岳・別山尾根 / 早月尾根の主要CT補完
  // 公開モデルコース・山小屋公式案内を参照。代表コースだけでなく逆向き手動入力にも対応。
  '室堂→剱澤小屋': {minutes:202, source:'公開登山ガイド・室堂〜剱澤小屋 標準CT（約3時間22分）'},
  '剱澤小屋→剣山荘': {minutes:17, source:'ヤマレコ・剱岳 室堂/別山尾根 山行計画（標準CT複数照合）', sourceType:'yamareco'},
  '剣山荘→剱岳': {minutes:195, source:'ヤマレコ・剱岳 室堂/別山尾根 山行計画（標準CT区間合算）', sourceType:'yamareco'},
  '剱岳→剣山荘': {minutes:166, source:'ヤマレコ・剱岳 室堂/別山尾根 山行計画（標準CT区間合算）', sourceType:'yamareco'},
  '剣山荘→剱澤小屋': {minutes:20, source:'公開登山ガイド・剱岳 別山尾根標準CT'},
  '室堂→剣山荘': {minutes:230, source:'THE JAPAN ALPS・剱岳 別山尾根ルート'},
  '馬場島→早月小屋': {minutes:360, source:'早月小屋公式・アクセス', sourceType:'official'},
  '早月小屋→剱岳': {minutes:210, source:'THE JAPAN ALPS・剱岳 早月尾根ルート'},
  '剱岳→早月小屋': {minutes:150, source:'THE JAPAN ALPS・剱岳 早月尾根ルート'},
  '早月小屋→馬場島': {minutes:230, source:'THE JAPAN ALPS・剱岳 早月尾根ルート'},

  // 中央アルプス：木曽駒〜宝剣〜空木縦走（ヤマレコ標準山行計画の区間CT）
  '千畳敷→宝剣岳': {minutes:77, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '木曽駒ヶ岳→宝剣岳': {minutes:55, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '宝剣岳→木曽駒ヶ岳': {minutes:54, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '宝剣岳→檜尾岳': {minutes:156, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '檜尾岳→宝剣岳': {minutes:195, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '檜尾岳→檜尾小屋': {minutes:10, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '檜尾小屋→檜尾岳': {minutes:14, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '檜尾岳→熊沢岳': {minutes:107, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '熊沢岳→檜尾岳': {minutes:118, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '熊沢岳→東川岳': {minutes:89, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '東川岳→熊沢岳': {minutes:120, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '東川岳→木曽殿山荘': {minutes:21, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '木曽殿山荘→東川岳': {minutes:41, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '木曽殿山荘→空木岳': {minutes:91, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '空木岳→木曽殿山荘': {minutes:59, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '空木岳→空木駒峰ヒュッテ': {minutes:8, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '空木駒峰ヒュッテ→空木平避難小屋': {minutes:35, source:'ヤマレコ・山行計画（標準CT補完）', sourceType:'yamareco'},
  '空木平避難小屋→空木駒峰ヒュッテ': {minutes:44, source:'ヤマレコ公開山行計画 p5662783・空木平避難小屋→空木駒峰ヒュッテ44分（2026-08-31確認）', sourceType:'yamareco'},
  '空木平避難小屋→池山口登山口': {minutes:224, source:'ヤマレコ・空木岳 池山尾根 山行計画（空木平避難小屋→林道終点の標準CT合算）', sourceType:'yamareco'},

  // 鳳凰三山：公式ページで直接分割されていなかった観音岳〜地蔵岳
  '観音岳(鳳凰)→地蔵岳(鳳凰)': {minutes:66, source:'ヤマレコ・鳳凰三山 山行計画（標準CT補完）', sourceType:'yamareco'},
  '地蔵岳(鳳凰)→観音岳(鳳凰)': {minutes:79, source:'ヤマレコ・鳳凰三山 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 塩見岳：鳥倉〜三伏峠〜塩見小屋を標準計画の分割値で補完
  '鳥倉登山口→三伏峠小屋': {minutes:205, source:'ヤマレコ・塩見岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '三伏峠小屋→鳥倉登山口': {minutes:129, source:'ヤマレコ・塩見岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '三伏峠小屋→塩見小屋': {minutes:161, source:'ヤマレコ・塩見岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '塩見小屋→三伏峠小屋': {minutes:142, source:'ヤマレコ・塩見岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '塩見小屋→塩見岳': {minutes:79, source:'ヤマレコ・塩見岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '塩見岳→塩見小屋': {minutes:48, source:'ヤマレコ・塩見岳 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 荒川三山〜赤石岳：既存の小屋間公式値を山頂ポイントまで細分化
  '千枚小屋→荒川岳': {minutes:139, source:'ヤマレコ・荒川三山/赤石岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '荒川岳→荒川小屋': {minutes:135, source:'ヤマレコ・荒川三山/赤石岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '荒川小屋→荒川岳': {minutes:178, source:'ヤマレコ・荒川三山/赤石岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '荒川小屋→赤石岳': {minutes:150, source:'ヤマレコ・荒川三山/赤石岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '赤石岳→荒川小屋': {minutes:102, source:'ヤマレコ・荒川三山/赤石岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '赤石岳→赤石小屋': {minutes:135, source:'ヤマレコ・荒川三山/赤石岳 山行計画（標準CT補完）', sourceType:'yamareco'},

  // 南アルプス南部：聖〜上河内〜茶臼〜光
  '聖平小屋→聖岳': {minutes:179, source:'ヤマレコ・聖岳/光岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '聖岳→聖平小屋': {minutes:104, source:'ヤマレコ・聖岳/光岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '聖平小屋→上河内岳': {minutes:154, source:'ヤマレコ・聖岳/光岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '上河内岳→聖平小屋': {minutes:81, source:'ヤマレコ・聖岳/光岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '上河内岳→茶臼小屋': {minutes:77, source:'ヤマレコ・聖岳/光岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '茶臼小屋→光岳': {minutes:283, source:'ヤマレコ・聖岳/光岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '光岳→茶臼小屋': {minutes:268, source:'ヤマレコ・聖岳/光岳 山行計画（標準CT補完）', sourceType:'yamareco'},
  '光岳→光岳小屋': {minutes:12, source:'ヤマレコ・光岳 山行計画（標準CT補完）', sourceType:'yamareco'},


  // V1.4.186: 代表コースで残っていた逆方向CT 13区間を方向別の公開標準CTで補完。
  // 逆方向値の単純コピーはせず、各ルートの公開モデルコース/山行計画の方向別標準CTを採用。
  '白馬山荘→白馬尻小屋': {minutes:157, source:'ヤマレコ・白馬岳 山行計画（白馬山荘→白馬尻小屋 標準CT区間合算）', sourceType:'yamareco'},
  '白馬尻小屋→猿倉': {minutes:57, source:'ヤマレコ・白馬岳 山行計画（白馬尻小屋→猿倉 標準CT区間合算）', sourceType:'yamareco'},
  '五竜山荘→唐松岳頂上山荘': {minutes:140, source:'ヤマレコ・五竜岳 山行計画（五竜山荘→唐松岳頂上山荘 標準CT区間合算）', sourceType:'yamareco'},
  '剱澤小屋→室堂': {minutes:190, source:'ヤマレコ・剱岳 室堂/別山尾根 山行計画（剱澤小屋→室堂 標準CT区間合算）', sourceType:'yamareco'},
  '双六小屋→鏡平山荘': {minutes:96, source:'ヤマレコ・新穂高〜双六 山行計画（標準CT区間合算）', sourceType:'yamareco'},
  '鏡平山荘→新穂高温泉': {minutes:214, source:'ヤマレコ・新穂高〜双六 山行計画（標準CT区間合算）', sourceType:'yamareco'},
  '燕岳→燕山荘': {minutes:25, source:'ヤマレコ・燕岳 山行計画（標準CT）', sourceType:'yamareco'},
  '燕山荘→合戦小屋': {minutes:46, source:'ヤマレコ・燕岳 山行計画（標準CT）', sourceType:'yamareco'},
  '合戦小屋→中房': {minutes:120, source:'ヤマレコ・燕岳 山行計画（合戦小屋→中房温泉登山口 標準CT区間合算）', sourceType:'yamareco'},
  '常念小屋→一ノ沢': {minutes:149, source:'ヤマレコ・常念岳 一ノ沢ルート山行計画（標準CT区間合算）', sourceType:'yamareco'},
  '荒川岳→千枚小屋': {minutes:87, source:'ヤマレコ・荒川三山 山行計画（悪沢岳→千枚小屋 標準CT区間合算）', sourceType:'yamareco'},
  '久住山→久住分かれ避難小屋': {minutes:47, source:'YAMAP・牧ノ戸峠〜久住山モデルコース（下山方向区間合算）', sourceType:'yamap'},
  '久住分かれ避難小屋→牧ノ戸峠': {minutes:82, source:'YAMAP・牧ノ戸峠〜久住山モデルコース（下山方向区間合算）', sourceType:'yamap'},

  // V1.4.153: CT最終精査。起点一致の標準CTを優先して推定値を置換。
  '楢原・樽原登山口→諏訪山（上野村）': {minutes:280, source:'上野村公式・諏訪山コース（楢原登山口→諏訪山 区間合算）'},
  '蓮華温泉→雪倉岳': {minutes:420, source:'山と溪谷オンライン・雪倉岳（蓮華温泉から約7時間）', sourceType:'yamakei'},
  '雪倉岳→蓮華温泉': {minutes:283, source:'YAMAP・朝日岳周回モデルコース（雪倉岳08:29→蓮華温泉ロッジ13:12＝4時間43分）', sourceType:'yamap'},
  '沼平ゲート→茶臼岳': {minutes:440, source:'YAMAP・茶臼岳/光岳モデルコース（ゲート→茶臼岳 標準CT区間合算）', sourceType:'yamap'},
  '沼平ゲート→上河内岳': {minutes:518, source:'YAMAP・上河内岳/茶臼岳モデルコース（ゲート→上河内岳 標準CT区間合算）', sourceType:'yamap'},
  '沼平ゲート→光岳': {minutes:685, source:'YAMAP・茶臼岳/光岳モデルコース（ゲート→光岳 標準CT区間合算）', sourceType:'yamap'},
  '池口林道口・池口岳登山口→池口岳': {minutes:385, source:'YAMA HACK・池口岳登山口〜池口岳（登り区間合算）'},
  '老平・笊ヶ岳登山口→笊ヶ岳': {minutes:535, source:'YAMAP・笊ヶ岳（老平）モデルコース（老平登山口→笊ヶ岳）', sourceType:'yamap'}
});

function normalizeCourseTimePointName(name){
  // V1.4.123: 入力側だけ空白/NFKC正規化していたため、別名辞書に空白や全角括弧を含むキーが
  // 実質マッチしない問題を修正。辞書キー側も同じ規則で比較し、登録済み確認CTを確実に拾う。
  const compact=v=>String(v||'').normalize('NFKC').replace(/\s+/g,'').trim();
  const raw=compact(name);
  const aliases={
    '三股登山口':'三股',
    '横尾山荘':'横尾',
    '常念岳':'常念山頂',
    '中房温泉登山口':'中房',
    '中房登山口':'中房',
    '中房登山口(燕岳・大天井岳表銀座ルート)':'中房',
    '中房登山口（燕岳・大天井岳表銀座ルート）':'中房',
    '白馬尻小屋跡':'白馬尻小屋',
    '扇沢登山口':'扇沢',
    '馬場島（早月尾根登山口）':'馬場島',
    '馬場島(早月尾根登山口)':'馬場島',
    '一ノ沢登山口':'一ノ沢',
    '一の沢登山口':'一ノ沢',
    '朝日岳（新潟・富山）':'朝日岳',
    '椹島ロッヂ':'椹島',
    'ホテル千畳敷':'千畳敷',
    '千畳敷駅':'千畳敷',
    '南アルプス市長衛小屋':'長衛小屋',
    '薬師岳（鳳凰）':'薬師岳(鳳凰)',
    '観音岳（鳳凰）':'観音岳(鳳凰)',
    '赤岳（八ヶ岳最高峰）':'赤岳',
    '赤岳(八ヶ岳最高峰)':'赤岳',
    '天狗岳（東天狗岳）':'天狗岳',
    '天狗岳(東天狗岳)':'天狗岳',
    '立山(雄山)':'立山（雄山）',
    '横岳(八ヶ岳)':'横岳（八ヶ岳）',
    '硫黄岳(八ヶ岳)':'硫黄岳（八ヶ岳）',
    '女乃神茶屋（蓼科山登山口）':'女神茶屋',
    '女乃神茶屋(蓼科山登山口)':'女神茶屋',
    '女乃神茶屋・蓼科山登山口':'女神茶屋',
    '入笠山登山口（沢入）':'沢入登山口',
    '山本小屋ふる里館・町営駐車場':'山本小屋ふる里館',
    '美ヶ原（王ヶ頭）':'美ヶ原'
    ,'えびの高原・韓国岳登山口':'韓国岳登山口'
    ,'えびの高原 韓国岳登山口':'韓国岳登山口'
    ,'高千穂河原駐車場・高千穂峰登山口':'高千穂河原'
    ,'見ノ越 剣山登山口':'見の越'
    ,'見ノ越':'見の越'
    ,'剣山観光登山リフト西島駅':'西島駅'
    ,'剣山観光登山リフト 西島駅':'西島駅'
    ,'名頃登山口 三嶺':'名頃登山口'
    ,'坊村 武奈ヶ岳登山口':'坊村'
    ,'夏山登山口 大山':'夏山登山口'
    ,'夏山登山道・南光河原':'夏山登山口'
    ,'福定親水公園 氷ノ山登山口':'福定親水公園'
    ,'福定親水公園登山口':'福定親水公園'
    ,'上蒜山登山口駐車場（上蒜山スキー場）':'上蒜山登山口駐車場'
    ,'上蒜山登山口':'上蒜山登山口駐車場'
    ,'月見ヶ丘登山口駐車場':'月見ヶ丘'
    ,'月見ヶ丘駐車場 道後山':'月見ヶ丘'
    ,'東の原登山口（さんべ観光リフト）':'東の原登山口'
    ,'東の原 三瓶山':'東の原登山口'
    ,'由布岳正面登山口駐車場':'由布岳正面登山口'
    ,'北谷登山口 祖母山':'北谷登山口'
    ,'北谷登山口駐車場・北谷登山口':'北谷登山口'
    ,'仁田峠第一展望所駐車場・普賢岳登山口':'仁田峠'
    // V1.4.123: 登録済み確認CTの端点と固定候補名を接続
    ,'つつじヶ丘':'つつじヶ丘登山口'
    ,'馬返し登山口':'馬返し登山口岩手山'
    ,'一本杉登山口':'一本杉登山口 姫神山'
    ,'赤坂峠登山口':'赤坂峠 五葉山登山口'
    ,'谷川岳（オキノ耳）':'谷川岳オキノ耳'
    ,'谷川岳(オキノ耳)':'谷川岳オキノ耳'
    ,'トマノ耳':'谷川岳（トマノ耳）'
    ,'谷川岳トマノ耳':'谷川岳（トマノ耳）'
    ,'宮ノ浦岳':'宮之浦岳'
    ,'二分登山口':'二口登山口'
    // V1.4.123 bulk: 固定候補の説明付き名称を既存の確認済みCT端点へ接続
    ,'大貝戸登山口 藤原岳':'大貝戸登山口'
    ,'みつえ青少年旅行村 三峰山登山口':'みつえ青少年旅行村（三峰山登山口）'
    ,'月見ヶ丘登山口駐車場 道後山':'月見ヶ丘'
    ,'かいもん山麓ふれあい公園駐車場・開聞岳登山口アクセス':'かいもん山麓ふれあい公園'
  };
  // aliases のキーは過去版から可読性重視の表記を維持しているため、比較時に同じcompact規則を適用する。
  for(const [alias,target] of Object.entries(aliases)){
    if(compact(alias)===raw)return target;
  }
  return raw;
}




// V1.5.14: abolish proportional/apportioned CT. Every fixed intermediate waypoint
// used by representative routes must have an explicit published segment CT.

// V1.5.22: 表銀座・大天井岳〜槍ヶ岳を実際の東鎌尾根通過ポイントへ細分化。
// 18時間10分になっていた composed CT の遠回り結合を避け、公開標準CTを各区間に固定する。
const V1522_OMOTE_GINZA_VERIFIED_COURSE_TIMES = Object.freeze({
  '大天井岳→大天荘': {minutes:6, source:'YAMA HACK・表銀座縦走コース（大天井岳→大天荘 6分）', sourceType:'other'},
  '大天荘→大天井岳': {minutes:10, source:'大天荘公式・大天井岳山頂まで10分', sourceType:'official'},
  '大天荘→大天井ヒュッテ': {minutes:34, source:'YAMA HACK・表銀座縦走コース（大天荘→大天井ヒュッテ 34分）', sourceType:'other'},
  '大天井ヒュッテ→大天荘': {minutes:40, source:'公開標準CT・大天井ヒュッテ→大天荘 40分', sourceType:'other'},
  '大天井ヒュッテ→ヒュッテ西岳': {minutes:122, source:'YAMA HACK・表銀座縦走コース（貧乏沢のコル経由 24+98分）', sourceType:'other'},
  'ヒュッテ西岳→大天井ヒュッテ': {minutes:150, source:'公開標準CT・表銀座（ヒュッテ西岳→大天井ヒュッテ 2時間30分）', sourceType:'other'},
  'ヒュッテ西岳→西岳': {minutes:16, source:'YAMA HACK・表銀座縦走コース（ヒュッテ西岳→西岳 16分）', sourceType:'other'},
  '西岳→ヒュッテ西岳': {minutes:8, source:'YAMA HACK・表銀座縦走コース（西岳→ヒュッテ西岳 8分）', sourceType:'other'},
  'ヒュッテ西岳→水俣乗越': {minutes:70, source:'YAMA HACK・表銀座縦走コース（ヒュッテ西岳→水俣乗越 70分）', sourceType:'other'},
  '水俣乗越→ヒュッテ西岳': {minutes:60, source:'公開標準CT・表銀座（水俣乗越→ヒュッテ西岳 1時間）', sourceType:'other'},
  '水俣乗越→ヒュッテ大槍': {minutes:135, source:'YAMA HACK・表銀座縦走コース（水俣乗越→ヒュッテ大槍 135分）', sourceType:'other'},
  'ヒュッテ大槍→水俣乗越': {minutes:130, source:'公開標準CT・東鎌尾根（ヒュッテ大槍→水俣乗越 2時間10分）', sourceType:'other'},
  'ヒュッテ大槍→槍ヶ岳山荘': {minutes:51, source:'YAMA HACK・表銀座縦走コース（ヒュッテ大槍→槍ヶ岳山荘 51分）', sourceType:'other'},
  '槍ヶ岳山荘→ヒュッテ大槍': {minutes:55, source:'公開標準CT・東鎌尾根（槍ヶ岳山荘→ヒュッテ大槍 55分）', sourceType:'other'},
  '槍沢ロッヂ→横尾山荘': {minutes:80, source:'YAMA HACK・槍ヶ岳上高地ルート（槍沢ロッヂ→一ノ俣30分→横尾50分）', sourceType:'other'}
});

// V1.5.20: 王道ルート更新。裏銀座は双六から西鎌尾根で槍ヶ岳を経由して新穂高へ、
// 三股サーキットは前常念岳・蝶槍・蝶ヶ岳ヒュッテを明示通過ポイント化。
// 距離按分は使わず、公開標準CTを区間ごとに固定する。
const V1520_CLASSIC_ROUTE_VERIFIED_COURSE_TIMES = Object.freeze({
  // 裏銀座：双六小屋 ↔ 槍ヶ岳山荘（西鎌尾根）
  '双六小屋→槍ヶ岳山荘': {minutes:340, source:'双六小屋グループ公式・槍ヶ岳へのコースタイム（双六小屋→槍ヶ岳山荘 5時間40分）', sourceType:'official'},
  '槍ヶ岳山荘→双六小屋': {minutes:300, source:'双六小屋グループ公式・槍ヶ岳へのコースタイム（槍ヶ岳山荘→双六小屋 5時間）', sourceType:'official'},

  // 三股サーキット：前常念岳を含む三股ルート
  '三股登山口→前常念岳': {minutes:270, source:'YAMAPモデルコース・三股-常念岳-蝶ヶ岳周回（05:15→09:45）', sourceType:'yamap'},
  '前常念岳→三股登山口': {minutes:210, source:'YAMAPモデルコース・常念岳（三股）（12:10→15:40）', sourceType:'yamap'},
  '前常念岳→常念岳': {minutes:80, source:'YAMAPモデルコース・常念岳（三股）（前常念岳09:45→常念岳11:05）', sourceType:'yamap'},
  '常念岳→前常念岳': {minutes:65, source:'YAMAPモデルコース・常念岳（三股）（常念岳11:05→前常念岳12:10）', sourceType:'yamap'},

  // 常念岳 ↔ 蝶槍。公開コースガイドの方向別標準CT。
  '常念岳→蝶槍': {minutes:210, source:'公開登山コースガイド・常念岳→蝶槍 3時間30分', sourceType:'other'},
  '蝶槍→常念岳': {minutes:240, source:'公開登山コースガイド・蝶槍→常念岳 4時間', sourceType:'other'},

  // 蝶槍 ↔ 蝶ヶ岳ヒュッテ。YAMAP往復モデルのチェックポイント時刻から直接確認。
  '蝶槍→蝶ヶ岳ヒュッテ': {minutes:55, source:'YAMAPモデルコース・三股登山口-蝶ヶ岳-蝶槍往復（蝶槍10:33→蝶ヶ岳ヒュッテ11:28）', sourceType:'yamap'},
  '蝶ヶ岳ヒュッテ→蝶槍': {minutes:55, source:'YAMAPモデルコース・三股登山口-蝶ヶ岳-蝶槍往復（蝶ヶ岳ヒュッテ09:38→蝶槍10:33）', sourceType:'yamap'}
});

// V1.5.18: 追加王道ルート用の区間CT。距離按分は使わず、公開標準CTのみを方向別に固定。
const V1518_CLASSIC_ROUTE_VERIFIED_COURSE_TIMES = Object.freeze({
  // 三股サーキット（YAMAPモデルコースのチェックポイント時刻から区間合算）
  '三股登山口→常念岳': {minutes:440, source:'YAMAPモデルコース・三股-常念岳-蝶ヶ岳周回（標準CT 7時間20分）', sourceType:'yamap'},
  '常念岳→三股登山口': {minutes:265, source:'YAMAPモデルコース・常念岳（三股）（標準CT 4時間25分）', sourceType:'yamap'},

  // 雲ノ平グランドサークル
  '太郎平小屋→薬師沢小屋': {minutes:140, source:'雲ノ平山荘公式・折立登山口ルート（太郎平小屋→薬師沢小屋 2時間20分）', sourceType:'official'},
  '薬師沢小屋→太郎平小屋': {minutes:141, source:'ヤマレコ公開山行計画・薬師沢小屋→太郎平小屋 標準CT 141分', sourceType:'yamareco'},
  '薬師沢小屋→雲ノ平山荘': {minutes:195, source:'雲ノ平山荘公式・折立登山口ルート（アラスカ庭園・祖母岳分岐経由 3時間15分）', sourceType:'official'},
  '雲ノ平山荘→薬師沢小屋': {minutes:97, source:'ヤマレコ公開山行計画・雲ノ平山荘→薬師沢小屋 標準CT 97分', sourceType:'yamareco'},
  '雲ノ平山荘→三俣山荘': {minutes:170, source:'山旅旅・折立〜雲ノ平〜黒部五郎岳周回（キャンプ場・祖父岳分岐・徒渉点経由 2時間50分）', sourceType:'other'},
  '三俣山荘→雲ノ平山荘': {minutes:160, source:'雲ノ平山荘公式・新穂高温泉ルート（黒部源流・祖父岳分岐・キャンプ場分岐経由 2時間40分）', sourceType:'official'},
  '三俣蓮華岳→黒部五郎小舎': {minutes:90, source:'山旅旅・折立〜雲ノ平〜黒部五郎岳周回（巻道合流点経由 1時間30分）', sourceType:'other'},
  '黒部五郎小舎→三俣蓮華岳': {minutes:122, source:'ヤマレコ公開山行計画・黒部五郎小舎→三俣蓮華岳 標準CT 122分', sourceType:'yamareco'},
  '黒部五郎小舎→黒部五郎岳': {minutes:130, source:'山旅旅・折立〜雲ノ平〜黒部五郎岳周回（黒部五郎小舎→黒部五郎岳 2時間10分）', sourceType:'other'},
  '黒部五郎岳→黒部五郎小舎': {minutes:77, source:'ヤマレコ公開山行計画・黒部五郎岳→黒部五郎小舎 標準CT 77分', sourceType:'yamareco'}
});

// V1.5.16: 王道ルート内で実際に CT情報なし となっていた細区間を公開標準CTで固定。
// 距離按分・推定による補完は行わず、各区間の公開コースタイムを方向別に登録する。
const V1516_CLASSIC_ROUTE_VERIFIED_COURSE_TIMES = Object.freeze({
  // 表銀座 / パノラマ銀座
  '大天荘→大天井岳': {minutes:10, source:'大天荘公式・大天井岳山頂まで10分', sourceType:'official'},
  '大天井岳→大天荘': {minutes:6, source:'YAMA HACK・表銀座縦走コース（大天井岳→大天荘 6分）', sourceType:'other'},
  '蝶ヶ岳→蝶ヶ岳ヒュッテ': {minutes:5, source:'公開登山ガイド・蝶ヶ岳山頂↔蝶ヶ岳ヒュッテ 約5分'},
  '蝶ヶ岳ヒュッテ→蝶ヶ岳': {minutes:5, source:'公開登山ガイド・蝶ヶ岳山頂↔蝶ヶ岳ヒュッテ 約5分'},
  '三股登山口→蝶ヶ岳ヒュッテ': {minutes:257, source:'YAMAPモデルコース・三股登山口→蝶ヶ岳ヒュッテ 標準CT区間合算', sourceType:'yamap'},
  '蝶ヶ岳ヒュッテ→三股登山口': {minutes:200, source:'YAMAPモデルコース・蝶ヶ岳ヒュッテ→三股登山口 標準CT区間合算', sourceType:'yamap'},

  // 裏銀座
  '野口五郎小屋→野口五郎岳': {minutes:15, source:'ヤマレコ山行計画・裏銀座標準CT', sourceType:'yamareco'},
  '野口五郎岳→野口五郎小屋': {minutes:10, source:'ヤマレコ山行計画・裏銀座標準CT', sourceType:'yamareco'},
  '野口五郎小屋→水晶小屋': {minutes:165, source:'ヤマレコ山行計画・竹村新道分岐/東沢乗越経由 標準CT合算', sourceType:'yamareco'},
  '水晶小屋→野口五郎小屋': {minutes:134, source:'ヤマレコ山行計画・東沢乗越/竹村新道分岐/野口五郎岳経由 標準CT合算', sourceType:'yamareco'},
  '水晶小屋→水晶岳': {minutes:38, source:'ヤマレコ山行計画・水晶小屋→水晶岳 標準CT', sourceType:'yamareco'},
  '水晶岳→水晶小屋': {minutes:28, source:'ヤマレコ山行計画・水晶岳→水晶小屋 標準CT', sourceType:'yamareco'},
  '水晶小屋→鷲羽岳': {minutes:87, source:'ヤマレコ山行計画・ワリモ北分岐/ワリモ岳経由 標準CT合算', sourceType:'yamareco'},
  '鷲羽岳→水晶小屋': {minutes:83, source:'ヤマレコ山行計画・ワリモ岳/ワリモ北分岐経由 標準CT合算', sourceType:'yamareco'},
  '鷲羽岳→三俣山荘': {minutes:51, source:'ヤマレコ山行計画・伊藤新道分岐経由 標準CT合算', sourceType:'yamareco'},
  '三俣山荘→鷲羽岳': {minutes:90, source:'YAMAP/ヤマレコ公開標準コース・三俣山荘→鷲羽岳 標準CT', sourceType:'yamareco'},
  '三俣蓮華岳→双六岳': {minutes:69, source:'ヤマレコ山行計画・丸山経由 標準CT合算', sourceType:'yamareco'},
  '双六岳→三俣蓮華岳': {minutes:71, source:'YAMAPモデルコース・中道稜線分岐/丸山経由 標準CT合算', sourceType:'yamap'},
  '双六小屋→双六岳': {minutes:70, source:'双六小屋グループ公式おすすめプラン・双六小屋→双六岳', sourceType:'official'},
  '双六岳→双六小屋': {minutes:50, source:'双六小屋グループ公式おすすめプラン・双六岳→双六小屋', sourceType:'official'},
  '鏡平山荘→わさび平小屋': {minutes:140, source:'公開登山コースタイム・小池新道下山（鏡平山荘→わさび平小屋）'},
  'わさび平小屋→新穂高温泉': {minutes:55, source:'公開登山コースタイム・小池新道下山（わさび平小屋→新穂高温泉）'},

  // 槍・穂高縦走
  '槍ヶ岳山荘→大喰岳': {minutes:33, source:'ヤマレコ山行計画・飛騨乗越経由 標準CT合算', sourceType:'yamareco'},
  '大喰岳→槍ヶ岳山荘': {minutes:31, source:'ヤマレコ山行計画・飛騨乗越経由 標準CT合算', sourceType:'yamareco'},
  '大喰岳→中岳': {minutes:28, source:'ヤマレコ山行計画・槍穂縦走 標準CT', sourceType:'yamareco'},
  '中岳→大喰岳': {minutes:30, source:'ヤマレコ山行計画・槍穂縦走 標準CT', sourceType:'yamareco'},
  '中岳→南岳': {minutes:55, source:'ヤマレコ山行計画・氷河公園分岐経由 標準CT合算', sourceType:'yamareco'},
  '南岳→中岳': {minutes:59, source:'ヤマレコ山行計画・氷河公園分岐経由 標準CT合算', sourceType:'yamareco'},
  '南岳→南岳小屋': {minutes:7, source:'ヤマレコ山行計画・槍穂縦走 標準CT', sourceType:'yamareco'},
  '南岳小屋→南岳': {minutes:13, source:'ヤマレコ山行計画・槍穂縦走 標準CT', sourceType:'yamareco'},
  '北穂高岳→北穂高小屋': {minutes:1, source:'ヤマレコ山行計画・北穂高岳→北穂高小屋 標準CT', sourceType:'yamareco'},
  '北穂高小屋→北穂高岳': {minutes:2, source:'ヤマレコ山行計画・北穂高小屋→北穂高岳 標準CT', sourceType:'yamareco'},
  '北穂高小屋→涸沢岳': {minutes:152, source:'ヤマレコ山行計画・北穂高岳/南稜分岐/最低コル経由 標準CT合算', sourceType:'yamareco'},
  '涸沢岳→北穂高小屋': {minutes:144, source:'ヤマレコ山行計画・最低コル/南稜分岐/北穂高岳経由 標準CT合算', sourceType:'yamareco'},
  '涸沢岳→穂高岳山荘': {minutes:20, source:'ヤマレコ山行計画・槍穂縦走 標準CT', sourceType:'yamareco'},
  '穂高岳山荘→涸沢岳': {minutes:32, source:'ヤマレコ山行計画・槍穂縦走 標準CT', sourceType:'yamareco'}
});

const V1514_INTERMEDIATE_VERIFIED_COURSE_TIMES = Object.freeze({
  // Takatsuma: published route guide segment CTs.
  '戸隠キャンプ場・高妻山登山者駐車場→一不動避難小屋': {minutes:80, source:'日本アルプス登山ルートガイド・高妻山 一不動経由（戸隠キャンプ場→一不動避難小屋 1時間20分）', sourceType:'other'},
  '一不動避難小屋→高妻山': {minutes:135, source:'日本アルプス登山ルートガイド・高妻山 一不動経由（一不動避難小屋→六弥勒45分→高妻山1時間30分）', sourceType:'other'},
  '高妻山→一不動避難小屋': {minutes:100, source:'日本アルプス登山ルートガイド・高妻山 一不動経由（高妻山→六弥勒1時間05分→一不動避難小屋35分）', sourceType:'other'},
  '一不動避難小屋→戸隠キャンプ場・高妻山登山者駐車場': {minutes:65, source:'日本アルプス登山ルートガイド・高妻山 一不動経由（一不動避難小屋→戸隠キャンプ場 1時間05分）', sourceType:'other'},

  // Myoko: Sasagamine - Kurosawaike - Myoko published standard CTs.
  '笹ヶ峰登山口→黒沢池ヒュッテ': {minutes:190, source:'いこまいけ登山・妙高山笹ヶ峰ルート（笹ヶ峰→黒沢橋1時間→富士見平1時間30分→黒沢池ヒュッテ40分）', sourceType:'other'},
  '黒沢池ヒュッテ→妙高山': {minutes:150, source:'いこまいけ登山・妙高山笹ヶ峰ルート（黒沢池ヒュッテ→大倉乗越30分→長助池分岐40分→北峰1時間10分→南峰10分）', sourceType:'other'},
  '妙高山→黒沢池ヒュッテ': {minutes:130, source:'いこまいけ登山・妙高山笹ヶ峰ルート（南峰→北峰10分→長助池分岐50分→大倉乗越50分→黒沢池ヒュッテ20分）', sourceType:'other'},
  '黒沢池ヒュッテ→笹ヶ峰登山口': {minutes:160, source:'いこまいけ登山・妙高山笹ヶ峰ルート（黒沢池ヒュッテ→富士見平40分→黒沢橋1時間10分→笹ヶ峰50分）', sourceType:'other'},

  // Yari: published major-route segment CTs. No distance allocation.
  '槍沢ロッヂ→ババ平（槍沢キャンプ場）': {minutes:45, source:'YAMA HACK・槍ヶ岳 槍沢ルート（槍沢ロッヂ→槍沢キャンプ地 45分）', sourceType:'other'},
  'ババ平（槍沢キャンプ場）→大曲（水俣乗越分岐）': {minutes:55, source:'YAMA HACK・槍ヶ岳 槍沢ルート（槍沢キャンプ地→大曲 55分）', sourceType:'other'},
  '大曲（水俣乗越分岐）→天狗原分岐': {minutes:60, source:'YAMA HACK・槍沢ルート（大曲→天狗原分岐 60分）', sourceType:'other'},
  '天狗原分岐→槍ヶ岳山荘': {minutes:170, source:'YAMA HACK・槍沢ルート（天狗原分岐→坊主岩90分→殺生小屋40分→槍ヶ岳山荘40分）', sourceType:'other'},
  '槍ヶ岳山荘→天狗原分岐': {minutes:100, source:'山岳愛好会雷鳥・槍穂高縦走計画（槍ヶ岳山荘→殺生分岐20分→ヒュッテ大槍分岐20分→天狗原分岐60分）', sourceType:'other'},
  '天狗原分岐→大曲（水俣乗越分岐）': {minutes:50, source:'山岳愛好会雷鳥・槍穂高縦走計画（天狗原分岐→大曲 50分）', sourceType:'other'},
  '大曲（水俣乗越分岐）→ババ平（槍沢キャンプ場）': {minutes:25, source:'山岳愛好会雷鳥・槍穂高縦走計画（大曲→ババ平 25分）', sourceType:'other'},
  'ババ平（槍沢キャンプ場）→槍沢ロッヂ': {minutes:35, source:'山岳愛好会雷鳥・槍穂高縦走計画（ババ平→槍沢ロッヂ 35分）', sourceType:'other'},

  // Kiso-Komagatake: official/published standard course segments.
  '千畳敷→乗越浄土': {minutes:60, source:'中央アルプス観光・木曽駒ヶ岳登山コース（千畳敷→乗越浄土 約60分）', sourceType:'official'},
  '乗越浄土→木曽駒ヶ岳': {minutes:60, source:'中央アルプス観光・木曽駒ヶ岳登山コース（乗越浄土→中岳20分→木曽駒ヶ岳40分）', sourceType:'official'},
  '木曽駒ヶ岳→乗越浄土': {minutes:60, source:'中央アルプス観光・木曽駒ヶ岳登山コース（木曽駒ヶ岳→中岳40分→乗越浄土20分）', sourceType:'official'},
  '乗越浄土→千畳敷': {minutes:50, source:'中央アルプス観光・木曽駒ヶ岳登山コース（乗越浄土→千畳敷 約50分）', sourceType:'official'},

  // Shirakimine: published route/plan times. The hut leg is kept explicit rather than apportioned.
  '白木峰8合目駐車場→白木山荘（避難小屋）': {minutes:60, source:'白木峰と大長谷を愛する会・ガイドツアー（8合目駐車場→白木山荘 1時間）', sourceType:'other'},
  '白木山荘（避難小屋）→白木峰': {minutes:10, source:'富山市公式・管理道ルート約70分＋公開ガイドの8合目→白木山荘60分から同一管理道の残区間10分として確認', sourceType:'official'},
  '白木峰→白木山荘（避難小屋）': {minutes:10, source:'公開登山ガイド・白木峰山頂→白木峰山荘 10分', sourceType:'other'},
  '白木山荘（避難小屋）→白木峰8合目駐車場': {minutes:41, source:'YAMAP標準モデル・8合目登山口-白木峰-浮島の池 周回（白木峰山荘→8合目登山口 41分）', sourceType:'yamap'}
});

// V1.5.13: nationwide intermediate-segment CT verification pass.
// Major-route waypoints may split an already-known parent CT into smaller legs.
// Promote only legs that can be tied to published standard/model-course times.
const V1513_INTERMEDIATE_VERIFIED_COURSE_TIMES = Object.freeze({
  // Central Alps: Hoken-dake / Kiso-Komagatake major route.
  '宝剣岳→宝剣山荘': {minutes:20, source:'YAMA HACK・木曽駒ヶ岳 宝剣岳寄り道コース（宝剣岳→宝剣山荘 20分）', sourceType:'other'},
  '宝剣山荘→宝剣岳': {minutes:20, source:'YAMA HACK・木曽駒ヶ岳 宝剣岳寄り道コース（宝剣山荘→宝剣岳 20分）', sourceType:'other'},
  '宝剣山荘→頂上山荘': {minutes:40, source:'YAMA HACK・木曽駒ヶ岳コースガイド（宝剣山荘→頂上山荘 約40分）', sourceType:'other'},
  '頂上山荘→宝剣山荘': {minutes:35, source:'YAMA HACK・木曽駒ヶ岳 宝剣岳寄り道コース（頂上山荘→中岳15分→分岐10分→宝剣山荘10分）', sourceType:'other'},
  '頂上山荘→木曽駒ヶ岳': {minutes:20, source:'YAMA HACK・木曽駒ヶ岳コースガイド（頂上山荘→木曽駒ヶ岳 約20分）', sourceType:'other'},
  '木曽駒ヶ岳→頂上山荘': {minutes:15, source:'YAMA HACK・木曽駒ヶ岳 宝剣岳寄り道コース（木曽駒ヶ岳→頂上山荘 15分）', sourceType:'other'},

  // Northern Alps: Happo ridge. Replace proportional intermediate CT with published official times.
  '八方池山荘→八方池': {minutes:100, source:'白馬村公式観光サイト・八方尾根〜唐松岳コース（八方池山荘→八方池 1時間40分）', sourceType:'official'},
  '八方池→唐松岳頂上山荘': {minutes:150, source:'白馬村公式観光サイト・八方尾根〜唐松岳コース（八方池→唐松岳頂上山荘 2時間30分）', sourceType:'official'},
  '唐松岳頂上山荘→八方池': {minutes:120, source:'白馬村公式観光サイト・八方尾根〜唐松岳コース（唐松岳頂上山荘→八方池 2時間）', sourceType:'official'},
  '八方池→八方池山荘': {minutes:80, source:'白馬村公式観光サイト・八方尾根〜唐松岳コース（八方池→八方池山荘 1時間20分）', sourceType:'official'},

  // Northern Alps: Ichinosawa / Jonen. Jonen-nokkoshi and the hut are effectively adjacent checkpoints.
  '一ノ沢登山口→常念乗越': {minutes:270, source:'常念小屋公式・一の沢登山コース（登山口→常念乗越・常念小屋 約4時間30分）', sourceType:'official'},
  '常念乗越→常念小屋': {minutes:1, source:'YAMAP標準モデル・燕→常念縦走（常念乗越→常念小屋 1分）', sourceType:'yamap'},
  '常念小屋→常念乗越': {minutes:1, source:'YAMAP標準モデル・常念乗越〜一ノ沢下山（常念小屋→常念乗越 1分）', sourceType:'yamap'},
  '常念乗越→一ノ沢登山口': {minutes:170, source:'YAMAP標準モデル・常念乗越〜一ノ沢下山（常念乗越→一ノ沢登山口トイレ 2時間50分）', sourceType:'yamap'}
});

// V1.4.207: screenshot-priority estimated CT verification pass.
// Promote only attached-list segments whose same endpoint/direction was confirmed in published YAMAP standard-course checkpoints.
const V14207_VERIFIED_COURSE_TIMES = Object.freeze({
  '奈良田→農鳥岳': {minutes:529, source:'YAMAP標準モデル・奈良田から大門沢経由（奈良田駐車場04:00→農鳥岳12:49相当、登山口接続を含む8時間49分）', sourceType:'yamap'},
  '大谷原登山口→鹿島槍ヶ岳': {minutes:466, source:'YAMAP標準モデル・鹿島槍ヶ岳（大谷原）（駐車場05:00→鹿島槍ヶ岳南峰12:46、7時間46分）', sourceType:'yamap'},
  '鹿島槍ヶ岳→大谷原登山口': {minutes:291, source:'YAMAP標準モデル・鹿島槍ヶ岳（大谷原）（鹿島槍ヶ岳南峰12:46→駐車場17:37、4時間51分）', sourceType:'yamap'},
  '扇沢登山口→鹿島槍ヶ岳': {minutes:527, source:'YAMAP標準モデル・柏原新道ルート（柏原新道登山口駐車場04:00→鹿島槍ヶ岳南峰12:47、8時間47分）', sourceType:'yamap'},
  '比叡山（大比叡）→雲母坂登山口（修学院）': {minutes:117, source:'YAMAP標準モデル・修学院側往復（大比叡10:43→比叡山登山口12:40、1時間57分）', sourceType:'yamap'},
  '竜門岳→竜門岳登山口 吉野': {minutes:95, source:'YAMAP標準モデル・竜門岳往復（竜門岳10:25→竜門岳登山口トイレ12:00、1時間35分）', sourceType:'yamap'},
  '池山口登山口→空木岳': {minutes:335, source:'YAMAP標準モデル・空木岳往復 池山尾根（空木岳登山口06:25→空木岳12:00、5時間35分）', sourceType:'yamap'},
  '空木岳→池山口登山口': {minutes:259, source:'YAMAP標準モデル・空木岳往復 池山尾根（空木岳12:00→空木岳登山口16:19、4時間19分）', sourceType:'yamap'}
});

// V1.4.206: bulk estimated CT verification pass (20 segments).
// Promote only published standard-course checkpoint times for the same fixed endpoint/direction.
const V14206_VERIFIED_COURSE_TIMES = Object.freeze({
  '秋田駒ヶ岳（男女岳）→八合目小屋 秋田駒ヶ岳': {minutes:69, source:'YAMAP標準モデル・秋田駒ヶ岳 八合目往復（男女岳09:52→八合目登山口11:01、1時間09分）', sourceType:'yamap'},
  '粟ヶ岳→粟ヶ岳中央登山口（県民休養地）': {minutes:180, source:'YAMAP標準モデル・粟ヶ岳中央コース（粟ヶ岳11:45→中央登山口14:45、3時間00分）', sourceType:'yamap'},
  '守門岳→二口登山口': {minutes:170, source:'YAMAP標準モデル・守門岳 二口往復（守門岳11:15→二口登山口14:05、2時間50分）', sourceType:'yamap'},
  '仙ノ倉山→平標登山口・元橋駐車場': {minutes:205, source:'YAMAP標準モデル・平標山登山口-仙ノ倉山（仙ノ倉山10:16→平標登山口駐車場13:41、3時間25分）', sourceType:'yamap'},
  '御座山→長者の森登山口': {minutes:175, source:'YAMAP標準モデル・長者の森-御座山往復（御座山10:44→長者の森13:39、2時間55分）', sourceType:'yamap'},
  '黒姫山→大橋林道口・黒姫山登山口': {minutes:153, source:'YAMAP標準モデル・大橋-黒姫山往復（黒姫山10:33→大橋13:06、2時間33分）', sourceType:'yamap'},
  '扇ノ山→河合谷高原 扇ノ山登山口': {minutes:75, source:'YAMAP標準モデル・河合谷コース（扇ノ山09:44→河合谷登山口10:59、1時間15分）', sourceType:'yamap'},
  '扇ノ山→姫路公園登山口': {minutes:50, source:'YAMAP標準モデル・姫路コース（扇ノ山09:23→姫路コース登山口10:13、50分）', sourceType:'yamap'},
  '氷ノ山→わかさ氷ノ山登山口': {minutes:95, source:'YAMAP標準モデル・わかさ氷ノ山側往復（氷ノ山10:45→キャンプ場側登山口12:20、1時間35分）', sourceType:'yamap'},
  '那岐山→蛇淵の滝 那岐山登山口': {minutes:110, source:'YAMAP標準モデル・那岐山往復（那岐山10:25→蛇淵側登山口12:15、1時間50分）', sourceType:'yamap'},
  'モンデウス飛騨位山→位山': {minutes:158, source:'YAMAP標準モデル・モンデウス飛騨位山-位山（駐車場08:06→位山10:44、2時間38分）', sourceType:'yamap'},
  '位山→モンデウス飛騨位山': {minutes:109, source:'YAMAP標準モデル・モンデウス飛騨位山-位山（位山10:44→駐車場12:33、1時間49分）', sourceType:'yamap'},
  '伯母子岳→大股登山口 伯母子岳': {minutes:175, source:'YAMAP標準モデル・大股-伯母子岳往復（伯母子岳11:32→大股14:27、2時間55分）', sourceType:'yamap'},
  '脊振山→脊振山山頂駐車場': {minutes:10, source:'神埼市公式・山頂手前駐車場から約10分（往復同一区間）', sourceType:'official'},
  '篠山→篠山登山口 愛媛高知': {minutes:40, source:'YAMAP標準モデル・篠山往復（篠山08:49→篠山第一駐車場09:29、40分）', sourceType:'yamap'},
  '笹ヶ峰→下津池 笹ヶ峰登山口': {minutes:106, source:'YAMAP標準モデル・笹ヶ峰往復（笹ヶ峰10:22→笹ヶ峰登山口駐車場12:08、1時間46分）', sourceType:'yamap'},
  '長者原→大船山': {minutes:309, source:'YAMAP標準モデル・長者原-大船山往復（長者原08:00→大船山13:09、5時間09分）', sourceType:'yamap'},
  '大船山→長者原': {minutes:229, source:'YAMAP標準モデル・長者原-大船山往復（大船山13:09→長者原16:58、3時間49分）', sourceType:'yamap'},
  '筑波山神社入口→筑波山（女体山）': {minutes:166, source:'YAMAP標準モデル・筑波山神社-筑波山-つつじヶ丘（御神橋08:19→女体山11:05、2時間46分）', sourceType:'yamap'},
  '筑波山（女体山）→筑波山神社入口': {minutes:111, source:'YAMAP標準モデル・御幸ヶ原/白雲橋周回（女体山10:23→御神橋12:14、1時間51分）', sourceType:'yamap'}
});

// V1.4.205: remaining estimated CT verification pass #4.
// Promote only exact fixed endpoints/directions confirmed from published YAMAP model-course checkpoints.
const V14205_VERIFIED_COURSE_TIMES = Object.freeze({
  '西吾妻山→白布峠登山口': {minutes:200, source:'YAMAP標準モデル・白布峠-矢筈山-西大巓-西吾妻山往復（西吾妻山11:11→白布峠14:31、3時間20分）', sourceType:'yamap'},
  '毛無山→麓・毛無山登山口': {minutes:148, source:'YAMAP標準モデル・麓登山口-毛無山往復（毛無山11:42→麓登山口14:10、2時間28分）', sourceType:'yamap'},
  '七面山→羽衣・七面山表参道駐車場': {minutes:168, source:'YAMAP標準モデル・七面山表参道（七面山12:11→表参道入口・羽衣14:59、2時間48分）', sourceType:'yamap'}
});

// V1.4.204: remaining estimated CT verification pass #3.
// Promote only exact fixed endpoints/directions confirmed from published YAMAP model-course checkpoints.
const V14204_VERIFIED_COURSE_TIMES = Object.freeze({
  '焼岳→新中の湯登山口': {minutes:150, source:'YAMAP標準モデル・新中の湯ルート（焼岳09:14→新中の湯登山口11:44、2時間30分）', sourceType:'yamap'},
  '戸隠山→戸隠神社奥社登山口': {minutes:105, source:'YAMAP標準モデル・戸隠山（奥社駐車場）（戸隠山09:58→戸隠奥社11:43、1時間45分）', sourceType:'yamap'},
  '二王子岳→二王子神社登山口': {minutes:185, source:'YAMAP標準モデル・二王子岳往復（二王子岳10:56→二王子岳登山口14:01、3時間05分）', sourceType:'yamap'},
  '鶴見岳→別府ロープウェイ 鶴見山上駅': {minutes:8, source:'YAMAP標準モデル・鶴見岳ロープウェイ登頂ルート（鶴見岳08:23→鶴見山上駅08:31、8分）', sourceType:'yamap'}
});

// V1.4.203: remaining estimated CT verification pass.
// Promote only segments whose same endpoints/direction can be read from published YAMAP model-course checkpoints.
const V14203_VERIFIED_COURSE_TIMES = Object.freeze({
  '大白川・平瀬道登山口→白山（御前峰）': {minutes:318, source:'YAMAP標準モデル・平瀬道登山口-室堂センター-白山往復（登山口06:00→御前峰11:18、5時間18分）', sourceType:'yamap'},
  '白山（御前峰）→大白川・平瀬道登山口': {minutes:217, source:'YAMAP標準モデル・平瀬道登山口-室堂センター-白山往復（御前峰11:48→登山口15:25、3時間37分）', sourceType:'yamap'},
  '焼走り登山口→岩手山': {minutes:302, source:'YAMAP標準モデル・岩手山 焼走り登山口コース（登山口07:00→岩手山12:02、5時間02分）', sourceType:'yamap'},
  '岩手山→焼走り登山口': {minutes:205, source:'YAMAP標準モデル・岩手山 焼走り登山口コース（岩手山12:02→登山口15:27、3時間25分）', sourceType:'yamap'},
  'おのこ駐車場・駒ヶ岳登山口→赤城山（黒檜山）': {minutes:127, source:'YAMAP標準モデル・赤城駒ヶ岳登山口-駒ヶ岳-黒檜山往復（あかぎ広場駐車場07:00→黒檜山09:07、2時間07分）', sourceType:'yamap'},
  '赤城山（黒檜山）→おのこ駐車場・駒ヶ岳登山口': {minutes:99, source:'YAMAP標準モデル・赤城駒ヶ岳登山口-駒ヶ岳-黒檜山往復（黒檜山09:15→あかぎ広場駐車場10:52、1時間37分＋駐車場接続2分）', sourceType:'yamap'},
  '北の原・姫逃池登山口→三瓶山（男三瓶山）': {minutes:111, source:'YAMAP標準モデル・姫逃池登山口-男三瓶山往復（姫逃池駐車場08:00→男三瓶山09:51、1時間51分）', sourceType:'yamap'},
  '三瓶山（男三瓶山）→北の原・姫逃池登山口': {minutes:86, source:'YAMAP標準モデル・姫逃池登山口-男三瓶山往復（男三瓶山09:51→姫逃池駐車場11:17、1時間26分）', sourceType:'yamap'},
  '御殿場口新五合目→富士山（剣ヶ峰）': {minutes:503, source:'YAMAP標準モデル・御殿場ルート（新五合目04:00→剣ヶ峰12:23、8時間23分）', sourceType:'yamap'},
  '富士山（剣ヶ峰）→御殿場口新五合目': {minutes:243, source:'YAMAP標準モデル・御殿場ルート（剣ヶ峰12:23→新五合目16:26、4時間03分）', sourceType:'yamap'},
  '守門岳→保久礼登山口': {minutes:159, source:'YAMAP標準モデル・保久礼小屋登山口-大岳-守門岳往復（守門岳09:47→登山口側トイレ12:26、2時間39分）', sourceType:'yamap'},
  '浅草岳→ネズモチ平登山口駐車場': {minutes:117, source:'YAMAP標準モデル・ネズモチ平登山口-浅草岳往復（浅草岳10:58→ネズモチ平駐車場12:55、1時間57分）', sourceType:'yamap'},
  '笠ヶ岳（長野）→笠岳峠・笠ヶ岳登山口': {minutes:25, source:'YAMAP標準モデル・笠ヶ岳 往復1時間程度コース（笠ヶ岳→峠側駐車場25分）', sourceType:'yamap'}
});

// V1.4.201: 富士山・富士宮ルートの公式標準CT。
// 富士登山オフィシャルサイトの富士宮ルート標準時間（山頂まで約5時間10分／下り約2時間40分）に、
// 山頂浅間大社奥宮〜剣ヶ峰の標準移動約20分を加えて剣ヶ峰端点に合わせる。
const V14201_REPRESENTATIVE_VERIFIED_COURSE_TIMES = Object.freeze({
  '富士宮口五合目→富士山（剣ヶ峰）': {minutes:330, source:'富士登山オフィシャルサイト2026・富士宮ルート（五合目→山頂5時間10分＋剣ヶ峰約20分）', sourceType:'official'},
  '富士山（剣ヶ峰）→富士宮口五合目': {minutes:180, source:'富士登山オフィシャルサイト2026・富士宮ルート（山頂→五合目2時間40分＋剣ヶ峰から山頂約20分）', sourceType:'official'},
  '真狩登山口・真狩キャンプ場→後方羊蹄山（羊蹄山）': {minutes:310, source:'YAMAP標準モデル・羊蹄山 真狩コース（真狩登山口→山頂 5時間10分）', sourceType:'yamap'},
  '後方羊蹄山（羊蹄山）→真狩登山口・真狩キャンプ場': {minutes:190, source:'YAMAP標準モデル・比羅夫→羊蹄山→真狩縦走（山頂→真狩登山口 3時間10分）', sourceType:'yamap'},
  '百沢コース登山口→岩木山': {minutes:258, source:'YAMAP標準モデル・百沢コース（百沢コース登山口→岩木山 4時間18分）', sourceType:'yamap'},
  '岩木山→百沢コース登山口': {minutes:190, source:'YAMAP標準モデル・百沢コース（岩木山→百沢コース登山口 3時間10分）', sourceType:'yamap'},
  '唐沢鉱泉→天狗岳': {minutes:240, source:'YAMAP標準モデル・天狗岳（唐沢鉱泉）西尾根（唐沢鉱泉→西天狗岳 4時間）', sourceType:'yamap'},
  '天狗岳→唐沢鉱泉': {minutes:130, source:'YAMAP標準モデル・天狗岳（唐沢鉱泉）西尾根（西天狗岳→唐沢鉱泉 2時間10分）', sourceType:'yamap'},
  '蓮華温泉→白馬大池山荘': {minutes:195, source:'白馬館公式・蓮華温泉ルート（蓮華温泉登山口→白馬大池山荘 3時間15分）', sourceType:'official'},
  '比羅夫登山口・半月湖畔自然公園→後方羊蹄山（羊蹄山）': {minutes:310, source:'倶知安町公式・羊蹄山 倶知安ひらふコース', sourceType:'official'},
  '岩木山→嶽温泉・嶽コース登山口': {minutes:159, source:'YAMAP標準モデル・百沢→岩木山→嶽温泉縦走（山頂→嶽コース登山口 2時間39分）', sourceType:'yamap'},
  '十勝岳温泉登山口→十勝岳': {minutes:305, source:'YAMAP標準モデル・上ホロカメットク山-十勝岳縦走（十勝岳温泉登山口→十勝岳 5時間05分）', sourceType:'yamap'},
  '十勝岳→吹上温泉登山口': {minutes:165, source:'ヤマレコ・十勝岳 吹上温泉ルート p5503284（区間CT合算）', sourceType:'yamareco'},
  '坊村登山口→武奈ヶ岳': {minutes:232, source:'既存確認済みCT「坊村→武奈ヶ岳」と同一登山口名称を接続', sourceType:'yamareco'},
  '武奈ヶ岳→坊村登山口': {minutes:143, source:'既存確認済みCT「武奈ヶ岳→坊村」と同一登山口名称を接続', sourceType:'yamareco'}
});

// V1.4.200: representative-course expansion verification pass.
// These times are only promoted where the same fixed endpoint/direction is supported by a published route guide/model course.
const V14199_REPRESENTATIVE_VERIFIED_COURSE_TIMES = Object.freeze({
  'みずがき山自然公園→瑞牆山': {minutes:150, source:'北杜市公式・瑞牆山自然公園ルート（登り 約2時間30分）', sourceType:'official'},
  '瑞牆山→みずがき山自然公園': {minutes:110, source:'北杜市公式・瑞牆山自然公園ルート（下り 約1時間50分）', sourceType:'official'},
  '瑞牆山荘・富士見平口→金峰山': {minutes:260, source:'北杜市公式・金峰山 瑞牆山荘ルート（登り 約4時間20分）', sourceType:'official'},
  '金峰山→瑞牆山荘・富士見平口': {minutes:210, source:'北杜市公式・金峰山 瑞牆山荘ルート（下り 約3時間30分）', sourceType:'official'},
  '広河原登山口・峰越林道ゲート→恵那山': {minutes:230, source:'中津川市公式・恵那山 広河原ルート 登り3時間50分', sourceType:'official'},
  '恵那山→広河原登山口・峰越林道ゲート': {minutes:200, source:'中津川市公式・恵那山 広河原ルート 下り3時間20分', sourceType:'official'},
  '戸沢出合→塔ノ岳': {minutes:189, source:'YAMAP標準モデル・戸沢の出合駐車場→塔ノ岳（チェックポイント合算 3時間09分）', sourceType:'yamap'},
  '塔ノ岳→戸沢出合': {minutes:121, source:'YAMAP標準モデル・塔ノ岳→戸沢の出合駐車場（チェックポイント合算 2時間01分）', sourceType:'yamap'},
  '山ノ鼻（至仏山東面登山道入口・登り専用）→至仏山': {minutes:150, source:'YAMAP標準モデル・鳩待峠-山ノ鼻-至仏山周回（山ノ鼻側分岐→至仏山 約2時間30分）', sourceType:'yamap'},
  '燕温泉登山口→妙高山': {minutes:295, source:'YAMAP標準モデル・妙高山（燕温泉）（燕温泉登山口→妙高山南峰 4時間55分）', sourceType:'yamap'},
  '妙高山→燕温泉登山口': {minutes:150, source:'YAMAP標準モデル・妙高山（燕温泉）（妙高山南峰→燕温泉登山口 2時間30分）', sourceType:'yamap'}
});

// V1.4.198: bulk verification pass for remaining estimated CTs.
// Only promote segments where the same endpoint/direction can be tied to a published official/YAMAP model time.
const V14198_BULK_VERIFIED_COURSE_TIMES = Object.freeze({
  '阿蘇山（高岳）→仙酔峡駐車場・仙酔峡登山口': {minutes:109, source:'YAMAP標準モデル・仙酔峡登山口-中岳-高岳往復（高岳→仙酔峡駐車場 1時間49分）', sourceType:'yamap'},
  '蓬来山→びわ湖バレイ山頂駅': {minutes:13, source:'YAMAP標準モデル・打見山-蓬莱山往復（蓬莱山→ロープウェイ山頂駅 13分）', sourceType:'yamap'},
  '三瓶山（男三瓶山）→西の原登山口': {minutes:106, source:'YAMAP標準モデル・西の原登山口-男三瓶山往復（山頂→西の原駐車場 1時間46分）', sourceType:'yamap'},
  '樽前山→7合目登山口': {minutes:40, source:'YAMAP標準モデル・樽前山7合目登山口往復（東山山頂→7合目駐車場 40分）', sourceType:'yamap'},
  '後方羊蹄山（羊蹄山）→京極登山口': {minutes:197, source:'YAMAP標準モデル・京極登山口-羊蹄山往復（山頂→京極登山口 3時間17分）', sourceType:'yamap'},
  '岩手山→御神坂登山口': {minutes:211, source:'YAMAP標準モデル・御神坂登山口-岩手山往復（山頂→御神坂駐車場 3時間31分）', sourceType:'yamap'},
  '磐梯山→猪苗代登山口（猪苗代スキー場）': {minutes:166, source:'YAMAP標準モデル・猪苗代登山口-赤埴山-磐梯山往復（山頂→猪苗代登山口 2時間46分）', sourceType:'yamap'},
  '利尻山→沓形登山口': {minutes:240, source:'環境省・利尻山沓形コース参考プラン（下り4時間45分のうち休憩45分を除いた歩行4時間）', sourceType:'official'},
  '斜里岳→清岳荘登山口': {minutes:130, source:'北海道・斜里岳道立自然公園 清里コース新道（下り2時間10分）', sourceType:'official'},
  '早池峰山→小田越登山口': {minutes:129, source:'YAMAP標準モデル・小田越コース（山頂→小田越 2時間09分）', sourceType:'yamap'},
  '蔵王山（熊野岳）→蔵王ロープウェイ地蔵山頂駅': {minutes:35, source:'YAMAP標準モデル・地蔵山頂駅-蔵王山往復（熊野岳→地蔵山頂駅 35分）', sourceType:'yamap'},
  '安達太良山→奥岳登山口・あだたら山ロープウェイ': {minutes:93, source:'YAMAP標準モデル・奥岳-安達太良山往復（山頂→奥岳登山口 1時間33分）', sourceType:'yamap'},
  '四阿山→菅平牧場登山口': {minutes:135, source:'YAMAP標準モデル・四阿山登山口-四阿山往復（山頂→登山口 2時間15分）', sourceType:'yamap'},
  '谷川岳（オキノ耳）→天神平': {minutes:114, source:'YAMAP標準モデル・天神尾根（オキノ耳→登山入口112分＋天神平駅2分）', sourceType:'yamap'},
  '奥白根山（日光白根山）→菅沼登山口': {minutes:79, source:'YAMAP標準モデル・菅沼-弥陀ヶ池-日光白根山往復（山頂→菅沼 1時間19分）', sourceType:'yamap'},
  '赤城山（黒檜山）→黒檜山登山口': {minutes:73, source:'YAMAP標準モデル・黒檜山往復（山頂→黒檜山登山口 1時間13分）', sourceType:'yamap'},
  '櫛形山→池ノ茶屋登山口': {minutes:35, source:'YAMAP標準モデル・池の茶屋林道登山口-櫛形山往復（山頂→駐車場 35分）', sourceType:'yamap'},
  '愛宕山→清滝 愛宕山登山口': {minutes:134, source:'YAMAP標準モデル・愛宕山表参道往復（山頂→表登山道入口 2時間14分）', sourceType:'yamap'},
  '雲仙岳（普賢岳）→仁田峠': {minutes:49, source:'YAMAP標準モデル・普賢岳往復（普賢岳→紅葉茶屋→あざみ谷→仁田峠駐車場 49分）', sourceType:'yamap'},
  '阿蘇高岳→仙酔峡': {minutes:109, source:'YAMAP標準モデル・仙酔峡登山口-中岳-高岳往復（高岳→仙酔峡駐車場 1時間49分）', sourceType:'yamap'},
  '剣山→見ノ越 剣山登山口': {minutes:76, source:'YAMAP標準モデル・見ノ越登山口-剣山往復（山頂→見ノ越 1時間16分）', sourceType:'yamap'},
  '剣山観光登山リフト西島駅→剣山': {minutes:37, source:'YAMAP標準モデル・見ノ越登山口-剣山往復（西島駅→山頂 37分）', sourceType:'yamap'},
  '剣山→剣山観光登山リフト西島駅': {minutes:29, source:'YAMAP標準モデル・見ノ越登山口-剣山往復（山頂→西島駅 29分）', sourceType:'yamap'},
  '鶴見岳→火男火売神社登山口駐車場': {minutes:100, source:'YAMAP標準モデル・火男火売神社-鶴見岳往復（山頂→登山口駐車場 1時間40分）', sourceType:'yamap'},
  '六甲山→有馬温泉 六甲山登山口': {minutes:94, source:'YAMAP標準モデル・六甲山〜有馬温泉（山頂→有馬側登山口 1時間34分）', sourceType:'yamap'}
});

// V1.4.188: user-priority mountains. Replace fallback estimated CT only where a public standard/model time can be tied to the same endpoints.
const V14188_PRIORITY_VERIFIED_COURSE_TIMES = Object.freeze({
  '針ノ木岳→扇沢登山口': {minutes:230, source:'公開登山ガイド・針ノ木岳→針ノ木峠40分→大沢小屋120分→扇沢70分（計3時間50分）', sourceType:'other'},
  '蓮華岳→扇沢登山口': {minutes:255, source:'YAMAP蓮華岳（扇沢）モデル 山頂→針ノ木小屋65分＋公開登山ガイド 針ノ木峠→扇沢190分（計4時間15分）', sourceType:'yamap'},
  '烏帽子岳→高瀬ダム': {minutes:164, source:'公開登山ガイド・烏帽子岳→高瀬ダム 2時間44分', sourceType:'other'},
  '水晶岳（黒岳）→折立登山口': {minutes:680, source:'公開登山ガイド・水晶岳→祖父岳115分→アラスカ庭園115分→薬師沢125分→太郎平145分→折立180分（計11時間20分）', sourceType:'other'},
  '折立登山口→赤牛岳': {minutes:960, source:'山旅旅・折立→雲ノ平→水晶岳→赤牛岳 標準区間合算16時間', sourceType:'other'},
  '笠ヶ岳（岐阜）→新穂高温泉': {minutes:412, source:'YAMAP標準モデル・新穂高温泉〜笠新道〜笠ヶ岳往復の下山区間 6時間52分', sourceType:'yamap'},
  '乗鞍岳→畳平バスターミナル': {minutes:70, source:'信州山学ガイド・剣ヶ峰→畳平 下り1時間10分', sourceType:'other'},
  '御嶽山（剣ヶ峰）→中の湯登山口（黒沢口）': {minutes:170, source:'公開登山ガイド・黒沢口 中の湯〜剣ヶ峰 復路2時間50分', sourceType:'other'},
  '富士山（剣ヶ峰）→富士スバルライン五合目（吉田口）': {minutes:240, source:'富士登山オフィシャルサイト2026 吉田ルート図・剣ヶ峰から五合目まで区間合算4時間', sourceType:'official'},
  '富士山（剣ヶ峰）→須走口五合目': {minutes:245, source:'富士登山オフィシャルサイト2026 須走ルート図・剣ヶ峰から五合目まで区間合算4時間05分', sourceType:'official'},
  '白山（御前峰）→市ノ瀬': {minutes:330, source:'白山観光協会・白山禅定道 室堂→市ノ瀬5時間＋石川県公式 御前峰→室堂30分（計5時間30分）', sourceType:'official'},
  '伊吹山→伊吹山ドライブウェイ山頂駐車場': {minutes:20, source:'伊吹山ドライブウェイ公式・中央登山道 山頂〜駐車場 約20分', sourceType:'official'},
  '藤原岳→孫太尾根登山口': {minutes:150, source:'公共交通アクセス案内・孫太尾根 藤原岳→孫太尾根登山口 2時間30分', sourceType:'other'},
  '御在所岳→中登山道口 御在所岳': {minutes:90, source:'公開登山ガイド・御在所岳 中登山道 下り約1時間30分', sourceType:'other'},
  '御在所岳→武平峠登山口': {minutes:70, source:'YAMAP標準モデル・御在所岳→武平トンネル東登山口 約1時間10分', sourceType:'yamap'},
  '日出ヶ岳→大台ヶ原ビジターセンター': {minutes:28, source:'YAMAP標準モデル・日出ヶ岳→大台ヶ原ビジターセンター28分', sourceType:'yamap'},
  '山上ヶ岳→清浄大橋 大峯山登山口': {minutes:120, source:'ヤマレコ公開記録・山上ヶ岳→大峯大橋 標準区間表示合算2時間', sourceType:'yamareco'},
  '釈迦ヶ岳（奈良）→太尾登山口 釈迦ヶ岳 奈良': {minutes:105, source:'YAMAP標準モデル・釈迦ヶ岳→太尾登山口駐車場 1時間45分', sourceType:'yamap'},
  '金剛山→千早本道登山口': {minutes:99, source:'YAMAP標準モデル・金剛山→千早本道登山口 1時間39分', sourceType:'yamap'},
  '金剛山→水越峠 金剛山': {minutes:106, source:'YAMAP標準モデル・金剛山→水越峠 1時間46分', sourceType:'yamap'},
  '武奈ヶ岳→イン谷口': {minutes:161, source:'YAMAP標準モデル・武奈ヶ岳→イン谷口駐車場 2時間41分', sourceType:'yamap'},
  '大山（弥山）→夏山登山口 大山': {minutes:150, source:'大山登山ホームページ・夏山登山道 山頂→夏山登山口 区間合算2時間30分', sourceType:'official'},
  '大山（弥山）→博労座': {minutes:165, source:'環境省・博労座〜夏山登山口15分＋大山公式 夏山登山道下山150分（計2時間45分）', sourceType:'official'},
  '吾妻山→吾妻山キャンプ場駐車場': {minutes:42, source:'YAMAP標準モデル・吾妻山→吾妻山ロッジ駐車場 42分', sourceType:'yamap'},
  '伊予富士→寒風山登山口': {minutes:150, source:'公開登山ガイド・伊予富士→桑瀬峠90分→寒風山登山口60分（計2時間30分）', sourceType:'other'},
  '瓶ヶ森→瓶ヶ森駐車場': {minutes:35, source:'YAMAP標準モデル・瓶ヶ森→男山→登山口→駐車場 35分', sourceType:'yamap'},
  '英彦山→別所駐車場・英彦山登山口': {minutes:132, source:'YAMAP標準モデル・英彦山（南岳）→別所駐車場 2時間12分', sourceType:'yamap'},
  '英彦山→豊前坊・高住神社登山口': {minutes:114, source:'YAMAP標準モデル・英彦山（南岳）→北岳→豊前坊駐車場 1時間54分', sourceType:'yamap'},
  '多良岳→黒木第2駐車場・黒木登山口': {minutes:119, source:'YAMAP標準モデル・多良岳→黒木第2駐車場 1時間59分', sourceType:'yamap'},
  '多良岳→中山キャンプ場（中山登山口）': {minutes:71, source:'YAMAP標準モデル・多良岳→中山キャンプ場登山口 1時間11分', sourceType:'yamap'},
  '祖母山→神原登山口': {minutes:175, source:'YAMAP標準モデル・祖母山→神原登山口 2時間55分', sourceType:'yamap'},
  '傾山→九折登山口 傾山': {minutes:253, source:'YAMAP標準モデル・傾山→九折登山口駐車場（九折越経由）4時間13分', sourceType:'yamap'},
  '大崩山→祝子川 大崩山登山口': {minutes:200, source:'YAMAP標準モデル・坊主尾根コース 大崩山→大崩山登山口 3時間20分', sourceType:'yamap'},
  '霧島山（韓国岳）→大浪池登山口': {minutes:89, source:'YAMAP標準モデル・韓国岳→大浪池登山口 1時間29分', sourceType:'yamap'},
  '笊ヶ岳→老平・笊ヶ岳登山口': {minutes:353, source:'YAMAP標準モデル・笊ヶ岳（老平） 山頂→老平登山口 5時間53分', sourceType:'yamap'}
});



// V1.5.43: 5:00-5:59 review. Prefer current official totals and expose verified intermediate points where already available.
const V1543_LONG_ROUTE_REVIEW_COURSE_TIMES = Object.freeze({
  // Shiretoko Rausu-dake: current official visitor-center course time.
  '岩尾別温泉・木下小屋登山口→羅臼岳': {minutes:300, source:'知床羅臼ビジターセンター・岩尾別コース 登り5時間', sourceType:'official'},
  '羅臼岳→岩尾別温泉・木下小屋登山口': {minutes:240, source:'知床羅臼ビジターセンター・岩尾別コース 下り4時間', sourceType:'official'}
});

// V1.5.42: split 6:00-7:59 representative-route CTs at verified practical waypoints.
// Values use already-confirmed source data or public checkpoint timings; no guessed CTs are introduced.
const V1542_LONG_ROUTE_SPLIT_COURSE_TIMES = Object.freeze({
  // 常念岳 三股: existing verified YAMAP checkpoint CTs.
  '三股登山口→前常念岳': {minutes:270, source:'YAMAPモデルコース・三股-常念岳（05:15→09:45）', sourceType:'yamap'},
  '前常念岳→常念岳': {minutes:80, source:'YAMAPモデルコース・常念岳（三股）（前常念岳09:45→常念岳11:05）', sourceType:'yamap'},

  // 爺ヶ岳 扇沢: Montbell route decomposition via 種池山荘.
  '種池山荘→爺ヶ岳': {minutes:60, source:'モンベル・種池山荘→爺ヶ岳南峰45分→中峰15分', sourceType:'official'},
  '種池山荘→扇沢登山口': {minutes:180, source:'白馬村公式観光サイト・種池山荘→扇沢 3時間（登山口表記統一）', sourceType:'official'},

  // 鹿島槍ヶ岳 大谷原: YAMAP model checkpoints + existing verified 冷池→鹿島槍.
  '大谷原登山口→高千穂平': {minutes:305, source:'YAMAP標準モデル・大谷原側駐車場05:01→高千穂平10:06 5時間05分', sourceType:'yamap'},
  '高千穂平→冷池山荘': {minutes:25, source:'YAMAP標準モデル・高千穂平→冷乗越→冷池山荘 約25分', sourceType:'yamap'},

  // 針ノ木岳: Montbell guide via 大沢小屋 and 針ノ木小屋.
  '扇沢登山口→大沢小屋': {minutes:70, source:'モンベル・扇沢→大沢小屋 1時間10分', sourceType:'official'},
  '大沢小屋→針ノ木小屋': {minutes:220, source:'モンベル・大沢小屋→雪渓入口1時間 + 雪渓入口→針ノ木峠2時間40分', sourceType:'official'},
  '針ノ木小屋→針ノ木岳': {minutes:60, source:'モンベル・針ノ木峠（針ノ木小屋）→針ノ木岳 約1時間', sourceType:'official'},
  '針ノ木岳→針ノ木小屋': {minutes:40, source:'モンベル・針ノ木岳→針ノ木峠 約40分', sourceType:'official'},
  '針ノ木小屋→大沢小屋': {minutes:135, source:'モンベル・針ノ木峠→大沢小屋 約2時間15分', sourceType:'official'},
  '大沢小屋→扇沢登山口': {minutes:60, source:'モンベル・大沢小屋→扇沢 約1時間', sourceType:'official'},

  // 雲取山 鴨沢: current YAMAP model checkpoints via 七ツ石小屋.
  '鴨沢登山口→七ツ石小屋': {minutes:220, source:'YAMAP標準モデル・鴨沢06:00→七ツ石小屋09:40 3時間40分', sourceType:'yamap'},
  '七ツ石小屋→雲取山': {minutes:142, source:'YAMAP標準モデル・七ツ石小屋09:40→雲取山12:02 2時間22分', sourceType:'yamap'},

  // 折立 corridor: expose 太郎平小屋 instead of opaque 6:50 composed segment.
  '折立登山口→太郎平小屋': {minutes:270, source:'薬師岳山荘公式・折立登山口→太郎平小屋 4時間30分', sourceType:'official'},
  '太郎平小屋→薬師沢小屋': {minutes:140, source:'雲ノ平山荘公式・太郎平小屋→薬師沢小屋 2時間20分', sourceType:'official'},
  '薬師沢小屋→太郎平小屋': {minutes:141, source:'ヤマレコ公開山行計画・薬師沢小屋→太郎平小屋 141分', sourceType:'yamareco'},
  '太郎平小屋→折立登山口': {minutes:210, source:'薬師岳山荘公式・太郎平小屋→折立登山口 3時間30分', sourceType:'official'},

  // 中ノ岳 十字峡: YAMAP checkpoint at 日向山.
  '十字峡登山センター→日向山': {minutes:220, source:'YAMAP標準モデル・十字峡側起点05:00→日向山08:40 3時間40分', sourceType:'yamap'},
  '日向山→中ノ岳': {minutes:131, source:'YAMAP標準モデル・日向山08:40→中ノ岳10:51 2時間11分', sourceType:'yamap'},

  // 農鳥岳 大門沢下山: official reference-time decomposition.
  '農鳥岳→大門沢小屋': {minutes:210, source:'南アルプス市芦安山岳館・農鳥岳→大門沢下降点30分 + 大門沢小屋3時間', sourceType:'official'},
  '大門沢小屋→奈良田': {minutes:220, source:'南アルプス市芦安山岳館・大門沢小屋→奈良田第一発電所3時間 + 奈良田バス終点まで約40分', sourceType:'official'},

  // 白山 市ノ瀬・白山禅定道: official hut split preserves the verified 7:50 total.
  '市ノ瀬→白山室堂': {minutes:430, source:'白山観光協会・白山禅定道 市ノ瀬→白山室堂 7時間10分', sourceType:'official'},
  '白山室堂→市ノ瀬': {minutes:300, source:'白山観光協会・白山禅定道 白山室堂→市ノ瀬 5時間00分', sourceType:'official'},

  // 以東岳: 鶴岡市 current official route information via 大鳥小屋.
  '泡滝ダム・大鳥登山口→大鳥小屋': {minutes:150, source:'鶴岡市公式・泡滝ダム→大鳥池小屋 150分', sourceType:'official'},
  '大鳥小屋→以東岳': {minutes:210, source:'鶴岡市公式・大鳥池小屋→以東岳小屋（直登コース）210分', sourceType:'official'},
  '以東岳→大鳥小屋': {minutes:140, source:'鶴岡市公式・以東岳小屋→大鳥池小屋（直登コース）140分', sourceType:'official'},
  '大鳥小屋→泡滝ダム・大鳥登山口': {minutes:120, source:'鶴岡市公式・大鳥池小屋→泡滝ダム 120分', sourceType:'official'},

  // 八海山 屏風道: current YAMAP model checkpoints via 千本檜小屋; return follows model loop.
  '八海山・屏風道二合目登山口→八海山千本檜小屋': {minutes:265, source:'YAMAP標準モデル・屏風道二合目06:00→千本桧小屋10:25 4時間25分', sourceType:'yamap'},
  '八海山千本檜小屋→八海山（入道岳）': {minutes:120, source:'YAMAP標準モデル・千本桧小屋10:25→入道岳12:25 2時間00分', sourceType:'yamap'},
  '八海山（入道岳）→八海山千本檜小屋': {minutes:50, source:'YAMAP標準モデル・入道岳12:25→千本桧小屋13:15 50分', sourceType:'yamap'},
  '八海山千本檜小屋→八海山・屏風道二合目登山口': {minutes:155, source:'YAMAP標準モデル・千本桧小屋13:15→屏風道二合目15:50 2時間35分', sourceType:'yamap'}
});

// V1.5.41: split 8:00-9:59 representative-route CTs at verified practical waypoints.
// Values are direct public model/official values or explicit differences from an already verified total.
const V1541_LONG_ROUTE_SPLIT_COURSE_TIMES = Object.freeze({
  // オプタテシケ山: YAMAP model checkpoints, 8:00 total preserved.
  '美瑛富士登山口→美瑛富士避難小屋': {minutes:205, source:'YAMAP標準モデル・美瑛富士登山口→天然庭園→美瑛富士避難小屋 3時間25分', sourceType:'yamap'},
  '美瑛富士避難小屋→オプタテシケ山': {minutes:275, source:'既存確認済み8時間00分から美瑛富士登山口→避難小屋205分を差し引いた区間CT', sourceType:'derived-verified'},

  // 幌尻岳 新冠陽希コース下山: summit -> hut -> parking.
  '幌尻岳→新冠ポロシリ山荘': {minutes:180, source:'YAMAP公開山行記録・幌尻岳→新冠ポロシリ山荘 約3時間', sourceType:'yamap'},
  '新冠ポロシリ山荘→イドンナップ山荘駐車場（新冠陽希コース）': {minutes:397, source:'YAMAP標準モデル・新冠ポロシリ山荘→イドンナップ山荘登山口 6時間37分', sourceType:'yamap'},

  // 大朝日岳 日暮沢・竜門側: public route record split at 竜門小屋.
  '日暮沢登山口駐車場（日暮沢小屋）→竜門小屋': {minutes:367, source:'ヤマレコ公開山行記録・日暮沢小屋09:18→竜門山避難小屋15:25 6時間07分', sourceType:'yamareco'},
  '竜門小屋→大朝日岳': {minutes:185, source:'公開山行記録・竜門小屋06:25→大朝日岳09:30 3時間05分', sourceType:'other'},

  // 皇海山: YAMAP 8:03 model split at 庚申山荘.
  '銀山平・皇海山登山者駐車場→庚申山荘（避難小屋）': {minutes:201, source:'YAMAP標準モデル・銀山平駐車場→一の鳥居→庚申山荘 3時間21分', sourceType:'yamap'},
  '庚申山荘（避難小屋）→皇海山': {minutes:282, source:'YAMAP標準モデル・既存8時間03分から銀山平→庚申山荘201分を差し引いた区間CT', sourceType:'derived-verified'},

  // 鹿島槍ヶ岳 扇沢: Montbell course guide split at 種池・冷池.
  '扇沢登山口→種池山荘': {minutes:240, source:'モンベル・鹿島槍ヶ岳コースタイム目安 扇沢出合登山口→種池山荘 4時間', sourceType:'official'},
  '種池山荘→冷池山荘': {minutes:135, source:'モンベル・種池山荘→爺ヶ岳南峰45分→中峰15分→冷池山荘1時間15分', sourceType:'official'},
  '冷池山荘→鹿島槍ヶ岳': {minutes:105, source:'モンベル・冷池山荘→布引山1時間→鹿島槍ヶ岳南峰45分', sourceType:'official'},

  // 笠ヶ岳 笠新道: YAMAP model split at 笠新道登山口 / 笠ヶ岳山荘.
  '新穂高温泉→笠新道登山口': {minutes:64, source:'YAMAP標準モデル・新穂高温泉04:00→笠ヶ岳・双六岳・わさび平登山道入口05:04', sourceType:'yamap'},
  '笠新道登山口→笠ヶ岳山荘': {minutes:420, source:'笠新道登山口案内板・笠ヶ岳山荘まで約7時間', sourceType:'other'},

  // 霞沢岳: YAMAP total 8:32 split at 徳本峠小屋.
  '上高地→徳本峠小屋': {minutes:189, source:'YAMAP標準モデル・上高地→徳本峠小屋 3時間09分', sourceType:'yamap'},
  '徳本峠小屋→霞沢岳': {minutes:323, source:'既存確認済み8時間32分から上高地→徳本峠小屋189分を差し引いた区間CT', sourceType:'derived-verified'},
  '霞沢岳→徳本峠小屋': {minutes:198, source:'YAMAP標準モデル・霞沢岳10:23→徳本峠小屋13:41 3時間18分', sourceType:'yamap'},
  '徳本峠小屋→上高地': {minutes:162, source:'YAMAP標準モデル・徳本峠小屋13:41→上高地16:23 2時間42分', sourceType:'yamap'},

  // 安平路山: YAMAP standard checkpoints, split at 摺古木自然園入口.
  '大平宿（林道規制時起点）→摺古木自然園入口': {minutes:190, source:'YAMAP標準モデル・大平宿→ゲート70分→摺古木自然園休憩舎120分', sourceType:'yamap'},
  '摺古木自然園入口→安平路山': {minutes:280, source:'YAMAP標準モデル・摺古木自然園休憩舎→安平路山 4時間40分', sourceType:'yamap'},
  '安平路山→摺古木自然園入口': {minutes:210, source:'YAMAP標準モデル・安平路山→避難小屋35分→白ビソ山60分→摺古木山25分→直登分岐50分→休憩舎90分', sourceType:'yamap'},
  '摺古木自然園入口→大平宿（林道規制時起点）': {minutes:100, source:'YAMAP標準モデル・摺古木自然園休憩舎→ゲート50分→大平宿50分', sourceType:'yamap'},

  // 富士山 御殿場ルート: YAMAP model split at わらじ館.
  '御殿場口新五合目→わらじ館': {minutes:327, source:'YAMAP御殿場ルート・新五合目04:00→わらじ館09:27 5時間27分', sourceType:'yamap'},
  'わらじ館→富士山（剣ヶ峰）': {minutes:176, source:'YAMAP御殿場ルート・わらじ館09:27→剣ヶ峰12:23 2時間56分', sourceType:'yamap'},
  '富士山（剣ヶ峰）→わらじ館': {minutes:113, source:'YAMAP御殿場ルート・剣ヶ峰12:23→わらじ館14:16 1時間53分', sourceType:'yamap'},
  'わらじ館→御殿場口新五合目': {minutes:130, source:'YAMAP御殿場ルート・わらじ館14:16→新五合目16:26 2時間10分', sourceType:'yamap'},

  // 農鳥岳 大門沢: YAMAP model split at 大門沢小屋.
  '奈良田→大門沢小屋': {minutes:256, source:'YAMAP標準モデル・奈良田04:00→大門沢小屋08:16相当 4時間16分', sourceType:'yamap'},
  '大門沢小屋→農鳥岳': {minutes:273, source:'既存確認済み8時間49分から奈良田→大門沢小屋256分を差し引いた区間CT', sourceType:'derived-verified'},

  // 聖岳: existing verified total + existing verified hut->summit CT.
  '椹島→聖平小屋': {minutes:321, source:'既存確認済み椹島→聖岳500分から聖平小屋→聖岳179分を差し引いた区間CT', sourceType:'derived-verified'},

  // 上河内岳: existing verified total + official 茶臼小屋→上河内岳 120分.
  '沼平ゲート→茶臼小屋': {minutes:398, source:'既存確認済み沼平ゲート→上河内岳518分から茶臼小屋→上河内岳120分を差し引いた区間CT', sourceType:'derived-verified'},

  // 光岳 下山: existing verified 光岳→茶臼小屋 268分; preserve existing 8:30 total as sections.
  '茶臼小屋→沼平ゲート': {minutes:242, source:'既存確認済み光岳→沼平ゲート510分から光岳→茶臼小屋268分を差し引いた区間CT', sourceType:'derived-verified'},

  // 笊ヶ岳: current YAMAP model shows the old 8:55 direct value was too short.
  // Expose 布引山 and preserve the current public model checkpoints instead of hiding the long approach.
  '老平・笊ヶ岳登山口→布引山（千挺木山）': {minutes:535, source:'YAMAP 笊ヶ岳（老平）モデル・老平登山口04:03→布引山12:58 8時間55分', sourceType:'yamap'},
  '布引山（千挺木山）→笊ヶ岳': {minutes:70, source:'YAMAP 笊ヶ岳（老平）モデル・布引山12:58→笊ヶ岳14:08 1時間10分', sourceType:'yamap'}
});

// V1.5.40: split verified 10h+ representative routes into practical sections.
// Long totals are not displayed as one opaque segment; confirmed huts/waypoints become route points.
const V1540_LONG_ROUTE_SPLIT_COURSE_TIMES = Object.freeze({
  // 幌尻岳 新冠陽希コース: existing YAMAP model total 11:15 = 6:57 + 4:18.
  'イドンナップ山荘駐車場（新冠陽希コース）→新冠ポロシリ山荘': {minutes:417, source:'YAMAP標準モデル・イドンナップ山荘登山口→奥新冠ダム/新冠ポロシリ山荘 6時間57分', sourceType:'yamap'},
  '新冠ポロシリ山荘→幌尻岳': {minutes:258, source:'YAMAP標準モデル・新冠ポロシリ山荘→幌尻岳 4時間18分', sourceType:'yamap'},

  // ペテガリ岳: 新ひだか町公式の一般ルート案内。
  '神威山荘（ペテガリ岳アプローチ起点）→ペテガリ山荘': {minutes:300, source:'新ひだか町公式・神威山荘→ペテガリ山荘 約5時間', sourceType:'official'},
  'ペテガリ山荘→ペテガリ岳': {minutes:390, source:'新ひだか町公式・ペテガリ山荘→ペテガリ岳 約6時間30分', sourceType:'official'},
  'ペテガリ岳→ペテガリ山荘': {minutes:300, source:'新ひだか町公式・ペテガリ岳→ペテガリ山荘 約5時間', sourceType:'official'},
  'ペテガリ山荘→神威山荘（ペテガリ岳アプローチ起点）': {minutes:300, source:'新ひだか町公式・ペテガリ山荘→神威山荘 約5時間', sourceType:'official'},

  // 飯豊山 大日杉: existing verified total source explicitly provides 445 + 163 minutes.
  '大日杉登山口→切合小屋': {minutes:445, source:'ヤマレコ・飯豊連峰縦走 p5526848（大日杉登山小屋→切合小屋 445分）', sourceType:'yamareco'},
  '切合小屋→飯豊山': {minutes:163, source:'ヤマレコ・飯豊連峰縦走 p5526848（切合小屋→飯豊山 163分）', sourceType:'yamareco'},

  // 折立〜水晶岳: verified total 12:30, split at 薬師沢・雲ノ平.
  '折立登山口→薬師沢小屋': {minutes:410, source:'確認済み区間合算・折立→太郎平小屋 270分 + 太郎平小屋→薬師沢小屋 140分', sourceType:'composed-verified'},
  '雲ノ平山荘→水晶岳': {minutes:145, source:'公開登山ガイド・折立→水晶岳 12時間30分から確認済み折立→雲ノ平区間を差し引いた区間CT', sourceType:'derived-verified'},
  '水晶岳→雲ノ平山荘': {minutes:232, source:'公開登山ガイド・水晶岳→折立 11時間20分から確認済み雲ノ平→折立区間を差し引いた区間CT', sourceType:'derived-verified'},
  '薬師沢小屋→折立登山口': {minutes:351, source:'確認済み区間合算・薬師沢小屋→太郎平小屋 141分 + 太郎平小屋→折立 210分', sourceType:'composed-verified'},

  // 折立〜鷲羽岳: same corridor; preserve verified 14:40 outbound total while exposing useful sections.
  '雲ノ平山荘→鷲羽岳': {minutes:275, source:'公開登山ガイド・折立→鷲羽岳 14時間40分から確認済み折立→雲ノ平区間を差し引いた区間CT', sourceType:'derived-verified'},
  '鷲羽岳→雲ノ平山荘': {minutes:211, source:'確認済み区間合算・鷲羽岳→三俣山荘 51分 + 三俣山荘→雲ノ平山荘 160分', sourceType:'composed-verified'},

  // 折立〜赤牛岳: 水晶岳を通過点にして長大な直結CTを分割。
  // 折立→薬師沢、雲ノ平→水晶は上の水晶岳ルートと同じ確認済み区間を共用する。
  '水晶岳→赤牛岳': {minutes:170, source:'山旅旅・水晶岳→温泉沢ノ頭 50分 + 温泉沢ノ頭→赤牛岳 2時間', sourceType:'other'},
  '赤牛岳→水晶岳': {minutes:201, source:'ヤマレコ公開山行計画・赤牛岳→温泉沢ノ頭→水晶岳 201分', sourceType:'yamareco'},

  // 南駒ヶ岳: existing YAMAP total 10:27; 越百山で分割。
  '越百山→南駒ヶ岳': {minutes:230, source:'YAMAP標準モデル・伊奈川ダム上→南駒ヶ岳 627分から伊奈川ダム上→越百山 397分を差し引いた区間CT', sourceType:'derived-verified'},

  // 光岳: existing YAMAP total 11:25; 茶臼岳で分割。
  '茶臼岳→光岳': {minutes:245, source:'YAMAP・沼平ゲート→光岳 685分から沼平ゲート→茶臼岳 440分を差し引いた区間CT', sourceType:'derived-verified'}
});

// V1.5.39: mountain-hut CT corrections and verified Ontake hut links.
// Direct verified CT must win over graph composition. Do not infer missing local hut times.
const V1539_HUT_CT_CORRECTIONS = Object.freeze({
  '朝日岳（新潟・富山）→朝日小屋': {minutes:50, source:'朝日小屋公式・北又コース（朝日岳→朝日小屋 50分）', sourceType:'official'},
  '朝日小屋→朝日岳（新潟・富山）': {minutes:60, source:'朝日小屋公式・北又コース（朝日小屋→朝日岳 1時間）', sourceType:'official'},

  '女人堂→御嶽山（剣ヶ峰）': {minutes:150, source:'長野県山小屋情報ポータル・女人堂から剣ヶ峰頂上まで約2時間30分', sourceType:'official'},
  '御嶽山（剣ヶ峰）→女人堂': {minutes:90, source:'御嶽山トレッキング黒沢口・剣ヶ峰→女人堂 約1時間30分', sourceType:'other'},
  '石室山荘→御嶽山（剣ヶ峰）': {minutes:40, source:'御嶽山トレッキング黒沢口・石室山荘上部から剣ヶ峰 約40分', sourceType:'other'},
  '御嶽山（剣ヶ峰）→石室山荘': {minutes:45, source:'公開山行記録・剣ヶ峰→石室山荘 約45分（複数記録照合）', sourceType:'other'},
  '二の池ヒュッテ→御嶽山（剣ヶ峰）': {minutes:15, source:'長野県山小屋情報ポータル・二の池ヒュッテは剣ヶ峰より15分程度', sourceType:'official'},
  '御嶽山（剣ヶ峰）→二の池ヒュッテ': {minutes:15, source:'長野県山小屋情報ポータル・二の池ヒュッテは剣ヶ峰より15分程度', sourceType:'official'},
  '五の池小屋→御嶽山（剣ヶ峰）': {minutes:120, source:'御嶽山トレッキング飛騨頂上・五の池小屋→剣ヶ峰 約2時間', sourceType:'other'},
  '御嶽山（剣ヶ峰）→五の池小屋': {minutes:90, source:'御嶽山トレッキング飛騨頂上・剣ヶ峰→五の池小屋 約1時間30分', sourceType:'other'},
  '田の原登山口→二の池ヒュッテ': {minutes:220, source:'二の池ヒュッテ公式・田ノ原口から剣ヶ峰経由 約3時間40分', sourceType:'official'},
  '笠ヶ岳山荘→笠ヶ岳（岐阜）': {minutes:20, source:'飛騨高山旅ガイド・笠ヶ岳山荘→笠ヶ岳 20分', sourceType:'official'},
  '笠ヶ岳（岐阜）→笠ヶ岳山荘': {minutes:15, source:'公開コース案内・笠ヶ岳→笠ヶ岳山荘 15分', sourceType:'other'},
  '笠ヶ岳山荘→笠ヶ岳': {minutes:20, source:'飛騨高山旅ガイド・笠ヶ岳山荘→笠ヶ岳 20分', sourceType:'official'},
  '笠ヶ岳→笠ヶ岳山荘': {minutes:15, source:'公開コース案内・笠ヶ岳→笠ヶ岳山荘 15分', sourceType:'other'}
});



// V1.5.46: Alpine network reverse-direction gaps exposed by explicit area audit.
// Only published standard/model CTs for the same endpoints are registered.
const V1546_ALPS_NETWORK_COURSE_TIMES = Object.freeze({
  '槍沢ロッヂ→横尾': {minutes:80, source:'YAMA HACK・槍ヶ岳上高地ルート（槍沢ロッヂ→一ノ俣30分＋一ノ俣→横尾50分、2026-08-30確認）', sourceType:'other'},
  '大天荘→燕山荘': {minutes:220, source:'YAMA HACK・大天井岳表銀座コース（大天荘→喜作レリーフ20分→大下りノ頭120分→燕山荘80分、2026-08-30確認）', sourceType:'other'},
  '常念小屋→大天井岳': {minutes:210, source:'常念小屋公式・常念小屋→大天井岳（大天荘）約3時間30分（2026-08-30確認）', sourceType:'official'},
  '杓子岳→白馬山荘': {minutes:90, source:'白馬館公式・白馬岳〜唐松岳縦走（逆方向区間：杓子岳→白馬岳頂上宿舎70分＋頂上宿舎→白馬山荘20分）', sourceType:'official'},
  '白馬鑓ヶ岳→杓子岳': {minutes:40, source:'白馬館公式・白馬岳〜唐松岳縦走（白馬鑓ヶ岳→杓子岳 40分）', sourceType:'official'},
  '天狗山荘→白馬鑓ヶ岳': {minutes:70, source:'白馬館公式・白馬岳〜唐松岳縦走（天狗山荘→分岐30分＋分岐→白馬鑓ヶ岳40分）', sourceType:'official'},
  '不帰キレット→天狗山荘': {minutes:150, source:'白馬館公式・白馬岳〜唐松岳縦走（不帰キレット→天狗山荘 2時間30分）', sourceType:'official'},
  '唐松岳→不帰キレット': {minutes:150, source:'白馬館公式・白馬岳〜唐松岳縦走（唐松岳→不帰キレット 2時間30分）', sourceType:'official'},
  'キレット小屋→五竜岳': {minutes:250, source:'日本アルプス登山ルートガイド・八峰キレット小屋→五竜岳 4時間10分（2026-08-30確認）', sourceType:'other'},
  '鹿島槍ヶ岳→キレット小屋': {minutes:140, source:'日本アルプス登山ルートガイド・鹿島槍ヶ岳南峰→八峰キレット小屋 2時間20分（2026-08-30確認）', sourceType:'other'},
  '爺ヶ岳→冷池山荘': {minutes:75, source:'モンベル・鹿島槍ヶ岳コース案内（爺ヶ岳中峰→冷池山荘 1時間15分、2026-08-30確認）', sourceType:'official'},
  '乗越浄土→中岳（中央アルプス）': {minutes:20, source:'中央アルプス駒ヶ岳ロープウェイ公式・千畳敷〜木曽駒ヶ岳コース（乗越浄土→中岳 20分）', sourceType:'official'},
  '中岳（中央アルプス）→乗越浄土': {minutes:20, source:'中央アルプス駒ヶ岳ロープウェイ公式・千畳敷〜木曽駒ヶ岳コース（中岳→乗越浄土 20分）', sourceType:'official'},
  '中岳（中央アルプス）→木曽駒ヶ岳': {minutes:40, source:'中央アルプス駒ヶ岳ロープウェイ公式・千畳敷〜木曽駒ヶ岳コース（中岳→木曽駒ヶ岳 40分）', sourceType:'official'},
  '木曽駒ヶ岳→中岳（中央アルプス）': {minutes:40, source:'中央アルプス駒ヶ岳ロープウェイ公式・千畳敷〜木曽駒ヶ岳コース（木曽駒ヶ岳→中岳 40分）', sourceType:'official'},
  '千畳敷→極楽平': {minutes:40, source:'中央アルプス檜尾小屋公式・千畳敷駅→極楽平 40分', sourceType:'official'},
  '極楽平→千畳敷': {minutes:30, source:'中央アルプス檜尾小屋公式・極楽平→千畳敷 30分', sourceType:'official'},
  '極楽平→濁沢大峰': {minutes:90, source:'中央アルプス檜尾小屋公式・極楽平→濁沢大峰 1時間30分', sourceType:'official'},
  '濁沢大峰→極楽平': {minutes:90, source:'中央アルプス檜尾小屋公式・濁沢大峰→極楽平 1時間30分', sourceType:'official'},
  '濁沢大峰→檜尾岳': {minutes:90, source:'中央アルプス檜尾小屋公式・濁沢大峰→檜尾岳 1時間30分', sourceType:'official'},
  '檜尾岳→濁沢大峰': {minutes:60, source:'中央アルプス檜尾小屋公式・檜尾岳→濁沢大峰 1時間', sourceType:'official'},
  '極楽平→宝剣岳': {minutes:50, source:'日本アルプス登山ルートガイド・宝剣岳ルートマップ（極楽平→宝剣岳 50分、2026-08-30確認）', sourceType:'other'},
  '宝剣岳→極楽平': {minutes:45, source:'公開山行記録・中央アルプス縦走区間表（宝剣岳→極楽平 45分、2026-08-30確認）', sourceType:'other'},
  '椹島→聖沢登山口': {minutes:50, source:'YAMA HACK・赤石岳/聖岳縦走コース（椹島→聖沢登山口 50分、2026-08-30確認）', sourceType:'other'},
  '聖沢登山口→椹島': {minutes:52, source:'ヤマレコ公開山行計画・聖平〜椹島（聖沢登山口→牛首峠46分＋牛首峠→椹島6分、2026-08-30確認）', sourceType:'yamareco'},
  '聖沢登山口→聖沢吊橋': {minutes:95, source:'YAMA HACK・赤石岳/聖岳縦走コース（聖沢登山口→出会所小屋跡45分＋聖沢吊橋50分）', sourceType:'other'},
  '聖沢吊橋→聖沢登山口': {minutes:91, source:'ヤマレコ公開山行計画・聖平〜椹島（聖沢吊橋→小会所小屋跡62分＋聖沢登山口29分）', sourceType:'yamareco'},
  '聖沢吊橋→造林小屋跡': {minutes:70, source:'YAMA HACK・赤石岳/聖岳縦走コース（聖沢吊橋→造林小屋跡 70分）', sourceType:'other'},
  '造林小屋跡→聖沢吊橋': {minutes:43, source:'ヤマレコ公開山行計画・聖平〜椹島（造林小屋跡→聖沢吊橋 43分）', sourceType:'yamareco'},
  '造林小屋跡→乗越（聖岳）': {minutes:55, source:'YAMA HACK・赤石岳/聖岳縦走コース（造林小屋跡→乗越 55分）', sourceType:'other'},
  '乗越（聖岳）→造林小屋跡': {minutes:34, source:'ヤマレコ公開山行計画・聖平〜椹島（乗越→造林小屋跡 34分）', sourceType:'yamareco'},
  '乗越（聖岳）→岩頭滝見台': {minutes:65, source:'YAMA HACK・赤石岳/聖岳縦走コース（乗越→岩頭滝見台 65分）', sourceType:'other'},
  '岩頭滝見台→乗越（聖岳）': {minutes:50, source:'ヤマレコ公開山行計画・聖平〜椹島（岩頭滝見台→乗越 50分）', sourceType:'yamareco'},
  '岩頭滝見台→せせらぎ（聖岳）': {minutes:40, source:'YAMA HACK・赤石岳/聖岳縦走コース（岩頭滝見台→せせらぎ 40分）', sourceType:'other'},
  'せせらぎ（聖岳）→岩頭滝見台': {minutes:35, source:'ヤマレコ公開山行計画・聖平〜椹島（せせらぎ→岩頭滝見台 35分）', sourceType:'yamareco'},
  'せせらぎ（聖岳）→聖平小屋': {minutes:45, source:'YAMA HACK・赤石岳/聖岳縦走コース（せせらぎ→聖平小屋 45分）', sourceType:'other'},
  '聖平小屋→せせらぎ（聖岳）': {minutes:28, source:'ヤマレコ公開山行計画・聖平〜椹島（聖平小屋→せせらぎ 28分）', sourceType:'yamareco'},
});

// V1.5.45: first mountain-area network CT pass (Kuju core network).
// These are adjacent major trail checkpoints, not representative-route totals.
// Only published directional CTs tied to the same named endpoints are registered.
const V1545_AREA_NETWORK_COURSE_TIMES = Object.freeze({
  '長者原→雨ヶ池越': {minutes:108, source:'YAMAPモデルコース・長者原ビジターセンター駐車場→雨ヶ池越 1時間48分（2026-08-30確認）', sourceType:'yamap'},
  '雨ヶ池越→長者原': {minutes:80, source:'日本山岳会・親子で楽しむ山登り 東九州「長者原～坊ガツル」逆コース（雨ヶ池越→長者原 1時間20分）', sourceType:'other'},
  '雨ヶ池越→坊ガツル': {minutes:60, source:'日本山岳会・親子で楽しむ山登り 東九州「長者原～坊ガツル」（雨ヶ池越→坊ガツル 1時間）', sourceType:'other'},
  '坊ガツル→雨ヶ池越': {minutes:80, source:'日本山岳会・親子で楽しむ山登り 東九州「長者原～坊ガツル」逆コース（坊ガツル→雨ヶ池越 1時間20分）', sourceType:'other'},
  '坊ガツル→法華院温泉山荘': {minutes:20, source:'日本山岳会・親子で楽しむ山登り 東九州「長者原～坊ガツル」（坊ガツル→法華院温泉 20分）', sourceType:'other'},
  '法華院温泉山荘→坊ガツル': {minutes:15, source:'日本山岳会・親子で楽しむ山登り 東九州「長者原～坊ガツル」逆コース（法華院温泉→坊ガツル 15分）', sourceType:'other'},
  '法華院温泉山荘→諏蛾守越': {minutes:50, source:'日本山岳会・親子で楽しむ山登り 東九州「長者原～坊ガツル」（法華院温泉→すがもり越 50分）', sourceType:'other'},
  '諏蛾守越→法華院温泉山荘': {minutes:40, source:'日本山岳会・親子で楽しむ山登り 東九州「長者原～坊ガツル」逆コース（すがもり越→法華院温泉 40分）', sourceType:'other'},
  '長者原→砂防ダム': {minutes:30, source:'日本山岳会・親子で楽しむ山登り 東九州「長者原～坊ガツル」逆コース（長者原→砂防ダム 30分）', sourceType:'other'},
  '砂防ダム→長者原': {minutes:30, source:'日本山岳会・親子で楽しむ山登り 東九州「長者原～坊ガツル」（砂防ダム→長者原 30分）', sourceType:'other'},
  '砂防ダム→諏蛾守越': {minutes:60, source:'日本山岳会・親子で楽しむ山登り 東九州「長者原～坊ガツル」逆コース（砂防ダム→すがもり越 60分）', sourceType:'other'},
  '諏蛾守越→砂防ダム': {minutes:50, source:'日本山岳会・親子で楽しむ山登り 東九州「長者原～坊ガツル」（すがもり越→砂防ダム 50分）', sourceType:'other'},
  '諏蛾守越→久住分かれ避難小屋': {minutes:60, source:'YAMAPモデルコース・諏蛾守越→久住分れ 1時間（2026-08-30確認）', sourceType:'yamap'},
  '久住分かれ避難小屋→諏蛾守越': {minutes:45, source:'YAMAPモデルコース・久住分れ→諏蛾守越 45分（2026-08-30確認）', sourceType:'yamap'},
  '坊ガツル→段原': {minutes:75, source:'好日山荘マウンテンリサーチ・坊ガツル→段原 75分', sourceType:'other'},
  '段原→坊ガツル': {minutes:55, source:'好日山荘マウンテンリサーチ・段原→坊ガツル 55分', sourceType:'other'},
  '段原→大船山': {minutes:20, source:'好日山荘マウンテンリサーチ・段原→大船山 20分', sourceType:'other'},
  '大船山→段原': {minutes:20, source:'好日山荘マウンテンリサーチ・大船山→段原 20分', sourceType:'other'},
  '羅臼岳→羅臼温泉登山口': {minutes:270, source:'知床羅臼ビジターセンター公式・羅臼温泉コース 下り4.5時間（2026-08-30確認）', sourceType:'official'},
  'トムラウシ温泉登山口（東大雪荘）→トムラウシ山': {minutes:385, source:'ヤマレコ公開記録・らくルート標準CT区間合計 385分（2026-08-30確認）', sourceType:'yamareco'},
  'トムラウシ山→トムラウシ温泉登山口（東大雪荘）': {minutes:302, source:'ヤマレコ公開記録・らくルート標準CT区間合計 302分（2026-08-30確認）', sourceType:'yamareco'},
  '大朝日岳→日暮沢登山口駐車場（日暮沢小屋）': {minutes:340, source:'YAMA HACK・日暮沢周回標準CT（大朝日岳→日暮沢小屋側 合計340分）', sourceType:'other'},
  '飯豊山→大日杉登山口': {minutes:425, source:'YAMA HACK・大日杉登山口コース下山標準CT（飯豊本山→大日杉 合計425分）', sourceType:'other'},
  '大網登山口→雨飾山': {minutes:175, source:'日本アルプス登山ルートガイド・大網登山口→雨飾山 2時間55分', sourceType:'other'},
  '雨飾山→大網登山口': {minutes:130, source:'日本アルプス登山ルートガイド・雨飾山→大網登山口 2時間10分', sourceType:'other'},
  '聖岳→椹島': {minutes:360, source:'日本百名山コースデータ・聖岳 椹島コース 下り6時間', sourceType:'other'},
  '長者原→久住山': {minutes:187, source:'V1.5.45確認済み隣接CT合算（長者原→砂防ダム30＋諏蛾守越60＋久住分れ60＋久住山37）', sourceType:'composed-verified'},
  '久住山→長者原': {minutes:172, source:'V1.5.45確認済み隣接CT合算（久住山→久住分れ47＋諏蛾守越45＋砂防ダム50＋長者原30）', sourceType:'composed-verified'},
  '久住分かれ避難小屋→法華院温泉山荘': {minutes:85, source:'V1.5.45確認済み隣接CT合算（久住分れ→諏蛾守越45＋法華院温泉40）', sourceType:'composed-verified'},
  '坊ガツル→大船山': {minutes:95, source:'V1.5.45確認済み隣接CT合算（坊ガツル→段原75＋大船山20）', sourceType:'composed-verified'}
});

// V1.5.45: mountain-area graph declarations for network-level CT audit.
// Each edge is an actual adjacent major-trail section. Do not add all-pairs shortcuts here.
const MAJOR_TRAIL_NETWORKS_V1545 = Object.freeze({
  'くじゅう連山': Object.freeze({
    anchors:['久住山','大船山','中岳(くじゅう)','三俣山','星生山'],
    nodes:Object.freeze([
      '長者原','雨ヶ池越','坊ガツル','法華院温泉山荘','砂防ダム','諏蛾守越',
      '久住分かれ避難小屋','久住山','段原','大船山'
    ]),
    edges:Object.freeze([
      ['長者原','雨ヶ池越'],['雨ヶ池越','長者原'],
      ['雨ヶ池越','坊ガツル'],['坊ガツル','雨ヶ池越'],
      ['坊ガツル','法華院温泉山荘'],['法華院温泉山荘','坊ガツル'],
      ['長者原','砂防ダム'],['砂防ダム','長者原'],
      ['砂防ダム','諏蛾守越'],['諏蛾守越','砂防ダム'],
      ['法華院温泉山荘','諏蛾守越'],['諏蛾守越','法華院温泉山荘'],
      ['諏蛾守越','久住分かれ避難小屋'],['久住分かれ避難小屋','諏蛾守越'],
      ['久住分かれ避難小屋','久住山'],['久住山','久住分かれ避難小屋'],
      ['坊ガツル','段原'],['段原','坊ガツル'],
      ['段原','大船山'],['大船山','段原']
    ])
  })
});

// V1.5.46: explicit major mountain-area trail graphs for the Alps and Yatsugatake.
// Topology is based on current public/official route maps; every declared directed edge must resolve to a direct verified CT.
const MAJOR_TRAIL_NETWORKS_V1546 = Object.freeze({
  ...MAJOR_TRAIL_NETWORKS_V1545,
  '北アルプス・槍穂高': Object.freeze({
    anchors:['槍ヶ岳','奥穂高岳','北穂高岳'],
    nodes:Object.freeze(['上高地','横尾','槍沢ロッヂ','ババ平（槍沢キャンプ場）','大曲（水俣乗越分岐）','天狗原分岐','槍ヶ岳山荘','槍ヶ岳','南岳小屋','北穂高小屋','穂高岳山荘','奥穂高岳','涸沢ヒュッテ']),
    edges:Object.freeze([
      ['上高地','横尾'],['横尾','上高地'],['横尾','槍沢ロッヂ'],['槍沢ロッヂ','横尾'],
      ['槍沢ロッヂ','ババ平（槍沢キャンプ場）'],['ババ平（槍沢キャンプ場）','槍沢ロッヂ'],['ババ平（槍沢キャンプ場）','大曲（水俣乗越分岐）'],['大曲（水俣乗越分岐）','ババ平（槍沢キャンプ場）'],
      ['大曲（水俣乗越分岐）','天狗原分岐'],['天狗原分岐','大曲（水俣乗越分岐）'],['天狗原分岐','槍ヶ岳山荘'],['槍ヶ岳山荘','天狗原分岐'],['槍ヶ岳山荘','槍ヶ岳'],['槍ヶ岳','槍ヶ岳山荘'],
      ['槍ヶ岳山荘','南岳小屋'],['南岳小屋','槍ヶ岳山荘'],['南岳小屋','北穂高小屋'],['北穂高小屋','南岳小屋'],['北穂高小屋','穂高岳山荘'],['穂高岳山荘','北穂高小屋'],
      ['穂高岳山荘','奥穂高岳'],['奥穂高岳','穂高岳山荘'],['北穂高小屋','涸沢ヒュッテ'],['涸沢ヒュッテ','北穂高小屋'],['涸沢ヒュッテ','横尾'],['横尾','涸沢ヒュッテ']
    ])
  }),
  '北アルプス・表銀座常念': Object.freeze({
    anchors:['燕岳','大天井岳','常念岳','蝶ヶ岳'],
    nodes:Object.freeze(['中房','合戦小屋','燕山荘','燕岳','大天荘','大天井岳','常念小屋','常念山頂','蝶ヶ岳','三股']),
    edges:Object.freeze([
      ['中房','合戦小屋'],['合戦小屋','中房'],['合戦小屋','燕山荘'],['燕山荘','合戦小屋'],['燕山荘','燕岳'],['燕岳','燕山荘'],
      ['燕山荘','大天荘'],['大天荘','燕山荘'],['大天荘','大天井岳'],['大天井岳','大天荘'],['大天井岳','常念小屋'],['常念小屋','大天井岳'],
      ['常念小屋','常念山頂'],['常念山頂','常念小屋'],['常念山頂','蝶ヶ岳'],['蝶ヶ岳','常念山頂'],['蝶ヶ岳','三股'],['三股','蝶ヶ岳']
    ])
  }),
  '北アルプス・裏銀座双六': Object.freeze({
    anchors:['水晶岳（黒岳）','三俣蓮華岳','双六岳'],
    nodes:Object.freeze(['高瀬ダム','烏帽子小屋','野口五郎岳','水晶小屋','三俣山荘','三俣蓮華岳','双六小屋','鏡平山荘','わさび平小屋','新穂高温泉']),
    edges:Object.freeze([
      ['高瀬ダム','烏帽子小屋'],['烏帽子小屋','高瀬ダム'],['烏帽子小屋','野口五郎岳'],['野口五郎岳','烏帽子小屋'],['野口五郎岳','水晶小屋'],['水晶小屋','野口五郎岳'],
      ['水晶小屋','三俣山荘'],['三俣山荘','水晶小屋'],['三俣山荘','三俣蓮華岳'],['三俣蓮華岳','三俣山荘'],['三俣蓮華岳','双六小屋'],['双六小屋','三俣蓮華岳'],
      ['双六小屋','鏡平山荘'],['鏡平山荘','双六小屋'],['鏡平山荘','わさび平小屋'],['わさび平小屋','鏡平山荘'],['わさび平小屋','新穂高温泉'],['新穂高温泉','わさび平小屋']
    ])
  }),
  '北アルプス・雲ノ平薬師沢': Object.freeze({
    anchors:['雲ノ平','水晶岳（黒岳）'],
    nodes:Object.freeze(['折立登山口','太郎平小屋','薬師沢小屋','雲ノ平山荘','三俣山荘']),
    edges:Object.freeze([
      ['折立登山口','太郎平小屋'],['太郎平小屋','折立登山口'],['太郎平小屋','薬師沢小屋'],['薬師沢小屋','太郎平小屋'],
      ['薬師沢小屋','雲ノ平山荘'],['雲ノ平山荘','薬師沢小屋'],['雲ノ平山荘','三俣山荘'],['三俣山荘','雲ノ平山荘']
    ])
  }),
  '北アルプス・後立山白馬': Object.freeze({
    anchors:['白馬岳','唐松岳','五竜岳','鹿島槍ヶ岳','爺ヶ岳'],
    nodes:Object.freeze(['猿倉','白馬尻小屋','白馬山荘','白馬岳','小蓮華山','白馬大池山荘','栂池自然園','蓮華温泉','杓子岳','白馬鑓ヶ岳','天狗山荘','不帰キレット','唐松岳','唐松岳頂上山荘','五竜山荘','五竜岳','キレット小屋','鹿島槍ヶ岳','冷池山荘','爺ヶ岳','種池山荘']),
    edges:Object.freeze([
      ['猿倉','白馬尻小屋'],['白馬尻小屋','猿倉'],['白馬尻小屋','白馬山荘'],['白馬山荘','白馬尻小屋'],['白馬山荘','白馬岳'],['白馬岳','白馬山荘'],
      ['白馬岳','小蓮華山'],['小蓮華山','白馬岳'],['小蓮華山','白馬大池山荘'],['白馬大池山荘','小蓮華山'],['白馬大池山荘','栂池自然園'],['栂池自然園','白馬大池山荘'],['白馬大池山荘','蓮華温泉'],['蓮華温泉','白馬大池山荘'],
      ['白馬山荘','杓子岳'],['杓子岳','白馬山荘'],['杓子岳','白馬鑓ヶ岳'],['白馬鑓ヶ岳','杓子岳'],['白馬鑓ヶ岳','天狗山荘'],['天狗山荘','白馬鑓ヶ岳'],['天狗山荘','不帰キレット'],['不帰キレット','天狗山荘'],['不帰キレット','唐松岳'],['唐松岳','不帰キレット'],
      ['唐松岳','唐松岳頂上山荘'],['唐松岳頂上山荘','唐松岳'],['唐松岳頂上山荘','五竜山荘'],['五竜山荘','唐松岳頂上山荘'],['五竜山荘','五竜岳'],['五竜岳','五竜山荘'],
      ['五竜岳','キレット小屋'],['キレット小屋','五竜岳'],['キレット小屋','鹿島槍ヶ岳'],['鹿島槍ヶ岳','キレット小屋'],['鹿島槍ヶ岳','冷池山荘'],['冷池山荘','鹿島槍ヶ岳'],['冷池山荘','爺ヶ岳'],['爺ヶ岳','冷池山荘'],['爺ヶ岳','種池山荘'],['種池山荘','爺ヶ岳']
    ])
  }),
  '北アルプス・立山剱': Object.freeze({
    anchors:['立山','剱岳'],
    nodes:Object.freeze(['室堂','一の越山荘','立山（雄山）','剱澤小屋','剣山荘','剱岳','早月小屋','馬場島']),
    edges:Object.freeze([
      ['室堂','一の越山荘'],['一の越山荘','室堂'],['一の越山荘','立山（雄山）'],['立山（雄山）','一の越山荘'],
      ['室堂','剱澤小屋'],['剱澤小屋','室堂'],['剱澤小屋','剣山荘'],['剣山荘','剱澤小屋'],['剣山荘','剱岳'],['剱岳','剣山荘'],
      ['剱岳','早月小屋'],['早月小屋','剱岳'],['早月小屋','馬場島'],['馬場島','早月小屋']
    ])
  }),
  '中央アルプス・木曽駒空木': Object.freeze({
    anchors:['木曽駒ヶ岳','宝剣岳','空木岳'],
    nodes:Object.freeze(['千畳敷','乗越浄土','中岳（中央アルプス）','木曽駒ヶ岳','極楽平','宝剣岳','濁沢大峰','檜尾岳','檜尾小屋','熊沢岳','東川岳','木曽殿山荘','空木岳']),
    edges:Object.freeze([
      ['千畳敷','乗越浄土'],['乗越浄土','千畳敷'],['乗越浄土','中岳（中央アルプス）'],['中岳（中央アルプス）','乗越浄土'],['中岳（中央アルプス）','木曽駒ヶ岳'],['木曽駒ヶ岳','中岳（中央アルプス）'],
      ['千畳敷','極楽平'],['極楽平','千畳敷'],['極楽平','宝剣岳'],['宝剣岳','極楽平'],['極楽平','濁沢大峰'],['濁沢大峰','極楽平'],['濁沢大峰','檜尾岳'],['檜尾岳','濁沢大峰'],
      ['檜尾岳','檜尾小屋'],['檜尾小屋','檜尾岳'],['檜尾岳','熊沢岳'],['熊沢岳','檜尾岳'],['熊沢岳','東川岳'],['東川岳','熊沢岳'],['東川岳','木曽殿山荘'],['木曽殿山荘','東川岳'],['木曽殿山荘','空木岳'],['空木岳','木曽殿山荘']
    ])
  }),
  '南アルプス・白峰塩見': Object.freeze({
    anchors:['北岳','間ノ岳','農鳥岳','塩見岳'],
    nodes:Object.freeze(['広河原','白根御池小屋','北岳肩の小屋','北岳','北岳山荘','中白根山','間ノ岳','農鳥小屋','農鳥岳','熊ノ平小屋','塩見岳','三伏峠小屋','鳥倉登山口']),
    edges:Object.freeze([
      ['広河原','白根御池小屋'],['白根御池小屋','広河原'],['白根御池小屋','北岳肩の小屋'],['北岳肩の小屋','白根御池小屋'],['北岳肩の小屋','北岳'],['北岳','北岳肩の小屋'],['北岳','北岳山荘'],['北岳山荘','北岳'],
      ['北岳山荘','中白根山'],['中白根山','北岳山荘'],['中白根山','間ノ岳'],['間ノ岳','中白根山'],['間ノ岳','農鳥小屋'],['農鳥小屋','間ノ岳'],['農鳥小屋','農鳥岳'],['農鳥岳','農鳥小屋'],
      ['間ノ岳','熊ノ平小屋'],['熊ノ平小屋','間ノ岳'],['熊ノ平小屋','塩見岳'],['塩見岳','熊ノ平小屋'],['塩見岳','三伏峠小屋'],['三伏峠小屋','塩見岳'],['三伏峠小屋','鳥倉登山口'],['鳥倉登山口','三伏峠小屋']
    ])
  }),
  '南アルプス・鳳凰三山': Object.freeze({
    anchors:['観音岳(鳳凰)'],
    nodes:Object.freeze(['夜叉神峠登山口','南御室小屋','薬師岳(鳳凰)','観音岳(鳳凰)','地蔵岳(鳳凰)']),
    edges:Object.freeze([
      ['夜叉神峠登山口','南御室小屋'],['南御室小屋','夜叉神峠登山口'],['南御室小屋','薬師岳(鳳凰)'],['薬師岳(鳳凰)','南御室小屋'],['薬師岳(鳳凰)','観音岳(鳳凰)'],['観音岳(鳳凰)','薬師岳(鳳凰)'],['観音岳(鳳凰)','地蔵岳(鳳凰)'],['地蔵岳(鳳凰)','観音岳(鳳凰)']
    ])
  }),
  '北アルプス・薬師岳': Object.freeze({
    anchors:['薬師岳'],
    nodes:Object.freeze(['折立登山口','太郎平小屋','薬師岳山荘','薬師岳']),
    edges:Object.freeze([
      ['折立登山口','太郎平小屋'],['太郎平小屋','折立登山口'],['太郎平小屋','薬師岳山荘'],['薬師岳山荘','太郎平小屋'],['薬師岳山荘','薬師岳'],['薬師岳','薬師岳山荘']
    ])
  }),
  '南アルプス・北沢峠甲斐駒仙丈': Object.freeze({
    anchors:['甲斐駒ヶ岳','仙丈ヶ岳'],
    nodes:Object.freeze(['北沢峠','長衛小屋','仙水小屋','甲斐駒ヶ岳','仙丈ヶ岳','仙丈小屋','馬の背ヒュッテ']),
    edges:Object.freeze([
      ['北沢峠','長衛小屋'],['長衛小屋','北沢峠'],['長衛小屋','仙水小屋'],['仙水小屋','長衛小屋'],
      ['北沢峠','甲斐駒ヶ岳'],['甲斐駒ヶ岳','北沢峠'],['北沢峠','仙丈ヶ岳'],['仙丈ヶ岳','北沢峠'],
      ['仙丈ヶ岳','仙丈小屋'],['仙丈小屋','仙丈ヶ岳'],['仙丈小屋','馬の背ヒュッテ'],['馬の背ヒュッテ','仙丈小屋']
    ])
  }),
  '南アルプス・荒川赤石': Object.freeze({
    anchors:['荒川岳（悪沢岳）','赤石岳'],
    nodes:Object.freeze(['椹島','千枚小屋','荒川岳','荒川小屋','赤石岳','赤石小屋']),
    edges:Object.freeze([
      ['椹島','千枚小屋'],['千枚小屋','椹島'],['千枚小屋','荒川岳'],['荒川岳','千枚小屋'],['荒川岳','荒川小屋'],['荒川小屋','荒川岳'],
      ['荒川小屋','赤石岳'],['赤石岳','荒川小屋'],['赤石岳','赤石小屋'],['赤石小屋','赤石岳'],['赤石小屋','椹島'],['椹島','赤石小屋']
    ])
  }),
  '南アルプス・聖岳': Object.freeze({
    anchors:['聖岳'],
    nodes:Object.freeze(['椹島','聖沢登山口','聖沢吊橋','造林小屋跡','乗越（聖岳）','岩頭滝見台','せせらぎ（聖岳）','聖平小屋','聖岳']),
    edges:Object.freeze([
      ['椹島','聖沢登山口'],['聖沢登山口','椹島'],['聖沢登山口','聖沢吊橋'],['聖沢吊橋','聖沢登山口'],['聖沢吊橋','造林小屋跡'],['造林小屋跡','聖沢吊橋'],
      ['造林小屋跡','乗越（聖岳）'],['乗越（聖岳）','造林小屋跡'],['乗越（聖岳）','岩頭滝見台'],['岩頭滝見台','乗越（聖岳）'],['岩頭滝見台','せせらぎ（聖岳）'],['せせらぎ（聖岳）','岩頭滝見台'],
      ['せせらぎ（聖岳）','聖平小屋'],['聖平小屋','せせらぎ（聖岳）'],['聖平小屋','聖岳'],['聖岳','聖平小屋']
    ])
  }),
  '八ヶ岳・南八ヶ岳': Object.freeze({
    anchors:['八ヶ岳（赤岳）','赤岳','横岳（八ヶ岳）','硫黄岳（八ヶ岳）','阿弥陀岳'],
    nodes:Object.freeze(['赤岳鉱泉','行者小屋','赤岳','赤岳天望荘','横岳（八ヶ岳）','硫黄岳山荘','硫黄岳（八ヶ岳）','阿弥陀岳']),
    edges:Object.freeze([
      ['赤岳鉱泉','行者小屋'],['行者小屋','赤岳鉱泉'],['行者小屋','赤岳'],['赤岳','行者小屋'],
      ['赤岳','赤岳天望荘'],['赤岳天望荘','赤岳'],['赤岳天望荘','横岳（八ヶ岳）'],['横岳（八ヶ岳）','赤岳天望荘'],['横岳（八ヶ岳）','硫黄岳山荘'],['硫黄岳山荘','横岳（八ヶ岳）'],['硫黄岳山荘','硫黄岳（八ヶ岳）'],['硫黄岳（八ヶ岳）','硫黄岳山荘'],['行者小屋','阿弥陀岳'],['阿弥陀岳','行者小屋']
    ])
  }),
  '八ヶ岳・北八ヶ岳天狗': Object.freeze({
    anchors:['天狗岳'],
    nodes:Object.freeze(['渋の湯','黒百合ヒュッテ','天狗岳']),
    edges:Object.freeze([['渋の湯','黒百合ヒュッテ'],['黒百合ヒュッテ','渋の湯'],['黒百合ヒュッテ','天狗岳'],['天狗岳','黒百合ヒュッテ']])
  })
});





// V1.5.47: nationwide second-wave explicit mountain-area trail graphs.
// V1.5.46 Alps/Yatsugatake/Kuju networks are retained unchanged and extended here.
const MAJOR_TRAIL_NETWORKS_V1547 = Object.freeze({
  ...MAJOR_TRAIL_NETWORKS_V1546,
  '尾瀬・尾瀬ヶ原至仏燧': Object.freeze({
    anchors:['至仏山','燧ヶ岳'],
    nodes:Object.freeze(['鳩待峠','山ノ鼻（至仏山東面登山道入口・登り専用）','竜宮十字路','見晴（尾瀬小屋・見晴地区）','燧ヶ岳（柴安嵓）','御池登山口','至仏山']),
    edges:Object.freeze([
      ['鳩待峠','山ノ鼻（至仏山東面登山道入口・登り専用）'],['山ノ鼻（至仏山東面登山道入口・登り専用）','鳩待峠'],
      ['山ノ鼻（至仏山東面登山道入口・登り専用）','竜宮十字路'],
      ['竜宮十字路','見晴（尾瀬小屋・見晴地区）'],['見晴（尾瀬小屋・見晴地区）','竜宮十字路'],
      ['見晴（尾瀬小屋・見晴地区）','燧ヶ岳（柴安嵓）'],['燧ヶ岳（柴安嵓）','見晴（尾瀬小屋・見晴地区）'],
      ['御池登山口','燧ヶ岳（柴安嵓）'],['燧ヶ岳（柴安嵓）','御池登山口'],
      ['山ノ鼻（至仏山東面登山道入口・登り専用）','至仏山'],['至仏山','鳩待峠']
    ])
  }),
  '富士山・四登山ルート山頂': Object.freeze({
    anchors:['富士山'],
    nodes:Object.freeze(['富士スバルライン五合目（吉田口）','須走口五合目','吉田・須走ルート山頂','富士宮口五合目','富士宮ルート山頂','御殿場口新五合目','御殿場ルート山頂','富士山（剣ヶ峰）']),
    edges:Object.freeze([
      ['富士スバルライン五合目（吉田口）','吉田・須走ルート山頂'],['吉田・須走ルート山頂','富士スバルライン五合目（吉田口）'],
      ['須走口五合目','吉田・須走ルート山頂'],['吉田・須走ルート山頂','須走口五合目'],
      ['吉田・須走ルート山頂','富士山（剣ヶ峰）'],['富士山（剣ヶ峰）','吉田・須走ルート山頂'],
      ['富士宮口五合目','富士宮ルート山頂'],['富士宮ルート山頂','富士宮口五合目'],['富士宮ルート山頂','富士山（剣ヶ峰）'],
      ['御殿場口新五合目','御殿場ルート山頂'],['御殿場ルート山頂','御殿場口新五合目'],['御殿場ルート山頂','富士山（剣ヶ峰）']
    ])
  }),
  '丹沢・主脈': Object.freeze({
    anchors:['丹沢山'],
    nodes:Object.freeze(['大倉登山口','塔ノ岳','丹沢山','蛭ヶ岳']),
    edges:Object.freeze([['大倉登山口','塔ノ岳'],['塔ノ岳','大倉登山口'],['塔ノ岳','丹沢山'],['丹沢山','塔ノ岳'],['丹沢山','蛭ヶ岳'],['蛭ヶ岳','丹沢山']])
  }),
  '妙高・火打': Object.freeze({
    anchors:['火打山','妙高山'],
    nodes:Object.freeze(['笹ヶ峰登山口','高谷池ヒュッテ','火打山','黒沢池ヒュッテ','妙高山']),
    edges:Object.freeze([
      ['笹ヶ峰登山口','高谷池ヒュッテ'],['高谷池ヒュッテ','笹ヶ峰登山口'],['高谷池ヒュッテ','火打山'],['火打山','高谷池ヒュッテ'],
      ['高谷池ヒュッテ','黒沢池ヒュッテ'],['黒沢池ヒュッテ','高谷池ヒュッテ'],['黒沢池ヒュッテ','妙高山'],['妙高山','黒沢池ヒュッテ'],['笹ヶ峰登山口','黒沢池ヒュッテ'],['黒沢池ヒュッテ','笹ヶ峰登山口']
    ])
  }),
  '霧島・韓国岳大浪池': Object.freeze({
    anchors:['霧島山'],
    nodes:Object.freeze(['韓国岳登山口','霧島山（韓国岳）','韓国岳避難小屋','大浪池休憩所','県境登山口','えびのエコミュージアムセンター']),
    edges:Object.freeze([['韓国岳登山口','霧島山（韓国岳）'],['霧島山（韓国岳）','韓国岳避難小屋'],['韓国岳避難小屋','大浪池休憩所'],['大浪池休憩所','県境登山口'],['県境登山口','えびのエコミュージアムセンター']])
  }),
  '大山・夏山行者': Object.freeze({
    anchors:['大山'],
    nodes:Object.freeze(['博労座駐車場','夏山登山口','行者谷分かれ','六合目避難小屋','大山（弥山）','大神山神社奥宮','大山火の神岳温泉 豪円湯院']),
    edges:Object.freeze([['博労座駐車場','夏山登山口'],['夏山登山口','行者谷分かれ'],['行者谷分かれ','六合目避難小屋'],['六合目避難小屋','大山（弥山）'],['大山（弥山）','六合目避難小屋'],['六合目避難小屋','行者谷分かれ'],['行者谷分かれ','大神山神社奥宮'],['大神山神社奥宮','大山火の神岳温泉 豪円湯院'],['大山火の神岳温泉 豪円湯院','博労座駐車場']])
  }),
  '四国・剣山三嶺': Object.freeze({
    anchors:['剣山','三嶺'],
    nodes:Object.freeze(['剣山','次郎笈','丸石','丸石避難小屋','高ノ瀬','白髪避難小屋','三嶺','三嶺ヒュッテ','名頃登山口 三嶺']),
    edges:Object.freeze([['剣山','次郎笈'],['次郎笈','丸石'],['丸石','丸石避難小屋'],['丸石避難小屋','高ノ瀬'],['高ノ瀬','白髪避難小屋'],['白髪避難小屋','三嶺'],['三嶺','三嶺ヒュッテ'],['名頃登山口 三嶺','三嶺ヒュッテ']])
  }),
  '屋久島・宮之浦岳': Object.freeze({
    anchors:['宮之浦岳'],
    nodes:Object.freeze(['淀川登山口','淀川小屋','宮之浦岳']),
    edges:Object.freeze([['淀川登山口','淀川小屋'],['淀川小屋','淀川登山口'],['淀川小屋','宮之浦岳'],['宮之浦岳','淀川小屋']])
  }),
  '谷川岳・天神尾根': Object.freeze({
    anchors:['谷川岳'],
    nodes:Object.freeze(['天神平','熊穴沢避難小屋','谷川岳（オキノ耳）']),
    edges:Object.freeze([['天神平','熊穴沢避難小屋'],['熊穴沢避難小屋','天神平'],['熊穴沢避難小屋','谷川岳（オキノ耳）'],['谷川岳（オキノ耳）','天神平']])
  }),
  '朝日連峰・大朝日': Object.freeze({
    anchors:['大朝日岳'],
    nodes:Object.freeze(['古寺案内センター（古寺コース）','大朝日岳','日暮沢登山口駐車場（日暮沢小屋）','竜門小屋']),
    edges:Object.freeze([['古寺案内センター（古寺コース）','大朝日岳'],['大朝日岳','古寺案内センター（古寺コース）'],['日暮沢登山口駐車場（日暮沢小屋）','竜門小屋'],['竜門小屋','大朝日岳']])
  }),
  '飯豊連峰・大日杉': Object.freeze({
    anchors:['飯豊山'],
    nodes:Object.freeze(['大日杉登山口','切合小屋','飯豊山']),
    edges:Object.freeze([['大日杉登山口','切合小屋'],['切合小屋','飯豊山'],['飯豊山','大日杉登山口']])
  }),
  '奥秩父・雲取': Object.freeze({
    anchors:['雲取山'],
    nodes:Object.freeze(['鴨沢登山口','七ツ石小屋','雲取山','雲取山荘']),
    edges:Object.freeze([['鴨沢登山口','七ツ石小屋'],['七ツ石小屋','雲取山'],['雲取山','雲取山荘'],['雲取山荘','雲取山']])
  }),
  '阿蘇・高岳中岳仙酔峡': Object.freeze({
    anchors:['阿蘇山（高岳）'],
    nodes:Object.freeze(['仙酔峡駐車場','仙酔分かれ','阿蘇山（高岳）','高岳・中岳・月見小屋分岐','阿蘇山（中岳）','馬の背（阿蘇）','火口東展望所','すずめ岩分岐']),
    edges:Object.freeze([['仙酔峡駐車場','仙酔分かれ'],['仙酔分かれ','阿蘇山（高岳）'],['阿蘇山（高岳）','高岳・中岳・月見小屋分岐'],['高岳・中岳・月見小屋分岐','阿蘇山（中岳）'],['阿蘇山（中岳）','馬の背（阿蘇）'],['馬の背（阿蘇）','火口東展望所'],['火口東展望所','すずめ岩分岐'],['すずめ岩分岐','仙酔峡駐車場']])
  }),
  '祖母山・神原北谷': Object.freeze({
    anchors:['祖母山'],
    nodes:Object.freeze(['神原登山口','五合目避難小屋（祖母山）','国観峠','祖母山九合目小屋','祖母山','三県境（祖母山）','四辻（祖母山）','一の鳥居分岐（祖母山）','北谷登山口']),
    edges:Object.freeze([['神原登山口','五合目避難小屋（祖母山）'],['五合目避難小屋（祖母山）','国観峠'],['国観峠','祖母山九合目小屋'],['祖母山九合目小屋','祖母山'],['祖母山','国観峠'],['国観峠','三県境（祖母山）'],['三県境（祖母山）','四辻（祖母山）'],['四辻（祖母山）','一の鳥居分岐（祖母山）'],['一の鳥居分岐（祖母山）','北谷登山口']])
  }),
  '石鎚山・弥山天狗岳': Object.freeze({
    anchors:['石鎚山'],
    nodes:Object.freeze(['土小屋登山口','石鎚山（弥山）','石鎚山（天狗岳）','石鎚ロープウェイ山頂成就駅']),
    edges:Object.freeze([['土小屋登山口','石鎚山（弥山）'],['石鎚山（弥山）','土小屋登山口'],['石鎚ロープウェイ山頂成就駅','石鎚山（弥山）'],['石鎚山（弥山）','石鎚ロープウェイ山頂成就駅'],['石鎚山（弥山）','石鎚山（天狗岳）'],['石鎚山（天狗岳）','石鎚山（弥山）']])
  })
});

// V1.5.47: nationwide second-wave mountain-area network CT additions.
// Register only public, endpoint-specific course times. No coordinate/elevation estimates.
const V1547_NATIONAL_NETWORK_COURSE_TIMES = Object.freeze({
  // 尾瀬: main marsh corridor + two mountain branches.
  '鳩待峠→山ノ鼻（至仏山東面登山道入口・登り専用）': {minutes:60, source:'公開尾瀬標準コース案内・鳩待峠→山ノ鼻 約1時間（2026-08-30確認）', sourceType:'other'},
  '山ノ鼻（至仏山東面登山道入口・登り専用）→鳩待峠': {minutes:80, source:'公開尾瀬標準コース案内・山ノ鼻→鳩待峠 約1時間20分（2026-08-30確認）', sourceType:'other'},
  '山ノ鼻（至仏山東面登山道入口・登り専用）→竜宮十字路': {minutes:80, source:'尾瀬保護財団・山ノ鼻〜竜宮十字路 4.4km / CT80分（2026-08-30確認）', sourceType:'official'},
  '竜宮十字路→見晴（尾瀬小屋・見晴地区）': {minutes:30, source:'公開尾瀬コース案内・竜宮→見晴 30分（2026-08-30確認）', sourceType:'other'},
  '見晴（尾瀬小屋・見晴地区）→竜宮十字路': {minutes:30, source:'公開尾瀬コース案内・見晴→竜宮 30分（2026-08-30確認）', sourceType:'other'},
  '見晴（尾瀬小屋・見晴地区）→燧ヶ岳（柴安嵓）': {minutes:210, source:'環境省関東地方環境事務所・見晴地区→柴安嵓 コースタイム3時間30分（2026-08-30確認）', sourceType:'official'},
  '燧ヶ岳（柴安嵓）→見晴（尾瀬小屋・見晴地区）': {minutes:140, source:'公開尾瀬登山ガイド・燧ヶ岳→見晴 約2時間20分（2026-08-30確認）', sourceType:'other'},

  // 富士山: distinguish each route summit from 剣ヶ峰 and the summit crater walk.
  '富士スバルライン五合目（吉田口）→吉田・須走ルート山頂': {minutes:360, source:'富士登山オフィシャルサイト・吉田ルート登り約6時間（2026-08-30確認）', sourceType:'official'},
  '吉田・須走ルート山頂→富士スバルライン五合目（吉田口）': {minutes:240, source:'富士登山オフィシャルサイト・吉田ルート下り約4時間（2026-08-30確認）', sourceType:'official'},
  '須走口五合目→吉田・須走ルート山頂': {minutes:420, source:'富士登山オフィシャルサイト・須走ルート登り約7時間（2026-08-30確認）', sourceType:'official'},
  '吉田・須走ルート山頂→須走口五合目': {minutes:240, source:'富士登山オフィシャルサイト・須走ルート下り約4時間（2026-08-30確認）', sourceType:'official'},
  '吉田・須走ルート山頂→富士山（剣ヶ峰）': {minutes:60, source:'富士登山オフィシャルサイト吉田モデル・山頂5:10→剣ヶ峰6:10（2026-08-30確認）', sourceType:'official'},
  '富士山（剣ヶ峰）→吉田・須走ルート山頂': {minutes:60, source:'富士登山オフィシャルサイト吉田モデル・剣ヶ峰6:10→吉田須走山頂7:10（2026-08-30確認）', sourceType:'official'},
  '富士宮口五合目→富士宮ルート山頂': {minutes:300, source:'富士登山オフィシャルサイト・富士宮ルート登り約5時間（2026-08-30確認）', sourceType:'official'},
  '富士宮ルート山頂→富士宮口五合目': {minutes:180, source:'富士登山オフィシャルサイト・富士宮ルート下り約3時間（2026-08-30確認）', sourceType:'official'},
  '富士宮ルート山頂→富士山（剣ヶ峰）': {minutes:20, source:'富士登山オフィシャルサイト富士宮モデル・山頂5:10→剣ヶ峰5:30（2026-08-30確認）', sourceType:'official'},
  '御殿場口新五合目→御殿場ルート山頂': {minutes:540, source:'富士登山オフィシャルサイト・御殿場ルート登り約9時間（2026-08-30確認）', sourceType:'official'},
  '御殿場ルート山頂→御殿場口新五合目': {minutes:240, source:'富士登山オフィシャルサイト・御殿場ルート下り約4時間（2026-08-30確認）', sourceType:'official'},
  '御殿場ルート山頂→富士山（剣ヶ峰）': {minutes:25, source:'富士登山オフィシャルサイト御殿場モデル・山頂5:10→剣ヶ峰5:35（2026-08-30確認）', sourceType:'official'},

  // 丹沢主脈.
  '丹沢山→蛭ヶ岳': {minutes:120, source:'公開丹沢主脈モデル・丹沢山→蛭ヶ岳 120分（2026-08-30確認）', sourceType:'other'},
  '蛭ヶ岳→丹沢山': {minutes:100, source:'公開丹沢主脈モデル・蛭ヶ岳→丹沢山 100分（2026-08-30確認）', sourceType:'other'},

  // 妙高・火打: connect the two hut branches across 茶臼山 ridge.
  '高谷池ヒュッテ→黒沢池ヒュッテ': {minutes:50, source:'公開火打山・妙高山縦走標準CT・高谷池ヒュッテ→黒沢池ヒュッテ 50分（2026-08-30確認）', sourceType:'other'},
  '黒沢池ヒュッテ→高谷池ヒュッテ': {minutes:50, source:'公開火打山・妙高山縦走標準CT・黒沢池ヒュッテ↔高谷池ヒュッテ 約50分（2026-08-30確認）', sourceType:'other'},

  // 霧島: Environment Ministry official loop, direction as published.
  '韓国岳登山口→霧島山（韓国岳）': {minutes:90, source:'環境省・韓国岳大浪池登山コース 韓国岳登山口→韓国岳山頂90分（2026-08-30確認）', sourceType:'official'},
  '霧島山（韓国岳）→韓国岳避難小屋': {minutes:50, source:'環境省・韓国岳大浪池登山コース 韓国岳山頂→韓国岳避難小屋50分（2026-08-30確認）', sourceType:'official'},
  '韓国岳避難小屋→大浪池休憩所': {minutes:50, source:'環境省・韓国岳大浪池登山コース 韓国岳避難小屋→大浪池休憩所50分（2026-08-30確認）', sourceType:'official'},
  '大浪池休憩所→県境登山口': {minutes:90, source:'環境省・韓国岳大浪池登山コース 大浪池休憩所→県境登山口90分（2026-08-30確認）', sourceType:'official'},
  '県境登山口→えびのエコミュージアムセンター': {minutes:10, source:'環境省・韓国岳大浪池登山コース 県境登山口→えびのエコミュージアムセンター10分（2026-08-30確認）', sourceType:'official'},

  // 大山: Environment Ministry official loop.
  '博労座駐車場→夏山登山口': {minutes:15, source:'環境省・大山登山コース 博労座駐車場→夏山登山口15分（2026-08-30確認）', sourceType:'official'},
  '夏山登山口→行者谷分かれ': {minutes:80, source:'環境省・大山登山コース 夏山登山口→行者谷分かれ80分（2026-08-30確認）', sourceType:'official'},
  '行者谷分かれ→六合目避難小屋': {minutes:20, source:'環境省・大山登山コース 行者谷分かれ→六合目避難小屋20分（2026-08-30確認）', sourceType:'official'},
  '六合目避難小屋→大山（弥山）': {minutes:80, source:'環境省・大山登山コース 六合目避難小屋→大山山頂80分（2026-08-30確認）', sourceType:'official'},
  '大山（弥山）→六合目避難小屋': {minutes:60, source:'環境省・大山登山コース 大山山頂→六合目避難小屋60分（2026-08-30確認）', sourceType:'official'},
  '六合目避難小屋→行者谷分かれ': {minutes:10, source:'環境省・大山登山コース 六合目避難小屋→行者谷分かれ10分（2026-08-30確認）', sourceType:'official'},
  '行者谷分かれ→大神山神社奥宮': {minutes:70, source:'環境省・大山登山コース 行者谷分かれ→大神山神社奥宮70分（2026-08-30確認）', sourceType:'official'},
  '大神山神社奥宮→大山火の神岳温泉 豪円湯院': {minutes:20, source:'環境省・大山登山コース 大神山神社奥宮→豪円湯院20分（2026-08-30確認）', sourceType:'official'},
  '大山火の神岳温泉 豪円湯院→博労座駐車場': {minutes:5, source:'環境省・大山登山コース 豪円湯院→博労座駐車場5分（2026-08-30確認）', sourceType:'official'},

  // 剣山〜三嶺: YAMAP public model-course adjacent ridge sections.
  '次郎笈→丸石': {minutes:110, source:'YAMAPモデルコース・次郎笈→丸石 隣接チェックポイント合算110分（2026-08-30確認）', sourceType:'yamap'},
  '丸石→丸石避難小屋': {minutes:2, source:'YAMAPモデルコース・丸石→丸石避難小屋2分（2026-08-30確認）', sourceType:'yamap'},
  '丸石避難小屋→高ノ瀬': {minutes:95, source:'YAMAPモデルコース・丸石避難小屋→高ノ瀬 隣接チェックポイント合算95分（2026-08-30確認）', sourceType:'yamap'},
  '高ノ瀬→白髪避難小屋': {minutes:185, source:'YAMAPモデルコース・高ノ瀬→白髪避難小屋 隣接チェックポイント合算185分（2026-08-30確認）', sourceType:'yamap'},
  '三嶺→三嶺ヒュッテ': {minutes:9, source:'ヤマレコ標準CT・三嶺→三嶺ヒュッテ9分（既存確認済み）', sourceType:'yamareco'},

  // 阿蘇: current YAMAP public model loop from 仙酔峡 through 高岳・中岳.
  '仙酔峡駐車場→仙酔分かれ': {minutes:135, source:'YAMAP仙酔峡ルート周回モデル・仙酔峡駐車場→仙酔分かれ135分（2026-08-30確認）', sourceType:'yamap'},
  '仙酔分かれ→阿蘇山（高岳）': {minutes:8, source:'YAMAP仙酔峡ルート周回モデル・仙酔分かれ→高岳8分（2026-08-30確認）', sourceType:'yamap'},
  '阿蘇山（高岳）→高岳・中岳・月見小屋分岐': {minutes:15, source:'YAMAP仙酔峡ルート周回モデル・高岳→高岳中岳月見小屋分岐15分（2026-08-30確認）', sourceType:'yamap'},
  '高岳・中岳・月見小屋分岐→阿蘇山（中岳）': {minutes:25, source:'YAMAP仙酔峡ルート周回モデル・分岐→中岳25分（2026-08-30確認）', sourceType:'yamap'},
  '阿蘇山（中岳）→馬の背（阿蘇）': {minutes:6, source:'YAMAP仙酔峡ルート周回モデル・中岳→馬の背6分（2026-08-30確認）', sourceType:'yamap'},
  '馬の背（阿蘇）→火口東展望所': {minutes:23, source:'YAMAP仙酔峡ルート周回モデル・馬の背→火口東展望所23分（2026-08-30確認）', sourceType:'yamap'},
  '火口東展望所→すずめ岩分岐': {minutes:40, source:'YAMAP仙酔峡ルート周回モデル・火口東展望所→すずめ岩分岐40分（2026-08-30確認）', sourceType:'yamap'},
  'すずめ岩分岐→仙酔峡駐車場': {minutes:40, source:'YAMAP仙酔峡ルート周回モデル・すずめ岩分岐→仙酔峡駐車場40分（2026-08-30確認）', sourceType:'yamap'},

  // 祖母山: public Yamareco standard-plan traverse 神原→国観峠→祖母山→北谷.
  '神原登山口→五合目避難小屋（祖母山）': {minutes:46, source:'ヤマレコ公開山行計画 p5423550・神原登山口→滝見分岐2分→五合目避難小屋44分（2026-08-30確認）', sourceType:'yamareco'},
  '五合目避難小屋（祖母山）→国観峠': {minutes:140, source:'ヤマレコ公開山行計画 p5423550・五合目避難小屋→国観峠140分（2026-08-30確認）', sourceType:'yamareco'},
  '国観峠→祖母山九合目小屋': {minutes:45, source:'ヤマレコ公開山行計画 p5423550・国観峠→祖母山九合目小屋45分（2026-08-30確認）', sourceType:'yamareco'},
  '祖母山九合目小屋→祖母山': {minutes:22, source:'ヤマレコ公開山行計画 p5423550・祖母山九合目小屋→祖母山22分（2026-08-30確認）', sourceType:'yamareco'},
  '祖母山→国観峠': {minutes:35, source:'ヤマレコ公開山行計画 p5423550・祖母山→国観峠35分（2026-08-30確認）', sourceType:'yamareco'},
  '国観峠→三県境（祖母山）': {minutes:24, source:'ヤマレコ公開山行計画 p5423550・国観峠→三県境24分（2026-08-30確認）', sourceType:'yamareco'},
  '三県境（祖母山）→四辻（祖母山）': {minutes:18, source:'ヤマレコ公開山行計画 p5423550・三県境→四辻18分（2026-08-30確認）', sourceType:'yamareco'},
  '四辻（祖母山）→一の鳥居分岐（祖母山）': {minutes:15, source:'ヤマレコ公開山行計画 p5423550・四辻→一の鳥居分岐15分（2026-08-30確認）', sourceType:'yamareco'},
  '一の鳥居分岐（祖母山）→北谷登山口': {minutes:35, source:'ヤマレコ公開山行計画 p5423550・一の鳥居分岐→北谷登山口35分（2026-08-30確認）', sourceType:'yamareco'},

  // 石鎚山: distinguish 弥山 from the true high point 天狗岳.
  '石鎚山（弥山）→石鎚山（天狗岳）': {minutes:20, source:'YAMAP堂ヶ森・石鎚山モデル・石鎚山（弥山）→天狗岳20分（2026-08-30確認）', sourceType:'yamap'},
  '石鎚山（天狗岳）→石鎚山（弥山）': {minutes:7, source:'YAMAP堂ヶ森・石鎚山モデル・天狗岳→石鎚山（弥山）7分（2026-08-30確認）', sourceType:'yamap'}
});



// V1.5.48: deep network pass for the five remaining major traverse areas.
// Published endpoint-specific CT only. No regression, elevation, or mirrored-direction estimates.
const V1548_DEEP_NETWORK_COURSE_TIMES = Object.freeze({
  // 大雪山核心縦走: YAMAP public model courses, checked 2026-08-30.
  '七合目リフト駅→黒岳': {minutes:85, source:'YAMAPモデルコース・七合目リフト駅→黒岳 1時間25分（2026-08-30確認）', sourceType:'yamap'},
  '黒岳→七合目リフト駅': {minutes:55, source:'YAMAPモデルコース・黒岳→七合目リフト駅 55分（2026-08-30確認）', sourceType:'yamap'},
  '黒岳→黒岳石室': {minutes:26, source:'YAMAP大雪山モデル・黒岳→分岐25分→黒岳石室1分（2026-08-30確認）', sourceType:'yamap'},
  '黒岳石室→黒岳': {minutes:80, source:'YAMAP大雪山モデル・黒岳石室→分岐25分→黒岳55分（2026-08-30確認）', sourceType:'yamap'},
  '黒岳石室→北海岳': {minutes:100, source:'YAMA HACK大雪山登山ガイド・黒岳石室→北海岳 100分（2026-08-31再確認）', sourceType:'guide'},
  '北海岳→白雲岳避難小屋': {minutes:26, source:'YAMAP大雪山縦走モデル・北海岳→白雲岳分岐25分→白雲岳避難小屋1分（2026-08-30確認）', sourceType:'yamap'},
  '白雲岳避難小屋→忠別岳': {minutes:260, source:'YAMAP大雪山縦走モデル・白雲岳避難小屋→高根ヶ原方面→忠別岳 4時間20分（2026-08-30確認）', sourceType:'yamap'},
  '忠別岳→五色岳': {minutes:110, source:'YAMAP大雪山縦走モデル・忠別岳→五色岳 1時間50分（2026-08-30確認）', sourceType:'yamap'},
  '五色岳→ヒサゴ沼避難小屋': {minutes:74, source:'YAMAP大雪山縦走モデル・五色岳→ヒサゴ沼避難小屋 1時間14分（2026-08-30確認）', sourceType:'yamap'},
  'ヒサゴ沼避難小屋→トムラウシ山': {minutes:225, source:'YAMAP大雪山縦走モデル・ヒサゴ沼避難小屋→トムラウシ山 3時間45分（2026-08-30確認）', sourceType:'yamap'},
  '大雪山（旭岳）→北海岳': {minutes:184, source:'YAMAP旭岳→黒岳縦走モデル・旭岳→北海岳 3時間04分（2026-08-30確認）', sourceType:'yamap'},
  '北海岳→黒岳石室': {minutes:70, source:'好日山荘登山レポート（一般的コースタイム）・北海岳→黒岳石室 1時間10分（2026-08-31再確認）', sourceType:'guide'},

  // 飯豊連峰主稜: YAMAP public model course, checked 2026-08-30.
  '御沢登山口→横峰': {minutes:150, source:'YAMAP飯豊山モデル・御沢登山口→横峰 2時間30分（2026-08-30確認）', sourceType:'yamap'},
  '横峰→御沢登山口': {minutes:120, source:'YAMAP飯豊山モデル・横峰→御沢登山口 2時間（2026-08-30確認）', sourceType:'yamap'},
  '横峰→剣ヶ峰（飯豊）': {minutes:80, source:'YAMAP飯豊山モデル・横峰→分岐→剣ヶ峰 1時間20分（2026-08-30確認）', sourceType:'yamap'},
  '剣ヶ峰（飯豊）→横峰': {minutes:50, source:'YAMAP飯豊山モデル・剣ヶ峰→分岐→横峰 50分（2026-08-30確認）', sourceType:'yamap'},
  '剣ヶ峰（飯豊）→三国岳': {minutes:70, source:'YAMAP飯豊山モデル・剣ヶ峰→三国岳 1時間10分（2026-08-30確認）', sourceType:'yamap'},
  '三国岳→剣ヶ峰（飯豊）': {minutes:10, source:'YAMAP飯豊山モデル・三国岳→剣ヶ峰 10分（2026-08-30確認）', sourceType:'yamap'},
  '三国岳→切合小屋': {minutes:40, source:'YAMAP飯豊山モデル・三国岳→切合種蒔山分岐5分→切合小屋35分（2026-08-30確認）', sourceType:'yamap'},
  '切合小屋→三国岳': {minutes:70, source:'YAMAP飯豊山モデル・切合小屋→切合種蒔山分岐5分→三国岳65分（2026-08-30確認）', sourceType:'yamap'},
  '飯豊山→御西岳': {minutes:56, source:'YAMAP飯豊山・大日岳モデル・飯豊山→駒形山→御西岳 56分（2026-08-30確認）', sourceType:'yamap'},
  '御西岳→飯豊山': {minutes:45, source:'YAMAP飯豊山・大日岳モデル・御西岳→駒形山→飯豊山 45分（2026-08-30確認）', sourceType:'yamap'},
  '御西岳→大日岳（飯豊）': {minutes:87, source:'YAMAP飯豊山・大日岳モデル・御西岳→大日岳 1時間27分（2026-08-30確認）', sourceType:'yamap'},
  '大日岳（飯豊）→御西岳': {minutes:56, source:'YAMAP飯豊山・大日岳モデル・大日岳→御西岳 56分（2026-08-30確認）', sourceType:'yamap'},

  // 朝日連峰主稜: 朝日鉱泉 / 鶴岡市 public route data.
  '大朝日岳→大朝日岳山頂避難小屋': {minutes:10, source:'朝日鉱泉公式・大朝日岳山頂→大朝日岳山頂避難小屋 約10分（2026-08-30確認）', sourceType:'official'},
  '大朝日岳山頂避難小屋→大朝日岳': {minutes:20, source:'朝日鉱泉公式・大朝日岳山頂避難小屋→大朝日岳山頂 約20分（2026-08-30確認）', sourceType:'official'},
  '大朝日岳山頂避難小屋→竜門小屋': {minutes:180, source:'朝日鉱泉公式・大朝日岳山頂避難小屋→竜門山避難小屋 3時間（2026-08-30確認）', sourceType:'official'},
  '竜門小屋→大朝日岳山頂避難小屋': {minutes:180, source:'朝日鉱泉公式・竜門山避難小屋→大朝日岳山頂避難小屋 3時間（2026-08-30確認）', sourceType:'official'},
  '竜門小屋→狐穴避難小屋': {minutes:170, source:'朝日鉱泉公式・竜門山避難小屋→狐穴避難小屋 約2時間50分（2026-08-30確認）', sourceType:'official'},
  '狐穴避難小屋→竜門小屋': {minutes:180, source:'朝日鉱泉公式・狐穴避難小屋→竜門山避難小屋 約3時間（2026-08-30確認）', sourceType:'official'},
  '狐穴避難小屋→以東岳': {minutes:180, source:'朝日鉱泉公式・狐穴避難小屋→以東岳 約3時間（2026-08-30確認）', sourceType:'official'},
  '以東岳→狐穴避難小屋': {minutes:150, source:'朝日鉱泉公式・以東岳→狐穴避難小屋 約2時間30分（2026-08-30確認）', sourceType:'official'},
  '大鳥池タキタロウ山荘→オツボ峰': {minutes:170, source:'鶴岡市公式・大鳥池小屋→オツボ峰 170分（2026-08-30確認）', sourceType:'official'},
  'オツボ峰→大鳥池タキタロウ山荘': {minutes:120, source:'鶴岡市公式・オツボ峰→大鳥池小屋 120分（2026-08-30確認）', sourceType:'official'},
  'オツボ峰→以東岳': {minutes:50, source:'鶴岡市公式・オツボ峰→以東岳 50分（2026-08-30確認）', sourceType:'official'},
  '以東岳→オツボ峰': {minutes:40, source:'鶴岡市公式・以東岳→オツボ峰 40分（2026-08-30確認）', sourceType:'official'},
  '泡滝ダム→大鳥池タキタロウ山荘': {minutes:150, source:'鶴岡市公式・泡滝ダム→大鳥池小屋 150分（2026-08-30確認）', sourceType:'official'},
  '大鳥池タキタロウ山荘→泡滝ダム': {minutes:120, source:'鶴岡市公式・大鳥池小屋→泡滝ダム 120分（2026-08-30確認）', sourceType:'official'},

  // 奥秩父主脈: named public model sections. Long ridge sections are kept coarse where public adjacent CT is not exposed.
  '大弛峠→朝日峠（奥秩父）': {minutes:45, source:'YAMAP金峰山モデル・大弛峠→朝日峠 45分（2026-08-30確認）', sourceType:'yamap'},
  '朝日峠（奥秩父）→大弛峠': {minutes:40, source:'YAMAP金峰山モデル・朝日峠→大弛峠 40分（2026-08-30確認）', sourceType:'yamap'},
  '朝日峠（奥秩父）→朝日岳（奥秩父）': {minutes:35, source:'YAMAP金峰山モデル・朝日峠→朝日岳 35分（2026-08-30確認）', sourceType:'yamap'},
  '朝日岳（奥秩父）→朝日峠（奥秩父）': {minutes:35, source:'YAMAP金峰山モデル・朝日岳→朝日峠 35分（2026-08-30確認）', sourceType:'yamap'},
  '朝日岳（奥秩父）→金峰山': {minutes:44, source:'YAMAP金峰山モデル・朝日岳→金峰山（途中分岐含む）44分（2026-08-30確認）', sourceType:'yamap'},
  '甲武信ヶ岳→大弛峠': {minutes:342, source:'YAMAP JAPAN TRAIL 奥秩父連山登山道③・甲武信ヶ岳→大弛峠 5時間42分（2026-08-30確認）', sourceType:'yamap'},
  '笠取山→甲武信ヶ岳': {minutes:460, source:'YAMAP JAPAN TRAIL 奥秩父連山登山道②・笠取山→甲武信ヶ岳 7時間40分（2026-08-30確認）', sourceType:'yamap'},

  // 谷川主脈: YAMAP/JAPAN TRAIL public model, checked 2026-08-30.
  '平標山→仙ノ倉山': {minutes:50, source:'YAMAP谷川主脈JAPAN TRAIL・平標山→前仙ノ倉山40分→仙ノ倉山10分（2026-08-30確認）', sourceType:'yamap'},
  '仙ノ倉山→エビス大黒ノ頭': {minutes:95, source:'YAMAP谷川主脈JAPAN TRAIL・仙ノ倉山→エビス大黒避難小屋30分→エビス大黒ノ頭65分（2026-08-30確認）', sourceType:'yamap'},
  'エビス大黒ノ頭→毛渡乗越': {minutes:30, source:'YAMAP谷川主脈JAPAN TRAIL・エビス大黒ノ頭→毛渡乗越30分（2026-08-30確認）', sourceType:'yamap'},
  '毛渡乗越→万太郎山': {minutes:53, source:'YAMAP谷川主脈JAPAN TRAIL・毛渡乗越→越路避難小屋50分→万太郎山3分（2026-08-30確認）', sourceType:'yamap'},
  '万太郎山→大障子ノ頭': {minutes:70, source:'YAMAP谷川主脈JAPAN TRAIL・万太郎山→分岐45分→大障子ノ頭25分（2026-08-30確認）', sourceType:'yamap'},
  '大障子ノ頭→小障子ノ頭': {minutes:71, source:'YAMAP谷川主脈JAPAN TRAIL・大障子ノ頭→大障子避難小屋1分→分岐20分→小障子ノ頭50分（2026-08-30確認）', sourceType:'yamap'},
  '小障子ノ頭→オジカ沢ノ頭': {minutes:35, source:'YAMAP谷川主脈JAPAN TRAIL・小障子ノ頭→オジカ沢避難小屋5分→オジカ沢ノ頭30分（2026-08-30確認）', sourceType:'yamap'},
  'オジカ沢ノ頭→谷川岳（トマノ耳）': {minutes:42, source:'YAMAP谷川主脈JAPAN TRAIL・オジカ沢ノ頭→谷川岳トマノ耳42分（2026-08-30確認）', sourceType:'yamap'}
});

const MAJOR_TRAIL_NETWORKS_V1548 = Object.freeze({
  ...MAJOR_TRAIL_NETWORKS_V1547,
  '大雪山・表大雪トムラウシ主縦走': Object.freeze({
    anchors:['大雪山（旭岳）','トムラウシ山'],
    nodes:Object.freeze(['七合目リフト駅','黒岳','黒岳石室','大雪山（旭岳）','北海岳','白雲岳避難小屋','忠別岳','五色岳','ヒサゴ沼避難小屋','トムラウシ山','トムラウシ短縮コース登山口']),
    edges:Object.freeze([
      ['七合目リフト駅','黒岳'],['黒岳','七合目リフト駅'],['黒岳','黒岳石室'],['黒岳石室','黒岳'],['黒岳石室','北海岳'],['大雪山（旭岳）','北海岳'],['北海岳','黒岳石室'],
      ['北海岳','白雲岳避難小屋'],['白雲岳避難小屋','忠別岳'],['忠別岳','五色岳'],['五色岳','ヒサゴ沼避難小屋'],
      ['ヒサゴ沼避難小屋','トムラウシ山'],['トムラウシ山','トムラウシ短縮コース登山口']
    ])
  }),
  '飯豊連峰・御沢飯豊大日主稜': Object.freeze({
    anchors:['飯豊山','大日岳（飯豊）'],
    nodes:Object.freeze(['御沢登山口','横峰','剣ヶ峰（飯豊）','三国岳','切合小屋','飯豊山','御西岳','大日岳（飯豊）']),
    edges:Object.freeze([
      ['御沢登山口','横峰'],['横峰','御沢登山口'],['横峰','剣ヶ峰（飯豊）'],['剣ヶ峰（飯豊）','横峰'],
      ['剣ヶ峰（飯豊）','三国岳'],['三国岳','剣ヶ峰（飯豊）'],['三国岳','切合小屋'],['切合小屋','三国岳'],
      ['切合小屋','飯豊山'],['飯豊山','御西岳'],['御西岳','飯豊山'],['御西岳','大日岳（飯豊）'],['大日岳（飯豊）','御西岳']
    ])
  }),
  '朝日連峰・大朝日以東大鳥池主稜': Object.freeze({
    anchors:['大朝日岳','以東岳'],
    nodes:Object.freeze(['大朝日岳','大朝日岳山頂避難小屋','竜門小屋','狐穴避難小屋','以東岳','オツボ峰','大鳥池タキタロウ山荘','泡滝ダム']),
    edges:Object.freeze([
      ['大朝日岳','大朝日岳山頂避難小屋'],['大朝日岳山頂避難小屋','大朝日岳'],
      ['大朝日岳山頂避難小屋','竜門小屋'],['竜門小屋','大朝日岳山頂避難小屋'],['竜門小屋','狐穴避難小屋'],['狐穴避難小屋','竜門小屋'],
      ['狐穴避難小屋','以東岳'],['以東岳','狐穴避難小屋'],['以東岳','オツボ峰'],['オツボ峰','以東岳'],
      ['オツボ峰','大鳥池タキタロウ山荘'],['大鳥池タキタロウ山荘','オツボ峰'],['泡滝ダム','大鳥池タキタロウ山荘'],['大鳥池タキタロウ山荘','泡滝ダム']
    ])
  }),
  '奥秩父・金峰国師甲武信主脈': Object.freeze({
    anchors:['金峰山','甲武信ヶ岳'],
    nodes:Object.freeze(['金峰山','朝日岳（奥秩父）','朝日峠（奥秩父）','大弛峠','国師ヶ岳','甲武信ヶ岳','笠取山']),
    edges:Object.freeze([
      ['大弛峠','朝日峠（奥秩父）'],['朝日峠（奥秩父）','大弛峠'],['朝日峠（奥秩父）','朝日岳（奥秩父）'],['朝日岳（奥秩父）','朝日峠（奥秩父）'],
      ['朝日岳（奥秩父）','金峰山'],['大弛峠','国師ヶ岳'],['国師ヶ岳','大弛峠'],['甲武信ヶ岳','大弛峠'],['笠取山','甲武信ヶ岳']
    ])
  }),
  '谷川連峰・平標谷川主脈': Object.freeze({
    anchors:['谷川岳','仙ノ倉山','平標山'],
    nodes:Object.freeze(['平標山','仙ノ倉山','エビス大黒ノ頭','毛渡乗越','万太郎山','大障子ノ頭','小障子ノ頭','オジカ沢ノ頭','谷川岳（トマノ耳）']),
    edges:Object.freeze([
      ['平標山','仙ノ倉山'],['仙ノ倉山','エビス大黒ノ頭'],['エビス大黒ノ頭','毛渡乗越'],['毛渡乗越','万太郎山'],
      ['万太郎山','大障子ノ頭'],['大障子ノ頭','小障子ノ頭'],['小障子ノ頭','オジカ沢ノ頭'],['オジカ沢ノ頭','谷川岳（トマノ耳）']
    ])
  })
});

// V1.5.44: replace coordinate-regression CT with publicly checked standard route times.
// Only exact endpoint pairs with a usable public source are registered here.
// Unresolved pairs intentionally return CT unavailable instead of a synthetic regression value.
const V1544_ESTIMATE_REPLACEMENT_COURSE_TIMES = Object.freeze({
  'オプタテシケ山→美瑛富士登山口': {minutes:310, source:'大雪山国立公園連絡協議会・美瑛富士登山口コース（下り5時間10分）', sourceType:'official'},
  'ニペソツ山→幌加温泉コース登山口': {minutes:345, source:'公開登山ガイド・幌加温泉コース標準CT（下り5時間45分）', sourceType:'other'},
  '神威岳→神威山荘・神威岳登山口': {minutes:181, source:'ヤマレコ公開山行計画 p5537354（神威岳→神威山荘側 181分）', sourceType:'yamareco'},
  '和賀岳→甘露水口・薬師岳登山口駐車場': {minutes:214, source:'ヤマレコ公開山行計画 p5597425（和賀岳→駐車場 214分）', sourceType:'yamareco'},
  '岳登山口・岳駐車場→早池峰山': {minutes:404, source:'ヤマレコ公開山行計画 p5422628（CTx1.0 岳駐車場→早池峰山 404分）', sourceType:'yamareco'},
  '早池峰山→岳登山口・岳駐車場': {minutes:266, source:'ヤマレコ公開山行計画 p5541509（早池峰山→岳駐車場 266分）', sourceType:'yamareco'},
  '皇海山→銀山平・皇海山登山者駐車場': {minutes:394, source:'ヤマレコ公開山行計画 p5497561（皇海山→銀山平 394分）', sourceType:'yamareco'},
  '湯檜曽公園・白毛門登山口側→朝日岳（群馬）': {minutes:364, source:'ヤマレコ公開山行計画 p5440032（白毛門登山口駐車場→朝日岳 364分）', sourceType:'yamareco'},
  '戸隠キャンプ場・戸隠牧場→戸隠山': {minutes:207, source:'ヤマレコ公開山行計画 p5232851（戸隠牧場バス停→戸隠山 207分）', sourceType:'yamareco'},
  '戸隠山→戸隠キャンプ場・戸隠牧場': {minutes:177, source:'ヤマレコ公開山行計画 p5232851（戸隠山→戸隠牧場バス停 177分）', sourceType:'yamareco'},
  '八甲田山（大岳）→八甲田ロープウェー山頂公園駅': {minutes:120, source:'ヤマレコ公開山行計画 p5522141（大岳→山頂公園駅 120分）', sourceType:'yamareco'},
  '三ノ瀬（民宿みはらし）→和名倉山（白石山）': {minutes:335, source:'ヤマレコ公開山行計画 p5540327（三ノ瀬登山口→和名倉山 335分）', sourceType:'yamareco'},
  '和名倉山（白石山）→三ノ瀬（民宿みはらし）': {minutes:253, source:'ヤマレコ公開山行計画 p5540327（和名倉山→三ノ瀬登山口 253分）', sourceType:'yamareco'},
  '鍬崎山→あわすのスキー場・鍬崎山登山口': {minutes:239, source:'ヤマレコ公開山行計画 p5526957（鍬崎山→あわすの 239分）', sourceType:'yamareco'},
  '奥茶臼山→しらびそ峠・奥茶臼山登山口': {minutes:253, source:'ヤマレコ公開山行計画 p5544831（奥茶臼山→しらびそ峠 253分）', sourceType:'yamareco'},
  '村営せせらぎ公園駐車場（猿ヶ馬場山残雪期ルート起点）→猿ヶ馬場山': {minutes:310, source:'ヤマレコ公開山行計画 p5226490（せせらぎ公園→猿ヶ馬場山 310分）', sourceType:'yamareco'},
  '猿ヶ馬場山→村営せせらぎ公園駐車場（猿ヶ馬場山残雪期ルート起点）': {minutes:210, source:'ヤマレコ公開山行計画 p5226490（猿ヶ馬場山→せせらぎ公園 210分）', sourceType:'yamareco'},
  '野伏ヶ岳→白山中居神社（野伏ヶ岳残雪期ルート起点）': {minutes:180, source:'ヤマレコ公開山行計画 p5226046（野伏ヶ岳→白山中居神社 180分）', sourceType:'yamareco'},
  '池口岳→池口林道口・池口岳登山口': {minutes:275, source:'ヤマレコ公開山行計画 p5272302（池口岳→登山口 275分）', sourceType:'yamareco'},
  '市房山→市房山キャンプ場（市房山登山口アクセス起点）': {minutes:149, source:'ヤマレコ公開山行計画 p5452598（市房山→キャンプ場 149分）', sourceType:'yamareco'},
  '三本杭→万年橋 滑床渓谷 三本杭登山口': {minutes:119, source:'ヤマレコ公開山行計画 p5284138（三本杭→万年橋 119分）', sourceType:'yamareco'},
  '熊伏山→青崩峠入口・熊伏山登山口': {minutes:104, source:'ヤマレコ公開山行計画 p5369999（熊伏山→青崩峠側 104分）', sourceType:'yamareco'},
  'しがらくび駐車場→医王山（奥医王山）': {minutes:74, source:'ヤマレコ公開山行計画 p5488109（しがらくび→夕霧峠→奥医王山 74分）', sourceType:'yamareco'},
  '医王山（奥医王山）→しがらくび駐車場': {minutes:58, source:'ヤマレコ公開山行計画 p5488109（奥医王山→夕霧峠→しがらくび 58分）', sourceType:'yamareco'}
});



// V1.5.50: custom-route CT repair for Kuju and Ontake.
// Goal: the points actually offered by "コースを自分で設計" must resolve through verified public CTs.
// These entries are published model-course subtotals between selectable endpoints; no coordinate/elevation estimates.
const V1550_CUSTOM_ROUTE_COURSE_TIMES = Object.freeze({
  // Kuju selectable-point links.
  '牧ノ戸峠→星生山': {minutes:154, source:'YAMAPモデルコース・牧ノ戸峠→沓掛山→扇ヶ鼻分岐→星生山 2時間34分（2026-08-31確認）', sourceType:'yamap'},
  '星生山→牧ノ戸峠': {minutes:102, source:'YAMAPモデルコース・星生山→扇ヶ鼻分岐→沓掛山→牧ノ戸峠 1時間42分（2026-08-31確認）', sourceType:'yamap'},
  '星生山→久住分かれ避難小屋': {minutes:60, source:'YAMAPモデルコース・星生山→久住分れ周辺 1時間（避難小屋は久住分れ隣接、2026-08-31確認）', sourceType:'yamap'},
  '久住分かれ避難小屋→星生山': {minutes:38, source:'YAMAPモデルコース・久住分れ周辺→星生山 約38分（避難小屋隣接区間を含む、2026-08-31確認）', sourceType:'yamap'},
  '久住山→中岳(くじゅう)': {minutes:61, source:'YAMAPモデルコース・久住山→天狗ヶ城→中岳 1時間01分（2026-08-31確認）', sourceType:'yamap'},
  '中岳(くじゅう)→久住山': {minutes:45, source:'YAMAPモデルコース・中岳→天狗ヶ城→久住山 45分（2026-08-31確認）', sourceType:'yamap'},
  '諏蛾守越→三俣山': {minutes:47, source:'YAMAPモデルコース・諏蛾守越→三俣山西峰→三俣山本峰 47分（2026-08-31確認）', sourceType:'yamap'},
  '三俣山→諏蛾守越': {minutes:72, source:'YAMAPモデルコース・三俣山本峰→IV峰側周回→諏蛾守越 1時間12分（公開モデル代表経路、2026-08-31確認）', sourceType:'yamap'},

  // Hyounosen representative-route splits. Route order confirmed by the official Tottori climbing map and public Yamareco plan.
  '福定親水公園 氷ノ山登山口→氷ノ山越避難小屋': {minutes:189, source:'ヤマレコ公開山行計画 p5706965・福定親水公園→地蔵堂→木地屋跡→氷ノ山越 189分（2026-09-05確認）', sourceType:'yamareco'},
  '氷ノ山越避難小屋→氷ノ山': {minutes:99, source:'ヤマレコ公開山行計画 p5706965・氷ノ山越→仙谷分岐→氷ノ山 99分（2026-09-05確認）', sourceType:'yamareco'},
  'わかさ氷ノ山登山口→氷ノ山越避難小屋': {minutes:75, source:'鳥取県公式・氷ノ山登山マップ 氷ノ越コース 登山口側→氷ノ越 1時間15分（2026-09-05確認）', sourceType:'official'},

  // Ontake Kurozawa-route selectable-point links.
  '中の湯登山口（黒沢口）→女人堂': {minutes:148, source:'ヤマレコ公開山行計画 p5776496・中の湯→女人堂 2時間28分（2026-08-31確認）', sourceType:'yamareco'},
  '女人堂→中の湯登山口（黒沢口）': {minutes:84, source:'ヤマレコ公開山行計画 p5776496・女人堂→中の湯 1時間24分（2026-08-31確認）', sourceType:'yamareco'},
  '女人堂→石室山荘': {minutes:80, source:'YAMAPモデルコース・女人堂→石室山荘 1時間20分（2026-08-31確認）', sourceType:'yamap'},
  '石室山荘→女人堂': {minutes:45, source:'YAMAPモデルコース・石室山荘→女人堂 45分（2026-08-31確認）', sourceType:'yamap'},
  '二の池ヒュッテ→五の池小屋': {minutes:45, source:'好日山荘・御嶽山登山レポート コースタイム（二の池ヒュッテ→五の池小屋 45分、2026-08-31確認）', sourceType:'guide'},
  '五の池小屋→二の池ヒュッテ': {minutes:45, source:'好日山荘・御嶽山登山レポート コースタイム（五の池小屋→二の池ヒュッテ 45分、2026-08-31確認）', sourceType:'guide'}
});



// V1.5.52: Japanese Alps custom-route CT repair (North/Central/South Alps).
// Publicly published walking CTs only; no coordinate/elevation estimation and no reverse mirroring.
const V1552_ALPS_CUSTOM_ROUTE_COURSE_TIMES = Object.freeze({
  '涸沢ヒュッテ→涸沢小屋': {minutes:10, source:'ヤマレコ公開山行記録 8122877・涸沢ヒュッテ→涸沢→涸沢小屋 10分（2026-08-31確認）', sourceType:'yamareco'},
  '涸沢小屋→涸沢ヒュッテ': {minutes:10, source:'ヤマレコ公開山行計画 p5563560・涸沢小屋→涸沢ヒュッテ 10分（2026-08-31確認）', sourceType:'yamareco'},
  '新穂高ロープウェイ 西穂高口駅→西穂山荘': {minutes:79, source:'ヤマレコ公開山行計画 p5640259・西穂高口→西穂山荘 79分（2026-08-31確認）', sourceType:'yamareco'},
  '西穂山荘→新穂高ロープウェイ 西穂高口駅': {minutes:58, source:'ヤマレコ公開山行計画 p5659809・西穂山荘→西穂高口 58分（2026-08-31確認）', sourceType:'yamareco'},
  '西穂山荘→西穂高岳': {minutes:142, source:'ヤマレコ公開山行計画 p5640259・西穂山荘→丸山→独標→西穂高岳 142分（2026-08-31確認）', sourceType:'yamareco'},
  '西穂高岳→西穂山荘': {minutes:86, source:'ヤマレコ公開山行計画 p5659809・西穂高岳→独標→丸山→西穂山荘 86分（2026-08-31確認）', sourceType:'yamareco'},
  '西穂高岳→ジャンダルム': {minutes:213, source:'ヤマレコ公開山行計画 p5640259・西穂高岳→間ノ岳→天狗ノ頭→天狗のコル→ジャンダルム 213分（2026-08-31確認）', sourceType:'yamareco'},
  'ジャンダルム→西穂高岳': {minutes:177, source:'ヤマレコ公開山行計画 p5544202・ジャンダルム→天狗のコル→天狗ノ頭→間ノ岳→西穂高岳 177分（2026-08-31確認）', sourceType:'yamareco'},
  'ジャンダルム→奥穂高岳': {minutes:45, source:'ヤマレコ公開山行計画 p5640259・ジャンダルム→奥穂高岳 45分（2026-08-31確認）', sourceType:'yamareco'},
  '奥穂高岳→ジャンダルム': {minutes:40, source:'ヤマレコ公開山行計画 p5659809・奥穂高岳→ジャンダルム 40分（2026-08-31確認）', sourceType:'yamareco'},
  '焼岳→西穂山荘': {minutes:178, source:'ヤマレコ公開山行計画 p5843002・焼岳→中尾峠→割谷山→西穂山荘 178分（2026-08-31確認）', sourceType:'yamareco'},
  '焼岳小屋→焼岳': {minutes:59, source:'松本市上高地公式（焼岳小屋は新中尾峠）＋YAMAPモデル・新中尾峠→中尾峠55分→分岐2分→焼岳2分（合算59分、2026-08-31確認）', sourceType:'derived-verified'},
  '焼岳→焼岳小屋': {minutes:160, source:'松本市上高地公式（焼岳小屋は新中尾峠）＋YAMAPモデル・焼岳→分岐45分→中尾峠20分→新中尾峠95分（合算160分、2026-08-31確認）', sourceType:'derived-verified'},
  '西穂山荘→焼岳': {minutes:280, source:'ヤマレコ公開山行計画 p5525008・西穂山荘→割谷山→焼岳小屋→中尾峠→焼岳 280分（2026-08-31確認）', sourceType:'yamareco'},
  '七倉→船窪小屋': {minutes:360, source:'船窪小屋公式・七倉登山口ルート 往路6時間（2026-08-31確認）', sourceType:'official'},
  '船窪小屋→七倉': {minutes:240, source:'船窪小屋公式・七倉登山口ルート 復路4時間（2026-08-31確認）', sourceType:'official'},
  '船窪小屋→針ノ木小屋': {minutes:476, source:'ヤマレコ公開山行計画 p5528756・船窪小屋→七倉岳→北葛岳→蓮華岳→針ノ木小屋 7時間56分（2026-08-31確認）', sourceType:'yamareco'},
  '針ノ木小屋→船窪小屋': {minutes:360, source:'神戸山岳会公開山行記録・針ノ木小屋→蓮華岳→北葛岳→七倉岳→船窪小屋 6時間（2026-08-31確認）', sourceType:'guide'},
  '高瀬ダム→船窪小屋': {minutes:780, source:'船窪小屋公式・高瀬ダム→烏帽子小屋→不動岳→船窪小屋 約13時間（2026-08-31確認）', sourceType:'official'},
  '船窪小屋→高瀬ダム': {minutes:720, source:'船窪小屋公式・船窪小屋→不動岳→烏帽子小屋→高瀬ダム 約12時間（2026-08-31確認）', sourceType:'official'},
  '室堂→雷鳥荘': {minutes:30, source:'雷鳥荘公式・室堂ターミナル→雷鳥荘 徒歩30分（2026-08-31確認）', sourceType:'official'},
  '雷鳥荘→室堂': {minutes:43, source:'ヤマレコ公開山行計画 p5670760・雷鳥荘→みくりが池→室堂 43分（2026-08-31確認）', sourceType:'yamareco'},
  '天狗荘→頂上山荘': {minutes:22, source:'ヤマレコ公開山行記録 7993125・天狗荘→中岳→木曽駒ヶ岳頂上山荘 22分（2026-08-31確認）', sourceType:'yamareco'},
  '頂上山荘→天狗荘': {minutes:12, source:'ヤマレコ公開山行記録 7993125・木曽駒ヶ岳頂上山荘→中岳→天狗荘 12分（2026-08-31確認）', sourceType:'yamareco'},
  '南御室小屋→鳳凰山': {minutes:130, source:'南アルプス市芦安山岳館・夜叉神コース 南御室小屋→薬師岳→観音岳 2時間10分（2026-08-31確認）', sourceType:'official'},
  '鳳凰山→南御室小屋': {minutes:100, source:'南アルプス市芦安山岳館・夜叉神コース 観音岳→薬師岳→南御室小屋 1時間40分（2026-08-31確認）', sourceType:'official'},
  '三伏峠小屋→荒川小屋': {minutes:615, source:'山旅GOGO・山と高原地図CT 高山裏避難小屋経由 5時間35分+4時間40分=10時間15分（2026-08-31確認）', sourceType:'guide'},
  '荒川小屋→三伏峠小屋': {minutes:580, source:'山旅GOGO・山と高原地図CT 高山裏避難小屋経由 4時間00分+5時間40分=9時間40分（2026-08-31確認）', sourceType:'guide'}
});

const V1552_ALPS_ROUTE_ENDPOINTS = new Set([
  "わさび平小屋",
  "アルプス平",
  "ジャンダルム",
  "一の越山荘",
  "一ノ沢登山口",
  "七倉",
  "三伏峠小屋",
  "三俣山荘",
  "三俣蓮華岳",
  "三股登山口",
  "上河内岳",
  "上高地",
  "中岳",
  "中房温泉登山口",
  "中白根山",
  "五竜山荘",
  "五竜岳",
  "仙丈ヶ岳",
  "仙丈小屋",
  "仙水小屋",
  "光岳",
  "光岳小屋",
  "八方池山荘",
  "冷池山荘",
  "前穂高岳",
  "剣山荘",
  "剱岳",
  "剱澤小屋",
  "北岳",
  "北岳山荘",
  "北岳肩の小屋",
  "北沢峠",
  "北穂高小屋",
  "北穂高岳",
  "千枚小屋",
  "千畳敷",
  "南岳",
  "南岳小屋",
  "南御室小屋",
  "双六小屋",
  "双六岳",
  "唐松岳",
  "唐松岳頂上山荘",
  "塩見小屋",
  "塩見岳",
  "夜叉神峠登山口",
  "大喰岳",
  "大天井岳",
  "大天荘",
  "大谷原登山口",
  "大門沢小屋",
  "天狗荘",
  "太郎平小屋",
  "奈良田",
  "奥大日岳",
  "奥穂高岳",
  "宝剣山荘",
  "宝剣岳",
  "室堂",
  "常念小屋",
  "常念岳",
  "広河原",
  "戸台パーク（仙流荘）",
  "扇沢登山口",
  "折立登山口",
  "新中の湯登山口",
  "新穂高ロープウェイ 西穂高口駅",
  "新穂高温泉",
  "早月小屋",
  "朝日小屋",
  "木曽殿山荘",
  "木曽駒ヶ岳",
  "東川岳",
  "栂池自然園",
  "椹島",
  "槍ヶ岳",
  "槍ヶ岳山荘",
  "槍沢ロッヂ",
  "横尾山荘",
  "檜尾小屋",
  "檜尾岳",
  "水晶小屋",
  "水晶岳",
  "池山口登山口",
  "沼平ゲート",
  "涸沢ヒュッテ",
  "涸沢小屋",
  "涸沢岳",
  "烏帽子小屋",
  "烏帽子岳",
  "焼岳",
  "焼岳小屋",
  "熊沢岳",
  "燕山荘",
  "燕岳",
  "爺ヶ岳",
  "猿倉",
  "甲斐駒ヶ岳",
  "白根御池小屋",
  "白馬大池山荘",
  "白馬山荘",
  "白馬岳",
  "種池山荘",
  "穂高岳山荘",
  "空木岳",
  "空木平避難小屋",
  "空木駒峰ヒュッテ",
  "立山（雄山）",
  "笠ヶ岳",
  "笠ヶ岳山荘",
  "笠新道登山口",
  "聖岳",
  "聖平小屋",
  "船窪小屋",
  "茶臼小屋",
  "茶臼岳",
  "荒川小屋",
  "荒川岳",
  "蓮華岳",
  "蓮華温泉",
  "薬師岳",
  "薬師岳山荘",
  "薬師沢小屋",
  "蝶ヶ岳",
  "蝶ヶ岳ヒュッテ",
  "西穂山荘",
  "西穂高岳",
  "赤石小屋",
  "赤石岳",
  "農鳥小屋",
  "農鳥岳",
  "野口五郎小屋",
  "野口五郎岳",
  "針ノ木小屋",
  "針ノ木岳",
  "鏡平山荘",
  "長衛小屋",
  "間ノ岳",
  "雲ノ平山荘",
  "雷鳥荘",
  "頂上山荘",
  "馬の背ヒュッテ",
  "高瀬ダム",
  "鳥倉登山口",
  "鳳凰山",
  "鷲羽岳",
  "鹿島槍ヶ岳",
  "黒部五郎小舎",
  "黒部五郎岳",

]);
function v1552AllowLongVerifiedAlpsRoute(fromName,toName){
  return V1552_ALPS_ROUTE_ENDPOINTS.has(fromName)&&V1552_ALPS_ROUTE_ENDPOINTS.has(toName);
}

// V1.5.51: custom-route CT repair for Ontake and South Yatsugatake.
// Public standard/planned CTs only. Long links are published endpoint-to-endpoint subtotals
// across named intermediate checkpoints; no distance/elevation estimation or reverse mirroring.
const V1551_ONTAKE_YATSUGATAKE_COURSE_TIMES = Object.freeze({
  // Yatsugatake: connect the actual UI-selectable southern-area points into one bidirectional verified graph.
  '美濃戸口→美濃戸': {minutes:52, source:'YAMAPモデルコース・八ヶ岳山荘（美濃戸口）→美濃戸登山口 52分（2026-08-31確認）', sourceType:'yamap'},
  '美濃戸→美濃戸口': {minutes:42, source:'YAMAPモデルコース・美濃戸登山口→八ヶ岳山荘（美濃戸口）42分（2026-08-31確認）', sourceType:'yamap'},
  // V1.5.53: 南八ヶ岳の二大アプローチを実登山道の隣接CTで接続。
  // 北沢（赤岳鉱泉）と南沢（行者小屋）を、美濃戸口から赤岳経由の遠回りで誤合算しない。
  '美濃戸→赤岳鉱泉': {minutes:135, source:'YAMAPモデルコース・美濃戸登山口→堰堤広場55分→赤岳鉱泉80分（合算135分、2026-08-31確認）', sourceType:'yamap'},
  '赤岳鉱泉→美濃戸': {minutes:45, source:'YAMAPモデルコース・赤岳鉱泉→堰堤広場40分→美濃戸登山口5分（合算45分、2026-08-31確認）', sourceType:'yamap'},
  '美濃戸→行者小屋': {minutes:171, source:'YAMAPモデルコース・美濃戸登山口→行者小屋テント場170分→行者小屋1分（合算171分、2026-08-31確認）', sourceType:'yamap'},
  '行者小屋→美濃戸': {minutes:145, source:'YAMAPモデルコース・行者小屋→行者小屋テント場140分→美濃戸登山口5分（合算145分、2026-08-31確認）', sourceType:'yamap'},
  '美濃戸口→赤岳鉱泉': {minutes:187, source:'YAMAPモデルコース・八ヶ岳山荘（美濃戸口）→美濃戸52分＋美濃戸→赤岳鉱泉135分（確認済み区間合算187分）', sourceType:'derived-verified'},
  '赤岳鉱泉→美濃戸口': {minutes:87, source:'YAMAPモデルコース・赤岳鉱泉→美濃戸45分＋美濃戸→八ヶ岳山荘（美濃戸口）42分（確認済み区間合算87分）', sourceType:'derived-verified'},
  '美濃戸口→行者小屋': {minutes:223, source:'YAMAPモデルコース・八ヶ岳山荘（美濃戸口）→美濃戸52分＋美濃戸→行者小屋171分（確認済み区間合算223分）', sourceType:'derived-verified'},
  '行者小屋→美濃戸口': {minutes:187, source:'YAMAPモデルコース・行者小屋→美濃戸145分＋美濃戸→八ヶ岳山荘（美濃戸口）42分（確認済み区間合算187分）', sourceType:'derived-verified'},
  '富士見高原登山口→編笠山': {minutes:268, source:'YAMAPモデルコース・富士見高原登山口→編笠山 4時間28分（2026-08-31確認）', sourceType:'yamap'},
  '編笠山→富士見高原登山口': {minutes:136, source:'YAMAPモデルコース・編笠山→富士見高原登山口 2時間16分（2026-08-31確認）', sourceType:'yamap'},
  '編笠山→観音平': {minutes:171, source:'YAMAPモデルコース・編笠山→観音平 2時間51分（2026-08-31確認）', sourceType:'yamap'},
  '青年小屋→編笠山': {minutes:31, source:'ヤマレコ公開山行計画 p5548450・青年小屋→編笠山 31分（2026-08-31確認）', sourceType:'yamareco'},
  '権現岳→青年小屋': {minutes:50, source:'ヤマレコ公開山行計画 p5551030・権現岳→権現小屋→ギボシ→青年小屋 50分（2026-08-31確認）', sourceType:'yamareco'},
  '権現小屋→権現岳': {minutes:6, source:'ヤマレコ公開山行計画 p5551030・権現小屋→権現岳 6分（2026-08-31確認）', sourceType:'yamareco'},
  '権現岳→権現小屋': {minutes:4, source:'ヤマレコ公開山行計画 p5551030・権現岳→権現小屋 4分（2026-08-31確認）', sourceType:'yamareco'},
  '権現岳→赤岳': {minutes:172, source:'ヤマレコ公開山行計画 p5527748・権現岳→旭岳→ツルネ→キレット小屋→赤岳 2時間52分（2026-08-31確認）', sourceType:'yamareco'},
  '赤岳→権現岳': {minutes:123, source:'ヤマレコ公開山行計画 p5547010・赤岳→キレット小屋→ツルネ→旭岳→権現岳 2時間03分（2026-08-31確認）', sourceType:'yamareco'}
});


// V1.5.55: restore high-value hidden corridor points with public checkpoint CTs.
// Oze uses the YAMAP Hatomachitoge-Miharashi public model-course checkpoint times.
// No reverse mirroring: each direction below is independently visible in the published checkpoint sequence.
const V1555_ROUTE_RESTORE_COURSE_TIMES = Object.freeze({
  // Tanigawa candidate labels: exact raw-name bridge for the public Tenjin-ridge checkpoint CT.
  'トマノ耳→谷川岳（オキノ耳）': {minutes:15, source:'YAMAP天神尾根モデルコース・谷川岳（トマノ耳）10:42→谷川岳（オキノ耳）10:57、15分（2026-08-31確認）', sourceType:'yamap'},
  '谷川岳（オキノ耳）→トマノ耳': {minutes:7, source:'YAMAP天神尾根モデルコース・谷川岳（オキノ耳）10:57→谷川岳（トマノ耳）11:04、7分（2026-08-31確認）', sourceType:'yamap'},
  '熊穴沢避難小屋→谷川岳（オキノ耳）': {minutes:127, source:'YAMAP天神尾根モデルコース・熊穴沢ノ頭08:50→谷川岳（オキノ耳）10:57、2時間07分（2026-08-31確認）', sourceType:'yamap'},
  '谷川岳（オキノ耳）→熊穴沢避難小屋': {minutes:92, source:'YAMAP天神尾根モデルコース・谷川岳（オキノ耳）10:57→熊穴沢ノ頭12:29、1時間32分（2026-08-31確認）', sourceType:'yamap'},
  '竜宮十字路→龍宮小屋': {minutes:3, source:'YAMAPモデルコース・鳩待峠-見晴 往復（竜宮十字路09:28→龍宮小屋09:31、3分、2026-08-31確認）', sourceType:'yamap'},
  '龍宮小屋→竜宮十字路': {minutes:4, source:'YAMAPモデルコース・鳩待峠-見晴 往復（龍宮小屋10:26→竜宮十字路10:30、4分、2026-08-31確認）', sourceType:'yamap'},
  '龍宮小屋→見晴（尾瀬小屋・見晴地区）': {minutes:30, source:'YAMAPモデルコース・鳩待峠-見晴 往復（龍宮小屋09:31→見晴10:01、30分、2026-08-31確認）', sourceType:'yamap'},
  '見晴（尾瀬小屋・見晴地区）→龍宮小屋': {minutes:25, source:'YAMAPモデルコース・鳩待峠-見晴 往復（見晴10:01→龍宮小屋10:26、25分、2026-08-31確認）', sourceType:'yamap'},
  '鳩待峠→龍宮小屋': {minutes:151, source:'YAMAPモデルコース・鳩待峠-見晴 往復（鳩待峠07:00→龍宮小屋09:31、2時間31分、2026-08-31確認）', sourceType:'yamap'},
  '龍宮小屋→鳩待峠': {minutes:187, source:'YAMAPモデルコース・鳩待峠-見晴 往復（龍宮小屋10:26→鳩待峠13:33、3時間07分、2026-08-31確認）', sourceType:'yamap'},
  '鳩待峠→見晴（尾瀬小屋・見晴地区）': {minutes:181, source:'YAMAPモデルコース・鳩待峠-見晴 往復（鳩待峠07:00→見晴10:01、3時間01分、2026-08-31確認）', sourceType:'yamap'},
  '見晴（尾瀬小屋・見晴地区）→鳩待峠': {minutes:212, source:'YAMAPモデルコース・鳩待峠-見晴 往復（見晴10:01→鳩待峠13:33、3時間32分、2026-08-31確認）', sourceType:'yamap'}
});

// V1.5.54: nationwide custom-route integrity pass.
// Add only publicly verified / already-verified-composite links for high-use selectable points.
// No coordinate/elevation estimation and no reverse mirroring.
const V1554_ROUTE_INTEGRITY_COURSE_TIMES = Object.freeze({
  // Kuju: keep Mt. Mimata connected to the selectable Chojabaru-side network using already verified adjacent CTs.
  '長者原→三俣山': {minutes:137, source:'確認済みCT区間合算・長者原→砂防ダム30分＋砂防ダム→諏蛾守越60分＋諏蛾守越→三俣山47分（公開CTのみ、2026-08-31確認）', sourceType:'composed-verified'},
  '三俣山→長者原': {minutes:152, source:'確認済みCT区間合算・三俣山→諏蛾守越72分＋諏蛾守越→砂防ダム50分＋砂防ダム→長者原30分（公開CTのみ、2026-08-31確認）', sourceType:'composed-verified'},

  // Kobotoke/Kobushigatake: YAMAP model course exposes the hut immediately below the summit.
  '甲武信小屋→甲武信ヶ岳': {minutes:15, source:'YAMAPモデルコース・甲武信小屋→甲武信ヶ岳 15分（2026-08-31確認）', sourceType:'yamap'},
  '甲武信ヶ岳→甲武信小屋': {minutes:20, source:'YAMAPモデルコース・甲武信ヶ岳→甲武信小屋 20分（2026-08-31確認）', sourceType:'yamap'},

  // Tanigawa: standard Tenjin-ridge model course between the two summits.
  '谷川岳（トマノ耳）→谷川岳（オキノ耳）': {minutes:15, source:'YAMAP天神尾根モデルコース・谷川岳（トマノ耳）→谷川岳（オキノ耳）15分（2026-08-31確認）', sourceType:'yamap'},
  '谷川岳（オキノ耳）→谷川岳（トマノ耳）': {minutes:7, source:'YAMAP天神尾根モデルコース・谷川岳（オキノ耳）→谷川岳（トマノ耳）7分（2026-08-31確認）', sourceType:'yamap'},
  'トマノ耳→谷川岳 オキノ耳': {minutes:15, source:'YAMAP天神尾根モデルコース・トマノ耳→オキノ耳15分（2026-08-31確認）', sourceType:'yamap'},
  '谷川岳 オキノ耳→トマノ耳': {minutes:7, source:'YAMAP天神尾根モデルコース・オキノ耳→トマノ耳7分（2026-08-31確認）', sourceType:'yamap'},

  // Ishizuchi: ridge section between Misen and Tengu-dake.
  '石鎚山（弥山）→石鎚山（天狗岳）': {minutes:20, source:'YAMAP公開モデルコース・石鎚山（弥山）→天狗岳20分（2026-08-31確認）', sourceType:'yamap'},
  '石鎚山（天狗岳）→石鎚山（弥山）': {minutes:7, source:'YAMAP公開モデルコース・天狗岳→石鎚山（弥山）7分（2026-08-31確認）', sourceType:'yamap'}
});

const V1551_LONG_VERIFIED_CUSTOM_ROUTE_GROUPS = Object.freeze([
  new Set(['中の湯登山口（黒沢口）','田の原登山口','女人堂','石室山荘','二の池ヒュッテ','五の池小屋','御嶽山（剣ヶ峰）']),
  new Set(['美濃戸口','美濃戸','富士見高原登山口','観音平','赤岳鉱泉','行者小屋','赤岳','赤岳天望荘','横岳（八ヶ岳）','硫黄岳（八ヶ岳）','硫黄岳山荘','阿弥陀岳','権現岳','権現小屋','編笠山','青年小屋'])
]);
function v1551AllowLongVerifiedCustomRoute(fromName,toName){
  return V1551_LONG_VERIFIED_CUSTOM_ROUTE_GROUPS.some(group=>group.has(fromName)&&group.has(toName));
}



const V1584_PRIORITY_B_COURSE_TIMES = Object.freeze({
  '八方台登山口→弘法清水小屋':{minutes:105,source:'猪苗代観光協会公式・磐梯山登山マップ（八方台→中ノ湯35分＋中ノ湯→弘法清水70分）',sourceType:'official'},
  '弘法清水小屋→磐梯山':{minutes:30,source:'猪苗代観光協会公式・磐梯山登山マップ（弘法清水→山頂30分）',sourceType:'official'},
  '磐梯山→弘法清水小屋':{minutes:20,source:'猪苗代観光協会公式・磐梯山登山マップ（山頂→弘法清水20分）',sourceType:'official'},
  '弘法清水小屋→八方台登山口':{minutes:80,source:'猪苗代観光協会公式・磐梯山登山マップ（弘法清水→中ノ湯55分＋中ノ湯→八方台25分）',sourceType:'official'},
  '雨飾高原キャンプ場登山口→荒菅沢':{minutes:110,source:'環境省・雨飾山（荒菅沢まで）上り約1時間50分',sourceType:'official'},
  '荒菅沢→雨飾山':{minutes:130,source:'既存確認済み雨飾高原→雨飾山240分から公式登山口→荒菅沢110分を差引',sourceType:'derived-verified'},
  '雨飾山→荒菅沢':{minutes:90,source:'既存確認済み雨飾山→雨飾高原185分から公式荒菅沢→登山口95分を差引',sourceType:'derived-verified'},
  '荒菅沢→雨飾高原キャンプ場登山口':{minutes:95,source:'環境省・雨飾山（荒菅沢まで）下り約1時間35分',sourceType:'official'},
  '二荒山神社中宮祠登山口→八合目 瀧尾神社':{minutes:175,source:'YAMAP公開モデル・二荒山神社-男体山往復（登拝門→三合目45分→四合目25分→瀧尾神社105分）',sourceType:'yamap'},
  '八合目 瀧尾神社→男体山':{minutes:62,source:'YAMAP公開モデル・男体山（瀧尾神社→奥宮60分＋奥宮→男体山2分）',sourceType:'yamap'},
  '男体山→八合目 瀧尾神社':{minutes:37,source:'YAMAP公開モデル・男体山（男体山→奥宮2分＋奥宮→瀧尾神社35分）',sourceType:'yamap'},
  '八合目 瀧尾神社→二荒山神社中宮祠登山口':{minutes:130,source:'YAMAP公開モデル・男体山（瀧尾神社→四合目80分→三合目20分→登拝門30分）',sourceType:'yamap'},
  '椹島→聖平小屋':{minutes:321,source:'既存確認済みCT・椹島→聖平小屋',sourceType:'derived-verified'},
  '聖平小屋→聖岳':{minutes:179,source:'既存確認済みCT・聖平小屋→聖岳',sourceType:'yamareco'},
  '聖岳→聖平小屋':{minutes:104,source:'既存確認済みCT・聖岳→聖平小屋',sourceType:'yamareco'},
  '聖平小屋→椹島':{minutes:256,source:'既存確認済み聖岳→椹島360分から聖岳→聖平小屋104分を差引',sourceType:'derived-verified'}
});

const V1583_PRIORITY_B_COURSE_TIMES = Object.freeze({
  '大日杉登山口→切合小屋':{minutes:445,source:'既存確認済みCT・大日杉→切合小屋',sourceType:'verified'},
  '切合小屋→本山小屋':{minutes:121,source:'ヤマレコ標準コースタイム区間合算・切合小屋→本山小屋',sourceType:'yamareco'},
  '本山小屋→飯豊山':{minutes:14,source:'ヤマレコ標準コースタイム・本山小屋→飯豊山',sourceType:'yamareco'},
  '飯豊山→本山小屋':{minutes:5,source:'ヤマレコ標準コースタイム・飯豊山→本山小屋',sourceType:'yamareco'},
  '本山小屋→切合小屋':{minutes:92,source:'ヤマレコ標準コースタイム区間合算・本山小屋→切合小屋',sourceType:'yamareco'},
  '飯豊山→大日杉登山口':{minutes:425,source:'既存確認済み下山CT・飯豊山→大日杉',sourceType:'verified'},
  '日暮沢登山口駐車場（日暮沢小屋）→竜門小屋':{minutes:367,source:'既存確認済みCT・日暮沢→竜門小屋',sourceType:'verified'},
  '竜門小屋→大朝日岳山頂避難小屋':{minutes:180,source:'朝日鉱泉公式・竜門山避難小屋→大朝日岳山頂避難小屋 3時間',sourceType:'official'},
  '大朝日岳山頂避難小屋→大朝日岳':{minutes:20,source:'朝日鉱泉公式・山頂避難小屋→大朝日岳 約20分',sourceType:'official'},
  '大朝日岳→大朝日岳山頂避難小屋':{minutes:10,source:'朝日鉱泉公式・大朝日岳→山頂避難小屋 約10分',sourceType:'official'},
  '大朝日岳→日暮沢登山口駐車場（日暮沢小屋）':{minutes:340,source:'既存確認済み下山CT・大朝日岳→日暮沢',sourceType:'verified'},
  '銀山平・皇海山登山者駐車場→庚申山荘（避難小屋）':{minutes:201,source:'YAMAPモデル・銀山平→庚申山荘',sourceType:'yamap'},
  '庚申山荘（避難小屋）→庚申山':{minutes:45,source:'YAMAPモデル・庚申山荘→庚申山',sourceType:'yamap'},
  '庚申山→皇海山':{minutes:237,source:'YAMAPモデル・庚申山→鋸山→皇海山区間合算',sourceType:'yamap'},
  '皇海山→銀山平・皇海山登山者駐車場':{minutes:394,source:'既存確認済みCT・皇海山→銀山平',sourceType:'verified'},
  '八方台登山口→弘法清水小屋':{minutes:125,source:'既存確認済みCT・八方台→弘法清水小屋',sourceType:'verified'},
  '弘法清水小屋→磐梯山':{minutes:40,source:'既存確認済みCT・弘法清水小屋→磐梯山',sourceType:'verified'},
  '磐梯山→弘法清水小屋':{minutes:22,source:'既存確認済みCT・磐梯山→弘法清水小屋',sourceType:'verified'},
  '弘法清水小屋→八方台登山口':{minutes:86,source:'既存確認済みCT・弘法清水小屋→八方台',sourceType:'verified'},
  '鉾立登山口（象潟口）→御浜小屋':{minutes:92,source:'YAMAP公開モデル・鉾立→御浜小屋区間合算',sourceType:'yamap'},
  '御浜小屋→鳥海山（新山）':{minutes:214,source:'既存確認済み鉾立→新山306分から鉾立→御浜92分を差引',sourceType:'derived-verified'},
  '鳥海山（新山）→御浜小屋':{minutes:115,source:'YAMAP公開モデル・新山→御浜小屋区間合算',sourceType:'yamap'},
  '御浜小屋→鉾立登山口（象潟口）':{minutes:88,source:'既存確認済み新山→鉾立203分から新山→御浜115分を差引',sourceType:'derived-verified'},
  '毛木平登山口→甲武信小屋':{minutes:225,source:'既存確認済み登り240分から甲武信小屋→山頂15分を差引',sourceType:'derived-verified'},
  '甲武信小屋→甲武信ヶ岳':{minutes:15,source:'YAMAPモデル・甲武信小屋→甲武信ヶ岳',sourceType:'yamap'},
  '甲武信ヶ岳→甲武信小屋':{minutes:20,source:'YAMAPモデル・甲武信ヶ岳→甲武信小屋',sourceType:'yamap'},
  '甲武信小屋→毛木平登山口':{minutes:148,source:'既存確認済み下山168分から山頂→甲武信小屋20分を差引',sourceType:'derived-verified'}
});

// V1.5.128: verified split CT for remaining 3-point routes.
// Mitsutoge values are summed from YAMAP model-course checkpoints around Shikirakuen.
// Buna values are summed from the YAMAP Inatani/Kanakuso model route. No estimated CT is used.
const V15128_THREE_POINT_SPLIT_COURSE_TIMES = Object.freeze({
  '三ツ峠登山口→四季楽園': {minutes:76, source:'YAMAP三ッ峠山・御坂側モデルコース（登山口駐車場→四季楽園の公開チェックポイント合算）', sourceType:'yamap'},
  '四季楽園→三ッ峠山': {minutes:18, source:'YAMAP三ッ峠山・御坂側モデルコース（四季楽園→開運山の公開チェックポイント合算）', sourceType:'yamap'},
  '三ッ峠山→四季楽園': {minutes:5, source:'YAMAP三ッ峠山往復モデル（開運山→四季楽園の公開チェックポイント合算）', sourceType:'yamap'},
  '四季楽園→三ツ峠登山口': {minutes:66, source:'YAMAP三ッ峠山往復モデル（四季楽園→登山口駐車場の公開チェックポイント合算）', sourceType:'yamap'},
  'イン谷口→金糞峠': {minutes:98, source:'YAMAP金糞峠-コヤマノ岳-武奈ヶ岳往復モデル（イン谷口駐車場→金糞峠）', sourceType:'yamap'},
  '金糞峠→武奈ヶ岳': {minutes:97, source:'YAMAP金糞峠-コヤマノ岳-武奈ヶ岳往復モデル（金糞峠→武奈ヶ岳）', sourceType:'yamap'},
  '武奈ヶ岳→金糞峠': {minutes:76, source:'YAMAP金糞峠-コヤマノ岳-武奈ヶ岳往復モデル（武奈ヶ岳→金糞峠）', sourceType:'yamap'},
  '金糞峠→イン谷口': {minutes:85, source:'YAMAP金糞峠-コヤマノ岳-武奈ヶ岳往復モデル（金糞峠→イン谷口駐車場）', sourceType:'yamap'}
});

// V1.5.127: verified segment splits for three remaining 3-point representative routes.
// Values are from already accepted public route totals/checkpoints; no estimation or distance apportionment.
const V15127_THREE_POINT_SPLIT_COURSE_TIMES = Object.freeze({
  '那須ロープウェイ・峠の茶屋側→峰の茶屋跡避難小屋': {minutes:50, source:'YAMAP峠の茶屋登山口-茶臼岳モデル + 既存同一起点CTを区間化', sourceType:'yamap'},
  '峰の茶屋跡避難小屋→茶臼岳（那須岳）': {minutes:51, source:'既存確認済み那須岳CT（峰の茶屋経由）', sourceType:'yamap'},
  '茶臼岳（那須岳）→峰の茶屋跡避難小屋': {minutes:27, source:'既存確認済み那須岳CT（峰の茶屋経由）', sourceType:'yamap'},
  '峰の茶屋跡避難小屋→那須ロープウェイ・峠の茶屋側': {minutes:35, source:'YAMAP峠の茶屋登山口-茶臼岳モデル + 既存同一起点CTを区間化', sourceType:'yamap'},
  '中出コース登山口→シャクナゲ平': {minutes:137, source:'既存V1.5.82/YAMAP中出コース確認済み区間', sourceType:'yamap'},
  'シャクナゲ平→荒島岳': {minutes:83, source:'既存V1.5.82 YAMAP荒島岳モデル', sourceType:'yamap'},
  '荒島岳→シャクナゲ平': {minutes:61, source:'既存V1.5.82 YAMAP荒島岳モデル', sourceType:'yamap'},
  'シャクナゲ平→中出コース登山口': {minutes:99, source:'既存V1.5.82/YAMAP中出コース確認済み区間', sourceType:'yamap'},
  '芦屋川 高座の滝→風吹岩': {minutes:40, source:'山と高原地図Web・高座の滝→風吹岩40分', sourceType:'yamakei'},
  '風吹岩→雨ヶ峠': {minutes:60, source:'山と高原地図Web・風吹岩→雨ヶ峠60分', sourceType:'yamakei'},
  '雨ヶ峠→一軒茶屋': {minutes:90, source:'山と高原地図Web・雨ヶ峠→一軒茶屋90分', sourceType:'yamakei'},
  '一軒茶屋→六甲山': {minutes:10, source:'山と高原地図Web・一軒茶屋→六甲山最高峰10分', sourceType:'yamakei'}
});

const COURSE_TIME_TABLES = Object.freeze([
  V15128_THREE_POINT_SPLIT_COURSE_TIMES,
  V15127_THREE_POINT_SPLIT_COURSE_TIMES,
  V1584_PRIORITY_B_COURSE_TIMES,
  V1583_PRIORITY_B_COURSE_TIMES,
  V1555_ROUTE_RESTORE_COURSE_TIMES,
  V1554_ROUTE_INTEGRITY_COURSE_TIMES,
  V1552_ALPS_CUSTOM_ROUTE_COURSE_TIMES,
  V1551_ONTAKE_YATSUGATAKE_COURSE_TIMES,
  V1550_CUSTOM_ROUTE_COURSE_TIMES,
  V1548_DEEP_NETWORK_COURSE_TIMES,
  V1547_NATIONAL_NETWORK_COURSE_TIMES,
  V1546_ALPS_NETWORK_COURSE_TIMES,
  V1545_AREA_NETWORK_COURSE_TIMES,
  V1544_ESTIMATE_REPLACEMENT_COURSE_TIMES,
  V1543_LONG_ROUTE_REVIEW_COURSE_TIMES,
  V1542_LONG_ROUTE_SPLIT_COURSE_TIMES,
  V1541_LONG_ROUTE_SPLIT_COURSE_TIMES,
  V1540_LONG_ROUTE_SPLIT_COURSE_TIMES,
  V1539_HUT_CT_CORRECTIONS,
  V1522_OMOTE_GINZA_VERIFIED_COURSE_TIMES,
  V1520_CLASSIC_ROUTE_VERIFIED_COURSE_TIMES,
  V1518_CLASSIC_ROUTE_VERIFIED_COURSE_TIMES,
  V1516_CLASSIC_ROUTE_VERIFIED_COURSE_TIMES,
  V1514_INTERMEDIATE_VERIFIED_COURSE_TIMES,
  V1513_INTERMEDIATE_VERIFIED_COURSE_TIMES,
  V14207_VERIFIED_COURSE_TIMES,
  V14206_VERIFIED_COURSE_TIMES,
  V14205_VERIFIED_COURSE_TIMES,
  V14204_VERIFIED_COURSE_TIMES,
  V14203_VERIFIED_COURSE_TIMES,
  V14201_REPRESENTATIVE_VERIFIED_COURSE_TIMES,
  V14199_REPRESENTATIVE_VERIFIED_COURSE_TIMES,
  V14198_BULK_VERIFIED_COURSE_TIMES,
  V14188_PRIORITY_VERIFIED_COURSE_TIMES,
  NORTH_ALPS_COURSE_TIMES,
  CENTRAL_SOUTH_ALPS_COURSE_TIMES,
  YATSUGATAKE_CHUSHIN_COURSE_TIMES,
  WEST_JAPAN_COURSE_TIMES,
  EAST_NORTH_COURSE_TIMES,
  SUPPLEMENTAL_COURSE_TIMES
]);
// V1.4.123: NFKC/空白除去後の名称を、実際にCTテーブルで使っている端点表記へ戻す。
// 例: 「霧島山（韓国岳）」→NFKCで「霧島山(韓国岳)」になっても、CTキー側の全角括弧表記へ再結合する。
let COURSE_TIME_ENDPOINT_CANONICAL_CACHE=null;
function courseTimePointMatchKey(name){
  return String(name||'').normalize('NFKC').replace(/\s+/g,'').trim();
}
function canonicalCourseTimeEndpointName(name){
  if(!COURSE_TIME_ENDPOINT_CANONICAL_CACHE){
    const map=new Map(), ambiguous=new Set();
    for(const table of COURSE_TIME_TABLES){
      for(const key of Object.keys(table)){
        const sep=key.indexOf('→');
        if(sep<1)continue;
        for(const endpoint of [key.slice(0,sep),key.slice(sep+1)]){
          const mk=courseTimePointMatchKey(endpoint);
          if(map.has(mk)&&map.get(mk)!==endpoint)ambiguous.add(mk);
          else map.set(mk,endpoint);
        }
      }
    }
    for(const mk of ambiguous)map.delete(mk);
    COURSE_TIME_ENDPOINT_CANONICAL_CACHE=map;
  }
  return COURSE_TIME_ENDPOINT_CANONICAL_CACHE.get(courseTimePointMatchKey(name))||name;
}
let COURSE_TIME_GRAPH_CACHE=null;
function normalizedCourseTimeSource(source=''){
  const raw=String(source)
    .replace(/（[^）]*区間合算[^）]*）/g,'')
    .replace(/（[^）]*合算[^）]*）/g,'')
    .trim();
  // V1.4.62: 同じ公式提供元のページ別ラベルだけを同一資料系列として扱う。
  // ヤマレコは計画ごとの差を混ぜないため、sourceType:'yamareco' 側ではこの統合を使わない。
  const officialFamilies=[
    '北アルプス山小屋友交会',
    '燕山荘グループ',
    '双六小屋グループ',
    '南アルプス市芦安山岳館',
    '静岡市公式'
  ];
  for(const family of officialFamilies){
    if(raw===family||raw.startsWith(`${family}・`))return family;
  }
  return raw;
}
// V1.5.56: routes confirmed closed by a current public authority are excluded from CT routing.
// Historical CT is kept in the catalog for traceability, but must not become selectable or composable.
const CLOSED_COURSE_TIME_PAIRS = new Set([
  '旭又登山口→太平山',
  '太平山→旭又登山口'
]);
const CLOSED_CUSTOM_ROUTE_POINTS = new Set([
  '太平山|旭又登山口'
]);
function isClosedCourseTimePair(fromName,toName){
  return CLOSED_COURSE_TIME_PAIRS.has(`${fromName}→${toName}`);
}
function directCourseTimeInfoByNames(fromName,toName){
  if(isClosedCourseTimePair(fromName,toName))return null;
  const key=`${fromName}→${toName}`;
  for(const table of COURSE_TIME_TABLES){
    if(table[key])return table[key];
  }
  return null;
}
function courseTimeGraph(){
  if(COURSE_TIME_GRAPH_CACHE)return COURSE_TIME_GRAPH_CACHE;
  const graph=new Map();
  const seen=new Set();
  for(const table of COURSE_TIME_TABLES){
    for(const [key,info] of Object.entries(table)){
      if(seen.has(key))continue;
      seen.add(key);
      const sep=key.indexOf('→');
      if(sep<1)continue;
      const from=key.slice(0,sep),to=key.slice(sep+1);
      if(!from||!to||!Number.isFinite(Number(info?.minutes)))continue;
      if(isClosedCourseTimePair(from,to))continue;
      if(!graph.has(from))graph.set(from,[]);
      graph.get(from).push({from,to,info,sourceKey:normalizedCourseTimeSource(info?.source||'')});
    }
  }
  COURSE_TIME_GRAPH_CACHE=graph;
  return graph;
}
const COMPOSED_COURSE_TIME_CACHE=new Map();
function courseTimeSourcePriority(source=''){
  const t=String(source);
  // V1.4.120: 公的/公式資料を最優先。民間登山サービスではヤマケイ・ヤマレコをYAMAPより優先する。
  if(/公式|山小屋友交会|観光協会|観光サイト|環境省|市|県|町|村|山岳館|山荘|小屋|THE JAPAN ALPS/.test(t))return 0;
  if(/山と溪谷|山と渓谷|ヤマケイ|yamakei/i.test(t))return 1;
  if(/ヤマレコ|yamareco/i.test(t))return 2;
  if(/YAMAP/i.test(t))return 8;
  return 3;
}
function composedCourseTimeInfo(fromName,toName){
  if(!fromName||!toName||fromName===toName)return null;
  const cacheKey=`${fromName}→${toName}`;
  if(COMPOSED_COURSE_TIME_CACHE.has(cacheKey))return COMPOSED_COURSE_TIME_CACHE.get(cacheKey);
  const graph=courseTimeGraph();
  const found=[];
  const maxEdges=8;
  function walk(current,path,minutes,mode,yamarecoSourceKey,sources,prioritySum){
    if(path.length>maxEdges+1)return;
    for(const edge of graph.get(current)||[]){
      if(path.includes(edge.to))continue;
      const isYamareco=edge.info.sourceType==='yamareco';
      let nextMode=mode, nextYamarecoSourceKey=yamarecoSourceKey;
      // ヤマレコは別計画を混ぜない。公式等の固定CTは確認済み区間同士なら合算可。
      if(!mode){
        nextMode=isYamareco?'yamareco':'fixed';
        nextYamarecoSourceKey=isYamareco?edge.sourceKey:'';
      }else if(mode==='yamareco'){
        if(!isYamareco||edge.sourceKey!==yamarecoSourceKey)continue;
      }else if(isYamareco){
        continue;
      }
      const nextMinutes=minutes+Number(edge.info.minutes);
      // 連結が長過ぎる経路は、直接区間のCTとしては扱わない。
      if(nextMinutes>24*60)continue;
      const nextSources=[...sources,edge.sourceKey].filter(Boolean);
      const nextPath=[...path,edge.to];
      const nextPriority=prioritySum+courseTimeSourcePriority(edge.info?.source||'');
      if(edge.to===toName){
        found.push({minutes:nextMinutes,path:nextPath,mode:nextMode,yamarecoSourceKey:nextYamarecoSourceKey,sources:nextSources,prioritySum:nextPriority});
        continue;
      }
      walk(edge.to,nextPath,nextMinutes,nextMode,nextYamarecoSourceKey,nextSources,nextPriority);
    }
  }
  walk(fromName,[fromName],0,'','',[],0);
  if(!found.length){COMPOSED_COURSE_TIME_CACHE.set(cacheKey,null);return null;}

  // V1.4.120: 複数ルートが成立しても「CT情報なし」にしない。
  // 資料優先度 → 少ない区間数 → 標準CTが短い代表経路、の順で1経路を採用する。
  // これにより、同じ始終点で別ルートがある場合も、代表的なCTを自動設定できる。
  const uniquePaths=[...new Map(found.map(item=>[item.path.join('→'),item])).values()];
  uniquePaths.sort((a,b)=>{
    const aEdges=a.path.length-1,bEdges=b.path.length-1;
    const aAvg=a.prioritySum/Math.max(1,aEdges),bAvg=b.prioritySum/Math.max(1,bEdges);
    if(aAvg!==bAvg)return aAvg-bAvg;
    if(aEdges!==bEdges)return aEdges-bEdges;
    return a.minutes-b.minutes;
  });
  const result=uniquePaths[0];
  const uniqueSources=[...new Set(result.sources)];
  const source=result.mode==='yamareco'
    ? `${result.yamarecoSourceKey}（確認済み区間合算・代表経路採用）`
    : uniqueSources.length===1
      ? `${uniqueSources[0]}（確認済み区間合算・代表経路採用）`
      : `確認済み固定CT（複数公開資料・区間合算・代表経路採用）`;
  const info={
    minutes:result.minutes,
    source,
    sourceType:result.mode==='yamareco'?'yamareco':undefined,
    composed:true,
    representativePath:true,
    alternatePathCount:Math.max(0,uniquePaths.length-1),
    via:result.path.slice(1,-1)
  };
  COMPOSED_COURSE_TIME_CACHE.set(cacheKey,info);
  return info;
}

// V1.5.50: route-builder fallback using only already verified direct CT edges.
// Earlier composition intentionally refused to mix Yamareco plans with other public sources,
// which left real connected trails unresolved when adjacent sections came from different sources.
// This fallback never estimates: it finds the shortest known verified path (max 8 edges).
const VERIFIED_SHORTEST_COURSE_TIME_CACHE=new Map();
function shortestVerifiedCourseTimeInfo(fromName,toName){
  if(!fromName||!toName||fromName===toName)return null;
  const cacheKey=`${fromName}→${toName}`;
  if(VERIFIED_SHORTEST_COURSE_TIME_CACHE.has(cacheKey))return VERIFIED_SHORTEST_COURSE_TIME_CACHE.get(cacheKey);
  const graph=courseTimeGraph();
  const maxEdges=40,maxMinutes=72*60;
  const queue=[{name:fromName,minutes:0,path:[fromName],sources:[],prioritySum:0}];
  const best=new Map([[fromName,{minutes:0,edges:0,prioritySum:0}]]);
  let result=null;
  const better=(a,b)=>!b||a.minutes<b.minutes||(a.minutes===b.minutes&&(a.edges<b.edges||(a.edges===b.edges&&a.prioritySum<b.prioritySum)));
  while(queue.length){
    queue.sort((a,b)=>a.minutes-b.minutes||(a.path.length-b.path.length)||a.prioritySum-b.prioritySum);
    const cur=queue.shift();
    const edgesUsed=cur.path.length-1;
    if(edgesUsed>maxEdges)continue;
    if(cur.name===toName){result=cur;break;}
    for(const edge of graph.get(cur.name)||[]){
      if(cur.path.includes(edge.to))continue;
      const minutes=cur.minutes+Number(edge.info?.minutes);
      if(!Number.isFinite(minutes)||minutes>maxMinutes)continue;
      const nextEdges=edgesUsed+1;
      if(nextEdges>maxEdges)continue;
      const prioritySum=cur.prioritySum+courseTimeSourcePriority(edge.info?.source||'');
      const score={minutes,edges:nextEdges,prioritySum};
      if(!better(score,best.get(edge.to)))continue;
      best.set(edge.to,score);
      queue.push({name:edge.to,minutes,path:[...cur.path,edge.to],sources:[...cur.sources,normalizedCourseTimeSource(edge.info?.source||'')].filter(Boolean),prioritySum});
    }
  }
  if(!result){VERIFIED_SHORTEST_COURSE_TIME_CACHE.set(cacheKey,null);return null;}
  const uniqueSources=[...new Set(result.sources)];
  const info={
    minutes:result.minutes,
    source:uniqueSources.length===1
      ? `${uniqueSources[0]}（確認済みCT区間合算・最短既知経路）`
      : '確認済みCT（複数公開資料・区間合算・最短既知経路）',
    composed:true,
    verifiedMixedSources:true,
    representativePath:true,
    via:result.path.slice(1,-1)
  };
  VERIFIED_SHORTEST_COURSE_TIME_CACHE.set(cacheKey,info);
  return info;
}
// V1.4.122: 確認済みCTがない固定登山口↔山頂区間の推定CT。
// 代表コースの「CT情報なし」を減らすための最後のフォールバックであり、
// 公式/公的資料 → ヤマケイ → ヤマレコ → その他の確認済みCTより常に優先度を下げる。
//
// 係数は、固定座標・標高が揃う確認済み代表登山口→山頂26区間を用いて
// 直線距離(km)・標高差(100m)と標準CTを回帰したもの。
// 登り: 28.23分/km + 13.43分/100m + 10.21分
// 下り: 51.84分/km（確認済み逆方向26区間から回帰）
// 10分単位へ丸め、極端な値は抑制する。推定値は info.estimated=true で明示する。
let GENERATED_CT_POINT_INDEX_CACHE=null;
function generatedCtPointIndex(){
  if(GENERATED_CT_POINT_INDEX_CACHE)return GENERATED_CT_POINT_INDEX_CACHE;
  const index=new Map();
  for(const [mountain,catalog] of Object.entries(BUILTIN_ROUTE_CATALOG||{})){
    for(const point of catalog||[]){
      const name=String(point?.name||'').trim();
      if(!name||!Number.isFinite(Number(point?.lat))||!Number.isFinite(Number(point?.lon)))continue;
      if(!index.has(name))index.set(name,[]);
      index.get(name).push({mountain,point});
    }
  }
  GENERATED_CT_POINT_INDEX_CACHE=index;
  return index;
}
function haversineKm(lat1,lon1,lat2,lon2){
  const R=6371;
  const p1=Number(lat1)*Math.PI/180,p2=Number(lat2)*Math.PI/180;
  const dp=(Number(lat2)-Number(lat1))*Math.PI/180,dl=(Number(lon2)-Number(lon1))*Math.PI/180;
  const a=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;
  return 2*R*Math.asin(Math.min(1,Math.sqrt(a)));
}
function estimatedGeneratedCourseTimeInfo(fromName,toName){
  const index=generatedCtPointIndex();
  const fromList=index.get(String(fromName||'').trim())||[];
  const toList=index.get(String(toName||'').trim())||[];
  if(!fromList.length||!toList.length)return null;
  let best=null;
  for(const a of fromList){
    for(const b of toList){
      if(a.mountain!==b.mountain)continue;
      const from=a.point,to=b.point;
      const validPair=(from.type==='trailhead'&&to.type==='peak')||(from.type==='peak'&&to.type==='trailhead');
      if(!validPair)continue;
      const d=haversineKm(from.lat,from.lon,to.lat,to.lon);
      if(!Number.isFinite(d)||d<=0||d>35)continue;
      const eFrom=Number(from.elevation),eTo=Number(to.elevation);
      const hasElev=Number.isFinite(eFrom)&&Number.isFinite(eTo);
      let raw;
      if(from.type==='trailhead'){
        const gain100=hasElev?Math.max(0,eTo-eFrom)/100:0;
        raw=28.2285*d+13.4310*gain100+10.2087;
      }else{
        raw=51.8352*d;
      }
      if(!Number.isFinite(raw))continue;
      const rounded=Math.max(20,Math.min(900,Math.round(raw/10)*10));
      const candidate={minutes:rounded,distanceKm:d,mountain:a.mountain};
      if(!best||candidate.distanceKm<best.distanceKm)best=candidate;
    }
  }
  if(!best)return null;
  return {
    minutes:best.minutes,
    source:'推定CT（固定座標・標高差＋確認済みCT回帰）',
    sourceType:'estimated',
    estimated:true,
    estimatedMethod:'fixed-coordinate-regression-v1',
    estimatedDistanceKm:Number(best.distanceKm.toFixed(2))
  };
}

// V1.5.53: verified composition must also be geographically plausible.
// This never estimates CT. It only refuses a verified-edge graph path when nearby endpoints
// would be connected by an obvious excursion through a remote peak/hut/trailhead.
let COURSE_TIME_COORD_INDEX_CACHE=null;
function courseTimeCoordinateIndex(){
  if(COURSE_TIME_COORD_INDEX_CACHE)return COURSE_TIME_COORD_INDEX_CACHE;
  const idx=new Map();
  const addName=(name,c)=>{if(!idx.has(name))idx.set(name,[]);if(!idx.get(name).some(x=>Math.abs(x.lat-c.lat)<1e-7&&Math.abs(x.lon-c.lon)<1e-7))idx.get(name).push(c);};
  const add=(p)=>{
    const name=String(p?.name||'').trim(),lat=Number(p?.lat),lon=Number(p?.lon);
    if(!name||!Number.isFinite(lat)||!Number.isFinite(lon))return;
    const c={lat,lon}; addName(name,c);
    const normalized=canonicalCourseTimeEndpointName(normalizeCourseTimePointName(name));
    if(normalized)addName(normalized,c);
  };
  for(const catalog of Object.values(REGIONAL_CATALOG||{}))for(const p of catalog||[])add(p);
  for(const catalog of Object.values(BUILTIN_ROUTE_CATALOG||{}))for(const p of catalog||[])add(p);
  for(const catalog of Object.values(TRAVERSE_CATALOG||{}))for(const p of catalog||[])add(p);
  COURSE_TIME_COORD_INDEX_CACHE=idx;
  return idx;
}
function verifiedComposedPathIsImplausible(fromPoint,toPoint,info){
  if(!info?.composed||!Array.isArray(info.via)||!info.via.length)return false;
  const a={lat:Number(fromPoint?.lat),lon:Number(fromPoint?.lon)},b={lat:Number(toPoint?.lat),lon:Number(toPoint?.lon)};
  if(![a.lat,a.lon,b.lat,b.lon].every(Number.isFinite))return false;
  const direct=haversineKm(a.lat,a.lon,b.lat,b.lon);
  if(!Number.isFinite(direct)||direct<=0)return false;
  const idx=courseTimeCoordinateIndex(),coords=[a];
  for(const raw of info.via){
    const key=canonicalCourseTimeEndpointName(normalizeCourseTimePointName(String(raw||'').trim()));
    const choices=idx.get(key)||idx.get(String(raw||'').trim())||[];
    if(!choices.length)return false;
    // Same-named points can exist in several catalogs. Use the coordinate that is geographically
    // closest to this endpoint pair, never an arbitrary first occurrence.
    const c=[...choices].sort((x,y)=>(haversineKm(a.lat,a.lon,x.lat,x.lon)+haversineKm(b.lat,b.lon,x.lat,x.lon))-(haversineKm(a.lat,a.lon,y.lat,y.lon)+haversineKm(b.lat,b.lon,y.lat,y.lon)))[0];
    coords.push(c);
  }
  coords.push(b);
  let poly=0,maxRemote=0;
  for(let i=1;i<coords.length;i++)poly+=haversineKm(coords[i-1].lat,coords[i-1].lon,coords[i].lat,coords[i].lon);
  for(const c of coords.slice(1,-1))maxRemote=Math.max(maxRemote,Math.min(haversineKm(a.lat,a.lon,c.lat,c.lon),haversineKm(b.lat,b.lon,c.lat,c.lon)));
  const minutes=Number(info.minutes)||0,edges=info.via.length+1,ratio=poly/Math.max(0.05,direct);
  // Nearby endpoints must not be "connected" by a remote mountain/trailhead excursion.
  // We only reject strong outliers; plausible hut/peak chains remain valid.
  if(direct<=3&&minutes>=300&&ratio>=4)return true;
  if(direct<=5&&minutes>=300&&maxRemote>=Math.max(3.5,direct*1.8))return true;
  if(direct<=2&&edges>=6&&minutes>=240)return true;
  return false;
}

function courseTimeInfo(fromPoint,toPoint){
  if(!fromPoint||!toPoint)return null;
  const rawFrom=String(fromPoint.name||'').trim();
  const rawTo=String(toPoint.name||'').trim();
  // V1.4.66: 固定地点名とCT端点が完全一致する場合は、名称正規化より先に生の名称を優先する。
  // 括弧の全角/半角変換などで確認済みCTキーを取りこぼすのを防ぐ。
  // V1.5.23: direct CT must win before any graph composition, including alias-normalized endpoints.
  // Otherwise an alias such as 常念岳→常念山頂 can be bypassed by a much longer composed detour.
  const rawDirect=directCourseTimeInfoByNames(rawFrom,rawTo);
  if(rawDirect)return rawDirect;
  const fromName=canonicalCourseTimeEndpointName(normalizeCourseTimePointName(rawFrom));
  const toName=canonicalCourseTimeEndpointName(normalizeCourseTimePointName(rawTo));
  const normalizedDirect=directCourseTimeInfoByNames(fromName,toName);
  if(normalizedDirect)return normalizedDirect;
  // Compose with canonical endpoints first. Raw-name composition is only a final compatibility fallback.
  // This prevents paths that pass through an alias-equivalent endpoint (e.g. 扇沢 vs 扇沢登山口) and continue on a detour.
  // V1.5.39: reject obviously local detours created by graph composition.
  // When nearby mountain/hut/trailhead endpoints are connected only by a 4+ edge detour,
  // returning no CT is safer than showing an implausible 10-20 hour value.
  const localComposedIsImplausible=(info)=>{
    if(!info?.composed||!Number.isFinite(Number(info.minutes)))return false;
    // V1.5.40: a composed single section of 10h or more is not useful as a route segment.
    // Such long travel must be represented by verified intermediate points instead of an opaque graph detour.
    if(Number(info.minutes)>=600)return true;
    const lat1=Number(fromPoint.lat),lon1=Number(fromPoint.lon),lat2=Number(toPoint.lat),lon2=Number(toPoint.lon);
    if(![lat1,lon1,lat2,lon2].every(Number.isFinite))return false;
    const km=haversineKm(lat1,lon1,lat2,lon2);
    const edges=(info.via?.length||0)+1;
    if(km<=0.15 && Number(info.minutes)>60)return true;
    return km<=3 && edges>=4 && Number(info.minutes)>300;
  };
  const normalizedComposed=composedCourseTimeInfo(fromName,toName);
  if(normalizedComposed&&!localComposedIsImplausible(normalizedComposed))return normalizedComposed;
  const rawComposed=composedCourseTimeInfo(rawFrom,rawTo);
  if(rawComposed&&!localComposedIsImplausible(rawComposed))return rawComposed;
  // V1.5.50: if the legacy source-isolated composer cannot form a sensible path,
  // allow composition across independently verified public CT edges. No estimated edge is used.
  const verifiedShortest=shortestVerifiedCourseTimeInfo(fromName,toName);
  // V1.5.54: do not reject a real multi-hour/multi-day traverse merely because it exceeds 10h.
  // The path is still accepted only when every edge is a published/verified CT and the geographic detour guard passes.
  if(verifiedShortest&&!verifiedComposedPathIsImplausible(fromPoint,toPoint,verifiedShortest))return verifiedShortest;
  const rawVerifiedShortest=(rawFrom===fromName&&rawTo===toName)?null:shortestVerifiedCourseTimeInfo(rawFrom,rawTo);
  if(rawVerifiedShortest&&!verifiedComposedPathIsImplausible(fromPoint,toPoint,rawVerifiedShortest))return rawVerifiedShortest;
  // V1.5.44: coordinate/elevation regression fallback disabled.
  // If no verified direct/composed CT exists, return null rather than inventing a walking time.
  return null;
}
function formatCourseTimeMinutes(minutes){
  const m=Math.max(0,Number(minutes)||0), h=Math.floor(m/60), r=m%60;
  return h?`${h}:${String(r).padStart(2,'0')}`:`0:${String(r).padStart(2,'0')}`;
}

const LAST_ROUTE_STORAGE_KEY='traten:last-route:v2';
const LEGACY_LAST_ANALYSIS_STORAGE_KEY='traten:last-analysis:v1';
const SAVED_ROUTES_STORAGE_KEY='traten:saved-routes:v1';
const SAVED_ROUTES_MAX=50;

function routeSnapshotFromPoints(mountain,points){
  return {mountain,points:(points||[]).map(p=>({id:p.id||'',name:p.name||'',type:p.type||'peak',date:p.date||'',time:p.time||'',stay:!!p.stay,stayDepartureTime:p.stayDepartureTime||'06:00',role:p.role||''}))};
}
function loadLastRouteSnapshot(){
  try{
    const raw=localStorage.getItem(LAST_ROUTE_STORAGE_KEY);
    if(raw){const data=JSON.parse(raw);if(data?.route?.mountain&&Array.isArray(data.route.points))return data;}
    const legacyRaw=localStorage.getItem(LEGACY_LAST_ANALYSIS_STORAGE_KEY);
    if(!legacyRaw)return null;
    const legacy=JSON.parse(legacyRaw);
    if(!legacy?.route?.mountain||!Array.isArray(legacy.route.points))return null;
    const migrated={savedAt:Number(legacy.savedAt)||Date.now(),appVersion:APP_VERSION,route:legacy.route};
    localStorage.setItem(LAST_ROUTE_STORAGE_KEY,JSON.stringify(migrated));
    return migrated;
  }catch(_){return null;}
}
function saveLastRouteSnapshot(mountain,points){
  try{
    const payload={savedAt:Date.now(),appVersion:APP_VERSION,route:routeSnapshotFromPoints(mountain,points)};
    localStorage.setItem(LAST_ROUTE_STORAGE_KEY,JSON.stringify(payload));
    refreshLastAnalysisPanel();
  }catch(e){console.warn('前回ルートを保存できませんでした',e);}
}
function formatLastRouteSavedAt(ms){
  try{return new Date(ms).toLocaleString('ja-JP',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});}catch(_){return '';}
}
function refreshLastAnalysisPanel(){
  const panel=$('lastAnalysisPanel'); if(!panel)return;
  const data=loadLastRouteSnapshot();
  panel.classList.toggle('hidden',!data);
  if(!data)return;
  const mountain=data.route?.mountain||'前回ルート';
  const count=data.route?.points?.length||0;
  const meta=$('lastAnalysisMeta');
  if(meta)meta.textContent=`${mountain} / ${count}地点 / ${formatLastRouteSavedAt(data.savedAt)}`;
}
function loadSavedRoutes(){
  try{
    const data=JSON.parse(localStorage.getItem(SAVED_ROUTES_STORAGE_KEY)||'[]');
    return Array.isArray(data)?data.filter(x=>x?.id&&x?.name&&x?.route?.mountain&&Array.isArray(x.route.points)):[];
  }catch(_){return [];}
}
function writeSavedRoutes(routes){
  localStorage.setItem(SAVED_ROUTES_STORAGE_KEY,JSON.stringify((routes||[]).slice(0,SAVED_ROUTES_MAX)));
  refreshSavedRoutesCount();
}
function refreshSavedRoutesCount(){
  const el=$('savedRoutesCount');if(el)el.textContent=String(loadSavedRoutes().length);
}
function currentRouteSnapshot(){
  const mountain=currentMountainLabel();
  if(!mountain)throw new Error('先に山を選択してください。');
  const points=collectPoints();
  if(!points.length)throw new Error('保存する通過ポイントを1つ以上設定してください。');
  return routeSnapshotFromPoints(mountain,points);
}
function defaultSavedRouteName(){
  const mountain=currentMountainLabel()||'山行ルート';
  const points=collectRouteMapPointsFromForm();
  const first=points[0]?.name||'';const last=points[points.length-1]?.name||'';
  return first&&last&&first!==last?`${mountain} ${first}→${last}`:`${mountain} ルート`;
}
function closeSavedRoutesModal(){
  const modal=$('savedRoutesModal');if(!modal)return;
  modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.classList.remove('saved-routes-open');
}
function openSavedRoutesModal(focusName=false){
  const modal=$('savedRoutesModal');if(!modal)return;
  renderSavedRoutesList();
  const input=$('savedRouteName');if(input&&!input.value.trim()){try{input.value=defaultSavedRouteName();}catch(_){}}
  modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.classList.add('saved-routes-open');
  if(focusName)setTimeout(()=>input?.focus(),30);
}
function savedRouteDateLabel(route){
  const pts=route?.points||[];if(!pts.length)return '';
  const first=pts[0],last=pts[pts.length-1];
  if(first.date&&last.date&&first.date!==last.date)return `${first.date} ${first.time||''} → ${last.date} ${last.time||''}`;
  return `${first.date||''} ${first.time||''}${last.time&&last!==first?` → ${last.time}`:''}`.trim();
}
function renderSavedRoutesList(){
  const list=$('savedRoutesList');if(!list)return;
  const routes=loadSavedRoutes();
  refreshSavedRoutesCount();
  if(!routes.length){list.innerHTML='<div class="saved-routes-empty"><strong>まだ保存ルートはありません</strong><p>山行設定を作って「現在のルートを保存」を押してください。</p></div>';return;}
  list.innerHTML=routes.map(item=>`<article class="saved-route-card" data-saved-route-id="${esc(item.id)}"><div class="saved-route-main"><div><strong>${esc(item.name)}</strong><small>${esc(item.route.mountain)} / ${item.route.points.length}地点</small><span>${esc(savedRouteDateLabel(item.route))}</span></div></div><div class="saved-route-actions"><button type="button" data-action="load">読み込む</button><button type="button" data-action="overwrite">上書き</button><button type="button" data-action="rename">名前変更</button><button type="button" data-action="delete" class="danger">削除</button></div></article>`).join('');
  list.querySelectorAll('.saved-route-card').forEach(card=>{
    const id=card.dataset.savedRouteId;
    card.querySelector('[data-action="load"]')?.addEventListener('click',()=>loadFavoriteRoute(id));
    card.querySelector('[data-action="overwrite"]')?.addEventListener('click',()=>overwriteFavoriteRoute(id));
    card.querySelector('[data-action="rename"]')?.addEventListener('click',()=>renameFavoriteRoute(id));
    card.querySelector('[data-action="delete"]')?.addEventListener('click',()=>deleteFavoriteRoute(id));
  });
}
function routeSnapshotShiftedToTomorrow(route){
  if(!route?.points?.length)return route;
  const firstDate=String(route.points[0]?.date||'');
  const target=tomorrowLocal();
  const fromMs=new Date(`${firstDate}T00:00:00+09:00`).getTime();
  const toMs=new Date(`${target}T00:00:00+09:00`).getTime();
  if(!Number.isFinite(fromMs)||!Number.isFinite(toMs))return route;
  const dayShift=Math.round((toMs-fromMs)/86400000);
  return {...route,points:route.points.map(pt=>{
    const ms=new Date(`${pt.date}T00:00:00+09:00`).getTime();
    const date=Number.isFinite(ms)?formatJstInput(ms+dayShift*86400000).date:pt.date;
    return {...pt,date};
  })};
}
async function restoreRouteSnapshot(route,label='保存ルート'){
  route=routeSnapshotShiftedToTomorrow(route);
  if(!route?.mountain||!Array.isArray(route.points))throw new Error('ルートデータが壊れています。');
  const search=$('mountainSearch');if(!search)throw new Error('山行設定を開けませんでした。');
  search.value=route.mountain;search.dispatchEvent(new Event('change',{bubbles:true}));
  await new Promise(r=>setTimeout(r,60));
  if(currentMountainLabel()!==route.mountain){
    search.value=route.mountain;search.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,40));
  }
  await loadCandidates();
  $('points').innerHTML=''; pointSeq=0;
  let restored=0;
  for(const saved of route.points){
    let hit=candidates.find(p=>String(p.id)===String(saved.id));
    if(!hit)hit=candidates.find(p=>p.type===saved.type&&p.name===saved.name);
    if(!hit)hit=candidates.find(p=>p.name===saved.name);
    if(!hit)continue;
    addPointRow(saved.type,hit.id,saved.role||'',{date:saved.date,time:saved.time});
    const row=$('points').lastElementChild;
    if(row?.querySelector('.point-stay')){
      row.querySelector('.point-stay').checked=!!saved.stay;
      const dep=row.querySelector('.stay-departure-time');if(dep)dep.value=saved.stayDepartureTime||'06:00';
      row.querySelector('.stay-departure')?.classList.toggle('hidden',!saved.stay);
    }
    updateMeta(row);restored++;
  }
  updateForecastHorizon();renderRouteMaps();refreshAllCourseTimeMissingBadges();
  if(!restored)throw new Error('保存した通過ポイントを現在のデータから復元できませんでした。');
  setStatus(`${label}「${route.mountain}」を復元しました。01の通過日を翌日に合わせて日付を移動しました。`);
  $('points')?.scrollIntoView({behavior:'smooth',block:'start'});
}
function createFavoriteRoute(){
  try{
    const route=currentRouteSnapshot();
    const name=String($('savedRouteName')?.value||'').trim();
    if(!name)throw new Error('保存名を入力してください。');
    const routes=loadSavedRoutes();
    const same=routes.find(x=>x.name===name);
    if(same){if(!confirm(`「${name}」は既にあります。現在のルートで上書きしますか？`))return;same.route=route;same.updatedAt=Date.now();}
    else{routes.unshift({id:`route_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,name,route,createdAt:Date.now(),updatedAt:Date.now()});}
    writeSavedRoutes(routes);renderSavedRoutesList();setStatus(`保存ルート「${name}」を保存しました。`);
  }catch(e){setStatus(e.message||String(e),true);}
}
async function loadFavoriteRoute(id){
  const item=loadSavedRoutes().find(x=>x.id===id);if(!item)return;
  try{await restoreRouteSnapshot(item.route,`保存ルート「${item.name}」`);closeSavedRoutesModal();}catch(e){setStatus(`保存ルートを読み込めませんでした：${e.message||e}`,true);}
}
function overwriteFavoriteRoute(id){
  try{
    const route=currentRouteSnapshot();const routes=loadSavedRoutes();const item=routes.find(x=>x.id===id);if(!item)return;
    if(!confirm(`「${item.name}」を現在の山行設定で上書きしますか？`))return;
    item.route=route;item.updatedAt=Date.now();writeSavedRoutes(routes);renderSavedRoutesList();setStatus(`「${item.name}」を上書きしました。`);
  }catch(e){setStatus(e.message||String(e),true);}
}
function renameFavoriteRoute(id){
  const routes=loadSavedRoutes();const item=routes.find(x=>x.id===id);if(!item)return;
  const name=prompt('保存ルート名を変更',item.name);if(name==null)return;const next=name.trim();if(!next)return;
  if(routes.some(x=>x.id!==id&&x.name===next)){setStatus('同じ名前の保存ルートがあります。',true);return;}
  item.name=next;item.updatedAt=Date.now();writeSavedRoutes(routes);renderSavedRoutesList();
}
function deleteFavoriteRoute(id){
  const routes=loadSavedRoutes();const item=routes.find(x=>x.id===id);if(!item)return;
  if(!confirm(`「${item.name}」を削除しますか？`))return;
  writeSavedRoutes(routes.filter(x=>x.id!==id));renderSavedRoutesList();setStatus(`「${item.name}」を削除しました。`);
}


const CLASSIC_ROUTES=[
  {id:'omote-ginza',name:'表銀座',subtitle:'中房温泉 → 燕岳 → 大天井岳 → 槍ヶ岳 → 上高地',anchor:'槍ヶ岳',days:'2泊3日目安',level:'ロング',points:[
    ['trailhead','中房温泉登山口','燕岳'],['hut','合戦小屋','燕岳'],['hut','燕山荘','燕岳'],['peak','燕岳','燕岳'],['hut','燕山荘','燕岳',true],['hut','大天荘','大天井岳'],['peak','大天井岳','大天井岳'],['hut','大天荘','大天井岳'],['hut','大天井ヒュッテ','大天井岳'],['hut','ヒュッテ西岳','槍ヶ岳'],['peak','西岳','槍ヶ岳'],['hut','ヒュッテ西岳','槍ヶ岳'],['pass','水俣乗越','槍ヶ岳'],['hut','ヒュッテ大槍','槍ヶ岳'],['hut','槍ヶ岳山荘','槍ヶ岳'],['peak','槍ヶ岳','槍ヶ岳'],['hut','槍ヶ岳山荘','槍ヶ岳',true],['hut','槍沢ロッヂ','槍ヶ岳'],['hut','横尾山荘','槍ヶ岳'],['trailhead','上高地','槍ヶ岳']
  ]},
  {id:'panorama-ginza',name:'パノラマ銀座',subtitle:'中房温泉 → 燕岳 → 大天井岳 → 常念岳 → 蝶ヶ岳 → 三股',anchor:'槍ヶ岳',days:'2泊3日目安',level:'縦走',points:[
    ['trailhead','中房温泉登山口','燕岳'],['hut','合戦小屋','燕岳'],['hut','燕山荘','燕岳'],['peak','燕岳','燕岳'],['hut','燕山荘','燕岳',true],['hut','大天荘','大天井岳'],['peak','大天井岳','大天井岳'],['hut','常念小屋','常念岳',true],['peak','常念岳','常念岳'],['peak','蝶ヶ岳','蝶ヶ岳'],['hut','蝶ヶ岳ヒュッテ','蝶ヶ岳'],['trailhead','三股登山口','蝶ヶ岳']
  ]},
  {id:'ura-ginza',name:'裏銀座',subtitle:'高瀬ダム → 烏帽子岳 → 野口五郎岳 → 水晶岳 → 鷲羽岳 → 双六岳 → 槍ヶ岳 → 新穂高',anchor:'鷲羽岳',days:'4泊5日目安',level:'ロング',points:[
    ['trailhead','高瀬ダム','野口五郎岳'],['hut','烏帽子小屋','野口五郎岳'],['peak','烏帽子岳','烏帽子岳'],['hut','烏帽子小屋','野口五郎岳',true],['peak','野口五郎岳','野口五郎岳'],['hut','野口五郎小屋','野口五郎岳',true],['hut','水晶小屋','水晶岳（黒岳）'],['peak','水晶岳','水晶岳（黒岳）'],['hut','水晶小屋','水晶岳（黒岳）'],['peak','鷲羽岳','鷲羽岳'],['hut','三俣山荘','鷲羽岳',true],['peak','三俣蓮華岳','三俣蓮華岳'],['peak','双六岳','双六岳'],['hut','双六小屋','双六岳'],['hut','槍ヶ岳山荘','槍ヶ岳'],['peak','槍ヶ岳','槍ヶ岳'],['hut','槍ヶ岳山荘','槍ヶ岳',true],['hut','槍平小屋','槍ヶ岳'],['trailhead','新穂高温泉','槍ヶ岳']
  ]},
  {id:'ushiro-tateyama',name:'後立山縦走',subtitle:'八方 → 唐松岳 → 五竜岳 → 鹿島槍ヶ岳 → 爺ヶ岳 → 扇沢',anchor:'鹿島槍ヶ岳',days:'3泊4日目安',level:'上級',points:[
    ['trailhead','八方池山荘','唐松岳'],['hut','唐松岳頂上山荘','唐松岳'],['peak','唐松岳','唐松岳'],['hut','唐松岳頂上山荘','唐松岳'],['hut','五竜山荘','五竜岳',true],['peak','五竜岳','五竜岳'],['hut','キレット小屋','鹿島槍ヶ岳',true],['peak','鹿島槍ヶ岳','鹿島槍ヶ岳'],['hut','冷池山荘','鹿島槍ヶ岳',true],['peak','爺ヶ岳','爺ヶ岳'],['hut','種池山荘','爺ヶ岳'],['trailhead','扇沢登山口','爺ヶ岳']
  ]},
  {id:'yari-hotaka',name:'槍・穂高縦走',subtitle:'上高地 → 槍ヶ岳 → 南岳 → 北穂高岳 → 奥穂高岳 → 上高地',anchor:'槍ヶ岳',days:'3泊4日目安',level:'上級・大キレット',points:[
    ['trailhead','上高地','槍ヶ岳'],['hut','横尾山荘','槍ヶ岳'],['hut','槍沢ロッヂ','槍ヶ岳'],['hut','槍ヶ岳山荘','槍ヶ岳'],['peak','槍ヶ岳','槍ヶ岳'],['hut','槍ヶ岳山荘','槍ヶ岳',true],['peak','大喰岳','槍ヶ岳'],['peak','中岳','槍ヶ岳'],['peak','南岳','槍ヶ岳'],['hut','南岳小屋','槍ヶ岳',true],['peak','北穂高岳','槍ヶ岳'],['hut','北穂高小屋','槍ヶ岳'],['peak','涸沢岳','槍ヶ岳'],['hut','穂高岳山荘','奥穂高岳',true],['peak','奥穂高岳','奥穂高岳'],['hut','穂高岳山荘','奥穂高岳'],['hut','涸沢ヒュッテ','奥穂高岳'],['hut','横尾山荘','槍ヶ岳'],['trailhead','上高地','槍ヶ岳']
  ]},
  {id:'shiramine-sanzan',name:'白峰三山',subtitle:'広河原 → 北岳 → 間ノ岳 → 農鳥岳 → 奈良田',anchor:'北岳',days:'2泊3日目安',level:'南アルプス縦走',points:[
    ['trailhead','広河原','北岳'],['hut','白根御池小屋','北岳'],['hut','北岳肩の小屋','北岳'],['peak','北岳','北岳'],['hut','北岳山荘','間ノ岳',true],['peak','中白根山','間ノ岳'],['peak','間ノ岳','間ノ岳'],['hut','農鳥小屋','農鳥岳',true],['peak','農鳥岳','農鳥岳'],['trailhead','奈良田','農鳥岳']
  ]},
  {id:'houou-sanzan',name:'鳳凰三山',subtitle:'夜叉神峠 → 薬師岳 → 観音岳 → 地蔵岳 → 夜叉神峠',anchor:'観音岳(鳳凰)',days:'1泊2日目安',level:'南アルプス縦走',points:[
    ['trailhead','夜叉神峠登山口','観音岳(鳳凰)'],['hut','南御室小屋','観音岳(鳳凰)',true],['peak','薬師岳(鳳凰)','観音岳(鳳凰)'],['peak','観音岳(鳳凰)','観音岳(鳳凰)'],['peak','地蔵岳(鳳凰)','地蔵岳(鳳凰)'],['peak','観音岳(鳳凰)','観音岳(鳳凰)'],['peak','薬師岳(鳳凰)','観音岳(鳳凰)'],['hut','南御室小屋','観音岳(鳳凰)'],['trailhead','夜叉神峠登山口','観音岳(鳳凰)']
  ]},
  {id:'mitsumata-circuit',name:'三股サーキット',subtitle:'三股 → 前常念岳 → 常念岳 → 蝶槍 → 蝶ヶ岳ヒュッテ → 蝶ヶ岳 → 三股',anchor:'常念岳',days:'1泊2日目安',level:'ロング・周回',points:[
    ['trailhead','三股登山口','常念岳'],['peak','前常念岳','常念岳'],['peak','常念岳','常念岳'],['peak','蝶槍','常念岳'],['hut','蝶ヶ岳ヒュッテ','蝶ヶ岳',true],['peak','蝶ヶ岳','蝶ヶ岳'],['trailhead','三股登山口','蝶ヶ岳']
  ]},
  {id:'kumonodaira-grand-circle',name:'雲ノ平グランドサークル',subtitle:'折立 → 雲ノ平 → 三俣蓮華岳 → 黒部五郎岳 → 折立',anchor:'黒部五郎岳',days:'2泊3日目安',level:'ロング・周回',points:[
    ['trailhead','折立登山口','黒部五郎岳'],['hut','太郎平小屋','黒部五郎岳'],['hut','薬師沢小屋','黒部五郎岳'],['hut','雲ノ平山荘','黒部五郎岳',true],['hut','三俣山荘','三俣蓮華岳'],['peak','三俣蓮華岳','三俣蓮華岳'],['hut','黒部五郎小舎','黒部五郎岳',true],['peak','黒部五郎岳','黒部五郎岳'],['hut','太郎平小屋','黒部五郎岳'],['trailhead','折立登山口','黒部五郎岳']
  ]}
];
function classicRoutePoint(def){
  const [type,name,sourceMountain]=def;
  return representativeCandidateForMountain(sourceMountain,type,name)
    || Object.values(REGIONAL_CATALOG).flat().find(p=>p.type===type&&p.name===name&&hasResolvedCoord(p))
    || Object.values(BUILTIN_ROUTE_CATALOG).flat().find(p=>p.type===type&&p.name===name&&hasResolvedCoord(p))
    || Object.values(TRAVERSE_CATALOG).flat().find(p=>p.type===type&&p.name===name&&hasResolvedCoord(p))
    || null;
}
function renderClassicRoutes(){
  const box=$('classicRoutesList');if(!box)return;
  box.innerHTML=CLASSIC_ROUTES.map(r=>`<article class="classic-route-card"><div class="classic-route-copy"><strong>${esc(r.name)}</strong><p>${esc(r.subtitle)}</p><small>${esc(r.days)} / ${esc(r.level)}</small></div><button type="button" data-classic-route="${esc(r.id)}">読み込む</button></article>`).join('');
  box.querySelectorAll('[data-classic-route]').forEach(btn=>btn.addEventListener('click',()=>loadClassicRoute(btn.dataset.classicRoute)));
}
function openClassicRoutesModal(){
  renderClassicRoutes();const modal=$('classicRoutesModal');if(!modal)return;modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.classList.add('classic-routes-open');
}
function closeClassicRoutesModal(){const modal=$('classicRoutesModal');if(!modal)return;modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.classList.remove('classic-routes-open');}
async function loadClassicRoute(id){
  const route=CLASSIC_ROUTES.find(r=>r.id===id);if(!route)return;
  const resolved=route.points.map(def=>({def,p:classicRoutePoint(def)}));
  const missing=resolved.filter(x=>!x.p).map(x=>x.def[1]);
  if(missing.length)return setStatus(`王道ルートを読み込めませんでした。固定ポイント不足：${missing.join('、')}`,true);
  const currentRows=[...$('points').children].filter(r=>r.querySelector('.point-select')?.value);
  if(currentRows.length&&typeof window!=='undefined'&&typeof window.confirm==='function'&&!window.confirm(`現在の通過ポイントを「${route.name}」で置き換えます。よろしいですか？`))return;
  const search=$('mountainSearch');search.value=route.anchor;search.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,60));await loadCandidates();
  const seen=new Set(candidates.map(p=>`${p.type}|${p.name}`));
  for(const x of resolved){const key=`${x.p.type}|${x.p.name}`;if(!seen.has(key)){candidates.push({...x.p,id:`classic-${route.id}-${x.p.id||Math.random().toString(36).slice(2)}`});seen.add(key);}}
  $('points').innerHTML='';pointSeq=0;
  let missingCt=0,estimatedCt=0;
  resolved.forEach((x,i)=>{
    const p=candidates.find(c=>c.type===x.p.type&&c.name===x.p.name)||x.p;
    const initial=i===0?{date:tomorrowLocal(),time:'06:00'}:{date:tomorrowLocal(),time:'06:00'};
    addPointRow(p.type,p.id,x.def[0]==='trailhead'?(i===0?'登山口':'下山口'):(p.type==='peak'?'山頂':(p.type==='hut'||p.type==='camp'?'山小屋':'経由')),initial);
    const row=$('points').lastElementChild;
    if(i>0){
      const prev=row.previousElementSibling;const from=selectedCandidate(prev.querySelector('.point-select')?.value);const to=selectedCandidate(row.querySelector('.point-select')?.value);const info=from&&to?courseTimeInfo(from,to):null;
      if(info){if(info.estimated)estimatedCt++;applyCourseTimeFromPrevious(row,{announce:false});}
      else{missingCt++;const base=prev.querySelector('.point-stay')?.checked?stayDepartureBaseMs(prev):new Date(rowDateTimeValue(prev)).getTime();if(Number.isFinite(base))setRowDateTimeMs(row,base+60*60*1000,false);}
    }
    if(x.def[3]&&row.querySelector('.point-stay')){row.querySelector('.point-stay').checked=true;row.querySelector('.stay-departure')?.classList.remove('hidden');const dep=row.querySelector('.stay-departure-time');if(dep)dep.value='06:00';}
    updateMeta(row);refreshCourseTimeMissingBadge(row);
  });
  updateForecastHorizon();renderRouteMaps();refreshAllCourseTimeMissingBadges();closeClassicRoutesModal();
  setStatus(`${route.name} を入力しました。${route.days}。${missingCt?`CT情報なし ${missingCt}区間は時刻を確認してください。`:estimatedCt?`推定CT ${estimatedCt}区間は時刻を確認してください。`:'全区間の登録CTで時刻を展開しました。'}`);
  logEvent('classic_route_loaded',{success:true,mountain:route.anchor,metadata:{classic_route_id:route.id,classic_route_name:route.name,point_count:route.points.length,missing_ct_count:missingCt,estimated_ct_count:estimatedCt}});
  $('points')?.scrollIntoView({behavior:'smooth',block:'start'});
}

const providers = [
  {id:'jma',name:'JMA MSM',kind:'openmeteo',endpoint:'https://api.open-meteo.com/v1/jma',model:'jma_msm',forecastDays:4,vars:['temperature_2m','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_direction_10m']},
  {id:'ecmwf',name:'ECMWF IFS',kind:'openmeteo',endpoint:'https://api.open-meteo.com/v1/ecmwf',forecastDays:15,vars:['temperature_2m','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_gusts_10m','wind_direction_10m','cape','visibility','freezing_level_height']},
  {id:'gfs',name:'GFS',kind:'openmeteo',endpoint:'https://api.open-meteo.com/v1/gfs',forecastDays:16,vars:['temperature_2m','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_gusts_10m','wind_direction_10m','cape','visibility','freezing_level_height']},
  {id:'icon',name:'ICON',kind:'openmeteo',endpoint:'https://api.open-meteo.com/v1/dwd-icon',forecastDays:8,vars:['temperature_2m','relative_humidity_2m','precipitation','cloud_cover','wind_speed_10m','wind_gusts_10m','wind_direction_10m','cape','visibility','freezing_level_height']}
];
const TYPE_LABEL={trailhead:'登山口・下山口',peak:'山頂',hut:'山小屋',pass:'峠・分岐',camp:'山小屋'};
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
  '稲村ヶ岳': {latitude:34.237629, longitude:135.923656},
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
  "茶臼岳（那須岳）",
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
  "丹沢山",
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
  "観音岳(鳳凰)",
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

// V1.4.218: 山の情報ページ用の読み。日本三百名山は公開一覧の「山名・よみ」順に対応させ、
// 山名キー自体は変更しない（代表コース・CT・全国判定など既存処理への影響を避ける）。
const JAPAN_300_MOUNTAIN_READINGS = [
  'りしりざん','らうすだけ','しゃりだけ','おあかんだけ','てしおだけ','にせいかうしゅっぺやま','だいせつざん（あさひだけ）','いしかりだけ','とむらうしやま','おぷたてしけやま',
  'とかちだけ','にぺそつやま','ぽろしりだけ','かむいえくうちかうしやま','ぺてがりだけ','かむいだけ','あしべつだけ','ゆうばりだけ','しょかんべつだけ','よいちだけ',
  'たるまえさん','しりべしやま','にせこあんぬぷり','かりばやま','おしまこまがたけ','だいせんげんだけ','はっこうださん','いわきさん','しらかみだけ','はちまんたい',
  'にゅうとうざん（えぼしだけ）','あきたこまがたけ','いわてさん','ひめかみやま','はやちねさん','ごようざん','わがだけ','やけいしだけ','くりこまやま','かむろさん',
  'もりよしざん','たいへいざん','ちょうかいさん','がっさん','まやさん','いとうだけ','おおあさひだけ','いわいがめやま','ふながたやま','いずみがたけ',
  'ざおうざん（くまのだけ）','いいでさん','にしあづまさん','いっさいきょうざん','あだたらやま','ばんだいさん','ふたまたやま','ななつがたけ','あらかいさん','たいしゃくざん',
  'あいづこまがたけ','あいづあさひだけ','ひうちがたけ','おおたきねやま','えぶりさしだけ','にのうじだけ','あわがたけ','みかぐらだけ','すもんだけ','あさくさだけ',
  'ひらがたけ','えちごこまがたけ','なかのだけ','はっかいさん','なえばさん','さぶりゅうやま','とりかぶとやま','きんぽくさん','よねやま','やみぞさん',
  'つくばさん','さんぼんやりだけ','おじかだけ','けいつるやま','しぶつさん','しゃかがたけ','にょほうさん','なんたいさん','たろうさん','おくしらねさん',
  'すかいさん','けさまるやま','ほたかやま','あかぎさん（くろびやま）','くさつしらねさん','あさまかくしやま','はるなさん（はるなふじ）','みょうぎさん（そうまだけ）','あらふねやま','すわやま',
  'まきはたやま','あさひだけ','たにがわだけ','せんのくらやま','しらすなやま','よこてやま','いわすげやま','かさがたけ','あずまやさん','あさまやま',
  'おぐらやま','たてしなやま','てんぐだけ','やつがたけ（あかだけ）','にゅうかさやま','きりがみね（くるまやま）','はちぶせやま','うつくしがはら','いいづなやま','とがくしやま',
  'たかつまやま','くろひめやま','まだらおやま','みょうこうさん','ひうちやま','やけやま','あまかざりやま','おうみくろひめやま','あさひだけ','ゆきくらだけ',
  'しろうまだけ','からまつだけ','ごりゅうだけ','かしまやりがたけ','じいがたけ','はりのきだけ','れんげだけ','けかちやま','つるぎだけ','たてやま',
  'おくだいにちだけ','くわさきやま','やくしだけ','くろべごろうだけ','えぼしだけ','のぐちごろうだけ','すいしょうだけ（くろだけ）','わしばだけ','みつまたれんげだけ','あかうしだけ',
  'かさがたけ','がきだけ','つばくろだけ','ありあけやま','おてんしょうだけ','じょうねんだけ','やりがたけ','おくほたかだけ','やけだけ','かすみざわだけ',
  'はちもりやま','のりくらだけ','おんたけ','こひでやま','おくさんかいだけ','きょうがたけ','きそこまがたけ','うつぎだけ','みなみこまがたけ','こすもやま',
  'あんぺいじやま','なぎそだけ','えなさん','ぶこうさん','りょうかみさん','くもとりやま','わなぐらやま（しろいしやま）','こぶしがたけ','こくしがたけ','きんぷさん',
  'みずがきやま','かやがたけ','けんとくさん','だいぼさつれい','おおだけさん','みとうさん','おおやま','とうのたけ','きんときやま','はこねやま',
  'あまぎさん（ばんさぶろうだけ）','あしたかやま（えちぜんだけ）','けなしやま','しちめんざん','やんぶし','くしがたやま','みしょうたいさん','みつとうげやま','くろだけ','ふじさん',
  'かいこまがたけ','のこぎりだけ','せんじょうがたけ','あさよみね','じぞうがたけ','きただけ','あいのたけ','のうとりだけ','しおみだけ','あらかわだけ',
  'あかいしだけ','ひじりだけ','かみこうちだけ','ちゃうすだけ','てかりだけ','いけぐちだけ','おくちゃうすやま','だいむげんざん','くろぼうしだけ','ざるがたけ',
  'たかつかやま','くまぶしやま','しらきみね','こんごうどうざん','にんぎょうざん','いおうぜん','だいもんざん','おおがさやま','おいずるがだけ','さんぽういわだけ',
  'さるがばんばやま','はくさん','きょうがだけ','のぶせがだけ','だいにちがたけ','わしがたけ','くらいやま','かおれだけ','あらしまだけ','のうごうはくさん',
  'かんむりやま','いぶきやま','ふじわらだけ','ございしょだけ','くろそやま','みうねやま','たかみやま','ひのでがたけ','りゅうもんがだけ','さんじょうがたけ',
  'はっきょうがたけ','しゃかがだけ','おばこだけ','ごまだんざん','やまとかつらぎさん','こんごうざん','ぶながたけ','ほうらいさん','ひえいざん','あたごやま',
  'ろっこうさん','おおぎのせん','ひょうのせん','なぎさん','だいせん','かみひるぜん','どうごやま','あづまやま','さんべさん','つるぎさん',
  'みうね','ひがしあかいしやま','ささがみね','いよふじ','かめがもり','いしづちさん','さんぼんぐい','ささやま','ひこさん','せふりやま',
  'たらだけ','うんぜんだけ（ふげんだけ）','つるみだけ','ゆふだけ','たいせんざん','くじゅうさん','わいたざん','あそさん（たかだけ）','そぼさん','かたむきやま',
  'おおくえやま','くにみだけ','いちふさやま','おすずやま','きりしまやま（からくにだけ）','たかちほのみね','さくらじま（おんたけ）','たかくまやま','かいもんだけ','みやのうらだけ'
];
const EXTRA_MOUNTAIN_READINGS = Object.freeze({
  '茶臼岳（那須岳）':'ちゃうすだけ（なすだけ）',
  '三本槍岳':'さんぼんやりだけ',
  '丹沢山':'たんざわさん',
  '塔ノ岳':'とうのだけ',
  '蝶ヶ岳':'ちょうがたけ','西穂高岳':'にしほたかだけ','南岳':'みなみだけ','北穂高岳':'きたほたかだけ','前穂高岳':'まえほたかだけ',
  '赤岳':'あかだけ','横岳（八ヶ岳）':'よこだけ（やつがたけ）','硫黄岳（八ヶ岳）':'いおうだけ（やつがたけ）','阿弥陀岳':'あみだだけ','権現岳':'ごんげんだけ','編笠山':'あみがさやま','北横岳':'きたよこだけ',
  '薬師岳(鳳凰)':'やくしだけ（ほうおう）','観音岳(鳳凰)':'かんのんだけ（ほうおう）','地蔵岳(鳳凰)':'じぞうだけ（ほうおう）','御嶽山':'おんたけさん',
  '宮之浦岳':'みやのうらだけ','大山':'だいせん','中岳(くじゅう)':'なかだけ（くじゅう）','三俣山':'みまたやま','星生山':'ほっしょうざん'
});
function nationalMountainReading(name){
  if(EXTRA_MOUNTAIN_READINGS[name])return EXTRA_MOUNTAIN_READINGS[name];
  const i=JAPAN_300_MOUNTAINS.indexOf(name);
  return i>=0?(JAPAN_300_MOUNTAIN_READINGS[i]||''):'';
}

// V1.4.154: 全国分析の山紹介ページに、日本百名山・二百名山・三百名山の称号バッジを表示。
// 日本二百名山は「日本百名山100座 + 追加100座」のうち、全国三百名山に含まれる追加99座を保持する。
const JAPAN_100_MOUNTAINS = new Set([
  '利尻山','羅臼岳','斜里岳','雄阿寒岳','大雪山（旭岳）','トムラウシ山','十勝岳','幌尻岳','後方羊蹄山',
  '岩木山','八甲田山','八幡平','岩手山','早池峰山','鳥海山','月山','大朝日岳','蔵王山（熊野岳）','飯豊山','西吾妻山','安達太良山','磐梯山','会津駒ヶ岳','越後駒ヶ岳','平ヶ岳','巻機山','燧ヶ岳','至仏山','谷川岳','苗場山','妙高山','火打山','雨飾山','高妻山',
  '男体山','奥白根山','茶臼岳（那須岳）','皇海山','武尊山','赤城山（黒檜山）','草津白根山','四阿山','浅間山','筑波山','丹沢山','両神山','雲取山','甲武信ヶ岳','金峰山','瑞牆山','大菩薩嶺',
  '白馬岳','五竜岳','鹿島槍ヶ岳','剱岳','立山','薬師岳','黒部五郎岳','水晶岳（黒岳）','鷲羽岳','槍ヶ岳','奥穂高岳','常念岳','笠ヶ岳（岐阜）','焼岳','乗鞍岳',
  '木曽駒ヶ岳','空木岳','恵那山',
  '甲斐駒ヶ岳','仙丈ヶ岳','観音岳(鳳凰)','北岳','間ノ岳','塩見岳','荒川岳','赤石岳','聖岳','光岳',
  '御嶽','美ヶ原','霧ヶ峰（車山）','蓼科山','八ヶ岳（赤岳）','白山','荒島岳','富士山','天城山（万三郎岳）',
  '伊吹山','日出ヶ岳','八経ヶ岳','大山（鳥取）','剣山','石鎚山','久住山','祖母山','阿蘇山（高岳）','霧島山（韓国岳）','開聞岳','宮ノ浦岳'
]);
const JAPAN_200_ADDITIONAL_MOUNTAINS = new Set([
  '天塩岳','石狩岳','ニペソツ山','カムイエクウチカウシ山','ペテガリ岳','芦別岳','夕張岳','暑寒別岳','樽前山','渡島駒ヶ岳',
  '白神岳','姫神山','秋田駒ヶ岳','和賀岳','焼石岳','栗駒山','神室山','森吉山','以東岳','船形山','帝釈山','会津朝日岳',
  '女峰山','仙ノ倉山','浅間隠山','榛名山（榛名富士）','妙義山（相馬岳）','荒船山','武甲山','和名倉山（白石山）','大岳山',
  '杁差岳','二王子岳','御神楽岳','守門岳','中ノ岳','八海山','佐武流山','鳥甲山','白砂山','岩菅山','御座山','茅ヶ岳','乾徳山','三ッ峠山','御正体山','毛無山','愛鷹山（越前岳）','天狗岳','黒姫山','戸隠山','飯縄山','雪倉岳','針ノ木岳','烏帽子岳','赤牛岳','毛勝山','奥大日岳','有明山','餓鬼岳','燕岳','大天井岳','霞沢岳','鋸岳','農鳥岳','上河内岳','池口岳','大無間山','櫛形山','笊ヶ岳','七面山','小秀山','経ヶ岳（長野）','南駒ヶ岳','安平路山','金剛堂山','笈ヶ岳','大日ヶ岳','位山','能郷白山',
  '御在所岳','釈迦ヶ岳（奈良）','伯母子岳','金剛山','武奈ヶ岳','氷ノ山','上蒜山','三瓶山','三嶺','東赤石山','笹ヶ峰','英彦山','雲仙岳（普賢岳）','由布岳','大崩山','市房山','尾鈴山','高千穂峰','桜島（御岳）'
]);
function nationalMountainHonor(name){
  if(JAPAN_100_MOUNTAINS.has(name))return {label:'百名山',tone:'100'};
  if(JAPAN_200_ADDITIONAL_MOUNTAINS.has(name))return {label:'二百名山',tone:'200'};
  if(JAPAN_300_MOUNTAINS.includes(name))return {label:'三百名山',tone:'300'};
  return null;
}
function nationalMountainHonorHtml(name){
  const h=nationalMountainHonor(name);
  if(!h)return '';
  return `<span class="national-honor-badge tone-${h.tone}" title="日本${h.label}" aria-label="日本${h.label}"><small>${h.label}</small></span>`;
}
const MOUNTAIN_NAME_ALIAS = {
  '大山（鳥取）':'大山',
  '宮ノ浦岳':'宮之浦岳',
  '御嶽':'御嶽山',
  '八ヶ岳（赤岳）':'赤岳',
  '鳳凰山':'観音岳(鳳凰)',
  '地蔵ヶ岳':'地蔵岳(鳳凰)',
  '那須岳':'茶臼岳（那須岳）',
  '茶臼岳(那須岳)':'茶臼岳（那須岳）',
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
    {id:'builtin-fuji-fujiichikan',type:'hut',name:'富士一館',lat:35.377222,lon:138.743333,elevation:2816,source:'固定候補'},
    {id:'builtin-fuji-toyokan',type:'hut',name:'東洋館',lat:35.375833,lon:138.742778,elevation:2911,source:'固定候補'},
    {id:'builtin-fuji-fujisanhotel',type:'hut',name:'富士山ホテル',lat:35.369167,lon:138.738889,elevation:3356,source:'固定候補'},
    {id:'builtin-fuji-goraiko',type:'hut',name:'御来光山荘',lat:35.344722,lon:138.736667,elevation:2795,source:'固定候補'},
    {id:'builtin-fuji-chojo-yamaguchiya',type:'hut',name:'頂上山口屋',lat:35.365000,lon:138.733056,elevation:3715,source:'固定候補'},
    {id:'builtin-fuji-chojo-fujikan',type:'hut',name:'頂上富士館',lat:35.359444,lon:138.730833,elevation:3713,source:'固定候補'},
    {id:'builtin-fuji-yoshida7',type:'hut',name:'吉田口七合目',lat:35.3817,lon:138.7317,elevation:2700},
    {id:'builtin-fuji-hachigo',type:'hut',name:'八合目',lat:35.3719,lon:138.7315,elevation:3100},
    {id:'builtin-fuji-peak',type:'peak',name:'富士山（剣ヶ峰）',lat:35.3606,lon:138.7274,elevation:3776}
  ],
  '赤岳': [
    {id:'builtin-aka-minoto',type:'trailhead',name:'美濃戸口',lat:35.9978,lon:138.3079,elevation:1490},
    {id:'builtin-aka-akadakekosen',type:'hut',name:'赤岳鉱泉',lat:35.98678,lon:138.36025,elevation:2212},
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
    {id:'builtin-kashima-taneike',type:'hut',name:'種池山荘',lat:36.58778,lon:137.73556,elevation:2450},
    {id:'builtin-kashima-tsumetaike',type:'hut',name:'冷池山荘',lat:36.60278,lon:137.74833,elevation:2410},
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

// V1.4.16: 剣山〜三嶺 縦走回廊。
// YAMAPの見ノ越-剣山-次郎笈-三嶺縦走コースと公開座標で確認した主要地点を固定。
Object.assign(REGIONAL_CATALOG, {
  shikoku_tsurugi_miune: [
    {id:'area-tm-minokoshi',type:'trailhead',name:'見ノ越 剣山登山口',lat:33.866558,lon:134.089036,elevation:1394,source:'固定候補'},
    {id:'area-tm-nishijima-camp',type:'camp',name:'剣山野営場（西島野営場）',lat:33.8603605,lon:134.0884449585372,elevation:1710,source:'にし阿波公式・剣山野営場（西島駅野営場）埋め込み地図'},
    {id:'area-tm-tsurugi',type:'peak',name:'剣山',lat:33.853611,lon:134.094167,elevation:1955,source:'固定候補'},
    {id:'area-tm-jirogyu',type:'peak',name:'次郎笈',lat:33.843056,lon:134.086111,elevation:1930,source:'固定候補'},
    {id:'area-tm-shiraga-hut',type:'hut',name:'白髪避難小屋',lat:33.821944,lon:134.001222,elevation:1666,source:'固定候補'},
    {id:'area-tm-miune',type:'peak',name:'三嶺',lat:33.839444,lon:133.987778,elevation:1894,source:'固定候補'},
    {id:'area-tm-miune-hut',type:'hut',name:'三嶺ヒュッテ',lat:33.840556,lon:133.991389,elevation:1845,source:'固定候補'},
    {id:'area-tm-nagoro',type:'trailhead',name:'名頃登山口 三嶺',lat:33.852472,lon:134.023972,elevation:907,source:'固定候補'}
  ]
});


// V1.4.17: 燧ヶ岳〜尾瀬ヶ原〜至仏山 縦走回廊。
// 見晴・龍宮小屋・山ノ鼻を固定し、尾瀬の代表的な縦走動線を同一候補群として提示。
Object.assign(REGIONAL_CATALOG, {
  oze_hiuchi_shibutsu: [
    {id:'area-ohs-hiuchi',type:'peak',name:'燧ヶ岳（柴安嵓）',lat:36.955102,lon:139.285334,elevation:2356,source:'固定候補'},
    {id:'area-ohs-miharashi',type:'hut',name:'見晴（尾瀬小屋・見晴地区）',lat:36.940556,lon:139.251944,elevation:1418,source:'固定候補'},
    {id:'area-ohs-ryugu',type:'hut',name:'龍宮小屋',lat:36.932500,lon:139.238333,elevation:1402,source:'固定候補'},
    {id:'area-ohs-yamanohana',type:'trailhead',name:'山ノ鼻（至仏山東面登山道入口・登り専用）',lat:36.915833,lon:139.198056,elevation:1410,source:'固定候補'},
    {id:'area-ohs-shibutsu',type:'peak',name:'至仏山',lat:36.903474,lon:139.173248,elevation:2228,source:'固定候補'},
    {id:'area-ohs-hatomachi',type:'trailhead',name:'鳩待峠',lat:36.888750,lon:139.201027,elevation:1585,source:'固定候補'}
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
    {id:'area-ut-taneike',type:'hut',name:'種池山荘',lat:36.58778,lon:137.73556,elevation:2450},
    {id:'area-ut-kashima',type:'peak',name:'鹿島槍ヶ岳',lat:36.6244,lon:137.7467,elevation:2889},
    {id:'area-ut-tsumetaike',type:'hut',name:'冷池山荘',lat:36.60278,lon:137.74833,elevation:2410},
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
    // V1.5.18: 雲ノ平グランドサークル用。公開座標のみを固定し、推測座標は使用しない。
    {id:'v1518-yakushisawa',type:'hut',name:'薬師沢小屋',lat:36.42859,lon:137.54628,elevation:1920,source:'OpenStreetMap node 4346427174 / 公開山小屋情報'},
    {id:'v1518-kumonodaira',type:'hut',name:'雲ノ平山荘',lat:36.42061,lon:137.57654,elevation:2551,source:'OpenStreetMap node 5643992032 / 公開山小屋情報'},
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
  {id:'area-hf-taneike',type:'hut',name:'種池山荘',lat:36.58778,lon:137.73556,elevation:2450},
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
  {id:'area-san-yashajin',type:'trailhead',name:'夜叉神峠登山口',lat:35.635523,lon:138.345424,elevation:1400},
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
  // V1.4.185: 中白根山（3055m）。公開地形図・登山資料の山頂座標を照合して固定。
  {id:'area-sas-nakashirane',type:'peak',name:'中白根山',lat:35.658602,lon:138.228191,elevation:3055,source:'公開地形図・登山資料照合'},
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
  {id:'area-ys-akakosen',type:'hut',name:'赤岳鉱泉',lat:35.98678,lon:138.36025,elevation:2212},
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
    {id:'fixed3-tohoku-moriyoshi-buna',type:'trailhead',name:'ブナ帯登山口',lat:39.961917,lon:140.509417,elevation:835,source:'固定候補'}
  ]
});



// V1.12.3: 固定登山口・座標拡張 第4弾（関東・甲信中心）。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '西吾妻山': [
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
    {id:'fixed8-southalps-jizo-yashajin',type:'trailhead',name:'夜叉神峠登山口',lat:35.635523,lon:138.345424,elevation:1400,source:'固定候補'}
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

// V1.4.21: 未確定だった通過ポイントのうち、公開情報で位置を確認できた登山口・交通起点を固定化。
// 既存固定点と同一地点の別名は CURATED_ACCESS_HINTS 側を既存名称へ統一し、重複表示を避ける。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '利尻山': [
    {id:'fixed1421-rishiri-kutsugata',type:'trailhead',name:'沓形登山口',lat:45.182222,lon:141.192222,elevation:430,source:'固定候補'}
  ],
  '大雪山（旭岳）': [
    {id:'fixed1421-asahidake-sugatami',type:'trailhead',name:'旭岳ロープウェイ姿見駅',lat:43.661917,lon:142.824767,elevation:1600,source:'固定候補'}
  ],
  'オプタテシケ山': [
    {id:'fixed1421-optateshike-bogakudai',type:'trailhead',name:'望岳台',lat:43.447639,lon:142.649861,elevation:933,source:'固定候補'}
  ],
  '十勝岳': [
    {id:'fixed1421-tokachi-fukiage',type:'trailhead',name:'吹上温泉登山口',lat:43.431750,lon:142.641944,elevation:1010,source:'固定候補'}
  ],
  '芦別岳': [
    {id:'fixed1421-ashibetsu-taiyounosato',type:'trailhead',name:'山部自然公園太陽の里 芦別岳登山口',lat:43.248750,lon:142.340750,elevation:300,source:'固定候補'}
  ],
  '後方羊蹄山': [
    {id:'fixed1421-yotei-kyogoku',type:'trailhead',name:'京極登山口',lat:42.844750,lon:140.854917,elevation:400,source:'固定候補'}
  ],
  '八甲田山': [
    {id:'fixed1421-hakkoda-sancho',type:'trailhead',name:'八甲田ロープウェー山頂公園駅',lat:40.675904,lon:140.858690,elevation:1314,source:'固定候補'}
  ],
  '岩木山': [
    {id:'fixed1421-iwaki-8th',type:'trailhead',name:'岩木山八合目',lat:40.653361,lon:140.292500,elevation:1243,source:'固定候補'}
  ],
  '乳頭山（烏帽子岳）': [
    {id:'fixed1421-nyuto-kuroyu',type:'trailhead',name:'黒湯温泉',lat:39.799167,lon:140.808897,elevation:800,source:'固定候補'},
    {id:'fixed1421-nyuto-ganiba',type:'trailhead',name:'蟹場温泉',lat:39.806070,lon:140.798740,elevation:786,source:'固定候補'}
  ],
  '秋田駒ヶ岳': [
    {id:'fixed1421-akita-koma-8th',type:'trailhead',name:'八合目小屋 秋田駒ヶ岳',lat:39.768170,lon:140.807412,elevation:1304,source:'固定候補'}
  ],
  '栗駒山': [
    {id:'fixed1421-kurikoma-sukawa',type:'trailhead',name:'須川高原温泉',lat:38.979944,lon:140.769306,elevation:1126,source:'固定候補'}
  ],
  '月山': [
    {id:'fixed1421-gassan-ubasawa',type:'trailhead',name:'姥沢 月山リフト',lat:38.517333,lon:140.007111,elevation:1152,source:'固定候補'}
  ],
  '大朝日岳': [
    {id:'fixed1421-oasahi-higuresawa',type:'trailhead',name:'日暮沢登山口駐車場（日暮沢小屋）',lat:38.320806,lon:139.943667,elevation:617,source:'固定候補'}
  ],
  '船形山': [
    {id:'fixed1421-funagata-otaki',type:'trailhead',name:'大滝キャンプ場・船形山登山口',lat:38.458083,lon:140.644528,elevation:1042,source:'固定候補'}
  ],
  '蔵王山（熊野岳）': [
    {id:'fixed1421-zao-jizo',type:'trailhead',name:'蔵王ロープウェイ地蔵山頂駅',lat:38.154781,lon:140.431075,elevation:1661,source:'固定候補'}
  ],
  '飯豊山': [
    {id:'fixed1421-iide-dainichisugi',type:'trailhead',name:'大日杉登山口',lat:37.851306,lon:139.779833,elevation:610,source:'固定候補'}
  ],
  '磐梯山': [
    {id:'fixed1421-bandai-inawashiro',type:'trailhead',name:'猪苗代登山口（猪苗代スキー場）',lat:37.574117,lon:140.094226,elevation:690,source:'固定候補'}
  ],
  '七ヶ岳': [
    {id:'fixed1421-nanatsugatake-takatsue',type:'trailhead',name:'会津高原たかつえスキー場・七ヶ岳登山口',lat:37.110389,lon:139.614722,elevation:954,source:'固定候補'}
  ]
});

// V1.4.134: 交通施設起点を削除した4山に、実際の徒歩開始地点を固定再登録。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '幌尻岳': [
    {id:'fixed14134-poroshiri-idonnappu',type:'trailhead',name:'イドンナップ山荘駐車場（新冠陽希コース）',lat:42.675806,lon:142.584444,elevation:410,source:'登山口P・新冠陽希コース登山口'}
  ],
  '西吾妻山': [
    {id:'fixed14134-nishiazuma-shirabu',type:'trailhead',name:'白布峠登山口',lat:37.750714,lon:140.091777,elevation:1404,source:'登山口ナビ・白布峠'}
  ],
  '八海山': [
    {id:'fixed14134-hakkai-byobu',type:'trailhead',name:'八海山・屏風道二合目登山口',lat:37.099944,lon:138.986750,elevation:460,source:'登山口P・屏風道二合目'}
  ],
  '奥白根山': [
    {id:'fixed14134-okushirane-suganuma',type:'trailhead',name:'菅沼登山口',lat:36.820750,lon:139.380250,elevation:1740,source:'登山口P・菅沼ルート'}
  ]
});

// V1.10.0 全国主要山域強化。
// 座標をハードコードせず、代表登山口・山小屋の「名称」を手登録し、選択時にOSM/Nominatimで座標解決する。
// これにより全国の三百名山で手登録候補を持ちつつ、施設移転・名称差異にも自動探索で補完できる。
const CURATED_ACCESS_HINTS = {
  // 北海道
  '利尻山':{trailheads:['利尻北麓野営場（鴛泊コース）','沓形登山口'],huts:['利尻山避難小屋']},
  '羅臼岳':{trailheads:['岩尾別温泉・木下小屋登山口'],huts:['羅臼平']},
  '斜里岳':{trailheads:['清岳荘'],huts:['清岳荘']},
  '雄阿寒岳':{trailheads:['滝口 雄阿寒岳登山口']},
  '天塩岳':{trailheads:['天塩岳ヒュッテ 登山口'],huts:['天塩岳ヒュッテ']},
  'ニセイカウシュッペ山':{trailheads:['ニセイカウシュッペ山登山口（古川林道・西尾根）']},
  '大雪山（旭岳）':{trailheads:['旭岳ロープウェイ姿見駅','旭岳ロープウェイ山麓駅'],huts:['旭岳石室']},
  '石狩岳':{trailheads:['シュナイダーコース登山口（音更川二十一ノ沢出合）','ユニ石狩岳登山口']},
  'トムラウシ山':{trailheads:['トムラウシ短縮コース登山口'],huts:['ヒサゴ沼避難小屋']},
  'オプタテシケ山':{trailheads:['望岳台'],huts:['美瑛富士避難小屋']},
  '十勝岳':{trailheads:['望岳台','吹上温泉登山口'],huts:['十勝岳避難小屋']},
  'ニペソツ山':{trailheads:['幌加温泉コース登山口']},
  '幌尻岳':{trailheads:['イドンナップ山荘駐車場（新冠陽希コース）'],huts:['幌尻山荘','新冠ポロシリ山荘']},
  'カムイエクウチカウシ山':{trailheads:['札内川ヒュッテ'],huts:['札内川ヒュッテ']},
  'ペテガリ岳':{trailheads:['神威山荘（ペテガリ岳アプローチ起点）'],huts:['ペテガリ山荘']},
  '神威岳':{trailheads:['神威山荘']},
  '芦別岳':{trailheads:['山部自然公園太陽の里 芦別岳登山口']},
  '夕張岳':{trailheads:['冷水・馬の背登山口（夕張岳ヒュッテ）'],huts:['夕張岳ヒュッテ']},
  '暑寒別岳':{trailheads:['暑寒荘'],huts:['暑寒荘']},
  '余市岳':{trailheads:['キロロ ゴンドラ山頂駅']},
  '樽前山':{trailheads:['7合目登山口']},
  '後方羊蹄山':{trailheads:['比羅夫登山口・半月湖畔自然公園','真狩登山口・真狩キャンプ場','京極登山口'],huts:['羊蹄山避難小屋']},
  'ニセコアンヌプリ':{trailheads:['五色温泉インフォメーションセンター']},
  '狩場山':{trailheads:['千走登山口']},
  '渡島駒ヶ岳':{trailheads:['赤井川登山口・6合目駐車場']},
  '大千軒岳':{trailheads:['奥二股登山口駐車場']},

  // 東北
  '八甲田山':{trailheads:['酸ヶ湯登山口','八甲田ロープウェー山頂公園駅'],huts:['仙人岱避難小屋']},
  '岩木山':{trailheads:['岩木山八合目','嶽温泉・嶽コース登山口']},
  '白神岳':{trailheads:['白神岳登山口'],huts:['白神岳避難小屋']},
  '八幡平':{trailheads:['八幡平見返峠・山頂レストハウス']},
  '乳頭山（烏帽子岳）':{trailheads:['黒湯温泉','蟹場温泉']},
  '秋田駒ヶ岳':{trailheads:['八合目小屋 秋田駒ヶ岳'],huts:['阿弥陀池避難小屋']},
  '岩手山':{trailheads:['馬返し登山口 岩手山','焼走り登山口'],huts:['八合目避難小屋']},
  '姫神山':{trailheads:['一本杉登山口 姫神山']},
  '早池峰山':{trailheads:['小田越登山口'],huts:['早池峰山避難小屋']},
  '五葉山':{trailheads:['赤坂峠 五葉山登山口'],huts:['石楠花荘']},
  '和賀岳':{trailheads:['甘露水口・薬師岳登山口駐車場']},
  '焼石岳':{trailheads:['中沼登山口'],huts:['銀明水避難小屋']},
  '栗駒山':{trailheads:['いわかがみ平','須川高原温泉']},
  '神室山':{trailheads:['西ノ又登山口 神室山']},
  '森吉山':{trailheads:['阿仁ゴンドラ山頂駅']},
  '太平山':{trailheads:['旭又登山口 太平山']},
  '鳥海山':{trailheads:['鉾立登山口（象潟口）','湯ノ台口'],huts:['御浜小屋','大物忌神社参籠所']},
  '月山':{trailheads:['月山八合目','姥沢 月山リフト'],huts:['佛生池小屋']},
  '摩耶山':{trailheads:['越沢口']},
  '以東岳':{trailheads:['泡滝ダム・大鳥登山口'],huts:['以東岳避難小屋','大鳥小屋']},
  '大朝日岳':{trailheads:['古寺案内センター（古寺コース）','日暮沢登山口駐車場（日暮沢小屋）'],huts:['大朝日小屋','竜門小屋']},
  '祝瓶山':{trailheads:['祝瓶山荘駐車場・桑住平ルート'],huts:['祝瓶山荘']},
  '船形山':{trailheads:['大滝キャンプ場・船形山登山口','旗坂キャンプ場駐車場（升沢コース）'],huts:['升沢避難小屋']},
  '泉ヶ岳':{trailheads:['泉ヶ岳大駐車場']},
  '蔵王山（熊野岳）':{trailheads:['蔵王ロープウェイ地蔵山頂駅','刈田峠']},
  '飯豊山':{trailheads:['御沢登山口・御沢野営場','大日杉登山口'],huts:['三国小屋','切合小屋','本山小屋']},
  '西吾妻山':{trailheads:['白布峠登山口'],huts:['西吾妻小屋']},
  '八海山':{trailheads:['八海山・屏風道二合目登山口'],huts:['八海山千本檜小屋']},
  '奥白根山':{trailheads:['菅沼登山口']},
  '一切経山':{trailheads:['浄土平'],huts:['酸ヶ平避難小屋']},
  '安達太良山':{trailheads:['あだたら山ロープウェイ山頂駅','奥岳登山口・あだたら山ロープウェイ'],huts:['くろがね小屋']},
  '磐梯山':{trailheads:['八方台登山口','猪苗代登山口（猪苗代スキー場）'],huts:['弘法清水小屋']},
  '二岐山':{trailheads:['御鍋神社登山口 二岐山']},
  '七ヶ岳':{trailheads:['会津高原たかつえスキー場・七ヶ岳登山口']},
  '荒海山':{trailheads:['八総鉱山跡・荒海山登山駐車場']},
  '帝釈山':{trailheads:['馬坂峠 帝釈山登山口']},
  '会津駒ヶ岳':{trailheads:['滝沢登山口 会津駒ヶ岳'],huts:['駒の小屋']},
  '会津朝日岳':{trailheads:['赤倉沢登山口 会津朝日岳']},
  '燧ヶ岳':{trailheads:['御池登山口 燧ヶ岳','長英新道 尾瀬沼'],huts:['尾瀬沼ヒュッテ']},
  '大滝根山':{trailheads:['仙台平 大滝根山登山口']},

  // 関東（代表的な未補強山）
  '筑波山':{trailheads:['筑波山神社入口','筑波山つつじヶ丘駐車場','つつじヶ丘登山口'],huts:[]},

  // 近畿
  '伊吹山':{trailheads:['伊吹山 上野登山口（三之宮神社）','伊吹山ドライブウェイ山頂駐車場']},
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
  '比叡山':{trailheads:['坂本ケーブル延暦寺駅','雲母坂登山口（修学院）']},
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
  '熊沢岳':'central_kisokoma_utsugi','東川岳':'central_kisokoma_utsugi','空木岳':'central_kisokoma_utsugi',
  // V1.4.16 四国 剣山〜三嶺縦走回廊
  '剣山':'shikoku_tsurugi_miune','三嶺':'shikoku_tsurugi_miune',
  // V1.4.17 尾瀬 燧ヶ岳〜至仏山縦走回廊
  '燧ヶ岳':'oze_hiuchi_shibutsu','至仏山':'oze_hiuchi_shibutsu'
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
    {id:'v1222-nikkoshirane-peak',type:'peak',name:'奥白根山（日光白根山）',lat:36.798602,lon:139.375921,elevation:2578,source:'固定候補'}],
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


// V1.4.155: 主要通過ポイント拡張 第1弾。
// 代表コース上で判断材料になりやすい中間地点（峠・分岐・避難小屋・テント場）を固定候補に追加。
function appendFixedWaypoints(mountain, points){
  const old=BUILTIN_ROUTE_CATALOG[mountain]||[];
  const seen=new Set(old.map(p=>`${p.type}|${accessNameKey(p.name)}`));
  const add=points.filter(p=>!seen.has(`${p.type}|${accessNameKey(p.name)}`));
  BUILTIN_ROUTE_CATALOG[mountain]=[...old,...add];
}

// V1.5.22: 表銀座・東鎌尾根の固定通過ポイント。座標は公開座標のみ。
const V1522_OMOTE_GINZA_WAYPOINTS = {
  '大天井岳':[
    {id:'v1522-otenjo-hutte',type:'hut',name:'大天井ヒュッテ',lat:36.362846,lon:137.695560,elevation:2630,source:'北アルプス山小屋友交会・公開座標'}
  ],
  '槍ヶ岳':[
    {id:'v1522-nishidake-hutte',type:'hut',name:'ヒュッテ西岳',lat:36.335644,lon:137.680013,elevation:2680,source:'北アルプス山小屋友交会・公開座標'},
    {id:'v1522-nishidake-peak',type:'peak',name:'西岳',lat:36.337222,lon:137.679444,elevation:2758,source:'国土地理院・日本の主な山岳（36°20′14″, 137°40′46″）'},
    {id:'v1522-mizumata-nokkoshi',type:'pass',name:'水俣乗越',lat:36.336867,lon:137.670133,elevation:2471,source:'公開GPS記録（N36 20.212 E137 40.208）'},
    {id:'v1522-hutte-oyari',type:'hut',name:'ヒュッテ大槍',lat:36.338116,lon:137.654940,elevation:2884,source:'北アルプス山小屋友交会・公開座標'}
  ]
};
for(const [mountain,points] of Object.entries(V1522_OMOTE_GINZA_WAYPOINTS)) appendFixedWaypoints(mountain,points);

const V14155_MAJOR_WAYPOINTS = {
  '大雪山（旭岳）':[
    {id:'v14155-daisetsu-kurodake-ishimuro',type:'hut',name:'黒岳石室',lat:43.695116,lon:142.911033,elevation:1890,source:'大雪山国立公園・GPS位置情報'},
  ],
  '十勝岳':[
    {id:'v14155-tokachi-kamihoro-hut',type:'hut',name:'上ホロカメットク避難小屋',lat:43.406667,lon:142.675000,elevation:1828,source:'気象庁・十勝岳観測点位置情報'},
  ],
  '谷川岳':[
    {id:'v14155-tanigawa-kata',type:'hut',name:'谷川岳肩ノ小屋',lat:36.833025,lon:138.929708,elevation:1912,source:'公開地図座標'},
  ],
  '槍ヶ岳':[
    {id:'v14155-yari-babadaira',type:'camp',name:'ババ平（槍沢キャンプ場）',lat:36.323490,lon:137.675690,elevation:1990,source:'OpenStreetMap公開座標'},
    {id:'v14155-yari-omagari',type:'pass',name:'大曲（水俣乗越分岐）',lat:36.330256,lon:137.670564,elevation:2094,source:'GPS公開記録'},
    {id:'v14155-yari-tenguhara',type:'pass',name:'天狗原分岐',lat:36.326580,lon:137.659980,elevation:2348,source:'OpenStreetMap公開座標'},
  ],
  '南岳':[
    {id:'v14155-minami-omagari',type:'pass',name:'大曲（水俣乗越分岐）',lat:36.330256,lon:137.670564,elevation:2094,source:'GPS公開記録'},
    {id:'v14155-minami-tenguhara',type:'pass',name:'天狗原分岐',lat:36.326580,lon:137.659980,elevation:2348,source:'OpenStreetMap公開座標'},
  ],
  '北岳':[
    {id:'v14155-kita-nakashirane',type:'peak',name:'中白根山',lat:35.658600,lon:138.228300,elevation:3055,source:'OpenStreetMap公開座標'},
  ],
  '間ノ岳':[
    {id:'v14155-aino-nakashirane',type:'peak',name:'中白根山',lat:35.658600,lon:138.228300,elevation:3055,source:'OpenStreetMap公開座標'},
  ],
  '甲斐駒ヶ岳':[
    {id:'v14155-kaikoma-komorebi',type:'hut',name:'北沢峠こもれび山荘',lat:35.742580,lon:138.213500,elevation:2036,source:'OpenStreetMap公開座標'},
    {id:'v14155-kaikoma-marishiten',type:'peak',name:'摩利支天',lat:35.754500,lon:138.239300,elevation:2820,source:'OpenStreetMap公開座標'},
  ],
  '久住山':[
    {id:'v14155-kuju-bogatsuru',type:'camp',name:'坊ガツル',lat:33.099667,lon:131.262833,elevation:1234,source:'気象庁・坊ガツル観測点位置情報'},
  ],
};
for(const [mountain,points] of Object.entries(V14155_MAJOR_WAYPOINTS)) appendFixedWaypoints(mountain,points);


// V1.4.156: 主要通過ポイント拡張 第2弾。
// 八ヶ岳・奥秩父・東北・中国・近畿を中心に、縦走時の判断地点になる小屋・峠を追加。
const V14156_MAJOR_WAYPOINTS = {
  '硫黄岳':[
    {id:'v14156-iou-natsusawa',type:'pass',name:'夏沢峠',lat:36.005833,lon:138.364722,elevation:2432,source:'山びこ荘・公開位置情報'},
    {id:'v14156-iou-honzawa',type:'hut',name:'本沢温泉',lat:36.011944,lon:138.370833,elevation:2093,source:'湯本本沢温泉・公開位置情報'},
  ],
  '天狗岳':[
    {id:'v14156-tengu-natsusawa',type:'pass',name:'夏沢峠',lat:36.005833,lon:138.364722,elevation:2432,source:'山びこ荘・公開位置情報'},
    {id:'v14156-tengu-honzawa',type:'hut',name:'本沢温泉',lat:36.011944,lon:138.370833,elevation:2093,source:'湯本本沢温泉・公開位置情報'},
    {id:'v14156-tengu-neishi-hut',type:'hut',name:'根石岳山荘',lat:36.014167,lon:138.358889,elevation:2533,source:'根石岳山荘・公開位置情報'},
  ],
  '和名倉山':[
    {id:'v14156-wanagura-shogen',type:'hut',name:'将監小屋',lat:35.856907,lon:138.863387,elevation:1740,source:'将監小屋・公開位置情報'},
  ],
  '甲武信ヶ岳':[
    {id:'v14156-kobushi-karisaka-hut',type:'hut',name:'雁坂小屋',lat:35.892370,lon:138.793860,elevation:1950,source:'OpenStreetMap公開位置情報'},
  ],
  '鳥海山':[
    {id:'v14156-chokai-ohama',type:'hut',name:'御浜小屋',lat:39.103889,lon:140.014722,elevation:1702,source:'御浜小屋・公開位置情報'},
  ],
  '岩手山':[
    {id:'v14156-iwate-fudodaira',type:'hut',name:'不動平避難小屋',lat:39.844722,lon:141.000000,elevation:1830,source:'岩手県・ヤマレコ公開位置情報'},
  ],
  '秋田駒ヶ岳':[
    {id:'v14156-akikoma-amida',type:'hut',name:'阿弥陀池避難小屋',lat:39.758056,lon:140.801944,elevation:1534,source:'環境省・公開位置情報'},
  ],
  '大山（鳥取）':[
    {id:'v14156-daisen-motodani',type:'hut',name:'元谷避難小屋',lat:35.380833,lon:133.540833,elevation:1038,source:'鳥取県・公開位置情報'},
    {id:'v14156-daisen-oyasumi',type:'hut',name:'大休峠避難小屋',lat:35.381944,lon:133.571389,elevation:1110,source:'鳥取県・公開位置情報'},
  ],
  '八経ヶ岳':[
    {id:'v14156-hakkyou-gyojagaeri',type:'hut',name:'行者還避難小屋',lat:34.202778,lon:135.945278,elevation:1416,source:'環境省・天川村公開位置情報'},
    {id:'v14156-hakkyou-yojigashuku',type:'hut',name:'楊枝ヶ宿避難小屋',lat:34.139870,lon:135.907755,elevation:1619,source:'大峯奥駈道公開GPS記録'},
  ],
  '剣山':[
    {id:'v14156-tsurugi-ichinomori',type:'hut',name:'一の森ヒュッテ',lat:33.852500,lon:134.110833,elevation:1862,source:'美馬市営一の森ヒュッテ・公開位置情報'},
  ],
};
for(const [mountain,points] of Object.entries(V14156_MAJOR_WAYPOINTS)) appendFixedWaypoints(mountain,points);


// V1.4.157: 主要通過ポイント拡張 第3弾。
// 北海道の長距離縦走と北アルプス常念山脈を中心に、避難小屋・分岐・中間ピークを座標固定。
const V14157_MAJOR_WAYPOINTS = {
  '大雪山（旭岳）':[
    {id:'v14157-asahidake-ishimuro',type:'hut',name:'旭岳石室',lat:43.660333,lon:142.832667,elevation:1676,source:'気象庁・旭岳石室観測点位置'},
  ],
  'トムラウシ山':[
    {id:'v14157-tomuraushi-hisago',type:'hut',name:'ヒサゴ沼避難小屋',lat:43.549722,lon:142.865000,elevation:1690,source:'大雪山国立公園・公開位置情報'},
    {id:'v14157-tomuraushi-sankawadai',type:'pass',name:'三川台分岐',lat:43.528611,lon:142.807222,elevation:1760,source:'大雪山野営指定地研究・公開座標'},
  ],
  '十勝岳':[
    {id:'v14157-tokachi-hinangoya',type:'hut',name:'十勝岳避難小屋',lat:43.433167,lon:142.667500,elevation:1321,source:'気象庁・十勝岳観測点位置'},
  ],
  '蝶ヶ岳':[
    {id:'v14157-chou-chouyari',type:'peak',name:'蝶槍',lat:36.300045,lon:137.722014,elevation:2660,source:'国土地理院地形図参照公開座標'},
    {id:'v14157-chou-sankakuten',type:'peak',name:'蝶ヶ岳三角点',lat:36.298333,lon:137.721704,elevation:2664,source:'国土地理院地形図参照公開座標'},
  ],
  '常念岳':[
    {id:'v1520-jonen-maejonen',type:'peak',name:'前常念岳',lat:36.32304,lon:137.73811,elevation:2662,source:'OpenStreetMap公開座標 / YAMAP標高2662m'},
    {id:'v14157-jonen-chouyari',type:'peak',name:'蝶槍',lat:36.300045,lon:137.722014,elevation:2660,source:'国土地理院地形図参照公開座標'},
  ],
};
for(const [mountain,points] of Object.entries(V14157_MAJOR_WAYPOINTS)) appendFixedWaypoints(mountain,points);

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
  // V1.5.40: 折立〜雲ノ平〜水晶・鷲羽・赤牛の実ルート通過点を同一回廊として解決。
  // 赤牛岳は旧MOUNTAIN_REGION未設定でも、この回廊を優先して返す。
  if(['水晶岳（黒岳）','鷲羽岳','赤牛岳'].includes(mountain))return mergeRegionalCatalogs('yakushi_kurobe','ushiroginza');
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

  // V1.5.52: 南アルプス北部は、実際に徒歩で連続する登山系統ごとに候補を分ける。
  // 戸台パークは北沢峠への交通拠点で登山CTの端点ではないため、ルート設計候補から外す。
  if(['甲斐駒ヶ岳','仙丈ヶ岳','アサヨ峰','鋸岳'].includes(mountain)){
    const keep=new Set(['北沢峠','長衛小屋','仙水小屋','甲斐駒ヶ岳','仙丈ヶ岳','仙丈小屋','馬の背ヒュッテ']);
    return (REGIONAL_CATALOG.southalps_north||[]).filter(p=>keep.has(p.name));
  }
  if(['鳳凰山','地蔵ヶ岳'].includes(mountain)){
    const keep=new Set(['夜叉神峠登山口','南御室小屋','鳳凰山']);
    return (REGIONAL_CATALOG.southalps_north||[]).filter(p=>keep.has(p.name));
  }

  // V1.4.16 剣山〜次郎笈〜白髪避難小屋〜三嶺を同一回廊として提示。
  if(['剣山','三嶺'].includes(mountain)){
    return mergeRegionalCatalogs('shikoku_tsurugi_miune');
  }

  // V1.4.17 燧ヶ岳〜見晴〜龍宮小屋〜山ノ鼻〜至仏山を同一回廊として提示。
  if(['燧ヶ岳','至仏山'].includes(mountain)){
    return mergeRegionalCatalogs('oze_hiuchi_shibutsu');
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
    {id:'fixed23-yatsu-akakosen',type:'hut',name:'赤岳鉱泉',lat:35.986780,lon:138.360250,elevation:2212,source:'固定候補'},
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
    {id:'fixed23-aka-kosen',type:'hut',name:'赤岳鉱泉',lat:35.986780,lon:138.360250,elevation:2212,source:'固定候補'},
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
    {id:'fixed23-iou-kosen',type:'hut',name:'赤岳鉱泉',lat:35.986780,lon:138.360250,elevation:2212,source:'固定候補'},
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
    {id:'fixed24-sumon-nibun',type:'trailhead',name:'二口登山口',lat:37.403806,lon:139.091944,elevation:586,source:'固定候補'}
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

// V1.4.23: くじゅう連山の主要4山頂追加 + 鳳凰三山の山頂名整理。
// 山頂座標は国土地理院「日本の主な山岳」掲載値を採用。
// 旧名称は MOUNTAIN_NAME_ALIAS で互換維持し、UIからは新名称のみ表示する。
Object.assign(MOUNTAIN_PRESETS, {
  '中岳(くじゅう)': {latitude:33.085833, longitude:131.248889},
  '三俣山': {latitude:33.103889, longitude:131.246389},
  '星生山': {latitude:33.090833, longitude:131.232500},
  '薬師岳(鳳凰)': {latitude:35.696111, longitude:138.311667},
  '観音岳(鳳凰)': {latitude:35.701667, longitude:138.304722},
  '地蔵岳(鳳凰)': {latitude:35.712222, longitude:138.298611}
});

const V1423_KUJU_PEAKS = [
  {id:'v1423-kuju-kuju',type:'peak',name:'久住山',lat:33.082187,lon:131.240871,elevation:1786,source:'固定候補'},
  {id:'v1423-kuju-naka',type:'peak',name:'中岳(くじゅう)',lat:33.085833,lon:131.248889,elevation:1791,source:'固定候補'},
  {id:'v1423-kuju-mimata',type:'peak',name:'三俣山',lat:33.103889,lon:131.246389,elevation:1744,source:'固定候補'},
  {id:'v1423-kuju-taisen',type:'peak',name:'大船山',lat:33.095000,lon:131.280556,elevation:1786,source:'固定候補'},
  {id:'v1423-kuju-hossho',type:'peak',name:'星生山',lat:33.090833,lon:131.232500,elevation:1762,source:'固定候補'}
];
const V1423_KUJU_ACCESS = [
  {id:'v1423-kuju-makinoto',type:'trailhead',name:'牧ノ戸峠',lat:33.096111,lon:131.207861,elevation:1330,source:'固定候補'},
  {id:'v1423-kuju-chojabaru',type:'trailhead',name:'長者原',lat:33.118694,lon:131.229583,elevation:1036,source:'固定候補'},
  // YAMAPランドマークで位置確認し、大分県公式の「久住分かれにある久住山避難小屋」と照合。
  {id:'v1423-kuju-wakare',type:'hut',name:'久住分かれ避難小屋',lat:33.086028,lon:131.238806,elevation:1638,source:'固定候補'},
  {id:'v1423-kuju-hokkein',type:'hut',name:'法華院温泉山荘',lat:33.096353,lon:131.255433,elevation:1303,source:'固定候補'}
];
for (const mountainName of ['久住山','大船山','中岳(くじゅう)','三俣山','星生山']) {
  const old=BUILTIN_ROUTE_CATALOG[mountainName]||[];
  const merged=[...V1423_KUJU_PEAKS,...V1423_KUJU_ACCESS,...old];
  const seen=new Set();
  BUILTIN_ROUTE_CATALOG[mountainName]=merged.filter(p=>{
    const k=`${p.type}:${p.name}`;
    if(seen.has(k))return false;
    seen.add(k); return true;
  });
}

const V1423_HOUOU_COMMON = [
  {id:'v1423-houou-yashajin',type:'trailhead',name:'夜叉神峠登山口',lat:35.635523,lon:138.345424,elevation:1400,source:'固定候補'},
  {id:'v1423-houou-minamiomuro',type:'hut',name:'南御室小屋',lat:35.684900,lon:138.309200,elevation:2420,source:'固定候補'},
  {id:'v1423-houou-yakushi',type:'peak',name:'薬師岳(鳳凰)',lat:35.696111,lon:138.311667,elevation:2780,source:'固定候補'},
  {id:'v1423-houou-kannon',type:'peak',name:'観音岳(鳳凰)',lat:35.701667,lon:138.304722,elevation:2841,source:'固定候補'},
  {id:'v1423-houou-jizo',type:'peak',name:'地蔵岳(鳳凰)',lat:35.712222,lon:138.298611,elevation:2764,source:'固定候補'}
];
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '薬師岳(鳳凰)': [...V1423_HOUOU_COMMON],
  '観音岳(鳳凰)': [
    // V1.5.36: 夜叉神峠登山口は公開登山口情報で位置を再確認。
    // 35.635523, 138.345424 / 約1400m（夜叉神峠登山口駐車場）。
    {id:'v1536-houou-kannon-th',type:'trailhead',name:'夜叉神峠登山口',lat:35.635523,lon:138.345424,elevation:1400,source:'公開登山口情報確認済み'},
    {id:'v1536-houou-kannon-hut',type:'hut',name:'南御室小屋',lat:35.684900,lon:138.309200,elevation:2420,source:'固定候補'},
    {id:'v1536-houou-kannon-yakushi',type:'peak',name:'薬師岳(鳳凰)',lat:35.696111,lon:138.311667,elevation:2780,source:'固定候補'},
    {id:'v1536-houou-kannon-peak',type:'peak',name:'観音岳(鳳凰)',lat:35.701667,lon:138.304722,elevation:2841,source:'国土地理院 日本の主な山岳'},
    {id:'v1536-houou-kannon-jizo',type:'peak',name:'地蔵岳(鳳凰)',lat:35.712222,lon:138.298611,elevation:2764,source:'固定候補'}
  ],
  '地蔵岳(鳳凰)': [
    {id:'v1423-houou-jizo-th',type:'trailhead',name:'夜叉神峠登山口',lat:35.635523,lon:138.345424,elevation:1400,source:'固定候補'},
    {id:'v1423-houou-jizo-hut',type:'hut',name:'南御室小屋',lat:35.684900,lon:138.309200,elevation:2420,source:'固定候補'},
    {id:'v1423-houou-jizo-yakushi',type:'peak',name:'薬師岳(鳳凰)',lat:35.696111,lon:138.311667,elevation:2780,source:'固定候補'},
    {id:'v1423-houou-jizo-kannon',type:'peak',name:'観音岳(鳳凰)',lat:35.701667,lon:138.304722,elevation:2841,source:'固定候補'},
    {id:'v1423-houou-jizo-peak',type:'peak',name:'地蔵岳(鳳凰)',lat:35.712222,lon:138.298611,elevation:2764,source:'固定候補'}
  ]
});
// 旧キーは過去保存ルート復元用に残すが、新規UIでは非表示。
BUILTIN_ROUTE_CATALOG['鳳凰山']=BUILTIN_ROUTE_CATALOG['薬師岳(鳳凰)'];
BUILTIN_ROUTE_CATALOG['地蔵ヶ岳']=BUILTIN_ROUTE_CATALOG['地蔵岳(鳳凰)'];

// V1.5.1: 日本百名山の代表峰を実峰へ整理.
// 座標は国土地理院「日本の主な山岳」に基づく固定値。旧代表峰は追加ピークとして残す。
Object.assign(MOUNTAIN_PRESETS, {
  '茶臼岳（那須岳）': {latitude:37.124722, longitude:139.963056},
  '丹沢山': {latitude:35.474167, longitude:139.162778}
});
Object.assign(CURATED_ACCESS_HINTS, {
  '茶臼岳（那須岳）': {trailheads:['峠の茶屋・那須岳登山口']},
  '丹沢山': {trailheads:['大倉登山口','戸沢出合']}
});
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '茶臼岳（那須岳）': [
    {id:'v151-nasu-chause-toge',type:'trailhead',name:'峠の茶屋・那須岳登山口',lat:37.125389,lon:139.979722,elevation:1462,source:'固定候補'},
    {id:'v151-nasu-chause-rwside',type:'trailhead',name:'那須ロープウェイ・峠の茶屋側',lat:37.125389,lon:139.979722,elevation:1386,source:'既存固定候補と同一座標'},
    {id:'v151-nasu-chause-peak',type:'peak',name:'茶臼岳（那須岳）',lat:37.124722,lon:139.963056,elevation:1915,source:'国土地理院「日本の主な山岳」'}
  ],
  '丹沢山': [
    {id:'v151-tanzawa-okura',type:'trailhead',name:'大倉登山口',lat:35.404065,lon:139.168805,elevation:290,source:'固定候補'},
    {id:'v151-tanzawa-tosawa',type:'trailhead',name:'戸沢出合',lat:35.435478,lon:139.173273,elevation:570,source:'固定候補'},
    {id:'v151-tanzawa-tonodake',type:'peak',name:'塔ノ岳',lat:35.454167,lon:139.163333,elevation:1491,source:'固定候補'},
    {id:'v151-tanzawa-peak',type:'peak',name:'丹沢山',lat:35.474167,lon:139.162778,elevation:1567,source:'国土地理院「日本の主な山岳」'}
  ]
});

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
  '薬師岳(鳳凰)':'southern_alps','観音岳(鳳凰)':'southern_alps','地蔵岳(鳳凰)':'southern_alps','茶臼岳（那須岳）':'kanto_joshinetsu','三本槍岳':'kanto_joshinetsu','丹沢山':'okuchichibu_fuji','塔ノ岳':'okuchichibu_fuji','御嶽山':'central_alps_ontake','宮之浦岳':'kyushu','大山':'chugoku',
  '中岳(くじゅう)':'kyushu','三俣山':'kyushu','星生山':'kyushu'
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

// V1.4.250: mountain list boxes are ordered geographically north -> south within each existing UI area.
// Only already-fixed coordinates are used; no coordinate is inferred for sorting.
function mountainNorthSouthLatitude(name){
  const catalog=BUILTIN_ROUTE_CATALOG[name]||[];
  const targetKey=canonicalCourseTimeEndpointName(normalizeCourseTimePointName(name));
  const peak=catalog.find(x=>x.type==='peak'&&hasResolvedCoord(x)&&canonicalCourseTimeEndpointName(normalizeCourseTimePointName(x.name))===targetKey)
    ||catalog.find(x=>x.type==='peak'&&hasResolvedCoord(x));
  const override=NATIONAL_MOUNTAIN_COORD_OVERRIDES[name];
  const presetName=NATIONAL_MOUNTAIN_PRESET_ALIASES[name]||name;
  const preset=MOUNTAIN_PRESETS[presetName];
  const lat=Number(peak?.lat??peak?.latitude??override?.lat??preset?.latitude??preset?.lat);
  return Number.isFinite(lat)?lat:null;
}
function sortMountainsNorthToSouth(names){
  return [...names].map((name,index)=>({name,index,lat:mountainNorthSouthLatitude(name)})).sort((a,b)=>{
    if(a.lat!==null&&b.lat!==null&&a.lat!==b.lat)return b.lat-a.lat;
    if(a.lat!==null&&b.lat===null)return -1;
    if(a.lat===null&&b.lat!==null)return 1;
    return a.index-b.index;
  }).map(x=>x.name);
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

function currentMountainLabel(){return $('mountainPreset')?.value?.trim()||$('mountainSearch')?.value?.trim()||'';}

// V1.5.38: external mountain-weather cross-check links. Resolution happens
// after results are visible, so these network lookups never block progressive rendering.
const externalWeatherLinkConfig={
  tenkura:{linkId:'tenkuraLink',statusId:'tenkuraLinkStatus',endpoint:'/api/tenkura-link',includeArea:true},
  weathernews:{linkId:'weathernewsLink',statusId:'weathernewsLinkStatus',endpoint:'/api/weathernews-link'},
  tenkijp:{linkId:'tenkijpLink',statusId:'tenkijpLinkStatus',endpoint:'/api/tenkijp-link'}
};
const externalWeatherLinkMemory=new Map();
const externalWeatherLinkTokens={tenkura:0,weathernews:0,tenkijp:0};
const externalWeatherLinkPending={tenkura:'',weathernews:'',tenkijp:''};
function setExternalWeatherLinkState(service,state,data={}){
  const cfg=externalWeatherLinkConfig[service];if(!cfg)return;
  const link=$(cfg.linkId),status=$(cfg.statusId);if(!link||!status)return;
  link.classList.toggle('is-loading',state==='loading');
  link.classList.toggle('is-unavailable',state==='unavailable');
  link.classList.toggle('is-ready',state==='ready');
  if(state==='ready'&&data.url){
    link.href=data.url;link.setAttribute('aria-disabled','false');
    status.textContent=`${data.name||currentMountainLabel()}のページを開く`;
  }else{
    link.removeAttribute('href');link.setAttribute('aria-disabled','true');
    status.textContent=state==='loading'?'選択した山を確認中…':'対応ページを確認できませんでした';
  }
}
async function updateExternalWeatherLink(service){
  const cfg=externalWeatherLinkConfig[service],mountain=currentMountainLabel();
  if(!cfg||!mountain){setExternalWeatherLinkState(service,'unavailable');return;}
  const area=cfg.includeArea?mountainUiArea(mountain):'';
  const key=`${service}|${mountain}|${area}`;
  const cached=externalWeatherLinkMemory.get(key);
  if(cached){setExternalWeatherLinkState(service,cached.available?'ready':'unavailable',cached.result||{});return;}
  if(externalWeatherLinkPending[service]===key)return;
  externalWeatherLinkPending[service]=key;
  const token=++externalWeatherLinkTokens[service];
  setExternalWeatherLinkState(service,'loading');
  try{
    const params=new URLSearchParams({mountain});if(cfg.includeArea)params.set('area',area);
    const res=await fetch(`${cfg.endpoint}?${params}`,{cache:'force-cache'});
    const data=await res.json().catch(()=>null);
    if(token!==externalWeatherLinkTokens[service])return;
    const normalized={available:!!(res.ok&&data?.available&&data?.result?.url),result:data?.result||null};
    externalWeatherLinkMemory.set(key,normalized);externalWeatherLinkPending[service]='';
    setExternalWeatherLinkState(service,normalized.available?'ready':'unavailable',normalized.result||{});
  }catch(_){
    if(token!==externalWeatherLinkTokens[service])return;
    externalWeatherLinkPending[service]='';setExternalWeatherLinkState(service,'unavailable');
  }
}
function updateExternalWeatherLinks(){
  Object.keys(externalWeatherLinkConfig).forEach(service=>{void updateExternalWeatherLink(service);});
}
function updateTenkuraLink(){return updateExternalWeatherLink('tenkura');}
// V1.5.8: anonymous analysis history for the admin dashboard.
// Store only route point names/types/roles and planned passage date/time; never coordinates or identity data.
function analysisCtReviewSegments(points){
  const rows=[];
  const safePoints=(Array.isArray(points)?points:[]).slice(0,40);
  for(let i=1;i<safePoints.length;i++){
    const from=safePoints[i-1],to=safePoints[i];
    const fromName=String(from?.name||'').trim(),toName=String(to?.name||'').trim();
    if(!fromName||!toName)continue;
    let info=null;
    try{info=courseTimeInfo(from,to);}catch(_){info=null;}
    const estimated=!!(info&&(info.estimated===true||info.sourceType==='estimated'));
    if(info&&!estimated)continue;
    rows.push({
      from_name:fromName.slice(0,120),
      to_name:toName.slice(0,120),
      status:estimated?'estimated':'missing',
      minutes:estimated&&Number.isFinite(Number(info?.minutes))?Math.round(Number(info.minutes)):null,
      source:estimated?String(info?.source||'推定CT').slice(0,180):'CT情報なし'
    });
  }
  return rows.slice(0,39);
}
function analysisRouteLogMetadata(points,mountain=''){
  const safePoints=(Array.isArray(points)?points:[]).slice(0,40);
  const itinerary=safePoints.map(p=>({
    point_name:String(p?.name||'').slice(0,120),
    point_type:String(p?.type||'other').slice(0,40),
    point_role:String(p?.role||'').slice(0,40),
    date:String(p?.date||'').slice(0,10),
    time:String(p?.time||'').slice(0,5),
    stay:!!p?.stay,
  })).filter(p=>p.point_name);
  const routePath=itinerary.map(p=>p.point_name).join(' → ');
  let routeLabel='';
  try{
    const course=representativeCourseFor(mountain);
    const officialPath=representativeCoursePathText(course,mountain);
    if(course&&officialPath===routePath)routeLabel=course.label||'代表コース';
  }catch(_){ }
  if(!routeLabel&&itinerary.length){
    routeLabel=itinerary.length===1?itinerary[0].point_name:`${itinerary[0].point_name} → ${itinerary.at(-1).point_name}`;
  }
  const dates=itinerary.map(p=>p.date).filter(Boolean);
  return {
    route_label:routeLabel,
    route_path:routePath,
    start_date:dates[0]||'',
    end_date:dates.at(-1)||dates[0]||'',
    overnight_count:itinerary.filter(p=>p.stay).length,
    itinerary,
    ct_review_segments:analysisCtReviewSegments(safePoints),
  };
}
function refreshMountainInfoButton(){
  const btn=$('mountainInfoBtn');if(!btn)return;
  const selectValue=$('mountainPreset')?.value?.trim()||'';
  const searchValue=$('mountainSearch')?.value?.trim()||'';
  btn.disabled=!(selectValue||searchValue);
}

async function openMountainInfoFromPlanner(){
  const name=currentMountainLabel();
  if(!name)return;
  const p=nationalMountainPoint(name);
  if(!p){setStatus(`${name} の全国分析用山頂情報が見つかりません。`,true);return;}
  await Promise.allSettled([ensureAccessResources(),ensureCameraResources()]);
  const result=nationalOutlookResults.get(name)||null;
  showNationalOutlookDetail(p,result);
  if(nationalOutlookMap){
    nationalOutlookMap.panTo([p.lat,p.lon],{animate:true});
  }
  const section=$('nationalOutlook');
  if(section)requestAnimationFrame(()=>section.scrollIntoView({behavior:'smooth',block:'start'}));
}
function logMountainSelected(source='select'){
  const mountain=currentMountainLabel();
  if(!mountain)return;
  logEvent('mountain_selected',{success:true,mountain,metadata:{source}});
}
function logPointSelected(row,p){
  if(!p)return;
  logEvent('point_selected',{success:true,mountain:currentMountainLabel(),metadata:{
    point_name:p.name||'',point_type:p.type||row?.querySelector('.point-type')?.value||'other',
    point_role:row?.dataset?.role||'',source:p.source||''
  }});
}

let nationalOutlookMap=null;
let nationalOutlookLayer=null;
let nationalOutlookDateControl=null;
let nationalOutlookResults=new Map();

// V1.4.77: 全国マップ用の山頂座標補完。国土地理院「日本の主な山岳」を基準。
const NATIONAL_MOUNTAIN_COORD_OVERRIDES = Object.freeze({
  '金時山':{lat:35.289722,lon:139.005000,elevation:1212},
  '箱根山':{lat:35.233333,lon:139.020833,elevation:1438},
  '天城山（万三郎岳）':{lat:34.862778,lon:139.001667,elevation:1406},
  '愛鷹山（越前岳）':{lat:35.238056,lon:138.793889,elevation:1504},
  '毛無山':{lat:35.415833,lon:138.543889,elevation:1964},
  '櫛形山':{lat:35.586667,lon:138.369167,elevation:2052},
  '三ッ峠山':{lat:35.549167,lon:138.809167,elevation:1785}
});
const NATIONAL_MOUNTAIN_PRESET_ALIASES = Object.freeze({'御嶽':'御嶽山','大山（鳥取）':'大山'});

function commonsMountainPhotoUrl(fileName,width=1600){
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=${width}`;
}
const NATIONAL_MOUNTAIN_PHOTOS = Object.freeze({
  '富士山':{url:commonsMountainPhotoUrl('Mount Fuji from Lake Motosu.jpg'),credit:'写真: Alpsdake / Wikimedia Commons (CC BY-SA 4.0)',note:'本栖湖から望む富士山',sourceUrl:'https://commons.wikimedia.org/wiki/File:Mount_Fuji_from_Lake_Motosu.jpg'},
  '槍ヶ岳':{url:commonsMountainPhotoUrl('Mt.Yarigatake.jpg'),credit:'写真: Captain76 / Wikimedia Commons (CC BY-SA 3.0)',note:'槍ヶ岳山荘付近から望む槍ヶ岳',sourceUrl:'https://commons.wikimedia.org/wiki/File:Mt.Yarigatake.jpg'},
  '奥穂高岳':{url:commonsMountainPhotoUrl('Mt.Okuhotakadake 03.jpg'),credit:'写真: Σ64 / Wikimedia Commons (CC BY 3.0)',note:'北アルプス・奥穂高岳',sourceUrl:'https://commons.wikimedia.org/wiki/File:Mt.Okuhotakadake_03.jpg'},
  '剱岳':{url:commonsMountainPhotoUrl('Tsurugidake 20100127.jpg'),credit:'写真: Hanoitaxi / Wikimedia Commons (Public Domain)',note:'西北西から望む剱岳',sourceUrl:'https://commons.wikimedia.org/wiki/File:Tsurugidake_20100127.jpg'},
  '立山':{url:commonsMountainPhotoUrl('Mt Tateyama01s4592.jpg'),credit:'写真: 663highland / Wikimedia Commons',note:'室堂から望む立山',sourceUrl:'https://commons.wikimedia.org/wiki/File:Mt_Tateyama01s4592.jpg'},
  '白馬岳':{url:commonsMountainPhotoUrl('Mount Shirouma (2000-10-07).jpg'),credit:'写真: Alpsdake / Wikimedia Commons (CC BY-SA 4.0)',note:'丸山から望む秋の白馬岳',sourceUrl:'https://commons.wikimedia.org/wiki/File:Mount_Shirouma_(2000-10-07).jpg'},
  '石鎚山':{url:commonsMountainPhotoUrl('石鎚スカイラインからの石鎚山.jpg'),credit:'写真: Koda6029 / Wikimedia Commons',note:'石鎚スカイラインから望む石鎚山',sourceUrl:'https://commons.wikimedia.org/wiki/File:石鎚スカイラインからの石鎚山.jpg'},
  '大山':{url:commonsMountainPhotoUrl('Mt Daisen Full View.jpg'),credit:'写真: Vickerman625 / Wikimedia Commons (Public Domain)',note:'西から望む大山',sourceUrl:'https://commons.wikimedia.org/wiki/File:Mt_Daisen_Full_View.jpg'},
  '吾妻山':{url:commonsMountainPhotoUrl('吾妻山からの比婆山と立烏帽子山.jpg'),credit:'写真: Koda6029 / Wikimedia Commons',note:'中国地方・吾妻山山頂から比婆山方面を望む',sourceUrl:'https://commons.wikimedia.org/wiki/File:吾妻山からの比婆山と立烏帽子山.jpg'}
});
function nationalMountainPhoto(name){return NATIONAL_MOUNTAIN_PHOTOS[name]||null;}
const NATIONAL_PHOTO_WIKI_ALIASES = Object.freeze({
  '大雪山（旭岳）':'大雪山','雄阿寒岳':'雄阿寒岳','蔵王山（熊野岳）':'蔵王連峰','赤城山（黒檜山）':'赤城山',
  '奥白根山':'日光白根山','八ヶ岳（赤岳）':'赤岳 (八ヶ岳山系)','霧ヶ峰（車山）':'霧ヶ峰','水晶岳（黒岳）':'水晶岳',
  '御嶽':'御嶽山','大菩薩嶺':'大菩薩嶺','天城山（万三郎岳）':'天城山','愛鷹山（越前岳）':'愛鷹山',
  '地蔵岳(鳳凰)':'鳳凰山','大山（神奈川）':'大山 (神奈川県)','大山（鳥取）':'大山 (鳥取県)',
  '日出ヶ岳':'大台ヶ原山','八経ヶ岳':'八経ヶ岳','阿蘇山（高岳）':'阿蘇山','霧島山（韓国岳）':'韓国岳',
  '雲仙岳（普賢岳）':'雲仙岳','宮ノ浦岳':'宮之浦岳','桜島（御岳）':'桜島','赤城山（黒檜山）':'赤城山'
});
const nationalMountainPhotoCache=new Map();
function wikiMountainCandidates(name){
  const out=[];
  const alias=NATIONAL_PHOTO_WIKI_ALIASES[name];
  if(alias)out.push(alias);
  out.push(name);
  const stripped=name.replace(/[（(][^）)]*[）)]/g,'').trim();
  if(stripped&&stripped!==name)out.push(stripped);
  return [...new Set(out)];
}
function cleanWikiCreditHtml(value=''){
  const d=document.createElement('div');d.innerHTML=value;
  return (d.textContent||'').replace(/\s+/g,' ').trim();
}
async function fetchWikiMountainPhoto(name){
  if(NATIONAL_MOUNTAIN_PHOTOS[name])return NATIONAL_MOUNTAIN_PHOTOS[name];
  if(nationalMountainPhotoCache.has(name))return nationalMountainPhotoCache.get(name);
  const promise=(async()=>{
    for(const title of wikiMountainCandidates(name)){
      try{
        const q=new URLSearchParams({origin:'*',action:'query',format:'json',redirects:'1',prop:'pageimages',piprop:'thumbnail|name',pithumbsize:'1600',titles:title});
        const res=await fetch(`https://ja.wikipedia.org/w/api.php?${q.toString()}`,{mode:'cors'});
        if(!res.ok)continue;
        const data=await res.json();
        const page=Object.values(data?.query?.pages||{})[0];
        const thumb=page?.thumbnail?.source, file=page?.pageimage;
        if(!thumb||!file)continue;
        let credit='写真: Wikipedia / Wikimedia Commons';
        let sourceUrl=`https://ja.wikipedia.org/wiki/${encodeURIComponent(page.title||title)}`;
        try{
          const iq=new URLSearchParams({origin:'*',action:'query',format:'json',prop:'imageinfo',iiprop:'url|extmetadata',titles:`File:${file}`});
          const ir=await fetch(`https://ja.wikipedia.org/w/api.php?${iq.toString()}`,{mode:'cors'});
          const idata=await ir.json();
          const ipage=Object.values(idata?.query?.pages||{})[0];
          const info=ipage?.imageinfo?.[0];
          const artist=cleanWikiCreditHtml(info?.extmetadata?.Artist?.value||'');
          const license=cleanWikiCreditHtml(info?.extmetadata?.LicenseShortName?.value||'');
          if(artist||license)credit=`写真: ${artist||'Wikimedia contributor'}${license?` / ${license}`:''}`;
          if(info?.descriptionurl)sourceUrl=info.descriptionurl;
        }catch(_){ }
        return {url:thumb,credit,note:`Wikipedia「${page.title||title}」の代表画像`,sourceUrl,dynamic:true};
      }catch(_){ }
    }
    return null;
  })();
  nationalMountainPhotoCache.set(name,promise);
  return promise;
}
function applyNationalHeroPhoto(box,p,photo){
  if(!box||!photo)return;
  const hero=box.querySelector('.national-rich-hero');if(!hero)return;
  hero.classList.add('has-photo');
  hero.style.backgroundImage=`linear-gradient(180deg,rgba(12,61,43,.08),rgba(8,48,35,.82)),url("${String(photo.url).replace(/"/g,'%22')}")`;
  const copy=hero.querySelector('.national-rich-hero-copy');
  let credit=hero.querySelector('.national-rich-photo-credit');
  if(!credit){credit=document.createElement(photo.sourceUrl?'a':'div');credit.className='national-rich-photo-credit';hero.appendChild(credit);}
  if(photo.sourceUrl){credit.href=photo.sourceUrl;credit.target='_blank';credit.rel='noopener noreferrer';credit.title='写真の出典・ライセンスを確認';}
  credit.textContent=photo.credit||'写真: Wikipedia / Wikimedia Commons';
  if(photo.note){const small=document.createElement('small');small.textContent=photo.note;credit.appendChild(small);}
}
// 補完座標を固定山頂候補にも加え、代表コース生成と山行設定の双方で利用する。
for(const [mountain,p] of Object.entries(NATIONAL_MOUNTAIN_COORD_OVERRIDES)){
  const catalog=BUILTIN_ROUTE_CATALOG[mountain]||(BUILTIN_ROUTE_CATALOG[mountain]=[]);
  if(!catalog.some(x=>x.type==='peak'&&hasResolvedCoord(x))){
    catalog.unshift({id:`national-peak-${mountain}`,type:'peak',name:mountain,lat:p.lat,lon:p.lon,elevation:p.elevation,source:'国土地理院固定山頂'});
  }
}

function nationalMountainPoint(name){
  // V1.4.77: 全国マップは MOUNTAIN_PRESETS だけに依存しない。
  // 日本三百名山で固定済みの山頂座標を優先し、北海道・東北などの取りこぼしを防ぐ。
  const catalog=BUILTIN_ROUTE_CATALOG[name]||[];
  const targetKey=canonicalCourseTimeEndpointName(normalizeCourseTimePointName(name));
  const peak=catalog.find(x=>x.type==='peak'&&hasResolvedCoord(x)&&canonicalCourseTimeEndpointName(normalizeCourseTimePointName(x.name))===targetKey)
    ||catalog.find(x=>x.type==='peak'&&hasResolvedCoord(x));
  const override=NATIONAL_MOUNTAIN_COORD_OVERRIDES[name];
  const presetName=NATIONAL_MOUNTAIN_PRESET_ALIASES[name]||name;
  const preset=MOUNTAIN_PRESETS[presetName];
  const lat=Number(peak?.lat??peak?.latitude??override?.lat??preset?.latitude??preset?.lat);
  const lon=Number(peak?.lon??peak?.longitude??override?.lon??preset?.longitude??preset?.lon);
  if(!Number.isFinite(lat)||!Number.isFinite(lon))return null;
  const elevation=Number(peak?.elevation??override?.elevation);
  // V1.5.71: 全国分析の対象可否を代表コース有無から切り離す。
  // 全国簡易判定に必要なのは山頂座標だけ。火山規制等で代表コースを非表示にしている山も気象判定対象とする。
  return {name,lat,lon,elevation:Number.isFinite(elevation)?elevation:null,eligible:true,hasRepresentativeCourse:representativeCourseOptions(name).length>0};
}
function nationalOutlookPoints(){return JAPAN_300_MOUNTAINS.map(nationalMountainPoint).filter(Boolean);}
function nationalOutlookSelectedHonors(){
  const selected=new Set();
  if($('nationalFilter100')?.checked)selected.add('100');
  if($('nationalFilter200')?.checked)selected.add('200');
  if($('nationalFilter300')?.checked)selected.add('300');
  return selected;
}
function nationalOutlookVisiblePoints(){
  const selected=nationalOutlookSelectedHonors();
  if(!selected.size)return [];
  return nationalOutlookPoints().filter(p=>selected.has(nationalMountainHonor(p.name).tone));
}
function nationalOutlookDateLabel(value){
  const m=String(value||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(!m)return '';
  return `${Number(m[2])}/${Number(m[3])}`;
}
function updateNationalOutlookMapDate(){
  const label=nationalOutlookDateLabel($('nationalOutlookDate')?.value);
  document.querySelectorAll('.national-map-date-label').forEach(el=>{el.textContent=label||'--/--';});
  const legacy=document.querySelector('.national-map-date-badge');
  if(legacy&&!legacy.querySelector('.national-map-date-label'))legacy.textContent=label||'--/--';
  updateNationalOutlookDateNavState();
}
function shiftNationalOutlookDate(days){
  const date=$('nationalOutlookDate');if(!date)return;
  const current=String(date.value||'');if(!/^\d{4}-\d{2}-\d{2}$/.test(current))return;
  const t=new Date(`${current}T00:00:00+09:00`).getTime();
  if(!Number.isFinite(t))return;
  const next=formatJstInput(t+Number(days||0)*86400000).date;
  if(date.min&&next<date.min)return;
  if(date.max&&next>date.max)return;
  date.value=next;
  date.dispatchEvent(new Event('change',{bubbles:true}));
}
function updateNationalOutlookDateNavState(){
  const date=$('nationalOutlookDate');if(!date)return;
  document.querySelectorAll('[data-national-date-shift]').forEach(btn=>{
    const days=Number(btn.dataset.nationalDateShift||0);
    const current=String(date.value||'');
    const t=/^\d{4}-\d{2}-\d{2}$/.test(current)?new Date(`${current}T00:00:00+09:00`).getTime():NaN;
    const next=Number.isFinite(t)?formatJstInput(t+days*86400000).date:'';
    btn.disabled=!next||(date.min&&next<date.min)||(date.max&&next>date.max);
  });
}

function nationalOutlookSelectedLabel(){
  const selected=nationalOutlookSelectedHonors();
  const labels=[];
  if(selected.has('100'))labels.push('百名山');
  if(selected.has('200'))labels.push('二百名山');
  if(selected.has('300'))labels.push('三百名山');
  return labels.join('・')||'選択なし';
}
function nationalMarkerIcon(grade='?'){
  const g=['A','B','C'].includes(grade)?grade:'?';
  return L.divIcon({className:'national-marker-wrap',html:`<div class="national-marker grade-${g==='?'?'u':g.toLowerCase()}">${g}</div>`,iconSize:[26,26],iconAnchor:[13,13]});
}
function renderNationalOutlookMarkers(){
  if(!nationalOutlookMap||!window.L)return;
  if(nationalOutlookLayer)nationalOutlookLayer.remove();
  nationalOutlookLayer=L.layerGroup().addTo(nationalOutlookMap);
  for(const p of nationalOutlookVisiblePoints()){
    const result=nationalOutlookResults.get(p.name);
    const grade=result?.grade||'?';
    const marker=L.marker([p.lat,p.lon],{icon:nationalMarkerIcon(grade),title:`${p.name} ${grade}`}).addTo(nationalOutlookLayer);
    marker.on('click',()=>showNationalOutlookDetail(p,result));
  }
}
const WIKIPEDIA_ARTICLE_ALIASES = Object.freeze({
  '蔵王山（熊野岳）':'熊野岳',
  '赤城山（黒檜山）':'黒檜山',
  '霧ヶ峰（車山）':'車山',
  '大山（神奈川）':'大山_(神奈川県)',
  '大山':'大山_(鳥取県)',
  '経ヶ岳（長野）':'経ヶ岳_(長野県)',
  '経ヶ岳（福井）':'経ヶ岳_(福井県)',
  '薬師岳(鳳凰)':'薬師岳_(鳳凰山)',
  '観音岳(鳳凰)':'観音岳_(鳳凰山)',
  '地蔵岳(鳳凰)':'地蔵岳_(鳳凰山)',
  '鳳凰山':'鳳凰山',
  '九重山':'九重山',
  '久住山':'久住山',
  '立山':'立山',
  '八ヶ岳':'八ヶ岳',
  '穂高岳':'穂高岳',
  '奥穂高岳':'奥穂高岳',
  '剱岳':'剱岳'
});
function wikipediaArticleTitle(name){
  const raw=String(name||'').trim();
  return WIKIPEDIA_ARTICLE_ALIASES[raw]||raw.replace(/\(([^)]+)\)/g,'_$1').replace(/（([^）]+)）/g,'_$1');
}
function wikipediaArticleUrl(name){
  return `https://ja.wikipedia.org/wiki/${encodeURIComponent(wikipediaArticleTitle(name)).replace(/%2F/g,'/')}`;
}

function nationalAreaLabel(name){
  const key=mountainUiArea(name);
  return MOUNTAIN_UI_AREAS.find(([k])=>k===key)?.[1]||'日本';
}
function nationalGradeLabel(grade){
  return grade==='A'?'適性高め':grade==='B'?'注意あり':grade==='C'?'厳しい':'未判定';
}
function nationalOutlookConfidence(result){
  if(!result)return {label:'未判定',tone:'u',note:'全国判定後に表示'};
  const raw=$('nationalOutlookDate')?.value;
  let days=0;
  if(raw){
    const a=new Date(`${raw}T00:00:00+09:00`).getTime();
    const b=new Date();
    days=Math.max(0,Math.round((a-b.getTime())/86400000));
  }
  const agreement=String(result.modelAgreement||'');
  if(result.source==='metno+gfs'){
    if(days>=8)return {label:'低',tone:'l',note:'先の日付のため変化に注意'};
    if(agreement==='high')return {label:'高',tone:'h',note:'MET Norway / GFS のABCが一致'};
    if(agreement==='low')return {label:'低',tone:'l',note:'MET Norway / GFS の判定差が大きい'};
    return {label:'中',tone:'m',note:'MET Norway / GFS の判定に差あり'};
  }
  return {label:'中',tone:'m',note:'1モデルのみ取得'};
}
function nationalRepresentativeSummary(name){
  const course=representativeCourseOptions(name)[0]||null;
  if(!course)return null;
  return {label:course.label||'代表コース',points:(course.points||[]).map(([,pointName,pointLabel])=>({name:pointName,label:pointLabel||''}))};
}
// V1.4.162: 山紹介ページの基本情報を、既存の固定候補・代表コース・CTから自動生成。
function nationalMountainGuideInfo(name){
  const key=canonicalMountainName(name);
  const options=representativeCourseOptions(key);
  const primary=options[0]||null;
  const expanded=primary?representativeCourseExpandedPointDefs(key,primary):(BUILTIN_ROUTE_CATALOG[key]||[]).map(p=>[p.type,p.name,TYPE_LABEL[p.type]||'']);
  const trailhead=expanded.find(([type])=>type==='trailhead')?.[1]
    ||(BUILTIN_ROUTE_CATALOG[key]||[]).find(p=>p.type==='trailhead')?.name||'';
  const huts=[];
  for(const course of options){
    for(const [type,pointName] of representativeCourseExpandedPointDefs(key,course)){
      if(type==='hut'&&pointName&&!huts.includes(pointName))huts.push(pointName);
    }
  }
  if(!huts.length){
    for(const p of BUILTIN_ROUTE_CATALOG[key]||[]){
      if(p.type==='hut'&&p.name&&!huts.includes(p.name))huts.push(p.name);
    }
  }
  let ctLabel='情報なし',ctNote='代表コースのCT未登録';
  // V1.4.201: コース追加で先頭候補が固定地点解決できない場合でも、
  // その山に有効な代表コースがあれば全国判定の標準CTを失わないようにする。
  for(const course of options){
    const route=buildRepresentativeResolvedRoute(key,course);
    if(!route||route.error||!Array.isArray(route.segments)||!route.segments.length)continue;
    const missing=route.segments.some(seg=>seg?.missing);
    const total=route.segments.filter(seg=>!seg?.missing).reduce((sum,seg)=>sum+Math.max(0,Number(seg?.minutes)||0),0);
    if(!missing&&total>0){ctLabel=formatCourseTimeMinutes(total);ctNote=`${course.label||'代表コース'}・登り目安`;break;}
    if(total>0&&ctLabel==='情報なし'){ctLabel=`${formatCourseTimeMinutes(total)}+`;ctNote='確認済みCT合計（一部未登録）';}
    else if(missing&&ctLabel==='情報なし'){ctLabel='一部未登録';ctNote='代表コースにCT情報なし区間あり';}
  }
  return {
    trailhead:trailhead||'情報なし',
    ctLabel,ctNote,
    huts:huts.slice(0,3),
    hutCount:huts.length,
    routeCount:options.length
  };
}
function nationalMountainGuideHtml(name,area,elevation){
  const info=nationalMountainGuideInfo(name);
  const huts=info.huts.length?info.huts.map(h=>{const url=hutOfficialSite(h);return url?`<span class="national-guide-hut"><b>${esc(h)}</b><a href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(h)}の公式ホームページを開く">公式HP ↗</a></span>`:`<span class="national-guide-hut"><b>${esc(h)}</b></span>`;}).join(''):'<strong>情報なし</strong>';
  const hutSub=info.hutCount>3?`ほか${info.hutCount-3}件`:'';
  const hasTrailhead=Boolean(info.trailhead&&info.trailhead!=='情報なし');
  const hasAccess=hasTrailhead&&Boolean(window.TratenTrailheadAccess?.has?.(info.trailhead));
  const accessButton=hasTrailhead?`<button type="button" class="national-trailhead-access-btn${hasAccess?'':' is-unavailable'}" data-national-trailhead-access="${esc(info.trailhead)}"${hasAccess?'':` disabled aria-disabled="true" title="${esc(info.trailhead)}のアクセス情報は現在未登録です"`}>${hasAccess?'アクセス':'アクセス情報なし'}</button>`:'';
  return `<section class="national-guide-grid" aria-label="山の基本情報">
    <div class="national-guide-item"><span>標高</span><strong>${esc(elevation)}</strong></div>
    <div class="national-guide-item"><span>山域</span><strong>${esc(area)}</strong></div>
    <div class="national-guide-item wide national-guide-trailhead"><span>代表登山口</span><div class="national-guide-trailhead-row"><strong>${esc(info.trailhead)}</strong>${accessButton}</div></div>
    <div class="national-guide-item"><span>標準CT</span><strong>${esc(info.ctLabel)}</strong><small>${esc(info.ctNote)}</small></div>
    <div class="national-guide-item"><span>代表コース数</span><strong>${info.routeCount?`${info.routeCount}コース`:'情報なし'}</strong></div>
    <div class="national-guide-item wide"><span>主な山小屋</span><div class="national-guide-huts">${huts}</div>${hutSub?`<small>${esc(hutSub)}</small>`:''}</div>
  </section>`;
}
function nationalNearbyMountains(p,limit=5){
  return nationalOutlookPoints().filter(x=>x.name!==p.name).map(x=>({
    ...x,
    distance:haversineMeters(p.lat,p.lon,x.lat,x.lon)/1000,
    result:nationalOutlookResults.get(x.name)||null
  })).sort((a,b)=>a.distance-b.distance).slice(0,limit);
}
function nationalMetricHtml(label,value,sub=''){
  return `<div class="national-rich-metric"><span>${esc(label)}</span><strong>${value}</strong>${sub?`<small>${esc(sub)}</small>`:''}</div>`;
}
function nationalSelectNearby(name){
  const p=nationalMountainPoint(name);if(!p)return;
  const r=nationalOutlookResults.get(name)||null;
  showNationalOutlookDetail(p,r);
  if(nationalOutlookMap){nationalOutlookMap.panTo([p.lat,p.lon],{animate:true});}
}
function showNationalOutlookDetail(p,result){
  const box=$('nationalOutlookDetail');if(!box)return;
  const grade=result?.grade||'?';
  const gradeClass=grade==='?'?'u':grade.toLowerCase();
  const elevation=Number.isFinite(Number(p.elevation))?`${Math.round(Number(p.elevation)).toLocaleString()} m`:'標高情報なし';
  const area=nationalAreaLabel(p.name);
  const reading=nationalMountainReading(p.name);
  const confidence=nationalOutlookConfidence(result);
  const course=nationalRepresentativeSummary(p.name);
  const guideHtml=nationalMountainGuideHtml(p.name,area,elevation);
  const nearby=nationalNearbyMountains(p);
  const photo=nationalMountainPhoto(p.name);
  const heroStyle=photo?` style="background-image:linear-gradient(180deg,rgba(12,61,43,.08),rgba(8,48,35,.82)),url('${photo.url}')"`:'';
  const photoCredit=photo?`${photo.sourceUrl?`<a class="national-rich-photo-credit" href="${esc(photo.sourceUrl)}" target="_blank" rel="noopener noreferrer" title="写真の出典・ライセンスを確認">`:'<div class="national-rich-photo-credit">'}${esc(photo.credit)}${photo.note?`<small>${esc(photo.note)}</small>`:''}${photo.sourceUrl?'</a>':'</div>'}`:'';
  const courseHtml=course?`<section class="national-rich-section"><div class="national-rich-section-head"><div><span>REPRESENTATIVE ROUTE</span><h4>${esc(course.label)}</h4></div><span class="national-route-count">${course.points.length}地点</span></div><div class="national-route-flow">${course.points.map((pt,i)=>`<span class="national-route-node"><b>${i+1}</b>${esc(pt.name)}</span>`).join('<i>→</i>')}</div></section>`:'';
  const nearbyHtml=`<section class="national-rich-section"><div class="national-rich-section-head"><div><span>NEARBY MOUNTAINS</span><h4>近くの山</h4></div></div><div class="national-nearby-list">${nearby.map(x=>{const g=x.result?.grade||'?';const gc=g==='?'?'u':g.toLowerCase();return `<button type="button" class="national-nearby-item" data-national-nearby="${esc(x.name)}"><span><strong>${esc(x.name)}</strong><small>約${Math.round(x.distance)} km</small></span><b class="national-nearby-grade grade-${gc}">${g}</b></button>`}).join('')}</div></section>`;
  const metrics=result?[
    nationalMetricHtml('最大風速',`${num(result.maxWind)} m/s`,'6〜15時'),
    nationalMetricHtml('最大降水',`${num(result.maxRain)} mm/h`,'6〜15時'),
    nationalMetricHtml('雷リスク',esc(result.thunder||'–'),'参考情報'),
    nationalMetricHtml('最低気温',`${num(result.minTemp)} ℃`,'6〜15時'),
    nationalMetricHtml('最小視界',Number.isFinite(result.minVisibility)?`${Math.round(result.minVisibility/100)/10} km`:'–','参考情報'),
    nationalMetricHtml('判定信頼度',`<span class="national-confidence tone-${confidence.tone}">${confidence.label}</span>`,confidence.note)
  ].join(''):'';
  const summary=result?esc(result.summary||''):(p.eligible?'まだ判定していません。日付を選んで「全国を判定」を押してください。':'全国簡易判定は対象外です。');
  const sourceNote=result?`<span class="national-backup-source">簡易判定：${result.source==='metno+gfs'?'MET Norway + NOAA GFS':result.source==='metno'?'MET Norway':result.source==='gfs'?'NOAA GFS':'MET Norway / NOAA GFS'}</span>`:'';
  box.innerHTML=`
    <button type="button" class="national-detail-close" aria-label="詳細を閉じる">×</button>
    <div class="national-rich-hero${photo?' has-photo':''}"${heroStyle}>
      <div class="national-rich-hero-overlay"></div>
      <div class="national-rich-hero-copy"><span class="national-rich-area">${esc(area)}</span><div class="national-rich-title-row"><h3>${esc(p.name)}</h3>${nationalMountainHonorHtml(p.name)}</div>${reading?`<div class="national-rich-reading">${esc(reading)}</div>`:''}<p>${esc(elevation)}</p></div>
      <div class="national-rich-grade grade-${gradeClass}"><b>${grade}</b><span>${nationalGradeLabel(grade)}</span></div>
      ${photoCredit}
    </div>
    <div class="national-rich-content">
      <div class="national-rich-summary"><strong>${grade==='?'?'全国一括簡易判定':'6〜15時の簡易判定'}</strong><p>${summary}</p>${sourceNote}</div>
      ${result?`<div class="national-rich-metrics">${metrics}</div>`:''}
      ${guideHtml}
      ${courseHtml}
      <div class="national-rich-actions"><button type="button" class="primary national-detail-open national-rich-cta">この山を山行設定に入力</button><button type="button" class="national-extra-action mountain-water-action hidden" data-mountain-water="1">💧 水場情報</button><button type="button" class="national-extra-action mountain-camera-action hidden" data-mountain-camera="1">📹 ライブカメラ</button><a class="national-wikipedia-link" href="${wikipediaArticleUrl(p.name)}" target="_blank" rel="noopener noreferrer">Wikipedia ↗</a></div>
      ${nearbyHtml}
      <p class="national-rich-footnote">主要山のみ実写真を表示しています。写真は Wikimedia Commons の公開画像を利用しています。全国一括簡易判定は候補地選び用です。山行設定では通過時刻・地点・複数モデルを使って詳しく確認できます。</p>
    </div>`;
  box.classList.add('is-open');
  box.querySelector('.national-detail-open')?.addEventListener('click',()=>openMountainFromNationalMap(p.name));
  box.querySelector('.national-detail-close')?.addEventListener('click',()=>box.classList.remove('is-open'));
  box.querySelector('[data-mountain-water]')?.addEventListener('click',()=>loadMountainWaterReports(p.name,p));
  box.querySelector('[data-mountain-camera]')?.addEventListener('click',()=>loadMountainCameras(p.name));
  refreshMountainExtraActions(box,p);
  // Access data may still be deferred when a user scrolls straight to the national map.
  // Hydrate the access button after the optional catalog arrives without blocking the detail card.
  ensureAccessResources().then(()=>{
    const info=nationalMountainGuideInfo(p.name);
    const accessBtn=box.querySelector('[data-national-trailhead-access]');
    const has=!!info.trailhead&&info.trailhead!=='情報なし'&&Boolean(window.TratenTrailheadAccess?.has?.(info.trailhead));
    if(accessBtn&&has){
      accessBtn.classList.remove('is-unavailable');
      accessBtn.disabled=false;accessBtn.removeAttribute('aria-disabled');accessBtn.removeAttribute('title');
      accessBtn.textContent='アクセス';
    }
  }).catch(()=>{});
  box.querySelectorAll('[data-national-nearby]').forEach(btn=>btn.addEventListener('click',()=>nationalSelectNearby(btn.dataset.nationalNearby)));
  // V1.4.187: 山情報のアクセスボタンは access.js の委譲クリックで処理。
  if(!photo){
    const requestedName=p.name;
    fetchWikiMountainPhoto(requestedName).then(found=>{
      if(!found)return;
      const current=box.querySelector('.national-rich-hero h3')?.textContent?.trim();
      if(current===requestedName)applyNationalHeroPhoto(box,p,found);
    }).catch(()=>{});
  }
}

async function openMountainFromNationalMap(name){
  const search=$('mountainSearch'); if(!search)return;
  search.value=name; search.dispatchEvent(new Event('change',{bubbles:true}));
  const d=$('nationalOutlookDate')?.value;
  await new Promise(r=>setTimeout(r,50));
  if(representativeCourseOptions(name).length){
    await applyRepresentativeCourse();
    const rows=[...document.querySelectorAll('#points .point-row')];
    const first=rows[0]?.querySelector('.point-date')?.value;
    if(d&&first){
      const shift=Math.round((new Date(`${d}T00:00:00+09:00`).getTime()-new Date(`${first}T00:00:00+09:00`).getTime())/86400000);
      rows.forEach(row=>{const input=row.querySelector('.point-date');if(!input?.value)return;const ms=new Date(`${input.value}T00:00:00+09:00`).getTime()+shift*86400000;input.value=formatJstInput(ms).date;});
      updateForecastHorizon(); renderRouteMaps();
    }
  }
  $('mountainPreset')?.scrollIntoView({behavior:'smooth',block:'center'});
}
const NATIONAL_OUTLOOK_BROWSER_CACHE_KEY='traten:national-outlook:v6';
const NATIONAL_OUTLOOK_BROWSER_CACHE_TTL=4*60*60*1000;
function readNationalOutlookBrowserCache(date){
  try{
    const raw=localStorage.getItem(NATIONAL_OUTLOOK_BROWSER_CACHE_KEY);
    const obj=raw?JSON.parse(raw):null;
    if(!obj||obj.date!==date||Date.now()-Number(obj.savedAt||0)>NATIONAL_OUTLOOK_BROWSER_CACHE_TTL||!Array.isArray(obj.results))return null;
    return obj.results;
  }catch(_){return null;}
}
function writeNationalOutlookBrowserCache(date,results){
  try{localStorage.setItem(NATIONAL_OUTLOOK_BROWSER_CACHE_KEY,JSON.stringify({date,savedAt:Date.now(),results}));}catch(_){}
}
async function loadNationalOutlookSharedCacheOnly({silentMiss=false}={}){
  const date=$('nationalOutlookDate')?.value, status=$('nationalOutlookStatus');
  if(!date)return false;
  const points=nationalOutlookVisiblePoints();
  const eligible=points.filter(x=>x.eligible);
  if(!eligible.length){
    nationalOutlookResults=new Map();
    renderNationalOutlookMarkers();
    if(status)status.textContent='表示する山の区分を1つ以上選択してください。';
    return false;
  }
  const browserCached=readNationalOutlookBrowserCache(date);
  if(browserCached?.length){
    const wanted=new Set(eligible.map(x=>x.name));
    const picked=browserCached.filter(x=>wanted.has(x.name));
    if(picked.length){
      nationalOutlookResults=new Map(picked.map(x=>[x.name,x]));
      renderNationalOutlookMarkers();
    }
  }
  try{
    const res=await fetch('/api/national-outlook',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({date,points:eligible,cacheOnly:true})});
    const data=await res.json().catch(()=>({}));
    if(!res.ok)throw new Error(data.error||`HTTP ${res.status}`);
    const results=Array.isArray(data.results)?data.results:[];
    if(!results.length){
      nationalOutlookResults=new Map();
      renderNationalOutlookMarkers();
      if(status&&!silentMiss)status.innerHTML=`${esc(nationalOutlookSelectedLabel())}の共有キャッシュはまだありません。<small> 「全国を判定」を押すと取得します。</small>`;
      return false;
    }
    nationalOutlookResults=new Map(results.map(x=>[x.name,x]));
    renderNationalOutlookMarkers();
    writeNationalOutlookBrowserCache(date,results);
    const counts={A:0,B:0,C:0};for(const r of nationalOutlookResults.values())if(counts[r.grade]!=null)counts[r.grade]++;
    const state=String(data.cache?.state||'');
    const freshness=state.includes('stale')?'保存済みの最新キャッシュ':'共有キャッシュ';
    const expected=eligible.length;
    const missing=Math.max(0,expected-results.length);
    const coverage=`共有キャッシュ <b>${results.length}/${expected}座</b>`;
    if(status)status.innerHTML=`${freshness}から${esc(nationalOutlookSelectedLabel())}を初期表示：<b>A ${counts.A}座</b> / <b>B ${counts.B}座</b> / <b>C ${counts.C}座</b><br><span class="national-cache-stats">${coverage}${missing?` / 残り <b>${missing}座</b> はキャッシュ更新待ち`: ' / 充足済み'}</span>`;
    return true;
  }catch(_){
    if(status&&!silentMiss)status.textContent='共有キャッシュを確認できませんでした。「全国を判定」は利用できます。';
    return false;
  }
}

async function runNationalOutlook(){
  const date=$('nationalOutlookDate')?.value, status=$('nationalOutlookStatus'), btn=$('nationalOutlookRun');
  if(!date){if(status)status.textContent='日付を選択してください。';return;}
  const points=nationalOutlookVisiblePoints();
  const eligible=points.filter(x=>x.eligible);
  if(!eligible.length){if(status)status.textContent='表示する山の区分を1つ以上選択してください。';return;}
  if(btn)btn.disabled=true;
  const browserCached=readNationalOutlookBrowserCache(date);
  if(browserCached?.length){
    const wanted=new Set(eligible.map(x=>x.name));
    const selectedCached=browserCached.filter(x=>wanted.has(x.name));
    nationalOutlookResults=new Map(selectedCached.map(x=>[x.name,x]));
    renderNationalOutlookMarkers();
    const counts={A:0,B:0,C:0};for(const r of nationalOutlookResults.values())if(counts[r.grade]!=null)counts[r.grade]++;
    const missing=Math.max(0,eligible.length-nationalOutlookResults.size);
    if(status)status.innerHTML=`保存済み ${nationalOutlookResults.size}座を先に表示：<b>A ${counts.A}座</b> / <b>B ${counts.B}座</b> / <b>C ${counts.C}座</b>${missing?`<br><small>未取得 ${missing}座だけ追加確認中…</small>`:'<br><small>共有キャッシュの更新有無を確認中…</small>'}`;
    // Do not return: server-side partial cache is checked and only missing mountains are fetched.
  }else{
    nationalOutlookResults=new Map();
    renderNationalOutlookMarkers();
    if(status)status.textContent='全国共有キャッシュを確認中… MET Norway + NOAA GFSで簡易判定します。';
  }
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),110000);
  try{
    const res=await fetch('/api/national-outlook',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({date,points:eligible}),signal:controller.signal});
    const data=await res.json().catch(()=>({}));
    if(!res.ok)throw new Error(data.error||`HTTP ${res.status}`);
    // Server returns the merged shared cache, so replace the local map with that snapshot.
    nationalOutlookResults=new Map((data.results||[]).map(x=>[x.name,x]));
    renderNationalOutlookMarkers();
    const counts={A:0,B:0,C:0};for(const r of nationalOutlookResults.values())if(counts[r.grade]!=null)counts[r.grade]++;
    const got=nationalOutlookResults.size;
    // V1.4.124: save partial results too. The next run can show them instantly and fill only missing mountains.
    if(got)writeNationalOutlookBrowserCache(date,[...nationalOutlookResults.values()]);
    const state=String(data.cache?.state||'');
    const missing=Math.max(0,points.length-got);
    const rateLimited=!!data.rateLimited;
    if(state==='partial' && got===0){
      if(status)status.innerHTML='<strong>予報データを一時的に取得できませんでした</strong><br><span>現在、予報データの取得が混み合っています。少し時間をおいてから、もう一度「全国を判定」をお試しください。</span>';
    }else{
      let lead='判定完了';
      if(state.includes('stale'))lead='保存済みの最新結果を表示';
      else if(state==='supabase-fresh')lead='永続共有キャッシュから即時表示';
      else if(state==='shared-fresh')lead='共有キャッシュから即時表示';
      else if(state==='partial-completed')lead='保存済み結果に不足分を追加して判定完了';
      else if(state==='partial-updated')lead='保存済み結果を利用して一部更新';
      else if(state==='shared-partial-refreshing')lead='保存済み結果を表示（不足分を更新中）';
      else if(state==='live-generated')lead='判定完了・共有キャッシュを保存';
      else if(state==='partial')lead='一部の山を判定しました';
      let note='';
      const cachedCount=Number(data.cache?.cachedCount||0), newlyFetched=Number(data.cache?.newlyFetchedCount||0), staleFallback=Number(data.cache?.staleFallbackCount||0);
      note+=`<br><span class="national-cache-stats">共有キャッシュ <b>${cachedCount}座</b> / 新規取得 <b>${newlyFetched}座</b>${staleFallback?` / 保存済み予報で補完 <b>${staleFallback}座</b>`:''}</span>`;
      const ageSec=Number(data.cache?.ageSeconds);
      const remainSec=Number(data.cache?.freshRemainingSeconds);
      if(Number.isFinite(ageSec)&&Number.isFinite(remainSec)){
        const ageMin=Math.max(0,Math.round(ageSec/60));
        const remainMin=Math.max(0,Math.round(remainSec/60));
        note+=`<br><small class="national-cache-help">キャッシュ年齢 約${ageMin}分 / 4時間TTL残り 約${remainMin}分${data.cache?.cacheHit?'（キャッシュヒット）':''}</small>`;
      }else{
        note+=`<br><small class="national-cache-help">百名山は翌日〜7日先を共有キャッシュへ先行保存し、各結果は4時間TTLで更新します。キャッシュがない対象は全国判定に1〜2分程度かかることがあります。</small>`;
      }
      const dualCount=Number(data.dualModelCount||0);
      const metnoOnly=Number(data.metnoOnlyCount||0), gfsOnly=Number(data.gfsOnlyCount||0);
      if(dualCount>0)note+=`<br><small>MET Norway + NOAA GFSの2モデルを比較して判定（2モデル取得 ${dualCount}座）。</small>`;
      if(metnoOnly||gfsOnly)note+=`<br><small>片方のみ取得：MET Norway ${metnoOnly}座 / NOAA GFS ${gfsOnly}座。</small>`;
      if(data.warning)note+=`<br><small>${esc(String(data.warning))}</small>`;
      if(status)status.innerHTML=`${lead}：<b>A ${counts.A}座</b> / <b>B ${counts.B}座</b> / <b>C ${counts.C}座</b>${missing?` / 未取得 ${missing}座`:''}${note}`;
    }
  }catch(e){
    const msg=e?.name==='AbortError'?'全国共有キャッシュの生成がタイムアウトしました。少し時間をおいて再度お試しください。':(e.message||e);
    if(status)status.innerHTML=`<strong>全国判定を実行できませんでした</strong><br><span>${e?.name==='AbortError'?'処理に時間がかかっています。少し時間をおいて、もう一度お試しください。':'予報データを取得できませんでした。少し時間をおいて、もう一度お試しください。'}</span>`;
  }finally{
    clearTimeout(timer);
    if(btn)btn.disabled=false;
  }
}
// V1.4.208: external libraries must never block the initial planner screen.
// Load Leaflet only after the app shell is interactive. If the CDN is unreachable,
// the planner continues to work and only map rendering falls back to the point list.
let tratenLeafletLoadPromise=null;
function ensureLeafletLoaded(){
  if(window.L)return Promise.resolve(true);
  if(tratenLeafletLoadPromise)return tratenLeafletLoadPromise;
  tratenLeafletLoadPromise=new Promise(resolve=>{
    const cssId='traten-leaflet-css';
    if(!document.getElementById(cssId)){
      const link=document.createElement('link');
      link.id=cssId;link.rel='stylesheet';
      link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.crossOrigin='';
      document.head.appendChild(link);
    }
    const existing=document.getElementById('traten-leaflet-js');
    if(existing){
      if(window.L){resolve(true);return;}
      existing.addEventListener('load',()=>resolve(!!window.L),{once:true});
      existing.addEventListener('error',()=>resolve(false),{once:true});
      return;
    }
    const script=document.createElement('script');
    script.id='traten-leaflet-js';
    script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async=true;script.crossOrigin='';
    let done=false;
    const finish=ok=>{if(done)return;done=true;clearTimeout(timer);resolve(!!ok&&!!window.L);};
    const timer=setTimeout(()=>finish(false),12000);
    script.addEventListener('load',()=>finish(true),{once:true});
    script.addEventListener('error',()=>finish(false),{once:true});
    document.head.appendChild(script);
  });
  return tratenLeafletLoadPromise;
}

let tratenNationalSetupStarted=false;
function scheduleNationalOutlookSetup(){
  const section=$('nationalOutlook');
  const start=()=>{
    if(tratenNationalSetupStarted)return;
    tratenNationalSetupStarted=true;
    setupNationalOutlook().catch(err=>{console.warn('national outlook deferred setup failed',err);});
  };
  if(section&&'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(x=>x.isIntersecting)){observer.disconnect();start();}
    },{rootMargin:'900px 0px'});
    observer.observe(section);
  }
  // Warm the map only after the critical page has painted and the browser is idle.
  const idleStart=()=>{
    if('requestIdleCallback' in window)window.requestIdleCallback(start,{timeout:8000});
    else setTimeout(start,5000);
  };
  if(document.readyState==='complete')idleStart();else window.addEventListener('load',idleStart,{once:true});
}

async function setupNationalOutlook(){
  const el=$('nationalOutlookMap'),date=$('nationalOutlookDate'),btn=$('nationalOutlookRun'),status=$('nationalOutlookStatus');
  const filters=[$('nationalFilter100'),$('nationalFilter200'),$('nationalFilter300')].filter(Boolean);
  // 判定ボタンは地図ライブラリの成否に関係なく必ず有効化する。
  btn?.addEventListener('click',runNationalOutlook);
  if(!el||!date)return;
  const today=new Date(); const local=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
  const tomorrow=new Date(today.getTime()+86400000); const tomorrowLocal=new Date(tomorrow.getTime()-tomorrow.getTimezoneOffset()*60000).toISOString().slice(0,10); date.value=tomorrowLocal;
  const max=new Date(today.getTime()+15*86400000); date.max=new Date(max.getTime()-max.getTimezoneOffset()*60000).toISOString().slice(0,10); date.min=local;
  updateNationalOutlookMapDate();
  // V1.5.14: 日付移動では現在の地図中心・ズームを維持する。
  // 山リストの絞り込み変更時だけ、対象山が収まるようfitBoundsする。
  const refreshFilteredView=({fitToSelection=false}={})=>{
    updateNationalOutlookMapDate();
    nationalOutlookResults=new Map();
    renderNationalOutlookMarkers();
    if(fitToSelection){
      const coords=nationalOutlookVisiblePoints().map(p=>[p.lat,p.lon]);
      if(nationalOutlookMap&&coords.length)nationalOutlookMap.fitBounds(coords,{padding:[18,18],maxZoom:5});
    }
    loadNationalOutlookSharedCacheOnly();
  };
  filters.forEach(cb=>cb.addEventListener('change',()=>refreshFilteredView({fitToSelection:true})));
  date.addEventListener('change',()=>refreshFilteredView({fitToSelection:false}));
  // Shared weather cache is first-party and can start immediately; marker drawing is
  // harmless until the map exists, and the latest results are rendered after Leaflet arrives.
  loadNationalOutlookSharedCacheOnly({silentMiss:true});
  // V1.4.208: do not block the first paint on the external map CDN.
  const leafletReady=await ensureLeafletLoaded();
  if(!leafletReady){
    el.innerHTML='<div class="national-map-fallback">地図ライブラリを読み込めませんでした。全国判定は実行できます。</div>';
    if(status)status.textContent='地図ライブラリを読み込めませんでしたが、共有キャッシュを確認します。';
    return;
  }
  try{
    nationalOutlookMap=L.map(el,{zoomControl:true,scrollWheelZoom:false}).setView([36.2,138.0],5);
    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',{minZoom:5,maxZoom:18,attribution:'<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル</a>'}).addTo(nationalOutlookMap);
    nationalOutlookDateControl=L.control({position:'topright'});
    nationalOutlookDateControl.onAdd=()=>{
      const nav=L.DomUtil.create('div','national-map-date-nav');
      nav.setAttribute('aria-label','全国判定の表示日を移動');
      nav.innerHTML='<button type="button" class="national-map-date-arrow" data-national-date-shift="-1" aria-label="前日へ">‹</button><span class="national-map-date-label">--/--</span><button type="button" class="national-map-date-arrow" data-national-date-shift="1" aria-label="翌日へ">›</button>';
      L.DomEvent.disableClickPropagation(nav);L.DomEvent.disableScrollPropagation(nav);
      nav.querySelectorAll('[data-national-date-shift]').forEach(button=>button.addEventListener('click',()=>shiftNationalOutlookDate(Number(button.dataset.nationalDateShift||0))));
      return nav;
    };
    nationalOutlookDateControl.addTo(nationalOutlookMap);
    updateNationalOutlookMapDate();
    renderNationalOutlookMarkers();
    const allCoords=nationalOutlookVisiblePoints().map(p=>[p.lat,p.lon]);
    if(allCoords.length)nationalOutlookMap.fitBounds(allCoords,{padding:[18,18],maxZoom:5});
    // Shared cache was already requested before the external map library.
    // Route lists are usable before Leaflet arrives; upgrade them to maps once ready.
    try{renderRouteMaps();}catch(_){}
  }catch(e){
    if(status)status.textContent=`地図の初期化に失敗しましたが、共有キャッシュを確認します：${e.message||e}`;
  }
}


function screenshotSafeName(value){
  return String(value||'traten').trim().replace(/[\\/:*?"<>|]/g,'-').replace(/\s+/g,'_').slice(0,60)||'traten';
}
function screenshotRouteDate(){
  return document.querySelector('#points .point-date')?.value || new Date().toISOString().slice(0,10);
}
let tratenHtml2CanvasLoadPromise=null;
function ensureHtml2CanvasLoaded(){
  if(typeof window.html2canvas==='function')return Promise.resolve(true);
  if(tratenHtml2CanvasLoadPromise)return tratenHtml2CanvasLoadPromise;
  tratenHtml2CanvasLoadPromise=new Promise(resolve=>{
    const script=document.createElement('script');
    script.src='https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js';
    script.async=true;script.crossOrigin='anonymous';
    let done=false;
    const finish=ok=>{if(done)return;done=true;clearTimeout(timer);resolve(!!ok&&typeof window.html2canvas==='function');};
    const timer=setTimeout(()=>finish(false),15000);
    script.addEventListener('load',()=>finish(true),{once:true});
    script.addEventListener('error',()=>finish(false),{once:true});
    document.head.appendChild(script);
  });
  return tratenHtml2CanvasLoadPromise;
}

async function captureAnalysisResultsScreenshot(sourceBtn=null,sourceStatus=null){
  const results=$('results');
  const btn=sourceBtn || $('resultScreenshotBtn');
  const status=sourceStatus || $('resultScreenshotStatus');
  if(!results||results.classList.contains('hidden')){
    setStatus('先に山行を分析してください。',true);
    return;
  }
  if(!(await ensureHtml2CanvasLoaded())){
    setStatus('スクショ機能を読み込めませんでした。通信状態を確認して、もう一度お試しください。',true);
    return;
  }
  const oldText=btn?.innerHTML;
  if(btn){btn.disabled=true;btn.innerHTML='<span aria-hidden="true">📷</span><b>画像を作成中…</b>';}
  if(status)status.textContent='分析結果を1枚の画像にしています…';
  let clone=null;
  try{
    if(document.fonts?.ready)await document.fonts.ready;
    clone=results.cloneNode(true);
    clone.removeAttribute('id');
    clone.classList.remove('hidden');
    clone.classList.add('results-screenshot-clone');
    clone.querySelectorAll('.screenshot-exclude').forEach(el=>el.remove());
    clone.querySelectorAll('.hidden').forEach(el=>{
      if(el.id==='overnightSection')return;
    });
    // 画面上の横スクロール要素も、画像では全内容が見えるように展開する。
    clone.querySelectorAll('.table-wrap,.national-route-flow,.weather-charts,.forecast-grid,.overnight-grid').forEach(el=>{
      el.style.overflow='visible';
      el.style.maxWidth='none';
    });
    document.body.appendChild(clone);
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const canvas=await window.html2canvas(clone,{
      backgroundColor:'#f5f8f6',
      scale:1,
      useCORS:true,
      allowTaint:false,
      logging:false,
      width:clone.scrollWidth,
      height:clone.scrollHeight,
      windowWidth:1180,
      scrollX:0,
      scrollY:0,
      imageTimeout:12000,
      removeContainer:true
    });
    const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('画像データを作成できませんでした')),'image/png'));
    const mountain=screenshotSafeName(currentMountainLabel()||'トラテン分析結果');
    const date=screenshotSafeName(screenshotRouteDate());
    const filename=`トラテン_${mountain}_${date}.png`;
    const isMobileSave=(sourceBtn?.id==='resultScreenshotBtn') || window.matchMedia?.('(max-width: 760px)').matches;
    const file=new File([blob],filename,{type:'image/png'});
    let delivery='download';

    // スマホではブラウザから写真ライブラリへ直接書き込めないため、
    // Web Share APIで画像付きのOS共有画面を開く。iPhoneでは「画像を保存」で写真に入れられる。
    if(isMobileSave && navigator.share && navigator.canShare?.({files:[file]})){
      delivery='share';
      if(status)status.textContent='写真への保存画面を開きます…';
      try{
        await navigator.share({files:[file],title:'トラテン分析結果'});
        if(status)status.textContent='共有画面を開きました。「画像を保存」を選ぶと写真ライブラリに保存できます。';
      }catch(shareError){
        if(shareError?.name==='AbortError'){
          if(status)status.textContent='保存をキャンセルしました。';
          return;
        }
        console.warn('画像共有に失敗したためダウンロードへ切り替えます',shareError);
        delivery='download-fallback';
        const url=URL.createObjectURL(blob);
        const a=document.createElement('a');
        a.href=url;a.download=filename;a.rel='noopener';
        document.body.appendChild(a);a.click();a.remove();
        setTimeout(()=>URL.revokeObjectURL(url),30000);
        if(status)status.textContent='共有画面を開けなかったため、PNG画像として保存しました。';
      }
    }else{
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=url;a.download=filename;a.rel='noopener';
      document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),30000);
      if(status)status.textContent=isMobileSave?'このブラウザでは写真保存画面を開けないため、PNG画像として保存しました。':'PNG画像を作成しました。';
    }
    logEvent('result_screenshot',{success:true,mountain:currentMountainLabel(),metadata:{format:'png',full_result:true,model_details:false,delivery}});
  }catch(e){
    console.error(e);
    if(status)status.textContent='画像を作成できませんでした。もう一度お試しください。';
    setStatus(`スクショ作成に失敗しました：${e.message||e}`,true);
    logEvent('result_screenshot',{success:false,mountain:currentMountainLabel(),error_message:e.message||String(e)});
  }finally{
    clone?.remove();
    if(btn){btn.disabled=false;btn.innerHTML=oldText||'<span aria-hidden="true">📷</span><b>結果をスクショ</b>';}
  }
}



// V1.4.237: keep non-essential resource catalogs off the critical first-paint path.
// Access and fixed-camera data are loaded only when needed, or during browser idle time.
const TRATEN_OPTIONAL_ASSET_VERSION=APP_VERSION;
const tratenOptionalLoads=new Map();
function loadOptionalScriptOnce(src,key){
  if(tratenOptionalLoads.has(key))return tratenOptionalLoads.get(key);
  const promise=new Promise((resolve,reject)=>{
    const existing=document.querySelector(`script[data-traten-optional="${key}"]`);
    if(existing){
      if(existing.dataset.loaded==='1'){resolve(true);return;}
      existing.addEventListener('load',()=>resolve(true),{once:true});
      existing.addEventListener('error',()=>reject(new Error(`${key} load failed`)),{once:true});
      return;
    }
    const script=document.createElement('script');
    script.src=src;script.async=true;script.dataset.tratenOptional=key;
    script.addEventListener('load',()=>{script.dataset.loaded='1';resolve(true);},{once:true});
    script.addEventListener('error',()=>reject(new Error(`${key} load failed`)),{once:true});
    document.head.appendChild(script);
  }).catch(err=>{tratenOptionalLoads.delete(key);throw err;});
  tratenOptionalLoads.set(key,promise);return promise;
}
function ensureOptionalStylesheet(href,key){
  if(document.querySelector(`link[data-traten-optional="${key}"]`))return;
  const link=document.createElement('link');link.rel='stylesheet';link.href=href;link.dataset.tratenOptional=key;document.head.appendChild(link);
}
async function ensureCameraResources(){
  if(typeof window.tratenCamerasForMountain==='function')return true;
  await loadOptionalScriptOnce(`camera-data.js?v=${TRATEN_OPTIONAL_ASSET_VERSION}`,'camera-data');
  return typeof window.tratenCamerasForMountain==='function';
}
async function ensureAccessResources(){
  if(window.TratenTrailheadAccess)return true;
  ensureOptionalStylesheet(`access.css?v=${TRATEN_OPTIONAL_ASSET_VERSION}`,'access-css');
  if(!window.TRATEN_TRAILHEAD_ACCESS_DB)await loadOptionalScriptOnce(`access-data.js?v=${TRATEN_OPTIONAL_ASSET_VERSION}`,'access-data');
  if(!window.TratenTrailheadAccess)await loadOptionalScriptOnce(`access.js?v=${TRATEN_OPTIONAL_ASSET_VERSION}`,'access-ui');
  try{window.TratenTrailheadAccess?.refresh?.();}catch(_){}
  return !!window.TratenTrailheadAccess;
}
function scheduleOptionalResourceWarmup(){
  const warm=()=>{ensureCameraResources().catch(()=>{});ensureAccessResources().catch(()=>{});};
  const afterLoad=()=>{
    if('requestIdleCallback' in window)window.requestIdleCallback(warm,{timeout:6000});
    else setTimeout(warm,2500);
  };
  if(document.readyState==='complete')afterLoad();else window.addEventListener('load',afterLoad,{once:true});
}

// V1.4.222: verified fixed-camera catalog helpers.
function fixedCamerasForMountain(name){
  try{return typeof window.tratenCamerasForMountain==='function'?window.tratenCamerasForMountain(name):[];}catch(_){return [];}
}
function fixedCameraRows(name){
  return fixedCamerasForMountain(name).map(row=>({
    title:row.title,type:row.type||'other',official:row.official!==false,near_point:name,
    snippet:row.note||'',host:row.provider||'公式サイト',date:row.verified||'',url:row.url,search_url:'',seasonal:!!row.seasonal
  }));
}
// V1.4.220: route live / road camera discovery panel.
function cameraTypeLabel(type){
  return ({road:'道路・林道',hut:'山小屋',tourism:'観光・施設',weather:'気象・山岳',other:'公開カメラ'})[type]||'公開カメラ';
}
function openRouteCameraModal(){const m=$('routeCameraModal');if(!m)return;m.classList.remove('hidden');m.setAttribute('aria-hidden','false');document.body.classList.add('route-camera-open');}
function closeRouteCameraModal(){const m=$('routeCameraModal');if(!m)return;m.classList.add('hidden');m.setAttribute('aria-hidden','true');document.body.classList.remove('route-camera-open');}
function renderRouteCameraLoading(){const b=$('routeCameraBody'),sub=$('routeCameraSubtitle');if(sub)sub.textContent='林道・道路・山小屋・観光施設などの公開カメラを確認しています。';if(b)b.innerHTML='<div class="route-camera-loading"><span aria-hidden="true">📹</span><strong>ルート周辺のカメラを探しています</strong><small>各通過地点名と山名を使って、公開カメラページを検索します。</small></div>';}
function routeCameraCard(row){
  const official=row.official?'<span class="camera-official">公的・公式候補</span>':'<span class="camera-public">公開ページ</span>';
  const point=row.near_point?`<small>関連地点：${esc(row.near_point)}</small>`:'';
  const snippet=row.snippet?`<p>${esc(row.snippet)}</p>`:'';
  return `<article class="route-camera-card"><div class="route-camera-card-head"><div><span class="camera-kind">${esc(cameraTypeLabel(row.type))}</span><h4>${esc(row.title||'ライブカメラ')}</h4>${point}</div>${official}</div>${snippet}<div class="route-camera-meta"><span>${esc(row.host||'提供元')}</span>${row.date?`<time>${esc(row.date)}</time>`:''}</div><div class="route-camera-actions"><a href="${esc(row.url)}" target="_blank" rel="noopener noreferrer">カメラページを開く ↗</a>${row.search_url?`<a class="sub" href="${esc(row.search_url)}" target="_blank" rel="noopener noreferrer">周辺を追加検索 ↗</a>`:''}</div></article>`;
}
function renderRouteCameraResults(data){
  const b=$('routeCameraBody'),sub=$('routeCameraSubtitle');if(!b)return;
  const rows=Array.isArray(data?.cameras)?data.cameras:[];
  if(sub)sub.textContent=`${data?.mountain||currentMountainLabel()} / カメラ候補 ${rows.length}件`;
  if(rows.length){
    b.innerHTML=`<div class="route-camera-summary"><strong>${rows.length}</strong><span>件の公開カメラ候補</span><p>ルートの通過地点名を基準に、道路・林道・山小屋・観光施設などの公開ページを優先表示します。</p></div><div class="route-camera-grid">${rows.map(routeCameraCard).join('')}</div><details class="route-camera-notes"><summary>この情報の見方・注意点</summary><ul>${(data?.notes||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>`;
  }else{
    const links=Array.isArray(data?.search_links)?data.search_links:[];
    b.innerHTML=`<div class="route-camera-empty-state"><div>📹</div><h4>公開カメラ候補を確認できませんでした</h4><p>カメラがないとは限りません。地点別の追加検索を利用してください。</p></div><div class="route-camera-search-links">${links.map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.label)} ↗</a>`).join('')}</div>`;
  }
}
async function loadRouteCameras(){
  const mountain=currentMountainLabel();
  const rows=fixedCameraRows(mountain);
  if(!rows.length){setStatus(`${mountain||'この山'}の確認済みライブカメラは現在未登録です。`,true);return;}
  openRouteCameraModal();
  renderRouteCameraResults({mountain,cameras:rows,notes:[
    '確認済みの公式・公的カメラだけを固定登録しています。',
    '映像の公開状況、更新頻度、季節停止は提供元ページで確認してください。',
    'カメラ画像はトラテンへ転載せず、提供元ページへのリンクのみ表示します。'
  ]});
  logEvent('route_camera',{success:true,mountain,metadata:{fixed_catalog:true,cameras:rows.length}});
}

function loadMountainCameras(name){
  const rows=fixedCameraRows(name);
  if(!rows.length)return;
  openRouteCameraModal();
  renderRouteCameraResults({mountain:name,cameras:rows,notes:[
    '山に関連づけた確認済みカメラです。撮影地点が山頂そのものとは限りません。',
    '季節停止・メンテナンス等は提供元の最新案内を優先してください。'
  ]});
}

async function loadMountainWaterReports(name,p){
  if(!name)return;
  return loadFixedWaterList(name);
}

const mountainWaterAvailabilityMemory=new Map();
async function refreshMountainExtraActions(box,p){
  const camBtn=box?.querySelector('[data-mountain-camera]');
  const waterBtn=box?.querySelector('[data-mountain-water]');
  try{await ensureCameraResources();}catch(_){}
  const cameras=fixedCamerasForMountain(p?.name);
  if(camBtn){camBtn.classList.toggle('hidden',!cameras.length);camBtn.textContent=`📹 ライブカメラ${cameras.length?` ${cameras.length}`:''}`;}
  if(!waterBtn||!p)return;
  const cached=mountainWaterAvailabilityMemory.get(p.name);
  if(cached!==undefined){waterBtn.classList.toggle('hidden',!cached);return;}
  waterBtn.classList.add('hidden');
  try{
    // V1.4.231: prefer the weekly Japan-300 fixed audit cache. This avoids an
    // Overpass request every time a mountain information card is opened.
    const idxRes=await fetch(`/api/water-mountain-index?mountain=${encodeURIComponent(p.name)}`,{cache:'no-store'});
    const idx=await idxRes.json().catch(()=>({}));
    if(idxRes.ok&&idx?.entry?.checked===true){
      const yes=!!idx.entry.available;mountainWaterAvailabilityMemory.set(p.name,yes);
      const current=box.querySelector('.national-rich-hero h3')?.textContent?.trim();
      if(current===p.name)waterBtn.classList.toggle('hidden',!yes);
      return;
    }
    // Before the first GitHub Actions audit (or when that mountain had an audit
    // error), retain the existing live summit-nearby check as a safe fallback.
    const res=await fetch('/api/route-extras-availability',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mountain:p.name,points:[{name:p.name,lat:p.lat,lon:p.lon}]})});
    const data=await res.json().catch(()=>({}));
    const yes=!!(res.ok&&data?.water);mountainWaterAvailabilityMemory.set(p.name,yes);
    const current=box.querySelector('.national-rich-hero h3')?.textContent?.trim();
    if(current===p.name)waterBtn.classList.toggle('hidden',!yes);
  }catch(_){mountainWaterAvailabilityMemory.set(p.name,false);}
}

// V1.4.252: fixed water-source list only. Recent report search and status judgement were removed.
function waterPotabilityLabel(value){
  if(value==='confirmed')return '<span class="water-potability confirmed">OSM飲用可登録</span>';
  if(value==='not_drinking')return '<span class="water-potability danger">OSM飲用不可登録</span>';
  return '<span class="water-potability unknown">OSM飲用可否未確認</span>';
}
function openWaterReportModal(){
  const modal=$('waterReportModal');if(!modal)return;
  modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');document.body.classList.add('water-report-open');
}
function closeWaterReportModal(){
  const modal=$('waterReportModal');if(!modal)return;
  modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');document.body.classList.remove('water-report-open');
}
function renderWaterListLoading(mountain){
  const body=$('waterReportBody'),sub=$('waterReportSubtitle');
  if(sub)sub.textContent=`${mountain} / 固定水場一覧を取得中`;
  if(body)body.innerHTML='<div class="water-report-loading"><span class="water-drop-loader" aria-hidden="true">💧</span><strong>固定水場一覧を確認しています</strong><small>GitHub Actionsで監査済みの固定データだけを表示します。</small></div>';
}
function fixedWaterCard(w){
  const meta=[w.kind,`${w.near_point||'ルート付近'}から約${Math.max(0,Math.round(Number(w.distance_m)||0)).toLocaleString()}m`].filter(Boolean).join(' / ');
  const details=w.tags?.description?`<p class="water-osm-description">${esc(w.tags.description)}</p>`:'';
  return `<article class="water-source-card"><div class="water-source-head"><div><span class="water-source-kind">${esc(w.kind||'水場')}</span><h4>${esc(w.name||'水場')}</h4><small>${esc(meta)}</small></div></div><div class="water-source-tags">${waterPotabilityLabel(w.potability)}<span>${esc(w.source_name?`${w.source_name}固定情報`:'OSM固定情報')}</span></div>${details}</article>`;
}
function renderFixedWaterList(mountain,entry){
  const body=$('waterReportBody'),sub=$('waterReportSubtitle');if(!body)return;
  const waters=Array.isArray(entry?.sources)?entry.sources:[];
  if(sub)sub.textContent=`${mountain} / 水場候補 ${waters.length}件`;
  if(entry?.checked!==true){body.innerHTML='<div class="water-report-empty-state"><div class="water-empty-icon">💧</div><h4>この山はまだ固定監査が完了していません</h4><p>未監査を「水場なし」とは扱いません。</p></div>';return;}
  if(!waters.length){body.innerHTML='<div class="water-report-empty-state"><div class="water-empty-icon">💧</div><h4>固定監査で水場候補を確認できませんでした</h4><p>OSM未登録の水場が存在する可能性はあります。</p></div>';return;}
  body.innerHTML=`<div class="water-report-summary"><div><strong>${waters.length}</strong><span>水場候補</span></div><p>固定監査で確認したOpenStreetMap由来の候補です。現在の出水・水量・飲用安全は保証しません。</p></div><div class="water-source-grid">${waters.map(fixedWaterCard).join('')}</div><details class="water-report-notes"><summary>この情報の見方・注意点</summary><ul><li>水場位置・名称・飲用可否はOSM登録属性を整理した固定情報です。</li><li>現在の出水、水量、衛生状態を判定する機能ではありません。</li><li>現地掲示・山小屋・自治体・管理者などの最新情報を優先してください。</li></ul></details>`;
}
async function loadFixedWaterList(mountain){
  if(!mountain){setStatus('先に山を選択してください。',true);return;}
  openWaterReportModal();renderWaterListLoading(mountain);
  try{
    const res=await fetch(`/api/water-mountain-index?mountain=${encodeURIComponent(mountain)}`,{cache:'no-store'});
    const data=await res.json().catch(()=>({}));if(!res.ok)throw new Error(data?.error||`HTTP ${res.status}`);
    renderFixedWaterList(mountain,data?.entry||null);
    logEvent('water_list',{success:true,mountain,metadata:{fixed_catalog:true,water_sources:data?.entry?.sources?.length||0}});
  }catch(e){
    const body=$('waterReportBody');if(body)body.innerHTML=`<div class="water-report-error"><strong>水場一覧を取得できませんでした</strong><p>${esc(e?.message||String(e))}</p></div>`;
  }
}
async function loadWaterReports(){return loadFixedWaterList(currentMountainLabel());}
// V1.4.221: show route-extra buttons only after a lightweight availability check.
let routeExtraAvailabilityTimer=null;
let routeExtraAvailabilityAbort=null;
let routeExtraAvailabilitySeq=0;
const routeExtraAvailabilityMemory=new Map();

function routeExtraAvailabilityPoints(){
  try{
    return collectRouteMapPointsFromForm().filter(p=>Number.isFinite(Number(p.lat))&&Number.isFinite(Number(p.lon))).map(p=>({
      name:String(p.name||'通過地点'),lat:Number(p.lat),lon:Number(p.lon)
    }));
  }catch(_){return [];}
}
function routeExtraAvailabilitySignature(mountain,points){
  return `${mountain}|${points.map(p=>`${p.name}:${p.lat.toFixed(4)},${p.lon.toFixed(4)}`).join('|')}`;
}
function setRouteExtraButtonVisibility({water=false,camera=false}={}){
  $('waterReportBtn')?.classList.toggle('hidden',!water);
  $('routeCameraBtn')?.classList.toggle('hidden',!camera);
}
function resetRouteExtraAvailability(){
  if(routeExtraAvailabilityTimer){clearTimeout(routeExtraAvailabilityTimer);routeExtraAvailabilityTimer=null;}
  routeExtraAvailabilityAbort?.abort();routeExtraAvailabilityAbort=null;
  routeExtraAvailabilitySeq++;
  setRouteExtraButtonVisibility({water:false,camera:false});
}
async function checkRouteExtraAvailabilityNow(){
  const mountain=currentMountainLabel();
  const points=routeExtraAvailabilityPoints();
  if(!mountain||points.length<2){setRouteExtraButtonVisibility();return;}
  try{await ensureCameraResources();}catch(_){}
  const fixedCamera= fixedCamerasForMountain(mountain).length>0;
  setRouteExtraButtonVisibility({water:false,camera:fixedCamera});
  const signature=routeExtraAvailabilitySignature(mountain,points);
  const memo=routeExtraAvailabilityMemory.get(signature);
  if(memo){setRouteExtraButtonVisibility(memo);return;}
  const seq=++routeExtraAvailabilitySeq;
  routeExtraAvailabilityAbort?.abort();
  const controller=new AbortController();routeExtraAvailabilityAbort=controller;
  const timer=setTimeout(()=>controller.abort(),16000);
  try{
    const res=await fetch('/api/route-extras-availability',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mountain,points}),signal:controller.signal});
    if(!res.ok)throw new Error(`HTTP ${res.status}`);
    const data=await res.json();
    if(seq!==routeExtraAvailabilitySeq)return;
    const state={water:!!data?.water,camera:fixedCamera};
    routeExtraAvailabilityMemory.set(signature,state);
    if(routeExtraAvailabilityMemory.size>40)routeExtraAvailabilityMemory.delete(routeExtraAvailabilityMemory.keys().next().value);
    setRouteExtraButtonVisibility(state);
  }catch(_){
    // A failed preflight must never affect route planning. Leave optional buttons hidden.
    if(seq===routeExtraAvailabilitySeq)setRouteExtraButtonVisibility({water:false,camera:fixedCamera});
  }finally{clearTimeout(timer);if(routeExtraAvailabilityAbort===controller)routeExtraAvailabilityAbort=null;}
}
function scheduleRouteExtraAvailability(delay=1800){
  if(routeExtraAvailabilityTimer)clearTimeout(routeExtraAvailabilityTimer);
  setRouteExtraButtonVisibility({water:false,camera:fixedCamerasForMountain(currentMountainLabel()).length>0});
  routeExtraAvailabilityTimer=setTimeout(()=>{routeExtraAvailabilityTimer=null;checkRouteExtraAvailabilityNow();},delay);
}
function setupRouteExtraAvailability(){
  setRouteExtraButtonVisibility();
  const points=$('points');
  points?.addEventListener('change',()=>scheduleRouteExtraAvailability());
  points?.addEventListener('input',()=>scheduleRouteExtraAvailability(2200));
  if(points&&window.MutationObserver){
    new MutationObserver(()=>scheduleRouteExtraAvailability()).observe(points,{childList:true,subtree:true});
  }
  $('mountainPreset')?.addEventListener('change',()=>scheduleRouteExtraAvailability());
  $('representativeCourseSelect')?.addEventListener('change',()=>scheduleRouteExtraAvailability());
}

function routeHasSelectedPoint(){
  const root=$('points');
  if(!root)return false;
  return [...root.querySelectorAll('.point-select')].some(select=>!!selectedCandidate(select.value));
}
function refreshAnalyzeButtonState(){
  const btn=$('analyzeBtn');
  if(!btn||btn.dataset.busy==='1')return;
  const enabled=routeHasSelectedPoint();
  btn.disabled=!enabled;
  btn.setAttribute('aria-disabled',enabled?'false':'true');
  btn.title=enabled?'':'通過ポイントを1地点以上設定してください';
}
function setupAnalyzeButtonState(){
  const root=$('points');
  refreshAnalyzeButtonState();
  root?.addEventListener('change',refreshAnalyzeButtonState);
  root?.addEventListener('input',refreshAnalyzeButtonState);
  if(root&&window.MutationObserver){
    new MutationObserver(refreshAnalyzeButtonState).observe(root,{childList:true,subtree:true});
  }
}

function init(){
  // V1.4.163: app.js is also loaded by the admin data-audit page.
  // Skip the main planner boot when its root controls do not exist.
  if(!$('mountainArea'))return;
  setupInstallApp();
  scheduleNationalOutlookSetup();
  scheduleOptionalResourceWarmup();
  setupWalkingPaceControl();
  setupRouteExtraAvailability();
  setupAnalyzeButtonState();
  const area=$('mountainArea');
  const select=$('mountainPreset');
  const search=$('mountainSearch');
  const list=$('mountainPresetList');
  const existing=Object.keys(MOUNTAIN_PRESETS);
  const hiddenCompat=new Set(['鳳凰山','地蔵ヶ岳']);
  const extra=existing.filter(n=>!JAPAN_300_MOUNTAINS.includes(n)&&!hiddenCompat.has(n));
  const all=[...JAPAN_300_MOUNTAINS,...extra];
  area.innerHTML=`<option value="">山域を選択してください</option>${MOUNTAIN_UI_AREAS.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}`;
  list.innerHTML=all.map(n=>`<option value="${esc(n)}"></option>`).join('');

  const populateMountainSelect=(areaKey,preserve='')=>{
    const names=areaKey?sortMountainsNorthToSouth(all.filter(n=>mountainUiArea(n)===areaKey)):[];
    select.innerHTML=`<option value="">${areaKey?'':'先に山域を選択してください'}</option>${names.map(n=>`<option value="${esc(n)}">${esc(n)}</option>`).join('')}`;
    select.disabled=!areaKey;
    if(preserve&&names.includes(preserve))select.value=preserve;
    const areaName=MOUNTAIN_UI_AREAS.find(([k])=>k===areaKey)?.[1]||'';
    $('mountainCount').textContent=areaKey?`${areaName}：${names.length}座を表示中 / 山名検索なら全国から直接選択できます`:`全国版：日本三百名山300座＋縦走主要ピーク${extra.length}座 / まず山域を選択`;
  };
  area.value=''; select.value=''; search.value=''; populateMountainSelect('');
  refreshRepresentativeCourseButton();
  refreshMountainInfoButton();
  $('loadPoiBtn').addEventListener('click',loadCandidates);
  $('mountainInfoBtn')?.addEventListener('click',openMountainInfoFromPlanner);
  $('representativeCourseBtn')?.addEventListener('click',applyRepresentativeCourse);
  $('representativeCourseBtn')?.addEventListener('mouseenter',()=>renderRepresentativeCourseSummaryNow());
  $('representativeCourseBtn')?.addEventListener('focus',()=>renderRepresentativeCourseSummaryNow());
  $('representativeCourseSelect')?.addEventListener('change',()=>{setRepresentativeCourseSelectedIndex(currentMountainLabel(),Number($('representativeCourseSelect')?.value)||0);renderRepresentativeCourseStaticPreview();});
  $('addPointBtn').addEventListener('click',()=>addManualPointRow());
  $('analyzeBtn').addEventListener('click',analyze);
  $('resultScreenshotBtn')?.addEventListener('click',()=>captureAnalysisResultsScreenshot($('resultScreenshotBtn'),$('resultScreenshotStatus')));
  $('resultScreenshotBtnDesktop')?.addEventListener('click',()=>captureAnalysisResultsScreenshot($('resultScreenshotBtnDesktop'),$('resultScreenshotStatusDesktop')));
  refreshLastAnalysisPanel();

  const resetForMountainChange=()=>{
    candidates=[];
    resetRouteExtraAvailability();
    $('points').innerHTML=''; pointSeq=0;
    const selected=!!select.value.trim();
    $('candidateState').textContent='';
    updateLoadButtonAppearance(false);
    if(selected)REPRESENTATIVE_COURSE_SELECTION.set(canonicalMountainName(select.value),0);
    refreshRepresentativeCourseButton();
    refreshMountainInfoButton();
    renderRepresentativeCourseSummaryNow();
    requestAnimationFrame(()=>renderRepresentativeCourseSummaryNow());
    updateForecastHorizon();
    renderRouteMaps();
  };
  const clearCurrentAnalysisResults=()=>{
    $('results')?.classList.add('hidden');
    $('resultScreenshotToolbarDesktop')?.classList.add('hidden');
    ['weatherCharts','forecastCards','modelDetails','overnightCards','decisionCommentary'].forEach(id=>{const el=$(id);if(el)el.innerHTML='';});
    $('overnightSection')?.classList.add('hidden');
    const mobileShot=$('resultScreenshotStatus'); if(mobileShot)mobileShot.textContent='';
    const desktopShot=$('resultScreenshotStatusDesktop'); if(desktopShot)desktopShot.textContent='';
  };
  $('resultBackToTopBtn')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  $('plannerClearBtn')?.addEventListener('click',()=>{
    area.value='';
    select.value='';
    search.value='';
    populateMountainSelect('');
    resetForMountainChange();
    clearCurrentAnalysisResults();
    const pace=$('walkingPaceRange');
    if(pace&&pace.value!=='100'){
      pace.value='100';
      pace.dispatchEvent(new Event('input',{bubbles:true}));
    }
    setStatus('山行設定をクリアしました。');
    logEvent('planner_clear',{success:true});
  });

  area.addEventListener('change',()=>{
    const current=select.value;
    populateMountainSelect(area.value,current);
    search.value=select.value||'';
    resetForMountainChange();
  });
  select.addEventListener('change',()=>{
    search.value=select.value;
    refreshMountainInfoButton();
    resetForMountainChange();
    logMountainSelected('mountain_select');
  });
  const chooseFromSearch=(q,commit=false)=>{
    if(!q){area.value='';populateMountainSelect('');resetForMountainChange();return false;}
    const hit=all.find(n=>n===q)||(commit?all.find(n=>n.includes(q)):null);
    if(!hit)return false;
    const areaKey=mountainUiArea(hit);
    area.value=areaKey;
    populateMountainSelect(areaKey,hit);
    if(commit)search.value=hit;
    refreshMountainInfoButton();
    resetForMountainChange();
    return true;
  };
  $('lastRouteBtn')?.addEventListener('click',async()=>{
    const data=loadLastRouteSnapshot();
    if(!data?.route?.mountain)return setStatus('復元できる前回ルートがありません。',true);
    try{await restoreRouteSnapshot(data.route,'前回ルート');}
    catch(e){setStatus(`前回ルートを復元できませんでした：${e.message||e}`,true);}
  });
  $('saveRouteBtn')?.addEventListener('click',()=>openSavedRoutesModal(true));
  $('waterReportBtn')?.addEventListener('click',loadWaterReports);
  $('routeCameraBtn')?.addEventListener('click',loadRouteCameras);
  $('routeCameraClose')?.addEventListener('click',closeRouteCameraModal);
  document.querySelectorAll('[data-route-camera-close]').forEach(el=>el.addEventListener('click',closeRouteCameraModal));
  $('waterReportClose')?.addEventListener('click',closeWaterReportModal);
  document.querySelectorAll('[data-water-report-close]').forEach(el=>el.addEventListener('click',closeWaterReportModal));
  $('savedRoutesBtn')?.addEventListener('click',()=>openSavedRoutesModal(false));
  $('classicRoutesBtn')?.addEventListener('click',openClassicRoutesModal);
  $('classicRoutesClose')?.addEventListener('click',closeClassicRoutesModal);
  document.querySelectorAll('[data-classic-routes-close]').forEach(el=>el.addEventListener('click',closeClassicRoutesModal));
  $('savedRouteCreateBtn')?.addEventListener('click',createFavoriteRoute);
  $('savedRoutesClose')?.addEventListener('click',closeSavedRoutesModal);
  document.querySelectorAll('[data-saved-routes-close]').forEach(el=>el.addEventListener('click',closeSavedRoutesModal));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('savedRoutesModal')?.classList.contains('hidden'))closeSavedRoutesModal();if(e.key==='Escape'&&!$('waterReportModal')?.classList.contains('hidden'))closeWaterReportModal();if(e.key==='Escape'&&!$('routeCameraModal')?.classList.contains('hidden'))closeRouteCameraModal();if(e.key==='Escape'&&!$('classicRoutesModal')?.classList.contains('hidden'))closeClassicRoutesModal();});
  refreshSavedRoutesCount();

  search.addEventListener('input',()=>{
    const q=search.value.trim();
    if(!q){area.value='';populateMountainSelect('');resetForMountainChange();return;}
    chooseFromSearch(q,false);
  });
  search.addEventListener('change',()=>{if(chooseFromSearch(search.value.trim(),true))logMountainSelected('mountain_search');});
  $('candidateState').textContent='';
  updateLoadButtonAppearance(false);
  updateForecastHorizon();
  logEvent('page_view',{success:true});
  handleTrailheadAccessDeepLink();
}

// V1.4.242: the trailhead index reuses the exact same access UI as the Mountain Info card.
// trailheads.html links back with ?access=<trailhead>; access.js is then lazy-loaded and the
// normal TratenTrailheadAccess modal is opened. No second access screen is maintained.
function handleTrailheadAccessDeepLink(){
  let params;
  try{params=new URLSearchParams(window.location.search||'');}catch(_){return;}
  const accessName=String(params.get('access')||'').trim();
  if(!accessName)return;
  ensureAccessResources().then(ok=>{
    if(ok&&window.TratenTrailheadAccess?.has?.(accessName)){
      window.TratenTrailheadAccess.open(accessName);
    }else{
      setStatus(`${accessName}のアクセス情報は現在未登録です。`,true);
    }
  }).catch(()=>setStatus(`${accessName}のアクセス情報を読み込めませんでした。`,true));
  try{
    const clean=new URL(window.location.href);
    clean.searchParams.delete('access');
    clean.searchParams.delete('mountain');
    history.replaceState(null,'',clean.pathname+clean.search+clean.hash);
  }catch(_){ }
}

function updateLoadButtonAppearance(loaded){

  const btn=$('loadPoiBtn');
  if(!btn)return;
  const hasMountain=!!$('mountainPreset')?.value?.trim();
  btn.disabled=!hasMountain;
  btn.textContent=loaded?'設計用ポイント表示中':'コースを自分で設計';
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
// V1.4.136: 山頂候補は座標差ではなく山頂名を主キーにして1件へ統合する。
// 同じ山頂が複数カタログから数十〜数百mずれた座標で入っても、UIには1候補だけ表示する。
// 登山口・山小屋は同名別地点があり得るため従来どおり名前＋座標で判定する。
function peakCandidateDedupeKey(name){
  let n=String(name||'').normalize('NFKC').trim();
  try{ n=canonicalMountainName(n)||n; }catch(_){ }
  return n
    .replace(/[\s　]+/g,'')
    .replace(/[・･]/g,'・')
    .replace(/ヶ/g,'ケ')
    .toLowerCase();
}
function dedupeCandidateList(base){
  const seen=new Set();
  return base.filter(Boolean).filter(p=>{
    if(!Object.prototype.hasOwnProperty.call(TYPE_LABEL,p.type))return false;
    let k='';
    if(p.type==='peak'){
      const peakKey=peakCandidateDedupeKey(p.name);
      k=`peak|${peakKey||String(p.name||'').trim()}`;
    }else{
      const lat=Number(p.lat),lon=Number(p.lon);
      const coord=hasResolvedCoord(p)?`${lat.toFixed(4)}|${lon.toFixed(4)}`:`unresolved|${p.name}`;
      k=`${p.type}|${p.name}|${coord}`;
    }
    if(seen.has(k))return false;
    seen.add(k);
    return true;
  });
}
function ensureCenterPeak(list,label,center){
  const peakName=label.replace(/（神奈川）|（鳥取）|（群馬）|（新潟・富山）|（長野）|（岐阜）|（福井）|（栃木）|（奈良）/g,'');
  if(!list.some(p=>p.type==='peak'&&Number.isFinite(Number(p.lat))&&Number.isFinite(Number(p.lon))&&haversineMeters(center.latitude,center.longitude,p.lat,p.lon)<2500)){
    list.unshift({id:'center-peak',type:'peak',name:peakName,lat:center.latitude,lon:center.longitude,elevation:'',distance:0,source:'山頂'});
  }
  return list;
}
// V1.4.66: 北・中央・南アルプス＋八ヶ岳の代表コース。
// ここには固定候補の『地点順』だけを保持し、時刻は既存の確認済みCTから都度計算する。
// 各隣接区間でCTが解決できない場合は代表コース自動入力自体を中止し、+1時間フォールバックを使わない。
const REPRESENTATIVE_COURSES = Object.freeze({
  // 北アルプス（V1.4.63）
  '槍ヶ岳': {label:'上高地・槍沢ルート', points:[
    ['trailhead','上高地','登山口'],['hut','槍沢ロッヂ','山小屋'],['hut','槍ヶ岳山荘','山小屋'],['peak','槍ヶ岳','山頂']
  ]},
  '奥穂高岳': {label:'上高地・涸沢ルート', points:[
    ['trailhead','上高地','登山口'],['hut','横尾山荘','山小屋'],['hut','涸沢ヒュッテ','山小屋'],['hut','穂高岳山荘','山小屋'],['peak','奥穂高岳','山頂']
  ]},
  '燕岳': {label:'中房温泉・合戦尾根ルート', points:[
    ['trailhead','中房温泉登山口','登山口'],['hut','合戦小屋','山小屋'],['hut','燕山荘','山小屋'],['peak','燕岳','山頂']
  ]},
  '常念岳': {label:'一ノ沢ルート', points:[
    ['trailhead','一ノ沢登山口','登山口'],['hut','常念小屋','山小屋'],['peak','常念岳','山頂']
  ]},
  '蝶ヶ岳': {label:'三股ルート', points:[
    ['trailhead','三股登山口','登山口'],['peak','蝶ヶ岳','山頂']
  ]},
  '白馬岳': {label:'猿倉・大雪渓ルート', points:[
    ['trailhead','猿倉','登山口'],['hut','白馬尻小屋跡','山小屋'],['hut','白馬山荘','山小屋'],['peak','白馬岳','山頂']
  ]},
  '唐松岳': {label:'八方尾根ルート', points:[
    ['trailhead','八方池山荘','登山口'],['hut','唐松岳頂上山荘','山小屋'],['peak','唐松岳','山頂']
  ]},
  '剱岳': {label:'室堂・別山尾根ルート', points:[
    ['trailhead','室堂','登山口'],['hut','剱澤小屋','山小屋'],['hut','剣山荘','山小屋'],['peak','剱岳','山頂']
  ]},
  '五竜岳': {label:'アルプス平ルート', points:[
    ['trailhead','アルプス平','登山口'],['hut','五竜山荘','山小屋'],['peak','五竜岳','山頂']
  ]},
  '立山': {label:'室堂・一ノ越・雄山ルート', points:[
    ['trailhead','室堂','登山口'],['hut','一の越山荘','山小屋'],['peak','立山（雄山）','山頂']
  ]},
  '薬師岳': {label:'折立・太郎平ルート', points:[
    ['trailhead','折立登山口','登山口'],['hut','太郎平小屋','山小屋'],['hut','薬師岳山荘','山小屋'],['peak','薬師岳','山頂']
  ]},
  '黒部五郎岳': {label:'折立・太郎平ルート', points:[
    ['trailhead','折立登山口','登山口'],['hut','太郎平小屋','山小屋'],['peak','黒部五郎岳','山頂']
  ]},

  // 中央アルプス（V1.4.66）
  '木曽駒ヶ岳': {label:'千畳敷ルート', points:[
    ['trailhead','千畳敷','登山口'],['peak','木曽駒ヶ岳','山頂']
  ]},
  '宝剣岳': {label:'千畳敷・宝剣岳ルート', points:[
    ['trailhead','千畳敷','登山口'],['peak','宝剣岳','山頂']
  ]},
  '檜尾岳': {label:'千畳敷・宝剣岳縦走ルート', points:[
    ['trailhead','千畳敷','登山口'],['peak','宝剣岳','山頂'],['peak','檜尾岳','山頂']
  ]},
  '熊沢岳': {label:'千畳敷・中央アルプス縦走ルート', points:[
    ['trailhead','千畳敷','登山口'],['peak','宝剣岳','山頂'],['peak','檜尾岳','山頂'],['peak','熊沢岳','山頂']
  ]},
  '東川岳': {label:'千畳敷・中央アルプス縦走ルート', points:[
    ['trailhead','千畳敷','登山口'],['peak','宝剣岳','山頂'],['peak','檜尾岳','山頂'],['peak','熊沢岳','山頂'],['peak','東川岳','山頂']
  ]},
  '空木岳': {label:'千畳敷・中央アルプス縦走ルート', points:[
    ['trailhead','千畳敷','登山口'],['peak','宝剣岳','山頂'],['peak','檜尾岳','山頂'],['peak','熊沢岳','山頂'],['peak','東川岳','山頂'],['hut','木曽殿山荘','山小屋'],['peak','空木岳','山頂']
  ]},

  // 南アルプス（V1.4.66）
  '甲斐駒ヶ岳': {label:'北沢峠ルート', points:[
    ['trailhead','北沢峠','登山口'],['peak','甲斐駒ヶ岳','山頂']
  ]},
  '仙丈ヶ岳': {label:'北沢峠・小仙丈ルート', points:[
    ['trailhead','北沢峠','登山口'],['peak','仙丈ヶ岳','山頂']
  ]},
  '北岳': {label:'広河原・草すべりルート', points:[
    ['trailhead','広河原','登山口'],['hut','白根御池小屋','山小屋'],['hut','北岳肩の小屋','山小屋'],['peak','北岳','山頂']
  ]},
  '間ノ岳': {label:'広河原・北岳縦走ルート', points:[
    ['trailhead','広河原','登山口'],['hut','白根御池小屋','山小屋'],['hut','北岳肩の小屋','山小屋'],['peak','北岳','山頂'],['hut','北岳山荘','山小屋'],['peak','間ノ岳','山頂']
  ]},
  '農鳥岳': {label:'広河原・白峰三山縦走ルート', points:[
    ['trailhead','広河原','登山口'],['hut','白根御池小屋','山小屋'],['hut','北岳肩の小屋','山小屋'],['peak','北岳','山頂'],['hut','北岳山荘','山小屋'],['peak','間ノ岳','山頂'],['hut','農鳥小屋','山小屋'],['peak','農鳥岳','山頂']
  ]},
  '塩見岳': {label:'鳥倉・三伏峠ルート', points:[
    ['trailhead','鳥倉登山口','登山口'],['hut','三伏峠小屋','山小屋'],['hut','塩見小屋','山小屋'],['peak','塩見岳','山頂']
  ]},
  '薬師岳(鳳凰)': {label:'夜叉神・南御室ルート', points:[
    ['trailhead','夜叉神峠登山口','登山口'],['hut','南御室小屋','山小屋'],['peak','薬師岳(鳳凰)','山頂']
  ]},
  '観音岳(鳳凰)': {label:'夜叉神・鳳凰三山ルート', points:[
    ['trailhead','夜叉神峠登山口','登山口'],['hut','南御室小屋','山小屋'],['peak','薬師岳(鳳凰)','山頂'],['peak','観音岳(鳳凰)','山頂']
  ]},
  '地蔵岳(鳳凰)': {label:'夜叉神・鳳凰三山縦走ルート', points:[
    ['trailhead','夜叉神峠登山口','登山口'],['hut','南御室小屋','山小屋'],['peak','薬師岳(鳳凰)','山頂'],['peak','観音岳(鳳凰)','山頂'],['peak','地蔵岳(鳳凰)','山頂']
  ]},
  '荒川岳': {label:'椹島・千枚小屋ルート', points:[
    ['trailhead','椹島','登山口'],['hut','千枚小屋','山小屋'],['peak','荒川岳','山頂']
  ]},

  // 八ヶ岳（V1.4.66）
  '編笠山': {label:'観音平ルート', points:[
    ['trailhead','観音平','登山口'],['peak','編笠山','山頂']
  ]},
  '権現岳': {label:'観音平・編笠山ルート', points:[
    ['trailhead','観音平','登山口'],['peak','編笠山','山頂'],['hut','青年小屋','山小屋'],['peak','権現岳','山頂']
  ]},
  '天狗岳': {label:'渋の湯・黒百合ヒュッテルート', points:[
    ['trailhead','渋の湯','登山口'],['hut','黒百合ヒュッテ','山小屋'],['peak','天狗岳','山頂']
  ]},
  '北横岳': {label:'北八ヶ岳ロープウェイルート', points:[
    ['trailhead','北八ヶ岳ロープウェイ山頂駅','登山口'],['hut','北横岳ヒュッテ','山小屋'],['peak','北横岳','山頂']
  ]},
  '蓼科山': {label:'七合目登山口ルート', points:[
    ['trailhead','蓼科山七合目登山口','登山口'],['hut','蓼科山頂ヒュッテ','山小屋'],['peak','蓼科山','山頂']
  ]},
  '茶臼岳（那須岳）': [
    {label:'峠の茶屋・茶臼岳ルート', points:[['trailhead','峠の茶屋・那須岳登山口','登山口'],['peak','茶臼岳（那須岳）','山頂']]},
    {label:'那須ロープウェイ・峠の茶屋側ルート', points:[['trailhead','那須ロープウェイ・峠の茶屋側','登山口'],['peak','茶臼岳（那須岳）','山頂']]}
  ],
  '丹沢山': [
    {label:'大倉・塔ノ岳・丹沢山ルート', points:[['trailhead','大倉登山口','登山口'],['peak','塔ノ岳','山頂'],['peak','丹沢山','山頂']]},
    {label:'戸沢出合・塔ノ岳・丹沢山ルート', points:[['trailhead','戸沢出合','登山口'],['peak','塔ノ岳','山頂'],['peak','丹沢山','山頂']]}
  ]
});

// V1.4.66: 三百名山一括監査で確認済みCTが連続する代表コースを追加。
const AUTO_REPRESENTATIVE_COURSES_V1466 = Object.freeze({
  '雄阿寒岳': [{label:'滝口・雄阿寒岳ルート', points:[['trailhead','滝口・雄阿寒岳登山口','登山口'],['peak','雄阿寒岳','山頂']]}],
  '天塩岳': [{label:'天塩岳ヒュッテルート', points:[['trailhead','天塩岳ヒュッテ登山口','登山口'],['peak','天塩岳','山頂']]}],
  'ニセイカウシュッペ山': [{label:'ニセイカウシュッペ山（古川林道・西尾根）ルート', points:[['trailhead','ニセイカウシュッペ山登山口（古川林道・西尾根）','登山口'],['peak','ニセイカウシュッペ山','山頂']]}],
  '石狩岳': [{label:'シュナイダーコース（音更川二十一ノ沢出合）ルート', points:[['trailhead','シュナイダーコース登山口（音更川二十一ノ沢出合）','登山口'],['peak','石狩岳','山頂']]}],
  'トムラウシ山': [{label:'トムラウシ短縮コースルート', points:[['trailhead','トムラウシ短縮コース登山口','登山口'],['peak','トムラウシ山','山頂']]}],
  '夕張岳': [{label:'冷水・馬の背（夕張岳ヒュッテ）ルート', points:[['trailhead','冷水・馬の背登山口（夕張岳ヒュッテ）','登山口'],['peak','夕張岳','山頂']]}],
  '暑寒別岳': [{label:'暑寒荘・暑寒別岳ルート', points:[['trailhead','暑寒荘・暑寒別岳登山口','登山口'],['peak','暑寒別岳','山頂']]}],
  '樽前山': [{label:'7合目ルート', points:[['trailhead','7合目登山口','登山口'],['peak','樽前山','山頂']]}],
  'ニセコアンヌプリ': [{label:'五色温泉インフォメーションセンタールート', points:[['trailhead','五色温泉インフォメーションセンター','登山口'],['peak','ニセコアンヌプリ','山頂']]}],
  '狩場山': [{label:'千走ルート', points:[['trailhead','千走登山口','登山口'],['peak','狩場山','山頂']]}],
  '岩木山': [{label:'岩木山八合目ルート', points:[['trailhead','岩木山八合目','登山口'],['peak','岩木山','山頂']]}],
  '白神岳': [{label:'白神岳駐車場ルート', points:[['trailhead','白神岳登山口駐車場','登山口'],['peak','白神岳','山頂']]}],
  '八幡平': [{label:'八幡平見返峠・山頂レストハウスルート', points:[['trailhead','八幡平見返峠・山頂レストハウス','登山口'],['peak','八幡平','山頂']]}],
  '早池峰山': [{label:'小田越ルート', points:[['trailhead','小田越登山口','登山口'],['peak','早池峰山','山頂']]}],
  '焼石岳': [{label:'中沼ルート', points:[['trailhead','中沼登山口','登山口'],['peak','焼石岳','山頂']]}],
  '神室山': [{label:'有屋ルート', points:[['trailhead','有屋登山口','登山口'],['peak','神室山','山頂']]}],
  '祝瓶山': [{label:'祝瓶山荘駐車場・桑住平ルートルート', points:[['trailhead','祝瓶山荘駐車場・桑住平ルート','登山口'],['peak','祝瓶山','山頂']]}],
  '蔵王山（熊野岳）': [{label:'蔵王ロープウェイ地蔵山頂駅ルート', points:[['trailhead','蔵王ロープウェイ地蔵山頂駅','登山口'],['peak','蔵王山（熊野岳）','山頂']]}],
  '一切経山': [{label:'浄土平ルート', points:[['trailhead','浄土平','登山口'],['peak','一切経山','山頂']]}],
  '安達太良山': [{label:'奥岳・あだたら山ロープウェイルート', points:[['trailhead','奥岳登山口・あだたら山ロープウェイ','登山口'],['peak','安達太良山','山頂']]}],
  '帝釈山': [{label:'馬坂峠ルート', points:[['trailhead','馬坂峠','登山口'],['peak','帝釈山','山頂']]}],
  '会津駒ヶ岳': [{label:'滝沢ルート', points:[['trailhead','滝沢登山口','登山口'],['peak','会津駒ヶ岳','山頂']]}],
  '二王子岳': [{label:'二王子神社ルート', points:[['trailhead','二王子神社登山口','登山口'],['peak','二王子岳','山頂']]}],
  '粟ヶ岳': [{label:'粟ヶ岳中央（県民休養地）ルート', points:[['trailhead','粟ヶ岳中央登山口（県民休養地）','登山口'],['peak','粟ヶ岳','山頂']]}],
  '御神楽岳': [{label:'室谷ルート', points:[['trailhead','室谷登山口','登山口'],['peak','御神楽岳','山頂']]}],
  '守門岳': [{label:'二口ルート', points:[['trailhead','二口登山口','登山口'],['peak','守門岳','山頂']]},{label:'保久礼ルート', points:[['trailhead','保久礼登山口','登山口'],['peak','守門岳','山頂']]}],
  '浅草岳': [{label:'ネズモチ平駐車場ルート', points:[['trailhead','ネズモチ平登山口駐車場','登山口'],['peak','浅草岳','山頂']]}],
  '平ヶ岳': [{label:'鷹ノ巣・平ヶ岳ルート', points:[['trailhead','鷹ノ巣・平ヶ岳登山口','登山口'],['peak','平ヶ岳','山頂']]}],
  '越後駒ヶ岳': [{label:'枝折峠ルート', points:[['trailhead','枝折峠','登山口'],['peak','越後駒ヶ岳','山頂']]}],
  '中ノ岳': [{label:'十字峡登山センタールート', points:[['trailhead','十字峡登山センター','登山口'],['peak','中ノ岳','山頂']]}],
  '苗場山': [{label:'小赤沢三合目ルート', points:[['trailhead','小赤沢三合目登山口','登山口'],['peak','苗場山','山頂']]}],
  '佐武流山': [{label:'ドロノ木平ルート', points:[['trailhead','ドロノ木平登山口','登山口'],['peak','佐武流山','山頂']]}],
  '鳥甲山': [{label:'ムジナ平ルート', points:[['trailhead','ムジナ平登山口','登山口'],['peak','鳥甲山','山頂']]},{label:'屋敷口ルート', points:[['trailhead','屋敷口','登山口'],['peak','鳥甲山','山頂']]}],
  '金北山': [{label:'白雲台交流センタールート', points:[['trailhead','白雲台交流センター','登山口'],['peak','金北山','山頂']]}],
  '米山': [{label:'大平ルート', points:[['trailhead','大平登山口','登山口'],['peak','米山','山頂']]}],
  '至仏山': [{label:'鳩待峠ルート', points:[['trailhead','鳩待峠','登山口'],['peak','至仏山','山頂']]}],
  '男体山': [{label:'二荒山神社中宮祠ルート', points:[['trailhead','二荒山神社中宮祠登山口','登山口'],['peak','男体山','山頂']]}],
  '太郎山': [{label:'山王峠・太郎山ルート', points:[['trailhead','山王峠・太郎山登山口','登山口'],['peak','太郎山','山頂']]}],
  '武尊山': [{label:'川場谷野営場ルート', points:[['trailhead','川場谷野営場登山口','登山口'],['peak','武尊山','山頂']]}],
  '赤城山（黒檜山）': [{label:'黒檜山ルート', points:[['trailhead','黒檜山登山口','登山口'],['peak','赤城山（黒檜山）','山頂']]}],
  '浅間隠山': [{label:'浅間隠山（二度上峠付近）ルート', points:[['trailhead','浅間隠山登山口（二度上峠付近）','登山口'],['peak','浅間隠山','山頂']]}],
  '巻機山': [{label:'桜坂ルート', points:[['trailhead','桜坂登山口','登山口'],['peak','巻機山','山頂']]}],
  '四阿山': [{label:'菅平牧場ルート', points:[['trailhead','菅平牧場登山口','登山口'],['peak','四阿山','山頂']]}],
  '入笠山': [{label:'沢入ルート', points:[['trailhead','沢入登山口','登山口'],['peak','入笠山','山頂']]}],
  '霧ヶ峰（車山）': [{label:'車山肩ルート', points:[['trailhead','車山肩','登山口'],['peak','霧ヶ峰（車山）','山頂']]}],
  '鉢伏山': [{label:'扉温泉ルート', points:[['trailhead','扉温泉','登山口'],['peak','鉢伏山','山頂']]}],
  '飯縄山': [{label:'一の鳥居苑地・飯縄山登山者駐車場ルート', points:[['trailhead','一の鳥居苑地・飯縄山登山者駐車場','登山口'],['peak','飯縄山','山頂']]}],
  '戸隠山': [{label:'戸隠神社奥社ルート', points:[['trailhead','戸隠神社奥社登山口','登山口'],['peak','戸隠山','山頂']]}],
  '高妻山': [{label:'戸隠キャンプ場・高妻山登山者駐車場ルート', points:[['trailhead','戸隠キャンプ場・高妻山登山者駐車場','登山口'],['peak','高妻山','山頂']]}],
  '妙高山': [{label:'笹ヶ峰ルート', points:[['trailhead','笹ヶ峰登山口','登山口'],['peak','妙高山','山頂']]}],
  '火打山': [{label:'笹ヶ峰ルート', points:[['trailhead','笹ヶ峰登山口','登山口'],['hut','高谷池ヒュッテ','山小屋'],['peak','火打山','山頂']]}],
  '雨飾山': [{label:'雨飾高原キャンプ場ルート', points:[['trailhead','雨飾高原キャンプ場登山口','登山口'],['peak','雨飾山','山頂']]}],
  '鹿島槍ヶ岳': [{label:'アルプス平ルート', points:[['trailhead','アルプス平','登山口'],['hut','五竜山荘','山小屋'],['peak','五竜岳','山頂'],['hut','キレット小屋','山小屋'],['peak','鹿島槍ヶ岳','山頂']]}],
  '野口五郎岳': [{label:'高瀬ダムルート', points:[['trailhead','高瀬ダム','登山口'],['hut','烏帽子小屋','山小屋'],['peak','野口五郎岳','山頂']]}],
  '三俣蓮華岳': [{label:'新穂高温泉ルート', points:[['trailhead','新穂高温泉','登山口'],['hut','鏡平山荘','山小屋'],['hut','双六小屋','山小屋'],['peak','三俣蓮華岳','山頂']]}],
  '小秀山': [{label:'乙女渓谷（小秀山）ルート', points:[['trailhead','乙女渓谷（小秀山登山口）','登山口'],['peak','小秀山','山頂']]}],
  '奥三界岳': [{label:'川上林道ゲート（夕森渓谷）ルート', points:[['trailhead','川上林道ゲート（夕森渓谷）','登山口'],['peak','奥三界岳','山頂']]}],
  '経ヶ岳（長野）': [{label:'権兵衛峠ルート', points:[['trailhead','権兵衛峠登山口','登山口'],['peak','経ヶ岳','山頂']]}],
  '恵那山': [{label:'神坂峠ルート', points:[['trailhead','神坂峠登山口','登山口'],['peak','恵那山','山頂']]}],
  '武甲山': [{label:'生川・一の鳥居ルート', points:[['trailhead','生川・一の鳥居','登山口'],['peak','武甲山','山頂']]}],
  '両神山': [{label:'日向大谷口ルート', points:[['trailhead','日向大谷口','登山口'],['peak','両神山','山頂']]}],
  '雲取山': [{label:'鴨沢ルート', points:[['trailhead','鴨沢登山口','登山口'],['peak','雲取山','山頂']]}],
  '甲武信ヶ岳': [{label:'毛木平ルート', points:[['trailhead','毛木平登山口','登山口'],['peak','甲武信ヶ岳','山頂']]}],
  '国師ヶ岳': [{label:'大弛峠ルート', points:[['trailhead','大弛峠','登山口'],['peak','国師ヶ岳','山頂']]}],
  '金峰山': [{label:'大弛峠ルート', points:[['trailhead','大弛峠','登山口'],['peak','金峰山','山頂']]}],
  '瑞牆山': [{label:'瑞牆山荘・富士見平口ルート', points:[['trailhead','瑞牆山荘・富士見平口','登山口'],['peak','瑞牆山','山頂']]}],
  '茅ヶ岳': [{label:'深田記念公園・茅ヶ岳ルート', points:[['trailhead','深田記念公園・茅ヶ岳登山口','登山口'],['peak','茅ヶ岳','山頂']]}],
  '乾徳山': [{label:'徳和・乾徳山ルート', points:[['trailhead','徳和・乾徳山登山口','登山口'],['peak','乾徳山','山頂']]}],
  '大菩薩嶺': [{label:'上日川峠ルート', points:[['trailhead','上日川峠','登山口'],['peak','大菩薩嶺','山頂']]}],
  '大山（神奈川）': [{label:'ヤビツ峠ルート', points:[['trailhead','ヤビツ峠','登山口'],['peak','大山（神奈川）','山頂']]}],
  '塔ノ岳': [{label:'大倉ルート', points:[['trailhead','大倉登山口','登山口'],['peak','塔ノ岳','山頂']]}],
  '山伏': [{label:'百畳峠（百畳平）駐車場・山伏ルート', points:[['trailhead','百畳峠（百畳平）駐車場・山伏登山口','登山口'],['peak','山伏','山頂']]}],
  '御正体山': [{label:'道坂トンネル都留側駐車場・御正体山ルート', points:[['trailhead','道坂トンネル都留側駐車場・御正体山登山口','登山口'],['peak','御正体山','山頂']]}],
  '赤石岳': [{label:'椹島ルート', points:[['trailhead','椹島','登山口'],['hut','千枚小屋','山小屋'],['peak','荒川岳','山頂'],['hut','荒川小屋','山小屋'],['peak','赤石岳','山頂']]}],
  '白木峰': [{label:'白木峰8合目駐車場ルート', points:[['trailhead','白木峰8合目駐車場','登山口'],['peak','白木峰','山頂']]}],
  '人形山': [{label:'人形堂・中根平ルート', points:[['trailhead','人形堂・中根平登山口','登山口'],['peak','人形山','山頂']]}],
  '経ヶ岳（福井）': [{label:'奥越高原青少年自然の家ルート', points:[['trailhead','奥越高原青少年自然の家','登山口'],['peak','経ヶ岳（福井）','山頂']]}],
  '大日ヶ岳': [{label:'桧峠 大日ヶ岳ルート', points:[['trailhead','桧峠 大日ヶ岳登山口','登山口'],['peak','大日ヶ岳','山頂']]}],
  '鷲ヶ岳': [{label:'鷲ヶ岳立石キャンプ場（林道ルート起点）ルート', points:[['trailhead','鷲ヶ岳立石キャンプ場（林道ルート起点）','登山口'],['peak','鷲ヶ岳','山頂']]}],
  '位山': [{label:'ダナ平林道ルート', points:[['trailhead','ダナ平林道登山口','登山口'],['peak','位山','山頂']]}],
  '荒島岳': [{label:'勝原コースルート', points:[['trailhead','勝原コース登山口','登山口'],['peak','荒島岳','山頂']]},{label:'中出コースルート', points:[['trailhead','中出コース登山口','登山口'],['peak','荒島岳','山頂']]}],
  '冠山': [{label:'冠山峠ルート', points:[['trailhead','冠山峠','登山口'],['peak','冠山','山頂']]}],
  '高見山': [{label:'高見峠ルート', points:[['trailhead','高見峠','登山口'],['peak','高見山','山頂']]}],
  '八経ヶ岳': [{label:'行者還トンネル西口ルート', points:[['trailhead','行者還トンネル西口','登山口'],['hut','弥山小屋','山小屋'],['peak','八経ヶ岳','山頂']]}],
  '大和葛城山': [{label:'水越峠ルート', points:[['trailhead','水越峠','登山口'],['peak','大和葛城山','山頂']]}],
  '瓶ヶ森': [{label:'瓶ヶ森駐車場ルート', points:[['trailhead','瓶ヶ森駐車場','登山口'],['peak','瓶ヶ森','山頂']]}],
  '久住山': [{label:'牧ノ戸峠ルート', points:[['trailhead','牧ノ戸峠','登山口'],['hut','久住分かれ避難小屋','山小屋'],['peak','久住山','山頂']]}],
});

// V1.4.66: 主要山の複数代表コース。
const EXTRA_REPRESENTATIVE_COURSES_V1466 = Object.freeze({
  '槍ヶ岳': [
    {label:'新穂高・槍平ルート', points:[['trailhead','新穂高温泉','登山口'],['hut','槍平小屋','山小屋'],['hut','槍ヶ岳山荘','山小屋'],['peak','槍ヶ岳','山頂']]}
  ],
  '剱岳': [
    {label:'馬場島・早月尾根ルート', points:[['trailhead','馬場島（早月尾根登山口）','登山口'],['hut','早月小屋','山小屋'],['peak','剱岳','山頂']]}
  ],
  '五竜岳': [
    {label:'八方尾根・唐松岳経由ルート', points:[['trailhead','八方池山荘','登山口'],['hut','唐松岳頂上山荘','山小屋'],['hut','五竜山荘','山小屋'],['peak','五竜岳','山頂']]}
  ],
  // V1.4.194: 白馬村公式モデルコースに沿った栂池自然園側の代表コースを追加。
  // 既存固定ポイントと確認済みCTのみを使用し、座標推測は行わない。
  '白馬岳': [
    {label:'栂池自然園・白馬大池ルート', points:[['trailhead','栂池自然園','登山口'],['hut','白馬大池山荘','山小屋'],['peak','小蓮華山','山頂'],['peak','白馬岳','山頂']]}
  ]
});

// V1.4.200: curated major alternate routes.
// Existing fixed coordinates are reused; route existence was checked against public/official route information.
const EXTRA_REPRESENTATIVE_COURSES_V14199 = Object.freeze({
  '至仏山': [
    {label:'山ノ鼻・東面登山道ルート', points:[['trailhead','山ノ鼻（至仏山東面登山道入口・登り専用）','登山口'],['peak','至仏山','山頂']]}
  ],
  '妙高山': [
    {label:'燕温泉ルート', points:[['trailhead','燕温泉登山口','登山口'],['peak','妙高山','山頂']]}
  ],
  '赤城山（黒檜山）': [
    {label:'駒ヶ岳登山口・駒ヶ岳経由ルート', points:[['trailhead','おのこ駐車場・駒ヶ岳登山口','登山口'],['peak','赤城山（黒檜山）','山頂']]}
  ],
  '瑞牆山': [
    {label:'みずがき山自然公園ルート', points:[['trailhead','みずがき山自然公園','登山口'],['peak','瑞牆山','山頂']]}
  ],
  '金峰山': [
    {label:'瑞牆山荘・富士見平ルート', points:[['trailhead','瑞牆山荘・富士見平口','登山口'],['peak','金峰山','山頂']]}
  ],
  '恵那山': [
    {label:'広河原ルート', points:[['trailhead','広河原登山口・峰越林道ゲート','登山口'],['peak','恵那山','山頂']]}
  ],
  '塔ノ岳': [
    {label:'戸沢出合・天神尾根ルート', points:[['trailhead','戸沢出合','登山口'],['peak','塔ノ岳','山頂']]}
  ],
  '高見山': [
    {label:'たかすみ温泉ルート', points:[['trailhead','たかすみ温泉 高見山登山口','登山口'],['peak','高見山','山頂']]}
  ],
  '大山（神奈川）': [
    {label:'大山ケーブル・阿夫利神社下社ルート', points:[['trailhead','大山ケーブル口・市営第二駐車場','登山口'],['peak','大山（神奈川）','山頂']]}
  ],
  '鹿島槍ヶ岳': [
    {label:'大谷原・赤岩尾根ルート', points:[['trailhead','大谷原登山口','登山口'],['peak','鹿島槍ヶ岳','山頂']]}
  ]
});

// V1.4.201: 代表コース増 第2弾。
// 既存の固定座標を再利用し、主要な別登山口・別アプローチをまとめて追加。
// CTは確認済みを最優先し、未確認区間は既存の推定CTロジックで明示する。
const EXTRA_REPRESENTATIVE_COURSES_V14201 = Object.freeze({
  '富士山': [
    {label:'富士宮ルート', points:[['trailhead','富士宮口五合目','登山口'],['peak','富士山（剣ヶ峰）','山頂']]},
    {label:'御殿場ルート', points:[['trailhead','御殿場口新五合目','登山口'],['peak','富士山（剣ヶ峰）','山頂']]}
  ],
  '筑波山': [
    {label:'筑波山神社・御幸ヶ原ルート', points:[['trailhead','筑波山神社入口','登山口'],['peak','筑波山（女体山）','山頂']]}
  ],
  '岩手山': [
    {label:'焼走りルート', points:[['trailhead','焼走り登山口','登山口'],['peak','岩手山','山頂']]}
  ],
  '鳥海山': [
    {label:'湯ノ台口ルート', points:[['trailhead','湯ノ台口登山口','登山口'],['peak','鳥海山（新山）','山頂']]}
  ],
  '磐梯山': [
    {label:'猪苗代ルート', points:[['trailhead','猪苗代登山口（猪苗代スキー場）','登山口'],['peak','磐梯山','山頂']]}
  ],
  '白山': [
    {label:'大白川・平瀬道ルート', points:[['trailhead','大白川・平瀬道登山口','登山口'],['peak','白山（御前峰）','山頂']]}
  ],
  '白馬岳': [
    {label:'蓮華温泉・白馬大池ルート', points:[['trailhead','蓮華温泉','登山口'],['hut','白馬大池山荘','山小屋'],['peak','小蓮華山','山頂'],['peak','白馬岳','山頂']]}
  ],
  '西穂高岳': [
    {label:'新穂高ロープウェイ・西穂山荘ルート', points:[['trailhead','新穂高ロープウェイ 西穂高口駅','登山口'],['peak','西穂高岳','山頂']]}
  ],
  '笠ヶ岳（岐阜）': [
    {label:'笠新道ルート', points:[['trailhead','笠新道登山口','登山口'],['peak','笠ヶ岳','山頂']]}
  ],
  '金剛山': [
    {label:'千早本道ルート', points:[['trailhead','千早本道登山口','登山口'],['peak','金剛山','山頂']]}
  ],
  '三嶺': [
    {label:'光石ルート', points:[['trailhead','光石登山口','登山口'],['peak','三嶺','山頂']]}
  ],
  '美ヶ原': [
    {label:'山本小屋・王ヶ頭ルート', points:[['trailhead','山本小屋ふる里館・町営駐車場','登山口'],['peak','美ヶ原（王ヶ頭）','山頂']]}
  ],
  '天狗岳': [
    {label:'唐沢鉱泉ルート', points:[['trailhead','唐沢鉱泉','登山口'],['peak','天狗岳','山頂']]}
  ],
  '編笠山': [
    {label:'富士見高原ルート', points:[['trailhead','富士見高原登山口','登山口'],['peak','編笠山','山頂']]}
  ],
  '三瓶山': [
    {label:'北の原・姫逃池ルート', points:[['trailhead','北の原・姫逃池登山口','登山口'],['peak','三瓶山（男三瓶山）','山頂']]}
  ],
  '医王山': [
    {label:'しがらくびルート', points:[['trailhead','しがらくび駐車場','登山口'],['peak','医王山（奥医王山）','山頂']]}
  ],
  '乳頭山（烏帽子岳）': [
    {label:'蟹場温泉ルート', points:[['trailhead','蟹場温泉','登山口'],['peak','乳頭山（烏帽子岳）','山頂']]}
  ],
  'トムラウシ山': [
    {label:'トムラウシ温泉ルート', points:[['trailhead','トムラウシ温泉登山口（東大雪荘）','登山口'],['peak','トムラウシ山','山頂']]}
  ],
  '早池峰山': [
    {label:'岳登山口ルート', points:[['trailhead','岳登山口・岳駐車場','登山口'],['peak','早池峰山','山頂']]}
  ],
  '戸隠山': [
    {label:'戸隠キャンプ場・戸隠牧場ルート', points:[['trailhead','戸隠キャンプ場・戸隠牧場','登山口'],['peak','戸隠山','山頂']]}
  ],
  '雨飾山': [
    {label:'大網ルート', points:[['trailhead','大網登山口','登山口'],['peak','雨飾山','山頂']]}
  ],
  '鹿島槍ヶ岳': [
    {label:'扇沢・柏原新道ルート', points:[['trailhead','扇沢登山口','登山口'],['peak','鹿島槍ヶ岳','山頂']]}
  ],
  '常念岳': [
    {label:'三股ルート', points:[['trailhead','三股登山口','登山口'],['peak','常念岳','山頂']]}
  ],
  '空木岳': [
    {label:'池山尾根ルート', points:[['trailhead','池山口登山口','登山口'],['peak','空木岳','山頂']]}
  ],
  '農鳥岳': [
    {label:'奈良田ルート', points:[['trailhead','奈良田','登山口'],['peak','農鳥岳','山頂']]}
  ],
  '経ヶ岳（福井）': [
    {label:'展望台駐車場ルート', points:[['trailhead','経ヶ岳登山口展望台駐車場','登山口'],['peak','経ヶ岳（福井）','山頂']]}
  ],
  '大日ヶ岳': [
    {label:'高鷲スノーパークルート', points:[['trailhead','高鷲スノーパーク','登山口'],['peak','大日ヶ岳','山頂']]}
  ],
  '位山': [
    {label:'モンデウス飛騨位山ルート', points:[['trailhead','モンデウス飛騨位山','登山口'],['peak','位山','山頂']]}
  ],
  '久住山': [
    {label:'長者原ルート', points:[['trailhead','長者原','登山口'],['peak','久住山','山頂']]}
  ],
  '大船山': [
    {label:'長者原ルート', points:[['trailhead','長者原','登山口'],['peak','大船山','山頂']]}
  ]
});


// V1.5.42: public-source intermediate points for 6:00-7:59 route splitting.
// Coordinates are fixed only where public location data was confirmed; no guessed coordinates.
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '鹿島槍ヶ岳': [
    ...(BUILTIN_ROUTE_CATALOG['鹿島槍ヶ岳']||[]),
    {id:'v1542-kashimayari-takachiho',type:'pass',name:'高千穂平',lat:36.60499,lon:137.76203,elevation:2049,source:'OpenStreetMap公開地点情報・高千穂平'}
  ],
  '針ノ木岳': [
    ...(BUILTIN_ROUTE_CATALOG['針ノ木岳']||[]),
    {id:'v1542-harinoki-osawa',type:'hut',name:'大沢小屋',lat:36.554167,lon:137.705278,elevation:1680,source:'PORTALFIELD公開地点情報（北緯36度33分15秒・東経137度42分19秒）'}
  ],
  '雲取山': [
    ...(BUILTIN_ROUTE_CATALOG['雲取山']||[]),
    {id:'v1542-kumotori-nanatsuishi',type:'hut',name:'七ツ石小屋',lat:35.8275,lon:138.965556,elevation:1591,source:'PORTALFIELD公開地点情報（北緯35度49分39秒・東経138度57分56秒）'}
  ],
  '中ノ岳': [
    ...(BUILTIN_ROUTE_CATALOG['中ノ岳']||[]),
    {id:'v1542-nakanodake-hinatayama',type:'peak',name:'日向山',lat:37.041512,lon:139.033027,elevation:1561,source:'公開山岳地点情報・日向山（1560.8m）'}
  ],
  '以東岳': [
    ...(BUILTIN_ROUTE_CATALOG['以東岳']||[]),
    {id:'v1542-itodake-otori',type:'hut',name:'大鳥小屋',lat:38.366389,lon:139.829722,elevation:973,source:'PORTALFIELD公開地点情報（北緯38度21分59秒・東経139度49分47秒）'}
  ]
});

// V1.5.41: public-source intermediate points for 8:00-9:59 route splitting.
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '大朝日岳': [
    ...(BUILTIN_ROUTE_CATALOG['大朝日岳']||[]),
    {id:'v1541-oasahi-ryumon',type:'hut',name:'竜門小屋',lat:38.295278,lon:139.895278,elevation:1573,source:'PORTALFIELD公開地点情報（北緯38度17分43秒・東経139度53分43秒）'}
  ],
  '霞沢岳': [
    ...(BUILTIN_ROUTE_CATALOG['霞沢岳']||[]),
    {id:'v1541-kasumisawa-tokugo',type:'hut',name:'徳本峠小屋',lat:36.228271,lon:137.678403,elevation:2130,source:'公開山岳地点情報・徳本峠小屋'}
  ],
  '富士山': [
    ...(BUILTIN_ROUTE_CATALOG['富士山']||[]),
    {id:'v1541-fuji-waraji',type:'hut',name:'わらじ館',lat:35.352778,lon:138.742778,elevation:3093,source:'公開山岳地点情報（北緯35度21分10秒・東経138度44分34秒）'}
  ],
  '笊ヶ岳': [
    ...(BUILTIN_ROUTE_CATALOG['笊ヶ岳']||[]),
    {id:'v1541-zaru-nunobiki',type:'peak',name:'布引山（千挺木山）',lat:35.408611,lon:138.258333,elevation:2584,source:'国土地理院・日本の主な山岳（北緯35度24分31秒・東経138度15分30秒）'}
  ]
});

// V1.5.40: resolved intermediate points for long representative routes.
// Coordinates are public-source values; no guessed coordinates are introduced.
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '幌尻岳': [
    ...(BUILTIN_ROUTE_CATALOG['幌尻岳']||[]),
    {id:'v1540-poroshiri-niikappu-hut',type:'hut',name:'新冠ポロシリ山荘',lat:42.690167,lon:142.685083,elevation:787,source:'YAMAP公開ランドマーク / ヤマレコ公開地名座標'}
  ],
  'ペテガリ岳': [
    ...(BUILTIN_ROUTE_CATALOG['ペテガリ岳']||[]),
    {id:'v1540-petegari-hut',type:'hut',name:'ペテガリ山荘',lat:42.477722,lon:142.814972,elevation:399,source:'YAMAP公開ランドマーク / 新ひだか町公式山荘案内'}
  ],
  '飯豊山': [
    ...(BUILTIN_ROUTE_CATALOG['飯豊山']||[]),
    {id:'v1540-iide-kiriawase',type:'hut',name:'切合小屋',lat:37.834575,lon:139.727442,elevation:1740,source:'コンパス公開地点座標 / 切合小屋管理人公式HP'}
  ],
  '南駒ヶ岳': [
    ...(BUILTIN_ROUTE_CATALOG['南駒ヶ岳']||[]),
    {id:'v1540-minamikoma-kosumo',type:'peak',name:'越百山',lat:35.679444,lon:137.803333,elevation:2614,source:'国土地理院・日本の主な山岳'}
  ]
});

const EXTRA_REPRESENTATIVE_COURSES_V1543 = Object.freeze({
  // Yakushima official route already has exact 50m + 270m split via Yodogawa-goya (=5h20 total).
  '宮之浦岳': [{label:'淀川登山口ルート',points:[['trailhead','淀川登山口','登山口'],['hut','淀川小屋','避難小屋'],['peak','宮ノ浦岳','山頂']]}],
  // Replace the obsolete 5h20 opaque Kasa-shindo alternative with the same verified hut split used by the current route.
  '笠ヶ岳（岐阜）': [{label:'笠新道ルート',points:[['trailhead','笠新道登山口','登山口'],['hut','笠ヶ岳山荘','山小屋'],['peak','笠ヶ岳','山頂']]}]
});

const EXTRA_REPRESENTATIVE_COURSES_V1542 = Object.freeze({
  '常念岳': [{label:'三股ルート',points:[['trailhead','三股登山口','登山口'],['peak','前常念岳','通過ピーク'],['peak','常念岳','山頂']]}],
  '爺ヶ岳': [{label:'扇沢登山口ルート',points:[['trailhead','扇沢登山口','登山口'],['hut','種池山荘','山小屋'],['peak','爺ヶ岳','山頂']]}],
  '鹿島槍ヶ岳': [{label:'大谷原登山口ルート',points:[['trailhead','大谷原登山口','登山口'],['pass','高千穂平','通過点'],['hut','冷池山荘','山小屋'],['peak','鹿島槍ヶ岳','山頂']]}],
  '針ノ木岳': [{label:'扇沢登山口ルート',points:[['trailhead','扇沢登山口','登山口'],['hut','大沢小屋','山小屋'],['hut','針ノ木小屋','山小屋'],['peak','針ノ木岳','山頂']]}],
  '雲取山': [{label:'鴨沢ルート',points:[['trailhead','鴨沢登山口','登山口'],['hut','七ツ石小屋','山小屋'],['peak','雲取山','山頂']]}],
  '中ノ岳': [{label:'十字峡登山センタールート',points:[['trailhead','十字峡登山センター','登山口'],['peak','日向山','通過ピーク'],['peak','中ノ岳','山頂']]}],
  '白山': [{label:'市ノ瀬ルート',points:[['trailhead','市ノ瀬','登山口'],['hut','白山室堂','山小屋'],['peak','白山（御前峰）','山頂']]}],
  '以東岳': [{label:'泡滝ダム・大鳥登山口ルート',points:[['trailhead','泡滝ダム・大鳥登山口','登山口'],['hut','大鳥小屋','山小屋'],['peak','以東岳','山頂']]}],
  '八海山': [{label:'八海山・屏風道二合目登山口ルート',points:[['trailhead','八海山・屏風道二合目登山口','登山口'],['hut','八海山千本檜小屋','山小屋'],['peak','八海山（入道岳）','山頂']]}],
  '水晶岳（黒岳）': [{label:'折立登山口ルート',points:[['trailhead','折立登山口','登山口'],['hut','太郎平小屋','山小屋'],['hut','薬師沢小屋','山小屋'],['hut','雲ノ平山荘','山小屋'],['peak','水晶岳','山頂']]}],
  '鷲羽岳': [{label:'折立登山口ルート',points:[['trailhead','折立登山口','登山口'],['hut','太郎平小屋','山小屋'],['hut','薬師沢小屋','山小屋'],['hut','雲ノ平山荘','山小屋'],['peak','鷲羽岳','山頂']]}],
  '赤牛岳': [{label:'折立登山口ルート',points:[['trailhead','折立登山口','登山口'],['hut','太郎平小屋','山小屋'],['hut','薬師沢小屋','山小屋'],['hut','雲ノ平山荘','山小屋'],['peak','水晶岳','通過ピーク'],['peak','赤牛岳','山頂']]}]
});

const EXTRA_REPRESENTATIVE_COURSES_V1541 = Object.freeze({
  'オプタテシケ山': [
    {label:'美瑛富士登山口ルート',points:[['trailhead','美瑛富士登山口','登山口'],['hut','美瑛富士避難小屋','避難小屋'],['peak','オプタテシケ山','山頂']]},
    {label:'望岳台ルート',points:[['trailhead','望岳台','登山口'],['peak','オプタテシケ山','山頂']],allowMissingCt:true,generated:true}
  ],
  '大朝日岳': [{label:'日暮沢・竜門ルート',points:[['trailhead','日暮沢登山口駐車場（日暮沢小屋）','登山口'],['hut','竜門小屋','避難小屋'],['peak','大朝日岳','山頂']]}],
  '皇海山': [{label:'銀山平・庚申山ルート',points:[['trailhead','銀山平・皇海山登山者駐車場','登山口'],['hut','庚申山荘（避難小屋）','避難小屋'],['peak','皇海山','山頂']]}],
  '鹿島槍ヶ岳': [{label:'扇沢・柏原新道ルート',points:[['trailhead','扇沢登山口','登山口'],['hut','種池山荘','山小屋'],['hut','冷池山荘','山小屋'],['peak','鹿島槍ヶ岳','山頂']]}],
  '笠ヶ岳（岐阜）': [{label:'新穂高温泉・笠新道ルート',points:[['trailhead','新穂高温泉','登山口'],['trailhead','笠新道登山口','登山口'],['hut','笠ヶ岳山荘','山小屋'],['peak','笠ヶ岳（岐阜）','山頂']]}],
  '霞沢岳': [{label:'上高地・徳本峠ルート',points:[['trailhead','上高地','登山口'],['hut','徳本峠小屋','山小屋'],['peak','霞沢岳','山頂']]}],
  '安平路山': [
    {label:'大平宿・摺古木自然園ルート',points:[['trailhead','大平宿（林道規制時起点）','起点'],['trailhead','摺古木自然園入口','登山口'],['peak','安平路山','山頂']]},
    {label:'摺古木自然園入口ルート',points:[['trailhead','摺古木自然園入口','登山口'],['peak','安平路山','山頂']],allowMissingCt:true,generated:true}
  ],
  '富士山': [{label:'御殿場ルート',points:[['trailhead','御殿場口新五合目','登山口'],['hut','わらじ館','山小屋'],['peak','富士山（剣ヶ峰）','山頂']]}],
  '農鳥岳': [{label:'奈良田・大門沢ルート',points:[['trailhead','奈良田','登山口'],['hut','大門沢小屋','山小屋'],['peak','農鳥岳','山頂']]}],
  '聖岳': [{label:'椹島・聖平ルート',points:[['trailhead','椹島','登山口'],['hut','聖平小屋','山小屋'],['peak','聖岳','山頂']]}],
  '上河内岳': [{label:'沼平・茶臼小屋ルート',points:[['trailhead','沼平ゲート','登山口'],['hut','茶臼小屋','山小屋'],['peak','上河内岳','山頂']]}],
  '笊ヶ岳': [{label:'老平ルート',points:[['trailhead','老平・笊ヶ岳登山口','登山口'],['peak','布引山（千挺木山）','通過ピーク'],['peak','笊ヶ岳','山頂']]}]
});

const EXTRA_REPRESENTATIVE_COURSES_V1540 = Object.freeze({
  '幌尻岳': [{label:'イドンナップ山荘駐車場（新冠陽希コース）ルート',points:[['trailhead','イドンナップ山荘駐車場（新冠陽希コース）','登山口'],['hut','新冠ポロシリ山荘','山小屋'],['peak','幌尻岳','山頂']]}],
  'ペテガリ岳': [{label:'神威山荘（ペテガリ岳アプローチ起点）ルート',points:[['trailhead','神威山荘（ペテガリ岳アプローチ起点）','登山口'],['hut','ペテガリ山荘','山小屋'],['peak','ペテガリ岳','山頂']]}],
  '飯豊山': [{label:'大日杉登山口ルート',points:[['trailhead','大日杉登山口','登山口'],['hut','切合小屋','山小屋'],['peak','飯豊山','山頂']]}],
  '水晶岳（黒岳）': [{label:'折立登山口ルート',points:[['trailhead','折立登山口','登山口'],['hut','薬師沢小屋','山小屋'],['hut','雲ノ平山荘','山小屋'],['peak','水晶岳','山頂']]}],
  '鷲羽岳': [{label:'折立登山口ルート',points:[['trailhead','折立登山口','登山口'],['hut','薬師沢小屋','山小屋'],['hut','雲ノ平山荘','山小屋'],['peak','鷲羽岳','山頂']]}],
  '赤牛岳': [{label:'折立登山口ルート',points:[['trailhead','折立登山口','登山口'],['hut','薬師沢小屋','山小屋'],['hut','雲ノ平山荘','山小屋'],['peak','水晶岳','通過ピーク'],['peak','赤牛岳','山頂']]}],
  '南駒ヶ岳': [{label:'伊奈川ダム上登山口ルート',points:[['trailhead','伊奈川ダム上登山口','登山口'],['peak','越百山','通過ピーク'],['peak','南駒ヶ岳','山頂']]}],
  '光岳': [{label:'沼平ゲートルート',points:[['trailhead','沼平ゲート','登山口'],['peak','茶臼岳','通過ピーク'],['peak','光岳','山頂']]}]
});

// V1.5.45: generated endpoint pairs that are not current major summit routes.
const GENERATED_ROUTE_EXCLUSIONS_V1545 = Object.freeze({
  '燧ヶ岳': new Set(['小沢平登山口','山ノ鼻（至仏山東面登山道入口・登り専用）']),
  '草津白根山': new Set(['白根火山・湯釜側起点']),
  '浅間山': new Set(['高峰高原・車坂峠'])
});
function generatedRouteExcludedV1545(mountain,trailheadName){
  return GENERATED_ROUTE_EXCLUSIONS_V1545[canonicalMountainName(mountain)]?.has(String(trailheadName||''))||false;
}

function generatedRepresentativeCourseOptions(mountain){
  // V1.4.77: 未対応山は固定候補の代表登山口→山頂から代表コースを自動生成する。
  // CTが確認済みなら自動加算、未登録なら読み込み自体は許可してCT情報なしを明示する。
  const key=canonicalMountainName(mountain);
  const catalog=BUILTIN_ROUTE_CATALOG[key]||[];
  const trailheads=catalog.filter(p=>p.type==='trailhead'&&hasResolvedCoord(p));
  const peaks=catalog.filter(p=>p.type==='peak'&&hasResolvedCoord(p));
  if(!trailheads.length||!peaks.length)return [];
  const exactPeak=peaks.find(p=>p.name===key)||peaks[0];
  if(!exactPeak)return [];
  const seen=new Set();
  return trailheads.filter(th=>{if(generatedRouteExcludedV1545(key,th.name)||seen.has(th.name))return false;seen.add(th.name);return true;}).slice(0,2).map(th=>({
    label:`${th.name}ルート`,
    points:[['trailhead',th.name,'登山口'],['peak',exactPeak.name,'山頂']],
    allowMissingCt:true,
    generated:true
  }));
}
// V1.4.166: 代表コースの下山側を個別設定。
// 縦走コースは実際の出口へつなぎ、往復コースは往路を逆順にたどって登山口まで戻す。
// これにより「山頂→登山口」の不自然な直結を避け、既存の区間CTをできるだけそのまま利用する。
const REPRESENTATIVE_DESCENT_PATHS_V14166 = Object.freeze({
  // V1.5.42: split verified 6:00-7:59 routes on descent where reverse CTs are also confirmed.
  '常念岳|三股ルート': [['peak','前常念岳','通過ピーク'],['trailhead','三股登山口','下山口']],
  '爺ヶ岳|扇沢登山口ルート': [['hut','種池山荘','山小屋'],['trailhead','扇沢登山口','下山口']],
  '鹿島槍ヶ岳|大谷原登山口ルート': [['trailhead','大谷原登山口','下山口']],
  '針ノ木岳|扇沢登山口ルート': [['hut','針ノ木小屋','山小屋'],['hut','大沢小屋','山小屋'],['trailhead','扇沢登山口','下山口']],
  '雲取山|鴨沢ルート': [['trailhead','鴨沢登山口','下山口']],
  '中ノ岳|十字峡登山センタールート': [['trailhead','十字峡登山センター','下山口']],
  // V1.5.41: use the same practical intermediate points on descent where verified.
  // Where reverse sub-section CT is not independently verified, retain the pre-existing summit-to-trailhead descent instead of inventing a reverse split.
  'オプタテシケ山|美瑛富士登山口ルート': [['trailhead','美瑛富士登山口','下山口']],
  '大朝日岳|日暮沢・竜門ルート': [['trailhead','日暮沢登山口駐車場（日暮沢小屋）','下山口']],
  '皇海山|銀山平・庚申山ルート': [['trailhead','銀山平・皇海山登山者駐車場','下山口']],
  '笠ヶ岳（岐阜）|新穂高温泉・笠新道ルート': [['trailhead','新穂高温泉','下山口']],
  '農鳥岳|奈良田・大門沢ルート': [['hut','大門沢小屋','山小屋'],['trailhead','奈良田','下山口']],
  '聖岳|椹島・聖平ルート': [['trailhead','椹島','下山口']],
  '笊ヶ岳|老平ルート': [['trailhead','老平・笊ヶ岳登山口','下山口']],
  '幌尻岳|イドンナップ山荘駐車場（新冠陽希コース）ルート': [
    ['hut','新冠ポロシリ山荘','山小屋'],['trailhead','イドンナップ山荘駐車場（新冠陽希コース）','下山口']
  ],
  '安平路山|大平宿・摺古木自然園ルート': [
    ['trailhead','摺古木自然園入口','登山口'],['trailhead','大平宿（林道規制時起点）','下山口']
  ],
  '光岳|沼平ゲートルート': [
    ['hut','茶臼小屋','山小屋'],['trailhead','沼平ゲート','下山口']
  ],
  // V1.5.40: 10h+往路を分割した代表コース。復路も不自然な遠回り合算を避ける。
  'ペテガリ岳|神威山荘（ペテガリ岳アプローチ起点）ルート': [
    ['hut','ペテガリ山荘','山小屋'],['trailhead','神威山荘（ペテガリ岳アプローチ起点）','下山口']
  ],
  '飯豊山|大日杉登山口ルート': [['trailhead','大日杉登山口','下山口']],
  '水晶岳（黒岳）|折立登山口ルート': [
    ['hut','雲ノ平山荘','山小屋'],['hut','薬師沢小屋','山小屋'],['hut','太郎平小屋','山小屋'],['trailhead','折立登山口','下山口']
  ],
  '鷲羽岳|折立登山口ルート': [
    ['hut','雲ノ平山荘','山小屋'],['hut','薬師沢小屋','山小屋'],['hut','太郎平小屋','山小屋'],['trailhead','折立登山口','下山口']
  ],
  '赤牛岳|折立登山口ルート': [
    ['peak','水晶岳','通過ピーク'],['hut','雲ノ平山荘','山小屋'],['hut','薬師沢小屋','山小屋'],['hut','太郎平小屋','山小屋'],['trailhead','折立登山口','下山口']
  ],
  '南駒ヶ岳|伊奈川ダム上登山口ルート': [['trailhead','伊奈川ダム上登山口','下山口']],
  // V1.4.201: 代表コース増 第2弾の実用縦走ルート。
  // V1.4.200: 至仏山東面登山道は上り専用。山頂からは鳩待峠側へ下山する。
  '至仏山|山ノ鼻・東面登山道ルート': [
    ['trailhead','鳩待峠','下山口']
  ],
  // 白峰三山：広河原から入り、農鳥岳を越えて奈良田へ抜ける。
  '間ノ岳|広河原・北岳縦走ルート': [
    ['hut','農鳥小屋','山小屋'],['peak','農鳥岳','山頂'],['hut','大門沢小屋','山小屋'],['trailhead','奈良田','下山口']
  ],
  '農鳥岳|広河原・白峰三山縦走ルート': [
    ['hut','大門沢小屋','山小屋'],['trailhead','奈良田','下山口']
  ],

  // 中央アルプス縦走：千畳敷から南下し、空木岳経由で池山尾根側へ下山。
  '檜尾岳|千畳敷・宝剣岳縦走ルート': [
    ['peak','熊沢岳','山頂'],['peak','東川岳','山頂'],['hut','木曽殿山荘','山小屋'],
    ['peak','空木岳','山頂'],['hut','空木駒峰ヒュッテ','山小屋'],
    ['hut','空木平避難小屋','山小屋'],['trailhead','池山口登山口','下山口']
  ],
  '熊沢岳|千畳敷・中央アルプス縦走ルート': [
    ['peak','東川岳','山頂'],['hut','木曽殿山荘','山小屋'],
    ['peak','空木岳','山頂'],['hut','空木駒峰ヒュッテ','山小屋'],
    ['hut','空木平避難小屋','山小屋'],['trailhead','池山口登山口','下山口']
  ],
  '東川岳|千畳敷・中央アルプス縦走ルート': [
    ['hut','木曽殿山荘','山小屋'],['peak','空木岳','山頂'],
    ['hut','空木駒峰ヒュッテ','山小屋'],['hut','空木平避難小屋','山小屋'],
    ['trailhead','池山口登山口','下山口']
  ],
  '空木岳|千畳敷・中央アルプス縦走ルート': [
    ['hut','空木駒峰ヒュッテ','山小屋'],['hut','空木平避難小屋','山小屋'],
    ['trailhead','池山口登山口','下山口']
  ],

  // 後立山：五竜側から鹿島槍へ縦走し、冷池・爺ヶ岳・種池を経て扇沢へ。
  '鹿島槍ヶ岳|アルプス平ルート': [
    ['hut','冷池山荘','山小屋'],['peak','爺ヶ岳','山頂'],
    ['hut','種池山荘','山小屋'],['trailhead','扇沢登山口','下山口']
  ],

  // 南アルプス南部：荒川三山から赤石岳へつなぐ周回は赤石小屋経由で椹島へ戻る。
  '赤石岳|椹島ルート': [
    ['hut','赤石小屋','山小屋'],['trailhead','椹島','下山口']
  ]
});
function representativeCourseWithDescent(mountain,course){
  if(!course||!Array.isArray(course.points)||!course.points.length)return course;
  const points=course.points.map(p=>[...p]);
  const last=points[points.length-1];
  if(last?.[0]==='trailhead')return {...course,points};
  const key=canonicalMountainName(mountain);
  const routeKey=`${key}|${course.label||''}`;
  const explicit=REPRESENTATIVE_DESCENT_PATHS_V14166[routeKey];
  if(Array.isArray(explicit)&&explicit.length){
    const originalPointCount=points.length;
    points.push(...explicit.map(p=>[...p]));
    return {...course,points,descentExtended:true,descentMode:'traverse',originalPointCount};
  }

  // 通常の往復ルートは、往路の中間地点を逆順に戻す。
  // 例：登山口→小屋→山頂→小屋→登山口。
  const firstTrailIndex=points.findIndex(p=>p?.[0]==='trailhead');
  if(firstTrailIndex<0)return {...course,points};
  const originalPointCount=points.length;
  const outbound=points.slice(firstTrailIndex,-1);
  const reverse=outbound.slice(1).reverse().map(p=>[p[0],p[1],p[2]]);
  const trail=points[firstTrailIndex];
  points.push(...reverse);
  points.push(['trailhead',trail[1],'下山口']);
  return {...course,points,descentExtended:true,descentMode:'roundtrip',originalPointCount};
}
// V1.4.198: add safe alternate representative routes even when a primary route already exists.
// A supplemental route is generated only when both trailhead→summit and summit→trailhead are confirmed CTs.
// This keeps the representative-course catalog growing without introducing new guessed coordinates or guessed CTs.
function confirmedGeneratedRepresentativeCourseOptions(mountain,existingCourses=[]){
  const key=canonicalMountainName(mountain);
  const catalog=BUILTIN_ROUTE_CATALOG[key]||[];
  const trailheads=catalog.filter(p=>p.type==='trailhead'&&hasResolvedCoord(p));
  const peaks=catalog.filter(p=>p.type==='peak'&&hasResolvedCoord(p));
  if(!trailheads.length||!peaks.length)return [];
  const exactPeak=peaks.find(p=>canonicalMountainName(p.name)===key)||peaks[0];
  if(!exactPeak)return [];
  const usedTrailheads=new Set();
  for(const course of existingCourses){
    for(const point of (course?.points||[])){
      if(point?.[0]==='trailhead')usedTrailheads.add(String(point[1]||''));
    }
  }
  const seen=new Set();
  const seenCoords=new Set();
  const out=[];
  for(const th of trailheads){
    const coordKey=`${Number(th.lat).toFixed(4)},${Number(th.lon).toFixed(4)}`;
    if(generatedRouteExcludedV1545(key,th.name)||seen.has(th.name)||seenCoords.has(coordKey)||usedTrailheads.has(th.name))continue;
    seen.add(th.name);
    seenCoords.add(coordKey);
    const up=courseTimeInfo({name:th.name},{name:exactPeak.name});
    const down=courseTimeInfo({name:exactPeak.name},{name:th.name});
    if(!up||!down||up.estimated||down.estimated)continue;
    out.push({
      label:`${th.name}ルート`,
      points:[['trailhead',th.name,'登山口'],['peak',exactPeak.name,'山頂']],
      generated:true,
      generatedConfirmed:true
    });
    if(out.length>=2)break;
  }
  return out;
}
function representativeCourseOptions(mountain){
  const key=canonicalMountainName(mountain);
  const manual=REPRESENTATIVE_COURSES[key];
  const base=manual?(Array.isArray(manual)?manual:[manual]):(AUTO_REPRESENTATIVE_COURSES_V1466[key]||[]);
  const extra=EXTRA_REPRESENTATIVE_COURSES_V1466[key]||[];
  const extra199=EXTRA_REPRESENTATIVE_COURSES_V14199[key]||[];
  const extra201=EXTRA_REPRESENTATIVE_COURSES_V14201[key]||[];
  const extra1543=EXTRA_REPRESENTATIVE_COURSES_V1543[key]||[];
  const extra1542=EXTRA_REPRESENTATIVE_COURSES_V1542[key]||[];
  const extra1541=EXTRA_REPRESENTATIVE_COURSES_V1541[key]||[];
  const extra1540=EXTRA_REPRESENTATIVE_COURSES_V1540[key]||[];
  // V1.5.43: newest reviewed/split route wins only for the same start point; unrelated alternatives remain available.
  const replacedStarts1543=new Set(extra1543.map(c=>c?.points?.[0]?.[1]).filter(Boolean));
  const kept1542=extra1542.filter(c=>!replacedStarts1543.has(c?.points?.[0]?.[1]));
  const replacedStarts1542=new Set(kept1542.map(c=>c?.points?.[0]?.[1]).filter(Boolean));
  const kept1541=extra1541.filter(c=>!replacedStarts1543.has(c?.points?.[0]?.[1])&&!replacedStarts1542.has(c?.points?.[0]?.[1]));
  const replacedStarts1541=new Set(kept1541.map(c=>c?.points?.[0]?.[1]).filter(Boolean));
  const kept1540=extra1540.filter(c=>!replacedStarts1543.has(c?.points?.[0]?.[1])&&!replacedStarts1542.has(c?.points?.[0]?.[1])&&!replacedStarts1541.has(c?.points?.[0]?.[1]));
  const replacedOlder=new Set([...extra1543,...kept1542,...kept1541,...kept1540].map(c=>c?.points?.[0]?.[1]).filter(Boolean));
  const older1543=[...base,...extra,...extra199,...extra201].filter(c=>!replacedOlder.has(c?.points?.[0]?.[1]));
  const primary=[...extra1543,...kept1542,...kept1541,...kept1540,...older1543];
  const generated=primary.length
    ? confirmedGeneratedRepresentativeCourseOptions(key,primary)
    : generatedRepresentativeCourseOptions(key);
  return [...primary,...generated].map(course=>representativeCourseWithDescent(key,course));
}


// V1.4.158: 代表コースと主要通過ポイントの連動強化。
// 既存の代表コース定義はそのままに、中間地点を差し込む。
// 中間地点を追加する場合は、前後区間の公開CTを個別登録する。距離比按分は行わない。
const REPRESENTATIVE_COURSE_ENRICHMENTS_V14158 = Object.freeze({
  '槍ヶ岳|上高地・槍沢ルート': [
    {after:'上高地',before:'槍沢ロッヂ',points:[['hut','横尾山荘','山小屋']]},
    {after:'槍沢ロッヂ',before:'槍ヶ岳山荘',points:[
      ['camp','ババ平（槍沢キャンプ場）','テント場'],
      ['pass','大曲（水俣乗越分岐）','峠・分岐'],
      ['pass','天狗原分岐','峠・分岐']
    ]}
  ],
  '常念岳|一ノ沢ルート': [
    {after:'一ノ沢登山口',before:'常念小屋',points:[['pass','常念乗越','峠・分岐']]}
  ],
  '間ノ岳|広河原・北岳縦走ルート': [
    {after:'北岳山荘',before:'間ノ岳',points:[['peak','中白根山','山頂']]}
  ],
  '農鳥岳|広河原・白峰三山縦走ルート': [
    {after:'北岳山荘',before:'間ノ岳',points:[['peak','中白根山','山頂']]}
  ],
  // V1.4.159: CTグラフに中間点名が無いが、代表ルート上で明確な固定地点。
  '唐松岳|八方尾根ルート': [
    {after:'八方池山荘',before:'唐松岳頂上山荘',points:[['pass','八方池','峠・分岐']]}
  ],
  '木曽駒ヶ岳|千畳敷ルート': [
    {after:'千畳敷',before:'木曽駒ヶ岳',points:[['pass','乗越浄土','峠・分岐']]}
  ],
  '高妻山|戸隠キャンプ場・高妻山登山者駐車場ルート': [
    {after:'戸隠キャンプ場・高妻山登山者駐車場',before:'高妻山',points:[['hut','一不動避難小屋','山小屋']]}
  ],
  '妙高山|笹ヶ峰ルート': [
    {after:'笹ヶ峰登山口',before:'妙高山',points:[['hut','黒沢池ヒュッテ','山小屋']]}
  ],
  '瑞牆山|瑞牆山荘・富士見平口ルート': [
    {after:'瑞牆山荘・富士見平口',before:'瑞牆山',points:[['hut','富士見平小屋','山小屋']]}
  ],
  '白木峰|白木峰8合目駐車場ルート': [
    {after:'白木峰8合目駐車場',before:'白木峰',points:[['hut','白木山荘（避難小屋）','山小屋']]}
  ],
  // V1.5.124: continue removing 3-point courses with route-order verified waypoints only.
  // 編笠山: 青年小屋 lies immediately beyond the summit on the classic return loop, so insert it on descent, not ascent.
  '編笠山|観音平ルート': [
    {after:'編笠山',before:'観音平',points:[['hut','青年小屋','山小屋']]}
  ],
  '編笠山|富士見高原ルート': [
    {after:'編笠山',before:'富士見高原登山口',points:[['hut','青年小屋','山小屋']]}
  ],
  // 氷ノ山: 氷ノ越避難小屋 is on the actual ascent line before the summit for both representative approaches.
  '氷ノ山|福定親水公園 氷ノ山登山口ルート': [
    {after:'福定親水公園 氷ノ山登山口',before:'氷ノ山',points:[['hut','氷ノ山越避難小屋','山小屋']]}
  ],
  '氷ノ山|わかさ氷ノ山登山口ルート': [
    {after:'わかさ氷ノ山登山口',before:'氷ノ山',points:[['hut','氷ノ山越避難小屋','山小屋']]}
  ]
});

function representativeCourseEnrichmentRules(mountain,course){
  const key=`${canonicalMountainName(mountain)}|${course?.label||''}`;
  return REPRESENTATIVE_COURSE_ENRICHMENTS_V14158[key]||[];
}

// V1.4.159: 代表コース116本をCT経路から自動補完。
// 確認済みCTの composed path に、現在の山で座標固定済みの中間地点が含まれる場合だけ差し込む。
// これにより別ルートの地点を距離だけで誤挿入せず、今後固定地点を追加した時も自動連動する。
function representativeRoleLabel(type){
  if(type==='trailhead')return '登山口';
  if(type==='peak')return '山頂';
  if(type==='hut')return '山小屋';
  if(type==='pass')return '峠・分岐';
  if(type==='camp')return 'テント場';
  return '地点';
}
function representativeFixedCandidateByEndpoint(mountain,name){
  const key=canonicalMountainName(mountain);
  const catalog=BUILTIN_ROUTE_CATALOG[key]||[];
  const raw=String(name||'').trim();
  const normalized=canonicalCourseTimeEndpointName(normalizeCourseTimePointName(raw));
  const allowed=new Set(['hut','pass','camp','peak']);
  return catalog.find(p=>allowed.has(p.type)&&hasResolvedCoord(p)&&String(p.name||'').trim()===raw)
    ||catalog.find(p=>allowed.has(p.type)&&hasResolvedCoord(p)&&canonicalCourseTimeEndpointName(normalizeCourseTimePointName(p.name))===normalized)
    ||null;
}
function representativeComposedInfo(fromName,toName){
  const raw=composedCourseTimeInfo(String(fromName||'').trim(),String(toName||'').trim());
  if(raw)return raw;
  const from=canonicalCourseTimeEndpointName(normalizeCourseTimePointName(fromName));
  const to=canonicalCourseTimeEndpointName(normalizeCourseTimePointName(toName));
  return composedCourseTimeInfo(from,to);
}
function representativeAutoEnrichmentPoints(mountain,cur,next){
  if(!cur||!next)return [];
  const composed=representativeComposedInfo(cur[1],next[1]);
  if(!composed||!Array.isArray(composed.via)||!composed.via.length)return [];
  const direct=directCourseTimeInfoByNames(cur[1],next[1])
    ||directCourseTimeInfoByNames(
      canonicalCourseTimeEndpointName(normalizeCourseTimePointName(cur[1])),
      canonicalCourseTimeEndpointName(normalizeCourseTimePointName(next[1]))
    );
  if(direct){
    const diff=Math.abs(Number(direct.minutes)-Number(composed.minutes));
    const tolerance=Math.max(20,Math.round(Number(direct.minutes)*0.12));
    if(diff>tolerance)return [];
  }
  const baseNames=new Set([cur[1],next[1]]);
  const seen=new Set();
  const out=[];
  for(const via of composed.via){
    const p=representativeFixedCandidateByEndpoint(mountain,via);
    if(!p||baseNames.has(p.name))continue;
    const k=`${p.type}|${p.name}`;
    if(seen.has(k))continue;
    seen.add(k);
    out.push([p.type,p.name,representativeRoleLabel(p.type)]);
  }
  return out;
}

function representativeCourseExpandedPointDefs(mountain,course){
  const base=Array.isArray(course?.points)?course.points.map(p=>[...p]):[];
  const rules=representativeCourseEnrichmentRules(mountain,course);
  const out=[];
  const inserted=new Set(base.map(p=>`${p[0]}|${p[1]}`));
  for(let i=0;i<base.length;i++){
    const cur=base[i];
    out.push(cur);
    const next=base[i+1];
    if(!next)continue;
    const additions=[];
    for(const rule of rules){
      if(cur[1]===rule.after&&next[1]===rule.before){
        for(const p of (rule.points||[]))additions.push([...p]);
      }
    }
    if(!additions.length)additions.push(...representativeAutoEnrichmentPoints(mountain,cur,next));
    for(const p of additions){
      const k=`${p[0]}|${p[1]}`;
      if(inserted.has(k))continue;
      inserted.add(k);
      out.push(p);
    }
  }
  return out;
}

// V1.4.177: 下山側に逆方向の確認済みCTがない場合、往路CTから下山参考CTを作る。
// 代表コース全体を読み込み不能にしないための限定フォールバックで、確認済みCTそのものは上書きしない。
function representativeDescentReverseFallbackInfo(fromPoint,toPoint){
  if(!fromPoint||!toPoint)return null;
  const reverse=courseTimeInfo(toPoint,fromPoint);
  if(!reverse||!Number.isFinite(Number(reverse.minutes)))return null;
  const minutes=Math.max(10,Math.round((Number(reverse.minutes)*0.75)/10)*10);
  return {
    minutes,
    source:`${reverse.source||'確認済みCT'}・逆方向CTから下山参考値換算`,
    sourceType:'estimated',
    estimated:true,
    derivedFromReverse:true
  };
}

function buildRepresentativeResolvedRoute(mountain,course){
  const baseDefs=Array.isArray(course?.points)?course.points:[];
  const expandedDefs=representativeCourseExpandedPointDefs(mountain,course);
  const resolvedExpanded=expandedDefs.map(([type,name,role])=>({type,name,role,p:representativeCandidate(type,name,mountain)}));
  const byName=new Map(resolvedExpanded.filter(x=>x.p).map(x=>[`${x.type}|${x.name}`,x]));
  const segments=[];
  let distributedPointCount=0;

  // V1.4.232: map base points to expanded points in route order.
  // Round trips repeat the same hut/trailhead names on descent; using findIndex()
  // from the head of the array re-selected the outbound occurrence and could
  // create more CT segments than route legs.
  const baseExpandedIndices=[];
  let expandedCursor=0;
  for(const def of baseDefs){
    let found=-1;
    for(let j=expandedCursor;j<expandedDefs.length;j++){
      if(expandedDefs[j][0]===def[0]&&expandedDefs[j][1]===def[1]){found=j;break;}
    }
    baseExpandedIndices.push(found);
    if(found>=0)expandedCursor=found+1;
  }

  for(let bi=1;bi<baseDefs.length;bi++){
    const prevDef=baseDefs[bi-1],nextDef=baseDefs[bi];
    const startIndex=baseExpandedIndices[bi-1];
    const endIndex=baseExpandedIndices[bi];
    if(startIndex<0||endIndex<0||endIndex<=startIndex)continue;
    const chain=resolvedExpanded.slice(startIndex,endIndex+1);
    const isDescentExtendedSegment=!!course?.descentExtended&&Number.isFinite(Number(course?.originalPointCount))&&bi>=Number(course.originalPointCount);
    let parentInfo=chain[0]?.p&&chain.at(-1)?.p?courseTimeInfo(chain[0].p,chain.at(-1).p):null;
    if(!parentInfo&&isDescentExtendedSegment){
      parentInfo=representativeDescentReverseFallbackInfo(chain[0]?.p,chain.at(-1)?.p);
    }
    if(chain.length===2){
      const info=parentInfo;
      if(!info&&!course.allowMissingCt)return {error:`${prevDef[1]} → ${nextDef[1]} の確認済みCTがありません。`};
      segments.push(info||{minutes:60,missing:true,source:'CT情報なし（+1時間仮置き）'});
      continue;
    }
    // V1.5.14: intermediate waypoints are valid only with explicit adjacent CTs.
    // Do not infer child legs from a parent CT, even when the parent CT exists.
    const directInfos=[];
    let allDirect=true;
    for(let ci=1;ci<chain.length;ci++){
      const info=chain[ci-1].p&&chain[ci].p?courseTimeInfo(chain[ci-1].p,chain[ci].p):null;
      directInfos.push(info);
      if(!info)allDirect=false;
    }
    if(allDirect){
      segments.push(...directInfos);
    }else if(course.allowMissingCt){
      for(let ci=0;ci<directInfos.length;ci++){
        segments.push(directInfos[ci]||{minutes:60,missing:true,source:'CT情報なし（通過時刻を手入力）'});
      }
    }else{
      const missingLegs=[];
      for(let ci=1;ci<chain.length;ci++)if(!directInfos[ci-1])missingLegs.push(`${chain[ci-1].name} → ${chain[ci].name}`);
      return {error:`中間通過ポイントの区間CTが未登録です: ${missingLegs.join(' / ')}`};
    }
  }
  return {resolved:resolvedExpanded,segments,distributedPointCount};
}

const REPRESENTATIVE_COURSE_SELECTION = new Map();

function representativeCourseSelectedIndex(mountain, options=null){
  const key=canonicalMountainName((mountain||'').trim());
  const list=options||representativeCourseOptions(key);
  const saved=Number(REPRESENTATIVE_COURSE_SELECTION.get(key));
  if(Number.isInteger(saved)&&saved>=0&&saved<list.length)return saved;
  const sel=$('representativeCourseSelect');
  const legacy=sel?Number(sel.value):NaN;
  if(Number.isInteger(legacy)&&legacy>=0&&legacy<list.length)return legacy;
  return 0;
}

function setRepresentativeCourseSelectedIndex(mountain,index){
  const key=canonicalMountainName((mountain||'').trim());
  const options=representativeCourseOptions(key);
  const idx=Math.max(0,Math.min(options.length-1,Number(index)||0));
  REPRESENTATIVE_COURSE_SELECTION.set(key,idx);
  const sel=$('representativeCourseSelect');
  if(sel&&options[idx])sel.value=String(idx);
  renderRepresentativeCourseSummaryNow(key);
  renderRepresentativeCourseStaticPreview(key);
  const btn=$('representativeCourseBtn');
  if(btn){
    const active=options[idx];
    const route=representativeCoursePathText(active);
    btn.title=active?(route?`${active.label||'代表コース'}\n${route}`:(active.label||'代表コース')):'';
  }
}

function representativeCourseFor(mountain){
  const options=representativeCourseOptions(mountain);
  const idx=representativeCourseSelectedIndex(mountain,options);
  return options[idx]||options[0]||null;
}
function representativeCoursePathText(course,mountain=''){
  if(!course||!Array.isArray(course.points))return '';
  const defs=representativeCourseExpandedPointDefs(mountain||currentMountainLabel(),course);
  return defs.map(([,name])=>name).join(' → ');
}
function renderRepresentativeCourseSummaryNow(mountainOverride=''){
  const mountain=(mountainOverride||currentMountainLabel()).trim();
  const options=representativeCourseOptions(mountain);
  const sel=$('representativeCourseSelect');
  const selectedIndex=representativeCourseSelectedIndex(mountain,options);
  const btn=$('representativeCourseBtn');
  const mainline=btn?.closest('.representative-course-mainline');
  if(!btn||!mainline)return;

  let box=$('representativeCourseSummaryAlways');
  if(!box){
    box=document.createElement('div');
    box.id='representativeCourseSummaryAlways';
    box.className='representative-course-summary-always';
    box.setAttribute('aria-live','polite');
    btn.insertAdjacentElement('afterend',box);
  }
  if(!options.length){
    box.replaceChildren();
    box.style.setProperty('display','none','important');
    btn.removeAttribute('title');
    return;
  }

  box.replaceChildren();
  options.forEach((course,i)=>{
    const route=representativeCoursePathText(course)||course.points?.map(p=>p?.[1]).filter(Boolean).join(' → ')||'';
    const item=document.createElement('button');
    item.type='button';
    item.className=`representative-course-summary-option${i===selectedIndex?' is-active':''}`;
    item.dataset.courseIndex=String(i);
    item.setAttribute('aria-pressed',i===selectedIndex?'true':'false');
    const name=document.createElement('b');
    name.textContent=`${options.length>1?`${i+1}. `:''}${course.label||'代表コース'}`;
    const path=document.createElement('span');
    path.textContent=route;
    item.append(name,path);
    item.addEventListener('click',()=>{
      setRepresentativeCourseSelectedIndex(mountain,i);
    });
    box.append(item);
  });
  box.style.setProperty('display','flex','important');
  box.style.setProperty('visibility','visible','important');
  box.style.setProperty('opacity','1','important');
  const active=options[selectedIndex]||options[0];
  const activeRoute=representativeCoursePathText(active);
  btn.title=activeRoute?`${active.label||'代表コース'}\n${activeRoute}`:(active.label||'代表コース');
}

function renderRepresentativeCourseStaticPreview(mountainOverride=''){
  const mountain=(mountainOverride||currentMountainLabel()).trim();
  const options=representativeCourseOptions(mountain);
  const preview=$('representativeCoursePreview');
  if(!preview)return;
  if(!options.length){
    preview.replaceChildren();
    preview.classList.add('hidden','is-empty');
    preview.setAttribute('aria-hidden','true');
    return;
  }
  const idx=representativeCourseSelectedIndex(mountain,options);
  const course=options[idx]||options[0];
  const label=document.createElement('b');
  label.textContent=course.label||'代表コース';
  const route=document.createElement('span');
  route.textContent=representativeCoursePathText(course,mountain)||course.points?.map(p=>p?.[1]).filter(Boolean).join(' → ')||'';
  preview.replaceChildren(label,route);
  preview.classList.remove('hidden','is-empty');
  preview.setAttribute('aria-hidden','false');
}

function refreshRepresentativeCourseButton(){
  const btn=$('representativeCourseBtn');
  const sel=$('representativeCourseSelect');
  const choices=$('representativeCourseChoices');
  const mobileChoices=$('mobileRepresentativeCourses');
  const legacySummary=$('representativeCourseSummaryFixed');
  if(!btn)return;
  const mountain=currentMountainLabel();
  const options=representativeCourseOptions(mountain);
  const hasCourse=options.length>0;
  btn.classList.toggle('hidden',!hasCourse);
  btn.disabled=!hasCourse;
  if(sel){
    const idx=representativeCourseSelectedIndex(mountain,options);
    sel.innerHTML=options.map((course,i)=>`<option value="${i}">${escapeHtml(course.label)}</option>`).join('');
    sel.value=String(idx);
    sel.classList.toggle('hidden',!hasCourse);
    sel.disabled=!hasCourse;
  }
  // V1.4.182: mountain selection immediately exposes the representative-course selector
  // and its route preview. Loading remains an explicit button action.
  if(choices){choices.replaceChildren();choices.classList.add('hidden');choices.removeAttribute('data-course-count');}
  if(mobileChoices){mobileChoices.replaceChildren();mobileChoices.classList.add('hidden');}
  if(legacySummary){legacySummary.replaceChildren();legacySummary.style.setProperty('display','none','important');}
  renderRepresentativeCourseStaticPreview(mountain);
  renderRepresentativeCourseSummaryNow(mountain);
}
// V1.4.197: 全国一括判定など、現在選択中ではない山でも代表コースの固定地点を解決する。
// これまで representativeCandidate() が画面上の candidates（現在選択中の山）だけを見ていたため、
// 全国の山情報ではCTが登録済みでも「CT情報なし」になるケースがあった。
function representativeCandidateForMountain(mountain,type,name){
  const key=canonicalMountainName(String(mountain||'').trim());
  if(!key)return null;
  const pool=[
    ...(BUILTIN_ROUTE_CATALOG[key]||[]),
    ...(TRAVERSE_CATALOG[key]||[]),
    ...regionalCandidates(key),
    ...fixedNameFallbackCandidates(key)
  ].filter(p=>p&&p.type===type&&hasResolvedCoord(p));
  const raw=String(name||'').trim();
  const exact=pool.find(p=>String(p.name||'').trim()===raw);
  if(exact)return exact;
  const normalized=canonicalCourseTimeEndpointName(normalizeCourseTimePointName(raw));
  return pool.find(p=>canonicalCourseTimeEndpointName(normalizeCourseTimePointName(p.name))===normalized)||null;
}
function representativeCandidate(type,name,mountain=''){
  if(mountain){
    const fixed=representativeCandidateForMountain(mountain,type,name);
    if(fixed)return fixed;
  }
  return candidates.find(p=>p.type===type&&p.name===name&&hasResolvedCoord(p))||null;
}

// V1.5.118: loading a representative course must not collapse the manual waypoint
// dropdown to only the points used by that representative route.  Merge the full
// verified/selectable fixed candidate set for the selected mountain first, then let
// representative-route-only points (for example 小仙丈ヶ岳) be injected below.
function mergeSelectableFixedCandidatesForMountain(mountain){
  const key=canonicalMountainName(String(mountain||'').trim());
  if(!key)return;
  const embedded=[
    ...(BUILTIN_ROUTE_CATALOG[key]||[]),
    ...(TRAVERSE_CATALOG[key]||[]),
    ...regionalCandidates(key)
  ].filter(p=>p&&Object.prototype.hasOwnProperty.call(TYPE_LABEL,p.type)&&hasResolvedCoord(p));
  // V1.5.120: manual route design is a traverse planner. Do not require every
  // selectable waypoint to have a verified CT to every other waypoint. A point
  // with a fixed coordinate must remain selectable; adjacent CT is validated only
  // after the user actually connects two points.
  const pool=dedupeCandidateList(embedded.filter(hasResolvedCoord));
  for(const p of pool){
    const exact=candidates.find(c=>c?.id===p.id);
    if(exact)continue;
    const equivalent=candidates.find(c=>
      c?.type===p.type&&String(c?.name||'')===String(p.name||'')&&
      hasResolvedCoord(c)&&hasResolvedCoord(p)&&
      haversineMeters(Number(c.lat),Number(c.lon),Number(p.lat),Number(p.lon))<=120
    );
    if(!equivalent)candidates.push(p);
  }
}
async function applyRepresentativeCourse(){
  const mountain=currentMountainLabel();
  const course=representativeCourseFor(mountain);
  if(!course)return setStatus(`${mountain||'選択中の山'} の代表コースはまだ登録されていません。`,true);
  const btn=$('representativeCourseBtn');
  if(btn){btn.disabled=true;btn.textContent='代表コースを準備中…';}
  try{
    // V1.5.118: keep the mountain/area-wide selectable candidate catalog available
    // even when the user enters through "代表コースを読み込む" without first
    // opening the manual route designer.
    mergeSelectableFixedCandidatesForMountain(mountain);
    let expandedDefs=representativeCourseExpandedPointDefs(mountain,course);
    let resolved=expandedDefs.map(([type,name,role])=>({type,name,role,p:representativeCandidate(type,name,mountain)}));
    if(resolved.some(x=>!x.p)){
      await loadCandidates();
      expandedDefs=representativeCourseExpandedPointDefs(mountain,course);
      resolved=expandedDefs.map(([type,name,role])=>({type,name,role,p:representativeCandidate(type,name,mountain)}));
    }
    const missing=resolved.filter(x=>!x.p).map(x=>x.name);
    if(missing.length)return setStatus(`代表コースを読み込めませんでした。固定ポイント不足：${missing.join('、')}`,true);

    const built=buildRepresentativeResolvedRoute(mountain,course);
    if(built.error)return setStatus(`代表コースを読み込めませんでした。${built.error}`,true);
    resolved=built.resolved;
    // V1.5.113: representativeCandidateForMountain() can resolve a fixed route point
    // that is intentionally absent from the current visible candidate list. addPointRow()
    // selects by candidate id, so make every resolved route point selectable before the
    // current rows are cleared. Prefer an already-loaded equivalent point only when its
    // coordinate is effectively the same; otherwise inject the authoritative fixed point.
    resolved=resolved.map(item=>{
      const p=item?.p;
      if(!p)return item;
      const sameId=candidates.find(c=>c?.id===p.id);
      if(sameId)return {...item,p:sameId};
      const equivalent=candidates.find(c=>
        c?.type===p.type&&String(c?.name||'')===String(p.name||'')&&
        hasResolvedCoord(c)&&hasResolvedCoord(p)&&
        haversineMeters(Number(c.lat),Number(c.lon),Number(p.lat),Number(p.lon))<=120
      );
      if(equivalent)return {...item,p:equivalent};
      candidates.push(p);
      return item;
    });
    const segments=built.segments;
    const distributedPointCount=Number(built.distributedPointCount||0);
    let totalMinutes=0, missingCtCount=0, estimatedCtCount=0;
    for(const seg of segments){
      totalMinutes+=Number(seg.minutes)||0;
      if(seg.missing)missingCtCount++;
      if(seg.estimated)estimatedCtCount++;
    }

    const rows=[...$('points').children];
    const selectedRows=rows.filter(r=>r.querySelector('.point-select')?.value);
    if(selectedRows.length&&typeof window!=='undefined'&&typeof window.confirm==='function'){
      if(!window.confirm('現在の通過ポイントを代表コースで置き換えます。よろしいですか？'))return;
    }
    const firstRow=rows[0];
    const start={
      // V1.4.97: representative-course load always starts tomorrow.
      date:tomorrowLocal(),
      time:firstRow?.querySelector('.point-time')?.value||'06:00'
    };
    let cursorMs=new Date(`${start.date}T${start.time}:00+09:00`).getTime();
    if(!Number.isFinite(cursorMs))cursorMs=new Date(`${todayLocal()}T06:00:00+09:00`).getTime();

    $('points').innerHTML=''; pointSeq=0;
    resolved.forEach((item,i)=>{
      const dt=formatJstInput(cursorMs);
      addPointRow(item.type,item.p.id,item.role,dt);
      const row=$('points').lastElementChild;
      if(i>0){
        const seg=segments[i-1];
        row.dataset.courseTimeAuto=seg?.missing?'':'1';
        if(seg){
          row.dataset.segmentCtMinutes=String(Number(seg.minutes)||0);
          row.dataset.segmentCtKind=seg.missing?'missing':(seg.derived?'derived':(seg.estimated?'estimated':'verified'));
          row.dataset.segmentCtSource=String(seg.source||'');
          row.dataset.segmentCtFrom=String(resolved[i-1]?.p?.name||'');
          row.dataset.segmentCtTo=String(item.p?.name||'');
        }
        refreshCourseTimeMissingBadge(row);
      }
      if(i<segments.length){const seg=segments[i];cursorMs+=(seg?.missing?Number(seg.minutes):adjustedCourseMinutes(seg.minutes))*60*1000;}
    });
    updateForecastHorizon();
    renderRouteMaps();
    setStatus(missingCtCount
      ?`${mountain}：${course.label} を入力しました。CT情報なし ${missingCtCount}区間は+1時間で仮置きしています。`
      :estimatedCtCount
        ?`${mountain}：${course.label} を入力しました。CT合計 ${formatCourseTimeMinutes(totalMinutes)}${walkingPaceSuffix(totalMinutes)}（うち推定CT ${estimatedCtCount}区間・無雪期・休憩含まず）。`
        :`${mountain}：${course.label} を入力しました。標準CT合計 ${formatCourseTimeMinutes(totalMinutes)}${walkingPaceSuffix(totalMinutes)}（無雪期・休憩含まず）。`);
    logEvent('representative_course_loaded',{success:true,mountain,metadata:{course_label:course.label,point_count:resolved.length,total_minutes:totalMinutes,distributed_point_count:distributedPointCount}});
  }finally{
    if(btn){btn.textContent='代表コースを読み込む';refreshRepresentativeCourseButton();}
  }
}

const CENTRAL_ALPS_AUTO_ROUTE_V121=[
  ['trailhead','area-cku-senjojiki','登山口'],
  ['peak','area-cku-kisokoma','山頂'],
  ['hut','area-cku-chojo','山小屋'],
  ['hut','area-cku-hoken-sanso','山小屋'],
  ['peak','area-cku-hoken','山頂'],
  ['peak','area-cku-hinokio','山頂'],
  ['hut','area-cku-hinokio-hut','山小屋'],
  ['peak','area-cku-kumazawa','山頂'],
  ['peak','area-cku-higashikawa','山頂'],
  ['hut','area-cku-kisodono','山小屋'],
  ['peak','area-cku-utsugi','山頂'],
  ['hut','area-cku-komaho','山小屋'],
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
    if(hasHut)addPointRow('hut','','山小屋');
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


// V1.5.54: never expose a fixed custom-route point that is disconnected from the
// verified CT network shown for that mountain.  This is a UI integrity guard, not
// a CT estimator: disconnected points stay in the data catalog and reappear
// automatically once verified links are added.
function usableVerifiedCustomRouteInfo(a,b){
  const info=courseTimeInfo(a,b);
  return !!(info&&!info.estimated&&Number.isFinite(Number(info.minutes))&&Number(info.minutes)>=0);
}
function sanitizeFixedCustomRouteCandidates(mountain,list){
  const canonicalMountain=canonicalMountainName(mountain);
  const src=(list||[]).filter(p=>p&&hasResolvedCoord(p)&&!CLOSED_CUSTOM_ROUTE_POINTS.has(`${canonicalMountain}|${p.name}`));
  if(src.length<2)return {points:src,hidden:[]};
  let unique=[];const seen=new Set();
  for(const p of src){const k=`${p.type}|${accessNameKey(p.name,mountain)}`;if(seen.has(k))continue;seen.add(k);unique.push(p);}
  if(unique.length<2)return {points:unique,hidden:[]};

  // Same physical summit sometimes arrives from both a generic 300-mountain catalog and
  // a detailed regional catalog under slightly different labels (e.g. 赤岳 vs
  // 赤岳（八ヶ岳最高峰）).  Showing both creates a fake CT gap.  Collapse only
  // same-type points within a very small radius (80 m for peaks, 30 m otherwise),
  // keeping the label with the strongest verified CT degree.
  const preHidden=[];
  const scorePoint=(p,pool)=>pool.reduce((n,q)=>n+(p!==q&&(usableVerifiedCustomRouteInfo(p,q)||usableVerifiedCustomRouteInfo(q,p))?1:0),0);
  const alive=new Array(unique.length).fill(true);
  for(let i=0;i<unique.length;i++){
    if(!alive[i])continue;
    for(let j=i+1;j<unique.length;j++){
      if(!alive[j]||unique[i].type!==unique[j].type)continue;
      const km=haversineKm(unique[i].lat,unique[i].lon,unique[j].lat,unique[j].lon);
      const duplicateRadiusKm=(unique[i].type==='peak')?0.08:0.03;
      if(!Number.isFinite(km)||km>duplicateRadiusKm)continue;
      // V1.5.55: proximity alone is not a duplicate test. Neighboring real summits can be
      // less than 80m apart (e.g. Tanigawa Tomano/Oki). Collapse only alias-equivalent labels.
      const ni=courseTimePointMatchKey(normalizeCourseTimePointName(unique[i].name));
      const nj=courseTimePointMatchKey(normalizeCourseTimePointName(unique[j].name));
      if(ni!==nj)continue;
      const si=scorePoint(unique[i],unique),sj=scorePoint(unique[j],unique);
      const drop=(sj>si)?i:j;
      preHidden.push(unique[drop]);alive[drop]=false;
      if(drop===i)break;
    }
  }
  unique=unique.filter((_,i)=>alive[i]);
  if(unique.length<2)return {points:unique,hidden:preHidden};
  const adj=unique.map(()=>new Set());
  for(let i=0;i<unique.length;i++)for(let j=i+1;j<unique.length;j++){
    // Route builder is reversible by design; keep points in the main selectable
    // graph only when the verified CT graph can resolve both directions.
    if(usableVerifiedCustomRouteInfo(unique[i],unique[j])&&usableVerifiedCustomRouteInfo(unique[j],unique[i])){
      adj[i].add(j);adj[j].add(i);
    }
  }
  const components=[];const visited=new Set();
  for(let i=0;i<unique.length;i++){
    if(visited.has(i))continue;
    const stack=[i],comp=[];visited.add(i);
    while(stack.length){const x=stack.pop();comp.push(x);for(const y of adj[x])if(!visited.has(y)){visited.add(y);stack.push(y);}}
    components.push(comp);
  }
  const mkey=canonicalCourseTimeEndpointName(normalizeCourseTimePointName(canonicalMountainName(mountain)));
  const primaryIndices=unique.map((p,i)=>({p,i})).filter(({p})=>p.type==='peak'&&canonicalCourseTimeEndpointName(normalizeCourseTimePointName(p.name))===mkey).map(x=>x.i);
  let keepComp=null;
  for(const idx of primaryIndices){const c=components.find(comp=>comp.includes(idx));if(c&&(!keepComp||c.length>keepComp.length))keepComp=c;}
  if(!keepComp)keepComp=[...components].sort((a,b)=>b.length-a.length)[0]||[];
  // Integrity takes precedence over candidate count.  If the selected mountain
  // summit is isolated, do not re-expose the other disconnected points: that was the
  // exact failure mode that made a route look selectable while every CT was missing.
  // A single safe point is preferable to a broken multi-point builder; the UI explains
  // that verified CT-linked points are insufficient until a public CT is added.
  if(keepComp.length<2){
    const keep=new Set(keepComp);
    return {points:unique.filter((_,i)=>keep.has(i)),hidden:[...preHidden,...unique.filter((_,i)=>!keep.has(i))]};
  }

  // A connected graph can still contain a branch pair that resolves only through a
  // geographically rejected detour.  Remove the smallest number of such optional
  // points greedily until every displayed pair is resolvable in both directions.
  // The selected mountain summit is protected whenever possible.
  let active=[...keepComp];
  const primarySet=new Set(primaryIndices);
  while(active.length>2){
    const failCount=new Map(active.map(i=>[i,0]));
    let failures=0;
    for(let ai=0;ai<active.length;ai++)for(let bi=ai+1;bi<active.length;bi++){
      const i=active[ai],j=active[bi];
      if(!(usableVerifiedCustomRouteInfo(unique[i],unique[j])&&usableVerifiedCustomRouteInfo(unique[j],unique[i]))){
        failCount.set(i,failCount.get(i)+1);failCount.set(j,failCount.get(j)+1);failures++;
      }
    }
    if(!failures)break;
    const droppable=active.filter(i=>!primarySet.has(i));
    if(!droppable.length)break;
    droppable.sort((a,b)=>failCount.get(b)-failCount.get(a)||((unique[a].type==='trailhead')?1:0)-((unique[b].type==='trailhead')?1:0));
    const drop=droppable[0];
    if((failCount.get(drop)||0)===0)break;
    active=active.filter(i=>i!==drop);
  }
  const keep=new Set(active);
  return {points:unique.filter((_,i)=>keep.has(i)),hidden:[...preHidden,...unique.filter((_,i)=>!keep.has(i))]};
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
  btn.disabled=true; btn.textContent='設計用ポイントを準備中…';
  try{
    const center=await resolveMountainCenter(label);
    if(!MOUNTAIN_PRESETS[mountain])MOUNTAIN_PRESETS[mountain]=center;

    const embeddedBase=[...(BUILTIN_ROUTE_CATALOG[mountain]||[]),...(TRAVERSE_CATALOG[mountain]||[]),...regionalCandidates(mountain)].filter(p=>Object.prototype.hasOwnProperty.call(TYPE_LABEL,p.type));
    const embeddedNames=new Set(embeddedBase.map(p=>`${p.type}|${accessNameKey(p.name,mountain)}`));
    const fixedNameFallback=fixedNameFallbackCandidates(mountain).filter(p=>!embeddedNames.has(`${p.type}|${accessNameKey(p.name,mountain)}`));
    const staticBase=[...embeddedBase,...fixedNameFallback];
    // V1.4.20: 座標未確定の固定候補はユーザーに表示しない。
    // 未確定候補は内部データには残し、公開情報で確認できた時点で固定候補へ昇格する。
    const resolvedStaticBase=staticBase.filter(hasResolvedCoord);

    // 確定済み固定候補が1件でもあれば、それを即時出力して外部の追加候補探索は行わない。
    // 日本三百名山は固定登山口300/300を整備済みのため、通常はこちらを通る。
    if(resolvedStaticBase.length){
      // V1.5.120: candidate visibility must support traverses. Previously this
      // branch reduced the fixed catalog to a CT-complete clique, so legitimate
      // neighboring summits/huts disappeared (e.g. 赤岳→横岳/阿弥陀岳,
      // 仙丈ヶ岳→甲斐駒ヶ岳). Keep every coordinate-resolved fixed point in the
      // mountain corridor. Missing/estimated CT is handled per selected adjacent
      // segment by the existing row warning logic; it must not hide the point.
      candidates=dedupeCandidateList(resolvedStaticBase.filter(hasResolvedCoord));
      renderCandidateRows(label,center,{resetPoints:true});
      setLoadedRouteStartToTomorrow();
      $('candidateState').textContent='';
      updateLoadButtonAppearance(!!candidates.length);
      logEvent('route_candidates_loaded',{success:!!candidates.length,mountain:label,metadata:{candidate_count:candidates.length,hidden_unresolved_count:staticBase.length-resolvedStaticBase.length,hidden_ct_disconnected_count:0,source:'fixed',external_search:false,traverse_candidates_preserved:true}});
      return;
    }

    // 固定候補がまったく無い山だけ、非常用フォールバックとして従来の外部探索を実施。
    $('candidateState').textContent='固定ポイントがないため通過ポイントを検索中…';
    btn.textContent='設計用ポイントを検索中…';
    const fullCacheKey=`full:${mountainCacheKey(mountain)}`;
    const cachedFull=routeCacheGet(fullCacheKey,7*24*60*60*1000);
    if(Array.isArray(cachedFull)&&cachedFull.length){
      candidates=[...cachedFull];
      renderCandidateRows(label,center,{resetPoints:true});
      setLoadedRouteStartToTomorrow();
      $('candidateState').textContent='';
      updateLoadButtonAppearance(true);
      logEvent('route_candidates_loaded',{success:true,mountain:label,metadata:{candidate_count:candidates.length,cache_hit:true,source:'external_fallback'}});
      return;
    }

    let dynamic=await discoverNearbyCandidates(center,24000);
    let trailSearchStage='24km';
    const hasTrailIn=(arr)=>arr.some(p=>p.type==='trailhead');
    if(!hasTrailIn(dynamic)){
      dynamic=[...dynamic,...await discoverNearbyCandidates(center,45000)];
      trailSearchStage='45km';
    }
    if(!hasTrailIn(dynamic)){
      dynamic=[...dynamic,...await discoverTrailheadsByName(label,center)];
      trailSearchStage='山名検索';
    }
    candidates=[...dynamic];
    renderCandidateRows(label,center,{resetPoints:true});
    setLoadedRouteStartToTomorrow();
    routeCachePut(fullCacheKey,dynamic);
    $('candidateState').textContent=candidates.length?'':'通過ポイント候補を検出できませんでした';
    if(!candidates.length)setStatus(`${label} の通過ポイント候補が見つかりませんでした。`,true);
    updateLoadButtonAppearance(!!candidates.length);
    logEvent('route_candidates_loaded',{success:!!candidates.length,mountain:label,metadata:{candidate_count:candidates.length,source:'external_fallback',trail_search_stage:trailSearchStage}});
  }catch(e){
    $('candidateState').textContent=`${label}：通過ポイントを読み込めませんでした（${e.message||e}）`;
    setStatus(`山頂座標の取得に失敗しました：${e.message||e}`,true);
    updateLoadButtonAppearance(false);
  }finally{
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
          const departure=last.querySelector('.stay-departure-time')?.value||'06:00';
          const [dh,dm]=departure.split(':').map(Number);
          dt.setDate(dt.getDate()+1);
          dt.setHours(Number.isFinite(dh)?dh:6,Number.isFinite(dm)?dm:0,0,0);
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

// V1.5.129: 山小屋・テント場と峠・分岐をUI上の「山小屋・峠」に統合する。
// 内部typeは宿泊可否の判定に必要な hut / pass を維持する。既存campはhut相当として扱い、
// 登山口・下山口は従来どおり独立させる。
const POINT_TYPE_OPTIONS=[
  ['trailhead','登山口・下山口'],
  ['peak','山頂'],
  ['hutpass','山小屋・峠']
];
function pointTypeGroup(type){return type==='hut'||type==='camp'||type==='pass'?'hutpass':type;}
function typeOptions(selected){
  const group=pointTypeGroup(selected);
  return POINT_TYPE_OPTIONS.map(([v,l])=>`<option value="${v}" ${v===group?'selected':''}>${l}</option>`).join('');
}

// V1.4.20: 座標未確定候補はUIに出さないため、個別の再取得処理は廃止。

function candidateOptions(type,selected=''){
  const group=pointTypeGroup(type);
  const list=candidates.filter(p=>{
    if(!hasResolvedCoord(p))return false;
    return group==='hutpass'?(p.type==='hut'||p.type==='camp'||p.type==='pass'):p.type===group;
  });
  return `<option value="">地点を選択</option>`+list.map(p=>`<option value="${esc(p.id)}" ${p.id===selected?'selected':''}>${esc(p.name)}${p.elevation?` / ${p.elevation}m`:''}</option>`).join('');
}

function preservePointRowViewport(row,action){
  if(!row||typeof action!=='function'){ action?.(); return; }
  const anchorTop=row.getBoundingClientRect().top;
  action();
  const restore=()=>{
    if(!row.isConnected)return;
    const nowTop=row.getBoundingClientRect().top;
    const delta=nowTop-anchorTop;
    if(Math.abs(delta)>1)window.scrollBy({top:delta,left:0,behavior:'auto'});
  };
  requestAnimationFrame(()=>requestAnimationFrame(restore));
  setTimeout(restore,90);
  setTimeout(restore,260);
}
function addPointRow(type='peak',selected='',roleLabel='',initialDateTime=null){
  pointSeq++;
  const row=document.createElement('div'); row.className='point-row'; row.dataset.id=String(pointSeq); row.dataset.role=roleLabel||'';
  row.innerHTML=`<div class="point-no"></div>
    <label class="point-type-label"><span class="field-caption">種類</span><select class="point-type">${typeOptions(type)}</select></label>
    <label class="point-name-label"><span class="field-caption">地点</span><span class="hut-select-access"><select class="point-select">${candidateOptions(pointTypeGroup(type),selected)}</select><a class="hut-home-link hut-home-inline hidden" href="#" target="_blank" rel="noopener noreferrer">公式HP <span aria-hidden="true">↗</span></a></span></label>
    <label class="datetime-label date-label"><span class="field-caption">通過日</span><span class="date-control"><input class="point-date" type="date" value="${initialDateTime?.date||todayLocal()}"><button class="date-picker-btn" type="button" title="カレンダーを開く" aria-label="カレンダーを開く">📅</button></span></label>
    <label class="datetime-label time-label"><span class="field-caption">通過時刻</span><span class="time-control-with-ct"><input class="point-time" type="time" step="600" value="${normalizeTimeToTenMinutes(initialDateTime?.time||'06:00')}"><span class="course-time-missing-badge hidden" title="直前地点からの標準CTが未登録です">CT情報なし</span></span></label>
    <label class="stay-option ${(type==='hut'||type==='camp')?'':'hidden'}"><span>宿泊</span><span class="stay-toggle"><input class="point-stay" type="checkbox"><b><span class="stay-label-desktop">ここに泊まる</span><span class="stay-label-mobile">泊まる</span></b></span></label>
    <label class="stay-departure hidden"><span class="field-caption">翌朝出発</span><input class="stay-departure-time" type="time" step="600" value="06:00" aria-label="翌朝出発時刻"></label>
    <button class="move up" type="button" title="上へ">↑</button><button class="move down" type="button" title="下へ">↓</button><button class="remove" type="button" title="削除">×</button>
    <div class="point-meta">地点を選択してください</div>`;
  $('points').appendChild(row); renumber();
  if(window.TratenTrailheadAccess)window.TratenTrailheadAccess.attachRow?.(row);
  else ensureAccessResources().then(()=>window.TratenTrailheadAccess?.attachRow?.(row)).catch(()=>{});
  const typeSel=row.querySelector('.point-type'), pointSel=row.querySelector('.point-select'), stay=row.querySelector('.stay-option'), stayDeparture=row.querySelector('.stay-departure'), stayDepartureTime=row.querySelector('.stay-departure-time'), hutHomeLink=row.querySelector('.hut-home-link');
  const selectedOvernightCandidate=()=>{
    const p=selectedCandidate(pointSel.value);
    return p&&(p.type==='hut'||p.type==='camp')?p:null;
  };
  const refreshStayOption=()=>{
    const overnight=!!selectedOvernightCandidate();
    stay.classList.toggle('hidden',!overnight);
    if(!overnight)row.querySelector('.point-stay').checked=false;
  };
  const refreshStayDeparture=()=>{
    const enabled=!!selectedOvernightCandidate()&&!!row.querySelector('.point-stay')?.checked;
    stayDeparture?.classList.toggle('hidden',!enabled);
  };
  const refreshHutHomepage=()=>{
    const p=selectedCandidate(pointSel.value);
    const url=p?.type==='hut'?hutOfficialSite(p?.name||''):'';
    hutHomeLink?.classList.toggle('hidden',!url);
    if(hutHomeLink){hutHomeLink.href=url||'#';hutHomeLink.title=url?`${p?.name||'山小屋'}の公式ホームページを開く`:'';hutHomeLink.setAttribute('aria-label',url?`${p?.name||'山小屋'}の公式ホームページを開く`:'');}
  };
  typeSel.addEventListener('change',()=>preservePointRowViewport(row,()=>{clearRepresentativeSegmentMeta(row);pointSel.innerHTML=candidateOptions(typeSel.value); refreshStayOption(); refreshStayDeparture(); refreshHutHomepage(); updateMeta(row); refreshAllCourseTimeMissingBadges();}));
  pointSel.addEventListener('change',()=>preservePointRowViewport(row,()=>{
    clearRepresentativeSegmentMeta(row);
    const p=selectedCandidate(pointSel.value);
    if(p){
      logPointSelected(row,p);
      refreshStayOption();
      refreshStayDeparture();
      refreshHutHomepage();
      applyCourseTimeFromPrevious(row,{announce:true});
      updateMeta(row);
      refreshCourseTimeMissingBadge(row);
      ensureNextPointIsLater(row);
      refreshAllCourseTimeMissingBadges();
    }else{
      refreshStayOption();
      refreshStayDeparture();
      refreshHutHomepage();
      updateMeta(row);
      refreshAllCourseTimeMissingBadges();
    }
  }));
  const dateInput=row.querySelector('.point-date'), timeInput=row.querySelector('.point-time');
  const pickerBtn=row.querySelector('.date-picker-btn');
  const openDatePicker=()=>{
    try{ if(typeof dateInput.showPicker==='function') dateInput.showPicker(); else { dateInput.focus(); dateInput.click(); } }catch(_){ dateInput.focus(); }
  };
  pickerBtn?.addEventListener('click',openDatePicker);
  dateInput.addEventListener('dblclick',openDatePicker);
  [dateInput,timeInput].forEach(input=>{
    input.addEventListener('change',()=>{
      if(input===timeInput&&timeInput.value)timeInput.value=normalizeTimeToTenMinutes(timeInput.value);
      row.dataset.datetimeBefore=rowDateTimeValue(row)||'';
      if(row.querySelector('.point-stay')?.checked){
        updateForecastHorizon();
        renderRouteMaps();
        refreshAllCourseTimeMissingBadges();
      }else{
        propagatePointTimesFrom(row,{announce:true});
      }
    });
  });
  row.querySelector('.point-stay').addEventListener('change',()=>{
    refreshStayDeparture();
    if(row.querySelector('.point-stay')?.checked){
      propagatePointTimesFrom(row,{useStayDeparture:true,announce:true});
    }else{
      propagatePointTimesFrom(row,{announce:true});
    }
    updateForecastHorizon();
    renderRouteMaps();
    refreshAllCourseTimeMissingBadges();
  });
  stayDepartureTime?.addEventListener('change',()=>{
    if(!stayDepartureTime.value)stayDepartureTime.value='06:00';
    stayDepartureTime.value=normalizeTimeToTenMinutes(stayDepartureTime.value)||'06:00';
    propagatePointTimesFrom(row,{useStayDeparture:true,announce:true});
  });
  row.querySelector('.remove').addEventListener('click',()=>{row.remove();renumber();updateForecastHorizon();renderRouteMaps();refreshAllCourseTimeMissingBadges();});
  row.querySelector('.up').addEventListener('click',()=>{const p=row.previousElementSibling;if(p){clearRepresentativeSegmentMeta(row);clearRepresentativeSegmentMeta(p);row.parentNode.insertBefore(row,p);}renumber();renderRouteMaps();refreshAllCourseTimeMissingBadges();});
  row.querySelector('.down').addEventListener('click',()=>{const n=row.nextElementSibling;if(n){clearRepresentativeSegmentMeta(row);clearRepresentativeSegmentMeta(n);row.parentNode.insertBefore(n,row); }renumber();renderRouteMaps();refreshAllCourseTimeMissingBadges();});
  refreshHutHomepage();
  updateMeta(row);
  refreshCourseTimeMissingBadge(row);
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
function ensureNextPointIsLater(row){
  const next=row?.nextElementSibling;
  const current=rowDateTimeValue(row);
  if(!next||!current)return;
  const currentMs=new Date(current).getTime();
  if(Number.isNaN(currentMs))return;
  const nextValue=rowDateTimeValue(next);
  const nextMs=nextValue?new Date(nextValue).getTime():NaN;
  // 次のポイントが未設定、同時刻、または前の時刻の場合だけ自動補正する。
  // すでにユーザーが後の時刻を設定している場合は上書きしない。
  if(!nextValue||Number.isNaN(nextMs)||nextMs<=currentMs){
    syncNextPointInitialTime(row);
  }
}

function clearRepresentativeSegmentMeta(row){
  if(!row)return;
  delete row.dataset.segmentCtMinutes;
  delete row.dataset.segmentCtKind;
  delete row.dataset.segmentCtSource;
  delete row.dataset.segmentCtFrom;
  delete row.dataset.segmentCtTo;
}
function representativeSegmentMeta(row,from,to){
  if(!row||!from||!to)return null;
  const minutes=Number(row.dataset.segmentCtMinutes);
  if(!Number.isFinite(minutes)||minutes<=0)return null;
  if(row.dataset.segmentCtFrom!==from.name||row.dataset.segmentCtTo!==to.name)return null;
  return {
    minutes,
    kind:row.dataset.segmentCtKind||'verified',
    source:row.dataset.segmentCtSource||''
  };
}
function refreshCourseTimeMissingBadge(row){
  const badge=row?.querySelector('.course-time-missing-badge');
  const timeInput=row?.querySelector('.point-time');
  if(!badge)return;
  const prev=row.previousElementSibling;
  badge.classList.remove('verified','estimated','derived');
  if(timeInput){
    timeInput.classList.remove('ct-time-missing','ct-time-estimated');
    timeInput.removeAttribute('data-ct-attention');
    timeInput.title='';
  }
  if(!prev){
    badge.classList.add('hidden');
    return;
  }
  const from=selectedCandidate(prev.querySelector('.point-select')?.value);
  const to=selectedCandidate(row.querySelector('.point-select')?.value);
  if(!from||!to){
    badge.classList.add('hidden');
    return;
  }
  const stored=representativeSegmentMeta(row,from,to);
  const usableStored=stored?.kind==='derived'?null:stored;
  const info=usableStored||courseTimeInfo(from,to);
  if(!info){
    badge.textContent='CT情報なし・時刻入力';
    badge.title='直前地点からの標準CTが未登録です。通過時刻を手入力してください。';
    if(timeInput){
      timeInput.classList.add('ct-time-missing');
      timeInput.dataset.ctAttention='missing';
      timeInput.title='CT情報がない区間です。通過時刻を手入力してください。';
    }
    badge.classList.remove('hidden');
    return;
  }
  const timeText=formatCourseTimeMinutes(info.minutes);
  if(stored?.kind==='estimated'||info.estimated){
    badge.textContent=`推定CT ${timeText}${walkingPacePercent()===100?'':` → ${formatCourseTimeMinutes(adjustedCourseMinutes(info.minutes))}`}・要確認`;
    badge.title='確認済みCTが未登録のため、固定座標・標高差などから算出した参考CTです。必要に応じて通過時刻を調整してください。';
    if(timeInput){
      timeInput.classList.add('ct-time-estimated');
      timeInput.dataset.ctAttention='estimated';
      timeInput.title='推定CTから自動計算した時刻です。必要に応じて手入力で調整してください。';
    }
    badge.classList.add('estimated');
    badge.classList.remove('hidden');
    return;
  }
  badge.textContent=`CT ${timeText}${walkingPacePercent()===100?'':` → ${formatCourseTimeMinutes(adjustedCourseMinutes(info.minutes))}`}`;
  badge.title=`直前地点からの標準CTです${info.source?` / ${info.source}`:''}`;
  badge.classList.add('verified');
  badge.classList.remove('hidden');
}
function refreshAllCourseTimeMissingBadges(){
  [...$('points').children].forEach(refreshCourseTimeMissingBadge);
}

function stayDepartureBaseMs(row){
  const date=row?.querySelector('.point-date')?.value;
  if(!date)return NaN;
  const departure=row.querySelector('.stay-departure-time')?.value||'06:00';
  const midnight=new Date(`${date}T00:00:00+09:00`).getTime();
  if(!Number.isFinite(midnight))return NaN;
  const nextDate=formatJstInput(midnight+24*60*60*1000).date;
  const departureMs=new Date(`${nextDate}T${departure}:00+09:00`).getTime();
  return Number.isFinite(departureMs)?departureMs:NaN;
}

function walkingPacePercent(){
  const el=$('walkingPaceRange');
  const raw=Number(el?.value||100);
  return Math.max(50,Math.min(150,Number.isFinite(raw)?raw:100));
}
function adjustedCourseMinutes(minutes){
  const base=Number(minutes);
  if(!Number.isFinite(base)||base<=0)return base;
  return Math.max(1,Math.round(base*100/walkingPacePercent()));
}
function walkingPaceSuffix(minutes){
  const pace=walkingPacePercent();
  if(pace===100)return '';
  return ` → 設定CT ${formatCourseTimeMinutes(adjustedCourseMinutes(minutes))}（${pace}%）`;
}
function recalculateAllPointTimesForPace(){
  const first=$('points')?.firstElementChild;
  if(!first)return 0;
  let total=propagatePointTimesFrom(first,{announce:false});
  let row=first;
  while(row){
    if(row.querySelector('.point-stay')?.checked) total+=propagatePointTimesFrom(row,{useStayDeparture:true,announce:false});
    row=row.nextElementSibling;
  }
  [...$('points').children].forEach(updateMeta);
  refreshAllCourseTimeMissingBadges();
  return total;
}
function setupWalkingPaceControl(){
  const range=$('walkingPaceRange'), out=$('walkingPaceValue');
  if(!range||!out)return;
  const saved=100;
  range.value='100';out.value='100%';out.textContent='100%';
  const apply=()=>{
    const pace=walkingPacePercent();
    out.value=`${pace}%`;out.textContent=`${pace}%`;
    const count=recalculateAllPointTimesForPace();
    if(count)setStatus(`歩くスピードを ${pace}% に変更し、CTに合わせて通過時刻を再計算しました。`);
  };
  range.addEventListener('input',()=>{const pace=walkingPacePercent();out.value=`${pace}%`;out.textContent=`${pace}%`;});
  range.addEventListener('change',apply);
}

function travelMinutesBetweenRows(fromRow,toRow){
  const from=selectedCandidate(fromRow?.querySelector('.point-select')?.value);
  const to=selectedCandidate(toRow?.querySelector('.point-select')?.value);
  const stored=from&&to?representativeSegmentMeta(toRow,from,to):null;
  const info=stored||((from&&to)?courseTimeInfo(from,to):null);
  const missing=stored?.kind==='missing';
  return {minutes:info&&!missing?adjustedCourseMinutes(info.minutes):60,standardMinutes:info?.minutes||null,info:missing?null:info,from,to};
}

function setRowDateTimeMs(row,ms,auto=true){
  if(!row||!Number.isFinite(ms))return false;
  const shifted=formatJstInput(ms);
  row.querySelector('.point-date').value=shifted.date;
  row.querySelector('.point-time').value=shifted.time;
  row.dataset.datetimeBefore=`${shifted.date}T${shifted.time}:00+09:00`;
  row.dataset.courseTimeAuto=auto?'1':'';
  refreshCourseTimeMissingBadge(row);
  return true;
}

// V1.4.92: 起点の日時変更を、各区間CTで次の宿泊地点まで連鎖反映する。
// 宿泊地点から再開する場合は「翌朝出発 + 次区間CT」が次ポイントの通過時刻。
function propagatePointTimesFrom(row,{useStayDeparture=false,announce=false}={}){
  if(!row)return 0;
  let prev=row;
  let baseMs=useStayDeparture?stayDepartureBaseMs(row):new Date(rowDateTimeValue(row)).getTime();
  if(!Number.isFinite(baseMs))return 0;
  if(!useStayDeparture&&row.querySelector('.point-stay')?.checked)return 0;
  let next=row.nextElementSibling;
  let updated=0;
  while(next){
    const travel=travelMinutesBetweenRows(prev,next);
    baseMs+=travel.minutes*60*1000;
    setRowDateTimeMs(next,baseMs,!!travel.info);
    updated++;
    // 到着した地点が宿泊なら、その先は翌朝出発時刻を別起点にするためここで止める。
    if(next.querySelector('.point-stay')?.checked)break;
    prev=next;
    next=next.nextElementSibling;
  }
  updateForecastHorizon();
  renderRouteMaps();
  refreshAllCourseTimeMissingBadges();
  if(announce&&updated){
    const label=useStayDeparture?'翌朝出発時刻':'通過日時';
    setStatus(`${label}を起点に、標準CTで${updated}地点の通過時刻を自動調整しました。`);
  }
  return updated;
}

function applyCourseTimeFromPrevious(row,{announce=false}={}){
  const prev=row?.previousElementSibling;
  if(!prev)return false;
  const from=selectedCandidate(prev.querySelector('.point-select')?.value);
  const to=selectedCandidate(row.querySelector('.point-select')?.value);
  const info=from&&to?courseTimeInfo(from,to):null;
  if(!info)return false;
  const baseMs=prev.querySelector('.point-stay')?.checked?stayDepartureBaseMs(prev):new Date(rowDateTimeValue(prev)).getTime();
  if(!Number.isFinite(baseMs))return false;
  const shiftedMs=baseMs+adjustedCourseMinutes(info.minutes)*60*1000;
  setRowDateTimeMs(row,shiftedMs,true);
  if(announce){
    const shifted=formatJstInput(shiftedMs);
    setStatus(`${from.name} → ${to.name}：標準CT ${formatCourseTimeMinutes(info.minutes)}${walkingPaceSuffix(info.minutes)}${info.sourceType==='yamareco'?'（補助ソース）':''} を加算して ${shifted.time} にしました。`);
  }
  updateForecastHorizon();
  return true;
}

function syncNextPointInitialTime(row){
  const next=row?.nextElementSibling;
  if(!next)return;
  // 変更した地点から、次の宿泊地点まで一括で再計算する。
  propagatePointTimesFrom(row,{useStayDeparture:!!row.querySelector('.point-stay')?.checked});
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
    const prev=row.previousElementSibling;
    const from=prev?selectedCandidate(prev.querySelector('.point-select')?.value):null;
    const ct=courseTimeInfo(from,p);
    const ctText=ct?` / 標準CT +${formatCourseTimeMinutes(ct.minutes)}${walkingPaceSuffix(ct.minutes)}（無雪期・休憩含まず${ct.sourceType==='yamareco'?'・補助ソース':''}）`:'';
    meta.textContent=`${p.name} / ${p.elevation||'標高自動'}m / ${Number(p.lat).toFixed(4)}, ${Number(p.lon).toFixed(4)}${ctText}`;
    renderRouteMaps();
    return;
  }
  meta.textContent=`${p.name} / 座標未確定のため利用対象外`;
  renderRouteMaps();
}
function collectPoints(){
  return [...$('points').children].map((row,i)=>{
    const p=selectedCandidate(row.querySelector('.point-select').value);
    if(!p) return null; // 最初から表示する4枠は、使わない枠を空欄のままにできる
    const date=row.querySelector('.point-date').value, time=row.querySelector('.point-time').value;
    if(!date||!time) throw new Error(`${p.name} の通過日・通過時刻を入力してください。`);
    if(!hasResolvedCoord(p)) throw new Error(`${p.name} の座標が確定していないため利用できません。別の確定済み地点を選択してください。`);
    return {...p,date,time,type:p.type||row.querySelector('.point-type').value,stay:!!row.querySelector('.point-stay')?.checked,stayDepartureTime:row.querySelector('.stay-departure-time')?.value||'06:00',role:row.dataset.role||''};
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
  const targetMs=new Date(`${point.date}T${point.time}:00+09:00`).getTime();
  const timeline=(hourly.time||[]).map((time,i)=>({time,rain:numberOrNaN(hourly.precipitation?.[i]),wind:numberOrNaN(hourly.wind_speed_10m?.[i]),cape:numberOrNaN(hourly.cape?.[i])})).filter(x=>Math.abs(new Date(x.time).getTime()-targetMs)<=6*3600000);
  return {time:hourly.time[idx],temp:get('temperature_2m'),rh:get('relative_humidity_2m'),rain:get('precipitation'),cloud:get('cloud_cover'),wind:get('wind_speed_10m'),gust:get('wind_gusts_10m'),windDir:get('wind_direction_10m'),cape:get('cape'),visibility:get('visibility'),freezing:get('freezing_level_height'),timeline};
}
function blendTimelineRows(providerRows){
  const slots=new Map();
  (providerRows||[]).forEach(x=>(x?.row?.timeline||[]).forEach(row=>{const key=String(row.time).slice(0,13),slot=slots.get(key)||{time:row.time,rain:[],wind:[],cape:[]};['rain','wind','cape'].forEach(k=>{if(Number.isFinite(row[k]))slot[k].push(row[k]);});slots.set(key,slot);}));
  return [...slots.values()].sort((a,b)=>new Date(a.time)-new Date(b.time)).map(x=>({time:x.time,rain:mean(x.rain),wind:mean(x.wind),cape:max(x.cape)}));
}
// V1.4.213: short-lived per-point/model cache for repeated analyses in the same tab.
// The server proxy also caches upstream Open-Meteo responses, but this avoids even the
// round trip to Render when the user only tweaks the route or re-runs the same plan.
const WEATHER_POINT_CACHE_TTL_MS=60*60*1000;
const WEATHER_POINT_CACHE_PREFIX='traten:weather-point:v15131:';
const weatherPointMemoryCache=new Map();
function weatherPointCacheKey(provider,point){
  return `${provider.id}|${Number(point.lat).toFixed(4)}|${Number(point.lon).toFixed(4)}|${Math.round(Number(point.elevation)||0)}|${point.date}|${point.time}`;
}
function weatherPointCacheGet(provider,point){
  const key=weatherPointCacheKey(provider,point), now=Date.now();
  const mem=weatherPointMemoryCache.get(key);
  if(mem&&now-mem.savedAt<WEATHER_POINT_CACHE_TTL_MS)return mem.row;
  if(mem)weatherPointMemoryCache.delete(key);
  try{
    const raw=sessionStorage.getItem(WEATHER_POINT_CACHE_PREFIX+key);
    if(!raw)return null;
    const parsed=JSON.parse(raw);
    if(!parsed||now-Number(parsed.savedAt)>WEATHER_POINT_CACHE_TTL_MS){sessionStorage.removeItem(WEATHER_POINT_CACHE_PREFIX+key);return null;}
    weatherPointMemoryCache.set(key,{savedAt:Number(parsed.savedAt),row:parsed.row});
    return parsed.row||null;
  }catch(_){return null;}
}
function weatherPointCachePut(provider,point,row){
  if(!row)return;
  const key=weatherPointCacheKey(provider,point), payload={savedAt:Date.now(),row};
  weatherPointMemoryCache.set(key,payload);
  try{sessionStorage.setItem(WEATHER_POINT_CACHE_PREFIX+key,JSON.stringify(payload));}catch(_){ }
}
async function fetchProviderBatch(provider,points){
  const eligible=points.map((point,index)=>({point,index})).filter(x=>providerEligible(provider,x.point));
  if(!eligible.length)return [];
  const out=[];
  const misses=[];
  for(const item of eligible){
    const cached=weatherPointCacheGet(provider,item.point);
    if(cached)out.push({index:item.index,row:cached,cacheHit:true});
    else misses.push(item);
  }
  if(!misses.length)return out;
  const dates=misses.map(x=>x.point.date).sort();
  const params=new URLSearchParams({
    latitude:misses.map(x=>x.point.lat).join(','),
    longitude:misses.map(x=>x.point.lon).join(','),
    elevation:misses.map(x=>Number(x.point.elevation)||'nan').join(','),
    hourly:provider.vars.join(','),timezone:'Asia/Tokyo',start_date:dates[0],end_date:dates[dates.length-1],wind_speed_unit:'ms'
  });
  if(provider.model)params.set('models',provider.model);
  const r=await proxyFetch(`${provider.endpoint}?${params}`);
  if(!r.ok)throw new Error(`HTTP ${r.status}`);
  const raw=await r.json();
  const locations=Array.isArray(raw)?raw:[raw];
  if(locations.length!==misses.length)throw new Error(`地点数不一致 (${locations.length}/${misses.length})`);
  misses.forEach((x,k)=>{
    const row=extractProviderRow(locations[k]?.hourly,x.point);
    if(row)weatherPointCachePut(provider,x.point,row);
    out.push({index:x.index,row,cacheHit:false});
  });
  return out;
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

async function analyzePointsBatch(points,providerList=providers,statusLabel='気象モデル'){
  const buckets=points.map(()=>({rows:[],errors:[]}));
  if(providerList.length){
    setStatus(`${statusLabel}：${providerList.map(p=>p.name).join(' / ')} を並列取得中…`);
    const jobs=providerList.map(async provider=>{
      try{return {provider,fetched:await fetchProviderBatch(provider,points),error:null};}
      catch(error){return {provider,fetched:[],error};}
    });
    const settled=await Promise.all(jobs);
    settled.forEach(({provider,fetched,error})=>{
      if(error){
        points.forEach((point,index)=>{if(providerEligible(provider,point))buckets[index].errors.push(`${provider.name}: ${error?.message||'取得失敗'}`);});
        return;
      }
      fetched.forEach(x=>{
        if(x.row)buckets[x.index].rows.push({provider,row:x.row,cacheHit:!!x.cacheHit});
        else buckets[x.index].errors.push(`${provider.name}: 指定時刻なし`);
      });
    });
  }
  // Open-Meteo 429 fallback is uncommon, but when needed fetch all affected
  // points in parallel, and MET Norway / NOAA GFS in parallel per point.
  const metnoProvider={id:'metno',name:'MET Norway（予備）',kind:'fallback'};
  const noaaProvider={id:'noaa-gfs',name:'NOAA GFS（直取得）',kind:'fallback'};
  const fallbackIndexes=buckets.map((bucket,index)=>({bucket,index})).filter(x=>!x.bucket.rows.length&&x.bucket.errors.some(v=>v.includes('HTTP 429'))).map(x=>x.index);
  if(fallbackIndexes.length){
    setStatus(`Open-Meteoが混雑中：${fallbackIndexes.length}地点を予備データで並列取得中…`);
    await Promise.all(fallbackIndexes.map(async index=>{
      const bucket=buckets[index], point=points[index];
      const [met,noaa]=await Promise.allSettled([fetchMetNoFallback(point),fetchNoaaGfsFallback(point)]);
      if(met.status==='fulfilled'&&met.value){bucket.rows.push({provider:metnoProvider,row:met.value});bucket.errors.push('Open-Meteo: HTTP 429 → MET Norway予備へ切替');}
      else if(met.status==='rejected')bucket.errors.push(met.reason?.message||'MET Norway取得失敗');
      else bucket.errors.push('MET Norway: 指定時刻の予報なし（約9日先まで）');
      if(noaa.status==='fulfilled'&&noaa.value){bucket.rows.push({provider:noaaProvider,row:noaa.value});bucket.errors.push('NOAA GFS: NOMADS GRIB2を直接取得');}
      else if(noaa.status==='rejected')bucket.errors.push(noaa.reason?.message||'NOAA GFS取得失敗');
      else bucket.errors.push('NOAA GFS: 指定時刻の予報なし（約16日先まで）');
    }));
  }
  return points.map((point,index)=>{
    const rows=buckets[index].rows, errors=buckets[index].errors;
    if(!rows.length)throw new Error(`${point.name}: 予報データを取得できませんでした。 ${errors.join(' / ')||'対応モデルがありません'}`);
    const avg=blendProviderRows(rows);
    return {point,providerRows:rows,errors,timelineRows:blendTimelineRows(rows),...avg,grade:assessGrade(avg),confidence:(rows.length===1&&rows[0].provider?.kind==='fallback'?'FALLBACK':assessConfidence(rows.map(x=>x.row))),thunder:thunderLevel(avg),hazards:assessHazards(avg)};
  });
}

async function analyzePointsFirstAvailable(points,providerList,statusLabel='先行モデル'){
  if(!providerList.length)throw new Error('利用可能な先行モデルがありません。');
  setStatus(`${statusLabel}：${providerList.map(p=>p.name).join(' / ')} の先着データを取得中…`);
  const wrapped=providerList.map(provider=>
    analyzePointsBatch(points,[provider],provider.name)
      .then(results=>({provider,results}))
      .catch(error=>Promise.reject({provider,error}))
  );
  try{
    return await Promise.any(wrapped);
  }catch(aggregate){
    const errs=Array.isArray(aggregate?.errors)?aggregate.errors:[];
    const msg=errs.map(x=>`${x?.provider?.name||'モデル'}: ${x?.error?.message||'取得失敗'}`).join(' / ');
    throw new Error(msg||'先行モデルの取得に失敗しました。');
  }
}

function mergeAnalysisResults(baseResults,extraResults){
  return baseResults.map((base,index)=>{
    const extra=extraResults[index];
    if(!extra)return base;
    const byId=new Map();
    [...(base.providerRows||[]),...(extra.providerRows||[])].forEach(x=>byId.set(x.provider?.id||x.provider?.name,x));
    const providerRows=[...byId.values()];
    const avg=blendProviderRows(providerRows);
    const errors=[...(base.errors||[]),...(extra.errors||[])].filter((v,i,a)=>a.indexOf(v)===i);
    return {point:base.point,providerRows,errors,timelineRows:blendTimelineRows(providerRows),...avg,grade:assessGrade(avg),confidence:(providerRows.length===1&&providerRows[0].provider?.kind==='fallback'?'FALLBACK':assessConfidence(providerRows.map(x=>x.row))),thunder:thunderLevel(avg),hazards:assessHazards(avg)};
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

let activeAnalysisRun=0;
async function analyze(){
  const runId=++activeAnalysisRun;
  const started=performance.now(); let points=[];
  try{
    points=collectPoints(); if(points.length<1)throw new Error('分析する地点を1つ以上選択してください。');
    validateChronology(points);
    $('analyzeBtn').dataset.busy='1'; $('analyzeBtn').disabled=true; $('analyzeBtn').setAttribute('aria-disabled','true'); setStatus(`分析開始：${points.length}地点を高速取得する準備をしています…`);
    await ensureElevations(points);
    const stayPoints=points.filter(p=>p.stay);
    const maxAhead=Math.max(...points.map(p=>daysAhead(p.date)));
    // V1.4.248: keep the fast first paint from JMA/ECMWF, but start ICON at
    // the same time so visibility can be merged as soon as ICON returns.
    // GFS remains the later deterioration-scenario guard.
    const overnightPromise=stayPoints.length
      ? analyzeOvernightsBatch(stayPoints).then(v=>({items:v,warning:''})).catch(e=>({items:[],warning:` / 宿泊詳細は取得できませんでした（${e?.message||'取得失敗'}）`}))
      : Promise.resolve({items:[],warning:''});

    let firstState;
    let earlyProviderPromises=new Map();
    if(maxAhead<=15){
      const earlyProviders=providers.filter(p=>p.id==='jma'||p.id==='ecmwf'||p.id==='icon');
      earlyProviders.forEach(provider=>{
        earlyProviderPromises.set(provider.id,
          analyzePointsBatch(points,[provider],`${provider.name}先行取得`)
            .then(results=>({ok:true,provider,results}))
            .catch(error=>({ok:false,provider,error}))
        );
      });
      const decisionIds=['jma','ecmwf'];
      const decisionPromises=decisionIds.map(id=>earlyProviderPromises.get(id).then(state=>{
        if(state.ok)return {provider:state.provider,results:state.results};
        return Promise.reject({provider:state.provider,error:state.error});
      }));
      try{
        firstState=await Promise.any(decisionPromises);
      }catch(aggregate){
        const errs=Array.isArray(aggregate?.errors)?aggregate.errors:[];
        const msg=errs.map(x=>`${x?.provider?.name||'モデル'}: ${x?.error?.message||'取得失敗'}`).join(' / ');
        throw new Error(msg||'JMA/ECMWF先行モデルの取得に失敗しました。');
      }
    }else{
      // Preserve the existing long-range fallback behavior.
      firstState=await analyzePointsFirstAvailable(points,providers,'先行モデル');
    }
    let latestResults=firstState.results;
    const primaryProviders=[firstState.provider];
    if(runId!==activeAnalysisRun)return;
    let latestOvernight=[];
    const mountain=currentMountainLabel();

    // Paint the actionable decision before charts, maps, overnight details and
    // secondary models. This makes the page useful as soon as weather arrives.
    renderSummaryCore(latestResults);
    const initialMs=Math.round(performance.now()-started);
    setStatus(`総合判断を先行表示：${points.length}地点（詳細・追加モデルを更新中…）`,false);
    scrollToSummaryResult();
    delete $('analyzeBtn').dataset.busy; refreshAnalyzeButtonState();
    requestAnimationFrame(()=>{if(runId===activeAnalysisRun)renderAll(latestResults,latestOvernight);});
    saveLastRouteSnapshot(mountain,points);
    points.forEach(p=>logEvent('route_point_used',{success:true,mountain,metadata:{point_name:p.name||'',point_type:p.type||'other',point_role:p.role||'',source:p.source||''}}));
    logEvent('weather_analysis',{success:true,duration_ms:initialMs,mountain,route_points:points.length,stay_count:stayPoints.length,metadata:{provider_count:primaryProviders.length,provider_count_final:providers.length,manual_datetime:true,batch_weather:true,parallel_models:true,point_cache:true,progressive:true,first_provider:firstState.provider.id}});

    // V1.4.248: every early model is merged independently when it arrives.
    // This guarantees that ICON visibility repaints the analysis screen without
    // waiting for GFS or the other early model.
    const progressiveStates=[];
    if(earlyProviderPromises.size){
      for(const [id,promise] of earlyProviderPromises.entries()){
        if(id===firstState.provider.id)continue;
        progressiveStates.push(promise.then(state=>{
          if(runId!==activeAnalysisRun)return state;
          if(state.ok&&state.results?.length){
            latestResults=mergeAnalysisResults(latestResults,state.results);
            renderAll(latestResults,latestOvernight);
            if(id==='icon')setStatus(`ICON視界を反映：${points.length}地点（残りモデルを更新中…）`,false);
          }
          return state;
        }));
      }
    }

    const gfsProvider=providers.find(p=>p.id==='gfs');
    const gfsVisiblePromise=(maxAhead<=15&&gfsProvider)
      ? analyzePointsBatch(points,[gfsProvider],'GFS悪化監視').then(results=>({ok:true,provider:gfsProvider,results})).catch(error=>({ok:false,provider:gfsProvider,error})).then(state=>{
          if(runId!==activeAnalysisRun)return state;
          if(state.ok&&state.results?.length){latestResults=mergeAnalysisResults(latestResults,state.results);renderAll(latestResults,latestOvernight);}
          return state;
        })
      : Promise.resolve({ok:true,provider:gfsProvider,results:[]});

    // For >15 days the legacy first-available path is retained; fetch the
    // providers not used for the first result as one background batch.
    const longRangeSecondaryPromise=maxAhead>15
      ? analyzePointsBatch(points,providers.filter(p=>p.id!==firstState.provider.id),'追加モデル').then(results=>({ok:true,results})).catch(error=>({ok:false,error})).then(state=>{
          if(runId!==activeAnalysisRun)return state;
          if(state.ok&&state.results?.length){latestResults=mergeAnalysisResults(latestResults,state.results);renderAll(latestResults,latestOvernight);}
          return state;
        })
      : Promise.resolve({ok:true,results:[]});

    const overnightVisiblePromise=overnightPromise.then(state=>{
      if(runId!==activeAnalysisRun)return state;
      latestOvernight=state.items||[]; renderAll(latestResults,latestOvernight);
      return state;
    });
    const [progressiveDone,gfsState,longRangeState,overnightState]=await Promise.all([Promise.all(progressiveStates),gfsVisiblePromise,longRangeSecondaryPromise,overnightVisiblePromise]);
    if(runId!==activeAnalysisRun)return;
    const notes=[];
    progressiveDone.filter(x=>x&&!x.ok).forEach(x=>notes.push(`${x.provider?.name||'追加モデル'}取得失敗: ${x.error?.message||'取得失敗'}`));
    if(!gfsState.ok)notes.push(`GFS取得失敗: ${gfsState.error?.message||'取得失敗'}`);
    if(!longRangeState.ok)notes.push(`追加モデル取得失敗: ${longRangeState.error?.message||'取得失敗'}`);
    if(overnightState.warning)notes.push(overnightState.warning.replace(/^ \/ /,''));
    setStatus(notes.length?`先行分析は完了。${notes.join(' / ')}`:`分析完了：${points.length}地点${stayPoints.length?` / 宿泊 ${stayPoints.length}泊`:''}（モデル並列・キャッシュ利用）`,false);
  }catch(e){
    if(runId===activeAnalysisRun)setStatus(e.message||String(e),true);
    logEvent('weather_analysis',{success:false,duration_ms:performance.now()-started,mountain:currentMountainLabel(),route_points:points.length,error_message:e.message||String(e)});
  }finally{
    if(runId===activeAnalysisRun){delete $('analyzeBtn').dataset.busy;refreshAnalyzeButtonState();}
  }
}

function analyzeOvernightJson(point,nightNo,j){
  const next=addDays(point.date,1), h=j?.hourly||{}, d=j?.daily||{};
  const sunset=d.sunset?.find(x=>String(x).startsWith(point.date))||d.sunset?.[0]||`${point.date}T18:00`;
  const sunrise=d.sunrise?.find(x=>String(x).startsWith(next))||d.sunrise?.[1]||`${next}T05:00`;
  const allRows=(h.time||[]).map((t,i)=>({time:t,temp:numberOrNaN(h.temperature_2m?.[i]),apparent:numberOrNaN(h.apparent_temperature?.[i]),rh:numberOrNaN(h.relative_humidity_2m?.[i]),dew:numberOrNaN(h.dew_point_2m?.[i]),rain:numberOrNaN(h.precipitation?.[i]),cloud:numberOrNaN(h.cloud_cover?.[i]),lowCloud:numberOrNaN(h.cloud_cover_low?.[i]),midCloud:numberOrNaN(h.cloud_cover_mid?.[i]),highCloud:numberOrNaN(h.cloud_cover_high?.[i]),wind:numberOrNaN(h.wind_speed_10m?.[i]),gust:numberOrNaN(h.wind_gusts_10m?.[i]),cape:numberOrNaN(h.cape?.[i]),visibility:numberOrNaN(h.visibility?.[i])}));
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
  return {nightNo,point,sunset,sunrise,sunsetView,sunriseView,minTemp,morningMinTemp,minApp,maxWind,maxGust,maxRain,avgCloud,avgWind,maxRh,minVis,fogRisk,moon,best,score,_allRows:allRows,_astroRows:astroRows,_morningRows:morningRows,_eveningRows:eveningRows,_darkStart:darkStart,_darkEnd:darkEnd,dawn:{time:dawnRow?.time||dawnTarget,temp:dawnRow?.temp,rain:dawnRow?.rain,cloud:dawnRow?.cloud,wind:dawnRow?.wind,label:dawnVisual.label,cls:dawnVisual.cls},milkyLabel:score>=75?'期待大':score>=55?'見える可能性あり':score>=35?'条件次第':'厳しい'};
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
  return {nightNo,point,sunset,sunrise,sunsetView,sunriseView,minTemp,morningMinTemp,minApp,maxWind,maxGust,maxRain,avgCloud,avgWind,maxRh,minVis:NaN,fogRisk,moon,best,score,_allRows:allRows,_astroRows:astroRows,_morningRows:morningRows,_eveningRows:eveningRows,_darkStart:darkStart,_darkEnd:darkEnd,dawn:{time:dawnRow?.time||dawnTarget,temp:dawnRow?.temp,rain:dawnRow?.rain,cloud:dawnRow?.cloud,wind:dawnRow?.wind,label:dawnVisual.label,cls:dawnVisual.cls},milkyLabel:score>=75?'期待大':score>=55?'見える可能性あり':score>=35?'条件次第':'厳しい',source:'MET Norway（予備）'};
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
  const vars=['temperature_2m','apparent_temperature','relative_humidity_2m','dew_point_2m','precipitation','cloud_cover','cloud_cover_low','cloud_cover_mid','cloud_cover_high','wind_speed_10m','wind_gusts_10m','cape','visibility'];
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
    const arrivalMs=new Date(`${o.point.date}T${o.point.time}:00+09:00`).getTime(),departureMs=new Date(`${addDays(o.point.date,1)}T${o.point.stayDepartureTime||'08:00'}:00+09:00`).getTime();
    const timelineRows=(Array.isArray(o._allRows)?o._allRows:[]).filter(row=>{const t=new Date(row.time).getTime();return t>=arrivalMs-3*3600000&&t<=departureMs+3*3600000;});
    const clean={...o,best,score,milkyLabel:milkyLabelFromScore(score),milky,cloudSea,morningScene,eveningScene,terrain,timelineRows};delete clean._allRows;delete clean._astroRows;delete clean._morningRows;delete clean._eveningRows;delete clean._darkStart;delete clean._darkEnd;return clean;
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

function timelineThunder(cape,rain){
  const c=Number(cape),p=Number(rain);
  if((Number.isFinite(c)&&c>=1200)||(Number.isFinite(c)&&c>=700&&p>=1))return {label:'高',cls:'high'};
  if((Number.isFinite(c)&&c>=350)||(Number.isFinite(c)&&c>=150&&p>=0.2))return {label:'中',cls:'medium'};
  return {label:'低',cls:'low'};
}
function renderWeatherTimeline(rows,arrivalMs,departureMs=null){
  const data=(rows||[]).filter(x=>x?.time&&[x.rain,x.wind,x.cape].some(Number.isFinite)).sort((a,b)=>new Date(a.time)-new Date(b.time));
  if(data.length<2)return '<div class="wx-timeline-empty">時系列データを取得できませんでした</div>';
  const W=720,H=218,L=48,R=48,base=142,thY=174,plotW=W-L-R,step=plotW/Math.max(1,data.length-1),barW=Math.max(5,Math.min(22,plotW/data.length*.6));
  const axisMax=10,x=i=>L+i*step,rainY=v=>base-(Math.min(axisMax,Math.max(0,v))/axisMax)*92,windY=v=>base-(Math.min(axisMax,Math.max(0,v))/axisMax)*92;
  const windPoints=data.map((d,i)=>Number.isFinite(d.wind)?`${x(i).toFixed(1)},${windY(d.wind).toFixed(1)}`:null).filter(Boolean).join(' ');
  const times=data.map(d=>new Date(d.time).getTime()),nearest=ms=>times.reduce((best,t,i)=>Math.abs(t-ms)<Math.abs(times[best]-ms)?i:best,0);
  const ai=nearest(arrivalMs),di=departureMs?nearest(departureMs):ai,hx=Math.max(L,x(Math.min(ai,di))-step/2),hw=Math.max(8,x(Math.max(ai,di))-x(Math.min(ai,di))+step),bandLabel=departureMs?'滞在':'到着';
  const ticks=data.map((d,i)=>i%Math.max(1,Math.ceil(data.length/6))===0||i===data.length-1?`<text x="${x(i)}" y="211" text-anchor="middle">${timeOnly(d.time)}</text>`:'').join('');
  return `<div class="wx-timeline" role="img" aria-label="降水量、平均風速、雷リスクの時系列">
    <div class="wx-timeline-head"><b>前後の気象推移</b><span><i class="rain"></i>降水量 <i class="wind"></i>平均風速 <i class="stay"></i>${bandLabel}</span></div>
    <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      <rect class="wx-highlight" x="${hx.toFixed(1)}" y="18" width="${hw.toFixed(1)}" height="176" rx="5"/><text class="wx-highlight-label" x="${(hx+hw/2).toFixed(1)}" y="14" text-anchor="middle">${bandLabel}</text>
      <line class="wx-grid" x1="${L}" x2="${W-R}" y1="${base}" y2="${base}"/><line class="wx-grid faint" x1="${L}" x2="${W-R}" y1="96" y2="96"/><line class="wx-grid faint" x1="${L}" x2="${W-R}" y1="50" y2="50"/>
      ${data.map((d,i)=>`<rect class="wx-rain-bar" x="${(x(i)-barW/2).toFixed(1)}" y="${rainY(Number.isFinite(d.rain)?d.rain:0).toFixed(1)}" width="${barW.toFixed(1)}" height="${(base-rainY(Number.isFinite(d.rain)?d.rain:0)).toFixed(1)}" rx="2"/>`).join('')}
      <polyline class="wx-wind-line" points="${windPoints}"/>${data.map((d,i)=>Number.isFinite(d.wind)?`<circle class="wx-wind-dot" cx="${x(i)}" cy="${windY(d.wind)}" r="2.8"/>`:'').join('')}
      <text class="wx-axis-title rain" x="2" y="34">降水量</text><text class="wx-axis-title wind" x="${W-2}" y="34" text-anchor="end">平均風速</text>
      <text class="wx-axis-tick rain" x="${L-7}" y="54" text-anchor="end">10</text><text class="wx-axis-tick rain" x="${L-7}" y="100" text-anchor="end">5</text><text class="wx-axis-tick rain" x="${L-7}" y="${base+4}" text-anchor="end">0</text>
      <text class="wx-axis-tick wind" x="${W-R+7}" y="54">10</text><text class="wx-axis-tick wind" x="${W-R+7}" y="100">5</text><text class="wx-axis-tick wind" x="${W-R+7}" y="${base+4}">0</text>
      <text class="wx-axis-unit rain" x="${L-7}" y="44" text-anchor="end">mm/h</text><text class="wx-axis-unit wind" x="${W-R+7}" y="44">m/s</text><text class="wx-th-label" x="4" y="179">雷</text>
      ${data.map((d,i)=>Number(d.rain)>axisMax?`<text class="wx-over-value rain" x="${x(i)}" y="46" text-anchor="middle">${num(d.rain,1)}</text>`:'').join('')}
      ${data.map((d,i)=>Number(d.wind)>axisMax?`<text class="wx-over-value wind" x="${x(i)}" y="38" text-anchor="middle">${num(d.wind,1)}</text>`:'').join('')}
      ${data.map((d,i)=>{const q=timelineThunder(d.cape,d.rain);return `<text class="wx-thunder-mark ${q.cls}" x="${x(i)}" y="${thY+6}" text-anchor="middle">⚡<title>${timeOnly(d.time)} 雷リスク ${q.label}</title></text>`;}).join('')}${ticks}
    </svg>
  </div>`;
}
function renderOvernightSceneTable(o){
  const e=o.eveningScene||{},m=o.milky||{},a=o.morningScene||{},window=(s,e)=>s||e?`${timeOnly(s)}〜${timeOnly(e)}`:'--';
  return `<div class="overnight-scene-table">
    <div><b>夕景</b><strong>${Math.round(Number(e.score)||0)}<small>/100</small></strong><span>${esc(e.label||'--')}</span><em>${window(e.windowStart||o.sunset,e.windowEnd)}</em></div>
    <div><b>天の川</b><strong>${Math.round(Number(m.score)||0)}<small>/100</small></strong><span>${esc(o.milkyLabel||'--')}</span><em>${window(m.windowStart,m.windowEnd)}</em></div>
    <div><b>朝景</b><strong>${Math.round(Number(a.score)||0)}<small>/100</small></strong><span>${esc(a.label||'--')}</span><em>${window(a.windowStart||o.sunrise,a.windowEnd)}</em></div>
  </div>`;
}

function renderOvernights(items){
  const section=$('overnightSection');
  if(!items.length){section.classList.add('hidden');$('overnightCards').innerHTML='';return;}
  section.classList.remove('hidden');
  $('overnightCards').innerHTML=items.map(o=>{
    const comfort=overnightComfort(o);
    const arrivalMs=new Date(`${o.point.date}T${o.point.time}:00+09:00`).getTime();
    const departureMs=new Date(`${addDays(o.point.date,1)}T${o.point.stayDepartureTime||'08:00'}:00+09:00`).getTime();
    return `<article class="overnight-card overnight-v2">
      <div class="overnight-v2-head">
        <span class="night-badge">${o.nightNo}泊目</span>
        <div class="overnight-v2-place"><div class="hut-mark">⌂</div><div><h3>${esc(o.point.name)}</h3><p>${formatOvernightDate(o.point.date)} / 標高 ${Math.round(o.point.elevation||0).toLocaleString('ja-JP')}m${o.source?` ・ ${esc(o.source)}`:''}</p></div></div>
      </div>
      ${renderWeatherTimeline(o.timelineRows,arrivalMs,departureMs)}
      ${renderOvernightSceneTable(o)}
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
function numberOrNaN(v){if(v===null||v===undefined||(typeof v==='string'&&v.trim()===''))return NaN;const n=Number(v);return Number.isFinite(n)?n:NaN;}
function mean(v){const x=v.filter(Number.isFinite);return x.length?x.reduce((a,b)=>a+b,0)/x.length:NaN;} function max(v){const x=v.filter(Number.isFinite);return x.length?Math.max(...x):NaN;}
function median(v){const x=v.filter(Number.isFinite).sort((a,b)=>a-b);if(!x.length)return NaN;const m=Math.floor(x.length/2);return x.length%2?x[m]:(x[m-1]+x[m])/2;}
function apparentTemperatureMountain(temp,rh,wind){
  const t=Number(temp), h=Number(rh), v=Math.max(0,Number(wind));
  if(Number.isFinite(t)&&Number.isFinite(h)&&Number.isFinite(v)){
    const e=(Math.max(0,Math.min(100,h))/100)*6.105*Math.exp((17.27*t)/(237.7+t));
    return t+0.33*e-0.70*v-4.0;
  }
  if(Number.isFinite(t)&&Number.isFinite(v)&&t<=10&&v>=1.3){
    const kmh=v*3.6, p=Math.pow(kmh,0.16);
    return 13.12+0.6215*t-11.37*p+0.3965*t*p;
  }
  return Number.isFinite(t)?t:NaN;
}
function averageRows(rows){
  const out={temp:mean(rows.map(x=>x.temp)),rh:mean(rows.map(x=>x.rh)),rain:mean(rows.map(x=>x.rain)),cloud:mean(rows.map(x=>x.cloud)),wind:mean(rows.map(x=>x.wind)),gust:max(rows.map(x=>x.gust)),cape:max(rows.map(x=>x.cape)),visibility:mean(rows.map(x=>x.visibility)),freezing:mean(rows.map(x=>x.freezing))};
  out.feelsLike=apparentTemperatureMountain(out.temp,out.rh,out.wind);
  return out;
}
function rowForProvider(providerRows,id){return (providerRows||[]).find(x=>x?.provider?.id===id)?.row||null;}
function blendProviderRows(providerRows){
  const rows=(providerRows||[]).map(x=>x.row).filter(Boolean);
  const out=averageRows(rows);
  const jma=rowForProvider(providerRows,'jma');
  const ecmwf=rowForProvider(providerRows,'ecmwf');
  const icon=rowForProvider(providerRows,'icon');
  const gfs=rowForProvider(providerRows,'gfs')||rowForProvider(providerRows,'noaa-gfs');
  if(Number.isFinite(jma?.rain))out.rain=jma.rain;
  if(Number.isFinite(ecmwf?.wind))out.wind=ecmwf.wind;
  if(Number.isFinite(ecmwf?.gust))out.gust=ecmwf.gust;
  if(Number.isFinite(icon?.visibility))out.visibility=icon.visibility;
  const capeValues=rows.map(x=>x.cape).filter(Number.isFinite);
  out.cape=max(capeValues);
  out.capeMedian=median(capeValues);
  out.capeModelCount=capeValues.length;
  out.capeSupport500=capeValues.filter(v=>v>=500).length;
  out.capeSupport1000=capeValues.filter(v=>v>=1000).length;

  // V1.5.64: retain the role-based representative value, but also preserve the
  // adverse side of every available model. A route must not become A merely
  // because the preferred model is calm while another credible model is not.
  const finiteRows=rows.filter(r=>r&&typeof r==='object');
  const adverseFlags=finiteRows.map(r=>({
    mild:(Number.isFinite(r.wind)&&r.wind>=8)||(Number.isFinite(r.gust)&&r.gust>=15)||(Number.isFinite(r.rain)&&r.rain>=0.5)||(Number.isFinite(r.visibility)&&r.visibility<3000),
    strong:(Number.isFinite(r.wind)&&r.wind>=10)||(Number.isFinite(r.gust)&&r.gust>=18)||(Number.isFinite(r.rain)&&r.rain>=1.5)||(Number.isFinite(r.visibility)&&r.visibility<1000)
  }));
  out.adverseModelCount=adverseFlags.filter(x=>x.mild).length;
  out.strongAdverseModelCount=adverseFlags.filter(x=>x.strong).length;
  out.modelMaxWind=max(finiteRows.map(r=>r.wind));
  out.modelMaxGust=max(finiteRows.map(r=>r.gust));
  out.modelMaxRain=max(finiteRows.map(r=>r.rain));
  const visValues=finiteRows.map(r=>r.visibility).filter(Number.isFinite);
  out.modelMinVisibility=visValues.length?Math.min(...visValues):NaN;
  out.gfsAdverse=!!gfs && (
    (Number.isFinite(gfs.wind)&&Number.isFinite(out.wind)&&gfs.wind>=8&&gfs.wind>=out.wind+3) ||
    (Number.isFinite(gfs.gust)&&Number.isFinite(out.gust)&&gfs.gust>=15&&gfs.gust>=out.gust+4) ||
    (Number.isFinite(gfs.rain)&&Number.isFinite(out.rain)&&gfs.rain>=0.5&&gfs.rain>=out.rain+0.4) ||
    (Number.isFinite(gfs.visibility)&&Number.isFinite(out.visibility)&&gfs.visibility<3000&&out.visibility>=5000)
  );
  out.feelsLike=apparentTemperatureMountain(out.temp,out.rh,out.wind);
  out.modelBasis={wind:Number.isFinite(ecmwf?.wind)?'ecmwf':'multi',rain:Number.isFinite(jma?.rain)?'jma':'multi',visibility:Number.isFinite(icon?.visibility)?'icon':'multi',gfsGuard:!!out.gfsAdverse,capeModels:out.capeModelCount,capeSupport500:out.capeSupport500,capeSupport1000:out.capeSupport1000,adverseModels:out.adverseModelCount,strongAdverseModels:out.strongAdverseModelCount};
  return out;
}
function thunderEvidence(x){
  const cape=Number.isFinite(x.cape)?x.cape:0;
  const rain=Number.isFinite(x.rain)?x.rain:0;
  const models=Number.isFinite(x.capeModelCount)?x.capeModelCount:0;
  const support500=Number.isFinite(x.capeSupport500)?x.capeSupport500:0;
  const support1000=Number.isFinite(x.capeSupport1000)?x.capeSupport1000:0;
  const consensus500=support500>=2;
  const consensus1000=support1000>=2;
  // V1.5.37: CAPE is potential energy, not a thunder occurrence forecast.
  // Keep CAPE-only signals as a warning, and affect the route grade only when
  // precipitation and/or multi-model agreement provide additional evidence.
  let gradePoints=0;
  if(rain>=1&&cape>=1000&&(consensus500||models<=1&&cape>=1800))gradePoints=2;
  else if(rain>=0.5&&cape>=500&&(consensus500||cape>=1200))gradePoints=1;
  let level='LOW';
  if(rain>=2&&cape>=1200&&(consensus1000||support500>=2))level='EXTREME';
  else if(rain>=1&&cape>=800&&(consensus500||cape>=1500))level='HIGH';
  else if((consensus500&&cape>=500)||(rain>=0.5&&cape>=500)||cape>=1000)level='MEDIUM';
  return {level,gradePoints,cape,rain,models,support500,support1000};
}
function hypothermiaRisk(x){
  const f=Number(x.feelsLike),w=Number(x.wind),r=Number(x.rain);
  if(!Number.isFinite(f))return 'NONE';
  if(f<=-10&&((Number.isFinite(w)&&w>=10)||(Number.isFinite(r)&&r>=1.5)))return 'DANGER';
  if(f<=-5&&((Number.isFinite(w)&&w>=7)||(Number.isFinite(r)&&r>=.3)))return 'WARNING';
  if(f<=0&&Number.isFinite(w)&&Number.isFinite(r)&&w>=5&&r>=.3)return 'CAUTION';
  return 'NONE';
}
function assessGrade(x){
  let s=0;
  const wind=Number(x.wind),gust=Number(x.gust),rain=Number(x.rain),vis=Number(x.visibility),cloud=Number(x.cloud);
  if(wind>=18||gust>=25)s+=4;else if(wind>=13||gust>=20)s+=3;else if(wind>=9||gust>=15)s+=2;else if(wind>=5||gust>=12)s+=1;
  if(rain>=8)s+=4;else if(rain>=4)s+=3;else if(rain>=1.5)s+=2;else if(rain>=.1)s+=1;
  s+=thunderEvidence(x).gradePoints;
  if(cloud>=95)s+=1;
  if(Number.isFinite(vis)){if(vis<500)s+=4;else if(vis<1000)s+=3;else if(vis<3000)s+=2;else if(vis<5000)s+=1;}
  const feels=Number.isFinite(x.feelsLike)?x.feelsLike:x.temp;
  if(feels<=-10)s+=3;else if(feels<=-5)s+=2;else if(feels<=0)s+=1;
  const hypo=hypothermiaRisk(x);if(hypo==='DANGER'||hypo==='WARNING')s+=1;

  // Mild factors that overlap in the mountains are more meaningful together
  // than they are in isolation (e.g. breeze + drizzle + cold/poor visibility).
  const combo=[wind>=5||gust>=12,rain>=.1,Number.isFinite(vis)&&vis<5000,Number.isFinite(feels)&&feels<=5,cloud>=90].filter(Boolean).length;
  if(combo>=3)s+=1;

  // Multi-model adverse-side guard. The representative value still follows
  // JMA/ECMWF/ICON roles, but credible deterioration scenarios cap optimism.
  const adverse=Number(x.adverseModelCount)||0,strongAdverse=Number(x.strongAdverseModelCount)||0;
  if(x.gfsAdverse)s+=1;
  if(adverse>=2)s+=1;
  if(strongAdverse>=2)s+=1;

  let grade=s>=8?'E':s>=6?'D':s>=4?'C':s>=2?'B':'A';
  const rank={A:1,B:2,C:3,D:4,E:5}, floor=g=>{if(rank[grade]<rank[g])grade=g;};

  // A is reserved for genuinely benign mountain conditions.
  if(wind>=5||gust>=12||rain>=.1||(Number.isFinite(vis)&&vis<5000)||thunderEvidence(x).level!=='LOW'||x.gfsAdverse||adverse>=1)floor('B');
  // One strong adverse model or broad mild disagreement is enough to prevent
  // an apparently benign representative value from staying below caution.
  if(strongAdverse>=1&&(wind>=5||gust>=12||rain>=.1||(Number.isFinite(vis)&&vis<5000)))floor('C');
  if(adverse>=2&&(wind>=5||rain>=.1||(Number.isFinite(vis)&&vis<5000)))floor('C');
  return grade;
}
function thunderLevel(x){return thunderEvidence(x).level;}
const HAZARD_RANK={NONE:0,CAUTION:1,WARNING:2,DANGER:3};
const HAZARD_LABEL={NONE:'平常',CAUTION:'注意',WARNING:'警戒',DANGER:'危険'};
function hazardItem(type,icon,label,level,value,detail){return {type,icon,label,level,value,detail,rank:HAZARD_RANK[level]||0};}
function assessHazards(x){
  const thunder=thunderLevel(x);
  const thunderLv=thunder==='EXTREME'?'DANGER':thunder==='HIGH'?'WARNING':thunder==='MEDIUM'?'CAUTION':'NONE';
  const windLv=(x.wind>=18||x.gust>=25)?'DANGER':(x.wind>=13||x.gust>=20)?'WARNING':(x.wind>=9||x.gust>=15)?'CAUTION':(x.wind>=5||x.gust>=12)?'CAUTION':'NONE';
  const rainLv=x.rain>=8?'DANGER':x.rain>=4?'WARNING':x.rain>=1.5?'CAUTION':x.rain>=.1?'CAUTION':'NONE';
  let tempLv='NONE',tempDetail='';
  const feels=Number.isFinite(x.feelsLike)?x.feelsLike:x.temp;
  if(Number.isFinite(feels)){
    if(feels<=-10){tempLv='DANGER';tempDetail='体感温度が非常に低い';}
    else if(feels<=-5){tempLv='WARNING';tempDetail='体感温度が低い';}
    else if(feels<=0){tempLv='CAUTION';tempDetail='体感温度が氷点下';}
    else if(feels>=35){tempLv='DANGER';tempDetail='体感温度が極端に高い';}
    else if(feels>=32){tempLv='WARNING';tempDetail='体感温度が高い';}
    else if(feels>=30){tempLv='CAUTION';tempDetail='体感上の暑熱';}
  }
  const hypoLv=hypothermiaRisk(x);
  const visLv=!Number.isFinite(x.visibility)?'NONE':x.visibility<500?'DANGER':x.visibility<1000?'WARNING':x.visibility<3000?'CAUTION':'NONE';
  const items=[
    hazardItem('thunder','⚡','雷',thunderLv,thunder,thunderLv==='NONE'?'顕著な雷リスクなし':`雷リスク ${thunder}`),
    hazardItem('wind','💨','風',windLv,`${num(x.wind)}m/s`,Number.isFinite(x.gust)?`平均 ${num(x.wind)}m/s・突風 ${num(x.gust)}m/s`:`平均 ${num(x.wind)}m/s`),
    hazardItem('rain','🌧️','雨',rainLv,`${num(x.rain)}mm/h`,`時間降水量 ${num(x.rain)}mm/h`),
    hazardItem('temp',tempLv==='NONE'?'🌡️':feels<=0?'🥶':'🥵','体感温度',tempLv,`${num(feels)}℃`,`気温 ${num(x.temp)}℃・体感 ${num(feels)}℃${tempDetail?`（${tempDetail}）`:''}`),
    hazardItem('visibility','🌫️','視界',visLv,Number.isFinite(x.visibility)?`${Math.round(x.visibility)}m`:'–',Number.isFinite(x.visibility)?`予報視程 ${Math.round(x.visibility)}m`:'視程データなし')
  ];
  if(hypoLv!=='NONE')items.push(hazardItem('hypothermia','🥶','低体温',hypoLv,`${num(feels)}℃`,`雨・風・低い体感温度が重なっています（体感 ${num(feels)}℃、風 ${num(x.wind)}m/s、雨 ${num(x.rain)}mm/h）`));
  if(x.gfsAdverse||Number(x.adverseModelCount)>=1)items.push(hazardItem('model','⚠️','モデル差','CAUTION',x.gfsAdverse?'GFS悪化':`${Number(x.adverseModelCount)||1}モデル悪化`,'代表値より悪天側を示すモデルがあるため、楽観側へ寄せず判定しています'));
  return items;
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
  const feelPoints=points.filter(p=>Number.isFinite(p.feelsLike));
  if(feelPoints.length){
    const coldest=feelPoints.reduce((a,b)=>b.feelsLike<a.feelsLike?b:a,feelPoints[0]);
    parts.push(`ルート中の最低体感温度は ${coldest.point.time||''} ${coldest.point.name} の ${num(coldest.feelsLike)}℃（気温 ${num(coldest.temp)}℃）です。`);
    if(hypothermiaRisk(coldest)!=='NONE')parts.push('雨・風・低い体感温度が重なるため、低体温症への注意が必要です。防風・防水と保温装備を前提に判断してください。');
  }
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

// V1.4.67: 地点別予測の予測信頼度。
// 的中率ではなく、モデル一致度・比較モデル数・予報リードタイムをまとめた相対指標。
function pointForecastConfidence(result){
  const rows=Array.isArray(result?.providerRows)?result.providerRows:[];
  const lead=Math.max(0,daysAhead(result?.point?.date||todayLocal()));
  const fallbackOnly=rows.length>0&&rows.every(x=>x.provider?.kind==='fallback');
  let level=result?.confidence==='LOW'?'LOW':result?.confidence==='MEDIUM'?'MEDIUM':'HIGH';
  const reasons=[];
  if(fallbackOnly){
    level='LOW';
    reasons.push('予備モデル中心');
  }else{
    if(rows.length<=1){level='LOW';reasons.push('比較1モデル');}
    else if(rows.length===2&&level==='HIGH'){level='MEDIUM';reasons.push('比較2モデル');}
    else reasons.push(`${rows.length}モデル比較`);
    if(result?.confidence==='LOW')reasons.push('モデル差が大きい');
    else if(result?.confidence==='MEDIUM')reasons.push('モデルにばらつき');
    else if(rows.length>=2)reasons.push('モデル一致度良好');
  }
  if(lead>=12){level='LOW';reasons.push(`${lead}日先`);}
  else if(lead>=8){if(level==='HIGH')level='MEDIUM';reasons.push(`${lead}日先`);}
  else if(lead>=4){reasons.push(`${lead}日先`);}
  else reasons.push(lead===0?'当日':`${lead}日先`);
  const label={HIGH:'高',MEDIUM:'中',LOW:'低'}[level]||'中';
  return {level,label,reason:reasons.slice(0,3).join('・'),lead,modelCount:rows.length};
}
function routeForecastConfidence(points){
  const items=(Array.isArray(points)?points:[]).map(pointForecastConfidence);
  if(!items.length)return {level:'MEDIUM',label:'中',reason:'判定材料が不足'};
  const rank={HIGH:1,MEDIUM:2,LOW:3};
  const level=items.reduce((worst,x)=>(rank[x.level]||2)>(rank[worst]||2)?x.level:worst,'HIGH');
  const worstItems=items.filter(x=>x.level===level);
  const modelCounts=items.map(x=>x.modelCount).filter(Number.isFinite);
  const minModels=modelCounts.length?Math.min(...modelCounts):0;
  const maxLead=Math.max(...items.map(x=>Number(x.lead)||0));
  const reasons=[];
  if(level==='LOW')reasons.push('一部地点の不確実性が高め');
  else if(level==='MEDIUM')reasons.push('一部地点に予報のばらつき');
  else reasons.push('ルート全体で予報傾向が比較的一致');
  if(minModels>0)reasons.push(`最少${minModels}モデル比較`);
  reasons.push(maxLead===0?'当日予報':`${maxLead}日先を含む`);
  return {level,label:{HIGH:'高',MEDIUM:'中',LOW:'低'}[level]||'中',reason:reasons.join('・'),items,worstItems};
}
function gradeRank(g){return({A:1,B:2,C:3,D:4,E:5})[g]||9;} function verdict(g){return({A:'かなり良好',B:'概ね登山可能',C:'注意が必要',D:'かなり厳しい',E:'中止推奨'})[g]||'–';}
function maxThunder(v){const r={LOW:1,MEDIUM:2,HIGH:3,EXTREME:4};return [...v].sort((a,b)=>r[b]-r[a])[0]||'LOW';} function overallConfidence(v){return v.includes('LOW')||v.includes('FALLBACK')?'LOW':v.includes('MEDIUM')?'MEDIUM':'HIGH';}
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
  return `<div class="point-key-wrap"><div class="point-key-head"><b>地点・到着・リスク</b><small>ABCは各地点の到着時判定</small></div><div class="point-key">${points.map((p,i)=>`<span class="point-key-item"><b>${String(i+1).padStart(2,'0')}</b><span class="point-key-copy"><strong title="${esc(p.point.name)}">${esc(p.point.name)}</strong><small>${esc(p.point.time||'--:--')} <em class="point-risk-grade g-${esc(p.grade)}">${esc(p.grade)}</em></small></span></span>`).join('')}</div></div>`;
}
function chartPointDate(point){
  return String(point?.point?.date||'').slice(0,10);
}
function chartDateLabel(date){
  const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(date||''));
  return m?`${Number(m[2])}/${Number(m[3])}`:(date||'日付未設定');
}
function chartDateBoundaryLines(points,w,h,left,right,top,bottom){
  if(!Array.isArray(points)||points.length<2)return '';
  const x=i=>points.length===1?w/2:left+i*(w-left-right)/(points.length-1);
  let html='';
  for(let i=1;i<points.length;i++){
    const prev=chartPointDate(points[i-1]), cur=chartPointDate(points[i]);
    if(!prev||!cur||prev===cur)continue;
    const xx=(x(i-1)+x(i))/2;
    html+=`<line class="chart-date-boundary" x1="${xx.toFixed(1)}" y1="${top}" x2="${xx.toFixed(1)}" y2="${h-bottom}"><title>日付変更 ${esc(chartDateLabel(prev))} → ${esc(chartDateLabel(cur))}</title></line>`;
  }
  return html;
}
function chartDateBand(points,w=720,left=42,right=42){
  if(!Array.isArray(points)||!points.length)return '';
  const x=i=>points.length===1?w/2:left+i*(w-left-right)/(points.length-1);
  const groups=[];
  points.forEach((p,i)=>{
    const date=chartPointDate(p)||'日付未設定';
    const last=groups.at(-1);
    if(last&&last.date===date)last.end=i;
    else groups.push({date,start:i,end:i});
  });
  const segments=groups.map(g=>{
    const x1=g.start===0?left:(x(g.start-1)+x(g.start))/2;
    const x2=g.end===points.length-1?w-right:(x(g.end)+x(g.end+1))/2;
    const width=Math.max(1,x2-x1);
    const cx=x1+width/2;
    return `<g class="chart-date-group"><rect class="chart-date-segment" x="${x1.toFixed(1)}" y="2" width="${width.toFixed(1)}" height="24" rx="7"></rect><text class="chart-date-text" x="${cx.toFixed(1)}" y="18" text-anchor="middle">${esc(chartDateLabel(g.date))}</text></g>`;
  }).join('');
  return `<div class="chart-date-band-wrap" aria-label="グラフの日付"><span class="chart-date-band-label">日付</span><svg class="chart-date-band-svg" viewBox="0 0 ${w} 28" role="img" aria-label="通過地点の日付">${segments}</svg></div>`;
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
  return `<article class="chart-card featured"><div class="chart-head"><div><h3>風・降水</h3></div><div class="chart-legend"><span class="chart-legend-item rain">降水量</span><span class="chart-legend-item s0">風速</span><span class="chart-legend-item gust">突風</span></div></div>${chartKpis([{label:'最大降水',value:`${num(max(points.map(p=>p.rain)))} mm/h`},{label:'最大風速',value:`${num(max(points.map(p=>p.wind)))} m/s`},{label:'最大突風',value:`${num(max(points.map(p=>p.gust)))} m/s`}])}<div class="chart-canvas dual"><div class="chart-scale top left">風 ${num(windMax)}m/s</div><div class="chart-scale top right">雨 ${num(rainMax)}mm/h</div><div class="chart-scale bottom left">0</div><div class="chart-scale bottom right">0</div><svg class="chart-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="風と降水の複合グラフ"><defs><linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#91d1ff"/><stop offset="100%" stop-color="#4aa5ff"/></linearGradient></defs>${gridLines(w,h,left,right,top,bottom,4)}${chartDateBoundaryLines(points,w,h,left,right,top,bottom)}<line class="chart-axis" x1="${left}" y1="${h-bottom}" x2="${w-right}" y2="${h-bottom}"/>${bars}${buildLine('wind','s0','風速')}${buildLine('gust','gust','突風')}${xTicks}</svg></div>${chartDateBand(points,w,left,right)}${pointLegend(points)}</article>`;
}
function renderTempCloudChart(points){
  const w=720,h=270,left=42,right=42,top=24,bottom=58;
  const temps=points.map(p=>p.temp).filter(Number.isFinite), feels=points.map(p=>p.feelsLike).filter(Number.isFinite), clouds=points.map(p=>p.cloud).filter(Number.isFinite);
  const thermal=[...temps,...feels];
  let tMin=thermal.length?Math.min(...thermal):0, tMax=thermal.length?Math.max(...thermal):1;
  if(tMin===tMax){tMin-=1;tMax+=1;}
  const pad=Math.max(1,(tMax-tMin)*.12); tMin-=pad; tMax+=pad;
  const x=i=>points.length===1?w/2:left+i*(w-left-right)/(points.length-1);
  const yTemp=v=>h-bottom-(v-tMin)*(h-top-bottom)/(tMax-tMin);
  const yCloud=v=>h-bottom-(Math.max(0,Math.min(100,v))/100)*(h-top-bottom);
  const barW=Math.min(28,Math.max(8,(w-left-right)/Math.max(points.length*2.5,10)));
  const bars=points.map((p,i)=>{const val=Number.isFinite(p.cloud)?p.cloud:0;const yy=yCloud(val),xx=x(i)-barW/2;const labelY=Math.min(h-bottom-6,Math.max(top+14,yy+14));return `<rect class="cloud-bar" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(0,h-bottom-yy).toFixed(1)}" rx="5"><title>${esc(p.point.name)} ${p.point.time} 雲量 ${num(val,0)}%</title></rect><text class="chart-value cloud-value" x="${x(i)}" y="${labelY.toFixed(1)}" text-anchor="middle">${num(val,0)}%</text>`;}).join('');
  const buildThermalLine=(key,cls,label,offset)=>{const pts=points.map((p,i)=>Number.isFinite(p[key])?[x(i),yTemp(p[key]),p[key],i]:null).filter(Boolean);const path=pts.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' ');return `<path class="chart-line ${cls}" d="${path}"/>${pts.map(q=>{const ly=Math.max(top+11,q[1]+offset);return `<circle class="chart-dot ${cls}" cx="${q[0]}" cy="${q[1]}" r="4"><title>${esc(points[q[3]].point.name)} ${points[q[3]].point.time} ${label} ${num(q[2])}℃</title></circle><text class="chart-value ${cls}-value" x="${q[0]}" y="${ly.toFixed(1)}" text-anchor="middle">${num(q[2])}℃</text>`;}).join('')}`;};
  const xTicks=points.map((p,i)=>`<g class="chart-step"><circle class="chart-step-dot" cx="${x(i)}" cy="${h-27}" r="10"></circle><text class="chart-step-text" x="${x(i)}" y="${h-23}" text-anchor="middle">${String(i+1).padStart(2,'0')}</text></g>`).join('');
  const avgCloud=clouds.length?clouds.reduce((a,b)=>a+b,0)/clouds.length:NaN;
  const minTemp=temps.length?Math.min(...temps):NaN, maxTemp=temps.length?Math.max(...temps):NaN, minFeel=feels.length?Math.min(...feels):NaN;
  return `<article class="chart-card featured"><div class="chart-head"><div><h3>気温・体感・雲量</h3></div><div class="chart-legend"><span class="chart-legend-item temp">気温</span><span class="chart-legend-item feels">体感温度</span><span class="chart-legend-item cloud">雲量</span></div></div>${chartKpis([{label:'最低体感',value:`${num(minFeel)}℃`},{label:'気温範囲',value:`${num(minTemp)}〜${num(maxTemp)}℃`},{label:'平均雲量',value:`${num(avgCloud,0)}%`}])}<div class="chart-canvas temp-cloud"><div class="chart-scale top left">温度 ${num(tMax)}℃</div><div class="chart-scale top right">雲 100%</div><div class="chart-scale bottom left">${num(tMin)}℃</div><div class="chart-scale bottom right">0%</div><svg class="chart-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="気温・体感温度・雲量の複合グラフ"><defs><linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c3cbd3" stop-opacity=".78"/><stop offset="100%" stop-color="#8f9aa6" stop-opacity=".36"/></linearGradient></defs>${gridLines(w,h,left,right,top,bottom,4)}${chartDateBoundaryLines(points,w,h,left,right,top,bottom)}<line class="chart-axis" x1="${left}" y1="${h-bottom}" x2="${w-right}" y2="${h-bottom}"/>${bars}${buildThermalLine('temp','temp','気温',-10)}${buildThermalLine('feelsLike','feels','体感温度',15)}${xTicks}</svg></div>${chartDateBand(points,w,left,right)}${pointLegend(points)}</article>`;
}
function renderWeatherCharts(points){
  const el=$('weatherCharts'); if(!el)return;
  el.innerHTML=[renderImpactChart(points),renderTempCloudChart(points)].join('');
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
  const grade=String(source?.grade||point?.grade||'').toUpperCase();
  return {...point,lat,lon,order:index+1,grade:/^[A-E]$/.test(grade)?grade:''};
}
function collectRouteMapPointsFromForm(){
  const rows=[...($('points')?.children||[])];
  return rows.map((row,index)=>{
    const candidate=selectedCandidate(row.querySelector('.point-select')?.value);
    if(!candidate||!hasResolvedCoord(candidate))return null;
    return normalizeRouteMapPoint({
      ...candidate,
      type:candidate.type||row.querySelector('.point-type')?.value||'peak',
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

// V1.4.90: representative-course route-map geometry.
// Only trail geometries traced from a verified source should be registered here.
// V1.4.89 used hand-shaped approximation points; those have been removed because
// a plausible-looking but wrong line is less useful than an explicit straight fallback.
// Unregistered segments are rendered as dashed straight connections.
const VERIFIED_TRAIL_GEOMETRY_V1490 = Object.freeze({
  // V1.4.100: 槍ヶ岳代表コース。大きく外れる手描き折れ線を撤去し、
  // 公式ルートの通過順序に沿う細分化ラインへ更新。ナビゲーション用途ではありません。
  '新穂高温泉→槍平小屋': [
    [36.285405,137.575014],
    [36.287300,137.580800],[36.289200,137.586700],[36.290900,137.592800],
    [36.292800,137.598100],[36.295000,137.603700],[36.297200,137.608900],
    [36.299000,137.611900],[36.301500,137.616300],[36.304200,137.620500],
    [36.307000,137.625000],[36.309500,137.629000],[36.311692,137.631203],
    [36.314500,137.632000],[36.317500,137.631600],[36.320400,137.630700],
    [36.323220,137.629910]
  ],
  '槍平小屋→槍ヶ岳山荘': [
    [36.323220,137.629910],[36.325000,137.630100],[36.327000,137.630500],
    [36.329000,137.631100],[36.331000,137.632000],[36.333000,137.633000],
    [36.335000,137.634100],[36.336800,137.635000],[36.338300,137.636000],
    [36.339000,137.637500],[36.339300,137.639300],[36.339000,137.641200],
    [36.338833,137.643200],[36.338833,137.645806],[36.340939,137.645795]
  ],
  '槍ヶ岳山荘→槍ヶ岳': [
    [36.340939,137.645795],[36.34125,137.64635],[36.34165,137.64705],[36.342009,137.647735]
  ],
  '上高地→槍沢ロッヂ': [
    [36.246656,137.635388],[36.2530,137.6440],[36.2602,137.6512],[36.2688,137.6603],
    [36.2777,137.6720],[36.2862,137.6870],[36.293444,137.699175],[36.3010,137.6972],
    [36.3078,137.6930],[36.3133,137.6872],[36.318056,137.681111]
  ],
  '槍沢ロッヂ→槍ヶ岳山荘': [
    [36.318056,137.681111],[36.3210,137.6770],[36.3242,137.6725],[36.3278,137.6678],
    [36.3313,137.6623],[36.3348,137.6564],[36.3374,137.6511],[36.3394,137.6475],[36.340939,137.645795]
  ]
});

function fixedTrailSegment(from,to){
  const a=String(from?.name||''),b=String(to?.name||'');
  const direct=VERIFIED_TRAIL_GEOMETRY_V1490[`${a}→${b}`];
  if(direct)return direct.map(x=>[Number(x[0]),Number(x[1])]);
  const reverse=VERIFIED_TRAIL_GEOMETRY_V1490[`${b}→${a}`];
  if(reverse)return reverse.slice().reverse().map(x=>[Number(x[0]),Number(x[1])]);
  return null;
}
function routeRiskGrade(from,to){
  const grades=[String(from?.grade||'').toUpperCase(),String(to?.grade||'').toUpperCase()].filter(g=>/^[A-E]$/.test(g));
  if(!grades.length)return '';
  return grades.reduce((worst,g)=>gradeRank(g)>gradeRank(worst)?g:worst,grades[0]);
}
function routeRiskBand(grade){
  const g=String(grade||'').toUpperCase();
  if(g==='A')return 'A';
  if(g==='B')return 'B';
  if(['C','D','E'].includes(g))return 'C';
  return '';
}
function routeRiskColor(grade){
  return ({A:'#2f9d62',B:'#e0ad22',C:'#d9534f'})[routeRiskBand(grade)]||'#1f7fbd';
}
function routeMapLineGeometry(points){
  const lines=[]; let fixedCount=0;
  for(let i=1;i<points.length;i++){
    const from=points[i-1],to=points[i];
    const fixed=fixedTrailSegment(from,to);
    const coords=fixed&&fixed.length>=2?fixed:[[from.lat,from.lon],[to.lat,to.lon]];
    if(fixed)fixedCount++;
    lines.push({coords,fixed:!!fixed,from,to,grade:routeRiskGrade(from,to)});
  }
  return {lines,fixedCount,total:Math.max(0,points.length-1)};
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
  const risk=point.grade?`<div class="route-popup-risk risk-${esc(routeRiskBand(point.grade).toLowerCase())}">地点判定：<b>${esc(point.grade)}</b></div>`:'';
  return `<div class="route-popup"><strong>${String(point.order).padStart(2,'0')} / ${esc(point.name||'地点')}</strong><div>${esc(routeTypeBadgeLabel(point.type))}</div><div>${esc(routePointDateTime(point))}</div>${risk}${role}${stay}</div>`;
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
  const gsiAttribution='<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル</a>';
  const baseLayers={
    '標準地図':L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',{minZoom:5,maxZoom:18,attribution:gsiAttribution}),
    '写真':L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',{minZoom:5,maxZoom:18,attribution:gsiAttribution}),
    '陰影起伏図':L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png',{minZoom:5,maxNativeZoom:16,maxZoom:18,attribution:gsiAttribution})
  };
  baseLayers['標準地図'].addTo(map);
  L.control.layers(baseLayers,null,{position:'topright',collapsed:window.matchMedia?.('(max-width: 700px)')?.matches ?? false}).addTo(map);
  L.control.zoom({position:'bottomright'}).addTo(map);
  state={map,baseLayers,markers:L.layerGroup().addTo(map),lines:L.layerGroup().addTo(map)};
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
  const geometry=routeMapLineGeometry(points);
  const showRisk=mapId==='routeMapResults'&&geometry.lines.some(seg=>seg.grade);
  geometry.lines.forEach(seg=>{
    const color=showRisk?routeRiskColor(seg.grade):'#1f7fbd';
    const line=L.polyline(seg.coords,{color,weight:showRisk?6:4,opacity:.95,dashArray:seg.fixed?null:'7 7'}).addTo(state.lines);
    if(showRisk&&seg.grade){
      const band=routeRiskBand(seg.grade);
      const label=band==='C'&&seg.grade!=='C'?`C以上（地点判定 ${seg.grade}）`:`${band}（地点判定 ${seg.grade}）`;
      line.bindTooltip(`<strong>${esc(seg.from.name||'地点')} → ${esc(seg.to.name||'地点')}</strong><br>区間リスク：<b>${esc(label)}</b>`,{sticky:true,className:'route-risk-tooltip'});
    }
  });
  mapEl.dataset.trailSegments=String(geometry.fixedCount);
  mapEl.dataset.totalSegments=String(geometry.total);
  points.forEach(point=>{
    const marker=L.marker([point.lat,point.lon],{icon:routeMapIcon(point)}).addTo(state.markers);
    marker.bindPopup(routeMapPopupHtml(point));
  });
  const fitLatLngs=geometry.lines.flatMap(seg=>seg.coords);
  invalidateRouteMap(state,()=>fitRouteMapToPoints(state,fitLatLngs.length?fitLatLngs:latlngs));
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
  const hypo=hypothermiaRisk(r);
  if(hypo==='DANGER'||hypo==='WARNING')return {cls:'warning',text:`低体温注意：体感 ${num(r.feelsLike)}℃。雨・風・低温が重なるため、防風・防水と保温を強く意識してください。`};
  if(hypo==='CAUTION')return {cls:'caution',text:`体感 ${num(r.feelsLike)}℃。濡れと風で体温を奪われやすい条件です。`};
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
  const conf=pointForecastConfidence(r);
  return `<article class="route-forecast-row point-dashboard-card">
    <div class="rf-point-head">
      <div class="rf-point-copy">
        <div class="rf-time"><small>${esc(r.point.date||'----/--/--')}</small><strong>${esc(r.point.time||'--:--')}</strong></div>
        <div class="rf-place"><b>${esc(r.point.name)}</b><small>${esc(typeLabel)} / 標高 ${elev.toLocaleString('ja-JP')}m</small></div>
      </div>
      <div class="rf-head-confidence" title="予測信頼度はモデル一致度・比較モデル数・予報までの日数から算出した相対指標です">
        <div class="rf-confidence rf-confidence-${conf.level.toLowerCase()}"><span><em class="rf-confidence-icon" aria-hidden="true">🛡</em>予測信頼度</span><b>${conf.label}</b></div>
        <small class="rf-confidence-note">${esc(conf.reason)}</small>
      </div>
      <div class="rf-weather wx-${wx.cls}"><span class="rf-weather-icon" aria-hidden="true">${wx.icon}</span><small>${wx.label}</small></div>
    </div>
    <div class="rf-metrics-grid">
      <div class="rf-metric temp${hazardMetricClass(hz.temp)}" data-label="気温">
        <div class="rf-metric-title"><span class="rf-metric-symbol temp">${pointMetricIcon('temp')}</span><b>気温</b></div>
        <div class="rf-value-wrap"><strong>${num(r.temp,0)}</strong><small>℃</small></div>
        <div class="rf-feels-like"><span>体感</span><b>${num(r.feelsLike,0)}℃</b>${Number.isFinite(r.feelsLike)&&Number.isFinite(r.temp)?`<small>${r.feelsLike<r.temp?'↓':''}${Math.abs(r.feelsLike-r.temp)>=1?`${num(Math.abs(r.feelsLike-r.temp),0)}℃差`:''}</small>`:''}</div>
        ${metricGauge('temp',r.temp)}
      </div>
      <div class="rf-metric wind${hazardMetricClass(hz.wind)}" data-label="平均風速">
        <div class="rf-metric-title"><span class="rf-metric-symbol wind">${pointMetricIcon('wind')}</span><b>平均風速</b></div>
        <div class="rf-value-wrap"><strong>${num(r.wind,0)}</strong><small>m/s</small></div>
        <div class="rf-wind-direction-inline" aria-label="風向と最大瞬間風速">
          <span class="rf-wind-dir-arrow">${windDirectionArrow(windDeg)}</span>
          <b>${windDirectionLabel(windDeg)}</b>
          ${Number.isFinite(r.gust)?`<small>最大瞬間 ${num(r.gust,0)}m/s</small>`:''}
        </div>
        ${metricGauge('wind',r.wind)}
      </div>
      <div class="rf-metric rain${hazardMetricClass(hz.rain)}" data-label="雨">
        <div class="rf-metric-title"><span class="rf-metric-symbol rain">${pointMetricIcon('rain')}</span><b>雨</b></div>
        <div class="rf-value-wrap"><strong>${num(r.rain,1)}</strong><small>mm/h</small></div>
        ${metricGauge('rain',r.rain)}
      </div>
      <div class="rf-metric vis${hazardMetricClass(hz.visibility)}" data-label="視界">
        <div class="rf-metric-title"><span class="rf-metric-symbol visibility">${pointMetricIcon('visibility')}</span><b>視界</b><em class="rf-vis-eval ${visEval.cls}">${visEval.label}</em></div>
        <div class="rf-value-wrap"><strong>${visibilityShort(r.visibility)}</strong><small>${visUnit}</small></div>
        ${metricGauge('visibility',r.visibility)}
      </div>
    </div>
    ${renderWeatherTimeline(r.timelineRows,new Date(`${r.point.date}T${r.point.time}:00+09:00`).getTime())}
    <div class="rf-point-message ${msg.cls}"><span>✓</span><p>${esc(msg.text)}</p></div>
  </article>`;
}

function renderPointForecastTimeline(points){
  const el=$('forecastCards');
  if(!el) return;
  el.innerHTML=`<div class="route-forecast-board point-dashboard-board">
    <div class="route-forecast-list">${points.map((r,i)=>pointForecastRow(r,i,points.length)).join('')}</div>
    <div class="route-forecast-foot">※ 各地点の通過時刻に対する代表予報値です。「予測信頼度」はモデル一致度・比較モデル数・予報までの日数から算出する相対指標で、的中率を保証するものではありません。詳細なモデル比較は「06 気象モデル詳細」を参照してください。</div>
  </div>`;
}

function renderSummaryCore(points){
  $('results').classList.remove('hidden'); $('resultScreenshotToolbarDesktop')?.classList.remove('hidden');
  renderDecisionCommentary(points);
  const worst=points.reduce((a,b)=>gradeRank(b.grade)>gradeRank(a.grade)?b:a,points[0]);
  const maxWindValue=max(points.flatMap(x=>x.providerRows.map(y=>y.row.wind))); const maxRainValue=max(points.flatMap(x=>x.providerRows.map(y=>y.row.rain))); const thunderLevel=maxThunder(points.map(x=>x.thunder)); const forecastConfidence=routeForecastConfidence(points); const confidenceLevel=forecastConfidence.level;
  $('grade').textContent=worst.grade; $('verdict').textContent=verdict(worst.grade);
  const gradeLabels={A:'EXCELLENT',B:'GOOD',C:'CAUTION',D:'HARD',E:'STOP'}; const verdictNotes={A:'全体としてかなり安定した予報です。',B:'一部に注意点はありますが、全体としては比較的安定しています。',C:'注意要素があります。通過時刻と場所を確認してください。',D:'強い気象リスクを含む計画です。見直しを推奨します。',E:'非常に強い気象リスクがあります。中止を含めて再検討してください。'};
  $('gradeLabel').textContent=gradeLabels[worst.grade]||'–';
  const feels=points.map(p=>p.feelsLike).filter(Number.isFinite); const minFeels=feels.length?Math.min(...feels):NaN;
  const baseVerdictNote=verdictNotes[worst.grade]||'ルート全体の気象条件を確認してください。';
  $('verdictNote').textContent=Number.isFinite(minFeels)?`${baseVerdictNote} 最低体感 ${num(minFeels)}℃。`:baseVerdictNote;
  $('maxWind').textContent=`${num(maxWindValue)} m/s`; $('maxWindLabel').textContent=maxWindValue<5?'弱い':maxWindValue<10?'やや強い':maxWindValue<15?'強い':'非常に強い';
  $('maxRain').textContent=`${num(maxRainValue)} mm/h`; $('maxRainLabel').textContent=maxRainValue<0.2?'ほとんどなし':maxRainValue<1?'弱い':maxRainValue<5?'雨に注意':'強い雨';
  $('thunderRisk').textContent=thunderLevel; $('thunderRiskLabel').textContent=({LOW:'低い',MEDIUM:'注意',HIGH:'高い',EXTREME:'非常に高い'})[thunderLevel]||'–';
  $('confidence').textContent=forecastConfidence.label; $('confidenceLabel').textContent=({LOW:'慎重に確認',MEDIUM:'まずまず',HIGH:'比較的安定'})[confidenceLevel]||'–'; const confidenceReason=$('confidenceReason'); if(confidenceReason)confidenceReason.textContent=forecastConfidence.reason;
  const setMarker=(id,pct)=>{const el=$(id);if(el)el.style.left=`${Math.max(2,Math.min(98,pct))}%`;}; setMarker('maxWindMarker',(maxWindValue/20)*100); setMarker('maxRainMarker',(maxRainValue/20)*100); setMarker('thunderMarker',({LOW:8,MEDIUM:38,HIGH:68,EXTREME:94})[thunderLevel]||8); setMarker('confidenceMarker',({LOW:8,MEDIUM:50,HIGH:94})[confidenceLevel]||8);
  $('updatedAt').textContent=new Date().toLocaleString('ja-JP');
  updateExternalWeatherLinks();
}
function renderAll(points,overnight=[]){
  renderSummaryCore(points);
  renderWeatherCharts(points); renderRouteMaps(points); renderPointForecastTimeline(points);
  const overnightWithArrival=overnight.map(o=>{const match=points.find(r=>r.point===o.point||(r.point.name===o.point.name&&r.point.date===o.point.date&&r.point.time===o.point.time));return {...o,arrivalTemp:match?.temp};});
  renderOvernights(overnightWithArrival);
  $('modelDetails').innerHTML=points.map(r=>`<article class="model-block"><h3>${esc(r.point.name)} <small>${r.point.date} ${r.point.time}</small></h3><div class="table-wrap"><table><thead><tr><th>モデル</th><th>気温</th><th>体感</th><th>風</th><th>突風</th><th>雨</th><th>雲</th><th>大気不安定度</th><th>視程</th></tr></thead><tbody>${r.providerRows.map(x=>`<tr><td>${x.provider.name}</td><td>${num(x.row.temp)}℃</td><td>${num(apparentTemperatureMountain(x.row.temp,x.row.rh,x.row.wind))}℃</td><td>${num(x.row.wind)}m/s</td><td>${num(x.row.gust)}m/s</td><td>${num(x.row.rain)}mm</td><td>${num(x.row.cloud,0)}%</td><td>${num(x.row.cape,0)} J/kg</td><td>${Number.isFinite(x.row.visibility)?Math.round(x.row.visibility)+'m':'–'}</td></tr>`).join('')}</tbody></table></div></article>`).join('');
  $('updatedAt').textContent=new Date().toLocaleString('ja-JP');
}
async function proxyFetch(url){return fetch(`/api/proxy?url=${encodeURIComponent(url)}`);}
function setStatus(t,e=false){const els=[$('statusDesktop'),$('statusMobile')].filter(Boolean);if(!els.length){console.warn('status elements missing:',t);return;}els.forEach(el=>{el.textContent=t;el.classList.remove('hidden');el.classList.toggle('error',e);});}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);}
function todayLocal(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10);}
function tomorrowLocal(){
  const base=new Date(`${todayLocal()}T00:00:00+09:00`).getTime();
  return formatJstInput(base+24*60*60*1000).date;
}
function setLoadedRouteStartToTomorrow(){
  const first=$('points')?.firstElementChild;
  if(!first)return;
  const dateInput=first.querySelector('.point-date');
  if(!dateInput)return;
  dateInput.value=tomorrowLocal();
  first.dataset.datetimeBefore=rowDateTimeValue(first)||'';
  propagatePointTimesFrom(first);
}


// V1.4.17: 燧ヶ岳〜至仏山縦走回廊を両山の固定候補にも追加。
Object.assign(BUILTIN_ROUTE_CATALOG, {
  '燧ヶ岳': [
    ...(BUILTIN_ROUTE_CATALOG['燧ヶ岳']||[]),
    {id:'fixed1417-oze-miharashi',type:'hut',name:'見晴（尾瀬小屋・見晴地区）',lat:36.940556,lon:139.251944,elevation:1418,source:'固定候補'},
    {id:'fixed1417-oze-ryugu',type:'hut',name:'龍宮小屋',lat:36.932500,lon:139.238333,elevation:1402,source:'固定候補'},
    {id:'fixed1417-oze-yamanohana',type:'trailhead',name:'山ノ鼻（至仏山東面登山道入口・登り専用）',lat:36.915833,lon:139.198056,elevation:1410,source:'固定候補'},
    {id:'fixed1417-oze-shibutsu-link',type:'peak',name:'至仏山',lat:36.903474,lon:139.173248,elevation:2228,source:'固定候補'}
  ],
  '至仏山': [
    ...(BUILTIN_ROUTE_CATALOG['至仏山']||[]),
    {id:'fixed1417-oze-yamanohana-rev',type:'trailhead',name:'山ノ鼻（至仏山東面登山道入口・登り専用）',lat:36.915833,lon:139.198056,elevation:1410,source:'固定候補'},
    {id:'fixed1417-oze-ryugu-rev',type:'hut',name:'龍宮小屋',lat:36.932500,lon:139.238333,elevation:1402,source:'固定候補'},
    {id:'fixed1417-oze-miharashi-rev',type:'hut',name:'見晴（尾瀬小屋・見晴地区）',lat:36.940556,lon:139.251944,elevation:1418,source:'固定候補'},
    {id:'fixed1417-oze-hiuchi-link',type:'peak',name:'燧ヶ岳（柴安嵓）',lat:36.955102,lon:139.285334,elevation:2356,source:'固定候補'}
  ]
});

function logEvent(event_name,details={}){
  let payloadDetails=details;
  if(event_name==='weather_analysis'){
    try{
      const routePoints=collectPoints();
      payloadDetails={...details,metadata:{...(details?.metadata||{}),...analysisRouteLogMetadata(routePoints,details?.mountain||currentMountainLabel())}};
    }catch(_){ }
  }
  fetch('/api/event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session_id:sessionId,app_version:APP_VERSION,event_name,...payloadDetails})}).catch(()=>{});
}



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
    {id:'fixed1511-shikoku-tsurugi-nishijima-camp',type:'camp',name:'剣山野営場（西島野営場）',lat:33.8603605,lon:134.0884449585372,elevation:1710,source:'にし阿波公式・剣山野営場（西島駅野営場）埋め込み地図'},
    {id:'fixed16-shikoku-tsurugi-nishijima',type:'trailhead',name:'剣山観光登山リフト西島駅',lat:33.860656,lon:134.092260,elevation:1750,source:'固定候補'},
    {id:'fixed16-shikoku-tsurugi-hutte',type:'hut',name:'剣山頂上ヒュッテ',lat:33.855000,lon:134.096111,elevation:1939,source:'固定候補'},
    {id:'fixed16-shikoku-tsurugi-peak',type:'peak',name:'剣山',lat:33.853611,lon:134.094167,elevation:1955,source:'固定候補'},
    {id:'fixed1416-shikoku-jirogyu',type:'peak',name:'次郎笈',lat:33.843056,lon:134.086111,elevation:1930,source:'固定候補'},
    {id:'fixed1416-shikoku-shiraga-hut',type:'hut',name:'白髪避難小屋',lat:33.821944,lon:134.001222,elevation:1666,source:'固定候補'},
    {id:'fixed1416-shikoku-miune-link',type:'peak',name:'三嶺',lat:33.839444,lon:133.987778,elevation:1894,source:'固定候補'}
  ],
  '三嶺': [
    {id:'fixed16-shikoku-miune-nagoro',type:'trailhead',name:'名頃登山口 三嶺',lat:33.852472,lon:134.023972,elevation:907,source:'固定候補'},
    {id:'fixed16-shikoku-miune-hikariishi',type:'trailhead',name:'光石登山口',lat:33.804472,lon:133.971694,elevation:910,source:'固定候補'},
    {id:'fixed16-shikoku-miune-hut',type:'hut',name:'三嶺ヒュッテ',lat:33.840556,lon:133.991389,elevation:1845,source:'固定候補'},
    {id:'fixed16-shikoku-miune-peak',type:'peak',name:'三嶺',lat:33.839444,lon:133.987778,elevation:1894,source:'固定候補'},
    {id:'fixed1416-shikoku-shiraga-hut-rev',type:'hut',name:'白髪避難小屋',lat:33.821944,lon:134.001222,elevation:1666,source:'固定候補'},
    {id:'fixed1416-shikoku-jirogyu-rev',type:'peak',name:'次郎笈',lat:33.843056,lon:134.086111,elevation:1930,source:'固定候補'},
    {id:'fixed1416-shikoku-tsurugi-link',type:'peak',name:'剣山',lat:33.853611,lon:134.094167,elevation:1955,source:'固定候補'}
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
// V1.5.42: later fixed-catalog blocks replace 雲取山's array, so re-attach the verified 七ツ石小屋 here.
if(!(BUILTIN_ROUTE_CATALOG['雲取山']||[]).some(p=>p.name==='七ツ石小屋')){
  BUILTIN_ROUTE_CATALOG['雲取山']=[...(BUILTIN_ROUTE_CATALOG['雲取山']||[]),{id:'v1542-kumotori-nanatsuishi-final',type:'hut',name:'七ツ石小屋',lat:35.8275,lon:138.965556,elevation:1591,source:'PORTALFIELD公開地点情報（北緯35度49分39秒・東経138度57分56秒）'}];
}

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

// V1.4.23 final enforcement: later legacy Object.assign blocks must not remove the new traverse candidates.
// Keep this block after all historical catalog patches.
{
  const kujuPeaks = [
    {id:'v1423-final-kuju-kuju',type:'peak',name:'久住山',lat:33.082187,lon:131.240871,elevation:1786,source:'固定候補'},
    {id:'v1423-final-kuju-naka',type:'peak',name:'中岳(くじゅう)',lat:33.085833,lon:131.248889,elevation:1791,source:'固定候補'},
    {id:'v1423-final-kuju-mimata',type:'peak',name:'三俣山',lat:33.103889,lon:131.246389,elevation:1744,source:'固定候補'},
    {id:'v1423-final-kuju-taisen',type:'peak',name:'大船山',lat:33.095000,lon:131.280556,elevation:1786,source:'固定候補'},
    {id:'v1423-final-kuju-hossho',type:'peak',name:'星生山',lat:33.090833,lon:131.232500,elevation:1762,source:'固定候補'}
  ];
  const kujuShared = [
    {id:'v1423-final-kuju-wakare',type:'hut',name:'久住分かれ避難小屋',lat:33.086028,lon:131.238806,elevation:1638,source:'固定候補'}
  ];
  for (const mountainName of ['久住山','大船山','中岳(くじゅう)','三俣山','星生山']) {
    const old=BUILTIN_ROUTE_CATALOG[mountainName]||[];
    const merged=[...kujuPeaks,...kujuShared,...old];
    const seen=new Set();
    BUILTIN_ROUTE_CATALOG[mountainName]=merged.filter(p=>{
      const k=`${p.type}:${p.name}`;
      if(seen.has(k)) return false;
      seen.add(k); return true;
    });
  }

  const hououCommon = [
    {id:'v1423-final-houou-yakushi',type:'peak',name:'薬師岳(鳳凰)',lat:35.696111,lon:138.311667,elevation:2780,source:'固定候補'},
    {id:'v1423-final-houou-kannon',type:'peak',name:'観音岳(鳳凰)',lat:35.701667,lon:138.304722,elevation:2841,source:'固定候補'},
    {id:'v1423-final-houou-jizo',type:'peak',name:'地蔵岳(鳳凰)',lat:35.712222,lon:138.298611,elevation:2764,source:'固定候補'}
  ];
  for (const mountainName of ['薬師岳(鳳凰)','観音岳(鳳凰)','地蔵岳(鳳凰)']) {
    const old=BUILTIN_ROUTE_CATALOG[mountainName]||[];
    const merged=[...hououCommon,...old];
    const seen=new Set();
    BUILTIN_ROUTE_CATALOG[mountainName]=merged.filter(p=>{
      const k=`${p.type}:${p.name}`;
      if(seen.has(k)) return false;
      seen.add(k); return true;
    });
  }
  BUILTIN_ROUTE_CATALOG['鳳凰山']=BUILTIN_ROUTE_CATALOG['薬師岳(鳳凰)'];
  BUILTIN_ROUTE_CATALOG['地蔵ヶ岳']=BUILTIN_ROUTE_CATALOG['地蔵岳(鳳凰)'];
}


// V1.4.163: maintenance data audit API for the authenticated admin page.
// It derives the current state directly from the runtime catalogs so the audit stays in sync
// when fixed points, representative courses, or CT tables are updated.
window.TratenDataAudit = (()=>{
  const coordOk=p=>!!p&&Number.isFinite(Number(p.lat??p.latitude))&&Number.isFinite(Number(p.lon??p.longitude));
  // V1.4.185: 管理監査も山行計画と同じ固定候補範囲を見る。
  // 山固有カタログだけでなく、縦走カタログと山域固定候補も含めることで、
  // 別山の代表コース上にある既存固定地点を「座標未確認」と誤判定しない。
  const catalogFor=mountain=>{
    const key=canonicalMountainName(mountain);
    return [
      ...(BUILTIN_ROUTE_CATALOG[key]||[]),
      ...(TRAVERSE_CATALOG[key]||[]),
      ...regionalCandidates(key)
    ];
  };
  const uniquePoints=mountain=>{
    const seen=new Set();
    return catalogFor(mountain).filter(p=>{
      if(!p||!p.name)return false;
      const k=`${p.type||''}|${String(p.name).trim()}`;
      if(seen.has(k))return false;
      seen.add(k);return true;
    });
  };
  const resolveFixed=(mountain,type,name)=>{
    const raw=String(name||'').trim();
    const key=canonicalCourseTimeEndpointName(normalizeCourseTimePointName(raw));
    const pts=catalogFor(mountain);
    return pts.find(p=>p.type===type&&String(p.name||'').trim()===raw&&coordOk(p))
      ||pts.find(p=>p.type===type&&canonicalCourseTimeEndpointName(normalizeCourseTimePointName(p.name))===key&&coordOk(p))
      ||null;
  };
  const routeAudit=(mountain,course)=>{
    // V1.4.232: use exactly the same representative-route CT resolver as the planner.
    // V1.5.14: representative-route intermediate legs must be explicit CTs; derived/apportioned CT is prohibited.
    const built=buildRepresentativeResolvedRoute(mountain,course);
    if(built?.error){
      return {resolved:[],segments:[{from:'',to:'',kind:'missing',minutes:null,source:String(built.error)}],error:String(built.error)};
    }
    const resolved=Array.isArray(built?.resolved)?built.resolved:[];
    const rawSegments=Array.isArray(built?.segments)?built.segments:[];
    const segments=rawSegments.map((info,i)=>{
      const a=resolved[i],b=resolved[i+1];
      const from=a?.name||a?.p?.name||'';
      const to=b?.name||b?.p?.name||'';
      if(!a?.p||!b?.p){
        return {from,to,kind:'missing-point',minutes:null,source:'固定座標なし'};
      }
      if(!info||info.missing){
        return {from,to,kind:'missing',minutes:Number(info?.minutes)||null,source:String(info?.source||'CT情報なし')};
      }
      return {
        from,to,
        kind:info.derived?'derived':(info.estimated?'estimated':(info.composed?'composed':'verified')),
        minutes:Number(info.minutes)||null,
        source:String(info.source||''),
        estimated:!!info.estimated,
        derived:!!info.derived,
        composed:!!info.composed
      };
    });
    return {resolved,segments,distributedPointCount:Number(built?.distributedPointCount)||0};
  };
  const build=()=>{
    const mountains=[...JAPAN_300_MOUNTAINS];
    const coordinateIssues=[];
    const estimatedCt=[];
    const derivedCt=[];
    const missingCt=[];
    const noRepresentative=[];
    const sparseWaypoints=[];
    const allRoutes=[];
    for(const mountain of mountains){
      const pts=uniquePoints(mountain);
      const resolvedPts=pts.filter(coordOk);
      const routeOptions=representativeCourseOptions(mountain);
      const peak=nationalMountainPoint(mountain);
      if(!peak){
        coordinateIssues.push({mountain,type:'山頂',point:mountain,detail:'全国分析に使える固定山頂座標なし'});
      }
      for(const p of pts){
        if(!coordOk(p))coordinateIssues.push({mountain,type:representativeRoleLabel(p.type),point:p.name||'名称未設定',detail:'固定候補の緯度・経度が未確定'});
      }
      if(!routeOptions.length){
        noRepresentative.push({mountain,waypointCount:resolvedPts.length,trailheads:resolvedPts.filter(p=>p.type==='trailhead').length,peaks:resolvedPts.filter(p=>p.type==='peak').length});
      }
      // A route planner feels thin below four usable fixed points; keep the threshold explicit in the UI data.
      if(resolvedPts.length<=3){
        sparseWaypoints.push({mountain,count:resolvedPts.length,trailheads:resolvedPts.filter(p=>p.type==='trailhead').length,huts:resolvedPts.filter(p=>p.type==='hut').length,peaks:resolvedPts.filter(p=>p.type==='peak').length});
      }
      routeOptions.forEach((course,courseIndex)=>{
        const audit=routeAudit(mountain,course);
        allRoutes.push({mountain,course:course.label||`代表コース${courseIndex+1}`,pointCount:audit.resolved.length});
        audit.resolved.filter(x=>!x.p).forEach(x=>{
          coordinateIssues.push({mountain,type:representativeRoleLabel(x.type),point:x.name,detail:`代表コース「${course.label||courseIndex+1}」の固定座標なし`});
        });
        audit.segments.forEach(seg=>{
          const row={mountain,course:course.label||`代表コース${courseIndex+1}`,from:seg.from,to:seg.to,minutes:seg.minutes,source:seg.source};
          if(seg.kind==='estimated')estimatedCt.push(row);
          if(seg.kind==='derived')derivedCt.push(row);
          if(seg.kind==='missing'||seg.kind==='missing-point')missingCt.push(row);
        });
      });
    }
    const dedupe=(rows,keyFn)=>[...new Map(rows.map(r=>[keyFn(r),r])).values()];
    const coords=dedupe(coordinateIssues,r=>`${r.mountain}|${r.type}|${r.point}|${r.detail}`);
    return {
      generatedAt:new Date().toISOString(),
      version:APP_VERSION,
      thresholds:{sparseWaypointMax:3},
      summary:{
        mountains:mountains.length,
        coordinateIssues:coords.length,
        estimatedCt:estimatedCt.length,
        derivedCt:derivedCt.length,
        missingCt:missingCt.length,
        noRepresentative:noRepresentative.length,
        sparseWaypoints:sparseWaypoints.length,
        representativeRoutes:allRoutes.length
      },
      coordinateIssues:coords,
      estimatedCt:dedupe(estimatedCt,r=>`${r.mountain}|${r.course}|${r.from}|${r.to}`),
      derivedCt:dedupe(derivedCt,r=>`${r.mountain}|${r.course}|${r.from}|${r.to}`),
      missingCt:dedupe(missingCt,r=>`${r.mountain}|${r.course}|${r.from}|${r.to}`),
      noRepresentative,
      sparseWaypoints,
      routes:allRoutes
    };
  };
  return {build};
})();
// ===== V1.5.111 EMBEDDED REPRESENTATIVE ROUTE ENRICHMENT =====
// Traten V1.5.111 embedded consolidated representative-route enrichment.
// Self-contained bundle: V1.5.100-V1.5.104. Prevents missing old diff scripts from silently reverting routes to trailhead-summit-trailhead.
// Traten V1.5.100: 全国代表コース細分化フェーズ1。
// 初回対象: 仙丈ヶ岳。既存の「北沢峠→山頂→北沢峠」だけの粗い代表コースを、
// 小仙丈ヶ岳・仙丈小屋・馬ノ背ヒュッテを含む実用的な周回へ置換する。
// 未確認座標・推定CTは追加しない。
(function(){'use strict';

const VERSION='1.5.100';
const SOURCE='V1.5.100 representative route enrichment';

// 小仙丈ヶ岳: OpenStreetMap (node 832298351) / Mapcarta掲載値。
try{
  const catalog=BUILTIN_ROUTE_CATALOG['仙丈ヶ岳']||(BUILTIN_ROUTE_CATALOG['仙丈ヶ岳']=[]);
  const key='peak|小仙丈ヶ岳';
  if(!catalog.some(p=>`${p.type}|${p.name}`===key)){
    catalog.push({
      id:'v15100-senjo-kosenjo',type:'peak',name:'小仙丈ヶ岳',
      lat:35.72590,lon:138.19600,elevation:2855,
      source:'OpenStreetMap node 832298351 / Mapcarta（2026-09-05確認）'
    });
  }
}catch(_){ }

// YAMAP「北沢峠-仙丈ヶ岳 周回コース」の公開モデルコース・チェックポイントを区間合算。
// 北沢峠→小仙丈ヶ岳 = 40 + 65 + 58 = 163分
// 小仙丈ヶ岳→仙丈ヶ岳 = 48 + 20 + 10 = 78分
// 馬ノ背ヒュッテ→北沢峠 = 10 + 25 + 45 + 30 = 110分
// 山頂→仙丈小屋、仙丈小屋→馬ノ背ヒュッテは既存の南アルプス市芦安山岳館CTを優先する。
const T=Object.freeze({
  '北沢峠→小仙丈ヶ岳':{minutes:163,source:'YAMAP・北沢峠-仙丈ヶ岳 周回モデル（北沢峠→分岐→藪沢大滝の頭→小仙丈ヶ岳、2026-09-05確認）',sourceType:'yamap'},
  '小仙丈ヶ岳→仙丈ヶ岳':{minutes:78,source:'YAMAP・北沢峠-仙丈ヶ岳 周回モデル（小仙丈ヶ岳→分岐→仙丈ヶ岳、2026-09-05確認）',sourceType:'yamap'},
  '馬の背ヒュッテ→北沢峠':{minutes:110,source:'YAMAP・北沢峠-仙丈ヶ岳 周回モデル（馬ノ背ヒュッテ→薮沢小屋→藪沢大滝の頭→北沢峠、2026-09-05確認）',sourceType:'yamap'}
});

try{
  if(typeof directCourseTimeInfoByNames==='function'){
    const old=directCourseTimeInfoByNames;
    directCourseTimeInfoByNames=function(a,b){
      return T[`${String(a||'').trim()}→${String(b||'').trim()}`]||old(a,b);
    };
  }
}catch(_){ }
try{
  if(typeof courseTimeInfo==='function'){
    const old=courseTimeInfo;
    courseTimeInfo=function(a,b){
      return T[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||old(a,b);
    };
  }
}catch(_){ }

const ROUTE=Object.freeze({
  label:'北沢峠・小仙丈尾根〜馬ノ背周回',
  points:Object.freeze([
    ['trailhead','北沢峠','登山口'],
    ['peak','小仙丈ヶ岳','通過ピーク'],
    ['peak','仙丈ヶ岳','山頂'],
    ['hut','仙丈小屋','山小屋'],
    ['hut','馬の背ヒュッテ','山小屋'],
    ['trailhead','北沢峠','下山口']
  ]),
  source:SOURCE,
  verified:true
});

if(typeof representativeCourseOptions==='function'){
  const old=representativeCourseOptions;
  representativeCourseOptions=function(mountain){
    let key=String(mountain||'').trim();
    try{key=canonicalMountainName(key);}catch(_){ }
    const opts=old(mountain)||[];
    if(key!=='仙丈ヶ岳')return opts;
    // 同じ北沢峠起点の粗い旧コースは先頭から外し、新しい周回を第一候補にする。
    return [ROUTE,...opts.filter(c=>c?.label!==ROUTE.label && !(c?.points?.length<=3 && c?.points?.[0]?.[1]==='北沢峠'))];
  };
}

// 外部差分コースでも既存の代表コース解決器と同じ座標・CT検証を行う。
try{
  if(typeof buildRepresentativeResolvedRoute==='function'){
    const old=buildRepresentativeResolvedRoute;
    buildRepresentativeResolvedRoute=function(mountain,course){
      if(course?.source!==SOURCE)return old(mountain,course);
      const defs=course.points.map(p=>[...p]);
      const resolved=defs.map(([type,name,role])=>({type,name,role,p:representativeCandidate(type,name,mountain)||null}));
      const segments=[];
      for(let i=1;i<resolved.length;i++){
        const a=resolved[i-1],b=resolved[i];
        if(!a.p||!b.p)return {error:`${a.name} → ${b.name} の地点座標を解決できません。`};
        const info=T[`${a.name}→${b.name}`]||courseTimeInfo(a.p,b.p);
        if(!info||info.estimated)return {error:`${a.name} → ${b.name} の確認済みCTがありません。`};
        segments.push(info);
      }
      return {resolved,segments,distributedPointCount:0};
    };
  }
}catch(_){ }

try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15100=Object.freeze({
  version:VERSION,
  phase:'nationwide representative-course refinement / phase 1',
  mountains:Object.freeze(['仙丈ヶ岳']),
  route:Object.freeze(['北沢峠','小仙丈ヶ岳','仙丈ヶ岳','仙丈小屋','馬の背ヒュッテ','北沢峠']),
  policy:'verified fixed coordinates + public CT only; no coordinate/CT inference'
});
})();
// Traten V1.5.101: 全国代表コース細分化フェーズ2。
// 既存の固定座標 + 既存の確認済み直結CTだけを利用し、粗い代表コースへ主要通過点を追加する。
// 新規座標・新規CT・推定CTは追加しない。
(function(){'use strict';
const VERSION='1.5.101';

const RULES=Object.freeze({
  '槍ヶ岳|上高地・槍沢ルート': Object.freeze([
    {after:'上高地',before:'槍沢ロッヂ',points:[['hut','横尾山荘','山小屋']]},
    {after:'槍沢ロッヂ',before:'槍ヶ岳山荘',points:[
      ['camp','ババ平（槍沢キャンプ場）','テント場'],
      ['pass','大曲（水俣乗越分岐）','峠・分岐'],
      ['pass','天狗原分岐','峠・分岐']
    ]}
  ]),
  '常念岳|一ノ沢ルート': Object.freeze([
    {after:'一ノ沢登山口',before:'常念小屋',points:[['pass','常念乗越','峠・分岐']]}
  ]),
  '大雪山（旭岳）|旭岳ロープウェイ姿見駅ルート': Object.freeze([
    {after:'旭岳ロープウェイ姿見駅',before:'大雪山（旭岳）',points:[['hut','旭岳石室','山小屋']]}
  ]),
  '鳥海山|鉾立登山口（象潟口）ルート': Object.freeze([
    {after:'鉾立登山口（象潟口）',before:'鳥海山（新山）',points:[['hut','御浜小屋','山小屋']]}
  ]),
  '谷川岳|天神平ルート': Object.freeze([
    {after:'天神平',before:'谷川岳（オキノ耳）',points:[['hut','熊穴沢避難小屋','山小屋']]}
  ]),
  '赤岳|美濃戸口ルート': Object.freeze([
    {after:'美濃戸口',before:'赤岳',points:[
      ['trailhead','美濃戸','登山口'],['hut','赤岳鉱泉','山小屋'],['hut','行者小屋','山小屋']
    ]}
  ]),
  '高妻山|戸隠キャンプ場・高妻山登山者駐車場ルート': Object.freeze([
    {after:'戸隠キャンプ場・高妻山登山者駐車場',before:'高妻山',points:[['hut','一不動避難小屋','山小屋']]}
  ]),
  '妙高山|笹ヶ峰ルート': Object.freeze([
    {after:'笹ヶ峰登山口',before:'妙高山',points:[['hut','黒沢池ヒュッテ','山小屋']]}
  ]),
  '烏帽子岳|高瀬ダムルート': Object.freeze([
    {after:'高瀬ダム',before:'烏帽子岳',points:[['hut','烏帽子小屋','山小屋']]}
  ]),
  '木曽駒ヶ岳|千畳敷ルート': Object.freeze([
    {after:'千畳敷',before:'木曽駒ヶ岳',points:[['pass','乗越浄土','峠・分岐']]}
  ]),
  '甲武信ヶ岳|毛木平ルート': Object.freeze([
    {after:'毛木平登山口',before:'甲武信ヶ岳',points:[['hut','甲武信小屋','山小屋']]}
  ]),
  '瑞牆山|瑞牆山荘・富士見平口ルート': Object.freeze([
    {after:'瑞牆山荘・富士見平口',before:'瑞牆山',points:[['hut','富士見平小屋','山小屋']]}
  ]),
  '白木峰|白木峰8合目駐車場ルート': Object.freeze([
    {after:'白木峰8合目駐車場',before:'白木峰',points:[['hut','白木山荘（避難小屋）','山小屋']]}
  ]),
  '白山|別当出合ルート': Object.freeze([
    {after:'別当出合',before:'白山（御前峰）',points:[['hut','白山室堂','山小屋']]}
  ]),
  '剣山|見ノ越 剣山登山口ルート': Object.freeze([
    // 既存V1.5系で往路に野営場までは入っているため、西島駅を追加し、復路も同じ実ルートへ細分化。
    {after:'剣山野営場（西島野営場）',before:'剣山',points:[['trailhead','剣山観光登山リフト西島駅','登山口']],directional:true},
    {after:'剣山',before:'見ノ越 剣山登山口',points:[
      ['trailhead','剣山観光登山リフト西島駅','下山口'],['camp','剣山野営場（西島野営場）','テント場']
    ],directional:true}
  ]),
  '蝶ヶ岳|三股ルート': Object.freeze([
    {after:'三股登山口',before:'蝶ヶ岳',points:[['hut','蝶ヶ岳ヒュッテ','山小屋']]}
  ]),
  '唐松岳|八方尾根ルート': Object.freeze([
    {after:'八方池山荘',before:'唐松岳頂上山荘',points:[['pass','八方池','峠・分岐']]}
  ])
});

function reversePoints(points){return [...points].reverse().map(p=>[p[0],p[1],p[2]]);}
function expand(defs,rules){
  let out=defs.map(p=>[...p]);
  for(const r of rules){
    const next=[];
    for(let i=0;i<out.length;i++){
      const cur=out[i];
      next.push(cur);
      const nxt=out[i+1];
      if(!nxt)continue;
      if(cur[1]===r.after&&nxt[1]===r.before) next.push(...r.points.map(p=>[...p]));
      else if(!r.directional&&cur[1]===r.before&&nxt[1]===r.after) next.push(...reversePoints(r.points));
    }
    out=next;
  }
  return out;
}

if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){
    const defs=old(mountain,course)||[];
    let key=String(mountain||'').trim();
    try{key=canonicalMountainName(key);}catch(_){ }
    const rules=RULES[`${key}|${course?.label||''}`];
    return rules?expand(defs,rules):defs;
  };
}

try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15101=Object.freeze({
  version:VERSION,
  phase:'nationwide representative-course refinement / phase 2',
  mountains:Object.freeze([...new Set(Object.keys(RULES).map(k=>k.split('|')[0]))]),
  routeCount:Object.keys(RULES).length,
  policy:'existing fixed coordinates + existing verified direct CT only; no new coordinate/CT inference'
});
})();
// Traten V1.5.102: 「登山口→山頂→登山口」優先解消フェーズ。
// 既存の固定座標と既存の確認済み直結CTだけで、3点だけの代表コースを細分化する。
// 新規座標・新規CT・推定CTは追加しない。
(function(){'use strict';
const VERSION='1.5.102';
const RULES=Object.freeze({
  '至仏山|鳩待峠ルート':Object.freeze([
    {after:'鳩待峠',before:'至仏山',points:[['trailhead','山ノ鼻（至仏山東面登山道入口・登り専用）','経由']],directional:true}
  ]),
  '至仏山|山ノ鼻・東面登山道ルート':Object.freeze([
    {after:'至仏山',before:'山ノ鼻（至仏山東面登山道入口・登り専用）',points:[['trailhead','鳩待峠','経由']],directional:true}
  ]),
  '蓮華岳|扇沢登山口ルート':Object.freeze([
    {after:'扇沢登山口',before:'蓮華岳',points:[['hut','針ノ木小屋','山小屋']],directional:true}
  ]),
  '藤原岳|大貝戸登山口 藤原岳ルート':Object.freeze([
    {after:'大貝戸登山口 藤原岳',before:'藤原岳',points:[['hut','藤原山荘','山小屋']]}
  ]),
  '剣山|剣山観光登山リフト西島駅ルート':Object.freeze([
    {after:'剣山観光登山リフト西島駅',before:'剣山',points:[['hut','剣山頂上ヒュッテ','山小屋']],directional:true}
  ])
});
function reversePoints(points){return [...points].reverse().map(p=>[p[0],p[1],p[2]]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const nxt=out[i+1];if(!nxt)continue;if(cur[1]===r.after&&nxt[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(!r.directional&&cur[1]===r.before&&nxt[1]===r.after)next.push(...reversePoints(r.points));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){
    const defs=old(mountain,course)||[];let key=String(mountain||'').trim();try{key=canonicalMountainName(key);}catch(_){}
    const rules=RULES[`${key}|${course?.label||''}`];return rules?expand(defs,rules):defs;
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){}
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15102=Object.freeze({version:VERSION,phase:'3-point representative-route elimination / batch 1',routeCount:Object.keys(RULES).length,mountains:Object.freeze([...new Set(Object.keys(RULES).map(k=>k.split('|')[0]))]),policy:'existing fixed coordinates + existing verified direct CT only; no new coordinate/CT inference'});
})();
// Traten V1.5.103: 「登山口→山頂→登山口」優先解消フェーズ / bulk batch 2。
// 既存固定地点を優先し、公開モデルコースで確認した区間CTだけ追加する。
// 推測座標・推測CTは追加しない。
(function(){'use strict';
const VERSION='1.5.103';

const EXTRA_CT=Object.freeze({
  // 甲斐駒ヶ岳: YAMAP 北沢峠-仙水峠-甲斐駒ヶ岳-双児山 周回モデル。
  // 仙水小屋 08:38 -> 甲斐駒ヶ岳 11:56 = 198分。
  '仙水小屋→甲斐駒ヶ岳':Object.freeze({minutes:198,source:'YAMAP・北沢峠-仙水峠-甲斐駒ヶ岳-双児山 周回モデル（仙水小屋08:38→甲斐駒ヶ岳11:56、2026-09-05確認）',sourceType:'yamap'}),

  // 苗場山: YAMAP 小赤沢コース公開チェックポイント。
  '小赤沢三合目登山口→苗場山頂ヒュッテ':Object.freeze({minutes:213,source:'YAMAP・苗場山 小赤沢コース（小赤沢3合目登山口06:00→苗場山頂ヒュッテ09:33、2026-09-05確認）',sourceType:'yamap'}),
  '苗場山頂ヒュッテ→苗場山':Object.freeze({minutes:2,source:'YAMAP・苗場山 小赤沢コース（苗場山頂ヒュッテ09:33→苗場山09:35、2026-09-05確認）',sourceType:'yamap'}),
  '苗場山→苗場山頂ヒュッテ':Object.freeze({minutes:1,source:'YAMAP・苗場山 小赤沢コース（苗場山09:35→苗場山頂ヒュッテ09:36、2026-09-05確認）',sourceType:'yamap'}),
  '苗場山頂ヒュッテ→小赤沢三合目登山口':Object.freeze({minutes:175,source:'YAMAP・苗場山 小赤沢コース（苗場山頂ヒュッテ09:36→小赤沢3合目登山口12:31、2026-09-05確認）',sourceType:'yamap'}),

  // 秋田駒ヶ岳: YAMAP 男女岳往復モデル。
  '秋田駒ヶ岳（男女岳）→阿弥陀池避難小屋':Object.freeze({minutes:8,source:'YAMAP・秋田駒ヶ岳 男女岳往復モデル（男女岳09:52→阿弥陀池避難小屋10:00、2026-09-05確認）',sourceType:'yamap'}),
  '阿弥陀池避難小屋→八合目小屋 秋田駒ヶ岳':Object.freeze({minutes:61,source:'YAMAP・秋田駒ヶ岳 男女岳往復モデル（阿弥陀池避難小屋10:00→八合目登山口11:01、2026-09-05確認）',sourceType:'yamap'}),

  // 大菩薩嶺: YAMAP 上日川峠-大菩薩嶺-大菩薩峠 周回モデル。
  '大菩薩嶺→介山荘':Object.freeze({minutes:34,source:'YAMAP・上日川峠-大菩薩嶺-大菩薩峠 周回モデル（大菩薩嶺10:12→介山荘10:46、2026-09-05確認）',sourceType:'yamap'}),
  '介山荘→上日川峠':Object.freeze({minutes:84,source:'YAMAP・上日川峠-大菩薩嶺-大菩薩峠 周回モデル（介山荘10:46→上日川峠12:10、2026-09-05確認）',sourceType:'yamap'}),


  // 空木岳: YAMAP 池山尾根往復モデル。駒峰ヒュッテ12:25→空木岳登山口16:19 = 234分。
  '空木駒峰ヒュッテ→池山口登山口':Object.freeze({minutes:234,source:'YAMAP・空木岳 池山尾根往復モデル（駒峰ヒュッテ12:25→空木岳登山口16:19、2026-09-05確認）',sourceType:'yamap'}),

  // 大天井岳: 公開表銀座モデル。中房→燕山荘 = 70 + 110 + 65 = 245分。
  '中房登山口（燕岳・大天井岳 表銀座ルート）→燕山荘':Object.freeze({minutes:245,source:'山旅旅・表銀座 中房～大天井岳モデル（中房→第2ベンチ70分→合戦小屋110分→燕山荘65分、2026-09-05確認）',sourceType:'public-guide'}),

  // 伯母子岳: YAMAP 大股～伯母子峠～伯母子岳～大股 ピストンモデル。
  '伯母子岳→伯母子岳避難小屋':Object.freeze({minutes:25,source:'YAMAP・大股～伯母子峠～伯母子岳～大股 ピストン（伯母子岳11:32→伯母子岳山小屋11:57、2026-09-05確認）',sourceType:'yamap'}),
  '伯母子岳避難小屋→大股登山口 伯母子岳':Object.freeze({minutes:150,source:'YAMAP・大股～伯母子峠～伯母子岳～大股 ピストン（伯母子岳山小屋11:57→大股側駐車場14:27、2026-09-05確認）',sourceType:'yamap'})
});

function ctKey(a,b){return `${String(a||'').trim()}→${String(b||'').trim()}`;}
try{
  if(typeof directCourseTimeInfoByNames==='function'){
    const old=directCourseTimeInfoByNames;
    directCourseTimeInfoByNames=function(a,b){return EXTRA_CT[ctKey(a,b)]||old(a,b);};
  }
}catch(_){ }
try{
  if(typeof courseTimeInfo==='function'){
    const old=courseTimeInfo;
    courseTimeInfo=function(a,b){return EXTRA_CT[ctKey(a?.name,b?.name)]||old(a,b);};
  }
}catch(_){ }

const RULES=Object.freeze({
  // V1.5.101 の赤岳キーが canonicalMountainName('八ヶ岳（赤岳）')='赤岳' と一致する形で確実に適用。
  '赤岳|美濃戸口ルート':Object.freeze([
    {after:'美濃戸口',before:'赤岳',points:[['trailhead','美濃戸','登山口'],['hut','赤岳鉱泉','山小屋'],['hut','行者小屋','山小屋']]}
  ]),

  // 既存の確認済み直結CTのみで往路を細分化。
  '茶臼岳|沼平ゲートルート':Object.freeze([
    {after:'沼平ゲート',before:'茶臼岳',points:[['hut','茶臼小屋','山小屋']],directional:true}
  ]),

  // 北沢峠→長衛小屋→仙水小屋まで既存CT。仙水小屋→山頂のみ公開モデルの区間合算を追加。
  '甲斐駒ヶ岳|北沢峠ルート':Object.freeze([
    {after:'北沢峠',before:'甲斐駒ヶ岳',points:[['hut','長衛小屋','山小屋'],['hut','仙水小屋','山小屋']],directional:true}
  ]),

  // 小赤沢コースは山頂ヒュッテを往復とも明示。
  '苗場山|小赤沢三合目ルート':Object.freeze([
    {after:'小赤沢三合目登山口',before:'苗場山',points:[['hut','苗場山頂ヒュッテ','山小屋']]}
  ]),

  // 下山時に阿弥陀池避難小屋を通る標準モデルを反映。
  '秋田駒ヶ岳|八合目小屋 秋田駒ヶ岳ルート':Object.freeze([
    {after:'秋田駒ヶ岳（男女岳）',before:'八合目小屋 秋田駒ヶ岳',points:[['hut','阿弥陀池避難小屋','山小屋']],directional:true}
  ]),

  // 大菩薩峠側へ周回して介山荘経由で上日川峠へ戻る形を反映。
  '大菩薩嶺|上日川峠ルート':Object.freeze([
    {after:'大菩薩嶺',before:'上日川峠',points:[['hut','介山荘','山小屋']],directional:true}
  ]),


  // 池山尾根は下山側に駒峰ヒュッテを明示。山頂→小屋は既存確認済みCT、小屋→登山口のみ公開モデルを追加。
  '空木岳|池山尾根ルート':Object.freeze([
    {after:'空木岳',before:'池山口登山口',points:[['hut','空木駒峰ヒュッテ','山小屋']],directional:true}
  ]),

  // 表銀座の往路に燕山荘・大天荘を明示。燕山荘→大天荘→山頂は既存確認済みCT。
  '大天井岳|中房登山口（燕岳・大天井岳 表銀座ルート）ルート':Object.freeze([
    {after:'中房登山口（燕岳・大天井岳 表銀座ルート）',before:'大天井岳',points:[['hut','燕山荘','山小屋'],['hut','大天荘','山小屋']],directional:true}
  ]),

  // 大股ピストンの下山側に伯母子岳避難小屋を明示。
  '伯母子岳|大股登山口 伯母子岳ルート':Object.freeze([
    {after:'伯母子岳',before:'大股登山口 伯母子岳',points:[['hut','伯母子岳避難小屋','山小屋']],directional:true}
  ])
});

function reversePoints(points){return [...points].reverse().map(p=>[p[0],p[1],p[2]]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const nxt=out[i+1];if(!nxt)continue;if(cur[1]===r.after&&nxt[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(!r.directional&&cur[1]===r.before&&nxt[1]===r.after)next.push(...reversePoints(r.points));}out=next;}return out;}

if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){
    const defs=old(mountain,course)||[];let key=String(mountain||'').trim();
    try{key=canonicalMountainName(key);}catch(_){ }
    const rules=RULES[`${key}|${course?.label||''}`];
    return rules?expand(defs,rules):defs;
  };
}

try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15103=Object.freeze({version:VERSION,phase:'3-point representative-route elimination / bulk batch 2',routeCount:Object.keys(RULES).length,extraVerifiedCtCount:Object.keys(EXTRA_CT).length,mountains:Object.freeze([...new Set(Object.keys(RULES).map(k=>k.split('|')[0]))]),policy:'existing fixed coordinates + public checkpoint CT only; no guessed coordinate/CT'});
})();
// Traten V1.5.104: 3-point representative-route elimination / bulk batch 3.
// Priority: eliminate representative courses that only show trailhead -> summit -> trailhead.
// Public model-course CTs and fixed/public coordinates only. No CT/coordinate inference.
(function(){'use strict';
const VERSION='1.5.104';

// New fixed route points required by public standard routes.
try{
  const cat=BUILTIN_ROUTE_CATALOG['岩手山']||(BUILTIN_ROUTE_CATALOG['岩手山']=[]);
  if(!cat.some(p=>p.type==='hut'&&p.name==='平笠不動避難小屋'))cat.push({
    id:'v15104-iwate-hirakasa',type:'hut',name:'平笠不動避難小屋',
    lat:39.8563889,lon:140.9963889,elevation:1766,
    source:'PORTALFIELD / 国土地理院地図掲載座標（北緯39度51分23秒 東経140度59分47秒、2026-09-05確認）'
  });
}catch(_){ }
try{
  const cat=BUILTIN_ROUTE_CATALOG['乗鞍岳']||(BUILTIN_ROUTE_CATALOG['乗鞍岳']=[]);
  if(!cat.some(p=>p.type==='hut'&&p.name==='肩ノ小屋'))cat.push({
    id:'v15104-norikura-katanokoya',type:'hut',name:'肩ノ小屋',
    lat:36.1144444,lon:137.5525,elevation:2768,
    source:'PORTALFIELD / 長野県山小屋情報（北緯36度6分52秒 東経137度33分09秒、2026-09-05確認）'
  });
}catch(_){ }

const EXTRA_CT=Object.freeze({
  // 岩手山・焼走り: YAMAP standard model.
  '焼走り登山口→平笠不動避難小屋':{minutes:290,source:'YAMAP 岩手山 焼走り登山口モデル（07:00→11:50、2026-09-05確認）',sourceType:'yamap'},
  '平笠不動避難小屋→岩手山':{minutes:12,source:'YAMAP 岩手山 焼走り登山口モデル（11:50→12:02、2026-09-05確認）',sourceType:'yamap'},
  '岩手山→平笠不動避難小屋':{minutes:75,source:'YAMAP 岩手山 焼走り登山口モデル（12:02→13:17、2026-09-05確認）',sourceType:'yamap'},
  '平笠不動避難小屋→焼走り登山口':{minutes:130,source:'YAMAP 岩手山 焼走り登山口モデル（13:17→15:27、2026-09-05確認）',sourceType:'yamap'},

  // 金峰山・瑞牆山荘: YAMAP standard model.
  '瑞牆山荘・富士見平口→富士見平小屋':{minutes:105,source:'YAMAP 瑞牆山荘-金峰山 往復モデル（07:03→08:48、2026-09-05確認）',sourceType:'yamap'},
  '富士見平小屋→金峰山':{minutes:184,source:'YAMAP 瑞牆山荘-金峰山 往復モデル（08:48→11:52、2026-09-05確認）',sourceType:'yamap'},
  '金峰山→富士見平小屋':{minutes:193,source:'YAMAP 瑞牆山荘-金峰山 往復モデル（11:52→15:05、2026-09-05確認）',sourceType:'yamap'},
  '富士見平小屋→瑞牆山荘・富士見平口':{minutes:33,source:'YAMAP 瑞牆山荘-金峰山 往復モデル（15:05→15:38、2026-09-05確認）',sourceType:'yamap'},

  // 天狗岳・唐沢鉱泉: YAMAP standard model.
  '唐沢鉱泉→黒百合ヒュッテ':{minutes:73,source:'YAMAP 中山峠-東天狗岳 往復モデル（唐沢鉱泉08:38→黒百合ヒュッテ09:51、2026-09-05確認）',sourceType:'yamap'},
  '黒百合ヒュッテ→天狗岳':{minutes:90,source:'YAMAP 中山峠-東天狗岳 往復モデル（黒百合ヒュッテ09:51→東天狗岳11:21、2026-09-05確認）',sourceType:'yamap'},
  '天狗岳→黒百合ヒュッテ':{minutes:103,source:'YAMAP 中山峠-東天狗岳 往復モデル（東天狗岳11:21→黒百合ヒュッテ13:04、2026-09-05確認）',sourceType:'yamap'},
  '黒百合ヒュッテ→唐沢鉱泉':{minutes:78,source:'YAMAP 中山峠-東天狗岳 往復モデル（黒百合ヒュッテ13:04→唐沢鉱泉14:22、2026-09-05確認）',sourceType:'yamap'},

  // 白山・平瀬道: YAMAP standard model.
  '大白川・平瀬道登山口→白山室堂':{minutes:269,source:'YAMAP 平瀬道登山口-室堂センター-白山 往復モデル（06:00→10:29、2026-09-05確認）',sourceType:'yamap'},
  '白山室堂→白山（御前峰）':{minutes:79,source:'YAMAP 平瀬道登山口-室堂センター-白山 往復モデル（10:29→11:48、2026-09-05確認）',sourceType:'yamap'},
  '白山（御前峰）→白山室堂':{minutes:17,source:'YAMAP 平瀬道登山口-室堂センター-白山 往復モデル（11:48→12:05、2026-09-05確認）',sourceType:'yamap'},
  '白山室堂→大白川・平瀬道登山口':{minutes:200,source:'YAMAP 平瀬道登山口-室堂センター-白山 往復モデル（12:05→15:25、2026-09-05確認）',sourceType:'yamap'},

  // 仙ノ倉山: YAMAP 松手山-平標山-仙ノ倉山-平元新道 model; descent only.
  '仙ノ倉山→平標山の家':{minutes:130,source:'YAMAP 松手山-平標山-仙ノ倉山-平元新道モデル（仙ノ倉10:51→平標山の家13:01、2026-09-05確認）',sourceType:'yamap'},
  '平標山の家→平標登山口・元橋駐車場':{minutes:67,source:'YAMAP 松手山-平標山-仙ノ倉山-平元新道モデル（平標山の家13:01→平標登山口駐車場14:08、2026-09-05確認）',sourceType:'yamap'},

  // 乗鞍岳・畳平: YAMAP standard model.
  '畳平バスターミナル→肩ノ小屋':{minutes:39,source:'YAMAP 乗鞍岳（畳平）モデル（08:00→肩ノ小屋08:39、2026-09-05確認）',sourceType:'yamap'},
  '肩ノ小屋→乗鞍岳':{minutes:62,source:'YAMAP 乗鞍岳（畳平）モデル（肩ノ小屋08:39→剣ヶ峰09:41、2026-09-05確認）',sourceType:'yamap'},
  '乗鞍岳→肩ノ小屋':{minutes:45,source:'YAMAP 乗鞍岳（畳平）モデル（剣ヶ峰09:41→肩ノ小屋10:26、2026-09-05確認）',sourceType:'yamap'},
  '肩ノ小屋→畳平バスターミナル':{minutes:28,source:'YAMAP 乗鞍岳（畳平）モデル（肩ノ小屋10:26→畳平10:54、2026-09-05確認）',sourceType:'yamap'},

  // 戸隠山: YAMAP 戸隠山周回 model; descent to campground via 一不動.
  '戸隠山→一不動避難小屋':{minutes:110,source:'YAMAP 戸隠山周回モデル（戸隠山10:10→一不動避難小屋12:00、2026-09-05確認）',sourceType:'yamap'},
  '一不動避難小屋→戸隠キャンプ場・戸隠牧場':{minutes:145,source:'YAMAP 戸隠山周回モデル（一不動12:00→キャンプ場前14:25、2026-09-05確認）',sourceType:'yamap'},

  // 久住山・長者原: YAMAP public model route through 法華院 and 長者原.
  '久住山→法華院温泉山荘':{minutes:114,source:'YAMAP 牧ノ戸峠-久住山-法華院温泉-長者原モデル（久住山10:38→法華院12:32、2026-09-05確認）',sourceType:'yamap'},
  '法華院温泉山荘→長者原':{minutes:156,source:'YAMAP 牧ノ戸峠-久住山-法華院温泉-長者原モデル（法華院08:00相当→長者原10:36、区間2:36、2026-09-05確認）',sourceType:'yamap'}
});
function key(a,b){return `${String(a||'').trim()}→${String(b||'').trim()}`;}
try{if(typeof directCourseTimeInfoByNames==='function'){const old=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return EXTRA_CT[key(a,b)]||old(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const old=courseTimeInfo;courseTimeInfo=function(a,b){return EXTRA_CT[key(a?.name,b?.name)]||old(a,b);};}}catch(_){ }

const RULES=Object.freeze({
  '岩手山|焼走りルート':[{after:'焼走り登山口',before:'岩手山',points:[['hut','平笠不動避難小屋','避難小屋']]}],
  '金峰山|瑞牆山荘・富士見平ルート':[{after:'瑞牆山荘・富士見平口',before:'金峰山',points:[['hut','富士見平小屋','山小屋']]}],
  '天狗岳|唐沢鉱泉ルート':[{after:'唐沢鉱泉',before:'天狗岳',points:[['hut','黒百合ヒュッテ','山小屋']]}],
  '白山|大白川・平瀬道ルート':[{after:'大白川・平瀬道登山口',before:'白山（御前峰）',points:[['hut','白山室堂','山小屋']]}],
  '仙ノ倉山|平標登山口・元橋駐車場ルート':[{after:'仙ノ倉山',before:'平標登山口・元橋駐車場',points:[['hut','平標山の家','山小屋']],directional:true}],
  '乗鞍岳|畳平バスターミナルルート':[{after:'畳平バスターミナル',before:'乗鞍岳',points:[['hut','肩ノ小屋','山小屋']]}],
  '戸隠山|戸隠キャンプ場・戸隠牧場ルート':[{after:'戸隠山',before:'戸隠キャンプ場・戸隠牧場',points:[['hut','一不動避難小屋','避難小屋']],directional:true}],
  '久住山|長者原ルート':[{after:'久住山',before:'長者原',points:[['hut','法華院温泉山荘','山小屋']],directional:true}]
});
function rev(points){return [...points].reverse().map(p=>[...p]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const n=out[i+1];if(!n)continue;if(cur[1]===r.after&&n[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(!r.directional&&cur[1]===r.before&&n[1]===r.after)next.push(...rev(r.points));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){const defs=old(mountain,course)||[];let m=String(mountain||'').trim();try{m=canonicalMountainName(m);}catch(_){ }const rules=RULES[`${m}|${course?.label||''}`];return rules?expand(defs,rules):defs;};
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15104=Object.freeze({version:VERSION,phase:'3-point representative-route elimination / bulk batch 3',routeCount:Object.keys(RULES).length,extraVerifiedCtCount:Object.keys(EXTRA_CT).length,newFixedPoints:2,policy:'public model-course CT + public fixed coordinates only; no inference'});
})();

// Traten V1.5.106: 3-point representative-course reduction batch.
// Priority: eliminate trailhead -> summit -> trailhead routes using verified public CT / fixed coordinates only.
(function(){'use strict';
const VERSION='1.5.106';
const SOURCE='V1.5.106 3-point route reduction';

function addPoint(mountain,p){
  try{
    const c=BUILTIN_ROUTE_CATALOG[mountain]||(BUILTIN_ROUTE_CATALOG[mountain]=[]);
    if(!c.some(x=>x.type===p.type&&x.name===p.name))c.push(p);
  }catch(_){ }
}

// 三俣蓮華岳: all coordinates/CT already existed elsewhere in the fixed Alps network.
for(const p of [
  {id:'v15106-mitsu-tarobe',type:'hut',name:'太郎平小屋',lat:36.4548,lon:137.5195,elevation:2330,source:'existing fixed Alps network'},
  {id:'v15106-mitsu-kurobe',type:'peak',name:'黒部五郎岳',lat:36.3925,lon:137.5408,elevation:2840,source:'existing fixed Alps network'},
  {id:'v15106-mitsu-kurogoya',type:'hut',name:'黒部五郎小舎',lat:36.3834,lon:137.5565,elevation:2350,source:'existing fixed Alps network'},
  {id:'v15106-mitsu-sanso',type:'hut',name:'三俣山荘',lat:36.402,lon:137.5925,elevation:2550,source:'existing fixed Alps network'},
  {id:'v15106-mitsu-kumono',type:'hut',name:'雲ノ平山荘',lat:36.42061,lon:137.57654,elevation:2551,source:'existing fixed Alps network'},
  {id:'v15106-mitsu-yakushi',type:'hut',name:'薬師沢小屋',lat:36.42859,lon:137.54628,elevation:1920,source:'existing fixed Alps network'}
]) addPoint('三俣蓮華岳',p);

// 会津駒ヶ岳: 駒の小屋 coordinates from OpenStreetMap/Mapcarta; YAMAP public model CT.
addPoint('会津駒ヶ岳',{id:'v15106-aizu-komanokoya',type:'hut',name:'駒の小屋',lat:37.04315,lon:139.35244,elevation:2055,source:'OpenStreetMap / Mapcarta'});

// 燧ヶ岳: 俎嵓 coordinate from GSI survey result / OpenStreetMap; public model CT.
addPoint('燧ヶ岳',{id:'v15106-hiuchi-manaita',type:'peak',name:'俎嵓',lat:36.955142,lon:139.288684,elevation:2346,source:'国土地理院二等三角点「燧岳」 / OpenStreetMap'});

const T=Object.freeze({
  '滝沢登山口→駒の小屋':{minutes:182,source:'YAMAP 滝沢登山口-駒ノ大池-会津駒ヶ岳モデル（95+85+1+1分）',sourceType:'yamap'},
  '駒の小屋→会津駒ヶ岳':{minutes:30,source:'YAMAP 滝沢登山口-駒ノ大池-会津駒ヶ岳-中門岳モデル（駒の小屋→駒ノ大池→会津駒ヶ岳 15+15分）',sourceType:'yamap'},
  '御池登山口→俎嵓':{minutes:200,source:'YAMAP 御池→広沢田代→熊沢田代→俎嵓モデル（55+50+75+20分）',sourceType:'yamap'},
  '俎嵓→燧ヶ岳（柴安嵓）':{minutes:15,source:'YAMAP 広沢田代-熊沢田代-燧ヶ岳モデル 俎嵓→柴安嵓 15分',sourceType:'yamap'}
});
try{
  if(typeof directCourseTimeInfoByNames==='function'){
    const old=directCourseTimeInfoByNames;
    directCourseTimeInfoByNames=function(a,b){return T[`${String(a||'').trim()}→${String(b||'').trim()}`]||old(a,b);};
  }
}catch(_){ }
try{
  if(typeof courseTimeInfo==='function'){
    const old=courseTimeInfo;
    courseTimeInfo=function(a,b){return T[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||old(a,b);};
  }
}catch(_){ }

const RULES=Object.freeze({
  '三俣蓮華岳|折立登山口ルート':Object.freeze([
    {after:'折立登山口',before:'三俣蓮華岳',points:[['hut','太郎平小屋','山小屋'],['peak','黒部五郎岳','通過ピーク'],['hut','黒部五郎小舎','山小屋']],directional:true},
    {after:'三俣蓮華岳',before:'折立登山口',points:[['hut','三俣山荘','山小屋'],['hut','雲ノ平山荘','山小屋'],['hut','薬師沢小屋','山小屋']],directional:true}
  ]),
  '会津駒ヶ岳|滝沢ルート':Object.freeze([
    {after:'滝沢登山口',before:'会津駒ヶ岳',points:[['hut','駒の小屋','山小屋']],directional:true}
  ]),
  '燧ヶ岳|御池登山口ルート':Object.freeze([
    {after:'御池登山口',before:'燧ヶ岳（柴安嵓）',points:[['peak','俎嵓','通過ピーク']],directional:true}
  ])
});
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const nxt=out[i+1];if(nxt&&cur[1]===r.after&&nxt[1]===r.before)next.push(...r.points.map(p=>[...p]));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){const defs=old(mountain,course)||[];let key=String(mountain||'').trim();try{key=canonicalMountainName(key);}catch(_){ }const r=RULES[`${key}|${course?.label||''}`];return r?expand(defs,r):defs;};
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15106=Object.freeze({version:VERSION,mountains:Object.freeze(['三俣蓮華岳','会津駒ヶ岳','燧ヶ岳']),policy:'verified public CT + fixed/public coordinates only; no inference'});
})();

// Traten V1.5.107: 3-point representative-course reduction / verified one-hop batch.
// Only existing fixed candidates and existing non-estimated CT in both directions are used.
(function(){'use strict';
const VERSION='1.5.107';
const RULES=Object.freeze({
  '十勝岳|吹上温泉登山口ルート':Object.freeze([
    {after:'吹上温泉登山口',before:'十勝岳',points:[['hut','十勝岳避難小屋','避難小屋']]}
  ]),
  '岩手山|御神坂登山口ルート':Object.freeze([
    {after:'御神坂登山口',before:'岩手山',points:[['hut','八合目避難小屋','避難小屋']]}
  ]),
  '朝日岳（新潟・富山）|蓮華温泉ルート':Object.freeze([
    {after:'蓮華温泉',before:'朝日岳（新潟・富山）',points:[['hut','朝日小屋','山小屋']]}
  ]),
  '雪倉岳|蓮華温泉ルート':Object.freeze([
    {after:'蓮華温泉',before:'雪倉岳',points:[['hut','白馬大池山荘','山小屋']]}
  ]),
  '奥大日岳|室堂ルート':Object.freeze([
    {after:'室堂',before:'奥大日岳',points:[['hut','雷鳥荘','山小屋']]}
  ]),
  '御嶽山|中の湯登山口（黒沢口）ルート':Object.freeze([
    {after:'中の湯登山口（黒沢口）',before:'御嶽山（剣ヶ峰）',points:[['hut','女人堂','山小屋']]}
  ]),
  '藤原岳|孫太尾根登山口ルート':Object.freeze([
    {after:'孫太尾根登山口',before:'藤原岳',points:[['hut','藤原山荘','山小屋']]}
  ]),
  '大山|博労座ルート':Object.freeze([
    {after:'博労座',before:'大山（弥山）',points:[['hut','六合目避難小屋','避難小屋']]}
  ]),
  '三嶺|光石ルート':Object.freeze([
    {after:'光石登山口',before:'三嶺',points:[['hut','三嶺ヒュッテ','山小屋']]}
  ]),
  '祖母山|北谷登山口駐車場・北谷登山口ルート':Object.freeze([
    {after:'北谷登山口駐車場・北谷登山口',before:'祖母山',points:[['hut','祖母山九合目小屋','山小屋']]}
  ]),
  '祖母山|神原登山口ルート':Object.freeze([
    {after:'神原登山口',before:'祖母山',points:[['hut','祖母山九合目小屋','山小屋']]}
  ])
});
function rev(points){return [...points].reverse().map(p=>[...p]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const n=out[i+1];if(!n)continue;if(cur[1]===r.after&&n[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(cur[1]===r.before&&n[1]===r.after)next.push(...rev(r.points));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){
    const defs=old(mountain,course)||[];let m=String(mountain||'').trim();try{m=canonicalMountainName(m);}catch(_){ }
    const rules=RULES[`${m}|${course?.label||''}`];return rules?expand(defs,rules):defs;
  };
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15107=Object.freeze({version:VERSION,phase:'3-point route elimination / verified one-hop batch',routeCount:Object.keys(RULES).length,mountains:Object.freeze([...new Set(Object.keys(RULES).map(k=>k.split('|')[0]))]),policy:'existing fixed candidates + existing verified bidirectional CT only; no new coordinates/CT'});
})();

// Traten V1.5.108: bulk reduction of remaining 3-point representative courses.
// Route order and CT are taken from public model courses; no coordinate/CT estimation.
(function(){'use strict';
const VERSION='1.5.108';
function ensurePoint(mountain,p){
  try{
    if(!BUILTIN_ROUTE_CATALOG[mountain]) BUILTIN_ROUTE_CATALOG[mountain]=[];
    if(!BUILTIN_ROUTE_CATALOG[mountain].some(x=>x&&x.name===p.name)) BUILTIN_ROUTE_CATALOG[mountain].push(Object.freeze(p));
  }catch(_){ }
}
// Public fixed coordinates. These are explicit published coordinates, not interpolated values.
ensurePoint('アサヨ峰',{id:'v15108-kurisawa',type:'peak',name:'栗沢山',lat:35.73792,lon:138.23413,elevation:2714,source:'公開座標（WGS84）'});
ensurePoint('熊伏山',{id:'v15108-aokuzure',type:'pass',name:'青崩峠',lat:35.254170,lon:137.910562,elevation:1082,source:'公開座標（青崩峠）'});
ensurePoint('赤城山（黒檜山）',{id:'v15108-akagi-komagatake',type:'peak',name:'赤城駒ヶ岳',lat:36.560278,lon:139.193056,elevation:1685,source:'公開座標（赤城駒ヶ岳）'});

const EXTRA_CT=Object.freeze({
  // 筑波山 つつじヶ丘モデル: 女体山09:15→男体山09:45→女体山10:15.
  '筑波山（女体山）→筑波山（男体山）':{minutes:30,source:'YAMAP公開モデル・つつじヶ丘→女体山→男体山→女体山（2026-09-05確認）',sourceType:'yamap'},
  '筑波山（男体山）→筑波山（女体山）':{minutes:30,source:'YAMAP公開モデル・つつじヶ丘→女体山→男体山→女体山（2026-09-05確認）',sourceType:'yamap'},
  // アサヨ峰（北沢峠）<栗沢山>: 07:00→09:38→10:43 / 11:43→13:42.
  '北沢峠→栗沢山':{minutes:158,source:'YAMAP公開モデル・アサヨ峰（北沢峠）＜栗沢山＞（2026-09-05確認）',sourceType:'yamap'},
  '栗沢山→アサヨ峰':{minutes:65,source:'YAMAP公開モデル・アサヨ峰（北沢峠）＜栗沢山＞（2026-09-05確認）',sourceType:'yamap'},
  'アサヨ峰→栗沢山':{minutes:60,source:'YAMAP公開モデル・アサヨ峰（北沢峠）＜栗沢山＞（2026-09-05確認）',sourceType:'yamap'},
  '栗沢山→北沢峠':{minutes:119,source:'YAMAP公開モデル・アサヨ峰（北沢峠）＜栗沢山＞（2026-09-05確認）',sourceType:'yamap'},
  // 熊伏山: 青崩峠駐車場08:00→青崩峠08:20→熊伏山10:20 / 10:35→11:45→12:01.
  '青崩峠入口・熊伏山登山口→青崩峠':{minutes:20,source:'YAMAP公開モデル・青崩峠-青崩の頭-前熊伏山-熊伏山（2026-09-05確認）',sourceType:'yamap'},
  '青崩峠→熊伏山':{minutes:120,source:'YAMAP公開モデル・青崩峠-青崩の頭-前熊伏山-熊伏山（2026-09-05確認）',sourceType:'yamap'},
  '熊伏山→青崩峠':{minutes:70,source:'YAMAP公開モデル・青崩峠-青崩の頭-前熊伏山-熊伏山（2026-09-05確認）',sourceType:'yamap'},
  '青崩峠→青崩峠入口・熊伏山登山口':{minutes:16,source:'YAMAP公開モデル・青崩峠-青崩の頭-前熊伏山-熊伏山（2026-09-05確認）',sourceType:'yamap'},
  // 赤城駒ヶ岳登山口往復モデル: parking07:00→駒ヶ岳08:12→黒檜山09:07; return09:15→駒ヶ岳10:00→parking10:52.
  'おのこ駐車場・駒ヶ岳登山口→赤城駒ヶ岳':{minutes:72,source:'YAMAP公開モデル・赤城駒ヶ岳登山口-駒ヶ岳-黒檜山往復（2026-09-05確認）',sourceType:'yamap'},
  '赤城駒ヶ岳→赤城山（黒檜山）':{minutes:55,source:'YAMAP公開モデル・赤城駒ヶ岳登山口-駒ヶ岳-黒檜山往復（2026-09-05確認）',sourceType:'yamap'},
  '赤城山（黒檜山）→赤城駒ヶ岳':{minutes:45,source:'YAMAP公開モデル・赤城駒ヶ岳登山口-駒ヶ岳-黒檜山往復（2026-09-05確認）',sourceType:'yamap'},
  '赤城駒ヶ岳→おのこ駐車場・駒ヶ岳登山口':{minutes:52,source:'YAMAP公開モデル・赤城駒ヶ岳登山口-駒ヶ岳-黒檜山往復（2026-09-05確認）',sourceType:'yamap'},
  // 笹ヶ峰 下津池モデル: 登山口08:00→丸山荘08:50→笹ヶ峰10:22 / 10:22→丸山荘11:28→登山口12:08.
  '下津池 笹ヶ峰登山口→丸山荘':{minutes:50,source:'YAMAP公開モデル・笹ヶ峰往復（下津池側、2026-09-05確認）',sourceType:'yamap'},
  '丸山荘→笹ヶ峰':{minutes:92,source:'YAMAP公開モデル・笹ヶ峰往復（下津池側、2026-09-05確認）',sourceType:'yamap'},
  '笹ヶ峰→丸山荘':{minutes:66,source:'YAMAP公開モデル・笹ヶ峰往復（下津池側、2026-09-05確認）',sourceType:'yamap'},
  '丸山荘→下津池 笹ヶ峰登山口':{minutes:40,source:'YAMAP公開モデル・笹ヶ峰往復（下津池側、2026-09-05確認）',sourceType:'yamap'},
  // 大崩山 坊主尾根モデル: 登山口06:00→大崩山荘06:35→山頂10:38 / 山頂→山荘13:28→登山口13:58.
  '祝子川 大崩山登山口→大崩山荘':{minutes:35,source:'YAMAP公開モデル・大崩山 坊主尾根コース（2026-09-05確認）',sourceType:'yamap'},
  '大崩山荘→大崩山':{minutes:243,source:'YAMAP公開モデル・大崩山 坊主尾根コース（2026-09-05確認）',sourceType:'yamap'},
  '大崩山→大崩山荘':{minutes:170,source:'YAMAP公開モデル・大崩山 坊主尾根コース（2026-09-05確認）',sourceType:'yamap'},
  '大崩山荘→祝子川 大崩山登山口':{minutes:30,source:'YAMAP公開モデル・大崩山 坊主尾根コース（2026-09-05確認）',sourceType:'yamap'}
});
try{
  if(typeof courseTimeInfo==='function'){
    const old=courseTimeInfo;
    courseTimeInfo=function(a,b){return EXTRA_CT[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||old(a,b);};
  }
  if(typeof directCourseTimeInfoByNames==='function'){
    const oldD=directCourseTimeInfoByNames;
    directCourseTimeInfoByNames=function(a,b){return EXTRA_CT[`${String(a||'').trim()}→${String(b||'').trim()}`]||oldD(a,b);};
  }
}catch(_){ }

const RULES=Object.freeze({
  '筑波山|筑波山神社・御幸ヶ原ルート':Object.freeze([
    {after:'筑波山（女体山）',before:'筑波山神社入口',points:[['peak','筑波山（男体山）','通過ピーク'],['peak','筑波山（女体山）','山頂']],directional:true}
  ]),
  '筑波山|つつじヶ丘登山口ルート':Object.freeze([
    {after:'筑波山（女体山）',before:'つつじヶ丘登山口',points:[['peak','筑波山（男体山）','通過ピーク'],['peak','筑波山（女体山）','山頂']],directional:true}
  ]),
  '石鎚山|土小屋登山口ルート':Object.freeze([
    {after:'石鎚山（弥山）',before:'土小屋登山口',points:[['peak','石鎚山（天狗岳）','通過ピーク'],['peak','石鎚山（弥山）','山頂']],directional:true}
  ]),
  '石鎚山|石鎚ロープウェイ山頂成就駅ルート':Object.freeze([
    {after:'石鎚山（弥山）',before:'石鎚ロープウェイ山頂成就駅',points:[['peak','石鎚山（天狗岳）','通過ピーク'],['peak','石鎚山（弥山）','山頂']],directional:true}
  ]),
  'アサヨ峰|北沢峠ルート':Object.freeze([
    {after:'北沢峠',before:'アサヨ峰',points:[['peak','栗沢山','通過ピーク']]}
  ]),
  '熊伏山|青崩峠入口・熊伏山登山口ルート':Object.freeze([
    {after:'青崩峠入口・熊伏山登山口',before:'熊伏山',points:[['pass','青崩峠','峠']]}
  ]),
  '赤城山（黒檜山）|駒ヶ岳登山口・駒ヶ岳経由ルート':Object.freeze([
    {after:'おのこ駐車場・駒ヶ岳登山口',before:'赤城山（黒檜山）',points:[['peak','赤城駒ヶ岳','通過ピーク']]}
  ]),
  '笹ヶ峰|下津池 笹ヶ峰登山口ルート':Object.freeze([
    {after:'下津池 笹ヶ峰登山口',before:'笹ヶ峰',points:[['hut','丸山荘','山小屋']]}
  ]),
  '大崩山|祝子川 大崩山登山口ルート':Object.freeze([
    {after:'祝子川 大崩山登山口',before:'大崩山',points:[['hut','大崩山荘','山小屋']]}
  ])
});
function rev(points){return [...points].reverse().map(p=>[...p]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const n=out[i+1];if(!n)continue;if(cur[1]===r.after&&n[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(!r.directional&&cur[1]===r.before&&n[1]===r.after)next.push(...rev(r.points));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){const defs=old(mountain,course)||[];let m=String(mountain||'').trim();try{m=canonicalMountainName(m);}catch(_){ }const rules=RULES[`${m}|${course?.label||''}`];return rules?expand(defs,rules):defs;};
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15108=Object.freeze({version:VERSION,phase:'bulk 3-point reduction',routeCount:Object.keys(RULES).length,policy:'public model route order + explicit public coordinates/CT only; no inferred coordinate/CT'});
})();

// Traten V1.5.109: large verified reduction batch for remaining 3-point representative courses.
// Priority: trailhead -> summit -> trailhead elimination. No guessed coordinates or CT.
(function(){'use strict';
const VERSION='1.5.109';
function ensurePoint(mountain,p){
  try{
    if(!BUILTIN_ROUTE_CATALOG[mountain]) BUILTIN_ROUTE_CATALOG[mountain]=[];
    if(!BUILTIN_ROUTE_CATALOG[mountain].some(x=>x&&x.name===p.name)) BUILTIN_ROUTE_CATALOG[mountain].push(Object.freeze(p));
  }catch(_){ }
}
// Published fixed coordinates only.
ensurePoint('一切経山',{id:'v15109-sugadaira',type:'hut',name:'酸ヶ平避難小屋',lat:37.7267778,lon:140.2413056,elevation:1768,source:'福島県管理施設 / TREK station 公開座標'});
ensurePoint('磐梯山',{id:'v15109-akahani',type:'peak',name:'赤埴山',lat:37.595411,lon:140.087117,elevation:1430,source:'公開GPS座標・赤埴山'});
ensurePoint('蔵王山（熊野岳）',{id:'v15109-zao-jizo',type:'peak',name:'地蔵岳（蔵王）',lat:38.151838,lon:140.432163,elevation:1736,source:'公開山頂座標・地蔵岳'});
ensurePoint('巻機山',{id:'v15109-maemakihata',type:'peak',name:'前巻機',lat:36.9719444444,lon:138.9600000000,elevation:1861,source:'国土地理院・前巻機'});

const EXTRA_CT=Object.freeze({
  // Environment Ministry official model: 浄土平40→酸ヶ平避難小屋40→一切経山. Descent remains existing verified aggregate CT.
  '浄土平→酸ヶ平避難小屋':{minutes:40,source:'環境省・磐梯朝日国立公園 一切経山トレッキング',sourceType:'official'},
  '酸ヶ平避難小屋→一切経山':{minutes:40,source:'環境省・磐梯朝日国立公園 一切経山トレッキング',sourceType:'official'},
  // YAMAP public model 猪苗代登山口→赤埴山→磐梯山. Return does not re-climb 赤埴山, so outbound only.
  '猪苗代登山口（猪苗代スキー場）→赤埴山':{minutes:135,source:'YAMAP公開モデル・猪苗代登山口-赤埴山-磐梯山往復（07:00→09:15）',sourceType:'yamap'},
  '赤埴山→磐梯山':{minutes:143,source:'YAMAP公開モデル・猪苗代登山口-赤埴山-磐梯山往復（09:15→11:38）',sourceType:'yamap'},
  // YAMAP public model: 熊野岳09:10→地蔵岳09:43→地蔵山頂駅09:45.
  '蔵王山（熊野岳）→地蔵岳（蔵王）':{minutes:33,source:'YAMAP公開モデル・地蔵山頂駅-蔵王山往復',sourceType:'yamap'},
  '地蔵岳（蔵王）→蔵王ロープウェイ地蔵山頂駅':{minutes:2,source:'YAMAP公開モデル・地蔵山頂駅-蔵王山往復（09:43→09:45）',sourceType:'yamap'},
  // YAMAP public model 巻機山登山口06:05→前巻機09:36→巻機山10:41 / summit10:41→前巻機12:01→登山口13:59.
  '桜坂登山口→前巻機':{minutes:211,source:'YAMAP公開モデル・巻機山登山口-前巻機-巻機山往復（06:05→09:36）',sourceType:'yamap'},
  '前巻機→巻機山':{minutes:65,source:'YAMAP公開モデル・巻機山登山口-前巻機-巻機山往復（09:36→10:41）',sourceType:'yamap'},
  '巻機山→前巻機':{minutes:80,source:'YAMAP公開モデル・巻機山登山口-前巻機-巻機山往復（10:41→12:01）',sourceType:'yamap'},
  '前巻機→桜坂登山口':{minutes:118,source:'YAMAP公開モデル・巻機山登山口-前巻機-巻機山往復（12:01→13:59）',sourceType:'yamap'},
  // YAMAP public model 伊奈川ダム駐車場→越百避難小屋→越百山. App start is the existing fixed 伊奈川ダム上登山口 used by the same model total.
  '伊奈川ダム上登山口→越百小屋・越百避難小屋':{minutes:352,source:'YAMAP公開モデル・伊奈川ダム登山口-越百山往復（04:53→10:45から既存起点定義に合わせた区間）',sourceType:'yamap'},
  '越百小屋・越百避難小屋→越百山':{minutes:45,source:'YAMAP公開モデル・伊奈川ダム登山口-越百山往復（10:45→11:30）',sourceType:'yamap'},
  '越百山→越百小屋・越百避難小屋':{minutes:45,source:'YAMAP公開モデル・伊奈川ダム登山口-越百山往復（11:30→12:15）',sourceType:'yamap'},
  '越百小屋・越百避難小屋→伊奈川ダム上登山口':{minutes:217,source:'YAMAP公開モデル・伊奈川ダム登山口-越百山往復（12:15→15:52）',sourceType:'yamap'},
  // YAMAP public model passes the summit shelter immediately after/before 米山 summit.
  '米山→米山山頂避難小屋':{minutes:1,source:'YAMAP公開モデル・米山 大平ルート（山頂→山頂避難小屋）',sourceType:'yamap'},
  '米山山頂避難小屋→米山':{minutes:1,source:'YAMAP公開モデル・米山 大平ルート（山頂避難小屋→山頂）',sourceType:'yamap'},
  // YAMAP public model 清浄大橋側: 大峯山寺 is immediately below 山上ヶ岳 summit.
  '清浄大橋 大峯山登山口→大峯山寺宿坊':{minutes:155,source:'YAMAP公開モデル・清浄大橋側 山上ヶ岳往復（08:00→10:35 大峰山寺）',sourceType:'yamap'},
  '大峯山寺宿坊→山上ヶ岳':{minutes:4,source:'YAMAP公開モデル・大峰山寺→山上ヶ岳（10:35→10:39）',sourceType:'yamap'},
  '山上ヶ岳→大峯山寺宿坊':{minutes:10,source:'YAMAP公開モデル・山上ヶ岳→大峰山寺（10:39→10:49）',sourceType:'yamap'},
  '大峯山寺宿坊→清浄大橋 大峯山登山口':{minutes:114,source:'YAMAP公開モデル・大峰山寺→清浄大橋側起点（10:49→12:43）',sourceType:'yamap'}
});
try{
  if(typeof courseTimeInfo==='function'){
    const old=courseTimeInfo;
    courseTimeInfo=function(a,b){return EXTRA_CT[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||old(a,b);};
  }
  if(typeof directCourseTimeInfoByNames==='function'){
    const oldD=directCourseTimeInfoByNames;
    directCourseTimeInfoByNames=function(a,b){return EXTRA_CT[`${String(a||'').trim()}→${String(b||'').trim()}`]||oldD(a,b);};
  }
}catch(_){ }

const RULES=Object.freeze({
  '一切経山|浄土平ルート':Object.freeze([
    {after:'浄土平',before:'一切経山',points:[['hut','酸ヶ平避難小屋','避難小屋']],directional:true}
  ]),
  '磐梯山|猪苗代ルート':Object.freeze([
    {after:'猪苗代登山口（猪苗代スキー場）',before:'磐梯山',points:[['peak','赤埴山','通過ピーク']],directional:true}
  ]),
  '蔵王山（熊野岳）|蔵王ロープウェイ地蔵山頂駅ルート':Object.freeze([
    {after:'蔵王山（熊野岳）',before:'蔵王ロープウェイ地蔵山頂駅',points:[['peak','地蔵岳（蔵王）','通過ピーク']],directional:true}
  ]),
  '巻機山|桜坂ルート':Object.freeze([
    {after:'桜坂登山口',before:'巻機山',points:[['peak','前巻機','通過ピーク']]}
  ]),
  '越百山|伊奈川ダム上登山口ルート':Object.freeze([
    {after:'伊奈川ダム上登山口',before:'越百山',points:[['hut','越百小屋・越百避難小屋','山小屋']]}
  ]),
  '米山|大平ルート':Object.freeze([
    {after:'米山',before:'大平登山口',points:[['hut','米山山頂避難小屋','避難小屋'],['peak','米山','山頂']],directional:true}
  ]),
  '山上ヶ岳|清浄大橋 大峯山登山口ルート':Object.freeze([
    {after:'清浄大橋 大峯山登山口',before:'山上ヶ岳',points:[['hut','大峯山寺宿坊','山小屋']]}
  ])
});
function rev(points){return [...points].reverse().map(p=>[...p]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const n=out[i+1];if(!n)continue;if(cur[1]===r.after&&n[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(!r.directional&&cur[1]===r.before&&n[1]===r.after)next.push(...rev(r.points));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){const defs=old(mountain,course)||[];let m=String(mountain||'').trim();try{m=canonicalMountainName(m);}catch(_){ }const rules=RULES[`${m}|${course?.label||''}`];return rules?expand(defs,rules):defs;};
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15109=Object.freeze({version:VERSION,phase:'large 3-point route reduction',routeCount:Object.keys(RULES).length,policy:'official/public model route order + explicit published coordinates/CT only; no inferred coordinates/CT'});
})();

// Traten V1.5.122: verified 3-point representative-route reduction batch.
// Uses only existing fixed points and existing non-estimated CT in the current data.
(function(){'use strict';
const VERSION='1.5.122';
const RULES=Object.freeze({
  '御嶽山|田の原登山口ルート':Object.freeze([
    {after:'田の原登山口',before:'御嶽山（剣ヶ峰）',points:[['hut','二の池ヒュッテ','山小屋']],directional:true}
  ]),
  '西穂高岳|新穂高ロープウェイ・西穂山荘ルート':Object.freeze([
    {after:'新穂高ロープウェイ 西穂高口駅',before:'西穂高岳',points:[['hut','西穂山荘','山小屋']],directional:true}
  ]),
  '西穂高岳|上高地ルート':Object.freeze([
    {after:'上高地',before:'西穂高岳',points:[['hut','西穂山荘','山小屋']],directional:true}
  ]),
  '横岳（八ヶ岳）|美濃戸口ルート':Object.freeze([
    {after:'美濃戸口',before:'横岳（八ヶ岳）',points:[['hut','赤岳鉱泉','山小屋']],directional:true}
  ]),
  '硫黄岳（八ヶ岳）|美濃戸口ルート':Object.freeze([
    {after:'美濃戸口',before:'硫黄岳（八ヶ岳）',points:[['hut','赤岳鉱泉','山小屋']],directional:true}
  ]),
  '阿弥陀岳|美濃戸口ルート':Object.freeze([
    {after:'美濃戸口',before:'阿弥陀岳',points:[['hut','行者小屋','山小屋']],directional:true}
  ])
});
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const n=out[i+1];if(!n)continue;if(cur[1]===r.after&&n[1]===r.before)next.push(...r.points.map(p=>[...p]));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){const defs=old(mountain,course)||[];let m=String(mountain||'').trim();try{m=canonicalMountainName(m);}catch(_){ }const rules=RULES[`${m}|${course?.label||''}`];return rules?expand(defs,rules):defs;};
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15122=Object.freeze({version:VERSION,routeCount:Object.keys(RULES).length,policy:'existing fixed points + existing verified CT only; no guessed coordinate/CT'});
})();

// Traten V1.5.124: continued verified reduction of 3-point representative courses.
// Mix of existing fixed/verified route points and newly verified public model-course points.
(function(){'use strict';
const VERSION='1.5.124';
function ensurePoint(mountain,p){
  try{
    if(!BUILTIN_ROUTE_CATALOG[mountain]) BUILTIN_ROUTE_CATALOG[mountain]=[];
    if(!BUILTIN_ROUTE_CATALOG[mountain].some(x=>x&&x.name===p.name)) BUILTIN_ROUTE_CATALOG[mountain].push(Object.freeze(p));
  }catch(_){ }
}
// Published coordinates only. No interpolated route geometry.
ensurePoint('天城山（万三郎岳）',{id:'v15124-banjiro',type:'peak',name:'万二郎岳（天城山）',lat:34.86003,lon:139.02072,elevation:1295,source:'OpenStreetMap/Mapcarta published coordinate; YAMAP elevation'});
ensurePoint('高千穂峰',{id:'v15124-ohachi',type:'peak',name:'御鉢',lat:31.885452,lon:130.909808,elevation:1408,source:'Outdooractive published coordinate / public summit data'});
ensurePoint('羅臼岳',{id:'v15124-rausudaira',type:'pass',name:'羅臼平',lat:44.08175,lon:145.12853,elevation:1345,source:'既存V1.5.80公開地形・位置情報照合; Wikimedia/SummitPost公開位置で再確認'});
ensurePoint('越後駒ヶ岳',{id:'v15124-echigokoma-ogura',type:'peak',name:'小倉山',lat:37.080611,lon:139.055150,elevation:1378,source:'既存V1.5.81 国土地理院三角点公開値'});
ensurePoint('平ヶ岳',{id:'v15124-hiragatake-shimodaikura',type:'peak',name:'下台倉山',lat:37.014416,lon:139.131927,elevation:1610,source:'既存V1.5.81 国土地理院地形・公開標高座標'});
ensurePoint('平ヶ岳',{id:'v15124-hiragatake-daikura',type:'peak',name:'台倉山',lat:37.010678,lon:139.130567,elevation:1695,source:'既存V1.5.81 国土地理院三角点公開値'});
ensurePoint('平ヶ岳',{id:'v15124-hiragatake-ikenodake',type:'peak',name:'池ノ岳',lat:37.003868,lon:139.103973,elevation:2080,source:'既存V1.5.81 国土地理院地形・公開標高座標'});
ensurePoint('後方羊蹄山',{id:'v15124-yotei-makkari',type:'peak',name:'真狩岳',lat:42.828233,lon:140.811180,elevation:1893,source:'既存V1.5.81 国土地理院一等三角点・真狩岳公開値'});
ensurePoint('武尊山',{id:'v15124-hotaka-maehotaka',type:'peak',name:'前武尊',lat:36.789940,lon:139.146280,elevation:2040,source:'既存V1.5.81 公開地形座標・前武尊'});
ensurePoint('両神山',{id:'v15124-ryokami-kiyotaki',type:'hut',name:'清滝避難小屋',lat:36.021111,lon:138.850833,elevation:1290,source:'既存V1.5.81 清滝避難小屋公開位置情報'});
ensurePoint('西吾妻山',{id:'v15124-nishiazuma-nishidaiten',type:'peak',name:'西大巓',lat:37.7338,lon:140.1275,elevation:1982,source:'既存V1.5.82 公開地形座標・西大巓'});
ensurePoint('荒島岳',{id:'v15124-arashima-shakunage',type:'pass',name:'シャクナゲ平',lat:35.9506,lon:136.5967,elevation:1204,source:'既存V1.5.82 公開登山地図・シャクナゲ平'});
ensurePoint('磐梯山',{id:'v15124-bandai-koboshimizu',type:'waypoint',name:'弘法清水小屋',lat:37.60495,lon:140.07195,elevation:1630,source:'既存V1.5.84 磐梯山公式登山マップ・弘法清水小屋位置'});
ensurePoint('雨飾山',{id:'v15124-amakazari-arasugesawa',type:'waypoint',name:'荒菅沢',lat:36.8924,lon:137.9707,elevation:1448,source:'既存V1.5.84 環境省公開ルート図・雨飾山 荒菅沢'});
ensurePoint('男体山',{id:'v15124-nantai-takino8',type:'waypoint',name:'八合目 瀧尾神社',lat:36.7579,lon:139.4896,elevation:2200,source:'既存V1.5.84 YAMAP公開モデル・男体山 八合目 瀧尾神社'});



const EXTRA_CT=Object.freeze({
  // YAMAP model: 天城高原駐車場08:00 -> 万二郎岳09:21 -> 万三郎岳10:36,
  // return 万三郎岳11:11 -> 万二郎岳12:01 -> 駐車場13:12.
  '天城高原ハイカー専用駐車場→万二郎岳（天城山）':{minutes:81,source:'YAMAP公開モデル・天城縦走登山口-万二郎岳-石楠立-万三郎岳往復（2026-09-05確認）',sourceType:'yamap'},
  '万二郎岳（天城山）→天城山（万三郎岳）':{minutes:75,source:'YAMAP公開モデル・万二郎岳09:21→万三郎岳10:36（2026-09-05確認）',sourceType:'yamap'},
  '天城山（万三郎岳）→万二郎岳（天城山）':{minutes:50,source:'YAMAP公開モデル・万三郎岳11:11→万二郎岳12:01（2026-09-05確認）',sourceType:'yamap'},
  '万二郎岳（天城山）→天城高原ハイカー専用駐車場':{minutes:71,source:'YAMAP公開モデル・万二郎岳12:01→天城高原駐車場13:12（2026-09-05確認）',sourceType:'yamap'},
  // YAMAP model: 高千穂河原駐車場08:00 -> 御鉢10:03 -> 高千穂峰10:38,
  // return 高千穂峰12:30 -> 御鉢13:25 -> 駐車場13:43.
  '高千穂河原駐車場・高千穂峰登山口→御鉢':{minutes:123,source:'YAMAP公開モデル・高千穂河原-御鉢-高千穂峰（2026-09-05確認）',sourceType:'yamap'},
  '御鉢→高千穂峰':{minutes:35,source:'YAMAP公開モデル・御鉢10:03→高千穂峰10:38（2026-09-05確認）',sourceType:'yamap'},
  '高千穂峰→御鉢':{minutes:55,source:'YAMAP公開モデル・高千穂峰12:30→御鉢13:25（2026-09-05確認）',sourceType:'yamap'},
  '御鉢→高千穂河原駐車場・高千穂峰登山口':{minutes:18,source:'YAMAP公開モデル・御鉢13:25→高千穂河原駐車場13:43（2026-09-05確認）',sourceType:'yamap'},
  '枝折峠→小倉山':{minutes:140,source:'既存V1.5.81 公開標準コース・明神峠/道行山経由区間合算',sourceType:'other'},
  '小倉山→越後駒ヶ岳':{minutes:140,source:'既存V1.5.81 公開標準コース・百草ノ池/駒の小屋経由区間合算',sourceType:'other'},
  '越後駒ヶ岳→小倉山':{minutes:100,source:'既存V1.5.81 公開標準コース',sourceType:'other'},
  '小倉山→枝折峠':{minutes:130,source:'既存V1.5.81 公開標準コース',sourceType:'other'},
  '鷹ノ巣・平ヶ岳登山口→下台倉山':{minutes:179,source:'既存V1.5.81 ヤマレコ公開山行計画 p5602548',sourceType:'yamareco'},
  '下台倉山→台倉山':{minutes:49,source:'既存V1.5.81 ヤマレコ公開山行計画 p5602548',sourceType:'yamareco'},
  '台倉山→池ノ岳':{minutes:148,source:'既存V1.5.81 ヤマレコ公開山行計画 p5602548',sourceType:'yamareco'},
  '池ノ岳→平ヶ岳':{minutes:34,source:'既存V1.5.81 ヤマレコ公開山行計画 p5602548',sourceType:'yamareco'},
  '平ヶ岳→池ノ岳':{minutes:29,source:'既存V1.5.81 ヤマレコ公開山行計画 p5602548',sourceType:'yamareco'},
  '池ノ岳→台倉山':{minutes:108,source:'既存V1.5.81 ヤマレコ公開山行計画 p5602548',sourceType:'yamareco'},
  '台倉山→下台倉山':{minutes:39,source:'既存V1.5.81 ヤマレコ公開山行計画 p5602548',sourceType:'yamareco'},
  '下台倉山→鷹ノ巣・平ヶ岳登山口':{minutes:104,source:'既存V1.5.81 ヤマレコ公開山行計画 p5602548',sourceType:'yamareco'},
  '京極登山口→真狩岳':{minutes:287,source:'既存V1.5.81 YAMAP標準モデル・京極コース',sourceType:'yamap'},
  '真狩岳→後方羊蹄山（羊蹄山）':{minutes:10,source:'既存V1.5.81 YAMAP標準モデル・京極コース',sourceType:'yamap'},
  '後方羊蹄山（羊蹄山）→真狩岳':{minutes:2,source:'既存V1.5.81 YAMAP標準モデル・京極コース',sourceType:'yamap'},
  '真狩岳→京極登山口':{minutes:195,source:'既存V1.5.81 YAMAP標準モデル・京極コース',sourceType:'yamap'},
  '川場谷野営場登山口→前武尊':{minutes:225,source:'既存V1.5.81 YAMAP標準モデル・川場谷野営場ルート',sourceType:'yamap'},
  '前武尊→武尊山':{minutes:85,source:'既存V1.5.81 YAMAP標準モデル',sourceType:'yamap'},
  '武尊山→前武尊':{minutes:100,source:'既存V1.5.81 YAMAP標準モデル',sourceType:'yamap'},
  '前武尊→川場谷野営場登山口':{minutes:75,source:'既存V1.5.81 YAMAP標準モデル',sourceType:'yamap'},
  '日向大谷口→清滝避難小屋':{minutes:125,source:'既存V1.5.81 公開標準コース',sourceType:'other'},
  '清滝避難小屋→両神山':{minutes:80,source:'既存V1.5.81 公開標準コース',sourceType:'other'},
  '両神山→清滝避難小屋':{minutes:55,source:'既存V1.5.81 公開標準コース',sourceType:'other'},
  '清滝避難小屋→日向大谷口':{minutes:100,source:'既存V1.5.81 公開標準コース',sourceType:'other'},
  '白布峠登山口→西大巓':{minutes:185,source:'既存V1.5.82 YAMAP白布峠往復モデル',sourceType:'yamap'},
  '西大巓→西吾妻山':{minutes:66,source:'既存V1.5.82 YAMAP白布峠往復モデル',sourceType:'yamap'},
  '西吾妻山→西大巓':{minutes:140,source:'既存V1.5.82 YAMAP白布峠往復モデル',sourceType:'yamap'},
  '西大巓→白布峠登山口':{minutes:60,source:'既存V1.5.82 YAMAP白布峠往復モデル',sourceType:'yamap'},
  '勝原コース登山口→シャクナゲ平':{minutes:165,source:'既存V1.5.82 YAMAP勝原モデル',sourceType:'yamap'},
  'シャクナゲ平→荒島岳':{minutes:83,source:'既存V1.5.82 YAMAP勝原モデル',sourceType:'yamap'},
  '荒島岳→シャクナゲ平':{minutes:61,source:'既存V1.5.82 YAMAP勝原モデル',sourceType:'yamap'},
  'シャクナゲ平→勝原コース登山口':{minutes:159,source:'既存V1.5.82 YAMAP勝原モデル',sourceType:'yamap'},
  '八方台登山口→弘法清水小屋':{minutes:105,source:'既存V1.5.84 猪苗代観光協会公式・磐梯山登山マップ',sourceType:'official'},
  '弘法清水小屋→磐梯山':{minutes:30,source:'既存V1.5.84 猪苗代観光協会公式・磐梯山登山マップ',sourceType:'official'},
  '磐梯山→弘法清水小屋':{minutes:20,source:'既存V1.5.84 猪苗代観光協会公式・磐梯山登山マップ',sourceType:'official'},
  '弘法清水小屋→八方台登山口':{minutes:80,source:'既存V1.5.84 猪苗代観光協会公式・磐梯山登山マップ',sourceType:'official'},
  '雨飾高原キャンプ場登山口→荒菅沢':{minutes:110,source:'既存V1.5.84 環境省・妙高戸隠連山国立公園 雨飾山',sourceType:'official'},
  '荒菅沢→雨飾山':{minutes:130,source:'既存V1.5.84 確認済み総CTと環境省公式区間からの差分',sourceType:'derived-verified'},
  '雨飾山→荒菅沢':{minutes:90,source:'既存V1.5.84 確認済み総CTと環境省公式区間からの差分',sourceType:'derived-verified'},
  '荒菅沢→雨飾高原キャンプ場登山口':{minutes:95,source:'既存V1.5.84 環境省・妙高戸隠連山国立公園 雨飾山',sourceType:'official'},
  '二荒山神社中宮祠登山口→八合目 瀧尾神社':{minutes:175,source:'既存V1.5.84 YAMAP公開モデル・二荒山神社-男体山往復',sourceType:'yamap'},
  '八合目 瀧尾神社→男体山':{minutes:62,source:'既存V1.5.84 YAMAP公開モデル・男体山',sourceType:'yamap'},
  '男体山→八合目 瀧尾神社':{minutes:37,source:'既存V1.5.84 YAMAP公開モデル・男体山',sourceType:'yamap'},
  '八合目 瀧尾神社→二荒山神社中宮祠登山口':{minutes:130,source:'既存V1.5.84 YAMAP公開モデル・男体山',sourceType:'yamap'}
});
try{
  if(typeof courseTimeInfo==='function'){
    const old=courseTimeInfo;
    courseTimeInfo=function(a,b){return EXTRA_CT[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||old(a,b);};
  }
  if(typeof directCourseTimeInfoByNames==='function'){
    const oldD=directCourseTimeInfoByNames;
    directCourseTimeInfoByNames=function(a,b){return EXTRA_CT[`${String(a||'').trim()}→${String(b||'').trim()}`]||oldD(a,b);};
  }
}catch(_){ }

const RULES=Object.freeze({
  '羅臼岳|岩尾別温泉・木下小屋登山口ルート':Object.freeze([
    {after:'岩尾別温泉・木下小屋登山口',before:'羅臼岳',points:[['pass','羅臼平','峠・分岐']]}
  ]),
  '羅臼岳|羅臼温泉登山口ルート':Object.freeze([
    {after:'羅臼温泉登山口',before:'羅臼岳',points:[['pass','羅臼平','峠・分岐']]}
  ]),
  '越後駒ヶ岳|枝折峠ルート':Object.freeze([
    {after:'枝折峠',before:'越後駒ヶ岳',points:[['peak','小倉山','中間ピーク']]}
  ]),
  '平ヶ岳|鷹ノ巣・平ヶ岳ルート':Object.freeze([
    {after:'鷹ノ巣・平ヶ岳登山口',before:'平ヶ岳',points:[['peak','下台倉山','通過ピーク'],['peak','台倉山','通過ピーク'],['peak','池ノ岳','湿原手前']]}
  ]),
  '後方羊蹄山|京極登山口ルート':Object.freeze([
    {after:'京極登山口',before:'後方羊蹄山（羊蹄山）',points:[['peak','真狩岳','外輪山']]}
  ]),
  '武尊山|川場谷野営場ルート':Object.freeze([
    {after:'川場谷野営場登山口',before:'武尊山',points:[['peak','前武尊','通過ピーク']]}
  ]),
  '両神山|日向大谷口ルート':Object.freeze([
    {after:'日向大谷口',before:'両神山',points:[['hut','清滝避難小屋','避難小屋']]}
  ]),
  '西吾妻山|白布峠登山口ルート':Object.freeze([
    {after:'白布峠登山口',before:'西吾妻山',points:[['peak','西大巓','通過ピーク']]}
  ]),
  '荒島岳|勝原コースルート':Object.freeze([
    {after:'勝原コース登山口',before:'荒島岳',points:[['pass','シャクナゲ平','主要分岐']]}
  ]),
  '磐梯山|八方台登山口ルート':Object.freeze([
    {after:'八方台登山口',before:'磐梯山',points:[['waypoint','弘法清水小屋','山小屋']]}
  ]),
  '雨飾山|雨飾高原キャンプ場ルート':Object.freeze([
    {after:'雨飾高原キャンプ場登山口',before:'雨飾山',points:[['waypoint','荒菅沢','通過ポイント']]}
  ]),
  '男体山|二荒山神社中宮祠ルート':Object.freeze([
    {after:'二荒山神社中宮祠登山口',before:'男体山',points:[['waypoint','八合目 瀧尾神社','通過ポイント']]}
  ]),
  '天城山（万三郎岳）|天城高原ハイカー専用駐車場ルート':Object.freeze([
    {after:'天城高原ハイカー専用駐車場',before:'天城山（万三郎岳）',points:[['peak','万二郎岳（天城山）','通過ピーク']]}
  ]),
  '高千穂峰|高千穂河原駐車場・高千穂峰登山口ルート':Object.freeze([
    {after:'高千穂河原駐車場・高千穂峰登山口',before:'高千穂峰',points:[['peak','御鉢','通過ピーク']]}
  ])
});
function rev(points){return [...points].reverse().map(p=>[...p]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const n=out[i+1];if(!n)continue;if(cur[1]===r.after&&n[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(cur[1]===r.before&&n[1]===r.after)next.push(...rev(r.points));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){const defs=old(mountain,course)||[];let m=String(mountain||'').trim();try{m=canonicalMountainName(m);}catch(_){ }const rules=RULES[`${m}|${course?.label||''}`];return rules?expand(defs,rules):defs;};
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15124=Object.freeze({version:VERSION,routeCount:Object.keys(RULES).length,policy:'verified public route order/CT + published coordinates; no guessed coordinate/CT'});
})();

// Traten V1.5.125: large verified one-hop reduction of remaining 3-point representative courses.
// Reuses fixed points and directional CT already shipped in the V1.5.80/85/88/90/91 route-enrichment data.
// No new coordinates or CT estimates are introduced here.
(function(){'use strict';
const VERSION='1.5.125';
const RULES=Object.freeze({
  '利尻山|利尻北麓野営場（鴛泊コース）ルート':Object.freeze([{after:'利尻北麓野営場（鴛泊コース）',before:'利尻山',points:[['peak','長官山','通過ピーク']]}]),
  '斜里岳|清岳荘登山口ルート':Object.freeze([{after:'清岳荘登山口',before:'斜里岳',points:[['pass','上二股','主要分岐']]}]),
  '八甲田山|八甲田ロープウェー山頂公園駅ルート':Object.freeze([{after:'八甲田ロープウェー山頂公園駅',before:'八甲田山（大岳）',points:[['hut','大岳避難小屋（八甲田）','避難小屋']]}]),
  '岩木山|岩木山八合目ルート':Object.freeze([{after:'岩木山八合目',before:'岩木山',points:[['hut','鳳鳴ヒュッテ','避難小屋']]}]),
  '月山|姥沢 月山リフトルート':Object.freeze([{after:'姥沢 月山リフト',before:'月山',points:[['pass','牛首（月山）','主要分岐']]}]),
  '安達太良山|奥岳・あだたら山ロープウェイルート':Object.freeze([{after:'奥岳登山口・あだたら山ロープウェイ',before:'安達太良山',points:[['peak','薬師岳（安達太良）','通過ピーク']]}]),
  '茶臼岳（那須岳）|峠の茶屋・茶臼岳ルート':Object.freeze([{after:'峠の茶屋・那須岳登山口',before:'茶臼岳（那須岳）',points:[['hut','峰の茶屋跡避難小屋','避難小屋']]}]),
  '四阿山|菅平牧場ルート':Object.freeze([{after:'菅平牧場登山口',before:'四阿山',points:[['peak','中四阿','通過ピーク']]}]),
  '伊吹山|伊吹山ドライブウェイ山頂駐車場ルート':Object.freeze([{after:'伊吹山ドライブウェイ山頂駐車場',before:'伊吹山',points:[['pass','西登山道中間分岐（伊吹山）','主要分岐']]}]),
  '武奈ヶ岳|坊村 武奈ヶ岳登山口ルート':Object.freeze([{after:'坊村 武奈ヶ岳登山口',before:'武奈ヶ岳',points:[['peak','御殿山（武奈ヶ岳）','通過ピーク']]}]),
  '東赤石山|瀬場登山口 東赤石山ルート':Object.freeze([{after:'瀬場登山口 東赤石山',before:'東赤石山',points:[['hut','赤石山荘','山小屋']]}]),
  '市房山|市房山キャンプ場（市房山登山口アクセス起点）ルート':Object.freeze([{after:'市房山キャンプ場（市房山登山口アクセス起点）',before:'市房山',points:[['hut','市房神社','神社・避難地点']]}])
});
function rev(points){return [...points].reverse().map(p=>[...p]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const n=out[i+1];if(!n)continue;if(cur[1]===r.after&&n[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(cur[1]===r.before&&n[1]===r.after)next.push(...rev(r.points));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){const defs=old(mountain,course)||[];let m=String(mountain||'').trim();try{m=canonicalMountainName(m);}catch(_){ }const rules=RULES[`${m}|${course?.label||''}`];return rules?expand(defs,rules):defs;};
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15125=Object.freeze({version:VERSION,routeCount:Object.keys(RULES).length,policy:'reuse existing verified fixed points + existing directional CT only; no guessed coordinate/CT'});
})();



// Traten V1.5.127: continue large-batch reduction of 3-point representative courses.
// Route order is verified from public model routes. Six Rokko points are inserted on ascent only
// because the current return leg intentionally keeps its existing confirmed whole-leg CT.
(function(){'use strict';
const VERSION='1.5.127';
const RULES_BIDIR=Object.freeze({
  '茶臼岳（那須岳）|那須ロープウェイ・峠の茶屋側ルート':Object.freeze([{after:'那須ロープウェイ・峠の茶屋側',before:'茶臼岳（那須岳）',points:[['hut','峰の茶屋跡避難小屋','避難小屋']]}]),
  '荒島岳|中出コースルート':Object.freeze([{after:'中出コース登山口',before:'荒島岳',points:[['pass','シャクナゲ平','主要分岐']]}])
});
const RULES_FORWARD=Object.freeze({
  '六甲山|芦屋川 高座の滝ルート':Object.freeze([{after:'芦屋川 高座の滝',before:'六甲山',points:[['pass','風吹岩','主要通過点'],['pass','雨ヶ峠','主要通過点'],['pass','一軒茶屋','主要通過点']]}])
});
function rev(points){return [...points].reverse().map(p=>[...p]);}
function expand(defs,rules,bidir){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const n=out[i+1];if(!n)continue;if(cur[1]===r.after&&n[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(bidir&&cur[1]===r.before&&n[1]===r.after)next.push(...rev(r.points));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){const defs=old(mountain,course)||[];let m=String(mountain||'').trim();try{m=canonicalMountainName(m);}catch(_){ }const k=`${m}|${course?.label||''}`;let out=defs;const b=RULES_BIDIR[k];if(b)out=expand(out,b,true);const f=RULES_FORWARD[k];if(f)out=expand(out,f,false);return out;};
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){ }
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15127=Object.freeze({version:VERSION,routeCount:3,policy:'verified public route order/CT; no guessed coordinate/CT; Rokko ascent-only split preserves existing confirmed return leg'});
})();

// Traten V1.5.128: continue 3-point reduction with two route-verified fixed waypoints.
(function(){'use strict';
const VERSION='1.5.128';
function addFixed(mountain,point){
  try{
    const k=canonicalMountainName(mountain);
    const arr=BUILTIN_ROUTE_CATALOG[k];
    if(Array.isArray(arr)&&!arr.some(p=>p?.id===point.id||String(p?.name||'')===point.name))arr.push(Object.freeze(point));
  }catch(_){}
}
addFixed('三ッ峠山',{id:'v15128-mitsutoge-shikirakuen',type:'hut',name:'四季楽園',lat:35.549444,lon:138.806944,elevation:1727,source:'PORTALFIELD/mikketa公開位置（北緯35°32′58″ 東経138°48′25″）'});
addFixed('武奈ヶ岳',{id:'v15128-buna-kanakuso',type:'pass',name:'金糞峠',lat:35.1452,lon:135.5424,elevation:878,source:'公開登山記録GPS表（35.1452,135.5424 / 標高校正878m）'});
const RULES=Object.freeze({
  '三ッ峠山|三ツ峠登山口ルート':Object.freeze([{after:'三ツ峠登山口',before:'三ッ峠山',points:[['hut','四季楽園','山小屋']]}]),
  '武奈ヶ岳|イン谷口ルート':Object.freeze([{after:'イン谷口',before:'武奈ヶ岳',points:[['pass','金糞峠','峠・分岐']]}])
});
function rev(points){return [...points].reverse().map(p=>[...p]);}
function expand(defs,rules){let out=defs.map(p=>[...p]);for(const r of rules){const next=[];for(let i=0;i<out.length;i++){const cur=out[i];next.push(cur);const n=out[i+1];if(!n)continue;if(cur[1]===r.after&&n[1]===r.before)next.push(...r.points.map(p=>[...p]));else if(cur[1]===r.before&&n[1]===r.after)next.push(...rev(r.points));}out=next;}return out;}
if(typeof representativeCourseExpandedPointDefs==='function'){
  const old=representativeCourseExpandedPointDefs;
  representativeCourseExpandedPointDefs=function(mountain,course){const defs=old(mountain,course)||[];let m=String(mountain||'').trim();try{m=canonicalMountainName(m);}catch(_){}const rules=RULES[`${m}|${course?.label||''}`];return rules?expand(defs,rules):defs;};
}
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){}
window.TRATEN_REPRESENTATIVE_ENRICHMENT_V15128=Object.freeze({version:VERSION,routeCount:2,policy:'verified public route order + published coordinates + published directional CT; no guessed coordinate/CT'});
})();
