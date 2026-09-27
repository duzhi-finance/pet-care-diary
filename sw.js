/* 毛孩日誌 Service Worker
   唯一用途：把 App 產生的 .ics 以「真正的網址」回應（Content-Type: text/calendar），
   iPhone Safari 才會跳出「加入行事曆 / 加入全部」，而不是只顯示檔案預覽。 */
const ICS_CACHE = 'pcd-ics';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if(url.origin !== self.location.origin || !/\/ics\/[^/]+\.ics$/.test(url.pathname)) return;
  e.respondWith(
    caches.open(ICS_CACHE)
      .then(c => c.match(url.origin + url.pathname))
      .then(r => r || new Response('行事曆檔案已過期，請回到毛孩日誌重新匯出。', {status:404, headers:{'Content-Type':'text/plain; charset=utf-8'}}))
  );
});
