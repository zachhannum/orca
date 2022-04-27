import { GetState, SetState } from 'zustand';
import type { CalamusState } from '../useStore';

export interface BookFormatSettingsSlice {
  printParagraphFontSize: number;
  setPrintParagraphFontSize: (val: number) => void;
}

const createBookFormatSettingsSlice = (
  set: SetState<CalamusState>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get: GetState<CalamusState>
) => ({
  printParagraphFontSize: 12,
  setPrintParagraphFontSize: (val: number) => {
    set(() => ({ printParagraphFontSize: val }));
  },
});

export default createBookFormatSettingsSlice;
