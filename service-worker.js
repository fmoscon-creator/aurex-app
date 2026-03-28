// Aurex Service Worker v4.0 — Network First SIEMPRE para index.html
// BUILD: 1774715400000
const CACHE_VERSION = 'aurex-1774715400000';
const CACHE_STATIC  = 'aurex-static-1774715400000';

// Al instalar — tomar control inmediato
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Al activar — borrar TODOS los caches viejos y tomar control
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(k => k !== CACHE_VERSION && k !== CACHE_STATIC)
            .map(k => { console.log('[SW] Borrando cache viejo:', k); return caches.delete(k); })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — Network First SIEMPRE para index.html y archivos principales
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Para index.html y service-worker.js — SIEMPRE de la red, nunca del cache
  if (url.pathname.endsWith('/') || 
      url.pathname.endsWith('index.html') || 
      url.pathname.endsWith('service-worker.js')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Para aurex-features.js — Network First con fallback a cache
  if (url.pathname.includes('aurex-features.js')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_STATIC).then(c => c.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Para el resto — Cache First (imágenes, fonts, etc.)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok && event.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_STATIC).then(c => c.put(event.request, clone));
        }
        return response;
      });
    })
  );
});