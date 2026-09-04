// Traten V1.5.85: 日本百名山 Priority-C 30座 一括通過ポイント拡充。
// CT policy: public checkpoint CT + existing verified-total residual only. No geometric/elevation CT estimation.
// Waypoint coordinates are weather-grid representative positions based on public route maps; NOT navigation coordinates.
(function(){'use strict';
const FIXED=Object.freeze({
"雄阿寒岳":[
{"id":"v1585-1","type":"waypoint","name":"五合目（雄阿寒岳）","lat":43.446941,"lon":144.155534,"elevation":1000,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"苗場山":[
{"id":"v1585-2","type":"waypoint","name":"五合目（苗場山）","lat":36.851795,"lon":138.671358,"elevation":1700,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-3","type":"waypoint","name":"九合目坪場","lat":36.847707,"lon":138.685032,"elevation":2050,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"月山":[
{"id":"v1585-4","type":"pass","name":"牛首（月山）","lat":38.542139,"lon":140.022602,"elevation":1720,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"焼岳":[
{"id":"v1585-5","type":"waypoint","name":"下堀沢出合","lat":36.217013,"lon":137.592146,"elevation":2000,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"四阿山":[
{"id":"v1585-6","type":"peak","name":"中四阿","lat":36.540781,"lon":138.401426,"elevation":2106,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"斜里岳":[
{"id":"v1585-7","type":"pass","name":"上二股","lat":43.768679,"lon":144.707028,"elevation":1240,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"開聞岳":[
{"id":"v1585-8","type":"waypoint","name":"五合目展望所（開聞岳）","lat":31.186767,"lon":130.530552,"elevation":500,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"伊吹山":[
{"id":"v1585-ibuki-driveway-parking","type":"trailhead","name":"伊吹山ドライブウェイ山頂駐車場","lat":35.4206,"lon":136.3989,"elevation":1260,"source":"米原市公式・2026年利用可能な山頂駐車場ルート"},
{"id":"v1585-10","type":"pass","name":"西登山道中間分岐（伊吹山）","lat":35.418963,"lon":136.403244,"elevation":1320,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"至仏山":[
{"id":"v1585-11","type":"peak","name":"小至仏山","lat":36.899646,"lon":139.180471,"elevation":2162,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"早池峰山":[
{"id":"v1585-12","type":"waypoint","name":"五合目 御金蔵","lat":39.552977,"lon":141.49099,"elevation":1600,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"祖母山":[
{"id":"v1585-13","type":"hut","name":"祖母山九合目小屋","lat":32.827059,"lon":131.343982,"elevation":1760,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"筑波山":[
{"id":"v1585-14","type":"waypoint","name":"東屋（弁慶茶屋跡）","lat":36.221628,"lon":140.105233,"elevation":710,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-15","type":"peak","name":"筑波山（男体山）","lat":36.224659,"lon":140.107321,"elevation":871,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"石鎚山":[
{"id":"v1585-16","type":"hut","name":"二ノ鎖元小屋","lat":33.767766,"lon":133.117363,"elevation":1820,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"八甲田山":[
{"id":"v1585-17","type":"hut","name":"大岳避難小屋（八甲田）","lat":40.661117,"lon":140.874836,"elevation":1580,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"天城山（万三郎岳）":[
{"id":"v1585-18","type":"peak","name":"万二郎岳（天城山）","lat":34.868396,"lon":139.013614,"elevation":1299,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-19","type":"pass","name":"石楠立","lat":34.865638,"lon":139.008449,"elevation":1360,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"阿蘇山（高岳）":[
{"id":"v1585-aso-sensui-parking","type":"trailhead","name":"仙酔峡駐車場","lat":32.899281,"lon":131.102628,"elevation":980,"source":"既存仙酔峡固定候補の別名"},
{"id":"v1585-21","type":"pass","name":"仙酔分かれ","lat":32.886413,"lon":131.103737,"elevation":1500,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-22","type":"pass","name":"高岳・中岳・月見小屋分岐","lat":32.885365,"lon":131.104528,"elevation":1550,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-23","type":"peak","name":"阿蘇山（中岳）","lat":32.886664,"lon":131.103076,"elevation":1506,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-24","type":"pass","name":"馬の背（阿蘇）","lat":32.88691,"lon":131.103634,"elevation":1450,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-25","type":"waypoint","name":"火口東展望所","lat":32.889705,"lon":131.104154,"elevation":1300,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-26","type":"pass","name":"すずめ岩分岐","lat":32.893996,"lon":131.102444,"elevation":1150,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"奥白根山":[
{"id":"v1585-27","type":"waypoint","name":"弥陀ヶ池","lat":36.806797,"lon":139.377523,"elevation":2250,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"安達太良山":[
{"id":"v1585-28","type":"peak","name":"薬師岳（安達太良）","lat":37.621752,"lon":140.302394,"elevation":1350,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"金峰山":[
{"id":"v1585-29","type":"pass","name":"朝日峠（奥秩父）","lat":35.872243,"lon":138.649272,"elevation":2570,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-30","type":"peak","name":"朝日岳（奥秩父）","lat":35.871856,"lon":138.6391,"elevation":2579,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"大菩薩嶺":[
{"id":"v1585-31","type":"hut","name":"福ちゃん荘","lat":35.735,"lon":138.835134,"elevation":1720,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-32","type":"waypoint","name":"雷岩","lat":35.746806,"lon":138.844693,"elevation":2040,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"赤城山（黒檜山）":[
{"id":"v1585-33","type":"peak","name":"駒ヶ岳（赤城）","lat":36.559015,"lon":139.191212,"elevation":1685,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-34","type":"trailhead","name":"おのこ駐車場・駒ヶ岳登山口","lat":36.555451,"lon":139.186488,"elevation":1350,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"乗鞍岳":[
{"id":"v1585-35","type":"hut","name":"肩ノ小屋（乗鞍岳）","lat":36.117118,"lon":137.553754,"elevation":2760,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"霧島山（韓国岳）":[
{"id":"v1585-kirishima-trailhead","type":"trailhead","name":"韓国岳登山口","lat":31.9457,"lon":130.8428,"elevation":1200,"source":"環境省・韓国岳大浪池登山コース"},
{"id":"v1585-37","type":"hut","name":"韓国岳避難小屋","lat":31.936476,"lon":130.857822,"elevation":1330,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-38","type":"waypoint","name":"大浪池休憩所","lat":31.938321,"lon":130.855517,"elevation":1250,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-39","type":"trailhead","name":"県境登山口","lat":31.943172,"lon":130.847358,"elevation":1200,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-40","type":"trailhead","name":"えびのエコミュージアムセンター","lat":31.944423,"lon":130.843739,"elevation":1200,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"茶臼岳（那須岳）":[
{"id":"v1585-41","type":"hut","name":"峰の茶屋跡避難小屋","lat":37.125056,"lon":139.971389,"elevation":1720,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"岩木山":[
{"id":"v1585-42","type":"hut","name":"鳳鳴ヒュッテ","lat":40.655201,"lon":140.300114,"elevation":1460,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"美ヶ原":[
{"id":"v1585-43","type":"waypoint","name":"美しの塔","lat":36.227431,"lon":138.123118,"elevation":1960,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"蔵王山（熊野岳）":[
{"id":"v1585-44","type":"waypoint","name":"ワサ小屋跡","lat":38.149111,"lon":140.435581,"elevation":1750,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"霧ヶ峰（車山）":[
{"id":"v1585-45","type":"pass","name":"車山乗越","lat":36.103285,"lon":138.194249,"elevation":1815,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-46","type":"peak","name":"蝶々深山","lat":36.103443,"lon":138.193275,"elevation":1836,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-47","type":"hut","name":"コロボックルヒュッテ","lat":36.10453,"lon":138.187783,"elevation":1800,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"日出ヶ岳":[
{"id":"v1585-48","type":"waypoint","name":"日出ヶ岳展望台下分岐","lat":34.18427,"lon":136.106521,"elevation":1660,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
"八幡平":[
{"id":"v1585-49","type":"pass","name":"鏡池・見返峠分岐","lat":39.952146,"lon":140.855726,"elevation":1580,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-50","type":"waypoint","name":"めがね沼","lat":39.954505,"lon":140.855746,"elevation":1590,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
{"id":"v1585-51","type":"pass","name":"見返峠","lat":39.953632,"lon":140.8548,"elevation":1570,"source":"V1.5.85公開ルート図準拠・天気格子用代表位置（ナビ用途不可）"},
],
});
try{for(const [m,ps] of Object.entries(FIXED)){if(typeof appendFixedWaypoints==='function')appendFixedWaypoints(m,ps);}}catch(_){ }
const T=Object.freeze({
"滝口・雄阿寒岳登山口→五合目（雄阿寒岳）":{"minutes":135,"source":"環境省・雄阿寒岳登山コース（登山口→太郎湖10→次郎湖10→五合目115分）","sourceType":"official"},
"五合目（雄阿寒岳）→雄阿寒岳":{"minutes":65,"source":"環境省・雄阿寒岳登山コース","sourceType":"official"},
"雄阿寒岳→五合目（雄阿寒岳）":{"minutes":40,"source":"環境省・雄阿寒岳登山コース","sourceType":"official"},
"五合目（雄阿寒岳）→滝口・雄阿寒岳登山口":{"minutes":100,"source":"環境省・雄阿寒岳登山コース","sourceType":"official"},
"小赤沢三合目登山口→五合目（苗場山）":{"minutes":60,"source":"信州山学ガイド・小赤沢コース","sourceType":"guide"},
"五合目（苗場山）→九合目坪場":{"minutes":90,"source":"信州山学ガイド・小赤沢コース","sourceType":"guide"},
"九合目坪場→苗場山":{"minutes":45,"source":"信州山学ガイド（坪場→苗場神社分岐30＋山頂15）","sourceType":"guide"},
"苗場山→九合目坪場":{"minutes":30,"source":"信州山学ガイド","sourceType":"guide"},
"九合目坪場→五合目（苗場山）":{"minutes":70,"source":"信州山学ガイド","sourceType":"guide"},
"五合目（苗場山）→小赤沢三合目登山口":{"minutes":40,"source":"信州山学ガイド","sourceType":"guide"},
"姥沢 月山リフト→牛首（月山）":{"minutes":193,"source":"既存確認済み姥沢→月山208分から公開モデル牛首→山頂15分を差引","sourceType":"derived-verified"},
"牛首（月山）→月山":{"minutes":15,"source":"YAMAP公開モデル・牛首→月山","sourceType":"yamap"},
"月山→牛首（月山）":{"minutes":76,"source":"YAMAP公開モデル・月山→牛首","sourceType":"yamap"},
"牛首（月山）→姥沢 月山リフト":{"minutes":50,"source":"既存確認済み月山→姥沢126分から公開モデル月山→牛首76分を差引","sourceType":"derived-verified"},
"新中の湯登山口→下堀沢出合":{"minutes":110,"source":"YAMAP公開モデル・新中の湯→下堀沢出合","sourceType":"yamap"},
"下堀沢出合→焼岳":{"minutes":84,"source":"YAMAP公開モデル・下堀沢出合→焼岳北峰","sourceType":"yamap"},
"焼岳→下堀沢出合":{"minutes":60,"source":"YAMAP公開モデル・焼岳北峰→下堀沢出合","sourceType":"yamap"},
"下堀沢出合→新中の湯登山口":{"minutes":90,"source":"YAMAP公開モデル・下堀沢出合→新中の湯","sourceType":"yamap"},
"菅平牧場登山口→中四阿":{"minutes":155,"source":"YAMAP公開モデル・菅平牧場→中四阿","sourceType":"yamap"},
"中四阿→四阿山":{"minutes":25,"source":"既存確認済み登り180分から中四阿まで155分を差引","sourceType":"derived-verified"},
"四阿山→中四阿":{"minutes":55,"source":"YAMAP公開モデル・四阿山→中四阿","sourceType":"yamap"},
"中四阿→菅平牧場登山口":{"minutes":80,"source":"YAMAP公開モデル・中四阿→菅平牧場","sourceType":"yamap"},
"清岳荘登山口→上二股":{"minutes":120,"source":"既存確認済み登り180分から北海道公開上二股→山頂60分を差引","sourceType":"derived-verified"},
"上二股→斜里岳":{"minutes":60,"source":"北海道・斜里岳道立自然公園案内","sourceType":"official"},
"斜里岳→上二股":{"minutes":30,"source":"北海道・斜里岳道立自然公園案内","sourceType":"official"},
"上二股→清岳荘登山口":{"minutes":100,"source":"既存確認済み下り130分から公開山頂→上二股30分を差引","sourceType":"derived-verified"},
"かいもん山麓ふれあい公園駐車場・開聞岳登山口アクセス→五合目展望所（開聞岳）":{"minutes":115,"source":"YAMAP公開モデル・ふれあい公園側→五合目チェックポイント","sourceType":"yamap"},
"五合目展望所（開聞岳）→開聞岳":{"minutes":80,"source":"既存確認済み登り195分から五合目まで115分を差引","sourceType":"derived-verified"},
"開聞岳→五合目展望所（開聞岳）":{"minutes":60,"source":"YAMAP公開モデル・山頂→仙人洞→五合目","sourceType":"yamap"},
"五合目展望所（開聞岳）→かいもん山麓ふれあい公園駐車場・開聞岳登山口アクセス":{"minutes":53,"source":"既存確認済み下り113分から山頂→五合目60分を差引","sourceType":"derived-verified"},
"伊吹山ドライブウェイ山頂駐車場→西登山道中間分岐（伊吹山）":{"minutes":29,"source":"YAMAP現行西登山道モデル・山頂駐車場→中間分岐","sourceType":"yamap"},
"西登山道中間分岐（伊吹山）→伊吹山":{"minutes":22,"source":"YAMAP現行西登山道モデル・中間分岐→山頂","sourceType":"yamap"},
"伊吹山→西登山道中間分岐（伊吹山）":{"minutes":20,"source":"YAMAP現行西登山道往復モデル・山頂→分岐","sourceType":"yamap"},
"西登山道中間分岐（伊吹山）→伊吹山ドライブウェイ山頂駐車場":{"minutes":20,"source":"YAMAP現行西登山道往復71分から他3区間を差引","sourceType":"derived-verified"},
"鳩待峠→小至仏山":{"minutes":128,"source":"既存確認済み登り173分から公開小至仏→至仏45分を差引","sourceType":"derived-verified"},
"小至仏山→至仏山":{"minutes":45,"source":"YAMAP公開モデル・小至仏山→至仏山","sourceType":"yamap"},
"至仏山→小至仏山":{"minutes":20,"source":"YAMAP公開モデル・至仏山→小至仏山","sourceType":"yamap"},
"小至仏山→鳩待峠":{"minutes":91,"source":"既存確認済み下り111分から公開至仏→小至仏20分を差引","sourceType":"derived-verified"},
"小田越登山口→五合目 御金蔵":{"minutes":110,"source":"YAMAP小田越モデルの公開チェックポイントを小田越起点へ整理","sourceType":"derived-verified"},
"五合目 御金蔵→早池峰山":{"minutes":50,"source":"公開小田越コース往路160分から五合目まで110分を差引","sourceType":"derived-verified"},
"早池峰山→五合目 御金蔵":{"minutes":90,"source":"YAMAP小田越モデル・山頂→分岐群→五合目","sourceType":"yamap"},
"五合目 御金蔵→小田越登山口":{"minutes":40,"source":"公開小田越コース復路130分から山頂→五合目90分を差引","sourceType":"derived-verified"},
"北谷登山口駐車場・北谷登山口→祖母山九合目小屋":{"minutes":133,"source":"既存確認済み北谷→祖母山155分から既存確認済み九合目小屋→山頂22分を差引","sourceType":"derived-verified"},
"祖母山九合目小屋→祖母山":{"minutes":22,"source":"既存確認済み公開CT・祖母山九合目小屋→祖母山","sourceType":"yamap"},
"祖母山→祖母山九合目小屋":{"minutes":22,"source":"山頂直下同一区間の既存確認済み値を往復代表区間として採用","sourceType":"derived-verified"},
"祖母山九合目小屋→北谷登山口駐車場・北谷登山口":{"minutes":105,"source":"既存確認済み下り127分から山頂直下22分を差引","sourceType":"derived-verified"},
"筑波山神社入口→東屋（弁慶茶屋跡）":{"minutes":149,"source":"既存確認済み神社→女体166分からYAMAP弁慶茶屋跡→女体17分を差引","sourceType":"derived-verified"},
"東屋（弁慶茶屋跡）→筑波山（女体山）":{"minutes":17,"source":"YAMAP御幸ヶ原・白雲橋周回モデル","sourceType":"yamap"},
"筑波山（女体山）→筑波山（男体山）":{"minutes":49,"source":"YAMAP公開モデル・女体→分岐13＋男体36","sourceType":"yamap"},
"筑波山（男体山）→筑波山神社入口":{"minutes":62,"source":"YAMAP公開モデル・男体→標高602m55＋登山口7","sourceType":"yamap"},
"土小屋登山口→二ノ鎖元小屋":{"minutes":128,"source":"YAMAP石鎚山土小屋ルート","sourceType":"yamap"},
"二ノ鎖元小屋→石鎚山（弥山）":{"minutes":13,"source":"YAMAP土小屋モデル・二ノ鎖元小屋→分岐6＋弥山7","sourceType":"yamap"},
"石鎚山（弥山）→二ノ鎖元小屋":{"minutes":19,"source":"YAMAP土小屋モデル・弥山→分岐15＋二ノ鎖元小屋4","sourceType":"yamap"},
"二ノ鎖元小屋→土小屋登山口":{"minutes":115,"source":"YAMAP石鎚山土小屋ルート","sourceType":"yamap"},
"八甲田ロープウェー山頂公園駅→大岳避難小屋（八甲田）":{"minutes":133,"source":"既存確認済み登り148分から大岳避難小屋→大岳15分を差引","sourceType":"derived-verified"},
"大岳避難小屋（八甲田）→八甲田山（大岳）":{"minutes":15,"source":"公開八甲田モデル・大岳避難小屋→大岳","sourceType":"guide"},
"八甲田山（大岳）→大岳避難小屋（八甲田）":{"minutes":10,"source":"公開八甲田モデル・大岳→大岳避難小屋","sourceType":"guide"},
"大岳避難小屋（八甲田）→八甲田ロープウェー山頂公園駅":{"minutes":110,"source":"既存確認済み下り120分から山頂→避難小屋10分を差引","sourceType":"derived-verified"},
"天城高原ハイカー専用駐車場→万二郎岳（天城山）":{"minutes":81,"source":"YAMAP往復モデル・08:00→09:21","sourceType":"yamap"},
"万二郎岳（天城山）→石楠立":{"minutes":40,"source":"YAMAP往復モデル・09:21→10:01","sourceType":"yamap"},
"石楠立→天城山（万三郎岳）":{"minutes":35,"source":"YAMAP往復モデル","sourceType":"yamap"},
"天城山（万三郎岳）→石楠立":{"minutes":35,"source":"YAMAP往復モデル","sourceType":"yamap"},
"石楠立→万二郎岳（天城山）":{"minutes":50,"source":"YAMAP往復モデル・11:11→12:01","sourceType":"yamap"},
"万二郎岳（天城山）→天城高原ハイカー専用駐車場":{"minutes":71,"source":"YAMAP往復モデル・12:01→13:12","sourceType":"yamap"},
"仙酔峡駐車場→仙酔分かれ":{"minutes":135,"source":"既存V1.5.47確認済みYAMAP周回CT","sourceType":"yamap"},
"仙酔分かれ→阿蘇山（高岳）":{"minutes":8,"source":"既存V1.5.47確認済みYAMAP周回CT","sourceType":"yamap"},
"阿蘇山（高岳）→高岳・中岳・月見小屋分岐":{"minutes":15,"source":"既存V1.5.47確認済みYAMAP周回CT","sourceType":"yamap"},
"高岳・中岳・月見小屋分岐→阿蘇山（中岳）":{"minutes":25,"source":"既存V1.5.47確認済みYAMAP周回CT","sourceType":"yamap"},
"阿蘇山（中岳）→馬の背（阿蘇）":{"minutes":6,"source":"既存V1.5.47確認済みYAMAP周回CT","sourceType":"yamap"},
"馬の背（阿蘇）→火口東展望所":{"minutes":23,"source":"既存V1.5.47確認済みYAMAP周回CT","sourceType":"yamap"},
"火口東展望所→すずめ岩分岐":{"minutes":40,"source":"既存V1.5.47確認済みYAMAP周回CT","sourceType":"yamap"},
"すずめ岩分岐→仙酔峡駐車場":{"minutes":40,"source":"既存V1.5.47確認済みYAMAP周回CT","sourceType":"yamap"},
"菅沼登山口→弥陀ヶ池":{"minutes":111,"source":"YAMAP菅沼-弥陀ヶ池モデル・分岐105＋弥陀ヶ池6","sourceType":"yamap"},
"弥陀ヶ池→奥白根山（日光白根山）":{"minutes":64,"source":"既存確認済み登り175分から菅沼→弥陀ヶ池111分を差引","sourceType":"derived-verified"},
"奥白根山（日光白根山）→弥陀ヶ池":{"minutes":79,"source":"YAMAP公開モデル・日光白根山→弥陀ヶ池（公開チェックポイント合算）","sourceType":"yamap"},
"弥陀ヶ池→菅沼登山口":{"minutes":75,"source":"YAMAP弥陀ヶ池往復モデル・弥陀ヶ池→菅沼側分岐75分","sourceType":"yamap"},
"奥岳登山口・あだたら山ロープウェイ→薬師岳（安達太良）":{"minutes":98,"source":"YAMAP公開モデル・奥岳登山口→薬師岳","sourceType":"yamap"},
"薬師岳（安達太良）→安達太良山":{"minutes":98,"source":"YAMAP公開モデル・薬師岳→安達太良山","sourceType":"yamap"},
"安達太良山→薬師岳（安達太良）":{"minutes":78,"source":"YAMAP公開モデル・安達太良山→薬師岳","sourceType":"yamap"},
"薬師岳（安達太良）→奥岳登山口・あだたら山ロープウェイ":{"minutes":19,"source":"YAMAP公開モデル・薬師岳→奥岳登山口","sourceType":"yamap"},
"大弛峠→朝日峠（奥秩父）":{"minutes":45,"source":"既存V1.5.48確認済みYAMAP CT","sourceType":"yamap"},
"朝日峠（奥秩父）→朝日岳（奥秩父）":{"minutes":35,"source":"既存V1.5.48確認済みYAMAP CT","sourceType":"yamap"},
"朝日岳（奥秩父）→金峰山":{"minutes":44,"source":"既存V1.5.48確認済みYAMAP CT","sourceType":"yamap"},
"金峰山→朝日岳（奥秩父）":{"minutes":30,"source":"既存確認済み下り105分から朝日岳→朝日峠35＋朝日峠→大弛40を差引","sourceType":"derived-verified"},
"朝日岳（奥秩父）→朝日峠（奥秩父）":{"minutes":35,"source":"既存V1.5.48確認済みYAMAP CT","sourceType":"yamap"},
"朝日峠（奥秩父）→大弛峠":{"minutes":40,"source":"既存V1.5.48確認済みYAMAP CT","sourceType":"yamap"},
"上日川峠→福ちゃん荘":{"minutes":30,"source":"公開大菩薩モデル・上日川峠→福ちゃん荘","sourceType":"guide"},
"福ちゃん荘→雷岩":{"minutes":82,"source":"既存確認済み登り122分から福ちゃん荘30分・雷岩→山頂10分を差引","sourceType":"derived-verified"},
"雷岩→大菩薩嶺":{"minutes":10,"source":"公開大菩薩モデル・雷岩→山頂","sourceType":"guide"},
"大菩薩嶺→雷岩":{"minutes":10,"source":"公開大菩薩モデル・山頂→雷岩","sourceType":"guide"},
"雷岩→福ちゃん荘":{"minutes":40,"source":"既存確認済み下り74分から山頂→雷岩10分・福ちゃん荘→上日川24分を差引","sourceType":"derived-verified"},
"福ちゃん荘→上日川峠":{"minutes":24,"source":"既存確認済み下り側の公開近接区間を整合","sourceType":"derived-verified"},
"黒檜山登山口→赤城山（黒檜山）":{"minutes":97,"source":"YAMAP黒檜山・駒ヶ岳周回モデル","sourceType":"yamap"},
"赤城山（黒檜山）→駒ヶ岳（赤城）":{"minutes":64,"source":"YAMAP黒檜山・駒ヶ岳周回モデル","sourceType":"yamap"},
"駒ヶ岳（赤城）→おのこ駐車場・駒ヶ岳登山口":{"minutes":39,"source":"YAMAP黒檜山・駒ヶ岳周回モデル","sourceType":"yamap"},
"おのこ駐車場・駒ヶ岳登山口→黒檜山登山口":{"minutes":15,"source":"大沼湖畔登山口間の公開歩行接続目安","sourceType":"guide"},
"畳平バスターミナル→肩ノ小屋（乗鞍岳）":{"minutes":39,"source":"YAMAP乗鞍岳畳平モデル","sourceType":"yamap"},
"肩ノ小屋（乗鞍岳）→乗鞍岳":{"minutes":62,"source":"YAMAP公開モデル・肩ノ小屋→剣ヶ峰口45ほか合算","sourceType":"yamap"},
"乗鞍岳→肩ノ小屋（乗鞍岳）":{"minutes":45,"source":"YAMAP乗鞍岳畳平モデル","sourceType":"yamap"},
"肩ノ小屋（乗鞍岳）→畳平バスターミナル":{"minutes":28,"source":"YAMAP乗鞍岳畳平モデル","sourceType":"yamap"},
"韓国岳登山口→霧島山（韓国岳）":{"minutes":90,"source":"環境省・韓国岳大浪池登山コース","sourceType":"official"},
"霧島山（韓国岳）→韓国岳避難小屋":{"minutes":50,"source":"環境省・韓国岳大浪池登山コース","sourceType":"official"},
"韓国岳避難小屋→大浪池休憩所":{"minutes":50,"source":"環境省・韓国岳大浪池登山コース","sourceType":"official"},
"大浪池休憩所→県境登山口":{"minutes":90,"source":"環境省・韓国岳大浪池登山コース","sourceType":"official"},
"県境登山口→えびのエコミュージアムセンター":{"minutes":10,"source":"環境省・韓国岳大浪池登山コース","sourceType":"official"},
"峠の茶屋・那須岳登山口→峰の茶屋跡避難小屋":{"minutes":50,"source":"YAMAP公開モデル・峠の茶屋→峰の茶屋跡避難小屋","sourceType":"yamap"},
"峰の茶屋跡避難小屋→茶臼岳（那須岳）":{"minutes":51,"source":"既存確認済み登り101分から登山口→峰の茶屋50分を差引","sourceType":"derived-verified"},
"茶臼岳（那須岳）→峰の茶屋跡避難小屋":{"minutes":27,"source":"既存確認済み下り62分から峰の茶屋→登山口35分を差引","sourceType":"derived-verified"},
"峰の茶屋跡避難小屋→峠の茶屋・那須岳登山口":{"minutes":35,"source":"YAMAP公開モデル・峰の茶屋跡→峠の茶屋","sourceType":"yamap"},
"岩木山八合目→鳳鳴ヒュッテ":{"minutes":60,"source":"既存確認済み登り86分から鳳鳴ヒュッテ→山頂26分を差引","sourceType":"derived-verified"},
"鳳鳴ヒュッテ→岩木山":{"minutes":26,"source":"公開岩木山八合目モデル・鳳鳴ヒュッテ→山頂","sourceType":"guide"},
"岩木山→鳳鳴ヒュッテ":{"minutes":20,"source":"公開岩木山八合目モデル・山頂→鳳鳴ヒュッテ","sourceType":"guide"},
"鳳鳴ヒュッテ→岩木山八合目":{"minutes":29,"source":"既存確認済み下り49分から山頂→鳳鳴ヒュッテ20分を差引","sourceType":"derived-verified"},
"山本小屋ふる里館・町営駐車場→美しの塔":{"minutes":15,"source":"信州山学ガイド・山本小屋→美しの塔","sourceType":"guide"},
"美しの塔→美ヶ原（王ヶ頭）":{"minutes":25,"source":"信州山学ガイド・美しの塔→王ヶ頭","sourceType":"guide"},
"美ヶ原（王ヶ頭）→美しの塔":{"minutes":15,"source":"信州山学ガイド・王ヶ頭→美しの塔","sourceType":"guide"},
"美しの塔→山本小屋ふる里館・町営駐車場":{"minutes":15,"source":"信州山学ガイド・美しの塔→山本小屋","sourceType":"guide"},
"蔵王ロープウェイ地蔵山頂駅→ワサ小屋跡":{"minutes":35,"source":"YAMAP公開モデル・地蔵山頂駅→ワサ小屋跡","sourceType":"yamap"},
"ワサ小屋跡→蔵王山（熊野岳）":{"minutes":25,"source":"既存確認済み登り60分から地蔵駅→ワサ35分を差引","sourceType":"derived-verified"},
"蔵王山（熊野岳）→ワサ小屋跡":{"minutes":23,"source":"YAMAP公開モデル・熊野岳→ワサ小屋跡","sourceType":"yamap"},
"ワサ小屋跡→蔵王ロープウェイ地蔵山頂駅":{"minutes":12,"source":"既存確認済み下り35分から熊野岳→ワサ23分を差引","sourceType":"derived-verified"},
"車山肩→霧ヶ峰（車山）":{"minutes":45,"source":"YAMAP車山肩周回・肩バス停→車山","sourceType":"yamap"},
"霧ヶ峰（車山）→車山乗越":{"minutes":29,"source":"YAMAP車山肩周回モデル","sourceType":"yamap"},
"車山乗越→蝶々深山":{"minutes":25,"source":"YAMAP車山肩周回モデル","sourceType":"yamap"},
"蝶々深山→コロボックルヒュッテ":{"minutes":25,"source":"YAMAP車山肩周回モデル","sourceType":"yamap"},
"コロボックルヒュッテ→車山肩":{"minutes":5,"source":"YAMAP車山肩周回モデル","sourceType":"yamap"},
"大台ヶ原ビジターセンター→日出ヶ岳展望台下分岐":{"minutes":33,"source":"既存確認済み登り40分から展望台直下→山頂7分を差引","sourceType":"derived-verified"},
"日出ヶ岳展望台下分岐→日出ヶ岳":{"minutes":7,"source":"公開東大台モデル・展望台直下→日出ヶ岳","sourceType":"guide"},
"日出ヶ岳→日出ヶ岳展望台下分岐":{"minutes":7,"source":"公開東大台モデル・日出ヶ岳→展望台直下","sourceType":"guide"},
"日出ヶ岳展望台下分岐→大台ヶ原ビジターセンター":{"minutes":21,"source":"既存確認済み下り28分から山頂直下7分を差引","sourceType":"derived-verified"},
"八幡平見返峠・山頂レストハウス→鏡池・見返峠分岐":{"minutes":16,"source":"YAMAP八幡平山頂周回（駐車場6＋分岐10）","sourceType":"yamap"},
"鏡池・見返峠分岐→めがね沼":{"minutes":8,"source":"YAMAP八幡平山頂周回","sourceType":"yamap"},
"めがね沼→八幡平":{"minutes":9,"source":"YAMAP八幡平山頂周回（めがね沼→分岐1＋山頂8）","sourceType":"yamap"},
"八幡平→見返峠":{"minutes":18,"source":"YAMAP八幡平山頂周回（山頂→ガマ沼分岐10＋見返峠8）","sourceType":"yamap"},
"見返峠→鏡池・見返峠分岐":{"minutes":6,"source":"YAMAP八幡平山頂周回","sourceType":"yamap"},
"鏡池・見返峠分岐→八幡平見返峠・山頂レストハウス":{"minutes":6,"source":"YAMAP八幡平山頂周回","sourceType":"yamap"},
});
try{if(typeof directCourseTimeInfoByNames==='function'){const o=directCourseTimeInfoByNames;directCourseTimeInfoByNames=function(a,b){return T[`${String(a||'').trim()}→${String(b||'').trim()}`]||o(a,b);};}}catch(_){ }
try{if(typeof courseTimeInfo==='function'){const o=courseTimeInfo;courseTimeInfo=function(a,b){return T[`${String(a?.name||'').trim()}→${String(b?.name||'').trim()}`]||o(a,b);};}}catch(_){ }
const R=Object.freeze({
"雄阿寒岳":{"label":"滝口・五合目ルート","points":[["trailhead","滝口・雄阿寒岳登山口","登山口"],["waypoint","五合目（雄阿寒岳）","通過ポイント"],["peak","雄阿寒岳","山頂"],["waypoint","五合目（雄阿寒岳）","通過ポイント"],["trailhead","滝口・雄阿寒岳登山口","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"苗場山":{"label":"小赤沢・坪場ルート","points":[["trailhead","小赤沢三合目登山口","登山口"],["peak","五合目（苗場山）","通過ピーク"],["waypoint","九合目坪場","通過ポイント"],["peak","苗場山","山頂"],["waypoint","九合目坪場","通過ポイント"],["peak","五合目（苗場山）","通過ピーク"],["trailhead","小赤沢三合目登山口","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"月山":{"label":"姥沢・牛首ルート","points":[["trailhead","姥沢 月山リフト","登山口"],["peak","牛首（月山）","通過ピーク"],["peak","月山","山頂"],["peak","牛首（月山）","通過ピーク"],["trailhead","姥沢 月山リフト","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"焼岳":{"label":"新中の湯・下堀沢出合ルート","points":[["trailhead","新中の湯登山口","登山口"],["waypoint","下堀沢出合","通過ポイント"],["peak","焼岳","山頂"],["waypoint","下堀沢出合","通過ポイント"],["trailhead","新中の湯登山口","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"四阿山":{"label":"菅平牧場・中四阿ルート","points":[["trailhead","菅平牧場登山口","登山口"],["waypoint","中四阿","通過ポイント"],["peak","四阿山","山頂"],["waypoint","中四阿","通過ポイント"],["trailhead","菅平牧場登山口","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"斜里岳":{"label":"清岳荘・上二股ルート","points":[["trailhead","清岳荘登山口","登山口"],["pass","上二股","峠・分岐"],["peak","斜里岳","山頂"],["pass","上二股","峠・分岐"],["trailhead","清岳荘登山口","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"開聞岳":{"label":"ふれあい公園・五合目ルート","points":[["trailhead","かいもん山麓ふれあい公園駐車場・開聞岳登山口アクセス","登山口"],["waypoint","五合目展望所（開聞岳）","通過ポイント"],["peak","開聞岳","山頂"],["waypoint","五合目展望所（開聞岳）","通過ポイント"],["trailhead","かいもん山麓ふれあい公園駐車場・開聞岳登山口アクセス","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"伊吹山":{"label":"山頂駐車場・西登山道ルート（麓側入山禁止中）","points":[["trailhead","伊吹山ドライブウェイ山頂駐車場","登山口"],["pass","西登山道中間分岐（伊吹山）","峠・分岐"],["peak","伊吹山","山頂"],["pass","西登山道中間分岐（伊吹山）","峠・分岐"],["trailhead","伊吹山ドライブウェイ山頂駐車場","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"至仏山":{"label":"鳩待峠・小至仏山ルート","points":[["pass","鳩待峠","峠・分岐"],["peak","小至仏山","通過ピーク"],["peak","至仏山","山頂"],["peak","小至仏山","通過ピーク"],["pass","鳩待峠","峠・分岐"]],"source":"V1.5.85 C30 enrichment","verified":true},
"早池峰山":{"label":"小田越・五合目御金蔵ルート","points":[["trailhead","小田越登山口","登山口"],["waypoint","五合目 御金蔵","通過ポイント"],["peak","早池峰山","山頂"],["waypoint","五合目 御金蔵","通過ポイント"],["trailhead","小田越登山口","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"祖母山":{"label":"北谷・九合目小屋ルート","points":[["trailhead","北谷登山口駐車場・北谷登山口","登山口"],["hut","祖母山九合目小屋","山小屋"],["peak","祖母山","山頂"],["hut","祖母山九合目小屋","山小屋"],["trailhead","北谷登山口駐車場・北谷登山口","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"筑波山":{"label":"御幸ヶ原・双耳峰ルート","points":[["trailhead","筑波山神社入口","登山口"],["waypoint","東屋（弁慶茶屋跡）","通過ポイント"],["peak","筑波山（女体山）","山頂"],["peak","筑波山（男体山）","通過ピーク"],["trailhead","筑波山神社入口","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"石鎚山":{"label":"土小屋・二ノ鎖元小屋ルート","points":[["hut","土小屋登山口","山小屋"],["hut","二ノ鎖元小屋","山小屋"],["peak","石鎚山（弥山）","山頂"],["hut","二ノ鎖元小屋","山小屋"],["hut","土小屋登山口","山小屋"]],"source":"V1.5.85 C30 enrichment","verified":true},
"八甲田山":{"label":"山頂公園駅・大岳避難小屋ルート","points":[["trailhead","八甲田ロープウェー山頂公園駅","登山口"],["hut","大岳避難小屋（八甲田）","山小屋"],["peak","八甲田山（大岳）","山頂"],["hut","大岳避難小屋（八甲田）","山小屋"],["trailhead","八甲田ロープウェー山頂公園駅","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"天城山（万三郎岳）":{"label":"天城高原・万二郎・石楠立ルート","points":[["trailhead","天城高原ハイカー専用駐車場","登山口"],["peak","万二郎岳（天城山）","通過ピーク"],["waypoint","石楠立","通過ポイント"],["peak","天城山（万三郎岳）","山頂"],["waypoint","石楠立","通過ポイント"],["peak","万二郎岳（天城山）","通過ピーク"],["trailhead","天城高原ハイカー専用駐車場","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"阿蘇山（高岳）":{"label":"仙酔峡・高岳中岳周回ルート","points":[["trailhead","仙酔峡駐車場","登山口"],["waypoint","仙酔分かれ","通過ポイント"],["peak","阿蘇山（高岳）","山頂"],["pass","高岳・中岳・月見小屋分岐","峠・分岐"],["peak","阿蘇山（中岳）","通過ピーク"],["waypoint","馬の背（阿蘇）","通過ポイント"],["waypoint","火口東展望所","通過ポイント"],["pass","すずめ岩分岐","峠・分岐"],["trailhead","仙酔峡駐車場","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"奥白根山":{"label":"菅沼・弥陀ヶ池ルート","points":[["trailhead","菅沼登山口","登山口"],["waypoint","弥陀ヶ池","通過ポイント"],["peak","奥白根山（日光白根山）","山頂"],["waypoint","弥陀ヶ池","通過ポイント"],["trailhead","菅沼登山口","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"安達太良山":{"label":"奥岳・薬師岳ルート","points":[["trailhead","奥岳登山口・あだたら山ロープウェイ","登山口"],["waypoint","薬師岳（安達太良）","通過ポイント"],["peak","安達太良山","山頂"],["waypoint","薬師岳（安達太良）","通過ポイント"],["trailhead","奥岳登山口・あだたら山ロープウェイ","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"金峰山":{"label":"大弛峠・朝日岳ルート","points":[["pass","大弛峠","峠・分岐"],["pass","朝日峠（奥秩父）","峠・分岐"],["waypoint","朝日岳（奥秩父）","通過ポイント"],["peak","金峰山","山頂"],["waypoint","朝日岳（奥秩父）","通過ポイント"],["pass","朝日峠（奥秩父）","峠・分岐"],["pass","大弛峠","峠・分岐"]],"source":"V1.5.85 C30 enrichment","verified":true},
"大菩薩嶺":{"label":"上日川峠・福ちゃん荘・雷岩ルート","points":[["pass","上日川峠","峠・分岐"],["hut","福ちゃん荘","山小屋"],["waypoint","雷岩","通過ポイント"],["peak","大菩薩嶺","山頂"],["waypoint","雷岩","通過ポイント"],["hut","福ちゃん荘","山小屋"],["pass","上日川峠","峠・分岐"]],"source":"V1.5.85 C30 enrichment","verified":true},
"赤城山（黒檜山）":{"label":"黒檜山・駒ヶ岳周回ルート","points":[["trailhead","黒檜山登山口","登山口"],["peak","赤城山（黒檜山）","山頂"],["waypoint","駒ヶ岳（赤城）","通過ポイント"],["peak","おのこ駐車場・駒ヶ岳登山口","通過ピーク"],["trailhead","黒檜山登山口","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"乗鞍岳":{"label":"畳平・肩ノ小屋ルート","points":[["trailhead","畳平バスターミナル","登山口"],["hut","肩ノ小屋（乗鞍岳）","山小屋"],["peak","乗鞍岳","山頂"],["hut","肩ノ小屋（乗鞍岳）","山小屋"],["trailhead","畳平バスターミナル","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"霧島山（韓国岳）":{"label":"韓国岳・大浪池周回ルート","points":[["trailhead","韓国岳登山口","登山口"],["peak","霧島山（韓国岳）","山頂"],["hut","韓国岳避難小屋","山小屋"],["waypoint","大浪池休憩所","通過ポイント"],["peak","県境登山口","通過ピーク"],["trailhead","えびのエコミュージアムセンター","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"茶臼岳（那須岳）":{"label":"峠の茶屋・峰の茶屋跡ルート","points":[["pass","峠の茶屋・那須岳登山口","峠・分岐"],["hut","峰の茶屋跡避難小屋","山小屋"],["peak","茶臼岳（那須岳）","山頂"],["hut","峰の茶屋跡避難小屋","山小屋"],["pass","峠の茶屋・那須岳登山口","峠・分岐"]],"source":"V1.5.85 C30 enrichment","verified":true},
"岩木山":{"label":"八合目・鳳鳴ヒュッテルート","points":[["trailhead","岩木山八合目","登山口"],["hut","鳳鳴ヒュッテ","山小屋"],["peak","岩木山","山頂"],["hut","鳳鳴ヒュッテ","山小屋"],["trailhead","岩木山八合目","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"美ヶ原":{"label":"山本小屋・美しの塔ルート","points":[["hut","山本小屋ふる里館・町営駐車場","山小屋"],["waypoint","美しの塔","通過ポイント"],["peak","美ヶ原（王ヶ頭）","山頂"],["waypoint","美しの塔","通過ポイント"],["hut","山本小屋ふる里館・町営駐車場","山小屋"]],"source":"V1.5.85 C30 enrichment","verified":true},
"蔵王山（熊野岳）":{"label":"地蔵山頂駅・ワサ小屋跡ルート","points":[["trailhead","蔵王ロープウェイ地蔵山頂駅","登山口"],["hut","ワサ小屋跡","山小屋"],["peak","蔵王山（熊野岳）","山頂"],["hut","ワサ小屋跡","山小屋"],["trailhead","蔵王ロープウェイ地蔵山頂駅","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"霧ヶ峰（車山）":{"label":"車山肩・蝶々深山周回ルート","points":[["trailhead","車山肩","登山口"],["peak","霧ヶ峰（車山）","山頂"],["pass","車山乗越","峠・分岐"],["peak","蝶々深山","通過ピーク"],["hut","コロボックルヒュッテ","山小屋"],["trailhead","車山肩","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"日出ヶ岳":{"label":"大台ヶ原・日出ヶ岳展望台ルート","points":[["trailhead","大台ヶ原ビジターセンター","登山口"],["pass","日出ヶ岳展望台下分岐","峠・分岐"],["peak","日出ヶ岳","山頂"],["pass","日出ヶ岳展望台下分岐","峠・分岐"],["trailhead","大台ヶ原ビジターセンター","下山口"]],"source":"V1.5.85 C30 enrichment","verified":true},
"八幡平":{"label":"山頂レストハウス・めがね沼周回ルート","points":[["pass","八幡平見返峠・山頂レストハウス","峠・分岐"],["pass","鏡池・見返峠分岐","峠・分岐"],["waypoint","めがね沼","通過ポイント"],["peak","八幡平","山頂"],["pass","見返峠","峠・分岐"],["pass","鏡池・見返峠分岐","峠・分岐"],["pass","八幡平見返峠・山頂レストハウス","峠・分岐"]],"source":"V1.5.85 C30 enrichment","verified":true},
});
for(const r of Object.values(R)){if(Array.isArray(r?.points)&&r.points.length){r.points[0][0]='trailhead';r.points[0][2]='登山口';r.points[r.points.length-1][0]='trailhead';r.points[r.points.length-1][2]='下山口';}}
if(typeof representativeCourseOptions==='function'){const o=representativeCourseOptions;representativeCourseOptions=function(mountain){let k=String(mountain||'').trim();try{k=canonicalMountainName(k);}catch(_){}const opts=o(mountain)||[];const r=R[k];if(!r)return opts;return [r,...opts.filter(c=>c?.label!==r.label)];};}

// V1.5.85 routes own their adjacent CT table. The core builder's lexical CT binding can
// bypass later overlay wrappers in some browsers, so build these verified routes explicitly.
try{
  if(typeof buildRepresentativeResolvedRoute==='function'){
    const origBuild=buildRepresentativeResolvedRoute;
    buildRepresentativeResolvedRoute=function(mountain,course){
      if(course?.source!=='V1.5.85 C30 enrichment') return origBuild(mountain,course);
      const defs=typeof representativeCourseExpandedPointDefs==='function'
        ? representativeCourseExpandedPointDefs(mountain,course)
        : (Array.isArray(course?.points)?course.points:[]);
      const fixedFor=FIXED[String(mountain||'').trim()]||[];
      const resolved=defs.map(([type,name,role])=>({type,name,role,p:representativeCandidate(type,name,mountain)||fixedFor.find(x=>x.name===name)||null}));
      const segments=[];
      for(let i=1;i<resolved.length;i++){
        const a=resolved[i-1],b=resolved[i];
        if(!a.p||!b.p)return {error:`${a.name} → ${b.name} の地点座標を解決できません。`};
        const key=`${String(a.name||'').trim()}→${String(b.name||'').trim()}`;
        const info=T[key] || courseTimeInfo(a.p,b.p);
        if(!info)return {error:`${a.name} → ${b.name} の確認済みCTがありません。`};
        segments.push(info);
      }
      return {resolved,segments,distributedPointCount:0};
    };
  }
}catch(_){ }

window.TRATEN_HYAKU_ENRICHMENT_V1585=Object.freeze({count:30,mountains:Object.freeze(Object.keys(R)),policy:'public-checkpoint-or-derived-verified / no geometric CT estimation',ibukiSafety:'2026: 米原市側麓から入山禁止。代表を山頂駐車場ルートへ変更'});
})();