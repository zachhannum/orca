import { StyledProps } from '@udecode/plate';
import { RenderLeafProps } from 'slate-react';
import styled from 'styled-components';
import { Heading, HeadingMarkup } from './headingStyles';
import { Emphasis, EmphasisMarkup, Strong, StrongMarkup } from './markStyles';
import { BlockQuote, BlockQuoteMarkupStyle } from './blockStyles';

export interface StyledLeafProps extends StyledProps {
  hideMarkup?: boolean;
  heading?: boolean;
  depth?: number;
  headingMarkup?: boolean;
  emphasis?: boolean;
  emphasisMarkup?: boolean;
  strong?: boolean;
  strongMarkup?: boolean;
  blockquote?: boolean;
  blockquoteMarkup?: boolean;
}

const StyledLeaf = styled.span<StyledLeafProps>`
  ${(p) => p.heading && Heading}
  ${(p) => p.headingMarkup && HeadingMarkup}
  ${(p) => p.emphasis && Emphasis}
  ${(p) => p.emphasisMarkup && EmphasisMarkup}
  ${(p) => p.strong && Strong}
  ${(p) => p.strongMarkup && StrongMarkup}
  ${(p) => p.blockquote && BlockQuote}
  ${(p) => p.blockquoteMarkup && BlockQuoteMarkupStyle}
`;

export const PreviewLeaf = (props: RenderLeafProps) => {
  const { children, attributes, leaf } = props;

  return (
    <StyledLeaf {...attributes} {...leaf}>
      {children}
    </StyledLeaf>
  );
};
