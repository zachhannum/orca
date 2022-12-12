import type {
  BookDetails,
  ProjectData,
  PagedBookContents,
  ProjectGlance,
  Settings,
} from 'types/types';

export interface WindowApi {
  os: () => string;
  closeWindow: () => void;
  toggleMaximized: () => void;
  minimize: () => void;
}
export interface ProjectApi {
  saveProject: (projectData: ProjectData) => void;
  openProject: () => void;
  openProjectPath: (path: string) => void;
  createProject: (bookDetails: BookDetails) => void;
  onOpenProject: (func: (projectData: ProjectData) => void) => void;
}
export interface PagedApi {
  generateBookPdf: (pagedBookContents: PagedBookContents) => void;
  onBookPdfGenerated: (func: (pdfStream: Buffer) => void) => void;
  pagedRenderComplete: () => void;
}
export interface AppApi {
  onRecentProjects: (func: (projectGlances: ProjectGlance[]) => void) => void;
  onSettings: (func: (settings: Settings) => void) => void;
  setSettings: (settings: Settings) => void;
  getRecentProjects: () => void;
  appVersion: () => Promise<any>;
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
    pagedApi: PagedApi;
    appApi: AppApi;
  }
}

export {};
