---
title: 'Browser Features'
slug: 'browser-features'
description: 'Overview of browser storage APIs and client-side data management'
category: 'Webdev'
tags: ['browser', 'storage', 'cookies', 'localstorage', 'indexeddb']
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
