import { Root } from 'rehype-parse/lib';
import { visit, EXIT } from 'unist-util-visit';

const rehypeFirstParagraph = () => {
  return (tree: Root) => {
    return visit(tree, { tagName: 'p' }, (node) => {
      if (node.properties) {
        node.properties.className = 'firstPara';
      }
      return EXIT;
    });
  };
};

export default rehypeFirstParagraph;
