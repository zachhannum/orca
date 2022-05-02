import type { BookDetails, Project } from '../types/types';

export interface WindowApi {
  os: () => string;
  closeWindow: () => void;
  toggleMaximized: () => void;
  minimize: () => void;
}
export interface ProjectApi {
  saveProject: (projectContent: Project) => void;
  openProject: () => void;
  createProject: (bookDetails: BookDetails) => void;
  onOpenProject: (func: (projectContent: Project) => void) => void;
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
