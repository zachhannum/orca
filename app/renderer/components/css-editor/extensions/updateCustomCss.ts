import { EditorView, ViewUpdate } from '@codemirror/view';
import useStore from 'renderer/store/useStore';

export const updateCustomCss = (readOnlyPos: number) => {
  const { setCustomCss } = useStore.getState();
  return EditorView.updateListener.of((update: ViewUpdate) => {
    if (update.docChanged) {
      const customCss = update.state.doc.sliceString(
        readOnlyPos,
        update.state.doc.length
      );
      setCustomCss(customCss);
    }
  });
};
