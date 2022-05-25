import { css } from 'styled-components';
import { StyledLeafProps } from './PreviewLeaf';

export const BlockQuote = css<StyledLeafProps>`
  color: ${(p) => p.theme.mainFgTextSecondary};
`;

export const BlockQuoteMarkup = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      display: none;
    `}
  color: ${(p) => p.theme.buttonPrimaryBg};
`;

export const HorizontalRuleMarkup = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup
      ? css`
          color: transparent;
          position: relative;
          display: block;
          &::before {
            visibility: visible;
            height: 50%;
            position: absolute;
            border-top: 2px ${p.theme.buttonPrimaryBg} solid;
            transform: translate(0px, 50%);
            display: block;
            width: 100%;
          }
        `
      : css`
          color: ${(p) => p.theme.buttonPrimaryBg};
        `}
`;

export const Code = css<StyledLeafProps>``;

export const CodeMarkup = css<StyledLeafProps>`
  color: ${(p) => p.theme.buttonPrimaryBg};
  ${(p) =>
    p.hideMarkup &&
    css`
      opacity: 0;
    `};
  transition: opacity 200ms ease-out;
`;
