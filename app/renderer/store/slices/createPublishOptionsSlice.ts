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
  topMargin: string;
  setTopMargin: (topMargin: string) => void;
  bottomMargin: string;
  setBottomMargin: (bottomMargin: string) => void;
  insideMargin: string;
  setInsideMargin: (insideMargin: string) => void;
  outsideMargin: string;
  setOutsideMargin: (outsideMargin: string) => void;
  trimSize: TrimSize;
  setTrimSize: (trimSize: TrimSize) => void;
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
  topMargin: '0.5in',
  setTopMargin: (topMargin: string) => {
    set(() => ({ topMargin }));
  },
  bottomMargin: '0.5in',
  setBottomMargin: (bottomMargin: string) => {
    set(() => ({ bottomMargin }));
  },
  insideMargin: '0.75in',
  setInsideMargin: (insideMargin: string) => {
    set(() => ({ insideMargin }));
  },
  outsideMargin: '0.5in',
  setOutsideMargin: (outsideMargin: string) => {
    set(() => ({ outsideMargin }));
  },
  trimSize: '5 x 8' as TrimSize,
  setTrimSize: (trimSize: TrimSize) => {
    set(() => ({ trimSize }));
  },
});

export default createPublishOptionsSlice;
