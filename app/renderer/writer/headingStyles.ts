import { css } from 'styled-components';
import { StyledLeafProps } from './PreviewLeaf';

export const Heading = css<StyledLeafProps>`
  font-size: 2em;
  ${(p) =>
    p.depth &&
    css`
      font-size: ${1.2 + 0.8 / p.depth}em;
    `}
  font-weight: 700;
`;

export const HeadingMarkup = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      font-family: 'Roboto Mono', monospace;
      font-weight: 500;
      visibility: hidden;
      ${p.depth &&
      p.blockquote &&
      css`
        margin-left: ${-1 - p.depth}ch;
      `}

      ${p.depth &&
      !p.blockquote &&
      css`
        margin-left: ${-4 - p.depth - 0.4}ch;
      `}

      &::after {
        display: inline-block;
        transform: translate(0px, -.4ch);
        border-radius: 5px;
        border: 1.5px ${p.theme.buttonPrimaryBg} solid;
        visibility: visible;
        margin-right: 1ch;
        padding-left: 0.2ch;
        padding-right: 0.2ch;
        ${p.depth &&
        css`
          content: 'h${p.depth}';
        `}
        margin-bottom: .2ch;
      }
      font-size: 0.8em;
    `}
  color: ${(p) => p.theme.buttonPrimaryBg} !important;
`;
