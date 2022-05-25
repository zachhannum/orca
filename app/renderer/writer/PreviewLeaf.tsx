import { StyledProps } from '@udecode/plate';
import { RenderLeafProps } from 'slate-react';
import styled from 'styled-components';
import { Heading, HeadingMarkup } from './headingStyles';
import {
  Emphasis,
  EmphasisMarkup,
  Strong,
  StrongMarkup,
  InlineCode,
  InlineCodeMarkup,
} from './markStyles';
import { BlockQuote, BlockQuoteMarkup, HorizontalRuleMarkup } from './blockStyles';
import { Link, LinkMarkup } from './linkStyles';

export interface StyledLeafProps extends StyledProps {
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
}

const StyledLeaf = styled.span<StyledLeafProps>`
  ${(p) => p.heading && Heading}
  ${(p) => p.headingMarkup && HeadingMarkup}
  ${(p) => p.emphasis && Emphasis}
  ${(p) => p.emphasisMarkup && EmphasisMarkup}
  ${(p) => p.strong && Strong}
  ${(p) => p.strongMarkup && StrongMarkup}
  ${(p) => p.blockquote && BlockQuote}
  ${(p) => p.blockquoteMarkup && BlockQuoteMarkup}
  ${(p) => p.link && Link}
  ${(p) => p.linkMarkup && LinkMarkup}
  ${(p) => p.inlineCode && InlineCode}
  ${(p) => p.inlineCodeMarkup && InlineCodeMarkup}
  ${(p) => p.thematicBreak && HorizontalRuleMarkup}
`;

export const PreviewLeaf = (props: RenderLeafProps) => {
  const { children, attributes, leaf } = props;

  return (
    <StyledLeaf {...attributes} {...leaf}>
      {children}
    </StyledLeaf>
  );
};
