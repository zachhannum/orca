import React from 'react';
import styled, { useTheme } from 'styled-components';
import Color from 'color';

type StyledMenuItemProps = {
  hover?: boolean;
  hoverColor: string;
};

const StyledMenuItem = styled.div<StyledMenuItemProps>`
  user-select: none;
  cursor: ${(p) => (p.hover ? 'pointer' : 'auto')};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 7px 15px 7px 15px;
  font-size: 0.9em;
  &:first-of-type {
    padding-top: 15px;
  }
  &:last-of-type {
    padding-bottom: 15px;
  }
  color: ${(p) => p.theme.mainFgTextSecondary};
  &:hover {
    background-color: ${(p) =>
      p.hover ? p.hoverColor : p.theme.contextMenuBg};
  }
  transition: background-color 100ms ease-in-out;
`;

const StyledMenuItemIconDesc = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 13px;
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
  const menuItemHoverColor = Color(theme.contextMenuBg).darken(0.2);

  return (
    <StyledMenuItem
      hoverColor={menuItemHoverColor}
      hover={hover}
      onClick={onClick}
    >
      <StyledMenuItemIconDesc>
        {React.cloneElement(iconElement, {
          color:
            iconColorOverride !== undefined
              ? iconColorOverride
              : theme.mainFgTextSecondary,
          size: '15px',
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
