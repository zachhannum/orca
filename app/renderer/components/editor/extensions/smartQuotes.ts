import { Extension, Transaction } from '@codemirror/state';
import { ViewUpdate, EditorView } from '@codemirror/view';
import smartquotes from 'smartquotes';

export const smartQuotes = (enabled: boolean): Extension => {
  return EditorView.updateListener.of((update: ViewUpdate) => {
    if (!enabled) return;

    // prevent smartquotes from running if the update is from an undo/redo by checking the userEvent
    if (
      update.docChanged &&
      !update.transactions.some(
        (t) => t.isUserEvent('redo') || t.isUserEvent('undo')
      )
    ) {
      const { view } = update;
      const { state } = view;

      const { from, to, text } = state.doc.lineAt(state.selection.main.from);

      // Replace all types of quotes with regular dumb quotes before running smartquotes
      const dumbText = text
        .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'")
        .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"');
      const newText = smartquotes(dumbText);

      if (newText !== text) {
        console.log(`Dispatching smartquotes update: ${newText}`);
        update.view.dispatch({
          changes: {
            from,
            to,
            insert: newText,
          },
          selection: {
            anchor: state.selection.main.anchor,
            head: state.selection.main.head,
          },
          annotations: Transaction.userEvent.of('full'),
        });
      }
    }
  });
};
