import FibWorker from '../worker/fib.worker';

const applicationRoot: HTMLElement = document.getElementById('root');

const appContainer = document.createElement('div');

const startButton = document.createElement('button');
startButton.innerText = 'Start';

const stopButton = document.createElement('button');
stopButton.innerText = 'Stop';

const result = document.createElement('div');
result.innerText = '0';

const results = document.createElement('div');


let initializer = 0;
// initiate worker
const worker: Worker = new FibWorker();


startButton.addEventListener('click', () => {
  initializer++;
  worker.postMessage(initializer);
  result.innerText = 'calculating ...';


  worker.onmessage = (e) => {
    console.log('MESSAGE FROM FIB WORKER');
    console.log({ data: e.data });
    const newResult = document.createElement('div');
    newResult.innerText = e.data.result;
    // appContainer.appendChild(newResult);
    results.prepend(newResult);

    initializer++;
    worker.postMessage(initializer);
    result.innerText = 'calculating ...';
  }
});

stopButton.addEventListener('click', () => {
  worker.terminate();
  result.innerText = 'TERMINATED';
})


function render() {
  appContainer.appendChild(startButton);
  appContainer.appendChild(stopButton);
  appContainer.appendChild(result);
  appContainer.appendChild(results);
  applicationRoot.appendChild(appContainer);
}

const app = {
  render,
  appContainer,
  applicationRoot,
  startButton,
}

export default app;