import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypeSection } from './unified';
import useStore from '../store/useStore';
import { SectionType, Sections } from 'types/types';

export const parseChapterContentToHtml = (markdownContent: string): string => {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSection)
    .use(rehypeStringify)
    .processSync(markdownContent)
    .value.toString();
};
const walkContentTree = (content: Sections, htmlStr = '') : string => {
  content.forEach((section) => {
    if (section.type != SectionType.folder) {
      htmlStr += parseChapterContentToHtml(section.content);
    }
    else if (section.canHaveChildren && section.children.length > 0) {
      htmlStr = walkContentTree(section.children, htmlStr);
    }
  });
  return htmlStr;
};

export const parseBookContentToHtml = (): string => {
  let bookHtml = '';

  const { content } = useStore.getState();
  bookHtml = walkContentTree(content);
  console.log(bookHtml);
  return bookHtml;
};
