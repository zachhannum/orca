import fs from 'fs';
import type { ProjectData } from '../../types/types';

const saveProject = (projectData: ProjectData) => {
  const { projectContent, filePath } = projectData;
  fs.writeFile(filePath, JSON.stringify(projectContent), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

export default saveProject;
