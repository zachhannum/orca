import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { createProject } from './project';
import type { BookDetails } from '../types/types';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example', 'window'];
      if (validChannels.includes(channel)) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
          func(...args);
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
      }

      return undefined;
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example', 'window'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
});

contextBridge.exposeInMainWorld('windowApi', {
  os: () => process.platform,
  closeWindow: () => ipcRenderer.send('window', 'close'),
  toggleMaximized: () => ipcRenderer.send('window', 'toggleMaximize'),
  minimize: () => ipcRenderer.send('window', 'minimize'),
});

contextBridge.exposeInMainWorld('projectApi', {
  createProject: (bookDetails: BookDetails) => {
    ipcRenderer.send('createProject', bookDetails);
  },
});
