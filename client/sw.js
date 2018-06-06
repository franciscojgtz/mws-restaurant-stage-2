const staticCacheName = 'restaurant-reviews-static-v2';
const allCaches = [
  staticCacheName,
];

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
  ])));
});

self.addEventListener('activate', event => { console.log(event);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('restaurant-reviews-') &&
                  cacheName != staticCacheName;
        }).map(cacheName => {
            	console.log(`delete ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  //console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if(event.data.activate == 'true');
  self.skipWaiting();
});