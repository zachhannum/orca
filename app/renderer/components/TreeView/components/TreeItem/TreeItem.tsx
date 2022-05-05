import React, { forwardRef, HTMLAttributes, useState } from 'react';
import styled, { css } from 'styled-components';
import Color from 'color';
import { IconButton } from 'renderer/controls';
import { PlusIcon } from 'renderer/icons';

type StyledTreeItemWrapperProps = {
  clone?: boolean;
  ghost?: boolean;
  disableSelection?: boolean;
  disableInteraction?: boolean;
};

const StyledTreeItemWrapper = styled.li<StyledTreeItemWrapperProps>`
  list-style: none;
  font-size: 0.9em;
  box-sizing: border-box;
  padding-left: var(--spacing);
  width: 100%;
  padding-right: 5px;
  ${(p) =>
    p.clone &&
    css`
      display: inline-block;
      pointer-events: none;
      padding: 0;
      margin-left: 10px;
      margin-top: 5px;
    `}
`;

type StyledTreeItemProps = {
  clone?: boolean;
  ghost?: boolean;
  disableSelection?: boolean;
  disableInteraction?: boolean;
  isEditable?: boolean;
};

const StyledTreeItem = styled.div<StyledTreeItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 3px 6px;
  color: ${(p) => p.theme.sidebarFgText};
  box-sizing: border-box;
  border-radius: 5px;

  ${(p) =>
    p.contentEditable &&
    css`
      background-color: ${(p) => Color(p.theme.sidebarBg).darken(0.2)};
    `}

  ${(p) =>
    p.clone &&
    css`
      margin-top: 20px;
      --vertical-padding: 5px;
      padding-right: 24px;
      border-radius: 4px;
    `}

  ${(p) =>
    p.ghost &&
    css`
      position: relative;
      padding: 0;
      height: 3px;
      margin-left: 10px;
      background-color: ${Color(p.theme.sidebarBg).lighten(0.3)};
      > * {
        /* Items are hidden using height and opacity to retain focus */
        opacity: 0;
        height: 0;
      }
    `}

  ${(p) =>
    !p.disableInteraction &&
    css`
      cursor: pointer;

      &:hover {
        background-color: ${p.isEditable
          ? Color(p.theme.sidebarBg).darken(0.2)
          : Color(p.theme.sidebarBg).lighten(0.3)};
      }
    `}
`;

const StyledText = styled.span`
  flex-grow: 1;
  padding-left: 0.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  :focus {
        outline: none;
      }
`;

const StyledCount = styled.span`
  position: absolute;
  top: -10px;
  left: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #2389ff;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
`;

export interface Props extends HTMLAttributes<HTMLLIElement> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: string;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      value,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    const [isEditable, setIsEditable] = useState(false);
    const handleDoubleClick = () => {
      setIsEditable(true);
      setTimeout(() => {
        // itemRef.current?.focus();
      }, 10);
    };
    return (
      <StyledTreeItemWrapper
        clone={clone}
        ghost={ghost}
        disableSelection={disableSelection}
        disableInteraction={disableInteraction}
        ref={wrapperRef}
        style={
          {
            '--spacing': `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <StyledTreeItem
          ref={ref}
          style={style}
          clone={clone}
          ghost={ghost}
          disableSelection={disableSelection}
          disableInteraction={disableInteraction}
          isEditable={isEditable}
        >
          {onCollapse && (
            <IconButton onClick={onCollapse} iconSize="15px">
              <PlusIcon />
            </IconButton>
          )}
          <StyledText {...handleProps} onDoubleClick={handleDoubleClick} contentEditable={isEditable}>
            {value}
          </StyledText>
          {clone && childCount && childCount > 1 ? (
            <StyledCount>{childCount}</StyledCount>
          ) : null}
        </StyledTreeItem>
      </StyledTreeItemWrapper>
    );
  }
);

const collapseIcon = (
  <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 41">
    <path d="M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z" />
  </svg>
);
