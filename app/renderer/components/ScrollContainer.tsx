import React from 'react';
import styled, { css } from 'styled-components';
import Color from 'color';

const Scroller = styled.div`
  overflow-y: overlay;
  height: 100%;
  width: calc(100% - 125px);
  padding-right: 50px;
  padding-left: 75px;

  mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 17px, black 17px);
  mask-size: 100% 20000px;
  mask-position: left bottom;
  -webkit-mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 17px, black 17px);
  -webkit-mask-size: 100% 20000px;
  -webkit-mask-position: left bottom;
  transition: mask-position 0.3s, -webkit-mask-position 0.3s;
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

const ScrollContainer = ({ children }: Props) => (
  <Scroller>{children}</Scroller>
);

export default ScrollContainer;
