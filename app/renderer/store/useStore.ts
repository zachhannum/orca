import create from 'zustand';
import createAppSlice from './slices/createAppStateSlice';
import type { AppSlice } from './slices/createAppStateSlice';

export type CalamusState = AppSlice;

const useStore = create<CalamusState>((set, get) => ({
  ...createAppSlice(set, get),
}));

export default useStore;
