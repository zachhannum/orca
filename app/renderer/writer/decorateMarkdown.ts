import { isText, PlateEditor } from '@udecode/plate-core';
import { Range, BaseSelection } from 'slate';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type {RemarkNode} from './remark';

type SyntaxLocation = 'before' | 'after' | 'both';
const getMarkupTypeSyntaxLocation = (type: string): SyntaxLocation => {
  switch (type) {
    case 'heading':
      return 'before';
    case 'emphasis':
      return 'both';
    case 'strong':
      return 'both';
    case 'blockquote':
      return 'before';
  }
  return 'both';
};

const getChildrenOffsets = (remarkNode: RemarkNode) => {
  if (remarkNode.children && remarkNode.children.length > 0) {
    const remarkChildren = remarkNode.children;
    return {
      childStartOffset: remarkChildren[0].position.start.offset,
      childEndOffset:
        remarkChildren[remarkChildren.length - 1].position.end.offset,
    };
  } else {
    return {
      childStartOffset: remarkNode.position.start.offset,
      childEndOffset: remarkNode.position.end.offset,
    };
  }
};

const decorateTree = (
  remarkNodes: RemarkNode[],
  ranges: any[],
  path: any,
  editorSelection: BaseSelection | null
): { childStartOffset: number; childEndOffset: number } => {
  remarkNodes.forEach((remarkNode) => {
    let hideMarkup = true;
    if (remarkNode.type !== 'text') {
      console.log(remarkNode.type);
      if (remarkNode.children) {
        const { childStartOffset, childEndOffset } =
          getChildrenOffsets(remarkNode);
        const nodeStartOffset = remarkNode.position.start.offset;
        const nodeEndOffset = remarkNode.position.end.offset;
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
        /* Push node type */
        ranges.push({
          [remarkNode.type]: true,
          hideMarkup: hideMarkup,
          depth: remarkNode.depth,
          anchor: { path, offset: remarkNode.position.start.offset },
          focus: { path, offset: remarkNode.position.end.offset },
        });
        /* Push decorations for markup */
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
        decorateTree(remarkNode.children, ranges, path, editorSelection);
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
    // return [];
    const ranges: any[] = [];

    if (!isText(node)) {
      return ranges;
    }

    const remark = unified().use(remarkParse).parse(node.text) as RemarkNode;
    if (remark.children)
      decorateTree(remark.children, ranges, path, editor.selection);
    return ranges;
  };
