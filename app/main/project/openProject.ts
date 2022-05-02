import type { BrowserWindow } from 'electron';
import fs from 'fs';

const openProject = (mainWindow: BrowserWindow, projectPath: string) => {
  fs.readFile(projectPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      mainWindow.webContents.send('openProject', {
        projectContent: JSON.parse(data.toString()),
        filePath: projectPath,
      });
    }
  });
};

export default openProject;
