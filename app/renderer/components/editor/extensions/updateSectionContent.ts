import { Extension } from '@codemirror/state';
import { ViewUpdate, EditorView } from '@codemirror/view';
import useStore from 'renderer/store/useStore';

const updateSectionContent = (sectionId: string): Extension => {
  return EditorView.updateListener.of((update: ViewUpdate) => {
    if (update.docChanged) {
      const sectionText = update.state.doc.toJSON().join('\n');
      const { updateSectionContent, setEditorState } = useStore.getState();
      updateSectionContent(sectionId, sectionText);
      setEditorState(sectionId, update.state);
    }
  });
};

export default updateSectionContent;
