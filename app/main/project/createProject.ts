import { dialog } from 'electron';
import fs from 'fs';
import type { BrowserWindow } from 'electron';
import type { BookDetails } from '../../types/types';
import openProject from './openProject';
import getProjectTemplate from './projectTemplate';

const createProject = (mainWindow: BrowserWindow, bookDetails: BookDetails) => {
  dialog
    .showSaveDialog(mainWindow, {
      title: 'Create Book Project',
      properties: ['createDirectory', 'showOverwriteConfirmation'],
      filters: [{ name: 'Orca Project Files', extensions: ['orca', 'json'] }],
      buttonLabel: 'Create',
    })
    .then((result) => {
      const savePath = result.filePath;
      if (savePath) {
        fs.writeFile(
          savePath,
          JSON.stringify(getProjectTemplate(bookDetails)),
          (err) => {
            if (err) {
              console.log(err);
            } else {
              openProject(mainWindow, savePath);
            }
          }
        );
      }
      return savePath;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default createProject;
