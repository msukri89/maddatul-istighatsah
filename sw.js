const CACHE_NAME = 'istighatsah-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Menyimpan file ke memori HP (Install)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Membaca file dari memori saat offline (Fetch)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan file dari memori (cache)
        }
        return fetch(event.request); // Ambil dari internet jika belum ada di memori
      })
  );
});