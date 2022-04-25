/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { VivliostyleRenderer, PagedRenderer } from '../components';
import useStore from '../store/useStore';
import alice from './alice';
import { baseStylesheet } from '../pagedjs/defaultPageCss';
import { Test } from '../pagedjs/test';

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
  justify-content: center;
`;

const PreviewDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const PreviewPane = () => {
  const previewEnabled = useStore((state) => state.previewEnabled);
  const previewRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  function next() {
    setPage(page + 1);
  }

  function prev() {
    setPage(page - 1);
  }
  const [docUrl, setDocUrl] = useState(
    URL.createObjectURL(new Blob([alice], { type: 'text/html' }))
  );

  // useEffect(() => {
  //   const setUrl = () => {
  //     const blob = URL.createObjectURL(
  //       new Blob([alice], { type: 'text/html' })
  //     );
  //     setDocUrl(blob);
  //   };
  //   setTimeout(() => {
  //     setUrl();
  //   }, 300);
  // }, [previewEnabled]);

  return (
    <StyledPane previewEnabled={previewEnabled}>
      <PreviewDiv ref={previewRef} id="PreviewDiv">
        <button onClick={prev} type="button">
          Prev
        </button>
        {/* <Renderer
          source={docUrl}
          background="transparent"
          style={{ width: '75%', height: '75%' }}
          page={page}
          authorStyleSheet={baseStylesheet.toString()}
        /> */}
        <PagedRenderer />
        <button onClick={next} type="button">
          Next
        </button>
      </PreviewDiv>
      <Test />
    </StyledPane>
  );
};

export default PreviewPane;
