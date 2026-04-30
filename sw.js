const CACHE_NAME = 'maddatul-istighatsah-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png' // Pastikan Anda memiliki file icon.png di folder yang sama
];

// Saat aplikasi pertama kali dibuka (Install)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Saat aplikasi memanggil data (Fetch)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ada di cache (offline), tampilkan. Jika tidak, ambil dari internet.
        return response || fetch(event.request);
      })
  );
});
