import {
  autoformatSmartQuotes,
  autoformatPunctuation,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_PARAGRAPH,
  KEYS_HEADING,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  withProps,
  StyledElement,
  withPlaceholders,
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

export const withStyledPlaceholders = (components: any) =>
  withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: ' ¶',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H1,
      placeholder: ' H1',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H2,
      placeholder: ' H2',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H3,
      placeholder: ' H3',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H4,
      placeholder: ' H4',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H5,
      placeholder: ' H5',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H6,
      placeholder: ' H6',
      hideOnBlur: true,
    },
  ]);

export const softBreakPluginOptions = {
  options: {
    rules: [
      { hotkey: 'shift+enter' },
      {
        hotkey: 'enter',
        query: {
          allow: [ELEMENT_BLOCKQUOTE],
        },
      },
    ],
  },
};
