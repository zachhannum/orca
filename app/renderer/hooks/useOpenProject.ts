import { useEffect } from 'react';
import useStore from '../store/useStore';
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
        clearEditorStateMap
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
      setContentArray(projectContent.content);
      setActiveSectionId('');
      clearEditorStateMap();
      setPreviewContent('');
      setPreviewEnabled(false);
      setIsProjectOpen(true);
    });
  });
};

export default useOpenProject;
