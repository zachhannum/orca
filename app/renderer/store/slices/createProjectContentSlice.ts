import { GetState, SetState } from 'zustand';
import { produce } from 'immer';
import { SectionData } from 'types/types';
import type { CalamusState } from '../useStore';

export interface ProjectContentSlice {
  openSections: Map<string, SectionData>;
  updateOpenSection: (key: string, data: SectionData) => void;
}

const createProjectContentSlice = (
  set: SetState<CalamusState>,
  _get: GetState<CalamusState>
) => ({
  openSections: new Map<string, SectionData>(),
  updateOpenSection: (key: string, data: SectionData) =>
    set(
      produce((state: CalamusState) => {
        state.openSections.set(key, data);
      })
    ),
});

export default createProjectContentSlice;
