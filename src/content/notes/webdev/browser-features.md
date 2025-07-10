---
title: 'Browser Features'
slug: 'browser-features'
description: 'Overview of browser storage APIs and client-side data management'
category: 'Webdev'
tags: ['browser', 'storage', 'cookies', 'localstorage', 'indexeddb', 'webworkers', 'serviceworkers']
publishedAt: '2025-07-10'
---

## Cookies

Piece of information stored/accessed by your browser. Saved as key/value pairs.

```typescript
document.cookie = 'username=John; expires=Sat, 8 Jun 2019 12:00:00 UTC';
```

**Notes:**

- Used to remember information about certain things about the user or the application.
- You can add expiration date to it with `expires='expiration date'`
- You can tell

## Indexed DB

IndexedDB is a low-level API for client-side storage of larger amounts of structured data,
including files/blobs. This API uses indexes to enable high-performance searches of this data.

## Local Storage vs Session Storage

They have the role to store data as key/value pairs

LocalStorage is the same as SessionStorage, but it persists the data even when the
browser is closed and reopened(i.e: it has no expiration time) whereas in sessionStorage
data gets cleared when the page session ends.

## Web Workers

Web Workers allow you to run scripts in background threads, separate from the main execution thread.

```typescript
// Main thread
const worker = new Worker('worker.js');
worker.postMessage({ data: 'Hello from main thread' });
worker.onmessage = event => console.log(event.data);

// worker.js
self.onmessage = event => {
  const result = heavyComputation(event.data);
  self.postMessage(result);
};
```

**Notes:**

- Cannot access DOM directly
- Communicate with main thread via `postMessage()`
- Useful for CPU-intensive tasks

## Service Workers

Service Workers act as a proxy between web app, browser, and network, enabling offline functionality and background sync.

```typescript
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js - Cache first strategy
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
```

**Notes:**

- Runs in background, even when app is closed
- Can intercept network requests
- Enables PWA features like offline support
