const CACHE_NAME = "siam-journey-demo-v1";
const urlsToCache = [
  ".",
  "./index.html",
  "./style.css"
];

// 安裝 Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 啟用 Service Worker
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// 攔截請求
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});