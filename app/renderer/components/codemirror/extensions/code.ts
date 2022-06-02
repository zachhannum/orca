import {
  ViewPlugin,
  EditorView,
  DecorationSet,
  Decoration,
  WidgetType,
} from '@codemirror/view';
import { Extension, Range } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';
import { SyntaxNodeRef, SyntaxNode } from '@lezer/common';
import Color from 'color';
import type { DefaultTheme } from 'styled-components';
import { selectionIntersection } from './hideMarkdown';

const codeDecorationsBaseTheme = (theme: DefaultTheme) =>
  EditorView.baseTheme({
    '.cm-inline-code-hidden': {
      backgroundColor: `${Color(theme.mainBg).darken(0.2)}`,
      paddingLeft: '5px',
      paddingRight: '5px',
      borderRadius: '5px',
      paddingTop: '3px',
      paddingBottom: '3px',
      fontFamily: 'Roboto Mono',
      boxSizing: 'border-box',
      display: 'inline-block',
    },
    '.cm-inline-code-mark-left': {
      backgroundColor: `${Color(theme.mainBg).darken(0.2)}`,
      borderRadius: '5px 0px 0px 5px',
      paddingTop: '3px',
      paddingBottom: '3px',
      paddingLeft: '5px',
      fontFamily: 'Roboto Mono',
      boxSizing: 'border-box',
      display: 'inline-block',
    },
    '.cm-inline-code-mark-right': {
      backgroundColor: `${Color(theme.mainBg).darken(0.2)}`,
      borderRadius: '0px 5px 5px 0px',
      paddingTop: '3px',
      paddingBottom: '3px',
      paddingRight: '5px',
      fontFamily: 'Roboto Mono',
      boxSizing: 'border-box',
      display: 'inline-block',
    },
    '.cm-inline-code-content': {
      backgroundColor: `${Color(theme.mainBg).darken(0.2)}`,
      fontFamily: 'Roboto Mono',
      paddingTop: '3px',
      paddingBottom: '3px',
      boxSizing: 'border-box',
      display: 'inline-block',
    },
    '.cm-fenced-code-line-first': {
      backgroundColor: `${Color(theme.mainBg).darken(0.2)}`,
      fontFamily: 'Roboto Mono',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingTop: '5px',
      borderRadius: '5px 5px 0px 0px',
      boxSizing: 'border-box',
    },
    '.cm-fenced-code-line': {
      backgroundColor: `${Color(theme.mainBg).darken(0.2)}`,
      fontFamily: 'Roboto Mono',
      paddingLeft: '5px',
      paddingRight: '5px',
      boxSizing: 'border-box',
    },
    '.cm-fenced-code-line-last': {
      backgroundColor: `${Color(theme.mainBg).darken(0.2)}`,
      fontFamily: 'Roboto Mono',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '5px',
      borderRadius: '0px 0px 5px 5px',
      boxSizing: 'border-box',
    },
  });

const decorateInlineCode = (
  node: SyntaxNodeRef,
  view: EditorView,
  decorations: Range<Decoration>[]
) => {
  // We need to handle CodeMark hiding here instead of in hideMarkdown to prevent wierd breaks in formatting
  let firstCodeMark = node.node.firstChild;
  let lastCodeMark = node.node.lastChild;
  if (
    !selectionIntersection(
      view.hasFocus ? view.state.selection : undefined,
      node.from,
      node.to
    ) &&
    firstCodeMark &&
    lastCodeMark
  ) {
    decorations.push(
      Decoration.replace({}).range(firstCodeMark.from, firstCodeMark.to)
    );
    decorations.push(
      Decoration.replace({}).range(lastCodeMark.from, lastCodeMark.to)
    );
    decorations.push(
      Decoration.mark({
        class: 'cm-inline-code-hidden',
        inclusive: false,
      }).range(firstCodeMark.to, lastCodeMark.from)
    );
  } else if (firstCodeMark && lastCodeMark) {
    decorations.push(
      Decoration.mark({
        class: 'cm-inline-code-mark-left',
      }).range(firstCodeMark.from, firstCodeMark.to)
    );
    decorations.push(
      Decoration.mark({
        class: 'cm-inline-code-content',
      }).range(firstCodeMark.to, lastCodeMark.from)
    );
    decorations.push(
      Decoration.mark({
        class: 'cm-inline-code-mark-right',
      }).range(lastCodeMark.from, lastCodeMark.to)
    );
  }
};

const decorateFencedCode = (
  node: SyntaxNodeRef,
  view: EditorView,
  decorations: Range<Decoration>[]
) => {
  let firstCodeMark = node.node.firstChild;
  let lastCodeMark = node.node.lastChild;
  if (
    !selectionIntersection(
      view.hasFocus ? view.state.selection : undefined,
      node.from,
      node.to
    ) &&
    firstCodeMark &&
    lastCodeMark
  ) {
    decorations.push(
      Decoration.replace({}).range(firstCodeMark.from, firstCodeMark.to)
    );
    decorations.push(
      Decoration.replace({}).range(lastCodeMark.from, lastCodeMark.to)
    );
  }
  let firstLine = view.state.doc.lineAt(node.from);
  let lastLine = view.state.doc.lineAt(node.to);
  decorations.push(
    Decoration.line({
      class: 'cm-fenced-code-line-first',
    }).range(firstLine.from)
  );
  decorations.push(
    Decoration.line({
      class: 'cm-fenced-code-line-last',
    }).range(lastLine.from)
  );
  for (let l = firstLine.number + 1; l < lastLine.number; l++) {
    decorations.push(
      Decoration.line({
        class: 'cm-fenced-code-line',
      }).range(view.state.doc.line(l).from)
    );
  }
};

const decorateCode = (view: EditorView): DecorationSet => {
  let decorations: Range<Decoration>[] = [];
  for (let { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: (node: SyntaxNodeRef) => {
        // console.log(node.name);
        // console.log(node.node);
        if (node.name === 'InlineCode') {
          decorateInlineCode(node, view, decorations);
        } else if (node.name === 'FencedCode') {
          decorateFencedCode(node, view, decorations);
        }
      },
    });
  }
  return Decoration.set(decorations, true);
};

const decorateCodePlugin = ViewPlugin.define(
  (view: EditorView) => {
    return {
      update: () => {
        return decorateCode(view);
      },
    };
  },
  { decorations: (plugin) => plugin.update() }
);

const code = (theme: DefaultTheme): Extension => {
  return [codeDecorationsBaseTheme(theme), decorateCodePlugin];
};

export default code;
