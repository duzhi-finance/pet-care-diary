/* 毛孩日誌：此 Service Worker 已停用。
   舊版曾用它匯出 .ics，但 iOS 匯入時會另外向伺服器下載而取得 404。
   現在改用 data: 連結匯出；此檔只負責把已安裝的舊版 Service Worker 自動移除。 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  self.registration.unregister().then(() => self.clients.matchAll()).then(cs => cs.forEach(c => c.navigate(c.url)))
));
