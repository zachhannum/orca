import { css } from 'styled-components';
import { StyledLeafProps } from './PreviewLeaf';

export const Emphasis = css`
  font-style: italic;
`;

export const EmphasisMarkup = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      display: none;
    `}
  color: ${(p) => p.theme.buttonPrimaryBg};
`;

export const Strong = css`
  font-weight: 700;
`;

export const StrongMarkup = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      display: none;
    `}
  color: ${(p) => p.theme.buttonPrimaryBg};
`;
