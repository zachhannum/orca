import { Editor, Path } from 'slate';
import type { BasicElement, BasicText } from '../types';

export const deserializePlainText = (str: string): BasicElement[] => {
  return str.split(/\r\n|\r|\n/).map((text) => {
    return {
      type: 'paragraph',
      depth: 0,
      hideMarkup: true,
      children: [
        {
          text,
        },
      ],
    };
  });
};

export const serializePlainText = (editor: Editor, path: Path = []): string => {
  let text = '';
  const leafNodes = Editor.nodes(editor, {
    mode: 'lowest',
    at: path,
  });
  let leafNode = leafNodes.next();
  let leaf = leafNode.value[0] as BasicText;
  text += leaf.text;
  while (1) {
    leafNode = leafNodes.next();
    if (leafNode.done) {
      break;
    } else {
      leaf = leafNode.value[0] as BasicText;
      text += '\n' + leaf.text;
    }
  }
  return text;
};
