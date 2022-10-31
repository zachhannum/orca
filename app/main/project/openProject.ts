import type { BrowserWindow } from 'electron';
import fs from 'fs';
import path from 'path';
import { ProjectData } from 'types/types';
import { addRecentProject } from './recentProjects';

const openProject = (mainWindow: BrowserWindow, projectPath: string) => {
  fs.readFile(projectPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const projectData = {
        projectContent: JSON.parse(data.toString()),
        folderPath: path.dirname(projectPath),
        fileName: path.basename(projectPath),
      } as ProjectData;
      addRecentProject({
        bookTitle: projectData.projectContent.bookTitle,
        authorName: projectData.projectContent.authorName,
        folderPath: projectData.folderPath,
        fileName: projectData.fileName,
      });
      mainWindow.webContents.send('openProject', projectData);
    }
  });
};

export default openProject;
