/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Renderer } from '@vivliostyle/react';
import useStore from '../store/useStore';
import Test from '../pagedjs/test';
import alice from './alice';
import {
  pagedmakerCSSDefault,
  baseStylesheet,
} from '../pagedjs/defaultPageCss';

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
  const [page, setPage] = useState(7);

  function next() {
    setPage(page + 1);
  }

  function prev() {
    setPage(page - 1);
  }
  const [docUrl, setDocUrl] = useState('');

  useEffect(() => {
    const doc = document.implementation.createHTMLDocument('doc');
    const articleContent = document.querySelector<HTMLTemplateElement>('#flow');
    // doc.body.appendChild(articleContent?.firstChild);
    // setDocUrl(doc);
    const blob = URL.createObjectURL(new Blob([alice], { type: 'text/html' }));
    console.log(blob);
    setDocUrl(blob);
  }, [previewEnabled]);

  return (
    <StyledPane previewEnabled={previewEnabled}>
      <PreviewDiv ref={previewRef} id="PreviewDiv">
        <Renderer
          source={docUrl}
          style={{}}
          autoResize
          fitToScreen
          page={page}
          authorStyleSheet={baseStylesheet}
        />
        <button onClick={next}>Next</button>
        <button onClick={prev}>Prev</button>
      </PreviewDiv>
      <Test />
    </StyledPane>
  );
};

export default PreviewPane;
