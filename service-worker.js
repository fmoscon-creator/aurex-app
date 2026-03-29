// Aurex Service Worker v6.0 - iOS Safari Compatible
// BUILD: 1774840000000
var CACHE_VERSION = 'aurex-v6-1774840000000';

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache) {
      return cache.addAll(['/aurex-app/manifest.json']);
    }).catch(function() {})
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_VERSION; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);

  if(url.pathname === '/aurex-app/' ||
     url.pathname === '/aurex-app/index.html' ||
     url.pathname.indexOf('.html') !== -1 ||
     url.pathname.indexOf('service-worker') !== -1) {
    event.respondWith(
      fetch(event.request, {cache: 'no-store'})
        .catch(function() {
          return caches.match('/aurex-app/');
        })
    );
    return;
  }

  if(url.pathname.indexOf('aurex-features.js') !== -1) {
    event.respondWith(
      fetch(event.request, {cache: 'no-cache'})
        .then(function(res) {
          if(res.ok) {
            caches.open(CACHE_VERSION).then(function(c) { c.put(event.request, res.clone()); });
          }
          return res;
        })
        .catch(function() { return caches.match(event.request); })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if(cached) return cached;
      return fetch(event.request).then(function(res) {
        if(res.ok && event.request.method === 'GET') {
          caches.open(CACHE_VERSION).then(function(c) { c.put(event.request, res.clone()); });
        }
        return res;
      });
    })
  );
});
