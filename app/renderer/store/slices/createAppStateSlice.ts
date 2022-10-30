import { GetState, SetState } from 'zustand';
import type { CalamusState } from '../useStore';

export type AppMode = 'Write' | 'Publish';

export interface AppSlice {
  previewEnabled: boolean;
  setPreviewEnabled: (val: boolean) => void;
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  newBookModalOpen: boolean;
  setNewBookModalOpen: (val: boolean) => void;
  generateBookModalOpen: boolean;
  setGenerateBookModalOpen: (val: boolean) => void;
  animatingCollapseRefCount: number;
  incrementAnimatingCollapseRefCount: () => void;
  decrementAnimatingCollapseRefCount: () => void;
  resetAnimatingCollapseRefCount: () => void;
}

const createAppSlice = (
  set: SetState<CalamusState>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get: GetState<CalamusState>
) => ({
  previewEnabled: false,
  setPreviewEnabled: (val: boolean) => {
    set(() => ({ previewEnabled: val }));
  },
  appMode: 'Write',
  setAppMode: (mode: AppMode) => {
    set(() => ({
      appMode: mode,
    }));
  },
  sidebarOpen: true,
  setSidebarOpen: (val: boolean) => {
    set(() => ({
      sidebarOpen: val,
    }));
  },
  newBookModalOpen: false,
  setNewBookModalOpen: (val: boolean) => {
    set(() => ({
      newBookModalOpen: val,
    }));
  },
  generateBookModalOpen: false,
  setGenerateBookModalOpen: (val: boolean) => {
    set(() => ({ generateBookModalOpen: val }));
  },
  animatingCollapseRefCount: 0,
  incrementAnimatingCollapseRefCount: () => {
    set((state) => ({
      animatingCollapseRefCount: state.animatingCollapseRefCount + 1,
    }));
  },
  decrementAnimatingCollapseRefCount: () => {
    set((state) => ({
      animatingCollapseRefCount: Math.max(
        state.animatingCollapseRefCount - 1,
        0
      ),
    }));
  },
  resetAnimatingCollapseRefCount: () => {
    set(() => ({
      animatingCollapseRefCount: 0,
    }));
  },
});

export default createAppSlice;
