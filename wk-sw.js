const WK_CACHE = "walkwahr-v52-1";
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

  // Netzwerk-first: Die aktuelle Version einer eigenen Datei wird bei
  // bestehender Verbindung IMMER frisch vom Server geholt und der Cache
  // dabei aktualisiert. Der Cache dient nur noch als Fallback, wenn kein
  // Netz verfügbar ist – nicht mehr als Standardquelle.
  //
  // Hintergrund/Grund für den Wechsel: Vorher war die Auslieferung
  // Cache-first. Ein bereits installierter Service Worker aktualisiert
  // sein Cache aber NUR, wenn sich wk-sw.js selbst byteweise ändert –
  // reine Fixes in wk-app.js/wk-index.html/wk-style.css (z. B. an der
  // Tour-Detail-Karte) kamen dadurch auf Geräten mit alter SW-Version nie
  // an, obwohl sie auf dem Server längst aktualisiert waren. Das erklärte
  // das gemeldete "mal geht's, mal nicht". Mit Netzwerk-first ist das
  // unabhängig vom SW-Lebenszyklus: Es zählt einfach der aktuelle Stand
  // vom Server, sobald online.
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(WK_CACHE).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
