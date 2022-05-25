import { Editor, Path, Range, Transforms } from 'slate';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { RemarkNode } from './remark';
import { serializePlainText } from './serialize';
import { HistoryEditor } from 'slate-history';

type RemarkBlockType = 'blockquote' | 'code';

const isBlockType = (type: string) => {
  return (type as RemarkBlockType) !== undefined;
};

const decorateTree = (editor: Editor, remarkNodes: RemarkNode[], depth = 1) => {
  remarkNodes.forEach((remarkNode) => {
    if (isBlockType(remarkNode.type)) {
      const pathStart = [remarkNode.position.start.line - 1];
      const pathEnd = [remarkNode.position.end.line - 1];
      const nodeStartOffset =
        remarkNode.type === 'blockquote'
          ? 0
          : remarkNode.position.start.column - 1;
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
      const firstOfBlockPath = {
        anchor: {
          path: pathStart,
          offset: nodeStartOffset,
        },
        focus: {
          path: pathStart,
          offset: nodeStartOffset,
        },
      } as Range;
      const lastOfBlockPath = {
        anchor: {
          path: pathEnd,
          offset: nodeEndOffset,
        },
        focus: {
          path: pathEnd,
          offset: nodeEndOffset,
        },
      } as Range;
      console.log(remarkNode.type);

      let hideMarkup = true;
      if (editor.selection) {
        if (Range.includes(nodePath, editor.selection)) {
          console.log('showing markup at:');
          console.log(nodePath);
          hideMarkup = false;
        } else {
          console.log('hiding markup at:');
          console.log(nodePath);
        }
      }
      Transforms.setNodes(
        editor,
        { [`${remarkNode.type}`]: true, depth, hideMarkup },
        { at: nodePath, match: (n) => Editor.isBlock(editor, n) }
      );
      Transforms.setNodes(
        editor,
        { firstOfBlock: true },
        { at: firstOfBlockPath, match: (n) => Editor.isBlock(editor, n) }
      );
      Transforms.setNodes(
        editor,
        { lastOfBlock: true },
        { at: lastOfBlockPath, match: (n) => Editor.isBlock(editor, n) }
      );
      console.log(editor.children);
    }
    if (remarkNode.children) {
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
        {
          blockquote: false,
          code: false,
          hideMarkup: true,
          firstOfBlock: false,
          lastOfBlock: false,
        },
        { at: [], match: (n) => Editor.isBlock(editor, n) }
      );
      if (remark.children) decorateTree(editor, remark.children);
    });
  });
};
