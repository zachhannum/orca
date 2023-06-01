import { Extension, EditorState } from '@codemirror/state';
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
} from '@codemirror/view';
import type { Range } from '@codemirror/rangeset';

export const readOnlyLines = (readOnlyPos: number): Extension => {
  return EditorState.changeFilter.of((tr) => {
    if (tr.docChanged) {
      if (tr.changes.desc.touchesRange(0, readOnlyPos)) {
        return false;
      }
    }
    return true;
  });
};

const updateReadOnlyLineDecorations = (
  view: EditorView,
  readOnlyPos: number
): DecorationSet => {
  const decorations: Range<Decoration>[] = [];
  const endLine = view.state.doc.lineAt(readOnlyPos);
  const startPos = 0;
  const endPos = endLine.to;
  const decoration = Decoration.mark({
    class: 'cm-readonly',
  });
  decorations.push({ from: startPos, to: endPos, value: decoration });
  return Decoration.set(decorations, true);
};

export const readOnlyLinesDecoration = (readOnlyPos: number) =>
  ViewPlugin.define(
    (view: EditorView) => {
      return {
        update: () => {
          return updateReadOnlyLineDecorations(view, readOnlyPos);
        },
      };
    },
    { decorations: (plugin) => plugin.update() }
  );
