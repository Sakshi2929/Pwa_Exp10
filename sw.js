const staticCacheName = 'site-static-v3';
const dynamicCache = 'site-dynamic-v1';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  'js/app.js',
  'style.css',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
  'images/book1.png',
  'images/books.png',
  'images/courses.png',
  'images/gmail.png',
  'images/translator.png',
  'SignLanguage.jpg',

];
// This code executes in its own worker or thread
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log("Caching shell assets");
      cache.addAll(assets);
    })
  );
});
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      )
    })
  );
  // console.log("Service worker activated");
});



// fetch event
self.addEventListener('fetch', event => {
  //console.log("fetch event",event)
  event.respondWith(
    caches.match(event.request).then(CacheRes => {
      return CacheRes || fetch(event.request).then(fetchRes => {
        return caches.open(dynamicCache).then(cache => {
          cache.put(event.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    })
  );
});


self.addEventListener('push', e => {
  console.log('push', e);
  var body;
  if (e.data) {
    body = e.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'images/translator.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [{
        action: 'explore',
        title: 'Explore this new world',
        icon: 'images/save.png'
      },
      {
        action: 'close',
        title: 'I don\'t want any of this',
        icon: 'images/close.png'
      },
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});

// sync
self.addEventListener('sync', function(event) {
  console.log("sync event", event);
});
