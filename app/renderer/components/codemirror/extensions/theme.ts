import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import type { DefaultTheme } from 'styled-components';
import { headerStyles } from './styles';
const theme = (theme: DefaultTheme): Extension => {
  const baseTheme = EditorView.baseTheme({
    '&.cm-editor': {},
    '&.cm-editor.cm-focused': { outline: 'none' },
    '.cm-scroller': {
      fontFamily: 'Poppins',
      overflow: 'auto',
    },
    '.cm-content': {
      caretColor: theme.mainFgText,
      minHeight: '70vh', //This is sort of hacky
    },
  });

  const highlighter = syntaxHighlighting(
    HighlightStyle.define([...headerStyles(theme)])
  );

  return [baseTheme, highlighter];
};

export default theme;
