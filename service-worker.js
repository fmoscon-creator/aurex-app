// Aurex Service Worker v5.0 â Auto-update garantizado
// BUILD: 1774717200000
const CACHE_VERSION = 'aurex-1774717200000';

// Responder al mensaje SKIP_WAITING para activarse inmediatamente
self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', event => {
  // NO hacer skipWaiting aqui - esperamos el mensaje del cliente
  // Precachear solo recursos estaticos esenciales
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      return cache.addAll(['/aurex-app/manifest.json']);
    }).catch(() => {})
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // index.html y raiz: SIEMPRE de la red
  if(url.pathname === '/aurex-app/' || 
     url.pathname === '/aurex-app/index.html' ||
     url.pathname.endsWith('service-worker.js')) {
    event.respondWith(
      fetch(event.request, {cache: 'no-store'})
        .catch(() => caches.match('/aurex-app/'))
    );
    return;
  }

  // aurex-features.js: Network First
  if(url.pathname.includes('aurex-features.js')) {
    event.respondWith(
      fetch(event.request, {cache: 'no-cache'})
        .then(res => {
          if(res.ok) {
            caches.open(CACHE_VERSION).then(c => c.put(event.request, res.clone()));
          }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Resto: Cache First
  event.respondWith(
    caches.match(event.request).then(cached => {
      if(cached) return cached;
      return fetch(event.request).then(res => {
        if(res.ok && event.request.method === 'GET') {
          caches.open(CACHE_VERSION).then(c => c.put(event.request, res.clone()));
        }
        return res;
      });
    })
  );
});