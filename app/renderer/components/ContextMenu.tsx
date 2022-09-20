import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Color from 'color';
import { useOnWheel, useOnClickOutside } from '../hooks';

const StyledRoot = styled.div`
  position: fixed;
  z-index: 5;
`;

type StyledContextMenuProps = {
  show: boolean;
  visible: boolean;
};
const onOpenKeyframes = keyframes`
 from {
   opacity: 0;
   transform: scale(.7);
 }
 to {
   opacity: 1;
   transform: scale(1);
 }
`;

const StyledContextMenu = styled.div<StyledContextMenuProps>`
  opacity: ${(p) => (p.show ? '1' : '0')};
  transform: ${(p) => (p.show ? 'scale(1)' : 'scale(.7)')};
  height: ${(p) => (p.visible ? 'inherit' : '0')};
  width: ${(p) => (p.visible ? 'inherit' : '0')};
  animation: ${onOpenKeyframes} 100ms ease-in-out alternate;
  background-color: ${(p) =>
    Color(p.theme.contextMenuBg).lighten(0.2).hsl().string()};
  border: ${(p) => p.theme.contextMenuDivider} 1px solid;
  backdrop-filter: blur(40px);
  border-radius: 10px;
  padding: 5px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: opacity 100ms ease-out, transform 100ms ease-out;
`;

export type Position = {
  x: number;
  y: number;
};

type ContextMenuProps = {
  showMenu: boolean;
  onCloseMenu: () => void;
  position: Position;
  center?: boolean;
  children?: React.ReactNode;
};

const ContextMenu = ({
  showMenu,
  onCloseMenu,
  position,
  children,
  center = false,
}: ContextMenuProps) => {
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const invisibleTimeout = useRef<NodeJS.Timeout | null>(null);

  useOnWheel((_event: WheelEvent) => {
    onCloseMenu();
  });

  useOnClickOutside(root, (_event: MouseEvent | TouchEvent) => {
    onCloseMenu();
  });

  const setPosition = () => {
    const rootDiv = root.current;
    const menuRefDiv = menuRef.current;
    let { x, y } = position;
    if (menuRefDiv && rootDiv) {
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const rootW = menuRefDiv.offsetWidth;
      const rootH = menuRefDiv.offsetHeight;
      let screenPadding = 20;
      if (center) {
        screenPadding = 0;
      }
      const right = screenW - x - screenPadding > rootW;
      const left = !right;
      const top = screenH - y - screenPadding > rootH;
      const bottom = !top;
      let transformOriginX = '';
      let transformOriginY = '';
      if (right) {
        if (center) {
          x = Math.max(2, x - rootW / 2);
          transformOriginX = 'center';
        } else {
          transformOriginX = 'left';
        }
        rootDiv.style.left = `${x}px`;
      }

      if (left) {
        if (center) {
          x = Math.min(screenW - 2, x + rootW / 2);
          transformOriginX = 'center';
        }
        rootDiv.style.left = `${x - rootW}px`;
        transformOriginX = 'right';
      }

      if (top) {
        rootDiv.style.top = `${y}px`;
        transformOriginY = 'top';
      }

      if (bottom) {
        rootDiv.style.top = `${y - rootH}px`;
        transformOriginY = 'bottom';
      }
      if (menuRef.current)
        menuRef.current.style.transformOrigin = `${transformOriginY} ${transformOriginX}`;
    }
  };

  useEffect(() => {
    setPosition();
  }, []);

  useEffect(() => {
    if (showMenu) {
      setPosition();
    }
  }, [position]);

  useEffect(() => {
    if (showMenu) {
      if (invisibleTimeout.current) {
        clearTimeout(invisibleTimeout.current);
      }
      setTimeout(() => {
        setPosition();
      }, 10);
      setTimeout(() => {
        if (root.current) root.current.style.transition = 'all 100ms ease-out';
      }, 100);
      setVisible(true);
    } else {
      if (root.current) root.current.style.transition = 'unset';
      invisibleTimeout.current = setTimeout(() => {
        setVisible(false);
      }, 100);
    }
  }, [showMenu]);

  return (
    <StyledRoot ref={root}>
      <StyledContextMenu ref={menuRef} show={showMenu} visible={visible}>
        {children}
      </StyledContextMenu>
    </StyledRoot>
  );
};

export default ContextMenu;
