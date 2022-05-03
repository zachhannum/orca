import { useEffect } from 'react';
import useStore from '../store/useStore';
import type { ProjectData } from '../../types/types';

const useOpenProject = () => {
  const setIsProjectOpen = useStore((state) => state.setIsProjectOpen);
  const setProjectFolder = useStore((state) => state.setProjectFolder);
  const setProjectFileName = useStore((state) => state.setProjectFileName);
  const setBookTitle = useStore((state) => state.setBookTitle);
  const setBookSubTitle = useStore((state) => state.setBookSubTitle);
  const setAuthorName = useStore((state) => state.setAuthorName);
  const setSeriesName = useStore((state) => state.setSeriesName);
  const setISBN = useStore((state) => state.setISBN);
  const setLanguage = useStore((state) => state.setLanguage);
  const setPublisher = useStore((state) => state.setPublisher);
  const setContentArray = useStore((state) => state.setContentArray);

  useEffect(() => {
    window.projectApi.onOpenProject((projectData: ProjectData) => {
      const { projectContent, folderPath, fileName } = projectData;
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
      setIsProjectOpen(true);
    });
  });
};

export default useOpenProject;
