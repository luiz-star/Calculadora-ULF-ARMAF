// calc-v2/service-worker.js
const CACHE_NAME = 'ulf-calc2-v1';

// Adicione aqui todos os arquivos essenciais da calculadora 2:
const ASSETS = [
  './',
  './index.html',
  './styles.css',     // se existir
  './app.js',         // se existir
  './CJC.png',        // se usado
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
      await self.clients.claim();
    })()
  );
});

// Estratégia: network-first para HTML, cache-first para estáticos
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Garante que o SW só atue dentro do seu escopo (subpasta)
  if (!url.pathname.includes('/calc-v2/')) return;

  if (req.destination === 'document' || req.headers.get('accept')?.includes('text/html')) {
    // network-first para páginas
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((res) => res || caches.match('./index.html')))
    );
  } else {
    // cache-first para assets
    event.respondWith(
      caches.match(req).then((res) => res || fetch(req).then((netRes) => {
        const copy = netRes.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return netRes;
      }))
    );
  }
});
