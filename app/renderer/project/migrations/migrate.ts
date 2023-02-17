import { defaultPublishSettings, Project } from 'types/types';
import { addUuidToProject } from '../projectUtils';

const migrate = (project: Project): Project => {
  // Convert old project files to use name and uuid (predates versions)
  if (project.content.length && !('name' in project.content[0])) {
    project = { ...project, content: addUuidToProject(project.content) };
  }

  // Add any new publish settings
  project.publishSettings = {
    ...defaultPublishSettings,
    ...project.publishSettings,
  };

  // Add css settings
  if (!project.customCss) {
    project.customCss = '';
  }

  return project;
};

export { migrate };
