import { createPluginFactory, PlateEditor } from '@udecode/plate-core';
import { Transforms, Editor, Path } from 'slate';
import {
  BasicElement,
  BasicText,
  serializePlainText,
  deserializePlainText,
} from './serialize';

const isText = (node: BasicElement | BasicText) => {
  return (node as BasicText).text !== undefined;
};

const compareTypes = (
  currentNode: BasicElement[] | BasicText[],
  newNode: BasicElement[] | BasicText[]
): boolean => {
  if (currentNode.length !== newNode.length) return false;
  for (let i = 0; i < currentNode.length; i++) {
    if (isText(currentNode[i]) && isText(newNode[i])) return true;
    if (
      (currentNode[i] as BasicElement).type ===
      (newNode[i] as BasicElement).type
    ) {
      if (
        (currentNode[i] as BasicElement).children &&
        (newNode[i] as BasicElement).children
      ) {
        return compareTypes(
          (currentNode[i] as BasicElement).children,
          (newNode[i] as BasicElement).children
        );
      }
    } else {
      return false;
    }
  }
  return true;
};

export const createNormalizeMarkdownPlugin = createPluginFactory({
  key: 'normalizeMarkdownPlugin',
  withOverrides: <T = {}>(editor: PlateEditor<T>) => {
    const { normalizeNode } = editor;

    editor.normalizeNode = ([currentNode, currentPath]) => {
      if (Editor.isBlock(editor, currentNode) && currentPath.length === 1) {
        const nodeStr = serializePlainText(editor, currentPath);
        const nodes = deserializePlainText(nodeStr);
        if (!compareTypes([currentNode], nodes)) {
          console.log('New Markdown detected, transforming node:');
          console.log(currentNode);
          console.log('To:');
          console.log(nodes);
          Transforms.removeNodes(editor, { at: currentPath });
          Transforms.insertNodes(editor, nodes, { at: currentPath, select: true });
          return;
        }
      }
      return normalizeNode([currentNode, currentPath]);
    };

    return editor;
  },
});
