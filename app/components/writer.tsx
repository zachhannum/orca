import styled from '@emotion/styled';
import React, { useState } from 'react';
import { BaseEditor, Descendant, createEditor } from 'slate';
import { ReactEditor, Slate, Editable, withReact } from 'slate-react';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const ScrollContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  cursor: text;
`;

const WriterContainer = styled.div`
  max-width: 700px;
  padding-top: 100px;
  padding-bottom: 100px;
  width: 90%;
`;

const Writer = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState<Descendant[]>([
    { type: 'paragraph', children: [{ text: '' }] },
  ]);

  const setFocus = () => {
    ReactEditor.focus(editor);
  };

  return (
    <ScrollContainer onClick={() => setFocus()}>
      <WriterContainer>
        <Slate editor={editor} value={value}>
          <Editable />
        </Slate>
      </WriterContainer>
    </ScrollContainer>
  );
};

export default Writer;
