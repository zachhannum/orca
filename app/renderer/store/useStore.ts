import create from 'zustand';
import { enableMapSet } from 'immer';
import createAppSlice from './slices/createAppStateSlice';
import type { AppSlice } from './slices/createAppStateSlice';
import createBookFormatSettingsSlice from './slices/createBookFormatSettingsSlice';
import type { BookFormatSettingsSlice } from './slices/createBookFormatSettingsSlice';
import createProjectSlice from './slices/createProjectSlice';
import type { ProjectSlice } from './slices/createProjectSlice';

export type CalamusState = AppSlice &
  BookFormatSettingsSlice &
  ProjectSlice;

enableMapSet();

const useStore = create<CalamusState>((set, get) => ({
  ...createAppSlice(set, get),
  ...createBookFormatSettingsSlice(set, get),
  ...createProjectSlice(set, get),
}));

export default useStore;
