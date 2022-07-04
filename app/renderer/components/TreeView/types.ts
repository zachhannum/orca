import type { MutableRefObject } from 'react';
import type { Section } from 'types/types';

export interface FlattenedItem extends Section {
  parentId: null | string;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
