import { Settings, defaultSettings } from 'types/types';
import { GetState, SetState } from 'zustand';
import type { OrcaState } from '../useStore';

export interface SettingsSlice {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const createPublishOptionsSlice = (
  set: SetState<OrcaState>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get: GetState<OrcaState>
) => ({
  settings: defaultSettings,
  setSettings: (settings: Settings) => {
    set(() => ({ settings }));
    window.appApi.setSettings(settings);
  },
});

export default createPublishOptionsSlice;
