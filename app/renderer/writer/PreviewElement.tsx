import { RenderElementProps } from 'slate-react';
import styled, { css } from 'styled-components';
import Color from 'color';
import { BasicElement } from '../writer/serialize';

export interface PreviewRenderElementProps extends RenderElementProps {
  element: BasicElement;
}

type StyledBlockquoteProps = {
  hideMarkup: boolean;
};
const StyledBlockquote = styled.div<StyledBlockquoteProps>`
  border-left: 3px solid ${(p) => p.theme.mainFgTextSecondary};
  padding-left: 20px;
  ${(p) =>
    !p.hideMarkup &&
    css`
      border-color: ${p.theme.buttonPrimaryBg};
    `}
`;

const StyledElement = styled.div<PreviewRenderElementProps>`
  display: flex;
  flex-direction: row;
  ${(p) => p.element.blockquote && css`
    background-color: ${Color(p.theme.mainBg).darken(.2)};
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
