import { PublishSettings, defaultPublishSettings } from 'types/types';
import { GetState, SetState } from 'zustand';
import type { CalamusState } from '../useStore';

export interface PublishOptionsSlice {
  publishSettings: PublishSettings;
  setPublishSettings: (publishSettings: PublishSettings) => void;
}

const createPublishOptionsSlice = (
  set: SetState<CalamusState>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get: GetState<CalamusState>
) => ({
  publishSettings: defaultPublishSettings,
  setPublishSettings: (publishSettings: PublishSettings) => {
    set(() => ({ publishSettings, isProjectDirty: true }));
  },
});

export default createPublishOptionsSlice;
