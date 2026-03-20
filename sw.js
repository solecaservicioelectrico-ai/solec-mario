const CACHE = "solec-mario-v1";
const ASSETS = [
  "/solec-mario/",
  "/solec-mario/solec_mario_v4.html"
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(e) {
  // Network first — siempre intenta la red, cache como fallback
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request);
    })
  );
});