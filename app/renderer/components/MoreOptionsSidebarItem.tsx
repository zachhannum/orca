import React from 'react';
import styled, { useTheme, css } from 'styled-components';
import Color from 'color';

type StyledMenuItemProps = {
  hover?: boolean;
  hoverColor: string;
  activeColor: string;
};

const StyledMenuItem = styled.div<StyledMenuItemProps>`
  user-select: none;
  cursor: ${(p) => (p.hover ? 'pointer' : 'auto')};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.9em;

  color: ${(p) => p.theme.mainFgTextSecondary};

  ${(p) =>
    p.hover &&
    css`
      &:hover {
        background-color: ${p.hoverColor}}
      }
      &:active {
        background-color: ${p.activeColor};
      }
    `}

  transition: background-color 100ms ease-in-out;
`;

const StyledMenuItemIconDesc = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;

type MoreOptionsSidebarItemProps = {
  hover?: boolean;
  onClick?: () => void;
  iconElement: React.ReactElement;
  iconColorOverride?: string;
  rightElement?: React.ReactElement;
  label: string;
};

const MoreOptionsSidebarItem = ({
  hover,
  onClick,
  iconElement,
  iconColorOverride,
  rightElement,
  label,
}: MoreOptionsSidebarItemProps) => {
  const theme = useTheme();
  const menuItemHoverColor = Color(theme.contextMenuBg).lighten(0.3);
  const menuItemActiveColor = Color(theme.contextMenuBg).darken(0.3);

  return (
    <StyledMenuItem
      hoverColor={menuItemHoverColor}
      activeColor={menuItemActiveColor}
      hover={hover}
      onClick={onClick}
    >
      <StyledMenuItemIconDesc>
        {React.cloneElement(iconElement, {
          color:
            iconColorOverride !== undefined
              ? iconColorOverride
              : theme.mainFgTextSecondary,
          size: '10px',
        })}
        <span>{label}</span>
      </StyledMenuItemIconDesc>
      {rightElement}
    </StyledMenuItem>
  );
};

MoreOptionsSidebarItem.defaultProps = {
  hover: false,
  onClick: undefined,
  iconColorOverride: undefined,
  rightElement: undefined,
};

export default MoreOptionsSidebarItem;
