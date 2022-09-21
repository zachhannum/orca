import React from 'react';
import styled, { css } from 'styled-components';
import Color from 'color';
import useStore from 'renderer/store/useStore';

type ScrollerProps = {
  sidebarOpen: boolean;
};

const Scroller = styled.div<ScrollerProps>`
  overflow-y: overlay;
  height: 100%;
  padding-right: 50px;
  padding-left: ${(p) => (p.sidebarOpen ? '50px' : '125px')};
  margin-right: 5px;
  box-sizing: border-box;

  mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 17px, black 17px);
  mask-size: 100% 20000px;
  mask-position: left bottom;
  -webkit-mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 17px, black 17px);
  -webkit-mask-size: 100% 20000px;
  -webkit-mask-position: left bottom;
  transition: mask-position 0.3s, -webkit-mask-position 0.3s, padding-left 300ms ease-in-out;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    /* display: none; */
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(p) =>
      Color(p.theme.mainBg).alpha(1).darken(0.2).hsl().string()};
  }
  &:hover {
    -webkit-mask-position: left top;
  }
  ${window.windowApi.os() === 'darwin' &&
  css`
    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      cursor: pointer;
    }
  `}
`;

type Props = {
  children: React.ReactNode;
};

const ScrollContainer = ({ children }: Props) => {
  const sidebarOpen = useStore((state) => state.sidebarOpen);

  return <Scroller sidebarOpen={sidebarOpen}>{children}</Scroller>;
};

export default ScrollContainer;
