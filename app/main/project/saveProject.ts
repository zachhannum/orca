import fs from 'fs';
import type { Project } from '../../types/types';

const saveProject = (projectContent: Project) => {
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
};

export default saveProject;
