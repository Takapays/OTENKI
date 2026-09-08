function nationalHourlyGradeForValues(wind,gust,rain){
  const numeric=v=>typeof v==='number'&&Number.isFinite(v)?v:NaN;
  const w=numeric(wind),g=numeric(gust),r=numeric(rain);
  const finite=v=>Number.isFinite(v);
  const rankFor=(v,b,c,d,e)=>!finite(v)?0:v>=e?5:v>=d?4:v>=c?3:v>=b?2:1;
  const rank=Math.max(rankFor(w,5,7,9,15),rankFor(g,12,15,18,25),rankFor(r,0.1,0.5,1.5,6));
  return ['?','A','B','C','D','E'][rank]||'?';
}
function nationalHourlyGradeRows(rows){
  const maps={};
  for(const row of rows||[])maps[row.model]=new Map((row.series||[]).map(x=>[Number(x.hour),x]));
  const hours=Array.from({length:10},(_,i)=>i+6);
  return hours.map(hour=>{
    const modelRows=['metno','gfs'].map(m=>maps[m]?.get(hour)).filter(Boolean);
    const mean=key=>{const vals=modelRows.map(x=>x?.[key]).filter(v=>typeof v==='number'&&Number.isFinite(v));return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null;};
    const center={wind:mean('wind'),gust:mean('gust'),rain:mean('rain')};
    let grade=nationalHourlyGradeForValues(center.wind,center.gust,center.rain);
    const modelGrades=modelRows.map(x=>nationalHourlyGradeForValues(x.wind,x.gust,x.rain));
    if(modelGrades.includes('E'))grade='E';
    else if(modelGrades.includes('D')&&grade!=='E')grade='D';
    return {hour,grade};
  });
}
const cases=[
  [[4,11,0],'A'],[[5,11,0],'B'],[[7,11,0],'C'],[[9,11,0],'D'],[[15,11,0],'E'],
  [[0,12,0],'B'],[[0,15,0],'C'],[[0,18,0],'D'],[[0,25,0],'E'],
  [[0,0,0.1],'B'],[[0,0,0.5],'C'],[[0,0,1.5],'D'],[[0,0,6],'E'],
  [[null,null,null],'?']
];
for(const [[w,g,r],expected] of cases){const got=nationalHourlyGradeForValues(w,g,r); if(got!==expected)throw new Error(`${w}/${g}/${r}: ${got} != ${expected}`)}
const rows=[
 {model:'metno',series:[{hour:6,wind:15,gust:10,rain:0},{hour:7,wind:7,gust:10,rain:null}]},
 {model:'gfs',series:[{hour:6,wind:3,gust:10,rain:0},{hour:7,wind:4,gust:10,rain:0}]}
];
const result=nationalHourlyGradeRows(rows);
if(result.find(x=>x.hour===6).grade!=='E')throw new Error('E severe floor failed');
if(result.find(x=>x.hour===7).grade!=='B')throw new Error('center B / null rain handling failed');
console.log('V1.6.22 hourly grade: PASS');
