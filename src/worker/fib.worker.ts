onmessage = (e) => {
  console.log('MESSAGE RECEIVED');
  console.log(e.data);

  const finNumber = Number(e.data);
  const result = fibo(finNumber);

  self.postMessage({ result }, undefined);
}

function fibo(n: number): number {
  if (n < 2) return n;
  return fibo(n-1) + fibo(n-2);
}

export default null as any;