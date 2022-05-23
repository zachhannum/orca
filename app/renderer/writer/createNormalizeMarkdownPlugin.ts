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
      if (Editor.isEditor(currentNode)) {
        const nodeStr = serializePlainText(editor, currentPath);
        const nodes = deserializePlainText(nodeStr);
        console.log("Normalize markdown, comparing:");
        console.log(currentNode.children);
        console.log("To:");
        console.log(nodes);
        if (!compareTypes(currentNode.children as BasicElement[], nodes)) {
          console.log('New Markdown detected, transforming node');
          for(let i = 0; i < editor.children.length; i++) {
            Transforms.removeNodes(editor, { at: [i] });
          }
          Transforms.insertNodes(editor, nodes, { at: [0]});
          Transforms.deselect(editor);
          Transforms.select(editor, currentPath);
          return;
        }
      }
      return normalizeNode([currentNode, currentPath]);
    };

    return editor;
  },
});
