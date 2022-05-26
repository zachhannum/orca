import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type RemarkNode = {
  type: string;
  position: {
    end: { column: number; line: number; offset: number };
    start: { column: number; line: number; offset: number };
  };
  children?: RemarkNode[];
  value?: string;
  depth?: number;
  url?: string;
};

export type ChildNode = BasicElement | BasicText;

export interface BasicElement {
  type: string;
  blockquote?: boolean;
  code?: boolean;
  firstOfBlock?: boolean;
  lastOfBlock?: boolean;
  hideMarkup: boolean;
  depth: number;
  children: ChildNode[];
}
export interface BasicText {
  text: string;
  hideMarkup?: boolean;
  heading?: boolean;
  depth?: number;
  markupBefore?: boolean;
  markupAfter?: boolean;
  headingMarkup?: boolean;
  emphasis?: boolean;
  emphasisMarkup?: boolean;
  strong?: boolean;
  strongMarkup?: boolean;
  blockquote?: boolean;
  blockquoteMarkup?: boolean;
  link?: boolean;
  linkMarkup?: boolean;
  inlineCode?: boolean;
  inlineCodeMarkup?: boolean;
  thematicBreak?: boolean;
  image?: boolean;
  imageUrl?: string;
  code?: boolean;
  codeMarkup?: boolean;
  listItem?: boolean;
  listItemMarkup?: boolean;
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: BasicElement;
    Text: BasicText;
  }
}
