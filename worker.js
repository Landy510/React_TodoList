addEventListener('message', ({data}) => {
  const timerId =setInterval(() => {
    const currentInSecond = Math.floor(new Date().getTime() / 1000);
    const dt = currentInSecond - data;
    if(dt > -1296000) {
      postMessage('logout');
      clearInterval(timerId);
    }
  }, 1000)
  
})