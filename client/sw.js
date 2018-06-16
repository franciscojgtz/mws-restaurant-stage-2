const staticCacheName = 'restaurant-reviews-static-v3';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(staticCacheName).then(cache => cache.addAll([
    '/',
    '/restaurant.html',
    '/css/styles.css',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/data/restaurants.json',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/node_modules/idb/lib/idb.js',
  ])));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.filter(cacheName => cacheName.startsWith('restaurant-reviews-') &&
                  cacheName !== staticCacheName).map(cacheName => caches.delete(cacheName)))));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => cachedResponse || fetch(event.request)));
});

self.addEventListener('message', (event) => {
  if (event.data.activate === 'true');
  self.skipWaiting();
});
