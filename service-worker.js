// Aurex Service Worker v2.0 — Network-first HTML + Cache static assets
const CACHE_NAME = 'aurex-v3';
const STATIC_ASSETS = ['/aurex-app/icon-192.png', '/aurex-app/manifest.json'];

// Instalar y cachear solo assets estaticos (NO index.html)
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Solo cacheamos assets estaticos, no el HTML
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

// Activar — limpiar caches viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — Network first para HTML, cache first para assets estaticos
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // No interceptar APIs en tiempo real
  if (url.includes('railway.app') || url.includes('binance') || url.includes('yahoo') || url.includes('api.')) {
    return;
  }

  // Para HTML (index.html o root): siempre red primero para tener version actualizada
  if (e.request.mode === 'navigate' || url.endsWith('.html') || url.endsWith('/aurex-app/') || url === 'https://fmoscon-creator.github.io/aurex-app') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  // Para otros assets: cache first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// Push notifications
self.addEventListener('push', e => {
  let data = { title: '\uD83D\uDD14 Aurex Alerta', body: 'Una alerta se ha disparado', icon: '/aurex-app/icon-192.png', badge: '/aurex-app/icon-192.png' };
  if (e.data) {
    try { data = { ...data, ...e.data.json() }; } catch(err) { data.body = e.data.text(); }
  }
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || '/aurex-app/icon-192.png',
      badge: data.badge || '/aurex-app/icon-192.png',
      tag: 'aurex-alerta',
      renotify: true,
      data: { url: data.url || 'https://fmoscon-creator.github.io/aurex-app/' }
    })
  );
});

// Click en notificacion
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      const url = e.notification.data?.url || 'https://fmoscon-creator.github.io/aurex-app/';
      for (const client of clientList) {
        if (client.url.includes('aurex-app') && 'focus' in client) return client.focus();
      }
      return clients.openWindow(url);
    })
  );
});
