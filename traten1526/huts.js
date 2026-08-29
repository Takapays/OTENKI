(()=>{'use strict';
const meta=window.TRATEN_RESOURCE_MOUNTAINS||{},db=window.TRATEN_HUT_OFFICIAL_SITES||{};
const areaSel=document.getElementById('area'),mountainSel=document.getElementById('mountain'),list=document.getElementById('list'),summary=document.getElementById('summary'),badge=document.getElementById('hutCountBadge');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const northSouthRank=meta.northSouthRank||{};const sortNorthSouth=names=>[...names].sort((a,b)=>(northSouthRank[a]??1e9)-(northSouthRank[b]??1e9));
const order=[...(meta.mountains||[])],byMountain=meta.hutsByMountain||{},areaMap=meta.mountainArea||{};
const dataMountains=order.filter(m=>(byMountain[m]||[]).some(n=>db[n]));const areaKeys=(meta.areas||[]).filter(([k])=>dataMountains.some(m=>areaMap[m]===k));
areaKeys.forEach(([k,n])=>areaSel.insertAdjacentHTML('beforeend',`<option value="${k}">${esc(n)}</option>`));badge.textContent=`${Object.keys(db).length}件`;
function populateMountains(){const a=areaSel.value,names=sortNorthSouth(dataMountains.filter(m=>areaMap[m]===a));mountainSel.innerHTML=`<option value="">${a?'山を選択してください':'先に山域を選択してください'}</option>`+names.map(m=>`<option value="${esc(m)}">${esc(m)}</option>`).join('');mountainSel.disabled=!a;render();}
function render(){const m=mountainSel.value;if(!m){summary.innerHTML=`<span>山小屋情報のある山 ${dataMountains.length}座</span><span>山域を選んでください</span>`;list.innerHTML='<div class="empty">山域 → 山の順に選択すると、登録済み山小屋を表示します。</div>';return;}const names=(byMountain[m]||[]).filter(n=>db[n]);summary.innerHTML=`<span>${esc(m)}</span><span>山小屋 ${names.length}件</span>`;list.innerHTML=names.length?names.map(name=>{const kind=/避難小屋|石室|小屋$/.test(name)&&!/山小屋$/.test(name)?'避難小屋・小屋':'山小屋';return `<article class="card"><h3>${esc(name)}</h3><div class="meta">${kind}</div><a href="${esc(db[name])}" target="_blank" rel="noopener noreferrer">公式HPを開く ↗</a></article>`}).join(''):'<div class="empty">この山の公式HP登録済み山小屋はありません。</div>';}
areaSel.addEventListener('change',populateMountains);mountainSel.addEventListener('change',render);populateMountains();
})();
