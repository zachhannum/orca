import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { css } from '@codemirror/lang-css';
import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import type { DefaultTheme } from 'styled-components';
import Color from 'color';

export const theme = (theme: DefaultTheme): Extension => {
  const baseTheme = EditorView.baseTheme({
    '&.cm-editor': {},
    '&.cm-editor.cm-focused': { outline: 'none' },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    '.cm-content': {
      caretColor: theme.mainFgText,
      minHeight: '80%', // This is sort of hacky
      width: '100px', // Also hacky
    },
  });

  // const highlighter = syntaxHighlighting(
  //   HighlightStyle.define([...headerStyles(theme), ...markStyles(theme)])
  // );

  return [baseTheme];
};
