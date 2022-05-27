import {
  useEffect,
  useState,
  CSSProperties,
  useCallback,
  useRef,
  useMemo,
} from 'react';
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
import { throttle, debounce, isEqual } from 'lodash';
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
  const [markdownDecorations, setMarkdownDecorations] = useState<
    Map<number, any[]>
  >(new Map<number, any[]>());

  const updateDecorations = () => {
    setMarkdownDecorations(
      decorateMarkdown(
        editorSelectionRef.current,
        editorTextRef.current,
        remarkAstRef.current
      )
    );
  };

  const updateDecorationsDebounce = useMemo(
    () => debounce(updateDecorations, 50, { leading: true, trailing: true }),
    []
  );

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
    updateDecorations();
  };

  const updateRemarkDebounce = useMemo(
    () => debounce(updateRemark, 50, { leading: true, trailing: true }),
    []
  );


  const arrayCompare = (arr1: any[], arr2: any[]): boolean => {
    if (arr1.length !== arr2.length) {
      return false;
    } else {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false; //TODO fix comparison here, these are objects
      }
    }
    return true;
  };
  const [oldDecorations, setOldDecorations] = useState<
  Map<number, any[]>
>(new Map<number, any[]>());
  useEffect(() => {
    console.log(oldDecorations);
    markdownDecorations.forEach((decorationArray, path) => {
      let oldDecorationArray = oldDecorations.get(path);
      if (oldDecorationArray) {
        if(!arrayCompare(oldDecorationArray, decorationArray)) {
          console.log(`need to change node decorations at path ${path}`);
        }
      } else {
        console.log(`need to change node decorations at path ${path}`);
      }
    });
    setOldDecorations(markdownDecorations);
  }, [markdownDecorations]);

  // const decorate = useCallback(
  //   ([node, path]: NodeEntry<Node>) => {
  //     if (!Text.isText(node)) {
  //       return [];
  //     } else {
  //       let decorations = markdownDecorations.get(path[0]);
  //       if (decorations) return decorations;
  //       else return [];
  //     }
  //   },
  //   [markdownDecorations]
  // );

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
    // decorate: decorate,
  } as EditableProps;

  const handleChange = () => {
    if (editor) {
      let updateBlockTypes = false;
      editorSelectionRef.current = editor.selection;
      if (editor.operations.length) console.log(editor.operations);
      if (editor.operations.some((op) => 'set_selection' === op.type)) {
        updateBlockTypes = true;
        updateDecorationsDebounce();
      }
      if (editor.operations.some((op) => 'set_selection' !== op.type)) {
        updateEditorText(serializePlainText(editor));
        updateDecorationsDebounce();
        updateRemarkDebounce();
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
