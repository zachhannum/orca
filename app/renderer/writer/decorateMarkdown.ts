/* eslint-disable simple-import-sort/imports */
import { isText } from '@udecode/plate-core'; // noinspection CommaExpressionJS
import { unified } from 'unified';
import remarkParse from 'remark-parse';

type RemarkNode = {
  type: string;
  position: {
    end: { column: number; line: number; offset: number };
    start: { column: number; line: number; offset: number };
  };
  children?: RemarkNode[];
  value?: string;
  depth?: number;
};

const decorateTree = (remarkNodes: RemarkNode[], ranges: any[], path: any) => {
  remarkNodes.forEach((remarkNode) => {
    if (remarkNode.type !== 'text') {
      let type = '';
      if (remarkNode.depth) {
        type = `${remarkNode.type}${remarkNode.depth}`;
      } else {
        type = remarkNode.type;
      }
      ranges.push({
        [type]: true,
        anchor: { path, offset: remarkNode.position.start.offset },
        focus: { path, offset: remarkNode.position.end.offset },
      });
    }
    if (remarkNode.children) decorateTree(remarkNode.children, ranges, path);
  });
};

/**
 * Decorate texts with markdown preview.
 */
export const decorateMarkdown =
  () =>
  ([node, path]) => {
    const ranges: any[] = [];

    if (!isText(node)) {
      return ranges;
    }

    const remark = unified().use(remarkParse).parse(node.text) as RemarkNode;
    if (remark.children) decorateTree(remark.children, ranges, path);
    return ranges;
  };
