import { ipcMain } from 'electron';
import type { BrowserWindow } from 'electron';
import { BookDetails } from '../../types/types';
import createProject from './createProject';
import openProjectDialog from './openProjectDialog';
import saveProject from './saveProject';
import { sendRecentProjects } from './recentProjects';
import openProject from './openProject';

const setupProjectListeners = (mainWindow: BrowserWindow) => {
  ipcMain.on('createProject', async (_event, arg: BookDetails) => {
    createProject(mainWindow, arg);
  });
  ipcMain.on('openProject', async (_event, _arg) => {
    openProjectDialog(mainWindow);
  });
  ipcMain.on('openProjectPath', async (_event, arg) => {
    openProject(mainWindow, arg);
  });
  ipcMain.on('saveProject', async (_event, arg) => {
    saveProject(arg);
  });
  ipcMain.on('getRecentProjects', async (_event, _arg) => {
    sendRecentProjects(mainWindow);
  });
};

export default setupProjectListeners;
