const CACHE_NAME = 'maddatul-istighatsah-v8'; // Versi 3 untuk memaksa update
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 1. Install & Paksa Aktif (Skip Waiting)
self.addEventListener('install', event => {
  self.skipWaiting(); // Memaksa HP langsung menggunakan versi terbaru ini
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 2. Bersihkan Brankas Lama (Activate)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName); // Menghapus memori versi error sebelumnya
          }
        })
      );
    })
  );
});

// 3. Strategi "Network First" (Internet Dulu, Baru Offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
