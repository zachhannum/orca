import create from 'zustand';
import { enableMapSet } from 'immer';
import createAppSlice from './slices/createAppStateSlice';
import type { AppSlice } from './slices/createAppStateSlice';
import type { PublishOptionsSlice } from './slices/createPublishOptionsSlice';
import createProjectSlice from './slices/createProjectSlice';
import type { ProjectSlice } from './slices/createProjectSlice';
import createPublishOptionsSlice from './slices/createPublishOptionsSlice';
import type { SettingsSlice } from './slices/createSettingsSlice';
import createSettingsSlice from './slices/createSettingsSlice';

export type OrcaState = AppSlice &
  PublishOptionsSlice &
  ProjectSlice &
  SettingsSlice;

enableMapSet();

const useStore = create<OrcaState>((set, get) => ({
  ...createAppSlice(set, get),
  ...createPublishOptionsSlice(set, get),
  ...createProjectSlice(set, get),
  ...createSettingsSlice(set, get),
}));

export default useStore;
