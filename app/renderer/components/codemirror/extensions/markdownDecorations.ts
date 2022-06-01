import {
  ViewPlugin,
  EditorView,
  DecorationSet,
  Decoration,
  WidgetType,
} from '@codemirror/view';
import { EditorSelection, Extension, Range } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';
import { SyntaxNodeRef } from '@lezer/common';
import type { DefaultTheme } from 'styled-components';

const hideMarkupTypes = ['HeaderMark', 'QuoteMark', 'EmphasisMark'];

const hideMarkdownBaseTheme = (theme: DefaultTheme) =>
  EditorView.baseTheme({
    '.cm-header-label-container': {
      display: 'inline-flex',
    },
    '.cm-header-label': {
      fontWeight: '700',
      borderRadius: '5px',
      color: theme.buttonPrimaryBg,
      border: ` 1.5px ${theme.buttonPrimaryBg} solid;`,
      boxSizing: 'border-box',
      fontFamily: 'Roboto Mono',
      fontSize: '0.8em',
      marginLeft: '-3.4ch',
      marginRight: '1ch',
      paddingRight: '.2ch',
      paddingLeft: '.2ch',
      position: 'absolute',
      top: '50%',
      transform: 'translate(0px, -50%)',
    },
  });

class HeaderWidget extends WidgetType {
  constructor(readonly symbol: string) {
    super();
  }

  eq(other: HeaderWidget) {
    return other.symbol === this.symbol;
  }

  toDOM() {
    let span = document.createElement('span');
    span.textContent = this.symbol;
    span.className = 'cm-header-label';
    return span;
  }

  ignoreEvent() {
    return false;
  }
}

const getNodeDecorations = (
  node: SyntaxNodeRef,
  from: number,
  to: number,
  view: EditorView
): Range<Decoration>[] => {
  return [
    Decoration.replace({
      widget: getWidget(node),
      inclusive: false,
      block: false,
    }).range(from, to),
  ];
};

const getWidget = (node: SyntaxNodeRef): WidgetType | undefined => {
  if (
    node.name === 'HeaderMark' &&
    node.node.parent?.parent?.name !== 'Blockquote'
  ) {
    const headerType = node.node.parent?.name;
    const symbol = `h${headerType?.charAt(headerType.length - 1)}`;
    return new HeaderWidget(symbol);
  }
  return undefined;
};

type NodeMarkupRange = {
  from: number;
  to: number;
};

const getMarkupRange = (
  node: SyntaxNodeRef,
  view: EditorView
): NodeMarkupRange => {
  if (node.name === 'HeaderMark') {
    return { from: node.from, to: node.to + 1 };
  } else if (node.name === 'QuoteMark') {
    const lineFrom = view.state.doc.lineAt(node.node.from).from;
    if (node.node.nextSibling?.name !== 'QuoteMark') {
      return { from: lineFrom, to: node.to + 1 };
    } else {
      return { from: lineFrom, to: node.to };
    }
  }
  return { from: node.from, to: node.to };
};

const selectionIntersection = (
  selection: EditorSelection,
  rangeFrom: number,
  rangeTo: number
) => {
  return selection.main.from <= rangeTo && selection.main.to >= rangeFrom;
};

type NodeIntersectionRange = {
  from: number;
  to: number;
};

const getIntersectionRange = (
  node: SyntaxNodeRef,
  view: EditorView
): NodeIntersectionRange => {
  if (node.node.parent) {
    if (node.name === 'QuoteMark') {
      const lineFrom = view.state.doc.lineAt(node.from).from;
      return { from: lineFrom, to: node.node.parent.to };
    }
    return { from: node.node.parent.from, to: node.node.parent.to };
  }
  return { from: node.from, to: node.to };
};

const decorationMarkdown = (view: EditorView): DecorationSet => {
  console.log('Decorating markdown');
  let widgets: any = [];
  for (let { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: (node: SyntaxNodeRef) => {
        console.log(node.name);
        console.log(node.node);
        if (hideMarkupTypes.includes(node.name) && node.node.parent) {
          const nodeIntersectionRange = getIntersectionRange(node, view);
          if (
            !selectionIntersection(
              view.state.selection,
              nodeIntersectionRange.from,
              nodeIntersectionRange.to
            )
          ) {
            const { from, to } = getMarkupRange(node, view);
            getNodeDecorations(node, from, to, view).forEach(
              (rangeDecoration) => {
                widgets.push(rangeDecoration);
              }
            );
          }
        }
      },
    });
  }
  return Decoration.set(widgets, true);
};

const markdownDecorationsPlugin = ViewPlugin.define(
  (view: EditorView) => {
    return {
      update: () => {
        return decorationMarkdown(view);
      },
    };
  },
  { decorations: (plugin) => plugin.update() }
);

const markdownDecorations = (theme: DefaultTheme): Extension => {
  return [hideMarkdownBaseTheme(theme), markdownDecorationsPlugin];
};

export default markdownDecorations;
