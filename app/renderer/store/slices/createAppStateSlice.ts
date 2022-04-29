import { GetState, SetState } from 'zustand';
import type { CalamusState } from '../useStore';

export interface AppSlice {
  previewEnabled: boolean;
  setPreviewEnabled: (val: boolean) => void;
  newBookModalOpen: boolean;
  setNewBookModalOpen: (val: boolean) => void;
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
  newBookModalOpen: false,
  setNewBookModalOpen: (val: boolean) => {
    set(() => ({
      newBookModalOpen: val,
    }));
  },
});

export default createAppSlice;
