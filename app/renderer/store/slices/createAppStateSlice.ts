import { GetState, SetState } from 'zustand';
import type { CalamusState } from '../useStore';

export interface AppSlice {
  previewEnabled: boolean;
  setPreviewEnabled: (val: boolean) => void;
}

const createAppSlice = (
  set: SetState<CalamusState>,
  get: GetState<CalamusState>
) => ({
  previewEnabled: false,
  setPreviewEnabled: (val: boolean) => {
    set(() => ({ previewEnabled: val }));
  },
});

export default createAppSlice;
