import { GetState, SetState } from 'zustand';
import type { CalamusState } from '../useStore';
import type { Project, ProjectContent } from '../../../types/types';

export interface ProjectSlice extends Project {
  isProjectOpen: boolean;
  setIsProjectOpen: (val: boolean) => void;
  setBookTitle: (val: string) => void;
  setBookSubTitle: (val: string) => void;
  setAuthorName: (val: string) => void;
  setSeriesName: (val: string) => void;
  setISBN: (val: string) => void;
  setLanguage: (val: string) => void;
  setPublisher: (val: string) => void;
  setFrontMatter: (val: ProjectContent[]) => void;
  setMainContent: (val: ProjectContent[]) => void;
  setBackMatter: (val: ProjectContent[]) => void;
}

const createProjectSlice = (
  set: SetState<CalamusState>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get: GetState<CalamusState>
) => ({
  isProjectOpen: false,
  setIsProjectOpen: (val: boolean) => {
    set(() => ({ isProjectOpen: val }));
  },
  bookTitle: '',
  setBookTitle: (val: string) => {
    set(() => ({ bookTitle: val }));
  },
  bookSubTitle: '',
  setBookSubTitle: (val: string) => {
    set(() => ({ bookSubTitle: val }));
  },
  authorName: '',
  setAuthorName: (val: string) => {
    set(() => ({ authorName: val }));
  },
  seriesName: '',
  setSeriesName: (val: string) => {
    set(() => ({ seriesName: val }));
  },
  ISBN: '',
  setISBN: (val: string) => {
    set(() => ({ ISBN: val }));
  },
  language: '',
  setLanguage: (val: string) => {
    set(() => ({ language: val }));
  },
  publisher: '',
  setPublisher: (val: string) => {
    set(() => ({ publisher: val }));
  },
  content: [],
  setFrontMatter: (val: ProjectContent[]) => {
    set(() => ({ frontMatter: val }));
  },
  setMainContent: (val: ProjectContent[]) => {
    set(() => ({ mainContent: val }));
  },
  setBackMatter: (val: ProjectContent[]) => {
    set(() => ({ backMatter: val }));
  },
});

export default createProjectSlice;
