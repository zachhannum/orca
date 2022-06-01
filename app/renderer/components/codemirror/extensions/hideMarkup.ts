import {
  ViewPlugin,
  EditorView,
  DecorationSet,
  Decoration,
  WidgetType,
} from '@codemirror/view';
import { EditorSelection, Extension } from '@codemirror/state';
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
      transform: 'translate(0px, -50%)'
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

const getWidget = (node: SyntaxNodeRef): WidgetType | undefined => {
  if (node.name === 'HeaderMark') {
    const headerType = node.node.parent?.name;
    const symbol = `h${headerType?.charAt(headerType.length - 1)}`;
    return new HeaderWidget(symbol);
  }
  return undefined;
};

const getMarkupRange = (node: SyntaxNodeRef): { from: number; to: number } => {
  if (node.name === 'HeaderMark') {
    return { from: node.from, to: node.to + 1 };
  } else if (node.name === 'QuoteMark') {
    if (node.node.nextSibling?.name !== 'QuoteMark') {
      return { from: node.from, to: node.to + 1 };
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

const hideMarkdown = (view: EditorView): DecorationSet => {
  let widgets: any = [];
  for (let { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: (node: SyntaxNodeRef) => {
        console.log(node.name);
        console.log(node);
        if (
          hideMarkupTypes.includes(node.name) &&
          node.node.parent &&
          !selectionIntersection(
            view.state.selection,
            node.node.parent.from,
            node.node.parent.to
          )
        ) {
          const { from, to } = getMarkupRange(node);
          widgets.push(
            Decoration.replace({
              widget: getWidget(node),
              inclusive: false,
              block: false,
            }).range(from, to)
          );
        }
      },
    });
  }
  return Decoration.set(widgets, true);
};

const hideMarkupPlugin = ViewPlugin.define(
  (view: EditorView) => {
    return {
      update: () => {
        return hideMarkdown(view);
      },
    };
  },
  { decorations: (plugin) => plugin.update() }
);

const hideMarkup = (theme: DefaultTheme): Extension => {
  return [hideMarkdownBaseTheme(theme), hideMarkupPlugin];
};

export default hideMarkup;
