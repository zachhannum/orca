import { GetState, SetState } from 'zustand';
import type { OrcaState } from '../useStore';

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
  settingsModalOpen: boolean;
  setSettingsModalOpen: (settingsModalOpen: boolean) => void;
  animatingCollapseRefCount: number;
  incrementAnimatingCollapseRefCount: () => void;
  decrementAnimatingCollapseRefCount: () => void;
  resetAnimatingCollapseRefCount: () => void;
  setSidebarMenuOpen: (val: boolean) => void;
  sidebarMenuOpen: boolean;
}

const createAppSlice = (
  set: SetState<OrcaState>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get: GetState<OrcaState>
) => ({
  previewEnabled: false,
  setPreviewEnabled: (val: boolean) => {
    set(() => ({ previewEnabled: val }));
  },
  appMode: 'Write' as AppMode,
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
  settingsModalOpen: false,
  setSettingsModalOpen: (settingsModalOpen: boolean) => {
    set(() => ({ settingsModalOpen }));
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
  setSidebarMenuOpen: (val: boolean) => {
    set(() => ({
      sidebarMenuOpen: val,
    }));
  },
  sidebarMenuOpen: false,
});

export default createAppSlice;
