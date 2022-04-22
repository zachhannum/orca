import { GetState, SetState } from 'zustand';
import type { CalamusState } from '../useStore';

export interface AppSlice {
  previewEnabled: boolean;
  setPreviewEnabled: (val: boolean) => void;
}

const createAppSlice = (
  set: SetState<CalamusState>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get: GetState<CalamusState>
) => ({
  previewEnabled: true,
  setPreviewEnabled: (val: boolean) => {
    set(() => ({ previewEnabled: val }));
  },
});

export default createAppSlice;
