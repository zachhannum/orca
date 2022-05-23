import { createPluginFactory, PlateEditor } from '@udecode/plate-core';
import { Editor, Range, BaseSelection, Transforms } from 'slate';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { RemarkNode } from './remark';
import { serializePlainText } from './serialize';

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

export const createSetBlockTypesPlugin = createPluginFactory({
  key: 'setBlockTypesPlugin',
  handlers: {
    onChange:
      <T = {}>(editor: PlateEditor<T>) =>
      () => {
        console.log(editor.children);
        const remark = unified()
          .use(remarkParse)
          .parse(serializePlainText(editor)) as RemarkNode;
        console.log(remark);
        Editor.withoutNormalizing(editor, () => {
          if (remark.children) decorateTree(editor, remark.children);
        });
      },
  },
});
