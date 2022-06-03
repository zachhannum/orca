import { Root } from 'rehype-parse/lib';
import { h } from 'hastscript';

const rehypeSection = () => {
  return (tree: Root) => {
    tree.children = [h('section',{class: 'chapter'}, tree.children )];
  };
};

export default rehypeSection;
