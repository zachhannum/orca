import React, {
  forwardRef,
  HTMLAttributes,
  useState,
  useRef,
  useEffect,
} from 'react';
import styled, { css, useTheme } from 'styled-components';
import Color from 'color';
import { FolderOpenIcon } from 'renderer/icons';
import { updateSectionName } from 'renderer/utils/projectUtils';
import useStore from 'renderer/store/useStore';
import {
  SectionContextMenuClosedEvent,
  SectionContextMenuClosedEventData,
  SectionContextMenuEvent,
} from 'types/types';

type StyledTreeItemWrapperProps = {
  clone?: boolean;
  ghost?: boolean;
  disableSelection?: boolean;
  disableInteraction?: boolean;
};

const StyledTreeItemWrapper = styled.li<StyledTreeItemWrapperProps>`
  list-style: none;
  box-sizing: border-box;
  padding-left: var(--spacing);
  width: 100%;
  padding-right: 5px;
  ${(p) =>
    p.clone &&
    css`
      pointer-events: none;
      padding: 0;
    `}
`;

type StyledTreeItemProps = {
  clone?: boolean;
  ghost?: boolean;
  disableSelection?: boolean;
  disableInteraction?: boolean;
  isEditable?: boolean;
  contextOpen?: boolean;
  canHaveChildren?: boolean;
};

const StyledTreeItem = styled.div<StyledTreeItemProps>`
  position: relative;
  margin-right: 7px;
  display: flex;
  align-items: center;
  padding: 3px 6px;
  color: ${(p) =>
    p.canHaveChildren ? p.theme.sidebarFgTextSecondary : p.theme.sidebarFgText};
  font-size: ${(p) => (p.canHaveChildren ? '1em' : '0.9em')};
  font-weight: ${(p) => (p.canHaveChildren ? '600' : '400')};
  box-sizing: border-box;
  border-radius: 5px;

  ${(p) =>
    p.ghost &&
    css`
      margin-left: 10px;
      background-color: ${Color(p.theme.sidebarBg).lighten(0.3)};
      > * {
        /* Items are hidden using height and opacity to retain focus */
        opacity: 0;
      }
    `}

  ${(p) =>
    !p.disableInteraction &&
    !p.clone &&
    css`
      cursor: pointer;
      ${p.contextOpen &&
      css`
        background-color: ${Color(p.theme.sidebarBg).lighten(0.3)};
      `}
      &:hover {
        background-color: ${p.isEditable
          ? Color(p.theme.sidebarBg).darken(0.2)
          : Color(p.theme.sidebarBg).lighten(0.3)};
      }
    `}

    ${(p) =>
    p.clone &&
    css`
      background-color: ${Color(p.theme.sidebarBg).alpha(0.8).lighten(0.3)};
    `}

    ${(p) =>
    p.isEditable &&
    css`
      cursor: text;
      background-color: ${(p) => Color(p.theme.sidebarBg).darken(0.2)};
    `}
    transition: background-color 100ms ease-in-out;
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
  canHaveChildren: boolean;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
}

type StyledFolderIconProps = {
  collapsed?: boolean;
};
const StyledFolderIcon = styled(FolderOpenIcon)<StyledFolderIconProps>`
  ${(p) =>
    p.collapsed &&
    css`
      transform: rotate(-90deg);
    `}
  transition: transform 200ms ease-in-out;
`;

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
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
      canHaveChildren,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    const [isEditable, setIsEditable] = useState(false);
    const [contextOpen, setContextOpen] = useState(false);
    const [dragProps, setDragProps] = useState({ ...handleProps });
    const textRef = useRef<HTMLSpanElement>(null);
    const theme = useTheme();

    const handleContextClosed = (event: CustomEventInit) => {
      const { id, rename } = event.detail as SectionContextMenuClosedEventData;
      if (id === value) {
        setContextOpen(false);
        if (rename) {
          setIsEditable(true);
          setTimeout(() => {
            handleEdit();
          });
        }
      }
    };

    const handleOpenContext = (event: React.MouseEvent<HTMLLIElement>) => {
      event.preventDefault();
      setContextOpen(true);
      const contextEvent = new CustomEvent(SectionContextMenuEvent, {
        detail: { id: value, x: event.clientX, y: event.clientY },
      });
      document.addEventListener(
        SectionContextMenuClosedEvent,
        handleContextClosed
      );
      document.dispatchEvent(contextEvent);
    };

    const handleEdit = () => {
      textRef.current?.focus();
      var range = document.createRange();
      if (textRef.current) {
        range.selectNodeContents(textRef.current);
        var sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    };
    const handleClick = () => {
    console.log(`handling click, ${canHaveChildren}`);
      if (canHaveChildren) {
        if (onCollapse) onCollapse();
      } else {
        //todo, show content in Writer
      }
    };
    const handleBlur = () => {
      setIsEditable(false);
      const newValue = textRef.current?.innerText;
      if (newValue) updateSectionName(value, newValue);
    };
    useEffect(() => {
      const { addingSections } = useStore.getState();
      if (addingSections) {
        setIsEditable(true);
        textRef.current?.scrollTo({ behavior: 'smooth' });
        setTimeout(() => {
          handleEdit();
        });
      }
    }, []);
    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
      if (event.code === 'Enter') {
        event.preventDefault();
        setIsEditable(false);
      } else if (event.code === 'Escape') {
        event.preventDefault();
        if (textRef.current) textRef.current.innerText = value;
        setIsEditable(false);
      }
    };
    useEffect(() => {
      if (isEditable) {
        setDragProps(undefined);
      } else {
        setDragProps({ ...handleProps });
      }
    }, [isEditable]);

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
            ...style,
          } as React.CSSProperties
        }
        {...props}
        onClick={handleClick}
        onContextMenu={handleOpenContext}
      >
        <StyledTreeItem
          ref={ref}
          clone={clone}
          ghost={ghost}
          disableSelection={disableSelection}
          disableInteraction={disableInteraction}
          isEditable={isEditable}
          canHaveChildren={canHaveChildren}
          contextOpen={contextOpen}
          {...dragProps}
        >
          {canHaveChildren && (
            <>
              <StyledFolderIcon
                collapsed={collapsed}
                size="15px"
                color={theme.sidebarFgTextSecondary}
              />
            </>
          )}
          <StyledText
            // onDoubleClick={handleDoubleClick}
            contentEditable={isEditable}
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
