import { PublishSettings, defaultPublishSettings } from 'types/types';
import { GetState, SetState } from 'zustand';
import type { OrcaState } from '../useStore';

export interface PublishOptionsSlice {
  publishSettings: PublishSettings;
  setPublishSettings: (publishSettings: PublishSettings) => void;
}

const createPublishOptionsSlice = (
  set: SetState<OrcaState>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get: GetState<OrcaState>
) => ({
  publishSettings: defaultPublishSettings,
  setPublishSettings: (publishSettings: PublishSettings) => {
    set(() => ({ publishSettings, isProjectDirty: true }));
  },
});

export default createPublishOptionsSlice;
