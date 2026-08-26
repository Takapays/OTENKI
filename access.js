(() => {
  'use strict';

  const BASE_ACCESS_DB = {
    '折立': {
      area:'北アルプス・薬師岳／雲ノ平方面', prefecture:'富山県富山市',
      nearestIC:'立山IC', drive:'約1時間20〜30分', parking:'約300台・無料', transit:'富山駅から夏山バス（季節運行）',
      roadNote:'有峰林道を利用。通行時間・料金・当日の規制を要確認。',
      car:[
        ['立山IC','立山IC → 亀谷ゲート → 有峰林道 → 折立','約50km前後','約1時間20〜30分'],
        ['富山IC','富山IC → 大山方面 → 亀谷ゲート → 折立','約55〜60km','約1時間30分'],
        ['飛騨清見IC','高山 → 神岡 → 東谷ゲート → 折立','約110km前後','約2時間30分〜3時間']
      ],
      transitRows:[
        ['富山駅 → 折立','夏山バス・直通便（季節運行）','約1時間40分'],
        ['電鉄富山 → 有峰口 → 折立','富山地方鉄道＋バス','約2時間〜'],
        ['折立 → 富山駅','下山後の直通便あり（運行日要確認）','約2時間']
      ],
      tips:['薬師岳往復はマイカーが便利。','雲ノ平・黒部五郎方面への縦走は公共交通と好相性。','早朝出発は有峰林道のゲート時間に注意。'],
      links:[['有峰林道 公式','https://www.arimine.net/'],['富山地方鉄道','https://www.chitetsu.co.jp/']]
    },
    '新穂高温泉': {
      area:'北アルプス・槍ヶ岳／穂高／双六方面', prefecture:'岐阜県高山市',
      nearestIC:'松本IC／飛騨清見IC', drive:'松本ICから約1時間30〜2時間', parking:'周辺に登山者用駐車場あり', transit:'高山・平湯方面から路線バス',
      roadNote:'繁忙期は登山者用駐車場が早朝に満車になることがあります。',
      car:[['松本IC','国道158号 → 安房トンネル → 平湯 → 新穂高','約70km前後','約1時間30分〜2時間'],['飛騨清見IC','高山 → 平湯 → 新穂高','約80km前後','約1時間30分〜2時間']],
      transitRows:[['高山濃飛バスセンター → 新穂高','平湯温泉経由の路線バス','約1時間30分'],['松本 → 平湯温泉 → 新穂高','バス乗継','約2時間〜']],
      tips:['槍ヶ岳・双六岳・笠ヶ岳など西側ルートの大拠点。','縦走で上高地へ抜ける場合は公共交通が便利。'],
      links:[['濃飛バス','https://www.nouhibus.co.jp/'],['新穂高ロープウェイ','https://shinhotaka-ropeway.jp/']]
    },
    '上高地': {
      area:'北アルプス・穂高／槍ヶ岳方面', prefecture:'長野県松本市', nearestIC:'松本IC', drive:'沢渡まで約1時間', parking:'沢渡・平湯に駐車しシャトル利用', transit:'松本・新島々からバス',
      roadNote:'上高地は通年マイカー規制。自家用車は沢渡または平湯で乗換。',
      car:[['松本IC','国道158号 → 沢渡駐車場 → シャトルバス','約40km＋バス','約1時間30分〜'],['高山方面','平湯あかんだな駐車場 → シャトルバス','—','約30分〜（平湯から）']],
      transitRows:[['松本駅 → 新島々 → 上高地','鉄道＋バス','約1時間30分〜2時間'],['高山 → 平湯 → 上高地','路線バス乗継','約1時間30分〜']],
      tips:['マイカーで直接上高地には入れません。','穂高・槍方面の縦走起点として公共交通が使いやすい。'],
      links:[['上高地公式','https://www.kamikochi.or.jp/'],['アルピコ交通','https://www.alpico.co.jp/traffic/']]
    },
    '中房温泉登山口': {
      aliases:['中房温泉'], area:'北アルプス・燕岳方面', prefecture:'長野県安曇野市', nearestIC:'安曇野IC', drive:'約1時間15分〜1時間30分', parking:'登山者用駐車場あり', transit:'穂高駅から季節バス',
      roadNote:'中房線は山岳道路。繁忙期は駐車場満車や交通規制に注意。',
      car:[['安曇野IC','穂高 → 有明 → 中房温泉','約35km前後','約1時間15分〜1時間30分']], transitRows:[['穂高駅 → 中房温泉','季節運行バス','約1時間']], tips:['燕岳・表銀座の代表的登山口。','週末・連休は早い時間帯から混雑しやすい。'], links:[['安曇野市観光協会','https://www.azumino-e-tabi.net/']]
    },
    '一ノ沢登山口': {
      aliases:['一ノ沢'], area:'北アルプス・常念岳方面', prefecture:'長野県安曇野市', nearestIC:'安曇野IC', drive:'約1時間', parking:'登山者用駐車場あり', transit:'穂高駅等からタクシー利用が一般的',
      roadNote:'林道・道路状況は季節や災害で変わるため事前確認推奨。', car:[['安曇野IC','穂高 → 一ノ沢登山口','約30km前後','約1時間']], transitRows:[['穂高駅 → 一ノ沢','タクシー','約40〜50分']], tips:['常念岳往復の定番。','三股へ下山する周回・縦走では車回収に注意。'], links:[['安曇野市観光協会','https://www.azumino-e-tabi.net/']]
    },
    '猿倉': {
      area:'北アルプス・白馬岳方面', prefecture:'長野県白馬村', nearestIC:'安曇野IC／長野IC', drive:'白馬村中心部から約20〜30分', parking:'猿倉周辺（混雑期注意）', transit:'白馬駅・八方から季節バス／タクシー',
      roadNote:'白馬大雪渓方面の代表登山口。道路・バス運行は季節確認。', car:[['安曇野IC','大町 → 白馬 → 猿倉','約70km前後','約1時間30分〜2時間'],['長野IC','長野 → 白馬 → 猿倉','約55km前後','約1時間20分〜']], transitRows:[['白馬駅／八方 → 猿倉','季節バスまたはタクシー','約20〜30分']], tips:['白馬岳大雪渓ルートの起点。','栂池へ下山する縦走なら公共交通が便利。'], links:[['白馬村観光局','https://www.vill.hakuba.nagano.jp/']]
    },
    '栂池自然園': {
      area:'北アルプス・白馬岳／白馬大池方面', prefecture:'長野県小谷村', nearestIC:'安曇野IC／長野IC', drive:'栂池高原まで約1時間30分〜2時間', parking:'栂池高原に駐車場', transit:'白馬駅・南小谷駅からバス＋ゴンドラ等',
      roadNote:'登山口へは栂池ゴンドラ・ロープウェイ等の営業時間に制約されます。', car:[['安曇野IC','大町 → 白馬 → 栂池高原','約80km前後','約1時間45分〜'],['長野IC','長野 → 白馬 → 栂池高原','約60km前後','約1時間30分〜']], transitRows:[['白馬駅 → 栂池高原 → 自然園','バス＋ゴンドラ等','約1時間〜']], tips:['白馬大池経由の白馬岳ルート。','最終便時刻を必ず確認。'], links:[['栂池自然園','https://sizenen.otarimura.com/']]
    },
    '八方池山荘': {
      area:'北アルプス・唐松岳方面', prefecture:'長野県白馬村', nearestIC:'安曇野IC／長野IC', drive:'八方まで約1時間30分〜2時間', parking:'八方周辺に駐車場', transit:'白馬駅→八方＋ゴンドラ・リフト',
      roadNote:'八方アルペンラインの運行時間・天候運休に注意。', car:[['安曇野IC','大町 → 白馬八方','約70km前後','約1時間30分〜2時間']], transitRows:[['白馬駅 → 八方 → 八方池山荘','バス＋ゴンドラ・リフト','約45分〜']], tips:['唐松岳の代表ルート。','ゴンドラ・リフト最終時刻が下山計画を左右します。'], links:[['八方尾根','https://www.happo-one.jp/']]
    },
    'アルプス平': {
      area:'北アルプス・五竜岳方面', prefecture:'長野県白馬村', nearestIC:'安曇野IC／長野IC', drive:'白馬五竜まで約1時間30分〜2時間', parking:'白馬五竜周辺に駐車場', transit:'白馬駅等からバス＋テレキャビン',
      roadNote:'テレキャビンの営業期間・始発終発・天候運休を確認。', car:[['安曇野IC','大町 → 白馬五竜','約65km前後','約1時間30分〜']], transitRows:[['白馬駅 → 白馬五竜 → アルプス平','バス＋テレキャビン','約45分〜']], tips:['五竜岳・唐松岳縦走の主要入口。'], links:[['白馬五竜','https://www.hakubaescal.com/']]
    },
    '室堂': {
      area:'北アルプス・立山／剱岳方面', prefecture:'富山県立山町', nearestIC:'立山IC（立山駅側）', drive:'立山駅まで約40分', parking:'立山駅周辺に駐車場', transit:'立山駅から立山黒部アルペンルート',
      roadNote:'室堂へ一般車は直接入れません。アルペンルートの乗継・最終便に注意。', car:[['立山IC','立山駅 → アルペンルート → 室堂','立山駅まで約25km','約40分＋乗継'],['長野側','扇沢 → アルペンルート → 室堂','—','乗継約1時間30分〜']], transitRows:[['電鉄富山 → 立山 → 室堂','鉄道＋ケーブルカー・バス','約2時間30分〜']], tips:['立山・剱岳の大拠点。','乗車予約・混雑期の時間余裕を確保。'], links:[['立山黒部アルペンルート','https://www.alpen-route.com/']]
    },
    '広河原': {
      area:'南アルプス・北岳／間ノ岳方面', prefecture:'山梨県南アルプス市', nearestIC:'甲府昭和IC／白根IC方面', drive:'芦安等の駐車場まで', parking:'芦安等に駐車しバス・乗合タクシー', transit:'甲府駅・芦安方面から季節バス',
      roadNote:'広河原へはマイカー規制区間あり。一般車は指定駐車場から公共交通へ乗換。', car:[['甲府昭和IC','芦安駐車場 → バス／乗合タクシー → 広河原','—','約1時間30分〜']], transitRows:[['甲府駅 → 広河原','季節バス（運行日確認）','約2時間前後']], tips:['北岳の代表登山口。','奈良田方面への縦走は交通時刻を先に確認。'], links:[['南アルプス市','https://www.city.minami-alps.yamanashi.jp/']]
    },
    '富士スバルライン五合目': {
      aliases:['富士山五合目','スバルライン五合目'], area:'富士山・吉田ルート', prefecture:'山梨県富士河口湖町', nearestIC:'河口湖IC', drive:'約45分〜（規制時除く）', parking:'マイカー規制時は麓で乗換', transit:'富士山駅・河口湖駅等からバス',
      roadNote:'登山シーズンはマイカー規制が実施されるため、指定駐車場からシャトル利用。', car:[['河口湖IC','富士スバルライン方面','約30km前後','約45分〜']], transitRows:[['河口湖駅 → 五合目','登山バス','約50分〜']], tips:['開山期間・登山規制・予約制度を必ず最新確認。'], links:[['富士登山オフィシャルサイト','https://www.fujisan-climb.jp/']]
    },
    '美濃戸口': {
      area:'八ヶ岳・赤岳方面', prefecture:'長野県茅野市', nearestIC:'諏訪南IC', drive:'約30〜40分', parking:'美濃戸口に有料駐車場等', transit:'茅野駅から季節バス',
      roadNote:'美濃戸まで進む道路は未舗装・狭路区間があり、車種・路面状況に注意。', car:[['諏訪南IC','原村 → 美濃戸口','約20km前後','約30〜40分']], transitRows:[['茅野駅 → 美濃戸口','季節バス','約40分']], tips:['赤岳・横岳・硫黄岳の主要入口。','一般車は美濃戸口利用が無難。'], links:[['茅野観光ナビ','https://www.chinotabi.jp/']]
    },
    '天神平': {
      area:'谷川岳', prefecture:'群馬県みなかみ町', nearestIC:'水上IC', drive:'ロープウェイ駅まで約25分', parking:'谷川岳ロープウェイ周辺', transit:'上毛高原駅・水上駅からバス＋ロープウェイ',
      roadNote:'天神平へはロープウェイ利用。営業開始・終了、天候運休を確認。', car:[['水上IC','国道291号 → 谷川岳ロープウェイ','約15km','約25分']], transitRows:[['水上駅 → ロープウェイ駅 → 天神平','バス＋ロープウェイ','約40分〜']], tips:['日帰り谷川岳の定番。','最終ロープウェイ時刻に余裕を持つ。'], links:[['谷川岳ロープウェイ','https://www.tanigawadake-rw.com/']]
    },
    '千畳敷': {
      area:'中央アルプス・木曽駒ヶ岳', prefecture:'長野県駒ヶ根市', nearestIC:'駒ヶ根IC', drive:'菅の台まで約5分', parking:'菅の台バスセンター周辺', transit:'駒ヶ根駅／菅の台→バス＋ロープウェイ',
      roadNote:'しらび平方面はマイカー規制。バスと駒ヶ岳ロープウェイを利用。', car:[['駒ヶ根IC','菅の台バスセンター → バス → しらび平 → ロープウェイ','ICから数km','約5分＋乗継']], transitRows:[['駒ヶ根駅 → 千畳敷','バス＋ロープウェイ','約1時間〜']], tips:['木曽駒ヶ岳の日帰り定番。','繁忙期はバス・ロープウェイ待ち時間を見込む。'], links:[['中央アルプス駒ヶ岳ロープウェイ','https://www.chuo-alps.com/']]
    }
  };

  const ACCESS_DB = Object.assign({}, window.TRATEN_TRAILHEAD_ACCESS_DB || {}, BASE_ACCESS_DB);

  function normalizeName(name){ return String(name||'').replace(/\s+/g,'').replace(/（.*?）/g,'').replace(/\(.*?\)/g,'').replace(/[・･]/g,'・').trim(); }
  function looseName(name){ return normalizeName(name).replace(/^[●○・▶▷\-]+/,'').replace(/(?:登山口|駐車場|駐車スペース|バス停|駅前|停留所)$/,''); }
  function findAccess(name){
    const n=normalizeName(name), ln=looseName(name);
    for(const [key,data] of Object.entries(ACCESS_DB)){
      if(normalizeName(key)===n) return {key,data};
      if((data.aliases||[]).some(a=>normalizeName(a)===n)) return {key,data};
    }
    if(ln.length>=2){
      for(const [key,data] of Object.entries(ACCESS_DB)){
        if(looseName(key)===ln) return {key,data};
        if((data.aliases||[]).some(a=>looseName(a)===ln)) return {key,data};
      }
    }
    return null;
  }
  function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

  function selectedText(select){
    if(!select || !select.value) return '';
    return select.options[select.selectedIndex]?.textContent?.replace(/\s*\/\s*\d+m.*$/,'').trim() || '';
  }

  function makeButton(select){
    if(!select || select.dataset.accessReady==='1') return;
    select.dataset.accessReady='1';
    const wrap=document.createElement('div'); wrap.className='trailhead-select-access';
    select.parentNode.insertBefore(wrap,select); wrap.appendChild(select);
    const btn=document.createElement('button');
    btn.type='button'; btn.className='trailhead-access-btn hidden'; btn.textContent='アクセス';
    btn.setAttribute('aria-label','登山口アクセス情報を表示');
    wrap.appendChild(btn);
    const update=()=>{
      const selected=selectedText(select);
      const hit=findAccess(selected);
      const hasSelection=Boolean(selected);
      btn.classList.toggle('hidden',!hasSelection);
      btn.classList.toggle('is-unavailable',hasSelection&&!hit);
      btn.disabled=hasSelection&&!hit;
      btn.setAttribute('aria-disabled',hasSelection&&!hit?'true':'false');
      btn.dataset.trailhead=hit?.key||'';
      const nextText=hit?'アクセス':'アクセス情報なし';
      if(btn.textContent!==nextText) btn.textContent=nextText;
      btn.title=hit?`${hit.key}のアクセス情報を見る`:(hasSelection?`${selected}のアクセス情報は現在未登録です`:'');
    };
    select._tratenAccessUpdate=update;
    select.addEventListener('change',update);
    btn.addEventListener('click',()=>{ if(btn.dataset.trailhead) openModal(btn.dataset.trailhead); });
    update();
  }

  function rowHtml(r){return `<div class="ta-route"><div class="ta-route-label">${esc(r[0])}</div><div><strong>${esc(r[1])}</strong><div class="ta-meta">${esc(r[2]||'')} ${r[3]?`｜ ${esc(r[3])}`:''}</div></div></div>`;}
  function transitHtml(r){return `<div class="ta-transit"><div class="ta-transit-main"><strong>${esc(r[0])}</strong><span>${esc(r[1])}</span></div><b>${esc(r[2]||'')}</b></div>`;}
  function detailRow(label,value){return `<div class="ta-detail-row"><dt>${esc(label)}</dt><dd>${esc(value||'要公式確認')}</dd></div>`;}
  function infoStatus(data){return (data.links||[]).length ? '固定情報＋公式確認先あり' : '固定情報・最新状況は要公式確認';}
  function facilityText(data,kind){
    if(kind==='toilet') return data.toilet || '設置場所・利用可否は現地／公式情報で確認';
    if(kind==='water') return data.water || '水場・飲用可否は現地／公式情報で確認';
    if(kind==='fee') return data.parkingFee || (/無料/.test(data.parking||'')?'無料の記載あり':'料金・利用条件は現地／公式情報で確認');
    return '要公式確認';
  }
  function ensureCarRows(data,key){
    if((data.car||[]).length) return data.car;
    return [[data.nearestIC||'最寄IC',`${data.nearestIC||'最寄IC'} → ${key}`, '距離は要確認', data.drive||'所要時間は要確認']];
  }
  function ensureTransitRows(data,key){
    if((data.transitRows||[]).length) return data.transitRows;
    return [[`主要駅・バス停 → ${key}`,data.transit||'公共交通情報は要確認','時刻・運行日を公式確認']];
  }

  function ensureModal(){
    if(document.getElementById('trailheadAccessModal')) return;
    const modal=document.createElement('div');
    modal.id='trailheadAccessModal'; modal.className='ta-modal hidden';
    modal.innerHTML=`<div class="ta-backdrop" data-close="1"></div><section class="ta-sheet" role="dialog" aria-modal="true" aria-labelledby="taTitle"><div class="ta-sheet-head"><div><span class="ta-kicker">TRAILHEAD ACCESS</span><h2 id="taTitle"></h2><p id="taSub"></p></div><button type="button" class="ta-close" aria-label="閉じる">×</button></div><div id="taBody" class="ta-body"></div></section>`;
    document.body.appendChild(modal);
    modal.querySelector('.ta-close').addEventListener('click',closeModal);
    modal.querySelector('.ta-backdrop').addEventListener('click',closeModal);
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden')) closeModal();});
  }

  function openModal(name){
    ensureModal();
    const hit=findAccess(name); if(!hit) return;
    const {key,data}=hit, modal=document.getElementById('trailheadAccessModal');
    modal.querySelector('#taTitle').textContent=`${key} 登山口`;
    modal.querySelector('#taSub').textContent=`${data.area||'山域情報'}｜${data.prefecture||'所在地要確認'}`;
    const links=(data.links||[]).map(([label,url])=>`<a class="ta-source" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`).join('');
    const tips=(data.tips||[]).length?data.tips:[`${key}を起点とする山行では、道路規制・駐車場・公共交通の当日情報を出発前に確認してください。`];
    const carRows=ensureCarRows(data,key), transitRows=ensureTransitRows(data,key);
    modal.querySelector('#taBody').innerHTML=`
      <p class="ta-status-note"><b>アクセス情報：</b>${esc(infoStatus(data))}。固定情報を見やすく整理しています。運行時刻・料金・通行止め等の変動情報は出発前に公式情報で確認してください。</p>
      <div class="ta-quick">
        <div><span>最寄IC</span><b>${esc(data.nearestIC||'要確認')}</b></div>
        <div><span>ICから</span><b>${esc(data.drive||'要確認')}</b></div>
        <div><span>駐車場</span><b>${esc(data.parking||'要確認')}</b></div>
        <div><span>公共交通</span><b>${esc(data.transit||'要確認')}</b></div>
        <div><span>駐車料金</span><b>${esc(facilityText(data,'fee'))}</b></div>
        <div><span>情報状態</span><b>${esc((data.links||[]).length?'公式リンクあり':'要公式確認')}</b></div>
      </div>
      <div class="ta-alert"><b>⚠ アクセス注意</b><span>${esc(data.roadNote||'道路・林道・交通機関の最新状況を出発前に確認してください。')}</span></div>
      <div class="ta-grid">
        <article class="ta-card"><header><h3>🚗 車で行く</h3><span>ルート目安</span></header><div class="ta-card-body">${carRows.map(rowHtml).join('')}</div></article>
        <article class="ta-card"><header><h3>🚌 公共交通で行く</h3><span>運行日要確認</span></header><div class="ta-card-body">${transitRows.map(transitHtml).join('')}</div></article>
      </div>
      <div class="ta-detail-grid">
        <article class="ta-card"><header><h3>🅿️ 駐車場・登山口設備</h3></header><div class="ta-card-body ta-detail-list">
          ${detailRow('駐車場',data.parking||'要公式確認')}
          ${detailRow('駐車料金',facilityText(data,'fee'))}
          ${detailRow('トイレ',facilityText(data,'toilet'))}
          ${detailRow('水場・飲料',facilityText(data,'water'))}
        </div></article>
        <article class="ta-card"><header><h3>✅ 出発前チェック</h3><span>当日確認</span></header><div class="ta-confirm">
          <div class="ta-confirm-item"><i>01</i><span>道路・林道の通行止め／冬季閉鎖</span></div>
          <div class="ta-confirm-item"><i>02</i><span>駐車場の満車・予約・マイカー規制</span></div>
          <div class="ta-confirm-item"><i>03</i><span>バス・ロープウェイの運行日／最終便</span></div>
          <div class="ta-confirm-item"><i>04</i><span>火山・登山道・工事等の入山規制</span></div>
        </div></article>
      </div>
      <article class="ta-card ta-tips"><header><h3>📍 登山者向けポイント</h3><span>チャッピーまとめ</span></header><div class="ta-card-body"><ul>${tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div></article>
      <div class="ta-sources"><b>公式確認先：</b>${links || '<span>公式リンク未登録。自治体・観光協会・道路管理者・交通事業者等で最新情報を確認してください。</span>'}</div>
      <p class="ta-fineprint">※ この画面の所要時間・駐車場・交通情報は登山計画の目安です。道路規制、季節バス、料金、駐車場運用、トイレ・水場の利用可否は変わる場合があります。</p>`;
    modal.classList.remove('hidden'); document.body.classList.add('ta-modal-open');
    modal.querySelector('.ta-close').focus();
  }
  function closeModal(){const m=document.getElementById('trailheadAccessModal');if(m){m.classList.add('hidden');document.body.classList.remove('ta-modal-open');}}

  // V1.4.187: 山情報画面は動的に再描画されるため、個別イベントではなく
  // access.js 側の委譲クリックで既存アクセスモーダルを確実に開く。
  document.addEventListener('click',e=>{
    const btn=e.target.closest?.('[data-national-trailhead-access]');
    if(!btn)return;
    e.preventDefault();
    e.stopPropagation();
    const trailhead=btn.dataset.nationalTrailheadAccess||'';
    if(!trailhead)return;
    const hit=findAccess(trailhead);
    if(hit){
      openModal(hit.key);
      return;
    }
    // ボタンを押して無反応に見えないよう、未登録時は明示する。
    if(typeof window.setStatus==='function') window.setStatus(`${trailhead}のアクセス情報は現在未登録です。`,true);
    else window.alert(`${trailhead}のアクセス情報は現在未登録です。`);
  });

  function setButtonVisibility(select,isTrailhead){
    if(!select) return;
    if(isTrailhead) makeButton(select);
    const wrap=select.closest('.trailhead-select-access');
    const btn=wrap?.querySelector('.trailhead-access-btn');
    if(!btn) return;
    if(!isTrailhead){
      btn.classList.add('hidden');
      btn.dataset.trailhead='';
      return;
    }
    if(typeof select._tratenAccessUpdate==='function') select._tratenAccessUpdate();
  }

  function scan(){
    // Legacy / alternate layouts (harmless when absent)
    makeButton(document.getElementById('startTrailhead'));
    makeButton(document.getElementById('endTrailhead'));

    // Traten V1.4.73 current planner rows
    document.querySelectorAll('.point-row').forEach(row=>{
      const typeSel=row.querySelector('.point-type');
      const pointSel=row.querySelector('.point-select');
      if(!typeSel || !pointSel) return;
      setButtonVisibility(pointSel,typeSel.value==='trailhead');
      if(typeSel.dataset.accessWatch!=='1'){
        typeSel.dataset.accessWatch='1';
        typeSel.addEventListener('change',()=>setTimeout(scan,0));
      }
    });

    // Older wizard layout compatibility
    document.querySelectorAll('.wizard-waypoint-select').forEach(sel=>{
      const typeSel=sel.closest('.waypoint-main')?.querySelector('.wizard-waypoint-type');
      setButtonVisibility(sel,typeSel?.value==='trailhead');
      if(typeSel && typeSel.dataset.accessWatch!=='1'){
        typeSel.dataset.accessWatch='1';
        typeSel.addEventListener('change',()=>setTimeout(scan,0));
      }
    });
  }

  function attachRow(row){
    if(!row)return;
    const typeSel=row.querySelector('.point-type');
    const pointSel=row.querySelector('.point-select');
    if(!typeSel||!pointSel)return;
    setButtonVisibility(pointSel,typeSel.value==='trailhead');
    if(typeSel.dataset.accessWatch!=='1'){
      typeSel.dataset.accessWatch='1';
      typeSel.addEventListener('change',()=>setButtonVisibility(pointSel,typeSel.value==='trailhead'));
    }
  }

  ensureModal();
  scan();
  window.TratenTrailheadAccess={open:openModal,data:ACCESS_DB,refresh:scan,attachRow};
})();
