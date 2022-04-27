import create from 'zustand';
import createAppSlice from './slices/createAppStateSlice';
import type { AppSlice } from './slices/createAppStateSlice';
import createBookFormatSettingsSlice from './slices/createBookFormatSettingsSlice';
import type { BookFormatSettingsSlice } from './slices/createBookFormatSettingsSlice';

export type CalamusState = AppSlice & BookFormatSettingsSlice;

const useStore = create<CalamusState>((set, get) => ({
  ...createAppSlice(set, get),
  ...createBookFormatSettingsSlice(set, get),
}));

export default useStore;
