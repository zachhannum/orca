import React from 'react';
import styled, { css } from 'styled-components';

type ScrollerProps = {
  win32: boolean;
};

const Scroller = styled.div<ScrollerProps>`
  overflow-y: overlay;
  height: 100%;
  width: calc(100% - 125px);
  display: flex;
  align-items: center;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  padding-right: 50px;
  padding-left: 75px;

  ${(p) =>
    p.win32 &&
    css`
      background-color: rgba(0, 0, 0, 0);
      -webkit-background-clip: text;
      transition: background-color 0.8s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.15);
      }
      ::-webkit-scrollbar {
        width: 12px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        display: none;
      }
      ::-webkit-scrollbar-thumb {
        background-color: inherit;
      }
    `}
`;

const Padding = styled.div`
  max-width: 700px;
  padding-top: 10vh;
  padding-bottom: 10vh;
`;

type Props = {
  children: React.ReactNode;
};

const platform = window.calamusApi.os();

const ScrollContainer = ({ children }: Props) => (
  <Scroller win32={platform === 'win32'}>
    <Padding>{children}</Padding>
  </Scroller>
);

export default ScrollContainer;
