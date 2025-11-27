const CACHE_NAME = 'meuapp-ulfs-v1';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest'
  // Se quiser, adicione outros arquivos estáticos aqui.
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve())))
    )
  );
  self.clients.claim();
});

// network-first para HTML; cache-first para estáticos
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const accept = req.headers.get('accept') || '';

  if (req.mode === 'navigate' || accept.includes('text/html')) {
    event.respondWith(
      fetch(req).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('./')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const clone = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
      return res;
    }).catch(() => cached))
  );
});