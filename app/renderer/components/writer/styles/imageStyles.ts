import { css } from 'styled-components';
import { StyledLeafProps } from '../PreviewLeaf';

export const Image = css<StyledLeafProps>`
  color: ${(p) => p.theme.buttonPrimaryBg};

  ${(p) =>
    p.hideMarkup &&
    css`
      display: none;
    `}
`;
