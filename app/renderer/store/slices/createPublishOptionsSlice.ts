import { PublishSettings } from 'types/types';
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
  publishSettings: {
    dropCap: false,
    dropCapEnableAdvancedSettings: false,
    dropCapFont: '',
    dropCapLineHeight: 0.65,
    dropCapBottomMargin: 0.1,
    leadIn: 'None',
    paragraphBreak: 'Indented',
    sceneBreak: '𐫱',
    rectoPageHeaders: 'None',
    versoPageHeaders: 'None',
    paragraphFont: 'Times New Roman',
    fontSize: 12,
    lineHeight: 'Single',
    dropFolio: false,
    topMargin: 0.5,
    bottomMargin: 0.5,
    insideMargin: 0.75,
    outsideMargin: 0.5,
    trimSize: '5 x 8',
  } as PublishSettings,
  setPublishSettings: (publishSettings: PublishSettings) => {
    set(() => ({ publishSettings }));
  },
});

export default createPublishOptionsSlice;
