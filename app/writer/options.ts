import {
  autoformatSmartQuotes,
  autoformatPunctuation,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_PARAGRAPH,
  KEYS_HEADING,
  ELEMENT_H1,
  withProps,
  StyledElement,
  ELEMENT_H2,
} from '@udecode/plate';
import autoformatMarks from 'writer/autoformatMarks';
import autoformatBlocks from 'writer/autoformatBlocks';

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ...KEYS_HEADING],
  defaultType: ELEMENT_PARAGRAPH,
};

export const resetNodePluginOptions = {
  options: {
    rules: [
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Enter',
        predicate: isBlockAboveEmpty,
      },
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Backspace',
        predicate: isSelectionAtBlockStart,
      },
    ],
  },
};

export const autoFormatPluginOptions = {
  options: {
    rules: [
      ...autoformatSmartQuotes,
      ...autoformatPunctuation,
      ...autoformatMarks,
      ...autoformatBlocks,
    ],
  },
};

export const exitBreakPluginOptions = {
  options: {
    rules: [
      {
        hotkey: 'mod+enter',
      },
      {
        hotkey: 'mod+shift+enter',
        before: true,
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
          allow: KEYS_HEADING,
        },
      },
    ],
  },
};

export const plateUiOverrides = {
  [ELEMENT_H1]: withProps(StyledElement, {
    styles: {
      root: {
        fontSize: '2em',
        fontWeight: '600',
        marginBottom: '1em',
      },
    },
  }),
  [ELEMENT_H2]: withProps(StyledElement, {
    styles: {
      root: {
        fontSize: '1.5em',
        fontWeight: '600',
        marginBottom: '1em',
      },
    },
  }),
};
