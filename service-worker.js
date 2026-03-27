// Aurex Service Worker v1.1 — Push Notifications + Offline Cache
const CACHE_NAME = 'aurex-v2';
const ASSETS = ['/aurex-app/', '/aurex-app/index.html'];

// Instalar y cachear assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
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

// Fetch — cache first para assets, network first para API
self.addEventListener('fetch', e => {
  if (e.request.url.includes('railway.app') || e.request.url.includes('binance') || e.request.url.includes('yahoo')) {
    return; // No cachear APIs en tiempo real
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// ── PUSH NOTIFICATION ──────────────────────────────────────
self.addEventListener('push', e => {
  let data = { title: '🔔 Aurex Alerta', body: 'Una alerta se ha disparado', icon: '/aurex-app/icon-192.png', badge: '/aurex-app/icon-192.png' };
  
  if (e.data) {
    try { data = { ...data, ...e.data.json() }; } 
    catch(err) { data.body = e.data.text(); }
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

// Click en notificación — abrir la app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      const url = e.notification.data?.url || 'https://fmoscon-creator.github.io/aurex-app/';
      for (const client of clientList) {
        if (client.url.includes('aurex-app') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
