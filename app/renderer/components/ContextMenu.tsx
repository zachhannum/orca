import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Color from 'color';
import { useOnWheel, useOnClickOutside } from '../hooks';

type StyledContextMenuProps = {
  show?: boolean;
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
  animation: ${onOpenKeyframes} 100ms ease-in-out alternate;
  background-color: ${(p) => Color(p.theme.contextMenuBg).lighten(0.2)};
  backdrop-filter: blur(40px);
  border-radius: 10px;
  padding: 5px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
`;

export type Position = {
  x: number;
  y: number;
};

type ContextMenuProps = {
  showMenu: boolean;
  onCloseMenu: () => void;
  position: Position;
  children?: React.ReactNode;
};

const ContextMenu = ({
  showMenu,
  onCloseMenu,
  position,
  children,
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

  useEffect(() => {
    if (showMenu) {
      const rootDiv = root.current;
      const { x, y } = position;
      if (invisibleTimeout.current) {
        clearTimeout(invisibleTimeout.current);
      }
      setTimeout(() => {
        if (rootDiv) {
          const clickX = x;
          const clickY = y;
          const screenW = window.innerWidth;
          const screenH = window.innerHeight;
          const rootW = rootDiv.offsetWidth;
          const rootH = rootDiv.offsetHeight;
          const screenPadding = 20;

          const right = screenW - clickX - screenPadding > rootW;
          const left = !right;
          const top = screenH - clickY - screenPadding > rootH;
          const bottom = !top;
          let transformOriginX = '';
          let transformOriginY = '';
          if (right) {
            rootDiv.style.left = `${clickX}px`;
            transformOriginX = 'left';
          }

          if (left) {
            rootDiv.style.left = `${clickX - rootW}px`;
            transformOriginX = 'right';
          }

          if (top) {
            rootDiv.style.top = `${clickY}px`;
            transformOriginY = 'top';
          }

          if (bottom) {
            rootDiv.style.top = `${clickY - rootH}px`;
            transformOriginY = 'bottom';
          }
          if (menuRef.current)
            menuRef.current.style.transformOrigin = `${transformOriginY} ${transformOriginX}`;
        }
      }, 10);
      setVisible(true);
    } else {
      invisibleTimeout.current = setTimeout(() => {
        setVisible(false);
      }, 100);
    }
  }, [showMenu]);

  return (
    <div ref={root} style={{ position: 'fixed', zIndex: '5' }}>
      {visible && (
        <StyledContextMenu ref={menuRef} show={showMenu}>
          {children}
        </StyledContextMenu>
      )}
    </div>
  );
};

export default ContextMenu;
