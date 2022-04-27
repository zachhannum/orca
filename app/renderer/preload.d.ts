export interface CalamusApi {
  os: () => string;
  closeWindow: () => void;
  toggleMaximized: () => void;
  minimize: () => void;
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
    calamusApi: CalamusApi;
  }
}

export {};
