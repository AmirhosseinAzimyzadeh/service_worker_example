'use strict';

const version = 4;
const cacheName = `pageCache-${version}`;

const urlsToCache = [
  '/',
  '/second',
  '/bundle.js',
];

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('message', onMessage);

main().catch(console.error);

async function main(e) {
  console.log('service worker is starting ...');

  // send message tpo the page
  await sendMessage({ sw: 'mesage from sw' });

  // start caching files
  await cacheFiles();
}


async function onInstall(e) {
  console.log('install');
  self.skipWaiting();
}

async function onActivate(e) {
  console.log('activated');
  await cacheFiles(true);
  e.waitUntil(handleActivation());
}

async function handleActivation() {
  await clients.claim();
  await clearOutDatedCaches();
  console.log(`Service Worker Activated version:${version}`);
}

function onMessage(e) {
  console.log('Message recieved in service worker');
  console.log(e.data);
}

async function sendMessage(data) {
  const allClients = await clients.matchAll({ includeUncontrolled: true });
  return Promise.all(
    allClients.map(function clientMsg(client) {
      const channel = new MessageChannel();
      channel.port1.onmessage = onClientMessageHandler;
      return client.postMessage(data, [channel.port2]);
    })
  )
}

function onClientMessageHandler({ data }) {
  console.log('message from client');
  console.log({ data });
}


async function cacheFiles(forceReload = false) {
  const cache = await caches.open(cacheName);

  return Promise.all(
    urlsToCache.map(async (url) => {
      try {
        let res;

        // check cache if already there
        if (!forceReload) {
          res = await cache.match(url);
          if (res) return res;
        }


        // make a request
        let fetchOptions = {
          method: 'GET',
          cache: 'no-cache',
          credentials: 'omit',
        };

        console.log(`caching ${url} ...`);

        res = await fetch(url, fetchOptions);
        if (res.ok) {
          await cache.put(url, res.clone());
        }


      } catch (error) {
        console.log({ networkRequestError: error });
      }
    })
  );
}


async function clearOutDatedCaches() {
  const cacheNames = await caches.keys();
  const oldCacheNames = cacheNames.filter((storedCacheNames) => {
    const [cacheNameIndicator, cacheVersion] = storedCacheNames.split('-');
    if (cacheNameIndicator === cacheName.split('-')[0]) {
      if (Number(cacheVersion) !== version) {
        return true;
      }
      return false;
    }
  });

  return Promise.all(
    oldCacheNames.map((name) => caches.delete(name))
  );
}