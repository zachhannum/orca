import { StyledProps } from '@udecode/plate';
import { RenderLeafProps } from 'slate-react';
import styled from 'styled-components';
import { HeadingStyle, HeadingMarkupStyle } from './headingStyles';
import { emphasis, emphasisMarkup, strong, strongMarkup } from './markStyles';

export interface StyledLeafProps extends StyledProps {
  hideMarkup?: boolean;
  heading?: boolean;
  depth?: number;
  headingMarkup?: boolean;
  emphasis?: boolean;
  emphasisMarkup?: boolean;
  strong?: boolean;
  strongMarkup?: boolean;
}

const StyledLeaf = styled.span<StyledLeafProps>`
  ${(p) => p.heading && HeadingStyle}
  ${(p) => p.headingMarkup && HeadingMarkupStyle}
  ${(p) => p.emphasis && emphasis}
  ${(p) => p.emphasisMarkup && emphasisMarkup}
  ${(p) => p.strong && strong}
  ${(p) => p.strongMarkup && strongMarkup}
`;

export const PreviewLeaf = (props: RenderLeafProps) => {
  const { children, attributes, leaf } = props;

  return (
    <StyledLeaf {...attributes} {...leaf}>
      {children}
    </StyledLeaf>
  );
};
