const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    '/index.html',
    '/static/css/styles.css',
    '/static/css/materialize.min.css',
    '/static/css/materialize.css',
    '/static/js/materialize.min.js',
    '/static/js/materialize.js',
    '/static/js/script.js',
    '/static/images/loge2.webp',
    '/manifest.json'
];

// Evento de instalación
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
            .then(self.skipWaiting())
    );
});

// Evento de activación (para limpiar cachés antiguas)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Evento de fetch (manejo de solicitudes de red)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
