import { useEffect } from 'react';
import useStore from '../store/useStore';
import type { Project } from '../../types/types';

const useOpenProject = () => {
  const setIsProjectOpen = useStore((state) => state.setIsProjectOpen);
  const setBookTitle = useStore((state) => state.setBookTitle);
  const setBookSubTitle = useStore((state) => state.setBookSubTitle);
  const setAuthorName = useStore((state) => state.setAuthorName);
  const setSeriesName = useStore((state) => state.setSeriesName);
  const setISBN = useStore((state) => state.setISBN);
  const setLanguage = useStore((state) => state.setLanguage);
  const setPublisher = useStore((state) => state.setPublisher);
  const setContent = useStore((state) => state.setContent);

  useEffect(() => {
    window.projectApi.onOpenProject((projectContent: Project) => {
      setBookTitle(projectContent.bookTitle);
      setBookSubTitle(projectContent.bookSubTitle);
      setAuthorName(projectContent.authorName);
      setSeriesName(projectContent.seriesName);
      setISBN(projectContent.ISBN);
      setLanguage(projectContent.language);
      setPublisher(projectContent.publisher);
      setContent(projectContent.content);
      setIsProjectOpen(true);
    });
  });
};

export default useOpenProject;
