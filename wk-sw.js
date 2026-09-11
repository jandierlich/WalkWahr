const WK_CACHE = "walkwahr-v47";
const WK_FILES = [
  "wk-index.html",
  "wk-style.css",
  "wk-app.js",
  "manifest.json",
  "wk-impressum.html",
  "wk-datenschutz.html",
  "wk-icon-192.png",
  "wk-icon-512.png",
  "wk-icon-180.png",
  "wk-icon-title.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(WK_CACHE).then((cache) => cache.addAll(WK_FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== WK_CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Nur eigene (same-origin) Dateien aus dem Cache bedienen.
  // Externe Live-Quellen (Kartenkacheln, Leaflet-CDN, Open-Meteo) werden
  // bewusst NICHT gecacht, damit immer aktuelle/lebende Daten geladen werden.
  if (url.origin !== self.location.origin) {
    return; // Standard-Netzwerkverhalten, kein Eingriff
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => cached);
    })
  );
});
