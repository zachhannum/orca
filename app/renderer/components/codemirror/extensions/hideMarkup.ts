import {
  ViewPlugin,
  EditorView,
  DecorationSet,
  Decoration,
} from '@codemirror/view';
import { EditorSelection, Extension } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';
import { SyntaxNodeRef, TreeCursor } from '@lezer/common';

const hideMarkupTypes = ['HeaderMark', 'QuoteMark', 'EmphasisMark'];

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
        if (node.name === 'Document') {
          console.log(node.node);
        }
        if (
          hideMarkupTypes.includes(node.name) &&
          node.node.parent &&
          !selectionIntersection(
            view.state.selection,
            node.node.parent.from,
            node.node.parent.to
          )
        ) {
          widgets.push(
            Decoration.replace({
              inclusive: false,
              block: false,
            }).range(node.from, node.to)
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

const hideMarkup = (): Extension => {
  return hideMarkupPlugin;
};

export default hideMarkup;
