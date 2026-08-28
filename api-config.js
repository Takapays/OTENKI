/* Traten V1.4.256 static-frontend API bridge.
   The UI can be served by a non-sleeping static host while Flask/Gunicorn remains
   on Render for weather/proxy endpoints. Relative /api/* fetches are transparently
   routed to the API origin. */
(function(){
  'use strict';
  const DEFAULT_API_BASE='https://otenki.onrender.com';
  const meta=document.querySelector('meta[name="traten-api-base"]');
  const configured=(meta?.content||window.TRATEN_API_BASE||DEFAULT_API_BASE).replace(/\/$/,'');
  const pageOrigin=(location.origin||'').replace(/\/$/,'');
  const apiBase=pageOrigin===configured?'':configured;
  window.TRATEN_API_BASE=configured;
  window.tratenApiUrl=function(path){
    const p=String(path||'');
    return apiBase&&p.startsWith('/api/')?apiBase+p:p;
  };

  const nativeFetch=window.fetch.bind(window);
  window.fetch=function(input,init){
    try{
      if(typeof input==='string'){
        return nativeFetch(window.tratenApiUrl(input),init);
      }
      if(input instanceof Request){
        const url=new URL(input.url,location.href);
        if(apiBase&&url.origin===pageOrigin&&url.pathname.startsWith('/api/')){
          const redirected=configured+url.pathname+url.search+url.hash;
          return nativeFetch(new Request(redirected,input),init);
        }
      }
    }catch(_){/* fall through to native fetch */}
    return nativeFetch(input,init);
  };

  // Wake the sleeping Render API only after the static shell has painted.
  // This never blocks TOP display or browser-cache restoration.
  const warm=()=>nativeFetch(configured+'/api/health',{
    method:'GET',mode:'cors',cache:'no-store',credentials:'omit',
    headers:{'X-Traten-Warmup':'static-frontend'}
  }).catch(()=>{});
  const schedule=()=>{
    if('requestIdleCallback' in window)requestIdleCallback(warm,{timeout:2500});
    else setTimeout(warm,700);
  };
  if(document.readyState==='complete')schedule();
  else window.addEventListener('load',schedule,{once:true});
})();
