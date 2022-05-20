import { RenderElementProps } from 'slate-react';
import styled, {css} from 'styled-components';
import { BasicElement } from '../writer/serialize';

export interface PreviewRenderElementProps extends RenderElementProps {
  element: BasicElement;
}

const StyledElement = styled.div<PreviewRenderElementProps>`
${(p) => p.element.type === 'blockquote' && p.element.hideMarkup && css`
  border-left: 2px solid white;
  padding-left: 10px;
`}
`;



export const PreviewElement = (props: PreviewRenderElementProps) => {
  const { children } = props;

  return (
    <StyledElement {...props}>
      {children}
    </StyledElement>
  );
};
