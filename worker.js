let timerId = undefined;  
addEventListener('message', ({data}) => {
  switch(data.mission) {
    case 'start':
      if(timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      timerId = setInterval(() => {
        const currentInSecond = Math.floor(new Date().getTime() / 1000);
        const dt = currentInSecond - data.expireDate;
        if(dt > 0) {
          postMessage('logout');
          clearInterval(timerId);
          self.close();
        }  
      }, 1000)
      
    break;
    case 'stop':
      clearInterval(timerId);
      timerId = null;
      self.close();
    break;
  }
})