import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { CssMixinType } from 'types/types';

type ScrollerProps = {
  showScroll: boolean;
  cssMixin?: CssMixinType;
};

const Scroller = styled.div<ScrollerProps>`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  box-sizing: border-box;
  border-color: transparent;
  transition: border-color 200ms ease-in-out;

  ::-webkit-scrollbar {
    height: 95%;
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

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    cursor: pointer;
    padding: 5px 0px;
  }

  ${(p) =>
    p.showScroll &&
    css`
      border-color: rgba(0, 0, 0, 0.2);
    `}

  ${(p) => p.cssMixin}
`;

type ScrollContainerProps = {
  cssMixin?: CssMixinType;
  children: React.ReactNode;
};

const ScrollContainer = React.forwardRef<HTMLDivElement, ScrollContainerProps>(
  ({ cssMixin, children }: ScrollContainerProps, ref) => {
    const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const [showScroll, setShowScroll] = React.useState(false);

    const handleScroll = () => {
      setShowScroll(true);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        setShowScroll(false);
      }, 750);
    };

    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.addEventListener('scroll', handleScroll);
      }
      return () => {
        if (scrollRef.current) {
          scrollRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }, []);

    return (
      <Scroller
        ref={(el: HTMLDivElement) => {
          if (ref && typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
          scrollRef.current = el;
        }}
        showScroll={showScroll}
        cssMixin={cssMixin}
      >
        {children}
      </Scroller>
    );
  }
);

export default ScrollContainer;
