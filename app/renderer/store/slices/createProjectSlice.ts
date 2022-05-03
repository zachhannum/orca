import { GetState, SetState } from 'zustand';
import { produce } from 'immer';
import type { CalamusState } from '../useStore';
import type { Project, SectionData } from 'types/types';

export interface ProjectSlice extends Project {
  isProjectOpen: boolean;
  projectFolder: string;
  setProjectFolder: (val: string) => void;
  projectFileName: string;
  setProjectFileName: (val: string) => void;
  setIsProjectOpen: (val: boolean) => void;
  setBookTitle: (val: string) => void;
  setBookSubTitle: (val: string) => void;
  setAuthorName: (val: string) => void;
  setSeriesName: (val: string) => void;
  setISBN: (val: string) => void;
  setLanguage: (val: string) => void;
  setPublisher: (val: string) => void;
  setContentArray: (val: SectionData[]) => void;
  updateOrAddSection: (val: SectionData) => void;
  changeSectionName: (oldName: string, val: SectionData) => void;
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
  projectFolder: '',
  setProjectFolder: (val: string) => {
    set(() => ({ projectFolder: val }));
  },
  projectFileName: '',
  setProjectFileName: (val: string) => {
    set(() => ({ projectFileName: val }));
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
  setContentArray: (val: SectionData[]) => {
    set(() => ({ content: val }));
  },
  updateOrAddSection: (val: SectionData) =>
    set(
      produce((state: CalamusState) => {
        state.content.push(val);
      })
    ),
  changeSectionName: (oldName: string, val: SectionData) =>
    set(
      produce((state: CalamusState) => {
        const i = state.content.findIndex(
          (v: SectionData) => v.name === oldName
        );
        state.content[i] = val;
      })
    ),
});

export default createProjectSlice;
