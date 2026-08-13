const VERSION='geohid-canarias-v34';const ASSETS=['./','./index.html','./data.js','./manifest.json','./escudo.png','./camion.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{let copy=r.clone();caches.open(VERSION).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)))});
