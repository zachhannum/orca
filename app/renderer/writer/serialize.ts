import { createPluginFactory } from '@udecode/plate-core';
import { Node } from 'slate';
import type { Descendant } from 'slate';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { RemarkNode } from './remark';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export interface BasicElement {
  type: string;
  hideMarkup: boolean;
  depth: number;
  children: BasicElement[] | BasicText[];
};
export interface BasicText { text: string; bold?: true };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: BasicElement
    Text: BasicText
  }
}

const parseBlockquote = (
  str: string,
  remarkChildren: RemarkNode[],
  startOffset = 0,
  depth = 1
): { nodes: BasicElement[]; offset: number } => {
  let blockNodeChildren = [] as BasicElement[];
  remarkChildren.forEach((remarkNode) => {
    if (remarkNode.children && remarkNode.type === 'blockquote') {
      depth += 1;
      const { nodes, offset } = parseBlockquote(
        str,
        remarkNode.children,
        startOffset,
        depth
      );
      blockNodeChildren.push({
        type: 'blockquote',
        depth,
        hideMarkup: true,
        children: nodes,
      });
      depth -= 1;
    } else {
      blockNodeChildren.push({
        type: remarkNode.type,
        depth,
        hideMarkup: true,
        children: [
          {
            text: str.slice(startOffset, remarkNode.position.end.offset),
          },
        ],
      });
    }
    startOffset = remarkNode.position.end.offset + 1;
  });
  return { nodes: blockNodeChildren, offset: startOffset };
};

const parseRemark = (
  str: string,
  remarkChildren: RemarkNode[],
  nodes: BasicElement[],
  startOffset = 0
): BasicElement[] => {
  remarkChildren.forEach((remarkNode) => {
    if (remarkNode.type === 'blockquote' && remarkNode.children) {
      /* Trim leading content and push separately */
      const blockQuoteStart = str.indexOf('>', startOffset);
      nodes.push({
        type: 'paragraph',
        depth: 0,
        hideMarkup: true,
        children: [
          {
            text: str.slice(startOffset, blockQuoteStart - 1),
          },
        ],
      });
      startOffset = blockQuoteStart;
      const { nodes: blockNodes, offset: blockOffset } = parseBlockquote(
        str,
        remarkNode.children,
        startOffset
      );
      nodes.push({
        type: 'blockquote',
        depth: 1,
        hideMarkup: true,
        children: blockNodes
      })
      startOffset = blockOffset + 1;
    } else {
      if (remarkNode.position.start.offset > startOffset) {
        nodes.push({
          type: 'paragraph',
          depth: 0,
          hideMarkup: true,
          children: [
            {
              text: str.slice(
                startOffset + 1,
                remarkNode.position.start.offset
              ),
            },
          ],
        });
      }
      nodes.push({
        type: 'paragraph',
        depth: 0,
        hideMarkup: true,
        children: [
          {
            text: str.slice(
              remarkNode.position.start.offset,
              remarkNode.position.end.offset
            ),
          },
        ],
      });
      startOffset = remarkNode.position.end.offset + 1;
    }
  });
  return nodes;
};

export const deserializePlainText = (str: string): BasicElement[] => {
  const remark = unified().use(remarkParse).parse(str) as RemarkNode;
  if (remark.children) {
    console.log(str);
    console.log(remark);
    const nodes = parseRemark(str, remark.children, []);
    console.log(nodes);
    return nodes;
  } else return [];
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
