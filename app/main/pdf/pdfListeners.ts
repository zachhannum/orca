import { ipcMain } from 'electron';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import { BrowserWindow } from 'electron';
import { PagedBookContents } from '../../types/types';
import { resolveHtmlPath } from '../util';

const setupProjectListeners = (mainWindow: BrowserWindow) => {
  ipcMain.on('generatePdf', async (_event, arg: PagedBookContents) => {
    console.log('Creating pdf render window');
    const pdfWindow = new BrowserWindow({
      show: false,
      parent: mainWindow,
      width: 500,
      height: 500,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, '../preload.js')
          : path.join(__dirname, '../../../.erb/dll/preload.js'),
      },
    });
    pdfWindow.loadURL(resolveHtmlPath('paged.html'));
    pdfWindow.webContents.once('dom-ready', () => {
      console.log('sending paged contents');
      pdfWindow.webContents.send('pagedContents', arg);
    });
    ipcMain.once('pagedRenderComplete', (_event, _arg) => {
      pdfWindow.webContents.printToPDF({}).then((buffer: Buffer) => {
        fs.writeFile(path.join(app.getPath('downloads'), 'out.pdf'), buffer, (err) => {
          if (err) {
            console.log(err);
          }
        });
        pdfWindow.close();
        mainWindow.webContents.send('pdfGenerated', buffer);
      });
    });
  });
};

export default setupProjectListeners;
