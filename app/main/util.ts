/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
import { URL } from 'url';
import path from 'path';
import { BrowserWindowConstructorOptions } from 'electron';

export let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 1212;
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  };
}

export const getPlatformWindowSettings = () => {
  if (process.platform === 'darwin') {
    return {
      titleBarOverlay: {
        color: '#29292E',
      },
      vibrancy: 'under-window',
    } as BrowserWindowConstructorOptions;
  }
  return { backgroundColor: '#29292E' };
};
