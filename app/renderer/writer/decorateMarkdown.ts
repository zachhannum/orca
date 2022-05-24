import { PlateEditor } from '@udecode/plate-core';
import { Editor, Range, BaseSelection } from 'slate';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { RemarkNode } from './remark';
import { serializePlainText } from './serialize';

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
      childStartOffset: remarkChildren[0].position.start.column - 1,
      childEndOffset:
        remarkChildren[remarkChildren.length - 1].position.end.column - 1,
    };
  } else {
    return {
      childStartOffset: remarkNode.position.start.column - 1,
      childEndOffset: remarkNode.position.end.column - 1,
    };
  }
};

const decorateTree = <T = {}>(
  editor: PlateEditor<T>,
  remarkNodes: RemarkNode[],
  ranges: any[],
  editorSelection: BaseSelection | null,
  depth = 1
) => {
  remarkNodes.forEach((remarkNode) => {
    let hideMarkup = true;
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
    if (remarkNode.type !== 'text') {
      if (remarkNode.children) {
        const { childStartOffset, childEndOffset } =
          getChildrenOffsets(remarkNode);

        /* Check if node path intersects with editor selection and remove markup hide */

        if (editorSelection) {
          if (Range.includes(nodePath, editorSelection)) {
            hideMarkup = false;
          }
        }
        /* Push node type */
        ranges.push({
          [remarkNode.type]: true,
          hideMarkup: hideMarkup,
          depth: remarkNode.depth,
          anchor: { path: pathStart, offset: nodeStartOffset },
          focus: { path: pathEnd, offset: nodeEndOffset },
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
            anchor: { path: pathStart, offset: nodeStartOffset },
            focus: { path: pathStart, offset: childStartOffset },
          });
        }
        if (
          nodeEndOffset > childEndOffset &&
          (syntaxLocation === 'after' || syntaxLocation === 'both')
        ) {
          ranges.push({
            [`${remarkNode.type}Markup`]: true,
            hideMarkup: hideMarkup,
            anchor: { path: pathEnd, offset: childEndOffset },
            focus: { path: pathEnd, offset: nodeEndOffset },
          });
        }
        decorateTree(
          editor,
          remarkNode.children,
          ranges,
          editorSelection,
          depth + 1
        );
      }
    }
  });
};

/**
 * Decorate texts with markdown preview.
 */
export const decorateMarkdown =
  <T = {}>(editor: PlateEditor<T>) =>
  ([node, _path]) => {
    // return [];
    const ranges: any[] = [];

    if (!Editor.isEditor(node)) {
      return ranges;
    }

    const remark = unified()
      .use(remarkParse)
      .parse(serializePlainText(editor)) as RemarkNode;
    console.log(remark);
    if (remark.children)
      decorateTree(editor, remark.children, ranges, editor.selection);
    return ranges;
  };
