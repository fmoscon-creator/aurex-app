// Aurex Service Worker v3.0 — Network First critico + Cache busting automatico
// BUILD: 1774678443804
const CACHE_VERSION = 'aurex-1774678443804';
const CACHE_STATIC  = 'aurex-static-1774678443804';

// Archivos que SIEMPRE van a la red primero (nunca quedan stale)
const NETWORK_FIRST = [
  '/',
  '/index.html',
  '/aurex-features.js'
];

// Archivos estaticos que se pueden cachear (cambian poco)
const STATIC_ASSETS = [
  '/manifest.json',
  '/assets/logo/aurex_logo_dark.svg',
  '/assets/logo/aurex_logo_transparent.svg'
];

// ── INSTALL: pre-cachear solo assets estaticos ──
self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE_STATIC).then(function(cache){
      return cache.addAll(STATIC_ASSETS).catch(function(){});
    }).then(function(){
      return self.skipWaiting(); // activar inmediatamente sin esperar
    })
  );
});

// ── ACTIVATE: borrar caches viejas ──
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.map(function(key){
          // Borrar cualquier cache que no sea la version actual
          if(key !== CACHE_VERSION && key !== CACHE_STATIC){
            return caches.delete(key);
          }
        })
      );
    }).then(function(){
      return self.clients.claim(); // tomar control de todas las tabs inmediatamente
    })
  );
});

// ── FETCH: Network First para criticos, Cache First para estaticos ──
self.addEventListener('fetch', function(e){
  var url = new URL(e.request.url);

  // Solo manejar requests del mismo origen
  if(url.origin !== location.origin) return;

  var path = url.pathname;
  var isNetworkFirst = NETWORK_FIRST.some(function(p){ return path === p || path.endsWith('index.html') || path.endsWith('aurex-features.js'); });

  if(isNetworkFirst){
    // NETWORK FIRST: siempre intenta la red, usa cache solo si falla
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .then(function(response){
          // Guardar copia fresca en cache
          if(response && response.status === 200){
            var clone = response.clone();
            caches.open(CACHE_VERSION).then(function(cache){ cache.put(e.request, clone); });
          }
          return response;
        })
        .catch(function(){
          // Sin red: usar cache si existe
          return caches.match(e.request);
        })
    );
  } else {
    // CACHE FIRST para assets estaticos
    e.respondWith(
      caches.match(e.request).then(function(cached){
        return cached || fetch(e.request).then(function(response){
          if(response && response.status === 200){
            var clone = response.clone();
            caches.open(CACHE_STATIC).then(function(cache){ cache.put(e.request, clone); });
          }
          return response;
        });
      })
    );
  }
});
