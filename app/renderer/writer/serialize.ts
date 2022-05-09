import { createPluginFactory } from '@udecode/plate-core';
import { Node } from 'slate';
import type { Descendant } from 'slate';

type BasicElement = { type: string; children: BasicText[] };
type BasicText = { text: string; bold?: true };

export const deserializePlainText = (str: string): BasicElement[] => {
  let nodes = str.split(/\r\n|\r|\n/).map((s: string) => {
    return {
      type: 'paragraph',
      children: [
        {
          text: s.replace('"', '"'),
        },
      ],
    };
  });
  return nodes;
};

export const deserializePlainTextStripExtraNewlines = (
  str: string
): BasicElement[] => {
  var startTime = performance.now();
  let nodes = str
    .split(/\r\n|\r|\n/)
    .filter((line) => line.trim() !== '')
    .map((s: string) => {
      return {
        type: 'paragraph',
        children: [
          {
            text: s.replace('"', '"'),
          },
        ],
      };
    });

  var endTime = performance.now();

  console.log(`deserialize ${endTime - startTime} milliseconds`);

  return nodes;
};

export const serializePlainText = (nodes: Descendant[]): string => {
  const text = nodes.map((n) => Node.string(n)).join('\n');
  return text;
};

export const KEY_DESERIALIZE_MD = 'deserializeMd';

export const createDeserializePlainTextPlugin = createPluginFactory({
  key: KEY_DESERIALIZE_MD,
  then: (_editor) => ({
    editor: {
      insertData: {
        format: 'text/plain',
        getFragment: ({ data }) => deserializePlainTextStripExtraNewlines(data),
      },
    },
  }),
});
