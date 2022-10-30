import { app } from 'electron';
import type { BrowserWindow } from 'electron';
import fs from 'fs';
import { ProjectGlance } from 'types/types';

const readRecentProjects = (): ProjectGlance[] => {
  const prefsPath = `${app.getPath('userData')}/recents.json`;
  try {
    const data = fs.readFileSync(prefsPath);
    return JSON.parse(data.toString());
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const sendRecentProjects = (mainWindow: BrowserWindow) => {
  const recentProjects = readRecentProjects();
  if (recentProjects.length) {
    mainWindow.webContents.send('openProject', readRecentProjects());
  }
};

export const addRecentProject = (projectGlance: ProjectGlance) => {
  let recentProjects = readRecentProjects();

  // If project already exists in recents, then remove it first
  recentProjects = recentProjects.filter(
    (p) =>
      p.folderPath.concat(p.fileName) !==
      projectGlance.folderPath.concat(projectGlance.fileName)
  );

  // Only keep the 10 most recent projects
  recentProjects = recentProjects.slice(0, 8);
  recentProjects.unshift(projectGlance);

  const prefsPath = `${app.getPath('userData')}/recents.json`;

  fs.writeFile(prefsPath, JSON.stringify(recentProjects), (err) => {
    if (err) {
      console.log(err);
    }
  });
};
