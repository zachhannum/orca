import { ipcMain } from 'electron';
import type { BrowserWindow } from 'electron';
import { BookDetails } from '../../types/types';
import createProject from './createProject';
import openProjectDialog from './openProjectDialog';

const setupProjectListeners = (mainWindow: BrowserWindow) => {
  ipcMain.on('createProject', async (_event, arg: BookDetails) => {
    createProject(mainWindow, arg);
  });
  ipcMain.on('openProject', async (_event, _arg) => {
    openProjectDialog(mainWindow);
  });
};

export default setupProjectListeners;
