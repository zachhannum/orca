import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Polisher, Chunker, initializeHandlers } from 'pagedjs';
import useStore from '../store/useStore';
import Test from '../pagedjs/test';
import bookCss from '../pagedjs/book.css';
import { render } from '@testing-library/react';

type StyledPaneProps = {
  previewEnabled: boolean;
};

const StyledPane = styled.div<StyledPaneProps>`
  height: 100%;
  width: 600px;
  margin-right: ${(p) => (p.previewEnabled ? '0px' : '-600px')};
  background-color: ${(p) => p.theme.previewBg};
  transition: margin-right 300ms ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
`;

const Preview = styled.div`
  .pagedjs_page {
    background-color: #f8f4ef;
    flex: none;
    scroll-snap-align: start;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .pagedjs_pages {
    width: calc(var(--pagedjs-width));
    height: calc(var(--pagedjs-height));
    transform: scale(0.5) translate(-1.25in, 0px) !important;
    transform-origin: center center;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    justify-content: flex-start;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2),
      0 20px 40px 0 rgba(0, 0, 0, 0.19);
  }
`;

const PreviewPane = () => {
  const polisher = useRef(new Polisher());
  const previewRef = useRef(null);
  const chunker = useRef(new Chunker());
  const previewEnabled = useStore((state) => state.previewEnabled);

  useEffect(() => {
    const preview = async () => {
      if (previewEnabled) {
        console.log('Rendering preview....');
        const flowText = document.querySelector('#flow');
        // const renderTo = document.querySelector('#previewPane');
        polisher.current.setup();
        initializeHandlers(chunker.current, polisher.current);
        // await polisher.current.add([bookCss]);
        await chunker.current.flow(flowText, previewRef.current);
      }
    };

    preview();
  }, [previewEnabled]);

  return (
    <StyledPane previewEnabled={previewEnabled}>
      <Test />
      <Preview ref={previewRef} />
    </StyledPane>
  );
};

export default PreviewPane;
