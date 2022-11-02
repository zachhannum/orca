import {
  LeadIn,
  LineHeight,
  PageHeader,
  ParagraphBreak,
  SceneBreak,
  TrimSize,
} from 'types/types';
import { GetState, SetState } from 'zustand';
import type { CalamusState } from '../useStore';

export interface PublishOptionsSlice {
  dropCap: boolean;
  setDropCap: (dropCap: boolean) => void;
  leadIn: LeadIn;
  setLeadIn: (leadIn: LeadIn) => void;
  paragraphBreak: ParagraphBreak;
  setParagraphBreak: (paragraphBreak: ParagraphBreak) => void;
  sceneBreak: SceneBreak;
  setSceneBreak: (sceneBreak: SceneBreak) => void;
  rectoPageHeaders: PageHeader;
  setRectoPageHeaders: (rectoPageHeaders: PageHeader) => void;
  versoPageHeaders: PageHeader;
  setVersoPageHeaders: (versoPageHeaders: PageHeader) => void;
  paragraphFont: string;
  setParagraphFont: (paragraphFont: string) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  lineHeight: LineHeight;
  setLineHeight: (lineHeight: LineHeight) => void;
  dropFolio: boolean;
  setDropFolio: (dropFolio: boolean) => void;
  topMargin: number;
  setTopMargin: (topMargin: number) => void;
  bottomMargin: number;
  setBottomMargin: (bottomMargin: number) => void;
  insideMargin: number;
  setInsideMargin: (insideMargin: number) => void;
  outsideMargin: number;
  setOutsideMargin: (outsideMargin: number) => void;
  trimSize: TrimSize;
  setTrimSize: (trimSize: TrimSize) => void;

  // remove
  printParagraphFontSize: number;
  setPrintParagraphFontSize: (val: number) => void;
}

const createPublishOptionsSlice = (
  set: SetState<CalamusState>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get: GetState<CalamusState>
) => ({
  dropCap: false,
  setDropCap: (dropCap: boolean) => {
    set(() => ({ dropCap }));
  },
  leadIn: 'None' as LeadIn,
  setLeadIn: (leadIn: LeadIn) => {
    set(() => ({ leadIn }));
  },
  paragraphBreak: 'Indented' as ParagraphBreak,
  setParagraphBreak: (paragraphBreak: ParagraphBreak) => {
    set(() => ({ paragraphBreak }));
  },
  sceneBreak: '𐫱' as SceneBreak,
  setSceneBreak: (sceneBreak: SceneBreak) => {
    set(() => ({ sceneBreak }));
  },
  rectoPageHeaders: 'None' as PageHeader,
  setRectoPageHeaders: (rectoPageHeaders: PageHeader) => {
    set(() => ({ rectoPageHeaders }));
  },
  versoPageHeaders: 'None' as PageHeader,
  setVersoPageHeaders: (versoPageHeaders: PageHeader) => {
    set(() => ({ versoPageHeaders }));
  },
  paragraphFont: 'Crimson Pro',
  setParagraphFont: (paragraphFont: string) => {
    set(() => ({ paragraphFont }));
  },
  fontSize: 12,
  setFontSize: (fontSize: number) => {
    set(() => ({ fontSize }));
  },
  lineHeight: 'Single' as LineHeight,
  setLineHeight: (lineHeight: LineHeight) => {
    set(() => ({ lineHeight }));
  },
  dropFolio: false,
  setDropFolio: (dropFolio: boolean) => {
    set(() => ({ dropFolio }));
  },
  topMargin: 0,
  setTopMargin: (topMargin: number) => {
    set(() => ({ topMargin }));
  },
  bottomMargin: 0,
  setBottomMargin: (bottomMargin: number) => {
    set(() => ({ bottomMargin }));
  },
  insideMargin: 0,
  setInsideMargin: (insideMargin: number) => {
    set(() => ({ insideMargin }));
  },
  outsideMargin: 0,
  setOutsideMargin: (outsideMargin: number) => {
    set(() => ({ outsideMargin }));
  },
  trimSize: '5 x 8' as TrimSize,
  setTrimSize: (trimSize: TrimSize) => {
    set(() => ({ trimSize }));
  },

  // remove
  printParagraphFontSize: 12,
  setPrintParagraphFontSize: (val: number) => {
    set(() => ({ printParagraphFontSize: val }));
  },
});

export default createPublishOptionsSlice;
