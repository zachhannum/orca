/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import styled, { css } from 'styled-components';
import Color from 'color';
import type { CssMixinType } from 'types/types';

type StyledPaneProps = {
  backgroundColor: string;
  styleMixin?: CssMixinType;
};

const StyledPane = styled.div<StyledPaneProps>`
  height: 100%;
  position: relative;
  background-color: ${(p) => p.backgroundColor};
  transition: margin-right 300ms ease-in-out, margin-left 300ms ease-in-out;

  ${(p) => p.styleMixin}
`;

type StyledResizerProps = {
  hoverColor: string;
  invert: boolean;
};

const StyledResizer = styled.div<StyledResizerProps>`
  position: absolute;
  cursor: col-resize;
  height: 100%;
  width: 2px;
  z-index: 2;
  ${(p) =>
    p.invert
      ? css`
          left: 0;
          transform: translate(-50%, 0);
        `
      : css`
          right: 0;
          transform: translate(50%, 0);
        `}
  &:hover {
    width: 10px;
    background-color: ${(p) => p.hoverColor};
  }
  &:active {
    width: 10px;
    background-color: ${(p) => p.hoverColor};
  }
  transition: background-color 100ms ease-in-out, width 100ms ease-in-out;
`;

type PaneProps = {
  defaultWidth: string;
  minWidth: number;
  enabled: boolean;
  backgroundColor: string;
  invert?: boolean;
  children?: React.ReactNode;
  styleMixin?: CssMixinType;
};

const Pane = ({
  defaultWidth,
  minWidth,
  enabled,
  backgroundColor,
  invert = false,
  children,
  styleMixin,
}: PaneProps) => {
  const [width, setWidth] = useState(defaultWidth);
  const resizerHoverColor = Color(backgroundColor)
    .alpha(1)
    .lighten(0.5)
    .hsl()
    .string();

  const handleResize = (resizeEvent: React.MouseEvent<HTMLInputElement>) => {
    const startSize = parseInt(width, 10);
    const startPosition = resizeEvent.pageX;

    const onMouseMove = (mouseMoveEvent: MouseEvent) => {
      const adjust = invert
        ? startPosition - mouseMoveEvent.pageX
        : -startPosition + mouseMoveEvent.pageX;
      const newWidth = startSize + adjust;
      if (newWidth >= minWidth) {
        setWidth(`${newWidth}px`);
      }
    };
    const onMouseUp = () => {
      document.body.removeEventListener('mousemove', onMouseMove);
    };
    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  };

  return (
    <StyledPane
      backgroundColor={backgroundColor}
      styleMixin={styleMixin}
      style={{
        width,
        marginRight: invert && !enabled ? `-${width}` : '0',
        marginLeft: !invert && !enabled ? `-${width}` : '0',
      }}
    >
      <StyledResizer
        invert={invert}
        hoverColor={resizerHoverColor}
        onMouseDown={handleResize}
      />
      {children}
    </StyledPane>
  );
};

Pane.defaultProps = {
  minWidth: 200,
  invert: false,
  children: undefined,
  styleMixin: undefined,
};

export default Pane;
