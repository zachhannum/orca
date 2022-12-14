import styled from 'styled-components';
import Color from 'color';

export const ContextMenuItem = styled.div`
  user-select: none;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  gap: 10px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  text-align: center;
  padding: 7px;
  border-radius: 5px;
  font-size: 0.8em;
  width: 100%;
  white-space: nowrap;
  color: ${(p) => p.theme.mainFgTextSecondary};

  &:hover {
    background-color: ${(p) =>
      Color(p.theme.contextMenuBg).lighten(0.2).hsl().string()};
  }
  &:active {
    background-color: ${(p) =>
      Color(p.theme.contextMenuBg).darken(0.2).hsl().string()};
  }

  transition: background-color 100ms ease-in-out;
`;
