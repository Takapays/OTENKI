(()=>{
const $=id=>document.getElementById(id);
let state={mountains:{},generated_at:null,last_audit_at:null,checked_count:0,available_count:0,error_count:0,mountain_count:0};
let waterMap=null,waterLayer=null,leafletPromise=null;
const meta=window.TRATEN_RESOURCE_MOUNTAINS||{},areaMap=meta.mountainArea||{},order=meta.mountains||[];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const northSouthRank=meta.northSouthRank||{};
const sortNorthSouth=names=>[...names].sort((a,b)=>(northSouthRank[a]??1e9)-(northSouthRank[b]??1e9));
const gsiUrl=(lat,lon)=>{const a=Number(lat),o=Number(lon);return Number.isFinite(a)&&Number.isFinite(o)?`https://maps.gsi.go.jp/#18/${a}/${o}/&base=std&ls=std&disp=1`:''};
const areaSel=$('waterAreaFilter'),mountainSel=$('waterMountainFilter');
function availableMountains(){return order.filter(m=>state.mountains?.[m]?.checked===true&&state.mountains?.[m]?.available===true)}
function setupAreas(){const avail=availableMountains();areaSel.innerHTML='<option value="">山域を選択してください</option>';(meta.areas||[]).filter(([k])=>avail.some(m=>areaMap[m]===k)).forEach(([k,n])=>areaSel.insertAdjacentHTML('beforeend',`<option value="${k}">${esc(n)}</option>`));populateMountains();}
function populateMountains(){const a=areaSel.value,names=sortNorthSouth(availableMountains().filter(m=>areaMap[m]===a));mountainSel.innerHTML=`<option value="">${a?'山を選択してください':'先に山域を選択してください'}</option>`+names.map(m=>`<option value="${esc(m)}">${esc(m)}</option>`).join('');mountainSel.disabled=!a;render();}
function potabilityText(v){return v==='confirmed'?'OSM飲用可登録':v==='not_drinking'?'OSM飲用不可登録':'OSM飲用可否未確認'}
function ensureLeafletLoaded(){
  if(window.L)return Promise.resolve(true);
  if(leafletPromise)return leafletPromise;
  leafletPromise=new Promise(resolve=>{
    if(!document.getElementById('traten-water-leaflet-css')){
      const link=document.createElement('link');link.id='traten-water-leaflet-css';link.rel='stylesheet';link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(link);
    }
    const existing=document.getElementById('traten-water-leaflet-js');
    if(existing){existing.addEventListener('load',()=>resolve(!!window.L),{once:true});existing.addEventListener('error',()=>resolve(false),{once:true});return;}
    const script=document.createElement('script');script.id='traten-water-leaflet-js';script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';script.async=true;script.onload=()=>resolve(!!window.L);script.onerror=()=>resolve(false);document.head.appendChild(script);
  });
  return leafletPromise;
}
function validSources(v){return (v?.sources||[]).filter(x=>Number.isFinite(Number(x.lat))&&Number.isFinite(Number(x.lon)));}
function popupHtml(x){
  const name=esc(x.name||x.kind||'水場');
  const near=esc(x.near_point||'ルート付近');
  const kind=esc(x.kind||'水場');
  const potable=esc(potabilityText(x.potability));
  const dist=Number(x.distance_m||0).toLocaleString();
  const url=gsiUrl(x.lat,x.lon);
  return `<div class="water-map-popup"><b>💧 ${name}</b><div>${kind}</div><div>${near}から約${dist}m</div><div>${potable}</div>${url?`<a href="${url}" target="_blank" rel="noopener noreferrer">地理院地図で開く ↗</a>`:''}</div>`;
}
async function renderMap(m,v){
  const panel=$('waterMapPanel'),mapEl=$('waterMap'),countEl=$('waterMapCount'),title=$('waterMapTitle');
  const sources=validSources(v);
  if(!m||!v?.available||!sources.length){panel.classList.add('hidden');return;}
  panel.classList.remove('hidden');title.textContent=`${m}の水場位置`;countEl.textContent=`${sources.length}地点`;
  if(!waterMap)mapEl.innerHTML='<div class="water-map-loading">地理院地図を読み込み中…</div>';
  const ready=await ensureLeafletLoaded();
  if(mountainSel.value!==m)return;
  if(!ready){mapEl.innerHTML='<div class="water-map-error">地図ライブラリを読み込めませんでした。一覧の「地理院地図で確認」から位置を確認できます。</div>';return;}
  if(!waterMap){
    mapEl.innerHTML='';
    waterMap=L.map(mapEl,{scrollWheelZoom:true,zoomControl:true,attributionControl:true});
    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',{minZoom:5,maxZoom:18,attribution:'<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル</a>'}).addTo(waterMap);
    waterLayer=L.layerGroup().addTo(waterMap);
  }
  waterLayer.clearLayers();
  const points=[];
  sources.forEach((x,i)=>{
    const lat=Number(x.lat),lon=Number(x.lon);points.push([lat,lon]);
    const icon=L.divIcon({className:'traten-water-div-icon',html:'<span class="traten-water-pin" aria-hidden="true">💧</span>',iconSize:[36,40],iconAnchor:[18,38],popupAnchor:[0,-34],tooltipAnchor:[0,-32]});
    const marker=L.marker([lat,lon],{icon,title:x.name||x.kind||`水場${i+1}`}).addTo(waterLayer);
    marker.bindTooltip(`💧 ${x.name||x.kind||`水場${i+1}`}`,{direction:'top'});
    marker.bindPopup(popupHtml(x),{maxWidth:290});
  });
  if(points.length===1)waterMap.setView(points[0],16);
  else waterMap.fitBounds(L.latLngBounds(points),{padding:[34,34],maxZoom:16});
  setTimeout(()=>waterMap.invalidateSize(),50);
}
function render(){
  const m=mountainSel.value;
  const auditStamp=state.last_audit_at||null,cacheStamp=state.generated_at||null;
  const stampHtml=auditStamp?`<br><small>最終監査 ${esc(new Date(auditStamp).toLocaleString('ja-JP'))}</small>`:(cacheStamp?`<br><small>キャッシュ更新 ${esc(new Date(cacheStamp).toLocaleString('ja-JP'))}</small>`:'');
  $('waterIndexStats').innerHTML=`<strong>水場あり ${state.available_count||0}座</strong><br>監査済み ${state.checked_count||0}/${state.mountain_count||300}座${stampHtml}`;
  const n=$('waterIndexNotice');
  if((state.checked_count||0)<(state.mountain_count||300)){n.classList.remove('hidden');n.innerHTML=`固定監査は現在 <b>${state.checked_count||0}/${state.mountain_count||300}座</b>。未監査の山はこの選択リストにはまだ表示しません。`;}
  else n.classList.add('hidden');
  if(!m){$('waterMapPanel').classList.add('hidden');$('waterIndexList').innerHTML='<div class="water-empty-index">山域 → 山の順に選択すると、確認済み水場候補を表示します。</div>';return;}
  const v=state.mountains[m];
  if(!v?.available){$('waterMapPanel').classList.add('hidden');$('waterIndexList').innerHTML='<div class="water-empty-index">この山の確認済み水場候補はありません。</div>';return;}
  renderMap(m,v);
  const src=(v.sources||[]).slice(0,20).map(x=>{
    const url=gsiUrl(x.lat,x.lon);
    const desc=x.tags?.description?`<p class="water-osm-description">${esc(x.tags.description)}</p>`:'';
    return `<div class="water-source-mini"><b>💧 ${esc(x.name||x.kind||'水場')}</b><small>${esc(x.kind||'水場')}・${esc(x.near_point||'ルート付近')}から約${Number(x.distance_m||0).toLocaleString()}m・${esc(potabilityText(x.potability))}</small>${desc}${url?`<div class="water-source-mini-actions"><a href="${url}" target="_blank" rel="noopener noreferrer">地理院地図で確認 ↗</a></div>`:''}</div>`;
  }).join('');
  $('waterIndexList').innerHTML=`<article class="water-mountain-card"><h3>${esc(m)}</h3><div class="water-mountain-meta"><span class="water-chip ok">水場候補 ${v.count||0}件</span>${v.sources?.some(x=>x.potability==='confirmed')?'<span class="water-chip">OSM飲用可登録あり</span>':''}</div><p class="water-search-note">上の地理院地図に固定監査済み水場候補をプロットしています。現在の出水・水量・飲用安全は保証しません。</p>${src||'<div class="water-source-mini">候補詳細なし</div>'}</article>`;
}
async function load(){try{const r=await fetch('/api/water-mountain-index',{cache:'no-store'});if(!r.ok)throw new Error(`HTTP ${r.status}`);state=await r.json();setupAreas();}catch(e){$('waterIndexList').innerHTML=`<div class="water-empty-index">水場一覧を取得できませんでした：${esc(e.message||e)}</div>`;}}
areaSel.addEventListener('change',populateMountains);mountainSel.addEventListener('change',render);load();
})();
