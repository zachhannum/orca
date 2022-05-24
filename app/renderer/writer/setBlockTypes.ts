import { Editor, Range, Transforms } from 'slate';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { RemarkNode } from './remark';
import { serializePlainText } from './serialize';
import { HistoryEditor } from 'slate-history';

const decorateTree = (editor: Editor, remarkNodes: RemarkNode[], depth = 1) => {
  remarkNodes.forEach((remarkNode) => {
    if (remarkNode.children) {
      const pathStart = [remarkNode.position.start.line - 1];
      const pathEnd = [remarkNode.position.end.line - 1];
      const nodeStartOffset = remarkNode.position.start.column - 1;
      const nodeEndOffset = remarkNode.position.end.column - 1;
      const nodePath = {
        anchor: {
          path: pathStart,
          offset: nodeStartOffset,
        },
        focus: {
          path: pathEnd,
          offset: nodeEndOffset,
        },
      } as Range;

      if (remarkNode.type === 'blockquote') {
        console.log('Setting blockquote true at');
        console.log(nodePath);
        Transforms.setNodes(
          editor,
          { blockquote: true, depth },
          { at: nodePath, match: (n) => Editor.isBlock(editor, n) }
        );
      }

      decorateTree(
        editor,
        remarkNode.children,
        remarkNode.type === 'blockquote' ? depth + 1 : depth
      );
    }
  });
};

export const setBlockTypes = (editor: Editor) => {
  console.log(editor);
  const editorText = serializePlainText(editor);
  console.log(editorText);
  const remark = unified().use(remarkParse).parse(editorText) as RemarkNode;
  console.log(remark);
  HistoryEditor.withoutSaving(editor, () => {
    Editor.withoutNormalizing(editor, () => {
      Transforms.setNodes(
        editor,
        { blockquote: false },
        { at: [], match: (n) => Editor.isBlock(editor, n) }
      );
      if (remark.children) decorateTree(editor, remark.children);
    });
  });
};
