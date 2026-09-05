/* Traten V1.5.167 weather fallback hardening
   Open-Meteo -> MET Norway -> NOAA GFS direct.
   Loaded after app.js so it can safely patch the existing analysis functions
   without replacing route/CT logic. */
(function(){
  const VERSION='1.5.168';
  const FALLBACK_RE=/HTTP\s*(429|5\d\d)|Failed to fetch|NetworkError|Load failed|network|timeout|タイムアウト|取得失敗/i;

  function isFallbackableErrorList(errors){
    return Array.isArray(errors) && errors.some(x=>FALLBACK_RE.test(String(x||'')));
  }

  async function noaaRowAt(point,date,time){
    const q=new URLSearchParams({lat:String(point.lat),lon:String(point.lon),date,time});
    const r=await fetch(`/api/noaa-gfs?${q}`,{headers:{Accept:'application/json'}});
    const payload=await r.json().catch(()=>null);
    if(!r.ok)throw new Error(payload?.error||`NOAA GFS HTTP ${r.status}`);
    return payload?.row||null;
  }

  function jstParts(ms){
    const d=new Date(ms+9*3600000);
    return {
      date:`${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`,
      time:`${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}`
    };
  }

  function normalizeTimelineRow(row){
    if(!row||!row.time)return null;
    const n=k=>Number.isFinite(Number(row[k]))?Number(row[k]):NaN;
    return {time:row.time,rain:n('rain'),wind:n('wind'),cape:n('cape')};
  }

  function metNoPointBundle(point,payload){
    if(!payload)return null;
    const row=(typeof extractMetNoRow==='function')?extractMetNoRow(payload,point):null;
    if(!row)return null;
    const targetMs=new Date(`${point.date}T${point.time}:00+09:00`).getTime();
    const sourceRows=(typeof metNoRows==='function')?metNoRows(payload):[];
    const timeline=sourceRows
      .filter(x=>x?.time&&Math.abs(new Date(x.time).getTime()-targetMs)<=6*3600000)
      .map(x=>({time:x.time,rain:Number(x.rain),wind:Number(x.wind),cape:NaN}))
      .filter(x=>[x.rain,x.wind].some(Number.isFinite));
    return {...row,timeline};
  }

  async function fetchMetNoPointBundle(point){
    if(typeof fetchMetNoPayload!=='function')return null;
    const payload=await fetchMetNoPayload(point);
    return metNoPointBundle(point,payload);
  }

  function pointTimelineTargets(point){
    const center=new Date(`${point.date}T${point.time}:00+09:00`).getTime();
    if(!Number.isFinite(center))return [];
    const out=[];
    for(let h=-6;h<=6;h++)out.push(center+h*3600000);
    return out;
  }

  async function fetchNoaaPointBundle(point){
    if(typeof daysAhead==='function'&&daysAhead(point.date)>16)return null;
    const targets=pointTimelineTargets(point);
    const got=await mapLimit(targets,3,async ms=>{
      const p=jstParts(ms);
      return await noaaRowAt(point,p.date,p.time);
    });
    const rows=got.filter(x=>x&&!x.error&&x.time).sort((a,b)=>new Date(a.time)-new Date(b.time));
    if(!rows.length)return null;
    const targetMs=new Date(`${point.date}T${point.time}:00+09:00`).getTime();
    let best=rows[0],bestDiff=Math.abs(new Date(best.time).getTime()-targetMs);
    for(const r of rows){const d=Math.abs(new Date(r.time).getTime()-targetMs);if(d<bestDiff){best=r;bestDiff=d;}}
    if(bestDiff>3*3600000)return null;
    const timeline=rows.map(normalizeTimelineRow).filter(Boolean);
    return {...best,timeline};
  }

  function timelineFromProviderRows(rows){
    if(typeof blendTimelineRows==='function')return blendTimelineRows(rows);
    const slots=new Map();
    for(const x of rows||[]){for(const r of x?.row?.timeline||[]){
      if(!r?.time)continue; const key=String(r.time).slice(0,13);
      const s=slots.get(key)||{time:r.time,rain:[],wind:[],cape:[]};
      for(const k of ['rain','wind','cape'])if(Number.isFinite(Number(r[k])))s[k].push(Number(r[k]));
      slots.set(key,s);
    }}
    const mean=a=>a.length?a.reduce((p,c)=>p+c,0)/a.length:NaN;
    return [...slots.values()].sort((a,b)=>new Date(a.time)-new Date(b.time)).map(s=>({time:s.time,rain:mean(s.rain),wind:mean(s.wind),cape:s.cape.length?Math.max(...s.cape):NaN}));
  }

  function overnightTargets(point){
    const start=new Date(`${point.date}T${point.time}:00+09:00`).getTime();
    const next=typeof addDays==='function'?addDays(point.date,1):(()=>{const d=new Date(`${point.date}T12:00:00+09:00`);d.setUTCDate(d.getUTCDate()+1);return jstParts(d.getTime()).date;})();
    const end=new Date(`${next}T08:00:00+09:00`).getTime();
    const targets=[];
    if(Number.isFinite(start)&&Number.isFinite(end)&&start<=end){
      targets.push(start);
      let t=Math.ceil(start/3600000)*3600000;
      if(t===start)t+=3600000;
      for(;t<=end;t+=3600000)targets.push(t);
    }
    return {targets,next};
  }

  async function mapLimit(items,limit,fn){
    const out=new Array(items.length); let cursor=0;
    async function worker(){
      while(true){
        const i=cursor++; if(i>=items.length)return;
        try{out[i]=await fn(items[i],i);}catch(e){out[i]={error:e};}
      }
    }
    await Promise.all(Array.from({length:Math.min(limit,items.length||1)},()=>worker()));
    return out;
  }

  async function fetchNoaaOvernightPayload(point){
    if(typeof daysAhead==='function'&&daysAhead(point.date)>16)return null;
    const {targets,next}=overnightTargets(point);
    if(!targets.length)return null;
    const got=await mapLimit(targets,3,async ms=>{
      const p=jstParts(ms);
      return await noaaRowAt(point,p.date,p.time);
    });
    const byTime=new Map();
    for(const item of got){
      if(!item||item.error||!item.time)continue;
      byTime.set(String(item.time),item);
    }
    const rows=[...byTime.values()].sort((a,b)=>new Date(a.time)-new Date(b.time));
    if(rows.length<3)return null;
    const value=(r,k)=>Number.isFinite(Number(r?.[k]))?Number(r[k]):null;
    const app=(r)=>{
      const t=value(r,'temp'),w=value(r,'wind');
      if(typeof apparentTempApprox==='function'){
        const v=apparentTempApprox(t,w); return Number.isFinite(v)?v:null;
      }
      return t;
    };
    const dew=(r)=>{
      const t=value(r,'temp'),rh=value(r,'rh');
      if(typeof dewPointApprox==='function'){
        const v=dewPointApprox(t,rh); return Number.isFinite(v)?v:null;
      }
      return null;
    };
    const hourly={
      time:rows.map(r=>r.time),
      temperature_2m:rows.map(r=>value(r,'temp')),
      apparent_temperature:rows.map(app),
      relative_humidity_2m:rows.map(r=>value(r,'rh')),
      dew_point_2m:rows.map(dew),
      precipitation:rows.map(r=>value(r,'rain')),
      cloud_cover:rows.map(r=>value(r,'cloud')),
      cloud_cover_low:rows.map(()=>null),
      cloud_cover_mid:rows.map(()=>null),
      cloud_cover_high:rows.map(()=>null),
      wind_speed_10m:rows.map(r=>value(r,'wind')),
      wind_gusts_10m:rows.map(r=>value(r,'gust')??value(r,'wind')),
      visibility:rows.map(()=>null)
    };
    const sunset=(typeof solarTimeApprox==='function')?solarTimeApprox(point.date,Number(point.lat),Number(point.lon),false):`${point.date}T18:00:00+09:00`;
    const sunrise=(typeof solarTimeApprox==='function')?solarTimeApprox(next,Number(point.lat),Number(point.lon),true):`${next}T05:00:00+09:00`;
    return {hourly,daily:{sunset:[sunset],sunrise:[sunrise]}};
  }

  async function analyzeOneOvernightFallback(point,nightNo){
    const errors=[];
    // 1) MET Norway: full timeseries, preferred fallback.
    try{
      if(typeof fetchMetNoPayload==='function'&&typeof analyzeOvernightMetNo==='function'){
        const payload=await fetchMetNoPayload(point);
        if(payload){
          const item=analyzeOvernightMetNo(point,nightNo,payload);
          item.source='MET Norway（予備）';
          return item;
        }
        errors.push('MET Norway: 対象期間外または予報なし');
      }
    }catch(e){errors.push(e?.message||'MET Norway取得失敗');}

    // 2) NOAA GFS: build an hourly-like payload from direct NOMADS GRIB2 rows.
    try{
      const payload=await fetchNoaaOvernightPayload(point);
      if(payload&&typeof analyzeOvernightJson==='function'){
        const item=analyzeOvernightJson(point,nightNo,payload);
        item.source='NOAA GFS（直取得・予備）';
        return item;
      }
      errors.push('NOAA GFS: 対象期間外または時系列不足');
    }catch(e){errors.push(e?.message||'NOAA GFS取得失敗');}
    throw new Error(`${point.name}: 宿泊時系列を取得できませんでした。${errors.join(' / ')}`);
  }

  // Passage-point analysis: keep every available Open-Meteo model.
  // Only when a point has zero normal rows, use one fallback source in priority order.
  if(typeof analyzePointsBatch==='function' && typeof providers!=='undefined'){
    analyzePointsBatch=async function(points){
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
      const metnoProvider={id:'metno',name:'MET Norway（予備）',kind:'fallback'};
      const noaaProvider={id:'noaa-gfs',name:'NOAA GFS（直取得）',kind:'fallback'};
      for(let index=0;index<points.length;index++){
        const bucket=buckets[index];
        if(bucket.rows.length)continue;
        if(!isFallbackableErrorList(bucket.errors))continue;
        const point=points[index];
        setStatus(`Open-Meteo取得困難：${point.name} をMET Norwayで取得しています…`);
        let row=null;
        try{
          row=await fetchMetNoPointBundle(point);
          if(row){
            bucket.rows.push({provider:metnoProvider,row});
            bucket.errors.push('Open-Meteo取得困難 → MET Norwayへ自動切替');
          }
        }catch(e){bucket.errors.push(e?.message||'MET Norway取得失敗');}
        if(!row){
          setStatus(`MET Norwayも取得困難：${point.name} をNOAA GFSで取得しています…`);
          try{
            row=await fetchNoaaPointBundle(point);
            if(row){
              bucket.rows.push({provider:noaaProvider,row});
              bucket.errors.push('MET Norway取得不可 → NOAA GFSへ自動切替');
            }
          }catch(e){bucket.errors.push(e?.message||'NOAA GFS取得失敗');}
        }
      }
      return points.map((point,index)=>{
        const rows=buckets[index].rows,errors=buckets[index].errors;
        if(!rows.length)throw new Error(`${point.name}: 予報データを取得できませんでした。 ${errors.join(' / ')||'対応モデルがありません'}`);
        const avg=averageRows(rows.map(x=>x.row));
        const fallbackOnly=rows.length===1&&rows[0].provider?.kind==='fallback';
        return {point,providerRows:rows,errors,timelineRows:timelineFromProviderRows(rows),...avg,grade:assessGrade(avg),confidence:fallbackOnly?'FALLBACK':assessConfidence(rows.map(x=>x.row)),thunder:thunderLevel(avg),hazards:assessHazards(avg)};
      });
    };
  }

  // Overnight analysis: Open-Meteo -> MET Norway -> NOAA GFS, point by point.
  if(typeof analyzeOvernightsBatch==='function'){
    analyzeOvernightsBatch=async function(points){
      if(!points.length)return [];
      const vars=['temperature_2m','apparent_temperature','relative_humidity_2m','dew_point_2m','precipitation','cloud_cover','cloud_cover_low','cloud_cover_mid','cloud_cover_high','wind_speed_10m','wind_gusts_10m','visibility'];
      const starts=points.map(p=>p.date).sort(),ends=points.map(p=>addDays(p.date,1)).sort();
      const q=new URLSearchParams({
        latitude:points.map(p=>p.lat).join(','),longitude:points.map(p=>p.lon).join(','),elevation:points.map(p=>Number(p.elevation)||'nan').join(','),
        hourly:vars.join(','),daily:'sunrise,sunset',timezone:'Asia/Tokyo',start_date:starts[0],end_date:ends[ends.length-1],wind_speed_unit:'ms'
      });
      let response=null,openError=null;
      try{response=await proxyFetch(`https://api.open-meteo.com/v1/forecast?${q}`);}catch(e){openError=e;}
      let baseItems=[];
      if(response?.ok){
        const raw=await response.json(),locations=Array.isArray(raw)?raw:[raw];
        if(locations.length!==points.length)throw new Error(`宿泊予報の地点数不一致 (${locations.length}/${points.length})`);
        baseItems=points.map((p,i)=>({...analyzeOvernightJson(p,i+1,locations[i]),source:'Open-Meteo'}));
      }else{
        const status=response?.status;
        const fallbackable=!response||status===429||status>=500;
        if(!fallbackable)throw new Error(`宿泊予報 HTTP ${status}`);
        const reason=openError?.message||`HTTP ${status||'network'}`;
        for(let i=0;i<points.length;i++){
          setStatus(`Open-Meteo取得困難（${reason}）：${i+1}/${points.length}泊目を予備時系列で取得中…`);
          baseItems.push(await analyzeOneOvernightFallback(points[i],i+1));
        }
      }
      return await enrichOvernightsWithMilky(baseItems);
    };
  }

  if(typeof window!=='undefined') window.TRATEN_WEATHER_FALLBACK_VERSION=VERSION;
  console.info(`[Traten ${VERSION}] weather fallback ready: Open-Meteo -> MET Norway -> NOAA GFS`);
})();
