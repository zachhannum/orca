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
  border-left: 2px solid ${(p) => p.theme.buttonPrimaryBg};
  padding-left: 10px;
  margin-left: 10px;
  ${(p) =>
    p.hideMarkup &&
    css`
      border-color: ${p.theme.mainFgTextSecondary};
    `}
`;

const StyledElement = styled.div<PreviewRenderElementProps>`
  display: flex;
  flex-direction: row;
`;

export const PreviewElement = (props: PreviewRenderElementProps) => {
  const { children, element } = props;

  const blockQuotes = Array.from({ length: element.depth }).map(
    (item, index) => (
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
