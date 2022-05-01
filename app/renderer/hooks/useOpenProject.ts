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
  const setFrontMatter = useStore((state) => state.setFrontMatter);
  const setMainContent = useStore((state) => state.setMainContent);
  const setBackMatter = useStore((state) => state.setBackMatter);

  useEffect(() => {
    window.projectApi.onOpenProject((projectContent: Project) => {
      setBookTitle(projectContent.bookTitle);
      setBookSubTitle(projectContent.bookSubTitle);
      setAuthorName(projectContent.authorName);
      setSeriesName(projectContent.seriesName);
      setISBN(projectContent.ISBN);
      setLanguage(projectContent.language);
      setPublisher(projectContent.publisher);
      setFrontMatter(projectContent.frontMatter);
      setMainContent(projectContent.mainContent);
      setBackMatter(projectContent.backMatter);
      setIsProjectOpen(true);
    });
  });
};

export default useOpenProject;
