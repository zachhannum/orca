import fs from 'fs';
import path from 'path';
import type { ProjectData } from 'types/types';

const saveProject = (projectData: ProjectData) => {
  const { projectContent, folderPath, fileName } = projectData;
  fs.writeFile(
    path.join(folderPath, fileName),
    JSON.stringify(projectContent),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

export default saveProject;
