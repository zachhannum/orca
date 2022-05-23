import { createPluginFactory } from '@udecode/plate-core';
import { Editor, Node, Path } from 'slate';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { RemarkNode } from './remark';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type ChildNode = BasicElement | BasicText;

export interface BasicElement {
  type: string;
  blockquote?: boolean;
  hideMarkup: boolean;
  depth: number;
  children: ChildNode[];
}
export interface BasicText {
  text: string;
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: BasicElement;
    Text: BasicText;
  }
}

const pushText = (nodes: BasicElement[], text: string, depth = 0) => {
  console.log({ text: text });
  console.log(nodes);
  const lastNodeIndex = nodes.length - 1;
  if (nodes.length && nodes[lastNodeIndex].type === 'paragraph') {
    if (nodes[lastNodeIndex].children.length) {
      const lastText = (
        nodes[lastNodeIndex].children[
          nodes[lastNodeIndex].children.length - 1
        ] as BasicText
      ).text;
      nodes[lastNodeIndex].children[nodes[lastNodeIndex].children.length - 1] =
        {
          text: lastText.concat(text),
        };
    } else {
      nodes[lastNodeIndex].children.push({
        text,
      });
    }
  } else {
    nodes.push({
      type: 'paragraph',
      depth,
      hideMarkup: true,
      children: [
        {
          text,
        },
      ],
    });
  }
};

const parseBlockquote = (
  str: string,
  remarkChildren: RemarkNode[],
  startOffset: number,
  endOffset: number,
  depth = 1
): { nodes: BasicElement[]; offset: number } => {
  let blockNodeChildren = [] as BasicElement[];
  if (remarkChildren.length === 0) {
    pushText(blockNodeChildren, str.slice(startOffset, endOffset), depth);
  }
  remarkChildren.forEach((remarkNode) => {
    if (remarkNode.children && remarkNode.type === 'blockquote') {
      depth += 1;
      const { nodes } = parseBlockquote(
        str,
        remarkNode.children,
        startOffset,
        remarkNode.position.end.offset,
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
      pushText(
        blockNodeChildren,
        str.slice(startOffset, remarkNode.position.end.offset),
        depth
      );
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
    if (remarkNode.position.start.offset > startOffset) {
      pushText(nodes, str.slice(startOffset, remarkNode.position.start.offset));
      startOffset = remarkNode.position.start.offset;
    }
    if (remarkNode.type === 'blockquote' && remarkNode.children) {
      /* Trim leading content and push separately if contains a newline*/
      // const blockQuoteStart = str.indexOf('>', startOffset);
      // if (blockQuoteStart > 0) {
      //   const leadingContent = str.slice(startOffset, blockQuoteStart);
      //   if (leadingContent.indexOf('\n')) {
      //     pushText(nodes, str.slice(startOffset, blockQuoteStart - 1));
      //   }
      //   startOffset = blockQuoteStart;
      // }
      const { nodes: blockNodes, offset: blockOffset } = parseBlockquote(
        str,
        remarkNode.children,
        startOffset,
        remarkNode.position.end.offset
      );
      nodes.push({
        type: 'blockquote',
        depth: 1,
        hideMarkup: true,
        children: blockNodes,
      });
      startOffset = blockOffset + 1;
    } else {
      pushText(
        nodes,
        str.slice(
          remarkNode.position.start.offset,
          remarkNode.position.end.offset
        )
      );
      startOffset = remarkNode.position.end.offset;
    }
  });
  return nodes;
};

export const deserializePlainText = (str: string): BasicElement[] => {
  return str.split(/\r\n|\r|\n/).map((text) => {
    return {
      type: 'paragraph',
      depth: 0,
      hideMarkup: true,
      children: [{
        text
      }],
    };
  });
  // const remark = unified().use(remarkParse).parse(str) as RemarkNode;
  // if (remark.children?.length) {
  //   let nodes = [] as BasicElement[];
  //   console.log(str);
  //   console.log(remark);
  //   if (remark.children[0].position.start.offset > 0) {
  //     pushText(nodes, str.slice(0, remark.children[0].position.start.offset));
  //   }
  //   nodes = nodes.concat(parseRemark(str, remark.children, []));
  //   if (
  //     remark.children[remark.children.length - 1].position.end.offset + 1 <
  //     str.length
  //   ) {
  //     pushText(
  //       nodes,
  //       str.slice(
  //         remark.children[remark.children.length - 1].position.end.offset + 1
  //       )
  //     );
  //   }
  //   console.log(nodes);
  //   return nodes;
  // } else
  //   return [
  //     {
  //       type: 'paragraph',
  //       depth: 0,
  //       hideMarkup: true,
  //       children: [
  //         {
  //           text: '',
  //         },
  //       ],
  //     },
  //   ];
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

  return [];
};

export const serializePlainText = (editor: Editor, path: Path = []): string => {
  let text = '';
  const leafNodes = Editor.nodes(editor, {
    mode: 'lowest',
    at: path,
  });
  let leafNode = leafNodes.next();
  while (!leafNode.done) {
    const leaf = leafNode.value[0] as BasicText;
    text += leaf.text + '\n';
    leafNode = leafNodes.next();
  }
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
