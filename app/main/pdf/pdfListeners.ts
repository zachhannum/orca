import { ipcMain, BrowserWindow } from 'electron';
import { PagedBookContents } from '../../types/types';
import generatePdf from './generatePdf';

const setupProjectListeners = (mainWindow: BrowserWindow) => {
  ipcMain.on('generatePdf', async (_event, arg: PagedBookContents) => {
    generatePdf(mainWindow, arg);
  });
};

export default setupProjectListeners;
