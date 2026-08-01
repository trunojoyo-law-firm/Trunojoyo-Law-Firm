// File ini WAJIB ada di root situs (sejajar dengan index.html) dan WAJIB bernama persis
// "firebase-messaging-sw.js" — Firebase mencarinya dengan nama ini secara otomatis.
// Berfungsi menampilkan notifikasi push saat aplikasi TIDAK sedang dibuka (background/tertutup).

importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCcTB6WKPqI6WwioA552w_Tk9pzcp92ePA",
  authDomain: "trunojoyo-law-firm.firebaseapp.com",
  projectId: "trunojoyo-law-firm",
  storageBucket: "trunojoyo-law-firm.firebasestorage.app",
  messagingSenderId: "974858193625",
  appId: "1:974858193625:web:fbe6cc79fad2fb94428cc8",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || "Tenggat Kasus", {
    body: n.body || "",
    icon: "./icon.png",
    tag: payload.data && payload.data.deadlineId ? "tlf-deadline-" + payload.data.deadlineId : undefined,
  });
});
