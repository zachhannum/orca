import { ipcMain } from 'electron';
import { BrowserWindow } from 'electron';
import { PagedBookContents } from '../../types/types';

const setupProjectListeners = (mainWindow: BrowserWindow) => {
  ipcMain.on('generatePdf', async (_event, arg: PagedBookContents) => {
    // console.log("Creating pdf render window");
    // const pdfWindow = new BrowserWindow({
    //   // show: false,
    //   parent: mainWindow,
    //   width: 500,
    //   height: 500,
    //   minWidth: 800,
    //   minHeight: 600,
    // });
  });
};

export default setupProjectListeners;
