import { Annotation, Extension, Transaction } from '@codemirror/state';
import { ViewUpdate, EditorView } from '@codemirror/view';

const smartTypographyAnnotation = Annotation.define<boolean>();

export const smartTypography = (): Extension => {
  return EditorView.updateListener.of((update: ViewUpdate) => {
    if (
      update.docChanged &&
      !update.transactions.some(
        (t) =>
          t.isUserEvent('redo') ||
          t.isUserEvent('undo') ||
          t.annotation(smartTypographyAnnotation)
      )
    ) {
      const { view } = update;
      const { state } = view;
      const { from, text } = state.doc.lineAt(state.selection.main.from);
      let i = state.selection.main.from - from;
      let word = '';

      // decrement i until whitespace is found
      while (
        (i > 0 && text[i - 1] === '-') ||
        text[i - 1] === '–' ||
        text[i - 1] === '—'
      ) {
        i -= 1;
      }
      const fromWord = from + i;
      // add characters to word until whitespace is found
      while (
        (i < text.length && text[i] === '-') ||
        text[i] === '–' ||
        text[i] === '—'
      ) {
        word += text[i];
        i += 1;
      }
      const toWord = from + i - 1;

      // if word is empty, return
      if (word.length === 0) {
        return;
      }

      let newText = word;

      let dispatchChanges = false;
      if (word === '--') {
        dispatchChanges = true;
        newText = '–';
      } else if (word === '–-') {
        dispatchChanges = true;
        newText = '—';
      } else if (word === '—-') {
        dispatchChanges = true;
        newText = '---';
      }

      if (dispatchChanges) {
        update.view.dispatch({
          changes: {
            from: fromWord,
            to: toWord + 1,
            insert: newText,
          },
          // selection: {
          //   anchor: state.selection.main.anchor,
          //   head: state.selection.main.head,
          // },
          annotations: [
            Transaction.userEvent.of('full'),
            smartTypographyAnnotation.of(true),
          ],
        });
      }
    }
  });
};
