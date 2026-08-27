// V1.4.225: verified fixed live-camera catalog expanded nationwide (mountains + trailheads + access roads).
// Only public/official camera pages whose existence was verified are registered here.
window.TRATEN_CAMERA_DATA = Object.freeze([

  {
    id:'kongo-summit', area:'近畿', mountains:['金剛山'],
    title:'金剛山 山頂ライブカメラ', type:'weather', provider:'千早赤阪村観光協会',
    url:'https://www.chihayaakasaka.org/info/live.html',
    note:'金剛山頂の現地映像。積雪・霧・視界の確認に。観光協会ページ内の山頂カメラ。', verified:'2026-08-27', official:true
  },
  {
    id:'kongo-trailhead', area:'近畿', mountains:['金剛山'],
    title:'金剛山 登山口ライブカメラ', type:'road', provider:'千早赤阪村観光協会',
    url:'https://www.chihayaakasaka.org/info/live.html',
    note:'千早側の金剛山登山口周辺。登山口・道路状況の確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'senjojiki-cirque', area:'中央アルプス', mountains:['木曽駒ヶ岳','宝剣岳'],
    title:'千畳敷カール側ライブカメラ', type:'weather', provider:'中央アルプス駒ヶ岳ロープウェイ',
    url:'https://www.chuo-alps.com/live/',
    note:'標高2,612mの千畳敷。木曽駒ヶ岳・宝剣岳方面の雲・積雪・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'senjojiki-southalps', area:'中央アルプス', mountains:['木曽駒ヶ岳','宝剣岳'],
    title:'千畳敷 南アルプス側ライブカメラ', type:'weather', provider:'中央アルプス駒ヶ岳ロープウェイ',
    url:'https://www.chuo-alps.com/live/',
    note:'千畳敷から南アルプス側。広域の雲量・視程確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'yari-sanso', area:'北アルプス', mountains:['槍ヶ岳'],
    title:'槍ヶ岳山荘ライブカメラ', type:'hut', provider:'槍ヶ岳山荘グループ',
    url:'https://www.yarigatake.co.jp/livecamera/',
    note:'槍ヶ岳山荘からの定時画像。山頂付近の雲・視界・積雪確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'yari-sanso-hida', area:'北アルプス', mountains:['槍ヶ岳'],
    title:'槍ヶ岳山荘 飛騨側ライブカメラ', type:'hut', provider:'槍ヶ岳山荘グループ',
    url:'https://www.yarigatake.co.jp/livecamera/',
    note:'槍ヶ岳山荘から飛騨側の様子。西側の雲・視界確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'sessho-hut', area:'北アルプス', mountains:['槍ヶ岳'],
    title:'殺生小屋ライブカメラ', type:'hut', provider:'槍ヶ岳山荘グループ',
    url:'https://www.yarigatake.co.jp/livecamera/',
    note:'殺生小屋の約10分間隔画像。槍ヶ岳東側の現地状況確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'minamidake-hut', area:'北アルプス', mountains:['槍ヶ岳','北穂高岳'],
    title:'南岳小屋ライブカメラ', type:'hut', provider:'槍ヶ岳山荘グループ',
    url:'https://www.yarigatake.co.jp/livecamera/',
    note:'南岳小屋からの約10分間隔画像。大キレット周辺の雲・視界確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'dakesawa-hut', area:'北アルプス', mountains:['前穂高岳','奥穂高岳'],
    title:'岳沢小屋ライブカメラ', type:'hut', provider:'槍ヶ岳山荘グループ',
    url:'https://www.yarigatake.co.jp/livecamera/',
    note:'岳沢小屋の約10分間隔画像。前穂・奥穂南側の現地状況確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'karasawa-hyutte', area:'北アルプス', mountains:['奥穂高岳','北穂高岳','前穂高岳'],
    title:'涸沢ヒュッテ ライブカメラ', type:'hut', provider:'上高地ビジターセンター／北アルプスブロードバンドネットワーク',
    url:'https://www.kamikochi-vc.or.jp/look/yamagoya.html',
    note:'山小屋カメラ一覧から「涸沢ヒュッテ」を選択。涸沢カール・穂高方面の確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'karasawa-goya', area:'北アルプス', mountains:['奥穂高岳','北穂高岳','前穂高岳'],
    title:'涸沢小屋 ライブカメラ', type:'hut', provider:'上高地ビジターセンター／北アルプスブロードバンドネットワーク',
    url:'https://www.kamikochi-vc.or.jp/look/yamagoya.html',
    note:'山小屋カメラ一覧から「涸沢小屋」を選択。涸沢カール・前穂高岳方面の確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'makinoto-trailhead', area:'九州', mountains:['久住山'],
    title:'牧ノ戸登山口 道路ライブカメラ', type:'road', provider:'大分県 おおいた防災情報',
    url:'https://oita-bosai.my.salesforce-sites.com/X_VF_CamerasPopup?oid=a4t10000000wvJNAAY',
    note:'県道11号（別府一の宮線）牧ノ戸登山口。登山口の路面・積雪・道路状況確認に。', verified:'2026-08-27', official:true
  },

  {
    id:'asahidake-ropeway', area:'北海道', mountains:['大雪山（旭岳）'],
    title:'旭岳ロープウェイ 姿見駅ライブ画像', type:'weather', provider:'大雪山旭岳ロープウェイ',
    url:'https://asahidake.hokkaido.jp/',
    note:'姿見駅（標高約1,600m）から旭岳のライブ画像。天気・雲・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'yotei-niseko', area:'北海道', mountains:['後方羊蹄山'],
    title:'羊蹄山ライブカメラ', type:'weather', provider:'ニセコリゾート観光協会',
    url:'https://www.niseko-ta.jp/about/livecamera/',
    note:'ニセコビュープラザから羊蹄山を望むライブ映像。山容・雲・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'niseko-annupuri', area:'北海道', mountains:['ニセコアンヌプリ'],
    title:'ニセコアンヌプリ ゴンドラライブカメラ', type:'tourism', provider:'ニセコリゾート観光協会',
    url:'https://www.niseko-ta.jp/about/livecamera/',
    note:'ニセコアンヌプリ国際スキー場のゴンドラ周辺ライブ映像への公式導線。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-tokachi', area:'北海道', mountains:['十勝岳'],
    title:'十勝岳 白金模範牧場 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=10801',
    note:'気象庁の火山監視カメラ。十勝岳の山体・雲・視界の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-tarumae', area:'北海道', mountains:['樽前山'],
    title:'樽前山 別々川 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=10901',
    note:'気象庁の火山監視カメラ。樽前山の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-oshamambe-komagatake', area:'北海道', mountains:['渡島駒ヶ岳'],
    title:'北海道駒ヶ岳 剣ヶ峯 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=11303',
    note:'気象庁の火山監視カメラ。渡島駒ヶ岳（北海道駒ヶ岳）の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-iwaki', area:'東北', mountains:['岩木山'],
    title:'岩木山 百沢東 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=20201',
    note:'気象庁の火山監視カメラ。岩木山の山体・雲・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-hakkoda', area:'東北', mountains:['八甲田山'],
    title:'八甲田山 大川原 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=20301',
    note:'気象庁の火山監視カメラ。八甲田山の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-iwate', area:'東北', mountains:['岩手山'],
    title:'岩手山 柏台 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=20701',
    note:'気象庁の火山監視カメラ。岩手山の山体・雲・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-chokai', area:'東北', mountains:['鳥海山'],
    title:'鳥海山 上郷2 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=20901',
    note:'気象庁の火山監視カメラ。鳥海山の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-kurikoma', area:'東北', mountains:['栗駒山'],
    title:'栗駒山 大柳 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=21001',
    note:'気象庁の火山監視カメラ。栗駒山の山体・雲・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-zao', area:'東北', mountains:['蔵王山（熊野岳）'],
    title:'蔵王山 刈田岳2 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=21204',
    note:'気象庁の火山監視カメラ。刈田岳側から蔵王山域の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-adatara', area:'東北', mountains:['安達太良山'],
    title:'安達太良山 若宮 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=21401',
    note:'気象庁の火山監視カメラ。安達太良山の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-bandai', area:'東北', mountains:['磐梯山'],
    title:'磐梯山 剣ケ峯 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=21501',
    note:'気象庁の火山監視カメラ。磐梯山の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'oze-official', area:'尾瀬', mountains:['燧ヶ岳','至仏山'],
    title:'尾瀬 ライブカメラ', type:'weather', provider:'尾瀬保護財団',
    url:'https://oze-fnd.or.jp/',
    note:'尾瀬沼・尾瀬ヶ原のライブカメラへの公式導線。燧ヶ岳・至仏山周辺の天候確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'jma-nikko-shirane', area:'関東', mountains:['奥白根山'],
    title:'日光白根山 歌ヶ浜 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=30201',
    note:'気象庁の火山監視カメラ。日光白根山（奥白根山）の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-kusatsu-shirane', area:'上信越', mountains:['草津白根山'],
    title:'草津白根山 逢ノ峰山頂 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=30502',
    note:'気象庁の火山監視カメラ。草津白根山周辺の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-asama', area:'上信越', mountains:['浅間山'],
    title:'浅間山 鬼押 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=30601',
    note:'気象庁の火山監視カメラ。浅間山の山体・雲・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'tanigawa-mtt', area:'上信越', mountains:['谷川岳'],
    title:'谷川岳 天神平ライブカメラ', type:'weather', provider:'谷川岳ヨッホ by 星野リゾート',
    url:'https://tanigawadake-joch.com/mt-t/conditions/',
    note:'公式コンディションページ内のライブカメラ。天神平の天候・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-niigata-yakeyama', area:'上信越', mountains:['焼山'],
    title:'新潟焼山 宇棚 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=30701',
    note:'気象庁の火山監視カメラ。新潟焼山の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'azumino-northern-alps', area:'北アルプス', mountains:['常念岳'],
    title:'安曇野 北アルプスライブカメラ', type:'weather', provider:'安曇野市',
    url:'https://www.city.azumino.nagano.jp/site/camera/',
    note:'長峰山頂など市内3地点から北アルプスをリアルタイム配信。常念岳方面の雲・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-yakedake', area:'北アルプス', mountains:['焼岳'],
    title:'焼岳 中尾峠 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=31001',
    note:'気象庁の火山監視カメラ。中尾峠付近から焼岳の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-norikura', area:'北アルプス', mountains:['乗鞍岳'],
    title:'乗鞍岳 乗鞍高原 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=31101',
    note:'気象庁の火山監視カメラ。乗鞍高原側から乗鞍岳の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-ontake', area:'御嶽・中央アルプス', mountains:['御嶽'],
    title:'御嶽山 三岳黒沢 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=31201',
    note:'気象庁の火山監視カメラ。御嶽山の山体・雲・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'yatsugatake-akadake', area:'八ヶ岳', mountains:['八ヶ岳（赤岳）','天狗岳'],
    title:'八ヶ岳 ライブカメラ', type:'weather', provider:'八ヶ岳観光協会',
    url:'https://mt-yatsugatake.jp/livecamera/',
    note:'北杜市、富士見、赤岳山頂直下、北横岳など八ヶ岳各所のライブカメラをまとめた公式観光案内。', verified:'2026-08-27', official:true
  },
  {
    id:'utsukushigahara-city', area:'中信', mountains:['美ヶ原'],
    title:'美ヶ原高原 うつくしテラス ライブカメラ', type:'weather', provider:'松本市',
    url:'https://www.city.matsumoto.nagano.jp/soshiki/216/52945.html',
    note:'美ヶ原高原の天気・駐車場状況を3方向、1分間隔で配信する松本市公式カメラ。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-hakusan', area:'北陸', mountains:['白山'],
    title:'白山 白峰 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=31301',
    note:'気象庁の火山監視カメラ。白山の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'ibuki-maibara', area:'近畿', mountains:['伊吹山'],
    title:'伊吹山 山麓・3合目・5合目ライブカメラ', type:'weather', provider:'米原市',
    url:'https://www.city.maibara.lg.jp/mtibuki/livecamera/20509.html',
    note:'米原市公式。山麓、3合目、5合目から伊吹山を24時間ライブ配信。', verified:'2026-08-27', official:true
  },
  {
    id:'gozaisho-ropeway', area:'近畿', mountains:['御在所岳'],
    title:'御在所岳 山上公園駅ライブカメラ', type:'tourism', provider:'御在所ロープウエイ',
    url:'https://www.gozaisho.co.jp/live/camera.htm',
    note:'山上公園駅屋上の公式ライブカメラ。営業時間中に更新。冬季は凍結等で停止する場合あり。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'okudaisen-kofu', area:'中国', mountains:['大山（鳥取）'],
    title:'奥大山ライブカメラ', type:'weather', provider:'鳥取県江府町',
    url:'https://www.town-kofu.jp/kanko/16/',
    note:'江府町公式観光サイト。大山南壁遠景や奥大山周辺の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'tsurugisan-nishijima', area:'四国', mountains:['剣山'],
    title:'剣山 西島駅ライブカメラ', type:'weather', provider:'剣山観光推進協議会',
    url:'https://tsurugisan.net/livecamera/',
    note:'リフト西島駅（標高1,750m）から剣山方面をライブ配信。夜間・冬季は配信停止あり。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'ishizuchi-jojusha', area:'四国', mountains:['石鎚山'],
    title:'石鎚神社 成就社ライブカメラ', type:'weather', provider:'石鎚山系連携事業協議会',
    url:'https://ishizuchisankei.com/weather/',
    note:'石鎚山系公式。成就社から石鎚山を3分ごとに配信。', verified:'2026-08-27', official:true
  },
  {
    id:'ishizuchi-binagomori', area:'四国', mountains:['瓶ヶ森','石鎚山'],
    title:'山頂成就駅 瓶ヶ森方面ライブカメラ', type:'tourism', provider:'石鎚山系連携事業協議会',
    url:'https://ishizuchisankei.com/weather/',
    note:'石鎚登山ロープウェイ山頂成就駅から瓶ヶ森方面。山域の雲・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'ishizuchi-shirasa', area:'四国', mountains:['瓶ヶ森','笹ヶ峰','伊予富士'],
    title:'山荘しらさ ライブカメラ', type:'hut', provider:'石鎚山系連携事業協議会',
    url:'https://ishizuchisankei.com/weather/',
    note:'石鎚山系公式。山荘しらさ周辺の現況。20時～4時は配信停止、悪天候時は充電不足で停止する場合あり。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-tsurumi', area:'九州', mountains:['鶴見岳'],
    title:'鶴見岳・伽藍岳 塚原無田 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=51301',
    note:'気象庁の火山監視カメラ。鶴見岳・伽藍岳の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-kuju-ueno', area:'九州', mountains:['久住山','大船山'],
    title:'九重山 上野 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=50201',
    note:'気象庁の火山監視カメラ。くじゅう連山の広域現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-kuju-hossho', area:'九州', mountains:['久住山','大船山'],
    title:'九重山 星生山北尾根 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=50202',
    note:'星生山北尾根の気象庁監視カメラ。久住山周辺の雲・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-aso-kusasenri', area:'九州', mountains:['阿蘇山（高岳）'],
    title:'阿蘇山 草千里 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=50301',
    note:'気象庁の火山監視カメラ。阿蘇山域の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-unzen', area:'九州', mountains:['雲仙岳（普賢岳）'],
    title:'雲仙岳 野岳 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=50401',
    note:'気象庁の火山監視カメラ。雲仙岳・普賢岳の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-kirishima-karakuni', area:'九州', mountains:['霧島山（韓国岳）'],
    title:'霧島山 韓国岳 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=50504',
    note:'気象庁の火山監視カメラ。韓国岳の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'jma-kirishima-ebino', area:'九州', mountains:['霧島山（韓国岳）','高千穂峰'],
    title:'霧島山 えびの高原 監視カメラ', type:'weather', provider:'気象庁',
    url:'https://www.data.jma.go.jp/vois/data/obs/volcam/volcam.php?VC=50505',
    note:'気象庁の火山監視カメラ。霧島連山の広域状況確認に。', verified:'2026-08-27', official:true
  },

  {
    id:'tateyama-murodo', area:'北アルプス', mountains:['立山','剱岳'],
    title:'立山室堂平ライブカメラ', type:'weather', provider:'立山黒部アルペンルート',
    url:'https://www.alpen-route.com/live_camera/murodou.html',
    note:'室堂平・標高2,450m。立山・剱岳方面の入山前確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'tateyama-ootani', area:'北アルプス', mountains:['立山','剱岳'],
    title:'大谷ライブカメラ', type:'road', provider:'立山黒部アルペンルート',
    url:'https://www.alpen-route.com/live_camera/ootani.html',
    note:'室堂に近い大谷付近。アルペンルートの現地状況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'tateyama-daikanbo', area:'北アルプス', mountains:['立山','剱岳'],
    title:'大観峰ライブカメラ', type:'tourism', provider:'立山黒部アルペンルート',
    url:'https://www.alpen-route.com/live_camera/daikanbou.html',
    note:'大観峰・標高2,316m。立山東側の雲や視界の確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'hakuba-village', area:'北アルプス', mountains:['白馬岳','唐松岳','五竜岳'],
    title:'白馬村ライブカメラ', type:'weather', provider:'白馬村公式観光サイト',
    url:'https://www.vill.hakuba.nagano.jp/livecamera/',
    note:'黒菱、八方尾根、白馬山荘、五竜山荘など複数地点を一覧確認。', verified:'2026-08-27', official:true
  },
  {
    id:'hakuba-happo', area:'北アルプス', mountains:['唐松岳','白馬岳'],
    title:'八方尾根・八方池ライブカメラ', type:'weather', provider:'白馬八方尾根',
    url:'https://www.happo-one.jp/trekking/livecamera/',
    note:'八方池2,060m、黒菱平など。唐松岳方面の雲量・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'hakuba-road', area:'北アルプス', mountains:['白馬岳','唐松岳','五竜岳'],
    title:'白馬八方尾根 周辺道路状況ライブカメラ', type:'road', provider:'白馬八方尾根',
    url:'https://www.happo-one.jp/access/livecamera/',
    note:'大町建設事務所の道路カメラへの公式導線。登山口までの道路状況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'fuji-official', area:'富士・御坂', mountains:['富士山'],
    title:'富士登山オフィシャル ライブカメラ', type:'weather', provider:'富士登山オフィシャルサイト',
    url:'https://www.fujisan-climb.jp/livecamera/',
    note:'剣ヶ峰、吉田ルート八合五勺、五合目など複数地点を一覧確認。季節運用あり。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'kamikochi-terminal', area:'北アルプス', mountains:['奥穂高岳','前穂高岳','北穂高岳','槍ヶ岳','焼岳'],
    title:'上高地バスターミナルライブカメラ', type:'weather', provider:'自然公園財団 上高地支部',
    url:'https://www.npfj.or.jp/branch-list/kamikochi/',
    note:'上高地バスターミナルから穂高連峰方面。入山前の雲・視界確認に。', verified:'2026-08-27', official:true, seasonal:true
  },

  // V1.4.225: nationwide expansion - trailheads, mountain huts, ropeways and access-road cameras.
  {
    id:'gassan-8th-parking', area:'東北', mountains:['月山'],
    title:'月山8合目駐車場ライブカメラ', type:'road', provider:'鶴岡市／つるおか観光ナビ',
    url:'https://www.tsuruokakanko.com/spot/344',
    note:'月山8合目駐車場の現況。登山口の天候・混雑・路面状況確認に。2026年公式案内で公開確認。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'gassan-8th-bus-parking', area:'東北', mountains:['月山'],
    title:'月山8合目バス駐車場ライブカメラ', type:'road', provider:'鶴岡市／つるおか観光ナビ',
    url:'https://www.tsuruokakanko.com/spot/344',
    note:'月山8合目バス駐車場の現況。登山口付近の天候・混雑確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'gassan-busshoike-view', area:'東北', mountains:['月山'],
    title:'月山 佛生池小屋（9合目）ライブカメラ', type:'hut', provider:'鶴岡市／つるおか観光ナビ',
    url:'https://www.tsuruokakanko.com/spot/344',
    note:'月山9合目・佛生池小屋からの風景。稜線の雲・視界・残雪確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'gassan-busshoike-snow', area:'東北', mountains:['月山'],
    title:'月山 佛生池小屋（9合目）雪渓カメラ', type:'hut', provider:'鶴岡市／つるおか観光ナビ',
    url:'https://www.tsuruokakanko.com/spot/344',
    note:'佛生池小屋付近の雪渓状況を確認できる公式ライブカメラ導線。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'ashiyasu-p2', area:'南アルプス', mountains:['北岳','間ノ岳','農鳥岳','地蔵岳(鳳凰)'],
    title:'芦安市営第2駐車場ライブカメラ', type:'road', provider:'南アルプス市',
    url:'https://www.city.minami-alps.yamanashi.jp/docs/17161.html',
    note:'南アルプス登山バス・乗合タクシー利用時の駐車場混雑確認。15分間隔の静止画。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'ashiyasu-p3', area:'南アルプス', mountains:['北岳','間ノ岳','農鳥岳','地蔵岳(鳳凰)'],
    title:'芦安市営第3駐車場ライブカメラ', type:'road', provider:'南アルプス市',
    url:'https://www.city.minami-alps.yamanashi.jp/docs/17161.html',
    note:'芦安側の登山者用駐車場。混雑状況を15分間隔の静止画で確認。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'yashajin-parking-1', area:'南アルプス', mountains:['北岳','間ノ岳','農鳥岳','地蔵岳(鳳凰)'],
    title:'夜叉神峠登山口駐車場ライブカメラ①', type:'road', provider:'南アルプス市',
    url:'https://www.city.minami-alps.yamanashi.jp/docs/17161.html',
    note:'夜叉神峠登山口駐車場の利用状況。鳳凰三山・南アルプス北部の入山前確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'yashajin-parking-2', area:'南アルプス', mountains:['北岳','間ノ岳','農鳥岳','地蔵岳(鳳凰)'],
    title:'夜叉神峠登山口駐車場ライブカメラ②', type:'road', provider:'南アルプス市',
    url:'https://www.city.minami-alps.yamanashi.jp/docs/17161.html',
    note:'夜叉神峠登山口駐車場の別視点。15分間隔で更新。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'tateyama-midagahara', area:'北アルプス', mountains:['立山','剱岳'],
    title:'弥陀ヶ原ライブカメラ', type:'tourism', provider:'立山黒部アルペンルート',
    url:'https://www.alpen-route.com/live_camera/midagahara.html',
    note:'弥陀ヶ原の現況。室堂へ向かうアルペンルート上の雲・積雪・視界確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'tateyama-kurobedaira', area:'北アルプス', mountains:['立山','剱岳'],
    title:'黒部平ライブカメラ', type:'tourism', provider:'立山黒部アルペンルート',
    url:'https://www.alpen-route.com/live_camera/kurobedaira.html',
    note:'黒部平からの現況。立山東側の雲・視界・残雪確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'tateyama-kurobe-dam', area:'北アルプス', mountains:['立山','剱岳'],
    title:'黒部ダムライブカメラ', type:'tourism', provider:'立山黒部アルペンルート',
    url:'https://www.alpen-route.com/live_camera/kurobedam.html',
    note:'黒部ダム周辺の現況。立山黒部ルート東側アクセスの天候確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'tateyama-summit', area:'北アルプス', mountains:['立山','剱岳'],
    title:'立山山頂ライブカメラ', type:'weather', provider:'立山黒部アルペンルート',
    url:'https://www.alpen-route.com/live_camera/tateyama_summit.html',
    note:'立山山頂側の高所ライブカメラ。山頂付近の雲・視界確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'sawando-ohashi', area:'北アルプス', mountains:['槍ヶ岳','奥穂高岳','前穂高岳','北穂高岳','焼岳'],
    title:'上高地 沢渡大橋付近 道路ライブカメラ', type:'road', provider:'松本市',
    url:'https://www.city.matsumoto.nagano.jp/soshiki/78/165325.html',
    note:'国道158号沢渡大橋バス停付近。上高地への道路混雑・路面状況を10分おきに確認。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'sawando-ohashi-east', area:'北アルプス', mountains:['槍ヶ岳','奥穂高岳','前穂高岳','北穂高岳','焼岳'],
    title:'上高地 沢渡大橋・松本側 道路ライブカメラ', type:'road', provider:'松本市',
    url:'https://www.city.matsumoto.nagano.jp/soshiki/78/165325.html',
    note:'沢渡大橋バス停から松本側約500m。上高地方面の渋滞状況確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'sawando-ashiyu-junction', area:'北アルプス', mountains:['槍ヶ岳','奥穂高岳','前穂高岳','北穂高岳','焼岳'],
    title:'沢渡足湯公園付近 道路ライブカメラ', type:'road', provider:'松本市',
    url:'https://www.city.matsumoto.nagano.jp/soshiki/78/165325.html',
    note:'国道158号から沢渡バスターミナルへの分岐付近。混雑・道路状況確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'sawando-p3', area:'北アルプス', mountains:['槍ヶ岳','奥穂高岳','前穂高岳','北穂高岳','焼岳'],
    title:'市営沢渡第3駐車場ライブカメラ', type:'road', provider:'松本市',
    url:'https://www.city.matsumoto.nagano.jp/soshiki/78/165325.html',
    note:'上高地シャトルバス利用時の駐車場満空・混雑状況確認に。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'myoko-koyaike-hiuchi', area:'上信越', mountains:['火打山','妙高山'],
    title:'高谷池・火打山ライブカメラ', type:'hut', provider:'環境省 インターネット自然研究所',
    url:'https://www.sizenken.biodic.go.jp/about_camera/about.php?no=127',
    note:'高谷池ヒュッテ設置。高谷池と火打山の現況を確認できる国立公園ライブカメラ。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'myoko-sasagamine-yakeyama', area:'上信越', mountains:['妙高山','火打山','焼山'],
    title:'笹ヶ峰ダム・焼山ライブカメラ', type:'weather', provider:'妙高市（公式リンク）',
    url:'https://www.city.myoko.niigata.jp/docs/62.html',
    note:'妙高市公式のライブカメラ案内から笹ヶ峰ダム／焼山カメラへ。笹ヶ峰登山口周辺の天候確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'tsukuba-miyukigahara', area:'関東', mountains:['筑波山'],
    title:'筑波山 御幸ヶ原ライブカメラ', type:'weather', provider:'つくば観光コンベンション協会',
    url:'https://ttca.jp/tourisminfo/mttsukuba/',
    note:'筑波山公式観光案内が紹介する御幸ヶ原カメラ。山頂付近の天候・混雑確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'tsukuba-nyotai', area:'関東', mountains:['筑波山'],
    title:'筑波山 女体山頂ライブカメラ', type:'weather', provider:'つくば観光コンベンション協会',
    url:'https://ttca.jp/tourisminfo/mttsukuba/',
    note:'女体山頂のライブカメラ。山頂の視界・天候確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'tsukuba-plum-upper', area:'関東', mountains:['筑波山'],
    title:'筑波山梅林 上部ライブカメラ', type:'tourism', provider:'つくば観光コンベンション協会',
    url:'https://ttca.jp/tourisminfo/mttsukuba/',
    note:'筑波山梅林上部の現況。山麓側の天候確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'tsukuba-plum-lower', area:'関東', mountains:['筑波山'],
    title:'筑波山梅林 下部ライブカメラ', type:'tourism', provider:'つくば観光コンベンション協会',
    url:'https://ttca.jp/tourisminfo/mttsukuba/',
    note:'筑波山梅林下部の現況。山麓側の天候・混雑確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'tsukuba-route42', area:'関東', mountains:['筑波山'],
    title:'筑波山 県道42号ライブカメラ', type:'road', provider:'つくば観光コンベンション協会',
    url:'https://ttca.jp/tourisminfo/mttsukuba/',
    note:'筑波山アクセス県道42号の道路ライブカメラ。登山口への道路状況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'nasu-toge-chaya-parking', area:'関東', mountains:['三本槍岳'],
    title:'那須岳 峠の茶屋駐車場ライブカメラ', type:'road', provider:'栃木県',
    url:'https://www.pref.tochigi.lg.jp/h03/2026nasujyuutaigw.html',
    note:'那須岳主要登山口・峠の茶屋駐車場の満空情報。栃木県公式の渋滞対策ページから確認可能。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'nasu-daimaru-parking', area:'関東', mountains:['三本槍岳'],
    title:'那須岳 大丸駐車場ライブカメラ', type:'road', provider:'栃木県',
    url:'https://www.pref.tochigi.lg.jp/h03/2026nasujyuutaigw.html',
    note:'那須岳・那須ロープウェイ方面の大丸駐車場満空状況を確認できる公式導線。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'chokai-hokodate', area:'東北', mountains:['鳥海山'],
    title:'鳥海山 鉾立山荘ライブカメラ', type:'hut', provider:'にかほ市観光協会',
    url:'https://nikaho-kanko.jp/gallery/',
    note:'鳥海山5合目・標高1,150mの鉾立山荘。10分間隔の静止画、概ね4月下旬～10月下旬。', verified:'2026-08-27', official:true, seasonal:true
  },
  {
    id:'chokai-nemunooka', area:'東北', mountains:['鳥海山'],
    title:'道の駅象潟 ねむの丘・鳥海山ライブカメラ', type:'weather', provider:'にかほ市観光協会',
    url:'https://nikaho-kanko.jp/gallery/',
    note:'道の駅象潟から鳥海山と日本海を確認できる年中配信カメラ。山体の雲・視界確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'daisetsu-kurodake-summit', area:'北海道', mountains:['大雪山（旭岳）'],
    title:'黒岳五合目・黒岳山頂方面ライブカメラ', type:'weather', provider:'大雪山層雲峡・黒岳ロープウェイ',
    url:'https://www.rinyu.co.jp/kurodake/',
    note:'大雪山系黒岳五合目から山頂方向。旭岳～黒岳縦走を含む大雪山域の現況確認に。', verified:'2026-08-27', official:true
  },
  {
    id:'daisetsu-kurodake-sounkyo', area:'北海道', mountains:['大雪山（旭岳）'],
    title:'黒岳五合目・層雲峡温泉街方面ライブカメラ', type:'tourism', provider:'大雪山層雲峡・黒岳ロープウェイ',
    url:'https://www.rinyu.co.jp/kurodake/',
    note:'黒岳五合目から層雲峡方面。大雪山東側アクセスの雲・視界確認に。', verified:'2026-08-27', official:true
  }

]);
window.tratenCamerasForMountain = function(name){
  const key=String(name||'').trim();
  return (window.TRATEN_CAMERA_DATA||[]).filter(row=>(row.mountains||[]).includes(key));
};
