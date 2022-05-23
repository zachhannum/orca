import { css } from 'styled-components';
import { StyledLeafProps } from './PreviewLeaf';

export const BlockQuote = css<StyledLeafProps>`
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
