async function Initialize() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service worker not supported here');
  }

  SW_DATA.swRegistration = await navigator
    .serviceWorker.register('/serviceWorker.js', {
      updateViaCache: "none",
    });

  console.log(SW_DATA.swRegistration);


  // check if new service worker get the controll
  navigator.serviceWorker.addEventListener('controllerchange' , () => {
    SW_DATA.serviceWorker = navigator.serviceWorker.controller;
  });


  // listen for messages from service worker
  navigator.serviceWorker.addEventListener('message', (e) => {
    console.log('NEW MESSAGE FROM SW');
    if (e.ports && e.ports[0]) {
      sendSWMessage({ message: 'hi cutti' }, e.ports[0]);
    }
  });
}


async function sendSWMessage(msg: any, target?: MessagePort) {
  if (target) {
    target.postMessage(msg);
  } else if (SW_DATA.serviceWorker) {
    SW_DATA.serviceWorker.postMessage(msg);
  } else {
    navigator.serviceWorker.controller.postMessage(msg);
  }
}


interface SW_DATA_TYPE {
  serviceWorker: ServiceWorker | null,
  swRegistration: null | ServiceWorkerRegistration,
}

const SW_DATA: SW_DATA_TYPE = {
  serviceWorker: null,
  swRegistration: null,
}

const serviceWorker = {
  SW_DATA,
  Initialize,
}

export default serviceWorker;