import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import type { DefaultTheme } from 'styled-components';
import { tags as t } from '@lezer/highlight';

const chalky = '#e5c07b';
const coral = '#e06c75';
const cyan = '#56b6c2';
const invalid = '#ffffff';
const ivory = '#abb2bf';
const stone = '#7d8799'; // Brightened compared to original to increase contrast
const malibu = '#61afef';
const sage = '#98c379';
const whiskey = '#d19a66';
const violet = '#c678dd';
const darkBackground = '#21252b';
const highlightBackground = '#2c313a';
const background = '#282c34';
const tooltipBackground = '#353a42';
const selection = '#3E4451';
const cursor = '#528bff';

/// The colors used in the theme, as CSS color strings.
export const color = {
  chalky,
  coral,
  cyan,
  invalid,
  ivory,
  stone,
  malibu,
  sage,
  whiskey,
  violet,
  darkBackground,
  highlightBackground,
  background,
  tooltipBackground,
  selection,
  cursor,
};

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
      width: '100px', // Also hacky,
      fontSize: '0.9em',
    },
    '.cm-gutters': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      color: stone,
      fontSize: '0.9em',
      border: 'none',
      paddingLeft: '10px',
      paddingRight: '15px',
    },
    '.cm-readonly': {
      opacity: 0.7,
    },
  });

  const cssHighlighter = syntaxHighlighting(
    HighlightStyle.define([
      { tag: t.keyword, color: violet },
      {
        tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
        color: coral,
      },
      { tag: [t.function(t.variableName), t.labelName], color: malibu },
      {
        tag: [t.color, t.constant(t.name), t.standard(t.name)],
        color: whiskey,
      },
      { tag: [t.definition(t.name), t.separator], color: ivory },
      {
        tag: [
          t.typeName,
          t.className,
          t.number,
          t.changed,
          t.annotation,
          t.modifier,
          t.self,
          t.namespace,
        ],
        color: chalky,
      },
      {
        tag: [
          t.operator,
          t.operatorKeyword,
          t.url,
          t.escape,
          t.regexp,
          t.link,
          t.special(t.string),
        ],
        color: cyan,
      },
      { tag: [t.meta, t.comment], color: stone },
      { tag: t.strong, fontWeight: 'bold' },
      { tag: t.emphasis, fontStyle: 'italic' },
      { tag: t.strikethrough, textDecoration: 'line-through' },
      { tag: t.link, color: stone, textDecoration: 'underline' },
      { tag: t.heading, fontWeight: 'bold', color: coral },
      { tag: [t.atom, t.bool, t.special(t.variableName)], color: whiskey },
      { tag: [t.processingInstruction, t.string, t.inserted], color: sage },
      { tag: t.invalid, color: invalid },
    ])
  );

  return [baseTheme, cssHighlighter];
};
