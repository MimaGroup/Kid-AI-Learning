const CACHE_NAME = "ai-kids-learning-v1"
const OFFLINE_URL = "/offline"

// Assets to precache
const PRECACHE_ASSETS = ["/", "/kids/home", "/offline", "/manifest.json", "/icon-192.jpg", "/icon-512.jpg"]

// Install event - precache essential assets
self.addEventListener("install", (event) => {
  console.log("[v0] Service Worker installing...")
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[v0] Precaching app shell")
      return cache.addAll(PRECACHE_ASSETS)
    }),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[v0] Service Worker activating...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[v0] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return

  // Skip chrome extensions and other non-http requests
  if (!event.request.url.startsWith("http")) return

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("[v0] Serving from cache:", event.request.url)
        return cachedResponse
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type === "error") {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          // Cache successful responses
          caches.open(CACHE_NAME).then((cache) => {
            // Only cache same-origin requests and specific assets
            if (event.request.url.startsWith(self.location.origin)) {
              console.log("[v0] Caching new resource:", event.request.url)
              cache.put(event.request, responseToCache)
            }
          })

          return response
        })
        .catch(() => {
          // If both cache and network fail, show offline page
          console.log("[v0] Offline - serving fallback")
          return caches.match(OFFLINE_URL)
        })
    }),
  )
})

// Background sync for progress data
self.addEventListener("sync", (event) => {
  console.log("[v0] Background sync:", event.tag)
  if (event.tag === "sync-progress") {
    event.waitUntil(syncProgress())
  }
})

async function syncProgress() {
  // Get pending progress data from IndexedDB and sync to server
  console.log("[v0] Syncing progress data...")
  // Implementation would go here
}
