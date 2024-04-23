const CACHE_NAME = 'v1';
const urlsToCache = [
  'images/logo.svg',
  'css/style.css',
  'scripts/script.js',
  'index.html',
  '/pages/our-approach.html',
  '/pages/leadership.html'
];

// self.addEventListener('install', event => {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         if (response) {
//           // If there is a response, log the URL and return the cached response
//           console.log(`Serving ${event.request.url} from cache`);
//           return response;
//         }
//         // If no response, fetch from network and log
//         console.log(`Fetching ${event.request.url} from network`);
//         return fetch(event.request).then(networkResponse => {
//           return caches.open(CACHE_NAME).then(cache => {
//             cache.put(event.request, networkResponse.clone());
//             return networkResponse;
//           });
//         });
//       })
//   );
// });

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.addAll(urlsToCache);
        })
        .then(() => self.skipWaiting()) // Forces the waiting Service Worker to become the active Service Worker
    );
  });
  
  self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim()); // Claims clients immediately for the active worker to take control
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
    );
  });
  