import styled, { css } from 'styled-components';
import { StyledLeafProps } from '../PreviewLeaf';

export const ListItem = css<StyledLeafProps>``;

export const ListItemMarkup = css<StyledLeafProps>`
  ${(p) =>
    p.hideMarkup &&
    css`
      display: none;
    `}
  color: ${(p) => p.theme.buttonPrimaryBg} !important;
`;

export const ListItemBullet = styled.span<StyledLeafProps>`
  margin-left: ${(p) => p.depth}ch;
`;
