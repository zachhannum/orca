import { css } from 'styled-components';
import { StyledLeafProps } from './PreviewLeaf';

export const Heading = css<StyledLeafProps>`
  font-size: 2em;
  ${(p) =>
    p.depth &&
    css`
      font-size: ${1.2 + .8 / p.depth}em;
    `}
  font-weight: 700;
`;

export const HeadingMarkup = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      font-family: 'Consolas';
      visibility: hidden;
      ${p.depth &&
      css`
        margin-left: ${-1 - p.depth}ch;
      `}
      &::after {
        visibility: visible;
        ${p.depth &&
        css`
          content: 'h${p.depth} ';
        `}
      }
      font-size: 1em;
      font-weight: 500;
    `}
  color: ${(p) => p.theme.buttonPrimaryBg};
`;
