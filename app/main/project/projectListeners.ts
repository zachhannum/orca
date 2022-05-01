import { ipcMain } from 'electron';
import type { BrowserWindow } from 'electron';
import { BookDetails } from '../../types/types';
import createProject from './createProject';

const setupProjectListeners = (mainWindow: BrowserWindow) => {
  ipcMain.on('createProject', async (_event, arg: BookDetails) => {
    createProject(mainWindow, arg);
  });
};

export default setupProjectListeners;
