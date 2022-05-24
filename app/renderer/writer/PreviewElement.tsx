import { RenderElementProps } from 'slate-react';
import styled, { css } from 'styled-components';
import { BasicElement } from '../writer/serialize';

export interface PreviewRenderElementProps extends RenderElementProps {
  element: BasicElement;
}

type StyledBlockquoteProps = {
  hideMarkup: boolean;
};
const StyledBlockquote = styled.div<StyledBlockquoteProps>`
  border-left: 3px solid ${(p) => p.theme.buttonPrimaryBg};
  padding-left: 20px;
`;

const StyledElement = styled.div<PreviewRenderElementProps>`
  ${(p) =>
    p.element.blockquote &&
    css`
      display: flex;
      flex-direction: row;
    `}
`;

export const PreviewElement = (props: PreviewRenderElementProps) => {
  const { children, element } = props;

  const blockQuotes = Array.from({ length: element.depth }).map(
    (_item, index) => (
      <StyledBlockquote
        key={index}
        hideMarkup={element.hideMarkup}
        contentEditable={false}
      />
    )
  );
  return (
    <>
      <StyledElement {...props}>
        <>
          {element.blockquote && blockQuotes}
          {children}
        </>
      </StyledElement>
    </>
  );
};
