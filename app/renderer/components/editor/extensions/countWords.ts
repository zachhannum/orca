import { Extension } from '@codemirror/state';
import { ViewUpdate, EditorView } from '@codemirror/view';

export const countWords = (
  onWordCountUpdate: (count: number) => void
): Extension => {
  return EditorView.updateListener.of((update: ViewUpdate) => {
    // if (update.docChanged) {
    let count = 0;
    const iter = update.state.doc.iter();
    while (!iter.next().done) {
      const test = iter.value.trim();
      if (test.length > 0) {
        count += test.split(/\s+/).length;
      }
    }
    onWordCountUpdate(count);
    // }
  });
};
