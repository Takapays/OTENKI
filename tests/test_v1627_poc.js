function isoLocal(v){const s=String(v||'').trim();if(!s)return'';if(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:?\d{2})$/.test(s))return s;const m=s.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/);return m?`${m[1]}T${m[2]}:${m[3]}:${m[4]||'00'}+09:00`:s}
function jstParts(value){const d=new Date(isoLocal(value));if(!Number.isFinite(d.getTime()))return null;const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hour12:false}).formatToParts(d);const o={};for(const p of parts)if(p.type!=='literal')o[p.type]=p.value;let h=Number(o.hour);if(h===24)h=0;return {date:`${o.year}-${o.month}-${o.day}`,hour:h}}
function grade(w,g,r){if(![w,g,r].some(Number.isFinite))return'?';return 'A'}
let a=jstParts('2026-09-09T21:00:00Z'); if(a.date!=='2026-09-10'||a.hour!==6)throw Error(JSON.stringify(a));
let b=jstParts('2026-09-10 06:00'); if(b.date!=='2026-09-10'||b.hour!==6)throw Error(JSON.stringify(b));
if(grade(null,null,null)!=='?')throw Error('empty must be ?');
console.log('V1.6.27 PoC parser tests: PASS');
