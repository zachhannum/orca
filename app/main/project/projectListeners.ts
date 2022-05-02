import { ipcMain } from 'electron';
import type { BrowserWindow } from 'electron';
import { BookDetails } from '../../types/types';
import createProject from './createProject';
import openProjectDialog from './openProjectDialog';
import saveProject from './saveProject';

const setupProjectListeners = (mainWindow: BrowserWindow) => {
  ipcMain.on('createProject', async (_event, arg: BookDetails) => {
    createProject(mainWindow, arg);
  });
  ipcMain.on('openProject', async (_event, _arg) => {
    openProjectDialog(mainWindow);
  });
  ipcMain.on('saveProject', async (_event, arg) => {
    saveProject(arg);
  });
};

export default setupProjectListeners;
