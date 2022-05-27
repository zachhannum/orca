import { useEffect, useState, CSSProperties, useCallback, useRef } from 'react';
import {
  Plate,
  PlateProvider,
  usePlateEditorRef,
  createPlugins,
} from '@udecode/plate';
import { EditableProps } from 'slate-react/dist/components/editable';
import { ReactEditor } from 'slate-react';
import { Node, NodeEntry, BaseRange, Text } from 'slate';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import ScrollContainer from '../ScrollContainer';
import useStore from 'renderer/store/useStore';
import { deserializePlainText, serializePlainText } from './utils/serialize';
import { findItemDeep } from '../TreeView/utilities';
import { setBlockTypes } from './utils/setBlockTypes';
import { decorateMarkdown } from './utils/decorateMarkdown';
import { PreviewLeaf, PreviewElement } from '../writer';
import { BasicElement, RemarkNode } from './types';

const blankEditorValue = [
  {
    type: 'p',
    children: [
      {
        text: '',
      },
    ],
  },
] as BasicElement[];

const BasicWriterComp = () => {
  const activeSectionId = useStore((state) => state.activeSectionId);
  const [initialValue, setInitialValue] = useState(blankEditorValue);
  const [editorId, setEditorId] = useState('');
  const [initialize, setInitialize] = useState(true);
  const editor = usePlateEditorRef();

  const plugins = createPlugins([
    // createMarkdownDecoratePlugin(),
  ]);

  /* Initialize Editor */
  useEffect(() => {
    if (editor && initialize) {
      const { sectionHistory } = useStore.getState();
      const history = sectionHistory?.get(activeSectionId);
      if (history) {
        editor.history = JSON.parse(JSON.stringify(history));
      }
      // setBlockTypes(editor);
      ReactEditor.focus(editor);
      setInitialize(false);
    } else {
      setInitialize(true);
    }
  }, [editor]);

  /* Set Active Section Id */
  useEffect(() => {
    if (activeSectionId != '') {
      const { content } = useStore.getState();
      const sectionContent = findItemDeep(content, activeSectionId)?.content;
      if (sectionContent) {
        const nodes = deserializePlainText(sectionContent);
        if (nodes.length) {
          setInitialValue(nodes);
        }
        updateEditorText(sectionContent);
        updateRemark();
        updateDecorations();
      } else {
        setInitialValue(blankEditorValue);
      }
      setEditorId(activeSectionId);
    }
  }, [activeSectionId]);

  const editorSelectionRef = useRef<BaseRange | null>(null);
  const remarkAstRef = useRef<RemarkNode | null>(null);
  const editorTextRef = useRef<string>('');
  const markdownDecorationsRef = useRef<Map<number, any[]>>(
    new Map<number, any[]>()
  );

  const updateDecorations = () => {
    markdownDecorationsRef.current = decorateMarkdown(
      editorSelectionRef.current,
      editorTextRef.current,
      remarkAstRef.current
    );
  };

  const updateEditorText = (text: string) => {
    editorTextRef.current = text;
  };

  const updateRemark = () => {
    const editorString = editorTextRef.current;
    let startTime = performance.now();
    const remark = unified().use(remarkParse).parse(editorString) as RemarkNode;
    let endTime = performance.now();
    console.log(`Remark parse took ${endTime - startTime} milliseconds`);
    editorTextRef.current = editorString;
    remarkAstRef.current = remark;
    console.log(remark);
  };

  const decorate = useCallback(
    ([node, path]: NodeEntry<Node>) => {
      if (!Text.isText(node)) {
        return [];
      } else {
        let decorations = markdownDecorationsRef.current.get(path[0]);
        if (decorations) return decorations;
        else return [];
      }
    },
    [markdownDecorationsRef]
  );

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
    decorate: decorate,
  } as EditableProps;

  const handleChange = () => {
    if (editor) {
      let updateBlockTypes = false;
      editorSelectionRef.current = editor.selection;
      if (editor.operations.some((op) => 'set_selection' === op.type)) {
        updateBlockTypes = true;
        updateDecorations();
      }
      if (editor.operations.some((op) => 'set_selection' !== op.type)) {
        updateEditorText(serializePlainText(editor));
        updateRemark();
        updateDecorations();
      }
      if (activeSectionId != '') {
        const { content } = useStore.getState();
        const { setSectionHistory } = useStore.getState();
        const { updateSectionContent } = useStore.getState();
        const sectionContent = findItemDeep(content, activeSectionId)?.content;
        setSectionHistory(activeSectionId, editor.history);
        const editorText = serializePlainText(editor);
        if (editorText !== sectionContent) {
          updateSectionContent(activeSectionId, editorText);
          updateBlockTypes = true;
        }
      }
      // if (updateBlockTypes) setBlockTypes(editor);
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
