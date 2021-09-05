'use strict';

const version = 3;
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
}


async function onInstall(e) {
  console.log('install');
  self.skipWaiting();
}

function onActivate(e) {
  console.log('activated');
  e.waitUntil(handleActivation());
}

async function handleActivation() {
  await clients.claim();
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