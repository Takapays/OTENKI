(()=>{
const $=id=>document.getElementById(id);
let state={mountains:{},generated_at:null,last_audit_at:null,checked_count:0,available_count:0,error_count:0,mountain_count:0};
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
function render(){
  const m=mountainSel.value;
  const auditStamp=state.last_audit_at||null,cacheStamp=state.generated_at||null;
  const stampHtml=auditStamp?`<br><small>最終監査 ${esc(new Date(auditStamp).toLocaleString('ja-JP'))}</small>`:(cacheStamp?`<br><small>キャッシュ更新 ${esc(new Date(cacheStamp).toLocaleString('ja-JP'))}</small>`:'');
  $('waterIndexStats').innerHTML=`<strong>水場あり ${state.available_count||0}座</strong><br>監査済み ${state.checked_count||0}/${state.mountain_count||300}座${stampHtml}`;
  const n=$('waterIndexNotice');
  if((state.checked_count||0)<(state.mountain_count||300)){n.classList.remove('hidden');n.innerHTML=`固定監査は現在 <b>${state.checked_count||0}/${state.mountain_count||300}座</b>。未監査の山はこの選択リストにはまだ表示しません。`;}
  else n.classList.add('hidden');
  if(!m){$('waterIndexList').innerHTML='<div class="water-empty-index">山域 → 山の順に選択すると、確認済み水場候補を表示します。</div>';return;}
  const v=state.mountains[m];
  if(!v?.available){$('waterIndexList').innerHTML='<div class="water-empty-index">この山の確認済み水場候補はありません。</div>';return;}
  const src=(v.sources||[]).slice(0,20).map(x=>{
    const url=gsiUrl(x.lat,x.lon);
    const desc=x.tags?.description?`<p class="water-osm-description">${esc(x.tags.description)}</p>`:'';
    return `<div class="water-source-mini"><b>💧 ${esc(x.name||x.kind||'水場')}</b><small>${esc(x.kind||'水場')}・${esc(x.near_point||'ルート付近')}から約${Number(x.distance_m||0).toLocaleString()}m・${esc(potabilityText(x.potability))}</small>${desc}${url?`<div class="water-source-mini-actions"><a href="${url}" target="_blank" rel="noopener noreferrer">地理院地図で確認 ↗</a></div>`:''}</div>`;
  }).join('');
  $('waterIndexList').innerHTML=`<article class="water-mountain-card"><h3>${esc(m)}</h3><div class="water-mountain-meta"><span class="water-chip ok">水場候補 ${v.count||0}件</span>${v.sources?.some(x=>x.potability==='confirmed')?'<span class="water-chip">OSM飲用可登録あり</span>':''}</div><p class="water-search-note">固定監査で確認できた水場候補のみを表示しています。現在の出水・水量・飲用安全は保証しません。</p>${src||'<div class="water-source-mini">候補詳細なし</div>'}</article>`;
}
async function load(){try{const r=await fetch('/api/water-mountain-index',{cache:'no-store'});if(!r.ok)throw new Error(`HTTP ${r.status}`);state=await r.json();setupAreas();}catch(e){$('waterIndexList').innerHTML=`<div class="water-empty-index">水場一覧を取得できませんでした：${esc(e.message||e)}</div>`;}}
areaSel.addEventListener('change',populateMountains);mountainSel.addEventListener('change',render);load();
})();
