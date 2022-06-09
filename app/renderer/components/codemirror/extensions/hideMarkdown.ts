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

const hideMarkupTypes = [
  'HeaderMark',
  'QuoteMark',
  'EmphasisMark',
  'HorizontalRule',
];

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
      marginLeft: '-5ch',
      paddingRight: '.2ch',
      paddingLeft: '.2ch',
      position: 'absolute',
      top: '50%',
      transform: 'translate(0px, -50%)',
    },
    '.cm-hr-rule': {
      display: 'block',
      height: '2px',
      marginTop: '0.5em',
      marginBottom: '0.5em',
      backgroundColor: `${theme.buttonPrimaryBg}`,
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
  let decorations: Range<Decoration>[] = [];
  if (node.name === 'HorizontalRule') {
    decorations.push(
      Decoration.line({
        class: 'cm-hr-rule',
      }).range(from, from)
    );
  }
  decorations.push(
    Decoration.replace({
      widget: getWidget(node),
    }).range(from, to)
  );
  return decorations;
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
  }
  return { from: node.from, to: node.to };
};

export const selectionIntersection = (
  selection: EditorSelection | undefined,
  rangeFrom: number,
  rangeTo: number
) => {
  if (selection) {
    return selection.main.from <= rangeTo && selection.main.to >= rangeFrom;
  } else {
    return false;
  }
};

type NodeIntersectionRange = {
  from: number;
  to: number;
};

const getIntersectionRange = (
  node: SyntaxNodeRef,
  view: EditorView
): NodeIntersectionRange => {
  if (node.name === 'HorizontalRule') {
    return { from: node.from, to: node.to };
  }
  if (node.node.parent) {
    if (node.name === 'QuoteMark') {
      const lineFrom = view.state.doc.lineAt(node.node.parent.from).from;
      return { from: lineFrom, to: node.node.parent.to };
    }
    return { from: node.node.parent.from, to: node.node.parent.to };
  }
  return { from: node.from, to: node.to };
};

const updateHideMarkdownDecorations = (view: EditorView): DecorationSet => {
  let widgets: any = [];
  for (let { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: (node: SyntaxNodeRef) => {
        // console.log(node.name);
        // console.log(node.node);
        if (hideMarkupTypes.includes(node.name) && node.node.parent) {
          const nodeIntersectionRange = getIntersectionRange(node, view);
          if (
            !selectionIntersection(
              view.hasFocus ? view.state.selection : undefined,
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

const hideMarkdownPlugin = ViewPlugin.define(
  (view: EditorView) => {
    return {
      update: () => {
        return updateHideMarkdownDecorations(view);
      },
    };
  },
  { decorations: (plugin) => plugin.update() }
);

const hideMarkdown = (theme: DefaultTheme): Extension => {
  return [hideMarkdownBaseTheme(theme), hideMarkdownPlugin];
};

export default hideMarkdown;
