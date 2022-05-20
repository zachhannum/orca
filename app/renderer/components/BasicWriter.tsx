import { useEffect, useState, useCallback, CSSProperties } from 'react';
import {
  Plate,
  PlateProvider,
  usePlateEditorRef,
  createPlugins,
} from '@udecode/plate';
import { EditableProps } from 'slate-react/dist/components/editable';
import { Editor, Transforms, Path } from 'slate';
import { HistoryEditor } from 'slate-history';
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
import { PreviewElement } from '../writer/PreviewElement';

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
    renderElement: PreviewElement,
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

  const [selectionPath, setSelectionPath] = useState<Path | null>(null);

  const setBlockMarkup = useCallback(() => {}, [selectionPath]);

  useEffect(() => {
    console.log(selectionPath);
    if (selectionPath) {
      HistoryEditor.withoutSaving(editor, () => {
        Transforms.setNodes(
          editor,
          { hideMarkup: true },
          {
            at: [],
            match: (n) => Editor.isBlock(editor, n) && n.hideMarkup === false,
          }
        );
        Transforms.setNodes(
          editor,
          { hideMarkup: false },
          {
            at: selectionPath,
            match: (n) => Editor.isBlock(editor, n) && n.type === 'blockquote',
          }
        );
      });
    }
  }, [selectionPath]);

  const handleChange = () => {
    console.log(editor.children);
    if (editor.selection) {
      if (editor.selection.anchor.path !== selectionPath)
        setSelectionPath(editor.selection.anchor.path);
    }
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
