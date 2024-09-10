self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('pwa-cache').then(function(cache) {
        return cache.addAll([
          '/index.html',
          '/static/css/styles.css',
          '/static/js/script.js',
          '/static/images/loge2.webp',
          '/manifest.json'
        ]);
      })
    );
  });
  