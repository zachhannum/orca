import { Extension, EditorState } from '@codemirror/state';

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
