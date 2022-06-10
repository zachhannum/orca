import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypeSection } from './unified';

export const parseChapterContentToHtml = (markdownContent: string) : string => {
  return unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSection)
  .use(rehypeStringify)
  .processSync(markdownContent).value.toString();
}

export const parseBookContentToHtml = () : string => {
  return "";
}
