const CACHE = "trunojoyo-v3";
const ASSETS = ["./", "./index.html", "./manifest.json", "./icon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // PENTING: JANGAN sentuh permintaan ke luar situs ini (Firestore, Firebase Storage, Firebase Auth, dll).
  // Koneksi real-time Firestore memakai teknik streaming khusus yang rusak kalau "ditangkap" Service Worker.
  // Cukup biarkan lewat apa adanya (browser yang urus langsung).
  if (url.origin !== self.location.origin) return;

  // Hanya method GET yang aman di-cache; biarkan POST/PUT/dll lewat apa adanya juga.
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).catch(() => caches.match("./index.html")))
  );
});
