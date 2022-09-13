import { useEffect } from 'react';
import useStore from '../store/useStore';
import { addUuidToProject } from '../utils/projectUtils';
import type { ProjectData } from '../../types/types';

const useOpenProject = () => {
  useEffect(() => {
    window.projectApi.onOpenProject((projectData: ProjectData) => {
      const { projectContent, folderPath, fileName } = projectData;
      const {
        setIsProjectOpen,
        setProjectFolder,
        setProjectFileName,
        setBookTitle,
        setBookSubTitle,
        setAuthorName,
        setSeriesName,
        setISBN,
        setLanguage,
        setPublisher,
        setContentArray,
        setActiveSectionId,
        setPreviewEnabled,
        setPreviewContent,
        clearEditorStateMap,
        setIsProjectDirty,
      } = useStore.getState();
      setProjectFolder(folderPath);
      setProjectFileName(fileName);
      setBookTitle(projectContent.bookTitle);
      setBookSubTitle(projectContent.bookSubTitle);
      setAuthorName(projectContent.authorName);
      setSeriesName(projectContent.seriesName);
      setISBN(projectContent.ISBN);
      setLanguage(projectContent.language);
      setPublisher(projectContent.publisher);
      // Convert old project files to use name and uuid
      if (
        projectContent.content.length &&
        !('name' in projectContent.content[0])
      ) {
        setContentArray(addUuidToProject(projectContent.content));
      } else {
        setContentArray(projectContent.content);
      }
      setActiveSectionId({ id: '', name: '' });
      clearEditorStateMap();
      setPreviewContent('');
      setPreviewEnabled(false);
      setIsProjectOpen(true);
      setIsProjectDirty(false);
    });
  });
};

export default useOpenProject;
