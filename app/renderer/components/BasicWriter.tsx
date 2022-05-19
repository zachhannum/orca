import { useEffect, useState, CSSProperties } from 'react';
import {
  Plate,
  PlateProvider,
  usePlateEditorRef,
  createPlugins,
} from '@udecode/plate';
import { EditableProps } from 'slate-react/dist/components/editable';
import { ReactEditor } from 'slate-react';
import ScrollContainer from './ScrollContainer';
import useStore from 'renderer/store/useStore';
import {
  deserializePlainText,
  serializePlainText,
  createDeserializePlainTextPlugin,
} from '../writer/serialize';
import { findItemDeep } from './TreeView/utilities';
import { createMarkdownDecoratePlugin } from '../writer/createMarkdownDecoratePlugin';
import { createSoftBreakPlugin } from '../writer/createSoftBreakPlugin';
import { PreviewLeaf } from '../writer/PreviewLeaf';

const blankEditorValue = [
  {
    type: 'p',
    children: [
      {
        text: '',
      },
    ],
  },
];

const BasicWriterComp = () => {
  const editableProps = {
    style: {
      width: '100%',
      margin: 'auto',
      maxWidth: '650px',
      minHeight: '100%',
      boxSizing: 'border-box',
      paddingTop: '10vh',
      paddingBottom: '10vh',
    } as CSSProperties,
    spellCheck: false,
    autoFocus: true,
    renderLeaf: PreviewLeaf,
  } as EditableProps;
  const activeSectionId = useStore((state) => state.activeSectionId);
  const [initialValue, setInitialValue] = useState(blankEditorValue);
  const [editorId, setEditorId] = useState('');
  const editor = usePlateEditorRef();

  const plugins = createPlugins([
    createDeserializePlainTextPlugin(),
    createMarkdownDecoratePlugin(),
    createSoftBreakPlugin(),
  ]);

  useEffect(() => {
    if (editor) {
      const { sectionHistory } = useStore.getState();
      const history = sectionHistory?.get(activeSectionId);
      if (history) {
        editor.history = JSON.parse(JSON.stringify(history));
      }
      ReactEditor.focus(editor);
    }
  });

  useEffect(() => {
    if (activeSectionId != '') {
      const { content } = useStore.getState();
      const sectionContent = findItemDeep(content, activeSectionId)?.content;
      if (sectionContent) {
        const nodes = deserializePlainText(sectionContent);
        if (nodes.length) {
          setInitialValue(nodes);
        }
      } else {
        setInitialValue(blankEditorValue);
      }
      setEditorId(activeSectionId);
    }
  }, [activeSectionId]);

  const handleChange = () => {
    if (activeSectionId != '') {
      const { setSectionHistory } = useStore.getState();
      const { updateSectionContent } = useStore.getState();
      setSectionHistory(activeSectionId, editor.history);
      updateSectionContent(
        activeSectionId,
        serializePlainText(editor.children)
      );
    }
  };

  return (
    <ScrollContainer>
      <Plate
        key={editorId}
        id={editorId}
        plugins={plugins}
        editableProps={editableProps}
        onChange={handleChange}
        initialValue={initialValue}
      />
    </ScrollContainer>
  );
};

const BasicWriter = () => {
  const activeSectionId = useStore((state) => state.activeSectionId);

  return (
    <PlateProvider id={activeSectionId}>
      <BasicWriterComp />
    </PlateProvider>
  );
};

export default BasicWriter;
