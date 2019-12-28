importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([{
    url: '/index.html',
    revision: '1'
  },
  {
    url: '/nav.html',
    revision: '1'
  },
  {
    url: '/Icon.png',
    revision: '1'
  },
  {
    url: '/default.png',
    revision: '1'
  },
  {
    url: '/favicon.ico',
    revision: '1'
  },
  {
    url: '/manifest.json',
    revision: '1'
  },
  {
    url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js',
    revision: '1'
  },
]);

workbox.routing.registerRoute(
  new RegExp('/detailteam.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'detailTeam'
  })
);


workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('/js/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'js'
  })
);

workbox.routing.registerRoute(
  new RegExp('/css/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'css'
  })
);

workbox.routing.registerRoute(
  new RegExp('/images/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'images'
  })
);


workbox.routing.registerRoute(
  new RegExp('https://fonts.googleapis.com/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-icon',
  })
);


workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'soccer-site',
  })
);

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'images/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});