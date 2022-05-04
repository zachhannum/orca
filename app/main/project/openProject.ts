import type { BrowserWindow } from 'electron';
import fs from 'fs';
import path from 'path';

const openProject = (mainWindow: BrowserWindow, projectPath: string) => {
  fs.readFile(projectPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      mainWindow.webContents.send('openProject', {
        projectContent: JSON.parse(data.toString()),
        folderPath: path.dirname(projectPath),
        fileName: path.basename(projectPath),
      });
    }
  });
};

export default openProject;
