import app from './layout_maker/appLayout';
import serviceWorker from './service_worker/serviceWorkerInitializer';

app.render();

// initiate service worker
serviceWorker.Initialize().then(() => {
  console.log('service worker initialize')
}).catch((e) => {
  console.error(e)
});