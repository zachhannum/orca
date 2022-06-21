import React, {
  forwardRef,
  HTMLAttributes,
  useState,
  useRef,
  useEffect,
} from 'react';
import styled, { css, keyframes, useTheme } from 'styled-components';
import Color from 'color';
import { FolderOpenIcon, MoreVerticalIcon } from 'renderer/icons';
import { updateSectionName } from 'renderer/utils/projectUtils';
import useStore from 'renderer/store/useStore';
import {
  SectionContextMenuClosedEvent,
  SectionContextMenuClosedEventData,
  SectionContextMenuEvent,
} from 'types/types';
import { IconButton } from 'renderer/controls';

const animateInFromCollapseKeframes = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

type StyledTreeItemWrapperProps = {
  clone?: boolean;
  ghost?: boolean;
  disableSelection?: boolean;
  disableInteraction?: boolean;
  animateInDelay?: number;
  animateIn?: boolean;
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

  ${(p) =>
    !p.disableInteraction &&
    !p.clone &&
    p.animateIn &&
    css`
      animation: ${animateInFromCollapseKeframes} 100ms ease-in-out;
      animation-delay: ${p.animateInDelay}ms;
      animation-fill-mode: backwards;
    `}
`;

type StyledTreeItemProps = {
  clone?: boolean;
  ghost?: boolean;
  disableSelection?: boolean;
  disableInteraction?: boolean;
  isEditable?: boolean;
  isActiveInEditor?: boolean;
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
      background-color: ${Color(p.theme.sidebarBg).lighten(0.3).hsl().string()};
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
        background-color: ${Color(p.theme.sidebarBg)
          .lighten(0.3)
          .hsl()
          .string()};
      `}
      &:hover {
        background-color: ${Color(p.theme.sidebarBg)
          .lighten(0.3)
          .hsl()
          .string()};
      }
      ${p.isActiveInEditor &&
      css`
        background-color: ${Color(p.theme.buttonPrimaryBg).hsl().string()};
        &:hover {
          background-color: ${Color(p.theme.buttonPrimaryBg).hsl().string()};
        }
      `}
      ${p.isEditable &&
      css`
        cursor: text;
        background-color: ${Color(p.theme.sidebarBg)
          .darken(0.2)
          .hsl()
          .string()};
        &:hover {
          background-color: ${Color(p.theme.sidebarBg)
            .darken(0.2)
            .hsl()
            .string()}};
        }
      `}
    `}

    ${(p) =>
    p.clone &&
    css`
      background-color: ${Color(p.theme.sidebarBg)
        .alpha(0.8)
        .lighten(0.3)
        .hsl()
        .string()};
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

type MoreOptionsStyleProps = {
  hover: boolean;
};
const MoreOptionsStyle = (p: MoreOptionsStyleProps) => css`
  opacity: 0;
  ${p.hover &&
  css`
    opacity: 1;
  `}
  transition: opacity 100ms ease-in-out;
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
  animateIndex: number;
  animateIn: boolean;
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
      animateIndex,
      animateIn,
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
    const activeSectionId = useStore((state) => state.activeSectionId);
    const [isEditable, setIsEditable] = useState(false);
    const [contextOpen, setContextOpen] = useState(false);
    const [dragProps, setDragProps] = useState({ ...handleProps });
    const thisWrapperRef = useRef<HTMLLIElement | null>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const theme = useTheme();
    const moreOptionsRef = useRef<HTMLAnchorElement>(null);
    const [hover, setHover] = useState(false);

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
    const handleOpenContext = (
      event: React.MouseEvent<Element>,
      x?: number,
      y?: number
    ) => {
      event.preventDefault();
      setContextOpen(true);
      x = x ? x : event.clientX;
      y = y ? y : event.clientY;
      const contextEvent = new CustomEvent(SectionContextMenuEvent, {
        detail: { id: value, x, y },
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
      if (!isEditable) {
        if (canHaveChildren) {
          if (onCollapse) onCollapse();
        } else {
          const { setActiveSectionId } = useStore.getState();
          setActiveSectionId(value);
        }
      }
    };
    const handleBlur = () => {
      setIsEditable(false);
      const newValue = textRef.current?.innerText;
      if (newValue) {
        const success = updateSectionName(value, newValue);
        if (!success) {
          if (textRef.current) textRef.current.innerText = value;
        }
      }
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
        handleBlur();
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

    useEffect(() => {
      if (animateIn) {
        handleAnimationStart();
        if (thisWrapperRef.current) {
          thisWrapperRef.current.addEventListener(
            'animationcancel',
            handleAnimationEnd
          );
        }
      } else {
        thisWrapperRef.current?.removeEventListener(
          'animationcancel',
          handleAnimationEnd
        );
      }
    }, [animateIn]);

    const handleAnimationStart = () => {
      const { incrementAnimatingCollapseRefCount } = useStore.getState();
      incrementAnimatingCollapseRefCount();
    };

    const handleAnimationEnd = () => {
      const { decrementAnimatingCollapseRefCount } = useStore.getState();
      decrementAnimatingCollapseRefCount();
    };

    return (
      <StyledTreeItemWrapper
        clone={clone}
        ghost={ghost}
        disableSelection={disableSelection}
        disableInteraction={disableInteraction}
        ref={(el) => {
          if (el && wrapperRef) {
            wrapperRef(el);
            thisWrapperRef.current = el;
          }
        }}
        style={
          {
            '--spacing': `${indentationWidth * depth}px`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
        onClick={handleClick}
        onContextMenu={handleOpenContext}
        animateInDelay={animateIndex * 5}
        animateIn={animateIn}
        onAnimationEnd={handleAnimationEnd}
      >
        <StyledTreeItem
          ref={ref}
          clone={clone}
          ghost={ghost}
          disableSelection={disableSelection}
          disableInteraction={disableInteraction}
          isEditable={isEditable}
          isActiveInEditor={activeSectionId === value}
          canHaveChildren={canHaveChildren}
          contextOpen={contextOpen}
          {...dragProps}
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => setHover(false)}
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
            contentEditable={isEditable}
            suppressContentEditableWarning
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            ref={textRef}
          >
            {value}
          </StyledText>
          <IconButton
            onClick={(event: React.MouseEvent<Element>) => {
              const moreOptions = moreOptionsRef.current;
              if (moreOptions) {
                handleOpenContext(
                  event,
                  moreOptions.getBoundingClientRect().right - 5,
                  moreOptions.getBoundingClientRect().bottom - 5
                );
              }
            }}
            iconSize={'18px'}
            ref={moreOptionsRef}
            foregroundColor={theme.sidebarFgTextSecondary}
            cssMixin={MoreOptionsStyle({
              hover: (hover || contextOpen) && !isEditable,
            })}
          >
            <MoreVerticalIcon />
          </IconButton>
        </StyledTreeItem>
      </StyledTreeItemWrapper>
    );
  }
);
