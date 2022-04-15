// import React from 'react';
// import { Editor, EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css';
import React, { useState } from 'react';
import styled from '@emotion/styled';


const Writer = () => {
  const WriterContainer = styled.div`
    max-width: 500px;
    margin: auto;
  `;
  const [isActive, toggleActive] = useState(false);
  // const [editorState, setEditorState] = React.useState(() =>
  //   EditorState.createEmpty()
  // );

  return (
      <WriterContainer>Hello</WriterContainer>
  );
};

export default Writer;
