self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('static-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/_next/static/css/styles.chunk.css',
        '/icons/icon-48x48.png',
        '/icons/icon-72x72.png',
        '/icons/icon-96x96.png',
        '/icons/icon-128x128.png',
        '/icons/icon-144x144.png',
        '/icons/icon-152x152.png',
        '/icons/icon-192x192.png',
        '/icons/icon-256x256.png',
        '/icons/icon-384x384.png',
        '/icons/icon-512x512.png',
      ])
    }),
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    }),
  )
})

// 알림 기능
// push 이벤트: 서버에서 전달받은 데이터를 기반으로 알림을 표시합니다.
self.addEventListener('push', event => {
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: '/icon.png', // 알림에 표시할 아이콘
    badge: '/badge.png', // 상태바에 표시할 작은 아이콘
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// notificationclick 이벤트: 사용자가 알림을 클릭했을 때의 동작을 정의합니다.
self.addEventListener('notificationclick', event => {
  event.notification.close()

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      if (clientList.length > 0) {
        // 이미 열린 클라이언트가 있다면 포커스
        return clientList[0].focus()
      } else {
        // 새 창 열기
        return clients.openWindow('/')
      }
    }),
  )
})
