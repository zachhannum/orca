import { BrowserWindow, ipcMain, app, shell } from 'electron';
import fs from 'fs';
import path from 'path';
import { resolveHtmlPath } from '../util';
import { PagedBookContents } from 'types/types';

const generatePdf = (
  mainWindow: BrowserWindow,
  pdfBookContent: PagedBookContents
) => {
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
    pdfWindow.webContents.send('pagedContents', pdfBookContent);
  });
  ipcMain.once('pagedRenderComplete', (_event, _arg) => {
    pdfWindow.webContents.printToPDF({}).then((buffer: Buffer) => {
      const filePath = path.join(
        app.getPath('downloads'),
        pdfBookContent.title.toLowerCase().trim().replace(/\s+/g, '_') + '.pdf'
      );
      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          console.log(err);
        }
      });
      pdfWindow.close();
      mainWindow.webContents.send('pdfGenerated', buffer);
      shell.showItemInFolder(filePath);
    });
  });
};

export default generatePdf;
