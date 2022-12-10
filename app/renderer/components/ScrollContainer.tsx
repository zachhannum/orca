import { useResizeObserver } from 'renderer/hooks';
import React from 'react';
import styled, { css } from 'styled-components';
import { CssMixinType } from 'types/types';

type ScrollerProps = {
  cssMixin?: CssMixinType;
};

const Scroller = styled.div<ScrollerProps>`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  box-sizing: border-box;
  border-color: transparent;
  transition: border-color 300ms ease-in-out;
  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }

  ::-webkit-scrollbar,
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-corner {
    border-right-style: inset;
    border-color: transparent;
    width: 8px;
    border-width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-color: inherit;
  }
  ${window.windowApi.os() === 'darwin' &&
  css`
    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      cursor: pointer;
    }
  `}

  ${(p) => p.cssMixin}
`;

type ScrollContainerProps = {
  cssMixin?: CssMixinType;
  children: React.ReactNode;
};

const ScrollContainer = React.forwardRef<HTMLDivElement, ScrollContainerProps>(
  ({ cssMixin, children }: ScrollContainerProps, ref) => {
    // const scrollRef = React.useRef<HTMLDivElement>(null);
    // useResizeObserver(scrollRef, 0, () => {
    //   console.log('scroll resized');
    // });
    return (
      <Scroller ref={ref} cssMixin={cssMixin}>
        {children}
      </Scroller>
    );
  }
);

export default ScrollContainer;
