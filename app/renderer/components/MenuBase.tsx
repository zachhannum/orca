import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import type { CssMixinType } from 'types/types';
import {
  useOnWheel,
  useOnClickOutside,
  useResizeObserver,
  useOnWindowResize,
} from '../hooks';

type StyledRootProps = {
  visible: boolean;
  fixed: boolean;
};

const StyledRoot = styled.div<StyledRootProps>`
  position: ${(p) => (p.fixed ? 'fixed' : 'absolute')};
  z-index: 5;
  pointer-events: ${(p) => (p.visible ? 'auto' : 'none')};
`;

type StyledMenuBaseProps = {
  show: boolean;
  visible: boolean;
  styleMixin: CssMixinType;
  verticalAnimateScale: number;
  horizontalAnimateScale: number;
};

const StyledMenuBase = styled.div<StyledMenuBaseProps>`
  opacity: ${(p) => (p.show ? '1' : '0')};
  transform: ${(p) =>
    p.show
      ? 'scale(1 1)'
      : `scale(${p.horizontalAnimateScale}, ${p.verticalAnimateScale})`};
  background-color: black;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: opacity 100ms ease-out, transform 100ms ease-out;

  ${(p) => p.styleMixin}
`;

export type Position = {
  x: number;
  y: number;
};

type MenuBaseProps = {
  showMenu: boolean;
  onCloseMenu: () => void;
  position: Position;
  offset?: Position;
  center?: boolean;
  fixed?: boolean;
  verticalAnimateScale?: number;
  horizontalAnimateScale?: number;
  styleMixin?: CssMixinType;
  clickRef?: React.RefObject<HTMLElement>;
  onResize?: (height: number, width: number) => void;
  children?: React.ReactNode;
};

const MenuBase = ({
  showMenu,
  onCloseMenu,
  position,
  offset,
  fixed = false,
  verticalAnimateScale = 0.7,
  horizontalAnimateScale = 0.7,
  styleMixin,
  clickRef,
  onResize,
  children,
  center = false,
}: MenuBaseProps) => {
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const invisibleTimeout = useRef<NodeJS.Timeout | null>(null);

  useOnWheel((_event: WheelEvent) => {
    onCloseMenu();
  }, menuRef);

  const clickRefs = [menuRef] as React.RefObject<HTMLElement>[];
  if (clickRef) {
    clickRefs.push(clickRef);
  }

  useOnClickOutside((_event: MouseEvent | TouchEvent) => {
    onCloseMenu();
  }, ...clickRefs);

  useResizeObserver(root, 0, onResize);

  useOnWindowResize(() => {
    if (showMenu) {
      onCloseMenu();
    }
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
      let xParentOffset = 0;
      let yParentOffset = 0;

      if (!fixed && rootDiv.parentElement) {
        xParentOffset = rootDiv.parentElement.getBoundingClientRect().x;
        yParentOffset = rootDiv.parentElement.getBoundingClientRect().y;
      }
      const right = screenW - x - xParentOffset - screenPadding > rootW;
      const left = !right;
      const top = screenH - y - yParentOffset - screenPadding > rootH;
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
        if (offset) {
          x += offset.x;
        }
        rootDiv.style.left = `${x}px`;
      }

      if (left) {
        if (center) {
          x = Math.min(screenW - 2, x + rootW / 2);
          transformOriginX = 'center';
        }
        if (offset) {
          x -= offset.x;
        }
        rootDiv.style.left = `${x - rootW}px`;
        transformOriginX = 'right';
      }

      if (top) {
        if (offset) {
          y += offset.y;
        }
        rootDiv.style.top = `${y}px`;
        transformOriginY = 'top';
      }

      if (bottom) {
        if (offset) {
          y -= offset.y;
        }
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
    setPosition();
  }, [position]);

  useEffect(() => {
    if (showMenu) {
      if (invisibleTimeout.current) {
        clearTimeout(invisibleTimeout.current);
      }
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
    <StyledRoot ref={root} visible={visible} fixed={fixed}>
      <StyledMenuBase
        ref={menuRef}
        show={showMenu}
        visible={visible}
        styleMixin={styleMixin}
        verticalAnimateScale={verticalAnimateScale}
        horizontalAnimateScale={horizontalAnimateScale}
      >
        {children}
      </StyledMenuBase>
    </StyledRoot>
  );
};

export default MenuBase;
