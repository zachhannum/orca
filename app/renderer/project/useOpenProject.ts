import { useEffect } from 'react';
import useStore from '../store/useStore';
import type { ProjectData } from '../../types/types';
import { migrate } from './migrations/migrate';

const useOpenProject = () => {
  useEffect(() => {
    window.projectApi.onOpenProject((projectData: ProjectData) => {
      const { projectContent, folderPath, fileName } = projectData;
      const project = migrate(projectContent);
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
        setPublishSettings,
      } = useStore.getState();
      setProjectFolder(folderPath);
      setProjectFileName(fileName);
      setBookTitle(project.bookTitle);
      setBookSubTitle(project.bookSubTitle);
      setAuthorName(project.authorName);
      setSeriesName(project.seriesName);
      setISBN(project.ISBN);
      setLanguage(project.language);
      setPublisher(project.publisher);
      setContentArray(project.content);
      setPublishSettings(project.publishSettings);
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
