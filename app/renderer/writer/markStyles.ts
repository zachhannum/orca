import { css } from 'styled-components';
import { StyledLeafProps } from './PreviewLeaf';

export const emphasis = css`
  font-style: italic;
`;

export const emphasisMarkup = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      display: none;
    `}
  color: ${(p) => p.theme.buttonPrimaryBg};
`;

export const strong = css`
  font-weight: 700;
`;

export const strongMarkup = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      display: none;
    `}
  color: ${(p) => p.theme.buttonPrimaryBg};
`;
