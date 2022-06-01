import { Extension } from '@codemirror/state';
import {markdown as markdownExtension, markdownLanguage} from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { styleTags, Tag } from '@lezer/highlight';
import { MarkdownConfig } from '@lezer/markdown';

export const customTags = {
  inlineCode: Tag.define(),
  codeMark: Tag.define(),
};

const MarkStylingExtension: MarkdownConfig = {
  props: [
    styleTags({
      InlineCode: customTags.inlineCode,
      CodeMark: customTags.codeMark,
    }),
  ],
};

const markdown = (): Extension => {
  return markdownExtension({
    base: markdownLanguage,
    codeLanguages: languages,
    extensions: [MarkStylingExtension],
  });
};

export default markdown;
