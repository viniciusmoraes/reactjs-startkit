import { Workbox } from 'workbox-window';

export const register = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    const wb = new Workbox('/service-worker.js');

    wb.register();
  }
}
