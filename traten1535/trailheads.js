(()=>{'use strict';
const meta=window.TRATEN_RESOURCE_MOUNTAINS||{},db=window.TRATEN_TRAILHEAD_ACCESS_DB||{};
const areaSel=document.getElementById('area'),mountainSel=document.getElementById('mountain'),list=document.getElementById('list'),summary=document.getElementById('summary');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const northSouthRank=meta.northSouthRank||{};const sortNorthSouth=names=>[...names].sort((a,b)=>(northSouthRank[a]??1e9)-(northSouthRank[b]??1e9));
const order=[...(meta.mountains||[])];
const byMountain=meta.trailheadsByMountain||{},areaMap=meta.mountainArea||{};
const dataMountains=order.filter(m=>(byMountain[m]||[]).some(n=>db[n]));
const areaKeys=(meta.areas||[]).filter(([k])=>dataMountains.some(m=>areaMap[m]===k));
areaKeys.forEach(([k,n])=>areaSel.insertAdjacentHTML('beforeend',`<option value="${k}">${esc(n)}</option>`));
function populateMountains(){const a=areaSel.value,names=sortNorthSouth(dataMountains.filter(m=>areaMap[m]===a));mountainSel.innerHTML=`<option value="">${a?'山を選択してください':'先に山域を選択してください'}</option>`+names.map(m=>`<option value="${esc(m)}">${esc(m)}</option>`).join('');mountainSel.disabled=!a;render();}
function render(){const m=mountainSel.value;if(!m){summary.innerHTML=`<span>登山口情報のある山 ${dataMountains.length}座</span><span>山域を選んでください</span>`;list.innerHTML='<div class="empty">山域 → 山の順に選択すると、登録済み登山口を表示します。</div>';return;}const names=(byMountain[m]||[]).filter(n=>db[n]);summary.innerHTML=`<span>${esc(m)}</span><span>登山口 ${names.length}地点</span>`;list.innerHTML=names.length?names.map(name=>{const x=db[name];return `<article class="card"><h3>${esc(name)}</h3><div class="meta">${esc(x.area||'')} · ${esc(x.prefecture||'')}</div><p><span class="tag">車</span>${esc(x.nearestIC||'—')} / ${esc(x.drive||'—')}</p><p><span class="tag">駐車</span>${esc(x.parking||'情報なし')}</p><p><span class="tag">公共交通</span>${esc(x.transit||'情報なし')}</p><a class="primary-link trailhead-shared-access" href="index.html?access=${encodeURIComponent(name)}&mountain=${encodeURIComponent(m)}">アクセス →</a></article>`}).join(''):'<div class="empty">この山のアクセス登録済み登山口はありません。</div>';}
areaSel.addEventListener('change',populateMountains);mountainSel.addEventListener('change',render);populateMountains();
})();
