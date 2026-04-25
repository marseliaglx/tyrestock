// sw.js - Service Worker for Marek's Tyre Stock Manager
const CACHE_NAME = 'marek-tyre-stock-v3';
const ASSETS = [
    './',
    './index.html',
    './sw.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const requestUrl = new URL(event.request.url);
    const isNavigation = event.request.mode === 'navigate' ||
        (event.request.headers.get('accept') || '').includes('text/html');

    event.respondWith(
        (async () => {
            try {
                const networkResponse = await fetch(event.request, { cache: 'no-store' });
                if (requestUrl.origin === location.origin && networkResponse.ok) {
                    const cache = await caches.open(CACHE_NAME);
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            } catch (error) {
                const cached = await caches.match(event.request);
                if (cached) return cached;
                if (isNavigation) return caches.match('./index.html');
                throw error;
            }
        })()
    );
});
