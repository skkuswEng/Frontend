self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('static-cache-v1').then(cache => {
      return cache.addAll(['/', '/_next/static/css/styles.chunk.css', '/icons/icon512_maskable.png', '/icons/icon512_rounded.png'])
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
