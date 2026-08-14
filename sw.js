const VERSION='geohid-canarias-v35-counter';
const APP_SHELL=['./','./index.html','./data.js','./manifest.json','./escudo.png','./camion.svg','./analytics-config.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET') return;
 const url=new URL(event.request.url);
 event.respondWith(
   fetch(event.request).then(response=>{
     // Guardamos recursos que hayan cargado correctamente para permitir uso posterior sin conexión.
     if(response && (response.ok || response.type==='opaque')){
       const copy=response.clone();
       caches.open(VERSION).then(cache=>cache.put(event.request,copy)).catch(()=>{});
     }
     return response;
   }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html')))
 );
});
