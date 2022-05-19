import { isText, PlateEditor } from '@udecode/plate-core';
import { Range, BaseSelection } from 'slate';
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

type SyntaxLocation = 'before' | 'after' | 'both';
const getMarkupTypeSyntaxLocation = (type: string): SyntaxLocation => {
  switch (type) {
    case 'heading':
      return 'before';
    case 'emphasis':
      return 'both';
    case 'strong':
      return 'both';
  }
  return 'both';
};

const decorateTree = (
  remarkNodes: RemarkNode[],
  ranges: any[],
  path: any,
  editorSelection: BaseSelection | null
): { childStartOffset: number; childEndOffset: number } => {
  remarkNodes.forEach((remarkNode) => {
    if (remarkNode.type !== 'text') {
      console.log(remarkNode.type);
      ranges.push({
        [remarkNode.type]: true,
        depth: remarkNode.depth,
        anchor: { path, offset: remarkNode.position.start.offset },
        focus: { path, offset: remarkNode.position.end.offset },
      });
    }
    if (remarkNode.children) {
      const { childStartOffset, childEndOffset } = decorateTree(
        remarkNode.children,
        ranges,
        path,
        editorSelection
      );
      const nodeStartOffset = remarkNode.position.start.offset;
      const nodeEndOffset = remarkNode.position.end.offset;
      let hideMarkup = true;
      /* Check if node path intersects with editor selection and remove markup hide */
      if (editorSelection) {
        const nodePath = {
          anchor: {
            path,
            offset: remarkNode.position.start.offset,
          },
          focus: {
            path,
            offset: remarkNode.position.end.offset,
          },
        } as Range;
        if (Range.includes(nodePath, editorSelection)) {
          hideMarkup = false;
        }
      }
      /* Push decorations for hiding markup */
      const syntaxLocation = getMarkupTypeSyntaxLocation(remarkNode.type);
      if (
        childStartOffset > nodeStartOffset &&
        (syntaxLocation === 'before' || syntaxLocation === 'both')
      ) {
        ranges.push({
          [`${remarkNode.type}Markup`]: true,
          hideMarkup: hideMarkup,
          anchor: { path, offset: nodeStartOffset },
          focus: { path, offset: childStartOffset },
        });
      }
      if (
        nodeEndOffset > childEndOffset &&
        (syntaxLocation === 'after' || syntaxLocation === 'both')
      ) {
        ranges.push({
          [`${remarkNode.type}Markup`]: true,
          hideMarkup: hideMarkup,
          anchor: { path, offset: childEndOffset },
          focus: { path, offset: nodeEndOffset },
        });
      }
    }
  });
  const totalStartOffset = remarkNodes.length
    ? remarkNodes[0].position.start.offset
    : 0;
  const totalEndOffset = remarkNodes.length
    ? remarkNodes[remarkNodes.length - 1].position.end.offset
    : 0;
  return { childStartOffset: totalStartOffset, childEndOffset: totalEndOffset };
};

/**
 * Decorate texts with markdown preview.
 */
export const decorateMarkdown =
  <T = {}>(editor: PlateEditor<T>) =>
  ([node, path]) => {
    console.log('Decorating nodes:');
    console.log(node);
    const ranges: any[] = [];

    if (!isText(node)) {
      return ranges;
    }

    const remark = unified().use(remarkParse).parse(node.text) as RemarkNode;
    console.log('Parsed remark AST:');
    console.log(remark);
    if (remark.children)
      decorateTree(remark.children, ranges, path, editor.selection);
    return ranges;
  };
