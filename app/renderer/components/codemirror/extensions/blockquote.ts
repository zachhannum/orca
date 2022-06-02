import {
  ViewPlugin,
  EditorView,
  DecorationSet,
  Decoration,
  WidgetType,
} from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';
import { SyntaxNodeRef, SyntaxNode } from '@lezer/common';
import type { DefaultTheme } from 'styled-components';

const blockquoteDecorationsBaseTheme = (theme: DefaultTheme) =>
  EditorView.baseTheme({
    '.cm-blockquote': {
      borderRight: `3px ${theme.buttonPrimaryBg} solid;`,
      position: 'absolute',
      top: '0%'
    },
    '.cm-line-blockquote': {
      paddingLeft: 'attr(data-depth-padding)'
    }
  });

class BlockquoteWidget extends WidgetType {
  constructor(readonly height: string, readonly left: string) {
    super();
  }

  toDOM() {
    let span = document.createElement('span');
    span.style.height = this.height;
    span.style.left = this.left;
    span.className = 'cm-blockquote';
    return span;
  }

  ignoreEvent() {
    return false;
  }
}

const getBlockquoteDepth = (node: SyntaxNode, depth = 0): number => {
  if (node.parent?.name !== 'Blockquote') {
    return depth;
  } else {
    return getBlockquoteDepth(node.parent, depth + 1);
  }
};

const decorateBlockquotes = (view: EditorView): DecorationSet => {
  let widgets: any = [];
  for (let { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: (node: SyntaxNodeRef) => {
        if (node.name === 'Blockquote') {
          const lineStart = view.state.doc.lineAt(node.from);
          const lineEnd = view.state.doc.lineAt(node.to);
          for (let l = lineStart.number; l <= lineEnd.number; l++) {
            const line = view.state.doc.line(l);
            const from = line.from;
            const to = line.to;
            const depth = getBlockquoteDepth(node.node);
            widgets.push(
              Decoration.widget({
                widget: new BlockquoteWidget(`${view.lineBlockAt(from).height}px`, `-${(depth) * 20 + 15}px`),
              }).range(from, from)
            );
            widgets.push(
              Decoration.line({
                attributes: {
                  'style': `margin-left: ${depth * 20 + 20}px`
                },
              }).range(from, from)
            );
            if (node.node.parent?.name === 'Document') {
              widgets.push(
                Decoration.mark({
                  tagName: 'span',
                }).range(from, to)
              );
            }
          }
        }
      },
    });
  }
  return Decoration.set(widgets, true);
};

const decorateBlockquotesPlugin = ViewPlugin.define(
  (view: EditorView) => {
    return {
      update: () => {
        return decorateBlockquotes(view);
      },
    };
  },
  { decorations: (plugin) => plugin.update() }
);

const blockquote = (theme: DefaultTheme): Extension => {
  return [blockquoteDecorationsBaseTheme(theme), decorateBlockquotesPlugin];
};

export default blockquote;
