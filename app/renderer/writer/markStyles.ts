import { css } from 'styled-components';
import { StyledLeafProps } from './PreviewLeaf';
import Color from 'color';

export const Emphasis = css`
  font-style: italic;
`;

export const EmphasisMarkup = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      display: none;
    `}
  color: ${(p) => p.theme.buttonPrimaryBg} !important;
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
  color: ${(p) => p.theme.buttonPrimaryBg} !important;
`;

export const InlineCode = css<StyledLeafProps>`
  ${(p) => p.hideMarkup && css`
    border-radius: 5px;
    padding: 5px;
  `}
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: ${(p) => Color(p.theme.mainBg).darken(0.2)};
`;

export const InlineCodeMarkup = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      display: none;
    `}
  ${(p) =>
    p.markupBefore &&
    css`
      border-radius: 5px 0px 0px 5px;
      padding-left: 5px;
    `}
    ${(p) =>
    p.markupAfter &&
    css`
      border-radius: 0px 5px 5px 0px;
      padding-right: 5px;
    `}
  color: ${(p) => p.theme.buttonPrimaryBg} !important;
`;
