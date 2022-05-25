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

  ${(p) =>
    p.element.code &&
    css`
      background-color: ${Color(p.theme.mainBg).darken(0.2)};
      font-family: 'Roboto Mono', monospace;
      padding-left: 5px;
      padding-right: 5px;
    `}

    ${(p) =>
    p.element.code &&
    p.element.firstOfBlock &&
    css`
      padding-top: 5px;
      border-radius: 5px 5px 0px 0px;
    `}
      ${(p) =>
    p.element.code &&
    p.element.lastOfBlock &&
    css`
      padding-bottom: 5px;
      border-radius: 0px 0px 5px 5px;
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
