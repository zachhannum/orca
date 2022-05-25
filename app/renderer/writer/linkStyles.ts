import { css } from 'styled-components';
import { StyledLeafProps } from './PreviewLeaf';

export const Link = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup
      ? css`
          color: ${(p) => p.theme.buttonPrimaryBg} !important;
          cursor: pointer;
        `
      : css`
          color: ${(p) => p.theme.mainFgText} !important;
        `}
`;

export const LinkMarkup = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      display: none;
    `}
  color: ${(p) => p.theme.buttonPrimaryBg} !important;
`;
