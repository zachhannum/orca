import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import type {
  BookDetails,
  ProjectData,
  PagedBookContents,
  ProjectGlance,
} from '../types/types';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example', 'window', 'pagedContents'];
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
      const validChannels = ['ipc-example', 'window', 'pagedContents'];
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
  openProject: () => {
    ipcRenderer.send('openProject');
  },
  saveProject: (projectData: ProjectData) => {
    ipcRenderer.send('saveProject', projectData);
  },
  createProject: (bookDetails: BookDetails) => {
    ipcRenderer.send('createProject', bookDetails);
  },
  onOpenProject: (func: (projectData: ProjectData) => void) =>
    ipcRenderer.on('openProject', (_event, arg) => func(arg)),
});

contextBridge.exposeInMainWorld('pagedApi', {
  generateBookPdf: (pagedBookContents: PagedBookContents) => {
    ipcRenderer.send('generatePdf', pagedBookContents);
  },
  onBookPdfGenerated: (func: (pdfStream: Buffer) => void) =>
    ipcRenderer.on('pdfGenerated', (_event, arg) => func(arg)),
  pagedRenderComplete: () => ipcRenderer.send('pagedRenderComplete'),
});

contextBridge.exposeInMainWorld('appApi', {
  onRecentProjects: (func: (projectGlances: ProjectGlance[]) => void) =>
    ipcRenderer.on('recentProjects', (_event, arg) => func(arg)),
});
