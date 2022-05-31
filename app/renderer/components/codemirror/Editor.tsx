import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { EditorView } from '@codemirror/view';
import ScrollContainer from '../ScrollContainer';
import useStore from 'renderer/store/useStore';
import { findItemDeep } from '../TreeView/utilities';
import { history } from '@codemirror/history';
import { defaultHighlightStyle } from '@codemirror/language';
import { EditorState, TransactionSpec } from '@codemirror/state';

const EditorDiv = styled.div`
  width: 100%;
  margin: auto;
  max-width: 650px;
  min-height: 100%;
  box-sizing: border-box;
  padding-top: 10vh;
  padding-bottom: 10vh;
`;

const Editor = () => {
  const activeSectionId = useStore((state) => state.activeSectionId);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  const initEditorView = (txt: string) => {
    const extensions = [];
    if (editorContainerRef.current) {
      let editorState = EditorState.create({ doc: txt });
      editorViewRef.current = new EditorView({
        state: editorState,
        parent: editorContainerRef.current,
      });
    }
  };

  /* Set Active Section Id */
  useEffect(() => {
    if (activeSectionId != '' && editorContainerRef.current) {
      const { content } = useStore.getState();
      const sectionContent = findItemDeep(content, activeSectionId)?.content;
      const editorContent = sectionContent === undefined ? '' : sectionContent;

      if (editorViewRef.current) {
        console.log('updating editor state');
        let updateEditorContentTransaction = {
          changes: {
            from: 0,
            to: editorViewRef.current.state.doc.length,
            insert: editorContent,
          }
        } as TransactionSpec;
        editorViewRef.current.dispatch(updateEditorContentTransaction);
      } else {
        initEditorView(editorContent);
      }
    }
  }, [activeSectionId]);
  return (
    <ScrollContainer>
      <EditorDiv ref={editorContainerRef} />
    </ScrollContainer>
  );
};

export default Editor;
