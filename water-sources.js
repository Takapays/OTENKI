(()=>{
  const $=id=>document.getElementById(id);let state={mountains:{},generated_at:null,checked_count:0,available_count:0,error_count:0,mountain_count:0};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const osmUrl=id=>{const m=String(id||'').match(/^(node|way|relation)\/(\d+)$/);return m?`https://www.openstreetmap.org/${m[1]}/${m[2]}`:''};
  function render(){
    const q=$('waterIndexSearch').value.trim().toLowerCase(),filter=$('waterIndexFilter').value;
    const rows=Object.entries(state.mountains||{}).filter(([name,v])=>{
      if(q&&!name.toLowerCase().includes(q))return false;
      if(filter==='available')return v?.checked===true&&v?.available===true;
      if(filter==='unchecked')return v?.checked!==true;
      return v?.checked===true;
    }).sort((a,b)=>{const ac=a[1]?.count||0,bc=b[1]?.count||0;return bc-ac||a[0].localeCompare(b[0],'ja')});
    $('waterIndexStats').innerHTML=`<strong>水場あり ${state.available_count||0}座</strong><br>監査済み ${state.checked_count||0}/${state.mountain_count||300}座${state.generated_at?`<br><small>更新 ${esc(new Date(state.generated_at).toLocaleString('ja-JP'))}</small>`:''}`;
    const n=$('waterIndexNotice');
    if((state.checked_count||0)<(state.mountain_count||300)){n.classList.remove('hidden');n.innerHTML=`固定監査は現在 <b>${state.checked_count||0}/${state.mountain_count||300}座</b>。初回GitHub Actions監査が完了すると自動で一覧が埋まります。未監査の山は通常の水場検索へフォールバックします。`; }else n.classList.add('hidden');
    $('waterIndexList').innerHTML=rows.length?rows.map(([name,v])=>{
      const src=(v.sources||[]).slice(0,5).map(x=>`<div class="water-source-mini"><b>💧 ${esc(x.name||x.kind||'水場')}</b><small>${esc(x.kind||'水場')}・${esc(x.near_point||'ルート付近')}から約${Number(x.distance_m||0).toLocaleString()}m${x.potability==='confirmed'?'・飲用可登録':x.potability==='not_drinking'?'・飲用不可登録':'・飲用可否未確認'}</small>${osmUrl(x.osm_id)?`<br><a href="${osmUrl(x.osm_id)}" target="_blank" rel="noopener noreferrer">OpenStreetMapで確認 ↗</a>`:''}</div>`).join('');
      return `<article class="water-mountain-card"><h3>${esc(name)}</h3><div class="water-mountain-meta"><span class="water-chip ok">水場候補 ${v.count||0}件</span>${v.sources?.some(x=>x.potability==='confirmed')?'<span class="water-chip">飲用可登録あり</span>':''}</div>${src||'<div class="water-source-mini">候補詳細なし</div>'}</article>`;
    }).join(''):`<div class="water-empty-index">条件に合う山はありません。</div>`;
  }
  async function load(){try{const r=await fetch('/api/water-mountain-index',{cache:'no-store'});if(!r.ok)throw new Error(`HTTP ${r.status}`);state=await r.json();render();}catch(e){$('waterIndexList').innerHTML=`<div class="water-empty-index">水場一覧を取得できませんでした：${esc(e.message||e)}</div>`;}}
  $('waterIndexSearch').addEventListener('input',render);$('waterIndexFilter').addEventListener('change',render);load();
})();
