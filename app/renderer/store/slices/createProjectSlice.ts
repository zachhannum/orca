import { GetState, SetState } from 'zustand';
import { produce } from 'immer';
import { EditorState } from '@codemirror/state';
import type { Project, Section, SectionIdentifier } from 'types/types';
import {
  updateSectionContentDeep,
  addSectionAt,
  findItemDeep,
} from '../../components/TreeView/utilities';
import type { CalamusState } from '../useStore';

export interface ProjectSlice extends Project {
  setVersion: (version: string) => void;
  isProjectOpen: boolean;
  setIsProjectOpen: (val: boolean) => void;
  isProjectDirty: boolean;
  setIsProjectDirty: (val: boolean) => void;
  projectFolder: string;
  setProjectFolder: (val: string) => void;
  projectFileName: string;
  setProjectFileName: (val: string) => void;
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
  addNewSectionAt: (val: Section, atId: string) => void;
  addingSections: boolean;
  setAddingSections: (val: boolean) => void;
  activeSectionId: string;
  activeSectionName: string;
  setActiveSectionId: (id: SectionIdentifier) => void;
  previewContent: string;
  editorStateMap: Map<string, EditorState>;
  setEditorState: (sectionId: string, editorState: EditorState) => void;
  removeEditorState: (sectionId: string) => void;
  clearEditorStateMap: () => void;
}

const createProjectSlice = (
  set: SetState<CalamusState>,
  get: GetState<CalamusState>
) => ({
  version: 'unknown',
  setVersion: (version: string) => {
    set(() => ({ version }));
  },
  isProjectOpen: false,
  setIsProjectOpen: (val: boolean) => {
    set(() => ({ isProjectOpen: val }));
  },
  isProjectDirty: false,
  setIsProjectDirty: (val: boolean) => {
    set(() => ({ isProjectDirty: val }));
  },
  projectFolder: '',
  setProjectFolder: (val: string) => {
    set(() => ({ projectFolder: val, isProjectDirty: true }));
  },
  projectFileName: '',
  setProjectFileName: (val: string) => {
    set(() => ({ projectFileName: val, isProjectDirty: true }));
  },
  bookTitle: '',
  setBookTitle: (val: string) => {
    set(() => ({ bookTitle: val, isProjectDirty: true }));
  },
  bookSubTitle: '',
  setBookSubTitle: (val: string) => {
    set(() => ({ bookSubTitle: val, isProjectDirty: true }));
  },
  authorName: '',
  setAuthorName: (val: string) => {
    set(() => ({ authorName: val, isProjectDirty: true }));
  },
  seriesName: '',
  setSeriesName: (val: string) => {
    set(() => ({ seriesName: val, isProjectDirty: true }));
  },
  ISBN: '',
  setISBN: (val: string) => {
    set(() => ({ ISBN: val, isProjectDirty: true }));
  },
  language: '',
  setLanguage: (val: string) => {
    set(() => ({ language: val, isProjectDirty: true }));
  },
  publisher: '',
  setPublisher: (val: string) => {
    set(() => ({ publisher: val, isProjectDirty: true }));
  },
  content: [],
  setContentArray: (val: Section[]) => {
    set(() => ({ content: val, isProjectDirty: true }));
  },
  updateSectionContent: (id: string, newContent: string) => {
    set((state) => ({
      content: updateSectionContentDeep(state.content, id, newContent),
      isProjectDirty: true,
    }));
    if (get().activeSectionId === id) {
      set(() => ({
        previewContent: findItemDeep(get().content, id)?.content,
      }));
    }
  },
  addNewSection: (val: Section) =>
    set(
      produce((state: CalamusState) => {
        state.content.push(val);
        state.isProjectDirty = true;
      })
    ),
  addNewSectionAt: (val: Section, atId: string) => {
    set((state) => ({
      content: addSectionAt(val, state.content, atId),
      isProjectDirty: true,
    }));
  },
  addingSections: false,
  setAddingSections: (val: boolean) => set(() => ({ addingSections: val })),
  activeSectionId: '',
  activeSectionName: '',
  setActiveSectionId: (id: SectionIdentifier) => {
    set(() => ({ activeSectionId: id.id, activeSectionName: id.name }));
    if (id.id !== '') {
      set(() => ({
        previewContent: findItemDeep(get().content, id.id)?.content,
      }));
    }
  },
  previewContent: '',
  editorStateMap: new Map<string, EditorState>(),
  setEditorState: (sectionId: string, editorState: EditorState) =>
    set(
      produce((state: CalamusState) => {
        state.editorStateMap.set(sectionId, editorState);
      })
    ),
  removeEditorState: (sectionId: string) =>
    set(
      produce((state: CalamusState) => {
        state.editorStateMap.delete(sectionId);
      })
    ),
  clearEditorStateMap: () => {
    set(() => ({ editorStateMap: new Map<string, EditorState>() }));
  },
});

export default createProjectSlice;
