import type { BookDetails } from '../types/types';

export interface WindowApi {
  os: () => string;
  closeWindow: () => void;
  toggleMaximized: () => void;
  minimize: () => void;
}
export interface ProjectApi {
  createProject: (bookDetails: BookDetails) => void;
}
declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing(): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
    windowApi: WindowApi;
    projectApi: ProjectApi;
  }
}

export {};
