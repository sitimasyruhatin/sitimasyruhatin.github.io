import 'regenerator-runtime'; /* for async await transpile */
import {
  clientsClaim, setCacheNameDetails, skipWaiting, cacheNames,
} from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { precacheAndRoute }
  from 'workbox-precaching';
import { ExpirationPlugin }
  from 'workbox-expiration';
import { CacheableResponsePlugin }
  from 'workbox-cacheable-response';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import CONFIG from './globals/config';

clientsClaim();
skipWaiting();

setCacheNameDetails(CONFIG.CACHE_NAME);

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  new RegExp(CONFIG.BASE_SMALL_IMAGE_URL),
  new CacheFirst({
    cacheName: cacheNames.precache,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 300,
        purgeOnQuotaError: true,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

registerRoute(
  new RegExp(CONFIG.BASE_LARGE_IMAGE_URL),
  new CacheFirst({
    cacheName: cacheNames.precache,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 300,
        purgeOnQuotaError: true,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

registerRoute(
  new RegExp(CONFIG.BASE_URL),
  new StaleWhileRevalidate({
    cacheName: cacheNames.precache,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 300,
        purgeOnQuotaError: true,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);
