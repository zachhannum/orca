import { Extension } from '@codemirror/state';
import { ViewUpdate, EditorView } from '@codemirror/view';

export const cancelProofreadOnChange = (
  abortControllerRef: React.MutableRefObject<AbortController | null>
): Extension => {
  return EditorView.updateListener.of((update: ViewUpdate) => {
    if (update.docChanged && abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  });
};
