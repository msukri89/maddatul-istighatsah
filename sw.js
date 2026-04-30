// === TITIPAN KODE ONESIGNAL DI BARIS PALING ATAS ===
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

const CACHE_NAME = 'maddatul-istighatsah-v11';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './sampul.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Abaikan permintaan ke Google Sheets agar data selalu baru jika ada internet
  if (event.request.method !== 'GET' || event.request.url.includes('script.google.com') || event.request.url.includes('onesignal.com')) {
      return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
