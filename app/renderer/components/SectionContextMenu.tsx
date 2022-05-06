import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Color from 'color';
import useStore from '../store/useStore';
import { findItemDeep } from './TreeView/utilities';
import {
  Section,
  SectionContextMenuEvent,
  SectionContextMenuClosedEvent,
  SectionContextMenuEventData,
  SectionType,
} from 'types/types';

type StyledContextMenuProps = {
  show?: boolean;
};
const onOpenKeyframes = keyframes`
 from {
   opacity: 0;
 }
 to {
   opacity: 1;
 }
`;

const StyledContextMenu = styled.div<StyledContextMenuProps>`
  opacity: ${(p) => (p.show ? '1' : '0')};
  animation: ${onOpenKeyframes} 100ms ease-in-out alternate;
  background-color: ${(p) => Color(p.theme.contextMenuBg).lighten(0.2)};
  backdrop-filter: blur(40px);
  border-radius: 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: opacity 100ms ease-in-out;
`;

const StyledContextMenuItem = styled.div`
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.9em;

  color: ${(p) => p.theme.mainFgTextSecondary};

  &:hover {
    background-color: ${(p) => Color(p.theme.contextMenuBg).lighten(0.4)};
  }
  &:active {
    background-color: ${(p) => Color(p.theme.contextMenuBg).darken(0.4)};
  }

  transition: background-color 100ms ease-in-out;
`;

const SectionContextMenu = () => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const [isFolder, setIsFolder] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const invisibleTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const handleSectionContextMenu = (e: CustomEventInit) => {
      const rootDiv = root.current;
      const { id, x, y } = e.detail as SectionContextMenuEventData;
      setShowMenu(false);
      setTimeout(() => {
        if (invisibleTimeout.current) {
          clearTimeout(invisibleTimeout.current);
        }
        setShowMenu(true);
        setId(id);
        const { content } = useStore.getState();
        const item = findItemDeep(content, id) as Section;
        setIsFolder(item.type === SectionType.folder);
        if (rootDiv) {
          const clickX = x;
          const clickY = y;
          const screenW = window.innerWidth;
          const screenH = window.innerHeight;
          const rootW = rootDiv.offsetWidth;
          const rootH = rootDiv.offsetHeight;

          const right = screenW - clickX > rootW;
          const left = !right;
          const top = screenH - clickY > rootH;
          const bottom = !top;

          if (right) {
            rootDiv.style.left = `${clickX + 5}px`;
          }

          if (left) {
            rootDiv.style.left = `${clickX - rootW - 5}px`;
          }

          if (top) {
            rootDiv.style.top = `${clickY + 5}px`;
          }

          if (bottom) {
            rootDiv.style.top = `${clickY - rootH - 5}px`;
          }
        }
      }, 10);
    };

    const handleClick = (event) => {
      const wasOutside = !(event.target.contains === root);
      if (wasOutside && showMenu) setShowMenu(false);
    };

    const handleScroll = () => {
      if (showMenu) setShowMenu(false);
    };

    const handleDefaultContext = (e) => {
      if (showMenu) e.preventDefault();
    };

    document.addEventListener(
      SectionContextMenuEvent,
      handleSectionContextMenu
    );
    document.addEventListener('contextmenu', handleDefaultContext);
    document.addEventListener('click', handleClick);
    document.addEventListener('wheel', handleScroll);

    return () => {
      document.removeEventListener(
        SectionContextMenuEvent,
        handleSectionContextMenu
      );
      document.removeEventListener('contextmenu', handleDefaultContext);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('wheel', handleScroll);
    };
  }, [showMenu, setShowMenu]);

  useEffect(() => {
    console.log(showMenu);
    if (!showMenu && id !== '') {
      const contextClosedEvent = new CustomEvent(
        SectionContextMenuClosedEvent,
        {
          detail: { id: id },
        }
      );
      console.log('Dispatching context closed event');
      document.dispatchEvent(contextClosedEvent);
    }
  }, [showMenu, id]);

  useEffect(() => {
    if (showMenu) {
      setVisible(true);
    } else {
      invisibleTimeout.current = setTimeout(() => {
        setVisible(false);
      }, 100);
    }
  }, [showMenu]);

  return (
    <div ref={root} style={{ position: 'fixed' }}>
      {visible && (
        <StyledContextMenu show={showMenu}>
          {!isFolder && (
            <StyledContextMenuItem
              onClick={() => {
                console.log('Clicked!');
              }}
            >
              Open in Editor
            </StyledContextMenuItem>
          )}
          <StyledContextMenuItem>Rename</StyledContextMenuItem>
          <StyledContextMenuItem>Duplicate</StyledContextMenuItem>
          <StyledContextMenuItem>Delete</StyledContextMenuItem>
        </StyledContextMenu>
      )}
    </div>
  );
};

export default SectionContextMenu;
