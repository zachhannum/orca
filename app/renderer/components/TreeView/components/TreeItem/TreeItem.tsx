import React, {
  forwardRef,
  HTMLAttributes,
  useState,
  useRef,
  useEffect,
} from 'react';
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

    ${(p) =>
    p.isEditable &&
    css`
      cursor: text;
      background-color: ${(p) => Color(p.theme.sidebarBg).darken(0.2)};
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
    const [dragProps, setDragProps] = useState({ ...handleProps });
    const textRef = useRef<HTMLSpanElement>();
    const handleDoubleClick = () => {
      setIsEditable(true);
      setTimeout(() => {
        textRef.current?.focus();
      }, 10);
    };
    const handleBlur = () => {
      setIsEditable(false);

      // const newValue = textRef.current?.innerText;
      // if (newValue) updateSectionName(value, newValue);
    };
    // useEffect(() => {
    //   if (addingNew) {
    //     setIsEditable(true);
    //     textRef.current?.scrollTo({ behavior: 'smooth' });
    //     setTimeout(() => {
    //       textRef.current?.focus();
    //     });
    //   }
    // }, []);
    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
      if (event.code === 'Enter') {
        event.preventDefault();
        handleBlur();
      } else if (event.code === 'Escape') {
        event.preventDefault();
        if (textRef.current) textRef.current.innerText = value;
        setIsEditable(false);
      }
    };
    useEffect(() => {
      if (isEditable) {
        setDragProps({});
      } else {
        setDragProps({ ...handleProps });
      }
    });

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
          <StyledText
            {...dragProps}
            onDoubleClick={handleDoubleClick}
            contentEditable={isEditable}
            disabled={isEditable}
            suppressContentEditableWarning
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            ref={textRef}
          >
            {value}
          </StyledText>
        </StyledTreeItem>
      </StyledTreeItemWrapper>
    );
  }
);
