import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const ScrollContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  width: 100%;
  display: flex;
`;

const WriterContainer = styled.div`
  height: 90%;
  width: 90%;
`;

const Writer = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editorRef = useRef<Editor>(null);

  const setFocus = () => {
    editorRef.current?.focus();
  };

  return (
    <ScrollContainer>
      <WriterContainer onClick={() => setFocus()}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          ref={editorRef}
        />
      </WriterContainer>
    </ScrollContainer>
  );
};

export default Writer;
