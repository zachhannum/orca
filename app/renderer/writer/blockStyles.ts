import { css } from 'styled-components';
import { StyledLeafProps } from './PreviewLeaf';

export const BlockQuote = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      margin-left: 2em;
      border-left: 2px solid ${p.theme.mainFgTextSecondary};
      padding-left: 10px;
    `}
  color: ${(p) => p.theme.mainFgTextSecondary};
`;

export const BlockQuoteMarkupStyle = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      display: none;
    `}
  color: ${(p) => p.theme.buttonPrimaryBg};
`;
