import React from 'react';
import styled from 'styled-components';

const Scroller = styled.div`
  overflow-y: overlay;
  height: 100%;
  width: calc(100% - 100px);
  display: flex;
  align-items: center;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  padding-right: 50px;
  padding-left: 50px;
`;

const Padding = styled.div`
  max-width: 700px;
  padding-top: 10vh;
  padding-bottom: 10vh;
  width: calc(100% - 50px);
`;

type Props = {
  children: React.ReactNode;
};

const ScrollContainer = ({ children }: Props) => (
  <Scroller>
    <Padding>{children}</Padding>
  </Scroller>
);

export default ScrollContainer;
