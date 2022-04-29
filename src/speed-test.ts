// https://www.npmjs.com/package/network-speed-test

// 文件參考：https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/downlink
// export function getSpeedWithDnlink() {
//   const connection: any = window.navigator.connection;
//   if (connection && connection.downlink) {
//     return (connection.downlink * 1024) / 8;
//   }
// }

// Ajax get file
export function getSpeedWithAjax(url: string): Promise<any> {
  return new Promise((resolve) => {
    const start = new Date().getTime();
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const end = new Date().getTime();
        const length = xhr.getResponseHeader("Content-Length") || 0; // bytes
        const size = +length / 1024; // KB
        const speed = (size * 1000) / (end - start); // KB/s
        resolve(speed);
      }
    };
    xhr.open("GET", url);
    xhr.send();
  }).catch((err) => {
    throw err;
  });
}

// 單位: KB/s
export function getNetSpeed(url: string, times: number) {
  const items: Promise<number>[] = [...Array(times)].map(() =>
    getSpeedWithAjax(url + `?t=${(Math.random() * Date.now()).toString()}`)
  );

  return Promise.all(items).then((speeds) => {
    const sum = speeds.reduce((prev, current) => prev + current, 0);
    return sum / times;
  });
}
