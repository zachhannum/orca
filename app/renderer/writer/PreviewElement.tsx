import { RenderElementProps } from 'slate-react';
import styled, { css } from 'styled-components';
import { BasicElement } from '../writer/serialize';

export interface PreviewRenderElementProps extends RenderElementProps {
  element: BasicElement;
}

const StyledElement = styled.div<PreviewRenderElementProps>`
  ${(p) =>
    p.element.type === 'blockquote' &&
    css`
      border-left: 2px solid ${(p) => p.theme.buttonPrimaryBg};
      padding-left: 10px;
      margin-left: 10px;
      ${p.element.hideMarkup &&
      css`
        border-color: ${p.theme.mainFgTextSecondary};
      `}
    `}
`;

export const PreviewElement = (props: PreviewRenderElementProps) => {
  const { children } = props;

  return <StyledElement {...props}>{children}</StyledElement>;
};
