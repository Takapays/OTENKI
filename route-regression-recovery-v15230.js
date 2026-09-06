// Traten V1.5.230: route-regression recovery guard.
// Historical route enrichments often lived in representativeCourseExpandedPointDefs(),
// while some UI surfaces consumed course.points directly. That allowed already-refined
// routes to appear as coarse trailhead -> summit -> trailhead routes again.
(function(){'use strict';
const VERSION='1.5.230';
if(typeof representativeCourseOptions!=='function'||typeof representativeCourseExpandedPointDefs!=='function')return;
const originalOptions=representativeCourseOptions;
function keyFor(m){let k=String(m||'').trim();try{k=canonicalMountainName(k);}catch(_){}return k;}
function materialize(mountain,course){
  if(!course)return course;
  let defs=Array.isArray(course.points)?course.points:[];
  try{defs=representativeCourseExpandedPointDefs(mountain,course)||defs;}catch(_){}
  const pts=defs.map(p=>Array.isArray(p)?[...p]:p);
  return {...course,points:pts,_expandedMaterializedV15230:true};
}
representativeCourseOptions=function(mountain){
  const key=keyFor(mountain);
  const raw=originalOptions(mountain)||[];
  const materialized=raw.map(c=>materialize(key,c));
  // Remove a coarse three-point duplicate only when a refined route with the same
  // access start already exists. This specifically prevents reappearance of old
  // Shari/Gassan/Ibuki/Higashi-Akaishi coarse duplicates without deleting unique routes.
  return materialized.filter((c,idx,all)=>{
    if(!Array.isArray(c.points)||c.points.length>3)return true;
    const start=String(c.points[0]?.[1]||'').trim();
    if(!start)return true;
    return !all.some((d,j)=>j!==idx&&Array.isArray(d.points)&&d.points.length>3&&String(d.points[0]?.[1]||'').trim()===start);
  });
};
try{if(typeof rebuildRouteDerivedCaches==='function')rebuildRouteDerivedCaches();}catch(_){}
window.TRATEN_ROUTE_REGRESSION_RECOVERY_V15230=Object.freeze({
  version:VERSION,
  policy:'materialize historical expanded route points on every representative-course UI surface; hide only same-access coarse duplicates',
  preservesCt:true,
  preservesCoordinates:true
});
})();
