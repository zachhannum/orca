import { dialog, BrowserWindow } from 'electron';
import openProject from './openProject';

const openProjectDialog = (mainWindow: BrowserWindow) => {
  dialog
    .showOpenDialog(mainWindow, {
      title: 'Open Book Project',
      properties: ['openFile'],
      filters: [{ name: 'Orca Project File', extensions: ['orca', 'json'] }],
      buttonLabel: 'Open',
    })
    .then((result) => {
      if (result.filePaths[0]) {
        const openPath = result.filePaths[0];
        openProject(mainWindow, openPath);
      }
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default openProjectDialog;
