import { GetState, SetState } from 'zustand';
import { produce } from 'immer';
import { updateSectionContentDeep } from '../../components/TreeView/utilities';
import type { CalamusState } from '../useStore';
import type { Project, Section } from 'types/types';
import { EditorState } from '@codemirror/state';

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
  setContentArray: (val: Section[]) => void;
  updateSectionContent: (id: string, newContent: string) => void;
  addNewSection: (val: Section) => void;
  addingSections: boolean;
  setAddingSections: (val: boolean) => void;
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
  previewContent: string;
  setPreviewContent: (txt: string) => void;
  editorStateMap: Map<string, EditorState>;
  setEditorState: (sectionId: string, editorState: EditorState) => void;
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
  setContentArray: (val: Section[]) => {
    set(() => ({ content: val }));
  },
  updateSectionContent: (id: string, newContent: string) => {
    set((state) => ({
      content: updateSectionContentDeep(state.content, id, newContent),
    }));
  },
  addNewSection: (val: Section) =>
    set(
      produce((state: CalamusState) => {
        state.content.push(val);
      })
    ),
  addingSections: false,
  setAddingSections: (val: boolean) => set(() => ({ addingSections: val })),
  activeSectionId: '',
  setActiveSectionId: (id: string) => {
    set(() => ({ activeSectionId: id }));
  },
  previewContent: '',
  setPreviewContent: (txt: string) => {
    set(() => ({ previewContent: txt }));
  },
  editorStateMap: new Map<string, EditorState>(),
  setEditorState: (sectionId: string, editorState: EditorState) =>
    set(
      produce((state: CalamusState) => {
        state.editorStateMap.set(sectionId, editorState);
      })
    ),
});

export default createProjectSlice;
