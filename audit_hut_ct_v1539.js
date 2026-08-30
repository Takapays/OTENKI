const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('app.js','utf8');
const sandbox={console,setTimeout:()=>0,clearTimeout:()=>{},URLSearchParams,Intl,Date,Math,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map,Promise,
 document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,body:{}},window:{confirm:()=>true},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},location:{search:'',href:'',origin:''},crypto:{randomUUID:()=> 'audit'},fetch:async()=>({ok:false}),AbortController:global.AbortController};
vm.createContext(sandbox);
vm.runInContext(s+`\nglobalThis.__X={JAPAN_300_MOUNTAINS,JAPAN_100_MOUNTAINS,BUILTIN_ROUTE_CATALOG,courseTimeInfo,composedCourseTimeInfo,normalizeCourseTimePointName,canonicalCourseTimeEndpointName,haversineKm,representativeCourseOptions,representativeCourseExpandedPointDefs,representativeCandidateForMountain};`,sandbox,{timeout:30000});
const X=sandbox.__X, is100=new Set(X.JAPAN_100_MOUNTAINS||[]);
const fmt=m=>m==null?'':`${Math.floor(m/60)}:${String(m%60).padStart(2,'0')}`;
const esc=v=>`"${String(v??'').replaceAll('"','""')}"`;
const localRows=[], rejected=[];
for(const mountain of X.JAPAN_300_MOUNTAINS){
 const pts=X.BUILTIN_ROUTE_CATALOG[mountain]||[];
 const peaks=pts.filter(p=>p.type==='peak'), huts=pts.filter(p=>p.type==='hut'), ths=pts.filter(p=>p.type==='trailhead');
 for(const hut of huts){
  const pairs=[];
  for(const peak of peaks)pairs.push([peak,hut,'peak-hut'],[hut,peak,'hut-peak']);
  for(const th of ths)pairs.push([th,hut,'trailhead-hut'],[hut,th,'hut-trailhead']);
  for(const [a,b,relation] of pairs){
   const info=X.courseTimeInfo(a,b); const km=Number.isFinite(a.lat)&&Number.isFinite(a.lon)&&Number.isFinite(b.lat)&&Number.isFinite(b.lon)?X.haversineKm(a.lat,a.lon,b.lat,b.lon):null;
   localRows.push({mountain,is100:is100.has(mountain),relation,from:a.name,to:b.name,minutes:info?.minutes??null,ct:fmt(info?.minutes),mode:info?.composed?'composed':info?.estimated?'estimated':info?'direct':'missing',via:(info?.via||[]).join(' → '),source:info?.source||'',km:Number.isFinite(km)?Number(km.toFixed(2)):null});
   if(!info){
    const fn=X.canonicalCourseTimeEndpointName(X.normalizeCourseTimePointName(a.name)),tn=X.canonicalCourseTimeEndpointName(X.normalizeCourseTimePointName(b.name));
    const raw=X.composedCourseTimeInfo(fn,tn)||X.composedCourseTimeInfo(a.name,b.name);
    if(raw?.composed&&Number.isFinite(km)){
      const edges=(raw.via?.length||0)+1;
      const blocked=(km<=0.15&&raw.minutes>60)||(km<=3&&edges>=4&&raw.minutes>300);
      if(blocked) rejected.push({mountain,is100:is100.has(mountain),from:a.name,to:b.name,rawMinutes:raw.minutes,rawCt:fmt(raw.minutes),km:Number(km.toFixed(2)),via:(raw.via||[]).join(' → ')});
    }
   }
  }
 }
}
const repRows=[];
for(const mountain of X.JAPAN_300_MOUNTAINS){for(const course of X.representativeCourseOptions(mountain)){const defs=X.representativeCourseExpandedPointDefs(mountain,course);for(let i=1;i<defs.length;i++){const a=X.representativeCandidateForMountain(mountain,defs[i-1][0],defs[i-1][1]);const b=X.representativeCandidateForMountain(mountain,defs[i][0],defs[i][1]);const info=a&&b?X.courseTimeInfo(a,b):null;if(info?.minutes>=600)repRows.push({mountain,is100:is100.has(mountain),course:course.label||'',from:defs[i-1][1],to:defs[i][1],minutes:info.minutes,ct:fmt(info.minutes),mode:info.composed?'composed':info.estimated?'estimated':'direct',via:(info.via||[]).join(' → '),source:info.source||''});}}}
const local10=localRows.filter(r=>r.minutes>=600);
const missing100=localRows.filter(r=>r.is100&&r.minutes==null).length;
const csvRows=[['category','mountain','hyakumeizan','course_or_relation','from','to','minutes','ct','mode','distance_km','via','source']];
for(const r of repRows)csvRows.push(['representative',r.mountain,r.is100?'yes':'no',r.course,r.from,r.to,r.minutes,r.ct,r.mode,'',r.via,r.source]);
for(const r of local10)csvRows.push(['mountain_hut_pair',r.mountain,r.is100?'yes':'no',r.relation,r.from,r.to,r.minutes,r.ct,r.mode,r.km??'',r.via,r.source]);
fs.writeFileSync('CT_10H_PLUS_V1539.csv',csvRows.map(row=>row.map(esc).join(',')).join('\n')+'\n');
let md=`# V1.5.39 CT 10:00以上監査\n\n- 代表コース区間 10:00以上: ${repRows.length}件\n- 山頂/登山口↔山小屋の選択候補 10:00以上: ${local10.length}件\n- 近距離の異常な大回り合算を安全ガードで拒否: ${rejected.length}件\n- 百名山の山頂/登山口↔山小屋ペアでCT情報なし: ${missing100}件（未確認値は推測登録しない）\n\n## 代表コース区間 10:00以上\n\n| 山 | 百名山 | コース | 区間 | CT | 種別 |\n|---|---|---|---|---:|---|\n`;
for(const r of repRows)md+=`| ${r.mountain} | ${r.is100?'○':''} | ${r.course} | ${r.from} → ${r.to} | ${r.ct} | ${r.mode} |\n`;
md+=`\n## 山頂/登山口↔山小屋の選択候補 10:00以上\n\n> composed は複数の確認済み区間を合算した値です。長距離縦走として成立する場合もありますが、直接CTではないためチェック対象です。\n\n| 山 | 百名山 | 区間 | CT | 種別 | 距離km | 経由 |\n|---|---|---|---:|---|---:|---|\n`;
for(const r of local10)md+=`| ${r.mountain} | ${r.is100?'○':''} | ${r.from} → ${r.to} | ${r.ct} | ${r.mode} | ${r.km??''} | ${r.via} |\n`;
md+=`\n## V1.5.39で表示を止めた近距離異常合算\n\n| 山 | 区間 | 旧合算CT | 距離km | 旧経由 |\n|---|---|---:|---:|---|\n`;
for(const r of rejected)md+=`| ${r.mountain} | ${r.from} → ${r.to} | ${r.rawCt} | ${r.km} | ${r.via} |\n`;
fs.writeFileSync('CT_10H_PLUS_V1539.md',md);
let hm=`# V1.5.39 山頂・登山口↔山小屋 CT監査\n\n- 日本三百名山: ${X.JAPAN_300_MOUNTAINS.length}座を走査\n- 百名山を優先確認\n- 山頂/登山口↔山小屋の同一山カタログ組合せ: ${localRows.length}方向\n- 百名山CT情報なし: ${missing100}方向\n- V1.5.39で近距離異常合算を拒否: ${rejected.length}方向\n\n## 今回の直接修正\n- 朝日岳（新潟・富山）→朝日小屋: 0:50（朝日小屋公式）\n- 朝日小屋→朝日岳（新潟・富山）: 1:00（朝日小屋公式）\n- 御嶽山4小屋: 女人堂、石室山荘、二の池ヒュッテ、五の池小屋と剣ヶ峰の方向別CTを追加\n- 田の原登山口→二の池ヒュッテ: 3:40（二の池ヒュッテ公式）\n\n詳細な10時間以上一覧は CT_10H_PLUS_V1539.md / CSV を参照。\n`;
fs.writeFileSync('HUT_CT_AUDIT_V1539.md',hm);
console.log(JSON.stringify({localPairs:localRows.length,missing100,rejectedLocalDetours:rejected.length,representative10hPlus:repRows.length,localPair10hPlus:local10.length},null,2));
